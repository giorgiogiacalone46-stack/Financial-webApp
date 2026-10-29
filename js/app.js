/**
 * Apple Design System - Personal Finance Web App
 * State Management & Navigation Controller
 */

import { DashboardView } from './components/dashboardView.js';
import { MovimentiView } from './components/movimentiView.js';
import { InvestimentiView } from './components/investimentiView.js';
import { ImpostazioniView } from './components/impostazioniView.js';
import { googleSheetsService } from './services/googleSheetsService.js';
import { mockFinancialData } from './data/mockData.js';

// View Configuration and Descriptions
const VIEWS = {
  dashboard: {
    id: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Panoramica finanziaria e indicatori chiave'
  },
  movimenti: {
    id: 'movimenti',
    title: 'Movimenti',
    subtitle: 'Registro completo delle transazioni',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"></path>
           </svg>`,
    badge: 'Blocco 3: Prossimo step',
    description: 'Tabella interattiva dei movimenti con filtri avanzati per categoria, date, entrate/uscite e modulo per aggiungere nuove transazioni sincronizzate sul foglio Finanze-Movimenti.'
  },
  investimenti: {
    id: 'investimenti',
    title: 'Investimenti',
    subtitle: 'Portafoglio, allocazione asset e rendimenti',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
             <polyline points="16 7 22 7 22 13"></polyline>
           </svg>`,
    badge: 'Sezione Dedicata (Blocco 4)',
    description: 'Vista interamente dedicata al patrimonio investito: PAC (Piani di Accumulo), ETF, Azioni, rendimenti percentuali (TWR/MWR), dividendi e asset allocation visiva.'
  },
  impostazioni: {
    id: 'impostazioni',
    title: 'Impostazioni',
    subtitle: 'Configurazione Google Sheets e preferenze',
    icon: `<svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="3"></circle>
             <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
           </svg>`,
    badge: 'Connessione API & Scheda',
    description: 'Gestione ID del foglio Google Sheets ("Finanze-Movimenti"), parametri di sincronizzazione, credenziali e opzioni di visualizzazione valuta.'
  }
};

class AppController {
  constructor() {
    this.currentTab = 'dashboard';
    this.dashboardView = new DashboardView();
    this.movimentiView = new MovimentiView();
    this.investimentiView = new InvestimentiView();
    this.impostazioniView = new ImpostazioniView();
    this.init();
  }

  init() {
    this.bindEvents();
    this.renderDate();
    googleSheetsService.updateStatusBadge();

    // Support hash-based routing for deep linking
    const rawHash = window.location.hash.replace('#', '');
    const isNewModal = rawHash.includes('nuovo') || rawHash.includes('modal');
    const tabName = rawHash.split('-')[0].split('?')[0];
    const initialTab = VIEWS[tabName] ? tabName : 'dashboard';

    this.switchTab(initialTab);

    if (isNewModal && initialTab === 'movimenti') {
      setTimeout(() => {
        this.movimentiView.openModal(document.getElementById('main-viewport'));
      }, 200);
    }

    // Auto-sync con Google Sheets al boot se configurato
    if (googleSheetsService.isConfigured() && googleSheetsService.autoSync) {
      googleSheetsService.fetchTransactions().then(remoteTxs => {
        if (remoteTxs && Array.isArray(remoteTxs) && remoteTxs.length > 0) {
          mockFinancialData.setTransactions(remoteTxs);
          const container = document.getElementById('main-viewport');
          if (this.currentTab === 'dashboard') {
            this.dashboardView.render(container);
          } else if (this.currentTab === 'movimenti') {
            this.movimentiView.render(container);
          }
        }
      }).catch(err => {
        console.warn('Avviso: sincronizzazione automatica iniziale fallita:', err);
      });
    }
  }

  bindEvents() {
    // Desktop Sidebar Navigation
    const desktopNavButtons = document.querySelectorAll('.sidebar-nav .nav-item');
    desktopNavButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Mobile Bottom Tab Bar Navigation
    const mobileNavButtons = document.querySelectorAll('.mobile-tab-bar .mobile-tab-item');
    mobileNavButtons.forEach(btn => {
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

    // Update Desktop Sidebar Active States
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update Mobile Tab Bar Active States
    document.querySelectorAll('.mobile-tab-bar .mobile-tab-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update Header
    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = viewData.title;
    if (subtitleEl) subtitleEl.textContent = viewData.subtitle;

    // Update hash for deep linking
    window.location.hash = tabId;

    const container = document.getElementById('main-viewport');
    if (!container) return;

    // View Routing
    if (tabId === 'dashboard') {
      this.dashboardView.render(container);
    } else if (tabId === 'movimenti') {
      this.dashboardView.destroyCharts();
      this.investimentiView.destroyCharts();
      this.movimentiView.render(container);
    } else if (tabId === 'investimenti') {
      this.dashboardView.destroyCharts();
      this.investimentiView.render(container);
    } else if (tabId === 'impostazioni') {
      this.dashboardView.destroyCharts();
      this.investimentiView.destroyCharts();
      this.impostazioniView.render(container);
    } else {
      this.dashboardView.destroyCharts();
      this.investimentiView.destroyCharts();
      this.renderPlaceholderView(container, viewData);
    }
  }

  renderPlaceholderView(container, viewData) {
    container.innerHTML = `
      <div class="empty-view-container">
        <div class="empty-state-card">
          <div class="empty-state-icon">
            ${viewData.icon}
          </div>
          <h2>${viewData.title}</h2>
          <p>${viewData.description}</p>
          <div class="empty-state-badge">
            <span class="sheet-status-indicator" style="width:6px;height:6px;"></span>
            ${viewData.badge}
          </div>
        </div>
      </div>
    `;
  }

  renderDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formatted = now.toLocaleDateString('it-IT', options);
    // Capitalize first letter
    dateEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}

// Bootstrap (handles cases where DOM is already loaded)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
  });
} else {
  window.app = new AppController();
}
