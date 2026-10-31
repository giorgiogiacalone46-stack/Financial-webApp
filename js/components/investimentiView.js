/**
 * Apple Design System - Investimenti & Patrimonio Reale
 * - Sub-navigazione: Portafoglio & PAC, Profilo di Rischio, Obiettivi di Risparmio
 * - Asset Allocation dinamica da Conti & Saldi reali (XEON, VWCE, Pensione, Liquidità)
 * - Calcolo aggregato del Net Worth con percentuali precise
 * - Simulatore PAC interattivo Apple Spec (su VWCE con crescita composta)
 * - Profilatore di Rischio (MiFID leggero) con Target Allocation e Calcolo Rebalance
 * - Modulo Obiettivi di Risparmio (Saving Goals) con calcolo rata e fattibilità cash flow
 */

import { financeStore } from '../data/mockData.js';
import { getIcon } from './icons.js';

export class InvestimentiView {
  constructor() {
    this.activeSubtab = 'portafoglio'; // 'portafoglio' | 'rischio' | 'obiettivi' | 'fire'
    this.allocationChart = null;
    this.pacChart = null;
    this.targetDonutChart = null;
    this.fireChart = null;
    this.freshCapital = 500;

    this.pacParams = {
      initialCapital: 3410,
      monthlyDeposit: 200,
      annualReturn: 8.0,
      years: 15
    };

    this.fireParams = {
      monthlyExpense: 1400,
      swr: 4.0,
      annualReturn: 7.0,
      inflation: 2.0
    };
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
    if (this.allocationChart) {
      try { this.allocationChart.destroy(); } catch (e) {}
      this.allocationChart = null;
    }
    if (this.pacChart) {
      try { this.pacChart.destroy(); } catch (e) {}
      this.pacChart = null;
    }
    if (this.targetDonutChart) {
      try { this.targetDonutChart.destroy(); } catch (e) {}
      this.targetDonutChart = null;
    }
    if (this.fireChart) {
      try { this.fireChart.destroy(); } catch (e) {}
      this.fireChart = null;
    }
  }

  render(container) {
    this.destroyCharts();

    const { totalPortfolio, totalInvestedDirect, pensione } = this.getPortafoglioBreakdown();

    const tabMeta = {
      portafoglio: {
        badge: 'Asset Management',
        badgeClass: 'badge--purple',
        title: 'Portafoglio & Allocazione',
        subtitle: 'Asset allocation tra strumenti monetari (XEON), azionario globale (VWCE), previdenza e simulatore PAC',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-scroll-pac">
            ${getIcon('chart', 14)} Simulatore PAC
          </button>
        `
      },
      rischio: {
        badge: 'MiFID & Rebalance',
        badgeClass: 'badge--info',
        title: 'Profilo di Rischio & Target',
        subtitle: 'Questionario di tolleranza al rischio (MiFID), modello di allocazione ideale e ribilanciamento guidato',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-scroll-mifid">
            ${getIcon('target', 14)} Questionario MiFID
          </button>
        `
      },
      obiettivi: {
        badge: 'Saving Goals',
        badgeClass: 'badge--positive',
        title: 'Obiettivi di Risparmio & Traguardi',
        subtitle: 'Piani di accumulo per traguardi personali, calcolo rata mensile sostenibile e monitoraggio scadenze',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-goal-header">
            ${getIcon('plus', 14)} Nuovo Obiettivo
          </button>
        `
      },
      fire: {
        badge: 'F.I.R.E. Engine',
        badgeClass: 'badge--warning',
        title: 'Indipendenza Finanziaria (F.I.R.E.)',
        subtitle: 'Simulatore del crossover point, tasso di prelievo sicuro (SWR 4%) e proiezioni di rendita passiva',
        actionHtml: `
          <span class="badge badge--neutral" style="font-size: 12px; padding: 6px 12px;">
            ${getIcon('fire', 12)} Regola del 4% / 25x Uscite
          </span>
        `
      }
    };
    const currentMeta = tabMeta[this.activeSubtab] || tabMeta.portafoglio;

    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = 'Investimenti';
    if (subtitleEl) subtitleEl.textContent = currentMeta.subtitle;

    container.innerHTML = `
      <div class="page investimenti-page">

        <!-- Header di Sezione in Stile Spese (Titolo + Sottotitolo Dinamico) -->
        <header class="investimenti-header-section">
          
          <div class="spese-header-toolbar investimenti-header-toolbar">
            <div class="spese-header-info investimenti-header-info">
              <div class="investimenti-meta-row">
                <span class="badge ${currentMeta.badgeClass}">${currentMeta.badge}</span>
                <span class="investimenti-chip privacy-mask">
                  Investito: <strong>${this.formatCurrency(totalInvestedDirect + pensione)}</strong>
                </span>
                <span class="investimenti-chip privacy-mask">
                  Net Worth: <strong>${this.formatCurrency(totalPortfolio)}</strong>
                </span>
              </div>
              <h2 class="page-title">${currentMeta.title}</h2>
              <p class="page-subtitle">${currentMeta.subtitle}</p>
            </div>
            
            <div class="spese-header-actions investimenti-header-actions">
              ${currentMeta.actionHtml}
            </div>
          </div>

          <!-- Sotto-menu Segmentato Apple: Design Armonico, Integrato ed Omogeneo -->
          <div class="investimenti-subtabs-bar">
            <nav class="investimenti-segmented-tabs" id="investimenti-subtabs">
              <button class="investimenti-tab-btn ${this.activeSubtab === 'portafoglio' ? 'active' : ''}" data-subtab="portafoglio">
                <span class="tab-icon">${getIcon('chart', 15)}</span>
                <span class="tab-label">Portafoglio & PAC</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'rischio' ? 'active' : ''}" data-subtab="rischio">
                <span class="tab-icon">${getIcon('target', 15)}</span>
                <span class="tab-label">Profilo & Ribilanciamento</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'obiettivi' ? 'active' : ''}" data-subtab="obiettivi">
                <span class="tab-icon">${getIcon('savings', 15)}</span>
                <span class="tab-label">Obiettivi di Risparmio</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'fire' ? 'active' : ''}" data-subtab="fire">
                <span class="tab-icon">${getIcon('fire', 15)}</span>
                <span class="tab-label">Indipendenza F.I.R.E.</span>
              </button>
            </nav>
          </div>

        </header>

        ${this.activeSubtab === 'portafoglio' ? this.renderPortafoglioView() : ''}
        ${this.activeSubtab === 'rischio' ? this.renderRischioView() : ''}
        ${this.activeSubtab === 'obiettivi' ? this.renderObiettiviView() : ''}
        ${this.activeSubtab === 'fire' ? this.renderFireView() : ''}

      </div>
    `;

    this.bindSubtabEvents(container);

    if (this.activeSubtab === 'portafoglio') {
      this.bindPortafoglioEvents(container);
      requestAnimationFrame(() => {
        this.initAllocationChart();
        this.initPacChart();
      });
    } else if (this.activeSubtab === 'rischio') {
      this.bindRischioEvents(container);
    } else if (this.activeSubtab === 'obiettivi') {
      this.bindObiettiviEvents(container);
    } else if (this.activeSubtab === 'fire') {
      this.bindFireEvents(container);
      requestAnimationFrame(() => {
        this.initFireChart();
      });
    }
  }

  bindSubtabEvents(container) {
    container.querySelectorAll('#investimenti-subtabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          if (window.location.hash !== `#investimenti-${sub}`) {
            window.location.hash = `investimenti-${sub}`;
          }
          this.render(container);
        }
      });
    });

    const btnScrollPac = container.querySelector('#btn-scroll-pac');
    if (btnScrollPac) {
      btnScrollPac.addEventListener('click', () => {
        const el = container.querySelector('#pac-simulator-card, .pac-controls-card, .interactive-sim-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnScrollMifid = container.querySelector('#btn-scroll-mifid');
    if (btnScrollMifid) {
      btnScrollMifid.addEventListener('click', () => {
        const el = container.querySelector('.risk-survey-card, .survey-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnAddGoalHeader = container.querySelector('#btn-add-goal-header');
    if (btnAddGoalHeader) {
      btnAddGoalHeader.addEventListener('click', () => {
        this.openGoalModal(container);
      });
    }
  }

  // =========================================================================
  // 1. VISTA PORTAFOGLIO & PAC (Esistente Ottimizzata)
  // =========================================================================
  getPortafoglioBreakdown() {
    const accounts = financeStore.getAccounts();
    let xeon = 0;
    let vwce = 0;
    let pensione = 0;
    let liquid = 0;
    const customInvestments = [];

    accounts.forEach(acc => {
      const nameLower = acc.name.toLowerCase();
      const typeLower = (acc.type || '').toLowerCase();
      const bal = parseFloat(acc.balance) || 0;

      if (nameLower.includes('xeon') || typeLower.includes('monetari')) {
        xeon += bal;
      } else if (nameLower.includes('vwce') || nameLower.includes('all-world') || typeLower.includes('etf')) {
        vwce += bal;
      } else if (acc.isPension || nameLower.includes('pensione') || typeLower.includes('previden')) {
        pensione += bal;
      } else if (acc.isInvestment || typeLower.includes('invest')) {
        customInvestments.push({ name: acc.name, amount: bal, type: acc.type || 'Investimento' });
      } else {
        liquid += bal;
      }
    });

    if (xeon === 0 && vwce === 0 && pensione === 0) {
      xeon = 5383.32;
      vwce = 3410.25;
      pensione = 4391.24;
      liquid = 4170.00;
    }

    if (this.pacParams.initialCapital === 3410 && vwce > 0) {
      this.pacParams.initialCapital = Math.round(vwce);
    }

    const totalPortfolio = xeon + vwce + pensione + liquid + customInvestments.reduce((sum, i) => sum + i.amount, 0);
    const totalInvestedDirect = xeon + vwce + customInvestments.reduce((sum, i) => sum + i.amount, 0);

    const allocationData = [
      { name: 'Trade Republic - XEON (Fondo Emergenza)', amount: xeon, color: '#34C759', ticker: 'XEON', type: 'Monetario Overnight' },
      { name: 'Trade Republic - VWCE (Azionario Globale)', amount: vwce, color: '#0071E3', ticker: 'VWCE', type: 'ETF Azionario All-World' },
      { name: 'Previdenza Integrativa (Fondo Pensione)', amount: pensione, color: '#AF52DE', ticker: 'FONDO', type: 'Fondo Pensione' },
      ...customInvestments.map((ci, idx) => ({
        name: ci.name,
        amount: ci.amount,
        color: ['#FF9500', '#5856D6', '#FF2D55'][idx % 3],
        ticker: 'ASSET',
        type: ci.type
      })),
      { name: 'Liquidità Corrente (Conti & Contanti)', amount: liquid, color: '#FF9500', ticker: 'CASH', type: 'Liquidità' }
    ].filter(item => item.amount > 0).map(item => ({
      ...item,
      percentage: totalPortfolio > 0 ? ((item.amount / totalPortfolio) * 100).toFixed(1) : 0
    }));

    return { xeon, vwce, pensione, liquid, totalPortfolio, totalInvestedDirect, allocationData };
  }

  renderPortafoglioView() {
    const { xeon, vwce, pensione, liquid, totalPortfolio, totalInvestedDirect, allocationData } = this.getPortafoglioBreakdown();

    return `
      <!-- 1. Portfolio KPI Strip (Uniform 4-Zone Canonical Structure) -->
      <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));">
        <div class="card highlight-card">
          <div class="card__header">
            <span class="card__title" title="Patrimonio Complessivo Totale">Patrimonio Complessivo</span>
            <div class="kpi-icon-badge balance">${getIcon('balance', 16)}</div>
          </div>
          <div class="card__value privacy-mask">${this.formatCurrency(totalPortfolio)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Liquidità cassa</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(liquid)}</span>
            </div>
            <div class="kv">
              <span class="kv__label">Investimenti + Pensione</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(totalPortfolio - liquid)}</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Liquidità + Investimenti + Pensione</span>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Investito Diretto: ETF e Strumenti Monetari">Investito Diretto</span>
            <div class="kpi-icon-badge income">${getIcon('chart', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-blue);">${this.formatCurrency(totalInvestedDirect)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">XEON Monetario</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(xeon)}</span>
            </div>
            <div class="kv">
              <span class="kv__label">VWCE Azionario</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(vwce)}</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Fondo emergenza + ETF azionario</span>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Previdenza Integrativa e Fondo Pensione">Previdenza Integrativa</span>
            <span class="badge badge--purple">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}%</span>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-purple);">${this.formatCurrency(pensione)}</div>
          <div class="card__body">
            <div class="meter-row">
              <div class="meter__header">
                <span class="meter__label">Quota su patrimonio</span>
                <span class="meter__val">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}%</span>
              </div>
              <div class="meter">
                <div class="meter__fill" style="width: ${Math.min(100, (pensione / (totalPortfolio || 1)) * 100)}%; background: var(--apple-purple);"></div>
              </div>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}% del totale complessivo</span>
          </div>
        </div>
      </section>

      <!-- 2. Asset Allocation Reale & Dettaglio Strumenti -->
      <section class="investimenti-main-grid">
        <div class="chart-card donut-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3>Asset Allocation Reale</h3>
              <span class="chart-subtitle">Ripartizione del patrimonio dai saldi registrati</span>
            </div>
          </div>
          <div class="donut-chart-container">
            <div class="donut-canvas-wrapper">
              <canvas id="investmentsDonutCanvas"></canvas>
              <div class="donut-center-text">
                <span class="donut-center-label">Net Worth</span>
                <span class="donut-center-value">${this.formatCurrency(totalPortfolio)}</span>
              </div>
            </div>
            <div class="donut-legend">
              ${allocationData.map(a => `
                <div class="legend-item">
                  <span class="legend-color-dot" style="background-color: ${a.color};"></span>
                  <span class="legend-name" title="${a.name}">${a.name}</span>
                  <span class="legend-percent">${a.percentage}%</span>
                  <span class="legend-amount">${this.formatCurrency(a.amount)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="invest-holdings-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3>Strumenti & Strategia</h3>
              <span class="chart-subtitle">Composizione e obiettivi dei pilastri di investimento</span>
            </div>
          </div>
          <div class="holdings-list">
            <div class="holding-row">
              <div class="holding-info">
                <div class="holding-ticker-badge" style="background: rgba(52, 199, 89, 0.15); color: #34C759;">XEON</div>
                <div class="holding-text-group">
                  <span class="holding-name">Trade Republic - XEON</span>
                  <span class="holding-type">Fondo Emergenza / Monetario Overnight</span>
                </div>
              </div>
              <div class="holding-values">
                <span class="holding-amount">${this.formatCurrency(xeon)}</span>
                <span class="holding-sub" style="color: #34C759;">Rendimento cassa attivo</span>
              </div>
            </div>

            <div class="holding-row">
              <div class="holding-info">
                <div class="holding-ticker-badge" style="background: rgba(0, 113, 227, 0.15); color: #0071E3;">VWCE</div>
                <div class="holding-text-group">
                  <span class="holding-name">Trade Republic - VWCE</span>
                  <span class="holding-type">Azionario All-World (PAC 200 €/mese)</span>
                </div>
              </div>
              <div class="holding-values">
                <span class="holding-amount">${this.formatCurrency(vwce)}</span>
                <span class="holding-sub" style="color: #0071E3;">Versamento mensile attivo</span>
              </div>
            </div>

            <div class="holding-row">
              <div class="holding-info">
                <div class="holding-ticker-badge" style="background: rgba(175, 82, 222, 0.15); color: #AF52DE;">FONDO</div>
                <div class="holding-text-group">
                  <span class="holding-name">Previdenza Complementare</span>
                  <span class="holding-type">Fondo Pensione Integrativo di Categoria</span>
                </div>
              </div>
              <div class="holding-values">
                <span class="holding-amount">${this.formatCurrency(pensione)}</span>
                <span class="holding-sub">Deduzione fiscale annuale</span>
              </div>
            </div>

            <div class="holding-row">
              <div class="holding-info">
                <div class="holding-ticker-badge" style="background: rgba(255, 149, 0, 0.15); color: #FF9500;">LIQUID</div>
                <div class="holding-text-group">
                  <span class="holding-name">Liquidità Disponibile</span>
                  <span class="holding-type">Buddybank + Buoni Pasto + Contanti</span>
                </div>
              </div>
              <div class="holding-values">
                <span class="holding-amount">${this.formatCurrency(liquid)}</span>
                <span class="holding-sub">Cassa corrente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Simulatore PAC & Crescita Composta Apple Spec -->
      <section class="simulator-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3>Simulatore PAC & Crescita Composta</h3>
            <span class="chart-subtitle">Proietta la crescita del tuo piano di accumulo su VWCE e calcola l'interesse composto</span>
          </div>
        </div>

        <div class="simulator-grid">
          <div class="sim-controls">
            <div class="sim-control-group">
              <div class="sim-control-header">
                <span class="sim-label">Capitale Iniziale (€)</span>
                <span class="sim-value" id="val-capitale-iniziale">${this.formatCurrency(this.pacParams.initialCapital)}</span>
              </div>
              <input type="range" class="apple-slider" id="slider-capitale" min="0" max="30000" step="250" value="${this.pacParams.initialCapital}">
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

          <div class="sim-results-pane">
            <div class="sim-kpi-summary">
              <div class="sim-kpi highlight">
                <span class="sim-kpi-label">Valore Finale Stimato</span>
                <span class="sim-kpi-value positive" id="kpi-valore-finale">€0,00</span>
              </div>
              <div class="sim-kpi">
                <span class="sim-kpi-label">Capitale Versato</span>
                <span class="sim-kpi-value" id="kpi-capitale-versato">€0,00</span>
              </div>
              <div class="sim-kpi">
                <span class="sim-kpi-label">Interesse Generato</span>
                <span class="sim-kpi-value positive" id="kpi-interessi">€0,00</span>
              </div>
            </div>
            <div class="sim-canvas-wrapper">
              <canvas id="pacSimulationCanvas"></canvas>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  bindPortafoglioEvents(container) {
    const bindSlider = (id, key, formatFn, valId) => {
      const slider = container.querySelector(id);
      const valEl = container.querySelector(valId);
      if (slider && valEl) {
        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this.pacParams[key] = val;
          valEl.textContent = formatFn(val);
          this.updatePacSimulation();
        });
      }
    };

    bindSlider('#slider-capitale', 'initialCapital', v => this.formatCurrency(v), '#val-capitale-iniziale');
    bindSlider('#slider-versamento', 'monthlyDeposit', v => this.formatCurrency(v), '#val-versamento-mensile');
    bindSlider('#slider-rendimento', 'annualReturn', v => v + '%', '#val-rendimento-annuo');
    bindSlider('#slider-orizzonte', 'years', v => v + ' anni', '#val-orizzonte');
  }

  // =========================================================================
  // 2. VISTA PROFILO DI RISCHIO & TARGET ALLOCATION (Nuova R&D)
  // =========================================================================
  renderRischioView() {
    const stored = financeStore.getRiskProfile();
    const answers = stored.answers || { horizon: '2', tolerance: '2', goal: '2', knowledge: '2' };
    const templates = financeStore.getRiskProfileTemplates();

    // Calcolo punteggio
    const totalScore = parseInt(answers.horizon, 10) + parseInt(answers.tolerance, 10) + parseInt(answers.goal, 10) + parseInt(answers.knowledge, 10);
    let profileKey = 'bilanciato';
    if (totalScore <= 6) profileKey = 'conservativo';
    else if (totalScore <= 9) profileKey = 'bilanciato';
    else if (totalScore <= 11) profileKey = 'dinamico';
    else profileKey = 'aggressivo';

    const activeProfile = templates[profileKey];
    const { liquid, xeon, vwce, pensione, totalPortfolio } = this.getPortafoglioBreakdown();

    // Ripartizione attuale %
    const curLiquidPct = totalPortfolio > 0 ? (liquid / totalPortfolio) * 100 : 25;
    const curMonetarioPct = totalPortfolio > 0 ? (xeon / totalPortfolio) * 100 : 30;
    const curAzionarioPct = totalPortfolio > 0 ? (vwce / totalPortfolio) * 100 : 20;
    const curPensionePct = totalPortfolio > 0 ? (pensione / totalPortfolio) * 100 : 25;

    // Target amounts
    const targetLiquidAmount = totalPortfolio * (activeProfile.allocations.liquid / 100);
    const targetMonetarioAmount = totalPortfolio * (activeProfile.allocations.monetario / 100);
    const targetAzionarioAmount = totalPortfolio * (activeProfile.allocations.azionario / 100);
    const targetPensioneAmount = totalPortfolio * (activeProfile.allocations.pensione / 100);

    const deltaAzionario = targetAzionarioAmount - vwce;
    const deltaLiquid = targetLiquidAmount - liquid;
    const rebalanceData = financeStore.calculateSmartRebalance(this.freshCapital);

    return `
      <div class="risk-profile-layout">

        <!-- Questionario Apple MiFID Leggero -->
        <section class="risk-survey-card">
          <div class="section-card-header">
            <div>
              <h3>Questionario Profilo di Rischio</h3>
              <span class="card-subtitle">4 semplici quesiti per definire la tua propensione al rischio e l'asset allocation ideale</span>
            </div>
            <span class="profile-badge" style="background: ${activeProfile.color};">${activeProfile.title}</span>
          </div>

          <!-- Domanda 1 -->
          <div class="survey-question-block">
            <span class="survey-question-title">1. Orizzonte Temporale di Investimento</span>
            <div class="survey-options-grid" data-q="horizon">
              <button class="survey-option-btn ${answers.horizon === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Breve Termine (&lt; 2 anni)</span>
                <span class="survey-option-desc">Spese previste a breve, preferenza per liquidità e conti deposito.</span>
              </button>
              <button class="survey-option-btn ${answers.horizon === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Medio Termine (3 - 7 anni)</span>
                <span class="survey-option-desc">Progetti di vita futuri, equilibrio tra crescita e sicurezza.</span>
              </button>
              <button class="survey-option-btn ${answers.horizon === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Lungo Termine (&gt; 10 anni)</span>
                <span class="survey-option-desc">Orizzonte decennale per capitalizzare sull'interesse composto.</span>
              </button>
            </div>
          </div>

          <!-- Domanda 2 -->
          <div class="survey-question-block">
            <span class="survey-question-title">2. Tolleranza alla Volatilità di Mercato</span>
            <div class="survey-options-grid" data-q="tolerance">
              <button class="survey-option-btn ${answers.tolerance === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Bassa (Vendo o temo le perdite)</span>
                <span class="survey-option-desc">Un calo del -10% mi toglie il sonno, voglio proteggere il capitale.</span>
              </button>
              <button class="survey-option-btn ${answers.tolerance === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Moderata (Mantengo la calma)</span>
                <span class="survey-option-desc">So che i mercati oscillano e aspetto con serenità la ripresa.</span>
              </button>
              <button class="survey-option-btn ${answers.tolerance === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Elevata (Compro sui ribassi)</span>
                <span class="survey-option-desc">Considero i drawdown come sconti d'acquisto per accumulare quote.</span>
              </button>
            </div>
          </div>

          <!-- Domanda 3 -->
          <div class="survey-question-block">
            <span class="survey-question-title">3. Obiettivo Finanziario Primario</span>
            <div class="survey-options-grid" data-q="goal">
              <button class="survey-option-btn ${answers.goal === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Preservazione del Capitale</span>
                <span class="survey-option-desc">Batter l'inflazione senza rischiare perdite di valore nominale.</span>
              </button>
              <button class="survey-option-btn ${answers.goal === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Rendimento Equilibrato</span>
                <span class="survey-option-desc">Crescita costante moderando l'esposizione azionaria.</span>
              </button>
              <button class="survey-option-btn ${answers.goal === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Massima Espansione Patrimoniale</span>
                <span class="survey-option-desc">Crescita esponenziale a lungo raggio accettando forti oscillazioni.</span>
              </button>
            </div>
          </div>

          <!-- Domanda 4 -->
          <div class="survey-question-block" style="margin-bottom: 0;">
            <span class="survey-question-title">4. Esperienza e Conoscenza Finanziaria</span>
            <div class="survey-options-grid" data-q="knowledge">
              <button class="survey-option-btn ${answers.knowledge === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Base (Conto & Libretto)</span>
                <span class="survey-option-desc">Esperienza limitata a conti correnti e strumenti bancari classici.</span>
              </button>
              <button class="survey-option-btn ${answers.knowledge === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Buona (ETF, PAC, BTP)</span>
                <span class="survey-option-desc">Comprendo la diversificazione globale e la gestione automatizzata.</span>
              </button>
              <button class="survey-option-btn ${answers.knowledge === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Avanzata (Asset Allocation Attiva)</span>
                <span class="survey-option-desc">Gestisco in autonomia strumenti complessi e ribilanciamenti.</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Scheda Profilo Assegnato & Target Allocation -->
        <section class="profile-result-card">
          <div class="profile-result-header">
            <div>
              <h3>Profilo: ${activeProfile.title}</h3>
              <p class="card-subtitle" style="max-width: 600px;">
                ${activeProfile.description}
              </p>
            </div>
            <div class="score-display-block">
              <span class="score-display-label">Punteggio Rilevato</span>
              <div class="score-display-value" style="color: ${activeProfile.color};">${totalScore} / 12</div>
            </div>
          </div>

          <!-- Confronto Allocazione: Reale vs Target -->
          <div class="allocation-compare-grid">
            
            <!-- Colonna 1: Allocazione Attuale Reale -->
            <div class="allocation-col-card">
              <div class="alloc-card-header">
                <span class="alloc-card-title">Allocazione Attuale Reale</span>
                <span class="alloc-card-total">${this.formatCurrency(totalPortfolio)}</span>
              </div>
              
              <div class="alloc-rows-list">
                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Liquidità Libera (Buddybank / Cassa)</span>
                    <span class="alloc-row-val">${curLiquidPct.toFixed(1)}% • ${this.formatCurrency(liquid)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curLiquidPct}%; background: #FF9500;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Monetario Overnight (XEON Fondo Emergenza)</span>
                    <span class="alloc-row-val">${curMonetarioPct.toFixed(1)}% • ${this.formatCurrency(xeon)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curMonetarioPct}%; background: #34C759;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Azionario Globale (VWCE PAC)</span>
                    <span class="alloc-row-val">${curAzionarioPct.toFixed(1)}% • ${this.formatCurrency(vwce)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curAzionarioPct}%; background: #0071E3;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Previdenza Complementare (Pensione)</span>
                    <span class="alloc-row-val">${curPensionePct.toFixed(1)}% • ${this.formatCurrency(pensione)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curPensionePct}%; background: #AF52DE;"></div></div>
                </div>
              </div>
            </div>

            <!-- Colonna 2: Allocazione Target per il tuo Profilo -->
            <div class="allocation-col-card">
              <div class="alloc-card-header">
                <span class="alloc-card-title">Target Ideale (${activeProfile.badge})</span>
                <span class="alloc-card-total" style="color: ${activeProfile.color};">100% Target</span>
              </div>

              <div class="alloc-rows-list">
                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Liquidità Target (${activeProfile.allocations.liquid}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetLiquidAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.liquid}%; background: #FF9500;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Monetario Target (${activeProfile.allocations.monetario}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetMonetarioAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.monetario}%; background: #34C759;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Azionario Globale Target (${activeProfile.allocations.azionario}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetAzionarioAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.azionario}%; background: #0071E3;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Previdenza Target (${activeProfile.allocations.pensione}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetPensioneAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.pensione}%; background: #AF52DE;"></div></div>
                </div>
              </div>
            </div>

          </div>

          <!-- Box Ribilanciamento & Consiglio Operativo -->
          <div class="rebalance-advice-box">
            <div class="rebalance-advice-inner">
              <span class="rebalance-advice-icon" style="color: var(--apple-blue); display: inline-flex;">${getIcon('balance', 22)}</span>
              <div class="rebalance-advice-content">
                <h4 class="rebalance-advice-title">Piano di Ribilanciamento Consigliato</h4>
                <p class="rebalance-advice-desc">
                  ${deltaAzionario > 0 
                    ? `Per allineare il tuo portafoglio al profilo <strong>${activeProfile.title}</strong>, hai un gap azionario di <strong class="privacy-mask">${this.formatCurrency(deltaAzionario)}</strong> su VWCE. Attualmente hai <strong class="privacy-mask">${this.formatCurrency(Math.abs(deltaLiquid))}</strong> di liquidità in eccedenza che puoi convogliare sul PAC o con versamenti una tantum.`
                    : `La tua esposizione azionaria è perfettamente in linea o superiore al target. Mantieni la regolarità del tuo PAC mensile da 200 €.`}
                </p>
                <div class="rebalance-advice-pills">
                  ${activeProfile.instruments.map(inst => `
                    <span class="rebalance-pill">
                      ✓ ${inst}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Calcolatore Operativo Ribilanciamento con Nuova Liquidità -->
          <div class="smart-rebalance-card">
            <div class="smart-rebalance-header">
              <div class="smart-rebalance-header-left">
                <span class="badge-rebalance">Smart Rebalance Engine</span>
                <h4 class="smart-rebalance-title">Allocazione Nuova Liquidità & Ordini Broker</h4>
                <p class="smart-rebalance-desc">
                  Calcola come ripartire nuovi versamenti per riallineare il portafoglio ai target MiFID <strong>${activeProfile.title}</strong>, senza vendere asset né incorrere in tassazione su plusvalenze.
                </p>
              </div>
              <div class="rebalance-input-group">
                <label for="input-fresh-capital" class="rebalance-input-label">Nuova Liquidità da Ripartire</label>
                <div class="rebalance-input-wrap">
                  <span class="currency-symbol">€</span>
                  <input type="number" id="input-fresh-capital" class="rebalance-input-field" value="${this.freshCapital}" min="50" step="50" />
                </div>
                <div class="rebalance-quick-pills">
                  <button type="button" class="rebalance-quick-btn ${this.freshCapital === 250 ? 'active' : ''}" data-amt="250">+250 €</button>
                  <button type="button" class="rebalance-quick-btn ${this.freshCapital === 500 ? 'active' : ''}" data-amt="500">+500 €</button>
                  <button type="button" class="rebalance-quick-btn ${this.freshCapital === 1000 ? 'active' : ''}" data-amt="1000">+1.000 €</button>
                </div>
              </div>
            </div>

            <!-- Ripartizione Ordini -->
            <div class="rebalance-orders-grid" id="rebalance-orders-grid">
              ${this.renderRebalanceOrderCards(rebalanceData)}
            </div>

            <div class="rebalance-footer-action">
              <div class="rebalance-instruction-text">
                <span class="instruction-icon" style="color: var(--apple-blue); display: inline-flex;">${getIcon('sparkle', 16)}</span>
                <span id="rebalance-instruction-msg">${rebalanceData.summaryInstruction}</span>
              </div>
              <button type="button" class="btn-copy-broker" id="btn-copy-broker-orders">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span id="copy-broker-text">Copia Istruzioni Broker</span>
              </button>
            </div>
          </div>

        </section>

      </div>
    `;
  }

  renderRebalanceOrderCards(rebalanceData) {
    if (!rebalanceData || !rebalanceData.allocations || rebalanceData.allocations.length === 0) {
      return `<p class="empty-state-text">Nessun ordine necessario con questo importo.</p>`;
    }
    return rebalanceData.allocations.map(item => `
      <div class="rebalance-order-item" style="border-left-color: ${item.color};">
        <div class="order-item-header">
          <span class="order-item-ticker" style="background: ${item.color}15; color: ${item.color};">${item.ticker}</span>
          <span class="order-item-action">ORDINE ACQUISTO</span>
        </div>
        <div class="order-item-name">${item.asset}</div>
        <div class="order-item-amount privacy-mask">${this.formatCurrency(item.amount)}</div>
        <div class="order-item-pct">
          Quota: ${Math.round((item.amount / rebalanceData.freshCapital) * 100)}% del versamento
        </div>
      </div>
    `).join('');
  }

  bindRischioEvents(container) {
    container.querySelectorAll('.survey-options-grid').forEach(grid => {
      const q = grid.dataset.q;
      grid.querySelectorAll('.survey-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.dataset.val;
          const stored = financeStore.getRiskProfile();
          const answers = stored.answers || {};
          answers[q] = val;

          // Ricalcolo profilo
          const totalScore = parseInt(answers.horizon || '2', 10) + parseInt(answers.tolerance || '2', 10) + parseInt(answers.goal || '2', 10) + parseInt(answers.knowledge || '2', 10);
          let pKey = 'bilanciato';
          if (totalScore <= 6) pKey = 'conservativo';
          else if (totalScore <= 9) pKey = 'bilanciato';
          else if (totalScore <= 11) pKey = 'dinamico';
          else pKey = 'aggressivo';

          financeStore.saveRiskProfile(answers, pKey);
          this.render(container);
        });
      });
    });

    // Smart Rebalance Event Listeners
    const inputCapital = container.querySelector('#input-fresh-capital');
    const ordersGrid = container.querySelector('#rebalance-orders-grid');
    const msgEl = container.querySelector('#rebalance-instruction-msg');
    const quickBtns = container.querySelectorAll('.rebalance-quick-btn');
    const copyBtn = container.querySelector('#btn-copy-broker-orders');

    const updateRebalanceUI = (val) => {
      this.freshCapital = Math.max(0, parseFloat(val) || 0);
      const rebal = financeStore.calculateSmartRebalance(this.freshCapital);
      if (ordersGrid) ordersGrid.innerHTML = this.renderRebalanceOrderCards(rebal);
      if (msgEl) msgEl.textContent = rebal.summaryInstruction;
      quickBtns.forEach(b => {
        b.classList.toggle('active', parseFloat(b.dataset.amt) === this.freshCapital);
      });
    };

    if (inputCapital) {
      inputCapital.addEventListener('input', (e) => {
        updateRebalanceUI(e.target.value);
      });
    }

    quickBtns.forEach(b => {
      b.addEventListener('click', () => {
        const amt = parseFloat(b.dataset.amt);
        if (inputCapital) inputCapital.value = amt;
        updateRebalanceUI(amt);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const rebal = financeStore.calculateSmartRebalance(this.freshCapital);
        const textToCopy = [
          `=== PIANO DI RIBILANCIAMENTO SMART ===`,
          `Capitale Fresco da Investire: ${this.formatCurrency(this.freshCapital)}`,
          `Profilo: ${rebal.profileTitle} (${rebal.profileBadge})`,
          `Data: ${new Date().toLocaleDateString('it-IT')}`,
          ``,
          `ORDINI DA ESEGUIRE SUL BROKER:`,
          ...rebal.allocations.map(a => `• ACQUISTA ${a.ticker} (${a.asset}): ${this.formatCurrency(a.amount)}`),
          ``,
          `Nota: ${rebal.summaryInstruction}`
        ].join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            const span = copyBtn.querySelector('#copy-broker-text');
            if (span) {
              const orig = span.textContent;
              span.textContent = '✓ Istruzioni Copiate!';
              setTimeout(() => { span.textContent = orig; }, 2500);
            }
          }).catch(() => {
            alert(textToCopy);
          });
        } else {
          alert(textToCopy);
        }
      });
    }
  }

  // =========================================================================
  // 3. VISTA OBIETTIVI DI RISPARMIO (Saving Goals)
  // =========================================================================
  renderObiettiviView() {
    const goals = financeStore.getGoals();
    const sum = financeStore.summary;
    const monthlySavings = sum.savingsAmount || 400;

    let totalTarget = 0;
    let totalCurrent = 0;
    let totalMonthlyQuota = 0;

    const enrichedGoals = goals.map(g => {
      totalTarget += g.targetAmount;
      totalCurrent += g.currentAmount;

      const pct = Math.min(100, Math.round((g.currentAmount / (g.targetAmount || 1)) * 100));
      const remaining = Math.max(0, g.targetAmount - g.currentAmount);

      // Calcolo mesi mancanti alla deadline
      let monthsLeft = 12;
      if (g.deadline) {
        const [dy, dm] = g.deadline.split('-').map(Number);
        const now = new Date();
        const diffMonths = (dy - now.getFullYear()) * 12 + (dm - (now.getMonth() + 1));
        monthsLeft = Math.max(1, diffMonths);
      }

      const monthlyQuota = remaining / monthsLeft;
      totalMonthlyQuota += monthlyQuota;

      return {
        ...g,
        pct,
        remaining,
        monthsLeft,
        monthlyQuota
      };
    });

    const isFeasible = monthlySavings >= totalMonthlyQuota;

    return `
      <div class="goals-pane investimenti-subview-stack">

        <!-- KPI Strip Obiettivi -->
        <div class="cat-kpis-grid">
          <div class="cat-kpi-card">
            <span class="cat-kpi-label">Totale Accumulato</span>
            <span class="cat-stat-num income-color">${this.formatCurrency(totalCurrent)}</span>
            <span class="cat-stat-sub">Su target complessivo di <span class="privacy-mask">${this.formatCurrency(totalTarget)}</span></span>
          </div>

          <div class="cat-kpi-card">
            <span class="cat-kpi-label">Quota Mensile Necessaria</span>
            <span class="cat-stat-num accent">${this.formatCurrency(totalMonthlyQuota)}/mese</span>
            <span class="cat-stat-sub">Per completare tutti i target in tempo</span>
          </div>

          <div class="cat-kpi-card">
            <span class="cat-kpi-label">Fattibilità Cash Flow</span>
            <span class="cat-stat-num" style="color: ${isFeasible ? 'var(--apple-green)' : 'var(--apple-orange)'};">
              ${isFeasible ? 'Sostenibile' : 'Attenzione'}
            </span>
            <span class="cat-stat-sub">Risparmio medio attuale: <span class="privacy-mask">${this.formatCurrency(monthlySavings)}/mese</span></span>
          </div>
        </div>

        <!-- Griglia Cards Obiettivi -->
        <div class="goals-grid">
          ${enrichedGoals.map(g => `
            <div class="goal-card" data-id="${g.id}">
              <div class="goal-header">
                <div class="goal-title-group">
                  <span class="goal-emoji" style="color: var(--apple-blue); display: inline-flex;">${getIcon('target', 20)}</span>
                  <div class="goal-titles">
                    <span class="goal-name">${g.name}</span>
                    <span class="goal-account">Conto: ${g.account}</span>
                  </div>
                </div>
                <button class="apple-btn-delete-inline btn-delete-goal" data-id="${g.id}" title="Elimina obiettivo">&times;</button>
              </div>

              <div class="goal-progress-section">
                <div class="goal-amounts-row">
                  <span class="goal-val">${this.formatCurrency(g.currentAmount)}</span>
                  <span class="goal-target-val">di ${this.formatCurrency(g.targetAmount)} (${g.pct}%)</span>
                </div>

                <div class="goal-progress-bar">
                  <div class="goal-progress-fill" style="width: ${g.pct}%;"></div>
                </div>

                <div class="goal-footer">
                  <span>Scadenza: ${g.deadline || 'Aperta'} (${g.monthsLeft} mesi)</span>
                  <span class="goal-rate-pill">+${this.formatCurrency(g.monthlyQuota)}/mese</span>
                </div>
              </div>

              <div class="goal-deposit-bar">
                <input type="number" step="50" class="apple-input input-goal-add" placeholder="+€ Versa importo" />
                <button class="apple-btn-secondary btn-goal-deposit" data-id="${g.id}">Versa</button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  bindObiettiviEvents(container) {
    const btnAdd = document.getElementById('btn-add-goal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        this.openGoalModal(container);
      });
    }

    container.querySelectorAll('.btn-delete-goal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Sei sicuro di voler rimuovere questo obiettivo?')) {
          financeStore.deleteGoal(id);
          this.render(container);
        }
      });
    });

    container.querySelectorAll('.btn-goal-deposit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const card = container.querySelector(`.goal-card[data-id="${id}"]`);
        const input = card?.querySelector('.input-goal-add');
        if (input && input.value) {
          const addVal = parseFloat(input.value) || 0;
          const goals = financeStore.getGoals();
          const target = goals.find(g => g.id === id);
          if (target && addVal > 0) {
            financeStore.updateGoal(id, { currentAmount: target.currentAmount + addVal });
            this.render(container);
          }
        }
      });
    });
  }

  openGoalModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const accounts = financeStore.getAccounts();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="goal-modal-overlay">
        <div class="apple-modal-sheet open" id="goal-modal-sheet" style="max-width: 460px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="goal-modal-cancel">Annulla</button>
            <h3>Nuovo Obiettivo</h3>
            <button class="modal-save-btn" id="goal-modal-save">Salva</button>
          </div>
          <form class="modal-form" id="add-goal-form" onsubmit="return false;">
            <div class="form-group">
              <label class="form-label" for="goal-name-input">Nome Obiettivo</label>
              <input type="text" id="goal-name-input" class="apple-input" placeholder="Es. Vacanze Tokyo, Fondo Casa..." required />
            </div>

            <div class="form-group">
              <label class="form-label">Importo Target Desiderato (€)</label>
              <input type="number" id="goal-target-input" class="apple-input apple-input-lg" placeholder="2.000,00" step="50" required />
            </div>

            <div class="form-group">
              <label class="form-label">Importo Attualmente Risparmiato (€)</label>
              <input type="number" id="goal-current-input" class="apple-input" placeholder="0,00" step="50" value="0" />
            </div>

            <div class="form-group">
              <label class="form-label">Data Scadenza Obiettivo</label>
              <input type="date" id="goal-deadline-input" class="apple-input" />
            </div>

            <div class="form-group">
              <label class="form-label">Conto / Salvadanaio Associato</label>
              <div class="apple-select-wrapper">
                <select id="goal-account-select" class="apple-select">
                  ${accounts.map(a => `<option value="${a.name}">${a.name}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    const overlay = document.getElementById('goal-modal-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('goal-modal-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('goal-modal-save')?.addEventListener('click', () => {
      const emoji = '';
      const name = document.getElementById('goal-name-input')?.value.trim();
      const targetAmount = parseFloat(document.getElementById('goal-target-input')?.value) || 0;
      const currentAmount = parseFloat(document.getElementById('goal-current-input')?.value) || 0;
      const deadline = document.getElementById('goal-deadline-input')?.value || '';
      const account = document.getElementById('goal-account-select')?.value || 'Buddybank';

      if (!name || targetAmount <= 0) {
        alert('Inserisci un nome e un importo target valido.');
        return;
      }

      financeStore.addGoal({ emoji, name, targetAmount, currentAmount, deadline, account });
      close();
      this.render(container);
    });
  }

  // =========================================================================
  // CHARTS INITIALIZATION (Portafoglio & PAC)
  // =========================================================================
  initAllocationChart() {
    const canvas = document.getElementById('investmentsDonutCanvas');
    if (!canvas || !window.Chart) return;

    const { allocationData } = this.getPortafoglioBreakdown();

    if (this.allocationChart) {
      try { this.allocationChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    this.allocationChart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: allocationData.map(a => a.name),
        datasets: [{
          data: allocationData.map(a => a.amount),
          backgroundColor: allocationData.map(a => a.color),
          borderWidth: 2,
          borderColor: document.body.classList.contains('dark-theme') ? '#1C1C1E' : '#FFFFFF',
          hoverOffset: 6
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

  calculatePacSeries() {
    const { initialCapital, monthlyDeposit, annualReturn, years } = this.pacParams;
    const monthlyRate = Math.pow(1 + (annualReturn / 100), 1 / 12) - 1;
    const totalMonths = years * 12;

    const labels = [];
    const totalSeries = [];
    const investedSeries = [];

    let currentTotal = initialCapital;
    let currentInvested = initialCapital;

    labels.push('Oggi');
    totalSeries.push(Math.round(currentTotal));
    investedSeries.push(Math.round(currentInvested));

    for (let m = 1; m <= totalMonths; m++) {
      currentTotal = (currentTotal + monthlyDeposit) * (1 + monthlyRate);
      currentInvested += monthlyDeposit;

      if (m % 12 === 0) {
        labels.push(`Anno ${m / 12}`);
        totalSeries.push(Math.round(currentTotal));
        investedSeries.push(Math.round(currentInvested));
      }
    }

    const finalValue = Math.round(currentTotal);
    const finalInvested = Math.round(currentInvested);
    const finalInterest = Math.max(0, finalValue - finalInvested);

    return { labels, totalSeries, investedSeries, finalValue, finalInvested, finalInterest };
  }

  initPacChart() {
    const canvas = document.getElementById('pacSimulationCanvas');
    if (!canvas || !window.Chart) return;

    if (this.pacChart) {
      try { this.pacChart.destroy(); } catch (e) {}
    }

    const sim = this.calculatePacSeries();

    const valFinEl = document.getElementById('kpi-valore-finale');
    const capVersEl = document.getElementById('kpi-capitale-versato');
    const intGenEl = document.getElementById('kpi-interessi');

    if (valFinEl) valFinEl.textContent = this.formatCurrency(sim.finalValue);
    if (capVersEl) capVersEl.textContent = this.formatCurrency(sim.finalInvested);
    if (intGenEl) intGenEl.textContent = '+' + this.formatCurrency(sim.finalInterest);

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const ctx = canvas.getContext('2d');

    this.pacChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: sim.labels,
        datasets: [
          {
            label: 'Capitale Versato',
            data: sim.investedSeries,
            borderColor: '#8E8E93',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0.2
          },
          {
            label: 'Valore Totale Composto',
            data: sim.totalSeries,
            borderColor: '#34C759',
            backgroundColor: 'rgba(52, 199, 89, 0.12)',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.35
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
              font: { size: 11 },
              maxTicksLimit: 6,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  updatePacSimulation() {
    if (!this.pacChart) return;
    const sim = this.calculatePacSeries();

    const valFinEl = document.getElementById('kpi-valore-finale');
    const capVersEl = document.getElementById('kpi-capitale-versato');
    const intGenEl = document.getElementById('kpi-interessi');

    if (valFinEl) valFinEl.textContent = this.formatCurrency(sim.finalValue);
    if (capVersEl) capVersEl.textContent = this.formatCurrency(sim.finalInvested);
    if (intGenEl) intGenEl.textContent = '+' + this.formatCurrency(sim.finalInterest);

    this.pacChart.data.labels = sim.labels;
    this.pacChart.data.datasets[0].data = sim.investedSeries;
    this.pacChart.data.datasets[1].data = sim.totalSeries;
    this.pacChart.update('none');
  }

  // =========================================================================
  // 4. VISTA SIMULATORE F.I.R.E. & CROSSOVER POINT
  // =========================================================================
  renderFireView() {
    const fire = financeStore.calculateFireMetrics(this.fireParams);
    const monthlyPassive = fire.currentPassiveIncome / 12;

    return `
      <div class="investimenti-subview-stack">
        <!-- Hero Apple Card -->
        <section class="card highlight-card" style="background: linear-gradient(135deg, rgba(175, 82, 222, 0.08) 0%, rgba(0, 113, 227, 0.04) 100%);">
          <div class="card__header">
            <span class="card__title" title="Financial Independence, Retire Early">Financial Independence, Retire Early</span>
            <span class="badge badge--purple">F.I.R.E. Engine</span>
          </div>
          <div class="card__value" style="font-size: 24px;">Simulatore F.I.R.E. & Crossover Point</div>
          <div class="card__body">
            <p style="font-size: var(--text-base); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
              Calcola la tua libertà finanziaria basata sulla regola del 4% (Trinity Study). Il Crossover Point è il momento in cui i rendimenti passivi del tuo capitale coprono interamente le tue spese di vita senza intaccare il patrimonio reale.
            </p>
          </div>
          <div class="card__footer">
            <span class="trend-context">Regola del 4% Safe Withdrawal Rate (SWR)</span>
          </div>
        </section>

        <!-- KPI Strip Spec Apple (Uniform 4-Zone Canonical Structure) -->
        <section class="grid-4">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Numero F.I.R.E. Obiettivo">Numero F.I.R.E.</span>
              <div class="kpi-icon-badge balance">${getIcon('target', 16)}</div>
            </div>
            <div class="card__value privacy-mask" id="fire-val-number">${this.formatCurrency(fire.fireNumber)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Spese stimate</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(fire.annualSpending)}/anno</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">25x spesa annuale</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Rendita Mensile Passiva Stimata">Rendita Passiva</span>
              <div class="kpi-icon-badge income">${getIcon('income', 16)}</div>
            </div>
            <div class="card__value privacy-mask" id="fire-val-passive" style="color: var(--apple-blue);">${this.formatCurrency(monthlyPassive)} / mese</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Da patrimonio</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(fire.netWorth)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Generata da Net Worth</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Anni al Crossover Point">Crossover Point</span>
              <div class="kpi-icon-badge expense">⏳</div>
            </div>
            <div class="card__value ${fire.yearsToFire !== '> 35' ? 'fire-highlight' : ''}" id="fire-val-years" style="color: var(--apple-orange);">
              ${fire.yearsToFire === '> 35' ? '> 35 anni' : fire.yearsToFire + ' anni'}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Traguardo</span>
                <span class="kv__value">Rendita ≥ Spese</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Rendita passiva netta</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Avanzamento Globale F.I.R.E.">Avanzamento</span>
              <span class="badge badge--purple">${fire.fireProgressPct}%</span>
            </div>
            <div class="card__value" id="fire-val-progress" style="color: var(--apple-purple);">${fire.fireProgressPct}%</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Progresso</span>
                  <span class="meter__val">${fire.fireProgressPct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, fire.fireProgressPct)}%; background: var(--apple-purple);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Verso l'indipendenza totale</span>
            </div>
          </div>
        </section>

        <!-- Barra di Avanzamento F.I.R.E. Apple Glass (Canonical Card) -->
        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Stato di Avanzamento Patrimonio vs FIRE Number">Avanzamento Patrimonio vs F.I.R.E.</span>
            <span class="badge badge--info" id="fire-track-pct">${fire.fireProgressPct}% Completato</span>
          </div>
          <div class="card__body">
            <div class="meter-row">
              <div class="meter" style="height: 10px;">
                <div class="meter__fill" id="fire-track-fill" style="width: ${Math.min(100, fire.fireProgressPct)}%; background: linear-gradient(90deg, var(--apple-blue), var(--apple-purple));"></div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2); font-size: var(--text-sm);">
              <span>Patrimonio Reale: <strong class="privacy-mask">${this.formatCurrency(fire.netWorth)}</strong></span>
              <span>Target 100%: <strong class="privacy-mask" id="fire-legend-target">${this.formatCurrency(fire.fireNumber)}</strong></span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Aggiornato in tempo reale con i parametri selezionati</span>
          </div>
        </div>

        <!-- 3 Varianti F.I.R.E. (Canonical Cards in Grid Auto) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Lean F.I.R.E. - Stile Minimalista">LEAN F.I.R.E.</span>
              <span class="badge badge--positive">Minimal</span>
            </div>
            <div class="card__value privacy-mask" id="fire-variant-lean">${this.formatCurrency(fire.leanFire)}</div>
            <div class="card__body">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
                Spese ridotte del 30% (${this.formatCurrency(this.fireParams.monthlyExpense * 0.70)}/mese). Stile di vita minimalista ed essenziale.
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context">-30% spese ordinarie</span>
            </div>
          </div>

          <div class="card highlight-card">
            <div class="card__header">
              <span class="card__title" title="Standard F.I.R.E. - Stile Corrente">STANDARD F.I.R.E.</span>
              <span class="badge badge--info">Target Attuale</span>
            </div>
            <div class="card__value privacy-mask" id="fire-variant-standard" style="color: var(--apple-blue);">${this.formatCurrency(fire.fireNumber)}</div>
            <div class="card__body">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
                Spese stabili al 100% (${this.formatCurrency(this.fireParams.monthlyExpense)}/mese). Mantiene inalterato il tenore di vita attuale.
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context">100% tenore attuale</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Fat F.I.R.E. - Stile Agiato">FAT F.I.R.E.</span>
              <span class="badge badge--purple">Agiato</span>
            </div>
            <div class="card__value privacy-mask" id="fire-variant-fat" style="color: var(--apple-purple);">${this.formatCurrency(fire.fatFire)}</div>
            <div class="card__body">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
                Spese maggiorate (+35% a ${this.formatCurrency(this.fireParams.monthlyExpense * 1.35)}/mese). Ampio margine per viaggi, hobby e comfort.
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context">+35% margine extra</span>
            </div>
          </div>
        </section>

        <!-- Pannello Interattivo: Sliders & Crossover Chart -->
        <div class="fire-interactive-grid">
          <!-- Colonna Controlli Parametri -->
          <div class="fire-controls-card">
            <h4 class="fire-controls-title">Parametri di Simulazione</h4>
            
            <div class="fire-slider-group">
              <div class="slider-header">
                <label for="fire-slider-expense">Spesa Mensile Desiderata</label>
                <span class="slider-val" id="val-fire-expense">${this.formatCurrency(this.fireParams.monthlyExpense)}</span>
              </div>
              <input type="range" id="fire-slider-expense" min="800" max="3500" step="50" value="${this.fireParams.monthlyExpense}" />
            </div>

            <div class="fire-slider-group">
              <div class="slider-header">
                <label for="fire-slider-swr">Safe Withdrawal Rate (SWR)</label>
                <span class="slider-val" id="val-fire-swr">${this.fireParams.swr.toFixed(2)}%</span>
              </div>
              <input type="range" id="fire-slider-swr" min="3.0" max="5.0" step="0.25" value="${this.fireParams.swr}" />
              <span class="slider-hint">Standard Trinity Study: 4.0%</span>
            </div>

            <div class="fire-slider-group">
              <div class="slider-header">
                <label for="fire-slider-return">Rendimento Lordo Atteso</label>
                <span class="slider-val" id="val-fire-return">${this.fireParams.annualReturn.toFixed(1)}%</span>
              </div>
              <input type="range" id="fire-slider-return" min="4.0" max="10.0" step="0.5" value="${this.fireParams.annualReturn}" />
              <span class="slider-hint">Media storica azionario globale: 7-8%</span>
            </div>

            <div class="fire-slider-group" style="margin-bottom: 0;">
              <div class="slider-header">
                <label for="fire-slider-inflation">Inflazione Media Stimata</label>
                <span class="slider-val" id="val-fire-inflation">${this.fireParams.inflation.toFixed(1)}%</span>
              </div>
              <input type="range" id="fire-slider-inflation" min="1.0" max="4.0" step="0.5" value="${this.fireParams.inflation}" />
              <span class="slider-hint">Target BCE a lungo termine: 2.0%</span>
            </div>
          </div>

          <!-- Colonna Grafico Crossover Point -->
          <div class="fire-chart-card">
            <div class="fire-chart-header">
              <div>
                <h4 class="fire-chart-title">Curva Crossover Point (Rendita vs Spese)</h4>
                <p class="fire-chart-sub">Proiezione a 35 anni con rendimento reale netto e PAC attivo</p>
              </div>
              <div class="fire-chart-legend-pills">
                <span class="pill-crossover-rendita">Rendita Passiva</span>
                <span class="pill-crossover-spesa">Spesa Annua</span>
              </div>
            </div>
            <div class="fire-canvas-container" style="position: relative; height: 300px;">
              <canvas id="fireCrossoverChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Consiglio Apple HIG -->
        <div class="fire-note-box">
          <div class="fire-note-inner">
            <span class="fire-note-icon" style="color: var(--apple-blue); display: inline-flex;">${getIcon('sparkle', 16)}</span>
            <p class="fire-note-text">
              <strong>Principio del Crossover Point:</strong> quando la rendita passiva (curva verde) supera la spesa annua di mantenimento (curva rossa tratteggiata), raggiungi l'indipendenza finanziaria piena. Continuando ad alimentare il PAC su VWCE e preservando il fondo di emergenza XEON, acceleri la data del crossover.
            </p>
          </div>
        </div>

      </div>
    `;
  }

  bindFireEvents(container) {
    const sExpense = container.querySelector('#fire-slider-expense');
    const sSwr = container.querySelector('#fire-slider-swr');
    const sReturn = container.querySelector('#fire-slider-return');
    const sInflation = container.querySelector('#fire-slider-inflation');

    const updateFromSliders = () => {
      if (sExpense) this.fireParams.monthlyExpense = parseFloat(sExpense.value);
      if (sSwr) this.fireParams.swr = parseFloat(sSwr.value);
      if (sReturn) this.fireParams.annualReturn = parseFloat(sReturn.value);
      if (sInflation) this.fireParams.inflation = parseFloat(sInflation.value);

      const valExp = container.querySelector('#val-fire-expense');
      const valSwr = container.querySelector('#val-fire-swr');
      const valRet = container.querySelector('#val-fire-return');
      const valInf = container.querySelector('#val-fire-inflation');

      if (valExp) valExp.textContent = this.formatCurrency(this.fireParams.monthlyExpense);
      if (valSwr) valSwr.textContent = this.fireParams.swr.toFixed(2) + '%';
      if (valRet) valRet.textContent = this.fireParams.annualReturn.toFixed(1) + '%';
      if (valInf) valInf.textContent = this.fireParams.inflation.toFixed(1) + '%';

      this.updateFireSimulation(container);
    };

    if (sExpense) sExpense.addEventListener('input', updateFromSliders);
    if (sSwr) sSwr.addEventListener('input', updateFromSliders);
    if (sReturn) sReturn.addEventListener('input', updateFromSliders);
    if (sInflation) sInflation.addEventListener('input', updateFromSliders);
  }

  initFireChart() {
    const canvas = document.getElementById('fireCrossoverChart');
    if (!canvas || typeof window.Chart === 'undefined') return;

    if (this.fireChart) {
      try { this.fireChart.destroy(); } catch (e) {}
      this.fireChart = null;
    }

    const fire = financeStore.calculateFireMetrics(this.fireParams);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const ctx = canvas.getContext('2d');

    const labels = fire.series.map(s => s.label);
    const passiveData = fire.series.map(s => s.passiveIncome);
    const spendingData = fire.series.map(s => s.annualSpending);

    this.fireChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Spesa Annua di Mantenimento',
            data: spendingData,
            borderColor: '#FF3B30',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0
          },
          {
            label: 'Rendita Passiva Annua Netta',
            data: passiveData,
            borderColor: '#34C759',
            backgroundColor: 'rgba(52, 199, 89, 0.12)',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.35
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
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
              callback: (v) => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  updateFireSimulation(container) {
    const fire = financeStore.calculateFireMetrics(this.fireParams);
    const monthlyPassive = fire.currentPassiveIncome / 12;

    const valNum = container.querySelector('#fire-val-number');
    const valPas = container.querySelector('#fire-val-passive');
    const valYrs = container.querySelector('#fire-val-years');
    const valPrg = container.querySelector('#fire-val-progress');
    const trkPct = container.querySelector('#fire-track-pct');
    const trkFil = container.querySelector('#fire-track-fill');
    const legTar = container.querySelector('#fire-legend-target');
    const varLean = container.querySelector('#fire-variant-lean');
    const varStd = container.querySelector('#fire-variant-standard');
    const varFat = container.querySelector('#fire-variant-fat');

    if (valNum) valNum.textContent = this.formatCurrency(fire.fireNumber);
    if (valPas) valPas.textContent = this.formatCurrency(monthlyPassive) + ' / mese';
    if (valYrs) {
      valYrs.textContent = fire.yearsToFire === '> 35' ? '> 35 anni' : fire.yearsToFire + ' anni';
      valYrs.className = `fire-kpi-value ${fire.yearsToFire !== '> 35' ? 'fire-highlight' : ''}`;
    }
    if (valPrg) valPrg.textContent = fire.fireProgressPct + '%';
    if (trkPct) trkPct.textContent = fire.fireProgressPct + '% Completato';
    if (trkFil) trkFil.style.width = Math.min(100, fire.fireProgressPct) + '%';
    if (legTar) legTar.textContent = this.formatCurrency(fire.fireNumber);
    if (varLean) varLean.textContent = this.formatCurrency(fire.leanFire);
    if (varStd) varStd.textContent = this.formatCurrency(fire.fireNumber);
    if (varFat) varFat.textContent = this.formatCurrency(fire.fatFire);

    if (this.fireChart) {
      this.fireChart.data.labels = fire.series.map(s => s.label);
      this.fireChart.data.datasets[0].data = fire.series.map(s => s.annualSpending);
      this.fireChart.data.datasets[1].data = fire.series.map(s => s.passiveIncome);
      this.fireChart.update('none');
    }
  }
}
