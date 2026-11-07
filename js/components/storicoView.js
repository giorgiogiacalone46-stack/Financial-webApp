/**
 * Apple Design System - Patrimonio & Storico View Component (Ristrutturato Esecutivo)
 * Focus: Semplicità, Intuitività e Precisione
 * 1. Hero Card: Patrimonio Netto Effettivo ("Zero Allucinazioni", escluso Fondo Pensione)
 * 2. Grafico Temporale Evoluzione Patrimonio Effettivo (in primo piano, touch-friendly)
 * 3. Card Mensili Snelle per consultazione da mobile e desktop
 * 4. Tracciamento Separato Previdenza a Lungo Termine (Fondo Pensione)
 * 5. Strumenti: Chiusura Mese, Report Fiscale, Backup JSON/CSV
 */

import { financeStore } from '../data/mockData.js';
import { getIcon } from './icons.js';
import { monthlyClosingModal } from './monthlyClosingModal.js';

export class StoricoView {
  constructor() {
    this.historyChart = null;
    this.pensionChart = null;
    const availableYears = financeStore.getAvailableYears();
    this.selectedYear = availableYears[0] || String(new Date().getFullYear());
    this.activeSubtab = 'panoramica'; // 'panoramica' | 'dettaglio'
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
    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
      this.historyChart = null;
    }
    if (this.pensionChart) {
      try { this.pensionChart.destroy(); } catch (e) {}
      this.pensionChart = null;
    }
  }

  render(container) {
    if (!container) return;
    this.destroyCharts();

    const summary = financeStore.summary;
    const availableYears = financeStore.getAvailableYears();
    const defaultYear = availableYears[0] || String(new Date().getFullYear());
    if (this.selectedYear !== 'all' && !availableYears.includes(this.selectedYear)) {
      this.selectedYear = defaultYear;
    }

    // Dati storici effettivi (senza pensione)
    const rawData = financeStore.getHistoricalNetWorth();
    const filteredData = this.selectedYear === 'all'
      ? rawData
      : rawData.filter(d => d.month.endsWith(this.selectedYear));

    // Storico Fondo Pensione separato
    const pensionHistory = typeof financeStore.getPensionHistory === 'function' ? financeStore.getPensionHistory() : [];
    const filteredPension = this.selectedYear === 'all'
      ? pensionHistory
      : pensionHistory.filter(d => d.month.endsWith(this.selectedYear));

    // Calcolo crescita patrimonio effettivo
    const firstVal = filteredData.length > 0 ? filteredData[0].value : summary.effectiveNetWorth;
    const lastVal = filteredData.length > 0 ? filteredData[filteredData.length - 1].value : summary.effectiveNetWorth;
    const lastPoint = filteredData.length > 0 ? filteredData[filteredData.length - 1] : null;
    const hasPendingSalary = Boolean(lastPoint && lastPoint.isCurrent && lastPoint.pendingEstimatedIncome > 0);
    const pendingSalaryAmount = hasPendingSalary ? lastPoint.pendingEstimatedIncome : 0;
    const netGrowth = lastVal - firstVal;
    const growthPercent = firstVal > 0 ? ((netGrowth / firstVal) * 100).toFixed(1) : '0.0';
    const isGrowthPositive = netGrowth >= 0;

    // Calcolo crescita Fondo Pensione nel periodo selezionato
    const pFirstVal = filteredPension.length > 0 ? filteredPension[0].value : summary.pensionFundTotal;
    const pLastVal = filteredPension.length > 0 ? filteredPension[filteredPension.length - 1].value : summary.pensionFundTotal;
    const pNetGrowth = Math.round((pLastVal - pFirstVal) * 100) / 100;
    const pGrowthPercent = pFirstVal > 0 ? ((pNetGrowth / pFirstVal) * 100).toFixed(1) : '0.0';
    const isPGrowthPositive = pNetGrowth >= 0;

    // Matrice annuale per dettaglio
    const matrix = financeStore.getYearlyNetworthMatrix(this.selectedYear === 'all' ? defaultYear : this.selectedYear);

    // Mesi invertiti per lista cronologica recente -> passato
    const monthsReversed = [...matrix.months].reverse().filter(m => m.hasData || m.isCurrent || (m.closing && m.closing.totalNW > 0));

    const totalNW = summary.effectiveNetWorth || 1;
    const pctLiquid = Math.max(2, Math.round(((summary.liquidTotal || 0) / totalNW) * 100));
    const pctInvested = Math.max(2, Math.round(((summary.investedTotal || 0) / totalNW) * 100));
    const pctVoucher = Math.max(2, 100 - pctLiquid - pctInvested);

    container.innerHTML = `
      <div class="page storico-page">

        <!-- 1. Hero Card Patrimonio Effettivo Reale (Workout Monolithic Style) -->
        <section class="card hero-patrimonio-card storico-hero-card">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">
                  Patrimonio Effettivo ${this.selectedYear === 'all' ? '• Storico' : `• ${this.selectedYear}`}
                </span>
                <span class="badge badge--positive hero-badge-tag">Disponibile &amp; Investito</span>
                ${hasPendingSalary ? `
                  <span class="badge badge--info hero-badge-tag" style="background: rgba(0, 113, 227, 0.12); color: var(--apple-blue); border: 1px solid rgba(0, 113, 227, 0.25);">
                    Incl. stima stipendio (+${this.formatCurrency(pendingSalaryAmount)})
                  </span>
                ` : ''}
              </div>
              <div class="card__value privacy-mask hero-networth-val" style="overflow: visible !important; text-overflow: clip !important; white-space: nowrap !important; max-width: 100% !important;">
                ${this.formatCurrency(lastVal)}
              </div>
              ${hasPendingSalary ? `
                <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 3px;">
                  Saldo attuale conti: <strong class="privacy-mask" style="color: var(--text-primary); font-weight: 600;">${this.formatCurrency(summary.effectiveNetWorth)}</strong>
                </div>
              ` : ''}
            </div>

            <div class="hero-trend-wrap">
              <span class="trend-badge ${isGrowthPositive ? 'positive' : 'negative'}">
                ${isGrowthPositive ? '+' : ''}${growthPercent}% (${isGrowthPositive ? '+' : ''}<span class="privacy-mask">${this.formatCurrency(netGrowth)}</span>)
              </span>
              <span class="trend-context" style="color: var(--text-secondary);">Crescita periodo</span>
            </div>
          </div>

          <!-- Segmented Allocation Bar -->
          <div class="alloc-bar-track">
            <div class="alloc-segment seg-liquid" style="width: ${pctLiquid}%;" title="Liquidità: ${pctLiquid}%"></div>
            <div class="alloc-segment seg-invested" style="width: ${pctInvested}%;" title="Investiti: ${pctInvested}%"></div>
            <div class="alloc-segment seg-voucher" style="width: ${pctVoucher}%;" title="Buoni Pasto: ${pctVoucher}%"></div>
          </div>

          <div class="alloc-legend" style="margin-bottom: 14px;">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-blue);"></span>
                <span class="legend-name">Liquidità</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-blue);">${this.formatCurrency(summary.liquidTotal)}</span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-purple);"></span>
                <span class="legend-name">Trade Rep.</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-purple);">${this.formatCurrency(summary.investedTotal)}</span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-orange);"></span>
                <span class="legend-name">Buoni Pasto</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-orange);">${this.formatCurrency(summary.voucherTotal || 0)}</span>
            </div>
          </div>

          <!-- Toolbar Azioni & Selettore Anno a Tendina -->
          <div class="storico-hero-toolbar">
            <div class="apple-select-wrapper storico-year-select-wrap" style="position: relative; min-width: 185px;">
              <select id="storico-year-select" class="apple-select" style="width: 100% !important; min-width: 185px; padding: 8px 36px 8px 14px; font-size: 13px; font-weight: 600; border-radius: 9999px;">
                <option value="all" ${this.selectedYear === 'all' ? 'selected' : ''}>Tutto lo Storico</option>
                ${availableYears.map(y => `
                  <option value="${y}" ${this.selectedYear === y ? 'selected' : ''}>Anno ${y}</option>
                `).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            <div class="storico-hero-actions">
              <button class="apple-btn-secondary" id="btn-storico-report-fiscale">
                ${getIcon('list', 13)} <span>Report Fiscale</span>
              </button>
              <button class="apple-btn-secondary" id="btn-storico-export-csv">
                ${getIcon('download', 13)} <span>CSV</span>
              </button>
              <button class="apple-btn-primary" id="btn-storico-chiusura-mese">
                ${getIcon('conguaglio', 13)} <span>Chiusura Mese</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Sotto-Menu Subtabs Apple -->
        <div class="investimenti-subtabs-bar" style="margin-bottom: 14px;">
          <nav class="investimenti-segmented-tabs storico-segmented-tabs">
            <button class="investimenti-tab-btn view-subtab-btn ${this.activeSubtab === 'panoramica' ? 'active' : ''}" data-subtab="panoramica">
              <span class="tab-icon">${getIcon('chart', 14)}</span>
              <span class="tab-label">Evoluzione &amp; Mensilità</span>
            </button>
            <button class="investimenti-tab-btn view-subtab-btn ${this.activeSubtab === 'dettaglio' ? 'active' : ''}" data-subtab="dettaglio">
              <span class="tab-icon">${getIcon('list', 14)}</span>
              <span class="tab-label">Tabella Conti</span>
            </button>
          </nav>
        </div>

        ${this.activeSubtab === 'panoramica' ? `
          <!-- 2. Grafico Temporale Patrimonio Effettivo (Curva Liscia Apple Stocks) -->
          <section class="card storico-smooth-chart-card">
            <div class="card__header" style="margin-bottom: 14px;">
              <div>
                <span class="card__title">Curva di Crescita Patrimonio</span>
                <span style="display: block; font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">
                  Andamento storico netto (Liquidità + Trade Republic + Buoni Pasto${hasPendingSalary ? ' • Con stima entrate mese' : ''})
                </span>
              </div>
              <span class="badge badge--positive">Curva Continua</span>
            </div>

            <div style="height: 240px; min-height: 240px; position: relative;">
              <canvas id="storicoPatrimonioCanvas"></canvas>
            </div>
          </section>

          <!-- 3. Schede Mensili Touch-Friendly (Workout & LinkedIn Style) -->
          <section style="margin-bottom: var(--space-box-gap-lg);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; padding: 0 2px;">
              <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">
                Riepilogo Mensile (${this.selectedYear === 'all' ? 'Storico' : this.selectedYear})
              </h3>
              <span class="badge badge--neutral">${monthsReversed.length} Mesi</span>
            </div>

            <div class="storico-months-grid">
              ${monthsReversed.map((m) => {
                const idx = m.monthNum - 1;
                const effNW = matrix.totals.effectiveNetWorth[idx] || 0;
                const delta = matrix.totals.delta[idx] || 0;
                const deltaPct = matrix.totals.deltaPct[idx] || '0.0';
                const isPos = delta >= 0;

                const liquidVal = matrix.liquid.subtotals[idx] || 0;
                const voucherVal = matrix.voucher.subtotals[idx] || 0;
                const investedVal = matrix.invested.subtotals[idx] || 0;
                const cryptoVal = (matrix.crypto && matrix.crypto.subtotals[idx]) || 0;

                const mTot = effNW || 1;
                const mPctLiq = Math.max(2, Math.round((liquidVal / mTot) * 100));
                const mPctInv = Math.max(2, Math.round((investedVal / mTot) * 100));
                const mPctCry = cryptoVal > 0 ? Math.max(2, Math.round((cryptoVal / mTot) * 100)) : 0;
                const mPctVou = Math.max(2, 100 - mPctLiq - mPctInv - mPctCry);

                return `
                  <div class="card storico-month-workout-card">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${m.name} ${matrix.year}</span>
                        ${m.isCurrent ? `
                          <span class="badge badge--info" style="font-size: 10px; font-weight: 600;">
                            ${m.pendingEstimatedIncome > 0 ? 'Live (con stima)' : 'Live'}
                          </span>
                        ` : ''}
                      </div>
                      <span class="badge ${isPos ? 'badge--positive' : 'badge--negative'}" style="font-size: 11px; font-weight: 700;">
                        ${isPos ? '+' : ''}${deltaPct}%
                      </span>
                    </div>

                    <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: 4px;">
                      <div>
                        <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em; display: block;">Patrimonio Effettivo</span>
                        <div class="privacy-mask" style="font-size: 23px; font-weight: 800; color: var(--text-primary); font-variant-numeric: tabular-nums; letter-spacing: -0.025em;">
                          ${this.formatCurrency(effNW)}
                        </div>
                        ${m.isCurrent && m.pendingEstimatedIncome > 0 ? `
                          <span style="font-size: 11px; color: var(--apple-blue); font-weight: 600; display: block; margin-top: 2px;">
                            Incl. stipendio stimato (+${this.formatCurrency(m.pendingEstimatedIncome)})
                          </span>
                        ` : ''}
                      </div>
                      <div style="text-align: right;">
                        <span style="font-size: 10.5px; color: var(--text-secondary); display: block;">Variazione</span>
                        <span class="privacy-mask" style="font-size: 13px; font-weight: 700; color: ${isPos ? 'var(--apple-green)' : 'var(--apple-red)'}; font-variant-numeric: tabular-nums;">
                          ${isPos ? '+' : ''}${this.formatCurrency(delta)}
                        </span>
                      </div>
                    </div>

                    <!-- Mini Segmented Bar -->
                    <div class="alloc-bar-track" style="height: 5px; margin: 8px 0 6px;">
                      <div class="alloc-segment seg-liquid" style="width: ${mPctLiq}%;"></div>
                      <div class="alloc-segment seg-invested" style="width: ${mPctInv}%;"></div>
                      ${cryptoVal > 0 ? `<div class="alloc-segment seg-crypto" style="width: ${mPctCry}%; background: #F7931A;"></div>` : ''}
                      <div class="alloc-segment seg-voucher" style="width: ${mPctVou}%;"></div>
                    </div>

                    <!-- Breakdown rapido a 3-4 voci -->
                    <div class="alloc-legend" style="padding-top: 2px;">
                      <div class="legend-col">
                        <span class="legend-name">Liquidità</span>
                        <span class="privacy-mask legend-amount" style="color: var(--apple-blue); font-size: 12px;">${this.formatCurrency(liquidVal)}</span>
                      </div>
                      ${investedVal > 0 ? `
                        <div class="legend-col">
                          <span class="legend-name">Investiti</span>
                          <span class="privacy-mask legend-amount" style="color: var(--apple-purple); font-size: 12px;">${this.formatCurrency(investedVal)}</span>
                        </div>
                      ` : ''}
                      ${cryptoVal > 0 ? `
                        <div class="legend-col">
                          <span class="legend-name">Crypto</span>
                          <span class="privacy-mask legend-amount" style="color: #F7931A; font-size: 12px;">${this.formatCurrency(cryptoVal)}</span>
                        </div>
                      ` : ''}
                      ${voucherVal > 0 ? `
                        <div class="legend-col">
                          <span class="legend-name">Buoni</span>
                          <span class="privacy-mask legend-amount" style="color: var(--apple-orange); font-size: 12px;">${this.formatCurrency(voucherVal)}</span>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 4. Tracciamento Separato Previdenza a Lungo Termine (Fondo Pensione) -->
          <section class="card storico-pension-card">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 200px;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(175, 82, 222, 0.14); color: #AF52DE; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">
                    Fondo Pensione • Previdenza Complementare
                  </h4>
                  <p style="margin: 2px 0 0; font-size: 11.5px; color: var(--text-secondary);">
                    Tracciato separatamente dal patrimonio liquido disponibile
                  </p>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
                  <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em;">
                    ${this.selectedYear === 'all' ? 'Maturato Complessivo' : `Maturato a fine ${this.selectedYear}`}
                  </span>
                  ${pNetGrowth !== 0 ? `
                    <span class="apple-badge" style="background: rgba(175, 82, 222, 0.14); color: #AF52DE; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 9999px;">
                      ${isPGrowthPositive ? '+' : ''}${this.formatCurrency(pNetGrowth)} (${isPGrowthPositive ? '+' : ''}${pGrowthPercent}%)
                    </span>
                  ` : ''}
                </div>
                <div class="privacy-mask" style="font-size: 22px; font-weight: 800; color: #AF52DE; font-variant-numeric: tabular-nums;">
                  ${this.formatCurrency(pLastVal)}
                </div>
              </div>
            </div>

            <!-- Mini grafico curva liscia pensione -->
            <div style="height: 170px; min-height: 170px; position: relative;">
              <canvas id="storicoPensioneCanvas"></canvas>
            </div>
          </section>
        ` : `
          <!-- 5. TABELLA DETTAGLIATA CONTI (OPZIONALE SU RICHIESTA) -->
          <section class="card" style="margin-bottom: var(--space-box-gap-lg); padding: 20px; border-radius: var(--radius-card); border: 1px solid var(--border-subtle); background: var(--bg-card); overflow-x: auto;">
            <div style="margin-bottom: 14px;">
              <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">Dettaglio Saldi per Conto (${matrix.year})</h4>
              <p style="margin: 3px 0 0; font-size: 12px; color: var(--text-secondary);">Prospetto contabile mensile suddiviso per macro-area.</p>
            </div>

            <table class="apple-table" style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-subtle); text-align: left;">
                  <th style="padding: 10px 8px;">Conto</th>
                  ${matrix.months.map(m => `<th style="padding: 10px 8px; text-align: right;">${m.shortName}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${matrix.liquid && matrix.liquid.accounts.length > 0 ? `
                  <tr style="background: var(--bg-hover); font-weight: 700;">
                    <td colspan="${matrix.months.length + 1}" style="padding: 8px;">Liquidità Corrente</td>
                  </tr>
                  ${matrix.liquid.accounts.map(acc => `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 8px;">${acc.name}</td>
                      ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                    </tr>
                  `).join('')}
                ` : ''}

                ${matrix.invested && matrix.invested.accounts.length > 0 ? `
                  <tr style="background: var(--bg-hover); font-weight: 700;">
                    <td colspan="${matrix.months.length + 1}" style="padding: 8px;">Investimenti &amp; Broker</td>
                  </tr>
                  ${matrix.invested.accounts.map(acc => `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 8px;">${acc.name}</td>
                      ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                    </tr>
                  `).join('')}
                ` : ''}

                ${matrix.crypto && matrix.crypto.accounts.length > 0 ? `
                  <tr style="background: rgba(247, 147, 26, 0.08); font-weight: 700; color: #F7931A;">
                    <td colspan="${matrix.months.length + 1}" style="padding: 8px; color: #F7931A;">🪙 Criptovalute &amp; Digital Assets</td>
                  </tr>
                  ${matrix.crypto.accounts.map(acc => `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 8px;">${acc.name}</td>
                      ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                    </tr>
                  `).join('')}
                ` : ''}

                ${matrix.voucher && matrix.voucher.accounts.length > 0 ? `
                  <tr style="background: var(--bg-hover); font-weight: 700;">
                    <td colspan="${matrix.months.length + 1}" style="padding: 8px;">Buoni Pasto &amp; Benefit</td>
                  </tr>
                  ${matrix.voucher.accounts.map(acc => `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 8px;">${acc.name}</td>
                      ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                    </tr>
                  `).join('')}
                ` : ''}

                ${matrix.pension && matrix.pension.accounts.length > 0 ? `
                  <tr style="background: rgba(175, 82, 222, 0.08); font-weight: 700; color: #AF52DE;">
                    <td colspan="${matrix.months.length + 1}" style="padding: 8px; color: #AF52DE;">
                      🛡️ Previdenza Complementare (Fondo Pensione)
                    </td>
                  </tr>
                  ${matrix.pension.accounts.map(acc => `
                    <tr style="border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 8px; color: var(--text-primary);">${acc.name}</td>
                      ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums; color: #AF52DE; font-weight: 600;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                    </tr>
                  `).join('')}
                ` : ''}

                ${matrix.totals.pendingEstimatedIncome > 0 ? `
                  <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--apple-blue); font-style: italic; background: rgba(0, 113, 227, 0.04);">
                    <td style="padding: 8px;">Entrate Stimate Mese (in arrivo)</td>
                    ${matrix.months.map(m => `
                      <td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 600;">
                        ${m.isCurrent && matrix.totals.pendingEstimatedIncome > 0 ? `+${this.formatCurrency(matrix.totals.pendingEstimatedIncome)}` : '-'}
                      </td>
                    `).join('')}
                  </tr>
                ` : ''}

                <tr style="background: rgba(52, 199, 89, 0.08); font-weight: 800; border-top: 1.5px solid var(--apple-green);">
                  <td style="padding: 10px 8px; color: var(--apple-green);">Patrimonio Diretto (Disponibile + Broker)</td>
                  ${matrix.totals.effectiveNetWorth.map(v => `
                    <td class="privacy-mask" style="padding: 10px 8px; text-align: right; color: var(--apple-green); font-variant-numeric: tabular-nums;">
                      ${this.formatCurrency(v)}
                    </td>
                  `).join('')}
                </tr>

                <tr style="background: rgba(0, 113, 227, 0.1); font-weight: 800; border-top: 2px solid var(--apple-blue);">
                  <td style="padding: 10px 8px; color: var(--apple-blue);">Patrimonio Totale (Net Worth con Pensione)</td>
                  ${matrix.totals.totalWithPension.map(v => `
                    <td class="privacy-mask" style="padding: 10px 8px; text-align: right; color: var(--apple-blue); font-variant-numeric: tabular-nums;">
                      ${this.formatCurrency(v)}
                    </td>
                  `).join('')}
                </tr>
              </tbody>
            </table>
          </section>
        `}

      </div>
    `;

    // Listener Selettore Anno a Tendina
    const yearSelect = container.querySelector('#storico-year-select');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        const y = e.target.value;
        if (y && y !== this.selectedYear) {
          this.selectedYear = y;
          this.render(container);
        }
      });
    }

    // Listener Subtab
    container.querySelectorAll('.view-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          this.render(container);
        }
      });
    });

    // Listener Chiusura Mese
    const btnClosing = container.querySelector('#btn-storico-chiusura-mese');
    if (btnClosing) {
      btnClosing.addEventListener('click', () => {
        const rec = financeStore.getMonthlyReconciliationStatus();
        monthlyClosingModal.open({
          targetMonth: rec.targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    }

    // Listener Esporta CSV
    const btnCSV = container.querySelector('#btn-storico-export-csv');
    if (btnCSV) {
      btnCSV.addEventListener('click', () => this.handleExportCSV(btnCSV));
    }

    // Listener Report Fiscale
    const btnTax = container.querySelector('#btn-storico-report-fiscale');
    if (btnTax) {
      btnTax.addEventListener('click', () => this.openTaxReportModal(container));
    }

    // Inizializza Grafici
    if (this.activeSubtab === 'panoramica') {
      requestAnimationFrame(() => {
        this.initHistoryChart(filteredData);
        this.initPensionChart(filteredPension);
      });
    }
  }

  formatShortMonthLabel(rawLabel) {
    if (!rawLabel || typeof rawLabel !== 'string') return rawLabel;
    const monthsMap = {
      '01': 'Gen', '02': 'Feb', '03': 'Mar', '04': 'Apr',
      '05': 'Mag', '06': 'Giu', '07': 'Lug', '08': 'Ago',
      '09': 'Set', '10': 'Ott', '11': 'Nov', '12': 'Dic'
    };
    const parts = rawLabel.split('/');
    if (parts.length === 2) {
      const mName = monthsMap[parts[0]] || parts[0];
      return this.selectedYear === 'all' ? `${mName} '${parts[1].slice(-2)}` : mName;
    }
    return rawLabel;
  }

  initHistoryChart(dataPoints) {
    const canvas = document.getElementById('storicoPatrimonioCanvas');
    if (!canvas || !window.Chart) return;

    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 240);
    grad.addColorStop(0, 'rgba(48, 209, 88, 0.34)');
    grad.addColorStop(0.7, 'rgba(48, 209, 88, 0.08)');
    grad.addColorStop(1, 'rgba(48, 209, 88, 0.0)');

    const labels = dataPoints.map(d => this.formatShortMonthLabel(d.month));
    const values = dataPoints.map(d => d.value);

    this.historyChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Patrimonio Effettivo (€)',
          data: values,
          borderColor: '#30D158',
          backgroundColor: grad,
          fill: true,
          tension: 0.42,
          cubicInterpolationMode: 'monotone',
          borderWidth: 3,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          pointRadius: (ctx) => {
            const pt = dataPoints && dataPoints[ctx.dataIndex];
            return (pt && pt.isCurrent) ? 5 : 0;
          },
          pointHitRadius: 20,
          pointHoverRadius: 7,
          pointBackgroundColor: '#30D158',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#30D158',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(22, 22, 24, 0.95)',
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 12.5, weight: '600' },
            padding: 10,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
              label: (ctx) => {
                const pt = dataPoints && dataPoints[ctx.dataIndex];
                const baseStr = `€ ${ctx.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
                if (pt && pt.isCurrent && pt.pendingEstimatedIncome > 0) {
                  return `${baseStr} (con stipendio stimato)`;
                }
                return baseStr;
              },
              afterLabel: (ctx) => {
                const pt = dataPoints && dataPoints[ctx.dataIndex];
                if (pt && pt.isCurrent && pt.pendingEstimatedIncome > 0) {
                  return `Stima entrate mese: +€ ${pt.pendingEstimatedIncome.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
                }
                return null;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 11, weight: '500' },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            border: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 11 },
              maxTicksLimit: 5,
              callback: (val) => val >= 1000 ? '€' + (val / 1000).toLocaleString('it-IT', { maximumFractionDigits: 1 }) + 'k' : '€' + val
            }
          }
        }
      }
    });
  }

  initPensionChart(pensionPoints) {
    const canvas = document.getElementById('storicoPensioneCanvas');
    if (!canvas || !window.Chart || !pensionPoints.length) return;

    if (this.pensionChart) {
      try { this.pensionChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 170);
    grad.addColorStop(0, 'rgba(175, 82, 222, 0.30)');
    grad.addColorStop(1, 'rgba(175, 82, 222, 0.0)');

    const labels = pensionPoints.map(d => this.formatShortMonthLabel(d.month));
    const values = pensionPoints.map(d => d.value);

    this.pensionChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Fondo Pensione (€)',
          data: values,
          borderColor: '#AF52DE',
          backgroundColor: grad,
          fill: true,
          tension: 0.42,
          cubicInterpolationMode: 'monotone',
          borderWidth: 2.8,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          pointRadius: 0,
          pointHitRadius: 20,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#AF52DE',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(22, 22, 24, 0.95)',
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 12, weight: '600' },
            padding: 9,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              label: (ctx) => `€ ${ctx.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 10.5 },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            border: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 10.5 },
              maxTicksLimit: 4,
              callback: (val) => val >= 1000 ? '€' + (val / 1000).toLocaleString('it-IT', { maximumFractionDigits: 1 }) + 'k' : '€' + val
            }
          }
        }
      }
    });
  }

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
    }
  }

  openTaxReportModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const summary = financeStore.summary;
    const curYear = new Date().getFullYear();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="tax-report-overlay">
        <div class="apple-modal-sheet" style="max-width: 640px; border-radius: var(--radius-card); padding: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">Rendiconto Fiscale &amp; Previdenza (${curYear})</h3>
            <button class="apple-btn-icon" id="tax-report-close">&times;</button>
          </div>
          <div style="font-size: 13.5px; line-height: 1.5; color: var(--text-secondary);">
            <div style="background: var(--bg-hover); padding: 14px; border-radius: var(--radius-md); margin-bottom: 16px;">
              <span style="display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Deduzione Fondo Pensione (Art. 51 TUIR)</span>
              <p style="margin: 0;">I contributi versati alla previdenza complementare sono deducibili dal reddito complessivo IRPEF fino a un massimo di <strong>5.164,57 € annui</strong>.</p>
            </div>
            <div class="kv" style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
              <span class="kv__label">Valore maturato ad oggi</span>
              <span class="kv__value font-mono privacy-mask" style="color: #5856D6; font-weight: 700;">${this.formatCurrency(summary.pensionFundTotal)}</span>
            </div>
            <div class="kv" style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
              <span class="kv__label">Plafond annuo deducibile</span>
              <span class="kv__value font-mono">5.164,57 €</span>
            </div>
            <div class="kv" style="padding: 8px 0;">
              <span class="kv__label">Regime fiscale a scadenza</span>
              <span class="kv__value font-mono">Ritenuta agevolata 9% - 15%</span>
            </div>
          </div>
          <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 8px;">
            <button class="apple-btn-primary" id="tax-report-done" style="padding: 8px 18px;">Chiudi</button>
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
    document.getElementById('tax-report-done')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }
}
