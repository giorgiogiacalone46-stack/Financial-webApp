/**
 * Google Sheets API Service - Client Adattatore Reale
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
    this.syncStatus = 'idle';

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

  async testConnection() {
    if (!this.isConfigured()) {
      return { success: false, message: 'URL Web App di Google Apps Script non configurato.' };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.webAppUrl);
      targetUrl.searchParams.set('action', 'getAllData');
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
        const txCount = res.data && res.data.transactions ? res.data.transactions.length : (res.count || 0);
        return {
          success: true,
          message: `Connesso con successo al foglio "${res.sheetName || 'Finanze - Movimenti'}"! (${txCount} movimenti e saldi verificati)`,
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

  async fetchAllData() {
    if (!this.isConfigured()) return null;

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.webAppUrl);
      targetUrl.searchParams.set('action', 'getAllData');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }

      const response = await fetch(targetUrl.toString());
      const res = await response.json();

      if (res.status === 'success' && res.data) {
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

  async pushTransaction(transaction) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

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
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true, rowNumber: res.rowNumber };
      }
      throw new Error(res.message);
    } catch (err) {
      console.error('Errore scrittura su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  async deleteTransaction(rowNumber) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'deleteTransaction',
        token: this.securityToken,
        rowNumber: rowNumber
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

  async updateAccountBalance(accountName, balance, type) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

    try {
      const payload = {
        action: 'updateAccountBalance',
        token: this.securityToken,
        accountName: accountName,
        balance: balance,
        type: type
      };

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      return { success: res.status === 'success' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  updateStatusBadge() {
    const indicatorEl = document.querySelector('.sheet-status-indicator');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');

    if (!indicatorEl || !descEl) return;

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#34C759'; // Pronto con dati locali
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      descEl.textContent = 'Dati Sincronizzati (Reali)';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      descEl.textContent = 'Protetto & Connesso Live';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
