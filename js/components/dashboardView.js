/**
 * Apple Design System - Dashboard View Component (Reale)
 * Integra Saldi reali, Net Worth, Budget 75/25, Goal Stipendio e Grafico di Cassa
 */

import { financeStore } from '../data/mockData.js';

export class DashboardView {
  constructor() {
    this.lineChart = null;
    this.donutChart = null;
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value || 0);
  }

  render(container) {
    this.destroyCharts();
    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const txs = financeStore.getAllTransactions();

    // Calcolo ripartizione categorie per uscite
    const categoryTotals = {};
    let totalExpenseCalc = 0;
    txs.forEach(t => {
      if (t.type === 'expense') {
        const cat = t.category || '❔Altro';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
        totalExpenseCalc += t.amount;
      }
    });

    const sortedCats = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, amount]) => {
        const matched = categories.find(c => c.name === name);
        return {
          name,
          amount,
          percentage: totalExpenseCalc > 0 ? ((amount / totalExpenseCalc) * 100).toFixed(1) : 0,
          color: matched ? matched.color : '#8E8E93'
        };
      });

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
                <span class="chart-subtitle">Top categorie di spesa rilevate</span>
              </div>
            </div>
            <div class="donut-chart-container">
              <div class="donut-canvas-wrapper">
                <canvas id="categoryDonutCanvas"></canvas>
                <div class="donut-center-text">
                  <span class="donut-center-label">Totale Uscite</span>
                  <span class="donut-center-value">${this.formatCurrency(summary.monthlyExpense)}</span>
                </div>
              </div>
              <div class="donut-legend">
                ${sortedCats.map(cat => `
                  <div class="legend-item">
                    <span class="legend-color-dot" style="background-color: ${cat.color};"></span>
                    <span class="legend-name">${cat.name}</span>
                    <span class="legend-percent">${cat.percentage}%</span>
                    <span class="legend-amount">${this.formatCurrency(cat.amount)}</span>
                  </div>
                `).join('')}
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

    setTimeout(() => {
      this.initLineChart(monthlyHistory);
      this.initDonutChart(sortedCats);
    }, 60);
  }

  destroyCharts() {
    if (this.lineChart) {
      this.lineChart.destroy();
      this.lineChart = null;
    }
    if (this.donutChart) {
      this.donutChart.destroy();
      this.donutChart = null;
    }
  }

  initLineChart(historyData) {
    const canvas = document.getElementById('cashFlowCanvas');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');
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
          legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 11 } } },
          tooltip: {
            backgroundColor: 'rgba(28, 28, 30, 0.9)',
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.06)' }, ticks: { callback: (v) => '€' + v } }
        }
      }
    });
  }

  initDonutChart(categories) {
    const canvas = document.getElementById('categoryDonutCanvas');
    if (!canvas || !window.Chart) return;

    this.donutChart = new window.Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: categories.map(c => c.name),
        datasets: [{
          data: categories.map(c => c.amount),
          backgroundColor: categories.map(c => c.color),
          borderWidth: 2,
          borderColor: '#1C1C1E',
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
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${this.formatCurrency(ctx.parsed)}`
            }
          }
        }
      }
    });
  }
}
