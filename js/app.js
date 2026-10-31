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
    subtitle: 'Allocazione asset, XEON, VWCE & Pensione'
  },
  storico: {
    id: 'storico',
    title: 'Storico Patrimonio',
    subtitle: 'Evoluzione Net Worth 2024 - 2026'
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

    lockEl.querySelectorAll('.pin-key').forEach(key => {
      key.onclick = () => {
        const val = key.dataset.val;
        if (val === 'back') {
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
        }
        this.switchTab(curTab, curSub);
      }
    });

    // Auto-sync al boot se configurato
    if (googleSheetsService.isConfigured() && googleSheetsService.autoSync) {
      googleSheetsService.fetchAllData().then(data => {
        if (data && data.transactions && data.transactions.length > 0) {
          financeStore.setTransactions(data.transactions);
          if (data.saldi) {
            data.saldi.forEach(s => {
              financeStore.updateAccountBalance(s.name, s.balance);
            });
          }
          const container = document.getElementById('main-viewport');
          if (this.currentTab === 'dashboard') this.dashboardView.render(container);
          else if (this.currentTab === 'spese') this.speseView.render(container);
          else if (this.currentTab === 'assistente') this.assistenteView.render(container);
          else if (this.currentTab === 'movimenti') this.movimentiView.render(container);
          else if (this.currentTab === 'investimenti') this.investimentiView.render(container);
          else if (this.currentTab === 'storico') this.storicoView.render(container);
        }
      }).catch(err => console.warn('Sync background:', err));
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
