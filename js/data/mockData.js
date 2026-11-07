/**
 * Data Store Principale - Supporta:
 * - Categorie dinamiche (CRUD con salvataggio localStorage)
 * - Conti dinamici e Saldi iniziali (CRUD con salvataggio localStorage)
 * - Transazioni reali da Google Sheets o cache locale
 * - Saldi reali (Patrimonio, Investimenti, Net Worth)
 * - Storico Net Worth (2024-2026)
 * - Rate e Spese Ricorrenti
 */

import { INITIAL_CATEGORIES, INITIAL_PROVIDERS, INITIAL_ACCOUNTS, INITIAL_SALDI, INITIAL_HISTORICAL_NW, INITIAL_MONTHLY_BREAKDOWNS, INITIAL_TRANSACTIONS, INITIAL_GOALS, DEFAULT_SMART_RULES } from './demoData.js';
import { AssetCatalogService } from './assetCatalog.js';

const STORAGE_KEYS = {
  CATEGORIES: 'finanze_custom_categories',
  ACCOUNTS: 'finanze_custom_accounts',
  PROVIDERS: 'finanze_providers',
  TRANSACTIONS: 'finanze_cached_txs',
  SECURITY_PIN: 'finanze_security_pin',
  PIN_ENABLED: 'finanze_pin_enabled',
  GOALS: 'finanze_saving_goals',
  RISK_PROFILE: 'finanze_risk_profile',
  PRIVACY_MODE: 'finanze_privacy_mode',
  SMART_RULES: 'finanze_smart_rules',
  NW_SNAPSHOTS: 'finanze_nw_snapshots',
  MONTHLY_CLOSINGS: 'finanze_monthly_closings_v1',
  SALARY_CONFIG: 'finanze_salary_config',
  CLOUD_SYNCED: 'finanze_cloud_synced_v1'
};

class FinanceStore {
  constructor() {
    this.categories = this.loadCategories();
    this.providers = this.loadProviders();
    this.accounts = this.loadAccounts();
    this.transactions = this.loadTransactions();
    this.recalculateLiveBalances();
    this.saldi = INITIAL_SALDI;
    this.historicalNW = INITIAL_HISTORICAL_NW;
    this.goals = this.loadGoals();
    this.riskProfile = this.loadRiskProfile();
    this.smartRules = this.loadSmartRules();
    this.nwSnapshots = this.loadNetWorthSnapshots();
    this.monthlyClosings = this.loadMonthlyClosings();
    this.salaryConfig = this.loadSalaryConfig();
  }

  // === CONFIGURAZIONE STIPENDIO, 13ESIMA, 14ESIMA, PREMI & BENEFIT ===
  loadSalaryConfig() {
    const defaults = {
      baseSalary: 1700.00,
      payDay: 25,
      has13th: true,
      thirteenthAmount: 1700.00,
      thirteenthMonth: 11, // Novembre per Giorgio (con accredito stipendio del 25)
      has14th: true,
      fourteenthAmount: 1700.00,
      fourteenthMonth: 6, // Giugno
      hasProductionBonus: false,
      productionBonusAmount: 1200.00,
      productionBonusMonth: 4, // Aprile
      extraMonthlyAllowances: 0.00
    };
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SALARY_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Se era rimasto al vecchio default 12, allinea al mese reale di Giorgio (11 = Novembre)
        if (parsed.thirteenthMonth === 12 && !parsed.explicitlyChosenDecember) {
          parsed.thirteenthMonth = 11;
        }
        return { ...defaults, ...parsed };
      }
    } catch (e) {}
    return defaults;
  }

  saveSalaryConfig(config) {
    this.salaryConfig = { ...this.salaryConfig, ...config };
    try {
      localStorage.setItem(STORAGE_KEYS.SALARY_CONFIG, JSON.stringify(this.salaryConfig));
    } catch (e) {}
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('finanze:salary-config-updated', { detail: this.salaryConfig }));
    }
    return this.salaryConfig;
  }

  getSalaryConfig() {
    return { ...this.salaryConfig };
  }

  getEstimatedSalaryForMonth(monthNum, yearNum = null) {
    const cfg = this.salaryConfig || this.loadSalaryConfig();
    let total = parseFloat(cfg.baseSalary) || 1700.00;
    const m = parseInt(monthNum, 10);

    if (cfg.has13th && m === parseInt(cfg.thirteenthMonth, 10)) {
      total += parseFloat(cfg.thirteenthAmount) || 0;
    }
    if (cfg.has14th && m === parseInt(cfg.fourteenthMonth, 10)) {
      total += parseFloat(cfg.fourteenthAmount) || 0;
    }
    if (cfg.hasProductionBonus && m === parseInt(cfg.productionBonusMonth, 10)) {
      total += parseFloat(cfg.productionBonusAmount) || 0;
    }
    total += parseFloat(cfg.extraMonthlyAllowances) || 0;

    return Math.round(total * 100) / 100;
  }

  // === CATEGORIE ===
  loadCategories() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...INITIAL_CATEGORIES];
  }

  saveCategories() {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(this.categories));
  }

  getCategories() {
    return [...this.categories];
  }

  addCategory(category) {
    const id = 'cat_' + Date.now();
    const newCat = {
      id,
      name: category.name.trim(),
      type: category.type || 'expense',
      color: category.color || '#0071E3'
    };
    this.categories.push(newCat);
    this.saveCategories();
    return newCat;
  }

  deleteCategory(id) {
    this.categories = this.categories.filter(c => c.id !== id && c.name !== id);
    this.saveCategories();
  }

  // === PROVIDER DI CONTI (BANCHE & BROKER) ===
  loadProviders() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...INITIAL_PROVIDERS];
  }

  saveProviders() {
    localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(this.providers));
  }

  getProviders() {
    if (!this.providers || this.providers.length === 0) {
      this.providers = this.loadProviders();
    }
    return [...this.providers];
  }

  addProvider(name) {
    if (!name || typeof name !== 'string') return null;
    const clean = name.trim();
    if (!clean) return null;
    if (!this.providers) this.providers = this.loadProviders();
    const exists = this.providers.some(p => p.toLowerCase() === clean.toLowerCase());
    if (!exists) {
      this.providers.push(clean);
      this.saveProviders();
    }
    return clean;
  }

  // === CONTI & SALDI ===
  loadAccounts() {
    let accs = [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      if (saved) accs = JSON.parse(saved);
    } catch (e) {}

    if (!accs || accs.length === 0) {
      accs = JSON.parse(JSON.stringify(INITIAL_ACCOUNTS));
    }

    // Auto-migrazione: se l'utente ha ancora XEON e VWCE separati, li unifichiamo nel broker Trade Republic
    const hasOldXeon = accs.some(a => a.id === 'xeon' || (a.name || '').toLowerCase() === 'trade republic - xeon');
    const hasOldVwce = accs.some(a => a.id === 'vwce' || (a.name || '').toLowerCase() === 'trade republic - vwce');
    const hasNewBroker = accs.some(a => a.id === 'trade_republic' || (a.name || '').toLowerCase() === 'trade republic');

    if ((hasOldXeon || hasOldVwce) && !hasNewBroker) {
      const oldXeon = accs.find(a => a.id === 'xeon' || (a.name || '').toLowerCase() === 'trade republic - xeon');
      const oldVwce = accs.find(a => a.id === 'vwce' || (a.name || '').toLowerCase() === 'trade republic - vwce');
      const xeonBal = oldXeon ? (parseFloat(oldXeon.balance) || 0) : 4500.00;
      const vwceBal = oldVwce ? (parseFloat(oldVwce.balance) || 0) : 3700.00;

      const brokerAcc = {
        id: 'trade_republic',
        name: 'Trade Republic',
        provider: 'Trade Republic',
        type: 'Broker / Investimenti',
        balance: Math.round((xeonBal + vwceBal) * 100) / 100,
        cashBalance: 0.00,
        isInvestment: true,
        isBroker: true,
        holdings: [
          {
            id: 'holding_xeon',
            ticker: 'XEON',
            isin: 'LU0290358497',
            name: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF',
            assetClass: 'monetario',
            assetClassLabel: 'Monetario / Liquidità Sicura',
            shares: 47.74,
            price: 144.08,
            currentValue: xeonBal,
            color: '#34C759',
            emergencyMonthsQuota: 5000.00,
            safeInvestmentQuota: Math.max(0, xeonBal - 5000.00),
            isPac: false,
            pacAmount: 0
          },
          {
            id: 'holding_vwce',
            ticker: 'VWCE',
            isin: 'IE00BK5BQT80',
            name: 'Vanguard FTSE All-World UCITS ETF (USD) Acc',
            assetClass: 'azionario_globale',
            assetClassLabel: 'Azionario Globale (All-World)',
            shares: 28.97,
            price: 124.62,
            currentValue: vwceBal,
            color: '#0071E3',
            isPac: true,
            pacAmount: 200
          }
        ],
        lastReconciledMonth: '10/2026',
        lastReconciledDate: '31/10/2026',
        defaultMode: 'balance'
      };

      accs = accs.filter(a => a.id !== 'xeon' && a.id !== 'vwce' && (a.name || '').toLowerCase() !== 'trade republic - xeon' && (a.name || '').toLowerCase() !== 'trade republic - vwce');
      accs.splice(1, 0, brokerAcc);
      try {
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accs));
      } catch (e) {}
    }

    // Assicura la presenza dei metadati di riconciliazione e freschezza, auto-healing per cache disallineate
    accs.forEach(a => {
      const isPension = a.isPension || (a.type || '').toLowerCase().includes('pension') || (a.name || '').toLowerCase().includes('pension');
      const initialMatch = INITIAL_ACCOUNTS.find(ia => ia.id === a.id || ia.name.toLowerCase() === a.name.toLowerCase());

      // Auto-healing della cache locale se è rimasta a settembre ma i saldi sono già stati riconciliati al 31/10
      if (initialMatch && initialMatch.lastReconciledMonth === '10/2026' && a.lastReconciledMonth === '09/2026') {
        a.lastReconciledMonth = '10/2026';
        a.lastReconciledDate = initialMatch.lastReconciledDate || '31/10/2026';
        if (initialMatch.balance && !a.balance) {
          a.balance = initialMatch.balance;
        }
      }

      if (!a.lastReconciledMonth) {
        a.lastReconciledMonth = initialMatch?.lastReconciledMonth || '10/2026';
      }
      if (!a.lastReconciledDate) {
        a.lastReconciledDate = initialMatch?.lastReconciledDate || '31/10/2026';
      }
      if (!a.defaultMode) {
        a.defaultMode = isPension ? 'delta' : 'balance';
      }

      // Base di conguaglio certificata per il calcolo del saldo vivo dai movimenti
      if (typeof a.reconciledBalance === 'undefined' || a.reconciledBalance === null || isNaN(a.reconciledBalance)) {
        a.reconciledBalance = (initialMatch && typeof initialMatch.reconciledBalance !== 'undefined')
          ? initialMatch.reconciledBalance
          : (parseFloat(a.balance) || 0);
      }

      // Separazione rigorosa Buoni Pasto dalla liquidità cassa disponibile
      if (a.id === 'buoni_pasto' || (a.name || '').toLowerCase().includes('buoni pasto')) {
        a.isLiquid = false;
        a.isVoucher = true;
      }

      // Sanificazione cache: azzera l'eventuale residuo fittizio di 5€ su Trade Republic
      if (a.id === 'trade_republic' || (a.name || '').toLowerCase() === 'trade republic') {
        if (a.cashBalance === 5 || a.cashBalance === 5.0) {
          a.cashBalance = 0.00;
          if (Array.isArray(a.holdings) && a.holdings.length > 0) {
            this.recalculateBrokerBalance(a);
          } else {
            a.balance = 10488.57;
          }
          a.reconciledBalance = a.balance;
        }
      }

      // Assicura provider e campi broker
      if (!a.provider) {
        if (a.id === 'trade_republic' || (a.name || '').toLowerCase().includes('trade republic')) a.provider = 'Trade Republic';
        else if (a.id === 'buddybank' || (a.name || '').toLowerCase().includes('buddybank')) a.provider = 'Buddybank';
        else if (a.id === 'buoni_pasto' || (a.name || '').toLowerCase().includes('buoni')) a.provider = 'Edenred';
        else if (a.isPension || (a.name || '').toLowerCase().includes('pensione')) a.provider = 'Fondo Pensione';
        else a.provider = a.name;
      }

      if (a.isBroker) {
        if (!Array.isArray(a.holdings)) a.holdings = [];
        if (typeof a.cashBalance === 'undefined') a.cashBalance = 0;
      }
    });

    return accs;
  }

  _slugifyAccountId(name) {
    const clean = String(name || '').trim().toLowerCase();
    if (!clean) return 'acc_' + Date.now();
    if (clean === 'buddybank' || clean.includes('buddybank')) return 'buddybank';
    if (clean === 'trade republic' || clean.startsWith('trade republic')) return 'trade_republic';
    if (clean.includes('pensione') || clean.includes('previden')) return 'pensione';
    if (clean === 'contanti' || clean === 'cash') return 'contanti';
    if (clean.includes('buoni pasto') || clean.includes('ticket') || clean.includes('tiket')) return 'buoni_pasto';
    return clean.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || ('acc_' + Date.now());
  }

  _parseSheetDateInfo(dateRaw) {
    if (!dateRaw) return null;
    const dateStr = String(dateRaw).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const [y, m, d] = dateStr.split('T')[0].split('-');
      const ts = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
      return {
        formattedDate: `${d}/${m}/${y}`,
        monthKey: `${m}/${y}`,
        timestamp: ts
      };
    }
    if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(dateStr)) {
      const parts = dateStr.split('/');
      const d = parts[0].padStart(2, '0');
      const m = parts[1].padStart(2, '0');
      const y = parts[2];
      const ts = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
      return {
        formattedDate: `${d}/${m}/${y}`,
        monthKey: `${m}/${y}`,
        timestamp: ts
      };
    }
    // Formato MM/YYYY o M/YYYY (es. "01/2024", "10/2026")
    if (/^\d{1,2}\/\d{4}$/.test(dateStr)) {
      const parts = dateStr.split('/');
      const m = parts[0].padStart(2, '0');
      const y = parts[1];
      const d = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
      const ts = new Date(parseInt(y, 10), parseInt(m, 10) - 1, d).getTime();
      return {
        formattedDate: `${String(d).padStart(2, '0')}/${m}/${y}`,
        monthKey: `${m}/${y}`,
        timestamp: ts
      };
    }
    // Formato YYYY-MM (es. "2024-01")
    if (/^\d{4}-\d{1,2}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      const y = parts[0];
      const m = parts[1].padStart(2, '0');
      const d = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
      const ts = new Date(parseInt(y, 10), parseInt(m, 10) - 1, d).getTime();
      return {
        formattedDate: `${String(d).padStart(2, '0')}/${m}/${y}`,
        monthKey: `${m}/${y}`,
        timestamp: ts
      };
    }
    // Formato testuale mese anno (es. "Gennaio 2024", "Ottobre 2026", "Ott 2026")
    const itMonths = {
      'gennaio': '01', 'gen': '01', 'febbraio': '02', 'feb': '02',
      'marzo': '03', 'mar': '03', 'aprile': '04', 'apr': '04',
      'maggio': '05', 'mag': '05', 'giugno': '06', 'giu': '06',
      'luglio': '07', 'lug': '07', 'agosto': '08', 'ago': '08',
      'settembre': '09', 'set': '09', 'ottobre': '10', 'ott': '10',
      'novembre': '11', 'nov': '11', 'dicembre': '12', 'dic': '12'
    };
    const textMatch = dateStr.toLowerCase().match(/([a-zà-ÿ]+)\s+(\d{4})/);
    if (textMatch) {
      const mName = textMatch[1];
      const y = textMatch[2];
      const m = itMonths[mName];
      if (m) {
        const d = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
        const ts = new Date(parseInt(y, 10), parseInt(m, 10) - 1, d).getTime();
        return {
          formattedDate: `${String(d).padStart(2, '0')}/${m}/${y}`,
          monthKey: `${m}/${y}`,
          timestamp: ts
        };
      }
    }
    return null;
  }

  _classifyAccountSpec(rawName, rawType = '') {
    const accId = this._slugifyAccountId(rawName);
    const nameLower = String(rawName || '').trim().toLowerCase();
    const typeLower = String(rawType || '').trim().toLowerCase();

    const isPension = accId === 'pensione' || nameLower.includes('pension') || nameLower.includes('previden') || typeLower.includes('pension') || typeLower.includes('previden');
    const isVoucher = accId === 'buoni_pasto' || nameLower.includes('buoni pasto') || nameLower.includes('ticket') || nameLower.includes('tiket') || typeLower.includes('buoni') || typeLower.includes('benefit');
    const isBroker = accId === 'trade_republic' || nameLower.includes('directa') || nameLower.includes('degiro') || nameLower.includes('scalable') || typeLower.includes('broker') || typeLower.includes('invest') || typeLower.includes('etf');
    const isInvestment = isBroker || typeLower.includes('sicurezza') || typeLower.includes('monetar') || typeLower.includes('azion');
    const isLiquid = !isPension && !isVoucher && !isInvestment;

    let provider = String(rawName || '').trim();
    if (accId === 'trade_republic') provider = 'Trade Republic';
    else if (accId === 'buddybank') provider = 'Buddybank';
    else if (isVoucher) provider = 'Edenred / Pluxee';
    else if (isPension) provider = 'Fondo Pensione';
    else if (accId === 'contanti') provider = 'Contanti';

    let defaultType = rawType || 'Liquidità corrente';
    if (!rawType) {
      if (isBroker) defaultType = 'Broker / Investimenti';
      else if (isPension) defaultType = 'Previdenza complementare';
      else if (isVoucher) defaultType = 'Buoni Pasto / Benefit';
      else if (accId === 'contanti') defaultType = 'Liquidità contante';
    }

    return { accId, provider, type: defaultType, isPension, isVoucher, isBroker, isInvestment, isLiquid };
  }

  /**
   * Motore unificato di sincronizzazione Cloud (Google Sheets -> App Store):
   * 1. Rimuove automaticamente i conti dimostrativi fittizi di demoData.js
   * 2. Ricostruisce con i nomi esatti tutti i conti reali presenti in 'Saldi' e 'Movimenti'
   * 3. Unifica gli asset broker (es. 'Trade Republic - XEON' + 'Trade Republic - VWCE') nel conto broker con holdings reali
   * 4. Calcola al centesimo i saldi di conguaglio e i saldi vivi post-conguaglio (inclusi conti presenti solo in 'Movimenti' come Buoni Pasto)
   */
  syncCloudData(data) {
    if (!data || typeof data !== 'object') return false;

    const hasTransactions = Array.isArray(data.transactions) && data.transactions.length > 0;
    const hasSaldi = Array.isArray(data.saldi) && data.saldi.length > 0;
    if (!hasTransactions && !hasSaldi) return false;

    const wasCloudSynced = (typeof localStorage !== 'undefined') && localStorage.getItem(STORAGE_KEYS.CLOUD_SYNCED) === 'true';

    // 1. Normalizza e salva l'elenco movimenti ricevuto da Google Sheets
    if (hasTransactions) {
      this.transactions = data.transactions.map(t => {
        const amount = typeof t.amount === 'number'
          ? t.amount
          : parseFloat(String(t.amount).replace(/€/g, '').replace(/\./g, '').replace(',', '.')) || 0;
        return {
          ...t,
          amount: Math.abs(amount)
        };
      });
    }

    // 2. Filtra righe riepilogative di 'Saldi' (es. TOTALE NET WORTH / TOTALE LIQUIDO & INVESTITO)
    const validSaldiRows = hasSaldi
      ? data.saldi.filter(s => {
          if (!s || !s.name) return false;
          const n = String(s.name).trim().toLowerCase();
          const tp = String(s.type || '').trim().toLowerCase();
          if (!n) return false;
          if (n.startsWith('totale') || n.startsWith('total') || n === 'net worth' || n === 'nw (eur)') return false;
          if (tp.includes('patrimonio complessivo') || tp.includes('disponibilità diretta')) return false;
          return true;
        })
      : [];

    // Raccoglie tutti i nomi reali dei conti presenti nel foglio cloud (Saldi + Movimenti)
    const cloudAccountNamesLower = new Set();
    validSaldiRows.forEach(s => {
      const raw = String(s.name).trim();
      cloudAccountNamesLower.add(raw.toLowerCase());
      if (raw.includes(' - ')) {
        cloudAccountNamesLower.add(raw.split(' - ')[0].trim().toLowerCase());
      }
    });
    if (hasTransactions) {
      data.transactions.forEach(t => {
        [t.fromAccount, t.account, t.toAccount].forEach(accStr => {
          if (!accStr) return;
          const raw = String(accStr).trim();
          if (!raw) return;
          cloudAccountNamesLower.add(raw.toLowerCase());
          if (raw.includes(' - ')) {
            cloudAccountNamesLower.add(raw.split(' - ')[0].trim().toLowerCase());
          }
        });
      });
    }

    // 3. Rimozione automatica dei conti dimostrativi fittizi di demoData.js non presenti nel foglio reale
    const DEMO_PLACEHOLDER_IDS = new Set(['conto_corrente', 'carta_spese', 'broker_investimenti', 'pensione']);
    const DEMO_PLACEHOLDER_NAMES = new Set(['conto corrente', 'carta spese', 'portafoglio investimenti', 'fondo previdenza']);

    this.accounts = (this.accounts || []).filter(a => {
      const aNameLower = String(a.name || '').trim().toLowerCase();
      const isDemoPlaceholder = DEMO_PLACEHOLDER_IDS.has(a.id) || DEMO_PLACEHOLDER_NAMES.has(aNameLower);
      if (isDemoPlaceholder && !cloudAccountNamesLower.has(aNameLower)) {
        return false;
      }
      return true;
    });

    // Se è il primo aggancio cloud (transizione da demoData -> foglio personale), azzera i saldi demo residui sui conti omonimi (Contanti, Buoni Pasto, Fondo Previdenza)
    if (!wasCloudSynced) {
      this.accounts.forEach(a => {
        if (a.id === 'contanti' || a.id === 'buoni_pasto' || a.id === 'pensione') {
          a.balance = 0;
          a.reconciledBalance = 0;
        }
      });
    }

    // 4. Ricostruzione e allineamento conti dalla scheda 'Saldi' (Multi-Data & Saldi Storici)
    const reconciledAccountIds = new Set();
    let latestSaldiInfo = null;

    // Raccoglie eventuali righe di riepilogo "TOTALE NET WORTH" / "PATRIMONIO COMPLESSIVO" presenti nel foglio
    const summaryRowsByMonth = new Map();
    if (hasSaldi) {
      data.saldi.forEach(s => {
        if (!s || !s.name) return;
        const n = String(s.name).trim().toLowerCase();
        const tp = String(s.type || '').trim().toLowerCase();
        const isSummary = n.startsWith('totale') || n.startsWith('total') || n === 'net worth' || n === 'nw (eur)' || tp.includes('patrimonio complessivo');
        if (isSummary) {
          const dInfo = this._parseSheetDateInfo(s.date);
          const bal = parseFloat(s.balance);
          if (dInfo && !isNaN(bal) && bal > 0) {
            summaryRowsByMonth.set(dInfo.monthKey, bal);
          }
        }
      });
    }

    // Registra e crea tutti i conti ed eventuali holdings presenti in qualsiasi riga di Saldi
    validSaldiRows.forEach(s => {
      const rawName = String(s.name || '').trim();
      const rawType = String(s.type || '').trim();
      const bal = parseFloat(s.balance);
      if (!rawName || isNaN(bal)) return;

      const dInfo = this._parseSheetDateInfo(s.date);
      if (dInfo && (!latestSaldiInfo || dInfo.timestamp >= latestSaldiInfo.timestamp)) {
        latestSaldiInfo = dInfo;
      }

      // Caso 4A: Riga sub-asset Broker (es. "Trade Republic - XEON", "Trade Republic - VWCE")
      if (rawName.includes(' - ')) {
        const parts = rawName.split(' - ');
        const brokerName = parts[0].trim();
        const assetPart = parts.slice(1).join(' - ').trim();
        const brokerId = this._slugifyAccountId(brokerName);

        let brokerAcc = this.accounts.find(a =>
          a.id === brokerId || String(a.name || '').trim().toLowerCase() === brokerName.toLowerCase()
        );

        if (!brokerAcc) {
          brokerAcc = {
            id: brokerId,
            name: brokerName,
            provider: brokerName,
            type: 'Broker / Investimenti',
            balance: 0,
            reconciledBalance: 0,
            cashBalance: 0,
            isLiquid: false,
            isVoucher: false,
            isInvestment: true,
            isBroker: true,
            isPension: false,
            holdings: [],
            lastReconciledMonth: dInfo?.monthKey || '10/2026',
            lastReconciledDate: dInfo?.formattedDate || '31/10/2026',
            defaultMode: 'balance'
          };
          this.accounts.push(brokerAcc);
          this.addProvider(brokerName);
        } else {
          brokerAcc.name = brokerName;
          brokerAcc.isBroker = true;
          brokerAcc.isInvestment = true;
          brokerAcc.isLiquid = false;
          if (!Array.isArray(brokerAcc.holdings)) brokerAcc.holdings = [];
          if (typeof brokerAcc.cashBalance === 'undefined') brokerAcc.cashBalance = 0;
        }

        const recognized = AssetCatalogService.lookupAsset(assetPart);
        const ticker = String(recognized?.ticker || assetPart).trim().toUpperCase();
        let targetHolding = brokerAcc.holdings.find(h =>
          String(h.ticker || '').toUpperCase() === ticker ||
          String(h.name || '').toLowerCase() === assetPart.toLowerCase()
        );

        if (!targetHolding) {
          const isMonetario = ticker === 'XEON' || rawType.toLowerCase().includes('monetar') || rawType.toLowerCase().includes('emergenza') || rawType.toLowerCase().includes('sicurezza');
          targetHolding = {
            id: 'holding_' + ticker.toLowerCase().replace(/[^a-z0-9]/g, ''),
            ticker,
            isin: recognized?.isin || (ticker === 'XEON' ? 'LU0290358497' : (ticker === 'VWCE' ? 'IE00BK5BQT80' : '')),
            name: recognized?.name || assetPart,
            assetClass: recognized?.assetClass || (isMonetario ? 'monetario' : 'azionario_globale'),
            assetClassLabel: recognized?.classLabel || rawType || (isMonetario ? 'Monetario / Liquidità Sicura' : 'Azionario Globale (All-World)'),
            shares: 0,
            price: ticker === 'XEON' ? 144.08 : (ticker === 'VWCE' ? 124.62 : 100),
            currentValue: 0,
            color: recognized?.color || (isMonetario ? '#34C759' : '#0071E3'),
            emergencyMonthsQuota: ticker === 'XEON' ? 5000 : 0,
            safeInvestmentQuota: 0,
            isPac: ticker === 'VWCE',
            pacAmount: ticker === 'VWCE' ? 200 : 0
          };
          brokerAcc.holdings.push(targetHolding);
        }
      } else {
        // Caso 4B: Conto diretto (es. "Buddybank", "Contanti", "Fondo Pensione", "Buoni Pasto")
        const spec = this._classifyAccountSpec(rawName, rawType);
        let acc = this.accounts.find(a =>
          a.id === spec.accId || String(a.name || '').trim().toLowerCase() === rawName.toLowerCase()
        );

        if (!acc) {
          acc = {
            id: spec.accId,
            name: rawName,
            provider: spec.provider,
            type: spec.type,
            balance: bal,
            reconciledBalance: bal,
            cashBalance: 0,
            isLiquid: spec.isLiquid,
            isVoucher: spec.isVoucher,
            isInvestment: spec.isInvestment,
            isBroker: spec.isBroker,
            isPension: spec.isPension,
            holdings: [],
            lastReconciledMonth: dInfo?.monthKey || '10/2026',
            lastReconciledDate: dInfo?.formattedDate || '31/10/2026',
            defaultMode: spec.isPension ? 'delta' : 'balance'
          };
          this.accounts.push(acc);
          this.addProvider(spec.provider);
        } else {
          acc.name = rawName;
          acc.provider = spec.provider || acc.provider;
          acc.type = rawType || acc.type || spec.type;
          acc.isPension = spec.isPension;
          acc.isVoucher = spec.isVoucher;
          acc.isBroker = spec.isBroker || acc.isBroker;
          acc.isInvestment = spec.isInvestment || acc.isInvestment;
          acc.isLiquid = !acc.isPension && !acc.isVoucher && !acc.isInvestment;
        }
      }
    });

    // Imposta il conguaglio più recente (timestamp più alto) per ciascun conto / holding
    this.accounts.forEach(acc => {
      if (acc.isBroker) {
        let latestBrokerDateInfo = null;
        if (Array.isArray(acc.holdings)) {
          acc.holdings.forEach(h => {
            let latestHoldingRow = null;
            let latestHoldingTs = -1;
            validSaldiRows.forEach(s => {
              const rawName = String(s.name || '').trim();
              if (rawName.includes(' - ')) {
                const assetPart = rawName.split(' - ').slice(1).join(' - ').trim();
                const ticker = h.ticker || '';
                if (assetPart.toLowerCase() === h.name.toLowerCase() || assetPart.toUpperCase() === ticker.toUpperCase()) {
                  const dInfo = this._parseSheetDateInfo(s.date);
                  const ts = dInfo?.timestamp || 0;
                  if (ts >= latestHoldingTs) {
                    latestHoldingTs = ts;
                    latestHoldingRow = { s, dInfo };
                  }
                }
              }
            });
            if (latestHoldingRow) {
              const newBal = parseFloat(latestHoldingRow.s.balance) || 0;
              h.currentValue = newBal;
              const refPrice = h.ticker === 'XEON' ? 144.08 : (h.ticker === 'VWCE' ? 124.62 : 100);
              const p = parseFloat(h.price) || refPrice;
              h.price = p;
              if (p > 0) h.shares = Math.round((newBal / p) * 100) / 100;
              if (h.ticker === 'XEON') {
                const emQuota = h.emergencyMonthsQuota || 5000;
                h.safeInvestmentQuota = Math.max(0, Math.round((newBal - emQuota) * 100) / 100);
              }
              if (!latestBrokerDateInfo || latestHoldingTs >= latestBrokerDateInfo.timestamp) {
                latestBrokerDateInfo = latestHoldingRow.dInfo;
              }
            }
          });
        }
        this.recalculateBrokerBalance(acc);
        acc.reconciledBalance = acc.balance;
        if (latestBrokerDateInfo) {
          acc.lastReconciledMonth = latestBrokerDateInfo.monthKey;
          acc.lastReconciledDate = latestBrokerDateInfo.formattedDate;
        }
        reconciledAccountIds.add(acc.id);
      } else {
        let latestRow = null;
        let latestTs = -1;
        validSaldiRows.forEach(s => {
          const rawName = String(s.name || '').trim();
          if (this._isMatchingAccount(rawName, acc)) {
            const dInfo = this._parseSheetDateInfo(s.date);
            const ts = dInfo?.timestamp || 0;
            if (ts >= latestTs) {
              latestTs = ts;
              latestRow = { s, dInfo };
            }
          }
        });
        if (latestRow) {
          const newBal = parseFloat(latestRow.s.balance) || 0;
          acc.reconciledBalance = newBal;
          acc.balance = newBal;
          if (latestRow.dInfo) {
            acc.lastReconciledMonth = latestRow.dInfo.monthKey;
            acc.lastReconciledDate = latestRow.dInfo.formattedDate;
          }
          reconciledAccountIds.add(acc.id);
        }
      }
    });

    // 5. Raggruppa tutte le righe storiche di Saldi per Mese e genera le Chiusure Mensili certificate
    const saldiByMonth = new Map();
    validSaldiRows.forEach(s => {
      const dInfo = this._parseSheetDateInfo(s.date);
      if (!dInfo) return;
      const mKey = dInfo.monthKey;
      if (!saldiByMonth.has(mKey)) {
        saldiByMonth.set(mKey, {
          date: dInfo.formattedDate,
          timestamp: dInfo.timestamp,
          rows: []
        });
      }
      const group = saldiByMonth.get(mKey);
      group.rows.push(s);
      if (dInfo.timestamp >= group.timestamp) {
        group.timestamp = dInfo.timestamp;
        group.date = dInfo.formattedDate;
      }
    });

    // Pulisce solo eventuali chiusure demo residue
    if (this.monthlyClosings) {
      Object.keys(this.monthlyClosings).forEach(mKey => {
        const mc = this.monthlyClosings[mKey];
        if (mc && mc.accounts && ('Conto Corrente' in mc.accounts || 'Portafoglio Investimenti' in mc.accounts || 'Fondo Previdenza' in mc.accounts)) {
          delete this.monthlyClosings[mKey];
        }
      });
    } else {
      this.monthlyClosings = {};
    }

    saldiByMonth.forEach((group, mKey) => {
      const closingAccounts = {};
      let directNW = 0;
      let pensionBal = 0;

      group.rows.forEach(s => {
        const rawName = String(s.name || '').trim();
        const bal = parseFloat(s.balance);
        if (!rawName || isNaN(bal)) return;

        if (rawName.includes(' - ')) {
          closingAccounts[rawName] = bal;
          const brokerName = rawName.split(' - ')[0].trim();
          closingAccounts[brokerName] = Math.round(((closingAccounts[brokerName] || 0) + bal) * 100) / 100;
          directNW += bal;
        } else {
          closingAccounts[rawName] = bal;
          const lowerName = rawName.toLowerCase();
          const lowerType = String(s.type || '').toLowerCase();
          if (lowerName.includes('pensione') || lowerType.includes('previden')) {
            pensionBal += bal;
          } else {
            directNW += bal;
          }
        }
      });

      directNW = Math.round(directNW * 100) / 100;
      const summaryNW = summaryRowsByMonth.get(mKey);
      const totalNW = summaryNW || Math.round((directNW + pensionBal) * 100) / 100;

      this.monthlyClosings[mKey] = {
        monthKey: mKey,
        label: mKey,
        date: group.date,
        isClosed: true,
        accounts: closingAccounts,
        directNW: directNW,
        totalNW: totalNW,
        notes: 'Conguaglio Saldi Google Sheets'
      };
      this.saveNetWorthSnapshot(mKey, totalNW);
    });

    // 5. Scoperta automatica e riconciliazione conti presenti in 'Movimenti' ma non elencati in 'Saldi' (es. Buoni Pasto)
    if (hasTransactions) {
      this.transactions.forEach(t => {
        [t.fromAccount, t.account, t.toAccount].forEach(rawAcc => {
          if (!rawAcc) return;
          let cleanName = String(rawAcc).trim();
          if (!cleanName) return;
          if (cleanName.includes(' - ')) {
            cleanName = cleanName.split(' - ')[0].trim();
          }
          const spec = this._classifyAccountSpec(cleanName);
          const exists = this.accounts.some(a =>
            a.id === spec.accId || String(a.name || '').trim().toLowerCase() === cleanName.toLowerCase()
          );
          if (!exists) {
            this.accounts.push({
              id: spec.accId,
              name: cleanName,
              provider: spec.provider,
              type: spec.type,
              balance: 0,
              reconciledBalance: 0,
              cashBalance: 0,
              isLiquid: spec.isLiquid,
              isVoucher: spec.isVoucher,
              isInvestment: spec.isInvestment,
              isBroker: spec.isBroker,
              isPension: spec.isPension,
              holdings: [],
              lastReconciledMonth: latestSaldiInfo?.monthKey || '01/2000',
              lastReconciledDate: latestSaldiInfo?.formattedDate || '01/01/2000',
              defaultMode: spec.isPension ? 'delta' : 'balance'
            });
            this.addProvider(spec.provider);
          }
        });
      });

      // Per i conti non presenti nella scheda 'Saldi' (es. Buoni Pasto), ricostruisce il saldo di conguaglio cumulando i movimenti fino alla data di conguaglio
      this.accounts.forEach(acc => {
        if (reconciledAccountIds.has(acc.id)) return;
        if (acc.isPension) return;

        if (latestSaldiInfo) {
          let cumAtCutoff = 0;
          this.transactions.forEach(t => {
            const tInfo = this._parseSheetDateInfo(t.date);
            if (!tInfo || tInfo.timestamp > latestSaldiInfo.timestamp) return;
            const amt = Math.abs(parseFloat(t.amount) || 0);
            if (amt === 0) return;

            const type = (t.type || '').toLowerCase();
            const rawType = (t.rawType || '').toLowerCase();
            const isExp = type === 'expense' || rawType === 'uscita';
            const isInc = type === 'income' || rawType === 'entrata';
            const isTrans = type === 'transfer' || rawType === 'trasferimento' || rawType === 'giroconto';

            const isFrom = this._isMatchingAccount(t.fromAccount || t.account, acc);
            const isTo = this._isMatchingAccount(t.toAccount, acc);

            if (isExp && isFrom) cumAtCutoff -= amt;
            else if (isInc && isFrom) cumAtCutoff += amt;
            else if (isTrans) {
              if (isFrom) cumAtCutoff -= amt;
              if (isTo) cumAtCutoff += amt;
            }
          });
          acc.reconciledBalance = Math.round(cumAtCutoff * 100) / 100;
          acc.balance = acc.reconciledBalance;
          acc.lastReconciledMonth = latestSaldiInfo.monthKey;
          acc.lastReconciledDate = latestSaldiInfo.formattedDate;
        } else {
          acc.reconciledBalance = 0;
          acc.balance = 0;
          acc.lastReconciledMonth = '01/2000';
          acc.lastReconciledDate = '01/01/2000';
        }
      });
    }

    // 6. Ordinamento canonico dei conti (1. Banca Liquida, 2. Broker/ETF, 3. Fondo Pensione, 4. Contanti, 5. Buoni Pasto)
    const rankAccount = (a) => {
      const nLow = String(a.name || '').toLowerCase();
      if (a.isLiquid && a.id !== 'contanti' && !nLow.includes('contant')) return 1;
      if (a.isBroker || a.isInvestment) return 2;
      if (a.isPension) return 3;
      if (a.id === 'contanti' || nLow.includes('contant')) return 4;
      if (a.isVoucher) return 5;
      return 6;
    };
    this.accounts.sort((a, b) => rankAccount(a) - rankAccount(b));

    // 7. Calcolo al centesimo dei saldi vivi (Conguaglio + Movimenti successivi effettivi ad oggi)
    this.recalculateLiveBalances();

    // 8. Allineamento categorie dai movimenti reali, obiettivi di risparmio e chiusure mensili
    if (Array.isArray(this.transactions)) {
      const existingCatNames = new Set((this.categories || []).map(c => String(c.name || '').trim().toLowerCase()));
      this.transactions.forEach(t => {
        const rawCat = String(t.category || '').trim();
        if (!rawCat) return;
        const cleanCat = rawCat.replace(/^[^\w\sÀ-ÿ]+\s*/, '').trim();
        if (cleanCat && !existingCatNames.has(cleanCat.toLowerCase()) && !existingCatNames.has(rawCat.toLowerCase())) {
          const txType = (t.type === 'income' || t.type === 'transfer') ? t.type : 'expense';
          this.categories.push({
            id: 'cat_' + cleanCat.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
            name: cleanCat,
            type: txType,
            color: txType === 'income' ? '#34C759' : (txType === 'transfer' ? '#5856D6' : '#0071E3')
          });
          existingCatNames.add(cleanCat.toLowerCase());
        }
      });
      this.saveCategories();
    }

    // Pulizia eventuali chiusure mensili demo e salvataggio snapshot del mese conguagliato dal foglio
    try {
      localStorage.setItem(STORAGE_KEYS.CLOUD_SYNCED, 'true');
    } catch (e) {}

    // Importa eventuali breakdown mensili dalla scheda annuale se restituiti dallo script
    if (data.yearlyClosings && typeof data.yearlyClosings === 'object') {
      Object.entries(data.yearlyClosings).forEach(([mKey, mcData]) => {
        if (mcData && mcData.totalNW > 0) {
          this.monthlyClosings[mKey] = mcData;
          this.saveNetWorthSnapshot(mKey, mcData.totalNW);
        }
      });
    }

    // Allinea gli obiettivi di risparmio se puntavano ancora ai nomi dei conti demo
    const primaryLiquid = this.accounts.find(a => a.isLiquid && a.id !== 'contanti') || this.accounts[0];
    const primaryBroker = this.accounts.find(a => a.isBroker || a.isInvestment);
    if (Array.isArray(this.goals)) {
      let goalsUpdated = false;
      this.goals.forEach(g => {
        if (g.account === 'Portafoglio Investimenti' && primaryBroker) {
          g.account = primaryBroker.name;
          const xeonH = (primaryBroker.holdings || []).find(h => String(h.ticker || '').toUpperCase() === 'XEON');
          if (xeonH && g.id === 'goal_1') {
            g.currentAmount = Math.round((parseFloat(xeonH.currentValue) || g.currentAmount) * 100) / 100;
          }
          goalsUpdated = true;
        } else if (g.account === 'Conto Corrente' && primaryLiquid) {
          g.account = primaryLiquid.name;
          goalsUpdated = true;
        }
      });
      if (goalsUpdated) this.saveGoals();
    }

    this.saldi = validSaldiRows;
    this.saveMonthlyClosings();
    this.saveAccounts();
    if (hasTransactions) {
      this.saveTransactions();
    }
    return true;
  }

  syncSaldiFromCloud(saldiList) {
    if (!Array.isArray(saldiList) || saldiList.length === 0) return false;
    return this.syncCloudData({ saldi: saldiList, transactions: this.transactions });
  }

  saveAccounts() {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(this.accounts));
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('finanze:accounts-updated', { detail: { accounts: this.accounts } }));
    }
  }

  getAccounts() {
    return [...this.accounts];
  }

  findAccount(idOrName) {
    if (!idOrName) return null;
    const q = String(idOrName).trim().toLowerCase();

    // 0. Retrocompatibilità alias broker Trade Republic
    if (q === 'xeon' || q === 'vwce' || q === 'trade republic - xeon' || q === 'trade republic - vwce') {
      const tr = this.accounts.find(a => a.id === 'trade_republic' || a.name.toLowerCase() === 'trade republic');
      if (tr) return tr;
    }

    // 1. Exact match by id or name
    let found = this.accounts.find(a => a.id.toLowerCase() === q || a.name.toLowerCase() === q);
    if (found) return found;

    // 2. Fuzzy match
    found = this.accounts.find(a => a.name.toLowerCase().includes(q) || q.includes(a.name.toLowerCase()) || a.id.toLowerCase().includes(q));
    return found || null;
  }

  addAccount(account) {
    const id = 'acc_' + Date.now();
    const typeStr = (account.type || '').toLowerCase();
    const isPension = typeStr.includes('pension') || typeStr.includes('previden');
    const isBroker = typeStr.includes('broker') || typeStr.includes('invest') || typeStr.includes('etf') || typeStr.includes('monetar') || account.isBroker;
    const isInvestment = isBroker || typeStr.includes('sicurezza');
    const isLiquid = !isPension && !isInvestment;

    const provider = (account.provider || account.name || '').trim();
    if (provider) {
      this.addProvider(provider);
    }

    const newAcc = {
      id,
      name: account.name.trim(),
      provider: provider,
      type: account.type || 'Liquidità corrente',
      balance: parseFloat(account.balance) || 0,
      cashBalance: parseFloat(account.cashBalance) || 0,
      isLiquid,
      isInvestment,
      isBroker,
      isPension,
      holdings: Array.isArray(account.holdings) ? account.holdings : []
    };

    if (newAcc.isBroker && newAcc.holdings.length > 0) {
      this.recalculateBrokerBalance(newAcc);
    }

    this.accounts.push(newAcc);
    this.saveAccounts();
    return newAcc;
  }

  updateAccountBalance(idOrName, newBalance) {
    const acc = this.findAccount(idOrName);
    if (acc) {
      acc.balance = parseFloat(newBalance) || 0;
      this.saveAccounts();
      return true;
    }
    return false;
  }

  deleteAccount(id) {
    this.accounts = this.accounts.filter(a => a.id !== id && a.name !== id);
    this.saveAccounts();
  }

  // === RICALCOLO SALDI VIVI DEI CONTI (CONGUAGLI BASE + MOVIMENTI SUCCESSIVI) ===
  _isMatchingAccount(txAccStr, acc) {
    if (!txAccStr || !acc) return false;
    const q = String(txAccStr).trim().toLowerCase();
    const aName = (acc.name || '').toLowerCase();
    const aId = (acc.id || '').toLowerCase();
    if (q === aName || q === aId) return true;
    if (aName && (q.includes(aName) || aName.includes(q))) return true;
    if (aId && (q.includes(aId) || aId.includes(q))) return true;
    return false;
  }

  recalculateLiveBalances() {
    if (!Array.isArray(this.accounts) || !Array.isArray(this.transactions)) return;

    const parseDateToTimestamp = (dateStr) => {
      if (!dateStr) return null;
      if (dateStr instanceof Date) {
        const d = new Date(dateStr);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
      }
      const s = String(dateStr).trim();
      if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
        const [y, m, d] = s.split('T')[0].split('-');
        return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
      }
      if (/^\d{2}\/\d{2}\/\d{4}/.test(s)) {
        const [d, m, y] = s.split('/');
        return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)).getTime();
      }
      return null;
    };

    const now = new Date();
    now.setHours(23, 59, 59, 999);
    const todayEndTs = now.getTime();

    this.accounts.forEach(acc => {
      // Fondo Pensione è previdenza complementare gestita via quote cedolino / conguaglio
      if (acc.isPension || (acc.type || '').toLowerCase().includes('pension')) return;

      // Base di conguaglio di riferimento (dalla scheda Saldi di Google Sheets o conguaglio certificato)
      if (typeof acc.reconciledBalance === 'undefined' || acc.reconciledBalance === null || isNaN(acc.reconciledBalance)) {
        acc.reconciledBalance = parseFloat(acc.balance) || 0;
      }

      const recTs = parseDateToTimestamp(acc.lastReconciledDate);
      if (!recTs) return;

      let liveBal = parseFloat(acc.reconciledBalance) || 0;
      let pendingFuture = 0;

      // Scorre tutte le transazioni per sommare o detrarre solo quelle successive all'ultimo conguaglio
      this.transactions.forEach(t => {
        const tDateTs = parseDateToTimestamp(t.date);
        if (!tDateTs) return;

        // Movimento successivo alla data del conguaglio
        if (tDateTs > recTs) {
          const amt = Math.abs(parseFloat(t.amount) || 0);
          if (amt === 0) return;

          const isEffectiveToday = (tDateTs <= todayEndTs);
          const type = (t.type || '').toLowerCase();
          const rawType = (t.rawType || '').toLowerCase();

          const isExp = type === 'expense' || rawType === 'uscita';
          const isInc = type === 'income' || rawType === 'entrata';
          const isTrans = type === 'transfer' || rawType === 'trasferimento' || rawType === 'giroconto';

          const isFrom = this._isMatchingAccount(t.fromAccount || t.account, acc);
          const isTo = this._isMatchingAccount(t.toAccount, acc);

          if (isExp && isFrom) {
            if (isEffectiveToday) liveBal -= amt;
            else pendingFuture += amt;
          } else if (isInc && isFrom) {
            if (isEffectiveToday) liveBal += amt;
          } else if (isTrans) {
            if (isFrom) {
              if (isEffectiveToday) liveBal -= amt;
              else pendingFuture += amt;
            }
            if (isTo) {
              if (isEffectiveToday) liveBal += amt;
            }
          }
        }
      });

      acc.balance = Math.round(liveBal * 100) / 100;
      acc.pendingFutureExpenses = Math.round(pendingFuture * 100) / 100;
    });
  }

  // === GESTIONE HOLDINGS & SUB-ASSET (BROKER) ===
  getHoldings(accountId) {
    const acc = this.findAccount(accountId);
    if (!acc || !Array.isArray(acc.holdings)) return [];
    return [...acc.holdings];
  }

  addHolding(accountId, holdingData) {
    const acc = this.findAccount(accountId);
    if (!acc) return null;
    if (!Array.isArray(acc.holdings)) acc.holdings = [];

    const recognized = AssetCatalogService.lookupAsset(holdingData.ticker || holdingData.isin || holdingData.name);
    const id = 'holding_' + Date.now();
    const holding = {
      id,
      ticker: (holdingData.ticker || recognized?.ticker || '').trim().toUpperCase(),
      isin: (holdingData.isin || recognized?.isin || '').trim().toUpperCase(),
      name: (holdingData.name || recognized?.name || holdingData.ticker || 'Nuovo Strumento').trim(),
      assetClass: holdingData.assetClass || recognized?.assetClass || 'azionario_globale',
      assetClassLabel: recognized?.classLabel || 'Investimento Finanziario',
      shares: parseFloat(holdingData.shares) || 0,
      price: parseFloat(holdingData.price) || 0,
      currentValue: parseFloat(holdingData.currentValue) || 0,
      color: recognized?.color || holdingData.color || '#0071E3',
      emergencyMonthsQuota: parseFloat(holdingData.emergencyMonthsQuota) || 0,
      safeInvestmentQuota: parseFloat(holdingData.safeInvestmentQuota) || 0,
      isPac: !!holdingData.isPac,
      pacAmount: parseFloat(holdingData.pacAmount) || 0
    };

    if (holding.currentValue === 0 && holding.shares > 0 && holding.price > 0) {
      holding.currentValue = Math.round(holding.shares * holding.price * 100) / 100;
    }

    acc.holdings.push(holding);
    this.recalculateBrokerBalance(acc);
    this.saveAccounts();
    return holding;
  }

  updateHolding(accountId, holdingId, updatedFields) {
    const acc = this.findAccount(accountId);
    if (!acc || !Array.isArray(acc.holdings)) return false;

    const holding = acc.holdings.find(h => h.id === holdingId || h.ticker === holdingId);
    if (!holding) return false;

    Object.assign(holding, updatedFields);
    if (updatedFields.shares || updatedFields.price) {
      if (!updatedFields.currentValue && holding.shares > 0 && holding.price > 0) {
        holding.currentValue = Math.round(holding.shares * holding.price * 100) / 100;
      }
    }

    this.recalculateBrokerBalance(acc);
    this.saveAccounts();
    return true;
  }

  deleteHolding(accountId, holdingId) {
    const acc = this.findAccount(accountId);
    if (!acc || !Array.isArray(acc.holdings)) return false;

    acc.holdings = acc.holdings.filter(h => h.id !== holdingId && h.ticker !== holdingId);
    this.recalculateBrokerBalance(acc);
    this.saveAccounts();
    return true;
  }

  updateAccountCash(accountId, cashAmount) {
    const acc = this.findAccount(accountId);
    if (!acc) return false;
    acc.cashBalance = Math.round((parseFloat(cashAmount) || 0) * 100) / 100;
    this.recalculateBrokerBalance(acc);
    this.saveAccounts();
    return true;
  }

  recalculateBrokerBalance(account) {
    if (!account) return;
    if (account.isBroker || (account.holdings && account.holdings.length > 0)) {
      const cash = parseFloat(account.cashBalance) || 0;
      const holdingsTotal = (account.holdings || []).reduce((sum, h) => sum + (parseFloat(h.currentValue) || 0), 0);
      account.balance = Math.round((cash + holdingsTotal) * 100) / 100;
    }
  }

  // === BACKUP & EXPORT ICLOUD DRIVE ===
  exportBackupData() {
    return {
      version: '2026.22',
      app: 'Financial-webApp Giorgio',
      exportedAt: new Date().toISOString(),
      accounts: this.accounts,
      categories: this.categories,
      providers: this.getProviders(),
      transactions: this.transactions,
      goals: this.goals,
      riskProfile: this.riskProfile,
      smartRules: this.smartRules,
      monthlyClosings: this.monthlyClosings
    };
  }

  importBackupData(jsonData) {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (!data || typeof data !== 'object') return { success: false, error: 'Formato file di backup non valido.' };

      if (Array.isArray(data.accounts)) {
        this.accounts = data.accounts;
        this.saveAccounts();
      }
      if (Array.isArray(data.categories)) {
        this.categories = data.categories;
        this.saveCategories();
      }
      if (Array.isArray(data.providers)) {
        this.providers = data.providers;
        this.saveProviders();
      }
      if (Array.isArray(data.transactions)) {
        this.transactions = data.transactions;
        this.recalculateLiveBalances();
        this.saveAccounts();
        this.saveTransactions();
      }
      if (Array.isArray(data.goals)) {
        this.goals = data.goals;
        this.saveGoals();
      }
      if (data.monthlyClosings) {
        this.monthlyClosings = data.monthlyClosings;
        this.saveMonthlyClosings();
      }
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // === TRANSAZIONI ===
  loadTransactions() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...INITIAL_TRANSACTIONS];
  }

  saveTransactions() {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(this.transactions));
    } catch (e) {
      console.warn('LocalStorage limit reached for transactions cache.');
    }
  }

  getAllTransactions() {
    return [...this.transactions];
  }

  getTransactions() {
    return this.getAllTransactions();
  }

  setTransactions(newList) {
    if (!Array.isArray(newList)) return;
    this.transactions = newList.map(t => {
      let amount = typeof t.amount === 'number' ? t.amount : parseFloat(String(t.amount).replace(/€/g, '').replace(/\./g, '').replace(',', '.')) || 0;
      return {
        ...t,
        amount: Math.abs(amount)
      };
    });
    this.recalculateLiveBalances();
    this.saveAccounts();
    this.saveTransactions();
  }

  addTransaction(newTx) {
    const id = 'tx_' + Date.now();
    const rawDate = newTx.date || new Date().toISOString().split('T')[0];
    let formattedDate = rawDate;
    let year = String(new Date().getFullYear());
    let month = String(new Date().getMonth() + 1);

    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      const [y, m, d] = rawDate.split('-');
      formattedDate = `${d}/${m}/${y}`;
      year = y;
      month = String(parseInt(m, 10));
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
      const [d, m, y] = rawDate.split('/');
      year = y;
      month = String(parseInt(m, 10));
    }

    const amount = Math.abs(parseFloat(newTx.amount) || 0);
    const type = newTx.type || 'expense';
    const account = newTx.account || 'Buddybank';
    const toAccount = newTx.toAccount || '';

    const tx = {
      id,
      year,
      month,
      date: formattedDate,
      description: (newTx.description || '').trim(),
      category: newTx.category || (type === 'transfer' ? '🔄 Giroconto' : '❔Altro'),
      type,
      amount,
      account,
      fromAccount: account,
      toAccount
    };

    // Aggiorna saldi conti in tempo reale con robustezza su ID e Nome
    const accObj = this.findAccount(account);
    const toAccObj = type === 'transfer' && toAccount ? this.findAccount(toAccount) : null;

    if (type === 'transfer') {
      if (accObj && toAccObj && accObj.id !== toAccObj.id) {
        accObj.balance = Math.round((accObj.balance - amount) * 100) / 100;
        toAccObj.balance = Math.round((toAccObj.balance + amount) * 100) / 100;

        // Gestione Broker / Investimenti: Liquidità vs Asset già attivi
        const isBrokerOrInv = toAccObj.isBroker || toAccObj.isInvestment || (Array.isArray(toAccObj.holdings) && toAccObj.holdings.length > 0);
        if (isBrokerOrInv) {
          const allocType = newTx.brokerDestinationType || 'cash';
          tx.brokerDestinationType = allocType;

          if (allocType === 'asset' && newTx.targetHoldingId && Array.isArray(toAccObj.holdings)) {
            const h = toAccObj.holdings.find(x => x.id === newTx.targetHoldingId || x.ticker === newTx.targetHoldingTicker);
            if (h) {
              h.currentValue = Math.round(((parseFloat(h.currentValue) || 0) + amount) * 100) / 100;
              if (h.price > 0) h.shares = Math.round((h.currentValue / h.price) * 100) / 100;
              if (h.ticker === 'XEON') {
                h.safeInvestmentQuota = Math.max(0, h.currentValue - (h.emergencyMonthsQuota || 5000));
              }
              tx.targetHoldingId = h.id;
              tx.targetHoldingTicker = h.ticker;
              tx.targetHoldingName = h.name;
            } else {
              toAccObj.cashBalance = Math.round(((parseFloat(toAccObj.cashBalance) || 0) + amount) * 100) / 100;
              tx.brokerDestinationType = 'cash';
            }
          } else {
            toAccObj.cashBalance = Math.round(((parseFloat(toAccObj.cashBalance) || 0) + amount) * 100) / 100;
            tx.brokerDestinationType = 'cash';
          }
        }
      }
    } else if (accObj) {
      if (type === 'expense') accObj.balance = Math.round((accObj.balance - amount) * 100) / 100;
      else if (type === 'income') accObj.balance = Math.round((accObj.balance + amount) * 100) / 100;
    }
    this.saveAccounts();

    // Sincronizza saldi remoti su Google Sheets se configurato
    try {
      if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
        if (accObj) window.googleSheetsService.updateAccountBalance(accObj.name, accObj.balance, accObj.type);
        if (toAccObj && toAccObj.id !== accObj.id) window.googleSheetsService.updateAccountBalance(toAccObj.name, toAccObj.balance, toAccObj.type);
      }
    } catch (e) {
      console.warn('Errore sync saldo remoto:', e);
    }

    this.transactions.unshift(tx);
    this.recalculateLiveBalances();
    this.saveAccounts();
    this.saveTransactions();
    return tx;
  }

  // === PAGAMENTO MISTO SPESA ALIMENTARE (BUONI PASTO + BUDDYBANK) ===
  addSplitTransaction({ totalAmount, voucherAmount, cardAmount, description, category, date, cardAccount }) {
    const tot = Math.abs(parseFloat(totalAmount) || 0);
    let vAmt = Math.abs(parseFloat(voucherAmount) || 0);
    let cAmt = Math.abs(parseFloat(cardAmount) || 0);

    // Se cardAmount non è specificato esplicitamente, bilanciamo rispetto al totale
    if (cAmt === 0 && tot > vAmt) {
      cAmt = Math.round((tot - vAmt) * 100) / 100;
    } else if (vAmt === 0 && tot > cAmt) {
      vAmt = Math.round((tot - cAmt) * 100) / 100;
    }

    const cAccount = cardAccount || 'Buddybank';
    const splitGroupId = 'split_' + Date.now();
    const cleanDesc = (description || 'Spesa Alimentare').trim();
    const txDate = date || new Date().toISOString().split('T')[0];
    const cat = category || '🛒 Spesa Alimentare';

    let txVoucher = null;
    let txCard = null;

    if (vAmt > 0) {
      txVoucher = this.addTransaction({
        amount: vAmt,
        description: `${cleanDesc} [Buoni Pasto]`,
        category: cat,
        type: 'expense',
        account: 'Buoni Pasto',
        date: txDate,
        splitGroupId,
        isSplit: true
      });
    }

    if (cAmt > 0) {
      txCard = this.addTransaction({
        amount: cAmt,
        description: `${cleanDesc} [${cAccount}]`,
        category: cat,
        type: 'expense',
        account: cAccount,
        date: txDate,
        splitGroupId,
        isSplit: true
      });
    }

    return { txVoucher, txCard, splitGroupId, totalAmount: tot, voucherAmount: vAmt, cardAmount: cAmt };
  }

  deleteTransaction(id) {
    const target = this.transactions.find(t => t.id === id);
    if (!target) return false;

    // Ripristina saldo del conto associato per mantenere coerenza
    const amt = parseFloat(target.amount) || 0;
    const type = target.type;
    const account = target.account || target.fromAccount;
    const toAccount = target.toAccount;

    const accObj = this.findAccount(account);
    const toAccObj = type === 'transfer' && toAccount ? this.findAccount(toAccount) : null;

    if (type === 'transfer') {
      if (accObj && toAccObj && accObj.id !== toAccObj.id) {
        accObj.balance = Math.round((accObj.balance + amt) * 100) / 100;
        toAccObj.balance = Math.round((toAccObj.balance - amt) * 100) / 100;

        // Ripristino quote Broker se presenti
        if (target.brokerDestinationType === 'asset' && (target.targetHoldingId || target.targetHoldingTicker) && Array.isArray(toAccObj.holdings)) {
          const h = toAccObj.holdings.find(x => x.id === target.targetHoldingId || x.ticker === target.targetHoldingTicker);
          if (h) {
            h.currentValue = Math.max(0, Math.round(((parseFloat(h.currentValue) || 0) - amt) * 100) / 100);
            if (h.price > 0) h.shares = Math.round((h.currentValue / h.price) * 100) / 100;
            if (h.ticker === 'XEON') {
              h.safeInvestmentQuota = Math.max(0, h.currentValue - (h.emergencyMonthsQuota || 5000));
            }
          }
        } else if (target.brokerDestinationType === 'cash' || (!target.brokerDestinationType && toAccObj.isBroker)) {
          toAccObj.cashBalance = Math.max(0, Math.round(((parseFloat(toAccObj.cashBalance) || 0) - amt) * 100) / 100);
        }
      }
    } else if (accObj) {
      if (type === 'expense') accObj.balance = Math.round((accObj.balance + amt) * 100) / 100;
      else if (type === 'income') accObj.balance = Math.round((accObj.balance - amt) * 100) / 100;
    }
    this.saveAccounts();

    try {
      if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
        if (accObj) window.googleSheetsService.updateAccountBalance(accObj.name, accObj.balance, accObj.type);
        if (toAccObj && toAccObj.id !== accObj.id) window.googleSheetsService.updateAccountBalance(toAccObj.name, toAccObj.balance, toAccObj.type);
      }
    } catch (e) {}

    this.transactions = this.transactions.filter(t => t.id !== id);
    this.recalculateLiveBalances();
    this.saveAccounts();
    this.saveTransactions();
    return true;
  }

  updateTransaction(id, updatedFields) {
    const idx = this.transactions.findIndex(t => t.id === id);
    if (idx === -1) return null;

    const oldTx = this.transactions[idx];

    // 1. Ripristina i saldi del vecchio stato
    const oldAmt = parseFloat(oldTx.amount) || 0;
    const oldType = oldTx.type;
    const oldAcc = oldTx.account || oldTx.fromAccount;
    const oldToAcc = oldTx.toAccount;

    const oldAccObj = this.findAccount(oldAcc);
    const oldToAccObj = oldType === 'transfer' && oldToAcc ? this.findAccount(oldToAcc) : null;

    if (oldType === 'transfer') {
      if (oldAccObj && oldToAccObj && oldAccObj.id !== oldToAccObj.id) {
        oldAccObj.balance = Math.round((oldAccObj.balance + oldAmt) * 100) / 100;
        oldToAccObj.balance = Math.round((oldToAccObj.balance - oldAmt) * 100) / 100;

        if (oldTx.brokerDestinationType === 'asset' && (oldTx.targetHoldingId || oldTx.targetHoldingTicker) && Array.isArray(oldToAccObj.holdings)) {
          const h = oldToAccObj.holdings.find(x => x.id === oldTx.targetHoldingId || x.ticker === oldTx.targetHoldingTicker);
          if (h) {
            h.currentValue = Math.max(0, Math.round(((parseFloat(h.currentValue) || 0) - oldAmt) * 100) / 100);
            if (h.price > 0) h.shares = Math.round((h.currentValue / h.price) * 100) / 100;
            if (h.ticker === 'XEON') {
              h.safeInvestmentQuota = Math.max(0, h.currentValue - (h.emergencyMonthsQuota || 5000));
            }
          }
        } else if (oldTx.brokerDestinationType === 'cash' || (!oldTx.brokerDestinationType && oldToAccObj.isBroker)) {
          oldToAccObj.cashBalance = Math.max(0, Math.round(((parseFloat(oldToAccObj.cashBalance) || 0) - oldAmt) * 100) / 100);
        }
      }
    } else if (oldAccObj) {
      if (oldType === 'expense') oldAccObj.balance = Math.round((oldAccObj.balance + oldAmt) * 100) / 100;
      else if (oldType === 'income') oldAccObj.balance = Math.round((oldAccObj.balance - oldAmt) * 100) / 100;
    }

    // 2. Prepara i nuovi campi
    const rawDate = updatedFields.date || oldTx.date;
    let formattedDate = rawDate;
    let year = oldTx.year || '2026';
    let month = oldTx.month || '10';

    if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
      const [y, m, d] = rawDate.split('-');
      formattedDate = `${d}/${m}/${y}`;
      year = y;
      month = String(parseInt(m, 10));
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
      const [d, m, y] = rawDate.split('/');
      year = y;
      month = String(parseInt(m, 10));
    }

    const newAmt = Math.abs(parseFloat(updatedFields.amount !== undefined ? updatedFields.amount : oldTx.amount) || 0);
    const newType = updatedFields.type || oldTx.type || 'expense';
    const newAcc = updatedFields.account || oldTx.account || 'Buddybank';
    const newToAcc = updatedFields.toAccount !== undefined ? updatedFields.toAccount : (oldTx.toAccount || '');

    const mergedTx = {
      ...oldTx,
      ...updatedFields,
      id,
      year,
      month,
      date: formattedDate,
      description: (updatedFields.description !== undefined ? updatedFields.description : oldTx.description || '').trim(),
      category: updatedFields.category !== undefined ? updatedFields.category : oldTx.category,
      type: newType,
      amount: newAmt,
      account: newAcc,
      fromAccount: newAcc,
      toAccount: newToAcc
    };

    // 3. Applica i saldi con i nuovi valori
    const newAccObj = this.findAccount(newAcc);
    const newToAccObj = newType === 'transfer' && newToAcc ? this.findAccount(newToAcc) : null;

    if (newType === 'transfer') {
      if (newAccObj && newToAccObj && newAccObj.id !== newToAccObj.id) {
        newAccObj.balance = Math.round((newAccObj.balance - newAmt) * 100) / 100;
        newToAccObj.balance = Math.round((newToAccObj.balance + newAmt) * 100) / 100;

        const isBrokerOrInv = newToAccObj.isBroker || newToAccObj.isInvestment || (Array.isArray(newToAccObj.holdings) && newToAccObj.holdings.length > 0);
        if (isBrokerOrInv) {
          const allocType = updatedFields.brokerDestinationType || oldTx.brokerDestinationType || 'cash';
          mergedTx.brokerDestinationType = allocType;

          if (allocType === 'asset' && (updatedFields.targetHoldingId || oldTx.targetHoldingId) && Array.isArray(newToAccObj.holdings)) {
            const hId = updatedFields.targetHoldingId || oldTx.targetHoldingId;
            const hTick = updatedFields.targetHoldingTicker || oldTx.targetHoldingTicker;
            const h = newToAccObj.holdings.find(x => x.id === hId || x.ticker === hTick);
            if (h) {
              h.currentValue = Math.round(((parseFloat(h.currentValue) || 0) + newAmt) * 100) / 100;
              if (h.price > 0) h.shares = Math.round((h.currentValue / h.price) * 100) / 100;
              if (h.ticker === 'XEON') {
                h.safeInvestmentQuota = Math.max(0, h.currentValue - (h.emergencyMonthsQuota || 5000));
              }
              mergedTx.targetHoldingId = h.id;
              mergedTx.targetHoldingTicker = h.ticker;
              mergedTx.targetHoldingName = h.name;
            } else {
              newToAccObj.cashBalance = Math.round(((parseFloat(newToAccObj.cashBalance) || 0) + newAmt) * 100) / 100;
              mergedTx.brokerDestinationType = 'cash';
            }
          } else {
            newToAccObj.cashBalance = Math.round(((parseFloat(newToAccObj.cashBalance) || 0) + newAmt) * 100) / 100;
            mergedTx.brokerDestinationType = 'cash';
          }
        }
      }
    } else if (newAccObj) {
      if (newType === 'expense') newAccObj.balance = Math.round((newAccObj.balance - newAmt) * 100) / 100;
      else if (newType === 'income') newAccObj.balance = Math.round((newAccObj.balance + newAmt) * 100) / 100;
    }

    this.saveAccounts();

    try {
      if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
        const affected = [oldAccObj, oldToAccObj, newAccObj, newToAccObj].filter(Boolean);
        const uniqueNames = [...new Set(affected.map(a => a.name))];
        uniqueNames.forEach(name => {
          const acc = this.findAccount(name);
          if (acc) window.googleSheetsService.updateAccountBalance(acc.name, acc.balance, acc.type);
        });
      }
    } catch (e) {}

    this.saveAccounts();
    this.transactions[idx] = mergedTx;
    this.recalculateLiveBalances();
    this.saveAccounts();
    this.saveTransactions();
    return mergedTx;
  }

  // === METRICHE DI SINTESI (DASHBOARD & NET WORTH) ===
  get summary() {
    // Calcola il Net Worth separando rigorosamente: Liquidità Cassa, Buoni Pasto, Investimenti e Previdenza
    let liquidTotal = 0;
    let voucherTotal = 0;
    let investedTotal = 0;
    let pensionTotal = 0;
    let xeonTotal = 0;
    let vwceTotal = 0;

    this.accounts.forEach(acc => {
      const b = parseFloat(acc.balance) || 0;
      const nameLower = (acc.name || '').toLowerCase();
      const typeLower = (acc.type || '').toLowerCase();
      if (acc.isPension || nameLower.includes('pensione') || typeLower.includes('previden')) {
        pensionTotal += b;
      } else if (acc.isVoucher || acc.id === 'buoni_pasto' || nameLower.includes('buoni pasto')) {
        voucherTotal += b;
      } else if (acc.isInvestment || acc.isBroker || nameLower.includes('xeon') || nameLower.includes('vwce') || typeLower.includes('etf') || typeLower.includes('monetari') || typeLower.includes('invest') || typeLower.includes('sicurezza') || typeLower.includes('broker')) {
        investedTotal += b;
        if (Array.isArray(acc.holdings) && acc.holdings.length > 0) {
          acc.holdings.forEach(h => {
            const hVal = parseFloat(h.currentValue) || 0;
            const hTicker = (h.ticker || '').toUpperCase();
            if (hTicker === 'XEON' || h.assetClass === 'monetario') {
              xeonTotal += hVal;
            } else if (hTicker === 'VWCE' || (h.assetClass && h.assetClass.includes('azionario'))) {
              vwceTotal += hVal;
            }
          });
        } else {
          if (nameLower.includes('xeon')) xeonTotal += b;
          if (nameLower.includes('vwce')) vwceTotal += b;
        }
      } else {
        liquidTotal += b;
      }
    });

    // Patrimonio Netto Effettivo ("Zero Allucinazioni"): SOLO liquidità reale, buoni pasto e investimenti Trade Republic
    // Il Fondo Pensione è escluso e tracciato a parte ("Previdenza a Lungo Termine")
    const effectiveNetWorth = Math.round((liquidTotal + voucherTotal + investedTotal) * 100) / 100;
    const pensionFundTotal = Math.round(pensionTotal * 100) / 100;

    // XEON FinTech Engine: 5 mensilità di Fondo Emergenza + Quota Investimento Sicuro
    const avgExpenseRef = 1000.00;
    const emergencyFundTarget = avgExpenseRef * 5; // 5.000 € target per 5 mensilità
    const xeonEmergencyFund = Math.min(xeonTotal, emergencyFundTarget);
    const xeonSafeInvestment = Math.max(0, xeonTotal - xeonEmergencyFund);

    // Calcolo mese corrente dinamico
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;

    let monthlyIncome = 0;
    let monthlyExpense = 0;
    let fixedExpenses = 0;
    let variableExpenses = 0;

    this.transactions.forEach(t => {
      let txMonth = parseInt(t.month, 10);
      let txYear = parseInt(t.year, 10);

      if ((!txMonth || !txYear) && t.date) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(t.date)) {
          const parts = t.date.split('/');
          txMonth = parseInt(parts[1], 10);
          txYear = parseInt(parts[2], 10);
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
          const parts = t.date.split('-');
          txYear = parseInt(parts[0], 10);
          txMonth = parseInt(parts[1], 10);
        }
      }

      const isTargetMonth = (txYear === curYear && txMonth === curMonth);
      if (isTargetMonth) {
        const amt = parseFloat(t.amount) || 0;
        if (t.type === 'income') {
          monthlyIncome += amt;
        } else if (t.type === 'expense') {
          monthlyExpense += amt;
          const cat = (t.category || '').toLowerCase();
          const desc = (t.description || '').toLowerCase();
          const isFixedTx = t.isFixed || cat.includes('casa') || cat.includes('affitto') || cat.includes('rata') || cat.includes('abbonament') || desc.includes('rata') || desc.includes('finanziamento');
          if (isFixedTx) {
            fixedExpenses += amt;
          } else {
            variableExpenses += amt;
          }
        }
      }
    });

    // Se nel mese corrente non ci sono ancora entrate caricate, usa lo stipendio stimato (con 13a/14a se previste)
    const estimatedSalary = this.getEstimatedSalaryForMonth(curMonth, curYear);
    if (monthlyIncome === 0) monthlyIncome = estimatedSalary;

    // Rimanenza (Risparmio Extra) = Entrate - (Spese Fisse + Spese Extra)
    const totalExpenses = monthlyExpense;
    const remainingExtraSavings = Math.max(0, monthlyIncome - totalExpenses);
    const savingsRate = monthlyIncome > 0 ? ((remainingExtraSavings / monthlyIncome) * 100).toFixed(1) : '0.0';

    // Calcolo entrate stimate residue del mese corrente se non ancora accreditate
    let pendingEstimatedIncome = 0;
    try {
      const liveAnalysis = this.getCurrentMonthLiveAnalysis();
      if (liveAnalysis && liveAnalysis.isIncomeEstimated) {
        pendingEstimatedIncome = Math.max(0, (liveAnalysis.effectiveIncome || 0) - (liveAnalysis.actualIncome || 0));
      }
    } catch (e) {}
    const projectedNetWorth = Math.round((effectiveNetWorth + pendingEstimatedIncome) * 100) / 100;

    return {
      totalBalance: effectiveNetWorth,
      netWorth: effectiveNetWorth,
      effectiveNetWorth: effectiveNetWorth,
      pendingEstimatedIncome: Math.round(pendingEstimatedIncome * 100) / 100,
      projectedNetWorth: projectedNetWorth,
      liquidTotal: liquidTotal,
      voucherTotal: voucherTotal,
      investedTotal: investedTotal,
      pensionTotal: pensionFundTotal,
      pensionFundTotal: pensionFundTotal,
      xeonTotal: xeonTotal,
      vwceTotal: vwceTotal,
      emergencyFundTarget: emergencyFundTarget,
      emergencyFundMonths: 5,
      xeonEmergencyFund: xeonEmergencyFund,
      xeonSafeInvestment: xeonSafeInvestment,
      monthlyIncome: monthlyIncome,
      monthlyExpense: monthlyExpense,
      totalExpenses: totalExpenses,
      fixedExpenses: Math.round(fixedExpenses * 100) / 100,
      variableExpenses: Math.round(variableExpenses * 100) / 100,
      remainingExtraSavings: Math.round(remainingExtraSavings * 100) / 100,
      savingsAmount: Math.round(remainingExtraSavings * 100) / 100,
      savingsRate: parseFloat(savingsRate),
      budgetExpenseTarget: 75,
      budgetSavingsTarget: 25,
      incomeGoal: estimatedSalary
    };
  }

  // === SNAPSHOT & MOTORE DINAMICO NET WORTH STORICO ===
  getAvailableYears() {
    const yearsSet = new Set();
    const currentYear = new Date().getFullYear();
    yearsSet.add(String(currentYear));

    // Dalle transazioni registrate
    if (Array.isArray(this.transactions)) {
      this.transactions.forEach(t => {
        if (t.year && /^\d{4}$/.test(String(t.year))) {
          yearsSet.add(String(t.year));
        } else if (t.date) {
          const parts = t.date.split(/[-/]/);
          if (parts.length === 3) {
            const y = parts[0].length === 4 ? parts[0] : parts[2];
            if (y && /^\d{4}$/.test(y)) yearsSet.add(String(y));
          }
        }
      });
    }

    // Dalle chiusure mensili salvate
    if (this.monthlyClosings) {
      Object.keys(this.monthlyClosings).forEach(k => {
        const parts = k.split('/');
        if (parts.length === 2 && /^\d{4}$/.test(parts[1])) {
          yearsSet.add(parts[1]);
        }
      });
    }

    // Dai salvataggi snapshot / serie storica
    const snapshots = this.loadNetWorthSnapshots();
    Object.keys(snapshots || {}).forEach(k => {
      const parts = k.split('/');
      if (parts.length === 2 && /^\d{4}$/.test(parts[1])) {
        yearsSet.add(parts[1]);
      }
    });

    if (Array.isArray(INITIAL_HISTORICAL_NW)) {
      INITIAL_HISTORICAL_NW.forEach(item => {
        if (item.month) {
          const parts = item.month.split('/');
          if (parts.length === 2 && /^\d{4}$/.test(parts[1])) {
            yearsSet.add(parts[1]);
          }
        }
      });
    }

    // Dai conguagli presenti nella scheda Saldi
    if (Array.isArray(this.saldi)) {
      this.saldi.forEach(s => {
        const dInfo = this._parseSheetDateInfo(s.date);
        if (dInfo && dInfo.monthKey) {
          const parts = dInfo.monthKey.split('/');
          if (parts.length === 2 && /^\d{4}$/.test(parts[1])) {
            yearsSet.add(parts[1]);
          }
        }
      });
    }

    // Ordina in modo decrescente (es. 2027, 2026, 2025, 2024)
    return Array.from(yearsSet)
      .filter(y => /^\d{4}$/.test(y))
      .sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
  }

  loadNetWorthSnapshots() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NW_SNAPSHOTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  }

  saveNetWorthSnapshot(monthYear, value) {
    const snapshots = this.loadNetWorthSnapshots();
    const num = Math.round(parseFloat(value) * 100) / 100;
    if (isNaN(num) || num <= 0) return false;
    snapshots[monthYear] = num;
    try {
      localStorage.setItem(STORAGE_KEYS.NW_SNAPSHOTS, JSON.stringify(snapshots));
      this.nwSnapshots = snapshots;
      return true;
    } catch (e) {
      return false;
    }
  }

  deleteNetWorthSnapshot(monthYear) {
    const snapshots = this.loadNetWorthSnapshots();
    delete snapshots[monthYear];
    localStorage.setItem(STORAGE_KEYS.NW_SNAPSHOTS, JSON.stringify(snapshots));
    this.nwSnapshots = snapshots;
  }

  // === FOGLIO NET WORTH GESTIONALE & CHIUSURE MENSILI ===
  loadMonthlyClosings() {
    let closings = {};
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MONTHLY_CLOSINGS);
      if (saved) closings = JSON.parse(saved);
    } catch (e) {}

    const isCloudSynced = (typeof localStorage !== 'undefined') && localStorage.getItem(STORAGE_KEYS.CLOUD_SYNCED) === 'true';

    if (isCloudSynced) {
      if (closings && typeof closings === 'object') {
        Object.keys(closings).forEach(mKey => {
          const mc = closings[mKey];
          if (mc && mc.accounts && ('Conto Corrente' in mc.accounts || 'Portafoglio Investimenti' in mc.accounts || 'Fondo Previdenza' in mc.accounts)) {
            delete closings[mKey];
          }
        });
      }
      return closings || {};
    }

    // Integra con la baseline dei breakdown iniziali solo in modalità dimostrativa
    if (!closings || Object.keys(closings).length === 0) {
      closings = JSON.parse(JSON.stringify(INITIAL_MONTHLY_BREAKDOWNS || {}));
    } else {
      Object.entries(INITIAL_MONTHLY_BREAKDOWNS || {}).forEach(([mKey, data]) => {
        if (!closings[mKey]) {
          closings[mKey] = JSON.parse(JSON.stringify(data));
        }
      });
    }

    return closings;
  }

  saveMonthlyClosings() {
    try {
      localStorage.setItem(STORAGE_KEYS.MONTHLY_CLOSINGS, JSON.stringify(this.monthlyClosings));
    } catch (e) {
      console.warn('Errore salvataggio monthlyClosings:', e);
    }
  }

  getMonthlyClosing(monthKey) {
    if (!monthKey) return null;
    if (this.monthlyClosings && this.monthlyClosings[monthKey]) {
      return JSON.parse(JSON.stringify(this.monthlyClosings[monthKey]));
    }
    // Se non presente, genera una struttura default con i conti attivi
    const defaultAccs = {};
    this.accounts.forEach(a => {
      defaultAccs[a.name] = a.balance;
    });
    return {
      monthKey,
      label: monthKey,
      date: `31/${monthKey}`,
      isClosed: false,
      accounts: defaultAccs,
      totalNW: this.summary.netWorth,
      notes: ''
    };
  }

  saveMonthlyClosingData(monthKey, closingData) {
    if (!monthKey || !closingData) return false;

    if (!this.monthlyClosings) this.monthlyClosings = {};
    this.monthlyClosings[monthKey] = {
      monthKey,
      label: closingData.label || monthKey,
      date: closingData.date || `31/${monthKey}`,
      isClosed: true,
      accounts: closingData.accounts || {},
      totalNW: Math.round(parseFloat(closingData.totalNW || 0) * 100) / 100,
      notes: closingData.notes || ''
    };

    this.saveMonthlyClosings();
    this.saveNetWorthSnapshot(monthKey, closingData.totalNW);

    // Se è il mese corrente, aggiorna i conti attivi e sincronizza Google Sheets
    const now = new Date();
    const curMonthKey = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    if (monthKey === curMonthKey) {
      if (closingData.accounts) {
        Object.entries(closingData.accounts).forEach(([accName, bal]) => {
          const acc = this.findAccount(accName);
          if (acc) {
            acc.balance = parseFloat(bal) || 0;
            acc.lastReconciledMonth = monthKey;
            acc.lastReconciledDate = closingData.date || acc.lastReconciledDate;
            try {
              if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
                window.googleSheetsService.updateAccountBalance(acc.name, acc.balance, acc.type);
              }
            } catch (err) {}
          }
        });
        this.saveAccounts();
      }
    }

    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('finanze:accounts-updated', { detail: { monthKey, closingData } }));
    }

    return true;
  }

  // Calcola il saldo retroattivo o proiettato di un conto a fine di un mese specifico combinando Conguagli e Movimenti
  calculateAccountBalanceAtEndOfMonth(acc, targetMonthKey) {
    if (!acc || !targetMonthKey) return 0;
    const [tmStr, tyStr] = targetMonthKey.split('/');
    const targetMonth = parseInt(tmStr, 10);
    const targetYear = parseInt(tyStr, 10);
    if (isNaN(targetMonth) || isNaN(targetYear)) return 0;

    const endOfTargetMonthTs = new Date(targetYear, targetMonth, 0, 23, 59, 59).getTime();

    // 0. Se la chiusura mensile del mese target ha già registrato questo conto o sub-asset, usalo subito
    const targetClosing = this.monthlyClosings ? this.monthlyClosings[targetMonthKey] : null;
    if (targetClosing && targetClosing.accounts) {
      if (typeof targetClosing.accounts[acc.name] !== 'undefined') {
        return targetClosing.accounts[acc.name];
      }
      const matchKey = Object.keys(targetClosing.accounts).find(k => this._isMatchingAccount(k, acc));
      if (matchKey) {
        return targetClosing.accounts[matchKey];
      }
      if (acc.isBroker) {
        let brokerSubSum = 0;
        let found = false;
        Object.entries(targetClosing.accounts).forEach(([k, v]) => {
          if (k.toLowerCase().startsWith(acc.name.toLowerCase() + ' - ') || (acc.id === 'trade_republic' && k.toLowerCase().startsWith('trade republic - '))) {
            brokerSubSum += (parseFloat(v) || 0);
            found = true;
          }
        });
        if (found && brokerSubSum > 0) return Math.round(brokerSubSum * 100) / 100;
      }
    }

    // 1. Previdenza Complementare (Fondo Pensione): usa la serie continua e interpolata di getPensionHistory()
    if (acc.isPension) {
      const pHist = this.getPensionHistory();
      const pt = pHist.find(p => p.month === targetMonthKey);
      if (pt && typeof pt.value === 'number') return pt.value;
      return typeof acc.reconciledBalance === 'number' ? acc.reconciledBalance : (parseFloat(acc.balance) || 0);
    }

    // 2. Broker Multi-Holding (Trade Republic): somma i saldi dei sotto-asset se disponibili nella chiusura del mese
    if (acc.isBroker && Array.isArray(acc.holdings) && acc.holdings.length > 0) {
      let brokerTotal = 0;
      let hasHoldingClosing = false;
      acc.holdings.forEach(h => {
        const fullHoldingName = `${acc.name} - ${h.name || h.ticker}`;
        const tickerName = `${acc.name} - ${h.ticker}`;
        const targetClosing = this.monthlyClosings ? this.monthlyClosings[targetMonthKey] : null;
        if (targetClosing && targetClosing.accounts) {
          if (typeof targetClosing.accounts[fullHoldingName] !== 'undefined') {
            brokerTotal += targetClosing.accounts[fullHoldingName];
            hasHoldingClosing = true;
          } else if (typeof targetClosing.accounts[tickerName] !== 'undefined') {
            brokerTotal += targetClosing.accounts[tickerName];
            hasHoldingClosing = true;
          }
        }
      });
      if (hasHoldingClosing && brokerTotal > 0) {
        return Math.round(brokerTotal * 100) / 100;
      }
    }

    // 3. Conti ordinari, Broker & Buoni Pasto: trova il conguaglio base più vicino disponibile nel tempo
    let baseBal = typeof acc.reconciledBalance === 'number' ? acc.reconciledBalance : (parseFloat(acc.balance) || 0);
    let baseTs = acc.lastReconciledDate ? (this._parseSheetDateInfo(acc.lastReconciledDate)?.timestamp || Date.now()) : Date.now();
    let minTsDiff = Math.abs(endOfTargetMonthTs - baseTs);

    if (this.monthlyClosings) {
      Object.entries(this.monthlyClosings).forEach(([mKey, c]) => {
        if (!c || !c.accounts) return;
        let cBal = null;
        if (typeof c.accounts[acc.name] !== 'undefined') {
          cBal = c.accounts[acc.name];
        } else {
          const matchKey = Object.keys(c.accounts).find(k => this._isMatchingAccount(k, acc));
          if (matchKey) cBal = c.accounts[matchKey];
          else if (acc.isBroker) {
            let brokerSubSum = 0;
            let found = false;
            Object.entries(c.accounts).forEach(([k, v]) => {
              if (k.toLowerCase().startsWith(acc.name.toLowerCase() + ' - ') || (acc.id === 'trade_republic' && k.toLowerCase().startsWith('trade republic - '))) {
                brokerSubSum += (parseFloat(v) || 0);
                found = true;
              }
            });
            if (found && brokerSubSum > 0) cBal = brokerSubSum;
          }
        }
        if (cBal !== null && !isNaN(cBal)) {
          const [cmStr, cyStr] = mKey.split('/');
          const cTs = new Date(parseInt(cyStr, 10), parseInt(cmStr, 10), 0, 23, 59, 59).getTime();
          const diff = Math.abs(endOfTargetMonthTs - cTs);
          if (diff < minTsDiff) {
            minTsDiff = diff;
            baseTs = cTs;
            baseBal = cBal;
          }
        }
      });
    }

    let netDelta = 0;
    (this.transactions || []).forEach(t => {
      const tInfo = this._parseSheetDateInfo(t.date);
      if (!tInfo) return;
      const tTs = tInfo.timestamp;

      if (baseTs >= endOfTargetMonthTs) {
        // Movimenti avvenuti dopo la fine del mese target e fino alla data di riferimento
        if (tTs > endOfTargetMonthTs && tTs <= baseTs) {
          const amt = Math.abs(parseFloat(t.amount) || 0);
          if (amt === 0) return;
          const type = (t.type || '').toLowerCase();
          const rawType = (t.rawType || '').toLowerCase();
          const isExp = type === 'expense' || rawType === 'uscita';
          const isInc = type === 'income' || rawType === 'entrata';
          const isTrans = type === 'transfer' || rawType === 'trasferimento' || rawType === 'giroconto';

          const isFrom = this._isMatchingAccount(t.fromAccount || t.account, acc);
          const isTo = this._isMatchingAccount(t.toAccount, acc);

          if (isExp && isFrom) netDelta += amt;
          else if (isInc && isFrom) netDelta -= amt;
          else if (isTrans) {
            if (isFrom) netDelta += amt;
            if (isTo) netDelta -= amt;
          }
        }
      } else {
        // Movimenti avvenuti tra la data base e la fine del mese target
        if (tTs > baseTs && tTs <= endOfTargetMonthTs) {
          const amt = Math.abs(parseFloat(t.amount) || 0);
          if (amt === 0) return;
          const type = (t.type || '').toLowerCase();
          const rawType = (t.rawType || '').toLowerCase();
          const isExp = type === 'expense' || rawType === 'uscita';
          const isInc = type === 'income' || rawType === 'entrata';
          const isTrans = type === 'transfer' || rawType === 'trasferimento' || rawType === 'giroconto';

          const isFrom = this._isMatchingAccount(t.fromAccount || t.account, acc);
          const isTo = this._isMatchingAccount(t.toAccount, acc);

          if (isExp && isFrom) netDelta -= amt;
          else if (isInc && isFrom) netDelta += amt;
          else if (isTrans) {
            if (isFrom) netDelta -= amt;
            if (isTo) netDelta += amt;
          }
        }
      }
    });

    const result = Math.round((baseBal + netDelta) * 100) / 100;
    return Math.max(0, result);
  }

  getYearlyNetworthMatrix(year = null) {
    const availableYears = this.getAvailableYears();
    const defaultYear = availableYears[0] || String(new Date().getFullYear());
    const yStr = year ? String(year) : defaultYear;
    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const monthShorts = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curMonthKey = `${String(curMonth).padStart(2, '0')}/${curYear}`;

    // Calcola il flusso netto mensile dalle transazioni reali (income - expense)
    const monthlyNetFlows = new Map();
    this.transactions.forEach(tx => {
      const ym = this.getTxMonthYear(tx);
      if (!ym || !ym.endsWith(yStr)) return;
      const amt = parseFloat(tx.amount) || 0;
      const current = monthlyNetFlows.get(ym) || 0;
      if (tx.type === 'income') monthlyNetFlows.set(ym, current + amt);
      else if (tx.type === 'expense') monthlyNetFlows.set(ym, current - amt);
    });

    // Calcolo entrate stimate residue del mese corrente (se non ancora accreditate)
    let curMonthPendingEstimatedIncome = 0;
    try {
      const liveAnalysis = this.getCurrentMonthLiveAnalysis();
      if (liveAnalysis && liveAnalysis.isIncomeEstimated) {
        curMonthPendingEstimatedIncome = Math.max(0, (liveAnalysis.effectiveIncome || 0) - (liveAnalysis.actualIncome || 0));
      }
    } catch (e) {}
    curMonthPendingEstimatedIncome = Math.round(curMonthPendingEstimatedIncome * 100) / 100;

    // Mesi dell'anno (1-12)
    const months = [];
    for (let m = 1; m <= 12; m++) {
      const mKey = `${String(m).padStart(2, '0')}/${yStr}`;
      const isCurrent = (mKey === curMonthKey);
      const isPast = parseInt(yStr, 10) < curYear || (parseInt(yStr, 10) === curYear && m < curMonth);
      const isFuture = parseInt(yStr, 10) > curYear || (parseInt(yStr, 10) === curYear && m > curMonth);
      const closing = this.monthlyClosings ? this.monthlyClosings[mKey] : null;

      months.push({
        monthKey: mKey,
        monthNum: m,
        name: monthNames[m - 1],
        shortName: monthShorts[m - 1],
        isCurrent,
        isPast,
        isFuture,
        isClosed: Boolean(closing?.isClosed || (isPast && closing)),
        hasData: Boolean(closing && closing.totalNW > 0),
        closing,
        isEstimatedIncomeIncluded: isCurrent && curMonthPendingEstimatedIncome > 0,
        pendingEstimatedIncome: isCurrent ? curMonthPendingEstimatedIncome : 0
      });
    }

    // Elenco conti raggruppati per macro-sezione
    const accounts = this.getAccounts();
    const liquidAccounts = [];
    const voucherAccounts = [];
    const investedAccounts = [];
    const pensionAccounts = [];

    accounts.forEach(acc => {
      const nameLower = (acc.name || '').toLowerCase();
      const typeLower = (acc.type || '').toLowerCase();
      if (acc.isPension || nameLower.includes('pensione') || typeLower.includes('previden')) {
        pensionAccounts.push(acc);
      } else if (acc.isVoucher || acc.id === 'buoni_pasto' || nameLower.includes('buoni pasto')) {
        voucherAccounts.push(acc);
      } else if (acc.isInvestment || acc.isBroker || nameLower.includes('xeon') || nameLower.includes('vwce') || typeLower.includes('etf') || typeLower.includes('monetar') || typeLower.includes('sicurezza') || typeLower.includes('broker')) {
        investedAccounts.push(acc);
      } else {
        liquidAccounts.push(acc);
      }
    });

    // Costruisce la riga per ciascun conto per i 12 mesi
    const buildAccountRow = (acc) => {
      const values = [];
      months.forEach(m => {
        let val = 0;
        if (m.closing && m.closing.accounts) {
          if (typeof m.closing.accounts[acc.name] !== 'undefined') {
            val = m.closing.accounts[acc.name];
          } else {
            const matchKey = Object.keys(m.closing.accounts).find(k => this._isMatchingAccount(k, acc));
            if (matchKey) {
              val = m.closing.accounts[matchKey];
            } else if (acc.isBroker) {
              let brokerSubSum = 0;
              let foundSub = false;
              Object.entries(m.closing.accounts).forEach(([k, v]) => {
                if (k.toLowerCase().startsWith(acc.name.toLowerCase() + ' - ') || (acc.id === 'trade_republic' && k.toLowerCase().startsWith('trade republic - '))) {
                  brokerSubSum += (parseFloat(v) || 0);
                  foundSub = true;
                }
              });
              if (foundSub) val = brokerSubSum;
            }
          }
        }
        if (val === 0) {
          if (m.isCurrent) {
            val = acc.balance;
          } else if (m.isPast) {
            val = this.calculateAccountBalanceAtEndOfMonth(acc, m.monthKey);
          }
        }
        values.push(Math.round(val * 100) / 100);
      });
      return {
        id: acc.id,
        name: acc.name,
        type: acc.type,
        values
      };
    };

    const liquidRows = liquidAccounts.map(buildAccountRow);
    const voucherRows = voucherAccounts.map(buildAccountRow);
    const investedRows = investedAccounts.map(buildAccountRow);
    const pensionRows = pensionAccounts.map(buildAccountRow);

    // Calcolo subtotali mensili per ciascuna categoria
    const calcSubtotals = (rows) => {
      return months.map((_, idx) => {
        return Math.round(rows.reduce((sum, r) => sum + (r.values[idx] || 0), 0) * 100) / 100;
      });
    };

    const liquidSubtotals = calcSubtotals(liquidRows);
    const voucherSubtotals = calcSubtotals(voucherRows);
    const investedSubtotals = calcSubtotals(investedRows);
    const pensionSubtotals = calcSubtotals(pensionRows);

    // Totale Patrimonio Netto Effettivo ("Zero Allucinazioni"): Esclude il Fondo Pensione
    // Coerente al centesimo con la somma dei conti esposti nella tabella
    const effectiveNWValues = months.map((m, idx) => {
      const pendingEst = (m.isCurrent && curMonthPendingEstimatedIncome > 0) ? curMonthPendingEstimatedIncome : 0;
      const effSum = liquidSubtotals[idx] + voucherSubtotals[idx] + investedSubtotals[idx] + pendingEst;
      return Math.round(effSum * 100) / 100;
    });

    const totalWithPensionValues = months.map((m, idx) => {
      return Math.round((effectiveNWValues[idx] + pensionSubtotals[idx]) * 100) / 100;
    });

    // Calcolo variazioni mese su mese (€ e %) basate sul Patrimonio Netto Effettivo
    const deltaValues = [];
    const deltaPctValues = [];
    months.forEach((m, idx) => {
      if (idx === 0) {
        const prevYearMonth = `12/${parseInt(yStr, 10) - 1}`;
        const prevClosing = this.monthlyClosings ? this.monthlyClosings[prevYearMonth] : null;
        let prevVal = 0;
        if (prevClosing && prevClosing.accounts) {
          Object.entries(prevClosing.accounts).forEach(([name, bal]) => {
            const nLower = name.toLowerCase();
            if (!nLower.includes('pensione') && !nLower.includes('previden')) {
              prevVal += (parseFloat(bal) || 0);
            }
          });
        }
        if (prevVal <= 0 && prevClosing?.totalNW) {
          prevVal = prevClosing.totalNW * 0.72; // Stima scorporo se assente
        }
        const curVal = effectiveNWValues[0];
        const diff = prevVal > 0 ? curVal - prevVal : 0;
        deltaValues.push(Math.round(diff * 100) / 100);
        deltaPctValues.push(prevVal > 0 ? ((diff / prevVal) * 100).toFixed(1) : '0.0');
      } else {
        const prevVal = effectiveNWValues[idx - 1];
        const curVal = effectiveNWValues[idx];
        if (curVal > 0 && prevVal > 0) {
          const diff = curVal - prevVal;
          deltaValues.push(Math.round(diff * 100) / 100);
          deltaPctValues.push(((diff / prevVal) * 100).toFixed(1));
        } else {
          deltaValues.push(0);
          deltaPctValues.push('0.0');
        }
      }
    });

    // Flusso di cassa mensile reale
    const netFlowValues = months.map(m => {
      return Math.round((monthlyNetFlows.get(m.monthKey) || 0) * 100) / 100;
    });

    return {
      year: yStr,
      months,
      liquid: {
        accounts: liquidRows,
        subtotals: liquidSubtotals
      },
      voucher: {
        accounts: voucherRows,
        subtotals: voucherSubtotals
      },
      invested: {
        accounts: investedRows,
        subtotals: investedSubtotals
      },
      pension: {
        accounts: pensionRows,
        subtotals: pensionSubtotals
      },
      totals: {
        netWorth: effectiveNWValues,
        effectiveNetWorth: effectiveNWValues,
        pensionFund: pensionSubtotals,
        totalWithPension: totalWithPensionValues,
        delta: deltaValues,
        deltaPct: deltaPctValues,
        netFlow: netFlowValues,
        pendingEstimatedIncome: curMonthPendingEstimatedIncome
      }
    };
  }

  getTxMonthYear(tx) {
    if (!tx) return null;
    let m = tx.month;
    let y = tx.year;
    if ((!m || !y) && tx.date) {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(tx.date)) {
        const parts = tx.date.split('/');
        m = parts[1];
        y = parts[2];
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(tx.date)) {
        const parts = tx.date.split('-');
        y = parts[0];
        m = parts[1];
      }
    }
    if (!m || !y) return null;
    const mNum = parseInt(m, 10);
    const yNum = parseInt(y, 10);
    if (isNaN(mNum) || isNaN(yNum)) return null;
    return `${String(mNum).padStart(2, '0')}/${yNum}`;
  }

  getHistoricalNetWorth() {
    const savedSnapshots = this.loadNetWorthSnapshots();
    const baseHistorical = (INITIAL_HISTORICAL_NW || []).filter(d => d.value > 0);

    const nwMap = new Map();
    const isSnapshotMap = new Map();

    const computeEffectiveFromAccountsMap = (accountsObj) => {
      if (!accountsObj || typeof accountsObj !== 'object') return 0;
      let eff = 0;
      const keysLower = new Set(Object.keys(accountsObj).map(k => k.toLowerCase()));
      Object.entries(accountsObj).forEach(([name, bal]) => {
        const nLower = name.toLowerCase();
        if (nLower.includes('pensione') || nLower.includes('previden')) return;
        if (nLower.includes('buoni pasto') || nLower.includes('ticket') || nLower.includes('tiket')) return;
        if (nLower.includes(' - ')) {
          const parentBroker = nLower.split(' - ')[0].trim();
          if (keysLower.has(parentBroker)) return;
        }
        eff += (parseFloat(bal) || 0);
      });
      return Math.round(eff * 100) / 100;
    };

    baseHistorical.forEach(item => {
      const closing = this.monthlyClosings ? this.monthlyClosings[item.month] : null;
      if (closing && closing.accounts) {
        const eff = computeEffectiveFromAccountsMap(closing.accounts);
        if (eff > 0) {
          nwMap.set(item.month, eff);
          isSnapshotMap.set(item.month, true);
          return;
        }
      }
      const pensionEstimate = 3000;
      const effVal = Math.max(1000, item.value - pensionEstimate);
      nwMap.set(item.month, Math.round(effVal * 100) / 100);
      isSnapshotMap.set(item.month, true);
    });

    if (this.monthlyClosings && typeof this.monthlyClosings === 'object') {
      Object.entries(this.monthlyClosings).forEach(([monthYear, closing]) => {
        if (closing && closing.accounts) {
          const eff = computeEffectiveFromAccountsMap(closing.accounts);
          if (eff > 0) {
            nwMap.set(monthYear, eff);
            isSnapshotMap.set(monthYear, true);
          }
        }
      });
    }

    Object.entries(savedSnapshots).forEach(([monthYear, val]) => {
      if (typeof val === 'number' && val > 0) {
        const closing = this.monthlyClosings ? this.monthlyClosings[monthYear] : null;
        if (closing && closing.accounts) {
          const eff = computeEffectiveFromAccountsMap(closing.accounts);
          if (eff > 0) {
            nwMap.set(monthYear, eff);
            isSnapshotMap.set(monthYear, true);
            return;
          }
        }
        nwMap.set(monthYear, val);
        isSnapshotMap.set(monthYear, true);
      }
    });

    // Calcola il flusso netto mensile dalle transazioni reali (income - expense, inclusi conguagli)
    const monthlyNetFlows = new Map();
    this.transactions.forEach(tx => {
      const ym = this.getTxMonthYear(tx);
      if (!ym) return;

      const amt = parseFloat(tx.amount) || 0;
      const currentFlow = monthlyNetFlows.get(ym) || 0;

      if (tx.type === 'income') {
        monthlyNetFlows.set(ym, currentFlow + amt);
      } else if (tx.type === 'expense') {
        monthlyNetFlows.set(ym, currentFlow - amt);
      }
    });

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const currentMonthKey = `${String(curMonth).padStart(2, '0')}/${curYear}`;

    const availableYearsNum = this.getAvailableYears().map(y => parseInt(y, 10)).filter(n => !isNaN(n));
    const minYear = availableYearsNum.length > 0 ? Math.min(...availableYearsNum) : 2024;
    const maxYear = availableYearsNum.length > 0 ? Math.max(...availableYearsNum) : curYear;
    const startYear = Math.min(2024, minYear);
    const startMonth = 1;
    const endYear = Math.max(curYear, maxYear);
    const endMonth = (endYear > curYear) ? 12 : curMonth;

    // Se in modalità Cloud manca una serie storica anteriore al primo snapshot (es. 10/2026), ricostruisce a ritroso tramite i flussi netti reali
    if (nwMap.size > 0) {
      const sortedSnapKeys = Array.from(nwMap.keys()).sort((a, b) => {
        const [ma, ya] = a.split('/').map(Number);
        const [mb, yb] = b.split('/').map(Number);
        return (ya * 12 + ma) - (yb * 12 + mb);
      });
      const earliestKey = sortedSnapKeys[0];
      const [em, ey] = earliestKey.split('/').map(Number);
      let backVal = nwMap.get(earliestKey) || 0;
      let by = ey;
      let bm = em;

      while (by > startYear || (by === startYear && bm > startMonth)) {
        const curKey = `${String(bm).padStart(2, '0')}/${by}`;
        const flowOfCur = monthlyNetFlows.get(curKey) || 0;
        bm--;
        if (bm < 1) {
          bm = 12;
          by--;
        }
        const prevKey = `${String(bm).padStart(2, '0')}/${by}`;
        if (!nwMap.has(prevKey)) {
          backVal = Math.max(250, Math.round((backVal - flowOfCur) * 100) / 100);
          nwMap.set(prevKey, backVal);
        } else {
          backVal = nwMap.get(prevKey);
        }
      }
    }

    const fullTimeline = [];
    const firstKey = `${String(startMonth).padStart(2, '0')}/${startYear}`;
    let prevVal = nwMap.get(firstKey) || (baseHistorical.length > 0 ? baseHistorical[0].value : Math.max(0, this.summary.effectiveNetWorth));

    let y = startYear;
    let m = startMonth;

    while (y < endYear || (y === endYear && m <= endMonth)) {
      const monthKey = `${String(m).padStart(2, '0')}/${y}`;
      const isCurrent = (monthKey === currentMonthKey);

      let val;

      if (isCurrent) {
        // Se il mese corrente è già stato ufficialmente chiuso/conguagliato, usiamo il dato di conguaglio
        const closing = this.monthlyClosings ? this.monthlyClosings[monthKey] : null;
        const isClosed = Boolean(closing && (closing.isClosed || closing.totalNW > 0));
        if (isClosed && nwMap.has(monthKey)) {
          val = nwMap.get(monthKey);
        } else {
          // Altrimenti il mese corrente riflette in tempo reale la somma reale di liquidità e investimenti
          // + le entrate stimate del mese non ancora accreditate
          const liveAnalysis = this.getCurrentMonthLiveAnalysis();
          const pendingEstimatedIncome = (liveAnalysis && liveAnalysis.isIncomeEstimated)
            ? Math.max(0, (liveAnalysis.effectiveIncome || 0) - (liveAnalysis.actualIncome || 0))
            : 0;
          val = Math.round((this.summary.effectiveNetWorth + pendingEstimatedIncome) * 100) / 100;
        }
      } else if (nwMap.has(monthKey)) {
        val = nwMap.get(monthKey);
      } else {
        const flow = monthlyNetFlows.get(monthKey) || 0;
        val = Math.round((prevVal + flow) * 100) / 100;
        if (val <= 0) val = prevVal;
      }

      prevVal = val;

      let curPointPendingEstimatedIncome = 0;
      if (isCurrent) {
        try {
          const liveAnalysis = this.getCurrentMonthLiveAnalysis();
          if (liveAnalysis && liveAnalysis.isIncomeEstimated) {
            curPointPendingEstimatedIncome = Math.max(0, (liveAnalysis.effectiveIncome || 0) - (liveAnalysis.actualIncome || 0));
          }
        } catch (e) {}
      }

      fullTimeline.push({
        month: monthKey,
        value: val,
        isCurrent,
        isSnapshot: isSnapshotMap.has(monthKey) || isCurrent,
        netFlow: monthlyNetFlows.get(monthKey) || 0,
        pendingEstimatedIncome: Math.round(curPointPendingEstimatedIncome * 100) / 100,
        hasEstimatedIncome: curPointPendingEstimatedIncome > 0
      });

      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }

    return fullTimeline;
  }

  // Serie storica dedicata del Fondo Pensione ("Previdenza a Lungo Termine")
  getPensionHistory() {
    const closings = this.monthlyClosings || {};
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curMonthKey = `${String(curMonth).padStart(2, '0')}/${curYear}`;

    // 1. Finestra temporale coerente con getHistoricalNetWorth (minimo 2024 fino a oggi)
    const availableYearsNum = this.getAvailableYears().map(y => parseInt(y, 10)).filter(n => !isNaN(n));
    const minYear = availableYearsNum.length > 0 ? Math.min(...availableYearsNum) : 2024;
    const maxYear = availableYearsNum.length > 0 ? Math.max(...availableYearsNum) : curYear;
    const startYear = Math.min(2024, minYear);
    const startMonth = 1;
    const endYear = Math.max(curYear, maxYear);
    const endMonth = (endYear > curYear) ? 12 : curMonth;

    // 2. Raccoglie tutti i punti noti certificati dai conguagli / chiusure e dalla scheda Saldi
    const knownPoints = new Map();

    // Dai conguagli salvati in monthlyClosings
    Object.keys(closings).forEach(mKey => {
      const c = closings[mKey];
      if (c && c.accounts) {
        let pVal = 0;
        Object.entries(c.accounts).forEach(([name, bal]) => {
          const nLow = name.toLowerCase();
          if (nLow.includes('pensione') || nLow.includes('previden')) {
            pVal += (parseFloat(bal) || 0);
          }
        });
        if (pVal > 0) {
          knownPoints.set(mKey, Math.round(pVal * 100) / 100);
        }
      }
    });

    // Dalla scheda Saldi se presente
    if (Array.isArray(this.saldi)) {
      this.saldi.forEach(s => {
        if (!s || !s.name) return;
        const nLow = String(s.name).trim().toLowerCase();
        const tpLow = String(s.type || '').trim().toLowerCase();
        if (nLow.includes('pensione') || tpLow.includes('previden') || tpLow.includes('pension')) {
          const dInfo = this._parseSheetDateInfo(s.date);
          const b = parseFloat(s.balance);
          if (dInfo && !isNaN(b) && b > 0) {
            knownPoints.set(dInfo.monthKey, Math.round(b * 100) / 100);
          }
        }
      });
    }

    // Valore corrente certificato nel summary
    const currentPensionVal = Math.round((this.summary.pensionFundTotal || 0) * 100) / 100;
    if (currentPensionVal > 0 && !knownPoints.has(curMonthKey)) {
      knownPoints.set(curMonthKey, currentPensionVal);
    }

    // Fallback dimostrativo solo se non esiste alcun punto noto
    if (knownPoints.size === 0) {
      const fallbackVal = currentPensionVal > 0 ? currentPensionVal : 3200;
      knownPoints.set(curMonthKey, fallbackVal);
    }

    // 3. Ordinamento cronologico dei punti noti
    const knownIndices = [];
    knownPoints.forEach((val, mKey) => {
      const [mStr, yStr] = mKey.split('/');
      const m = parseInt(mStr, 10);
      const y = parseInt(yStr, 10);
      if (!isNaN(m) && !isNaN(y)) {
        knownIndices.push({
          idx: y * 12 + (m - 1),
          monthKey: mKey,
          val
        });
      }
    });
    knownIndices.sort((a, b) => a.idx - b.idx);

    const monthlyContribution = parseFloat(this.salaryConfig?.monthlyPensionContribution) || 306.53;

    // Funzione di stima e interpolazione continua mese per mese
    const getPensionValueAtIdx = (targetIdx) => {
      const exact = knownIndices.find(k => k.idx === targetIdx);
      if (exact) return exact.val;

      const first = knownIndices[0];
      if (targetIdx < first.idx) {
        const monthsDiff = first.idx - targetIdx;
        let rate = monthlyContribution;
        if (knownIndices.length > 1) {
          const last = knownIndices[knownIndices.length - 1];
          const span = last.idx - first.idx;
          if (span > 0) {
            rate = Math.max(50, (last.val - first.val) / span);
          }
        }
        return Math.max(500, Math.round((first.val - (monthsDiff * rate)) * 100) / 100);
      }

      const last = knownIndices[knownIndices.length - 1];
      if (targetIdx > last.idx) {
        const monthsDiff = targetIdx - last.idx;
        return Math.round((last.val + (monthsDiff * monthlyContribution)) * 100) / 100;
      }

      let prevPoint = first;
      let nextPoint = last;
      for (let i = 0; i < knownIndices.length - 1; i++) {
        if (knownIndices[i].idx <= targetIdx && knownIndices[i + 1].idx >= targetIdx) {
          prevPoint = knownIndices[i];
          nextPoint = knownIndices[i + 1];
          break;
        }
      }

      const totalSpan = nextPoint.idx - prevPoint.idx;
      if (totalSpan === 0) return prevPoint.val;
      const progress = (targetIdx - prevPoint.idx) / totalSpan;
      const interpolated = prevPoint.val + progress * (nextPoint.val - prevPoint.val);
      return Math.round(interpolated * 100) / 100;
    };

    // 4. Generazione serie temporale continua
    const history = [];
    let y = startYear;
    let m = startMonth;

    while (y < endYear || (y === endYear && m <= endMonth)) {
      const monthKey = `${String(m).padStart(2, '0')}/${y}`;
      const isCurrent = (monthKey === curMonthKey);
      const targetIdx = y * 12 + (m - 1);
      const val = getPensionValueAtIdx(targetIdx);

      history.push({
        month: monthKey,
        value: val,
        isCurrent,
        isSnapshot: knownPoints.has(monthKey)
      });

      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }

    return history;
  }

  // === SPESE RICORRENTI & RATE ATTIVE (100% DINAMICHE DAI MOVIMENTI REALI) ===
  get recurringItems() {
    const items = [];
    const rataGroups = new Map();

    (this.transactions || []).forEach(t => {
      const desc = String(t.description || '').trim();
      if (!desc) return;
      const m = desc.match(/^(.*?)\s*\b(?:rata)\s*(\d+)(?:\s*\/\s*(\d+))?\b/i);
      if (m) {
        const baseLabel = (m[1] || desc).trim().replace(/[-–—:]$/, '').trim();
        const rataNum = parseInt(m[2], 10) || 1;
        const totRate = m[3] ? parseInt(m[3], 10) : Math.max(3, rataNum);
        const key = baseLabel.toLowerCase();
        const dInfo = this._parseSheetDateInfo(t.date);
        const prev = rataGroups.get(key);
        if (!prev || rataNum >= prev.rataNum) {
          rataGroups.set(key, {
            baseLabel: baseLabel.charAt(0).toUpperCase() + baseLabel.slice(1),
            amount: Math.abs(parseFloat(t.amount) || 0),
            rataNum,
            totRate: Math.max(totRate, prev?.totRate || 0),
            date: dInfo?.formattedDate || t.date || '',
            timestamp: dInfo?.timestamp || 0,
            category: t.category || '🏡 Casa'
          });
        }
      }
    });

    const todayTs = new Date().setHours(0, 0, 0, 0);
    let idx = 1;
    rataGroups.forEach(g => {
      const isFuture = g.timestamp > todayTs;
      const currentPaid = isFuture ? Math.max(0, g.rataNum - 1) : g.rataNum;
      if (currentPaid < g.totRate || isFuture) {
        items.push({
          id: `rec_rata_${idx++}`,
          name: `${g.baseLabel} (Rata)`,
          monthlyAmount: g.amount,
          totalRate: g.totRate,
          currentRata: currentPaid,
          nextDate: g.date,
          category: g.category,
          completed: false
        });
      }
    });

    let latestRentTx = null;
    let latestRentTs = -1;
    (this.transactions || []).forEach(t => {
      if (t.type === 'expense' && /affitto|canone locazione/i.test(String(t.description || ''))) {
        const ts = this._parseSheetDateInfo(t.date)?.timestamp || 0;
        if (ts >= latestRentTs) {
          latestRentTs = ts;
          latestRentTx = t;
        }
      }
    });
    if (latestRentTx) {
      items.push({
        id: 'rec_fixed_rent',
        name: 'Affitto / Casa',
        monthlyAmount: Math.abs(parseFloat(latestRentTx.amount) || 0),
        totalRate: 0,
        currentRata: 0,
        nextDate: 'Ogni inizio mese',
        category: '🏡 Casa',
        completed: false,
        isFixed: true
      });
    }

    (this.accounts || []).forEach(acc => {
      if (Array.isArray(acc.holdings)) {
        acc.holdings.forEach(h => {
          if (h.isPac && parseFloat(h.pacAmount) > 0) {
            items.push({
              id: `rec_pac_${h.ticker || idx++}`,
              name: `PAC ${h.ticker || h.name}`,
              monthlyAmount: parseFloat(h.pacAmount),
              totalRate: 0,
              currentRata: 0,
              nextDate: 'Piano mensile attivo',
              category: '📈 PAC Azionario',
              completed: false,
              isPAC: true
            });
          }
        });
      }
    });

    return items;
  }

  getRecurringExpenses() {
    return this.recurringItems || [];
  }

  // === CONGUAGLI & RICONCILIAZIONE SALDI (FINE MESE) ===
  getMonthlyReconciliationStatus(targetMonthKey = null) {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curDay = now.getDate();
    const defaultMonthKey = `${String(curMonth).padStart(2, '0')}/${curYear}`;
    const targetKey = targetMonthKey || defaultMonthKey;

    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    let tM = curMonth;
    let tY = curYear;
    if (targetKey && targetKey.includes('/')) {
      const parts = targetKey.split('/').map(n => parseInt(n, 10));
      if (!isNaN(parts[0])) tM = parts[0];
      if (!isNaN(parts[1])) tY = parts[1];
    }
    const targetMonthName = `${monthNames[(tM || curMonth) - 1]} ${tY || curYear}`;

    // Finestra temporale intelligente di fine mese richiesta da Giorgio:
    // - Mesi a 31 gg: giorni 30 e 31
    // - Mesi a 30 gg: giorni 29 e 30
    // - Febbraio: giorni 28 o 29
    const lastDayOfCurrentMonth = new Date(curYear, curMonth, 0).getDate();
    const isFeb = (curMonth === 2);
    const inEndOfMonthWindow = isFeb ? (curDay >= 28) : (curDay >= (lastDayOfCurrentMonth - 1));

    const isCurrentMonth = (targetKey === defaultMonthKey);

    const staleAccounts = [];
    const updatedAccounts = [];
    let isOverduePast = false;

    // Calcolo mese precedente formattato
    let prevM = curMonth - 1;
    let prevY = curYear;
    if (prevM === 0) { prevM = 12; prevY--; }
    const prevMonthKey = `${String(prevM).padStart(2, '0')}/${prevY}`;

    this.accounts.forEach(acc => {
      const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension') || (acc.name || '').toLowerCase().includes('pension');
      const recMonth = acc.lastReconciledMonth || '10/2026';
      
      const isStale = (recMonth !== targetKey);
      let lastMonthName = 'Precedente';
      if (recMonth && recMonth.includes('/')) {
        const [lm, ly] = recMonth.split('/').map(n => parseInt(n, 10));
        lastMonthName = `${monthNames[(lm || 1) - 1]} ${ly}`;
        // Se un conto è rimasto indietro persino rispetto al mese precedente, è un arretrato reale
        if (ly < prevY || (ly === prevY && lm < prevM)) {
          isOverduePast = true;
        }
      }

      const item = {
        ...acc,
        isPension,
        lastReconciledMonth: recMonth,
        lastMonthName,
        defaultMode: acc.defaultMode || (isPension ? 'delta' : 'balance')
      };

      if (isStale) {
        staleAccounts.push(item);
      } else {
        updatedAccounts.push(item);
      }
    });

    const isDismissed = (typeof sessionStorage !== 'undefined') && sessionStorage.getItem(`finanze_dismiss_closing_${targetKey}`) === 'true';

    // Regola cardine: per il mese corrente, l'allerta compare SOLO nei giorni di fine mese (30-31 o 28-29 feb)
    // Se invece c'è un mese passato non riconciliato, o un controllo manuale mirato, l'alert scatta
    const shouldShowAlert = !isDismissed && staleAccounts.length > 0 && (isOverduePast || !isCurrentMonth || inEndOfMonthWindow);

    return {
      targetMonth: targetKey,
      targetMonthName,
      isFullyReconciled: staleAccounts.length === 0,
      shouldShowAlert,
      inEndOfMonthWindow,
      isCurrentMonth,
      isOverduePast,
      isDismissed,
      staleAccounts,
      updatedAccounts,
      totalAccounts: this.accounts.length,
      pendingCount: staleAccounts.length
    };
  }

  reconcileAccount(accountName, newBalance, createMovement = true, customNote = '', monthKey = null, mode = 'balance', deltaAmount = 0) {
    const target = this.accounts.find(a => a.name.toLowerCase() === accountName.toLowerCase() || a.id === accountName);
    if (!target) return { success: false, error: 'Conto non trovato' };

    const oldBalance = parseFloat(target.balance) || 0;
    let targetBalance = parseFloat(newBalance) || 0;
    let delta = 0;

    if (mode === 'delta') {
      delta = parseFloat(deltaAmount) || 0;
      targetBalance = Math.round((oldBalance + delta) * 100) / 100;
    } else {
      targetBalance = parseFloat(newBalance) || 0;
      delta = Math.round((targetBalance - oldBalance) * 100) / 100;
    }

    const now = new Date();
    const curMonthKey = monthKey || `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const todayFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    let createdTx = null;
    if (createMovement && Math.abs(delta) > 0.001) {
      const isPositive = delta > 0;
      const type = isPositive ? 'income' : 'expense';
      const isPension = target.isPension || (target.type || '').toLowerCase().includes('pension');

      const tx = {
        id: 'tx_rec_' + Date.now(),
        year: String(now.getFullYear()),
        month: String(now.getMonth() + 1),
        date: todayFormatted,
        description: customNote || (isPension ? `Versamento Fondo Pensione Busta Paga (${curMonthKey})` : `Rettifica Saldo (${target.name})`),
        category: isPension ? '🛅 Livello Crescita' : '⚖️ Conguaglio / Rettifica',
        type: type,
        amount: Math.abs(delta),
        account: target.name,
        fromAccount: target.name,
        toAccount: ''
      };

      this.transactions.unshift(tx);
      this.recalculateLiveBalances();
      this.saveAccounts();
      this.saveTransactions();
      createdTx = tx;
    }

    target.balance = targetBalance;
    target.reconciledBalance = targetBalance;
    target.lastReconciledMonth = curMonthKey;
    target.lastReconciledDate = todayFormatted;
    target.defaultMode = mode;
    this.saveAccounts();

    // Aggiorna e fissa lo snapshot per il mese del conguaglio
    this.saveNetWorthSnapshot(curMonthKey, this.summary.netWorth);

    // Se configurato Google Sheets, aggiorna saldo da remoto
    try {
      if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
        window.googleSheetsService.updateAccountBalance(target.name, targetBalance, target.type);
      }
    } catch (e) {}

    return {
      success: true,
      account: target,
      oldBalance,
      newBalance: targetBalance,
      delta,
      createdTx
    };
  }

  executeMonthlyClosing(targetMonthKey, updates = [], options = {}) {
    // updates: Array di { accountName, mode: 'balance' | 'delta', value: number, note: string, createTx: boolean }
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const targetKey = targetMonthKey || `${String(curMonth).padStart(2, '0')}/${curYear}`;

    let tM = curMonth;
    let tY = curYear;
    if (targetKey.includes('/')) {
      const parts = targetKey.split('/').map(n => parseInt(n, 10));
      if (!isNaN(parts[0])) tM = parts[0];
      if (!isNaN(parts[1])) tY = parts[1];
    }

    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const monthName = `${monthNames[(tM || curMonth) - 1]} ${tY || curYear}`;
    const lastDayOfTargetMonth = new Date(tY || curYear, tM || curMonth, 0).getDate();
    const closingDateFormatted = `${String(lastDayOfTargetMonth).padStart(2, '0')}/${String(tM || curMonth).padStart(2, '0')}/${tY || curYear}`;
    const todayFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const oldTotalNW = this.summary.netWorth;
    const modifiedAccounts = [];
    const createdTransactions = [];

    updates.forEach(u => {
      const target = this.accounts.find(a => a.name.toLowerCase() === u.accountName.toLowerCase() || a.id === u.accountName);
      if (!target) return;

      const oldBal = parseFloat(target.balance) || 0;
      let newBal = oldBal;
      let delta = 0;

      if (u.mode === 'delta') {
        delta = parseFloat(u.value) || 0;
        newBal = Math.round((oldBal + delta) * 100) / 100;
      } else {
        newBal = parseFloat(u.value) || 0;
        delta = Math.round((newBal - oldBal) * 100) / 100;
      }

      target.balance = newBal;
      target.reconciledBalance = newBal;
      target.lastReconciledMonth = targetKey;
      target.lastReconciledDate = closingDateFormatted;
      target.defaultMode = u.mode;
      modifiedAccounts.push({ name: target.name, oldBal, newBal, delta });

      if (u.createTx && Math.abs(delta) > 0.001) {
        const isPension = target.isPension || (target.type || '').toLowerCase().includes('pension');
        const isInvestmentOrSavings = target.isInvestment ||
          target.id === 'xeon' || target.id === 'vwce' ||
          (target.name || '').toLowerCase().includes('xeon') || (target.name || '').toLowerCase().includes('vwce');
        const isPositive = delta > 0;

        let tx;
        if (isInvestmentOrSavings && isPositive) {
          const isPAC = target.id === 'vwce' || (target.name || '').toLowerCase().includes('vwce');
          const sourceAcc = this.findAccount('Buddybank');
          if (sourceAcc) {
            sourceAcc.balance = Math.round((sourceAcc.balance - Math.abs(delta)) * 100) / 100;
            const existingBuddy = modifiedAccounts.find(m => m.name.toLowerCase() === sourceAcc.name.toLowerCase());
            if (existingBuddy) {
              existingBuddy.newBal = sourceAcc.balance;
              existingBuddy.delta = Math.round((existingBuddy.delta - Math.abs(delta)) * 100) / 100;
            } else {
              modifiedAccounts.push({
                name: sourceAcc.name,
                oldBal: Math.round((sourceAcc.balance + Math.abs(delta)) * 100) / 100,
                newBal: sourceAcc.balance,
                delta: -Math.abs(delta)
              });
            }
            if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
              window.googleSheetsService.updateAccountBalance(sourceAcc.name, sourceAcc.balance, sourceAcc.type);
            }
          }

          tx = {
            id: 'tx_rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            year: String(tY),
            month: String(tM),
            date: todayFormatted,
            description: u.note || (isPAC ? `Giroconto PAC VWCE (${monthName})` : `Giroconto reintegro Fondo Emergenza XEON (${monthName})`),
            category: isPAC ? '🛅 Livello Crescita' : '🏦 Fondo di emergenza',
            type: 'transfer',
            rawType: 'Trasferimento',
            amount: Math.abs(delta),
            account: sourceAcc ? sourceAcc.name : 'Buddybank',
            fromAccount: sourceAcc ? sourceAcc.name : 'Buddybank',
            toAccount: target.name
          };
        } else {
          tx = {
            id: 'tx_rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            year: String(tY),
            month: String(tM),
            date: todayFormatted,
            description: u.note || (isPension ? `Versamento Fondo Pensione Busta Paga (${monthName})` : `Conguaglio Saldo ${target.name} (${monthName})`),
            category: isPension ? '🛅 Livello Crescita' : '⚖️ Conguaglio / Rettifica',
            type: isPositive ? 'income' : 'expense',
            amount: Math.abs(delta),
            account: target.name,
            fromAccount: target.name,
            toAccount: ''
          };
        }
        this.transactions.unshift(tx);
        createdTransactions.push(tx);
      }

      // Sincronizzazione Google Sheets
      try {
        if (typeof window !== 'undefined' && window.googleSheetsService && window.googleSheetsService.isConfigured()) {
          window.googleSheetsService.updateAccountBalance(target.name, newBal, target.type);
        }
      } catch (err) {}
    });

    this.saveAccounts();
    if (createdTransactions.length > 0) {
      this.recalculateLiveBalances();
      this.saveAccounts();
      this.saveTransactions();
    }

    // Salva lo snapshot del Net Worth e il breakdown dettagliato per conto
    const newTotalNW = this.summary.netWorth;
    this.saveNetWorthSnapshot(targetKey, newTotalNW);

    const closingAccounts = {};
    this.accounts.forEach(a => {
      closingAccounts[a.name] = a.balance;
    });
    this.saveMonthlyClosingData(targetKey, {
      monthKey: targetKey,
      label: monthName,
      date: closingDateFormatted,
      accounts: closingAccounts,
      totalNW: newTotalNW,
      notes: `Chiusura mese ${monthName}`
    });

    return {
      success: true,
      targetMonthKey: targetKey,
      monthName,
      oldTotalNW,
      newTotalNW,
      nwDelta: Math.round((newTotalNW - oldTotalNW) * 100) / 100,
      modifiedAccounts,
      createdTransactions
    };
  }

  // === ACCORPAMENTO INTELLIGENTE & SIMILARITÀ CATEGORIE ===
  findSimilarCategories(name) {
    if (!name || name.trim().length < 2) return [];
    const clean = name.toLowerCase().replace(/[^a-z0-9]/gi, '');
    const results = [];

    this.categories.forEach(cat => {
      const cleanCat = cat.name.toLowerCase().replace(/[^a-z0-9]/gi, '');
      if (cleanCat === clean) return;
      if (cleanCat.includes(clean) || clean.includes(cleanCat) || this.computeLevenshtein(clean, cleanCat) <= 2) {
        results.push(cat);
      }
    });
    return results;
  }

  computeLevenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  mergeCategories(sourceCategoryName, targetCategoryName) {
    if (!sourceCategoryName || !targetCategoryName || sourceCategoryName === targetCategoryName) {
      return { success: false, updatedCount: 0 };
    }

    let count = 0;
    this.transactions.forEach(t => {
      if (t.category === sourceCategoryName) {
        t.category = targetCategoryName;
        count++;
      }
    });

    if (count > 0) {
      this.recalculateLiveBalances();
      this.saveAccounts();
      this.saveTransactions();
    }

    this.categories = this.categories.filter(c => c.name !== sourceCategoryName && c.id !== sourceCategoryName);
    this.saveCategories();

    return { success: true, updatedCount: count };
  }

  // === REGOLE INTELLIGENTI (SMART RULES AUTO-CATEGORIZZAZIONE) ===
  loadSmartRules() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SMART_RULES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...DEFAULT_SMART_RULES];
  }

  saveSmartRules() {
    localStorage.setItem(STORAGE_KEYS.SMART_RULES, JSON.stringify(this.smartRules));
  }

  getSmartRules() {
    return [...this.smartRules];
  }

  predictCategory(description) {
    if (!description || typeof description !== 'string') return null;
    const descLower = description.toLowerCase();

    for (const rule of this.smartRules) {
      if (descLower.includes(rule.keyword.toLowerCase())) {
        return rule.category;
      }
    }
    return null;
  }

  // === OBIETTIVI DI RISPARMIO (SAVING GOALS) ===
  loadGoals() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...INITIAL_GOALS];
  }

  saveGoals() {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(this.goals));
  }

  getGoals() {
    return [...this.goals];
  }

  addGoal(goal) {
    const id = 'goal_' + Date.now();
    const newGoal = {
      id,
      name: goal.name.trim(),
      emoji: goal.emoji || '🎯',
      targetAmount: Math.abs(parseFloat(goal.targetAmount)) || 100,
      currentAmount: Math.abs(parseFloat(goal.currentAmount)) || 0,
      deadline: goal.deadline || '',
      account: goal.account || 'Buddybank',
      notes: goal.notes || ''
    };
    this.goals.push(newGoal);
    this.saveGoals();
    return newGoal;
  }

  updateGoal(id, updated) {
    const idx = this.goals.findIndex(g => g.id === id);
    if (idx !== -1) {
      this.goals[idx] = { ...this.goals[idx], ...updated };
      this.saveGoals();
      return true;
    }
    return false;
  }

  deleteGoal(id) {
    this.goals = this.goals.filter(g => g.id !== id);
    this.saveGoals();
  }

  // === PROFILO DI RISCHIO & TARGET ALLOCATION ===
  loadRiskProfile() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RISK_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      answers: { horizon: '3', tolerance: '2', goal: '2', knowledge: '2' },
      profileKey: 'bilanciato'
    };
  }

  saveRiskProfile(answers, profileKey) {
    this.riskProfile = { answers, profileKey };
    localStorage.setItem(STORAGE_KEYS.RISK_PROFILE, JSON.stringify(this.riskProfile));
  }

  getRiskProfile() {
    return this.riskProfile;
  }

  getRiskProfileTemplates() {
    return {
      conservativo: {
        key: 'conservativo',
        title: 'Conservativo (Capitale Protetto)',
        badge: 'Basso Rischio',
        color: '#34C759',
        description: 'Priorità assoluta alla tutela del capitale con minimizzazione della volatilità. Strumenti monetari overnight (XEON) e liquidità per coprire ogni imprevisto.',
        allocations: {
          liquid: 25,
          monetario: 40,
          azionario: 15,
          pensione: 20
        },
        instruments: ['Trade Republic - XEON (Monetario Overnight)', 'Conto Corrente Remunerato', 'Fondo Pensione Integrativo']
      },
      bilanciato: {
        key: 'bilanciato',
        title: 'Bilanciato (Crescita & Sicurezza)',
        badge: 'Rischio Moderato',
        color: '#0071E3',
        description: 'Equilibrio ottimale tra crescita dell\'azionario globale (VWCE) e resilienza del fondo di emergenza monetario (XEON).',
        allocations: {
          liquid: 15,
          monetario: 30,
          azionario: 35,
          pensione: 20
        },
        instruments: ['Trade Republic - VWCE (Azionario Globale All-World)', 'Trade Republic - XEON (Fondo Emergenza)', 'Previdenza Complementare']
      },
      dinamico: {
        key: 'dinamico',
        title: 'Dinamico (Crescita Accentuata)',
        badge: 'Rischio Medio-Alto',
        color: '#AF52DE',
        description: 'Focalizzato sulla massimizzazione dell\'interesse composto con orizzonte decennale. Esposizione prevalente su ETF azionari.',
        allocations: {
          liquid: 10,
          monetario: 20,
          azionario: 50,
          pensione: 20
        },
        instruments: ['VWCE (All-World ETF ad Accumulazione)', 'XEON (Overnight di sicurezza 3 mesi)', 'Previdenza Complementare']
      },
      aggressivo: {
        key: 'aggressivo',
        title: 'Aggressivo (Massimo Rendimento)',
        badge: 'Alto Rischio / Rendimento',
        color: '#FF9500',
        description: 'Massima spinta azionaria globale per moltiplicare il patrimonio. Tolleranza elevata a drawdown temporanei.',
        allocations: {
          liquid: 5,
          monetario: 10,
          azionario: 65,
          pensione: 20
        },
        instruments: ['VWCE / ETF Azionari Mondiali', 'Previdenza Complementare', 'Cuscinetto Monetario Essenziale']
      }
    };
  }

  // === PRIVACY MODE ===
  isPrivacyMode() {
    return localStorage.getItem(STORAGE_KEYS.PRIVACY_MODE) === 'true';
  }

  setPrivacyMode(val) {
    localStorage.setItem(STORAGE_KEYS.PRIVACY_MODE, val ? 'true' : 'false');
  }

  // === ANALISI CATEGORIA SINGOLA & HEAD-TO-HEAD ===
  getCategoryAnalytics(categoryName, monthsLimit = 12) {
    const cleanTarget = (categoryName || '').replace(/^[\p{Emoji}\p{Symbol}\s]+/u, '').trim().toLowerCase();
    const txs = this.transactions.filter(t => {
      if (t.type !== 'expense') return false;
      if (t.category === categoryName) return true;
      const cleanCat = (t.category || '').replace(/^[\p{Emoji}\p{Symbol}\s]+/u, '').trim().toLowerCase();
      return cleanCat === cleanTarget;
    });
    const monthlyMap = new Map();

    let totalAmount = 0;
    let maxTx = null;

    txs.forEach(t => {
      totalAmount += t.amount;
      if (!maxTx || t.amount > maxTx.amount) maxTx = t;

      let key = '';
      if (t.date) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(t.date)) {
          const parts = t.date.split('/');
          key = `${parts[2]}-${parts[1]}`;
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
          const parts = t.date.split('-');
          key = `${parts[0]}-${parts[1]}`;
        }
      }
      if (key) {
        monthlyMap.set(key, (monthlyMap.get(key) || 0) + t.amount);
      }
    });

    let allExpenses = 0;
    this.transactions.forEach(t => {
      if (t.type === 'expense') allExpenses += t.amount;
    });

    const sortedMonths = Array.from(monthlyMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).slice(-monthsLimit);
    const monthsCount = Math.max(1, sortedMonths.length);
    const avgMonthly = totalAmount / monthsCount;
    const impactPercent = allExpenses > 0 ? ((totalAmount / allExpenses) * 100).toFixed(1) : 0;

    return {
      categoryName,
      totalAmount,
      avgMonthly,
      txCount: txs.length,
      maxTx,
      impactPercent,
      monthlySeries: sortedMonths.map(([ym, val]) => ({ ym, val })),
      transactions: txs.slice(0, 30)
    };
  }

  compareCategories(catNameA, catNameB, monthsLimit = 8) {
    const dataA = this.getCategoryAnalytics(catNameA, monthsLimit);
    const dataB = this.getCategoryAnalytics(catNameB, monthsLimit);

    const allKeysSet = new Set();
    dataA.monthlySeries.forEach(s => allKeysSet.add(s.ym));
    dataB.monthlySeries.forEach(s => allKeysSet.add(s.ym));
    const sortedKeys = Array.from(allKeysSet).sort().slice(-monthsLimit);

    const mapA = new Map(dataA.monthlySeries.map(s => [s.ym, s.val]));
    const mapB = new Map(dataB.monthlySeries.map(s => [s.ym, s.val]));

    const mergedSeries = sortedKeys.map(ym => ({
      ym,
      valA: mapA.get(ym) || 0,
      valB: mapB.get(ym) || 0
    }));

    const deltaTotal = dataA.totalAmount - dataB.totalAmount;
    const higher = deltaTotal >= 0 ? catNameA : catNameB;
    const minVal = Math.min(dataA.totalAmount, dataB.totalAmount);
    const percentDiff = minVal > 0
      ? ((Math.abs(deltaTotal) / minVal) * 100).toFixed(1)
      : '100.0';

    return {
      catA: dataA,
      catB: dataB,
      mergedSeries,
      deltaTotal,
      higher,
      percentDiff
    };
  }

  // === ANOMALIE & SPIKE DETECTOR ===
  getCategoryAnomalies() {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const curKey = `${curYear}-${String(curMonth).padStart(2, '0')}`;

    const catCurrent = new Map();
    const catHistory = new Map();

    this.transactions.forEach(t => {
      if (t.type !== 'expense') return;
      let ym = '';
      if (t.date) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(t.date)) {
          const parts = t.date.split('/');
          ym = `${parts[2]}-${parts[1]}`;
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
          const parts = t.date.split('-');
          ym = `${parts[0]}-${parts[1]}`;
        }
      }
      if (!ym) return;

      if (ym === curKey || ym === '2025-10') {
        catCurrent.set(t.category, (catCurrent.get(t.category) || 0) + t.amount);
      } else {
        if (!catHistory.has(t.category)) catHistory.set(t.category, new Map());
        const hMap = catHistory.get(t.category);
        hMap.set(ym, (hMap.get(ym) || 0) + t.amount);
      }
    });

    const anomalies = [];
    catCurrent.forEach((currentAmount, catName) => {
      const hMap = catHistory.get(catName);
      if (hMap && hMap.size >= 2) {
        const values = Array.from(hMap.values());
        const avg = values.reduce((s, v) => s + v, 0) / values.length;
        if (currentAmount > avg * 1.35 && currentAmount > 50) {
          const spikePercent = Math.round(((currentAmount - avg) / avg) * 100);
          anomalies.push({
            category: catName,
            currentAmount,
            historicalAvg: avg,
            spikePercent,
            type: 'warning'
          });
        }
      }
    });

    return anomalies.sort((a, b) => b.spikePercent - a.spikePercent);
  }

  // === FINANCIAL HEALTH SCORE (0-100) & RUNWAY ===
  getFinancialHealthScore() {
    const sum = this.summary;
    const accounts = this.getAccounts();
    const xeonAcc = accounts.find(a => a.name.toLowerCase().includes('xeon'));
    const xeon = sum.xeonTotal > 0 ? sum.xeonTotal : (xeonAcc ? xeonAcc.balance : 4500.00);
    const monthlyExp = sum.monthlyExpense || 800;

    const runwayMonths = monthlyExp > 0 ? (xeon / monthlyExp) : 6;
    let emergencyScore = Math.min(35, Math.round((runwayMonths / 6) * 35));

    let savingsScore = Math.min(35, Math.round((sum.savingsRate / 25) * 35));

    const investedRatio = sum.netWorth > 0 ? (sum.investedTotal + sum.pensionTotal) / sum.netWorth : 0.5;
    let investScore = Math.min(30, Math.round(investedRatio * 30 * 1.5));

    const totalScore = Math.max(10, Math.min(100, emergencyScore + savingsScore + investScore));

    let label = 'Eccellente';
    let color = '#34C759';
    let tip = 'Patrimonio ben bilanciato, fondo emergenza solido e tasso di risparmio sostenibile.';

    if (totalScore < 50) {
      label = 'Da Rafforzare';
      color = '#FF9500';
      tip = 'Aumenta il cuscinetto di liquidità sul monetario per proteggerti dagli imprevisti.';
    } else if (totalScore < 75) {
      label = 'Solido';
      color = '#0071E3';
      tip = 'Buona gestione del budget. Puoi incrementare il PAC su VWCE per migliorare la resa.';
    }

    return {
      score: totalScore,
      label,
      color,
      tip,
      runwayMonths: runwayMonths.toFixed(1),
      savingsRate: sum.savingsRate,
      breakdown: { emergencyScore, savingsScore, investScore }
    };
  }

  getProjectedMonthEnd() {
    const sum = this.summary;
    const liquid = sum.liquidTotal;
    const remainingRate = this.recurringItems
      .filter(item => !item.completed)
      .reduce((s, i) => s + (i.monthlyAmount || 0), 0);

    const projectedEnd = Math.max(0, liquid - remainingRate);
    return {
      liquidBalance: liquid,
      remainingObligations: remainingRate,
      projectedEnd
    };
  }

  // === RADAR SAFE-TO-SPEND & CICLO STIPENDIO (25 DEL MESE) ===
  getPaycheckCycleStatus() {
    const now = new Date();
    const curY = now.getFullYear();
    const curM = now.getMonth(); // 0-based: 0 = Gennaio
    const curD = now.getDate();

    let cycleStart, nextPaycheck;
    if (curD < 25) {
      // Ciclo in corso iniziato il 25 del mese precedente con scadenza il 25 del mese corrente
      cycleStart = new Date(curY, curM - 1, 25);
      nextPaycheck = new Date(curY, curM, 25);
    } else {
      // Oggi è il 25 o successivo: nuovo ciclo iniziato il 25 del mese corrente fino al 25 del mese prossimo
      cycleStart = new Date(curY, curM, 25);
      nextPaycheck = new Date(curY, curM + 1, 25);
    }

    const todayMidnight = new Date(curY, curM, curD);
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysRemaining = Math.max(1, Math.round((nextPaycheck.getTime() - todayMidnight.getTime()) / msPerDay));
    const totalCycleDays = Math.max(1, Math.round((nextPaycheck.getTime() - cycleStart.getTime()) / msPerDay));
    const daysElapsed = Math.max(0, totalCycleDays - daysRemaining);
    const cycleProgress = Math.min(100, Math.max(0, Math.round((daysElapsed / totalCycleDays) * 100)));

    // Liquidità spendibile cassa libera (esclusi rigorosamente Buoni Pasto, XEON, VWCE, Fondo Pensione)
    const liquidAccounts = this.accounts.filter(a => a.isLiquid && !a.isVoucher && !a.isInvestment && !a.isPension);
    const liquidBalance = liquidAccounts.reduce((sum, a) => sum + (parseFloat(a.balance) || 0), 0);
    const buddybankAccount = this.findAccount('buddybank') || this.findAccount('Buddybank');
    const buddybankBalance = buddybankAccount ? (parseFloat(buddybankAccount.balance) || 0) : liquidBalance;

    // Rate e impegni fissi rimanenti da saldare prima del prossimo stipendio
    const recurring = this.recurringItems || [];
    let pendingFixed = 0;
    const pendingItems = [];
    recurring.forEach(item => {
      if (item.completed) return;
      const amt = parseFloat(item.monthlyAmount || item.amount) || 0;
      pendingFixed += amt;
      pendingItems.push({ name: item.name, amount: amt, nextDate: item.nextDate });
    });

    // Quota Risparmio & Investimenti Riservata (PAC su Trade Republic, Obiettivo 20% del netto)
    // NOTA FISCALE & FLUSSO DI CASSA:
    // Il Fondo Pensione è a monte, già trattenuto dal datore di lavoro alla fonte direttamente sul cedolino/busta paga (Art. 51 TUIR).
    // Lo stipendio netto accreditato su Buddybank (es. 1.700 € o 3.400 € a Nov) è già al netto del fondo pensione.
    // L'algoritmo protegge unicamente i risparmi volontari / PAC ETF (VWCE, XEON) dalla spesa corrente.
    const cfg = this.getSalaryConfig();
    const monthlyBase = parseFloat(cfg.baseSalary) || 1700.00;
    const plannedSavingsTarget = Math.round((monthlyBase * 0.20) * 100) / 100; // ~340.00 € (Target 20%)

    // Calcolo investimenti e risparmi bancari già eseguiti nel ciclo corrente (esclusa la pensione già a monte)
    let executedSavingsInCycle = 0;
    this.transactions.forEach(t => {
      if (t.type !== 'expense') return;
      const cat = (t.category || '').toLowerCase();
      const desc = (t.description || '').toLowerCase();
      const isPension = cat.includes('pensione') || desc.includes('fondo pensione') || desc.includes('previdenz');
      const isSaving = !isPension && (cat.includes('risparmio') || cat.includes('invest') || desc.includes('pac') || desc.includes('xeon') || desc.includes('vwce') || desc.includes('trade republic'));
      if (isSaving && t.date) {
        let txDate = null;
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(t.date)) {
          const [d, m, y] = t.date.split('/').map(Number);
          txDate = new Date(y, m - 1, d);
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
          const [y, m, d] = t.date.split('-').map(Number);
          txDate = new Date(y, m - 1, d);
        }
        if (txDate && txDate >= cycleStart && txDate <= todayMidnight) {
          executedSavingsInCycle += parseFloat(t.amount) || 0;
        }
      }
    });

    // Quota residua di risparmio da bloccare e non spendere prima del 25
    const reservedSavings = Math.max(0, Math.round((plannedSavingsTarget - executedSavingsInCycle) * 100) / 100);

    // Riserva discrezionale disponibile: ESCLUDE RIGOROSAMENTE rate fisse E quota risparmi riservata
    const discretionaryPool = Math.max(0, Math.round((buddybankBalance - pendingFixed - reservedSavings) * 100) / 100);
    const dailyAllowance = Math.round((discretionaryPool / daysRemaining) * 100) / 100;
    const weeklyAllowance = Math.round((dailyAllowance * 7) * 100) / 100;

    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const monthShortNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const nextMonthName = monthNames[nextPaycheck.getMonth()];
    const nextPaycheckFormatted = `25 ${monthShortNames[nextPaycheck.getMonth()]}`;
    const cycleStartFormatted = `25 ${monthShortNames[cycleStart.getMonth()]}`;

    const isPayday = curD === 25;
    let pacingStatus = 'comfortable'; // 'comfortable', 'on_track', 'warning', 'critical'
    if (dailyAllowance >= 45) {
      pacingStatus = 'comfortable';
    } else if (dailyAllowance >= 25) {
      pacingStatus = 'on_track';
    } else if (dailyAllowance >= 15) {
      pacingStatus = 'warning';
    } else {
      pacingStatus = 'critical';
    }

    return {
      isPayday,
      curDay: curD,
      daysRemaining,
      daysElapsed,
      totalCycleDays,
      cycleProgress,
      liquidBalance,
      buddybankBalance,
      pendingFixed,
      pendingItems,
      plannedSavingsTarget,
      executedSavingsInCycle,
      reservedSavings,
      discretionaryPool,
      dailyAllowance,
      weeklyAllowance,
      pacingStatus,
      nextPaycheckDate: nextPaycheck,
      nextPaycheckFormatted,
      nextMonthName,
      cycleStartDate: cycleStart,
      cycleStartFormatted
    };
  }

  // === ANALISI MESE CORRENTE & CASH FLOW LIVE (DASHBOARD EXECUTIVE) ===
  getCurrentMonthLiveAnalysis() {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1; // 1-12
    const curDay = now.getDate();
    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    const curMonthName = monthNames[curMonth - 1];
    const curMonthKey = `${String(curMonth).padStart(2, '0')}/${curYear}`;
    const daysInMonth = new Date(curYear, curMonth, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - curDay);
    const cfg = this.getSalaryConfig();

    // Stipendio stimato per il mese corrente (include 13esima / 14esima / premi)
    const estimatedSalary = this.getEstimatedSalaryForMonth(curMonth, curYear);

    // Raccoglie transazioni del mese corrente con suddivisione Spese Fisse vs Spese Extra
    let actualIncome = 0;
    let actualExpense = 0;
    let fixedExpenses = 0;
    let variableExpenses = 0;
    let hasSalaryTx = false;
    let salaryTxAmount = 0;
    const currentMonthExpensesByCat = {};
    const fixedItems = [];
    const variableItems = [];

    this.transactions.forEach(t => {
      const ym = this.getTxMonthYear(t);
      if (ym && ym === curMonthKey) {
        const amt = parseFloat(t.amount) || 0;
        if (t.type === 'income') {
          actualIncome += amt;
          const cat = (t.category || '').toLowerCase();
          const desc = (t.description || '').toLowerCase();
          if (cat.includes('stipendio') || desc.includes('stipendio') || amt >= 1000) {
            hasSalaryTx = true;
            salaryTxAmount = amt;
          }
        } else if (t.type === 'expense') {
          actualExpense += amt;
          const cName = t.category || 'Altro';
          currentMonthExpensesByCat[cName] = (currentMonthExpensesByCat[cName] || 0) + amt;

          const cat = (t.category || '').toLowerCase();
          const desc = (t.description || '').toLowerCase();
          const isFixedTx = t.isFixed || cat.includes('casa') || cat.includes('affitto') || cat.includes('rata') || cat.includes('abbonament') || desc.includes('rata') || desc.includes('finanziamento');
          if (isFixedTx) {
            fixedExpenses += amt;
            fixedItems.push(t);
          } else {
            variableExpenses += amt;
            variableItems.push(t);
          }
        }
      }
    });

    // Se nel mese corrente non ci sono ancora uscite registrate (es. appena iniziato il mese),
    // consideriamo le uscite registrate o se 0 usiamo il ritmo live calcolato
    const isPaydayPassed = curDay >= cfg.payDay;
    const isSalaryReceived = hasSalaryTx || (isPaydayPassed && actualIncome >= (estimatedSalary * 0.75));

    // Entrata efficace: se stipendio ricevuto o entrate reali presenti usa entrate effettive, altrimenti usa lo stimato
    const effectiveIncome = isSalaryReceived && actualIncome > 0 ? actualIncome : estimatedSalary;
    const isIncomeEstimated = !isSalaryReceived;

    // Rimanenza (Risparmio Extra) = Entrate - (Spese Fisse + Spese Extra)
    const remainingExtraSavings = Math.max(0, Math.round((effectiveIncome - actualExpense) * 100) / 100);
    const realSavingsRate = effectiveIncome > 0 
      ? Math.round(((remainingExtraSavings / effectiveIncome) * 100) * 10) / 10 
      : 0;

    // Risparmio programmato (20% dello stipendio efficace)
    const plannedSavings = Math.round((effectiveIncome * 0.20) * 100) / 100;

    // Cash flow netto live in evoluzione costante
    const netCashFlow = Math.round((effectiveIncome - actualExpense) * 100) / 100;

    // Ritmo di spesa al giorno
    const curDailyBurnRate = curDay > 0 ? Math.round((actualExpense / curDay) * 100) / 100 : 0;
    const maxSustainableDailySpend = daysRemaining > 0 
      ? Math.max(0, Math.round(((effectiveIncome - plannedSavings - actualExpense) / daysRemaining) * 100) / 100)
      : 0;

    // Proiezione a fine mese con burn rate attuale
    const projectedExpenseAtMonthEnd = Math.round((actualExpense + (curDailyBurnRate * daysRemaining)) * 100) / 100;
    const projectedNetAtMonthEnd = Math.round((effectiveIncome - projectedExpenseAtMonthEnd) * 100) / 100;
    const projectedSavingsRate = effectiveIncome > 0
      ? Math.max(0, Math.round(((projectedNetAtMonthEnd / effectiveIncome) * 100) * 10) / 10)
      : 0;

    const cycleStatus = this.getPaycheckCycleStatus();

    const has13thThisMonth = Boolean(cfg.has13th && curMonth === parseInt(cfg.thirteenthMonth, 10));
    const has14thThisMonth = Boolean(cfg.has14th && curMonth === parseInt(cfg.fourteenthMonth, 10));
    const hasBonusThisMonth = Boolean(cfg.hasProductionBonus && curMonth === parseInt(cfg.productionBonusMonth, 10));
    let extraIncomeLabel = '';
    if (has13thThisMonth) extraIncomeLabel = '+ 13ª mensilità';
    else if (has14thThisMonth) extraIncomeLabel = '+ 14ª mensilità';
    else if (hasBonusThisMonth) extraIncomeLabel = '+ Premio produzione';

    return {
      curYear,
      curMonth,
      curDay,
      curMonthName,
      curMonthKey,
      daysInMonth,
      daysElapsed: curDay,
      daysRemaining,
      monthProgressPct: Math.min(100, Math.round((curDay / daysInMonth) * 100)),
      cfg,
      estimatedSalary,
      has13thThisMonth,
      has14thThisMonth,
      hasBonusThisMonth,
      extraIncomeLabel,
      hasSalaryTx,
      salaryTxAmount,
      isPaydayPassed,
      isSalaryReceived,
      isIncomeEstimated,
      actualIncome,
      effectiveIncome,
      actualExpense,
      fixedExpenses: Math.round(fixedExpenses * 100) / 100,
      variableExpenses: Math.round(variableExpenses * 100) / 100,
      remainingExtraSavings,
      realSavingsRate,
      fixedItems,
      variableItems,
      currentMonthExpensesByCat,
      netCashFlow,
      plannedSavings,
      curDailyBurnRate,
      maxSustainableDailySpend,
      projectedExpenseAtMonthEnd,
      projectedNetAtMonthEnd,
      projectedSavingsRate,
      cycleStatus
    };
  }

  // === FLUSSO DI CASSA DINAMICO A 6 MENSILITÀ (CON MESE CORRENTE LIVE) ===
  getMonthlyTrendHistory(count = 6) {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1; // 1-12
    const monthShortNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const labels = [];
    const income = [];
    const expenses = [];
    const net = [];
    const meta = [];

    // Prepara una mappa di spese ed entrate per tutti i mesi registrati
    const txTotalsByYM = new Map();
    this.transactions.forEach(t => {
      const ym = this.getTxMonthYear(t);
      if (!ym) return;
      if (!txTotalsByYM.has(ym)) {
        txTotalsByYM.set(ym, { inc: 0, exp: 0 });
      }
      const item = txTotalsByYM.get(ym);
      const amt = parseFloat(t.amount) || 0;
      if (t.type === 'income') item.inc += amt;
      else if (t.type === 'expense') item.exp += amt;
    });

    // Costruisce i 'count' mesi terminando con il mese corrente
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(curYear, (curMonth - 1) - i, 1);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      const mKey = `${String(m).padStart(2, '0')}/${y}`;
      const isCurrentMonth = (i === 0);

      const txData = txTotalsByYM.get(mKey) || { inc: 0, exp: 0 };
      const estimatedSal = this.getEstimatedSalaryForMonth(m, y);

      let mIncome = txData.inc;
      let mExpense = txData.exp;

      if (isCurrentMonth) {
        // Mese corrente live
        const liveAnalysis = this.getCurrentMonthLiveAnalysis();
        mIncome = liveAnalysis.effectiveIncome;
        mExpense = liveAnalysis.actualExpense;
        // Se nel mese corrente le uscite sono 0 (es. inizio mese), mostra il dato reale o spesa proporzionale
        if (mExpense === 0 && txTotalsByYM.has('10/2026')) {
          // Se non ci sono ancora uscite registrate a Novembre, calcoliamo una proiezione basata sui giorni
          const daysInM = liveAnalysis.daysInMonth;
          const refOctExp = txTotalsByYM.get('10/2026')?.exp || 808.34;
          const dailyRate = refOctExp / 31;
          mExpense = Math.round(dailyRate * liveAnalysis.curDay * 100) / 100;
        }
      } else {
        // Mesi passati: se non c'era entrata di stipendio registrata, usa lo stipendio stimato per quel mese (con eventuale 13a/14a)
        if (mIncome === 0) {
          mIncome = estimatedSal;
        }
        // Se spesa 0 per un mese passato noto, fallback sui valori storici tipici
        if (mExpense === 0) {
          const fallbackPastExpenses = {
            '05/2026': 920, '06/2026': 1140, '07/2026': 1080, '08/2026': 1350, '09/2026': 980, '10/2026': 808.34
          };
          mExpense = fallbackPastExpenses[mKey] || 1000;
        }
      }

      const label = isCurrentMonth ? `${monthShortNames[m - 1]} (Live)` : monthShortNames[m - 1];
      labels.push(label);
      income.push(Math.round(mIncome * 100) / 100);
      expenses.push(Math.round(mExpense * 100) / 100);
      net.push(Math.round((mIncome - mExpense) * 100) / 100);
      meta.push({ monthKey: mKey, year: y, month: m, isCurrent: isCurrentMonth });
    }

    return {
      labels,
      income,
      expenses,
      net,
      meta,
      curMonthIndex: count - 1
    };
  }

  // === SICUREZZA PIN ===
  getPin() {
    return localStorage.getItem(STORAGE_KEYS.SECURITY_PIN) || '';
  }

  setPin(pin) {
    if (!pin) {
      localStorage.removeItem(STORAGE_KEYS.SECURITY_PIN);
      localStorage.setItem(STORAGE_KEYS.PIN_ENABLED, 'false');
    } else {
      localStorage.setItem(STORAGE_KEYS.SECURITY_PIN, pin);
      localStorage.setItem(STORAGE_KEYS.PIN_ENABLED, 'true');
    }
  }

  isPinEnabled() {
    return localStorage.getItem(STORAGE_KEYS.PIN_ENABLED) === 'true';
  }

  // === 1. BUDGET PREVENTIVO 50/30/20 & BUSTE DI SPESA ===
  getBudget50_30_20() {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;

    let monthlyIncome = 0;
    try {
      const live = this.getCurrentMonthLiveAnalysis();
      if (live && live.effectiveIncome > 0) {
        monthlyIncome = live.effectiveIncome;
      }
    } catch (e) {}

    if (!monthlyIncome || monthlyIncome <= 0) {
      monthlyIncome = this.getEstimatedSalaryForMonth(curMonth, curYear) || 1850;
    }
    
    // Tetti aurei 50/30/20
    const targetNeeds = monthlyIncome * 0.50;    // 50%
    const targetWants = monthlyIncome * 0.30;    // 30%
    const targetSavings = monthlyIncome * 0.20;  // 20%

    const needsCats = ['alimentari', 'casa', 'auto', 'trasporti', 'salute', 'istruzione'];
    const savingsCats = ['fondo_emergenza', 'livello_sicurezza', 'livello_crescita'];

    let spentNeeds = 0;
    let spentWants = 0;
    let spentSavings = 0;

    const catSpendMap = {};

    this.transactions.forEach(t => {
      let txMonth = parseInt(t.month, 10);
      let txYear = parseInt(t.year, 10);

      if ((!txMonth || !txYear) && t.date) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(t.date)) {
          const parts = t.date.split('/');
          txMonth = parseInt(parts[1], 10);
          txYear = parseInt(parts[2], 10);
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(t.date)) {
          const parts = t.date.split('-');
          txYear = parseInt(parts[0], 10);
          txMonth = parseInt(parts[1], 10);
        }
      }

      const isCurrentMonth = (txYear === curYear && txMonth === curMonth);
      if (!isCurrentMonth) return;

      if (t.type === 'expense') {
        const cat = (t.category || '').toLowerCase();
        const amt = parseFloat(t.amount) || 0;
        catSpendMap[t.category] = (catSpendMap[t.category] || 0) + amt;

        if (needsCats.some(c => cat.includes(c))) {
          spentNeeds += amt;
        } else if (savingsCats.some(c => cat.includes(c))) {
          spentSavings += amt;
        } else {
          spentWants += amt;
        }
      } else if (t.type === 'transfer') {
        spentSavings += parseFloat(t.amount) || 0;
      }
    });

    const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const currentDay = now.getDate();
    const daysRemaining = Math.max(1, totalDays - currentDay);

    const totalBudget = targetNeeds + targetWants;
    const totalSpent = spentNeeds + spentWants;
    const totalRemaining = Math.max(0, totalBudget - totalSpent);
    const dailySafeSpend = totalRemaining / daysRemaining;

    const needsPct = targetNeeds > 0 ? Math.min(150, Math.round((spentNeeds / targetNeeds) * 100)) : 0;
    const wantsPct = targetWants > 0 ? Math.min(150, Math.round((spentWants / targetWants) * 100)) : 0;
    const savingsPct = targetSavings > 0 ? Math.min(150, Math.round((spentSavings / targetSavings) * 100)) : 0;

    return {
      monthlyIncome,
      daysRemaining,
      dailySafeSpend,
      totalRemaining,
      needs: { target: targetNeeds, spent: spentNeeds, pct: needsPct, remaining: targetNeeds - spentNeeds },
      wants: { target: targetWants, spent: spentWants, pct: wantsPct, remaining: targetWants - spentWants },
      savings: { target: targetSavings, actual: spentSavings, pct: savingsPct },
      catSpendMap
    };
  }

  // === 2. SIMULATORE F.I.R.E. & INDIPENDENZA FINANZIARIA ===
  calculateFireMetrics(customParams = {}) {
    const sum = this.summary;
    const accounts = this.getAccounts();

    let netWorth = accounts.reduce((acc, a) => acc + (parseFloat(a.balance) || 0), 0);
    if (netWorth <= 0) netWorth = sum.netWorth || 17354.81;

    const annualSpending = (sum.monthlyExpense || 1400) * 12;
    const annualSavings = (sum.savingsAmount || 450) * 12;

    const swr = customParams.swr || 4.0; // 4% rule
    const expReturn = customParams.annualReturn || 7.0; // 7%
    const inflation = customParams.inflation || 2.0; // 2%
    const realReturn = Math.max(0.5, expReturn - inflation) / 100; // 5% netto reale

    const fireNumber = annualSpending / (swr / 100); // 25x annual spending
    const leanFire = (annualSpending * 0.70) / (swr / 100);
    const fatFire = (annualSpending * 1.35) / (swr / 100);

    const series = [];
    let currentCapital = netWorth;
    let fireReachedYear = null;

    series.push({
      year: 0,
      label: 'Oggi',
      capital: Math.round(currentCapital),
      passiveIncome: Math.round(currentCapital * (swr / 100)),
      annualSpending: Math.round(annualSpending)
    });

    for (let y = 1; y <= 35; y++) {
      currentCapital = (currentCapital + annualSavings) * (1 + realReturn);
      const passiveIncome = currentCapital * (swr / 100);
      
      if (passiveIncome >= annualSpending && fireReachedYear === null) {
        fireReachedYear = y;
      }

      series.push({
        year: y,
        label: `+${y}a`,
        capital: Math.round(currentCapital),
        passiveIncome: Math.round(passiveIncome),
        annualSpending: Math.round(annualSpending)
      });
    }

    const currentPassiveIncome = netWorth * (swr / 100);
    const fireProgressPct = Math.min(100, Math.round((netWorth / fireNumber) * 100));

    return {
      netWorth,
      annualSpending,
      annualSavings,
      fireNumber,
      leanFire,
      fatFire,
      currentPassiveIncome,
      fireProgressPct,
      yearsToFire: fireReachedYear !== null ? fireReachedYear : '> 35',
      series,
      swr,
      expReturn,
      inflation
    };
  }

  // === 3. CALCOLATORE OPERATIVO DI RIBILANCIAMENTO ===
  calculateSmartRebalance(freshCapital = 500) {
    const profile = this.getRiskProfile();
    const templates = this.getRiskProfileTemplates();
    const activeKey = profile.profileKey || 'bilanciato';
    const activeTemplate = templates[activeKey] || templates.bilanciato;

    const sum = this.summary;
    let xeon = sum.xeonTotal;
    let vwce = sum.vwceTotal;
    let pensione = sum.pensionTotal;
    let liquid = sum.liquidTotal;

    if (xeon === 0 && vwce === 0) {
      xeon = 4500.00;
      vwce = 3700.00;
      pensione = 3200.00;
      liquid = 2450.00;
    }

    const currentTotal = xeon + vwce + pensione + liquid;
    const newTotal = currentTotal + freshCapital;

    const targetVwce = newTotal * (activeTemplate.allocations.azionario / 100);
    const targetXeon = newTotal * (activeTemplate.allocations.monetario / 100);
    const targetPensione = newTotal * (activeTemplate.allocations.pensione / 100);

    const gapVwce = Math.max(0, targetVwce - vwce);
    const gapXeon = Math.max(0, targetXeon - xeon);
    const gapPensione = Math.max(0, targetPensione - pensione);
    const totalGap = (gapVwce + gapXeon + gapPensione) || 1;

    let allocVwce = Math.round((gapVwce / totalGap) * freshCapital);
    let allocXeon = Math.round((gapXeon / totalGap) * freshCapital);
    let allocPensione = Math.max(0, freshCapital - allocVwce - allocXeon);

    const pacVwce = Math.round(freshCapital * 0.70);
    const pacXeon = freshCapital - pacVwce;

    return {
      freshCapital,
      profileTitle: activeTemplate.title,
      profileBadge: activeTemplate.badge,
      pacStrategy: {
        ratio: '70% Azionario (VWCE) / 30% Sicuro (XEON)',
        allocVwce: pacVwce,
        allocXeon: pacXeon
      },
      allocations: [
        { asset: 'VWCE (Azionario Globale - 70%)', ticker: 'VWCE', amount: pacVwce, color: '#0071E3' },
        { asset: 'XEON (Monetario/Sicuro - 30%)', ticker: 'XEON', amount: pacXeon, color: '#34C759' }
      ].filter(a => a.amount > 0),
      summaryInstruction: `Strategia PAC 70/30: Destina ${pacVwce} € su VWCE (Azionario Globale) e ${pacXeon} € su XEON (Gamba Sicura/Monetaria).`
    };
  }

  // === 4. CASH FLOW FORECAST & TIMELINE SCADENZE ===
  getCashFlowForecast(daysAhead = 45) {
    const sum = this.summary;
    let runningBalance = sum.liquidTotal || 4170;
    const timeline = [];

    const now = new Date();
    const items = this.recurringItems || [];

    for (let d = 1; d <= daysAhead; d++) {
      const futureDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + d);
      const dayOfMonth = futureDate.getDate();
      const dateStr = futureDate.toISOString().split('T')[0];

      // Accredito stipendio (il 27 del mese)
      if (dayOfMonth === 27) {
        const salary = 1850;
        runningBalance += salary;
        timeline.push({
          date: dateStr,
          day: dayOfMonth,
          title: 'Accredito Stipendio',
          type: 'income',
          amount: salary,
          balance: runningBalance,
          icon: '💰'
        });
      }

      // Spese ricorrenti
      items.forEach(it => {
        if (!it.completed && it.dayOfMonth === dayOfMonth) {
          runningBalance -= it.monthlyAmount;
          timeline.push({
            date: dateStr,
            day: dayOfMonth,
            title: it.name,
            type: 'expense',
            amount: it.monthlyAmount,
            balance: runningBalance,
            icon: '🔄'
          });
        }
      });
    }

    if (timeline.length === 0) {
      const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4);
      const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);
      const d3 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 27);
      const d4 = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 38);
      
      let b = runningBalance;
      b -= 180;
      timeline.push({ date: d1.toISOString().split('T')[0], day: d1.getDate(), title: 'Rata Auto / Assicurazione', type: 'expense', amount: 180, balance: b, icon: '🚗' });
      b -= 95;
      timeline.push({ date: d2.toISOString().split('T')[0], day: d2.getDate(), title: 'Utenze & Servizi Digitali', type: 'expense', amount: 95, balance: b, icon: '📱' });
      b += 1850;
      timeline.push({ date: d3.toISOString().split('T')[0], day: d3.getDate(), title: 'Accredito Stipendio', type: 'income', amount: 1850, balance: b, icon: '💰' });
      b -= 200;
      timeline.push({ date: d4.toISOString().split('T')[0], day: d4.getDate(), title: 'Versamento PAC VWCE', type: 'expense', amount: 200, balance: b, icon: '📈' });
    }

    timeline.sort((a, b) => new Date(a.date) - new Date(b.date));

    const minBalance = Math.min(...timeline.map(t => t.balance), runningBalance);
    const maxBalance = Math.max(...timeline.map(t => t.balance), runningBalance);

    return {
      initialBalance: sum.liquidTotal || 4170,
      daysAhead,
      minBalance,
      maxBalance,
      milestones: timeline.sort((a, b) => a.date.localeCompare(b.date))
    };
  }

  // === 5. EXPORT REPORT PATRIMONIALE & FISCALE ===
  getAnnualTaxReport(year = null) {
    const availableYears = this.getAvailableYears();
    const defaultYear = availableYears[0] || String(new Date().getFullYear());
    const yStr = year ? String(year) : defaultYear;
    const yNum = parseInt(yStr, 10) || new Date().getFullYear();

    const accounts = this.getAccounts();
    const sum = this.summary;
    const matrix = this.getYearlyNetworthMatrix(yStr);

    let pensionTotal = 0;
    let liquidTotal = 0;
    let monetarioTotal = 0;
    let azionarioTotal = 0;

    accounts.forEach(a => {
      const b = parseFloat(a.balance) || 0;
      const nameL = (a.name || '').toLowerCase();
      const typeL = (a.type || '').toLowerCase();
      if (a.isPension || nameL.includes('pensione') || typeL.includes('previden')) {
        pensionTotal += b;
      } else if (nameL.includes('xeon') || typeL.includes('monetar') || typeL.includes('sicurezza')) {
        monetarioTotal += b;
      } else if (nameL.includes('vwce') || typeL.includes('etf') || typeL.includes('azionar')) {
        azionarioTotal += b;
      } else if (a.isInvestment || a.isBroker) {
        azionarioTotal += b;
      } else {
        liquidTotal += b;
      }
    });

    const totalNW = sum.netWorth || (liquidTotal + monetarioTotal + azionarioTotal + pensionTotal);
    const safeTotalNW = totalNW > 0 ? totalNW : 1;

    // Calcolo chiusura annua dalla matrice
    const closedMonths = matrix.months.filter(m => m.hasData || m.isCurrent);
    const startVal = matrix.totals.netWorth[0] || totalNW;
    const endVal = closedMonths.length > 0 ? matrix.totals.netWorth[closedMonths[closedMonths.length - 1].monthNum - 1] : totalNW;
    const growthPct = startVal > 0 ? (((endVal - startVal) / startVal) * 100).toFixed(1) : '0.0';

    // Versamenti previdenza nell'anno considerato
    let pensionDeposited = 0;
    if (Array.isArray(this.transactions)) {
      this.transactions.forEach(t => {
        const ym = this.getTxMonthYear(t);
        if (ym && ym.endsWith(yStr)) {
          const cat = (t.category || '').toLowerCase();
          const desc = (t.description || '').toLowerCase();
          const acc = (t.account || '').toLowerCase();
          if (cat.includes('pensione') || (cat.includes('investimenti') && (desc.includes('pensione') || acc.includes('pensione')))) {
            if (t.type === 'expense' || t.type === 'investment') {
              pensionDeposited += parseFloat(t.amount) || 0;
            }
          }
        }
      });
    }
    if (pensionDeposited === 0) {
      pensionDeposited = 1200.00;
    }

    const maxDeductible = 5164.57;
    const actualDeduction = Math.min(pensionDeposited, maxDeductible);
    const estimatedTaxSavings = actualDeduction * 0.35; // Aliquota IRPEF media marginale 35%

    return {
      year: yNum,
      generatedDate: new Date().toLocaleDateString('it-IT'),
      closingNetWorth: endVal,
      growthPct: parseFloat(growthPct),
      estimatedAverageDailyBalance: Math.round(liquidTotal * 0.92 * 100) / 100,
      totalSavingsRate: sum.savingsRate || 25.0,
      assetAllocation: {
        liquid: liquidTotal,
        liquidPct: ((liquidTotal / safeTotalNW) * 100).toFixed(1),
        monetario: monetarioTotal,
        monetarioPct: ((monetarioTotal / safeTotalNW) * 100).toFixed(1),
        azionario: azionarioTotal,
        azionarioPct: ((azionarioTotal / safeTotalNW) * 100).toFixed(1),
        pensione: pensionTotal,
        pensionePct: ((pensionTotal / safeTotalNW) * 100).toFixed(1)
      },
      pensionDeduction: {
        totalDeposited: pensionDeposited,
        maxDeductible,
        actualDeduction,
        estimatedTaxSavings
      },
      // Retro-compatibilità
      totalNetWorth: endVal,
      liquidTotal,
      investedDirect: monetarioTotal + azionarioTotal,
      pensionTotal,
      annualPensionDeposit: pensionDeposited,
      actualDeductible: actualDeduction,
      estimatedTaxSaving: estimatedTaxSavings,
      avgDailyBalance: Math.round(liquidTotal * 0.92 * 100) / 100,
      accounts: accounts.map(a => ({ name: a.name, type: a.type, balance: a.balance }))
    };
  }

  exportTransactionsCSV() {
    const headers = ['Data', 'Descrizione', 'Importo', 'Tipo', 'Categoria', 'Conto', 'Note'];
    const rows = this.transactions.map(t => [
      t.date || '',
      `"${(t.description || '').replace(/"/g, '""')}"`,
      (parseFloat(t.amount) || 0).toFixed(2).replace('.', ','),
      t.type || '',
      `"${(t.category || '').replace(/"/g, '""')}"`,
      `"${(t.account || '').replace(/"/g, '""')}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    return '\uFEFF' + csvContent;
  }

  exportBackupJSON() {
    const backup = {
      version: '2026.5-beta',
      exportDate: new Date().toISOString(),
      summary: this.summary,
      accounts: this.getAccounts(),
      categories: this.getCategories(),
      goals: this.getGoals(),
      recurring: this.recurringItems,
      transactions: this.transactions
    };
    return JSON.stringify(backup, null, 2);
  }
}

export const financeStore = new FinanceStore();
if (typeof window !== 'undefined') {
  window.financeStore = financeStore;
}
export const mockFinancialData = financeStore; // Compatibilità con componenti esistenti
export const CATEGORIES = financeStore.getCategories();
export const ACCOUNTS = financeStore.getAccounts().map(a => a.name);
