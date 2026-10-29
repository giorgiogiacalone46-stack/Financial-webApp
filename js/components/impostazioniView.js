/**
 * Apple Design System - Impostazioni (Settings) View Component
 * Configurazione Google Sheets ("Finanze-Movimenti"), Token di Sicurezza Privato e Test di Connessione
 */

import { googleSheetsService } from '../services/googleSheetsService.js';

export class ImpostazioniView {
  constructor() {}

  render(container) {
    const config = googleSheetsService.getConfig();

    container.innerHTML = `
      <div class="settings-layout">
        
        <!-- 1. Header Card: Stato e Sicurezza -->
        <section class="settings-card header-notice">
          <div class="settings-header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--apple-blue)" stroke-width="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div class="settings-header-text">
            <h3>Architettura Privata & 100% Gratuita</h3>
            <p>Questa web app comunica con il tuo foglio personale Google Sheets <strong>"Finanze-Movimenti"</strong> tramite una Web App serverless Google Apps Script. <strong>Nessun costo</strong>, nessun intermediario terzo, e accesso protetto da token segreto.</p>
          </div>
        </section>

        <!-- 2. Configurazione Google Sheets Web App -->
        <section class="settings-card">
          <div class="settings-card-header">
            <div>
              <h3>Parametri Connessione Google Sheets</h3>
              <p>Collega la Web App al tuo file "Finanze-Movimenti"</p>
            </div>
            <span class="settings-status-pill ${config.isConfigured ? 'connected' : 'pending'}">
              ${config.isConfigured ? 'Configurato' : 'In attesa URL'}
            </span>
          </div>

          <form class="settings-form" id="sheets-config-form" onsubmit="return false;">
            
            <div class="form-group">
              <label class="form-label" for="settings-gas-url">
                URL Applicazione Web (Google Apps Script)
              </label>
              <input 
                type="url" 
                id="settings-gas-url" 
                class="apple-input" 
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                value="${config.webAppUrl}"
                autocomplete="off"
                spellcheck="false"
              />
              <span class="field-hint">Generato dalla voce <em>Distribuisci > Nuova distribuzione > Applicazione web</em> nel tuo foglio Google.</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="settings-token">
                Chiave Segreta Personale (Security Token)
              </label>
              <div class="password-input-wrapper">
                <input 
                  type="password" 
                  id="settings-token" 
                  class="apple-input" 
                  placeholder="La tua chiave segreta impostata nello script"
                  value="${config.securityToken}"
                  autocomplete="off"
                />
                <button type="button" class="toggle-pwd-btn" id="toggle-pwd">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <span class="field-hint">Garantisce che <strong>solo tu</strong> possa inviare o leggere movimenti finanziari.</span>
            </div>

            <div class="settings-toggle-row">
              <div class="toggle-label-group">
                <strong>Sincronizzazione Automatica</strong>
                <span>Invia e riceve i movimenti automaticamente a ogni modifica</span>
              </div>
              <label class="apple-switch">
                <input type="checkbox" id="settings-autosync" ${config.autoSync ? 'checked' : ''} />
                <span class="switch-slider"></span>
              </label>
            </div>

            <!-- Action Buttons -->
            <div class="settings-actions">
              <button type="button" class="apple-btn-secondary" id="btn-test-connection">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>Verifica Connessione</span>
              </button>

              <button type="button" class="apple-btn-primary" id="btn-save-settings">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Salva Impostazioni</span>
              </button>
            </div>

            <!-- Feedback Message Banner -->
            <div class="settings-feedback-banner" id="settings-feedback" style="display: none;"></div>

          </form>
        </section>

        <!-- 3. Guida Rapida: Come installare lo script nel tuo Google Sheets -->
        <section class="settings-card">
          <div class="settings-card-header">
            <div>
              <h3>Guida di Installazione nel Foglio "Finanze-Movimenti"</h3>
              <p>Procedura guidata in 4 semplici passaggi gratuiti</p>
            </div>
            <button class="apple-btn-secondary" id="btn-copy-code" style="padding: 6px 14px; font-size: 12px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copia Codice Script</span>
            </button>
          </div>

          <div class="guide-steps-list">
            <div class="guide-step-item">
              <span class="step-num">1</span>
              <div>
                <strong>Apri il tuo foglio Google Sheets "Finanze-Movimenti"</strong>
                <p>Vai su <a href="https://sheets.google.com" target="_blank" rel="noopener">sheets.google.com</a> e apri il foglio di riferimento.</p>
              </div>
            </div>

            <div class="guide-step-item">
              <span class="step-num">2</span>
              <div>
                <strong>Apri l'editor di script</strong>
                <p>Nella barra dei menu del foglio clicca su <strong>Estensioni &gt; Apps Script</strong>.</p>
              </div>
            </div>

            <div class="guide-step-item">
              <span class="step-num">3</span>
              <div>
                <strong>Incolla il codice preparato</strong>
                <p>Cancella il codice predefinito, incolla lo script copiato con il pulsante in alto e personalizza il tuo <code>SECURITY_TOKEN</code>.</p>
              </div>
            </div>

            <div class="guide-step-item">
              <span class="step-num">4</span>
              <div>
                <strong>Distribuisci come Web App</strong>
                <p>Clicca su <strong>Esegui distribuzione &gt; Nuova distribuzione</strong>, scegli <em>Applicazione web</em>, imposta <em>Esegui come: Io</em>, <em>Chi ha accesso: Chiunque</em> e incolla l'URL generato nel campo sopra!</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    // Toggle Password visibility
    const pwdInput = document.getElementById('settings-token');
    const togglePwdBtn = document.getElementById('toggle-pwd');
    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.addEventListener('click', () => {
        const isPassword = pwdInput.type === 'password';
        pwdInput.type = isPassword ? 'text' : 'password';
      });
    }

    // Save Settings
    const saveBtn = document.getElementById('btn-save-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const url = document.getElementById('settings-gas-url')?.value || '';
        const token = document.getElementById('settings-token')?.value || '';
        const autoSync = document.getElementById('settings-autosync')?.checked;

        googleSheetsService.saveConfig(url, token, autoSync);
        this.showFeedback('Impostazioni salvate con successo!', 'success');
      });
    }

    // Test Connection
    const testBtn = document.getElementById('btn-test-connection');
    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        const url = document.getElementById('settings-gas-url')?.value || '';
        const token = document.getElementById('settings-token')?.value || '';
        
        // Salva momentaneamente prima del test
        googleSheetsService.saveConfig(url, token, true);

        testBtn.disabled = true;
        testBtn.innerHTML = `<span>Verifica in corso...</span>`;

        const result = await googleSheetsService.testConnection();

        testBtn.disabled = false;
        testBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Verifica Connessione</span>
        `;

        if (result.success) {
          this.showFeedback(result.message, 'success');
        } else {
          this.showFeedback(result.message, 'error');
        }
      });
    }

    // Copy Apps Script Code button
    const copyBtn = document.getElementById('btn-copy-code');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          const res = await fetch('google-apps-script/Code.gs');
          const code = await res.text();
          await navigator.clipboard.writeText(code);
          copyBtn.innerHTML = `<span>✓ Codice Copiato!</span>`;
          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copia Codice Script</span>
            `;
          }, 2500);
        } catch (err) {
          this.showFeedback('File Code.gs disponibile nella cartella google-apps-script/ del progetto.', 'info');
        }
      });
    }
  }

  showFeedback(message, type) {
    const banner = document.getElementById('settings-feedback');
    if (!banner) return;

    banner.className = `settings-feedback-banner ${type}`;
    banner.textContent = message;
    banner.style.display = 'block';

    setTimeout(() => {
      if (banner) banner.style.display = 'none';
    }, 6000);
  }
}
