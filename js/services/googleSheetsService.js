/**
 * Google Sheets API Service - Client Adattatore Reale
 */

import { APP_ENV } from '../config/environment.js';

const SHEETS_STORAGE_KEYS = {
  WEB_APP_URL: 'finanze_gas_url',
  SECURITY_TOKEN: 'finanze_gas_token',
  AUTO_SYNC: 'finanze_auto_sync',
  LAST_SYNC: 'finanze_last_sync',
  SANDBOX_MODE: 'finanze_sandbox_mode',
  SYNC_QUEUE: 'finanze_sync_queue'
};

export class GoogleSheetsService {
  constructor() {
    this.webAppUrl = localStorage.getItem(SHEETS_STORAGE_KEYS.WEB_APP_URL) || '';
    this.securityToken = localStorage.getItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN) || '';
    this.autoSync = localStorage.getItem(SHEETS_STORAGE_KEYS.AUTO_SYNC) !== 'false';
    this.isBeta = Boolean(APP_ENV.isBeta);

    // Sandbox Mode:
    // - In beta (R&D): Sandbox attiva di default per proteggere il database Google Sheets ufficiale da scritture accidentali.
    // - In main (produzione): Sincronizzazione live attiva di default.
    const storedSandbox = localStorage.getItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE);
    if (storedSandbox !== null) {
      this.sandboxMode = storedSandbox === 'true';
    } else {
      this.sandboxMode = Boolean(APP_ENV.defaultSandboxMode);
    }

    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.syncStatus = 'idle';
    this.isProcessingQueue = false;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => { 
        this.isOnline = true; 
        this.updateStatusBadge(); 
        this.processQueue();
      });
      window.addEventListener('offline', () => { 
        this.isOnline = false; 
        this.updateStatusBadge(); 
      });

      // Rinfresco automatico leggero in background quando l'app torna visibile (dopo standby o switch app)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.isOnline && this.isConfigured() && this.autoSync) {
          const last = localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC);
          const now = Date.now();
          if (!last || (now - new Date(last).getTime()) > 3 * 60 * 1000) {
            this.fetchAllData().catch(() => {});
          }
        }
      });

      // Tenta lo svuotamento automatico della coda offline all'avvio dopo breve pausa
      setTimeout(() => {
        if (this.isOnline && this.isConfigured()) {
          this.processQueue();
        }
      }, 1800);
    }
  }

  // === CODA DI SINCRONIZZAZIONE OFFLINE (LOCAL-FIRST) ===
  getQueue() {
    try {
      const saved = localStorage.getItem(SHEETS_STORAGE_KEYS.SYNC_QUEUE);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveQueue(queue) {
    try {
      localStorage.setItem(SHEETS_STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue || []));
    } catch (e) {}
  }

  enqueueOperation(action, payload) {
    const queue = this.getQueue();
    const item = {
      id: 'sq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      action,
      payload,
      createdAt: new Date().toISOString(),
      attempts: 0
    };
    queue.push(item);
    this.saveQueue(queue);
    this.updateStatusBadge();
    return item;
  }

  getPendingQueueCount() {
    return this.getQueue().length;
  }

  async processQueue() {
    if (this.isProcessingQueue || !this.isOnline || !this.isConfigured() || this.sandboxMode) return;
    const queue = this.getQueue();
    if (!queue || queue.length === 0) return;

    this.isProcessingQueue = true;
    this.syncStatus = 'syncing';
    this.updateStatusBadge();

    const remaining = [];
    for (const item of queue) {
      try {
        const bodyPayload = {
          action: item.action,
          token: this.securityToken,
          ...item.payload
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(this.webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(bodyPayload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const res = await response.json();
        if (res.status !== 'success') {
          item.attempts = (item.attempts || 0) + 1;
          if (item.attempts < 5) remaining.push(item);
        }
      } catch (err) {
        console.warn('Errore processamento elemento coda:', err);
        item.attempts = (item.attempts || 0) + 1;
        remaining.push(item);
        // Interrompi se la connessione è caduta
        if (!navigator.onLine) break;
      }
    }

    this.saveQueue(remaining);
    this.isProcessingQueue = false;
    this.syncStatus = remaining.length === 0 ? 'connected' : 'idle';
    localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    this.updateStatusBadge();
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

  sanitizeUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    let url = rawUrl.trim();
    if (url.includes('/edit')) {
      url = url.replace(/\/edit(\?.*)?$/, '/exec');
    }
    return url;
  }

  saveConfig(url, token, autoSync = true, sandboxMode = this.sandboxMode) {
    this.webAppUrl = this.sanitizeUrl(url);
    this.securityToken = (token || '').trim();
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

  async testConnection(customUrl = null, customToken = null) {
    const urlToCheck = this.sanitizeUrl(customUrl || this.webAppUrl);
    const tokenToCheck = (customToken !== null ? customToken : this.securityToken).trim();

    if (!urlToCheck) {
      return { success: false, message: 'Inserisci l\'URL della Web App di Google Apps Script.' };
    }

    if (urlToCheck.includes('docs.google.com/spreadsheets/')) {
      return { 
        success: false, 
        message: '⚠️ Questo è il link del foglio Google Sheets, non della Web App! Clicca su Estensioni > Apps Script > Distribuisci > Nuova distribuzione (tipo Web App) e copia il link che termina con /exec.' 
      };
    }

    if (!urlToCheck.startsWith('https://script.google.com/macros/s/')) {
      return { 
        success: false, 
        message: 'URL non valido: deve iniziare con "https://script.google.com/macros/s/" e terminare con "/exec".' 
      };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(urlToCheck);
      targetUrl.searchParams.set('action', 'getAllData');
      if (tokenToCheck) {
        targetUrl.searchParams.set('token', tokenToCheck);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const text = await response.text();
      let res;

      try {
        res = JSON.parse(text);
      } catch (parseErr) {
        if (text.includes('accounts.google.com') || text.includes('ServiceLogin') || text.includes('<!DOCTYPE html>')) {
          this.syncStatus = 'error';
          this.updateStatusBadge();
          return {
            success: false,
            message: '🚫 Permessi Google insufficienti: lo script richiede l\'accesso account. Vai su Apps Script > Gestisci distribuzioni > Modifica e imposta "Chi ha accesso" su "Chiunque" (il foglio rimane protetto dal tuo Security Token personale).'
          };
        }
        this.syncStatus = 'error';
        this.updateStatusBadge();
        return { success: false, message: 'Risposta non valida dallo script Google Apps Script.' };
      }

      if (res.status === 'success') {
        this.syncStatus = 'connected';
        if (customUrl) this.webAppUrl = urlToCheck;
        if (customToken !== null) this.securityToken = tokenToCheck;
        localStorage.setItem(SHEETS_STORAGE_KEYS.WEB_APP_URL, this.webAppUrl);
        localStorage.setItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN, this.securityToken);
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();

        const txCount = res.data && res.data.transactions ? res.data.transactions.length : (res.count || 0);
        const saldiCount = res.data && res.data.saldi ? res.data.saldi.length : 0;
        return {
          success: true,
          message: `✅ Connessione stabilita con "${res.sheetName || 'Finanze - Movimenti'}"! Trovati ${txCount} movimenti e ${saldiCount} saldi verificati.`,
          data: res.data
        };
      } else {
        this.syncStatus = 'error';
        this.updateStatusBadge();
        const msg = res.message || '';
        if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('accesso negato')) {
          return { success: false, message: '🔑 Token di sicurezza non valido: verifica che il Security Token inserito qui sia identico a quello configurato nel file Code.gs.' };
        }
        return { success: false, message: msg || 'Errore di risposta dallo script.' };
      }
    } catch (err) {
      this.syncStatus = 'error';
      this.updateStatusBadge();
      if (err.name === 'AbortError') {
        return { success: false, message: '⏱️ Timeout connessione (12s): Google Apps Script sta impiegando troppo tempo ad avviarsi (cold start). Riprova tra pochi istanti.' };
      }
      return { success: false, message: 'Impossibile contattare lo script: ' + (err.message || 'Verifica la connessione internet e l\'URL della Web App.') };
    }
  }

  async fetchAllData() {
    if (!this.isConfigured()) return null;

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.sanitizeUrl(this.webAppUrl));
      targetUrl.searchParams.set('action', 'getAllData');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(targetUrl.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);

      const res = await response.json();

      if (res.status === 'success' && res.data) {
        this.syncStatus = 'connected';
        const nowIso = new Date().toISOString();
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, nowIso);
        this.updateStatusBadge();
        if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
          window.dispatchEvent(new CustomEvent('finanze:sync-completed', { detail: { data: res.data, timestamp: nowIso } }));
        }
        return res.data;
      }
      throw new Error(res.message || 'Risposta non valida');
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

    // Se offline, accoda subito per zero attese
    if (!this.isOnline) {
      this.enqueueOperation('addTransaction', { transaction });
      return { success: true, queued: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'addTransaction',
        token: this.securityToken,
        transaction: transaction
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true, rowNumber: res.rowNumber };
      }
      throw new Error(res.message);
    } catch (err) {
      console.warn('Network non disponibile o timeout push, accodamento offline automatico:', err.message);
      this.enqueueOperation('addTransaction', { transaction });
      this.syncStatus = 'idle';
      this.updateStatusBadge();
      return { success: true, queued: true };
    }
  }

  async updateTransaction(rowNumber, transaction) {
    if (this.sandboxMode) {
      console.log('🛡️ [Sandbox] Aggiornamento remoto bloccato.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured() || !rowNumber) return { success: true, localOnly: true };

    if (!this.isOnline) {
      this.enqueueOperation('updateTransaction', { rowNumber, transaction });
      return { success: true, queued: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'updateTransaction',
        token: this.securityToken,
        rowNumber: rowNumber,
        transaction: transaction
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true };
      }
      throw new Error(res.message);
    } catch (err) {
      console.warn('Update non riuscito, accodamento offline automatico:', err.message);
      this.enqueueOperation('updateTransaction', { rowNumber, transaction });
      this.syncStatus = 'idle';
      this.updateStatusBadge();
      return { success: true, queued: true };
    }
  }

  async deleteTransaction(rowNumber) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Eliminazione remota bloccata: cancellazione solo locale fittizia.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured()) return { success: true, localOnly: true };

    if (!this.isOnline) {
      this.enqueueOperation('deleteTransaction', { rowNumber });
      return { success: true, queued: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'deleteTransaction',
        token: this.securityToken,
        rowNumber: rowNumber
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      this.syncStatus = 'connected';
      this.updateStatusBadge();
      return { success: res.status === 'success' };
    } catch (err) {
      console.warn('Delete non riuscito, accodamento offline automatico:', err.message);
      this.enqueueOperation('deleteTransaction', { rowNumber });
      this.syncStatus = 'idle';
      this.updateStatusBadge();
      return { success: true, queued: true };
    }
  }

  async updateAccountBalance(accountName, balance, type) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Aggiornamento saldo remoto bloccato: conguaglio solo locale fittizio.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured()) return { success: true, localOnly: true };

    if (!this.isOnline) {
      this.enqueueOperation('updateAccountBalance', { accountName, balance, type });
      return { success: true, queued: true };
    }

    try {
      const payload = {
        action: 'updateAccountBalance',
        token: this.securityToken,
        accountName: accountName,
        balance: balance,
        type: type
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      return { success: res.status === 'success' };
    } catch (err) {
      console.warn('Update account balance offline, accodamento:', err.message);
      this.enqueueOperation('updateAccountBalance', { accountName, balance, type });
      return { success: true, queued: true };
    }
  }

  updateStatusBadge() {
    const indicatorEl = document.querySelector('.sheet-status-indicator');
    const nameEl = document.querySelector('.sheet-status-name');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');
    const mobileText = document.querySelector('.mobile-sheet-pill span:not(.dot)');
    const cloudSyncDot = document.querySelector('.cloud-sync-dot');
    const cloudSyncBtn = document.querySelector('.cloud-sync-btn');

    const pendingCount = this.getPendingQueueCount();

    // Notifica ad altri componenti dell'interfaccia
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('finanze:sync-status-changed', {
        detail: {
          status: this.syncStatus,
          isConfigured: this.isConfigured(),
          pendingQueue: pendingCount,
          lastSync: localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC),
          sandboxMode: this.sandboxMode
        }
      }));
    }

    if (!indicatorEl || !descEl) return;

    if (pendingCount > 0 && this.syncStatus !== 'syncing') {
      indicatorEl.style.backgroundColor = '#0A84FF';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(10, 132, 255, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = `☁️ ${pendingCount} in coda offline`;
      if (mobilePill) mobilePill.style.backgroundColor = '#0A84FF';
      if (mobileText) mobileText.textContent = `Coda (${pendingCount})`;
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot queued';
        cloudSyncDot.style.backgroundColor = '#0A84FF';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = `Cloud: ${pendingCount} modifiche in coda offline`;
      return;
    }

    if (this.sandboxMode) {
      indicatorEl.style.backgroundColor = '#FF9500';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 149, 0, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze (Sandbox)';
      descEl.textContent = '🛡️ Sandbox Protetto';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF9500';
      if (mobileText) mobileText.textContent = '🛡️ Sandbox';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot sandbox';
        cloudSyncDot.style.backgroundColor = '#FF9500';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Modalità Sandbox attiva';
      return;
    }

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#8E8E93';
      indicatorEl.style.boxShadow = '0 0 0 2px rgba(142, 142, 147, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze (Locale)';
      descEl.textContent = '📱 Solo su questo dispositivo';
      if (mobilePill) mobilePill.style.backgroundColor = '#8E8E93';
      if (mobileText) mobileText.textContent = 'Locale';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot local';
        cloudSyncDot.style.backgroundColor = '#8E8E93';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud Google Sheets non configurato (Dati locali)';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
      if (mobileText) mobileText.textContent = 'Sync...';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot syncing';
        cloudSyncDot.style.backgroundColor = '#0071E3';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Sincronizzazione in corso...';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Connesso Live';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
      if (mobileText) mobileText.textContent = 'Connesso';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot connected';
        cloudSyncDot.style.backgroundColor = '#34C759';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Sincronizzato con Google Sheets';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
      if (mobileText) mobileText.textContent = 'Offline';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot error';
        cloudSyncDot.style.backgroundColor = '#FF3B30';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Errore di connessione a Google Sheets';
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
