/**
 * Demo Data Store - Finanze Personali (Database Dimostrativo Fittizio e Anonimo)
 * Dati realistici generici per dimostrazione, test e distribuzione pubblica.
 * Nessun riferimento a dati sensibili, conti bancari personali o transazioni private.
 */

export const INITIAL_CATEGORIES = [
  { "id": "stipendio", "name": "Stipendio", "type": "income", "color": "#34C759" },
  { "id": "buoni_pasto", "name": "Buoni Pasto", "type": "income", "color": "#30D158" },
  { "id": "rimborsi_extra", "name": "Rimborsi & Extra", "type": "income", "color": "#32ADE6" },
  { "id": "altre_entrate", "name": "Altre entrate", "type": "income", "color": "#30D158" },
  { "id": "casa", "name": "Casa", "type": "expense", "color": "#5856D6" },
  { "id": "alimentari", "name": "Alimentari", "type": "expense", "color": "#0071E3" },
  { "id": "ristorazione_uscite", "name": "Ristorazione & Uscite", "type": "expense", "color": "#FF9500" },
  { "id": "auto", "name": "Auto & Mobilità", "type": "expense", "color": "#FF3B30" },
  { "id": "trasporti", "name": "Trasporti", "type": "expense", "color": "#FF2D55" },
  { "id": "svago_viaggi", "name": "Svago & Viaggi", "type": "expense", "color": "#AF52DE" },
  { "id": "shopping_tecnologia", "name": "Shopping & Tecnologia", "type": "expense", "color": "#5AC8FA" },
  { "id": "cura_personale", "name": "Cura personale", "type": "expense", "color": "#FF9500" },
  { "id": "fitness", "name": "Fitness & Sport", "type": "expense", "color": "#34C759" },
  { "id": "salute", "name": "Salute & Benessere", "type": "expense", "color": "#FF453A" },
  { "id": "istruzione", "name": "Istruzione & Corsi", "type": "expense", "color": "#0071E3" },
  { "id": "regali", "name": "Regali", "type": "expense", "color": "#FF2D55" },
  { "id": "fondo_emergenza", "name": "Fondo Emergenza", "type": "transfer", "color": "#34C759" },
  { "id": "pac_azionario", "name": "PAC Azionario", "type": "transfer", "color": "#5856D6" },
  { "id": "conguaglio", "name": "Conguaglio / Rettifica", "type": "expense", "color": "#8E8E93" },
  { "id": "altro", "name": "Altro", "type": "expense", "color": "#8E8E93" }
];

export const INITIAL_GOALS = [
  {
    id: 'goal_1',
    name: 'Fondo Emergenza 6 Mesi',
    emoji: '🛡️',
    targetAmount: 6000,
    currentAmount: 4500,
    deadline: '2027-06-30',
    account: 'Portafoglio Investimenti',
    notes: 'Riserva protetta su ETF Monetario'
  },
  {
    id: 'goal_2',
    name: 'Vacanza Estiva',
    emoji: '✈️',
    targetAmount: 1500,
    currentAmount: 750,
    deadline: '2027-08-01',
    account: 'Conto Corrente',
    notes: 'Budget vacanze programmate'
  },
  {
    id: 'goal_3',
    name: 'Fondo Tecnologia & Upgrade',
    emoji: '💻',
    targetAmount: 2000,
    currentAmount: 650,
    deadline: '2027-12-31',
    account: 'Conto Corrente',
    notes: 'Nuova postazione lavoro'
  }
];

export const DEFAULT_SMART_RULES = [
  { keyword: 'esselunga', category: '🛒 Alimentari' },
  { keyword: 'conad', category: '🛒 Alimentari' },
  { keyword: 'coop', category: '🛒 Alimentari' },
  { keyword: 'lidl', category: '🛒 Alimentari' },
  { keyword: 'carrefour', category: '🛒 Alimentari' },
  { keyword: 'spesa', category: '🛒 Alimentari' },
  { keyword: 'supermercato', category: '🛒 Alimentari' },
  { keyword: 'telepass', category: '🚗 Auto & Mobilità' },
  { keyword: 'autostrada', category: '🚗 Auto & Mobilità' },
  { keyword: 'eni', category: '🚗 Auto & Mobilità' },
  { keyword: 'q8', category: '🚗 Auto & Mobilità' },
  { keyword: 'benzina', category: '🚗 Auto & Mobilità' },
  { keyword: 'ristorante', category: '🍕 Ristorazione & Uscite' },
  { keyword: 'pizzeria', category: '🍕 Ristorazione & Uscite' },
  { keyword: 'trattoria', category: '🍕 Ristorazione & Uscite' },
  { keyword: 'pub', category: '🍕 Ristorazione & Uscite' },
  { keyword: 'bar', category: '🍕 Ristorazione & Uscite' },
  { keyword: 'caffe', category: '🍕 Ristorazione & Uscite' },
  { keyword: 'amazon', category: '🛍️ Shopping & Tecnologia' },
  { keyword: 'zara', category: '🛍️ Shopping & Tecnologia' },
  { keyword: 'zalando', category: '🛍️ Shopping & Tecnologia' },
  { keyword: 'farmacia', category: '🚑 Salute & Benessere' },
  { keyword: 'medico', category: '🚑 Salute & Benessere' },
  { keyword: 'palestra', category: '💪🏻 Fitness & Sport' },
  { keyword: 'apple', category: '🛍️ Shopping & Tecnologia' },
  { keyword: 'netflix', category: '🛍️ Shopping & Tecnologia' },
  { keyword: 'spotify', category: '🛍️ Shopping & Tecnologia' },
  { keyword: 'affitto', category: '🏡 Casa' },
  { keyword: 'enel', category: '🏡 Casa' },
  { keyword: 'luce', category: '🏡 Casa' },
  { keyword: 'gas', category: '🏡 Casa' },
  { keyword: 'condominio', category: '🏡 Casa' },
  { keyword: 'stipendio', category: '💰 Stipendio' },
  { keyword: 'busta paga', category: '💰 Stipendio' }
];

export const INITIAL_PROVIDERS = [
  'Conto Principale',
  'Carta Prepagata',
  'Broker Investimenti',
  'Fondo Pensione',
  'Intesa Sanpaolo',
  'Revolut',
  'BBVA',
  'Fineco',
  'Poste Italiane',
  'Trade Republic',
  'Directa',
  'Degiro',
  'Contanti'
];

export const INITIAL_ACCOUNTS = [
  {
    id: 'conto_corrente',
    name: 'Conto Corrente',
    provider: 'Banca Principale',
    type: 'Liquidità corrente',
    balance: 2450.00,
    reconciledBalance: 2450.00,
    isLiquid: true,
    lastReconciledMonth: '10/2026',
    lastReconciledDate: '31/10/2026',
    defaultMode: 'balance'
  },
  {
    id: 'carta_spese',
    name: 'Carta Spese',
    provider: 'Carta Prepagata',
    type: 'Liquidità corrente',
    balance: 180.00,
    reconciledBalance: 180.00,
    isLiquid: true,
    lastReconciledMonth: '10/2026',
    lastReconciledDate: '31/10/2026',
    defaultMode: 'balance'
  },
  {
    id: 'broker_investimenti',
    name: 'Portafoglio Investimenti',
    provider: 'Broker ETF',
    type: 'Broker / Investimenti',
    balance: 8200.00,
    reconciledBalance: 8200.00,
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
        shares: 31.23,
        price: 144.08,
        currentValue: 4500.00,
        color: '#34C759',
        emergencyMonthsQuota: 4500.00,
        safeInvestmentQuota: 0.00,
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
        shares: 29.69,
        price: 124.62,
        currentValue: 3700.00,
        color: '#0071E3',
        isPac: true,
        pacAmount: 200
      }
    ],
    lastReconciledMonth: '10/2026',
    lastReconciledDate: '31/10/2026',
    defaultMode: 'balance'
  },
  {
    id: 'pensione',
    name: 'Fondo Previdenza',
    provider: 'Fondo Pensione',
    type: 'Previdenza complementare',
    balance: 3200.00,
    reconciledBalance: 3200.00,
    isPension: true,
    lastReconciledMonth: '10/2026',
    lastReconciledDate: '31/10/2026',
    defaultMode: 'delta'
  },
  {
    id: 'contanti',
    name: 'Contanti',
    provider: 'Contanti',
    type: 'Liquidità contante',
    balance: 40.00,
    reconciledBalance: 40.00,
    isLiquid: true,
    lastReconciledMonth: '10/2026',
    lastReconciledDate: '31/10/2026',
    defaultMode: 'balance'
  }
];

export const INITIAL_SALDI = [
  {
    "date": "31/10/2026",
    "name": "Conto Corrente",
    "type": "Liquidità corrente",
    "balance": 2450.00,
    "notes": "Saldo contabile verificato a fine mese"
  },
  {
    "date": "31/10/2026",
    "name": "Carta Spese",
    "type": "Liquidità corrente",
    "balance": 180.00,
    "notes": "Saldo disponibile verificato"
  },
  {
    "date": "31/10/2026",
    "name": "Portafoglio Investimenti",
    "type": "Broker / Investimenti",
    "balance": 8200.00,
    "notes": "Consolidato ETF Monetario (4.500 €) + Azionario Globale (3.700 €)"
  },
  {
    "date": "31/10/2026",
    "name": "Fondo Previdenza",
    "type": "Previdenza complementare",
    "balance": 3200.00,
    "notes": "Posizione maturata aggiornata"
  },
  {
    "date": "31/10/2026",
    "name": "Contanti",
    "type": "Liquidità contante",
    "balance": 40.00,
    "notes": "Disponibilità portafoglio fisico"
  },
  {
    "date": "31/10/2026",
    "name": "TOTALE NET WORTH",
    "type": "Patrimonio Complessivo",
    "balance": 14070.00,
    "notes": "Patrimonio netto consolidato"
  },
  {
    "date": "31/10/2026",
    "name": "TOTALE LIQUIDO & INVESTITO",
    "type": "Disponibilità Diretta",
    "balance": 10870.00,
    "notes": "Esclusa la previdenza complementare vincolata"
  }
];

export const INITIAL_HISTORICAL_NW = [
  { "month": "01/2025", "value": 8450.00 },
  { "month": "02/2025", "value": 8780.00 },
  { "month": "03/2025", "value": 9120.00 },
  { "month": "04/2025", "value": 9480.00 },
  { "month": "05/2025", "value": 9850.00 },
  { "month": "06/2025", "value": 10420.00 },
  { "month": "07/2025", "value": 10760.00 },
  { "month": "08/2025", "value": 10650.00 },
  { "month": "09/2025", "value": 11100.00 },
  { "month": "10/2025", "value": 11480.00 },
  { "month": "11/2025", "value": 12150.00 },
  { "month": "12/2025", "value": 12580.00 },
  { "month": "01/2026", "value": 12850.00 },
  { "month": "02/2026", "value": 13120.00 },
  { "month": "03/2026", "value": 13410.00 },
  { "month": "04/2026", "value": 13700.00 },
  { "month": "05/2026", "value": 14050.00 },
  { "month": "06/2026", "value": 14680.00 },
  { "month": "07/2026", "value": 14920.00 },
  { "month": "08/2026", "value": 14780.00 },
  { "month": "09/2026", "value": 15200.00 },
  { "month": "10/2026", "value": 14070.00 }
];

export const INITIAL_MONTHLY_BREAKDOWNS = {
  "10/2026": {
    "totalNW": 14070.00,
    "directNW": 10870.00,
    "accounts": {
      "Conto Corrente": 2450.00,
      "Carta Spese": 180.00,
      "Portafoglio Investimenti": 8200.00,
      "Fondo Previdenza": 3200.00,
      "Contanti": 40.00
    }
  },
  "09/2026": {
    "totalNW": 15200.00,
    "directNW": 12100.00,
    "accounts": {
      "Conto Corrente": 3650.00,
      "Carta Spese": 250.00,
      "Portafoglio Investimenti": 8200.00,
      "Fondo Previdenza": 3100.00,
      "Contanti": 0.00
    }
  }
};

export const INITIAL_TRANSACTIONS = [
  {
    "id": "tx_demo_01",
    "year": "2026",
    "week": "44",
    "month": "11",
    "date": "2026-11-06",
    "type": "expense",
    "account": "Carta Spese",
    "amount": 42.50,
    "category": "🛒 Alimentari",
    "description": "Spesa settimanale supermercato"
  },
  {
    "id": "tx_demo_02",
    "year": "2026",
    "week": "44",
    "month": "11",
    "date": "2026-11-05",
    "type": "expense",
    "account": "Conto Corrente",
    "amount": 48.00,
    "category": "🚗 Auto & Mobilità",
    "description": "Rifornimento carburante"
  },
  {
    "id": "tx_demo_03",
    "year": "2026",
    "week": "44",
    "month": "11",
    "date": "2026-11-04",
    "type": "expense",
    "account": "Carta Spese",
    "amount": 26.00,
    "category": "🍕 Ristorazione & Uscite",
    "description": "Pizzeria con amici"
  },
  {
    "id": "tx_demo_04",
    "year": "2026",
    "week": "44",
    "month": "11",
    "date": "2026-11-03",
    "type": "expense",
    "account": "Conto Corrente",
    "amount": 55.00,
    "category": "🏡 Casa",
    "description": "Bolletta luce e gas"
  },
  {
    "id": "tx_demo_05",
    "year": "2026",
    "week": "44",
    "month": "11",
    "date": "2026-11-02",
    "type": "expense",
    "account": "Carta Spese",
    "amount": 14.99,
    "category": "🛍️ Shopping & Tecnologia",
    "description": "Abbonamento streaming mensile"
  },
  {
    "id": "tx_demo_06",
    "year": "2026",
    "week": "43",
    "month": "10",
    "date": "2026-10-25",
    "type": "income",
    "account": "Conto Corrente",
    "amount": 1850.00,
    "category": "💰 Stipendio",
    "description": "Accredito stipendio mensile"
  },
  {
    "id": "tx_demo_07",
    "year": "2026",
    "week": "43",
    "month": "10",
    "date": "2026-10-26",
    "type": "transfer",
    "account": "Conto Corrente",
    "toAccount": "Portafoglio Investimenti",
    "amount": 200.00,
    "category": "PAC Azionario",
    "description": "Versamento automatico PAC ETF"
  },
  {
    "id": "tx_demo_08",
    "year": "2026",
    "week": "43",
    "month": "10",
    "date": "2026-10-24",
    "type": "expense",
    "account": "Carta Spese",
    "amount": 35.80,
    "category": "🛒 Alimentari",
    "description": "Spesa alimentari freschi"
  },
  {
    "id": "tx_demo_09",
    "year": "2026",
    "week": "42",
    "month": "10",
    "date": "2026-10-20",
    "type": "expense",
    "account": "Conto Corrente",
    "amount": 45.00,
    "category": "💪🏻 Fitness & Sport",
    "description": "Abbonamento palestra mensile"
  },
  {
    "id": "tx_demo_10",
    "year": "2026",
    "week": "42",
    "month": "10",
    "date": "2026-10-18",
    "type": "expense",
    "account": "Carta Spese",
    "amount": 18.50,
    "category": "🚑 Salute & Benessere",
    "description": "Farmacia parafarmaci"
  }
];
