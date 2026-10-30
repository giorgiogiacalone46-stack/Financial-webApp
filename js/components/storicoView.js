/**
 * Apple Design System - Patrimonio & Storico View Component
 * Mostra l'evoluzione temporale del Net Worth (2024 - 2026) e la matrice per anno da gestionale
 */

import { financeStore } from '../data/mockData.js';
import { INITIAL_HISTORICAL_NW } from '../data/realData.js';

export class StoricoView {
  constructor() {
    this.historyChart = null;
    this.selectedYear = 'all'; // 'all' | '2026' | '2025' | '2024'
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
    const rawData = INITIAL_HISTORICAL_NW.filter(d => d.value > 0);
    const summary = financeStore.summary;

    // Filtra per anno se selezionato
    const filteredData = this.selectedYear === 'all' 
      ? rawData 
      : rawData.filter(d => d.month.endsWith(this.selectedYear));

    const firstVal = filteredData.length > 0 ? filteredData[0].value : 0;
    const lastVal = summary.netWorth;
    const netGrowth = lastVal - firstVal;
    const growthPercent = firstVal > 0 ? ((netGrowth / firstVal) * 100).toFixed(1) : 0;

    container.innerHTML = `
      <div class="storico-layout">

        <!-- Top Header & Year Filter -->
        <div class="storico-toolbar">
          <div class="storico-kpi-banner">
            <div>
              <span class="banner-label">Crescita Totale Registrata</span>
              <div class="banner-value-row">
                <span class="banner-val">${this.formatCurrency(lastVal)}</span>
                <span class="banner-badge positive">+${growthPercent}% (+${this.formatCurrency(netGrowth)})</span>
              </div>
              <span class="banner-sub">Da ${filteredData[0]?.month || '01/2024'} a oggi</span>
            </div>
          </div>

          <div class="segmented-control" id="storico-year-toggle">
            <button class="segment-btn ${this.selectedYear === 'all' ? 'active' : ''}" data-year="all">Tutto</button>
            <button class="segment-btn ${this.selectedYear === '2026' ? 'active' : ''}" data-year="2026">2026</button>
            <button class="segment-btn ${this.selectedYear === '2025' ? 'active' : ''}" data-year="2025">2025</button>
            <button class="segment-btn ${this.selectedYear === '2024' ? 'active' : ''}" data-year="2024">2024</button>
          </div>
        </div>

        <!-- Grafico Evoluzione Net Worth -->
        <section class="chart-card">
          <div class="chart-header">
            <div>
              <h3>Evoluzione Net Worth Nel Tempo</h3>
              <span class="chart-subtitle">Andamento del patrimonio complessivo (foglio Historical NW)</span>
            </div>
          </div>
          <div class="chart-canvas-container" style="min-height: 280px;">
            <canvas id="historicalNWCanvas"></canvas>
          </div>
        </section>

        <!-- Matrice Storica / Tabella Mensile -->
        <section class="historical-table-card">
          <div class="chart-header">
            <h3>Riepilogo Storico per Mensilità</h3>
          </div>
          <div class="hist-table-container">
            <table class="apple-table">
              <thead>
                <tr>
                  <th>Mese / Anno</th>
                  <th>Patrimonio (Net Worth)</th>
                  <th>Variazione Mensile</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                ${[...filteredData].reverse().map((row, idx, arr) => {
                  const prevVal = idx < arr.length - 1 ? arr[idx + 1].value : row.value;
                  const diff = row.value - prevVal;
                  const diffPercent = prevVal > 0 ? ((diff / prevVal) * 100).toFixed(1) : 0;
                  const isPositive = diff >= 0;
                  return `
                    <tr>
                      <td class="font-medium">${row.month}</td>
                      <td class="font-bold">${this.formatCurrency(row.value)}</td>
                      <td class="${isPositive ? 'income-color' : 'expense-color'}">
                        ${diff !== 0 ? (isPositive ? '+' : '') + this.formatCurrency(diff) + ` (${diffPercent}%)` : '-'}
                      </td>
                      <td>
                        <span class="status-chip ${isPositive ? 'chip-green' : 'chip-orange'}">
                          ${isPositive ? 'Crescita' : 'Flessione'}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    `;

    setTimeout(() => {
      this.initChart(filteredData);
      this.bindEvents(container);
    }, 60);
  }

  destroyCharts() {
    if (this.historyChart) {
      this.historyChart.destroy();
      this.historyChart = null;
    }
  }

  initChart(data) {
    const canvas = document.getElementById('historicalNWCanvas');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    grad.addColorStop(0, 'rgba(0, 113, 227, 0.35)');
    grad.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    this.historyChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.month),
        datasets: [{
          label: 'Patrimonio Net Worth',
          data: data.map(d => d.value),
          borderColor: '#0071E3',
          backgroundColor: grad,
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: '#0071E3'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` Patrimonio: ${this.formatCurrency(ctx.parsed.y)}`
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

  bindEvents(container) {
    const yearToggle = document.getElementById('storico-year-toggle');
    if (yearToggle) {
      yearToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.selectedYear = e.currentTarget.dataset.year;
          this.render(container);
        });
      });
    }
  }
}
