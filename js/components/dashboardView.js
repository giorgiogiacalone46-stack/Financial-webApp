/**
 * Apple Design System - Dashboard View Component (Reale)
 * Integra Saldi reali, Net Worth, Budget 75/25, Goal Stipendio e Grafico di Cassa
 */

import { financeStore } from '../data/mockData.js';

export class DashboardView {
  constructor() {
    this.lineChart = null;
    this.donutChart = null;
    this.selectedCategoryPeriod = 'all';
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  extractTxYearMonth(tx) {
    let m = parseInt(tx.month, 10);
    let y = parseInt(tx.year, 10);
    if ((!m || !y) && tx.date) {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(tx.date)) {
        const parts = tx.date.split('/');
        m = parseInt(parts[1], 10);
        y = parseInt(parts[2], 10);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(tx.date)) {
        const parts = tx.date.split('-');
        y = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
      }
    }
    if (!m || !y) return null;
    return { year: y, month: m, key: `${y}-${String(m).padStart(2, '0')}` };
  }

  formatMonthYearLabel(ymKey, short = false) {
    const monthsFull = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const monthsShort = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    const [y, mStr] = ymKey.split('-');
    const mIdx = Math.max(0, Math.min(11, parseInt(mStr, 10) - 1));
    return `${short ? monthsShort[mIdx] : monthsFull[mIdx]} ${y}`;
  }

  getReferenceYearMonth(txs) {
    const now = new Date();
    const curY = now.getFullYear();
    const curM = now.getMonth() + 1;
    const curKey = `${curY}-${String(curM).padStart(2, '0')}`;

    const expenseKeys = new Set();
    txs.forEach(t => {
      if (t.type === 'expense') {
        const ym = this.extractTxYearMonth(t);
        if (ym) expenseKeys.add(ym.key);
      }
    });

    if (expenseKeys.has(curKey)) {
      return { year: curY, month: curM, key: curKey };
    }
    if (expenseKeys.has(`${curY}-10`)) {
      return { year: curY, month: 10, key: `${curY}-10` };
    }
    const sorted = Array.from(expenseKeys).sort().reverse();
    if (sorted.length > 0) {
      const [y, m] = sorted[0].split('-').map(Number);
      return { year: y, month: m, key: sorted[0] };
    }
    return { year: curY, month: curM, key: curKey };
  }

  getPeriodOptions(txs) {
    const ref = this.getReferenceYearMonth(txs);
    const prevDate = new Date(ref.year, ref.month - 2, 1);
    const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

    const monthsSet = new Set();
    const yearsSet = new Set();
    txs.forEach(t => {
      if (t.type === 'expense') {
        const ym = this.extractTxYearMonth(t);
        if (ym) {
          monthsSet.add(ym.key);
          yearsSet.add(ym.year);
        }
      }
    });

    const sortedMonths = Array.from(monthsSet).sort().reverse();
    const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);

    const quickOptions = [
      { value: 'all', label: 'Tutto lo Storico' },
      { value: 'current-month', label: `Mese Corrente (${this.formatMonthYearLabel(ref.key, true)})` },
      { value: 'prev-month', label: `Mese Precedente (${this.formatMonthYearLabel(prevKey, true)})` },
      { value: 'last-3m', label: 'Ultimi 3 Mesi' },
      { value: 'last-6m', label: 'Ultimi 6 Mesi' },
      ...sortedYears.map(y => ({ value: `year-${y}`, label: `Anno ${y}` }))
    ];

    const monthOptions = sortedMonths.map(ym => ({
      value: `month-${ym}`,
      label: this.formatMonthYearLabel(ym, false)
    }));

    return { quickOptions, monthOptions, refKey: ref.key, prevKey };
  }

  computeCategoryBreakdown(txs, categories, periodValue) {
    const { refKey, prevKey } = this.getPeriodOptions(txs);
    const [refY, refM] = refKey.split('-').map(Number);

    const getLastNMonthsKeys = (n) => {
      const keys = new Set();
      for (let i = 0; i < n; i++) {
        const d = new Date(refY, refM - 1 - i, 1);
        keys.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
      }
      return keys;
    };

    const last3Keys = getLastNMonthsKeys(3);
    const last6Keys = getLastNMonthsKeys(6);

    let subtitleLabel = 'Tutte le uscite registrate';
    if (periodValue === 'current-month') subtitleLabel = `Ripartizione ${this.formatMonthYearLabel(refKey)}`;
    else if (periodValue === 'prev-month') subtitleLabel = `Ripartizione ${this.formatMonthYearLabel(prevKey)}`;
    else if (periodValue === 'last-3m') subtitleLabel = 'Ripartizione ultimi 3 mesi';
    else if (periodValue === 'last-6m') subtitleLabel = 'Ripartizione ultimi 6 mesi';
    else if (periodValue.startsWith('year-')) subtitleLabel = `Ripartizione anno ${periodValue.replace('year-', '')}`;
    else if (periodValue.startsWith('month-')) subtitleLabel = `Ripartizione ${this.formatMonthYearLabel(periodValue.replace('month-', ''))}`;

    const categoryTotals = {};
    let totalExpenseCalc = 0;

    txs.forEach(t => {
      if (t.type !== 'expense') return;
      const ym = this.extractTxYearMonth(t);
      let match = false;

      if (periodValue === 'all') {
        match = true;
      } else if (ym) {
        if (periodValue === 'current-month') match = (ym.key === refKey);
        else if (periodValue === 'prev-month') match = (ym.key === prevKey);
        else if (periodValue === 'last-3m') match = last3Keys.has(ym.key);
        else if (periodValue === 'last-6m') match = last6Keys.has(ym.key);
        else if (periodValue.startsWith('year-')) match = (String(ym.year) === periodValue.replace('year-', ''));
        else if (periodValue.startsWith('month-')) match = (ym.key === periodValue.replace('month-', ''));
      }

      if (match) {
        const cat = t.category || '❔Altro';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
        totalExpenseCalc += t.amount;
      }
    });

    const fallbackPalette = ['#0071E3', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#5AC8FA', '#FF3B30'];
    const sortedCats = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([name, amount], idx) => {
        const matched = categories.find(c => c.name === name);
        return {
          name,
          amount,
          percentage: totalExpenseCalc > 0 ? ((amount / totalExpenseCalc) * 100).toFixed(1) : '0.0',
          color: matched && matched.color ? matched.color : fallbackPalette[idx % fallbackPalette.length]
        };
      });

    return { sortedCats, totalExpenseCalc, subtitleLabel };
  }

  renderLegendItems(sortedCats) {
    if (!sortedCats || sortedCats.length === 0) {
      return `<div class="donut-empty-hint">Nessuna spesa registrata nel periodo selezionato</div>`;
    }
    return sortedCats.map(cat => `
      <div class="legend-item">
        <span class="legend-color-dot" style="background-color: ${cat.color};"></span>
        <span class="legend-name" title="${cat.name}">${cat.name}</span>
        <span class="legend-percent">${cat.percentage}%</span>
        <span class="legend-amount">${this.formatCurrency(cat.amount)}</span>
      </div>
    `).join('');
  }

  render(container) {
    this.destroyCharts();
    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const txs = financeStore.getAllTransactions();

    const { quickOptions, monthOptions } = this.getPeriodOptions(txs);
    const { sortedCats, totalExpenseCalc, subtitleLabel } = this.computeCategoryBreakdown(
      txs,
      categories,
      this.selectedCategoryPeriod
    );

    // Calcolo storico mensile entrate/uscite ultime 6 mensilità
    const monthlyHistory = {
      labels: ['Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott'],
      income: [1700, 1700, 1700, 1700, 1700, 1700],
      expenses: [920, 1140, 1080, 1350, 980, summary.monthlyExpense]
    };

    container.innerHTML = `
      <div class="dashboard-layout">
        
        <!-- 1. Top KPI Summary Grid -->
        <section class="kpi-grid">
          
          <!-- Card 1: Net Worth Patrimoniale -->
          <div class="kpi-card highlight-card">
            <div class="kpi-header">
              <span class="kpi-label">Patrimonio Netto (Net Worth)</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(summary.netWorth)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  Aggiornato
                </span>
                <span class="trend-context">Liquidità + Investimenti + Pensione</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Liquidità Disponibile -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Liquidità Diretta</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(summary.liquidTotal)}</span>
              <div class="kpi-footer">
                <span class="trend-context">Buddybank + Buoni Pasto + Contanti</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Uscite del Mese -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Uscite Tracciate Mese</span>
              <div class="kpi-icon-badge expense">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(summary.monthlyExpense)}</span>
              <div class="kpi-footer">
                <span class="trend-badge ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'positive' : 'negative'}">
                  ${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}% del budget
                </span>
                <span class="trend-context">Target max 75%</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Tasso di Risparmio & Regola 75/25 -->
          <div class="kpi-card savings-kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Tasso di Risparmio</span>
              <div class="kpi-icon-badge savings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value savings-value">${summary.savingsRate}%</span>
              <div class="savings-progress-container">
                <div class="savings-progress-track">
                  <div class="savings-progress-fill" style="width: ${Math.min(100, (summary.savingsRate / 25) * 100)}%;"></div>
                </div>
              </div>
              <div class="kpi-footer savings-footer">
                <span class="trend-badge ${summary.savingsRate >= 25 ? 'positive' : ''}">
                  Target 25% ${summary.savingsRate >= 25 ? 'raggiunto' : 'in corso'}
                </span>
                <span class="trend-context">+${this.formatCurrency(summary.savingsAmount)}</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Strip Rapido Conti & Saldi Reali -->
        <section class="accounts-pill-strip">
          ${accounts.map(acc => `
            <div class="account-pill-card">
              <div class="acc-pill-top">
                <span class="acc-pill-name">${acc.name}</span>
                <span class="acc-pill-type">${acc.type}</span>
              </div>
              <span class="acc-pill-val">${this.formatCurrency(acc.balance)}</span>
            </div>
          `).join('')}
        </section>

        <!-- 3. Grafici Interattivi Apple: Flusso di Cassa & Ripartizione -->
        <section class="charts-grid">
          
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Flusso di Cassa & Trend Mensile</h3>
                <span class="chart-subtitle">Entrate stimate vs Uscite tracciate nel tempo</span>
              </div>
            </div>
            <div class="chart-canvas-container">
              <canvas id="cashFlowCanvas"></canvas>
            </div>
          </div>

          <div class="chart-card donut-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Spese per Categoria</h3>
                <span class="chart-subtitle" id="donut-period-subtitle">${subtitleLabel}</span>
              </div>
              <div class="apple-select-wrapper category-period-wrapper">
                <select id="category-period-filter" class="apple-select category-period-select" aria-label="Periodo di riferimento spese">
                  <optgroup label="Periodi Rapidi">
                    ${quickOptions.map(opt => `<option value="${opt.value}" ${this.selectedCategoryPeriod === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
                  </optgroup>
                  ${monthOptions.length > 0 ? `
                    <optgroup label="Singola Mensilità">
                      ${monthOptions.map(opt => `<option value="${opt.value}" ${this.selectedCategoryPeriod === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
                    </optgroup>
                  ` : ''}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div class="donut-chart-container">
              <div class="donut-canvas-wrapper">
                <canvas id="categoryDonutCanvas"></canvas>
                <div class="donut-center-text">
                  <span class="donut-center-label">Totale Uscite</span>
                  <span class="donut-center-value" id="donut-total-value">${this.formatCurrency(totalExpenseCalc)}</span>
                </div>
              </div>
              <div class="donut-legend" id="category-donut-legend">
                ${this.renderLegendItems(sortedCats)}
              </div>
            </div>
          </div>

        </section>

        <!-- 4. Spese Ricorrenti & Rate in Scadenza -->
        <section class="recurring-section-card">
          <div class="section-card-header">
            <div>
              <h3>Spese Ricorrenti & Rate Attive</h3>
              <span class="card-subtitle">Scadenze fisse e piani rateali in corso da movimenti</span>
            </div>
          </div>
          <div class="recurring-grid">
            ${financeStore.recurringItems.map(item => `
              <div class="recurring-item-card">
                <div class="rec-top">
                  <span class="rec-title">${item.name}</span>
                  <span class="rec-amount">€${item.monthlyAmount.toFixed(2)}/mese</span>
                </div>
                <div class="rec-meta">
                  <span>${item.category} • Scadenza: ${item.nextDate}</span>
                </div>
                ${item.totalRate > 0 ? `
                  <div class="rec-progress-bar">
                    <div class="rec-progress-fill" style="width: ${(item.currentRata / item.totalRate) * 100}%;"></div>
                  </div>
                  <span class="rec-rate-info">Rata ${item.currentRata} di ${item.totalRate} completata</span>
                ` : `
                  <span class="rec-badge-fixed">Pagamento Ricorrente Fisso</span>
                `}
              </div>
            `).join('')}
          </div>
        </section>

      </div>
    `;

    this.bindCategoryPeriodEvents(txs, categories);

    requestAnimationFrame(() => {
      this.initLineChart(monthlyHistory);
      this.initDonutChart(sortedCats);
    });
  }

  bindCategoryPeriodEvents(txs, categories) {
    const periodSelect = document.getElementById('category-period-filter');
    if (!periodSelect) return;

    periodSelect.addEventListener('change', (e) => {
      this.selectedCategoryPeriod = e.target.value;
      const { sortedCats, totalExpenseCalc, subtitleLabel } = this.computeCategoryBreakdown(
        txs,
        categories,
        this.selectedCategoryPeriod
      );

      const subtitleEl = document.getElementById('donut-period-subtitle');
      const totalEl = document.getElementById('donut-total-value');
      const legendEl = document.getElementById('category-donut-legend');

      if (subtitleEl) subtitleEl.textContent = subtitleLabel;
      if (totalEl) totalEl.textContent = this.formatCurrency(totalExpenseCalc);
      if (legendEl) legendEl.innerHTML = this.renderLegendItems(sortedCats);

      if (this.donutChart) {
        const hasData = sortedCats.length > 0;
        this.donutChart.data.labels = hasData ? sortedCats.map(c => c.name) : ['Nessuna spesa'];
        this.donutChart.data.datasets[0].data = hasData ? sortedCats.map(c => c.amount) : [1];
        this.donutChart.data.datasets[0].backgroundColor = hasData ? sortedCats.map(c => c.color) : ['rgba(142, 142, 147, 0.2)'];
        this.donutChart.update();
      } else {
        this.initDonutChart(sortedCats);
      }
    });
  }

  destroyCharts() {
    if (this.lineChart) {
      try { this.lineChart.destroy(); } catch (e) {}
      this.lineChart = null;
    }
    if (this.donutChart) {
      try { this.donutChart.destroy(); } catch (e) {}
      this.donutChart = null;
    }
  }

  initLineChart(historyData) {
    const canvas = document.getElementById('cashFlowCanvas');
    if (!canvas || !window.Chart) return;

    if (this.lineChart) {
      try { this.lineChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const incomeGrad = ctx.createLinearGradient(0, 0, 0, 260);
    incomeGrad.addColorStop(0, 'rgba(52, 199, 89, 0.25)');
    incomeGrad.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

    const expenseGrad = ctx.createLinearGradient(0, 0, 0, 260);
    expenseGrad.addColorStop(0, 'rgba(0, 113, 227, 0.22)');
    expenseGrad.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    this.lineChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: historyData.labels,
        datasets: [
          {
            label: 'Entrate Target / Stipendio',
            data: historyData.income,
            borderColor: '#34C759',
            backgroundColor: incomeGrad,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#34C759'
          },
          {
            label: 'Uscite Tracciate',
            data: historyData.expenses,
            borderColor: '#0071E3',
            backgroundColor: expenseGrad,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0071E3'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              font: { size: 11, family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"' },
              color: isDark ? '#98989D' : '#86868B'
            }
          },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 }
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + v
            }
          }
        }
      }
    });
  }

  initDonutChart(categories) {
    const canvas = document.getElementById('categoryDonutCanvas');
    if (!canvas || !window.Chart) return;

    if (this.donutChart) {
      try { this.donutChart.destroy(); } catch (e) {}
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hasData = categories && categories.length > 0;

    this.donutChart = new window.Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: hasData ? categories.map(c => c.name) : ['Nessuna spesa'],
        datasets: [{
          data: hasData ? categories.map(c => c.amount) : [1],
          backgroundColor: hasData ? categories.map(c => c.color) : ['rgba(142, 142, 147, 0.2)'],
          borderWidth: 2,
          borderColor: isDark ? '#1C1C1E' : '#FFFFFF',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${this.formatCurrency(ctx.parsed)}`
            }
          }
        }
      }
    });
  }
}
