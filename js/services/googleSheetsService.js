/**
 * Google Sheets API Service - Client Adattatore per Google Apps Script Web App
 * 
 * Garantisce:
 * 1. 100% Gratuito (Google Apps Script è incluso gratis con qualsiasi account Google)
 * 2. 100% Privato (Solo chi possiede il Security Token configurato può leggere/scrivere)
 * 3. Fallback locale automatico se offline o se il Webhook non è ancora configurato
 */

const STORAGE_KEYS = {
  WEB_APP_URL: 'finanze_gas_url',
  SECURITY_TOKEN: 'finanze_gas_token',
  AUTO_SYNC: 'finanze_auto_sync',
  LAST_SYNC: 'finanze_last_sync'
};

export class GoogleSheetsService {
  constructor() {
    this.webAppUrl = localStorage.getItem(STORAGE_KEYS.WEB_APP_URL) || '';
    this.securityToken = localStorage.getItem(STORAGE_KEYS.SECURITY_TOKEN) || '';
    this.autoSync = localStorage.getItem(STORAGE_KEYS.AUTO_SYNC) !== 'false';
    this.isOnline = navigator.onLine;
    this.syncStatus = 'idle'; // 'idle' | 'syncing' | 'connected' | 'error' | 'local_only'

    window.addEventListener('online', () => { this.isOnline = true; this.updateStatusBadge(); });
    window.addEventListener('offline', () => { this.isOnline = false; this.updateStatusBadge(); });
  }

  isConfigured() {
    return Boolean(this.webAppUrl && this.webAppUrl.startsWith('https://script.google.com/macros/s/'));
  }

  saveConfig(url, token, autoSync = true) {
    this.webAppUrl = url.trim();
    this.securityToken = token.trim();
    this.autoSync = autoSync;

    localStorage.setItem(STORAGE_KEYS.WEB_APP_URL, this.webAppUrl);
    localStorage.setItem(STORAGE_KEYS.SECURITY_TOKEN, this.securityToken);
    localStorage.setItem(STORAGE_KEYS.AUTO_SYNC, this.autoSync);

    this.updateStatusBadge();
  }

  getConfig() {
    return {
      webAppUrl: this.webAppUrl,
      securityToken: this.securityToken,
      autoSync: this.autoSync,
      isConfigured: this.isConfigured(),
      lastSync: localStorage.getItem(STORAGE_KEYS.LAST_SYNC)
    };
  }

  /**
   * Test di connessione con il foglio Google Sheets
   */
  async testConnection() {
    if (!this.isConfigured()) {
      return { success: false, message: 'URL Web App di Google Apps Script non configurato.' };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.webAppUrl);
      targetUrl.searchParams.set('action', 'getTransactions');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }

      const response = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      const res = await response.json();

      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return {
          success: true,
          message: `Connesso con successo al foglio "${res.sheetName || 'Finanze-Movimenti'}"! (${res.count} movimenti trovati)`,
          data: res.data
        };
      } else {
        this.syncStatus = 'error';
        this.updateStatusBadge();
        return { success: false, message: res.message || 'Errore di risposta dallo script.' };
      }
    } catch (err) {
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, message: 'Impossibile contattare lo script. Verifica l\'URL della Web App e i permessi.' };
    }
  }

  /**
   * Legge tutte le transazioni dal foglio Google Sheets
   */
  async fetchTransactions() {
    if (!this.isConfigured()) {
      return null; // Usa fallback locale
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.webAppUrl);
      targetUrl.searchParams.set('action', 'getTransactions');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }

      const response = await fetch(targetUrl.toString());
      const res = await response.json();

      if (res.status === 'success' && Array.isArray(res.data)) {
        this.syncStatus = 'connected';
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      console.warn('Sync Google Sheets non riuscita, uso cache locale:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return null;
    }
  }

  /**
   * Invia un nuovo movimento al foglio Google Sheets
   */
  async pushTransaction(transaction) {
    if (!this.isConfigured()) {
      return { success: true, localOnly: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'addTransaction',
        token: this.securityToken,
        transaction: transaction
      };

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // Evita preflight CORS con Google Apps Script
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true, transactionId: res.transactionId };
      }
      throw new Error(res.message);
    } catch (err) {
      console.error('Errore scrittura su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  /**
   * Elimina un movimento dal foglio Google Sheets
   */
  async deleteTransaction(id) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'deleteTransaction',
        token: this.securityToken,
        id: id
      };

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      this.syncStatus = 'connected';
      this.updateStatusBadge();
      return { success: res.status === 'success' };
    } catch (err) {
      console.error('Errore eliminazione su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  updateStatusBadge() {
    const indicatorEl = document.querySelector('.sheet-status-indicator');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');

    if (!indicatorEl || !descEl) return;

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#FF9500'; // Arancione = Locale / In attesa URL
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 149, 0, 0.2)';
      descEl.textContent = 'Modalità Locale (Pronto)';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF9500';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3'; // Blu = Sincronizzazione in corso
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759'; // Verde = Connesso e protetto
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      descEl.textContent = 'Protetto & Sincronizzato';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30'; // Rosso = Errore o offline
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
