/**
 * Apple Design System - Movimenti View Component (Ottimizzato Desktop & Mobile)
 * - Sub-navigazione: Elenco Movimenti, Analisi Singola Categoria, Confronto Categorie
 * - Categorie con emoji, badge semantici e auto-aggiunta dinamica
 * - Smart Rules con suggerimento predittivo in tempo reale durante la digitazione
 * - Controllo similarità categorie (Smart Deduplication & Merge)
 * - Ricerca istantanea, filtri rapidi, ordinamento dinamico
 */

import { financeStore } from '../data/mockData.js';
import { googleSheetsService } from '../services/googleSheetsService.js';
import { getCategoryIcon, cleanCategoryName, getIcon } from './icons.js';
import { smartCategorizer } from '../services/smartCategorizer.js';

export class MovimentiView {
  constructor() {
    this.activeSubtab = 'elenco'; // 'elenco' | 'analisi' | 'confronto' | 'budget'
    this.analysisCat = '';
    this.compareCatA = '';
    this.compareCatB = '';
    this.analysisChart = null;
    this.compareChart = null;
    this.viewMode = 'list'; // 'list' (Apple Wallet native) | 'table' (Data grid)

    this.filters = {
      search: '',
      type: 'all',       // 'all' | 'income' | 'expense' | 'transfer'
      category: 'all',
      account: 'all',
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

  destroyCharts() {
    if (this.analysisChart) {
      try { this.analysisChart.destroy(); } catch (e) {}
      this.analysisChart = null;
    }
    if (this.compareChart) {
      try { this.compareChart.destroy(); } catch (e) {}
      this.compareChart = null;
    }
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

  formatDateFull(dateStr) {
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    if (!dateStr) return 'Data non disp.';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return `${parseInt(d, 10)} ${months[mIdx]} ${y}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return `${parseInt(d, 10)} ${months[mIdx]} ${y}`;
    }
    return dateStr;
  }

  getMonthYearGroup(dateStr) {
    const monthsLong = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    if (!dateStr) return { key: '0000-00', label: 'Altro Periodo' };

    let y = '2026', m = 10;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const parts = dateStr.split('/');
      y = parts[2];
      m = parseInt(parts[1], 10);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      y = parts[0];
      m = parseInt(parts[1], 10);
    }
    const mIdx = Math.max(0, Math.min(11, m - 1));
    const mKey = `${y}-${String(m).padStart(2, '0')}`;
    return { key: mKey, label: `${monthsLong[mIdx]} ${y}` };
  }

  getCategoryAvatarClass(category, type) {
    if (type === 'income') return 'cat-avatar--income';
    if (type === 'transfer') return 'cat-avatar--giroconto';

    const clean = cleanCategoryName(category).toLowerCase();
    if (clean.includes('alimentar') || clean.includes('spesa') || clean.includes('supermercat')) return 'cat-avatar--alimentari';
    if (clean.includes('ristorant') || clean.includes('bar') || clean.includes('pranz') || clean.includes('cen')) return 'cat-avatar--ristoranti';
    if (clean.includes('cas') || clean.includes('affitt') || clean.includes('mutuo')) return 'cat-avatar--casa';
    if (clean.includes('utenz') || clean.includes('bollett') || clean.includes('luce') || clean.includes('gas')) return 'cat-avatar--utenze';
    if (clean.includes('auto') || clean.includes('trasport') || clean.includes('benzina')) return 'cat-avatar--auto';
    if (clean.includes('salut') || clean.includes('farmaci') || clean.includes('medic')) return 'cat-avatar--salute';
    if (clean.includes('svag') || clean.includes('cinema') || clean.includes('streaming')) return 'cat-avatar--svago';
    if (clean.includes('shop') || clean.includes('acquist') || clean.includes('abbigliament')) return 'cat-avatar--shopping';
    if (clean.includes('viagg') || clean.includes('vacanz') || clean.includes('hotel') || clean.includes('volo')) return 'cat-avatar--viaggi';
    if (clean.includes('lavor') || clean.includes('consulenz')) return 'cat-avatar--lavoro';
    if (clean.includes('stipendi') || clean.includes('accredit')) return 'cat-avatar--stipendio';
    if (clean.includes('invest') || clean.includes('vwce') || clean.includes('pac')) return 'cat-avatar--investimenti';
    if (clean.includes('emergenz') || clean.includes('xeon')) return 'cat-avatar--fondo_emergenza';
    if (clean.includes('pension') || clean.includes('previdenz')) return 'cat-avatar--pensione';
    if (clean.includes('girocont')) return 'cat-avatar--giroconto';
    return 'cat-avatar--default';
  }

  groupTransactionsByMonth(txs) {
    const groupsMap = new Map();

    txs.forEach(tx => {
      const { key, label } = this.getMonthYearGroup(tx.date);
      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          key,
          label,
          txCount: 0,
          totalExpense: 0,
          totalIncome: 0,
          transactions: []
        });
      }
      const g = groupsMap.get(key);
      g.txCount++;
      g.transactions.push(tx);
      if (tx.type === 'expense') g.totalExpense += tx.amount;
      else if (tx.type === 'income') g.totalIncome += tx.amount;
    });

    return Array.from(groupsMap.values());
  }

  getFilteredTransactions() {
    let txs = financeStore.getAllTransactions();

    if (this.filters.search) {
      const q = this.filters.search.toLowerCase();
      txs = txs.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.account || '').toLowerCase().includes(q) ||
        (t.fromAccount || '').toLowerCase().includes(q) ||
        (t.toAccount || '').toLowerCase().includes(q)
      );
    }

    if (this.filters.type !== 'all') {
      txs = txs.filter(t => t.type === this.filters.type);
    }

    if (this.filters.category !== 'all') {
      txs = txs.filter(t => t.category === this.filters.category);
    }

    if (this.filters.account !== 'all') {
      const acc = this.filters.account.toLowerCase();
      txs = txs.filter(t =>
        (t.account && t.account.toLowerCase().includes(acc)) ||
        (t.fromAccount && t.fromAccount.toLowerCase().includes(acc)) ||
        (t.toAccount && t.toAccount.toLowerCase().includes(acc))
      );
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
    this.destroyCharts();
    const categories = financeStore.getCategories();
    const accounts = financeStore.getAccounts();
    const summary = financeStore.summary;
    const allTxs = financeStore.getAllTransactions();
    const curMonthIncome = summary.monthlyIncome || 0;
    const curMonthExpense = summary.monthlyExpense || 0;
    const curMonthNet = curMonthIncome - curMonthExpense;

    const tabMeta = {
      elenco: {
        badge: 'Registro Ufficiale',
        badgeClass: 'badge--blue',
        title: 'Registro Movimenti',
        subtitle: 'Cronologia entrate e uscite con filtri multicriterio, vista Apple Wallet e tabella dati',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-export-movimenti">
            ${getIcon('list', 14)} <span>Esporta CSV</span>
          </button>
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      },
      analisi: {
        badge: 'Trend & Breakdown',
        badgeClass: 'badge--purple',
        title: 'Analisi Categorie',
        subtitle: 'Approfondimento storico su 12 mesi, spesa media mensile e concentrazione uscite',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      },
      confronto: {
        badge: 'Head-to-Head',
        badgeClass: 'badge--warning',
        title: 'Confronto Categorie',
        subtitle: 'Analisi comparativa testa a testa tra due categorie di spesa e scostamento nel tempo',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      },
      budget: {
        badge: 'Regola 50/30/20',
        badgeClass: 'badge--positive',
        title: 'Budget Preventivo 50/30/20',
        subtitle: 'Ripartizione delle entrate nelle tre buste (Bisogni 50%, Voluttuari 30%, Risparmio 20%)',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      }
    };
    const currentMeta = tabMeta[this.activeSubtab] || tabMeta.elenco;

    // Sottotitoli contestuali per la navbar in app
    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = 'Movimenti';
    if (subtitleEl) subtitleEl.textContent = currentMeta.subtitle;

    container.innerHTML = `
      <div class="page movimenti-page">

        <!-- Header di Sezione in Stile Apple (Titolo + Sottotitolo Dinamico) -->
        <header class="movimenti-header-section">
          
          <div class="spese-header-toolbar movimenti-header-toolbar">
            <div class="spese-header-info movimenti-header-info">
              <div class="movimenti-meta-row">
                <span class="badge ${currentMeta.badgeClass}">${currentMeta.badge}</span>
                <span class="movimenti-chip privacy-mask" style="color: var(--apple-green);">
                  Entrate: <strong>+${this.formatCurrency(curMonthIncome)}</strong>
                </span>
                <span class="movimenti-chip privacy-mask" style="color: var(--apple-red);">
                  Uscite: <strong>-${this.formatCurrency(curMonthExpense)}</strong>
                </span>
                <span class="movimenti-chip privacy-mask">
                  Netto: <strong>${curMonthNet >= 0 ? '+' : ''}${this.formatCurrency(curMonthNet)}</strong>
                </span>
                <span class="movimenti-chip">
                  <strong>${allTxs.length}</strong> transazioni
                </span>
              </div>
              <h2 class="page-title">${currentMeta.title}</h2>
              <p class="page-subtitle">${currentMeta.subtitle}</p>
            </div>
            
            <div class="spese-header-actions movimenti-header-actions">
              ${currentMeta.actionHtml}
            </div>
          </div>

          <!-- Sotto-menu Segmentato Apple: Design Armonico, Integrato ed Omogeneo -->
          <div class="movimenti-subtabs-bar">
            <nav class="movimenti-segmented-tabs" id="movimenti-subtabs">
              <button class="movimenti-tab-btn ${this.activeSubtab === 'elenco' ? 'active' : ''}" data-subtab="elenco">
                <span class="tab-icon">${getIcon('list', 15)}</span>
                <span class="tab-label">Elenco Movimenti</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'analisi' ? 'active' : ''}" data-subtab="analisi">
                <span class="tab-icon">${getIcon('chart', 15)}</span>
                <span class="tab-label">Analisi Categorie</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'confronto' ? 'active' : ''}" data-subtab="confronto">
                <span class="tab-icon">${getIcon('conguaglio', 15)}</span>
                <span class="tab-label">Confronto Categorie</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'budget' ? 'active' : ''}" data-subtab="budget">
                <span class="tab-icon">${getIcon('target', 15)}</span>
                <span class="tab-label">Budget 50/30/20</span>
              </button>
            </nav>
          </div>

        </header>

        ${this.activeSubtab === 'elenco' ? this.renderElencoView(categories, accounts) : ''}
        ${this.activeSubtab === 'analisi' ? this.renderAnalisiView(categories) : ''}
        ${this.activeSubtab === 'confronto' ? this.renderConfrontoView(categories) : ''}
        ${this.activeSubtab === 'budget' ? this.renderBudgetView() : ''}

      </div>
    `;

    this.bindSubtabEvents(container);

    if (this.activeSubtab === 'elenco') {
      this.bindEvents(container);
    } else if (this.activeSubtab === 'analisi') {
      this.bindAnalisiEvents(container);
      requestAnimationFrame(() => this.initAnalysisChart());
    } else if (this.activeSubtab === 'confronto') {
      this.bindConfrontoEvents(container);
      requestAnimationFrame(() => this.initCompareChart());
    }

    this.renderModal(categories, accounts, container);
  }

  bindSubtabEvents(container) {
    container.querySelectorAll('#movimenti-subtabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          if (window.location.hash !== `#movimenti-${sub}`) {
            window.location.hash = `movimenti-${sub}`;
          }
          this.render(container);
        }
      });
    });

    const addBtnHeader = container.querySelector('#btn-add-tx-header');
    if (addBtnHeader) {
      addBtnHeader.addEventListener('click', () => {
        this.openModal();
      });
    }

    const exportBtn = container.querySelector('#btn-export-movimenti');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const txs = this.getFilteredTransactions();
        let csv = 'Data;Tipo;Descrizione;Categoria;Conto;Importo (EUR)\n';
        txs.forEach(t => {
          csv += `"${t.date || ''}";"${t.type || 'expense'}";"${(t.description || '').replace(/"/g, '""')}";"${cleanCategoryName(t.category)}";"${t.account || ''}";"${(t.amount || 0).toFixed(2)}"\n`;
        });
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Movimenti_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  // =========================================================================
  // 1. VISTA ELENCO MOVIMENTI (Apple Wallet & Revolut Standard)
  // =========================================================================
  renderElencoView(categories, accounts) {
    const txs = this.getFilteredTransactions();
    const stats = this.computeStats(txs);
    const monthGroups = this.groupTransactionsByMonth(txs);

    // Lista conti univoci per il filtro
    const allAccountNames = Array.from(new Set([
      ...accounts.map(a => a.name),
      ...financeStore.getAllTransactions().map(t => t.account).filter(Boolean)
    ]));

    return `
      <!-- Top Mini KPI Strip (Standard 4-Zone Canonical Cards) -->
      <section class="grid-4">
        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Totale Movimenti Censiti">Movimenti</span>
            <div class="kpi-icon-badge balance">${getIcon('list', 16)}</div>
          </div>
          <div class="card__value">${stats.count}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Nel periodo</span>
              <span class="kv__value">Attivi</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Transazioni filtrate</span>
          </div>
        </div>

        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Entrate Totali Registrate">Entrate</span>
            <div class="kpi-icon-badge income">${getIcon('income', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-green);">${this.formatCurrency(stats.totalIncome)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Accrediti</span>
              <span class="kv__value positive">Registrati</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Flusso positivo</span>
          </div>
        </div>

        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Uscite Totali Registrate">Uscite</span>
            <div class="kpi-icon-badge expense">${getIcon('expense', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(stats.totalExpense)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Spese</span>
              <span class="kv__value negative">Tracciate</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Flusso in uscita</span>
          </div>
        </div>

        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Differenza Netta di Cassa">Differenza</span>
            <div class="kpi-icon-badge savings">${getIcon('conguaglio', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: ${stats.netFlow >= 0 ? 'var(--apple-green)' : 'var(--apple-red)'};">
            ${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}
          </div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Saldo periodo</span>
              <span class="kv__value ${stats.netFlow >= 0 ? 'positive' : 'negative'}">${stats.netFlow >= 0 ? 'Surplus' : 'Deficit'}</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Cash flow netto</span>
          </div>
        </div>
      </section>

      <!-- Apple Glassmorphic Unified Controls Card -->
      <section class="mov-controls-card">
        <!-- Top Row: Search Input + View Mode Switcher -->
        <div class="mov-controls-top">
          <div class="mov-search-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="mov-search" class="movimenti-search-input apple-input" placeholder="Cerca descrizione, conto o categoria..." value="${this.filters.search}" />
            ${this.filters.search ? `<button id="mov-search-clear" class="search-clear-btn" title="Cancella ricerca">&times;</button>` : ''}
          </div>

          <!-- View Mode Toggle: Apple List vs Data Table -->
          <div class="mov-view-segmented" id="mov-view-segmented">
            <button class="mov-view-btn ${this.viewMode === 'list' ? 'active' : ''}" data-mode="list" title="Vista Lista Apple Wallet">
              ${getIcon('list', 14)}
              <span>Lista</span>
            </button>
            <button class="mov-view-btn ${this.viewMode === 'table' ? 'active' : ''}" data-mode="table" title="Vista Tabella Dati">
              ${getIcon('table', 14)}
              <span>Tabella</span>
            </button>
          </div>
        </div>

        <!-- Middle Row: Type Segmented Control -->
        <div class="mov-controls-mid">
          <div class="segmented-control" id="mov-type-segmented">
            <button class="segment-btn ${this.filters.type === 'all' ? 'active' : ''}" data-type="all">Tutti</button>
            <button class="segment-btn ${this.filters.type === 'expense' ? 'active' : ''}" data-type="expense">Uscite</button>
            <button class="segment-btn ${this.filters.type === 'income' ? 'active' : ''}" data-type="income">Entrate</button>
            <button class="segment-btn ${this.filters.type === 'transfer' ? 'active' : ''}" data-type="transfer">Giroconti</button>
          </div>
        </div>

        <!-- Filter Dropdowns Row: Category, Account, Sort -->
        <div class="mov-controls-filters">
          <div class="apple-select-wrapper">
            <select id="mov-category-filter" class="apple-select">
              <option value="all" ${this.filters.category === 'all' ? 'selected' : ''}>Tutte le Categorie</option>
              ${categories.map(c => `<option value="${c.name}" ${this.filters.category === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="apple-select-wrapper">
            <select id="mov-account-filter" class="apple-select">
              <option value="all" ${this.filters.account === 'all' ? 'selected' : ''}>Tutti i Conti</option>
              ${allAccountNames.map(acc => `<option value="${acc}" ${this.filters.account === acc ? 'selected' : ''}>${acc}</option>`).join('')}
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="apple-select-wrapper">
            <select id="mov-sort-filter" class="apple-select">
              <option value="date-desc" ${this.filters.sortBy === 'date-desc' ? 'selected' : ''}>Data: Più recenti</option>
              <option value="date-asc" ${this.filters.sortBy === 'date-asc' ? 'selected' : ''}>Data: Meno recenti</option>
              <option value="amount-desc" ${this.filters.sortBy === 'amount-desc' ? 'selected' : ''}>Importo: Più alto</option>
              <option value="amount-asc" ${this.filters.sortBy === 'amount-asc' ? 'selected' : ''}>Importo: Più basso</option>
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <span class="badge badge--neutral" style="margin-left: auto; font-variant-numeric: tabular-nums;">
            ${stats.count} movimenti
          </span>
        </div>
      </section>

      <!-- Main Transactions Content: Grouped List or Data Table -->
      ${this.renderMainTransactionsContent(txs, monthGroups)}
    `;
  }

  renderMainTransactionsContent(txs, monthGroups) {
    if (txs.length === 0) {
      return `
        <div class="card mov-empty-state">
          <span class="empty-icon" style="color: var(--text-tertiary);">${getIcon('list', 36)}</span>
          <h3>Nessun movimento trovato</h3>
          <p>Nessuna transazione corrisponde ai filtri di ricerca selezionati.</p>
        </div>
      `;
    }

    if (this.viewMode === 'list') {
      return `
        <section class="mov-apple-grouped-container">
          ${monthGroups.map(group => this.renderAppleMonthGroup(group)).join('')}
        </section>
      `;
    }

    // Modalità Tabella Dati Compatta
    return `
      <section class="movimenti-table-wrapper">
        <div class="movimenti-table-header">
          <div class="mov-col mov-col-date">Data</div>
          <div class="mov-col mov-col-desc">Descrizione / Conto</div>
          <div class="mov-col mov-col-cat">Categoria</div>
          <div class="mov-col mov-col-amount">Importo</div>
          <div class="mov-col mov-col-actions"></div>
        </div>

        <div class="movimenti-table-body">
          ${txs.map(tx => this.renderTransactionRow(tx)).join('')}
        </div>
      </section>
    `;
  }

  renderAppleMonthGroup(group) {
    return `
      <div class="mov-month-group">
        <div class="mov-month-header">
          <div class="mov-month-title">
            ${getIcon('calendar', 14)}
            <span>${group.label}</span>
            <span class="badge badge--neutral" style="font-size: 11px; padding: 2px 7px;">${group.txCount} mov</span>
          </div>
          <div class="mov-month-totals">
            ${group.totalExpense > 0 ? `<span style="color: var(--text-secondary);">Uscite: <strong class="privacy-mask" style="color: var(--text-primary);">${this.formatCurrency(group.totalExpense)}</strong></span>` : ''}
            ${group.totalIncome > 0 ? `<span style="color: var(--apple-green);">Entrate: <strong class="privacy-mask" style="color: var(--apple-green);">+${this.formatCurrency(group.totalIncome)}</strong></span>` : ''}
          </div>
        </div>
        <div class="mov-apple-card">
          ${group.transactions.map(tx => this.renderAppleTransactionRow(tx)).join('')}
        </div>
      </div>
    `;
  }

  renderAppleTransactionRow(tx) {
    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    const sign = isIncome ? '+' : (isTransfer ? '' : '-');
    const amountClass = isIncome ? 'income' : (isTransfer ? 'transfer' : 'expense');
    const formattedDate = this.formatDateFull(tx.date);
    const catName = cleanCategoryName(tx.category || (isTransfer ? 'Giroconto' : 'Altro'));
    const avatarClass = this.getCategoryAvatarClass(tx.category, tx.type);
    const catIcon = getCategoryIcon(tx.category || (isTransfer ? 'giroconto' : 'altro'), 18);

    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${tx.toAccount || 'Destinazione'}`
      : (tx.account || 'Buddybank');

    return `
      <div class="tx-apple-row" data-id="${tx.id}">
        <div class="tx-avatar ${avatarClass}">
          ${catIcon}
        </div>

        <div class="tx-details">
          <span class="tx-title" title="${tx.description}">${tx.description || 'Movimento'}</span>
          <div class="tx-meta">
            <span class="tx-date">${formattedDate}</span>
            <span class="tx-dot">•</span>
            <span class="tx-account">${accountLabel}</span>
            <span class="tx-cat-badge">${catName}</span>
          </div>
        </div>

        <div class="tx-right">
          <span class="tx-amount ${amountClass} privacy-mask">
            ${sign}${this.formatCurrency(tx.amount)}
          </span>
          <button class="tx-del-btn" data-id="${tx.id}" data-row="${tx.rowNumber || ''}" title="Elimina movimento">
            ${getIcon('trash', 14)}
          </button>
        </div>
      </div>
    `;
  }

  renderTransactionRow(tx) {
    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    const sign = isIncome ? '+' : (isTransfer ? '' : '-');
    const colorClass = isIncome ? 'income-color' : (isTransfer ? 'transfer-color' : 'expense-color');
    const { day, monthYear } = this.formatDateParts(tx.date);
    const catName = cleanCategoryName(tx.category || (isTransfer ? 'Giroconto' : 'Altro'));
    const catIcon = getCategoryIcon(tx.category || (isTransfer ? 'giroconto' : 'altro'), 14);

    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${tx.toAccount || 'Destinazione'}`
      : (tx.account || 'Buddybank');

    return `
      <div class="mov-table-row" data-id="${tx.id}">
        <div class="mov-col mov-col-date">
          <span>${day}</span>
          <span class="date-sub">${monthYear}</span>
        </div>

        <div class="mov-col mov-col-desc">
          <span class="desc-main" title="${tx.description}">${tx.description || 'Movimento'}</span>
          <span class="desc-account">${accountLabel}</span>
        </div>

        <div class="mov-col mov-col-cat">
          <span class="cat-pill" title="${catName}">
            <span style="display: inline-flex; flex-shrink: 0; color: var(--apple-blue);">${catIcon}</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${catName}</span>
          </span>
        </div>

        <div class="mov-col mov-col-amount">
          <span class="amount-val ${colorClass} privacy-mask">
            ${sign}${this.formatCurrency(tx.amount)}
          </span>
        </div>

        <div class="mov-col mov-col-actions">
          <button class="mov-delete-btn" data-id="${tx.id}" data-row="${tx.rowNumber || ''}" title="Elimina movimento">
            ${getIcon('trash', 14)}
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. VISTA ANALISI SINGOLA CATEGORIA (Deep Dive)
  // =========================================================================
  renderAnalisiView(categories) {
    const expenseCategories = categories.filter(c => c.type === 'expense');
    if ((!this.analysisCat || !expenseCategories.some(c => c.name === this.analysisCat)) && expenseCategories.length > 0) {
      this.analysisCat = expenseCategories[0].name;
    }

    const data = financeStore.getCategoryAnalytics(this.analysisCat, 12);

    return `
      <div class="mov-subview-stack">
        
        <!-- Category Selector Bar -->
        <div class="mov-selector-card">
          <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;">
            <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600;">Seleziona Categoria:</label>
            <div class="apple-select-wrapper" style="min-width: 220px;">
              <select id="single-cat-picker" class="apple-select">
                ${expenseCategories.map(c => `<option value="${c.name}" ${this.analysisCat === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <span class="badge badge--neutral">Trend Ultimi 12 Mesi</span>
        </div>

        <!-- 4 KPI Cards (Uniform 4-Zone Canonical Structure) -->
        <section class="grid-4">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Totale Speso negli Ultimi 12 Mesi">Totale Speso</span>
              <span class="badge badge--negative">${data.txCount} tx</span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(data.totalAmount)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Transazioni</span>
                <span class="kv__value">${data.txCount} censite</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Spesa cumulata 12 mesi</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Spesa Media Mensile">Media Mensile</span>
              <div class="kpi-icon-badge income">${getIcon('savings', 16)}</div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">${this.formatCurrency(data.avgMonthly)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Frequenza</span>
                <span class="kv__value">Mensile</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Spesa tipica al mese</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Spesa Singola Più Alta">Picco Più Alto</span>
              <div class="kpi-icon-badge balance">${getIcon('expense', 16)}</div>
            </div>
            <div class="card__value privacy-mask">${data.maxTx ? this.formatCurrency(data.maxTx.amount) : '€ 0,00'}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Dettaglio</span>
                <span class="kv__value" title="${data.maxTx ? `${data.maxTx.description} (${data.maxTx.date})` : 'Nessuna transazione'}">${data.maxTx ? data.maxTx.description : 'N/D'}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">${data.maxTx ? data.maxTx.date : 'Nessuna data'}</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Incidenza su Uscite Totali">Incidenza Totale</span>
              <span class="badge badge--purple">${data.impactPercent}%</span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-purple);">${data.impactPercent}%</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Saturazione budget</span>
                  <span class="meter__val">${data.impactPercent}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, data.impactPercent)}%; background: var(--apple-purple);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Delle tue uscite complessive</span>
            </div>
          </div>
        </section>

        <!-- Chart Card: Monthly Spending Trend (4 Canonical Zones) -->
        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Trend Mensile: ${cleanCategoryName(this.analysisCat)}">Trend Mensile: ${cleanCategoryName(this.analysisCat)}</span>
            <span class="badge badge--info">12 Mesi</span>
          </div>
          <div class="card__value privacy-mask" style="font-size: 20px;">
            ${this.formatCurrency(data.totalAmount)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">negli ultimi 12 mesi</small>
          </div>
          <div class="card__body" style="padding: var(--space-2) 0;">
            <div style="position: relative; width: 100%; height: 260px;">
              <canvas id="catTrendCanvas"></canvas>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Evoluzione delle uscite per questa categoria mese su mese</span>
          </div>
        </div>

        <!-- Filtered Table for this category -->
        <section class="card movimenti-table-wrapper" style="padding: 0; overflow: hidden;">
          <div style="padding: var(--space-4) var(--space-5) var(--space-2);">
            <h4 style="font-size: var(--text-base); font-weight: 700; color: var(--text-primary); margin: 0;">Ultime Spese Registrate in "${cleanCategoryName(this.analysisCat)}"</h4>
          </div>
          <div class="movimenti-table-header">
            <div class="mov-col mov-col-date">Data</div>
            <div class="mov-col mov-col-desc">Descrizione / Conto</div>
            <div class="mov-col mov-col-cat">Categoria</div>
            <div class="mov-col mov-col-amount">Importo</div>
            <div class="mov-col mov-col-actions"></div>
          </div>
          <div class="movimenti-table-body">
            ${data.transactions.length === 0 ? `
              <div class="mov-empty-state">
                <span class="empty-icon" style="color: var(--text-tertiary);">${getIcon('list', 36)}</span>
                <p>Nessun movimento trovato per la categoria ${cleanCategoryName(this.analysisCat)}</p>
              </div>
            ` : data.transactions.map(tx => this.renderTransactionRow(tx)).join('')}
          </div>
        </section>

      </div>
    `;
  }

  bindAnalisiEvents(container) {
    const picker = document.getElementById('single-cat-picker');
    if (picker) {
      picker.addEventListener('change', (e) => {
        this.analysisCat = e.target.value;
        this.render(container);
      });
    }

    container.querySelectorAll('.mov-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const row = e.currentTarget.dataset.row;
        this.handleDelete(id, row, container);
      });
    });
  }

  initAnalysisChart() {
    const canvas = document.getElementById('catTrendCanvas');
    if (!canvas || !window.Chart) return;

    const data = financeStore.getCategoryAnalytics(this.analysisCat, 12);
    const labels = data.monthlySeries.map(s => s.ym);
    const values = data.monthlySeries.map(s => s.val);

    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDark ? '#98989D' : '#86868B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

    const ctx = canvas.getContext('2d');
    this.analysisChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['Nessun dato'],
        datasets: [{
          label: cleanCategoryName(this.analysisCat),
          data: values.length > 0 ? values : [0],
          backgroundColor: 'rgba(0, 113, 227, 0.85)',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Spesa: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textColor,
              font: { size: 11, weight: '500' }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => '€' + v
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  // =========================================================================
  // 3. VISTA CONFRONTO CATEGORIE (Head-to-Head)
  // =========================================================================
  renderConfrontoView(categories) {
    const expenseCategories = categories.filter(c => c.type === 'expense');
    if ((!this.compareCatA || !expenseCategories.some(c => c.name === this.compareCatA)) && expenseCategories.length > 0) {
      this.compareCatA = expenseCategories[0].name;
    }
    if ((!this.compareCatB || !expenseCategories.some(c => c.name === this.compareCatB)) && expenseCategories.length > 1) {
      this.compareCatB = expenseCategories[1].name;
    }

    const comp = financeStore.compareCategories(this.compareCatA, this.compareCatB, 8);

    return `
      <div class="mov-subview-stack">

        <!-- Selector Row -->
        <div class="mov-compare-selector-card">
          <div class="mov-compare-selector-grid">
            <div class="cat-selector-group" style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600;">Categoria A:</label>
              <div class="apple-select-wrapper">
                <select id="compare-cat-a-picker" class="apple-select">
                  ${expenseCategories.map(c => `<option value="${c.name}" ${this.compareCatA === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <span class="mov-compare-vs-badge">VS</span>

            <div class="cat-selector-group" style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600;">Categoria B:</label>
              <div class="apple-select-wrapper">
                <select id="compare-cat-b-picker" class="apple-select">
                  ${expenseCategories.map(c => `<option value="${c.name}" ${this.compareCatB === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>
          <span class="badge badge--neutral">Trend 8 Mesi</span>
        </div>

        <!-- Head-to-Head Cards (Uniform 4-Zone Canonical Structure) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));">
          <div class="card ${comp.higher === this.compareCatA ? 'highlight-card' : ''}">
            <div class="card__header">
              <span class="card__title" title="${cleanCategoryName(this.compareCatA)}">${cleanCategoryName(this.compareCatA)}</span>
              <span class="badge ${comp.higher === this.compareCatA ? 'badge--negative' : 'badge--neutral'}">
                ${comp.higher === this.compareCatA ? 'Spesa Maggiore' : 'Spesa Minore'}
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(comp.catA.totalAmount)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Media mensile</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(comp.catA.avgMonthly)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Incidenza budget</span>
                <span class="kv__value">${comp.catA.impactPercent}%</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Cumulato 8 mensilità</span>
            </div>
          </div>

          <div class="card ${comp.higher === this.compareCatB ? 'highlight-card' : ''}">
            <div class="card__header">
              <span class="card__title" title="${cleanCategoryName(this.compareCatB)}">${cleanCategoryName(this.compareCatB)}</span>
              <span class="badge ${comp.higher === this.compareCatB ? 'badge--negative' : 'badge--neutral'}">
                ${comp.higher === this.compareCatB ? 'Spesa Maggiore' : 'Spesa Minore'}
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(comp.catB.totalAmount)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Media mensile</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(comp.catB.avgMonthly)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Incidenza budget</span>
                <span class="kv__value">${comp.catB.impactPercent}%</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Cumulato 8 mensilità</span>
            </div>
          </div>
        </section>

        <!-- Insight Card -->
        <div class="card" style="background: rgba(0, 113, 227, 0.05); border-color: rgba(0, 113, 227, 0.2);">
          <div class="card__header">
            <span class="card__title" title="Esito Analisi Comparativa" style="display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-blue); display: inline-flex;">${getIcon('sparkle', 16)}</span>
              <span>Verdetto Comparativo</span>
            </span>
            <span class="badge badge--info">+${comp.percentDiff}% Differenza</span>
          </div>
          <div class="card__body">
            <p style="font-size: var(--text-base); color: var(--text-primary); line-height: var(--leading-normal); margin: 0;">
              Nel periodo considerato, <strong>${cleanCategoryName(comp.higher)}</strong> supera l'altra categoria di una differenza netta di <strong class="privacy-mask">${this.formatCurrency(Math.abs(comp.deltaTotal))}</strong> (+${comp.percentDiff}%).
            </p>
          </div>
          <div class="card__footer">
            <span class="trend-context">Monitoraggio automatico scostamenti</span>
          </div>
        </div>

        <!-- Comparison Chart (4 Canonical Zones) -->
        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Confronto Mensile a Barre">Confronto Mensile a Barre</span>
            <span class="badge badge--info">Affiancato</span>
          </div>
          <div class="card__value" style="font-size: 20px;">
            ${cleanCategoryName(this.compareCatA)} <span style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">vs</span> ${cleanCategoryName(this.compareCatB)}
          </div>
          <div class="card__body" style="padding: var(--space-2) 0;">
            <div style="position: relative; width: 100%; height: 280px;">
              <canvas id="catCompareCanvas"></canvas>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Spesa affiancata per mese</span>
          </div>
        </div>

      </div>
    `;
  }

  bindConfrontoEvents(container) {
    const pickerA = document.getElementById('compare-cat-a-picker');
    const pickerB = document.getElementById('compare-cat-b-picker');

    if (pickerA) {
      pickerA.addEventListener('change', (e) => {
        this.compareCatA = e.target.value;
        this.render(container);
      });
    }
    if (pickerB) {
      pickerB.addEventListener('change', (e) => {
        this.compareCatB = e.target.value;
        this.render(container);
      });
    }
  }

  initCompareChart() {
    const canvas = document.getElementById('catCompareCanvas');
    if (!canvas || !window.Chart) return;

    const comp = financeStore.compareCategories(this.compareCatA, this.compareCatB, 8);
    const labels = comp.mergedSeries.map(s => s.ym);
    const valuesA = comp.mergedSeries.map(s => s.valA);
    const valuesB = comp.mergedSeries.map(s => s.valB);

    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDark ? '#98989D' : '#86868B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

    const ctx = canvas.getContext('2d');
    this.compareChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['Nessun dato'],
        datasets: [
          {
            label: cleanCategoryName(this.compareCatA),
            data: valuesA,
            backgroundColor: '#0071E3',
            borderRadius: 6
          },
          {
            label: cleanCategoryName(this.compareCatB),
            data: valuesB,
            backgroundColor: '#AF52DE',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { weight: '600', size: 12 },
              color: isDark ? '#F5F5F7' : '#1D1D1F'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textColor,
              font: { size: 11, weight: '500' }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => '€' + v
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  // =========================================================================
  // 4. VISTA BUDGET PREVENTIVO 50/30/20 & BUSTE DI SPESA
  // =========================================================================
  renderBudgetView() {
    const b = financeStore.getBudget50_30_20();

    const getSpendForCat = (canonicalName) => {
      let total = 0;
      Object.entries(b.catSpendMap || {}).forEach(([rawKey, val]) => {
        if (cleanCategoryName(rawKey).toLowerCase().includes(canonicalName.toLowerCase())) {
          total += val;
        }
      });
      return total;
    };

    const needsDefs = ['Alimentari', 'Casa', 'Auto', 'Trasporti', 'Utenze', 'Salute', 'Istruzione'];
    const needsCats = needsDefs.map(name => ({
      name,
      spent: getSpendForCat(name),
      icon: getCategoryIcon(name, 14)
    })).filter(c => c.spent > 0);

    const wantsDefs = ['Ristoranti', 'Shopping', 'Tecnologia', 'Fitness', 'Beauty', 'Viaggi', 'Svago', 'Altro'];
    const wantsCats = wantsDefs.map(name => ({
      name: name === 'Ristoranti' ? 'Ristoranti & Bar' : name,
      spent: getSpendForCat(name),
      icon: getCategoryIcon(name, 14)
    })).filter(c => c.spent > 0);

    return `
      <div class="mov-subview-stack">
        
        <!-- KPI Strip Budget (4-Zone Canonical Structure) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Entrate Nette del Mese">Entrate del Mese</span>
              <div class="kpi-icon-badge income">${getIcon('income', 16)}</div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-green);">${this.formatCurrency(b.monthlyIncome)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Base 50/30/20</span>
                <span class="kv__value">100% Entrate</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Base di calcolo della regola</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Budget Residuo Spese">Budget Residuo</span>
              <span class="badge ${b.totalRemaining > 0 ? 'badge--info' : 'badge--negative'}">
                ${b.totalRemaining > 0 ? 'Disponibile' : 'Esaurito'}
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: ${b.totalRemaining > 0 ? 'var(--apple-blue)' : 'var(--apple-red)'};">
              ${this.formatCurrency(b.totalRemaining)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Tetto complessivo</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(b.needs.target + b.wants.target)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Bisogni primari + Svago</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Spesa Sicura Giornaliera Stimata">Spesa Sicura Giornaliera</span>
              <span class="badge ${b.dailySafeSpend > 15 ? 'badge--positive' : 'badge--warning'}">
                ${b.daysRemaining} gg rimanenti
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: ${b.dailySafeSpend > 15 ? 'var(--apple-green)' : 'var(--apple-orange)'};">
              ${this.formatCurrency(b.dailySafeSpend)}<small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/giorno</small>
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Giorni al mese succ.</span>
                <span class="kv__value">${b.daysRemaining} giorni</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Per non sforare il target</span>
            </div>
          </div>
        </section>

        <!-- 3 Buste di Spesa 50/30/20 (4-Zone Canonical Structure) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));">
          
          <!-- Busta 1: Bisogni Primari (50%) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Bisogni Primari: Alloggio, Spesa, Mobilità">Bisogni Primari (50%)</span>
              <span class="badge ${b.needs.pct <= 100 ? 'badge--info' : 'badge--negative'}">
                ${b.needs.pct}% Utilizzato
              </span>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(b.needs.spent)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ ${this.formatCurrency(b.needs.target)}</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Avanzamento tetto 50%</span>
                  <span class="meter__val">${b.needs.pct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, b.needs.pct)}%; background: #0071E3;"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Ripartizione Spese:</span>
                ${needsCats.length > 0 ? needsCats.map(c => `
                  <div class="kv">
                    <span class="kv__label" style="display: inline-flex; align-items: center; gap: 6px;">
                      <span style="color: var(--apple-blue); display: inline-flex;">${c.icon}</span>
                      <span>${c.name}</span>
                    </span>
                    <span class="kv__value privacy-mask">${this.formatCurrency(c.spent)}</span>
                  </div>
                `).join('') : '<span style="font-size: 12px; color: var(--text-secondary);">Nessuna spesa registrata</span>'}
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">
                ${b.needs.remaining >= 0 ? `Residuo: ${this.formatCurrency(b.needs.remaining)}` : `Sforamento: -${this.formatCurrency(Math.abs(b.needs.remaining))}`}
              </span>
            </div>
          </div>

          <!-- Busta 2: Svago & Stile di Vita (30%) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Svago & Stile di Vita: Uscite, Shopping, Hobby">Svago & Stile di Vita (30%)</span>
              <span class="badge ${b.wants.pct <= 100 ? 'badge--warning' : 'badge--negative'}">
                ${b.wants.pct}% Utilizzato
              </span>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(b.wants.spent)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ ${this.formatCurrency(b.wants.target)}</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Avanzamento tetto 30%</span>
                  <span class="meter__val">${b.wants.pct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, b.wants.pct)}%; background: #FF9500;"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Ripartizione Spese:</span>
                ${wantsCats.length > 0 ? wantsCats.map(c => `
                  <div class="kv">
                    <span class="kv__label" style="display: inline-flex; align-items: center; gap: 6px;">
                      <span style="color: var(--apple-orange); display: inline-flex;">${c.icon}</span>
                      <span>${c.name}</span>
                    </span>
                    <span class="kv__value privacy-mask">${this.formatCurrency(c.spent)}</span>
                  </div>
                `).join('') : '<span style="font-size: 12px; color: var(--text-secondary);">Nessuna spesa registrata</span>'}
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">
                ${b.wants.remaining >= 0 ? `Residuo: ${this.formatCurrency(b.wants.remaining)}` : `Sforamento: -${this.formatCurrency(Math.abs(b.wants.remaining))}`}
              </span>
            </div>
          </div>

          <!-- Busta 3: Risparmio & Investimenti (20%) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Risparmio & Investimenti: PAC, XEON, Pensione">Risparmio & Futuro (20%)</span>
              <span class="badge badge--positive">
                ${b.savings.pct}% Raggiunto
              </span>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(b.savings.actual)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ ${this.formatCurrency(b.savings.target)}</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Target accantonamento</span>
                  <span class="meter__val">${b.savings.pct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, b.savings.pct)}%; background: var(--apple-green);"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Destinazione Risparmio:</span>
                <div class="kv">
                  <span class="kv__label">ETF VWCE + Pensione</span>
                  <span class="kv__value positive">In Accumulo</span>
                </div>
                <div class="kv">
                  <span class="kv__label">Liquidità Remunerata</span>
                  <span class="kv__value">XEON Overnight</span>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">
                ${b.savings.actual >= b.savings.target ? 'Target 20% pienamente centrato' : `Mancano ${this.formatCurrency(b.savings.target - b.savings.actual)} al target`}
              </span>
            </div>
          </div>

        </section>

      </div>
    `;
  }

  // =========================================================================
  // 5. MODALE NUOVO MOVIMENTO CON AUTO-AGGIUNTA E SMART RULES
  // =========================================================================
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
              <!-- Smart Suggestion Pill -->
              <div id="smart-prediction-container" style="display: none; margin-top: var(--space-text-title);">
                <span class="category-suggestion-pill" id="smart-prediction-pill">
                  <span id="smart-prediction-text"></span>
                </span>
              </div>
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
                  ${categories.map(c => `<option value="${c.name}">${cleanCategoryName(c.name)}</option>`).join('')}
                  <option value="__custom__">+ Crea nuova categoria...</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              <!-- Input Categoria Personalizzata al volo -->
              <div id="custom-cat-input-group" style="display: none; margin-top: var(--space-box-gap-xs);">
                <input type="text" id="form-custom-category-name" class="apple-input" placeholder="Nome nuova categoria (es. Sport & Tempo Libero)" />
                <div id="category-similar-hint" style="display: none; margin-top: var(--space-text-title);"></div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-account" id="form-account-label">Conto di Addebito</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-account" class="apple-select apple-input" required>
                  ${accounts.map(a => `<option value="${a.name}">${a.name} ${financeStore.isPrivacyMode() ? '' : `(${this.formatCurrency(a.balance)})`}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group" id="form-group-to-account" style="display: none;">
              <label class="form-label" for="form-to-account">Conto di Accredito (Destinazione)</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-to-account" class="apple-select apple-input">
                  ${accounts.map(a => `<option value="${a.name}">${a.name} ${financeStore.isPrivacyMode() ? '' : `(${this.formatCurrency(a.balance)})`}</option>`).join('')}
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

    // Supporto Autocategorizzazione Intelligente in Tempo Reale
    const descInput = document.getElementById('form-description');
    const catSelect = document.getElementById('form-category');
    const predContainer = document.getElementById('smart-prediction-container');
    const predText = document.getElementById('smart-prediction-text');

    if (descInput && catSelect) {
      descInput.addEventListener('input', () => {
        const val = descInput.value;
        const allTxs = financeStore.getTransactions();
        const prediction = smartCategorizer.predictCategory(val, allTxs, categories);
        if (prediction && prediction.category) {
          catSelect.value = prediction.category;
          const cleanName = cleanCategoryName(prediction.category);
          const iconSvg = getCategoryIcon(prediction.category, 14);
          if (predContainer && predText) {
            predText.innerHTML = `
              <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--apple-blue); font-weight: 500;">
                <span style="display: inline-flex;">${getIcon('sparkle', 14)}</span>
                <span>Autocategorizzato:</span>
                <strong style="color: var(--text-primary); display: inline-flex; align-items: center; gap: 4px; background: rgba(0,113,227,0.1); padding: 2px 8px; border-radius: 9999px;">
                  ${iconSvg} ${cleanName}
                </strong>
              </span>
            `;
            predContainer.style.display = 'block';
          }
        } else if (predContainer) {
          predContainer.style.display = 'none';
        }
      });
    }

    // Supporto Nuova Categoria Personalizzata & Apprendimento Automatico
    const customGroup = document.getElementById('custom-cat-input-group');
    const customInput = document.getElementById('form-custom-category-name');
    const similarHint = document.getElementById('category-similar-hint');

    if (catSelect) {
      catSelect.addEventListener('change', () => {
        if (catSelect.value === '__custom__') {
          if (customGroup) customGroup.style.display = 'block';
          if (customInput) customInput.focus();
        } else {
          if (customGroup) customGroup.style.display = 'none';
          if (descInput && descInput.value.trim().length >= 3) {
            smartCategorizer.learnAssociation(descInput.value, catSelect.value);
          }
        }
      });
    }

    if (customInput && similarHint) {
      customInput.addEventListener('input', () => {
        const query = customInput.value.trim();
        const similars = financeStore.findSimilarCategories(query);
        if (similars.length > 0) {
          similarHint.style.display = 'block';
          similarHint.innerHTML = `
            <span style="font-size: 11px; color: var(--apple-blue); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
              <span>Simile a "<strong>${cleanCategoryName(similars[0].name)}</strong>". Clicca per selezionare quella esistente.</span>
            </span>
          `;
          similarHint.onclick = () => {
            catSelect.value = similars[0].name;
            customGroup.style.display = 'none';
            similarHint.style.display = 'none';
          };
        } else {
          similarHint.style.display = 'none';
        }
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

    const viewSegmented = document.getElementById('mov-view-segmented');
    if (viewSegmented) {
      viewSegmented.querySelectorAll('.mov-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const mode = e.currentTarget.dataset.mode;
          if (mode && mode !== this.viewMode) {
            this.viewMode = mode;
            this.render(container);
          }
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

    const accountFilter = document.getElementById('mov-account-filter');
    if (accountFilter) {
      accountFilter.addEventListener('change', (e) => {
        this.filters.account = e.target.value;
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

    // Eliminazione transazioni sia da vista lista (.tx-del-btn) che da vista tabella (.mov-delete-btn)
    container.querySelectorAll('.tx-del-btn, .mov-delete-btn').forEach(btn => {
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
    const dateInput = document.getElementById('form-date');
    
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

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
    let category = document.getElementById('form-category')?.value;
    const account = document.getElementById('form-account')?.value;
    const toAccount = document.getElementById('form-to-account')?.value;

    const activeTypeBtn = document.querySelector('#form-type-toggle .segment-btn.active');
    const type = activeTypeBtn ? activeTypeBtn.dataset.type : 'expense';

    // Auto-aggiunta Categoria Personalizzata al volo
    if (category === '__custom__') {
      const customCatName = document.getElementById('form-custom-category-name')?.value.trim();
      if (customCatName) {
        financeStore.addCategory({ name: customCatName, type });
        category = customCatName;
      }
    }

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
      category: category || 'Giroconto',
      type,
      account,
      toAccount: type === 'transfer' ? toAccount : ''
    });

    // Apprende l'associazione per future autocategorizzazioni
    if (description && category && category !== '__custom__' && type !== 'transfer') {
      smartCategorizer.learnAssociation(description, category);
    }

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
