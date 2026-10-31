/**
 * Apple Design System - Patrimonio & Storico View Component
 * Mostra l'evoluzione temporale del Net Worth (2024 - 2026) dinamica e continua,
 * calcolata e aggiornata in tempo reale in base a movimenti, conguagli e saldi reali.
 */

import { financeStore } from '../data/mockData.js';
import { getIcon } from './icons.js';
import { monthlyClosingModal } from './monthlyClosingModal.js';

export class StoricoView {
  constructor() {
    this.historyChart = null;
    this.selectedYear = 'all'; // 'all' | '2026' | '2025' | '2024'
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  render(container) {
    this.destroyCharts();

    // Recupera la serie storica dinamica calcolata da baseline + movimenti + conguagli
    const rawData = financeStore.getHistoricalNetWorth();
    const summary = financeStore.summary;
    const recStatus = financeStore.getMonthlyReconciliationStatus();

    // Filtra per anno se selezionato
    const filteredData = this.selectedYear === 'all' 
      ? rawData 
      : rawData.filter(d => d.month.endsWith(this.selectedYear));

    const firstVal = filteredData.length > 0 ? filteredData[0].value : 0;
    const lastVal = filteredData.length > 0 ? filteredData[filteredData.length - 1].value : summary.netWorth;
    const netGrowth = lastVal - firstVal;
    const growthPercent = firstVal > 0 ? ((netGrowth / firstVal) * 100).toFixed(1) : 0;
    const isGrowthPositive = netGrowth >= 0;

    const bannerSub = this.selectedYear === 'all'
      ? `Da ${filteredData[0]?.month || '01/2024'} a oggi`
      : `Performance anno ${this.selectedYear} (${filteredData[0]?.month || ''} → ${filteredData[filteredData.length - 1]?.month || ''})`;

    container.innerHTML = `
      <div class="page storico-page">

        <!-- Top Header & Year Filter (Canonical Card Architecture) -->
        <section class="card highlight-card">
          <div class="card__header">
            <span class="card__title" title="Variazione Net Worth ${this.selectedYear === 'all' ? 'Complessiva' : this.selectedYear}">
              Variazione Net Worth ${this.selectedYear === 'all' ? 'Complessiva' : this.selectedYear}
            </span>
            <span class="badge ${isGrowthPositive ? 'badge--positive' : 'badge--negative'}">
              ${isGrowthPositive ? '+' : ''}${growthPercent}% (${isGrowthPositive ? '+' : ''}<span class="privacy-mask">${this.formatCurrency(netGrowth)}</span>)
            </span>
          </div>
          <div class="card__value privacy-mask">${this.formatCurrency(lastVal)}</div>
          <div class="card__body">
            <span style="font-size: var(--text-sm); color: var(--text-secondary);">${bannerSub}</span>
            
            <div style="display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; margin-top: var(--space-3);">
              <div class="segmented-control" id="storico-year-toggle">
                <button class="segment-btn ${this.selectedYear === 'all' ? 'active' : ''}" data-year="all">Tutto</button>
                <button class="segment-btn ${this.selectedYear === '2026' ? 'active' : ''}" data-year="2026">2026</button>
                <button class="segment-btn ${this.selectedYear === '2025' ? 'active' : ''}" data-year="2025">2025</button>
                <button class="segment-btn ${this.selectedYear === '2024' ? 'active' : ''}" data-year="2024">2024</button>
              </div>
              <button class="apple-btn-secondary" id="btn-snapshot-modal" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Fissa o salva lo snapshot del mese corrente">
                ${getIcon('target', 13)}
                <span>Fissa Snapshot</span>
              </button>
              <button class="apple-btn-secondary" id="btn-tax-report-modal" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Visualizza e stampa il report patrimoniale e fiscale">
                ${getIcon('list', 13)}
                <span>Report Fiscale</span>
              </button>
              <button class="apple-btn-secondary" id="btn-export-csv" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Esporta tutti i movimenti in formato CSV (Excel / Numbers)">
                ${getIcon('download', 13)}
                <span>Esporta CSV</span>
              </button>
              <button class="apple-btn-secondary" id="btn-export-json" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Scarica un backup completo JSON">
                ${getIcon('savings', 13)}
                <span>Backup JSON</span>
              </button>
              <button class="apple-btn-secondary" id="btn-quick-conguaglio" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; ${!recStatus.isFullyReconciled ? 'border-color: var(--apple-orange); color: var(--apple-orange); background: rgba(255, 149, 0, 0.08);' : ''}" title="Apri studio chiusura fine mese e conguaglio saldi">
                ${getIcon('conguaglio', 13)}
                <span>Chiusura Fine Mese ${!recStatus.isFullyReconciled ? `(${recStatus.pendingCount} in sospeso)` : ''}</span>
              </button>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Serie storica continua basata su movimenti e saldi reali</span>
          </div>
        </section>

        <!-- Grafico Evoluzione Net Worth (Canonical Card) -->
        <section class="card">
          <div class="card__header">
            <span class="card__title" title="Evoluzione Net Worth Nel Tempo">Evoluzione Net Worth Nel Tempo</span>
            <span class="badge badge--info">Dinamico</span>
          </div>
          <div class="card__body" style="padding: var(--space-2) 0;">
            <div class="chart-canvas-container" style="min-height: 280px;">
              <canvas id="historicalNWCanvas"></canvas>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Progressione continua basata su movimenti, conguagli e saldi reali</span>
          </div>
        </section>

        <!-- Matrice Storica / Tabella Mensile (Canonical Card) -->
        <section class="card" style="padding: 0; overflow: hidden;">
          <div style="padding: var(--space-4) var(--space-5) var(--space-2);">
            <h3 style="font-size: var(--text-base); font-weight: 700; color: var(--text-primary); margin: 0;">Riepilogo Storico per Mensilità</h3>
            <span style="font-size: var(--text-xs); color: var(--text-secondary);">Variazioni e snapshot registrati mese per mese con aggiornamento in tempo reale</span>
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
                  const isCurrent = row.isCurrent;

                  let statusChip = '';
                  if (isCurrent) {
                    statusChip = !recStatus.isFullyReconciled 
                      ? `<span class="status-chip chip-orange"><span class="live-dot" style="background-color: var(--apple-orange);"></span> In sospeso (${recStatus.pendingCount})</span>`
                      : `<span class="status-chip chip-blue"><span class="live-dot"></span> In corso</span>`;
                  } else if (isPositive) {
                    statusChip = `<span class="status-chip chip-green">Crescita</span>`;
                  } else {
                    statusChip = `<span class="status-chip chip-orange">Flessione</span>`;
                  }

                  return `
                    <tr class="${isCurrent ? 'row-current-month' : ''}">
                      <td class="font-medium">
                        ${row.month}
                        ${isCurrent ? '<span class="current-month-badge">Attuale</span>' : ''}
                      </td>
                      <td class="font-bold hist-val privacy-mask">${this.formatCurrency(row.value)}</td>
                      <td class="${isPositive ? 'income-color' : 'expense-color'} hist-delta">
                        ${diff !== 0 ? (isPositive ? '+' : '') + this.formatCurrency(diff) + ` (${diffPercent}%)` : '-'}
                      </td>
                      <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          ${statusChip}
                          <button class="apple-btn-secondary btn-table-reconcile" data-month="${row.month}" style="padding: 2px 8px; font-size: 11px; border-radius: var(--radius-pill); cursor: pointer;" title="Apri riconciliazione e chiusura per ${row.month}">
                            ${getIcon('conguaglio', 11)}
                            <span>${isCurrent ? 'Chiudi' : 'Modifica'}</span>
                          </button>
                        </div>
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

    requestAnimationFrame(() => {
      this.initChart(filteredData);
      this.bindEvents(container);
    });
  }

  destroyCharts() {
    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
      this.historyChart = null;
    }
  }

  initChart(data) {
    const canvas = document.getElementById('historicalNWCanvas');
    if (!canvas || !window.Chart) return;

    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    grad.addColorStop(0, 'rgba(0, 113, 227, 0.35)');
    grad.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    const pointRadius = data.map(d => d.isCurrent ? 6 : 3);
    const pointHoverRadius = data.map(d => d.isCurrent ? 8 : 5);
    const pointBgColor = data.map(d => d.isCurrent ? '#30D158' : '#0071E3');

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
          pointRadius: pointRadius,
          pointHoverRadius: pointHoverRadius,
          pointBackgroundColor: pointBgColor
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
              label: (ctx) => {
                const item = data[ctx.dataIndex];
                const note = item?.isCurrent ? ' (Mese Attivo / Live)' : '';
                return ` Patrimonio: ${this.formatCurrency(ctx.parsed.y)}${note}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              maxTicksLimit: 7,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  openSnapshotModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const now = new Date();
    const curMonthKey = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const liveNW = Math.round(financeStore.summary.netWorth * 100) / 100;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="snapshot-modal-overlay">
        <div class="apple-modal-sheet open" id="snapshot-modal-sheet" style="max-width: 460px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="snapshot-cancel">Annulla</button>
            <h3>Fissa Snapshot Net Worth</h3>
            <button class="modal-save-btn" id="snapshot-confirm">Salva</button>
          </div>
          <div class="modal-form">
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: var(--space-text-sub); line-height: var(--lh-body);">
              Salva o consolida il valore ufficiale del Net Worth per una specifica mensilità.
            </p>

            <div class="form-group" style="margin-bottom: var(--space-box-gap-md);">
              <label class="form-label" for="snapshot-month">Mese / Anno (MM/AAAA)</label>
              <input type="text" id="snapshot-month" class="apple-input apple-input-mono" value="${curMonthKey}" placeholder="es. 10/2026" />
            </div>

            <div class="form-group" style="margin-bottom: var(--space-box-gap-md);">
              <label class="form-label" for="snapshot-value">Patrimonio Netto Consolidato (€)</label>
              <input type="number" step="0.01" id="snapshot-value" class="apple-input apple-input-mono" value="${liveNW}" />
              <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">
                Valore live attuale dai conti: <strong>${this.formatCurrency(liveNW)}</strong>
              </span>
            </div>

            <div style="background: rgba(0, 113, 227, 0.08); border-radius: var(--radius-md); padding: 12px; margin-top: var(--space-box-gap-sm); border: 1px solid var(--border-subtle);">
              <div style="font-size: 12px; color: var(--text-secondary); line-height: var(--lh-body); display: flex; align-items: flex-start; gap: 8px;">
                <span style="color: var(--apple-blue); display: inline-flex; margin-top: 1px;">${getIcon('sparkle', 14)}</span>
                <span><strong>Come funziona</strong>: Questo fissa lo snapshot per il mese selezionato nello storico consolidato e nel grafico. Il mese in corso rimarrà comunque dinamico e collegato a spese, entrate e conguagli in tempo reale.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('snapshot-modal-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('snapshot-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('snapshot-confirm')?.addEventListener('click', () => {
      const monthInput = document.getElementById('snapshot-month')?.value.trim();
      const valInput = parseFloat(document.getElementById('snapshot-value')?.value);

      if (!monthInput || !/^\d{2}\/\d{4}$/.test(monthInput)) {
        alert('Inserisci un formato mese/anno valido come MM/AAAA (es. 10/2026).');
        return;
      }
      if (isNaN(valInput) || valInput <= 0) {
        alert('Inserisci un valore di patrimonio valido maggiore di zero.');
        return;
      }

      financeStore.saveNetWorthSnapshot(monthInput, valInput);
      close();
      this.render(container);
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

    document.getElementById('btn-snapshot-modal')?.addEventListener('click', () => {
      this.openSnapshotModal(container);
    });

    document.getElementById('btn-tax-report-modal')?.addEventListener('click', () => {
      this.openTaxReportModal(container, this.selectedYear === 'all' ? 2026 : parseInt(this.selectedYear, 10));
    });

    const btnCsv = document.getElementById('btn-export-csv');
    if (btnCsv) {
      btnCsv.addEventListener('click', () => this.handleExportCSV(btnCsv));
    }

    const btnJson = document.getElementById('btn-export-json');
    if (btnJson) {
      btnJson.addEventListener('click', () => this.handleExportJSON(btnJson));
    }

    document.getElementById('btn-quick-conguaglio')?.addEventListener('click', () => {
      monthlyClosingModal.open({
        targetMonth: recStatus.targetMonth,
        onSuccess: () => this.render(container)
      });
    });

    container.querySelectorAll('.btn-table-reconcile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetMonth = e.currentTarget.dataset.month;
        monthlyClosingModal.open({
          targetMonth: targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    });
  }

  // =========================================================================
  // REPORT PATRIMONIALE & FISCALE ANNUALE (STAMPABILE APPLE HIG)
  // =========================================================================
  openTaxReportModal(container, targetYear = 2026) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const report = financeStore.getAnnualTaxReport(targetYear);

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="tax-report-overlay">
        <div class="apple-modal-sheet open tax-report-sheet" style="max-width: 720px; max-height: 90vh; overflow-y: auto;">
          <div class="modal-handle"></div>
          
          <div class="modal-header tax-report-modal-header">
            <button class="modal-close-btn" id="tax-report-close">Chiudi</button>
            <h3 class="tax-report-title">Report Fiscale & Patrimoniale ${report.year}</h3>
            <div class="tax-modal-header-actions">
              <button class="apple-btn-primary print-trigger-btn" id="btn-print-tax-report" style="font-size: 12px; padding: 6px 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                ${getIcon('download', 13)}
                <span>Stampa / Salva PDF</span>
              </button>
            </div>
          </div>

          <div class="tax-report-document-body" id="tax-report-printable-area">
            <!-- Header Istituzionale Apple HIG -->
            <div class="tax-doc-header">
              <div class="tax-doc-badge">DOCUMENTO DI SINTESI PATRIMONIALE</div>
              <h2 class="tax-doc-main-title">Rendiconto Finanziario & Deduzioni IRPEF</h2>
              <div class="tax-doc-meta">
                <span>Esercizio Finanziario: <strong>${report.year}</strong></span>
                <span>Data Generazione: <strong>${report.generatedDate}</strong></span>
                <span>Stato Dati: <strong>Snapshot Ufficiale Riconciliato</strong></span>
              </div>
            </div>

            <!-- Sezione 1: Sintesi del Patrimonio Netto -->
            <div class="tax-doc-section">
              <h4 class="tax-section-title">1. Consistenza Patrimoniale al 31 Dicembre ${report.year}</h4>
              <div class="tax-kpi-row">
                <div class="tax-kpi-box">
                  <span class="tax-kpi-sub">Net Worth Consolidato</span>
                  <div class="tax-kpi-num privacy-mask">${this.formatCurrency(report.closingNetWorth)}</div>
                  <span class="tax-kpi-note">Variazione annua: ${report.growthPct >= 0 ? '+' : ''}${report.growthPct}%</span>
                </div>
                <div class="tax-kpi-box">
                  <span class="tax-kpi-sub">Giacenza Media Stimata Liquidità</span>
                  <div class="tax-kpi-num privacy-mask">${this.formatCurrency(report.estimatedAverageDailyBalance)}</div>
                  <span class="tax-kpi-note">Riferimento per calcolo ISEE e Bollo C/C (5.000 €)</span>
                </div>
                <div class="tax-kpi-box">
                  <span class="tax-kpi-sub">Tasso di Risparmio Medio</span>
                  <div class="tax-kpi-num">${report.totalSavingsRate}%</div>
                  <span class="tax-kpi-note">Risparmio netto medio annuo</span>
                </div>
              </div>
            </div>

            <!-- Sezione 2: Ripartizione Asset Allocation Fiscale -->
            <div class="tax-doc-section">
              <h4 class="tax-section-title">2. Prospetto Asset Allocation per Categoria Fiscale</h4>
              <table class="tax-doc-table">
                <thead>
                  <tr>
                    <th>Asset Class</th>
                    <th>Descrizione Strumenti</th>
                    <th>Valore Consolidato</th>
                    <th>Peso %</th>
                    <th>Regime Fiscale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Liquidità Libera</strong></td>
                    <td>Conti correnti (Buddybank, BBVA, Cassa)</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.liquid)}</td>
                    <td>${report.assetAllocation.liquidPct}%</td>
                    <td>Bollo 34,20 €/anno se giacenza &gt; 5k €</td>
                  </tr>
                  <tr>
                    <td><strong>Monetario Overnight</strong></td>
                    <td>ETF XEON (Fondo Emergenza / Resilienza)</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.monetario)}</td>
                    <td>${report.assetAllocation.monetarioPct}%</td>
                    <td>Imposta sostitutiva 26% su plusvalenze</td>
                  </tr>
                  <tr>
                    <td><strong>Azionario Globale</strong></td>
                    <td>ETF Vanguard FTSE All-World (VWCE PAC)</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.azionario)}</td>
                    <td>${report.assetAllocation.azionarioPct}%</td>
                    <td>Imposta bollo 0,20% + 26% al realizzo</td>
                  </tr>
                  <tr>
                    <td><strong>Previdenza Integrativa</strong></td>
                    <td>Fondo Pensione Negoziale / Aperto</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.pensione)}</td>
                    <td>${report.assetAllocation.pensionePct}%</td>
                    <td>Tassazione agevolata 9-15% a scadenza</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Sezione 3: Deduzione Fiscale Fondo Pensione (Art. 51 TUIR) -->
            <div class="tax-doc-section">
              <h4 class="tax-section-title">3. Ottimizzazione Fiscale & Deduzione IRPEF Pensione</h4>
              <div class="tax-pension-card">
                <div class="pension-deduction-grid">
                  <div>
                    <span class="pension-label">Totale Versamenti Previdenza ${report.year}</span>
                    <div class="pension-value privacy-mask">${this.formatCurrency(report.pensionDeduction.totalDeposited)}</div>
                  </div>
                  <div>
                    <span class="pension-label">Plafond Massimo Deducibile TUIR</span>
                    <div class="pension-value">5.164,57 €</div>
                  </div>
                  <div>
                    <span class="pension-label">Importo Effettivamente Deducibile</span>
                    <div class="pension-value positive-val privacy-mask">${this.formatCurrency(report.pensionDeduction.actualDeduction)}</div>
                  </div>
                  <div>
                    <span class="pension-label">Risparmio IRPEF Stimato in Busta/730</span>
                    <div class="pension-value irpef-savings privacy-mask">~ ${this.formatCurrency(report.pensionDeduction.estimatedTaxSavings)}</div>
                  </div>
                </div>
                <p class="pension-legal-note">
                  * Ai sensi dell'art. 10, comma 1, lett. e-bis) del TUIR, i contributi versati alle forme pensionistiche complementari sono deducibili dal reddito complessivo per un importo non superiore a 5.164,57 € annui.
                </p>
              </div>
            </div>

            <!-- Firma & Chiusura Apple Doc -->
            <div class="tax-doc-footer">
              <div class="footer-sign-col">
                <span class="sign-label">Elaborato da:</span>
                <span class="sign-name">Financial WebApp — Sistema Riconciliato</span>
              </div>
              <div class="footer-sign-col" style="text-align: right;">
                <span class="sign-label">Validazione Contabile:</span>
                <span class="sign-name">Snapshot Ufficiale Giorgio</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('tax-report-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('tax-report-close')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('btn-print-tax-report')?.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // ESPORTAZIONE CSV & BACKUP JSON
  // =========================================================================
  handleExportCSV(btn) {
    try {
      const csvContent = financeStore.exportTransactionsCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `movimenti_finanze_${new Date().getFullYear()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ CSV Scaricato';
        setTimeout(() => { btn.innerHTML = orig; }, 2500);
      }
    } catch (err) {
      console.error('Errore esportazione CSV:', err);
      alert('Errore durante la generazione del CSV.');
    }
  }

  handleExportJSON(btn) {
    try {
      const jsonContent = financeStore.exportBackupJSON();
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `backup_finanze_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Backup Scaricato';
        setTimeout(() => { btn.innerHTML = orig; }, 2500);
      }
    } catch (err) {
      console.error('Errore esportazione JSON:', err);
      alert('Errore durante la generazione del backup JSON.');
    }
  }
}
