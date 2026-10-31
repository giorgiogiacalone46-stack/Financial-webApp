/**
 * Data Store Principale - Supporta:
 * - Categorie dinamiche (CRUD con salvataggio localStorage)
 * - Conti dinamici e Saldi iniziali (CRUD con salvataggio localStorage)
 * - Transazioni reali da Google Sheets o cache locale
 * - Saldi reali (Patrimonio, Investimenti, Net Worth)
 * - Storico Net Worth (2024-2026)
 * - Rate e Spese Ricorrenti
 */

import { INITIAL_CATEGORIES, INITIAL_ACCOUNTS, INITIAL_SALDI, INITIAL_HISTORICAL_NW, INITIAL_TRANSACTIONS, INITIAL_GOALS, DEFAULT_SMART_RULES } from './realData.js';

const STORAGE_KEYS = {
  CATEGORIES: 'finanze_custom_categories',
  ACCOUNTS: 'finanze_custom_accounts',
  TRANSACTIONS: 'finanze_cached_txs',
  SECURITY_PIN: 'finanze_security_pin',
  PIN_ENABLED: 'finanze_pin_enabled',
  GOALS: 'finanze_saving_goals',
  RISK_PROFILE: 'finanze_risk_profile',
  PRIVACY_MODE: 'finanze_privacy_mode',
  SMART_RULES: 'finanze_smart_rules',
  NW_SNAPSHOTS: 'finanze_nw_snapshots'
};

class FinanceStore {
  constructor() {
    this.categories = this.loadCategories();
    this.accounts = this.loadAccounts();
    this.transactions = this.loadTransactions();
    this.saldi = INITIAL_SALDI;
    this.historicalNW = INITIAL_HISTORICAL_NW;
    this.goals = this.loadGoals();
    this.riskProfile = this.loadRiskProfile();
    this.smartRules = this.loadSmartRules();
    this.nwSnapshots = this.loadNetWorthSnapshots();
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

    // Assicura la presenza dei metadati di riconciliazione e freschezza
    accs.forEach(a => {
      const isPension = a.isPension || (a.type || '').toLowerCase().includes('pension') || (a.name || '').toLowerCase().includes('pension');
      if (!a.lastReconciledMonth) {
        a.lastReconciledMonth = isPension ? '09/2026' : '10/2026';
      }
      if (!a.lastReconciledDate) {
        a.lastReconciledDate = isPension ? '30/09/2026' : '28/10/2026';
      }
      if (!a.defaultMode) {
        a.defaultMode = isPension ? 'delta' : 'balance';
      }
    });

    return accs;
  }

  saveAccounts() {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(this.accounts));
  }

  getAccounts() {
    return [...this.accounts];
  }

  addAccount(account) {
    const id = 'acc_' + Date.now();
    const typeStr = (account.type || '').toLowerCase();
    const isPension = typeStr.includes('pension') || typeStr.includes('previden');
    const isInvestment = typeStr.includes('invest') || typeStr.includes('sicurezza') || typeStr.includes('etf') || typeStr.includes('monetari') || typeStr.includes('xeon') || typeStr.includes('vwce');
    const isLiquid = !isPension && !isInvestment;

    const newAcc = {
      id,
      name: account.name.trim(),
      type: account.type || 'Liquidità corrente',
      balance: parseFloat(account.balance) || 0,
      isLiquid,
      isInvestment,
      isPension
    };
    this.accounts.push(newAcc);
    this.saveAccounts();
    return newAcc;
  }

  updateAccountBalance(idOrName, newBalance) {
    const acc = this.accounts.find(a => a.id === idOrName || a.name.toLowerCase() === idOrName.toLowerCase());
    if (acc) {
      acc.balance = parseFloat(newBalance) || 0;
      this.saveAccounts();
      return true;
    }
    return false;
  }

  deleteAccount(id) {
    this.accounts = this.accounts.filter(a => a.id !== id);
    this.saveAccounts();
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

  setTransactions(newList) {
    if (!Array.isArray(newList)) return;
    this.transactions = newList.map(t => {
      let amount = typeof t.amount === 'number' ? t.amount : parseFloat(String(t.amount).replace(/€/g, '').replace(/\./g, '').replace(',', '.')) || 0;
      return {
        ...t,
        amount: Math.abs(amount)
      };
    });
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

    // Aggiorna saldi conti in tempo reale
    const accObj = this.accounts.find(a => a.name.toLowerCase() === account.toLowerCase());
    if (accObj) {
      if (type === 'expense') accObj.balance = Math.round((accObj.balance - amount) * 100) / 100;
      else if (type === 'income') accObj.balance = Math.round((accObj.balance + amount) * 100) / 100;
      else if (type === 'transfer') accObj.balance = Math.round((accObj.balance - amount) * 100) / 100;
    }
    if (type === 'transfer' && toAccount) {
      const toAccObj = this.accounts.find(a => a.name.toLowerCase() === toAccount.toLowerCase());
      if (toAccObj) {
        toAccObj.balance = Math.round((toAccObj.balance + amount) * 100) / 100;
      }
    }
    this.saveAccounts();

    this.transactions.unshift(tx);
    this.saveTransactions();
    return tx;
  }

  deleteTransaction(id) {
    const target = this.transactions.find(t => t.id === id);
    if (!target) return false;

    // Ripristina saldo del conto associato per mantenere coerenza
    const amt = parseFloat(target.amount) || 0;
    const type = target.type;
    const account = target.account || target.fromAccount;
    const toAccount = target.toAccount;

    if (account) {
      const accObj = this.accounts.find(a => a.name.toLowerCase() === account.toLowerCase());
      if (accObj) {
        if (type === 'expense') accObj.balance = Math.round((accObj.balance + amt) * 100) / 100;
        else if (type === 'income') accObj.balance = Math.round((accObj.balance - amt) * 100) / 100;
        else if (type === 'transfer') accObj.balance = Math.round((accObj.balance + amt) * 100) / 100;
      }
    }
    if (type === 'transfer' && toAccount) {
      const toAccObj = this.accounts.find(a => a.name.toLowerCase() === toAccount.toLowerCase());
      if (toAccObj) {
        toAccObj.balance = Math.round((toAccObj.balance - amt) * 100) / 100;
      }
    }
    this.saveAccounts();

    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveTransactions();
    return true;
  }

  // === METRICHE DI SINTESI (DASHBOARD & NET WORTH) ===
  get summary() {
    // Calcola il Net Worth sommando tutti i conti
    let liquidTotal = 0;
    let investedTotal = 0;
    let pensionTotal = 0;

    this.accounts.forEach(acc => {
      const b = parseFloat(acc.balance) || 0;
      const nameLower = (acc.name || '').toLowerCase();
      const typeLower = (acc.type || '').toLowerCase();
      if (acc.isPension || nameLower.includes('pensione') || typeLower.includes('previden')) {
        pensionTotal += b;
      } else if (acc.isInvestment || nameLower.includes('xeon') || nameLower.includes('vwce') || typeLower.includes('etf') || typeLower.includes('monetari') || typeLower.includes('invest') || typeLower.includes('sicurezza')) {
        investedTotal += b;
      } else {
        liquidTotal += b;
      }
    });

    const netWorth = liquidTotal + investedTotal + pensionTotal;

    // Calcolo mese corrente (ottobre 2026 come mese attivo di riferimento da gestionale)
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;

    let monthlyIncome = 0;
    let monthlyExpense = 0;

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

      const isTargetMonth = (txYear === curYear && (txMonth === curMonth || txMonth === 10));
      if (isTargetMonth) {
        if (t.type === 'income') monthlyIncome += t.amount;
        else if (t.type === 'expense') monthlyExpense += t.amount;
      }
    });

    // Se nel mese corrente non ci sono ancora entrate caricate, usa media stipendio 1.700€ da gestionale
    if (monthlyIncome === 0) monthlyIncome = 1700.00;
    if (monthlyExpense === 0) monthlyExpense = 808.34;

    const savingsAmount = Math.max(0, monthlyIncome - monthlyExpense);
    const savingsRate = monthlyIncome > 0 ? ((savingsAmount / monthlyIncome) * 100).toFixed(1) : '25.0';

    return {
      totalBalance: netWorth,
      netWorth: netWorth,
      liquidTotal: liquidTotal,
      investedTotal: investedTotal,
      pensionTotal: pensionTotal,
      monthlyIncome: monthlyIncome,
      monthlyExpense: monthlyExpense,
      savingsRate: parseFloat(savingsRate),
      savingsAmount: savingsAmount,
      budgetExpenseTarget: 75,
      budgetSavingsTarget: 25,
      incomeGoal: 1700.00
    };
  }

  // === SNAPSHOT & MOTORE DINAMICO NET WORTH STORICO ===
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

    baseHistorical.forEach(item => {
      nwMap.set(item.month, item.value);
      isSnapshotMap.set(item.month, true);
    });

    Object.entries(savedSnapshots).forEach(([monthYear, val]) => {
      if (typeof val === 'number' && val > 0) {
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

    const startYear = 2024;
    const startMonth = 1;
    const endYear = curYear;
    const endMonth = curMonth;

    const fullTimeline = [];
    let prevVal = baseHistorical.length > 0 ? baseHistorical[0].value : 0;

    let y = startYear;
    let m = startMonth;

    while (y < endYear || (y === endYear && m <= endMonth)) {
      const monthKey = `${String(m).padStart(2, '0')}/${y}`;
      const isCurrent = (monthKey === currentMonthKey);

      let val;

      if (isCurrent) {
        // Il mese corrente riflette in tempo reale la somma reale di tutti i conti!
        val = Math.round(this.summary.netWorth * 100) / 100;
      } else if (nwMap.has(monthKey)) {
        val = nwMap.get(monthKey);
      } else {
        const flow = monthlyNetFlows.get(monthKey) || 0;
        val = Math.round((prevVal + flow) * 100) / 100;
        if (val <= 0) val = prevVal;
      }

      prevVal = val;

      fullTimeline.push({
        month: monthKey,
        value: val,
        isCurrent,
        isSnapshot: isSnapshotMap.has(monthKey) || isCurrent,
        netFlow: monthlyNetFlows.get(monthKey) || 0
      });

      m++;
      if (m > 12) {
        m = 1;
        y++;
      }
    }

    return fullTimeline;
  }

  // === SPESE RICORRENTI & RATE ATTIVE ===
  get recurringItems() {
    return [
      {
        id: 'rec_1',
        name: 'Regalo Serena (Rata)',
        monthlyAmount: 44.67,
        totalRate: 3,
        currentRata: 2,
        nextDate: '26/11/2026',
        category: '❔Altro',
        completed: false
      },
      {
        id: 'rec_2',
        name: 'Scopa Elettrica (Rata)',
        monthlyAmount: 33.67,
        totalRate: 3,
        currentRata: 2,
        nextDate: '25/11/2026',
        category: '❔Altro',
        completed: false
      },
      {
        id: 'rec_3',
        name: 'Affitto / Casa',
        monthlyAmount: 600.00,
        totalRate: 0,
        currentRata: 0,
        nextDate: 'Ogni inizio mese',
        category: '🏡 Casa',
        completed: false,
        isFixed: true
      },
      {
        id: 'rec_4',
        name: 'PAC VWCE Azionario Globale',
        monthlyAmount: 200.00,
        totalRate: 0,
        currentRata: 0,
        nextDate: '02/11/2026',
        category: '🛅 Livello Crescita',
        completed: false,
        isPAC: true
      }
    ];
  }

  getRecurringExpenses() {
    return this.recurringItems || [];
  }

  // === CONGUAGLI & RICONCILIAZIONE SALDI (FINE MESE) ===
  getMonthlyReconciliationStatus(targetMonthKey = null) {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
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

    const staleAccounts = [];
    const updatedAccounts = [];

    this.accounts.forEach(acc => {
      const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension') || (acc.name || '').toLowerCase().includes('pension');
      const recMonth = acc.lastReconciledMonth || (isPension ? '09/2026' : '10/2026');
      
      const isStale = (recMonth !== targetKey);
      let lastMonthName = 'Precedente';
      if (recMonth && recMonth.includes('/')) {
        const [lm, ly] = recMonth.split('/').map(n => parseInt(n, 10));
        lastMonthName = `${monthNames[(lm || 1) - 1]} ${ly}`;
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

    return {
      targetMonth: targetKey,
      targetMonthName,
      isFullyReconciled: staleAccounts.length === 0,
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
      this.saveTransactions();
      createdTx = tx;
    }

    target.balance = targetBalance;
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
      target.lastReconciledMonth = targetKey;
      target.lastReconciledDate = todayFormatted;
      target.defaultMode = u.mode;
      modifiedAccounts.push({ name: target.name, oldBal, newBal, delta });

      if (u.createTx && Math.abs(delta) > 0.001) {
        const isPension = target.isPension || (target.type || '').toLowerCase().includes('pension');
        const isPositive = delta > 0;
        const tx = {
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
      this.saveTransactions();
    }

    // Salva lo snapshot del Net Worth
    const newTotalNW = this.summary.netWorth;
    this.saveNetWorthSnapshot(targetKey, newTotalNW);

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
    const xeon = xeonAcc ? xeonAcc.balance : 5383.32;
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
    const sum = this.summary;
    const monthlyIncome = sum.monthlyIncome || 1850;
    
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

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;

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

      const isCurrentMonth = (txYear === curYear && (txMonth === curMonth || txMonth === 10));
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

    const accounts = this.getAccounts();
    let xeon = 0, vwce = 0, pensione = 0, liquid = 0;
    accounts.forEach(acc => {
      const n = acc.name.toLowerCase();
      const b = parseFloat(acc.balance) || 0;
      if (n.includes('xeon')) xeon += b;
      else if (n.includes('vwce') || n.includes('etf')) vwce += b;
      else if (acc.isPension || n.includes('pensione')) pensione += b;
      else liquid += b;
    });

    if (xeon === 0 && vwce === 0) {
      xeon = 5383.32;
      vwce = 3410.25;
      pensione = 4391.24;
      liquid = 4170.00;
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

    return {
      freshCapital,
      profileTitle: activeTemplate.title,
      profileBadge: activeTemplate.badge,
      allocations: [
        { asset: 'VWCE (Azionario Globale)', ticker: 'VWCE', amount: allocVwce, color: '#0071E3' },
        { asset: 'XEON (Monetario Overnight)', ticker: 'XEON', amount: allocXeon, color: '#34C759' },
        { asset: 'Previdenza Integrativa', ticker: 'FONDO', amount: allocPensione, color: '#AF52DE' }
      ].filter(a => a.amount > 0),
      summaryInstruction: allocVwce > 0 
        ? `Destina ${allocVwce} € su VWCE e ${allocXeon} € su XEON per allineare il portafoglio al profilo ${activeTemplate.title}.`
        : `Destina ${freshCapital} € su XEON per consolidare la riserva di liquidità sicura.`
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
  getAnnualTaxReport(year = 2026) {
    const accounts = this.getAccounts();
    const sum = this.summary;

    let pensionTotal = 0;
    accounts.forEach(a => {
      if (a.isPension || a.name.toLowerCase().includes('pensione')) {
        pensionTotal += parseFloat(a.balance) || 0;
      }
    });
    if (pensionTotal === 0) pensionTotal = 4391.24;

    const annualPensionDeposit = 1200;
    const maxDeductible = 5164.57;
    const actualDeductible = Math.min(annualPensionDeposit, maxDeductible);
    const estimatedTaxSaving = actualDeductible * 0.35; // stima scaglione IRPEF 35%
    const avgDailyBalance = (sum.liquidTotal || 4170) * 0.94;

    return {
      year,
      dateGenerated: new Date().toLocaleDateString('it-IT'),
      totalNetWorth: sum.netWorth || 17354.81,
      liquidTotal: sum.liquidTotal || 4170,
      investedDirect: (sum.netWorth || 17354.81) - (sum.liquidTotal || 4170) - pensionTotal,
      pensionTotal,
      annualPensionDeposit,
      maxDeductible,
      actualDeductible,
      estimatedTaxSaving,
      avgDailyBalance,
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
export const mockFinancialData = financeStore; // Compatibilità con componenti esistenti
export const CATEGORIES = financeStore.getCategories();
export const ACCOUNTS = financeStore.getAccounts().map(a => a.name);
