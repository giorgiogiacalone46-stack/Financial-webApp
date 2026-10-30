/**
 * Data Store Principale - Supporta:
 * - Categorie dinamiche (CRUD con salvataggio localStorage)
 * - Conti dinamici e Saldi iniziali (CRUD con salvataggio localStorage)
 * - Transazioni reali da Google Sheets o cache locale
 * - Saldi reali (Patrimonio, Investimenti, Net Worth)
 * - Storico Net Worth (2024-2026)
 * - Rate e Spese Ricorrenti
 */

import { INITIAL_CATEGORIES, INITIAL_ACCOUNTS, INITIAL_SALDI, INITIAL_HISTORICAL_NW, INITIAL_TRANSACTIONS } from './realData.js';

const STORAGE_KEYS = {
  CATEGORIES: 'finanze_custom_categories',
  ACCOUNTS: 'finanze_custom_accounts',
  TRANSACTIONS: 'finanze_cached_txs',
  SECURITY_PIN: 'finanze_security_pin',
  PIN_ENABLED: 'finanze_pin_enabled'
};

class FinanceStore {
  constructor() {
    this.categories = this.loadCategories();
    this.accounts = this.loadAccounts();
    this.transactions = this.loadTransactions();
    this.saldi = INITIAL_SALDI;
    this.historicalNW = INITIAL_HISTORICAL_NW;
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
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [...INITIAL_ACCOUNTS];
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
}

export const financeStore = new FinanceStore();
export const mockFinancialData = financeStore; // Compatibilità con componenti esistenti
export const CATEGORIES = financeStore.getCategories();
export const ACCOUNTS = financeStore.getAccounts().map(a => a.name);
