/**
 * Apple Design System - Impostazioni & Configurazione Completa
 * Allineato al Design System centrale (Apple HIG & Native iOS Workout Capsule):
 * - Sotto-navigazione segmentata a capsula (Conti, Stipendio, Categorie, Sicurezza, Cloud)
 * - Gestione Conti & Saldi Iniziali (Modale Apple, modifica inline con conguaglio, chiusura mese)
 * - Parametri Stipendio & Busta Paga (13ª, 14ª, Premi MBO e calendario proiezione 12 mesi)
 * - Categorie di Spesa/Entrata, Smart Merge e Smart Rules
 * - Sicurezza PIN a 4 cifre & Sblocco Biometrico Face ID / Touch ID
 * - Google Sheets Cloud Sync, Snapshot JSON/CSV e Scorciatoie Rapide iOS
 */

import { financeStore } from '../data/mockData.js';
import { googleSheetsService } from '../services/googleSheetsService.js';
import { BiometricService } from '../services/biometricService.js';
import { AssetCatalogService } from '../data/assetCatalog.js';
import { getIcon, getCategoryIcon, cleanCategoryName } from './icons.js';
import { monthlyClosingModal } from './monthlyClosingModal.js';

const VALID_SUBTABS = ['conti', 'stipendio', 'categorie', 'sicurezza', 'sheets'];

export class ImpostazioniView {
  constructor() {
    this.activeSubtab = 'conti'; // 'conti' | 'stipendio' | 'categorie' | 'sicurezza' | 'sheets'
    this.isAccountModalOpen = false;
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
    if (!VALID_SUBTABS.includes(this.activeSubtab)) {
      this.activeSubtab = 'conti';
    }

    const config = googleSheetsService.getConfig();
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const isPinActive = financeStore.isPinEnabled();
    const isBiometricActive = typeof BiometricService !== 'undefined'
      ? BiometricService.isEnabled()
      : (localStorage.getItem('finanze_biometric_enabled') === 'true');
    const salaryCfg = financeStore.getSalaryConfig();
    const isSandbox = googleSheetsService.isSandboxMode();

    const tabMeta = {
      conti: {
        badge: 'Patrimonio & Conti',
        badgeClass: 'badge--info',
        title: 'Conti & Saldi Iniziali',
        subtitle: 'Gestisci conti correnti, carte, broker, saldi attuali e chiusure di fine mese',
        actionHtml: `
          <button class="apple-btn-secondary js-add-account-modal">
            ${getIcon('plus', 14)} <span>Nuovo Conto</span>
          </button>
          <button class="apple-btn-primary js-open-closing-studio">
            ${getIcon('conguaglio', 14)} <span>Chiusura Mese</span>
          </button>
        `
      },
      stipendio: {
        badge: 'Cash Flow Predittivo',
        badgeClass: 'badge--positive',
        title: 'Stipendio & Busta Paga',
        subtitle: 'Configura retribuzione netta, giorno accredito, 13ª, 14ª e premi per la stima mensile',
        actionHtml: `
          <button class="apple-btn-primary js-save-salary-config">
            ${getIcon('check', 14)} <span>Salva Parametri</span>
          </button>
        `
      },
      categorie: {
        badge: 'Tassonomia & Regole',
        badgeClass: 'badge--purple',
        title: 'Categorie & Auto-Regole',
        subtitle: 'Personalizza le categorie di entrata e uscita, unisci duplicati e consulta le Smart Rules',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-focus-new-cat">
            ${getIcon('plus', 14)} <span>Nuova Categoria</span>
          </button>
        `
      },
      sicurezza: {
        badge: isPinActive ? 'Accesso Protetto' : 'Accesso Libero',
        badgeClass: isPinActive ? 'badge--positive' : 'badge--neutral',
        title: 'Sicurezza & Biometria',
        subtitle: 'Proteggi la tua web app su iPhone e Mac con codice PIN a 4 cifre, Face ID o Touch ID',
        actionHtml: ''
      },
      sheets: {
        badge: isSandbox ? 'Sandbox Protetta' : (config.isConfigured ? 'Cloud Live' : 'Local-First'),
        badgeClass: isSandbox ? 'badge--warning' : (config.isConfigured ? 'badge--positive' : 'badge--neutral'),
        title: 'Cloud Sync & Backup',
        subtitle: 'Sincronizzazione Google Sheets in tempo reale, snapshot locali JSON/CSV e comandi iOS',
        actionHtml: `
          ${config.isConfigured ? `
            <button class="apple-btn-secondary js-share-cloud-settings">
              ${getIcon('smartphone', 14)} <span>Passa a iPhone</span>
            </button>
          ` : ''}
          <button class="apple-btn-primary js-force-sync-now">
            ${getIcon('sync', 14)} <span>Sincronizza Ora</span>
          </button>
        `
      }
    };

    const currentMeta = tabMeta[this.activeSubtab] || tabMeta.conti;

    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = 'Impostazioni';
    if (subtitleEl) subtitleEl.textContent = currentMeta.subtitle;

    container.innerHTML = `
      <div class="page impostazioni-page">

        <!-- Header di Sezione in Stile Apple (Desktop) + Subtabs Workout Capsule (Mobile & Desktop) -->
        <header class="impostazioni-header-section">

          <div class="spese-header-toolbar impostazioni-header-toolbar desk-only">
            <div class="spese-header-info impostazioni-header-info">
              <div class="impostazioni-meta-row">
                <span class="badge ${currentMeta.badgeClass}">${currentMeta.badge}</span>
                <span class="impostazioni-chip">
                  Conti: <strong>${accounts.length}</strong>
                </span>
                <span class="impostazioni-chip">
                  Categorie: <strong>${categories.length}</strong>
                </span>
                <span class="impostazioni-chip">
                  Sicurezza: <strong>${isPinActive ? (isBiometricActive ? 'PIN + Face ID' : 'PIN Attivo') : 'Libero'}</strong>
                </span>
                <span class="impostazioni-chip">
                  Cloud: <strong>${isSandbox ? 'Sandbox' : (config.isConfigured ? 'Collegato' : 'Locale')}</strong>
                </span>
              </div>
              <h2 class="page-title">${currentMeta.title}</h2>
              <p class="page-subtitle">${currentMeta.subtitle}</p>
            </div>

            <div class="spese-header-actions impostazioni-header-actions">
              ${currentMeta.actionHtml}
            </div>
          </div>

          <!-- Sotto-menu Segmentato Apple / Workout Capsule -->
          <div class="impostazioni-subtabs-bar">
            <nav class="impostazioni-segmented-tabs" id="impostazioni-subtabs" aria-label="Sezioni Impostazioni">
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'conti' ? 'active' : ''}" data-subtab="conti">
                <span class="tab-icon">${getIcon('card', 14)}</span>
                <span class="tab-label">Conti</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'stipendio' ? 'active' : ''}" data-subtab="stipendio">
                <span class="tab-icon">${getIcon('stipendio', 14)}</span>
                <span class="tab-label">Stipendio</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'categorie' ? 'active' : ''}" data-subtab="categorie">
                <span class="tab-icon">${getIcon('tag', 14)}</span>
                <span class="tab-label">Categorie</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'sicurezza' ? 'active' : ''}" data-subtab="sicurezza">
                <span class="tab-icon">${getIcon('lock', 14)}</span>
                <span class="tab-label">Sicurezza</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'sheets' ? 'active' : ''}" data-subtab="sheets">
                <span class="tab-icon">${getIcon('cloud', 14)}</span>
                <span class="tab-label">Cloud</span>
              </button>
            </nav>
          </div>

        </header>

        <div class="impostazioni-subview-stack">
          ${this.activeSubtab === 'conti' ? this.renderContiView(accounts) : ''}
          ${this.activeSubtab === 'stipendio' ? this.renderStipendioView(salaryCfg) : ''}
          ${this.activeSubtab === 'categorie' ? this.renderCategorieView(categories) : ''}
          ${this.activeSubtab === 'sicurezza' ? this.renderSicurezzaView(isPinActive, isBiometricActive) : ''}
          ${this.activeSubtab === 'sheets' ? this.renderSheetsView(config) : ''}
        </div>

      </div>
    `;

    this.renderAccountModal();
    this.bindEvents(container);
  }

  renderContiView(accounts) {
    const totalBalance = accounts.reduce((acc, item) => acc + (parseFloat(item.balance) || 0), 0);

    return `
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge badge-tint-blue">
              ${getIcon('card', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Conti &amp; Asset Patrimoniali</h3>
              <p class="settings-card-sub">Modifica il saldo per generare un conguaglio o avvia la chiusura di fine mese</p>
            </div>
          </div>
          <div class="settings-header-pills">
            <span class="badge badge--neutral">${accounts.length} Conti</span>
            <span class="badge badge--info privacy-mask">${this.formatCurrency(totalBalance)}</span>
          </div>
        </div>

        <!-- Barra Azioni Rapide Mobile & Desktop Compatta -->
        <div class="settings-quick-toolbar mobile-only-flex">
          <button class="apple-btn-secondary" id="btn-add-account-modal">
            ${getIcon('plus', 14)}
            <span>Nuovo Conto</span>
          </button>
          <button class="apple-btn-primary" id="btn-open-closing-studio">
            ${getIcon('conguaglio', 14)}
            <span>Chiusura Mese</span>
          </button>
        </div>

        <div class="settings-accounts-list">
          ${accounts.map(acc => {
            const isBroker = Boolean(acc.isBroker) || (acc.type || '').toLowerCase().includes('broker') || (acc.type || '').toLowerCase().includes('invest');
            const isPension = (acc.type || '').toLowerCase().includes('previdenza') || (acc.type || '').toLowerCase().includes('pensione');
            const isVoucher = Boolean(acc.isVoucher) || (acc.type || '').toLowerCase().includes('buoni');

            const tintClass = (isBroker || isPension) ? 'badge-tint-purple' : (isVoucher ? 'badge-tint-orange' : 'badge-tint-blue');
            const iconName = isPension ? 'pensione' : (isBroker ? 'investimenti' : (isVoucher ? 'tag' : 'card'));

            const subMeta = (acc.isBroker && Array.isArray(acc.holdings) && acc.holdings.length > 0)
              ? `<span class="settings-acc-holdings privacy-mask">Liquidità: ${this.formatCurrency(acc.cashBalance || 0)} • Investiti: ${this.formatCurrency(acc.balance - (acc.cashBalance || 0))} (${acc.holdings.length} strumenti)</span>`
              : '';

            return `
              <div class="settings-account-row" data-id="${acc.id}">
                <div class="settings-acc-left">
                  <div class="settings-acc-icon ${tintClass}">
                    ${getIcon(iconName, 17)}
                  </div>
                  <div class="settings-acc-info">
                    <div class="settings-acc-title-line">
                      <span class="settings-acc-name">${acc.name}</span>
                      <span class="settings-acc-pill">${acc.provider || acc.name}</span>
                    </div>
                    <span class="settings-acc-type">${acc.type}</span>
                    ${subMeta}
                  </div>
                </div>

                <div class="settings-acc-actions">
                  <div class="settings-acc-input-wrap">
                    <span class="settings-currency-prefix">€</span>
                    <input type="number" step="0.01" class="apple-input acc-balance-input" value="${acc.balance}" data-id="${acc.id}" aria-label="Saldo ${acc.name}" />
                  </div>
                  <button class="apple-btn-save-inline" data-id="${acc.id}">Aggiorna</button>
                  <button class="apple-btn-delete-inline" data-id="${acc.id}" title="Rimuovi conto" aria-label="Rimuovi ${acc.name}">
                    ${getIcon('trash', 14)}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  renderStipendioView(salaryCfg) {
    const monthsFull = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const monthsShort = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const annualTotal = monthsShort.reduce((sum, _, idx) => sum + (financeStore.getEstimatedSalaryForMonth(idx + 1) || 0), 0);

    return `
      <div class="settings-two-col-grid">

        <!-- Card 1: Retribuzione Base Mensile -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-green">
                ${getIcon('wallet', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Retribuzione Base Mensile</h3>
                <p class="settings-card-sub">Accredito ordinario e data di valuta mensile</p>
              </div>
            </div>
            <span class="badge badge--positive">Ordinario</span>
          </div>

          <div class="settings-form-stack">
            <div class="form-group">
              <label class="form-label" for="salary-base">Stipendio Netto Base (€)</label>
              <input type="number" step="10" id="salary-base" class="apple-input apple-input-mono" value="${salaryCfg.baseSalary}" />
              <span class="settings-field-hint">Accredito netto mensile ordinario sul conto principale</span>

              <div class="settings-callout-note tint-purple">
                ${getIcon('pensione', 15)}
                <div>
                  <strong>Fondo Pensione Complementare:</strong> già trattenuto a monte in busta paga (Art. 51 TUIR), non riduce la liquidità disponibile sul conto corrente.
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="salary-payday">Giorno del Mese di Accredito</label>
              <div class="apple-select-wrapper">
                <select id="salary-payday" class="apple-select apple-input">
                  ${Array.from({ length: 28 }, (_, i) => i + 1).map(day => `
                    <option value="${day}" ${parseInt(salaryCfg.payDay, 10) === day ? 'selected' : ''}>Giorno ${day} del mese ${day === 25 ? '(Predefinito)' : ''}</option>
                  `).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <span class="settings-field-hint">Prima di questa data la Dashboard usa la stima predittiva</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="salary-allowances">Indennità &amp; Benefit Mensili Extra (€)</label>
              <input type="number" step="10" id="salary-allowances" class="apple-input apple-input-mono" value="${salaryCfg.extraMonthlyAllowances || 0}" />
              <span class="settings-field-hint">Reperibilità, trasferte forfettarie, welfare o rimborsi fissi</span>
            </div>
          </div>
        </section>

        <!-- Card 2: Mensilità Aggiuntive & Premi -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-blue">
                ${getIcon('sparkle', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Mensilità Extra &amp; Premi</h3>
                <p class="settings-card-sub">13ª, 14ª mensilità e bonus variabile annuale</p>
              </div>
            </div>
            <span class="badge badge--info">Extra</span>
          </div>

          <div class="settings-form-stack">

            <!-- 13esima -->
            <div class="settings-bonus-module">
              <div class="settings-bonus-top">
                <div class="settings-bonus-title-group">
                  <strong>Tredicesima (13ª)</strong>
                  <div class="apple-select-wrapper settings-mini-select">
                    <select id="salary-13th-month" class="apple-select" aria-label="Mese 13esima">
                      <option value="11" ${parseInt(salaryCfg.thirteenthMonth, 10) === 11 ? 'selected' : ''}>Novembre</option>
                      <option value="12" ${parseInt(salaryCfg.thirteenthMonth, 10) === 12 ? 'selected' : ''}>Dicembre</option>
                    </select>
                    <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva/Disattiva Tredicesima">
                  <input type="checkbox" id="salary-has-13th" ${salaryCfg.has13th ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
              <div class="form-group">
                <label class="form-label" for="salary-13th-amount">Importo Netto 13ª (€)</label>
                <input type="number" step="10" id="salary-13th-amount" class="apple-input apple-input-mono" value="${salaryCfg.thirteenthAmount}" />
              </div>
            </div>

            <!-- 14esima -->
            <div class="settings-bonus-module">
              <div class="settings-bonus-top">
                <div class="settings-bonus-title-group">
                  <strong>Quattordicesima (14ª)</strong>
                  <div class="apple-select-wrapper settings-mini-select">
                    <select id="salary-14th-month" class="apple-select" aria-label="Mese 14esima">
                      <option value="6" ${parseInt(salaryCfg.fourteenthMonth, 10) === 6 ? 'selected' : ''}>Giugno</option>
                      <option value="7" ${parseInt(salaryCfg.fourteenthMonth, 10) === 7 ? 'selected' : ''}>Luglio</option>
                    </select>
                    <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva/Disattiva Quattordicesima">
                  <input type="checkbox" id="salary-has-14th" ${salaryCfg.has14th ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
              <div class="form-group">
                <label class="form-label" for="salary-14th-amount">Importo Netto 14ª (€)</label>
                <input type="number" step="10" id="salary-14th-amount" class="apple-input apple-input-mono" value="${salaryCfg.fourteenthAmount}" />
              </div>
            </div>

            <!-- Premio Produzione / MBO -->
            <div class="settings-bonus-module">
              <div class="settings-bonus-top">
                <div class="settings-bonus-title-group">
                  <strong>Premio Produzione / MBO</strong>
                  <div class="apple-select-wrapper settings-mini-select">
                    <select id="salary-bonus-month" class="apple-select" aria-label="Mese Premio">
                      ${monthsFull.map((mName, idx) => `
                        <option value="${idx + 1}" ${parseInt(salaryCfg.productionBonusMonth, 10) === (idx + 1) ? 'selected' : ''}>${mName}</option>
                      `).join('')}
                    </select>
                    <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva/Disattiva Premio Produzione">
                  <input type="checkbox" id="salary-has-bonus" ${salaryCfg.hasProductionBonus ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
              <div class="form-group">
                <label class="form-label" for="salary-bonus-amount">Importo Netto Premio (€)</label>
                <input type="number" step="50" id="salary-bonus-amount" class="apple-input apple-input-mono" value="${salaryCfg.productionBonusAmount || 1200}" />
              </div>
            </div>

          </div>
        </section>

      </div>

      <!-- Card 3: Proiezione Calendario Annuale (12 Mesi) -->
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge badge-tint-purple">
              ${getIcon('calendar', 17)}
            </div>
            <div>
              <h3 class="settings-card-title">Proiezione Entrate Annuali Stimate</h3>
              <p class="settings-card-sub">Calendario dei flussi netti attesi mese per mese</p>
            </div>
          </div>
          <span class="badge badge--purple privacy-mask">Totale Annuo: ${this.formatCurrency(annualTotal)}</span>
        </div>

        <div class="settings-calendar-grid">
          ${monthsShort.map((mShort, idx) => {
            const mNum = idx + 1;
            const estimated = financeStore.getEstimatedSalaryForMonth(mNum);
            const is13 = salaryCfg.has13th && mNum === parseInt(salaryCfg.thirteenthMonth, 10);
            const is14 = salaryCfg.has14th && mNum === parseInt(salaryCfg.fourteenthMonth, 10);
            const isBonus = salaryCfg.hasProductionBonus && mNum === parseInt(salaryCfg.productionBonusMonth, 10);
            const isSpecial = is13 || is14 || isBonus;

            return `
              <div class="settings-month-tile ${isSpecial ? 'is-special' : ''}">
                <span class="settings-month-label">${mShort}</span>
                <strong class="settings-month-val privacy-mask">
                  €${estimated >= 1000 ? (estimated / 1000).toFixed(1) + 'k' : estimated}
                </strong>
                <div class="settings-month-tags">
                  ${is13 ? '<span class="month-mini-tag tag-green">13ª</span>' : ''}
                  ${is14 ? '<span class="month-mini-tag tag-blue">14ª</span>' : ''}
                  ${isBonus ? '<span class="month-mini-tag tag-orange">Premio</span>' : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="settings-actions-footer">
          <div id="salary-save-feedback" class="settings-inline-feedback" style="display: none;">
            ${getIcon('check', 15)}
            <span>Parametri stipendio salvati con successo</span>
          </div>
          <button class="apple-btn-primary" id="btn-save-salary-config">
            ${getIcon('check', 15)}
            <span>Salva Parametri Stipendio</span>
          </button>
        </div>
      </section>
    `;
  }

  renderCategorieView(categories) {
    const allRules = financeStore.getSmartRules();
    const previewRules = allRules.slice(0, 18);
    const remainingRules = Math.max(0, allRules.length - previewRules.length);

    return `
      <!-- Card 1: Gestione Categorie -->
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge badge-tint-blue">
              ${getIcon('tag', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Categorie di Spesa, Entrata &amp; Risparmio</h3>
              <p class="settings-card-sub">Crea nuove categorie personalizzate o rimuovi quelle inutilizzate</p>
            </div>
          </div>
          <span class="badge badge--neutral">${categories.length} Categorie</span>
        </div>

        <div class="settings-add-cat-bar">
          <input type="text" id="new-cat-name" class="apple-input" placeholder="Nuova categoria (es. Viaggi, Sport, Formazione...)" />
          <div class="apple-select-wrapper settings-cat-type-select">
            <select id="new-cat-type" class="apple-select apple-input" aria-label="Tipo categoria">
              <option value="expense">Uscita</option>
              <option value="income">Entrata</option>
              <option value="transfer">Giroconto / Risparmio</option>
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <button class="apple-btn-primary" id="btn-create-cat">
            ${getIcon('plus', 14)}
            <span>Aggiungi</span>
          </button>
        </div>

        <div class="settings-categories-cloud">
          ${categories.map(c => {
            const typeLabel = c.type === 'income' ? 'Entrata' : (c.type === 'transfer' ? 'Risparmio' : 'Spesa');
            const cleanName = cleanCategoryName(c.name);
            const dotColor = c.color || '#0A84FF';
            return `
              <div class="settings-cat-pill">
                <span class="settings-cat-icon" style="color: ${dotColor};">
                  ${getCategoryIcon(c.name, 14)}
                </span>
                <span class="settings-cat-name">${cleanName}</span>
                <span class="settings-cat-type">${typeLabel}</span>
                <button class="btn-remove-cat" data-id="${c.id}" title="Elimina ${cleanName}" aria-label="Elimina ${cleanName}">&times;</button>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <div class="settings-two-col-grid">

        <!-- Card 2: Smart Merge -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-orange">
                ${getIcon('merge', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Accorpamento Categorie (Smart Merge)</h3>
                <p class="settings-card-sub">Unisci due voci simili convertendo automaticamente lo storico</p>
              </div>
            </div>
          </div>

          <div class="settings-merge-stack">
            <div class="form-group">
              <label class="form-label" for="merge-source-cat">Categoria da unire (Sorgente)</label>
              <div class="apple-select-wrapper">
                <select id="merge-source-cat" class="apple-select apple-input">
                  <option value="" disabled selected>Seleziona categoria da unire...</option>
                  ${categories.map(c => `<option value="${c.name}">${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="merge-target-cat">Categoria di destinazione</label>
              <div class="apple-select-wrapper">
                <select id="merge-target-cat" class="apple-select apple-input">
                  <option value="" disabled selected>Seleziona destinazione...</option>
                  ${categories.map(c => `<option value="${c.name}">${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="settings-actions-footer">
              <button class="apple-btn-secondary" id="btn-merge-categories">
                ${getIcon('merge', 14)}
                <span>Accorpa Categorie</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Card 3: Smart Rules -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-purple">
                ${getIcon('sparkle', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Auto-Categorizzazione (Smart Rules)</h3>
                <p class="settings-card-sub">Parole chiave che compilano in automatico la categoria</p>
              </div>
            </div>
            <span class="badge badge--purple">${allRules.length} Regole</span>
          </div>

          <div class="settings-rules-cloud">
            ${previewRules.map(r => `
              <span class="settings-rule-pill">
                <strong>${r.keyword}</strong>
                <span class="rule-arrow">→</span>
                <span>${cleanCategoryName(r.category)}</span>
              </span>
            `).join('')}
            ${remainingRules > 0 ? `
              <span class="settings-rules-more">+ altre ${remainingRules} regole attive</span>
            ` : ''}
          </div>
        </section>

      </div>
    `;
  }

  renderSicurezzaView(isPinActive, isBiometricActive) {
    return `
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge ${isPinActive ? 'badge-tint-green' : 'badge-tint-blue'}">
              ${getIcon('lock', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Protezione Accesso &amp; Biometria</h3>
              <p class="settings-card-sub">Blocca l'apertura della web app su iPhone e Mac tramite codice PIN o Face ID</p>
            </div>
          </div>
          <span class="badge ${isPinActive ? 'badge--positive' : 'badge--neutral'}">
            ${isPinActive ? 'PIN Attivo' : 'Disattivato'}
          </span>
        </div>

        <div class="settings-status-callout ${isPinActive ? 'callout-green' : 'callout-neutral'}">
          <div class="callout-icon">
            ${getIcon(isPinActive ? 'shield' : 'lock', 22)}
          </div>
          <div class="callout-body">
            <strong>${isPinActive ? 'Protezione PIN Attiva sul Dispositivo' : 'Nessun Codice PIN Configurato'}</strong>
            <p>${isPinActive
              ? 'Ad ogni avvio della web app viene richiesto il codice numerico a 4 cifre o il riconoscimento biometrico Apple.'
              : 'La web app si apre istantaneamente senza schermata di blocco. Imposta un PIN a 4 cifre per abilitare anche Face ID / Touch ID.'}</p>
          </div>
        </div>

        <div class="settings-pin-controls">
          <div class="form-group">
            <label class="form-label" for="input-security-pin">Codice PIN Numerico (4 cifre)</label>
            <div class="settings-pin-input-row">
              <input type="password" maxlength="4" pattern="[0-9]*" inputmode="numeric" id="input-security-pin" class="apple-input settings-pin-field" placeholder="••••" value="${financeStore.getPin()}" />
              <button class="apple-btn-primary" id="btn-save-pin">
                ${getIcon('check', 14)}
                <span>${isPinActive ? 'Aggiorna PIN' : 'Attiva PIN'}</span>
              </button>
              ${isPinActive ? `
                <button class="apple-btn-secondary" id="btn-remove-pin">
                  <span>Rimuovi PIN</span>
                </button>
              ` : ''}
            </div>
          </div>

          <div class="settings-toggle-row">
            <div class="settings-toggle-left">
              <div class="settings-icon-badge badge-tint-blue">
                ${getIcon('faceid', 18)}
              </div>
              <div class="toggle-label-group">
                <strong>Sblocco con Face ID / Touch ID</strong>
                <span>Autenticazione biometrica nativa WebAuthn su iPhone, iPad e Mac (${isPinActive ? 'Pronto' : 'Richiede PIN a 4 cifre attivo'}).</span>
              </div>
            </div>
            <label class="apple-switch" title="Attiva/Disattiva Sblocco Biometrico">
              <input type="checkbox" id="biometric-toggle" ${isBiometricActive ? 'checked' : ''} ${!isPinActive ? 'disabled' : ''} />
              <span class="switch-slider"></span>
            </label>
          </div>
        </div>
      </section>
    `;
  }

  renderSheetsView(config) {
    const isSandbox = googleSheetsService.isSandboxMode();
    const isConnected = Boolean(config.isConfigured);

    let calloutClass = 'callout-blue';
    let calloutIcon = 'cloud';
    let calloutTitle = 'Modalità Local-First Attiva';
    let calloutBadge = 'Archivio Locale';
    let calloutDesc = 'I tuoi dati risiedono in sicurezza sul browser di questo dispositivo. Inserisci l\'URL della tua Web App Google Apps Script e il Security Token qui sotto per attivare il backup e la sincronizzazione bidirezionale gratuita su Google Sheets.';

    if (isSandbox) {
      calloutClass = 'callout-orange';
      calloutIcon = 'shield';
      calloutTitle = `Protezione Sandbox Attiva (${googleSheetsService.isBeta ? 'Ambiente Beta' : 'Test Protetto'})`;
      calloutBadge = 'Zero Scritture Cloud';
      calloutDesc = 'Tutte le modifiche, nuovi movimenti e conguagli restano confinati in locale sul tuo browser senza sovrascrivere il foglio Google Sheets reale.';
    } else if (isConnected) {
      calloutClass = 'callout-green';
      calloutIcon = 'sync';
      calloutTitle = 'Sincronizzazione Live Bidirezionale Attiva';
      calloutBadge = 'Google Sheets Live';
      calloutDesc = 'L\'app è collegata al tuo foglio Google Sheets: ogni movimento, conguaglio o modifica viene sincronizzato automaticamente sul cloud e riallineato tra Mac e iPhone.';
    }

    return `
      <!-- Card 1: Connessione Google Sheets -->
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge ${isSandbox ? 'badge-tint-orange' : (isConnected ? 'badge-tint-green' : 'badge-tint-blue')}">
              ${getIcon('cloud', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Sincronizzazione Google Sheets</h3>
              <p class="settings-card-sub">Collegamento serverless privato al foglio "Finanze - Movimenti"</p>
            </div>
          </div>
          <span class="sheet-status-badge">
            <span class="sheet-status-indicator" style="width: 8px; height: 8px; border-radius: 50%; background-color: ${isSandbox ? 'var(--apple-orange)' : (isConnected ? 'var(--apple-green)' : 'var(--apple-blue)')};"></span>
            <span class="sheet-status-desc">${isSandbox ? 'Sandbox Protetta' : (isConnected ? 'Connesso Live' : 'Solo Locale')}</span>
          </span>
        </div>

        <div class="settings-status-callout ${calloutClass}">
          <div class="callout-icon">
            ${getIcon(calloutIcon, 22)}
          </div>
          <div class="callout-body">
            <div class="callout-title-row">
              <strong>${calloutTitle}</strong>
              <span class="callout-pill">${calloutBadge}</span>
            </div>
            <p>${calloutDesc}</p>
          </div>
        </div>

        <div class="settings-toggle-row">
          <div class="toggle-label-group">
            <strong>Modalità Sandbox (Protezione Scritture)</strong>
            <span>Blocca temporaneamente scritture ed eliminazioni verso il foglio Google Sheets durante simulazioni e prove.</span>
          </div>
          <label class="apple-switch" title="Attiva/Disattiva Modalità Sandbox">
            <input type="checkbox" id="gas-sandbox-toggle" ${isSandbox ? 'checked' : ''} />
            <span class="switch-slider"></span>
          </label>
        </div>

        <div class="settings-form-stack">
          <div class="form-group">
            <label class="form-label" for="gas-url-input">URL Applicazione Web (Google Apps Script)</label>
            <input type="url" id="gas-url-input" class="apple-input apple-input-mono" placeholder="https://script.google.com/macros/s/AKfyc.../exec" value="${config.webAppUrl || ''}" />
          </div>

          <div class="form-group">
            <label class="form-label" for="gas-token-input">Chiave Segreta Personale (Security Token)</label>
            <input type="password" id="gas-token-input" class="apple-input" placeholder="La password segreta impostata nello script Code.gs" value="${config.securityToken || ''}" />
          </div>
        </div>

        <div class="settings-cloud-actions">
          <button class="apple-btn-secondary" id="btn-test-connection">
            ${getIcon('salute', 14)}
            <span>Verifica Connessione</span>
          </button>
          <button class="apple-btn-secondary" id="btn-force-sync-now">
            ${getIcon('sync', 14)}
            <span>Sincronizza Ora</span>
          </button>
          ${isConnected ? `
            <button class="apple-btn-secondary" id="btn-share-cloud-settings">
              ${getIcon('smartphone', 14)}
              <span>Passa a iPhone</span>
            </button>
          ` : ''}
          <button class="apple-btn-primary" id="btn-save-sheets-config">
            ${getIcon('check', 14)}
            <span>Salva e Collega</span>
          </button>
        </div>

        <div id="connection-test-feedback" class="connection-feedback" style="display: none;"></div>

        <div class="settings-guide-box">
          <div class="settings-guide-title">
            ${getIcon('info', 15)}
            <strong>Guida rapida all'URL Web App (/exec)</strong>
          </div>
          <ol class="settings-guide-steps">
            <li>Apri il tuo foglio Google Sheets e seleziona <strong>Estensioni → Apps Script</strong>.</li>
            <li>Clicca in alto a destra su <strong>Distribuisci → Nuova distribuzione</strong>.</li>
            <li>Imposta Tipo: <em>Applicazione Web</em>, Esegui come: <em>Io</em>, Chi ha accesso: <strong>Chiunque</strong>.</li>
            <li>Autorizza e incolla qui sopra l'URL generato che termina con <code>/exec</code>.</li>
          </ol>
        </div>
      </section>

      <div class="settings-two-col-grid">

        <!-- Card 2: Snapshot & Backup Locale / iCloud Drive -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-blue">
                ${getIcon('download', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Snapshot &amp; Backup Locale</h3>
                <p class="settings-card-sub">Esporta o ripristina il tuo archivio su Mac, iPhone o iCloud Drive</p>
              </div>
            </div>
            <span class="badge badge--info">Local-First</span>
          </div>

          <p class="settings-body-copy">
            Salva una copia integrale di sicurezza in formato <strong>JSON</strong> (ripristinabile in 1 clic su qualsiasi dispositivo) oppure esporta i movimenti in <strong>CSV</strong> per aprirli su Numbers o Excel.
          </p>

          <div class="settings-backup-actions">
            <button class="apple-btn-secondary" id="btn-export-backup-json">
              ${getIcon('download', 14)}
              <span>Esporta Snapshot (.JSON)</span>
            </button>
            <button class="apple-btn-secondary" id="btn-export-tx-csv">
              ${getIcon('table', 14)}
              <span>Esporta Movimenti (.CSV)</span>
            </button>
            <button class="apple-btn-primary" id="btn-import-backup-trigger">
              ${getIcon('upload', 14)}
              <span>Ripristina da Backup (.JSON)</span>
            </button>
            <input type="file" id="input-backup-file" accept=".json" style="display: none;" />
          </div>
        </section>

        <!-- Card 3: Scorciatoie Rapide iOS & Siri -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-green">
                ${getIcon('smartphone', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Comandi Rapidi iOS &amp; Siri</h3>
                <p class="settings-card-sub">Inserimento istantaneo dal Tasto Azione o Widget iPhone</p>
              </div>
            </div>
            <span class="badge badge--positive">iOS Shortcuts</span>
          </div>

          <p class="settings-body-copy">
            Nell'app <strong>Comandi Rapidi</strong> su iPhone usa l'azione <em>"Apri URL"</em> con parametri precompilati per registrare una spesa al volo:
          </p>

          <div class="settings-code-snippet">
            #quick-add?amount=15.00&amp;cat=Alimentari&amp;desc=Pranzo
          </div>

          <div class="settings-actions-footer">
            <button class="apple-btn-secondary" id="btn-test-quick-add">
              ${getIcon('utenze', 14)}
              <span>Simula Inserimento Rapido</span>
            </button>
          </div>
        </section>

      </div>
    `;
  }

  renderAccountModal() {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    if (this.activeSubtab !== 'conti') return;

    const providers = financeStore.getProviders();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="account-modal-overlay">
        <div class="apple-modal-sheet" id="account-modal-sheet" style="max-width: 500px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="account-modal-close">Annulla</button>
            <h3>Nuovo Conto</h3>
            <button class="modal-save-btn" id="account-modal-save">Aggiungi</button>
          </div>
          <form class="modal-form" id="add-account-form" onsubmit="return false;">

            <div class="form-group">
              <label class="form-label" for="new-acc-provider">Banca o Provider</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="new-acc-provider" class="apple-select apple-input">
                  ${providers.map(p => `<option value="${p}">${p}</option>`).join('')}
                  <option value="__custom__">+ Altro Provider / Banca...</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group" id="custom-provider-group" style="display: none;">
              <label class="form-label" for="new-acc-custom-provider">Nome Nuovo Provider</label>
              <input type="text" id="new-acc-custom-provider" class="apple-input" placeholder="Es. Directa, BBVA, Fineco, Scalable..." />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-acc-name">Nome Identificativo del Conto</label>
              <input type="text" id="new-acc-name" class="apple-input" placeholder="Es. Conto Principale, Broker ETF, Carta..." required />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-acc-type">Tipologia Conto</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="new-acc-type" class="apple-select apple-input" required>
                  <option value="Liquidità corrente">Liquidità Corrente (Conto o Carta)</option>
                  <option value="Broker / Investimenti">Broker / Piattaforma Investimenti (Holdings &amp; Liquidità)</option>
                  <option value="Previdenza complementare">Previdenza Complementare (Fondo Pensione)</option>
                  <option value="Buoni Pasto / Benefit">Buoni Pasto / Benefit Spesa</option>
                  <option value="Liquidità contante">Liquidità Contante</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <!-- Sezione standard per conti non-broker -->
            <div class="form-group" id="standard-balance-group">
              <label class="form-label" for="new-acc-balance">Saldo Iniziale (€)</label>
              <input type="number" id="new-acc-balance" class="apple-input apple-input-lg" placeholder="0,00" step="0.01" />
            </div>

            <!-- Sezione specifica per Broker / Investimenti a due livelli -->
            <div id="broker-extra-fields" style="display: none; background: var(--bg-hover); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
              <div class="form-group" style="margin-bottom: 12px;">
                <label class="form-label" for="new-acc-cash">Liquidità Libera non investita (€)</label>
                <input type="number" id="new-acc-cash" class="apple-input" placeholder="0,00" step="0.01" value="0.00" />
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-top: 4px;">Liquidità sul broker in attesa di investimento o remunerata</span>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="new-acc-holding-search">Primo Strumento da JustETF (Opzionale)</label>
                <input type="text" id="new-acc-holding-search" class="apple-input" placeholder="Cerca Ticker o ISIN (es. XEON, VWCE, SWDA...)" />
                <div id="new-acc-holding-preview" style="display: none; margin-top: 10px;"></div>
                <div id="new-acc-holding-val-row" style="display: none; margin-top: 10px;">
                  <label class="form-label" for="new-acc-holding-val">Valore Iniziale Investito (€)</label>
                  <input type="number" id="new-acc-holding-val" class="apple-input" placeholder="0,00" step="0.01" />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('account-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeAccountModal());

    const overlay = document.getElementById('account-modal-overlay');
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeAccountModal();
    });

    const saveBtn = document.getElementById('account-modal-save');
    if (saveBtn) saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleSaveAccount();
    });

    const providerSelect = document.getElementById('new-acc-provider');
    const customGroup = document.getElementById('custom-provider-group');
    const customInput = document.getElementById('new-acc-custom-provider');
    const nameInput = document.getElementById('new-acc-name');
    const typeSelect = document.getElementById('new-acc-type');
    const standardBalGroup = document.getElementById('standard-balance-group');
    const brokerExtra = document.getElementById('broker-extra-fields');
    const holdingSearch = document.getElementById('new-acc-holding-search');
    const holdingPreview = document.getElementById('new-acc-holding-preview');
    const holdingValRow = document.getElementById('new-acc-holding-val-row');

    if (providerSelect && nameInput) {
      if (!nameInput.value) nameInput.value = providerSelect.value;
      providerSelect.addEventListener('change', () => {
        if (providerSelect.value === '__custom__') {
          if (customGroup) customGroup.style.display = 'block';
          if (customInput) customInput.focus();
        } else {
          if (customGroup) customGroup.style.display = 'none';
          nameInput.value = providerSelect.value;
          const pLower = providerSelect.value.toLowerCase();
          if (pLower.includes('republic') || pLower.includes('directa') || pLower.includes('degiro') || pLower.includes('scalable') || pLower.includes('interactive') || pLower.includes('broker')) {
            if (typeSelect) {
              typeSelect.value = 'Broker / Investimenti';
              typeSelect.dispatchEvent(new Event('change'));
            }
          }
        }
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', () => {
        const isBroker = typeSelect.value === 'Broker / Investimenti';
        if (isBroker) {
          if (standardBalGroup) standardBalGroup.style.display = 'none';
          if (brokerExtra) brokerExtra.style.display = 'block';
        } else {
          if (standardBalGroup) standardBalGroup.style.display = 'block';
          if (brokerExtra) brokerExtra.style.display = 'none';
        }
      });
    }

    if (holdingSearch) {
      holdingSearch.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        const detected = AssetCatalogService.lookupAsset(q);
        if (detected) {
          if (holdingPreview) {
            holdingPreview.style.display = 'block';
            holdingPreview.innerHTML = `
              <div style="background: rgba(0, 113, 227, 0.08); border: 1px solid rgba(0, 113, 227, 0.25); border-radius: var(--radius-md); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div style="min-width: 0; flex: 1;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <strong style="color: ${detected.color}; font-size: 13px;">${detected.ticker}</strong>
                    <span class="badge badge--neutral" style="font-size: 10px; padding: 1px 6px;">${detected.classLabel}</span>
                  </div>
                  <div style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${detected.name} • TER ${detected.ter}%
                  </div>
                </div>
                <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">✓ Riconosciuto</span>
              </div>
            `;
          }
          if (holdingValRow) holdingValRow.style.display = 'block';
        } else {
          if (holdingPreview) holdingPreview.style.display = 'none';
          if (holdingValRow) holdingValRow.style.display = 'none';
        }
      });
    }
  }

  openAccountModal() {
    this.isAccountModalOpen = true;
    document.body.classList.add('modal-open');
    const overlay = document.getElementById('account-modal-overlay');
    const sheet = document.getElementById('account-modal-sheet');
    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    setTimeout(() => {
      const nameInput = document.getElementById('new-acc-name');
      if (nameInput) nameInput.focus();
    }, 250);
  }

  closeAccountModal() {
    this.isAccountModalOpen = false;
    document.body.classList.remove('modal-open');
    const overlay = document.getElementById('account-modal-overlay');
    const sheet = document.getElementById('account-modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 250);
  }

  handleSaveAccount() {
    const providerSelect = document.getElementById('new-acc-provider');
    const customInput = document.getElementById('new-acc-custom-provider');
    let provider = providerSelect?.value;
    if (provider === '__custom__') {
      provider = customInput?.value.trim() || 'Altro Provider';
    }

    const name = document.getElementById('new-acc-name')?.value.trim() || provider;
    const type = document.getElementById('new-acc-type')?.value;
    const isBroker = type === 'Broker / Investimenti';

    if (!name) {
      const saveBtn = document.getElementById('account-modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 400);
      }
      return;
    }

    if (provider) {
      financeStore.addProvider(provider);
    }

    let balance = 0;
    let cashBalance = 0;
    const holdings = [];

    if (isBroker) {
      cashBalance = parseFloat(document.getElementById('new-acc-cash')?.value) || 0;
      const holdingVal = parseFloat(document.getElementById('new-acc-holding-val')?.value) || 0;
      const holdingSearchVal = document.getElementById('new-acc-holding-search')?.value.trim();

      if (holdingSearchVal && holdingVal > 0) {
        const detected = AssetCatalogService.lookupAsset(holdingSearchVal);
        const ticker = (detected?.ticker || holdingSearchVal).toUpperCase();
        holdings.push({
          id: 'holding_' + Date.now(),
          ticker,
          isin: detected?.isin || 'N/D',
          name: detected?.name || ticker,
          assetClass: detected?.assetClass || 'azionario_globale',
          assetClassLabel: detected?.classLabel || 'Investimento Finanziario',
          currentValue: holdingVal,
          shares: 0,
          price: 0,
          color: detected?.color || '#0071E3',
          emergencyMonthsQuota: ticker === 'XEON' ? Math.min(holdingVal, 5000) : 0,
          safeInvestmentQuota: ticker === 'XEON' ? Math.max(0, holdingVal - 5000) : 0,
          isPac: ticker === 'VWCE'
        });
      }
      balance = Math.round((cashBalance + holdingVal) * 100) / 100;
    } else {
      balance = parseFloat(document.getElementById('new-acc-balance')?.value) || 0;
    }

    financeStore.addAccount({
      name,
      provider,
      type,
      balance,
      cashBalance,
      isBroker,
      holdings
    });

    this.closeAccountModal();

    const container = document.getElementById('main-viewport');
    if (container) {
      setTimeout(() => this.render(container), 260);
    }
  }

  // === BACKUP & EXPORT ICLOUD DRIVE ===
  exportBackupJson() {
    const data = financeStore.exportBackupData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `finanze_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  exportTransactionsCsv() {
    const txs = financeStore.getAllTransactions();
    const headers = ['ID', 'Data', 'Mese', 'Anno', 'Descrizione', 'Importo', 'Tipo', 'Categoria', 'Conto', 'Conto Destinazione'];
    const rows = txs.map(t => [
      t.id,
      t.date,
      t.month,
      t.year,
      `"${(t.description || '').replace(/"/g, '""')}"`,
      (t.amount || 0).toFixed(2).replace('.', ','),
      t.type,
      `"${(t.category || '').replace(/"/g, '""')}"`,
      `"${(t.account || '').replace(/"/g, '""')}"`,
      `"${(t.toAccount || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `movimenti_export_${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  handleImportBackupFile(file, container) {
    if (!file) return;
    if (!confirm('ATTENZIONE: Il ripristino sovrascriverà i dati correnti con quelli del file di backup.\nVuoi procedere?')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const res = financeStore.importBackupData(content);
        if (res.success) {
          alert('✅ Dati ripristinati con successo dal file di backup!');
          this.render(container);
        } else {
          alert('❌ Errore durante il ripristino: ' + res.error);
        }
      } catch (err) {
        alert('❌ Errore nella lettura del file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  openConguaglioModal(acc, newBal, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    document.body.classList.add('modal-open');

    const oldBal = parseFloat(acc.balance) || 0;
    const delta = Math.round((newBal - oldBal) * 100) / 100;
    const isPositive = delta >= 0;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="conguaglio-modal-overlay">
        <div class="apple-modal-sheet open" id="conguaglio-modal-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="conguaglio-cancel">Annulla</button>
            <h3>Conguaglio Saldo</h3>
            <button class="modal-save-btn" id="conguaglio-confirm">Conferma</button>
          </div>
          <div class="modal-form">
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: var(--space-text-sub); line-height: var(--lh-body);">
              Stai modificando il saldo del conto <strong>${acc.name}</strong>.
            </p>

            <div class="conguaglio-box">
              <div class="conguaglio-delta-row">
                <span style="font-size: 13px; color: var(--text-secondary);">Saldo Attuale:</span>
                <strong class="privacy-mask">${this.formatCurrency(oldBal)}</strong>
              </div>
              <div class="conguaglio-delta-row">
                <span style="font-size: 13px; color: var(--text-secondary);">Nuovo Saldo:</span>
                <strong class="privacy-mask">${this.formatCurrency(newBal)}</strong>
              </div>
              <div class="conguaglio-delta-row" style="margin-top: var(--space-text-title); padding-top: var(--space-text-title); border-top: 1px dashed var(--border-subtle);">
                <span style="font-size: 13px; font-weight: 600;">Differenza (Delta):</span>
                <span class="conguaglio-delta-val ${isPositive ? 'positive' : 'negative'}">
                  ${isPositive ? '+' : ''}${this.formatCurrency(delta)}
                </span>
              </div>
            </div>

            <label class="form-label" style="margin-top: var(--space-box-gap-md);">Come registrare questo conguaglio?</label>
            <div class="conguaglio-options">
              <label class="conguaglio-option-label">
                <input type="radio" name="conguaglio-choice" value="real" checked />
                <div>
                  <strong style="font-size: 13px; display: block; color: var(--text-primary); line-height: var(--lh-title);">Crea movimento di conguaglio reale</strong>
                  <span style="font-size: 11px; color: var(--text-secondary); line-height: var(--lh-body);">
                    Genera una transazione (${isPositive ? 'Entrata' : 'Uscita'}) in data odierna con categoria "Conguaglio / Rettifica" per giustificare la variazione nei grafici e nello storico.
                  </span>
                </div>
              </label>

              <label class="conguaglio-option-label">
                <input type="radio" name="conguaglio-choice" value="fictional" />
                <div>
                  <strong style="font-size: 13px; display: block; color: var(--text-primary); line-height: var(--lh-title);">Solo rettifica fittizia (Nessun movimento)</strong>
                  <span style="font-size: 11px; color: var(--text-secondary); line-height: var(--lh-body);">
                    Aggiorna solo il saldo attuale del conto senza inserire alcuna transazione nello storico dei movimenti.
                  </span>
                </div>
              </label>
            </div>

            <div class="form-group" id="conguaglio-note-group" style="margin-top: var(--space-box-gap-md);">
              <label class="form-label" for="conguaglio-note">Nota per il movimento</label>
              <input type="text" id="conguaglio-note" class="apple-input" value="Rettifica Saldo ${acc.name}" />
            </div>

          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('conguaglio-modal-overlay');
    const close = () => {
      document.body.classList.remove('modal-open');
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('conguaglio-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    const radios = overlay.querySelectorAll('input[name="conguaglio-choice"]');
    const noteGroup = document.getElementById('conguaglio-note-group');
    radios.forEach(r => {
      r.addEventListener('change', () => {
        if (noteGroup) {
          noteGroup.style.display = r.value === 'real' ? 'block' : 'none';
        }
      });
    });

    document.getElementById('conguaglio-confirm')?.addEventListener('click', () => {
      const selected = overlay.querySelector('input[name="conguaglio-choice"]:checked')?.value;
      const isReal = selected === 'real';
      const note = document.getElementById('conguaglio-note')?.value.trim();

      financeStore.reconcileAccount(acc.name, newBal, isReal, note);
      close();
      this.render(container);
    });
  }

  saveSalaryParameters(container) {
    const base = parseFloat(document.getElementById('salary-base')?.value) || 1700.00;
    const payday = parseInt(document.getElementById('salary-payday')?.value, 10) || 25;
    const allowances = parseFloat(document.getElementById('salary-allowances')?.value) || 0;

    const has13 = Boolean(document.getElementById('salary-has-13th')?.checked);
    const m13 = parseInt(document.getElementById('salary-13th-month')?.value, 10) || 11;
    const amt13 = parseFloat(document.getElementById('salary-13th-amount')?.value) || base;

    const has14 = Boolean(document.getElementById('salary-has-14th')?.checked);
    const m14 = parseInt(document.getElementById('salary-14th-month')?.value, 10) || 6;
    const amt14 = parseFloat(document.getElementById('salary-14th-amount')?.value) || base;

    const hasBonus = Boolean(document.getElementById('salary-has-bonus')?.checked);
    const mBonus = parseInt(document.getElementById('salary-bonus-month')?.value, 10) || 4;
    const amtBonus = parseFloat(document.getElementById('salary-bonus-amount')?.value) || 1200;

    financeStore.saveSalaryConfig({
      baseSalary: base,
      payDay: payday,
      has13th: has13,
      thirteenthAmount: amt13,
      thirteenthMonth: m13,
      has14th: has14,
      fourteenthAmount: amt14,
      fourteenthMonth: m14,
      hasProductionBonus: hasBonus,
      productionBonusAmount: amtBonus,
      productionBonusMonth: mBonus,
      extraMonthlyAllowances: allowances
    });

    const feedback = document.getElementById('salary-save-feedback');
    if (feedback) {
      feedback.style.display = 'inline-flex';
      setTimeout(() => {
        this.render(container);
      }, 850);
    } else {
      this.render(container);
    }
  }

  async triggerForceSync(container) {
    const feedbackEl = document.getElementById('connection-test-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'connection-feedback loading';
      feedbackEl.textContent = 'Scaricamento e allineamento conti, saldi e movimenti da Google Sheets in corso...';
    }

    try {
      const data = await googleSheetsService.fetchAllData();
      if (data) {
        financeStore.syncCloudData(data);
        const accCount = financeStore.getAccounts().length;
        const txCount = Array.isArray(data.transactions) ? data.transactions.length : 0;
        if (feedbackEl) {
          feedbackEl.className = 'connection-feedback success';
          feedbackEl.textContent = `Sincronizzazione completata! ${accCount} conti reali e ${txCount} movimenti allineati al foglio.`;
        }
        setTimeout(() => this.render(container), 800);
      } else if (feedbackEl) {
        feedbackEl.className = 'connection-feedback error';
        feedbackEl.textContent = 'Nessun dato ricevuto da Google Sheets o configurazione non valida.';
      }
    } catch (err) {
      if (feedbackEl) {
        feedbackEl.className = 'connection-feedback error';
        feedbackEl.textContent = 'Errore durante la sincronizzazione: ' + (err.message || err);
      }
    }
  }

  bindEvents(container) {
    // Sotto-navigazione Segmentata Apple / Workout Capsule
    container.querySelectorAll('#impostazioni-subtabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          if (window.location.hash !== `#impostazioni-${sub}`) {
            window.location.hash = `impostazioni-${sub}`;
          }
          this.render(container);
        }
      });
    });

    // Azioni Nuovo Conto (Header Desktop + Toolbar Card)
    container.querySelectorAll('#btn-add-account-modal, .js-add-account-modal').forEach(btn => {
      btn.addEventListener('click', () => this.openAccountModal());
    });

    // Studio Chiusura Fine Mese & Conguagli (Header Desktop + Toolbar Card)
    container.querySelectorAll('#btn-open-closing-studio, .js-open-closing-studio').forEach(btn => {
      btn.addEventListener('click', () => {
        monthlyClosingModal.open({
          onSuccess: () => this.render(container)
        });
      });
    });

    // Focus rapido Nuova Categoria da Header Desktop
    const btnFocusNewCat = container.querySelector('#btn-focus-new-cat');
    if (btnFocusNewCat) {
      btnFocusNewCat.addEventListener('click', () => {
        const input = container.querySelector('#new-cat-name');
        if (input) input.focus();
      });
    }

    // Aggiornamento Saldo Conto Inline con Conguaglio Apple
    container.querySelectorAll('.apple-btn-save-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const input = container.querySelector(`.acc-balance-input[data-id="${id}"]`);
        const accounts = financeStore.getAccounts();
        const acc = accounts.find(a => a.id === id);
        if (input && acc) {
          const newBal = parseFloat(input.value);
          if (isNaN(newBal)) return;
          if (Math.abs(newBal - acc.balance) > 0.001) {
            this.openConguaglioModal(acc, newBal, container);
          } else {
            monthlyClosingModal.open({
              focusAccount: acc.name,
              onSuccess: () => this.render(container)
            });
          }
        }
      });
    });

    // Eliminazione Conto
    container.querySelectorAll('.apple-btn-delete-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Sei sicuro di voler rimuovere questo conto dal gestionale?')) {
          financeStore.deleteAccount(id);
          this.render(container);
        }
      });
    });

    // Salva Parametri Stipendio, 13esima, 14esima & Benefit
    container.querySelectorAll('#btn-save-salary-config, .js-save-salary-config').forEach(btn => {
      btn.addEventListener('click', () => this.saveSalaryParameters(container));
    });

    // Creazione Categoria (Click + Invio)
    const btnCreateCat = document.getElementById('btn-create-cat');
    const newCatInput = document.getElementById('new-cat-name');
    const createCategoryHandler = () => {
      const typeSelect = document.getElementById('new-cat-type');
      if (newCatInput && newCatInput.value.trim()) {
        financeStore.addCategory({ name: newCatInput.value, type: typeSelect?.value || 'expense' });
        this.render(container);
      }
    };
    if (btnCreateCat) {
      btnCreateCat.addEventListener('click', createCategoryHandler);
    }
    if (newCatInput) {
      newCatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          createCategoryHandler();
        }
      });
    }

    // Rimozione Categoria
    container.querySelectorAll('.btn-remove-cat').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        financeStore.deleteCategory(id);
        this.render(container);
      });
    });

    // Accorpamento Categorie Smart Merge
    const btnMerge = document.getElementById('btn-merge-categories');
    if (btnMerge) {
      btnMerge.addEventListener('click', () => {
        const src = document.getElementById('merge-source-cat')?.value;
        const dest = document.getElementById('merge-target-cat')?.value;
        if (!src || !dest || src === dest) {
          alert('Seleziona due categorie diverse per procedere con l\'accorpamento.');
          return;
        }
        if (confirm(`Sei sicuro di voler accorpare la categoria "${src}" dentro "${dest}"?\nTutti i movimenti passati verranno convertiti a "${dest}".`)) {
          const res = financeStore.mergeCategories(src, dest);
          alert(`Accorpamento completato con successo!\n${res.updatedCount} movimenti storici convertiti in "${dest}".`);
          this.render(container);
        }
      });
    }

    // Salva / Rimuovi PIN
    const btnSavePin = document.getElementById('btn-save-pin');
    if (btnSavePin) {
      btnSavePin.addEventListener('click', () => {
        const pinVal = document.getElementById('input-security-pin')?.value.trim();
        if (pinVal && pinVal.length === 4 && /^\d{4}$/.test(pinVal)) {
          financeStore.setPin(pinVal);
          alert('PIN di sicurezza a 4 cifre attivato con successo!');
          this.render(container);
        } else {
          alert('Inserisci un codice numerico valido di 4 cifre.');
        }
      });
    }

    const btnRemovePin = document.getElementById('btn-remove-pin');
    if (btnRemovePin) {
      btnRemovePin.addEventListener('click', () => {
        if (confirm('Disattivare la protezione con PIN?')) {
          financeStore.setPin('');
          if (typeof BiometricService !== 'undefined') {
            BiometricService.setEnabled(false);
          }
          this.render(container);
        }
      });
    }

    // Toggle Biometrico Face ID / Touch ID
    const bioToggle = container.querySelector('#biometric-toggle');
    if (bioToggle) {
      bioToggle.addEventListener('change', async () => {
        if (!financeStore.isPinEnabled() || !financeStore.getPin()) {
          alert('Attenzione: Imposta prima un codice PIN a 4 cifre per poter attivare lo sblocco biometrico.');
          bioToggle.checked = false;
          return;
        }

        if (bioToggle.checked) {
          try {
            if (typeof BiometricService !== 'undefined') {
              const enrolled = await BiometricService.enrollBiometric();
              if (enrolled) {
                alert('✅ Face ID / Touch ID abilitato con successo!');
              } else {
                bioToggle.checked = false;
              }
            } else {
              bioToggle.checked = false;
              alert('Servizio biometrico non disponibile.');
            }
          } catch (err) {
            bioToggle.checked = false;
            alert(err.message || 'Riconoscimento biometrico non riuscito.');
          }
        } else if (typeof BiometricService !== 'undefined') {
          BiometricService.setEnabled(false);
        }
      });
    }

    // Toggle Sandbox Mode
    const sandboxToggle = document.getElementById('gas-sandbox-toggle');
    if (sandboxToggle) {
      sandboxToggle.addEventListener('change', (e) => {
        googleSheetsService.setSandboxMode(e.target.checked);
        this.render(container);
      });
    }

    // Sheets Config
    const btnSaveSheets = document.getElementById('btn-save-sheets-config');
    if (btnSaveSheets) {
      btnSaveSheets.addEventListener('click', async () => {
        const url = (document.getElementById('gas-url-input')?.value || '').trim();
        const token = (document.getElementById('gas-token-input')?.value || '').trim();
        const isSandbox = document.getElementById('gas-sandbox-toggle')?.checked ?? googleSheetsService.isSandboxMode();

        const feedbackEl = document.getElementById('connection-test-feedback');
        if (feedbackEl) {
          feedbackEl.style.display = 'block';
          feedbackEl.className = 'connection-feedback loading';
          feedbackEl.textContent = 'Salvataggio e verifica parametri in corso...';
        }

        googleSheetsService.saveConfig(url, token, true, isSandbox);

        if (url) {
          const testRes = await googleSheetsService.testConnection();
          if (feedbackEl) {
            feedbackEl.className = `connection-feedback ${testRes.success ? 'success' : 'error'}`;
            feedbackEl.textContent = testRes.message;
          }
          if (testRes.success) {
            const cloudData = await googleSheetsService.fetchAllData();
            if (cloudData && typeof window !== 'undefined' && window.app) {
              window.app.applyCloudData(cloudData);
            }
            setTimeout(() => this.render(container), 1000);
          }
        } else {
          if (feedbackEl) {
            feedbackEl.className = 'connection-feedback success';
            feedbackEl.textContent = 'Parametri salvati (Modalità locale attiva).';
          }
          setTimeout(() => this.render(container), 800);
        }
      });
    }

    container.querySelectorAll('#btn-share-cloud-settings, .js-share-cloud-settings').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.app) {
          window.app.openShareConfigModal();
        }
      });
    });

    const btnTest = document.getElementById('btn-test-connection');
    if (btnTest) {
      btnTest.addEventListener('click', async () => {
        const feedbackEl = document.getElementById('connection-test-feedback');
        if (!feedbackEl) return;
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'connection-feedback loading';
        feedbackEl.textContent = 'Verifica connessione con Google Sheets in corso...';

        const res = await googleSheetsService.testConnection();
        feedbackEl.className = `connection-feedback ${res.success ? 'success' : 'error'}`;
        feedbackEl.textContent = res.message;
      });
    }

    container.querySelectorAll('#btn-force-sync-now, .js-force-sync-now').forEach(btn => {
      btn.addEventListener('click', () => this.triggerForceSync(container));
    });

    // Backup & Snapshot iCloud Drive / File Locale
    const btnExpJson = document.getElementById('btn-export-backup-json');
    if (btnExpJson) {
      btnExpJson.addEventListener('click', () => this.exportBackupJson());
    }

    const btnExpCsv = document.getElementById('btn-export-tx-csv');
    if (btnExpCsv) {
      btnExpCsv.addEventListener('click', () => this.exportTransactionsCsv());
    }

    const btnImpTrigger = document.getElementById('btn-import-backup-trigger');
    const inputBackupFile = document.getElementById('input-backup-file');
    if (btnImpTrigger && inputBackupFile) {
      btnImpTrigger.addEventListener('click', () => inputBackupFile.click());
      inputBackupFile.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          this.handleImportBackupFile(file, container);
        }
      });
    }

    // Prova rapida Scorciatoia iOS
    document.getElementById('btn-test-quick-add')?.addEventListener('click', () => {
      window.location.hash = 'quick-add?amount=15.00&cat=Alimentari&desc=Pranzo';
    });
  }
}
