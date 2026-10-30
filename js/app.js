/**
 * Apple Design System - Personal Finance Web App
 * State Management & Navigation Controller
 */

import { DashboardView } from './components/dashboardView.js';
import { MovimentiView } from './components/movimentiView.js';
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
    const tabName = rawHash.split('-')[0].split('?')[0];
    const initialTab = VIEWS[tabName] ? tabName : 'dashboard';

    this.switchTab(initialTab);

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
          else if (this.currentTab === 'movimenti') this.movimentiView.render(container);
          else if (this.currentTab === 'investimenti') this.investimentiView.render(container);
          else if (this.currentTab === 'storico') this.storicoView.render(container);
        }
      }).catch(err => console.warn('Sync background:', err));
    }
  }

  bindEvents() {
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

  switchTab(tabId) {
    if (!VIEWS[tabId]) return;
    this.currentTab = tabId;
    const viewData = VIEWS[tabId];

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

    window.location.hash = tabId;

    const container = document.getElementById('main-viewport');
    if (!container) return;

    this.dashboardView.destroyCharts();
    this.investimentiView.destroyCharts();
    this.storicoView.destroyCharts();

    if (tabId === 'dashboard') {
      this.dashboardView.render(container);
    } else if (tabId === 'movimenti') {
      this.movimentiView.render(container);
    } else if (tabId === 'investimenti') {
      this.investimentiView.render(container);
    } else if (tabId === 'storico') {
      this.storicoView.render(container);
    } else if (tabId === 'impostazioni') {
      this.impostazioniView.render(container);
    }
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
