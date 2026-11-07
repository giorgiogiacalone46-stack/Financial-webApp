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
      sortBy: 'date-desc',
      period: 'all',     // 'all' | 'current_month' | 'last_30_days' | 'last_3_months' | 'last_6_months' | 'current_year' | 'custom'
      customFrom: '',
      customTo: ''
    };
    this.modalOpen = false;
    this.editingTxId = null; // null = nuovo movimento, string = id movimento in modifica
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

  parseDateObject(dateStr) {
    if (!dateStr) return null;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    }
    return null;
  }

  filterByPeriod(txs, period, customFrom, customTo) {
    const refDate = new Date(); // Data dinamica reale corrente

    return txs.filter(t => {
      const d = this.parseDateObject(t.date);
      if (!d) return true;

      switch (period) {
        case 'current_month':
          return d.getFullYear() === refDate.getFullYear() && d.getMonth() === refDate.getMonth();
        case 'last_30_days': {
          const past30 = new Date(refDate);
          past30.setDate(past30.getDate() - 30);
          return d >= past30 && d <= refDate;
        }
        case 'last_3_months': {
          const past90 = new Date(refDate);
          past90.setMonth(past90.getMonth() - 3);
          return d >= past90 && d <= refDate;
        }
        case 'last_6_months': {
          const past180 = new Date(refDate);
          past180.setMonth(past180.getMonth() - 6);
          return d >= past180 && d <= refDate;
        }
        case 'current_year':
          return d.getFullYear() === refDate.getFullYear();
        case 'custom': {
          if (customFrom) {
            const fromD = new Date(customFrom + 'T00:00:00');
            if (d < fromD) return false;
          }
          if (customTo) {
            const toD = new Date(customTo + 'T23:59:59');
            if (d > toD) return false;
          }
          return true;
        }
        default:
          return true;
      }
    });
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

    // Filtro per periodo di riferimento
    if (this.filters.period && this.filters.period !== 'all') {
      txs = this.filterByPeriod(txs, this.filters.period, this.filters.customFrom, this.filters.customTo);
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
          
          <div class="spese-header-toolbar movimenti-header-toolbar desk-only">
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

          <!-- Sotto-menu Segmentato Apple Workout Capsule -->
          <div class="movimenti-subtabs-bar">
            <nav class="movimenti-segmented-tabs" id="movimenti-subtabs">
              <button class="movimenti-tab-btn ${this.activeSubtab === 'elenco' ? 'active' : ''}" data-subtab="elenco">
                <span class="tab-icon">${getIcon('list', 15)}</span>
                <span class="tab-label">Elenco</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'analisi' ? 'active' : ''}" data-subtab="analisi">
                <span class="tab-icon">${getIcon('chart', 15)}</span>
                <span class="tab-label">Analisi</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'confronto' ? 'active' : ''}" data-subtab="confronto">
                <span class="tab-icon">${getIcon('conguaglio', 15)}</span>
                <span class="tab-label">Confronto</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'budget' ? 'active' : ''}" data-subtab="budget">
                <span class="tab-icon">${getIcon('target', 15)}</span>
                <span class="tab-label">Budget</span>
              </button>
            </nav>
          </div>

          <!-- Mobile Primary CTA Pill (Workout Style) -->
          <div class="mobile-only-block" style="margin-top: 8px;">
            <button type="button" class="cta-workout-btn" id="btn-add-tx-mobile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Nuovo Movimento</span>
            </button>
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

    container.querySelectorAll('#btn-add-tx-header, #btn-add-tx-mobile').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openModal();
      });
    });

    container.querySelectorAll('#btn-export-movimenti, #btn-export-movimenti-hero').forEach(exportBtn => {
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
    });
  }

  // =========================================================================
  // 1. VISTA ELENCO MOVIMENTI (Workout & LinkedIn Standard)
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

    const flowTotal = Math.max(stats.totalIncome + stats.totalExpense, 1);
    const incomePct = Math.round((stats.totalIncome / flowTotal) * 100);
    const expensePct = Math.max(0, 100 - incomePct);

    return `
      <!-- Monolithic Hero Card: Bilancio Flusso Cassa (Workout & LinkedIn Style) -->
      <section class="card hero-patrimonio-card movimenti-hero-card">
        <div class="hero-top-row">
          <div class="hero-title-group">
            <div class="hero-badge-row">
              <span class="hero-title-label">Saldo Flusso Periodo</span>
              <span class="badge ${stats.netFlow >= 0 ? 'badge--positive' : 'badge--negative'} hero-badge-tag">
                ${stats.netFlow >= 0 ? 'Surplus' : 'Deficit'}
              </span>
            </div>
            <div class="card__value privacy-mask hero-networth-val" style="color: ${stats.netFlow >= 0 ? '#30D158' : '#FF453A'};">
              ${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}
            </div>
          </div>
          <div class="hero-trend-wrap">
            <span class="trend-badge positive">
              ${stats.count} mov.
            </span>
            <button type="button" class="cashflow-link" id="btn-export-movimenti-hero" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;">
              Esporta CSV &rarr;
            </button>
          </div>
        </div>

        <!-- Segmented Allocation Bar: Entrate vs Uscite -->
        <div class="alloc-bar-track" title="Ripartizione Entrate vs Uscite">
          <div class="alloc-segment" style="width: ${Math.max(incomePct, 8)}%; background: #30D158;"></div>
          <div class="alloc-segment" style="width: ${Math.max(expensePct, 8)}%; background: #FF453A;"></div>
        </div>

        <!-- 3-Column Breakdown Legend -->
        <div class="alloc-legend">
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #30D158;"></span>
              <span class="legend-name">Entrate</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #30D158;">
              +${this.formatCurrency(stats.totalIncome)}
            </span>
          </div>
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #FF453A;"></span>
              <span class="legend-name">Uscite</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #FF453A;">
              -${this.formatCurrency(stats.totalExpense)}
            </span>
          </div>
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #0A84FF;"></span>
              <span class="legend-name">Operazioni</span>
            </div>
            <span class="legend-amount" style="color: #0A84FF;">
              ${stats.count} reg.
            </span>
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

        <!-- Filter Dropdowns Row: Period, Category, Account, Sort -->
        <div class="mov-controls-filters">
          <div class="apple-select-wrapper">
            <select id="mov-period-filter" class="apple-select">
              <option value="all" ${this.filters.period === 'all' ? 'selected' : ''}>Tutto lo Storico</option>
              <option value="current_month" ${this.filters.period === 'current_month' ? 'selected' : ''}>Mese Corrente</option>
              <option value="last_30_days" ${this.filters.period === 'last_30_days' ? 'selected' : ''}>Ultimi 30 Giorni</option>
              <option value="last_3_months" ${this.filters.period === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
              <option value="last_6_months" ${this.filters.period === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
              <option value="current_year" ${this.filters.period === 'current_year' ? 'selected' : ''}>Anno Corrente</option>
              <option value="custom" ${this.filters.period === 'custom' ? 'selected' : ''}>Intervallo Personalizzato...</option>
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

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

          <span class="badge badge--neutral desk-only" style="margin-left: auto; font-variant-numeric: tabular-nums;">
            ${stats.count} movimenti
          </span>
        </div>

        <!-- Custom Date Range Bar (Conditional) -->
        ${this.filters.period === 'custom' ? `
          <div class="mov-custom-date-row" style="display: flex; align-items: center; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 12px; font-weight: 600;">Dal:</label>
              <input type="date" id="mov-custom-from" class="apple-input" style="padding: 4px 10px; font-size: 13px; height: 32px;" value="${this.filters.customFrom || ''}" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 12px; font-weight: 600;">Al:</label>
              <input type="date" id="mov-custom-to" class="apple-input" style="padding: 4px 10px; font-size: 13px; height: 32px;" value="${this.filters.customTo || ''}" />
            </div>
            <button class="apple-btn-secondary" id="btn-apply-custom-dates" style="height: 32px; padding: 0 12px; font-size: 12px;">
              Applica Filtro Date
            </button>
          </div>
        ` : ''}
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

    let destLabel = tx.toAccount || 'Destinazione';
    if (isTransfer && tx.toAccount) {
      if (tx.brokerDestinationType === 'asset' && (tx.targetHoldingTicker || tx.targetHoldingName)) {
        destLabel += ` (${tx.targetHoldingTicker || tx.targetHoldingName})`;
      } else if (tx.brokerDestinationType === 'cash') {
        destLabel += ' (Liquidità)';
      }
    }
    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${destLabel}`
      : (tx.account || 'Buddybank');

    return `
      <div class="tx-apple-row tx-interactive-row" data-id="${tx.id}" style="cursor: pointer;" title="Clicca per visualizzare dettagli e modificare">
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

    let destLabel = tx.toAccount || 'Destinazione';
    if (isTransfer && tx.toAccount) {
      if (tx.brokerDestinationType === 'asset' && (tx.targetHoldingTicker || tx.targetHoldingName)) {
        destLabel += ` (${tx.targetHoldingTicker || tx.targetHoldingName})`;
      } else if (tx.brokerDestinationType === 'cash') {
        destLabel += ' (Liquidità)';
      }
    }
    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${destLabel}`
      : (tx.account || 'Buddybank');

    return `
      <div class="mov-table-row tx-interactive-row" data-id="${tx.id}" style="cursor: pointer;" title="Clicca per visualizzare dettagli e modificare">
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
          <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; flex: 1 1 auto; min-width: 0;">
            <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600; white-space: nowrap;">Seleziona Categoria:</label>
            <div class="apple-select-wrapper" style="min-width: 220px; max-width: 100%;">
              <select id="single-cat-picker" class="apple-select" style="width: 100% !important; padding-right: 34px !important;">
                ${expenseCategories.map(c => `<option value="${c.name}" ${this.analysisCat === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <span class="badge badge--neutral">Trend Ultimi 12 Mesi</span>
        </div>

        <!-- Monolithic Hero Card: Analisi Categoria (Workout Style) -->
        <section class="card hero-patrimonio-card">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">Totale Speso • ${cleanCategoryName(this.analysisCat)}</span>
                <span class="badge badge--negative hero-badge-tag">${data.txCount} tx</span>
              </div>
              <div class="card__value privacy-mask hero-networth-val" style="color: #FF453A;">
                ${this.formatCurrency(data.totalAmount)}
              </div>
            </div>
            <div class="hero-trend-wrap">
              <span class="trend-badge positive">
                ${data.impactPercent}% totale
              </span>
            </div>
          </div>

          <div class="alloc-bar-track">
            <div class="alloc-segment" style="width: ${Math.max(8, Math.min(100, data.impactPercent))}%; background: #FF453A;"></div>
            <div class="alloc-segment" style="width: ${Math.max(8, 100 - Math.min(100, data.impactPercent))}%; background: #0A84FF;"></div>
          </div>

          <div class="alloc-legend">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #0A84FF;"></span>
                <span class="legend-name">Media/Mese</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #0A84FF;">
                ${this.formatCurrency(data.avgMonthly)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #FF9F0A;"></span>
                <span class="legend-name">Picco Max</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #FF9F0A;">
                ${data.maxTx ? this.formatCurrency(data.maxTx.amount) : '€ 0,00'}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #AF52DE;"></span>
                <span class="legend-name">Incidenza</span>
              </div>
              <span class="legend-amount" style="color: #AF52DE;">
                ${data.impactPercent}% uscite
              </span>
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
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(10, 132, 255, 0.28)');
    gradient.addColorStop(1, 'rgba(10, 132, 255, 0.0)');

    this.analysisChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length > 0 ? labels : ['Nessun dato'],
        datasets: [{
          label: cleanCategoryName(this.analysisCat),
          data: values.length > 0 ? values : [0],
          borderColor: '#0A84FF',
          backgroundColor: gradient,
          borderWidth: 2.8,
          fill: true,
          tension: 0.42,
          cubicInterpolationMode: 'monotone',
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHitRadius: 14,
          pointBackgroundColor: '#0A84FF'
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

    const voucherAcc = accounts.find(a => a.id === 'buoni_pasto' || (a.name || '').toLowerCase().includes('buoni pasto'));
    const voucherBalance = voucherAcc ? (parseFloat(voucherAcc.balance) || 0) : 0;

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

            <div class="form-group" style="width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box; overflow: hidden;">
              <label class="form-label" for="form-date">Data</label>
              <input type="date" id="form-date" class="apple-input" style="width: 100% !important; max-width: 100% !important; min-width: 0 !important; box-sizing: border-box !important;" required />
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
              <label class="form-label" for="form-to-account" id="form-to-account-label">Conto di Accredito (Destinazione)</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-to-account" class="apple-select apple-input">
                  ${accounts.map(a => `<option value="${a.name}">${a.name} ${financeStore.isPrivacyMode() ? '' : `(${this.formatCurrency(a.balance)})`}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <!-- Apple Broker Allocation: Liquidità (Cash) vs Asset già attivi -->
            <div class="form-group" id="form-group-broker-allocation" style="display: none; margin-top: var(--space-box-gap-xs);">
              <div style="padding: 13px 15px; background: rgba(0, 113, 227, 0.05); border: 1px solid rgba(0, 113, 227, 0.20); border-radius: 14px; display: flex; flex-direction: column; gap: 11px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 15px;">📈</span>
                    <strong style="font-size: 13px; color: var(--text-primary);">Destinazione su <span id="broker-alloc-name">Trade Republic</span></strong>
                  </div>
                  <span class="badge badge--info" style="font-size: 10px;">Opzione Broker</span>
                </div>

                <!-- Segmented Control: Liquidità vs Asset -->
                <div class="segmented-control" id="broker-alloc-type-toggle" style="display: flex; width: 100%; background: var(--bg-card); padding: 3px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                  <button type="button" class="segment-btn active" data-alloctype="cash" style="flex: 1; font-size: 12px; padding: 6px 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <span>💵</span> Liquidità (Cash)
                  </button>
                  <button type="button" class="segment-btn" data-alloctype="asset" style="flex: 1; font-size: 12px; padding: 6px 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <span>📊</span> Asset già attivo
                  </button>
                </div>

                <!-- Sotto-selettore Asset già attivo -->
                <div id="broker-asset-selector-group" style="display: none; flex-direction: column; gap: 6px;">
                  <label class="form-label" for="form-broker-target-asset" style="font-size: 11.5px; margin: 0; color: var(--text-secondary);">Strumento / ETF attivo:</label>
                  <div class="apple-select-wrapper form-select-wrapper">
                    <select id="form-broker-target-asset" class="apple-select apple-input" style="font-size: 13px;">
                    </select>
                    <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <span id="broker-asset-hint" style="font-size: 11px; color: var(--apple-blue); margin-top: 2px;"></span>
                </div>

                <!-- Info Box Liquidità Cash del Broker -->
                <div id="broker-cash-info-group" style="font-size: 11.5px; color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                  <span>Liquidità non investita (Cash):</span>
                  <strong id="broker-current-cash-badge" style="color: var(--apple-green); font-variant-numeric: tabular-nums;">0,00 €</strong>
                </div>
              </div>
            </div>

            <!-- Apple Live Transfer Preview Card -->
            <div id="form-transfer-preview-card" style="display: none; margin-top: var(--space-box-gap-xs); padding: 12px 14px; border-radius: 14px; background: rgba(0, 113, 227, 0.06); border: 1px solid rgba(0, 113, 227, 0.16); transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--apple-blue); display: flex; align-items: center; gap: 6px;">
                  ${getIcon('giroconto', 14)} Impatto Saldi in Tempo Reale
                </span>
                <span id="transfer-preview-status-badge" class="badge badge--info" style="font-size: 10px;">Giroconto</span>
              </div>
              <div id="transfer-preview-content" style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;"></div>
            </div>

            <!-- Apple Pagamento Misto Spesa Alimentare (Buoni Pasto + Carta) -->
            <div class="form-group" id="form-group-split-bp" style="display: block; margin-top: var(--space-box-gap-xs);">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(255, 149, 0, 0.08); border: 1px solid rgba(255, 149, 0, 0.22); border-radius: 14px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                  <span style="font-size: 20px; flex-shrink: 0;">🛍️</span>
                  <div style="min-width: 0;">
                    <strong style="font-size: 13.5px; color: var(--text-primary); display: block;">Pagamento Misto Buoni Pasto</strong>
                    <span style="font-size: 11.5px; color: var(--text-secondary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Quota Buoni Pasto (${this.formatCurrency(voucherBalance)} disp.) + residuo Buddybank</span>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva pagamento con Buoni Pasto + Carta" style="flex-shrink: 0; margin-left: 8px;">
                  <input type="checkbox" id="form-toggle-split-bp" />
                  <span class="switch-slider"></span>
                </label>
              </div>

              <!-- Sezione Calcolatore Buoni Pasto (visibile quando toggle è attivo) -->
              <div id="split-bp-calculator-box" style="display: none; padding: 14px 16px; background: var(--bg-card-subtle); border-radius: 14px; border: 1px solid var(--border-subtle); margin-bottom: 12px;">
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label class="form-label" style="margin: 0; font-size: 12px; font-weight: 600;">Quota Buoni Pasto (€)</label>
                    <span style="font-size: 11px; color: var(--apple-orange); font-weight: 600;" id="bp-available-badge">Disponibili: ${this.formatCurrency(voucherBalance)}</span>
                  </div>
                  <input type="number" id="form-split-voucher-amount" class="apple-input" placeholder="0,00" step="0.01" min="0" />
                </div>

                <!-- Quick Buttons Buoni (8€ ciascuno) -->
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="1" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+1 Buono (8€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="2" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+2 (16€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="3" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+3 (24€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="4" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+4 (32€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp-reset" id="btn-split-bp-reset" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px; color: var(--apple-red);">Azzera</button>
                </div>

                <!-- Live Split Breakdown -->
                <div id="split-live-breakdown" style="padding: 10px 12px; background: rgba(0, 113, 227, 0.06); border-radius: 10px; border: 1px solid rgba(0, 113, 227, 0.15); font-size: 12px; display: flex; flex-direction: column; gap: 5px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">🏷️ Quota Buoni Pasto:</span>
                    <strong style="color: var(--apple-orange); font-variant-numeric: tabular-nums;" id="split-preview-voucher">0,00 €</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">💳 Residuo Addebito (<span id="split-card-name">Buddybank</span>):</span>
                    <strong style="color: var(--apple-blue); font-variant-numeric: tabular-nums;" id="split-preview-card">0,00 €</strong>
                  </div>
                </div>
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

    const sheet = document.getElementById('modal-sheet');
    const handle = sheet ? sheet.querySelector('.modal-handle') : null;
    if (handle) {
      handle.addEventListener('click', () => this.closeModal());
    }

    // Gestione swipe verso il basso per chiudere il foglio modale (Apple Sheet Dismiss)
    // Previene il pull-to-refresh nativo di Safari con preventDefault su movimento verso il basso
    const dragTargets = [handle, sheet?.querySelector('.modal-header')].filter(Boolean);
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isDraggingSheet = false;

    dragTargets.forEach(el => {
      el.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchCurrentY = touchStartY;
        isDraggingSheet = true;
        if (sheet) sheet.style.transition = 'none';
      }, { passive: true });

      el.addEventListener('touchmove', (e) => {
        if (!isDraggingSheet || !sheet) return;
        touchCurrentY = e.touches[0].clientY;
        const diffY = touchCurrentY - touchStartY;
        if (diffY > 0) {
          // Movimento verso il basso: blocca il pull-to-refresh nativo di Safari
          if (e.cancelable) e.preventDefault();
          sheet.style.transform = `translateY(${diffY}px)`;
        }
      }, { passive: false });

      el.addEventListener('touchend', () => {
        if (!isDraggingSheet || !sheet) return;
        isDraggingSheet = false;
        const diffY = touchCurrentY - touchStartY;
        sheet.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        if (diffY > 65) {
          sheet.style.transform = 'translateY(100%)';
          setTimeout(() => {
            this.closeModal();
            sheet.style.transform = '';
          }, 220);
        } else {
          sheet.style.transform = '';
        }
      }, { passive: true });
    });

    const saveBtn = document.getElementById('modal-save');
    if (saveBtn) saveBtn.addEventListener('click', (e) => { e.preventDefault(); this.handleSave(container); });

    const typeToggle = document.getElementById('form-type-toggle');
    const toAccGroup = document.getElementById('form-group-to-account');
    const catGroup = document.getElementById('form-group-category');
    const accLabel = document.getElementById('form-account-label');
    const formAccount = document.getElementById('form-account');
    const formToAccount = document.getElementById('form-to-account');
    const formAmount = document.getElementById('form-amount');

    const updateTransferPreview = () => {
      const activeBtn = typeToggle?.querySelector('.segment-btn.active');
      const isTransfer = activeBtn?.dataset.type === 'transfer';
      const previewCard = document.getElementById('form-transfer-preview-card');
      const previewContent = document.getElementById('transfer-preview-content');
      const previewBadge = document.getElementById('transfer-preview-status-badge');

      if (!isTransfer || !previewCard || !previewContent) {
        if (previewCard) previewCard.style.display = 'none';
        return;
      }

      previewCard.style.display = 'block';
      const fromName = formAccount?.value || '';
      const toName = formToAccount?.value || '';
      const amt = parseFloat(formAmount?.value || 0);

      const fromAcc = financeStore.findAccount(fromName);
      const toAcc = financeStore.findAccount(toName);

      const brokerAllocGroup = document.getElementById('form-group-broker-allocation');
      const brokerAllocName = document.getElementById('broker-alloc-name');
      const brokerCashBadge = document.getElementById('broker-current-cash-badge');
      const brokerCashInfo = document.getElementById('broker-cash-info-group');
      const brokerAssetGroup = document.getElementById('broker-asset-selector-group');
      const brokerTargetAsset = document.getElementById('form-broker-target-asset');
      const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
      const activeAllocBtn = brokerAllocToggle?.querySelector('.segment-btn.active');
      const allocType = activeAllocBtn?.dataset.alloctype || 'cash';

      const isBroker = toAcc && (toAcc.isBroker || toAcc.isInvestment || (Array.isArray(toAcc.holdings) && toAcc.holdings.length > 0));

      if (isTransfer && isBroker && brokerAllocGroup) {
        brokerAllocGroup.style.display = 'block';
        if (brokerAllocName) brokerAllocName.textContent = toAcc.name;
        if (brokerCashBadge) brokerCashBadge.textContent = this.formatCurrency(toAcc.cashBalance || 0);

        if (allocType === 'asset') {
          if (brokerAssetGroup) brokerAssetGroup.style.display = 'flex';
          if (brokerCashInfo) brokerCashInfo.style.display = 'none';
        } else {
          if (brokerAssetGroup) brokerAssetGroup.style.display = 'none';
          if (brokerCashInfo) brokerCashInfo.style.display = 'flex';
        }
      } else if (brokerAllocGroup) {
        brokerAllocGroup.style.display = 'none';
      }

      if (!fromAcc || !toAcc || fromAcc.name === toAcc.name) {
        if (previewBadge) {
          previewBadge.className = 'badge badge--negative';
          previewBadge.textContent = 'Errore';
        }
        previewCard.style.background = 'rgba(255, 59, 48, 0.08)';
        previewCard.style.borderColor = 'rgba(255, 59, 48, 0.28)';
        previewContent.innerHTML = `
          <div style="color: var(--apple-red); font-weight: 600; font-size: 11.5px; display: flex; align-items: center; gap: 6px; padding: 2px 0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Il conto di partenza e di arrivo non possono coincidere. Seleziona due conti distinti.</span>
          </div>
        `;
        return;
      }

      previewCard.style.background = 'rgba(0, 113, 227, 0.06)';
      previewCard.style.borderColor = 'rgba(0, 113, 227, 0.16)';
      if (previewBadge) {
        previewBadge.className = 'badge badge--info';
        previewBadge.textContent = amt > 0 ? 'Valido' : 'Inserisci Importo';
      }

      const fromOld = parseFloat(fromAcc.balance) || 0;
      const fromNew = Math.round((fromOld - amt) * 100) / 100;
      const toOld = parseFloat(toAcc.balance) || 0;
      const toNew = Math.round((toOld + amt) * 100) / 100;

      let destRowHtml = '';
      if (isBroker && allocType === 'asset') {
        const selOpt = brokerTargetAsset?.selectedOptions?.[0];
        const hId = selOpt?.value;
        const h = (toAcc.holdings || []).find(x => x.id === hId) || toAcc.holdings?.[0];
        const hOld = h ? (parseFloat(h.currentValue) || 0) : 0;
        const hNew = Math.round((hOld + amt) * 100) / 100;
        const hLabel = h ? (h.ticker || h.name) : 'Asset';

        destRowHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
            <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong> ➔ <span style="color: var(--apple-blue); font-weight: 600;">Asset ${hLabel}</span>
            </span>
            <span style="font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(hOld)} ➔ <strong style="color: var(--apple-blue);">${this.formatCurrency(hNew)}</strong>
            </span>
          </div>
          <div style="font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between; padding: 2px 0 0 16px;">
            <span>Totale complessivo ${toAcc.name}:</span>
            <span>${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong></span>
          </div>
        `;
      } else if (isBroker && allocType === 'cash') {
        const cashOld = parseFloat(toAcc.cashBalance) || 0;
        const cashNew = Math.round((cashOld + amt) * 100) / 100;

        destRowHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
            <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong> ➔ <span style="color: var(--apple-green); font-weight: 600;">Liquidità (Cash)</span>
            </span>
            <span style="font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(cashOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(cashNew)}</strong>
            </span>
          </div>
          <div style="font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between; padding: 2px 0 0 16px;">
            <span>Totale complessivo ${toAcc.name}:</span>
            <span>${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong></span>
          </div>
        `;
      } else {
        destRowHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
            <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong>
            </span>
            <span style="font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong>
            </span>
          </div>
        `;
      }

      previewContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0;">
          <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
            <span style="color: var(--apple-red); font-weight: 600;">📤 Origine:</span> <strong>${fromAcc.name}</strong>
          </span>
          <span style="font-variant-numeric: tabular-nums;">
            ${this.formatCurrency(fromOld)} ➔ <strong style="color: var(--apple-red);">${this.formatCurrency(fromNew)}</strong>
          </span>
        </div>
        ${destRowHtml}
        <div style="margin-top: 3px; padding-top: 3px; border-top: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between;">
          <span>Variazione Net Worth complessivo:</span>
          <strong style="color: var(--text-secondary);">± 0,00 € (Trasferimento interno)</strong>
        </div>
      `;
    };

    const populateBrokerAssets = (toAcc, preferredHoldingId) => {
      const brokerTargetAsset = document.getElementById('form-broker-target-asset');
      const brokerAssetHint = document.getElementById('broker-asset-hint');
      if (!brokerTargetAsset || !toAcc) return;

      const holdings = Array.isArray(toAcc.holdings) ? toAcc.holdings : [];
      if (holdings.length === 0) {
        brokerTargetAsset.innerHTML = '<option value="">Nessun asset attivo (allocazione automatica su Liquidità Cash)</option>';
        if (brokerAssetHint) brokerAssetHint.textContent = '';
        return;
      }

      brokerTargetAsset.innerHTML = holdings.map(h => `
        <option value="${h.id}" data-ticker="${h.ticker || ''}" data-name="${h.name || ''}" data-value="${h.currentValue || 0}" ${preferredHoldingId && (preferredHoldingId === h.id || preferredHoldingId === h.ticker) ? 'selected' : ''}>
          ${h.ticker ? `${h.ticker} — ` : ''}${h.name || 'Strumento'} (${this.formatCurrency(h.currentValue || 0)})
        </option>
      `).join('');

      const selOpt = brokerTargetAsset.selectedOptions?.[0];
      const selVal = parseFloat(selOpt?.dataset.value || 0);
      if (brokerAssetHint) {
        brokerAssetHint.textContent = `Valore attuale strumento: ${this.formatCurrency(selVal)}`;
      }
    };

    this._populateBrokerAssets = populateBrokerAssets;
    this._updateTransferPreview = updateTransferPreview;

    const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
    if (brokerAllocToggle) {
      brokerAllocToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          brokerAllocToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          updateTransferPreview();
        });
      });
    }

    const brokerTargetAsset = document.getElementById('form-broker-target-asset');
    if (brokerTargetAsset) {
      brokerTargetAsset.addEventListener('change', () => {
        const selOpt = brokerTargetAsset.selectedOptions?.[0];
        const selVal = parseFloat(selOpt?.dataset.value || 0);
        const brokerAssetHint = document.getElementById('broker-asset-hint');
        if (brokerAssetHint) {
          brokerAssetHint.textContent = `Valore attuale strumento: ${this.formatCurrency(selVal)}`;
        }
        updateTransferPreview();
      });
    }

    if (typeToggle) {
      typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          typeToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const currentType = e.currentTarget.dataset.type;

          if (toAccGroup) {
            toAccGroup.style.display = currentType === 'transfer' ? 'block' : 'none';
          }
          if (catGroup) {
            catGroup.style.display = currentType === 'transfer' ? 'none' : 'block';
          }
          if (accLabel) {
            accLabel.textContent = currentType === 'transfer' ? 'Conto di Origine (Preleva da)' : (currentType === 'income' ? 'Conto Accredito' : 'Conto Addebito');
          }

          if (splitBpGroup) {
            splitBpGroup.style.display = currentType === 'expense' ? 'block' : 'none';
            if (currentType !== 'expense' && splitToggle) {
              splitToggle.checked = false;
              if (splitCalcBox) splitCalcBox.style.display = 'none';
            }
          }

          // Se è giroconto e il conto di destinazione coincide con l'origine, auto-seleziona il successivo
          if (currentType === 'transfer' && formAccount && formToAccount) {
            if (formAccount.value === formToAccount.value) {
              const diffAcc = accounts.find(a => a.name !== formAccount.value);
              if (diffAcc) formToAccount.value = diffAcc.name;
            }
          }

          updateTransferPreview();
        });
      });
    }

    if (formAccount) formAccount.addEventListener('change', () => {
      const activeBtn = typeToggle?.querySelector('.segment-btn.active');
      if (activeBtn?.dataset.type === 'transfer' && formToAccount && formAccount.value === formToAccount.value) {
        const diffAcc = accounts.find(a => a.name !== formAccount.value);
        if (diffAcc) formToAccount.value = diffAcc.name;
      }
      updateTransferPreview();
    });

    if (formToAccount) formToAccount.addEventListener('change', () => {
      const toAcc = financeStore.findAccount(formToAccount.value);
      if (toAcc && typeof populateBrokerAssets === 'function') populateBrokerAssets(toAcc);
      updateTransferPreview();
    });
    if (formAmount) formAmount.addEventListener('input', () => {
      updateTransferPreview();
      if (typeof updateSplitBreakdown === 'function') updateSplitBreakdown();
    });

    // === GESTIONE PAGAMENTO MISTO BUONI PASTO ===
    const splitBpGroup = document.getElementById('form-group-split-bp');
    const splitToggle = document.getElementById('form-toggle-split-bp');
    const splitCalcBox = document.getElementById('split-bp-calculator-box');
    const splitVoucherInput = document.getElementById('form-split-voucher-amount');
    const splitPreviewVoucher = document.getElementById('split-preview-voucher');
    const splitPreviewCard = document.getElementById('split-preview-card');
    const splitCardName = document.getElementById('split-card-name');

    const updateSplitBreakdown = () => {
      const tot = parseFloat(formAmount?.value) || 0;
      const vAmt = parseFloat(splitVoucherInput?.value) || 0;
      const clampedVoucher = Math.min(tot, Math.max(0, vAmt));
      const cardResidual = Math.max(0, Math.round((tot - clampedVoucher) * 100) / 100);

      if (splitPreviewVoucher) splitPreviewVoucher.textContent = this.formatCurrency(clampedVoucher);
      if (splitPreviewCard) splitPreviewCard.textContent = this.formatCurrency(cardResidual);
      if (splitCardName && formAccount) splitCardName.textContent = formAccount.value;
    };

    if (splitToggle && splitCalcBox) {
      splitToggle.addEventListener('change', () => {
        if (splitToggle.checked) {
          splitCalcBox.style.display = 'block';
          const tot = parseFloat(formAmount?.value) || 0;
          if ((!splitVoucherInput.value || parseFloat(splitVoucherInput.value) === 0) && tot > 0) {
            const possibleVouchers = Math.min(voucherBalance, Math.floor(tot / 8) * 8);
            splitVoucherInput.value = possibleVouchers > 0 ? possibleVouchers : (tot <= 8 ? tot : 8);
          }
          updateSplitBreakdown();
        } else {
          splitCalcBox.style.display = 'none';
        }
      });
    }

    if (splitVoucherInput) {
      splitVoucherInput.addEventListener('input', updateSplitBreakdown);
    }

    if (formAccount) {
      formAccount.addEventListener('change', () => {
        if (splitCardName) splitCardName.textContent = formAccount.value;
      });
    }

    modalRoot.querySelectorAll('.btn-quick-bp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const count = parseInt(btn.dataset.vouchercount, 10) || 1;
        const targetVal = count * 8;
        const tot = parseFloat(formAmount?.value) || 0;
        const allowedVal = tot > 0 ? Math.min(tot, targetVal) : targetVal;
        if (splitVoucherInput) {
          splitVoucherInput.value = Math.min(voucherBalance, allowedVal);
          updateSplitBreakdown();
        }
      });
    });

    const resetBpBtn = document.getElementById('btn-split-bp-reset');
    if (resetBpBtn) {
      resetBpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (splitVoucherInput) splitVoucherInput.value = '';
        updateSplitBreakdown();
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
        const qDesc = val.toLowerCase();
        const isGrocery = qDesc.includes('esselunga') || qDesc.includes('coop') || qDesc.includes('conad') || qDesc.includes('carrefour') || qDesc.includes('spesa') || qDesc.includes('supermercato') || qDesc.includes('lidl') || qDesc.includes('alimentar');
        const activeTypeBtn = typeToggle?.querySelector('.segment-btn.active');
        if (isGrocery && splitToggle && !splitToggle.checked && (!activeTypeBtn || activeTypeBtn.dataset.type === 'expense')) {
          splitToggle.checked = true;
          if (splitCalcBox) splitCalcBox.style.display = 'block';
          updateSplitBreakdown();
        }

        const allTxs = (typeof financeStore.getAllTransactions === 'function' 
          ? financeStore.getAllTransactions() 
          : (typeof financeStore.getTransactions === 'function' ? financeStore.getTransactions() : financeStore.transactions)) || [];
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

    const periodFilter = document.getElementById('mov-period-filter');
    if (periodFilter) {
      periodFilter.addEventListener('change', (e) => {
        this.filters.period = e.target.value;
        this.render(container);
      });
    }

    const applyCustomDatesBtn = document.getElementById('btn-apply-custom-dates');
    if (applyCustomDatesBtn) {
      applyCustomDatesBtn.addEventListener('click', () => {
        const fromInput = document.getElementById('mov-custom-from');
        const toInput = document.getElementById('mov-custom-to');
        this.filters.customFrom = fromInput ? fromInput.value : '';
        this.filters.customTo = toInput ? toInput.value : '';
        this.render(container);
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

    // Apertura Dettaglio/Modifica al click sulla riga movimento (sia vista Apple che tabella)
    container.querySelectorAll('.tx-interactive-row').forEach(row => {
      row.addEventListener('click', (e) => {
        // Se il click è sul pulsante elimina, non aprire il dettaglio
        if (e.target.closest('.tx-del-btn') || e.target.closest('.mov-delete-btn')) {
          return;
        }
        const txId = row.dataset.id;
        if (txId) {
          this.openDetailModal(txId, container);
        }
      });
    });

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

  openModal(txToEdit = null) {
    document.body.classList.add('modal-open');
    this.modalOpen = true;
    this.editingTxId = (txToEdit && txToEdit.id) ? txToEdit.id : null;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    const modalTitle = sheet ? sheet.querySelector('.modal-header h3') : null;
    const saveBtn = document.getElementById('modal-save');
    const dateInput = document.getElementById('form-date');
    const amountInput = document.getElementById('form-amount');
    const descInput = document.getElementById('form-description');
    const catSelect = document.getElementById('form-category');
    const accSelect = document.getElementById('form-account');
    const toAccSelect = document.getElementById('form-to-account');
    const toAccGroup = document.getElementById('form-group-to-account');
    const typeToggle = document.getElementById('form-type-toggle');
    const predContainer = document.getElementById('smart-prediction-container');

    if (modalTitle) {
      modalTitle.textContent = (txToEdit && txToEdit.id) ? 'Modifica Movimento' : 'Nuovo Movimento';
    }
    if (saveBtn) {
      saveBtn.textContent = (txToEdit && txToEdit.id) ? 'Aggiorna' : 'Salva';
    }
    if (predContainer) {
      predContainer.style.display = 'none';
    }

    if (txToEdit) {
      // Precompila campi con il movimento esistente
      if (amountInput) amountInput.value = parseFloat(txToEdit.amount || 0).toFixed(2);
      if (descInput) descInput.value = txToEdit.description || '';
      
      // Formatta la data per l'input date (YYYY-MM-DD)
      if (dateInput) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(txToEdit.date)) {
          const [d, m, y] = txToEdit.date.split('/');
          dateInput.value = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(txToEdit.date)) {
          dateInput.value = txToEdit.date;
        } else {
          dateInput.value = new Date().toISOString().split('T')[0];
        }
      }

      if (catSelect) catSelect.value = txToEdit.category || '';
      if (accSelect) accSelect.value = txToEdit.account || txToEdit.fromAccount || '';
      if (toAccSelect) toAccSelect.value = txToEdit.toAccount || '';

      if (typeToggle) {
        typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.type === (txToEdit.type || 'expense'));
        });
      }
      const isTransfer = txToEdit.type === 'transfer';
      const catGroup = document.getElementById('form-group-category');
      const accLabel = document.getElementById('form-account-label');
      if (toAccGroup) {
        toAccGroup.style.display = isTransfer ? 'block' : 'none';
      }
      if (catGroup) {
        catGroup.style.display = isTransfer ? 'none' : 'block';
      }
      if (accLabel) {
        accLabel.textContent = isTransfer ? 'Conto di Origine (Preleva da)' : (txToEdit.type === 'income' ? 'Conto Accredito' : 'Conto Addebito');
      }

      if (isTransfer && txToEdit.toAccount) {
        const toAcc = financeStore.findAccount(txToEdit.toAccount);
        if (toAcc && typeof this._populateBrokerAssets === 'function') {
          this._populateBrokerAssets(toAcc, txToEdit.targetHoldingId || txToEdit.targetHoldingTicker);
        }
        const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
        if (brokerAllocToggle) {
          brokerAllocToggle.querySelectorAll('.segment-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.alloctype === (txToEdit.brokerDestinationType || 'cash'));
          });
        }
      }

      if (typeof this._updateTransferPreview === 'function') {
        this._updateTransferPreview();
      }
    } else {
      // Reset campi per nuovo inserimento
      if (amountInput) amountInput.value = '';
      if (descInput) descInput.value = '';
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      if (catSelect) catSelect.value = '';
      if (typeToggle) {
        typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.type === 'expense');
        });
      }
      const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
      if (brokerAllocToggle) {
        brokerAllocToggle.querySelectorAll('.segment-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.alloctype === 'cash');
        });
      }
      const initialToAcc = financeStore.findAccount(toAccSelect?.value || 'Trade Republic');
      if (initialToAcc && typeof this._populateBrokerAssets === 'function') {
        this._populateBrokerAssets(initialToAcc);
      }
      const brokerAllocGroup = document.getElementById('form-group-broker-allocation');
      if (brokerAllocGroup) brokerAllocGroup.style.display = 'none';

      const catGroup = document.getElementById('form-group-category');
      const accLabel = document.getElementById('form-account-label');
      const previewCard = document.getElementById('form-transfer-preview-card');
      if (toAccGroup) toAccGroup.style.display = 'none';
      if (catGroup) catGroup.style.display = 'block';
      if (accLabel) accLabel.textContent = 'Conto di Addebito';
      if (previewCard) previewCard.style.display = 'none';
    }

    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    setTimeout(() => {
      if (amountInput) amountInput.focus();
    }, 280);
  }

  closeModal() {
    document.body.classList.remove('modal-open');
    this.modalOpen = false;
    this.editingTxId = null;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 260);
  }

  openDetailModal(txId, container) {
    const tx = financeStore.getAllTransactions().find(t => t.id === txId);
    if (!tx) return;

    document.body.classList.add('modal-open');

    // Crea o recupera il container dell'ispettore dettaglio
    let detailModal = document.getElementById('tx-detail-modal-root');
    if (!detailModal) {
      detailModal = document.createElement('div');
      detailModal.id = 'tx-detail-modal-root';
      document.body.appendChild(detailModal);
    }

    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    const sign = isIncome ? '+' : (isTransfer ? '' : '-');
    const amountColor = isIncome ? 'var(--apple-green)' : (isTransfer ? 'var(--apple-blue)' : 'var(--apple-red)');
    const typeLabel = isIncome ? 'Entrata / Accredito' : (isTransfer ? 'Giroconto tra Conti' : 'Uscita / Spesa');
    const catName = cleanCategoryName(tx.category || (isTransfer ? 'Giroconto' : 'Altro'));
    const catIcon = getCategoryIcon(tx.category || (isTransfer ? 'giroconto' : 'altro'), 22);
    const fullDate = this.formatDateFull(tx.date);

    detailModal.innerHTML = `
      <div class="apple-modal-overlay open" id="tx-detail-overlay">
        <div class="apple-modal-sheet open" id="tx-detail-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-3);">
            <button class="modal-close-btn" id="tx-detail-close">Chiudi</button>
            <h3 style="font-size: var(--text-base); font-weight: 700; margin: 0;">Scheda Movimento</h3>
            <button class="apple-btn-secondary" id="tx-detail-edit-btn" style="height: 32px; padding: 0 12px; font-size: 13px; font-weight: 600;">
              ${getIcon('edit', 13)} <span>Modifica</span>
            </button>
          </div>

          <div class="modal-body" style="padding: var(--space-4) var(--space-2); display: flex; flex-direction: column; gap: var(--space-4);">
            
            <!-- Amount & Title Hero Box -->
            <div style="text-align: center; padding: var(--space-3) var(--space-2); background: var(--bg-hover); border-radius: var(--radius-card); border: 1px solid var(--border-subtle);">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 9999px; background: rgba(0, 113, 227, 0.1); color: var(--apple-blue); margin-bottom: 8px;">
                ${catIcon}
              </div>
              <h2 class="privacy-mask" style="font-size: 32px; font-weight: 800; letter-spacing: -0.03em; color: ${amountColor}; margin: 0; font-variant-numeric: tabular-nums;">
                ${sign}${this.formatCurrency(tx.amount)}
              </h2>
              <p style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 6px 0 0 0;">
                ${tx.description || 'Movimento'}
              </p>
              <span class="badge ${isIncome ? 'badge--positive' : (isTransfer ? 'badge--info' : 'badge--neutral')}" style="margin-top: 8px;">
                ${typeLabel}
              </span>
            </div>

            <!-- KV Details List -->
            <div class="card" style="padding: var(--space-3) var(--space-4); margin: 0; background: var(--bg-card);">
              <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Data di Registrazione</span>
                <span class="kv__value" style="font-size: 13px; font-weight: 600;">${fullDate}</span>
              </div>

              <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Categoria</span>
                <span class="kv__value" style="font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                  <span style="color: var(--apple-blue); display: inline-flex;">${getCategoryIcon(tx.category, 14)}</span>
                  <span>${catName}</span>
                </span>
              </div>

              <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">${isTransfer ? 'Conto Origine' : 'Conto di Addebito/Accredito'}</span>
                <span class="kv__value" style="font-size: 13px; font-weight: 600;">${tx.account || tx.fromAccount || 'N/D'}</span>
              </div>

              ${isTransfer ? `
                <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                  <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Conto Destinazione</span>
                  <span class="kv__value" style="font-size: 13px; font-weight: 600;">
                    ${tx.toAccount || 'N/D'}
                    ${tx.brokerDestinationType === 'asset' && (tx.targetHoldingTicker || tx.targetHoldingName) ? ` ➔ <span style="color: var(--apple-blue);">Asset ${tx.targetHoldingTicker || tx.targetHoldingName}</span>` : (tx.brokerDestinationType === 'cash' ? ' ➔ <span style="color: var(--apple-green);">Liquidità Cash</span>' : '')}
                  </span>
                </div>
              ` : ''}

              <div class="kv" style="padding: 10px 0;">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Identificativo Interno</span>
                <span class="kv__value" style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">${tx.id}</span>
              </div>
            </div>

            <!-- Danger Zone: Delete Action inside detail -->
            <div style="display: flex; justify-content: center; margin-top: var(--space-2); margin-bottom: var(--space-4);">
              <button class="apple-btn-secondary" id="tx-detail-del-btn" style="color: var(--apple-red); border-color: rgba(255, 59, 48, 0.35); font-size: 13.5px; font-weight: 600; padding: 12px 20px; border-radius: var(--radius-pill); width: 100%; justify-content: center; background: rgba(255, 59, 48, 0.08);">
                ${getIcon('trash', 15)} <span>Elimina Movimento</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    `;

    const closeDetail = () => {
      document.body.classList.remove('modal-open');
      const sheet = document.getElementById('tx-detail-sheet');
      const ov = document.getElementById('tx-detail-overlay');
      if (sheet) sheet.classList.remove('open');
      setTimeout(() => {
        if (ov) ov.classList.remove('open');
        if (detailModal) detailModal.innerHTML = '';
      }, 240);
    };

    const closeBtn = document.getElementById('tx-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDetail);

    const overlay = document.getElementById('tx-detail-overlay');
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDetail(); });

    const detailSheet = document.getElementById('tx-detail-sheet');
    const detailHandle = detailSheet ? detailSheet.querySelector('.modal-handle') : null;
    if (detailHandle) detailHandle.addEventListener('click', closeDetail);

    // Swipe verso il basso per chiudere anche la scheda di dettaglio
    const detailDragTargets = [detailHandle, detailSheet?.querySelector('.modal-header')].filter(Boolean);
    let dTouchStartY = 0;
    let dTouchCurrentY = 0;
    let dIsDragging = false;

    detailDragTargets.forEach(el => {
      el.addEventListener('touchstart', (e) => {
        dTouchStartY = e.touches[0].clientY;
        dTouchCurrentY = dTouchStartY;
        dIsDragging = true;
        if (detailSheet) detailSheet.style.transition = 'none';
      }, { passive: true });

      el.addEventListener('touchmove', (e) => {
        if (!dIsDragging || !detailSheet) return;
        dTouchCurrentY = e.touches[0].clientY;
        const diffY = dTouchCurrentY - dTouchStartY;
        if (diffY > 0) {
          if (e.cancelable) e.preventDefault();
          detailSheet.style.transform = `translateY(${diffY}px)`;
        }
      }, { passive: false });

      el.addEventListener('touchend', () => {
        if (!dIsDragging || !detailSheet) return;
        dIsDragging = false;
        const diffY = dTouchCurrentY - dTouchStartY;
        detailSheet.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        if (diffY > 65) {
          detailSheet.style.transform = 'translateY(100%)';
          setTimeout(() => {
            closeDetail();
            detailSheet.style.transform = '';
          }, 220);
        } else {
          detailSheet.style.transform = '';
        }
      }, { passive: true });
    });

    const editBtn = document.getElementById('tx-detail-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        closeDetail();
        setTimeout(() => {
          this.openModal(tx);
        }, 260);
      });
    }

    const delBtn = document.getElementById('tx-detail-del-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (confirm(`Confermi l'eliminazione definitiva di questo movimento (${tx.description})?`)) {
          closeDetail();
          this.handleDelete(tx.id, tx.rowNumber, container);
        }
      });
    }
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

    if (type === 'transfer') {
      if (!toAccount || account.trim().toLowerCase() === toAccount.trim().toLowerCase()) {
        const toAccSelect = document.getElementById('form-to-account');
        if (toAccSelect) {
          toAccSelect.classList.add('shake');
          setTimeout(() => toAccSelect.classList.remove('shake'), 400);
        }
        alert('Attenzione: Il conto di partenza e il conto di arrivo non possono coincidere. Seleziona due conti differenti per eseguire il giroconto.');
        return;
      }
    }

    // Parametri opzionali di allocazione broker (Liquidità vs Asset già attivo)
    const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
    const activeAllocBtn = brokerAllocToggle?.querySelector('.segment-btn.active');
    const brokerDestinationType = activeAllocBtn?.dataset.alloctype || 'cash';
    const targetAssetSelect = document.getElementById('form-broker-target-asset');
    const selectedAssetOption = targetAssetSelect?.selectedOptions?.[0];
    const targetHoldingId = selectedAssetOption?.value || '';
    const targetHoldingTicker = selectedAssetOption?.dataset.ticker || '';
    const targetHoldingName = selectedAssetOption?.dataset.name || '';

    if (this.editingTxId) {
      // Modalità Modifica Movimento Esistente
      const updatedTx = financeStore.updateTransaction(this.editingTxId, {
        amount,
        description,
        date,
        category: category || 'Giroconto',
        type,
        account,
        toAccount: type === 'transfer' ? toAccount : '',
        brokerDestinationType: type === 'transfer' ? brokerDestinationType : undefined,
        targetHoldingId: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingId : undefined,
        targetHoldingTicker: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingTicker : undefined,
        targetHoldingName: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingName : undefined
      });

      if (description && category && category !== '__custom__' && type !== 'transfer') {
        smartCategorizer.learnAssociation(description, category);
      }

      if (updatedTx && updatedTx.rowNumber && googleSheetsService.isConfigured()) {
        googleSheetsService.updateTransaction(updatedTx.rowNumber, updatedTx).catch(err => console.warn('Update fallita:', err));
      }
    } else {
      // Modalità Nuovo Movimento
      const isSplitActive = document.getElementById('form-toggle-split-bp')?.checked;
      const voucherAmount = parseFloat(document.getElementById('form-split-voucher-amount')?.value) || 0;

      if (isSplitActive && voucherAmount > 0 && type === 'expense') {
        // Pagamento Misto: Buoni Pasto + Carta Buddybank (o conto selezionato)
        const totalNum = parseFloat(amount) || 0;
        const cardAmount = Math.max(0, Math.round((totalNum - voucherAmount) * 100) / 100);

        const { txVoucher, txCard } = financeStore.addSplitTransaction({
          totalAmount: totalNum,
          voucherAmount,
          cardAmount,
          description,
          category: category || '🛒 Spesa Alimentare',
          date,
          cardAccount: account
        });

        if (description && category && category !== '__custom__') {
          smartCategorizer.learnAssociation(description, category);
        }

        if (googleSheetsService.isConfigured()) {
          if (txVoucher) googleSheetsService.pushTransaction(txVoucher).catch(err => console.warn('Sync BP fallita:', err));
          if (txCard) googleSheetsService.pushTransaction(txCard).catch(err => console.warn('Sync Carta fallita:', err));
        }
      } else {
        const addedTx = financeStore.addTransaction({
          amount,
          description,
          date,
          category: category || 'Giroconto',
          type,
          account,
          toAccount: type === 'transfer' ? toAccount : '',
          brokerDestinationType: type === 'transfer' ? brokerDestinationType : undefined,
          targetHoldingId: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingId : undefined,
          targetHoldingTicker: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingTicker : undefined,
          targetHoldingName: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingName : undefined
        });

        if (description && category && category !== '__custom__' && type !== 'transfer') {
          smartCategorizer.learnAssociation(description, category);
        }

        if (googleSheetsService.isConfigured()) {
          googleSheetsService.pushTransaction(addedTx).catch(err => console.warn('Sync fallita:', err));
        }
      }
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
