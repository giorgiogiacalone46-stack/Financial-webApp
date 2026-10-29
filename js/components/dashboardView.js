/**
 * Apple Design System - Dashboard View Component
 * Handles KPI cards, Chart.js rendering and interactive controls.
 */

import { mockFinancialData } from '../data/mockData.js';

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
    }).format(value);
  }

  render(container) {
    this.destroyCharts();
    const data = mockFinancialData;

    container.innerHTML = `
      <div class="dashboard-layout">
        
        <!-- 1. Top KPI Summary Grid -->
        <section class="kpi-grid">
          
          <!-- Card 1: Saldo Totale -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Saldo Totale Netto</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(data.summary.totalBalance)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  +4.2%
                </span>
                <span class="trend-context">vs mese scorso</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Entrate del Mese -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Entrate del Mese</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value" style="color: var(--apple-green);">${this.formatCurrency(data.summary.monthlyIncome)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  +8.5%
                </span>
                <span class="trend-context">vs media annua</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Uscite del Mese -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Uscite del Mese</span>
              <div class="kpi-icon-badge expense">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(data.summary.monthlyExpense)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  -3.1%
                </span>
                <span class="trend-context">risparmio attivo</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Tasso di Risparmio (Richiesto dall'utente) -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Tasso di Risparmio</span>
              <div class="kpi-icon-badge savings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value" style="color: var(--apple-purple);">${data.summary.savingsRate}%</span>
              <div class="savings-progress-container">
                <div class="savings-progress-track">
                  <div class="savings-progress-fill" style="width: ${Math.min(data.summary.savingsRate, 100)}%;"></div>
                </div>
              </div>
              <div class="kpi-footer" style="margin-top: 8px;">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  Target 40%
                </span>
                <span class="trend-context">+€ 1.636 accantonati</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Charts Section (Cash Flow & Expense Breakdown) -->
        <section class="charts-grid">
          
          <!-- Grafico 1: Flusso di Cassa Mensile -->
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Flusso di Cassa & Trend</h3>
                <p>Confronto entrate e uscite nel tempo</p>
              </div>
              <div class="segmented-control" id="cashflow-period-selector">
                <button class="segment-btn active" data-period="6m">6 Mesi</button>
                <button class="segment-btn" data-period="1y">1 Anno</button>
              </div>
            </div>
            <div class="chart-canvas-container">
              <canvas id="cashFlowCanvas"></canvas>
            </div>
          </div>

          <!-- Grafico 2: Ripartizione Spese per Categoria -->
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Ripartizione Uscite</h3>
                <p>Spese per categoria (Ottobre)</p>
              </div>
            </div>
            <div class="chart-canvas-container" style="min-height: 200px; max-height: 220px;">
              <canvas id="categoryDonutCanvas"></canvas>
            </div>
            <!-- Category Legend -->
            <div class="category-legend-list">
              ${data.categoryBreakdown.slice(0, 4).map(cat => `
                <div class="category-legend-item">
                  <div class="category-info">
                    <span class="category-color-dot" style="background-color: ${cat.color};"></span>
                    <span>${cat.name}</span>
                  </div>
                  <div class="category-metrics">
                    <span class="category-percentage">${cat.percentage}%</span>
                    <span>${this.formatCurrency(cat.amount)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </section>

        <!-- 3. Bottom Grid: Ultimi Movimenti Recenti -->
        <section class="dashboard-bottom-grid">
          <div class="recent-tx-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Ultimi Movimenti Registrati</h3>
                <p>Sincronizzati dal foglio Google Sheets <code>Finanze-Movimenti</code></p>
              </div>
              <button class="apple-btn-secondary" id="btn-goto-movimenti">
                <span>Vedi tutti i movimenti</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
            <div class="tx-list">
              ${data.recentTransactions.map(tx => `
                <div class="tx-row">
                  <div class="tx-left">
                    <div class="tx-icon-box">
                      ${tx.type === 'income' 
                        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34C759" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>` 
                        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868B" stroke-width="2.2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`}
                    </div>
                    <div class="tx-meta">
                      <span class="tx-description">${tx.description}</span>
                      <span class="tx-category-date">${tx.category} • ${tx.date}</span>
                    </div>
                  </div>
                  <span class="tx-amount ${tx.type}">
                    ${tx.type === 'income' ? '+' : '-'}${this.formatCurrency(tx.amount)}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

      </div>
    `;

    // Bind Controls
    this.bindEvents();

    // Render Charts
    setTimeout(() => {
      this.initLineChart(data.cashFlowHistory);
      this.initDonutChart(data.categoryBreakdown);
    }, 50);
  }

  bindEvents() {
    const btnGoto = document.getElementById('btn-goto-movimenti');
    if (btnGoto && window.app) {
      btnGoto.addEventListener('click', () => {
        window.app.switchTab('movimenti');
      });
    }

    // Segmented period switcher
    const periodButtons = document.querySelectorAll('#cashflow-period-selector .segment-btn');
    periodButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        periodButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const period = e.currentTarget.dataset.period;
        this.updateCashFlowPeriod(period);
      });
    });
  }

  initLineChart(historyData) {
    const canvas = document.getElementById('cashFlowCanvas');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');

    // Apple Gradients
    const incomeGradient = ctx.createLinearGradient(0, 0, 0, 260);
    incomeGradient.addColorStop(0, 'rgba(52, 199, 89, 0.28)');
    incomeGradient.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

    const expenseGradient = ctx.createLinearGradient(0, 0, 0, 260);
    expenseGradient.addColorStop(0, 'rgba(0, 113, 227, 0.22)');
    expenseGradient.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDarkMode ? '#98989D' : '#86868B';

    this.lineChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: historyData.labels,
        datasets: [
          {
            label: 'Entrate',
            data: historyData.income,
            borderColor: '#34C759',
            backgroundColor: incomeGradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.38,
            pointBackgroundColor: '#34C759',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Uscite',
            data: historyData.expenses,
            borderColor: '#0071E3',
            backgroundColor: expenseGradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.38,
            pointBackgroundColor: '#0071E3',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true,
              pointStyle: 'circle',
              color: textColor,
              font: {
                size: 12,
                family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }
            }
          },
          tooltip: {
            backgroundColor: isDarkMode ? 'rgba(30, 30, 32, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDarkMode ? '#FFFFFF' : '#1D1D1F',
            bodyColor: isDarkMode ? '#AEAEB2' : '#6E6E73',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12,
            displayColors: true,
            boxPadding: 4,
            callbacks: {
              label: (context) => {
                return ` ${context.dataset.label}: ${this.formatCurrency(context.parsed.y)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: gridColor,
              drawBorder: false
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
                family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              }
            }
          },
          y: {
            min: 1500,
            suggestedMax: 4200,
            grid: {
              color: gridColor,
              drawBorder: false
            },
            ticks: {
              stepSize: 500,
              color: textColor,
              font: {
                size: 11,
                family: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
              },
              callback: (value) => `€ ${value}`
            }
          }
        }
      }
    });
  }

  updateCashFlowPeriod(period) {
    if (!this.lineChart) return;

    if (period === '1y') {
      this.lineChart.data.labels = ['Nov', 'Dic', 'Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott'];
      this.lineChart.data.datasets[0].data = [3100, 4200, 3300, 3200, 3500, 3600, 3400, 3600, 3500, 3900, 3700, 3850];
      this.lineChart.data.datasets[1].data = [2300, 3100, 2200, 2050, 2100, 2300, 2150, 2400, 2600, 2800, 2100, 2214];
    } else {
      const data = mockFinancialData.cashFlowHistory;
      this.lineChart.data.labels = data.labels;
      this.lineChart.data.datasets[0].data = data.income;
      this.lineChart.data.datasets[1].data = data.expenses;
    }
    this.lineChart.update();
  }

  initDonutChart(categories) {
    const canvas = document.getElementById('categoryDonutCanvas');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDarkMode ? '#F5F5F7' : '#1D1D1F';
    const subTextColor = isDarkMode ? '#98989D' : '#86868B';

    // Center Text plugin for Apple-style Ring
    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = width / 2;
        const centerY = height / 2;

        ctx.font = '500 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
        ctx.fillStyle = subTextColor;
        ctx.fillText('Totale Mese', centerX, centerY - 10);

        ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
        ctx.fillStyle = textColor;
        ctx.fillText('€ 2.214', centerX, centerY + 10);

        ctx.restore();
      }
    };

    this.donutChart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories.map(c => c.name),
        datasets: [{
          data: categories.map(c => c.amount),
          backgroundColor: categories.map(c => c.color),
          borderWidth: 2,
          borderColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          hoverOffset: 6
        }]
      },
      plugins: [centerTextPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300
        },
        cutout: '74%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: isDarkMode ? 'rgba(30, 30, 32, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDarkMode ? '#FFFFFF' : '#1D1D1F',
            bodyColor: isDarkMode ? '#AEAEB2' : '#6E6E73',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (context) => {
                return ` ${context.label}: ${this.formatCurrency(context.parsed)}`;
              }
            }
          }
        }
      }
    });
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
}
