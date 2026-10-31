/**
 * Apple Design System - Dashboard View Component (Reale)
 * Integra Saldi reali, Net Worth, Budget 75/25, Goal Stipendio e Grafico di Cassa
 */

import { financeStore } from '../data/mockData.js';
import { getCategoryIcon, cleanCategoryName, getIcon } from './icons.js';
import { monthlyClosingModal } from './monthlyClosingModal.js';

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

    const health = financeStore.getFinancialHealthScore();
    const runway = financeStore.getProjectedMonthEnd();
    const anomalies = financeStore.getCategoryAnomalies();
    const budget5030 = financeStore.getBudget50_30_20();
    const forecast = financeStore.getCashFlowForecast(45);

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

    const recStatus = financeStore.getMonthlyReconciliationStatus();

    container.innerHTML = `
      <div class="page dashboard-page">
        
        <!-- Smart Alert: Chiusura Fine Mese & Riconciliazione Saldi -->
        ${!recStatus.isFullyReconciled ? `
          <div class="card monthly-closing-banner-card" style="border-left: 4px solid var(--apple-orange); background: var(--bg-card); margin-bottom: var(--space-box-gap-lg); padding: 18px 22px;">
            <div style="display: flex; gap: var(--space-box-gap-md); align-items: flex-start; justify-content: space-between; flex-wrap: wrap;">
              <div style="display: flex; gap: var(--space-box-gap-md); align-items: flex-start; flex: 1; min-width: min(100%, 280px);">
                <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: rgba(255, 149, 0, 0.12); color: var(--apple-orange); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                  ${getIcon('warning', 20)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
                    <strong style="font-size: 15px; font-weight: 600; color: var(--text-primary); letter-spacing: -0.015em;">
                      Chiusura Mese di ${recStatus.targetMonthName} in Sospeso
                    </strong>
                    <span style="font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: rgba(255, 149, 0, 0.15); color: var(--apple-orange);">
                      ${recStatus.pendingCount} conto da allineare
                    </span>
                  </div>
                  <p style="font-size: 13px; color: var(--text-secondary); margin: 0; line-height: var(--lh-body);">
                    ${recStatus.staleAccounts.map(a => `<strong>${a.name}</strong> è fermo a ${a.lastMonthName} (${this.formatCurrency(a.balance)})`).join(', ')}. Inserisci la quota da busta paga o il saldo effettivo per consolidare il Net Worth del mese.
                  </p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; align-self: center;">
                <button class="apple-btn-primary btn-launch-monthly-closing" id="btn-dashboard-monthly-closing" style="padding: 9px 18px; font-size: 13px; font-weight: 600;">
                  ${getIcon('conguaglio', 14)}
                  <span>Chiudi Mese & Conguaglia</span>
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 1. Top KPI Summary Grid -->
        <section class="grid-4">
          
          <!-- Card 1: Net Worth Patrimoniale -->
          <div class="card highlight-card">
            <div class="card__header">
              <span class="card__title">Patrimonio Netto</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${this.formatCurrency(summary.netWorth)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Liquidità</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(summary.liquidTotal)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Investimenti</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(summary.netWorth - summary.liquidTotal)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-badge positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                Aggiornato
              </span>
              <span class="trend-context" title="Liquidità + Investimenti + Pensione">Asset complessivi</span>
            </div>
          </div>

          <!-- Card 2: Liquidità Disponibile -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Liquidità Diretta</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${this.formatCurrency(summary.liquidTotal)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Conto corrente</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(4160.00)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Buoni pasto + Cassa</span>
                <span class="kv__value privacy-mask">€ 398,50</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-badge positive">Disponibile</span>
              <span class="trend-context" title="Buddybank + Buoni Pasto + Contanti">Cassa immediata</span>
            </div>
          </div>

          <!-- Card 3: Uscite del Mese (Clickable -> Porta a #spese) -->
          <div class="card dashboard-expense-card" id="dash-expense-kpi-card" title="Clicca per aprire la nuova sezione Dettaglio Spese">
            <div class="card__header">
              <span class="card__title">Uscite Mese</span>
              <div class="kpi-icon-badge expense">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${this.formatCurrency(summary.monthlyExpense)}</div>
            <div class="card__body">
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
                ${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}% budget
              </span>
              <span class="trend-context" style="color: var(--apple-blue); font-weight: 600;">Dettaglio spese &rarr;</span>
            </div>
          </div>

          <!-- Card 4: Tasso di Risparmio & Regola 75/25 -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Tasso di Risparmio</span>
              <div class="kpi-icon-badge savings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${summary.savingsRate}%</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Risparmio mese</span>
                  <span class="meter__val privacy-mask">+${this.formatCurrency(summary.savingsAmount)}</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, (summary.savingsRate / 25) * 100)}%; background: var(--apple-blue);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">Target 25%</span>
              <span class="trend-context" title="Obiettivo 25% raggiunto con successo">Raggiunto</span>
            </div>
          </div>

        </section>

        <!-- 2. Blocco Unico Saldi Conti & Depositi (Lista Compatta a 4 Zone) -->
        <section class="card accounts-card">
          <div class="card__header">
            <div class="accounts-header-title-group">
              <span class="card__title">Saldi Conti & Depositi</span>
              <span class="accounts-header-sub">Disponibilità liquida, investimenti ETF e fondo pensione</span>
            </div>
            <div class="accounts-header-badges">
              <span class="badge badge--neutral">${accounts.length} Conti Attivi</span>
              <span class="badge badge--info privacy-mask">Totale ${this.formatCurrency(summary.netWorth)}</span>
            </div>
          </div>
          <div class="card__body accounts-card__body">
            <div class="accounts-list-grid">
              ${accounts.map(acc => {
                let badgeClass = 'badge--neutral';
                let badgeLabel = 'Liquidità';
                let iconBg = 'rgba(0, 113, 227, 0.12)';
                let iconColor = 'var(--apple-blue)';
                let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`;

                if (acc.isInvestment) {
                  badgeClass = 'badge--purple';
                  badgeLabel = acc.name.toLowerCase().includes('xeon') ? 'Fondo Emergenza' : 'Portafoglio';
                  iconBg = 'rgba(175, 82, 222, 0.14)';
                  iconColor = 'var(--apple-purple)';
                  iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
                } else if (acc.isPension) {
                  badgeClass = 'badge--positive';
                  badgeLabel = 'Previdenza';
                  iconBg = 'rgba(52, 199, 89, 0.14)';
                  iconColor = 'var(--apple-green)';
                  iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 8H2z"></path></svg>`;
                }

                const pctOfTotal = summary.netWorth > 0 ? ((acc.balance / summary.netWorth) * 100).toFixed(1) : '0.0';

                return `
                  <div class="account-row-item">
                    <div class="account-row-leading">
                      <div class="account-row-icon" style="background: ${iconBg}; color: ${iconColor};">
                        ${iconSvg}
                      </div>
                      <div class="account-row-meta">
                        <span class="account-row-name" title="${acc.name}">${acc.name}</span>
                        <span class="account-row-type" title="${acc.type}">${acc.type}</span>
                      </div>
                    </div>
                    <div class="account-row-trailing">
                      <div class="account-row-val privacy-mask">${this.formatCurrency(acc.balance)}</div>
                      <div class="account-row-sub">
                        <span class="account-row-pct" title="Quota su patrimonio totale">${pctOfTotal}% del tot.</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <div class="card__footer accounts-card__footer">
            <div class="accounts-footer-stats">
              <span class="accounts-stat-item">
                <span class="stat-dot" style="background: var(--apple-blue);"></span>
                Liquidità: <strong class="privacy-mask">${this.formatCurrency(summary.liquidTotal)}</strong>
              </span>
              <span class="accounts-stat-item">
                <span class="stat-dot" style="background: var(--apple-purple);"></span>
                Investimenti + Pensione: <strong class="privacy-mask">${this.formatCurrency(summary.netWorth - summary.liquidTotal)}</strong>
              </span>
            </div>
            <a href="#impostazioni" class="accounts-reconcile-link" title="Gestisci e conguaglia i conti nelle Impostazioni">
              Riconcilia saldi &rarr;
            </a>
          </div>
        </section>

        <!-- 3. Smart Financial Intelligence Strip: Health Score, Runway, Anomalies, Budget 50/30/20 -->
        <section class="grid-4">
          
          <!-- Widget 1: Financial Health Score -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Salute Finanziaria</span>
              <span class="badge" style="background: ${health.color}22; color: ${health.color};">
                ${health.label}
              </span>
            </div>
            <div class="card__value" style="color: ${health.color};">
              ${health.score}<small style="font-size: 15px; color: var(--text-tertiary); font-weight: 600;">/100</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Cuscinetto XEON</span>
                  <span class="meter__val">${health.runwayMonths} mesi</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${(health.breakdown.emergencyScore / 35) * 100}%; background: var(--apple-green);"></div>
                </div>
              </div>
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Tasso Risparmio</span>
                  <span class="meter__val">${health.savingsRate}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${(health.breakdown.savingsScore / 35) * 100}%; background: var(--apple-blue);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context" title="${health.tip}">${health.tip}</span>
            </div>
          </div>

          <!-- Widget 2: Previsione Fine Mese & Runway -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Fine Mese Stimato</span>
              <span class="badge badge--positive">Liquidità</span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">
              ${this.formatCurrency(runway.projectedEnd)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Disponibilità c/c</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(runway.liquidBalance)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Rate & impegni</span>
                <span class="kv__value privacy-mask" style="color: var(--apple-orange);">${this.formatCurrency(runway.remainingObligations)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">Saldo coperto</span>
              <span class="trend-context" title="Residuo stimato a fine mese">Residuo stimato</span>
            </div>
          </div>

          <!-- Widget 3: Spike Detector (Anomalie di Spesa) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Anomalie Spese</span>
              <span class="badge ${anomalies.length > 0 ? 'badge--warning' : 'badge--positive'}">
                ${anomalies.length > 0 ? `${anomalies.length} alert` : 'Stabile'}
              </span>
            </div>
            <div class="card__value" style="font-size: 20px;">
              ${anomalies.length > 0 ? `${anomalies.length} Fuori Media` : 'Nessuna Anomalia'}
            </div>
            <div class="card__body">
              ${anomalies.length > 0 ? anomalies.slice(0, 2).map(a => `
                <div class="kv">
                  <span class="kv__label" title="${cleanCategoryName(a.category)}" style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: var(--apple-orange); display: inline-flex;">${getIcon('alert', 13)}</span>
                    ${cleanCategoryName(a.category)}
                  </span>
                  <span class="kv__value negative">+${a.spikePercent}%</span>
                </div>
                <div class="kv">
                  <span class="kv__label">Spesa vs Media</span>
                  <span class="kv__value privacy-mask" title="${this.formatCurrency(a.currentAmount)} vs ${this.formatCurrency(a.historicalAvg)}">${this.formatCurrency(a.currentAmount)}</span>
                </div>
              `).join('') : `
                <div class="kv">
                  <span class="kv__label">Abitudini di spesa</span>
                  <span class="kv__value positive">Regolari</span>
                </div>
                <div class="kv">
                  <span class="kv__label">Monitoraggio</span>
                  <span class="kv__value muted">Attivo</span>
                </div>
              `}
            </div>
            <div class="card__footer">
              <span class="trend-context">${anomalies.length > 0 ? 'Spesa superiore alla media' : 'Spese allineate'}</span>
            </div>
          </div>

          <!-- Widget 4: Budget 50/30/20 & Spesa Sicura Giornaliera -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Budget 50/30/20</span>
              <span class="badge ${budget5030.dailySafeSpend > 15 ? 'badge--positive' : 'badge--warning'}">
                ${budget5030.daysRemaining} gg residui
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">
              ${this.formatCurrency(budget5030.dailySafeSpend)}<small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/giorno</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Bisogni (50%)</span>
                  <span class="meter__val privacy-mask">${this.formatCurrency(budget5030.needs.spent)} (${budget5030.needs.pct}%)</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, budget5030.needs.pct)}%; background: var(--apple-blue);"></div>
                </div>
              </div>
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Voluttuari (30%)</span>
                  <span class="meter__val privacy-mask">${this.formatCurrency(budget5030.wants.spent)} (${budget5030.wants.pct}%)</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, budget5030.wants.pct)}%; background: var(--apple-orange);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Spesa giornaliera sostenibile</span>
            </div>
          </div>

        </section>

        <!-- 4. Grafici Interattivi: Flusso di Cassa & Ripartizione Categorie -->
        <section class="charts-grid">
          
          <div class="card chart-card">
            <div class="card__header">
              <span class="card__title">Flusso di Cassa & Trend Mensile</span>
              <span class="trend-badge positive">Ultime 6 Mensilità</span>
            </div>
            <div class="card__value privacy-mask" style="font-size: 22px;">
              ${this.formatCurrency(summary.monthlyIncome)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">vs ${this.formatCurrency(summary.monthlyExpense)} uscite</small>
            </div>
            <div class="card__body" style="padding: var(--space-2) 0;">
              <div class="chart-canvas-container" style="height: 260px; min-height: 260px;">
                <canvas id="cashFlowCanvas"></canvas>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Entrate stimate vs Uscite tracciate nel tempo</span>
            </div>
          </div>

          <div class="card chart-card donut-card">
            <div class="card__header">
              <span class="card__title">Spese per Categoria</span>
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
            <div class="card__value privacy-mask" style="font-size: 22px;">
              <span id="donut-total-value">${this.formatCurrency(totalExpenseCalc)}</span> <small style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">totale uscite</small>
            </div>
            <div class="card__body" style="padding: var(--space-2) 0;">
              <div class="donut-chart-container" style="display: flex; gap: 16px; align-items: center;">
                <div class="donut-canvas-wrapper" style="position: relative; width: 140px; height: 140px; flex-shrink: 0;">
                  <canvas id="categoryDonutCanvas"></canvas>
                </div>
                <div class="donut-legend" id="category-donut-legend" style="flex: 1; min-width: 0; max-height: 180px; overflow-y: auto;">
                  ${this.renderLegendItems(sortedCats)}
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context" id="donut-period-subtitle">${subtitleLabel}</span>
            </div>
          </div>

        </section>

        <!-- 5. Previsione Liquidità & Timeline Scadenze (45 Giorni) -->
        <section class="card forecast-section-card">
          <div class="card__header">
            <span class="card__title">Cash Flow Forecast & Timeline Scadenze</span>
            <div class="forecast-header-stats cluster-gap-sm">
              <span class="forecast-stat-pill">Min: <strong class="privacy-mask">${this.formatCurrency(forecast.minBalance)}</strong></span>
              <span class="forecast-stat-pill positive">Max: <strong class="privacy-mask">${this.formatCurrency(forecast.maxBalance)}</strong></span>
            </div>
          </div>
          <div class="card__value" style="font-size: 20px;">
            <span>Proiezione Cassa sui Prossimi 45 Giorni</span>
          </div>
          <div class="card__body">
            <div class="forecast-timeline-scroll">
              ${forecast.milestones.map(m => `
                <div class="forecast-milestone-card ${m.type}">
                  <div class="milestone-top">
                    <span class="milestone-icon">${m.icon}</span>
                    <span class="milestone-date">${new Date(m.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })}</span>
                  </div>
                  <div class="milestone-body">
                    <span class="milestone-title">${m.title}</span>
                    <span class="milestone-amount privacy-mask ${m.type === 'income' ? 'income-color' : 'expense-color'}">
                      ${m.type === 'income' ? '+' : '-'}${this.formatCurrency(m.amount)}
                    </span>
                  </div>
                  <div class="milestone-footer">
                    <span class="milestone-bal-label">Saldo stimato:</span>
                    <span class="milestone-bal-val privacy-mask">${this.formatCurrency(m.balance)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Evoluzione attesa della cassa corrente tra entrate certe e spese ricorrenti</span>
          </div>
        </section>

        <!-- 6. Spese Ricorrenti & Rate in Scadenza -->
        <section class="card recurring-section-card">
          <div class="card__header">
            <span class="card__title">Spese Ricorrenti & Rate Attive</span>
            <span class="trend-badge positive">${financeStore.recurringItems.length} Piani Attivi</span>
          </div>
          <div class="card__value" style="font-size: 20px;">
            <span>Piani di Spesa Fissi e Rateali</span>
          </div>
          <div class="card__body">
            <div class="grid-4" style="gap: var(--space-5);">
              ${financeStore.recurringItems.map(item => `
                <div class="card" style="background: var(--bg-hover); padding: 18px; box-shadow: none;">
                  <div class="card__header">
                    <span class="card__title" title="${item.name}">${item.name}</span>
                    <span class="cat-pill" style="font-size: 11px;">${item.category}</span>
                  </div>
                  <div class="card__value privacy-mask" style="font-size: 18px;">
                    €${item.monthlyAmount.toFixed(2)}<small style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">/mese</small>
                  </div>
                  <div class="card__body">
                    <div class="kv">
                      <span class="kv__label">Scadenza</span>
                      <span class="kv__value">${item.nextDate}</span>
                    </div>
                    ${item.totalRate > 0 ? `
                      <div class="kv">
                        <span class="kv__label">Piano</span>
                        <span class="kv__value">Rata ${item.currentRata}/${item.totalRate}</span>
                      </div>
                      <div class="meter">
                        <div class="meter__fill" style="width: ${(item.currentRata / item.totalRate) * 100}%; background: var(--apple-blue);"></div>
                      </div>
                    ` : `
                      <div class="kv">
                        <span class="kv__label">Tipo</span>
                        <span class="kv__value">Fisso mensile</span>
                      </div>
                    `}
                  </div>
                  <div class="card__footer">
                    <span class="trend-context">${item.totalRate > 0 ? `Rata ${item.currentRata} di ${item.totalRate}` : 'Pagamento Continuo'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Scadenze fisse e piani rateali in corso desunti dai movimenti</span>
          </div>
        </section>

      </div>
    `;

    this.bindCategoryPeriodEvents(txs, categories);

    const btnMonthlyClosing = container.querySelector('#btn-dashboard-monthly-closing');
    if (btnMonthlyClosing) {
      btnMonthlyClosing.addEventListener('click', () => {
        monthlyClosingModal.open({
          targetMonth: recStatus.targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    }

    const expenseCard = container.querySelector('#dash-expense-kpi-card');
    if (expenseCard) {
      expenseCard.addEventListener('click', () => {
        window.location.hash = '#spese';
      });
    }

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
