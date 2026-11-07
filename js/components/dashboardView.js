/**
 * Apple Design System - Dashboard View Component (Restauro Esecutivo HIG)
 * Visione limpida, aerea ed essenziale:
 * 1. Hero Card: Patrimonio Netto Effettivo Reale (Liquidità + Investimenti Trade Republic + Buoni Pasto)
 * 2. Flusso Mese Corrente (4 Pilastri): Entrate, Spese Fisse, Spese Extra, Rimanenza / Risparmio Extra
 * 3. Saldi Conti Reali (Buddybank, Trade Republic, Buoni Pasto)
 * 4. Previdenza a Lungo Termine: Fondo Pensione tracciato a parte ("Zero Allucinazioni")
 * 5. Grafico Cash Flow Mensile Essenziale
 */

import { financeStore } from '../data/mockData.js';
import { getIcon } from './icons.js';
import { monthlyClosingModal } from './monthlyClosingModal.js';

export class DashboardView {
  constructor() {
    this.lineChart = null;
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
    if (!container) return;

    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const liveAnalysis = financeStore.getCurrentMonthLiveAnalysis();
    const monthlyHistory = financeStore.getMonthlyTrendHistory(6);
    const recStatus = financeStore.getMonthlyReconciliationStatus();

    // Conti reali operativi (escluso il Fondo Pensione che ha la sua card dedicata e conti storici estinti)
    const operationalAccounts = accounts.filter(acc => {
      if (acc.isPension || (acc.name || '').toLowerCase().includes('pensione')) return false;
      const n = (acc.name || '').toLowerCase();
      if (n === 'btc' || n === 'salvadanaio' || acc.id === 'btc' || acc.id === 'salvadanaio' || acc.isExtinct) return false;
      return true;
    });
    const pensionAccount = accounts.find(acc => acc.isPension || acc.name.toLowerCase().includes('pensione'));
    const pensionBalance = pensionAccount ? pensionAccount.balance : summary.pensionFundTotal;

    // Trade Republic Breakdown
    const trAccount = operationalAccounts.find(a => a.id === 'trade_republic' || a.name.toLowerCase().includes('trade republic'));
    const trCash = trAccount ? (parseFloat(trAccount.cashBalance) || 0) : 0;
    const trInvested = trAccount ? Math.max(0, (trAccount.balance || 0) - trCash) : summary.investedTotal;

    // Calcolo 4 pilastri del mese corrente
    const effectiveIncome = liveAnalysis.effectiveIncome;
    const fixedExpenses = liveAnalysis.fixedExpenses;
    const variableExpenses = liveAnalysis.variableExpenses;
    const totalExpenses = liveAnalysis.actualExpense;
    const remainingSavings = liveAnalysis.remainingExtraSavings;
    const savingsRate = liveAnalysis.realSavingsRate;

    // Percentuali e proporzioni per visual grafici Workout / Apple HIG
    const totalNW = summary.effectiveNetWorth || 1;
    const pctLiquid = Math.max(0, Math.min(100, Math.round(((summary.liquidTotal || 0) / totalNW) * 100)));
    const pctVoucher = Math.max(0, Math.min(100, Math.round(((summary.voucherTotal || 0) / totalNW) * 100)));
    const pctInvested = Math.max(0, 100 - pctLiquid - pctVoucher);

    const maxBarVal = Math.max(effectiveIncome, fixedExpenses + variableExpenses, 1);
    const hEntrate = Math.round(Math.min(48, Math.max(10, (effectiveIncome / maxBarVal) * 48)));
    const hFisse = Math.round(Math.min(48, Math.max(6, (fixedExpenses / maxBarVal) * 48)));
    const hExtra = Math.round(Math.min(48, Math.max(6, (variableExpenses / maxBarVal) * 48)));

    const showClosingBanner = recStatus.needsReconciliation && (typeof sessionStorage === 'undefined' || !sessionStorage.getItem(`finanze_dismiss_closing_${recStatus.targetMonth}`));

    container.innerHTML = `
      <div class="view-container dashboard-view-restructured" style="animation: fadeIn 0.25s ease;">

        <!-- Mobile Workout-Style Primary CTA Button (Start Workout -> Nuovo Movimento) -->
        <div class="mobile-cta-wrap mobile-only-block">
          <button class="cta-workout-btn" id="btn-hero-new-tx" aria-label="Aggiungi Nuovo Movimento">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Nuovo Movimento</span>
          </button>
        </div>
        
        <!-- Banner Conguaglio Fine Mese (se necessario) -->
        ${showClosingBanner ? `
          <div class="monthly-closing-banner-card" style="margin-bottom: var(--space-box-gap-md); background: linear-gradient(135deg, rgba(255, 149, 0, 0.12) 0%, rgba(255, 204, 0, 0.08) 100%); border: 1px solid rgba(255, 149, 0, 0.3); border-radius: var(--radius-card); padding: 16px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-pill); background: var(--apple-orange); color: white; display: flex; align-items: center; justify-content: center;">
                  ${getIcon('conguaglio', 18)}
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: var(--text-primary);">Chiusura Mese di ${recStatus.targetMonthLabel}</h4>
                  <p style="margin: 2px 0 0; font-size: 12px; color: var(--text-secondary);">Riconcilia i saldi reali prima di passare al nuovo mese.</p>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="apple-btn-secondary" id="btn-snooze-closing-banner" data-target-month="${recStatus.targetMonth}" style="padding: 7px 14px; font-size: 12px;">Posticipa</button>
                <button class="apple-btn-primary" id="btn-dashboard-monthly-closing" style="padding: 7px 16px; font-size: 12px;">Riconcilia Ora</button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 1. HERO CARD: PATRIMONIO NETTO EFFETTIVO ("Zero Allucinazioni") -->
        <section class="card hero-patrimonio-card" id="dash-hero-networth-card" title="Visualizza evoluzione patrimonio nello Storico">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">Patrimonio Netto Effettivo</span>
                <span class="badge badge--positive hero-badge-tag">Disponibile &amp; Investito</span>
              </div>
              <div class="card__value privacy-mask hero-networth-val">
                ${this.formatCurrency(summary.effectiveNetWorth)}
              </div>
            </div>
            <div class="hero-trend-wrap">
              <span class="trend-badge positive">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                In crescita
              </span>
              <span class="trend-context">Storico &rarr;</span>
            </div>
          </div>

          <!-- Segmented Allocation Bar (Apple HIG / Workout Visual) -->
          <div class="alloc-bar-track">
            <div class="alloc-segment seg-liquid" style="width: ${pctLiquid}%;" title="Liquidità: ${pctLiquid}%"></div>
            <div class="alloc-segment seg-invested" style="width: ${pctInvested}%;" title="Investiti: ${pctInvested}%"></div>
            <div class="alloc-segment seg-voucher" style="width: ${pctVoucher}%;" title="Buoni Pasto: ${pctVoucher}%"></div>
          </div>

          <!-- Legenda Composizione a 3 Colonne Pulite -->
          <div class="alloc-legend">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-blue);"></span>
                <span class="legend-name">Liquidità</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-blue);">
                ${this.formatCurrency(summary.liquidTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-purple);"></span>
                <span class="legend-name">Trade Rep.</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-purple);">
                ${this.formatCurrency(summary.investedTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-orange);"></span>
                <span class="legend-name">Buoni Pasto</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-orange);">
                ${this.formatCurrency(summary.voucherTotal || 0)}
              </span>
            </div>
          </div>
        </section>

        <!-- 2. FLUSSO MESE CORRENTE -->
        <section class="cashflow-section">
          <div class="cashflow-header-row">
            <div class="cashflow-header-left">
              <h3 class="cashflow-title">
                <span>Flusso Mese • ${liveAnalysis.curMonthName} ${liveAnalysis.curYear}</span>
                <span class="badge badge--info flow-day-badge">
                  <span class="live-dot"></span>
                  Giorno ${liveAnalysis.curDay}/${liveAnalysis.daysInMonth}
                </span>
              </h3>
              <p class="cashflow-desc desk-only">
                Quadro sintetico entrate, impegni fissi, uscite variabili e risparmio extra residuo.
              </p>
            </div>
            <a href="#spese" class="cashflow-link">
              Dettaglio Spese &rarr;
            </a>
          </div>

          <!-- Mobile Workout-Style Micro Bar Chart (Mobile Only) -->
          <div class="native-card mobile-workout-cashflow-card mobile-only-block">
            <div class="cashflow-kpi-row">
              <div>
                <span class="cashflow-kpi-sub">Rimanenza Prevista</span>
                <div class="cashflow-kpi-val privacy-mask">+${this.formatCurrency(remainingSavings)}</div>
              </div>
              <span class="cashflow-pct-tag">${savingsRate}% Risparmio</span>
            </div>

            <!-- Micro Bar Chart (Entrate / Fisse / Extra) -->
            <div class="workout-bars-grid">
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(effectiveIncome)} €</div>
                <div class="bar-pill bar-entrate" style="height: ${hEntrate}px;"></div>
                <div class="bar-label">Entrate</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(fixedExpenses)} €</div>
                <div class="bar-pill bar-fisse" style="height: ${hFisse}px;"></div>
                <div class="bar-label">Fisse</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(variableExpenses)} €</div>
                <div class="bar-pill bar-extra" style="height: ${hExtra}px;"></div>
                <div class="bar-label">Extra</div>
              </div>
            </div>

            <div class="timeline-footer">
              <span>Avanzamento: <strong>Giorno ${liveAnalysis.curDay} di ${liveAnalysis.daysInMonth}</strong> (${liveAnalysis.monthProgressPct}%)</span>
              <span><strong>${liveAnalysis.daysRemaining} gg</strong> a fine mese</span>
            </div>
          </div>

          <!-- Desktop 4-Step Cards (Desktop Only) -->
          <div class="cashflow-4step-grid desk-only">
            
            <!-- Step 1: Entrate Mese -->
            <div class="cashflow-step-card step-income">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  1. Entrate
                </span>
                <span class="cashflow-step-badge badge--positive">
                  ${liveAnalysis.isIncomeEstimated ? 'Stimato' : 'Ricevuto'}
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-green);">
                ${this.formatCurrency(effectiveIncome)}
              </div>
              <div class="cashflow-step-subtext">
                ${liveAnalysis.extraIncomeLabel ? `Base stipendio ${liveAnalysis.extraIncomeLabel}` : 'Stipendio netto mensile'}
              </div>
            </div>

            <!-- Step 2: Spese Fisse -->
            <div class="cashflow-step-card step-fixed">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  2. Spese Fisse
                </span>
                <span class="cashflow-step-badge badge-orange-subtle">
                  Obbligate
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-orange);">
                ${this.formatCurrency(fixedExpenses)}
              </div>
              <div class="cashflow-step-subtext">
                Rate, casa e abbonamenti
              </div>
            </div>

            <!-- Step 3: Spese Extra -->
            <div class="cashflow-step-card step-extra">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  3. Spese Extra
                </span>
                <span class="cashflow-step-badge badge--neutral">
                  Variabili
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-red);">
                ${this.formatCurrency(variableExpenses)}
              </div>
              <div class="cashflow-step-subtext">
                Uscite correnti e svago
              </div>
            </div>

            <!-- Step 4: Rimanenza / Risparmio Extra -->
            <div class="cashflow-step-card step-savings">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  4. Rimanenza
                </span>
                <span class="cashflow-step-badge badge-purple-subtle">
                  ${savingsRate}%
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-purple);">
                ${this.formatCurrency(remainingSavings)}
              </div>
              <div class="cashflow-step-subtext">
                Tasso risparmio: ${savingsRate}%
              </div>
            </div>

          </div>

          <!-- Barra di Progresso Temporale Mese (Desktop Only) -->
          <div class="flow-progress-card desk-only">
            <div class="flow-progress-header">
              <span>Avanzamento mese: <strong>${liveAnalysis.curDay} su ${liveAnalysis.daysInMonth} gg</strong> (${liveAnalysis.monthProgressPct}%)</span>
              <span><strong>${liveAnalysis.daysRemaining} gg</strong> residui</span>
            </div>
            <div class="flow-progress-track">
              <div class="flow-progress-bar" style="width: ${liveAnalysis.monthProgressPct}%;"></div>
            </div>
          </div>
        </section>

        <!-- 3. SALDI CONTI REALI -->
        <section class="card accounts-overview-card">
          <div class="card__header">
            <div>
              <span class="card__title">Conti Reali &amp; Disponibilità</span>
              <span class="accounts-desc desk-only">
                I tuoi conti operativi, broker e benefit spesa
              </span>
            </div>
            <span class="badge badge--neutral">${operationalAccounts.length} Conti</span>
          </div>

          <div class="accounts-list-container">
            ${operationalAccounts.map(acc => {
              const isTR = acc.id === 'trade_republic' || acc.name.toLowerCase().includes('trade republic');
              const isVoucher = acc.isVoucher || acc.id === 'buoni_pasto';
              const targetRoute = isTR ? '#investimenti' : (isVoucher ? '#spese' : '#movimenti');
              const iconSvg = isTR 
                ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`
                : (isVoucher 
                    ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`
                    : `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="3"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`);
              
              const iconBg = isTR ? 'rgba(175, 82, 222, 0.12)' : (isVoucher ? 'rgba(255, 149, 0, 0.12)' : 'rgba(0, 113, 227, 0.12)');
              const iconColor = isTR ? 'var(--apple-purple)' : (isVoucher ? 'var(--apple-orange)' : 'var(--apple-blue)');

              return `
                <div class="account-row-item interactive" data-acc-id="${acc.id}" data-target-route="${targetRoute}" title="Visualizza dettagli ${acc.name}">
                  <div class="account-row-left">
                    <div class="account-row-icon" style="background: ${iconBg}; color: ${iconColor};">
                      ${iconSvg}
                    </div>
                    <div class="account-row-info">
                      <strong class="account-row-name">${acc.name}</strong>
                      <span class="account-row-type">
                        ${isTR ? (trCash > 0 ? `Titoli ${this.formatCurrency(trInvested).replace(',00', '')} • Cassa ${this.formatCurrency(trCash).replace(',00', '')}` : 'XEON & VWCE • Portafoglio ETF') : acc.type}
                      </span>
                    </div>
                  </div>
                  <div class="account-row-right">
                    <div class="privacy-mask account-row-balance">
                      ${this.formatCurrency(acc.balance)}
                    </div>
                    <span class="account-row-arrow">Dettagli &rarr;</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- 4. PREVIDENZA A LUNGO TERMINE (CARD SEPARATA STANDALONE) -->
        <section class="card pension-card">
          <div class="pension-layout">
            <div class="pension-left">
              <div class="pension-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="pension-info">
                <div class="pension-title-row">
                  <h4 class="pension-title">Previdenza • Fondo Pensione</h4>
                  <span class="badge pension-badge">Separato</span>
                </div>
                <p class="pension-desc">
                  Accantonamento in busta paga • Deducibile fino a 5.164,57 €/anno (Art. 51 TUIR) • Non disponibile immediato.
                </p>
              </div>
            </div>
            <div class="pension-right">
              <span class="pension-val-label desk-only">Valore Maturato</span>
              <div class="privacy-mask pension-val-number">
                ${this.formatCurrency(pensionBalance)}
              </div>
            </div>
          </div>
        </section>

        <!-- 5. GRAFICO CASH FLOW MENSILE ESSENZIALE -->
        <section class="card dashboard-chart-card">
          <div class="card__header">
            <div>
              <span class="card__title">Trend Flusso di Cassa (Ultime 6 Mensilità)</span>
              <span class="chart-desc desk-only">
                Confronto lineare Entrate vs Uscite
              </span>
            </div>
            <span class="badge badge--positive">Ultime 6 Mensilità</span>
          </div>

          <div class="dashboard-chart-canvas-wrap">
            <canvas id="dashboardCashFlowCanvas"></canvas>
          </div>
        </section>

      </div>
    `;

    // Event Listener Banner Conguaglio
    const btnMonthlyClosing = container.querySelector('#btn-dashboard-monthly-closing');
    if (btnMonthlyClosing) {
      btnMonthlyClosing.addEventListener('click', () => {
        monthlyClosingModal.open({
          targetMonth: recStatus.targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    }

    const btnSnooze = container.querySelector('#btn-snooze-closing-banner');
    if (btnSnooze) {
      btnSnooze.addEventListener('click', () => {
        const targetMonth = btnSnooze.getAttribute('data-target-month');
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(`finanze_dismiss_closing_${targetMonth}`, 'true');
        }
        const banner = container.querySelector('.monthly-closing-banner-card');
        if (banner) banner.style.display = 'none';
      });
    }

    // Navigazione interattiva dalla Hero Card allo Storico
    const heroCard = container.querySelector('#dash-hero-networth-card');
    if (heroCard) {
      heroCard.addEventListener('click', () => {
        window.location.hash = '#storico';
      });
    }

    // Listener per il pulsante d'azione primario mobile (+ Nuovo Movimento)
    const btnHeroNewTx = container.querySelector('#btn-hero-new-tx');
    if (btnHeroNewTx) {
      btnHeroNewTx.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== 'undefined' && window.app) {
          window.app.switchTab('movimenti');
          setTimeout(() => {
            if (window.app.movimentiView) {
              window.app.movimentiView.openModal();
            } else {
              const btnAdd = document.getElementById('btn-add-tx-header') || document.getElementById('btn-add-tx-mobile');
              if (btnAdd) btnAdd.click();
            }
          }, 80);
        } else {
          window.location.hash = '#movimenti';
          setTimeout(() => {
            const btnAdd = document.getElementById('btn-add-tx-header') || document.getElementById('btn-add-tx-mobile');
            if (btnAdd) btnAdd.click();
          }, 120);
        }
      });
    }

    // Apertura Dettaglio Conto con Pop-Up Apple al click
    container.querySelectorAll('.account-row-item.interactive').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const accId = item.getAttribute('data-acc-id');
        const acc = operationalAccounts.find(a => a.id === accId || (a.name || '').toLowerCase() === (accId || '').toLowerCase())
          || accounts.find(a => a.id === accId || (a.name || '').toLowerCase() === (accId || '').toLowerCase());
        if (acc) {
          this.openAccountDetailModal(acc);
        } else {
          const route = item.getAttribute('data-target-route');
          if (route) window.location.hash = route;
        }
      });
    });

    // Interattività anche sulla Card Fondo Pensione
    const pensionCard = container.querySelector('.pension-card');
    if (pensionCard && pensionAccount) {
      pensionCard.style.cursor = 'pointer';
      pensionCard.title = 'Visualizza dettagli Fondo Pensione';
      pensionCard.addEventListener('click', () => {
        this.openAccountDetailModal(pensionAccount);
      });
    }

    // Inizializza Grafico Cash Flow
    requestAnimationFrame(() => {
      this.initLineChart(monthlyHistory);
    });
  }

  openAccountDetailModal(acc) {
    if (!acc) return;
    document.body.classList.add('modal-open');
    
    // Rimuovi eventuale modale precedente
    const oldModal = document.getElementById('account-detail-modal-root');
    if (oldModal) oldModal.remove();

    const isTR = acc.id === 'trade_republic' || (acc.name || '').toLowerCase().includes('trade republic');
    const isVoucher = acc.isVoucher || acc.id === 'buoni_pasto' || (acc.name || '').toLowerCase().includes('buoni pasto');
    const isBuddy = acc.id === 'buddybank' || (acc.name || '').toLowerCase().includes('buddybank');
    const isPension = acc.isPension || (acc.name || '').toLowerCase().includes('pensione');

    const liveAnalysis = financeStore.getCurrentMonthLiveAnalysis();

    // Transazioni del conto in modo sicuro e retrocompatibile
    const allTxs = (typeof financeStore.getAllTransactions === 'function' 
      ? financeStore.getAllTransactions() 
      : (typeof financeStore.getTransactions === 'function' ? financeStore.getTransactions() : financeStore.transactions)) || [];

    // Tutti i movimenti collegati a questo conto
    const accAllTxs = allTxs.filter(t => {
      const aName = (t.account || '').toLowerCase();
      const fromName = (t.fromAccount || '').toLowerCase();
      const toName = (t.toAccount || '').toLowerCase();
      const targetName = (acc.name || '').toLowerCase();
      const targetId = (acc.id || '').toLowerCase();
      return (targetName && (aName.includes(targetName) || fromName.includes(targetName) || toName.includes(targetName))) ||
             (targetId && (aName.includes(targetId) || fromName.includes(targetId) || toName.includes(targetId)));
    });

    const accTxs = accAllTxs.slice(0, 5);

    // Calcolo Entrate vs Uscite del Mese Corrente per questo specifico conto
    const curM = String(liveAnalysis.curMonth).padStart(2, '0');
    const curY = String(liveAnalysis.curYear);
    const accMonthTxs = accAllTxs.filter(t => String(t.month).padStart(2, '0') === curM && String(t.year) === curY);

    let accMonthIncome = 0;
    let accMonthExpense = 0;

    accMonthTxs.forEach(t => {
      const amt = Math.abs(parseFloat(t.amount) || 0);
      const type = (t.type || '').toLowerCase();
      const rawType = (t.rawType || '').toLowerCase();
      if (type === 'income' || rawType === 'entrata') {
        accMonthIncome += amt;
      } else if (type === 'expense' || rawType === 'uscita') {
        accMonthExpense += amt;
      } else if (type === 'transfer' || rawType === 'trasferimento' || rawType === 'giroconto') {
        const isTo = (t.toAccount || '').toLowerCase().includes((acc.name || '').toLowerCase());
        if (isTo) accMonthIncome += amt;
        else accMonthExpense += amt;
      }
    });

    const netFlow = accMonthIncome - accMonthExpense;
    const netSign = netFlow >= 0 ? '+' : '';
    const totalActivity = accMonthIncome + accMonthExpense;

    let pctIncome = totalActivity > 0 ? Math.round((accMonthIncome / totalActivity) * 100) : 0;
    let pctExpense = totalActivity > 0 ? (100 - pctIncome) : 0;
    if (accMonthIncome > 0 && pctIncome < 6) {
      pctIncome = 6;
      pctExpense = 94;
    } else if (accMonthExpense > 0 && pctExpense < 6) {
      pctExpense = 6;
      pctIncome = 94;
    }

    // Dati specifici per composizione ETF Broker
    const xeonHolding = (acc.holdings || []).find(h => (h.ticker || '').toUpperCase() === 'XEON') || { currentValue: 4500.00 };
    const vwceHolding = (acc.holdings || []).find(h => (h.ticker || '').toUpperCase() === 'VWCE') || { currentValue: 3700.00 };
    const xeonVal = typeof xeonHolding.currentValue === 'number' ? xeonHolding.currentValue : 4500.00;
    const vwceVal = typeof vwceHolding.currentValue === 'number' ? vwceHolding.currentValue : 3700.00;
    const trTotalHoldings = xeonVal + vwceVal;
    const pctXeon = trTotalHoldings > 0 ? Math.round((xeonVal / trTotalHoldings) * 100) : 66;
    const pctVwce = 100 - pctXeon;

    // Dati conguaglio
    const recDate = acc.lastReconciledDate || '31/10/2026';
    const recBal = typeof acc.reconciledBalance !== 'undefined' ? acc.reconciledBalance : acc.balance;
    const diffFromRec = acc.balance - recBal;
    const diffSign = diffFromRec >= 0 ? '+' : '';

    const modalRoot = document.createElement('div');
    modalRoot.id = 'account-detail-modal-root';
    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="account-detail-overlay">
        <div class="apple-modal-sheet" id="account-detail-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
            <button class="modal-close-btn" id="account-detail-close">Chiudi</button>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Scheda Conto</h3>
            <span style="width: 44px;"></span>
          </div>

          <!-- Hero del Conto -->
          <div style="text-align: center; padding: 6px 0 16px;">
            <div style="width: 54px; height: 54px; border-radius: 18px; background: ${isTR ? 'rgba(175, 82, 222, 0.14)' : (isVoucher ? 'rgba(255, 149, 0, 0.14)' : (isPension ? 'rgba(52, 199, 89, 0.14)' : 'rgba(0, 113, 227, 0.14)'))}; color: ${isTR ? 'var(--apple-purple)' : (isVoucher ? 'var(--apple-orange)' : (isPension ? 'var(--apple-green)' : 'var(--apple-blue)'))}; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">
              ${isTR 
                ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>` 
                : (isVoucher 
                    ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>` 
                    : (isPension 
                        ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
                        : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="3"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`))}
            </div>
            <h2 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px;">${acc.name}</h2>
            <span class="badge ${isTR ? 'badge--info' : (isVoucher ? 'badge-orange-subtle' : (isPension ? 'badge--positive' : 'badge--neutral'))}" style="font-size: 11px;">
              ${isTR ? 'Broker & Investimenti ETF' : (isVoucher ? 'Ticket Restaurant & Benefit' : (isPension ? 'Previdenza Integrativa' : 'Conto Operativo Principale'))}
            </span>

            <div style="margin-top: 14px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); display: block;">Saldo Disponibile Attuale</span>
              <div class="privacy-mask" style="font-size: 32px; font-weight: 800; color: var(--text-primary); font-variant-numeric: tabular-nums; letter-spacing: -0.025em; margin-top: 2px;">
                ${this.formatCurrency(acc.balance)}
              </div>
            </div>
          </div>

          <!-- 2. Riepilogo Flusso Mese (Entrate vs Spese con Segmented Bar Stile Apple HIG) -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em;">
                Riepilogo Flusso • ${liveAnalysis.curMonthName}
              </span>
              <span class="badge badge--neutral" style="font-size: 10px;">${accMonthTxs.length} mov.</span>
            </div>

            <!-- Segmented Allocation Bar (Verde Entrate vs Rosso Uscite) -->
            <div class="alloc-bar-track" style="margin: 10px 0 10px; height: 8px;">
              ${totalActivity === 0 ? `
                <div class="alloc-segment" style="width: 100%; background: rgba(255, 255, 255, 0.08);" title="Nessun movimento registrato nel mese"></div>
              ` : `
                ${accMonthIncome > 0 ? `<div class="alloc-segment" style="width: ${pctIncome}%; background: #30D158;" title="Entrate: ${pctIncome}% (+${this.formatCurrency(accMonthIncome)})"></div>` : ''}
                ${accMonthExpense > 0 ? `<div class="alloc-segment" style="width: ${pctExpense}%; background: #FF453A;" title="Uscite: ${pctExpense}% (-${this.formatCurrency(accMonthExpense)})"></div>` : ''}
              `}
            </div>

            <!-- Legenda a 3 Colonne (Entrate, Uscite, Flusso Netto) -->
            <div class="alloc-legend">
              <div class="legend-col">
                <div class="legend-label-row">
                  <span class="dot-indicator" style="background: #30D158;"></span>
                  <span class="legend-name">Entrate</span>
                </div>
                <span class="privacy-mask legend-amount" style="color: #30D158; font-size: 13px;">
                  +${this.formatCurrency(accMonthIncome)}
                </span>
              </div>
              <div class="legend-col">
                <div class="legend-label-row">
                  <span class="dot-indicator" style="background: #FF453A;"></span>
                  <span class="legend-name">Uscite</span>
                </div>
                <span class="privacy-mask legend-amount" style="color: #FF453A; font-size: 13px;">
                  -${this.formatCurrency(accMonthExpense)}
                </span>
              </div>
              <div class="legend-col">
                <div class="legend-label-row">
                  <span class="dot-indicator" style="background: ${netFlow >= 0 ? '#30D158' : '#0A84FF'};"></span>
                  <span class="legend-name">Flusso Netto</span>
                </div>
                <span class="privacy-mask legend-amount" style="color: ${netFlow >= 0 ? '#30D158' : 'var(--text-primary)'}; font-size: 13px;">
                  ${netSign}${this.formatCurrency(netFlow)}
                </span>
              </div>
            </div>

            ${isBuddy && liveAnalysis.isIncomeEstimated ? `
              <div style="margin-top: 10px; padding-top: 8px; border-top: 0.5px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; color: var(--text-tertiary);">Accredito stipendio atteso (25 ${liveAnalysis.curMonthName})</span>
                <span style="font-size: 11.5px; font-weight: 600; color: var(--apple-blue);">~${this.formatCurrency(liveAnalysis.effectiveIncome)}</span>
              </div>
            ` : ''}
          </div>

          <!-- Box Riconciliazione & Controprova Saldi (Pulito) -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: var(--text-secondary);">Ultimo Conguaglio (${recDate})</span>
              <strong class="privacy-mask" style="font-size: 13px; font-variant-numeric: tabular-nums;">${this.formatCurrency(recBal)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: var(--text-secondary);">Variazione dal conguaglio</span>
              <strong class="privacy-mask" style="font-size: 13px; font-variant-numeric: tabular-nums; color: ${diffFromRec >= 0 ? 'var(--apple-green)' : 'var(--apple-red)'};">
                ${diffSign}${this.formatCurrency(diffFromRec)}
              </strong>
            </div>
          </div>

          <!-- Breakdown Specifico per Tipo Conto -->
          ${isBuddy ? `
            <div style="background: rgba(0, 113, 227, 0.05); border: 1px solid rgba(0, 113, 227, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-blue); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 10px;">Dettagli Operativi Buddybank</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Istituto Bancario</span>
                <strong style="font-size: 12.5px; color: var(--text-primary);">UniCredit S.p.A.</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Canale Primario</span>
                <strong style="font-size: 12.5px; color: var(--text-primary);">Debit Card &amp; Bonifici SEPA</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Prossimo Accredito Previsto</span>
                <strong style="font-size: 12.5px; color: var(--apple-green);">Stipendio il 25 del mese</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(0, 113, 227, 0.15);">
                <span style="font-size: 11px; color: var(--text-tertiary);">Destinazione d'uso</span>
                <span style="font-size: 11.5px; color: var(--text-secondary);">Spese fisse &amp; liquidità operativa</span>
              </div>
            </div>
          ` : ''}

          ${isTR ? `
            <div style="background: rgba(175, 82, 222, 0.06); border: 1px solid rgba(175, 82, 222, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-purple); text-transform: uppercase; letter-spacing: 0.04em;">Composizione Portafoglio ETF</span>
                <span class="badge badge--info" style="font-size: 10px;">2 Strumenti</span>
              </div>

              <!-- Segmented Allocation Bar (XEON vs VWCE) -->
              <div class="alloc-bar-track" style="margin: 8px 0 10px; height: 8px;">
                <div class="alloc-segment" style="width: ${pctXeon}%; background: var(--apple-purple);" title="XEON Monetario: ${pctXeon}%"></div>
                <div class="alloc-segment" style="width: ${pctVwce}%; background: var(--apple-blue);" title="VWCE Azionario: ${pctVwce}%"></div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">🛡️ XEON • Liquidità (€STR) (${pctXeon}%)</span>
                <strong class="privacy-mask" style="font-size: 13px; color: var(--apple-purple); font-variant-numeric: tabular-nums;">${this.formatCurrency(xeonVal)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">📈 VWCE • Azionario Globale (${pctVwce}%)</span>
                <strong class="privacy-mask" style="font-size: 13px; color: var(--apple-blue); font-variant-numeric: tabular-nums;">${this.formatCurrency(vwceVal)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(175, 82, 222, 0.15);">
                <span style="font-size: 11.5px; color: var(--text-secondary);">Rendimento netto stimato</span>
                <strong style="font-size: 12px; color: var(--apple-green);">+233,86 € / anno</strong>
              </div>
            </div>
          ` : ''}

          ${isVoucher ? (() => {
            const voucherUnit = (acc.balance > 0 && Math.abs((acc.balance / 10.5) - Math.round(acc.balance / 10.5)) < 0.02) ? 10.50 : 8.00;
            const voucherCount = Math.round(acc.balance / voucherUnit);
            return `
            <div style="background: rgba(255, 149, 0, 0.06); border: 1px solid rgba(255, 149, 0, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-orange); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 8px;">Dettaglio Buoni Pasto</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">Valore unitario buono</span>
                <strong style="font-size: 13px;">${this.formatCurrency(voucherUnit)} / buono</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">Buoni residui disponibili</span>
                <strong class="privacy-mask" style="font-size: 13px; color: var(--apple-orange); font-variant-numeric: tabular-nums;">${voucherCount} buoni</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(255, 149, 0, 0.15);">
                <span style="font-size: 11px; color: var(--text-tertiary);">Trattamento fiscale</span>
                <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">100% Esente da imposte (Art. 51 TUIR)</span>
              </div>
            </div>
            `;
          })() : ''}

          ${isPension ? `
            <div style="background: rgba(52, 199, 89, 0.06); border: 1px solid rgba(52, 199, 89, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-green); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 8px;">Dettaglio Fondo Pensione</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Deducibilità annuale</span>
                <strong style="font-size: 12.5px; color: var(--text-primary);">Fino a 5.164,57 €/anno</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Regime Fiscale Riscatto</span>
                <strong style="font-size: 12.5px; color: var(--apple-green);">Tassazione agevolata 9% - 15%</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(52, 199, 89, 0.15);">
                <span style="font-size: 11px; color: var(--text-tertiary);">Finalità</span>
                <span style="font-size: 11.5px; color: var(--text-secondary);">Previdenza complementare integrativa</span>
              </div>
            </div>
          ` : ''}

          <!-- Ultimi Movimenti Registrati sul Conto -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Ultimi Movimenti Registrati</span>
              <span style="font-size: 11.5px; color: var(--text-secondary);">${accTxs.length} recenti</span>
            </div>
            ${accTxs.length === 0 ? `
              <div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 12px; background: rgba(255,255,255,0.02); border-radius: 10px;">
                Nessun movimento recente registrato su questo conto
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${accTxs.map(t => {
                  const isInc = t.type === 'income';
                  const sign = isInc ? '+' : '-';
                  const color = isInc ? 'var(--apple-green)' : 'var(--text-primary)';
                  return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: rgba(255,255,255,0.03); border-radius: 10px;">
                      <div>
                        <strong style="font-size: 12.5px; color: var(--text-primary); display: block;">${t.description}</strong>
                        <span style="font-size: 11px; color: var(--text-secondary);">${t.date} • ${t.category}</span>
                      </div>
                      <span class="privacy-mask" style="font-size: 13px; font-weight: 700; color: ${color}; font-variant-numeric: tabular-nums;">
                        ${sign}${this.formatCurrency(t.amount)}
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

          <!-- Pulsanti di Azione -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="apple-btn-primary" id="account-detail-action-btn" style="flex: 1; justify-content: center; padding: 11px;">
              ${isTR ? 'Apri Portafoglio Investimenti' : (isVoucher ? 'Vedi Spese e Categorie' : 'Vedi Tutti i Movimenti')}
            </button>
            <button class="apple-btn-secondary" id="account-detail-close-btn" style="padding: 11px 18px;">
              Chiudi
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalRoot);

    // Animazione fluida Apple sheet
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modalRoot.querySelector('#account-detail-overlay')?.classList.add('open');
        modalRoot.querySelector('#account-detail-sheet')?.classList.add('open');
      });
    });

    const close = () => {
      document.body.classList.remove('modal-open');
      const sheet = modalRoot.querySelector('#account-detail-sheet');
      const overlay = modalRoot.querySelector('#account-detail-overlay');
      if (sheet) sheet.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      setTimeout(() => modalRoot.remove(), 260);
      document.removeEventListener('keydown', onKeydown);
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeydown);

    modalRoot.querySelector('#account-detail-close')?.addEventListener('click', close);
    modalRoot.querySelector('#account-detail-close-btn')?.addEventListener('click', close);
    modalRoot.querySelector('#account-detail-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'account-detail-overlay') close();
    });

    const handle = modalRoot.querySelector('.modal-handle');
    const sheet = modalRoot.querySelector('#account-detail-sheet');
    if (handle && sheet) {
      handle.addEventListener('click', close);
      let startY = 0;
      let currentY = 0;
      handle.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
      }, { passive: true });
      handle.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        if (diff > 0) {
          sheet.style.transform = `translateY(${diff}px)`;
        }
      }, { passive: true });
      handle.addEventListener('touchend', () => {
        const diff = currentY - startY;
        if (diff > 75) {
          close();
        } else {
          sheet.style.transform = '';
        }
      }, { passive: true });
    }

    modalRoot.querySelector('#account-detail-action-btn')?.addEventListener('click', () => {
      close();
      if (isTR) {
        window.location.hash = '#investimenti';
      } else if (isVoucher) {
        window.location.hash = '#spese';
      } else {
        window.location.hash = '#movimenti';
      }
    });
  }

  destroyCharts() {
    if (this.lineChart) {
      try { this.lineChart.destroy(); } catch (e) {}
      this.lineChart = null;
    }
  }

  initLineChart(historyData) {
    const canvas = document.getElementById('dashboardCashFlowCanvas');
    if (!canvas || !window.Chart) return;

    this.destroyCharts();

    const ctx = canvas.getContext('2d');
    const incomeGrad = ctx.createLinearGradient(0, 0, 0, 240);
    incomeGrad.addColorStop(0, 'rgba(52, 199, 89, 0.2)');
    incomeGrad.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

    const expenseGrad = ctx.createLinearGradient(0, 0, 0, 240);
    expenseGrad.addColorStop(0, 'rgba(255, 59, 48, 0.15)');
    expenseGrad.addColorStop(1, 'rgba(255, 59, 48, 0.0)');

    this.lineChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: historyData.labels,
        datasets: [
          {
            label: 'Entrate (€)',
            data: historyData.income,
            borderColor: '#30D158',
            backgroundColor: incomeGrad,
            fill: true,
            tension: 0.42,
            cubicInterpolationMode: 'monotone',
            borderWidth: 2.8,
            pointRadius: 0,
            pointHitRadius: 20,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#30D158'
          },
          {
            label: 'Uscite (€)',
            data: historyData.expenses,
            borderColor: '#FF453A',
            backgroundColor: expenseGrad,
            fill: true,
            tension: 0.42,
            cubicInterpolationMode: 'monotone',
            borderWidth: 2.8,
            pointRadius: 0,
            pointHitRadius: 20,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#FF453A'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              font: { size: 12, family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(28, 28, 30, 0.94)',
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: € ${ctx.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          },
          y: {
            grid: { color: 'rgba(120, 120, 128, 0.1)' },
            ticks: {
              font: { size: 11 },
              callback: (val) => '€ ' + val.toLocaleString('it-IT')
            }
          }
        }
      }
    });
  }
}
