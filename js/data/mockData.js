/**
 * Mock Data Store - Formato schema "Finanze-Movimenti" (Google Sheets DB)
 * Gestisce l'elenco delle transazioni, il calcolo dei totali e le operazioni CRUD.
 */

export const CATEGORIES = [
  { id: 'lavoro', name: 'Entrate / Lavoro', type: 'income', color: '#34C759' },
  { id: 'extra', name: 'Entrate / Extra', type: 'income', color: '#30D158' },
  { id: 'casa', name: 'Casa & Utenze', type: 'expense', color: '#0071E3' },
  { id: 'alimentari', name: 'Alimentari & Spesa', type: 'expense', color: '#34C759' },
  { id: 'trasporti', name: 'Trasporti & Auto', type: 'expense', color: '#FF9500' },
  { id: 'svago', name: 'Svago & Ristoranti', type: 'expense', color: '#AF52DE' },
  { id: 'salute', name: 'Salute & Cura', type: 'expense', color: '#5856D6' },
  { id: 'abbonamenti', name: 'Abbonamenti & Servizi', type: 'expense', color: '#FF2D55' },
  { id: 'altro', name: 'Altro', type: 'expense', color: '#8E8E93' }
];

export const ACCOUNTS = [
  'Conto Principale (IBAN)',
  'Carta di Debito',
  'Carta di Credito',
  'PayPal',
  'Contanti'
];

let transactionsList = [
  {
    id: 'tx_01',
    date: '2026-10-28',
    dateFormatted: '28 Ottobre 2026',
    description: 'Stipendio Netto',
    category: 'Entrate / Lavoro',
    type: 'income',
    amount: 3200.00,
    account: 'Conto Principale (IBAN)'
  },
  {
    id: 'tx_02',
    date: '2026-10-27',
    dateFormatted: '27 Ottobre 2026',
    description: 'Supermercato Esselunga',
    category: 'Alimentari & Spesa',
    type: 'expense',
    amount: 114.50,
    account: 'Carta di Debito'
  },
  {
    id: 'tx_03',
    date: '2026-10-25',
    dateFormatted: '25 Ottobre 2026',
    description: 'Bolletta Luce & Gas Enel',
    category: 'Casa & Utenze',
    type: 'expense',
    amount: 145.20,
    account: 'Conto Principale (IBAN)'
  },
  {
    id: 'tx_04',
    date: '2026-10-22',
    dateFormatted: '22 Ottobre 2026',
    description: 'Consulenza UI/UX Mobile',
    category: 'Entrate / Extra',
    type: 'income',
    amount: 650.00,
    account: 'PayPal'
  },
  {
    id: 'tx_05',
    date: '2026-10-20',
    dateFormatted: '20 Ottobre 2026',
    description: 'Cena Osteria del Corso',
    category: 'Svago & Ristoranti',
    type: 'expense',
    amount: 78.00,
    account: 'Carta di Credito'
  },
  {
    id: 'tx_06',
    date: '2026-10-18',
    dateFormatted: '18 Ottobre 2026',
    description: 'Rifornimento Benzina Q8',
    category: 'Trasporti & Auto',
    type: 'expense',
    amount: 85.00,
    account: 'Carta di Debito'
  },
  {
    id: 'tx_07',
    date: '2026-10-15',
    dateFormatted: '15 Ottobre 2026',
    description: 'Abbonamento iCloud+ & Apple Music',
    category: 'Abbonamenti & Servizi',
    type: 'expense',
    amount: 14.99,
    account: 'Carta di Credito'
  },
  {
    id: 'tx_08',
    date: '2026-10-12',
    dateFormatted: '12 Ottobre 2026',
    description: 'Visita Dentistica & Igiene',
    category: 'Salute & Cura',
    type: 'expense',
    amount: 120.00,
    account: 'Carta di Debito'
  },
  {
    id: 'tx_09',
    date: '2026-10-08',
    dateFormatted: '08 Ottobre 2026',
    description: 'Affitto Mensile Appartamento',
    category: 'Casa & Utenze',
    type: 'expense',
    amount: 750.00,
    account: 'Conto Principale (IBAN)'
  },
  {
    id: 'tx_10',
    date: '2026-10-05',
    dateFormatted: '05 Ottobre 2026',
    description: 'Spesa Alimentari Bio',
    category: 'Alimentari & Spesa',
    type: 'expense',
    amount: 64.30,
    account: 'Carta di Debito'
  }
];

export const mockFinancialData = {
  get summary() {
    let income = 0;
    let expense = 0;
    transactionsList.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });

    const savingsAmount = income - expense;
    const savingsRate = income > 0 ? ((savingsAmount / income) * 100).toFixed(1) : 0;
    const baseBalance = 23214.00; // saldo di partenza precedente

    return {
      totalBalance: baseBalance + savingsAmount,
      balanceTrend: '+4.2% vs mese scorso',
      balanceTrendPositive: true,
      
      monthlyIncome: income,
      incomeTrend: '+8.5% vs media',
      incomeTrendPositive: true,
      
      monthlyExpense: expense,
      expenseTrend: '-3.1% vs mese scorso',
      expenseTrendPositive: true,
      
      savingsRate: parseFloat(savingsRate),
      savingsAmount: savingsAmount,
      savingsTarget: 40.0,
      savingsTrendContext: `Target 40% ${savingsRate >= 40 ? 'superato' : 'in corso'}`
    };
  },

  cashFlowHistory: {
    labels: ['Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott'],
    income: [3400, 3600, 3500, 3900, 3700, 3850],
    expenses: [2150, 2400, 2600, 2800, 2100, 2214]
  },

  categoryBreakdown: [
    { name: 'Casa & Utenze', amount: 895.20, percentage: 40.4, color: '#0071E3' },
    { name: 'Alimentari & Spesa', amount: 480.00, percentage: 21.7, color: '#34C759' },
    { name: 'Trasporti & Auto', amount: 320.00, percentage: 14.5, color: '#FF9500' },
    { name: 'Svago & Ristoranti', amount: 290.00, percentage: 13.1, color: '#AF52DE' },
    { name: 'Salute & Cura', amount: 120.00, percentage: 5.4, color: '#5856D6' },
    { name: 'Altro', amount: 108.80, percentage: 4.9, color: '#8E8E93' }
  ],

  get recentTransactions() {
    return transactionsList.slice(0, 5);
  },

  getAllTransactions() {
    return [...transactionsList];
  },

  setTransactions(newList) {
    if (!Array.isArray(newList)) return;
    transactionsList = newList.map(t => {
      let dateFormatted = t.dateFormatted;
      if (!dateFormatted && t.date) {
        try {
          const d = new Date(t.date);
          dateFormatted = d.toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' });
        } catch (e) {
          dateFormatted = t.date;
        }
      }
      return {
        ...t,
        dateFormatted: dateFormatted || t.date,
        amount: parseFloat(t.amount) || 0
      };
    });
  },

  addTransaction(newTx) {
    const id = 'tx_' + Date.now();
    const dateObj = new Date(newTx.date);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const dateFormatted = dateObj.toLocaleDateString('it-IT', options);

    const transaction = {
      id,
      date: newTx.date,
      dateFormatted,
      description: newTx.description.trim(),
      category: newTx.category,
      type: newTx.type,
      amount: parseFloat(newTx.amount),
      account: newTx.account
    };

    transactionsList.unshift(transaction);
    return transaction;
  },

  deleteTransaction(id) {
    const initialLen = transactionsList.length;
    transactionsList = transactionsList.filter(t => t.id !== id);
    return transactionsList.length < initialLen;
  }
};
