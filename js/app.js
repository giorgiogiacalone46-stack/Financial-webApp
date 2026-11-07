/**
 * Apple Design System - Personal Finance Web App
 * State Management & Navigation Controller
 */

import { DashboardView } from './components/dashboardView.js';
import { MovimentiView } from './components/movimentiView.js';
import { SpeseView } from './components/speseView.js';
import { AssistenteView } from './components/assistenteView.js';
import { InvestimentiView } from './components/investimentiView.js';
import { StoricoView } from './components/storicoView.js';
import { ImpostazioniView } from './components/impostazioniView.js';
import { googleSheetsService } from './services/googleSheetsService.js';
import { financeStore } from './data/mockData.js';
import { BiometricService } from './services/biometricService.js';

const VIEWS = {
  dashboard: {
    id: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Panoramica finanziaria e indicatori chiave'
  },
  spese: {
    id: 'spese',
    title: 'Spese & Budget',
    subtitle: 'Analisi avanzata uscite, buste 50/30/20 e merchant'
  },
  movimenti: {
    id: 'movimenti',
    title: 'Movimenti',
    subtitle: 'Registro transazioni reale'
  },
  investimenti: {
    id: 'investimenti',
    title: 'Investimenti',
    subtitle: 'Allocazione asset, XEON, VWCE & Liquidità Trade Republic'
  },
  storico: {
    id: 'storico',
    title: 'Storico Patrimonio',
    subtitle: 'Evoluzione Patrimonio Effettivo & Previdenza'
  },
  assistente: {
    id: 'assistente',
    title: 'Assistente Finanziario',
    subtitle: 'Personal CFO, runway, ottimizzazione fiscale & analisi proattiva'
  },
  impostazioni: {
    id: 'impostazioni',
    title: 'Configurazione & Conti',
    subtitle: 'Gestione conti, categorie, PIN e Sheets'
  }
};

class AppController {
  constructor() {
    this.currentTab = 'dashboard';
    this.dashboardView = new DashboardView();
    this.speseView = new SpeseView();
    this.assistenteView = new AssistenteView();
    this.movimentiView = new MovimentiView();
    this.investimentiView = new InvestimentiView();
    this.storicoView = new StoricoView();
    this.impostazioniView = new ImpostazioniView();
    this.isUnlocked = !financeStore.isPinEnabled();
    this.init();
  }

  init() {
    window.app = this;
    window.googleSheetsService = googleSheetsService;
    window.financeStore = financeStore;
    this.renderDate();
    googleSheetsService.updateStatusBadge();

    if (financeStore.isPrivacyMode()) {
      document.body.classList.add('privacy-mode');
    }

    // Se il PIN è attivo, mostra schermata di sblocco Apple
    if (!this.isUnlocked) {
      this.showLockScreen();
    } else {
      this.startApp();
    }
  }

  showLockScreen() {
    const lockEl = document.getElementById('lock-screen-container');
    if (!lockEl) {
      this.startApp();
      return;
    }

    lockEl.style.display = 'flex';
    let currentInput = '';

    const updateDots = () => {
      const dots = lockEl.querySelectorAll('.pin-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('filled', idx < currentInput.length);
      });
    };

    const unlockBiometrically = async () => {
      if (typeof BiometricService !== 'undefined' && BiometricService.isEnabled()) {
        try {
          const success = await BiometricService.authenticate();
          if (success) {
            this.isUnlocked = true;
            lockEl.style.opacity = '0';
            setTimeout(() => {
              lockEl.style.display = 'none';
              this.startApp();
            }, 300);
            return true;
          }
        } catch (e) {
          console.warn('Biometric auth error:', e);
        }
      }
      return false;
    };

    // Configurazione visibilità pulsanti biometrici Face ID / Touch ID
    const hasBiometric = typeof BiometricService !== 'undefined' && BiometricService.isEnabled();
    const bioKey = lockEl.querySelector('#pin-key-biometric');
    const emptyFallback = lockEl.querySelector('#pin-key-empty-fallback');
    const bioPrompt = lockEl.querySelector('#lock-biometric-prompt');
    const quickBioBtn = lockEl.querySelector('#btn-quick-biometric');

    if (hasBiometric) {
      if (bioKey) bioKey.style.display = 'flex';
      if (emptyFallback) emptyFallback.style.display = 'none';
      if (bioPrompt) bioPrompt.style.display = 'block';
      if (quickBioBtn) quickBioBtn.onclick = () => unlockBiometrically();

      // Auto-trigger biometric prompt all'avvio dopo 300ms
      setTimeout(() => {
        if (!this.isUnlocked) unlockBiometrically();
      }, 300);
    } else {
      if (bioKey) bioKey.style.display = 'none';
      if (emptyFallback) emptyFallback.style.display = 'block';
      if (bioPrompt) bioPrompt.style.display = 'none';
    }

    lockEl.querySelectorAll('.pin-key').forEach(key => {
      key.onclick = () => {
        const val = key.dataset.val;
        if (val === 'biometric') {
          unlockBiometrically();
        } else if (val === 'back') {
          currentInput = currentInput.slice(0, -1);
          updateDots();
        } else if (val && currentInput.length < 4) {
          currentInput += val;
          updateDots();

          if (currentInput.length === 4) {
            setTimeout(() => {
              if (currentInput === financeStore.getPin()) {
                this.isUnlocked = true;
                lockEl.style.opacity = '0';
                setTimeout(() => {
                  lockEl.style.display = 'none';
                  this.startApp();
                }, 300);
              } else {
                // Shake feedback
                const dotsRow = lockEl.querySelector('.pin-dots-row');
                dotsRow.classList.add('shake');
                setTimeout(() => {
                  dotsRow.classList.remove('shake');
                  currentInput = '';
                  updateDots();
                }, 400);
              }
            }, 100);
          }
        }
      };
    });
  }

  startApp() {
    this.bindEvents();

    const rawHash = window.location.hash.replace('#', '');
    const parts = rawHash.split('-');
    const tabName = parts[0].split('?')[0];
    const subtab = parts[1] ? parts[1].split('?')[0] : null;
    const initialTab = VIEWS[tabName] ? tabName : 'dashboard';

    if (subtab) {
      if (initialTab === 'movimenti') this.movimentiView.activeSubtab = subtab;
      else if (initialTab === 'investimenti') this.investimentiView.activeSubtab = subtab;
      else if (initialTab === 'impostazioni') this.impostazioniView.activeSubtab = subtab;
    }

    this.switchTab(initialTab, subtab);

    window.addEventListener('hashchange', () => {
      const currentRaw = window.location.hash.replace('#', '');
      const curParts = currentRaw.split('-');
      const curTab = curParts[0].split('?')[0];
      const curSub = curParts[1] ? curParts[1].split('?')[0] : null;
      if (VIEWS[curTab]) {
        if (curSub) {
          if (curTab === 'movimenti') this.movimentiView.activeSubtab = curSub;
          else if (curTab === 'investimenti') this.investimentiView.activeSubtab = curSub;
          else if (curTab === 'impostazioni') this.impostazioniView.activeSubtab = curSub;
        }
        this.switchTab(curTab, curSub);
      }
      this.handleQuickAddRoute();
      this.handleCloudSetupRoute();
    });

    this.handleQuickAddRoute();
    this.handleCloudSetupRoute();

    // Auto-sync al boot se configurato
    if (googleSheetsService.isConfigured() && googleSheetsService.autoSync) {
      googleSheetsService.fetchAllData().then(data => {
        if (data) {
          this.applyCloudData(data);
        }
      }).catch(err => console.warn('Sync background:', err));
    }
  }

  applyCloudData(data) {
    if (!data) return;
    const updated = financeStore.syncCloudData(data);
    if (updated) {
      const container = document.getElementById('main-viewport');
      if (!container) return;
      if (this.currentTab === 'dashboard') this.dashboardView.render(container);
      else if (this.currentTab === 'spese') this.speseView.render(container);
      else if (this.currentTab === 'assistente') this.assistenteView.render(container);
      else if (this.currentTab === 'movimenti') this.movimentiView.render(container);
      else if (this.currentTab === 'investimenti') this.investimentiView.render(container);
      else if (this.currentTab === 'storico') this.storicoView.render(container);
      else if (this.currentTab === 'impostazioni') this.impostazioniView.render(container);
    }
  }

  handleCloudSetupRoute() {
    const rawHash = window.location.hash || '';
    if (rawHash.includes('cloud-setup')) {
      const qIdx = rawHash.indexOf('?');
      const params = qIdx !== -1 ? new URLSearchParams(rawHash.slice(qIdx + 1)) : new URLSearchParams();
      const url = params.get('url');
      const token = params.get('token');
      if (url && token) {
        try {
          history.replaceState(null, null, window.location.pathname + '#impostazioni');
        } catch (e) {}
        this.promptCloudSetup(url, token);
      }
    }
  }

  async promptCloudSetup(url, token) {
    const confirmed = confirm(
      "☁️ Configurazione Google Sheets Rilevata!\n\n" +
      "È stato trovato un collegamento per il foglio Google Sheets.\n\n" +
      "Vuoi configurare questo dispositivo per sincronizzare movimenti e saldi?"
    );

    if (confirmed) {
      googleSheetsService.saveConfig(url, token, true, false);
      const testRes = await googleSheetsService.testConnection();
      if (testRes.success) {
        alert("✅ Collegamento stabilito con successo!\nScaricamento dei dati dal foglio in corso...");
        const cloudData = await googleSheetsService.fetchAllData();
        if (cloudData) {
          this.applyCloudData(cloudData);
        }
        this.switchTab('dashboard');
      } else {
        alert("⚠️ Impossibile completare il collegamento automatico:\n" + testRes.message);
        this.switchTab('impostazioni', 'sheets');
      }
    }
  }

  openCloudSyncModal() {
    const existing = document.getElementById('apple-cloud-sync-modal');
    if (existing) existing.remove();

    document.body.classList.add('modal-open');

    const isCfg = googleSheetsService.isConfigured();
    const isSandbox = googleSheetsService.isSandboxMode();
    const status = googleSheetsService.syncStatus;
    const pendingCount = googleSheetsService.getPendingQueueCount();
    const lastSyncIso = localStorage.getItem('finanze_last_sync');
    let lastSyncFormatted = 'Mai sincronizzato';
    if (lastSyncIso) {
      try {
        const d = new Date(lastSyncIso);
        const hours = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        lastSyncFormatted = `${day}/${month} alle ${hours}:${mins}`;
      } catch (e) {}
    }

    const txCount = financeStore.getAllTransactions().length;
    const accCount = financeStore.getAccounts().length;

    let statusPill = '';
    let statusTitle = '';
    let statusDesc = '';

    if (!isCfg) {
      statusPill = '<span class="badge badge--neutral" style="font-size: 12px; padding: 4px 10px;">📱 Modalità Locale</span>';
      statusTitle = 'Nessun foglio Google collegato';
      statusDesc = 'I dati sono salvati esclusivamente sul browser di questo dispositivo. Puoi collegare il tuo Google Sheet in qualsiasi momento per attivare il backup su cloud gratuito.';
    } else if (isSandbox) {
      statusPill = '<span class="badge badge--warning" style="font-size: 12px; padding: 4px 10px;">🛡️ Sandbox Attiva</span>';
      statusTitle = 'Google Sheets (Protetto)';
      statusDesc = 'Modalità sandbox attiva: i dati vengono letti dal foglio ma le modifiche non alterano il foglio Google Sheets.';
    } else if (status === 'error') {
      statusPill = '<span class="badge badge--negative" style="font-size: 12px; padding: 4px 10px;">⚠️ Errore Connessione</span>';
      statusTitle = 'Google Sheets non raggiungibile';
      statusDesc = 'Verifica la connessione internet, i permessi della distribuzione ("Chiunque") o la validità del Security Token.';
    } else {
      statusPill = '<span class="badge badge--positive" style="font-size: 12px; padding: 4px 10px;">🟢 Connesso & Sincronizzato</span>';
      statusTitle = 'Sincronizzazione Live Attiva';
      statusDesc = 'Ogni movimento, conguaglio e saldo è allineato e sincronizzato in tempo reale con il tuo foglio Google Sheets.';
    }

    const modalHtml = `
      <div class="apple-modal-overlay open" id="apple-cloud-sync-modal" style="z-index: 99999;">
        <div class="apple-modal-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header-row" style="margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 113, 227, 0.12); color: var(--apple-blue); display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
              <div>
                <h3 style="font-size: 17px; font-weight: 600; margin: 0; color: var(--text-primary); letter-spacing: -0.015em;">Google Sheets Cloud</h3>
                <span style="font-size: 12px; color: var(--text-secondary);">${statusTitle}</span>
              </div>
            </div>
            <button class="apple-modal-close" id="btn-close-cloud-modal" aria-label="Chiudi">&times;</button>
          </div>

          <div style="margin-bottom: var(--space-box-gap-md); display: flex; justify-content: flex-start;">
            ${statusPill}
          </div>

          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.45; margin-bottom: var(--space-box-gap-lg);">
            ${statusDesc}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: var(--space-box-gap-lg);">
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Ultima Sincronizzazione</span>
              <strong style="font-size: 13px; color: var(--text-primary); font-variant-numeric: tabular-nums;">${lastSyncFormatted}</strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Modifiche in Coda</span>
              <strong style="font-size: 13px; color: ${pendingCount > 0 ? 'var(--apple-orange)' : 'var(--text-primary)'}; font-variant-numeric: tabular-nums;">
                ${pendingCount > 0 ? `${pendingCount} da inviare` : '0 (Allineato)'}
              </strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Movimenti Registrati</span>
              <strong style="font-size: 13px; color: var(--text-primary); font-variant-numeric: tabular-nums;">${txCount} movimenti</strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Conti Sincronizzati</span>
              <strong style="font-size: 13px; color: var(--text-primary); font-variant-numeric: tabular-nums;">${accCount} conti attivi</strong>
            </div>
          </div>

          <div id="cloud-modal-sync-feedback" style="display: none; padding: 10px 14px; border-radius: var(--radius-sm); font-size: 12.5px; margin-bottom: var(--space-box-gap-md);"></div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${isCfg ? `
              <button class="apple-btn-primary" id="btn-cloud-modal-sync" style="width: 100%; justify-content: center; height: 42px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" id="icon-sync-spin">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                <span>Sincronizza Ora</span>
              </button>
            ` : `
              <button class="apple-btn-primary" id="btn-cloud-modal-setup" style="width: 100%; justify-content: center; height: 42px;">
                <span>Configura Google Sheets</span>
              </button>
            `}
            
            <div style="display: flex; gap: 10px;">
              ${isCfg ? `
                <button class="apple-btn-secondary" id="btn-cloud-modal-share" style="flex: 1; justify-content: center;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  <span>Passa a iPhone</span>
                </button>
              ` : ''}
              <button class="apple-btn-secondary" id="btn-cloud-modal-settings" style="flex: 1; justify-content: center;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Impostazioni Cloud</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modalEl = document.getElementById('apple-cloud-sync-modal');

    const closeModal = () => {
      document.body.classList.remove('modal-open');
      modalEl?.classList.remove('open');
      setTimeout(() => modalEl?.remove(), 260);
    };

    modalEl?.querySelector('#btn-close-cloud-modal')?.addEventListener('click', closeModal);
    modalEl?.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal();
    });

    modalEl?.querySelector('#btn-cloud-modal-settings')?.addEventListener('click', () => {
      closeModal();
      this.switchTab('impostazioni', 'sheets');
    });

    modalEl?.querySelector('#btn-cloud-modal-setup')?.addEventListener('click', () => {
      closeModal();
      this.switchTab('impostazioni', 'sheets');
    });

    modalEl?.querySelector('#btn-cloud-modal-share')?.addEventListener('click', () => {
      closeModal();
      this.openShareConfigModal();
    });

    const btnSyncNow = modalEl?.querySelector('#btn-cloud-modal-sync');
    if (btnSyncNow) {
      btnSyncNow.addEventListener('click', async () => {
        const feedback = modalEl.querySelector('#cloud-modal-sync-feedback');
        const iconSpin = modalEl.querySelector('#icon-sync-spin');
        if (iconSpin) iconSpin.style.animation = 'appleCloudPulse 0.8s infinite ease-in-out';
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = 'rgba(0, 113, 227, 0.12)';
          feedback.style.color = 'var(--apple-blue)';
          feedback.style.border = '1px solid rgba(0, 113, 227, 0.3)';
          feedback.textContent = 'Sincronizzazione in corso con Google Sheets...';
        }

        try {
          const cloudData = await googleSheetsService.fetchAllData(true);
          if (iconSpin) iconSpin.style.animation = '';
          if (cloudData) {
            this.applyCloudData(cloudData);
            if (feedback) {
              feedback.style.background = 'rgba(52, 199, 89, 0.14)';
              feedback.style.color = 'var(--apple-green)';
              feedback.style.border = '1px solid rgba(52, 199, 89, 0.35)';
              const txs = cloudData.transactions ? cloudData.transactions.length : 0;
              const sld = cloudData.saldi ? cloudData.saldi.length : 0;
              feedback.textContent = `✅ Sincronizzazione completata! ${txs} movimenti e ${sld} saldi allineati.`;
            }
            setTimeout(() => closeModal(), 1400);
          } else {
            if (feedback) {
              feedback.style.background = 'rgba(255, 59, 48, 0.14)';
              feedback.style.color = 'var(--apple-red)';
              feedback.style.border = '1px solid rgba(255, 59, 48, 0.35)';
              feedback.textContent = '⚠️ Errore di sincronizzazione: verifica lo script o la connessione.';
            }
          }
        } catch (err) {
          if (iconSpin) iconSpin.style.animation = '';
          if (feedback) {
            feedback.style.background = 'rgba(255, 59, 48, 0.14)';
            feedback.style.color = 'var(--apple-red)';
            feedback.style.border = '1px solid rgba(255, 59, 48, 0.35)';
            feedback.textContent = 'Errore: ' + (err.message || err);
          }
        }
      });
    }
  }

  openShareConfigModal() {
    const existing = document.getElementById('apple-share-config-modal');
    if (existing) existing.remove();

    document.body.classList.add('modal-open');

    const cfg = googleSheetsService.getConfig();
    const currentOrigin = window.location.origin || '';
    const currentPath = window.location.pathname || '';
    const setupLink = `${currentOrigin}${currentPath}#cloud-setup?url=${encodeURIComponent(cfg.webAppUrl)}&token=${encodeURIComponent(cfg.securityToken)}`;

    const modalHtml = `
      <div class="apple-modal-overlay open" id="apple-share-config-modal" style="z-index: 100000;">
        <div class="apple-modal-sheet" style="max-width: 460px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header-row" style="margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(52, 199, 89, 0.12); color: var(--apple-green); display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <div>
                <h3 style="font-size: 17px; font-weight: 600; margin: 0; color: var(--text-primary);">Passa a iPhone (1-Click)</h3>
                <span style="font-size: 12px; color: var(--text-secondary);">Accoppiamento Rapido</span>
              </div>
            </div>
            <button class="apple-modal-close" id="btn-close-share-modal" aria-label="Chiudi">&times;</button>
          </div>

          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.45; margin-bottom: var(--space-box-gap-md);">
            Invia questo link al tuo iPhone (tramite <strong>AirDrop</strong>, <strong>Messaggi</strong> o <strong>WhatsApp</strong>). Aprendolo, l'app configurerà automaticamente l'URL e la chiave segreta senza digitare nulla a mano!
          </p>

          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; font-family: var(--font-mono); font-size: 11.5px; color: var(--apple-blue); word-break: break-all; max-height: 80px; overflow-y: auto; margin-bottom: var(--space-box-gap-md);">
            ${setupLink}
          </div>

          <div id="copy-link-feedback" style="display: none; padding: 8px 12px; border-radius: var(--radius-sm); background: rgba(52, 199, 89, 0.15); color: var(--apple-green); font-size: 12px; margin-bottom: var(--space-box-gap-md); text-align: center;">
            ✅ Link di configurazione copiato negli appunti!
          </div>

          <div style="display: flex; gap: 10px;">
            <button class="apple-btn-primary" id="btn-copy-setup-link" style="flex: 1; justify-content: center; height: 42px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copia Link Rapido</span>
            </button>
            <button class="apple-btn-secondary" id="btn-dismiss-share-modal">
              <span>Fatto</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modalEl = document.getElementById('apple-share-config-modal');

    const closeModal = () => {
      document.body.classList.remove('modal-open');
      modalEl?.classList.remove('open');
      setTimeout(() => modalEl?.remove(), 260);
    };

    modalEl?.querySelector('#btn-close-share-modal')?.addEventListener('click', closeModal);
    modalEl?.querySelector('#btn-dismiss-share-modal')?.addEventListener('click', closeModal);
    modalEl?.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal();
    });

    const btnCopy = modalEl?.querySelector('#btn-copy-setup-link');
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(setupLink);
          const fb = modalEl.querySelector('#copy-link-feedback');
          if (fb) fb.style.display = 'block';
          btnCopy.querySelector('span').textContent = 'Copiato!';
          setTimeout(() => {
            if (btnCopy.querySelector('span')) btnCopy.querySelector('span').textContent = 'Copia Link Rapido';
          }, 3000);
        } catch (e) {
          prompt('Copia manualmente questo link:', setupLink);
        }
      });
    }
  }

  handleQuickAddRoute() {
    const rawHash = window.location.hash || '';
    if (rawHash.includes('quick-add')) {
      const qIdx = rawHash.indexOf('?');
      const params = qIdx !== -1 ? new URLSearchParams(rawHash.slice(qIdx + 1)) : new URLSearchParams();
      const amount = params.get('amount') || params.get('importo');
      const desc = params.get('desc') || params.get('descrizione') || '';
      const cat = params.get('cat') || params.get('categoria') || '';
      const type = params.get('type') || params.get('tipo') || 'expense';
      const account = params.get('account') || params.get('conto') || 'Buddybank';

      try {
        history.replaceState(null, null, window.location.pathname + '#movimenti');
      } catch (e) {}

      this.switchTab('movimenti');
      setTimeout(() => {
        if (this.movimentiView) {
          this.movimentiView.openModal({
            amount: amount ? parseFloat(amount) : null,
            description: desc,
            category: cat,
            type: type,
            account: account
          });
        }
      }, 200);
    }
  }

  bindEvents() {
    const togglePrivacy = () => {
      const isNow = !financeStore.isPrivacyMode();
      financeStore.setPrivacyMode(isNow);
      document.body.classList.toggle('privacy-mode', isNow);
    };

    const dPrivacyBtn = document.getElementById('privacy-toggle-btn');
    if (dPrivacyBtn) dPrivacyBtn.addEventListener('click', togglePrivacy);

    const mPrivacyBtn = document.getElementById('mobile-privacy-toggle-btn');
    if (mPrivacyBtn) mPrivacyBtn.addEventListener('click', togglePrivacy);

    // Apple Intelligence Buttons (Header Desktop & Mobile)
    const dAiBtn = document.getElementById('desktop-ai-btn');
    if (dAiBtn) dAiBtn.addEventListener('click', () => this.switchTab('assistente'));

    const mAiBtn = document.getElementById('mobile-ai-btn');
    if (mAiBtn) mAiBtn.addEventListener('click', () => this.switchTab('assistente'));

    // Mobile Settings Gear Button
    const mSettingsBtn = document.getElementById('mobile-settings-btn');
    if (mSettingsBtn) mSettingsBtn.addEventListener('click', () => this.switchTab('impostazioni'));

    // Cloud Sync Buttons (Mobile & Desktop)
    const mCloudBtn = document.getElementById('mobile-cloud-sync-btn');
    if (mCloudBtn) mCloudBtn.addEventListener('click', () => this.openCloudSyncModal());

    const dCloudBtn = document.getElementById('desktop-sheet-status-btn');
    if (dCloudBtn) {
      dCloudBtn.addEventListener('click', () => this.openCloudSyncModal());
      dCloudBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openCloudSyncModal();
        }
      });
    }

    // Ascolto sincronizzazione cloud completata per allineamento reattivo
    window.addEventListener('finanze:sync-completed', (e) => {
      if (e.detail && e.detail.data) {
        this.applyCloudData(e.detail.data);
      }
    });

    // Ascolto aggiornamenti saldi conti in tempo reale per re-render reattivo
    window.addEventListener('finanze:accounts-updated', () => {
      const container = document.getElementById('main-viewport');
      if (!container) return;
      if (this.currentTab === 'dashboard') {
        this.dashboardView.render(container);
      } else if (this.currentTab === 'impostazioni') {
        this.impostazioniView.render(container);
      } else if (this.currentTab === 'investimenti') {
        this.investimentiView.render(container);
      }
    });

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    document.querySelectorAll('.mobile-tab-bar .mobile-tab-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });
  }

  switchTab(tabId, subtab = null) {
    if (!VIEWS[tabId]) return;
    this.currentTab = tabId;
    const viewData = VIEWS[tabId];

    if (subtab) {
      if (tabId === 'movimenti') this.movimentiView.activeSubtab = subtab;
      else if (tabId === 'investimenti') this.investimentiView.activeSubtab = subtab;
      else if (tabId === 'impostazioni') this.impostazioniView.activeSubtab = subtab;
    }

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.mobile-tab-bar .mobile-tab-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = viewData.title;
    if (subtitleEl) subtitleEl.textContent = viewData.subtitle;

    const targetHash = subtab ? `${tabId}-${subtab}` : tabId;
    if (window.location.hash.replace('#', '') !== targetHash) {
      window.location.hash = targetHash;
    }

    const container = document.getElementById('main-viewport');
    if (!container) return;

    container.scrollTop = 0;

    this.dashboardView.destroyCharts();
    this.investimentiView.destroyCharts();
    this.storicoView.destroyCharts();
    this.speseView.destroyCharts();

    if (tabId === 'dashboard') {
      this.dashboardView.render(container);
    } else if (tabId === 'spese') {
      this.speseView.render(container);
    } else if (tabId === 'assistente') {
      this.assistenteView.render(container);
    } else if (tabId === 'movimenti') {
      this.movimentiView.render(container);
    } else if (tabId === 'investimenti') {
      this.investimentiView.render(container);
    } else if (tabId === 'storico') {
      this.storicoView.render(container);
    } else if (tabId === 'impostazioni') {
      this.impostazioniView.render(container);
    }

    if (window.location.hash.includes('audit') || window.location.search.includes('audit')) {
      setTimeout(() => this.runLayoutAudit(), 100);
    }
  }

  runLayoutAudit() {
    try {
      const issues = [];
      const winW = window.innerWidth;
      const docScrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      if (docScrollW > winW + 2) {
        issues.push({
          type: 'HORIZONTAL_SCROLL',
          msg: `Page scrollWidth (${docScrollW}px) exceeds viewport (${winW}px)`
        });
      }

      document.querySelectorAll('body *').forEach(el => {
        if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

        const rect = el.getBoundingClientRect();
        if (rect.right > winW + 4 && !['svg', 'path', 'g', 'defs', 'clippath'].includes(el.tagName.toLowerCase())) {
          let parent = el.parentElement;
          let hasScrollParent = false;
          while (parent && parent !== document.body) {
            const pStyle = window.getComputedStyle(parent);
            if (pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll' || pStyle.overflowX === 'hidden') {
              hasScrollParent = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (!hasScrollParent) {
            issues.push({
              type: 'OVERFLOW_BOUNDS',
              tag: el.tagName.toLowerCase(),
              cls: el.className ? String(el.className).substring(0, 30) : '',
              right: Math.round(rect.right),
              winW: winW
            });
          }
        }
      });

      document.title = 'AUDIT:' + JSON.stringify({ winW, docScrollW, issuesCount: issues.length, issues });
    } catch(e) {}
  }

  renderDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formatted = now.toLocaleDateString('it-IT', options);
    dateEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.app = new AppController(); });
} else {
  window.app = new AppController();
}
