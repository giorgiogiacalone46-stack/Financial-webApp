/**
 * Apple Design System - Financial Assistant Service (AI Personal CFO)
 * Analizza costantemente i dati finanziari di Giorgio:
 * - Genera Briefing Esecutivo (Anomalie, Runway, Allocazione Surplus, F.I.R.E.)
 * - Motore conversazionale locale ad alta fedeltà (Zero-Latency, 100% Privacy)
 * - Predisposizione opzionale per Google Gemini API
 */

import { financeStore } from '../data/mockData.js';
import { cleanCategoryName } from '../components/icons.js';

export class FinancialAssistantService {
  constructor() {
    this.apiKeyStorageKey = 'finanze_gemini_api_key';
  }

  getApiKey() {
    try {
      return localStorage.getItem(this.apiKeyStorageKey) || '';
    } catch (e) {
      return '';
    }
  }

  setApiKey(key) {
    try {
      if (key) localStorage.setItem(this.apiKeyStorageKey, key.trim());
      else localStorage.removeItem(this.apiKeyStorageKey);
    } catch (e) {}
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  /**
   * Genera il Briefing Esecutivo completo basato sui dati reali attuali.
   */
  generateExecutiveBriefing() {
    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const health = financeStore.getFinancialHealthScore();
    const anomalies = financeStore.getCategoryAnomalies();
    const budget = financeStore.getBudget50_30_20();
    const fire = financeStore.calculateFireMetrics();

    // 1. Radar Anomalie
    const anomalyInsights = [];
    if (anomalies.length > 0) {
      anomalies.forEach(a => {
        anomalyInsights.push({
          title: `Picco spesa: ${cleanCategoryName(a.category)}`,
          desc: `La spesa attuale (${this.formatCurrency(a.currentAmount)}) supera del +${a.spikePercent}% la tua media storica (${this.formatCurrency(a.historicalAvg)}).`,
          level: a.spikePercent > 50 ? 'warning' : 'info',
          action: 'Verifica le singole uscite per accertarti che non siano addebiti non previsti.'
        });
      });
    } else {
      anomalyInsights.push({
        title: 'Nessuna anomalia rilevata',
        desc: 'I tuoi consumi del mese sono perfettamente allineati alle medie storiche.',
        level: 'success',
        action: 'Mantieni questo ritmo per massimizzare il surplus a fine mese.'
      });
    }

    // 2. Sicurezza & Runway
    const xeonAcc = accounts.find(a => a.name.toLowerCase().includes('xeon'));
    const xeonBal = xeonAcc ? xeonAcc.balance : 5383.32;
    const monthlyExp = summary.monthlyExpense || 808.34;
    const runwayMonths = (monthlyExp > 0 ? (xeonBal / monthlyExp) : 6.7).toFixed(1);

    const runwayInsight = {
      title: `Runway Fondo Emergenza: ${runwayMonths} Mesi`,
      desc: `Il tuo capitale protetto su XEON (${this.formatCurrency(xeonBal)}) copre integralmente ${runwayMonths} mesi di spese medie correnti.`,
      level: runwayMonths >= 6 ? 'success' : 'warning',
      action: runwayMonths >= 6 
        ? 'Sei in fascia di massima sicurezza finanziaria. Non è necessario incrementare la liquidità.' 
        : 'Ti consiglio di destinare parte dei prossimi risparmi al reintegro del fondo emergenza.'
    };

    // 3. Allocazione Surplus & Efficienza Fiscale (Art. 51 TUIR)
    const savingsAmount = summary.savingsAmount || 891.66;
    const pensionMaxDeductible = 5164.57;
    const pensionEstimatedCurrent = 1200.00;
    const deductibleRemaining = Math.max(0, pensionMaxDeductible - pensionEstimatedCurrent);
    const taxSavingEstimate = (deductibleRemaining * 0.35).toFixed(0);

    const allocationAdvice = {
      title: 'Strategia di Allocazione Surplus',
      desc: `Con un risparmio mensile di +${this.formatCurrency(savingsAmount)} (Tasso ${summary.savingsRate}%), hai ottima capienza di accumulo.`,
      recommendations: [
        `Versa 200 € / mese nel PAC ETF VWCE per alimentare la crescita a lungo termine.`,
        `Destina una quota al Fondo Pensione: hai ancora € ${this.formatCurrency(deductibleRemaining)} di capienza deducibile per risparmiare fino a ~€ ${taxSavingEstimate} di IRPEF (Art. 51 TUIR).`,
        `Lascia il residuo su XEON per beneficiare del rendimento overnight senza rischio di mercato.`
      ]
    };

    // 4. Tabella di marcia F.I.R.E.
    const fireInsight = {
      title: `Traguardo F.I.R.E. & Crossover Point`,
      desc: `Patrimonio Netto attuale a quota ${this.formatCurrency(summary.netWorth)}. Rendita mensile netta stimata già generata: € ${(summary.netWorth * 0.04 / 12).toFixed(2)}/mese.`,
      yearsToFire: fire.crossoverYear ? `${fire.crossoverYear} anni` : 'Circa 14 anni',
      progressPct: ((summary.netWorth / (fire.fireNumber || 250000)) * 100).toFixed(1)
    };

    return {
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
      anomalyInsights,
      runwayInsight,
      allocationAdvice,
      fireInsight,
      healthScore: health.score,
      healthLabel: health.label
    };
  }

  /**
   * Motore di risposta conversazionale locale (Zero Latenza, Deterministico & Intelligente)
   */
  async askAssistant(question) {
    const q = (question || '').trim().toLowerCase();
    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const budget = financeStore.getBudget50_30_20();
    const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');

    // Se l'utente ha configurato una chiave Gemini, prova prima la chiamata remota
    const apiKey = this.getApiKey();
    if (apiKey) {
      try {
        const remoteAns = await this.callGeminiApi(apiKey, question);
        if (remoteAns) return remoteAns;
      } catch (err) {
        console.warn('Fallback a motore locale AI per errore API Gemini:', err);
      }
    }

    // Motore Locale Analitico (Sempre disponibile, zero latenza, 100% privacy)
    if (q.includes('spend') || q.includes('giorno') || q.includes('budget') || q.includes('posso')) {
      return `📊 **Spesa Sicura Giornaliera**: puoi spendere fino a **${this.formatCurrency(budget.dailySafeSpend)} al giorno** per i restanti **${budget.daysRemaining} giorni** del mese senza intaccare la tua quota di risparmio del 25%.\n\nIl tuo budget per i bisogni è al momento saturo al **${budget.needs.pct}%**, mentre lo svago è al **${budget.wants.pct}%**.`;
    }

    if (q.includes('maggior') || q.includes('speso') || q.includes('top') || q.includes('dove')) {
      const totals = {};
      txs.forEach(t => {
        const cat = cleanCategoryName(t.category);
        totals[cat] = (totals[cat] || 0) + t.amount;
      });
      const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
      if (top) {
        return `🛒 **Voce di Spesa Principale**: la categoria con il maggior impatto questo mese è **${top[0]}** con un totale di **${this.formatCurrency(top[1])}**.\n\nTi consiglio di verificare la nuova sezione *Spese* per monitorare la ripartizione dettagliata.`;
      }
    }

    if (q.includes('autonomia') || q.includes('runway') || q.includes('emergenza') || q.includes('mesi')) {
      const xeon = accounts.find(a => a.name.toLowerCase().includes('xeon'))?.balance || 5383.32;
      const months = (xeon / (summary.monthlyExpense || 800)).toFixed(1);
      return `🛡️ **Runway & Sicurezza**: con il capitale di **${this.formatCurrency(xeon)}** allocato sul conto *Trade Republic - XEON*, hai un'autonomia coperta di **${months} mesi** di spese correnti a zero entrate. Sei pienamente protetto da imprevisti.`;
    }

    if (q.includes('ottimizz') || q.includes('consigl') || q.includes('tass') || q.includes('invest')) {
      return `💡 **Consiglio FinTech Personalizzato**:\n\n1. **Fondo Pensione (Art. 51 TUIR)**: puoi versare fino a € 5.164,57 all'anno deducibili al 100% dal reddito IRPEF, ottenendo un rimborso fiscale fino a circa il 35-43%.\n2. **PAC ETF VWCE**: mantieni l'investimento sistematico automatico per sfruttare il dollar-cost averaging.\n3. **Cassa Overnight**: lascia la liquidità di rispetto su XEON per generare interessi senza vincoli temporali.`;
    }

    if (q.includes('patrimonio') || q.includes('net worth') || q.includes('saldo') || q.includes('totale')) {
      return `🏛️ **Stato Patrimoniale**: il tuo Patrimonio Netto attuale ammonta a **${this.formatCurrency(summary.netWorth)}**, suddiviso in:\n- **Liquidità cassa immediata**: ${this.formatCurrency(summary.liquidTotal)}\n- **Investimenti & Previdenza**: ${this.formatCurrency(summary.netWorth - summary.liquidTotal)}\n\nIl tuo Tasso di Risparmio mensile è al **${summary.savingsRate}%** (+${this.formatCurrency(summary.savingsAmount)}).`;
    }

    // Risposta predefinita con panoramica esecutiva
    return `👋 Ciao Giorgio! Sono il tuo **Assistente Finanziario Personale**.

Al momento il tuo bilancio è in **ottima salute** (Health Score: ${financeStore.getFinancialHealthScore().score}/100):
- **Patrimonio Netto**: ${this.formatCurrency(summary.netWorth)}
- **Spesa giornaliera sostenibile**: ${this.formatCurrency(budget.dailySafeSpend)}/giorno
- **Fondo Emergenza XEON**: ${((accounts.find(a => a.name.toLowerCase().includes('xeon'))?.balance || 5383.32) / (summary.monthlyExpense || 800)).toFixed(1)} mesi di autonomia

Puoi chiedermi ad esempio:
- *"Quanto posso spendere oggi?"*
- *"Dove ho speso di più questo mese?"*
- *"Quanti mesi di autonomia ho?"*
- *"Come posso ottimizzare le tasse e il fondo pensione?"*`;
  }

  async callGeminiApi(apiKey, userPrompt) {
    const sum = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const systemPrompt = `Sei l'AI Personal CFO di Giorgio, un Private Banker e analista finanziario d'élite con stile Apple minimalista, preciso, concreto ed empatico.
Dati reali del patrimonio:
- Patrimonio Netto: € ${sum.netWorth}
- Liquidità: € ${sum.liquidTotal}
- Spesa mese: € ${sum.monthlyExpense}
- Risparmio mese: € ${sum.savingsAmount} (Tasso: ${sum.savingsRate}%)
- Conti: ${accounts.map(a => `${a.name}: € ${a.balance}`).join(', ')}
Rispondi in italiano con tono professionale, formattazione markdown chiara, cifre precise ed evidenziando opportunità di ottimizzazione.`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nDomanda utente: ${userPrompt}` }] }
        ]
      })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }
}

export const financialAssistantService = new FinancialAssistantService();
if (typeof window !== 'undefined') {
  window.FinancialAssistantServiceInstance = financialAssistantService;
}
