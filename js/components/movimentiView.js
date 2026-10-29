/**
 * Apple Design System - Movimenti (Transactions) View Component
 * Full CRUD table with search, filters, and Apple-style modal for adding transactions.
 */

import { mockFinancialData, CATEGORIES, ACCOUNTS } from '../data/mockData.js';
import { googleSheetsService } from '../services/googleSheetsService.js';

export class MovimentiView {
  constructor() {
    this.filters = {
      search: '',
      type: 'all',       // 'all' | 'income' | 'expense'
      category: 'all',
      sortBy: 'date-desc' // 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'
    };
    this.modalOpen = false;
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  }

  getFilteredTransactions() {
    let txs = mockFinancialData.getAllTransactions();

    // Search
    if (this.filters.search) {
      const q = this.filters.search.toLowerCase();
      txs = txs.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.account.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (this.filters.type !== 'all') {
      txs = txs.filter(t => t.type === this.filters.type);
    }

    // Category filter
    if (this.filters.category !== 'all') {
      txs = txs.filter(t => t.category === this.filters.category);
    }

    // Sort
    switch (this.filters.sortBy) {
      case 'date-asc':
        txs.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case 'amount-desc':
        txs.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        txs.sort((a, b) => a.amount - b.amount);
        break;
      default: // date-desc
        txs.sort((a, b) => b.date.localeCompare(a.date));
    }

    return txs;
  }

  computeStats(txs) {
    let totalIncome = 0, totalExpense = 0, count = txs.length;
    txs.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else totalExpense += t.amount;
    });
    return { totalIncome, totalExpense, netFlow: totalIncome - totalExpense, count };
  }

  render(container) {
    const txs = this.getFilteredTransactions();
    const stats = this.computeStats(txs);
    const allCategories = [...new Set(mockFinancialData.getAllTransactions().map(t => t.category))];

    container.innerHTML = `
      <div class="movimenti-layout">

        <!-- Top Mini KPI Strip -->
        <section class="movimenti-stats-strip">
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Transazioni</span>
            <span class="movimenti-stat-value">${stats.count}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Entrate Totali</span>
            <span class="movimenti-stat-value income-color">${this.formatCurrency(stats.totalIncome)}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Uscite Totali</span>
            <span class="movimenti-stat-value">${this.formatCurrency(stats.totalExpense)}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Flusso Netto</span>
            <span class="movimenti-stat-value ${stats.netFlow >= 0 ? 'income-color' : 'expense-color'}">${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}</span>
          </div>
        </section>

        <!-- Search & Filter Bar -->
        <section class="movimenti-toolbar">
          <div class="movimenti-search-box">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="mov-search" class="movimenti-search-input" placeholder="Cerca per descrizione, categoria o conto..." value="${this.filters.search}" autocomplete="off" />
            ${this.filters.search ? `<button class="search-clear-btn" id="mov-search-clear">&times;</button>` : ''}
          </div>

          <div class="movimenti-filters-row">
            <!-- Type Segmented -->
            <div class="segmented-control" id="mov-type-segmented">
              <button class="segment-btn ${this.filters.type === 'all' ? 'active' : ''}" data-type="all">Tutti</button>
              <button class="segment-btn ${this.filters.type === 'income' ? 'active' : ''}" data-type="income">Entrate</button>
              <button class="segment-btn ${this.filters.type === 'expense' ? 'active' : ''}" data-type="expense">Uscite</button>
            </div>

            <!-- Category Dropdown -->
            <div class="apple-select-wrapper">
              <select id="mov-category-filter" class="apple-select">
                <option value="all" ${this.filters.category === 'all' ? 'selected' : ''}>Tutte le Categorie</option>
                ${allCategories.map(c => `<option value="${c}" ${this.filters.category === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            <!-- Sort Dropdown -->
            <div class="apple-select-wrapper">
              <select id="mov-sort-filter" class="apple-select">
                <option value="date-desc" ${this.filters.sortBy === 'date-desc' ? 'selected' : ''}>Più recenti</option>
                <option value="date-asc" ${this.filters.sortBy === 'date-asc' ? 'selected' : ''}>Più datati</option>
                <option value="amount-desc" ${this.filters.sortBy === 'amount-desc' ? 'selected' : ''}>Importo ↓</option>
                <option value="amount-asc" ${this.filters.sortBy === 'amount-asc' ? 'selected' : ''}>Importo ↑</option>
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            <!-- Add Transaction Button -->
            <button class="apple-btn-primary" id="btn-add-tx">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Nuovo Movimento</span>
            </button>
          </div>
        </section>

        <!-- Transactions Table / Card List -->
        <section class="movimenti-table-card">
          ${txs.length > 0 ? `
            <!-- Desktop Table Header -->
            <div class="mov-table-header">
              <span class="mov-col mov-col-date">Data</span>
              <span class="mov-col mov-col-desc">Descrizione</span>
              <span class="mov-col mov-col-cat">Categoria</span>
              <span class="mov-col mov-col-account">Conto</span>
              <span class="mov-col mov-col-amount">Importo</span>
              <span class="mov-col mov-col-actions"></span>
            </div>
            <div class="mov-table-body" id="mov-table-body">
              ${txs.map(tx => this.renderRow(tx)).join('')}
            </div>
          ` : `
            <div class="mov-empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <h3>Nessun risultato trovato</h3>
              <p>Prova a modificare i filtri di ricerca o aggiungi un nuovo movimento.</p>
            </div>
          `}
        </section>

      </div>
    `;

    // Render Modal into root modal-container
    this.renderModal(container);

    this.bindEvents(container);
  }

  renderModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <!-- Apple Sheet Modal Overlay -->
      <div class="apple-modal-overlay" id="modal-overlay">
        <div class="apple-modal-sheet" id="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="modal-close">Annulla</button>
            <h3>Nuovo Movimento</h3>
            <button class="modal-save-btn" id="modal-save">Salva</button>
          </div>
          <form class="modal-form" id="add-tx-form" onsubmit="return false;">

            <!-- Type Toggle -->
            <div class="form-group">
              <label class="form-label">Tipo di Movimento</label>
              <div class="segmented-control form-segmented" id="form-type-toggle">
                <button type="button" class="segment-btn active" data-type="expense">Uscita</button>
                <button type="button" class="segment-btn" data-type="income">Entrata</button>
              </div>
            </div>

            <!-- Amount -->
            <div class="form-group">
              <label class="form-label" for="form-amount">Importo (€)</label>
              <input type="number" id="form-amount" class="apple-input apple-input-lg" placeholder="0,00" step="0.01" min="0.01" required />
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label" for="form-description">Descrizione</label>
              <input type="text" id="form-description" class="apple-input" placeholder="es. Supermercato, Stipendio..." required autocomplete="off" />
            </div>

            <!-- Date -->
            <div class="form-group">
              <label class="form-label" for="form-date">Data</label>
              <input type="date" id="form-date" class="apple-input" required />
            </div>

            <!-- Category -->
            <div class="form-group">
              <label class="form-label" for="form-category">Categoria</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-category" class="apple-select apple-input" required>
                  <option value="" disabled selected>Seleziona una categoria</option>
                  <optgroup label="Uscite">
                    ${CATEGORIES.filter(c => c.type === 'expense').map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </optgroup>
                  <optgroup label="Entrate">
                    ${CATEGORIES.filter(c => c.type === 'income').map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </optgroup>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <!-- Account -->
            <div class="form-group">
              <label class="form-label" for="form-account">Conto / Metodo</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-account" class="apple-select apple-input" required>
                  <option value="" disabled selected>Seleziona il conto</option>
                  ${ACCOUNTS.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

          </form>
        </div>
      </div>
    `;

    // Bind modal controls
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }

    const formTypeToggle = document.getElementById('form-type-toggle');
    if (formTypeToggle) {
      formTypeToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          formTypeToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this.updateCategoryOptions(e.currentTarget.dataset.type);
        });
      });
    }

    const saveBtn = document.getElementById('modal-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSave(container);
      });
    }
  }

  renderRow(tx) {
    const isIncome = tx.type === 'income';
    return `
      <div class="mov-table-row" data-id="${tx.id}">
        <span class="mov-col mov-col-date">
          <span class="mov-date-day">${tx.date.split('-')[2]}</span>
          <span class="mov-date-month">${new Date(tx.date).toLocaleDateString('it-IT', { month: 'short' }).toUpperCase()}</span>
        </span>
        <span class="mov-col mov-col-desc">
          <span class="mov-desc-icon ${isIncome ? 'income-bg' : 'expense-bg'}">
            ${isIncome
              ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`
              : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`}
          </span>
          <span class="mov-desc-text">${tx.description}</span>
        </span>
        <span class="mov-col mov-col-cat">
          <span class="mov-cat-pill">${tx.category}</span>
        </span>
        <span class="mov-col mov-col-account">${tx.account}</span>
        <span class="mov-col mov-col-amount ${isIncome ? 'income-color' : ''}">
          ${isIncome ? '+' : '-'}${this.formatCurrency(tx.amount)}
        </span>
        <span class="mov-col mov-col-actions">
          <button class="mov-delete-btn" data-id="${tx.id}" title="Elimina movimento">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </span>
      </div>
    `;
  }

  bindEvents(container) {
    // Search input (live)
    const searchInput = document.getElementById('mov-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filters.search = e.target.value;
        this.render(container);
        // Restore focus + cursor position
        const newInput = document.getElementById('mov-search');
        if (newInput) { newInput.focus(); newInput.setSelectionRange(newInput.value.length, newInput.value.length); }
      });
    }

    // Clear search
    const clearBtn = document.getElementById('mov-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.filters.search = '';
        this.render(container);
      });
    }

    // Type segmented control
    const typeSegmented = document.getElementById('mov-type-segmented');
    if (typeSegmented) {
      typeSegmented.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.filters.type = e.currentTarget.dataset.type;
          this.render(container);
        });
      });
    }

    // Category dropdown
    const catFilter = document.getElementById('mov-category-filter');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.render(container);
      });
    }

    // Sort dropdown
    const sortFilter = document.getElementById('mov-sort-filter');
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        this.filters.sortBy = e.target.value;
        this.render(container);
      });
    }

    // Add transaction button → open modal
    const addBtn = document.getElementById('btn-add-tx');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.openModal(container));
    }

    // Delete buttons
    container.querySelectorAll('.mov-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        this.handleDelete(id, container);
      });
    });
  }

  updateCategoryOptions(type) {
    const catSelect = document.getElementById('form-category');
    if (!catSelect) return;

    const filtered = type === 'income'
      ? CATEGORIES.filter(c => c.type === 'income')
      : CATEGORIES.filter(c => c.type === 'expense');

    catSelect.innerHTML = `
      <option value="" disabled selected>Seleziona una categoria</option>
      ${filtered.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
    `;
  }

  openModal(container) {
    this.modalOpen = true;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    // Set default date to today
    const dateInput = document.getElementById('form-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    // Focus amount field
    setTimeout(() => {
      const amountInput = document.getElementById('form-amount');
      if (amountInput) amountInput.focus();
    }, 350);
  }

  closeModal() {
    this.modalOpen = false;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 300);
  }

  handleSave(container) {
    const form = document.getElementById('add-tx-form');
    if (!form) return;

    const amount = document.getElementById('form-amount')?.value;
    const description = document.getElementById('form-description')?.value;
    const date = document.getElementById('form-date')?.value;
    const category = document.getElementById('form-category')?.value;
    const account = document.getElementById('form-account')?.value;

    // Determine type from segmented
    const activeTypeBtn = document.querySelector('#form-type-toggle .segment-btn.active');
    const type = activeTypeBtn ? activeTypeBtn.dataset.type : 'expense';

    // Validation
    if (!amount || !description || !date || !category || !account) {
      // Shake the save button for feedback
      const saveBtn = document.getElementById('modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 500);
      }
      return;
    }

    const addedTx = mockFinancialData.addTransaction({ amount, description, date, category, type, account });

    // Sync to Google Sheets in background if configured
    if (googleSheetsService.isConfigured()) {
      googleSheetsService.pushTransaction(addedTx).catch(err => {
        console.warn('Sync movimento fallito su Google Sheets:', err);
      });
    }

    this.closeModal();
    setTimeout(() => this.render(container), 320);
  }

  handleDelete(id, container) {
    // Animate row removal
    const row = container.querySelector(`.mov-table-row[data-id="${id}"]`);
    if (row) {
      row.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(24px)';
    }

    setTimeout(() => {
      mockFinancialData.deleteTransaction(id);
      if (googleSheetsService.isConfigured()) {
        googleSheetsService.deleteTransaction(id).catch(err => {
          console.warn('Eliminazione fallita su Google Sheets:', err);
        });
      }
      this.render(container);
    }, 260);
  }
}
