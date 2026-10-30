/**
 * Apple Design System - Impostazioni & Configurazione Completa
 * - Gestione Conti & Saldi Iniziali (Aggiunta, modifica, rimozione)
 * - Gestione Categorie di Spesa/Entrata (Aggiunta, rimozione)
 * - Sicurezza: PIN di Accesso Apple a 4 cifre
 * - Connessione Google Sheets (Web App URL, Security Token)
 */

import { financeStore } from '../data/mockData.js';
import { googleSheetsService } from '../services/googleSheetsService.js';

export class ImpostazioniView {
  constructor() {
    this.activeSubtab = 'conti'; // 'conti' | 'categorie' | 'sicurezza' | 'sheets'
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(value || 0);
  }

  render(container) {
    const config = googleSheetsService.getConfig();
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const isPinActive = financeStore.isPinEnabled();

    container.innerHTML = `
      <div class="impostazioni-layout">

        <!-- Sotto-navigazione Cupertino Tabs -->
        <div class="settings-subtabs-nav">
          <button class="settings-subtab-btn ${this.activeSubtab === 'conti' ? 'active' : ''}" data-subtab="conti">
            <span>🏦 Conti & Saldi</span>
          </button>
          <button class="settings-subtab-btn ${this.activeSubtab === 'categorie' ? 'active' : ''}" data-subtab="categorie">
            <span>🏷️ Categorie</span>
          </button>
          <button class="settings-subtab-btn ${this.activeSubtab === 'sicurezza' ? 'active' : ''}" data-subtab="sicurezza">
            <span>🔒 Sicurezza PIN</span>
          </button>
          <button class="settings-subtab-btn ${this.activeSubtab === 'sheets' ? 'active' : ''}" data-subtab="sheets">
            <span>☁️ Google Sheets</span>
          </button>
        </div>

        <!-- 1. GESTIONE CONTI & SALDI -->
        ${this.activeSubtab === 'conti' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Gestione Conti & Saldi Iniziali</h3>
                <span class="card-subtitle">Aggiungi, modifica o aggiorna i saldi dei tuoi conti e asset</span>
              </div>
              <button class="apple-btn-secondary" id="btn-add-account-modal">+ Nuovo Conto</button>
            </div>

            <div class="accounts-manager-list">
              ${accounts.map(acc => `
                <div class="account-manager-row" data-id="${acc.id}">
                  <div class="acc-row-info">
                    <span class="acc-name">${acc.name}</span>
                    <span class="acc-type-pill">${acc.type}</span>
                  </div>
                  <div class="acc-row-actions">
                    <input type="number" step="0.01" class="apple-input acc-balance-input" value="${acc.balance}" data-id="${acc.id}" />
                    <button class="apple-btn-save-inline" data-id="${acc.id}">Aggiorna</button>
                    <button class="apple-btn-delete-inline" data-id="${acc.id}" title="Rimuovi">&times;</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 2. GESTIONE CATEGORIE -->
        ${this.activeSubtab === 'categorie' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Categorie di Spesa & Entrata</h3>
                <span class="card-subtitle">Aggiungi nuove categorie personalizzate con emoji</span>
              </div>
            </div>

            <!-- Form rapido aggiungi categoria -->
            <div class="add-cat-bar">
              <input type="text" id="new-cat-name" class="apple-input" placeholder="Es. ✈️ Viaggi o 🎮 Gaming..." />
              <select id="new-cat-type" class="apple-select">
                <option value="expense">Uscita</option>
                <option value="income">Entrata</option>
                <option value="transfer">Giroconto/Risparmio</option>
              </select>
              <button class="apple-btn-primary" id="btn-create-cat">Aggiungi</button>
            </div>

            <div class="categories-tag-cloud">
              ${categories.map(c => `
                <div class="category-tag-pill" style="border-left: 3px solid ${c.color || '#0071E3'};">
                  <span>${c.name}</span>
                  <span class="cat-type-label">(${c.type === 'income' ? 'Entrata' : (c.type === 'transfer' ? 'Risparmio' : 'Spesa')})</span>
                  <button class="btn-remove-cat" data-id="${c.id}">&times;</button>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 3. SICUREZZA PIN APPLE -->
        ${this.activeSubtab === 'sicurezza' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Protezione con PIN di Sicurezza</h3>
                <span class="card-subtitle">Blocca l'accesso alla web app su iPhone e Mac se il PIN non viene inserito</span>
              </div>
            </div>

            <div class="pin-config-box">
              <div class="pin-status-banner ${isPinActive ? 'active' : ''}">
                <div class="pin-status-icon">🔒</div>
                <div>
                  <strong>${isPinActive ? 'Protezione PIN Attiva' : 'Nessun PIN Configurato'}</strong>
                  <p>${isPinActive ? 'All\'apertura della web app viene richiesto il codice di sblocco a 4 cifre.' : 'La web app si apre direttamente senza richiedere codici.'}</p>
                </div>
              </div>

              <div class="form-group" style="margin-top: 16px;">
                <label class="form-label">Imposta o Cambia Codice PIN (4 cifre)</label>
                <div style="display: flex; gap: 10px;">
                  <input type="password" maxlength="4" pattern="[0-9]*" inputmode="numeric" id="input-security-pin" class="apple-input apple-input-lg" placeholder="••••" value="${financeStore.getPin()}" style="max-width: 140px; letter-spacing: 6px; text-align: center; font-size: 20px;" />
                  <button class="apple-btn-primary" id="btn-save-pin">Salva PIN</button>
                  ${isPinActive ? `<button class="apple-btn-secondary" id="btn-remove-pin">Rimuovi PIN</button>` : ''}
                </div>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 4. GOOGLE SHEETS SYNC -->
        ${this.activeSubtab === 'sheets' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Connessione Google Sheets Privata</h3>
                <span class="card-subtitle">Parametri Web App per il foglio 'Finanze - Movimenti'</span>
              </div>
              <span class="sheet-status-badge">
                <span class="sheet-status-indicator" style="width: 8px; height: 8px;"></span>
                <span class="sheet-status-desc">${config.isConfigured ? 'Connesso' : 'Pronto (Locale)'}</span>
              </span>
            </div>

            <div class="settings-form-group">
              <label class="settings-label" for="gas-url-input">URL Applicazione Web (Google Apps Script)</label>
              <input type="url" id="gas-url-input" class="apple-input apple-input-mono" placeholder="https://script.google.com/macros/s/AKfyc.../exec" value="${config.webAppUrl || ''}" />
            </div>

            <div class="settings-form-group">
              <label class="settings-label" for="gas-token-input">Chiave Segreta Personale (Security Token)</label>
              <input type="password" id="gas-token-input" class="apple-input" placeholder="La tua password segreta impostata nello script" value="${config.securityToken || ''}" />
            </div>

            <div class="settings-actions-row">
              <button class="apple-btn-secondary" id="btn-test-connection">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                <span>Verifica Connessione</span>
              </button>
              <button class="apple-btn-primary" id="btn-save-sheets-config">
                <span>Salva Impostazioni</span>
              </button>
            </div>

            <div id="connection-test-feedback" class="connection-feedback" style="display: none;"></div>
          </section>
        ` : ''}

      </div>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    // Sotto-navigazione Tabs
    container.querySelectorAll('.settings-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeSubtab = e.currentTarget.dataset.subtab;
        this.render(container);
      });
    });

    // Aggiornamento Saldo Conto
    container.querySelectorAll('.apple-btn-save-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const input = container.querySelector(`.acc-balance-input[data-id="${id}"]`);
        if (input) {
          const newBal = parseFloat(input.value) || 0;
          financeStore.updateAccountBalance(id, newBal);
          btn.textContent = '✓ Salvato';
          setTimeout(() => { btn.textContent = 'Aggiorna'; }, 1500);
        }
      });
    });

    // Eliminazione Conto
    container.querySelectorAll('.apple-btn-delete-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Sei sicuro di voler rimuovere questo conto?')) {
          financeStore.deleteAccount(id);
          this.render(container);
        }
      });
    });

    // Creazione Categoria
    const btnCreateCat = document.getElementById('btn-create-cat');
    if (btnCreateCat) {
      btnCreateCat.addEventListener('click', () => {
        const nameInput = document.getElementById('new-cat-name');
        const typeSelect = document.getElementById('new-cat-type');
        if (nameInput && nameInput.value.trim()) {
          financeStore.addCategory({ name: nameInput.value, type: typeSelect.value });
          this.render(container);
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

    // Salva / Rimuovi PIN
    const btnSavePin = document.getElementById('btn-save-pin');
    if (btnSavePin) {
      btnSavePin.addEventListener('click', () => {
        const pinVal = document.getElementById('input-security-pin')?.value.trim();
        if (pinVal && pinVal.length === 4) {
          financeStore.setPin(pinVal);
          alert('PIN di sicurezza a 4 cifre attivato con successo!');
          this.render(container);
        } else {
          alert('Inserisci un codice numerico di 4 cifre.');
        }
      });
    }

    const btnRemovePin = document.getElementById('btn-remove-pin');
    if (btnRemovePin) {
      btnRemovePin.addEventListener('click', () => {
        if (confirm('Disattivare la protezione con PIN?')) {
          financeStore.setPin('');
          this.render(container);
        }
      });
    }

    // Sheets Config
    const btnSaveSheets = document.getElementById('btn-save-sheets-config');
    if (btnSaveSheets) {
      btnSaveSheets.addEventListener('click', () => {
        const url = document.getElementById('gas-url-input')?.value || '';
        const token = document.getElementById('gas-token-input')?.value || '';
        googleSheetsService.saveConfig(url, token, true);
        alert('Parametri salvati con successo!');
        this.render(container);
      });
    }

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
  }
}
