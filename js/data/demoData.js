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
  { "month": "01/2024", "value": 3450.00 },
  { "month": "02/2024", "value": 3820.00 },
  { "month": "03/2024", "value": 4180.00 },
  { "month": "04/2024", "value": 4510.00 },
  { "month": "05/2024", "value": 4920.00 },
  { "month": "06/2024", "value": 5460.00 },
  { "month": "07/2024", "value": 5830.00 },
  { "month": "08/2024", "value": 5710.00 },
  { "month": "09/2024", "value": 6240.00 },
  { "month": "10/2024", "value": 6850.00 },
  { "month": "11/2024", "value": 7320.00 },
  { "month": "12/2024", "value": 7890.00 },
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
  "01/2024": {
    "monthKey": "01/2024",
    "label": "01/2024",
    "date": "31/01/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 1552.5,
      "Carta Spese": 345.0,
      "Portafoglio Investimenti": 1522.5,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 3450.0,
    "totalNW": 3450.0,
    "notes": "Chiusura dimostrativa"
  },
  "02/2024": {
    "monthKey": "02/2024",
    "label": "02/2024",
    "date": "28/02/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 1719.0,
      "Carta Spese": 382.0,
      "Portafoglio Investimenti": 1689.0,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 3820.0,
    "totalNW": 3820.0,
    "notes": "Chiusura dimostrativa"
  },
  "03/2024": {
    "monthKey": "03/2024",
    "label": "03/2024",
    "date": "31/03/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 1881.0,
      "Carta Spese": 418.0,
      "Portafoglio Investimenti": 1851.0,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 4180.0,
    "totalNW": 4180.0,
    "notes": "Chiusura dimostrativa"
  },
  "04/2024": {
    "monthKey": "04/2024",
    "label": "04/2024",
    "date": "30/04/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2029.5,
      "Carta Spese": 451.0,
      "Portafoglio Investimenti": 1999.5,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 4510.0,
    "totalNW": 4510.0,
    "notes": "Chiusura dimostrativa"
  },
  "05/2024": {
    "monthKey": "05/2024",
    "label": "05/2024",
    "date": "31/05/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2214.0,
      "Carta Spese": 492.0,
      "Portafoglio Investimenti": 2184.0,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 4920.0,
    "totalNW": 4920.0,
    "notes": "Chiusura dimostrativa"
  },
  "06/2024": {
    "monthKey": "06/2024",
    "label": "06/2024",
    "date": "30/06/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2457.0,
      "Carta Spese": 546.0,
      "Portafoglio Investimenti": 2427.0,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 5460.0,
    "totalNW": 5460.0,
    "notes": "Chiusura dimostrativa"
  },
  "07/2024": {
    "monthKey": "07/2024",
    "label": "07/2024",
    "date": "31/07/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2623.5,
      "Carta Spese": 583.0,
      "Portafoglio Investimenti": 2593.5,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 5830.0,
    "totalNW": 5830.0,
    "notes": "Chiusura dimostrativa"
  },
  "08/2024": {
    "monthKey": "08/2024",
    "label": "08/2024",
    "date": "31/08/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2569.5,
      "Carta Spese": 571.0,
      "Portafoglio Investimenti": 2539.5,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 5710.0,
    "totalNW": 5710.0,
    "notes": "Chiusura dimostrativa"
  },
  "09/2024": {
    "monthKey": "09/2024",
    "label": "09/2024",
    "date": "30/09/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2808.0,
      "Carta Spese": 624.0,
      "Portafoglio Investimenti": 2778.0,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 6240.0,
    "totalNW": 6240.0,
    "notes": "Chiusura dimostrativa"
  },
  "10/2024": {
    "monthKey": "10/2024",
    "label": "10/2024",
    "date": "31/10/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3082.5,
      "Carta Spese": 685.0,
      "Portafoglio Investimenti": 3052.5,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 6850.0,
    "totalNW": 6850.0,
    "notes": "Chiusura dimostrativa"
  },
  "11/2024": {
    "monthKey": "11/2024",
    "label": "11/2024",
    "date": "30/11/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3294.0,
      "Carta Spese": 732.0,
      "Portafoglio Investimenti": 3264.0,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 7320.0,
    "totalNW": 7320.0,
    "notes": "Chiusura dimostrativa"
  },
  "12/2024": {
    "monthKey": "12/2024",
    "label": "12/2024",
    "date": "31/12/2024",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3550.5,
      "Carta Spese": 789.0,
      "Portafoglio Investimenti": 3520.5,
      "Fondo Previdenza": 0.0,
      "Contanti": 30.0
    },
    "directNW": 7890.0,
    "totalNW": 7890.0,
    "notes": "Chiusura dimostrativa"
  },
  "01/2025": {
    "monthKey": "01/2025",
    "label": "01/2025",
    "date": "31/01/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2366.0,
      "Carta Spese": 422.5,
      "Portafoglio Investimenti": 3762.5,
      "Fondo Previdenza": 1859.0,
      "Contanti": 40.0
    },
    "directNW": 6591.0,
    "totalNW": 8450.0,
    "notes": "Chiusura dimostrativa"
  },
  "02/2025": {
    "monthKey": "02/2025",
    "label": "02/2025",
    "date": "28/02/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2458.4,
      "Carta Spese": 439.0,
      "Portafoglio Investimenti": 3911.0,
      "Fondo Previdenza": 1931.6,
      "Contanti": 40.0
    },
    "directNW": 6848.4,
    "totalNW": 8780.0,
    "notes": "Chiusura dimostrativa"
  },
  "03/2025": {
    "monthKey": "03/2025",
    "label": "03/2025",
    "date": "31/03/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2553.6,
      "Carta Spese": 456.0,
      "Portafoglio Investimenti": 4064.0,
      "Fondo Previdenza": 2006.4,
      "Contanti": 40.0
    },
    "directNW": 7113.6,
    "totalNW": 9120.0,
    "notes": "Chiusura dimostrativa"
  },
  "04/2025": {
    "monthKey": "04/2025",
    "label": "04/2025",
    "date": "30/04/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2654.4,
      "Carta Spese": 474.0,
      "Portafoglio Investimenti": 4226.0,
      "Fondo Previdenza": 2085.6,
      "Contanti": 40.0
    },
    "directNW": 7394.4,
    "totalNW": 9480.0,
    "notes": "Chiusura dimostrativa"
  },
  "05/2025": {
    "monthKey": "05/2025",
    "label": "05/2025",
    "date": "31/05/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2758.0,
      "Carta Spese": 492.5,
      "Portafoglio Investimenti": 4392.5,
      "Fondo Previdenza": 2167.0,
      "Contanti": 40.0
    },
    "directNW": 7683.0,
    "totalNW": 9850.0,
    "notes": "Chiusura dimostrativa"
  },
  "06/2025": {
    "monthKey": "06/2025",
    "label": "06/2025",
    "date": "30/06/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2917.6,
      "Carta Spese": 521.0,
      "Portafoglio Investimenti": 4649.0,
      "Fondo Previdenza": 2292.4,
      "Contanti": 40.0
    },
    "directNW": 8127.6,
    "totalNW": 10420.0,
    "notes": "Chiusura dimostrativa"
  },
  "07/2025": {
    "monthKey": "07/2025",
    "label": "07/2025",
    "date": "31/07/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3012.8,
      "Carta Spese": 538.0,
      "Portafoglio Investimenti": 4802.0,
      "Fondo Previdenza": 2367.2,
      "Contanti": 40.0
    },
    "directNW": 8392.8,
    "totalNW": 10760.0,
    "notes": "Chiusura dimostrativa"
  },
  "08/2025": {
    "monthKey": "08/2025",
    "label": "08/2025",
    "date": "31/08/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 2982.0,
      "Carta Spese": 532.5,
      "Portafoglio Investimenti": 4752.5,
      "Fondo Previdenza": 2343.0,
      "Contanti": 40.0
    },
    "directNW": 8307.0,
    "totalNW": 10650.0,
    "notes": "Chiusura dimostrativa"
  },
  "09/2025": {
    "monthKey": "09/2025",
    "label": "09/2025",
    "date": "30/09/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3108.0,
      "Carta Spese": 555.0,
      "Portafoglio Investimenti": 4955.0,
      "Fondo Previdenza": 2442.0,
      "Contanti": 40.0
    },
    "directNW": 8658.0,
    "totalNW": 11100.0,
    "notes": "Chiusura dimostrativa"
  },
  "10/2025": {
    "monthKey": "10/2025",
    "label": "10/2025",
    "date": "31/10/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3214.4,
      "Carta Spese": 574.0,
      "Portafoglio Investimenti": 5126.0,
      "Fondo Previdenza": 2525.6,
      "Contanti": 40.0
    },
    "directNW": 8954.4,
    "totalNW": 11480.0,
    "notes": "Chiusura dimostrativa"
  },
  "11/2025": {
    "monthKey": "11/2025",
    "label": "11/2025",
    "date": "30/11/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3402.0,
      "Carta Spese": 607.5,
      "Portafoglio Investimenti": 5427.5,
      "Fondo Previdenza": 2673.0,
      "Contanti": 40.0
    },
    "directNW": 9477.0,
    "totalNW": 12150.0,
    "notes": "Chiusura dimostrativa"
  },
  "12/2025": {
    "monthKey": "12/2025",
    "label": "12/2025",
    "date": "31/12/2025",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3522.4,
      "Carta Spese": 629.0,
      "Portafoglio Investimenti": 5621.0,
      "Fondo Previdenza": 2767.6,
      "Contanti": 40.0
    },
    "directNW": 9812.4,
    "totalNW": 12580.0,
    "notes": "Chiusura dimostrativa"
  },
  "01/2026": {
    "monthKey": "01/2026",
    "label": "01/2026",
    "date": "31/01/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3598.0,
      "Carta Spese": 642.5,
      "Portafoglio Investimenti": 5742.5,
      "Fondo Previdenza": 2827.0,
      "Contanti": 40.0
    },
    "directNW": 10023.0,
    "totalNW": 12850.0,
    "notes": "Chiusura dimostrativa"
  },
  "02/2026": {
    "monthKey": "02/2026",
    "label": "02/2026",
    "date": "28/02/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3673.6,
      "Carta Spese": 656.0,
      "Portafoglio Investimenti": 5864.0,
      "Fondo Previdenza": 2886.4,
      "Contanti": 40.0
    },
    "directNW": 10233.6,
    "totalNW": 13120.0,
    "notes": "Chiusura dimostrativa"
  },
  "03/2026": {
    "monthKey": "03/2026",
    "label": "03/2026",
    "date": "31/03/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3754.8,
      "Carta Spese": 670.5,
      "Portafoglio Investimenti": 5994.5,
      "Fondo Previdenza": 2950.2,
      "Contanti": 40.0
    },
    "directNW": 10459.8,
    "totalNW": 13410.0,
    "notes": "Chiusura dimostrativa"
  },
  "04/2026": {
    "monthKey": "04/2026",
    "label": "04/2026",
    "date": "30/04/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3836.0,
      "Carta Spese": 685.0,
      "Portafoglio Investimenti": 6125.0,
      "Fondo Previdenza": 3014.0,
      "Contanti": 40.0
    },
    "directNW": 10686.0,
    "totalNW": 13700.0,
    "notes": "Chiusura dimostrativa"
  },
  "05/2026": {
    "monthKey": "05/2026",
    "label": "05/2026",
    "date": "31/05/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3934.0,
      "Carta Spese": 702.5,
      "Portafoglio Investimenti": 6282.5,
      "Fondo Previdenza": 3091.0,
      "Contanti": 40.0
    },
    "directNW": 10959.0,
    "totalNW": 14050.0,
    "notes": "Chiusura dimostrativa"
  },
  "06/2026": {
    "monthKey": "06/2026",
    "label": "06/2026",
    "date": "30/06/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 4110.4,
      "Carta Spese": 734.0,
      "Portafoglio Investimenti": 6566.0,
      "Fondo Previdenza": 3229.6,
      "Contanti": 40.0
    },
    "directNW": 11450.4,
    "totalNW": 14680.0,
    "notes": "Chiusura dimostrativa"
  },
  "07/2026": {
    "monthKey": "07/2026",
    "label": "07/2026",
    "date": "31/07/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 4177.6,
      "Carta Spese": 746.0,
      "Portafoglio Investimenti": 6674.0,
      "Fondo Previdenza": 3282.4,
      "Contanti": 40.0
    },
    "directNW": 11637.6,
    "totalNW": 14920.0,
    "notes": "Chiusura dimostrativa"
  },
  "08/2026": {
    "monthKey": "08/2026",
    "label": "08/2026",
    "date": "31/08/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 4138.4,
      "Carta Spese": 739.0,
      "Portafoglio Investimenti": 6611.0,
      "Fondo Previdenza": 3251.6,
      "Contanti": 40.0
    },
    "directNW": 11528.4,
    "totalNW": 14780.0,
    "notes": "Chiusura dimostrativa"
  },
  "09/2026": {
    "monthKey": "09/2026",
    "label": "09/2026",
    "date": "30/09/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 4256.0,
      "Carta Spese": 760.0,
      "Portafoglio Investimenti": 6800.0,
      "Fondo Previdenza": 3344.0,
      "Contanti": 40.0
    },
    "directNW": 11856.0,
    "totalNW": 15200.0,
    "notes": "Chiusura dimostrativa"
  },
  "10/2026": {
    "monthKey": "10/2026",
    "label": "10/2026",
    "date": "31/10/2026",
    "isClosed": true,
    "accounts": {
      "Conto Corrente": 3939.6,
      "Carta Spese": 703.5,
      "Portafoglio Investimenti": 6291.5,
      "Fondo Previdenza": 3095.4,
      "Contanti": 40.0
    },
    "directNW": 10974.6,
    "totalNW": 14070.0,
    "notes": "Chiusura dimostrativa"
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
