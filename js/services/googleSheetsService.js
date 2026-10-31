/**
 * Google Sheets API Service - Client Adattatore Reale
 */

import { APP_ENV } from '../config/environment.js';

const SHEETS_STORAGE_KEYS = {
  WEB_APP_URL: 'finanze_gas_url',
  SECURITY_TOKEN: 'finanze_gas_token',
  AUTO_SYNC: 'finanze_auto_sync',
  LAST_SYNC: 'finanze_last_sync',
  SANDBOX_MODE: 'finanze_sandbox_mode'
};

export class GoogleSheetsService {
  constructor() {
    this.webAppUrl = localStorage.getItem(SHEETS_STORAGE_KEYS.WEB_APP_URL) || '';
    this.securityToken = localStorage.getItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN) || '';
    this.autoSync = localStorage.getItem(SHEETS_STORAGE_KEYS.AUTO_SYNC) !== 'false';

    // Sincronizzazione Reale: Se l'utente configura la Web App di Google Apps Script,
    // la sincronizzazione cloud deve essere SEMPRE attiva e prioritaria sia da PC che da Smartphone.
    // La Sandbox è disattivata di default in modo che nessuna modifica vada persa in locale.
    const storedSandbox = localStorage.getItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE);
    if (storedSandbox !== null) {
      this.sandboxMode = storedSandbox === 'true';
    } else {
      this.sandboxMode = false; // Sempre falso di default: sincronizzazione live reale attiva!
    }

    this.isOnline = navigator.onLine;
    this.syncStatus = 'idle';

    window.addEventListener('online', () => { this.isOnline = true; this.updateStatusBadge(); });
    window.addEventListener('offline', () => { this.isOnline = false; this.updateStatusBadge(); });
  }

  isSandboxMode() {
    return this.sandboxMode;
  }

  setSandboxMode(val) {
    this.sandboxMode = Boolean(val);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE, this.sandboxMode ? 'true' : 'false');
    this.updateStatusBadge();
  }

  isConfigured() {
    return Boolean(this.webAppUrl && this.webAppUrl.startsWith('https://script.google.com/macros/s/'));
  }

  saveConfig(url, token, autoSync = true, sandboxMode = this.sandboxMode) {
    this.webAppUrl = url.trim();
    this.securityToken = token.trim();
    this.autoSync = autoSync;
    this.sandboxMode = Boolean(sandboxMode);

    localStorage.setItem(SHEETS_STORAGE_KEYS.WEB_APP_URL, this.webAppUrl);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN, this.securityToken);
    localStorage.setItem(SHEETS_STORAGE_KEYS.AUTO_SYNC, this.autoSync);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE, this.sandboxMode ? 'true' : 'false');

    this.updateStatusBadge();
  }

  getConfig() {
    return {
      webAppUrl: this.webAppUrl,
      securityToken: this.securityToken,
      autoSync: this.autoSync,
      sandboxMode: this.sandboxMode,
      isConfigured: this.isConfigured(),
      lastSync: localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC)
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
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
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
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
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
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Scrittura bloccata: la modifica resta solo fittizia sul dispositivo e NON intacca Google Sheets.');
      return { success: true, localOnly: true, sandbox: true };
    }

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
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
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

  async updateTransaction(rowNumber, transaction) {
    if (this.sandboxMode) {
      console.log('🛡️ [Sandbox] Aggiornamento remoto bloccato.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured() || !rowNumber) return { success: true, localOnly: true };

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'updateTransaction',
        token: this.securityToken,
        rowNumber: rowNumber,
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
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true };
      }
      throw new Error(res.message);
    } catch (err) {
      console.error('Errore modifica su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  async deleteTransaction(rowNumber) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Eliminazione remota bloccata: cancellazione solo locale fittizia.');
      return { success: true, localOnly: true, sandbox: true };
    }

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
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Aggiornamento saldo remoto bloccato: conguaglio solo locale fittizio.');
      return { success: true, localOnly: true, sandbox: true };
    }

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
    const nameEl = document.querySelector('.sheet-status-name');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');
    const mobileText = document.querySelector('.mobile-sheet-pill span:not(.dot)');

    if (!indicatorEl || !descEl) return;

    if (this.sandboxMode) {
      indicatorEl.style.backgroundColor = '#FF9500';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 149, 0, 0.25)';
      if (nameEl) nameEl.textContent = this.isBeta ? 'Finanze (Beta Sandbox)' : 'Finanze (Sandbox)';
      descEl.textContent = this.isBeta ? '🛡️ Database Protetto' : '🛡️ Sandbox Protetto';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF9500';
      if (mobileText) mobileText.textContent = '🛡️ Sandbox';
      return;
    }

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Dati Locali';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
      if (mobileText) mobileText.textContent = 'Finanze';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
      if (mobileText) mobileText.textContent = 'Sync...';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Connesso Live';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
      if (mobileText) mobileText.textContent = 'Connesso';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
      if (mobileText) mobileText.textContent = 'Offline';
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
