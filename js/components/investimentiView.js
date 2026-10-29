/**
 * Apple Design System - Investimenti View Component
 * Include:
 * 1. KPI Portafoglio (Capitale Investito, Valore Attuale, P&L € e %, Rendimento Annualizzato)
 * 2. Donut Asset Allocation (Chart.js)
 * 3. Tabella Strumenti & Posizioni Aperte (con stato PAC e PMC)
 * 4. Simulatore Interattivo PAC & Interesse Composto con Slider in tempo reale
 * 5. Sezione "Pillole di Investimento" con card Apple interattive
 */

import { mockInvestmentsData } from '../data/mockInvestmentsData.js';

export class InvestimentiView {
  constructor() {
    this.allocationChart = null;
    this.simulationChart = null;
    // Parametri default simulatore PAC
    this.simParams = {
      initialCapital: 5000,
      monthlyContribution: 400,
      annualReturn: 7.0,
      years: 15
    };
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  }

  calculateSimulation() {
    const { initialCapital, monthlyContribution, annualReturn, years } = this.simParams;
    const months = years * 12;
    const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;

    let invested = initialCapital;
    let total = initialCapital;

    const labels = [];
    const investedData = [];
    const totalData = [];

    for (let y = 0; y <= years; y++) {
      labels.push(`Anno ${y}`);
      if (y === 0) {
        investedData.push(initialCapital);
        totalData.push(initialCapital);
      } else {
        // Calcola andamento anno per anno
        for (let m = 0; m < 12; m++) {
          total = total * (1 + monthlyRate) + monthlyContribution;
          invested += monthlyContribution;
        }
        investedData.push(Math.round(invested));
        totalData.push(Math.round(total));
      }
    }

    const interestEarned = total - invested;

    return {
      labels,
      investedData,
      totalData,
      finalInvested: Math.round(invested),
      finalTotal: Math.round(total),
      interestEarned: Math.round(interestEarned)
    };
  }

  render(container) {
    this.destroyCharts();
    const data = mockInvestmentsData;
    const simResults = this.calculateSimulation();

    container.innerHTML = `
      <div class="investimenti-layout">
        
        <!-- 1. Top Portfolio KPI Grid -->
        <section class="kpi-grid">
          
          <!-- Card 1: Controvalore Attuale -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Valore Attuale Portafoglio</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(data.portfolioSummary.currentValue)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  +${data.portfolioSummary.totalProfitLossPercent}%
                </span>
                <span class="trend-context">profitto totale</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Capitale Versato -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Capitale Versato</span>
              <div class="kpi-icon-badge" style="background: linear-gradient(135deg, #8E8E93, #636366);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <rect x="2" y="4" width="20" height="16" rx="3"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(data.portfolioSummary.totalInvested)}</span>
              <div class="kpi-footer">
                <span class="trend-badge neutral">
                  PAC Attivo
                </span>
                <span class="trend-context">€ ${data.portfolioSummary.monthlyPacContribution}/mese</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Plusvalenza / Profit & Loss -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Plusvalenza Totale (P&L)</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value" style="color: var(--apple-green);">+${this.formatCurrency(data.portfolioSummary.totalProfitLoss)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  +${data.portfolioSummary.annualizedReturn}%
                </span>
                <span class="trend-context">rendimento annuo stimato</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Strumenti Attivi -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Strumenti in Portafoglio</span>
              <div class="kpi-icon-badge savings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="12 6 12 12 16 14"></polygon>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value" style="color: var(--apple-purple);">${data.holdings.length} Asset</span>
              <div class="kpi-footer">
                <span class="trend-badge neutral">
                  3 PAC Automatici
                </span>
                <span class="trend-context">All-World core</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Asset Allocation & Breakdown Grid -->
        <section class="charts-grid">
          
          <!-- Allocation Donut Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Asset Allocation Strategica</h3>
                <p>Ripartizione percentuale per classe di investimento</p>
              </div>
            </div>
            <div class="chart-canvas-container" style="min-height: 220px; max-height: 240px;">
              <canvas id="allocationDonutCanvas"></canvas>
            </div>
            <div class="category-legend-list" style="margin-top: 14px;">
              ${data.allocation.map(item => `
                <div class="category-legend-item">
                  <div class="category-info">
                    <span class="category-color-dot" style="background-color: ${item.color};"></span>
                    <span>${item.category}</span>
                  </div>
                  <div class="category-metrics">
                    <span class="category-percentage">${item.percentage}%</span>
                    <span>${this.formatCurrency(item.amount)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Performance & PAC Overview Card -->
          <div class="chart-card" style="justify-content: space-between;">
            <div>
              <div class="chart-header" style="margin-bottom: 12px;">
                <div class="chart-title-group">
                  <h3>Strategia del Portafoglio</h3>
                  <p>Architettura Core-Satellite & Piano di Accumulo</p>
                </div>
              </div>
              <div class="portfolio-notes-box">
                <div class="strategy-badge">
                  <span class="strategy-dot"></span>
                  <span>Strategia Passiva Indicizzata a Basso Costo</span>
                </div>
                <p class="strategy-desc">
                  Il portafoglio adotta una solida struttura Core basata sull'azionario globale (VWCE) affiancato da una componente stabilizzatrice in obbligazionario globale e oro fisico a copertura da shock inflazionistici.
                </p>
                <div class="strategy-stats-row">
                  <div class="strategy-stat-cell">
                    <span class="cell-label">TER Medio Ponderato</span>
                    <span class="cell-val">0.19%</span>
                  </div>
                  <div class="strategy-stat-cell">
                    <span class="cell-label">Reinvestimento</span>
                    <span class="cell-val">Accumulo (Acc)</span>
                  </div>
                  <div class="strategy-stat-cell">
                    <span class="cell-label">Frequenza PAC</span>
                    <span class="cell-val">Mensile (il 1°)</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pac-quick-highlight">
              <div class="pac-highlight-left">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--apple-blue)" stroke-width="2.2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                <div>
                  <strong>Prossimo Bonifico PAC Programmato</strong>
                  <span>1 Novembre 2026 • € 600,00</span>
                </div>
              </div>
              <span class="status-active-pill">Attivo</span>
            </div>
          </div>

        </section>

        <!-- 3. Tabella Strumenti & Posizioni Aperte -->
        <section class="movimenti-table-card">
          <div class="chart-header" style="padding: 20px 24px 14px; margin-bottom: 0;">
            <div class="chart-title-group">
              <h3>Strumenti in Portafoglio</h3>
              <p>Dettaglio quote, prezzo medio di carico (PMC), quotazione e rendimento per posizione</p>
            </div>
          </div>

          <!-- Desktop Table Header -->
          <div class="mov-table-header">
            <span class="mov-col" style="width: 100px;">Ticker / ISIN</span>
            <span class="mov-col" style="flex: 1.4;">Strumento</span>
            <span class="mov-col" style="width: 80px; text-align: right;">Quote</span>
            <span class="mov-col" style="width: 100px; text-align: right;">PMC</span>
            <span class="mov-col" style="width: 100px; text-align: right;">Prezzo Att.</span>
            <span class="mov-col" style="width: 130px; text-align: right;">Valore Tot.</span>
            <span class="mov-col" style="width: 130px; text-align: right;">P&L (€ / %)</span>
          </div>

          <div class="mov-table-body">
            ${data.holdings.map(h => `
              <div class="mov-table-row">
                <span class="mov-col" style="width: 100px;">
                  <strong style="color: var(--apple-blue);">${h.ticker}</strong>
                  <span style="font-size: 10px; color: var(--text-tertiary); display: block;">${h.isin}</span>
                </span>
                <span class="mov-col" style="flex: 1.4; display: flex; flex-direction: column; gap: 2px;">
                  <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${h.name}</span>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="mov-cat-pill" style="font-size: 11px; padding: 2px 8px;">${h.type}</span>
                    ${h.isPac ? `<span class="pac-mini-badge">PAC €${h.pacMonthly}/m</span>` : ''}
                  </div>
                </span>
                <span class="mov-col" style="width: 80px; text-align: right; font-weight: 600;">${h.shares}</span>
                <span class="mov-col" style="width: 100px; text-align: right; color: var(--text-secondary);">€ ${h.pmc.toFixed(2)}</span>
                <span class="mov-col" style="width: 100px; text-align: right; font-weight: 600;">€ ${h.currentPrice.toFixed(2)}</span>
                <span class="mov-col" style="width: 130px; text-align: right; font-weight: 700;">${this.formatCurrency(h.currentValue)}</span>
                <span class="mov-col" style="width: 130px; text-align: right;">
                  <span style="color: var(--apple-green); font-weight: 700; display: block;">+${this.formatCurrency(h.pnl)}</span>
                  <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">+${h.pnlPercent.toFixed(2)}%</span>
                </span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 4. SEZIONE SIMULATORE PAC & INTERESSE COMPOSTO (Richiesta dell'utente) -->
        <section class="simulation-section-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <div class="section-tag-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                <span>Simulatore Interattivo</span>
              </div>
              <h2 style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; margin-top: 6px;">Calcolatore Proiezione PAC & Interesse Composto</h2>
              <p>Simula l'effetto della capitalizzazione composta modificando versamenti e orizzonte temporale</p>
            </div>
          </div>

          <div class="simulation-grid">
            <!-- Controls / Sliders -->
            <div class="sim-controls-panel">
              
              <!-- Initial Capital -->
              <div class="sim-input-group">
                <div class="sim-label-row">
                  <label for="sim-initial">Capitale Iniziale</label>
                  <span class="sim-value-badge" id="val-sim-initial">€ ${this.simParams.initialCapital.toLocaleString('it-IT')}</span>
                </div>
                <input type="range" class="apple-slider" id="slider-sim-initial" min="0" max="50000" step="1000" value="${this.simParams.initialCapital}" />
                <div class="slider-ticks"><span>€ 0</span><span>€ 25.000</span><span>€ 50.000</span></div>
              </div>

              <!-- Monthly PAC -->
              <div class="sim-input-group">
                <div class="sim-label-row">
                  <label for="sim-monthly">Versamento Mensile (PAC)</label>
                  <span class="sim-value-badge" id="val-sim-monthly">€ ${this.simParams.monthlyContribution} / mese</span>
                </div>
                <input type="range" class="apple-slider" id="slider-sim-monthly" min="50" max="2500" step="50" value="${this.simParams.monthlyContribution}" />
                <div class="slider-ticks"><span>€ 50</span><span>€ 1.250</span><span>€ 2.500</span></div>
              </div>

              <!-- Annual Expected Return -->
              <div class="sim-input-group">
                <div class="sim-label-row">
                  <label for="sim-return">Rendimento Annuo Stimato</label>
                  <span class="sim-value-badge" id="val-sim-return">${this.simParams.annualReturn}%</span>
                </div>
                <input type="range" class="apple-slider" id="slider-sim-return" min="2" max="14" step="0.5" value="${this.simParams.annualReturn}" />
                <div class="slider-ticks"><span>2% (Prudente)</span><span>7% (Med. Storica)</span><span>14% (Aggressivo)</span></div>
              </div>

              <!-- Duration in Years -->
              <div class="sim-input-group">
                <div class="sim-label-row">
                  <label for="sim-years">Orizzonte Temporale</label>
                  <span class="sim-value-badge" id="val-sim-years">${this.simParams.years} Anni</span>
                </div>
                <input type="range" class="apple-slider" id="slider-sim-years" min="5" max="35" step="1" value="${this.simParams.years}" />
                <div class="slider-ticks"><span>5 Anni</span><span>20 Anni</span><span>35 Anni</span></div>
              </div>

            </div>

            <!-- Simulation Outputs & Chart -->
            <div class="sim-results-panel">
              <div class="sim-results-cards">
                <div class="sim-res-card total">
                  <span class="res-label">Capitale Finale Stimato</span>
                  <span class="res-val" id="res-total">${this.formatCurrency(simResults.finalTotal)}</span>
                </div>
                <div class="sim-res-card invested">
                  <span class="res-label">Capitale Versato</span>
                  <span class="res-val" id="res-invested">${this.formatCurrency(simResults.finalInvested)}</span>
                </div>
                <div class="sim-res-card interest">
                  <span class="res-label">Interessi Composti Generati</span>
                  <span class="res-val" id="res-interest">+${this.formatCurrency(simResults.interestEarned)}</span>
                </div>
              </div>

              <div class="chart-canvas-container" style="min-height: 250px; margin-top: 16px;">
                <canvas id="simulationCanvas"></canvas>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. SEZIONE PILLOLE DI INVESTIMENTO (Richiesta dell'utente) -->
        <section class="pills-section">
          <div class="chart-header">
            <div class="chart-title-group">
              <div class="section-tag-badge" style="background: rgba(175, 82, 222, 0.12); color: var(--apple-purple);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <span>Academy & Nozioni Chiave</span>
              </div>
              <h2 style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; margin-top: 6px;">Pillole di Investimento</h2>
              <p>Concetti fondamentali di finanza personale ed educazione agli investimenti di lungo termine</p>
            </div>
          </div>

          <div class="pills-grid">
            ${data.financialPills.map(p => `
              <div class="pill-card" data-id="${p.id}">
                <div class="pill-card-top">
                  <span class="pill-tag">${p.tag}</span>
                  <span class="pill-read-time">${p.readTime}</span>
                </div>
                <h4 class="pill-title">${p.title}</h4>
                <p class="pill-snippet">${p.snippet}</p>
                <div class="pill-expand-content">
                  <div class="pill-divider"></div>
                  <p class="pill-details">${p.details}</p>
                </div>
                <button class="pill-toggle-btn">
                  <span>Approfondisci</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </section>

      </div>
    `;

    // Bind Controls
    this.bindEvents(container);

    // Render Charts
    setTimeout(() => {
      this.initAllocationChart(data.allocation);
      this.initSimulationChart(simResults);
    }, 60);
  }

  bindEvents(container) {
    // Simulator Sliders
    const initialSlider = document.getElementById('slider-sim-initial');
    const monthlySlider = document.getElementById('slider-sim-monthly');
    const returnSlider = document.getElementById('slider-sim-return');
    const yearsSlider = document.getElementById('slider-sim-years');

    const updateSim = () => {
      this.simParams.initialCapital = parseFloat(initialSlider.value);
      this.simParams.monthlyContribution = parseFloat(monthlySlider.value);
      this.simParams.annualReturn = parseFloat(returnSlider.value);
      this.simParams.years = parseInt(yearsSlider.value, 10);

      // Update badge text
      document.getElementById('val-sim-initial').textContent = `€ ${this.simParams.initialCapital.toLocaleString('it-IT')}`;
      document.getElementById('val-sim-monthly').textContent = `€ ${this.simParams.monthlyContribution} / mese`;
      document.getElementById('val-sim-return').textContent = `${this.simParams.annualReturn}%`;
      document.getElementById('val-sim-years').textContent = `${this.simParams.years} Anni`;

      // Recalculate
      const res = this.calculateSimulation();
      document.getElementById('res-total').textContent = this.formatCurrency(res.finalTotal);
      document.getElementById('res-invested').textContent = this.formatCurrency(res.finalInvested);
      document.getElementById('res-interest').textContent = `+${this.formatCurrency(res.interestEarned)}`;

      // Update Chart
      if (this.simulationChart) {
        this.simulationChart.data.labels = res.labels;
        this.simulationChart.data.datasets[0].data = res.totalData;
        this.simulationChart.data.datasets[1].data = res.investedData;
        this.simulationChart.update('none'); // silent instant update without lag
      }
    };

    if (initialSlider) initialSlider.addEventListener('input', updateSim);
    if (monthlySlider) monthlySlider.addEventListener('input', updateSim);
    if (returnSlider) returnSlider.addEventListener('input', updateSim);
    if (yearsSlider) yearsSlider.addEventListener('input', updateSim);

    // Financial Pills Accordion / Expand
    container.querySelectorAll('.pill-card').forEach(card => {
      const btn = card.querySelector('.pill-toggle-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const isExpanded = card.classList.toggle('expanded');
          btn.querySelector('span').textContent = isExpanded ? 'Riduci' : 'Approfondisci';
          btn.querySelector('svg').style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        });
      }
    });
  }

  initAllocationChart(allocationData) {
    const canvas = document.getElementById('allocationDonutCanvas');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDarkMode ? '#F5F5F7' : '#1D1D1F';
    const subTextColor = isDarkMode ? '#98989D' : '#86868B';

    const centerTextPlugin = {
      id: 'centerAllocationText',
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.font = '500 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
        ctx.fillStyle = subTextColor;
        ctx.fillText('Totale Investito', centerX, centerY - 10);

        ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
        ctx.fillStyle = textColor;
        ctx.fillText('€ 48.920', centerX, centerY + 10);

        ctx.restore();
      }
    };

    this.allocationChart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: allocationData.map(a => a.category),
        datasets: [{
          data: allocationData.map(a => a.amount),
          backgroundColor: allocationData.map(a => a.color),
          borderWidth: 2,
          borderColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
          hoverOffset: 6
        }]
      },
      plugins: [centerTextPlugin],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        cutout: '74%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDarkMode ? 'rgba(30, 30, 32, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDarkMode ? '#FFFFFF' : '#1D1D1F',
            bodyColor: isDarkMode ? '#AEAEB2' : '#6E6E73',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (context) => ` ${context.label}: ${this.formatCurrency(context.parsed)}`
            }
          }
        }
      }
    });
  }

  initSimulationChart(simResults) {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDarkMode ? '#98989D' : '#86868B';

    // Gradients
    const totalGradient = ctx.createLinearGradient(0, 0, 0, 240);
    totalGradient.addColorStop(0, 'rgba(52, 199, 89, 0.35)');
    totalGradient.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

    const investedGradient = ctx.createLinearGradient(0, 0, 0, 240);
    investedGradient.addColorStop(0, 'rgba(0, 113, 227, 0.25)');
    investedGradient.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    this.simulationChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: simResults.labels,
        datasets: [
          {
            label: 'Capitale Finale (con Interessi)',
            data: simResults.totalData,
            borderColor: '#34C759',
            backgroundColor: totalGradient,
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointRadius: 0,
            pointHoverRadius: 6
          },
          {
            label: 'Capitale Versato (Senza Interessi)',
            data: simResults.investedData,
            borderColor: '#0071E3',
            backgroundColor: investedGradient,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: true,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        interaction: { mode: 'index', intersect: false },
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
                size: 11,
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
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (context) => ` ${context.dataset.label}: ${this.formatCurrency(context.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: gridColor, drawBorder: false },
            ticks: { color: textColor, font: { size: 10 } }
          },
          y: {
            grid: { color: gridColor, drawBorder: false },
            ticks: {
              color: textColor,
              font: { size: 10 },
              callback: (val) => `€ ${(val / 1000).toFixed(0)}k`
            }
          }
        }
      }
    });
  }

  destroyCharts() {
    if (this.allocationChart) {
      this.allocationChart.destroy();
      this.allocationChart = null;
    }
    if (this.simulationChart) {
      this.simulationChart.destroy();
      this.simulationChart = null;
    }
  }
}
