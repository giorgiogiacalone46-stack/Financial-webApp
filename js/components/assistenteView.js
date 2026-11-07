/**
 * Apple Design System - Assistente Finanziario View Component (AI Personal CFO)
 * Sezione dedicata al monitoraggio predittivo e consulenza finanziaria automatizzata.
 * Struttura a 4 zone canoniche, icone lineari SVG Apple e chat interattiva.
 */

import { financialAssistantService } from '../services/financialAssistantService.js';
import { getIcon } from './icons.js';

export class AssistenteView {
  constructor() {
    this.messages = [];
    this.lastActivityTime = Date.now();
    this.inactivityTtl = 15 * 60 * 1000; // 15 minuti di inattività prima dell'auto-reset
    this.maxMessages = 12; // Massimo 12 nodi di messaggi nel DOM per mantenere la pagina reattiva e leggera
  }

  getWelcomeBubbleHtml() {
    const timeStr = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    return `
      <div class="chat-bubble bot-bubble" id="assistant-welcome-bubble">
        <div class="chat-bubble-header">
          <span class="bubble-sender">${getIcon('sparkle', 14)} Apple Financial Advisor</span>
          <span class="bubble-time">${timeStr}</span>
        </div>
        <div class="chat-bubble-content">
          Ciao Giorgio! Ho appena aggiornato l'analisi del tuo bilancio. Il tuo <strong>Tasso di Risparmio del 52.5%</strong> è eccellente e il cuscinetto XEON ti garantisce oltre <strong>6.7 mesi</strong> di autonomia.
          <br><br>
          Come posso esserti utile oggi? Puoi selezionare uno dei suggerimenti rapidi qui sopra oppure farmi una domanda direttamente.
        </div>
      </div>
    `;
  }

  render(container) {
    const briefing = financialAssistantService.generateExecutiveBriefing();
    const now = Date.now();

    // Se è trascorso il periodo di inattività (15 min), resettiamo la sessione chat
    const isSessionExpired = (now - this.lastActivityTime) > this.inactivityTtl;
    if (isSessionExpired) {
      this.messages = [];
    }
    this.lastActivityTime = now;

    container.innerHTML = `
      <div class="page assistente-page">
        
        <!-- Header Sezione Assistente -->
        <div class="spese-header-toolbar">
          <div class="spese-header-info">
            <h2 class="page-title">Assistente Finanziario</h2>
            <p class="page-subtitle">Briefing esecutivo continuo, analisi predittiva e consulenza patrimoniale personalizzata</p>
          </div>
          <div class="spese-header-actions">
            <span class="badge badge--positive" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px;">
              ${getIcon('sparkle', 14)} Motore FinTech Attivo
            </span>
          </div>
        </div>

        <!-- 1. Briefing Esecutivo (4 Card Canoniche in .grid-4) -->
        <section class="grid-4">
          
          <!-- Card 1: Radar Anomalie -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Radar Anomalie Spesa</span>
              <div class="kpi-icon-badge ${briefing.anomalyInsights[0].level === 'warning' ? 'expense' : 'income'}">
                ${getIcon(briefing.anomalyInsights[0].level === 'warning' ? 'alert' : 'check', 16)}
              </div>
            </div>
            <div class="card__value" style="font-size: 20px;">
              ${briefing.anomalyInsights[0].title}
            </div>
            <div class="card__body">
              <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">
                ${briefing.anomalyInsights[0].desc}
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context" title="${briefing.anomalyInsights[0].action}">
                ${briefing.anomalyInsights[0].action}
              </span>
            </div>
          </div>

          <!-- Card 2: Runway & Sicurezza -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Sicurezza & Autonomia</span>
              <div class="kpi-icon-badge savings">
                ${getIcon('fondo_emergenza', 16)}
              </div>
            </div>
            <div class="card__value" style="font-size: 20px; color: var(--apple-green);">
              ${briefing.runwayInsight.title.replace('Runway Fondo Emergenza: ', '')}
            </div>
            <div class="card__body">
              <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">
                ${briefing.runwayInsight.desc}
              </p>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">Copertura Solida</span>
              <span class="trend-context">Massima protezione</span>
            </div>
          </div>

          <!-- Card 3: Allocazione & Tasse -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Efficienza Fiscale</span>
              <div class="kpi-icon-badge balance">
                ${getIcon('conguaglio', 16)}
              </div>
            </div>
            <div class="card__value" style="font-size: 20px;">
              Art. 51 TUIR
            </div>
            <div class="card__body">
              <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">
                Deducibilità fino a € 5.164,57 sul fondo pensione per massimizzare il rimborso IRPEF.
              </p>
            </div>
            <div class="card__footer">
              <span class="badge badge--info">Fondo Pensione</span>
              <span class="trend-context">Risparmio IRPEF ~35%</span>
            </div>
          </div>

          <!-- Card 4: F.I.R.E. Roadmap -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Crossover Point</span>
              <div class="kpi-icon-badge savings">
                ${getIcon('fire', 16)}
              </div>
            </div>
            <div class="card__value" style="font-size: 20px; color: var(--apple-purple);">
              ${briefing.fireInsight.yearsToFire}
            </div>
            <div class="card__body">
              <p style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">
                ${briefing.fireInsight.desc}
              </p>
            </div>
            <div class="card__footer">
              <span class="badge badge--purple">F.I.R.E. Track</span>
              <span class="trend-context">${briefing.fireInsight.progressPct}% raggiunto</span>
            </div>
          </div>

        </section>

        <!-- 2. Chat Interattiva Stile Apple Intelligence -->
        <section class="card assistant-chat-card" style="min-height: 480px; display: flex; flex-direction: column;">
          <div class="card__header" style="border-bottom: 1px solid var(--divider); padding-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div class="accounts-header-title-group">
              <span class="card__title" style="display: flex; align-items: center; gap: 8px;">
                ${getIcon('bot', 18)} Consulente Finanziario Virtuale
              </span>
              <span class="accounts-header-sub">Fai domande sui tuoi saldi, chiedi consigli di spesa o richiedi proiezioni</span>
            </div>
            <div class="accounts-header-badges" style="display: flex; align-items: center; gap: 8px; margin-left: auto;">
              <span class="badge badge--neutral" title="La chat si resetta automaticamente dopo 15 minuti di inattività">
                Auto-reset 15m
              </span>
              <button class="assistant-reset-btn" id="btn-reset-chat" title="Cancella la cronologia corrente e inizia una nuova conversazione">
                ${getIcon('refresh', 12)}
                <span>Nuova Chat</span>
              </button>
            </div>
          </div>

          <!-- Quick Suggestion Prompts -->
          <div class="assistant-prompts-bar" style="display: flex; gap: 8px; flex-wrap: wrap; padding: 14px 0 6px;">
            <button class="assistant-quick-pill" data-prompt="Quanto posso spendere oggi?">
              ${getIcon('target', 13)} Quanto posso spendere oggi?
            </button>
            <button class="assistant-quick-pill" data-prompt="Dove ho speso di più questo mese?">
              ${getIcon('shopping', 13)} Dove ho speso di più?
            </button>
            <button class="assistant-quick-pill" data-prompt="Quanti mesi di autonomia ho con XEON?">
              ${getIcon('fondo_emergenza', 13)} Mesi di autonomia
            </button>
            <button class="assistant-quick-pill" data-prompt="Come posso ottimizzare le tasse e il fondo pensione?">
              ${getIcon('sparkle', 13)} Ottimizzazione fiscale
            </button>
            <button class="assistant-quick-pill" data-prompt="Qual è il mio patrimonio netto totale?">
              ${getIcon('balance', 13)} Stato patrimoniale
            </button>
          </div>

          <!-- Chat Stream Box -->
          <div class="assistant-chat-stream" id="assistant-stream" style="flex: 1 1 auto; overflow-y: auto; padding: 14px 0; display: flex; flex-direction: column; gap: 14px; min-height: 240px;">
            ${this.getWelcomeBubbleHtml()}
          </div>

          <!-- Chat Input Bar -->
          <div class="assistant-chat-input-bar" style="border-top: 1px solid var(--divider); padding-top: 14px; display: flex; gap: 10px; align-items: center;">
            <input type="text" id="assistant-input" class="apple-input" placeholder="Chiedi al tuo assistente finanziario..." style="flex: 1 1 auto; font-size: 14px; padding: 12px 16px; border-radius: var(--radius-pill);" />
            <button id="assistant-send-btn" class="apple-btn-primary" style="padding: 10px 20px; border-radius: var(--radius-pill); display: flex; align-items: center; gap: 6px;">
              Invia ${getIcon('chevronRight', 12)}
            </button>
          </div>
        </section>

      </div>
    `;

    this.bindEvents(container);
  }

  bindEvents(container) {
    const input = container.querySelector('#assistant-input');
    const sendBtn = container.querySelector('#assistant-send-btn');
    const resetBtn = container.querySelector('#btn-reset-chat');
    const stream = container.querySelector('#assistant-stream');

    const resetChatStream = () => {
      this.lastActivityTime = Date.now();
      if (stream) {
        stream.innerHTML = this.getWelcomeBubbleHtml();
      }
      if (input) {
        input.value = '';
        input.focus();
      }
    };

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetChatStream();
      });
    }

    const pruneOldMessages = () => {
      // Evita accumulo indefinito nel DOM mantenendo massimo `maxMessages` elementi
      if (stream && stream.children.length > this.maxMessages) {
        const excess = stream.children.length - this.maxMessages;
        // Non rimuovere mai il primo se è l'unico rimasto
        for (let i = 0; i < excess; i++) {
          if (stream.children.length > 2) {
            // Rimuove il più vecchio dopo il primo saluto (oppure il primo elemento)
            stream.removeChild(stream.children[1] || stream.children[0]);
          }
        }
      }
    };

    const handleSend = async (text) => {
      this.lastActivityTime = Date.now();
      const q = text || (input ? input.value : '');
      if (!q || !q.trim()) return;
      if (input) input.value = '';

      // Inserisce bolla utente
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user-bubble';
      userBubble.innerHTML = `
        <div class="chat-bubble-header" style="justify-content: flex-end;">
          <span class="bubble-time">${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
          <span class="bubble-sender">Tu</span>
        </div>
        <div class="chat-bubble-content">${this.escapeHtml(q)}</div>
      `;
      stream.appendChild(userBubble);
      pruneOldMessages();
      stream.scrollTop = stream.scrollHeight;

      // Mostra indicatore digitazione
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot-bubble typing-indicator';
      typingBubble.innerHTML = `<span style="color: var(--text-secondary); font-style: italic;">Analisi in corso...</span>`;
      stream.appendChild(typingBubble);
      stream.scrollTop = stream.scrollHeight;

      // Elaborazione risposta
      const answer = await financialAssistantService.askAssistant(q);
      typingBubble.remove();

      // Inserisce bolla risposta
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot-bubble';
      botBubble.innerHTML = `
        <div class="chat-bubble-header">
          <span class="bubble-sender">${getIcon('sparkle', 14)} Apple Financial Advisor</span>
          <span class="bubble-time">${new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="chat-bubble-content">${this.formatMarkdown(answer)}</div>
      `;
      stream.appendChild(botBubble);
      pruneOldMessages();
      stream.scrollTop = stream.scrollHeight;
    };

    if (sendBtn) {
      sendBtn.addEventListener('click', () => handleSend());
    }

    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });
    }

    const pills = container.querySelectorAll('.assistant-quick-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const pText = pill.getAttribute('data-prompt');
        handleSend(pText);
      });
    });
  }

  escapeHtml(str) {
    return (str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }
}
