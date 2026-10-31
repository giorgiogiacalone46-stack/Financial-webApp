/**
 * Financial WebApp - Smart Auto-Categorization Engine
 * Autocategorizza le transazioni durante la digitazione in tempo reale.
 * Apprende costantemente dalle abitudini di Giorgio (historical learning + keyword dictionary).
 */

import { cleanCategoryName } from '../components/icons.js';

// Dizionario FinTech Precaricato (Principali merchant e parole chiave italiane)
const DEFAULT_KEYWORD_RULES = [
  // Alimentari & Spesa
  { keywords: ['esselunga', 'conad', 'coop', 'lidl', 'carrefour', 'pam', 'iper', 'spesa', 'supermercato', 'eurospin', 'penny', 'crai', 'tigros', 'unes', 'aldi', 'panificio', 'fruttivendolo', 'macelleria'], category: 'Alimentari' },
  // Auto & Trasporti
  { keywords: ['telepass', 'autostrada', 'eni', 'q8', 'ip', 'tamoil', 'esso', 'benzina', 'carburante', 'diesel', 'gpl', 'parcheggio', 'garage', 'pedaggio', 'trenitalia', 'italo', 'atm', 'metro', 'bus', 'uber', 'taxi', 'tagliando', 'meccanico', 'gommista', 'bollo auto', 'assicurazione auto'], category: 'Auto' },
  // Ristoranti & Bar
  { keywords: ['ristorante', 'pizzeria', 'trattoria', 'osteria', 'bar', 'caffe', 'bistrot', 'pub', 'aperitivo', 'justeat', 'deliveroo', 'glovo', 'mcdonald', 'burger king', 'poke', 'sushi', 'pranzo', 'cena'], category: 'Ristoranti & Bar' },
  // Casa & Utenze
  { keywords: ['affitto', 'mutuo', 'enel', 'a2a', 'iren', 'edison', 'sorgenia', 'luce', 'gas', 'bolletta', 'acqua', 'tari', 'condominio', 'fastweb', 'iliad', 'vodafone', 'tim', 'windtre', 'internet', 'fibra', 'ikea', 'leroy merlin'], category: 'Casa & Utenze' },
  // Svago & Intrattenimento
  { keywords: ['netflix', 'spotify', 'amazon prime', 'disney', 'dazn', 'sky', 'cinema', 'teatro', 'concerto', 'playstation', 'steam', 'nintendo', 'abbonamento', 'palestra', 'sport', 'piscina'], category: 'Svago & Intrattenimento' },
  // Salute & Cura
  { keywords: ['farmacia', 'parafarmacia', 'medico', 'visita', 'dentista', 'ottico', 'analisi', 'ticket', 'ospedale', 'clinica', 'cura', 'psicologo'], category: 'Salute & Benessere' },
  // Shopping & Abbigliamento
  { keywords: ['amazon', 'zalando', 'zara', 'h&m', 'uniqlo', 'ovs', 'abbigliamento', 'scarpe', 'negozio', 'vestiti', 'elettronica', 'unieuro', 'mediaworld', 'apple store'], category: 'Shopping' },
  // Viaggi & Vacanze
  { keywords: ['ryanair', 'easyjet', 'wizzair', 'hotel', 'airbnb', 'booking', 'volo', 'vacanza', 'albergo', 'resort', 'treno', 'viaggio'], category: 'Viaggi' },
  // Lavoro & Stipendio
  { keywords: ['stipendio', 'technosky', 'busta paga', 'emolumenti', 'accredito stipendio', 'compenso', 'bonifico datore'], category: 'Stipendio' },
  // Investimenti & Risparmio
  { keywords: ['vwce', 'etf', 'trade republic', 'pac', 'acquisto quote', 'azioni', 'degiro', 'scalable'], category: 'Investimenti' },
  { keywords: ['xeon', 'fondo emergenza', 'overnight', 'liquidita remunerata', 'cuscinetto'], category: 'Fondo di emergenza' },
  { keywords: ['fondo pensione', 'previdenza', 'secondapensione', 'fondo fonte', 'cometa'], category: 'Fondo Pensione' }
];

export class SmartCategorizer {
  constructor(storageKey = 'finanze_smart_rules') {
    this.storageKey = storageKey;
    this.customRules = this.loadCustomRules();
  }

  loadCustomRules() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Errore lettura smart rules da localStorage:', e);
    }
    return [];
  }

  saveCustomRules() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.customRules));
    } catch (e) {
      console.warn('Errore salvataggio smart rules:', e);
    }
  }

  /**
   * Apprende una nuova associazione o rinforza una preferenza dell'utente.
   */
  learnAssociation(description, category) {
    if (!description || !category) return;
    const cleanDesc = description.trim().toLowerCase();
    const cleanCat = cleanCategoryName(category);

    // Estrae i token significativi (parole di almeno 3 caratteri)
    const tokens = cleanDesc.split(/[\s,.\-_/]+/).filter(t => t.length >= 3);
    
    // Aggiorna o aggiunge regola per l'intera descrizione o per il token principale
    const keyToken = tokens[0] || cleanDesc;
    const existing = this.customRules.find(r => r.keyword === keyToken);
    if (existing) {
      existing.category = cleanCat;
      existing.count = (existing.count || 1) + 1;
    } else {
      this.customRules.unshift({
        keyword: keyToken,
        category: cleanCat,
        count: 1,
        learnedAt: new Date().toISOString()
      });
      // Mantiene al massimo 200 regole
      if (this.customRules.length > 200) this.customRules.pop();
    }
    this.saveCustomRules();
  }

  /**
   * Predice la categoria in tempo reale mentre Giorgio digita la descrizione.
   * @param {string} text Descrizione inserita dall'utente
   * @param {Array} pastTransactions Storico transazioni
   * @param {Array} availableCategories Categorie censite nel sistema
   * @returns {Object|null} { category, source, confidence, matchedRule }
   */
  predictCategory(text, pastTransactions = [], availableCategories = []) {
    if (!text || text.trim().length < 2) return null;
    const cleanInput = text.trim().toLowerCase();
    const inputTokens = cleanInput.split(/[\s,.\-_/]+/).filter(t => t.length >= 2);

    // 1. Priorità 1: Regole personalizzate apprese dall'utente
    for (const rule of this.customRules) {
      if (cleanInput.includes(rule.keyword) || rule.keyword.includes(cleanInput)) {
        const matched = this.matchAvailableCategory(rule.category, availableCategories);
        if (matched) {
          return {
            category: matched,
            source: 'learned',
            confidence: 'high',
            keyword: rule.keyword
          };
        }
      }
    }

    // 2. Priorità 2: Corrispondenza con lo storico delle transazioni reali
    if (pastTransactions && pastTransactions.length > 0) {
      // Cerca corrispondenza esatta di parole chiave nei movimenti passati
      for (const token of inputTokens) {
        if (token.length < 3) continue;
        const matchingTxs = pastTransactions.filter(tx => 
          tx.description && tx.description.toLowerCase().includes(token)
        );
        if (matchingTxs.length > 0) {
          // Trova la categoria più frequente per quel token
          const freqMap = {};
          matchingTxs.forEach(tx => {
            const cat = cleanCategoryName(tx.category);
            freqMap[cat] = (freqMap[cat] || 0) + 1;
          });
          const sortedCats = Object.entries(freqMap).sort((a, b) => b[1] - a[1]);
          if (sortedCats.length > 0) {
            const bestCat = sortedCats[0][0];
            const matched = this.matchAvailableCategory(bestCat, availableCategories);
            if (matched) {
              return {
                category: matched,
                source: 'history',
                confidence: sortedCats[0][1] >= 2 ? 'high' : 'medium',
                keyword: token
              };
            }
          }
        }
      }
    }

    // 3. Priorità 3: Dizionario FinTech Precaricato
    for (const rule of DEFAULT_KEYWORD_RULES) {
      for (const kw of rule.keywords) {
        if (cleanInput.includes(kw)) {
          const matched = this.matchAvailableCategory(rule.category, availableCategories);
          if (matched) {
            return {
              category: matched,
              source: 'dictionary',
              confidence: 'high',
              keyword: kw
            };
          }
        }
      }
    }

    return null;
  }

  /**
   * Mappa il nome della categoria predetta su una delle categorie attive registrate
   */
  matchAvailableCategory(targetName, availableCategories) {
    if (!availableCategories || availableCategories.length === 0) return targetName;
    const cleanTarget = cleanCategoryName(targetName).toLowerCase();
    
    // Cerca match esatto (ignorando emoji)
    const exact = availableCategories.find(c => cleanCategoryName(c.name || c).toLowerCase() === cleanTarget);
    if (exact) return exact.name || exact;

    // Cerca match parziale
    const partial = availableCategories.find(c => {
      const cClean = cleanCategoryName(c.name || c).toLowerCase();
      return cClean.includes(cleanTarget) || cleanTarget.includes(cClean);
    });
    if (partial) return partial.name || partial;

    return targetName;
  }
}

export const smartCategorizer = new SmartCategorizer();
if (typeof window !== 'undefined') {
  window.SmartCategorizerInstance = smartCategorizer;
}
