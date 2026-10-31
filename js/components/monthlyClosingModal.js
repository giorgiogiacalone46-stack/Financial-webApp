/**
 * Apple Design System - Chiusura Fine Mese & Riconciliazione Saldi Studio
 * Gestione guidata del conguaglio mensile e consolidamento Net Worth:
 * - Supporto per Saldo Effettivo (conti bancari/investimento)
 * - Supporto per Quota Aggiuntiva da Busta Paga (Fondo Pensione / Previdenza)
 * - Calcolo automatico in tempo reale del Net Worth risultante
 * - Notifiche e alert proattivi per conti rimasti fermi al mese precedente
 */

import { financeStore } from '../data/mockData.js';
import { getIcon } from './icons.js';

export class MonthlyClosingModal {
  constructor() {
    this.targetMonth = null;
    this.onSuccessCallback = null;
    this.accountInputs = new Map(); // accId -> { mode: 'balance'|'delta', value: number, createTx: boolean, note: string }
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  open(options = {}) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const defaultMonth = `${String(curMonth).padStart(2, '0')}/${curYear}`;

    this.targetMonth = options.targetMonth || defaultMonth;
    this.onSuccessCallback = options.onSuccess || null;
    this.focusAccount = options.focusAccount || null;

    this.render(modalRoot);
  }

  close() {
    const overlay = document.getElementById('monthly-closing-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      setTimeout(() => {
        const modalRoot = document.getElementById('modal-container');
        if (modalRoot) modalRoot.innerHTML = '';
      }, 250);
    }
  }

  render(modalRoot) {
    const status = financeStore.getMonthlyReconciliationStatus(this.targetMonth);
    const accounts = financeStore.getAccounts();
    const currentNW = financeStore.summary.netWorth;

    // Inizializza lo stato degli input se non presente
    this.accountInputs.clear();
    accounts.forEach(acc => {
      const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension');
      const defaultMode = acc.defaultMode || (isPension ? 'delta' : 'balance');
      this.accountInputs.set(acc.name, {
        mode: defaultMode,
        rawInputValue: '',
        value: 0,
        isModified: false,
        createTx: true,
        note: isPension 
          ? `Versamento Fondo Pensione Busta Paga (${status.targetMonthName})` 
          : `Conguaglio Saldo ${acc.name} (${status.targetMonthName})`
      });
    });

    const monthOptions = [
      { key: '10/2026', label: 'Ottobre 2026' },
      { key: '09/2026', label: 'Settembre 2026' },
      { key: '08/2026', label: 'Agosto 2026' },
      { key: '11/2026', label: 'Novembre 2026' }
    ];

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="monthly-closing-overlay">
        <div class="apple-modal-sheet open" id="monthly-closing-sheet" style="max-width: 640px; width: 95%;">
          <div class="modal-handle"></div>
          
          <div class="modal-header" style="margin-bottom: var(--space-box-gap-md);">
            <div>
              <div class="cluster-gap-xs" style="margin-bottom: 2px;">
                <span style="color: var(--apple-blue);">${getIcon('conguaglio', 18)}</span>
                <h3 style="margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.02em;">Chiusura Fine Mese & Riconciliazione Saldi</h3>
              </div>
              <span style="font-size: 12.5px; color: var(--text-secondary);">
                Consolida i saldi effettivi dei conti e registra le quote da busta paga per il Net Worth
              </span>
            </div>
            <button class="modal-close-btn" id="btn-close-closing-modal">Chiudi</button>
          </div>

          <!-- Mese di Riferimento & Summary Live Strip -->
          <div class="closing-summary-strip" style="background: var(--bg-hover); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-card-pad-sm) var(--space-card-pad); margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="select-closing-month" style="font-size: 12.5px; font-weight: 600; color: var(--text-secondary);">Mese di Chiusura:</label>
                <div class="apple-select-wrapper" style="min-width: 140px;">
                  <select id="select-closing-month" class="apple-select" style="padding: 4px 28px 4px 10px; font-size: 13px; font-weight: 600; height: 32px;">
                    ${monthOptions.map(m => `<option value="${m.key}" ${m.key === this.targetMonth ? 'selected' : ''}>${m.label}</option>`).join('')}
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
              <div id="closing-status-pill" style="font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 9999px; background: ${status.isFullyReconciled ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 149, 0, 0.15)'}; color: ${status.isFullyReconciled ? 'var(--apple-green)' : 'var(--apple-orange)'};">
                ${status.isFullyReconciled ? 'Tutti i conti allineati' : `${status.pendingCount} conto in sospeso`}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
              <div>
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 2px;">Net Worth Attuale</span>
                <strong style="font-size: 15px; font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums;">
                  ${this.formatCurrency(currentNW)}
                </strong>
              </div>
              <div>
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 2px;">Nuovo Net Worth Stimato</span>
                <strong id="preview-new-nw" style="font-size: 15px; font-weight: 700; color: var(--apple-blue); font-variant-numeric: tabular-nums;">
                  ${this.formatCurrency(currentNW)}
                </strong>
              </div>
              <div>
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 2px;">Variazione Netta</span>
                <strong id="preview-nw-delta" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); font-variant-numeric: tabular-nums;">
                  +0,00 €
                </strong>
              </div>
            </div>
          </div>

          <!-- Alert Promemoria Sezione Sospesi -->
          ${status.staleAccounts.length > 0 ? `
            <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(255, 149, 0, 0.1); border: 1px solid rgba(255, 149, 0, 0.3); border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: var(--space-box-gap-md);">
              <span style="color: var(--apple-orange); display: flex; align-items: center; margin-top: 1px;">${getIcon('warning', 18)}</span>
              <div style="font-size: 12.5px; color: var(--text-primary); line-height: 1.4;">
                <strong>Promemoria Fondo Pensione / Conti non aggiornati:</strong><br/>
                ${status.staleAccounts.map(a => `Il conto <strong>${a.name}</strong> è fermo a ${a.lastMonthName}. Per il Fondo Pensione inserisci semplicemente la quota letta sul cedolino della busta paga.`).join('<br/>')}
              </div>
            </div>
          ` : ''}

          <!-- Lista Conti per Riconciliazione -->
          <div class="closing-accounts-list" style="display: flex; flex-direction: column; gap: var(--space-box-gap-sm); max-height: 48vh; overflow-y: auto; padding-right: 4px; margin-bottom: var(--space-box-gap-md);">
            ${accounts.map(acc => this.renderAccountRow(acc, status)).join('')}
          </div>

          <!-- Azioni di Chiusura -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: var(--space-box-gap-md); border-top: 1px solid var(--border-subtle);">
            <button class="apple-btn-secondary" id="btn-cancel-closing">Annulla</button>
            <button class="apple-btn-primary" id="btn-confirm-monthly-closing" style="padding: 10px 20px; font-size: 13.5px; font-weight: 600;">
              ${getIcon('conguaglio', 14)}
              <span>Conferma Chiusura e Salva Saldi [${status.targetMonthName}]</span>
            </button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents(modalRoot);
    this.updatePreviewCalculations();
  }

  renderAccountRow(acc, status) {
    const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension');
    const recMonth = acc.lastReconciledMonth || (isPension ? '09/2026' : '10/2026');
    const isStale = (recMonth !== this.targetMonth);
    const defaultMode = acc.defaultMode || (isPension ? 'delta' : 'balance');
    const isFocused = this.focusAccount && this.focusAccount.toLowerCase() === acc.name.toLowerCase();

    return `
      <div class="reconcile-card ${isStale ? 'reconcile-stale' : ''} ${isFocused ? 'reconcile-focused' : ''}" data-account="${acc.name}" style="background: var(--bg-card); border: 1px solid ${isStale ? 'rgba(255, 149, 0, 0.4)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 14px 16px;">
        
        <!-- Header Conto -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--bg-hover); display: flex; align-items: center; justify-content: center; color: var(--apple-blue);">
              ${getIcon(isPension ? 'savings' : 'wallet', 16)}
            </div>
            <div>
              <strong style="font-size: 14px; font-weight: 600; color: var(--text-primary); display: block; line-height: 1.2;">
                ${acc.name}
              </strong>
              <span style="font-size: 11.5px; color: var(--text-tertiary);">${acc.type || 'Conto'}</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12px; color: var(--text-secondary);">Attuale:</span>
            <strong class="privacy-mask" style="font-size: 13.5px; font-weight: 600; font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(acc.balance)}
            </strong>
            <span style="font-size: 10.5px; font-weight: 600; padding: 2px 7px; border-radius: 9999px; background: ${isStale ? 'rgba(255, 149, 0, 0.15)' : 'rgba(52, 199, 89, 0.15)'}; color: ${isStale ? 'var(--apple-orange)' : 'var(--apple-green)'};">
              ${isStale ? `Fermo a ${acc.lastMonthName || 'mese prec.'}` : 'Allineato'}
            </span>
          </div>
        </div>

        <!-- Selettore Modalità (Saldo Effettivo vs Quota Busta Paga) -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--bg-hover); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 10px;">
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Modalità Inserimento:</span>
          
          <div class="segmented-control-mini" style="display: inline-flex; background: var(--bg-primary); padding: 2px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle);">
            <button type="button" class="seg-btn-mini ${defaultMode === 'delta' ? 'active' : ''}" data-mode="delta" data-target="${acc.name}" style="padding: 3px 10px; font-size: 11.5px; border-radius: var(--radius-pill); border: none; background: ${defaultMode === 'delta' ? 'var(--apple-blue)' : 'transparent'}; color: ${defaultMode === 'delta' ? '#FFFFFF' : 'var(--text-secondary)'}; font-weight: 600; cursor: pointer;">
              ${isPension ? '➕ Quota Busta Paga (+/-)' : '➕ Differenza (+/-)'}
            </button>
            <button type="button" class="seg-btn-mini ${defaultMode === 'balance' ? 'active' : ''}" data-mode="balance" data-target="${acc.name}" style="padding: 3px 10px; font-size: 11.5px; border-radius: var(--radius-pill); border: none; background: ${defaultMode === 'balance' ? 'var(--apple-blue)' : 'transparent'}; color: ${defaultMode === 'balance' ? '#FFFFFF' : 'var(--text-secondary)'}; font-weight: 600; cursor: pointer;">
              🎯 Saldo Effettivo Totale
            </button>
          </div>
        </div>

        <!-- Riga Input e Risultato Dinamico -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center;">
          <div>
            <label class="form-label" style="font-size: 11.5px; margin-bottom: 4px;" id="label-input-${acc.name}">
              ${defaultMode === 'delta' ? (isPension ? 'Quota Busta Paga (€)' : 'Variazione Netta (€)') : 'Nuovo Saldo Effettivo (€)'}
            </label>
            <div style="position: relative;">
              <input 
                type="number" 
                step="0.01" 
                class="apple-input input-reconcile-val" 
                id="input-val-${acc.name}" 
                data-account="${acc.name}"
                data-old-balance="${acc.balance}"
                placeholder="${defaultMode === 'delta' ? (isPension ? '+ es. 185,50' : '+/- es. 50,00') : this.formatCurrency(acc.balance)}" 
                style="font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums;"
              />
            </div>
          </div>

          <div style="background: var(--bg-hover); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: center;">
            <span style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 2px;">Saldo Risultante:</span>
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <strong id="preview-acc-bal-${acc.name}" style="font-size: 14px; font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums;">
                ${this.formatCurrency(acc.balance)}
              </strong>
              <span id="preview-acc-delta-${acc.name}" style="font-size: 11.5px; font-weight: 600; color: var(--text-tertiary);">
                0,00 €
              </span>
            </div>
          </div>
        </div>

        <!-- Opzione Creazione Movimento -->
        <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--text-secondary);">
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <input type="checkbox" id="check-tx-${acc.name}" data-account="${acc.name}" checked style="accent-color: var(--apple-blue);" />
            <span>Crea movimento di conguaglio/versamento nel registro</span>
          </label>
          <span style="font-size: 11px; color: var(--text-tertiary);">
            ${isPension ? 'Cat: 🛅 Livello Crescita' : 'Cat: ⚖️ Conguaglio'}
          </span>
        </div>

      </div>
    `;
  }

  bindEvents(modalRoot) {
    // Chiudi Modal
    const btnClose = document.getElementById('btn-close-closing-modal');
    if (btnClose) btnClose.addEventListener('click', () => this.close());
    const btnCancel = document.getElementById('btn-cancel-closing');
    if (btnCancel) btnCancel.addEventListener('click', () => this.close());

    const overlay = document.getElementById('monthly-closing-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    // Cambio Mese
    const selectMonth = document.getElementById('select-closing-month');
    if (selectMonth) {
      selectMonth.addEventListener('change', (e) => {
        this.targetMonth = e.target.value;
        this.render(modalRoot);
      });
    }

    // Toggle Modalità (Saldo Effettivo vs Quota Busta Paga) per ciascun conto
    modalRoot.querySelectorAll('.seg-btn-mini').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const accName = e.currentTarget.dataset.target;
        const newMode = e.currentTarget.dataset.mode;
        const accData = this.accountInputs.get(accName);
        if (!accData) return;

        accData.mode = newMode;
        
        // Aggiorna classi bottoni
        const parent = e.currentTarget.parentElement;
        parent.querySelectorAll('.seg-btn-mini').forEach(b => {
          const isActive = b.dataset.mode === newMode;
          b.style.background = isActive ? 'var(--apple-blue)' : 'transparent';
          b.style.color = isActive ? '#FFFFFF' : 'var(--text-secondary)';
        });

        // Aggiorna etichetta e placeholder input
        const isPension = accName.toLowerCase().includes('pension');
        const labelEl = document.getElementById(`label-input-${accName}`);
        const inputEl = document.getElementById(`input-val-${accName}`);

        if (labelEl) {
          labelEl.textContent = newMode === 'delta' 
            ? (isPension ? 'Quota Busta Paga (€)' : 'Variazione Netta (€)') 
            : 'Nuovo Saldo Effettivo (€)';
        }
        if (inputEl) {
          inputEl.placeholder = newMode === 'delta' 
            ? (isPension ? '+ es. 185,50' : '+/- es. 50,00') 
            : this.formatCurrency(parseFloat(inputEl.dataset.oldBalance));
        }

        this.updateAccountCalculation(accName);
        this.updatePreviewCalculations();
      });
    });

    // Input Numerici
    modalRoot.querySelectorAll('.input-reconcile-val').forEach(input => {
      input.addEventListener('input', (e) => {
        const accName = e.target.dataset.account;
        const rawVal = e.target.value.trim();
        const accData = this.accountInputs.get(accName);
        if (!accData) return;

        accData.rawInputValue = rawVal;
        accData.value = rawVal === '' ? 0 : parseFloat(rawVal);
        accData.isModified = rawVal !== '';

        this.updateAccountCalculation(accName);
        this.updatePreviewCalculations();
      });
    });

    // Checkbox Transazione
    modalRoot.querySelectorAll('input[type="checkbox"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const accName = e.target.dataset.account;
        const accData = this.accountInputs.get(accName);
        if (accData) {
          accData.createTx = e.target.checked;
        }
      });
    });

    // Pulsante Conferma e Salva
    const btnConfirm = document.getElementById('btn-confirm-monthly-closing');
    if (btnConfirm) {
      btnConfirm.addEventListener('click', () => {
        this.handleSaveClosing();
      });
    }
  }

  updateAccountCalculation(accName) {
    const accData = this.accountInputs.get(accName);
    const inputEl = document.getElementById(`input-val-${accName}`);
    const previewBalEl = document.getElementById(`preview-acc-bal-${accName}`);
    const previewDeltaEl = document.getElementById(`preview-acc-delta-${accName}`);

    if (!accData || !inputEl || !previewBalEl || !previewDeltaEl) return;

    const oldBal = parseFloat(inputEl.dataset.oldBalance) || 0;
    let resultingBal = oldBal;
    let delta = 0;

    if (accData.isModified && !isNaN(accData.value)) {
      if (accData.mode === 'delta') {
        delta = accData.value;
        resultingBal = Math.round((oldBal + delta) * 100) / 100;
      } else {
        resultingBal = accData.value;
        delta = Math.round((resultingBal - oldBal) * 100) / 100;
      }
    }

    previewBalEl.textContent = this.formatCurrency(resultingBal);
    
    if (delta > 0) {
      previewDeltaEl.textContent = `+${this.formatCurrency(delta)}`;
      previewDeltaEl.style.color = 'var(--apple-green)';
    } else if (delta < 0) {
      previewDeltaEl.textContent = this.formatCurrency(delta);
      previewDeltaEl.style.color = 'var(--apple-red)';
    } else {
      previewDeltaEl.textContent = '0,00 €';
      previewDeltaEl.style.color = 'var(--text-tertiary)';
    }
  }

  updatePreviewCalculations() {
    const accounts = financeStore.getAccounts();
    let totalEstimatedNW = 0;
    let totalDelta = 0;

    accounts.forEach(acc => {
      const accData = this.accountInputs.get(acc.name);
      const oldBal = parseFloat(acc.balance) || 0;
      let finalBal = oldBal;

      if (accData && accData.isModified && !isNaN(accData.value)) {
        if (accData.mode === 'delta') {
          finalBal = Math.round((oldBal + accData.value) * 100) / 100;
        } else {
          finalBal = accData.value;
        }
      }

      totalEstimatedNW += finalBal;
      totalDelta += (finalBal - oldBal);
    });

    const previewNwEl = document.getElementById('preview-new-nw');
    const previewDeltaEl = document.getElementById('preview-nw-delta');

    if (previewNwEl) {
      previewNwEl.textContent = this.formatCurrency(totalEstimatedNW);
    }
    if (previewDeltaEl) {
      if (totalDelta > 0) {
        previewDeltaEl.textContent = `+${this.formatCurrency(totalDelta)}`;
        previewDeltaEl.style.color = 'var(--apple-green)';
      } else if (totalDelta < 0) {
        previewDeltaEl.textContent = this.formatCurrency(totalDelta);
        previewDeltaEl.style.color = 'var(--apple-red)';
      } else {
        previewDeltaEl.textContent = '+0,00 €';
        previewDeltaEl.style.color = 'var(--text-secondary)';
      }
    }
  }

  handleSaveClosing() {
    const updates = [];
    const accounts = financeStore.getAccounts();

    accounts.forEach(acc => {
      const data = this.accountInputs.get(acc.name);
      if (data && data.isModified && !isNaN(data.value)) {
        updates.push({
          accountName: acc.name,
          mode: data.mode,
          value: data.value,
          note: data.note,
          createTx: data.createTx
        });
      }
    });

    if (updates.length === 0) {
      alert('Non hai inserito alcuna modifica o conguaglio. Per confermare, inserisci almeno la quota della busta paga o un saldo effettivo.');
      return;
    }

    const res = financeStore.executeMonthlyClosing(this.targetMonth, updates);

    // Mostra feedback visivo di successo
    alert(`✅ Chiusura di ${res.monthName} consolidata con successo!\n\nPatrimonio Net Worth aggiornato a ${this.formatCurrency(res.newTotalNW)} (${res.nwDelta >= 0 ? '+' : ''}${this.formatCurrency(res.nwDelta)}).\n${res.modifiedAccounts.length} conti allineati.`);

    this.close();

    if (typeof this.onSuccessCallback === 'function') {
      this.onSuccessCallback(res);
    }
  }
}

export const monthlyClosingModal = new MonthlyClosingModal();
