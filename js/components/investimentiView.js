/**
 * Apple Design System - Investimenti & Patrimonio Reale
 * - Asset Allocation reale da scheda Saldi (XEON, VWCE, Fondo Pensione, Liquidità)
 * - Calcolo Net Worth aggregato (17.354,81 €)
 * - Simulatore PAC interattivo Apple Spec (su VWCE con versamento mensile 200€)
 * - Pillole finanziarie
 */

import { financeStore } from '../data/mockData.js';

export class InvestimentiView {
  constructor() {
    this.allocationChart = null;
    this.pacChart = null;
    this.pacParams = {
      initialCapital: 3410,
      monthlyDeposit: 200,
      annualReturn: 8.0,
      years: 15
    };
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
    const accounts = financeStore.getAccounts();

    // Rileva saldi reali
    const xeon = accounts.find(a => a.name.includes('XEON'))?.balance || 5383.32;
    const vwce = accounts.find(a => a.name.includes('VWCE'))?.balance || 3410.25;
    const pensione = accounts.find(a => a.name.includes('Pensione'))?.balance || 4391.24;
    const liquid = (accounts.find(a => a.name.includes('Buddybank'))?.balance || 4160.00) + (accounts.find(a => a.name.includes('Contanti'))?.balance || 10.00);

    const totalPortfolio = xeon + vwce + pensione + liquid;
    const totalInvestedDirect = xeon + vwce;

    const allocationData = [
      { name: 'Trade Republic - XEON (Sicurezza / Emergenza)', amount: xeon, color: '#34C759', type: 'Monetario Overnight' },
      { name: 'Trade Republic - VWCE (Azionario Globale PAC)', amount: vwce, color: '#0071E3', type: 'ETF Globale' },
      { name: 'Fondo Pensione (Previdenza Complementare)', amount: pensione, color: '#AF52DE', type: 'Fondo Pensione' },
      { name: 'Liquidità Corrente (Buddybank + Contanti)', amount: liquid, color: '#FF9500', type: 'Conto Corrente' }
    ].map(item => ({
      ...item,
      percentage: ((item.amount / totalPortfolio) * 100).toFixed(1)
    }));

    container.innerHTML = `
      <div class="investimenti-layout">

        <!-- 1. Portfolio KPI Strip -->
        <section class="investimenti-kpi-grid">
          
          <div class="kpi-card highlight-card">
            <div class="kpi-header">
              <span class="kpi-label">Patrimonio Complessivo</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(totalPortfolio)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">Dati Reali</span>
                <span class="trend-context">Sincronizzato da Saldi</span>
              </div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Investito Diretto (ETF & Monetario)</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(totalInvestedDirect)}</span>
              <div class="kpi-footer">
                <span class="trend-context">XEON (${this.formatCurrency(xeon)}) + VWCE (${this.formatCurrency(vwce)})</span>
              </div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Previdenza Complementare</span>
              <div class="kpi-icon-badge" style="background: rgba(175, 82, 222, 0.15); color: #AF52DE;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(pensione)}</span>
              <div class="kpi-footer">
                <span class="trend-context">Fondo Pensione di Categoria</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Asset Allocation Reale & Strategia -->
        <section class="investimenti-main-grid">
          
          <div class="chart-card donut-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Asset Allocation Reale</h3>
                <span class="chart-subtitle">Ripartizione del patrimonio secondo la scheda Saldi</span>
              </div>
            </div>
            <div class="donut-chart-container">
              <div class="donut-canvas-wrapper">
                <canvas id="investmentsDonutCanvas"></canvas>
                <div class="donut-center-text">
                  <span class="donut-center-label">Totale Net Worth</span>
                  <span class="donut-center-value">${this.formatCurrency(totalPortfolio)}</span>
                </div>
              </div>
              <div class="donut-legend">
                ${allocationData.map(a => `
                  <div class="legend-item">
                    <span class="legend-color-dot" style="background-color: ${a.color};"></span>
                    <span class="legend-name">${a.name}</span>
                    <span class="legend-percent">${a.percentage}%</span>
                    <span class="legend-amount">${this.formatCurrency(a.amount)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Dettaglio Strumenti Reali -->
          <div class="invest-holdings-card">
            <div class="chart-header">
              <h3>Strumenti & Conti di Investimento</h3>
            </div>
            <div class="holdings-list">
              
              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(52, 199, 89, 0.15); color: #34C759;">XEON</div>
                  <div>
                    <span class="holding-name">Trade Republic - XEON</span>
                    <span class="holding-type">Fondo Emergenza / Monetario Overnight</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(xeon)}</span>
                  <span class="holding-sub">Target reintegro: +1.500 €</span>
                </div>
              </div>

              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(0, 113, 227, 0.15); color: #0071E3;">VWCE</div>
                  <div>
                    <span class="holding-name">Trade Republic - VWCE</span>
                    <span class="holding-type">Azionario Globale All-World (PAC attivo 200 €/mese)</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(vwce)}</span>
                  <span class="holding-sub" style="color: #34C759;">In arrivo 200 € a inizio mese</span>
                </div>
              </div>

              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(175, 82, 222, 0.15); color: #AF52DE;">PENSIONE</div>
                  <div>
                    <span class="holding-name">Fondo Pensione</span>
                    <span class="holding-type">Previdenza Complementare Integrativa</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(pensione)}</span>
                  <span class="holding-sub">Snapshot consolidato</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        <!-- 3. Simulatore PAC & Interesse Composto Apple Spec -->
        <section class="simulator-card">
          <div class="chart-header">
            <div>
              <h3>Simulatore PAC & Crescita Composta</h3>
              <span class="card-subtitle">Calcola la proiezione futura del tuo PAC azionario (es. VWCE)</span>
            </div>
          </div>

          <div class="simulator-grid">
            
            <!-- Controlli Slider Apple -->
            <div class="sim-controls">
              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Capitale Iniziale (€)</span>
                  <span class="sim-value" id="val-capitale-iniziale">${this.formatCurrency(this.pacParams.initialCapital)}</span>
                </div>
                <input type="range" class="apple-slider" id="slider-capitale" min="0" max="25000" step="250" value="${this.pacParams.initialCapital}">
              </div>

              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Versamento Mensile (€)</span>
                  <span class="sim-value" id="val-versamento-mensile">${this.formatCurrency(this.pacParams.monthlyDeposit)}</span>
                </div>
                <input type="range" class="apple-slider" id="slider-versamento" min="50" max="1500" step="25" value="${this.pacParams.monthlyDeposit}">
              </div>

              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Rendimento Annuo Stimato (%)</span>
                  <span class="sim-value" id="val-rendimento-annuo">${this.pacParams.annualReturn}%</span>
                </div>
                <input type="range" class="apple-slider" id="slider-rendimento" min="1" max="15" step="0.5" value="${this.pacParams.annualReturn}">
              </div>

              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Orizzonte Temporale</span>
                  <span class="sim-value" id="val-orizzonte">${this.pacParams.years} anni</span>
                </div>
                <input type="range" class="apple-slider" id="slider-orizzonte" min="3" max="35" step="1" value="${this.pacParams.years}">
              </div>
            </div>

            <!-- Proiezione Grafica & Risultato -->
            <div class="sim-results-pane">
              <div class="sim-kpi-summary">
                <div class="sim-kpi">
                  <span class="sim-kpi-label">Capitale Versato</span>
                  <span class="sim-kpi-value" id="sim-kpi-versato">€0,00</span>
                </div>
                <div class="sim-kpi">
                  <span class="sim-kpi-label">Interessi Composti</span>
                  <span class="sim-kpi-value positive" id="sim-kpi-interessi">+€0,00</span>
                </div>
                <div class="sim-kpi highlight">
                  <span class="sim-kpi-label">Valore Finale Stimato</span>
                  <span class="sim-kpi-value" id="sim-kpi-totale">€0,00</span>
                </div>
              </div>
              <div class="sim-canvas-wrapper">
                <canvas id="pacProjectionCanvas"></canvas>
              </div>
            </div>

          </div>
        </section>

      </div>
    `;

    setTimeout(() => {
      this.initAllocationDonut(allocationData);
      this.updatePacSimulation();
      this.bindSimulatorEvents();
    }, 60);
  }

  destroyCharts() {
    if (this.allocationChart) {
      this.allocationChart.destroy();
      this.allocationChart = null;
    }
    if (this.pacChart) {
      this.pacChart.destroy();
      this.pacChart = null;
    }
  }

  initAllocationDonut(allocationData) {
    const canvas = document.getElementById('investmentsDonutCanvas');
    if (!canvas || !window.Chart) return;

    this.allocationChart = new window.Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: allocationData.map(a => a.name),
        datasets: [{
          data: allocationData.map(a => a.amount),
          backgroundColor: allocationData.map(a => a.color),
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

  bindSimulatorEvents() {
    const sCap = document.getElementById('slider-capitale');
    const sVer = document.getElementById('slider-versamento');
    const sRen = document.getElementById('slider-rendimento');
    const sOri = document.getElementById('slider-orizzonte');

    const update = () => {
      this.pacParams.initialCapital = parseFloat(sCap.value);
      this.pacParams.monthlyDeposit = parseFloat(sVer.value);
      this.pacParams.annualReturn = parseFloat(sRen.value);
      this.pacParams.years = parseInt(sOri.value, 10);

      document.getElementById('val-capitale-iniziale').textContent = this.formatCurrency(this.pacParams.initialCapital);
      document.getElementById('val-versamento-mensile').textContent = this.formatCurrency(this.pacParams.monthlyDeposit);
      document.getElementById('val-rendimento-annuo').textContent = this.pacParams.annualReturn + '%';
      document.getElementById('val-orizzonte').textContent = this.pacParams.years + ' anni';

      this.updatePacSimulation();
    };

    if (sCap) sCap.addEventListener('input', update);
    if (sVer) sVer.addEventListener('input', update);
    if (sRen) sRen.addEventListener('input', update);
    if (sOri) sOri.addEventListener('input', update);
  }

  updatePacSimulation() {
    const P = this.pacParams.initialCapital;
    const PMT = this.pacParams.monthlyDeposit;
    const r = (this.pacParams.annualReturn / 100) / 12;
    const years = this.pacParams.years;

    const labels = [];
    const investedData = [];
    const totalData = [];

    for (let y = 0; y <= years; y++) {
      labels.push(`Anno ${y}`);
      const months = y * 12;
      const totalInvested = P + (PMT * months);
      let futureValue = P * Math.pow(1 + r, months);
      if (r > 0 && months > 0) {
        futureValue += PMT * ((Math.pow(1 + r, months) - 1) / r);
      } else if (months > 0) {
        futureValue += PMT * months;
      }
      investedData.push(Math.round(totalInvested));
      totalData.push(Math.round(futureValue));
    }

    const finalInvested = investedData[investedData.length - 1];
    const finalTotal = totalData[totalData.length - 1];
    const finalInterests = Math.max(0, finalTotal - finalInvested);

    const elInv = document.getElementById('sim-kpi-versato');
    const elInt = document.getElementById('sim-kpi-interessi');
    const elTot = document.getElementById('sim-kpi-totale');
    if (elInv) elInv.textContent = this.formatCurrency(finalInvested);
    if (elInt) elInt.textContent = '+' + this.formatCurrency(finalInterests);
    if (elTot) elTot.textContent = this.formatCurrency(finalTotal);

    const canvas = document.getElementById('pacProjectionCanvas');
    if (!canvas || !window.Chart) return;

    if (this.pacChart) {
      this.pacChart.data.labels = labels;
      this.pacChart.data.datasets[0].data = investedData;
      this.pacChart.data.datasets[1].data = totalData;
      this.pacChart.update();
      return;
    }

    const ctx = canvas.getContext('2d');
    this.pacChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Capitale Versato',
            data: investedData,
            borderColor: '#8E8E93',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Valore con Interessi Composti',
            data: totalData,
            borderColor: '#34C759',
            backgroundColor: 'rgba(52, 199, 89, 0.15)',
            borderWidth: 2.5,
            pointRadius: 3,
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', align: 'end', labels: { boxWidth: 10, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.06)' }, ticks: { callback: (v) => '€' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v) } }
        }
      }
    });
  }
}
