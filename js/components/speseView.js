/**
 * Apple Design System - Spese View Component (Deep Analytics & Expense Management)
 * Monitoraggio e analisi avanzata delle uscite:
 * - KPI Macro (Fisse, Variabili, Voluttuarie 50/30/20)
 * - Budget Preventivo a Buste
 * - Analisi Categorie & Top Merchant / Fornitori
 * - Confronto Temporale MoM & Trend Uscite
 */

import { financeStore } from '../data/mockData.js';
import { getCategoryIcon, cleanCategoryName, getIcon } from './icons.js';

export class SpeseView {
  constructor() {
    this.donutChart = null;
    this.trendChart = null;
    this.donutPeriod = 'current_month'; // 'current_month' | 'last_30_days' | 'last_3_months' | 'last_6_months' | 'current_year' | 'all'
    this.selectedPeriod = 'current-month';
    this.selectedSubtab = 'overview'; // 'overview', 'budget', 'merchants', 'confronto'
  }

  filterTransactionsByPeriod(allExpenseTxs, period) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based

    return allExpenseTxs.filter(t => {
      if (!t.date) return true;
      // Normalizza formato data YYYY-MM-DD o DD/MM/YYYY
      let dateObj = null;
      if (t.date.includes('-')) {
        dateObj = new Date(t.date);
      } else if (t.date.includes('/')) {
        const parts = t.date.split('/');
        if (parts.length === 3) {
          dateObj = new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0]);
        }
      }
      if (!dateObj || isNaN(dateObj.getTime())) return true;

      switch (period) {
        case 'current_month':
          return dateObj.getFullYear() === currentYear && dateObj.getMonth() === currentMonth;
        case 'last_30_days': {
          const past30 = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
          return dateObj >= past30;
        }
        case 'last_3_months': {
          const past90 = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
          return dateObj >= past90;
        }
        case 'last_6_months': {
          const past180 = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000));
          return dateObj >= past180;
        }
        case 'current_year':
          return dateObj.getFullYear() === currentYear;
        case 'all':
        default:
          return true;
      }
    });
  }

  getPeriodLabel(period) {
    switch (period) {
      case 'current_month': return 'Mese Corrente (Ottobre 2026)';
      case 'last_30_days': return 'Ultimi 30 Giorni';
      case 'last_3_months': return 'Ultimi 3 Mesi';
      case 'last_6_months': return 'Ultimi 6 Mesi';
      case 'current_year': return 'Anno Solare 2026';
      case 'all': return 'Intero Storico Registrato';
      default: return 'Periodo Selezionato';
    }
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
    if (this.donutChart) {
      try { this.donutChart.destroy(); } catch (e) {}
      this.donutChart = null;
    }
    if (this.trendChart) {
      try { this.trendChart.destroy(); } catch (e) {}
      this.trendChart = null;
    }
  }

  render(container) {
    this.destroyCharts();
    const summary = financeStore.summary;
    const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
    const categories = financeStore.getCategories().filter(c => c.type === 'expense');
    const budget5030 = financeStore.getBudget50_30_20();
    const recurring = (typeof financeStore.getRecurringExpenses === 'function' ? financeStore.getRecurringExpenses() : (financeStore.recurringItems || []));

    // Calcolo spese fisse vs variabili
    const fixedTotal = recurring.reduce((acc, r) => acc + (parseFloat(r.monthlyAmount || r.amount) || 0), 0);
    const variableTotal = Math.max(0, summary.monthlyExpense - fixedTotal);
    const dailyAvg = summary.monthlyExpense > 0 ? (summary.monthlyExpense / 30) : 0;

    // Calcolo aggregato per fornitore / merchant
    const merchantMap = {};
    txs.forEach(t => {
      const desc = (t.description || 'Sconosciuto').trim();
      if (!merchantMap[desc]) {
        merchantMap[desc] = { name: desc, total: 0, count: 0, category: t.category };
      }
      merchantMap[desc].total += t.amount;
      merchantMap[desc].count += 1;
    });
    const topMerchants = Object.values(merchantMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);

    container.innerHTML = `
      <div class="page spese-page">
        
        <!-- Header di Sezione & Azioni Rapide -->
        <div class="spese-header-toolbar">
          <div class="spese-header-info">
            <h2 class="page-title">Monitoraggio Spese</h2>
            <p class="page-subtitle">Analisi avanzata delle uscite, budget preventivo 50/30/20 e controllo fornitori</p>
          </div>
          <div class="spese-header-actions">
            <button class="apple-btn-secondary" id="spese-export-csv">
              ${getIcon('list', 14)} Esporta Spese
            </button>
            <button class="apple-btn-primary" id="spese-add-btn">
              ${getIcon('plus', 14)} Registra Spesa
            </button>
          </div>
        </div>

        <!-- 1. KPI Cards Uscite (4 Zone Canoniche in .grid-4) -->
        <section class="grid-4">
          
          <!-- Card 1: Spese Mese Corrente -->
          <div class="card highlight-card">
            <div class="card__header">
              <span class="card__title">Uscite Ottobre</span>
              <div class="kpi-icon-badge expense">
                ${getIcon('expense', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">
              ${this.formatCurrency(summary.monthlyExpense)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Media giornaliera</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(dailyAvg)}/gg</span>
              </div>
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Saturazione budget</span>
                  <span class="meter__val">${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, (summary.monthlyExpense / summary.monthlyIncome) * 100)}%; background: ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'var(--apple-green)' : 'var(--apple-red)'};"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'badge--positive' : 'badge--negative'}">
                ${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}% del budget
              </span>
              <span class="trend-context" title="Target max 75% stipendio">Max 75% (€ ${(summary.monthlyIncome * 0.75).toFixed(0)})</span>
            </div>
          </div>

          <!-- Card 2: Spese Fisse & Ricorrenti -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Spese Fisse</span>
              <div class="kpi-icon-badge balance">
                ${getIcon('casa', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(fixedTotal)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Incidenza uscite</span>
                <span class="kv__value">${summary.monthlyExpense > 0 ? ((fixedTotal / summary.monthlyExpense) * 100).toFixed(0) : 0}%</span>
              </div>
              <div class="kv">
                <span class="kv__label">Voci contrattualizzate</span>
                <span class="kv__value">${recurring.length} impegni</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--neutral">Fisse Mensili</span>
              <span class="trend-context" title="Affitto, utenze e abbonamenti attivi">Uscite obbligate</span>
            </div>
          </div>

          <!-- Card 3: Spese Variabili / Flessibili -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Spese Variabili</span>
              <div class="kpi-icon-badge income">
                ${getIcon('shopping', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(variableTotal)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Incidenza uscite</span>
                <span class="kv__value">${summary.monthlyExpense > 0 ? ((variableTotal / summary.monthlyExpense) * 100).toFixed(0) : 0}%</span>
              </div>
              <div class="kv">
                <span class="kv__label">Margine di manovra</span>
                <span class="kv__value positive">Elevato</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--info">Flessibili</span>
              <span class="trend-context" title="Spesa alimentare, svago e acquisti personali">Modulabili a piacere</span>
            </div>
          </div>

          <!-- Card 4: Spesa Sicura Giornaliera -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Spesa Sicura Residua</span>
              <div class="kpi-icon-badge savings">
                ${getIcon('target', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">
              ${this.formatCurrency(budget5030.dailySafeSpend)}<small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/giorno</small>
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Giorni al mese succ.</span>
                <span class="kv__value">${budget5030.daysRemaining} giorni</span>
              </div>
              <div class="kv">
                <span class="kv__label">Budget rimanente</span>
                <span class="kv__value privacy-mask positive">${this.formatCurrency(budget5030.dailySafeSpend * budget5030.daysRemaining)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">In Regola</span>
              <span class="trend-context" title="Importo spendibile senza intaccare il risparmio">Zero sforamento</span>
            </div>
          </div>

        </section>

        <!-- 2. Budget Preventivo 50/30/20 (Le 3 Buste di Spesa a Card Canoniche) -->
        <section class="card spese-budget-section">
          <div class="card__header">
            <div class="accounts-header-title-group">
              <span class="card__title">Budget Preventivo 50/30/20 & Buste di Spesa</span>
              <span class="accounts-header-sub">Ripartizione scientifica delle entrate mensili (€ ${this.formatCurrency(summary.monthlyIncome)})</span>
            </div>
            <span class="badge badge--neutral">Regola Harvard</span>
          </div>

          <div class="card__body">
            <div class="grid-4" style="grid-template-columns: repeat(3, 1fr);">
              
              <!-- Busta 1: Bisogni 50% -->
              <div class="card card--compact" style="background: var(--bg-hover);">
                <div class="card__header">
                  <span class="card__title">Bisogni & Necessità</span>
                  <span class="badge badge--info">Target 50%</span>
                </div>
                <div class="card__value privacy-mask" style="font-size: 22px;">
                  ${this.formatCurrency(budget5030.needs.spent)} <small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/ ${this.formatCurrency(budget5030.needs.target)}</small>
                </div>
                <div class="card__body">
                  <div class="meter-row">
                    <div class="meter__header">
                      <span class="meter__label">Saturazione</span>
                      <span class="meter__val">${budget5030.needs.pct}%</span>
                    </div>
                    <div class="meter">
                      <div class="meter__fill" style="width: ${Math.min(100, budget5030.needs.pct)}%; background: var(--apple-blue);"></div>
                    </div>
                  </div>
                  <div class="kv" style="margin-top: 8px;">
                    <span class="kv__label">Residuo busta</span>
                    <span class="kv__value privacy-mask positive">${this.formatCurrency(Math.max(0, budget5030.needs.target - budget5030.needs.spent))}</span>
                  </div>
                </div>
                <div class="card__footer">
                  <span class="trend-context">Affitto, bollette, alimentari, trasporti</span>
                </div>
              </div>

              <!-- Busta 2: Voluttuari 30% -->
              <div class="card card--compact" style="background: var(--bg-hover);">
                <div class="card__header">
                  <span class="card__title">Desideri & Svago</span>
                  <span class="badge badge--warning">Target 30%</span>
                </div>
                <div class="card__value privacy-mask" style="font-size: 22px;">
                  ${this.formatCurrency(budget5030.wants.spent)} <small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/ ${this.formatCurrency(budget5030.wants.target)}</small>
                </div>
                <div class="card__body">
                  <div class="meter-row">
                    <div class="meter__header">
                      <span class="meter__label">Saturazione</span>
                      <span class="meter__val">${budget5030.wants.pct}%</span>
                    </div>
                    <div class="meter">
                      <div class="meter__fill" style="width: ${Math.min(100, budget5030.wants.pct)}%; background: var(--apple-orange);"></div>
                    </div>
                  </div>
                  <div class="kv" style="margin-top: 8px;">
                    <span class="kv__label">Residuo busta</span>
                    <span class="kv__value privacy-mask positive">${this.formatCurrency(Math.max(0, budget5030.wants.target - budget5030.wants.spent))}</span>
                  </div>
                </div>
                <div class="card__footer">
                  <span class="trend-context">Ristoranti, cinema, shopping, viaggi</span>
                </div>
              </div>

              <!-- Busta 3: Risparmio & Investimenti 20% -->
              <div class="card card--compact" style="background: var(--bg-hover);">
                <div class="card__header">
                  <span class="card__title">Risparmio & Investimenti</span>
                  <span class="badge badge--positive">Target 20%</span>
                </div>
                <div class="card__value privacy-mask" style="font-size: 22px; color: var(--apple-green);">
                  ${this.formatCurrency(summary.savingsAmount)} <small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/ ${this.formatCurrency(summary.monthlyIncome * 0.20)}</small>
                </div>
                <div class="card__body">
                  <div class="meter-row">
                    <div class="meter__header">
                      <span class="meter__label">Tasso Reale</span>
                      <span class="meter__val positive">${summary.savingsRate}%</span>
                    </div>
                    <div class="meter">
                      <div class="meter__fill" style="width: ${Math.min(100, (summary.savingsRate / 20) * 100)}%; background: var(--apple-green);"></div>
                    </div>
                  </div>
                  <div class="kv" style="margin-top: 8px;">
                    <span class="kv__label">Surplus vs target</span>
                    <span class="kv__value positive">+${(summary.savingsRate - 20).toFixed(1)}%</span>
                  </div>
                </div>
                <div class="card__footer">
                  <span class="trend-context">PAC VWCE, fondo pensione, XEON</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 3. Ripartizione per Categoria & Top Fornitori (2 Colonne) -->
        <div class="charts-grid">
          
          <!-- Box Sinistro: Donut Categorie con Selettore Periodo Temporale -->
          <div class="card chart-card">
            <div class="card__header" style="flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; flex-direction: column;">
                <span class="card__title">Ripartizione per Categoria</span>
                <span class="card__subtitle" id="spese-donut-subtitle" style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
                  ${this.getPeriodLabel(this.donutPeriod)}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; margin-left: auto;">
                <span class="badge badge--info" id="spese-donut-total-badge">
                  ${this.formatCurrency(this.filterTransactionsByPeriod(txs, this.donutPeriod).reduce((s, t) => s + t.amount, 0))}
                </span>
                <div class="apple-select-wrapper" style="min-width: 140px;">
                  <select id="spese-donut-period-select" class="apple-select" style="padding: 4px 26px 4px 10px; font-size: 12px; height: 32px;">
                    <option value="current_month" ${this.donutPeriod === 'current_month' ? 'selected' : ''}>Mese Corrente</option>
                    <option value="last_30_days" ${this.donutPeriod === 'last_30_days' ? 'selected' : ''}>Ultimi 30 Giorni</option>
                    <option value="last_3_months" ${this.donutPeriod === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
                    <option value="last_6_months" ${this.donutPeriod === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
                    <option value="current_year" ${this.donutPeriod === 'current_year' ? 'selected' : ''}>Anno 2026</option>
                    <option value="all" ${this.donutPeriod === 'all' ? 'selected' : ''}>Tutto lo Storico</option>
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
            <div class="card__body">
              <div class="donut-chart-wrapper" style="position: relative; height: 240px;">
                <canvas id="spese-donut-canvas"></canvas>
              </div>
              <div class="spese-categories-list" id="spese-categories-list" style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
                ${this.renderCategoryBreakdownList(this.filterTransactionsByPeriod(txs, this.donutPeriod))}
              </div>
            </div>
          </div>

          <!-- Box Destro: Top Merchant & Fornitori Principali -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Top Fornitori & Merchant</span>
              <span class="badge badge--neutral">Maggiori Uscite</span>
            </div>
            <div class="card__body">
              <div class="merchants-list" style="display: flex; flex-direction: column; gap: 10px;">
                ${topMerchants.map((m, idx) => `
                  <div class="account-row-item" style="padding: 8px 12px;">
                    <div class="account-row-leading">
                      <div class="account-row-icon" style="background: rgba(0, 113, 227, 0.1); color: var(--apple-blue); width: 32px; height: 32px;">
                        ${getCategoryIcon(m.category, 16)}
                      </div>
                      <div class="account-row-meta">
                        <span class="account-row-name" title="${m.name}">${idx + 1}. ${m.name}</span>
                        <span class="account-row-type">${cleanCategoryName(m.category)} • ${m.count} ${m.count === 1 ? 'spesa' : 'spese'}</span>
                      </div>
                    </div>
                    <div class="account-row-trailing">
                      <div class="account-row-val privacy-mask" style="font-size: 15px;">${this.formatCurrency(m.total)}</div>
                      <span class="account-row-pct">${summary.monthlyExpense > 0 ? ((m.total / summary.monthlyExpense) * 100).toFixed(1) : 0}% del tot.</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">I commercianti e servizi con il maggior impatto di cassa</span>
            </div>
          </div>

        </div>

      </div>
    `;

    this.initDonutChart(txs, categories);
    this.bindEvents(container);
  }

  renderCategoryBreakdownList(txs) {
    const totals = {};
    let totalAll = 0;
    txs.forEach(t => {
      const cat = cleanCategoryName(t.category) || 'Altro';
      totals[cat] = (totals[cat] || 0) + t.amount;
      totalAll += t.amount;
    });

    const sorted = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    if (sorted.length === 0) {
      return `
        <div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 13px;">
          Nessuna spesa registrata nel periodo selezionato
        </div>
      `;
    }

    return sorted.map(([name, amount]) => {
      const pct = totalAll > 0 ? ((amount / totalAll) * 100).toFixed(1) : 0;
      return `
        <div class="account-row-item" style="padding: 6px 12px; background: transparent; border-color: var(--border-subtle);">
          <div class="account-row-leading">
            <span style="display: flex; align-items: center; color: var(--apple-blue); flex-shrink: 0;">
              ${getCategoryIcon(name, 16)}
            </span>
            <span class="account-row-name" style="font-size: 13px;">${name}</span>
          </div>
          <div class="account-row-trailing" style="flex-direction: row; gap: 12px; align-items: baseline;">
            <span class="account-row-pct" style="font-size: 12px;">${pct}%</span>
            <span class="account-row-val privacy-mask" style="font-size: 14px;">${this.formatCurrency(amount)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  initDonutChart(txs, categories) {
    const canvas = document.getElementById('spese-donut-canvas');
    if (!canvas || typeof Chart === 'undefined') return;

    const periodTxs = this.filterTransactionsByPeriod(txs, this.donutPeriod);
    const totals = {};
    periodTxs.forEach(t => {
      const cat = cleanCategoryName(t.category) || 'Altro';
      totals[cat] = (totals[cat] || 0) + t.amount;
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(s => s[0]);
    const data = sorted.map(s => s[1]);
    const colors = ['#0071E3', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#5AC8FA', '#FF3B30'];

    this.donutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels.length > 0 ? labels : ['Nessuna spesa'],
        datasets: [{
          data: data.length > 0 ? data : [1],
          backgroundColor: data.length > 0 ? colors.slice(0, labels.length) : ['rgba(142, 142, 147, 0.2)'],
          borderWidth: 2,
          borderColor: 'var(--bg-card)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: € ${ctx.raw.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
            }
          }
        }
      }
    });
  }

  updateDonutData(period, allExpenseTxs) {
    const periodTxs = this.filterTransactionsByPeriod(allExpenseTxs, period);
    const periodTotal = periodTxs.reduce((s, t) => s + t.amount, 0);

    // Aggiorna badge e sottotitolo
    const badge = document.getElementById('spese-donut-total-badge');
    if (badge) badge.textContent = this.formatCurrency(periodTotal);

    const sub = document.getElementById('spese-donut-subtitle');
    if (sub) sub.textContent = this.getPeriodLabel(period);

    // Aggiorna lista categorie breakdown
    const listEl = document.getElementById('spese-categories-list');
    if (listEl) {
      listEl.innerHTML = this.renderCategoryBreakdownList(periodTxs);
    }

    // Aggiorna Donut Chart
    if (this.donutChart) {
      const totals = {};
      periodTxs.forEach(t => {
        const cat = cleanCategoryName(t.category) || 'Altro';
        totals[cat] = (totals[cat] || 0) + t.amount;
      });

      const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
      const labels = sorted.map(s => s[0]);
      const data = sorted.map(s => s[1]);
      const colors = ['#0071E3', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#5AC8FA', '#FF3B30'];

      this.donutChart.data.labels = labels.length > 0 ? labels : ['Nessuna spesa'];
      this.donutChart.data.datasets[0].data = data.length > 0 ? data : [1];
      this.donutChart.data.datasets[0].backgroundColor = data.length > 0 ? colors.slice(0, labels.length) : ['rgba(142, 142, 147, 0.2)'];
      this.donutChart.update();
    }
  }

  bindEvents(container) {
    const periodSelect = container.querySelector('#spese-donut-period-select');
    if (periodSelect) {
      periodSelect.addEventListener('change', (e) => {
        this.donutPeriod = e.target.value;
        const allExpenseTxs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
        this.updateDonutData(this.donutPeriod, allExpenseTxs);
      });
    }

    const addBtn = container.querySelector('#spese-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        window.location.hash = '#movimenti';
        setTimeout(() => {
          const openModalBtn = document.querySelector('#open-add-modal-btn, #mov-add-btn, .action-btn-primary');
          if (openModalBtn) openModalBtn.click();
        }, 150);
      });
    }

    const exportBtn = container.querySelector('#spese-export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
        let csv = 'Data;Descrizione;Categoria;Conto;Importo (EUR)\n';
        txs.forEach(t => {
          csv += `"${t.date || ''}";"${(t.description || '').replace(/"/g, '""')}";"${cleanCategoryName(t.category)}";"${t.account || ''}";"${(t.amount || 0).toFixed(2)}"\n`;
        });
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Spese_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }
}
