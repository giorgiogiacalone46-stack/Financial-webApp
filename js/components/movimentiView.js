/**
 * Apple Design System - Movimenti View Component (Ottimizzato Desktop & Mobile)
 * - Zero overflow orizzontale su iPhone e MacBook
 * - Categorie con emoji e badge semantici
 * - Supporto tipi: Uscita, Entrata, Trasferimento con conto destinazione
 * - Ricerca istantanea, filtri rapidi, ordinamento dinamico
 */

import { financeStore } from '../data/mockData.js';
import { googleSheetsService } from '../services/googleSheetsService.js';

export class MovimentiView {
  constructor() {
    this.filters = {
      search: '',
      type: 'all',       // 'all' | 'income' | 'expense' | 'transfer'
      category: 'all',
      sortBy: 'date-desc'
    };
    this.modalOpen = false;
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  parseDateKey(dateStr) {
    if (!dateStr) return '00000000';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      return `${y}${m}${d}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr.replace(/-/g, '');
    }
    return dateStr;
  }

  formatDateParts(dateStr) {
    const months = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
    if (!dateStr) return { day: '--', monthYear: '---' };
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return { day: d, monthYear: `${months[mIdx]} '${y.slice(-2)}` };
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return { day: d, monthYear: `${months[mIdx]} '${y.slice(-2)}` };
    }
    return { day: dateStr.slice(0, 2), monthYear: dateStr.slice(3) };
  }

  getFilteredTransactions() {
    let txs = financeStore.getAllTransactions();

    if (this.filters.search) {
      const q = this.filters.search.toLowerCase();
      txs = txs.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.account || '').toLowerCase().includes(q)
      );
    }

    if (this.filters.type !== 'all') {
      txs = txs.filter(t => t.type === this.filters.type);
    }

    if (this.filters.category !== 'all') {
      txs = txs.filter(t => t.category === this.filters.category);
    }

    switch (this.filters.sortBy) {
      case 'date-asc':
        txs.sort((a, b) => this.parseDateKey(a.date).localeCompare(this.parseDateKey(b.date)));
        break;
      case 'amount-desc':
        txs.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        txs.sort((a, b) => a.amount - b.amount);
        break;
      default: // date-desc
        txs.sort((a, b) => this.parseDateKey(b.date).localeCompare(this.parseDateKey(a.date)));
    }

    return txs;
  }

  computeStats(txs) {
    let totalIncome = 0, totalExpense = 0, count = txs.length;
    txs.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else if (t.type === 'expense') totalExpense += t.amount;
    });
    return { totalIncome, totalExpense, netFlow: totalIncome - totalExpense, count };
  }

  render(container) {
    const txs = this.getFilteredTransactions();
    const stats = this.computeStats(txs);
    const categories = financeStore.getCategories();
    const accounts = financeStore.getAccounts();

    container.innerHTML = `
      <div class="movimenti-layout">

        <!-- Top Mini KPI Strip -->
        <section class="movimenti-stats-strip">
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Movimenti</span>
            <span class="movimenti-stat-value">${stats.count}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Entrate</span>
            <span class="movimenti-stat-value income-color">${this.formatCurrency(stats.totalIncome)}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Uscite</span>
            <span class="movimenti-stat-value expense-color">${this.formatCurrency(stats.totalExpense)}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Differenza</span>
            <span class="movimenti-stat-value ${stats.netFlow >= 0 ? 'income-color' : 'expense-color'}">${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}</span>
          </div>
        </section>

        <!-- Search & Filter Controls -->
        <section class="movimenti-toolbar">
          <div class="movimenti-search-box">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="mov-search" class="movimenti-search-input" placeholder="Cerca per descrizione, categoria o conto..." value="${this.filters.search}" autocomplete="off" />
            ${this.filters.search ? `<button class="search-clear-btn" id="mov-search-clear">&times;</button>` : ''}
          </div>

          <div class="movimenti-filters-row">
            <!-- Segmented Tipo -->
            <div class="segmented-control" id="mov-type-segmented">
              <button class="segment-btn ${this.filters.type === 'all' ? 'active' : ''}" data-type="all">Tutti</button>
              <button class="segment-btn ${this.filters.type === 'expense' ? 'active' : ''}" data-type="expense">Uscite</button>
              <button class="segment-btn ${this.filters.type === 'income' ? 'active' : ''}" data-type="income">Entrate</button>
              <button class="segment-btn ${this.filters.type === 'transfer' ? 'active' : ''}" data-type="transfer">Giroconti</button>
            </div>

            <!-- Categorie & Ordinamento -->
            <div class="filter-dropdowns-group">
              <div class="apple-select-wrapper">
                <select id="mov-category-filter" class="apple-select">
                  <option value="all" ${this.filters.category === 'all' ? 'selected' : ''}>Tutte le Categorie</option>
                  ${categories.map(c => `<option value="${c.name}" ${this.filters.category === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              <div class="apple-select-wrapper">
                <select id="mov-sort-filter" class="apple-select">
                  <option value="date-desc" ${this.filters.sortBy === 'date-desc' ? 'selected' : ''}>Data più recente</option>
                  <option value="date-asc" ${this.filters.sortBy === 'date-asc' ? 'selected' : ''}>Data meno recente</option>
                  <option value="amount-desc" ${this.filters.sortBy === 'amount-desc' ? 'selected' : ''}>Importo più alto</option>
                  <option value="amount-asc" ${this.filters.sortBy === 'amount-asc' ? 'selected' : ''}>Importo più basso</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <button class="apple-btn-primary" id="btn-add-tx">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Nuovo</span>
            </button>
          </div>
        </section>

        <!-- Lista Movimenti -->
        <section class="movimenti-table-card">
          ${txs.length > 0 ? `
            <div class="mov-table-header">
              <span class="mov-col mov-col-date">Data</span>
              <span class="mov-col mov-col-desc">Descrizione</span>
              <span class="mov-col mov-col-cat">Categoria</span>
              <span class="mov-col mov-col-account">Conto</span>
              <span class="mov-col mov-col-amount">Importo</span>
              <span class="mov-col mov-col-actions"></span>
            </div>
            <div class="mov-table-body" id="mov-table-body">
              ${txs.slice(0, 150).map(tx => this.renderRow(tx)).join('')}
              ${txs.length > 150 ? `<div class="mov-load-more-hint">Visualizzati i primi 150 di ${txs.length} movimenti (usa la ricerca per filtrare)</div>` : ''}
            </div>
          ` : `
            <div class="mov-empty-state">
              <h3>Nessun movimento trovato</h3>
              <p>Prova a modificare i filtri o il testo di ricerca.</p>
            </div>
          `}
        </section>

      </div>
    `;

    this.renderModal(categories, accounts, container);
    this.bindEvents(container);
  }

  renderRow(tx) {
    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    let typeClass = isIncome ? 'income' : (isTransfer ? 'transfer' : 'expense');
    let sign = isIncome ? '+' : (isTransfer ? '⇄ ' : '-');
    const dateParts = this.formatDateParts(tx.date);

    return `
      <div class="mov-table-row" data-id="${tx.id}">
        <div class="mov-col mov-col-date" title="${tx.date || ''}">
          <span class="mov-date-day">${dateParts.day}</span>
          <span class="mov-date-month">${dateParts.monthYear}</span>
        </div>
        <div class="mov-col mov-col-desc">
          <span class="mov-desc-title">${tx.description || 'Movimento'}</span>
        </div>
        <div class="mov-col mov-col-cat">
          <span class="mov-cat-pill">${tx.category || '❔Altro'}</span>
        </div>
        <div class="mov-col mov-col-account">
          <span class="mov-account-name">${tx.account || 'Buddybank'}${tx.toAccount ? ' → ' + tx.toAccount : ''}</span>
        </div>
        <div class="mov-col mov-col-amount ${typeClass}">
          ${sign}${this.formatCurrency(tx.amount)}
        </div>
        <div class="mov-col mov-col-actions">
          <button class="mov-delete-btn" data-id="${tx.id}" data-row="${tx.rowNumber || ''}" title="Elimina movimento">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
    `;
  }

  renderModal(categories, accounts, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="modal-overlay">
        <div class="apple-modal-sheet" id="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="modal-close">Annulla</button>
            <h3>Nuovo Movimento</h3>
            <button class="modal-save-btn" id="modal-save">Salva</button>
          </div>
          <form class="modal-form" id="add-tx-form" onsubmit="return false;">
            
            <div class="form-group">
              <label class="form-label">Tipo Movimento</label>
              <div class="segmented-control form-segmented" id="form-type-toggle">
                <button type="button" class="segment-btn active" data-type="expense">Uscita</button>
                <button type="button" class="segment-btn" data-type="income">Entrata</button>
                <button type="button" class="segment-btn" data-type="transfer">Giroconto</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-amount">Importo (€)</label>
              <input type="number" id="form-amount" class="apple-input apple-input-lg" placeholder="0,00" step="0.01" min="0.01" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-description">Descrizione / Note</label>
              <input type="text" id="form-description" class="apple-input" placeholder="es. Spesa Esselunga, Stipendio, Rata..." required />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-date">Data</label>
              <input type="date" id="form-date" class="apple-input" required />
            </div>

            <div class="form-group" id="form-group-category">
              <label class="form-label" for="form-category">Categoria</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-category" class="apple-select apple-input" required>
                  <option value="" disabled selected>Seleziona una categoria</option>
                  ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-account" id="form-account-label">Conto di Addebito</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-account" class="apple-select apple-input" required>
                  ${accounts.map(a => `<option value="${a.name}">${a.name} (${this.formatCurrency(a.balance)})</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group" id="form-group-to-account" style="display: none;">
              <label class="form-label" for="form-to-account">Conto di Accredito (Destinazione)</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-to-account" class="apple-select apple-input">
                  ${accounts.map(a => `<option value="${a.name}">${a.name} (${this.formatCurrency(a.balance)})</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

          </form>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });

    const saveBtn = document.getElementById('modal-save');
    if (saveBtn) saveBtn.addEventListener('click', (e) => { e.preventDefault(); this.handleSave(container); });

    const typeToggle = document.getElementById('form-type-toggle');
    const toAccGroup = document.getElementById('form-group-to-account');
    const accLabel = document.getElementById('form-account-label');

    if (typeToggle) {
      typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          typeToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const currentType = e.currentTarget.dataset.type;

          if (toAccGroup) {
            toAccGroup.style.display = currentType === 'transfer' ? 'block' : 'none';
          }
          if (accLabel) {
            accLabel.textContent = currentType === 'transfer' ? 'Conto Origine' : (currentType === 'income' ? 'Conto Accredito' : 'Conto Addebito');
          }
        });
      });
    }

    // Supporto ESC da tastiera
    if (this._escHandler) {
      window.removeEventListener('keydown', this._escHandler);
    }
    this._escHandler = (e) => {
      if (e.key === 'Escape' && this.modalOpen) {
        this.closeModal();
      }
    };
    window.addEventListener('keydown', this._escHandler);
  }

  bindEvents(container) {
    const searchInput = document.getElementById('mov-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const pos = e.target.selectionStart || e.target.value.length;
        this.filters.search = e.target.value;
        this.render(container);
        const newSearchInput = document.getElementById('mov-search');
        if (newSearchInput) {
          newSearchInput.focus();
          try { newSearchInput.setSelectionRange(pos, pos); } catch (err) {}
        }
      });
    }

    const clearBtn = document.getElementById('mov-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.filters.search = '';
        this.render(container);
      });
    }

    const typeSegmented = document.getElementById('mov-type-segmented');
    if (typeSegmented) {
      typeSegmented.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.filters.type = e.currentTarget.dataset.type;
          this.render(container);
        });
      });
    }

    const catFilter = document.getElementById('mov-category-filter');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.render(container);
      });
    }

    const sortFilter = document.getElementById('mov-sort-filter');
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        this.filters.sortBy = e.target.value;
        this.render(container);
      });
    }

    const addBtn = document.getElementById('btn-add-tx');
    if (addBtn) addBtn.addEventListener('click', () => this.openModal());

    container.querySelectorAll('.mov-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const row = e.currentTarget.dataset.row;
        this.handleDelete(id, row, container);
      });
    });
  }

  openModal() {
    this.modalOpen = true;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    const dateInput = document.getElementById('form-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    setTimeout(() => {
      const amountInput = document.getElementById('form-amount');
      if (amountInput) amountInput.focus();
    }, 280);
  }

  closeModal() {
    this.modalOpen = false;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 260);
  }

  handleSave(container) {
    const amount = document.getElementById('form-amount')?.value;
    const description = document.getElementById('form-description')?.value;
    const date = document.getElementById('form-date')?.value;
    const category = document.getElementById('form-category')?.value;
    const account = document.getElementById('form-account')?.value;
    const toAccount = document.getElementById('form-to-account')?.value;

    const activeTypeBtn = document.querySelector('#form-type-toggle .segment-btn.active');
    const type = activeTypeBtn ? activeTypeBtn.dataset.type : 'expense';

    if (!amount || !description || !date || (!category && type !== 'transfer') || !account) {
      const saveBtn = document.getElementById('modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 400);
      }
      return;
    }

    const addedTx = financeStore.addTransaction({
      amount,
      description,
      date,
      category: category || '🔄 Giroconto',
      type,
      account,
      toAccount: type === 'transfer' ? toAccount : ''
    });

    if (googleSheetsService.isConfigured()) {
      googleSheetsService.pushTransaction(addedTx).catch(err => console.warn('Sync fallita:', err));
    }

    this.closeModal();
    setTimeout(() => this.render(container), 280);
  }

  handleDelete(id, rowNumber, container) {
    const row = container.querySelector(`.mov-table-row[data-id="${id}"]`);
    if (row) {
      row.style.opacity = '0';
      row.style.transform = 'translateX(20px)';
    }

    setTimeout(() => {
      financeStore.deleteTransaction(id);
      if (rowNumber && googleSheetsService.isConfigured()) {
        googleSheetsService.deleteTransaction(rowNumber).catch(err => console.warn('Delete fallita:', err));
      }
      this.render(container);
    }, 250);
  }
}
