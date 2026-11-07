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

      if (period.startsWith('month_')) {
        const parts = period.replace('month_', '').split('_');
        const targetM = parseInt(parts[0], 10) - 1;
        const targetY = parseInt(parts[1], 10);
        return dateObj.getFullYear() === targetY && dateObj.getMonth() === targetM;
      }

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
    if (period.startsWith('month_')) {
      const parts = period.replace('month_', '').split('_');
      const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      const m = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      return `${monthNames[m - 1] || 'Mese'} ${y || 2026}`;
    }

    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const now = new Date();
    const curMonthName = monthNames[now.getMonth()];
    const curYear = now.getFullYear();

    switch (period) {
      case 'current_month': return `Mese Corrente (${curMonthName} ${curYear})`;
      case 'last_30_days': return 'Ultimi 30 Giorni';
      case 'last_3_months': return 'Ultimi 3 Mesi';
      case 'last_6_months': return 'Ultimi 6 Mesi';
      case 'current_year': return `Anno Solare ${curYear}`;
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
    const liveAnalysis = financeStore.getCurrentMonthLiveAnalysis();
    const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
    const categories = financeStore.getCategories().filter(c => c.type === 'expense');
    const budget5030 = financeStore.getBudget50_30_20();
    const cycleStatus = financeStore.getPaycheckCycleStatus();
    const recurring = (typeof financeStore.getRecurringExpenses === 'function' ? financeStore.getRecurringExpenses() : (financeStore.recurringItems || []));

    const curMonthName = liveAnalysis.curMonthName;
    const curYear = liveAnalysis.curYear;

    // Calcolo spese fisse vs variabili live
    const fixedTotal = liveAnalysis.fixedExpenses;
    const variableTotal = liveAnalysis.variableExpenses;
    const totalMonthExpense = liveAnalysis.actualExpense;
    const remainingExtra = liveAnalysis.remainingExtraSavings;
    const realSavingsRate = liveAnalysis.realSavingsRate;
    const dailyAvg = liveAnalysis.curDay > 0 ? (totalMonthExpense / liveAnalysis.curDay) : 0;

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

    const incomeRef = Math.max(liveAnalysis.effectiveIncome || 1, totalMonthExpense + Math.max(0, remainingExtra));
    const incomeSatPct = liveAnalysis.effectiveIncome > 0 ? ((totalMonthExpense / liveAnalysis.effectiveIncome) * 100).toFixed(1) : '0.0';
    const pctFixedBar = Math.max(fixedTotal > 0 ? 5 : 0, Math.round((fixedTotal / incomeRef) * 100));
    const pctVarBar = Math.max(variableTotal > 0 ? 5 : 0, Math.round((variableTotal / incomeRef) * 100));
    const pctRemBar = Math.max(4, 100 - pctFixedBar - pctVarBar);

    // Altezze barre Micro-Chart 50/30/20 (armonizzate, compatte e con limite max rigido anti-overflow)
    const maxBarHeight = 52;
    const maxEnv = Math.max(budget5030.needs.target || 1, budget5030.wants.target || 1, budget5030.savings?.target || 1);
    const hNeeds = Math.min(maxBarHeight, Math.max(8, Math.round(((budget5030.needs.spent || 0) / maxEnv) * maxBarHeight)));
    const hWants = Math.min(maxBarHeight, Math.max(8, Math.round(((budget5030.wants.spent || 0) / maxEnv) * maxBarHeight)));
    const savingsVal = Math.max(0, (budget5030.monthlyIncome - totalMonthExpense));
    const hSavings = Math.min(maxBarHeight, Math.max(8, Math.round((savingsVal / maxEnv) * maxBarHeight)));
    const totalRemainingEnvelopes = Math.max(0, (budget5030.needs.target - budget5030.needs.spent)) + Math.max(0, (budget5030.wants.target - budget5030.wants.spent));

    const totalHistoricalExpenses = txs.reduce((s, t) => s + t.amount, 0) || 1;

    container.innerHTML = `
      <div class="page spese-page">
        
        <!-- Pulsante d'Azione Primario Stile Workout (Mobile Only) -->
        <div class="mobile-only-block">
          <button type="button" class="cta-workout-btn" id="spese-add-btn-mobile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Registra Nuova Spesa</span>
          </button>
        </div>

        <!-- Header di Sezione & Azioni Rapide (Desktop Only) -->
        <div class="spese-header-toolbar desk-only">
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

        <!-- 1. HERO CARD MONOLITICA: USCITE & FLUSSO MESE (Workout Style) -->
        <section class="card hero-patrimonio-card spese-hero-card">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">Uscite ${curMonthName} ${curYear}</span>
                <span class="badge ${totalMonthExpense <= (liveAnalysis.effectiveIncome * 0.75) ? 'badge--positive' : 'badge--negative'} hero-badge-tag">
                  ${incomeSatPct}% Entrate
                </span>
              </div>
              <div class="card__value privacy-mask hero-networth-val">
                ${this.formatCurrency(totalMonthExpense)}
              </div>
            </div>
            <div class="hero-trend-wrap">
              <span class="trend-badge positive">
                ${this.formatCurrency(dailyAvg)}/gg
              </span>
              <button type="button" class="cashflow-link" id="spese-export-csv-hero" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;">
                Esporta CSV &rarr;
              </button>
            </div>
          </div>

          <!-- Segmented Allocation Bar (Spese Fisse / Spese Extra / Rimanenza) -->
          <div class="alloc-bar-track">
            ${pctFixedBar > 0 ? `<div class="alloc-segment" style="width: ${pctFixedBar}%; background: #FF9F0A;" title="Spese Fisse: ${this.formatCurrency(fixedTotal)}"></div>` : ''}
            ${pctVarBar > 0 ? `<div class="alloc-segment" style="width: ${pctVarBar}%; background: #FF453A;" title="Spese Extra: ${this.formatCurrency(variableTotal)}"></div>` : ''}
            <div class="alloc-segment" style="width: ${pctRemBar}%; background: #AF52DE;" title="Rimanenza: ${this.formatCurrency(remainingExtra)}"></div>
          </div>

          <!-- Legenda Composizione a 3 Colonne Pulite -->
          <div class="alloc-legend">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #FF9F0A;"></span>
                <span class="legend-name">Fisse (${liveAnalysis.fixedItems.length})</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #FF9F0A;">
                ${this.formatCurrency(fixedTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #FF453A;"></span>
                <span class="legend-name">Extra (${liveAnalysis.variableItems.length})</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #FF453A;">
                ${this.formatCurrency(variableTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #AF52DE;"></span>
                <span class="legend-name">Rimanenza (${realSavingsRate}%)</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #AF52DE;">
                ${this.formatCurrency(remainingExtra)}
              </span>
            </div>
          </div>
        </section>

        <!-- 2. BUDGET PREVENTIVO 50/30/20 (Workout Micro Bar Chart) -->
        <section class="cashflow-section">
          <div class="cashflow-header-row">
            <div class="cashflow-header-left">
              <h3 class="cashflow-title">
                <span>Budget 50/30/20 • Buste Mese</span>
                <span class="badge badge--info flow-day-badge">
                  <span class="live-dot"></span>
                  Harvard Rule
                </span>
              </h3>
            </div>
            <a href="#movimenti" class="cashflow-link">
              Vedi Movimenti &rarr;
            </a>
          </div>

          <div class="native-card mobile-workout-cashflow-card spese-workout-budget-card">
            <div class="cashflow-kpi-row">
              <div>
                <span class="cashflow-kpi-sub">Margine Residuo Buste (Bisogni + Svago)</span>
                <div class="cashflow-kpi-val privacy-mask" style="color: #30D158;">${this.formatCurrency(totalRemainingEnvelopes)}</div>
              </div>
              <span class="cashflow-pct-tag" style="color: #30D158; background: rgba(48, 209, 88, 0.14);">${summary.savingsRate}% Risparmio</span>
            </div>

            <!-- Micro Bar Chart (Bisogni 50% / Svago 30% / Risparmio 20%) -->
            <div class="workout-bars-grid">
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(budget5030.needs.spent)} €</div>
                <div class="bar-pill" style="height: ${hNeeds}px; background: linear-gradient(180deg, #0A84FF 0%, rgba(10, 132, 255, 0.4) 100%);"></div>
                <div class="bar-label">Bisogni (${budget5030.needs.pct}%)</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(budget5030.wants.spent)} €</div>
                <div class="bar-pill bar-fisse" style="height: ${hWants}px;"></div>
                <div class="bar-label">Svago (${budget5030.wants.pct}%)</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(summary.savingsAmount)} €</div>
                <div class="bar-pill bar-entrate" style="height: ${hSavings}px;"></div>
                <div class="bar-label">Risparmio (20%)</div>
              </div>
            </div>

            <div class="timeline-footer">
              <span>Bisogni: <strong class="privacy-mask">${Math.round(budget5030.needs.spent)} / ${Math.round(budget5030.needs.target)} €</strong></span>
              <span>Svago: <strong class="privacy-mask">${Math.round(budget5030.wants.spent)} / ${Math.round(budget5030.wants.target)} €</strong></span>
            </div>
          </div>
        </section>

        <!-- 3. Ripartizione per Categoria & Top Fornitori (LinkedIn Dark Card Lists) -->
        <div class="charts-grid">
          
          <!-- Box Sinistro: Donut Categorie + LinkedIn List -->
          <div class="card accounts-overview-card chart-card">
            <div class="card__header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <div>
                <span class="card__title">Ripartizione Categorie</span>
                <span class="accounts-desc" id="spese-donut-subtitle" style="display: block; font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">
                  ${this.getPeriodLabel(this.donutPeriod)}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="badge badge--info" id="spese-donut-total-badge">
                  ${this.formatCurrency(this.filterTransactionsByPeriod(txs, this.donutPeriod).reduce((s, t) => s + t.amount, 0))}
                </span>
                <div class="apple-select-wrapper" style="min-width: 128px;">
                  <select id="spese-donut-period-select" class="apple-select" style="padding: 5px 24px 5px 10px; font-size: 11.5px; height: 30px; border-radius: 9999px;">
                    <option value="current_month" ${this.donutPeriod === 'current_month' ? 'selected' : ''}>Mese Corrente</option>
                    <option value="last_30_days" ${this.donutPeriod === 'last_30_days' ? 'selected' : ''}>Ultimi 30 gg</option>
                    <option value="last_3_months" ${this.donutPeriod === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
                    <option value="last_6_months" ${this.donutPeriod === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
                    <option value="current_year" ${this.donutPeriod === 'current_year' ? 'selected' : ''}>Anno 2026</option>
                    <option value="all" ${this.donutPeriod === 'all' ? 'selected' : ''}>Tutto</option>
                    <optgroup label="Mesi Specifici">
                      <option value="month_11_2026" ${this.donutPeriod === 'month_11_2026' ? 'selected' : ''}>Novembre 2026</option>
                      <option value="month_10_2026" ${this.donutPeriod === 'month_10_2026' ? 'selected' : ''}>Ottobre 2026</option>
                      <option value="month_09_2026" ${this.donutPeriod === 'month_09_2026' ? 'selected' : ''}>Settembre 2026</option>
                      <option value="month_08_2026" ${this.donutPeriod === 'month_08_2026' ? 'selected' : ''}>Agosto 2026</option>
                      <option value="month_07_2026" ${this.donutPeriod === 'month_07_2026' ? 'selected' : ''}>Luglio 2026</option>
                    </optgroup>
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
            <div class="card__body">
              <div class="donut-chart-wrapper" style="position: relative; height: 200px; margin-bottom: 12px;">
                <canvas id="spese-donut-canvas"></canvas>
              </div>
              <div class="accounts-list-container" id="spese-categories-list">
                ${this.renderCategoryBreakdownList(this.filterTransactionsByPeriod(txs, this.donutPeriod))}
              </div>
            </div>
          </div>

          <!-- Box Destro: Top Merchant & Fornitori Principali (LinkedIn List) -->
          <div class="card accounts-overview-card">
            <div class="card__header">
              <div>
                <span class="card__title">Top Fornitori &amp; Merchant</span>
                <span class="accounts-desc desk-only">I commercianti con il maggior impatto sulle uscite</span>
              </div>
              <span class="badge badge--neutral">${topMerchants.length} Voci</span>
            </div>
            <div class="accounts-list-container">
              ${topMerchants.map((m, idx) => {
                const pct = ((m.total / totalHistoricalExpenses) * 100).toFixed(1);
                return `
                  <div class="account-row-item">
                    <div class="account-row-left">
                      <div class="account-row-icon" style="background: rgba(10, 132, 255, 0.14); color: #0A84FF;">
                        ${getCategoryIcon(m.category, 16)}
                      </div>
                      <div class="account-row-info">
                        <strong class="account-row-name" title="${m.name}">${idx + 1}. ${m.name}</strong>
                        <span class="account-row-type">${cleanCategoryName(m.category)} • ${m.count} ${m.count === 1 ? 'operazione' : 'operazioni'} (${pct}%)</span>
                      </div>
                    </div>
                    <div class="account-row-right">
                      <span class="account-row-balance privacy-mask">
                        ${this.formatCurrency(m.total)}
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
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
        <div style="padding: 18px; text-align: center; color: var(--text-secondary); font-size: 13px;">
          Nessuna spesa registrata nel periodo selezionato
        </div>
      `;
    }

    const palette = ['#0A84FF', '#30D158', '#FF9F0A', '#AF52DE', '#FF375F', '#5E5CE6'];

    return sorted.map(([name, amount], i) => {
      const pct = totalAll > 0 ? ((amount / totalAll) * 100).toFixed(1) : '0.0';
      const col = palette[i % palette.length];
      return `
        <div class="account-row-item">
          <div class="account-row-left">
            <div class="account-row-icon" style="background: ${col}22; color: ${col};">
              ${getCategoryIcon(name, 16)}
            </div>
            <div class="account-row-info">
              <strong class="account-row-name">${name}</strong>
              <span class="account-row-type">Incidenza sul periodo: ${pct}%</span>
            </div>
          </div>
          <div class="account-row-right">
            <span class="account-row-balance privacy-mask" style="color: ${col};">
              ${this.formatCurrency(amount)}
            </span>
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

    container.querySelectorAll('#spese-add-btn, #spese-add-btn-mobile').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.hash = '#movimenti';
        setTimeout(() => {
          const openModalBtn = document.querySelector('#btn-add-tx-mobile, #btn-add-tx-header, #btn-hero-add-tx, #open-add-modal-btn');
          if (openModalBtn) openModalBtn.click();
        }, 150);
      });
    });

    container.querySelectorAll('#spese-export-csv, #spese-export-csv-hero').forEach(btn => {
      btn.addEventListener('click', () => {
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
    });
  }
}
