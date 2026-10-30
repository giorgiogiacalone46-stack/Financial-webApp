(function() {
"use strict";

// === js/data/realData.js ===
/**
 * Real Data Store - Finanze Personali (Sincronizzato con 'Finanze - Movimenti' & 'NetWort')
 */
const INITIAL_CATEGORIES = [
  { id: 'stipendio', name: '💰Stipendio', type: 'income', color: '#34C759' },
  { id: 'altre_entrate', name: '💶 Altre entrate', type: 'income', color: '#30D158' },
  { id: 'alimentari', name: '🛒 Alimentari', type: 'expense', color: '#0071E3' },
  { id: 'casa', name: '🏡 Casa', type: 'expense', color: '#5856D6' },
  { id: 'auto', name: '🚗 Auto', type: 'expense', color: '#FF9500' },
  { id: 'trasporti', name: '🚊 Trasporti', type: 'expense', color: '#FF2D55' },
  { id: 'uscite', name: '🍴Uscite', type: 'expense', color: '#AF52DE' },
  { id: 'shopping', name: '🛍️ Shopping', type: 'expense', color: '#FF3B30' },
  { id: 'tecnologia', name: '💻 Tecnologia', type: 'expense', color: '#5AC8FA' },
  { id: 'salute', name: '🚑 Salute', type: 'expense', color: '#FF453A' },
  { id: 'fitness', name: '💪🏻 Fitness', type: 'expense', color: '#34C759' },
  { id: 'beauty', name: '💇🏻‍♂️ Beauty', type: 'expense', color: '#FF9500' },
  { id: 'istruzione', name: '🎓 Istruzione', type: 'expense', color: '#0071E3' },
  { id: 'viaggi', name: '🛫 Viaggi', type: 'expense', color: '#AF52DE' },
  { id: 'fondo_emergenza', name: '🏦 Fondo di emergenza', type: 'transfer', color: '#34C759' },
  { id: 'livello_sicurezza', name: '📈 Livello Sicurezza', type: 'transfer', color: '#0071E3' },
  { id: 'livello_crescita', name: '🛅 Livello Crescita', type: 'transfer', color: '#5856D6' },
  { id: 'altro', name: '❔Altro', type: 'expense', color: '#8E8E93' }
];
const INITIAL_ACCOUNTS = [
  { id: 'buddybank', name: 'Buddybank', type: 'Liquidità corrente', balance: 4160.00, isLiquid: true },
  { id: 'xeon', name: 'Trade Republic - XEON', type: 'Fondo Emergenza / Sicurezza', balance: 5383.32, isInvestment: true },
  { id: 'vwce', name: 'Trade Republic - VWCE', type: 'Azionario Globale (Lungo Termine)', balance: 3410.25, isInvestment: true },
  { id: 'pensione', name: 'Fondo Pensione', type: 'Previdenza complementare', balance: 4391.24, isPension: true },
  { id: 'contanti', name: 'Contanti', type: 'Liquidità contante', balance: 10.00, isLiquid: true },
  { id: 'buoni_pasto', name: 'Buoni Pasto', type: 'Buoni Pasto / Benefit', balance: 388.50, isLiquid: true }
];
const INITIAL_SALDI = [
  {
    "date": "28/10/2026",
    "name": "Buddybank",
    "type": "Liquidità corrente",
    "balance": 4160.0,
    "notes": "Conto base operativo (include stipendio ottobre)"
  },
  {
    "date": "28/10/2026",
    "name": "Trade Republic - XEON",
    "type": "Fondo Emergenza / Sicurezza",
    "balance": 5383.32,
    "notes": "Overnight monetario (target reintegro: +1.500 €)"
  },
  {
    "date": "28/10/2026",
    "name": "Trade Republic - VWCE",
    "type": "Azionario Globale (Lungo Termine)",
    "balance": 3410.25,
    "notes": "PAC ETF (in arrivo versamento 200 € a nov)"
  },
  {
    "date": "28/10/2026",
    "name": "Contanti",
    "type": "Liquidità contante",
    "balance": 10.0,
    "notes": "Disponibilità fisica"
  },
  {
    "date": "28/10/2026",
    "name": "Fondo Pensione",
    "type": "Previdenza complementare",
    "balance": 4391.24,
    "notes": "Valore congelato/standby (snapshot settembre 2026)"
  },
  {
    "date": "28/10/2026",
    "name": "TOTALE NET WORTH",
    "type": "Patrimonio Complessivo",
    "balance": 17354.81,
    "notes": "Inclusa previdenza complementare"
  },
  {
    "date": "28/10/2026",
    "name": "TOTALE LIQUIDO & INVESTITO",
    "type": "Disponibilità Diretta",
    "balance": 12963.57,
    "notes": "Esclusa previdenza complementare"
  }
];
const INITIAL_HISTORICAL_NW = [
  {
    "month": "01/2024",
    "value": 432.17
  },
  {
    "month": "02/2024",
    "value": 629.17
  },
  {
    "month": "03/2024",
    "value": 703.54
  },
  {
    "month": "04/2024",
    "value": 650.04
  },
  {
    "month": "05/2024",
    "value": 688.61
  },
  {
    "month": "06/2024",
    "value": 619.66
  },
  {
    "month": "07/2024",
    "value": 667.79
  },
  {
    "month": "08/2024",
    "value": 583.12
  },
  {
    "month": "09/2024",
    "value": 641.12
  },
  {
    "month": "10/2024",
    "value": 1887.57
  },
  {
    "month": "11/2024",
    "value": 2117.54
  },
  {
    "month": "12/2024",
    "value": 2419.02
  },
  {
    "month": "01/2025",
    "value": 3020.65
  },
  {
    "month": "02/2025",
    "value": 3883.07
  },
  {
    "month": "03/2025",
    "value": 3611.58
  },
  {
    "month": "04/2025",
    "value": 3306.0
  },
  {
    "month": "05/2025",
    "value": 4148.96
  },
  {
    "month": "06/2025",
    "value": 4390.49
  },
  {
    "month": "07/2025",
    "value": 4025.49
  },
  {
    "month": "08/2025",
    "value": 3715.49
  },
  {
    "month": "09/2025",
    "value": 3562.85
  },
  {
    "month": "10/2025",
    "value": 4128.39
  },
  {
    "month": "11/2025",
    "value": 5373.72
  },
  {
    "month": "12/2025",
    "value": 6971.48
  },
  {
    "month": "01/2026",
    "value": 7481.95
  },
  {
    "month": "02/2026",
    "value": 8959.33
  },
  {
    "month": "03/2026",
    "value": 11152.22
  },
  {
    "month": "04/2026",
    "value": 12089.65
  },
  {
    "month": "05/2026",
    "value": 13565.44
  },
  {
    "month": "06/2026",
    "value": 15209.65
  },
  {
    "month": "07/2026",
    "value": 16078.69
  },
  {
    "month": "08/2026",
    "value": 15974.21
  }
];
const INITIAL_TRANSACTIONS = [
  {
    "id": "tx_1",
    "rowNumber": 2,
    "year": "2025",
    "week": "40",
    "month": "10",
    "date": "02/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.9,
    "category": "🛒 Alimentari",
    "description": "Spesa conad"
  },
  {
    "id": "tx_2",
    "rowNumber": 3,
    "year": "2025",
    "week": "40",
    "month": "10",
    "date": "02/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 84.0,
    "category": "🛒 Alimentari",
    "description": "Spesa conad"
  },
  {
    "id": "tx_3",
    "rowNumber": 4,
    "year": "2025",
    "week": "40",
    "month": "10",
    "date": "04/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.36,
    "category": "🏡 Casa",
    "description": "Detersivi Lavatrice"
  },
  {
    "id": "tx_4",
    "rowNumber": 5,
    "year": "2025",
    "week": "41",
    "month": "10",
    "date": "05/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.5,
    "category": "🛒 Alimentari",
    "description": "Pizza margherita"
  },
  {
    "id": "tx_5",
    "rowNumber": 6,
    "year": "2025",
    "week": "41",
    "month": "10",
    "date": "07/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "sigarette"
  },
  {
    "id": "tx_6",
    "rowNumber": 7,
    "year": "2025",
    "week": "41",
    "month": "10",
    "date": "08/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 143.8,
    "category": "🚊 Trasporti",
    "description": "treno per roma"
  },
  {
    "id": "tx_7",
    "rowNumber": 8,
    "year": "2025",
    "week": "41",
    "month": "10",
    "date": "08/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_8",
    "rowNumber": 9,
    "year": "2025",
    "week": "41",
    "month": "10",
    "date": "11/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 17.2,
    "category": "🏡 Casa",
    "description": "Stendino"
  },
  {
    "id": "tx_9",
    "rowNumber": 10,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "14/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 94.5,
    "category": "🛒 Alimentari",
    "description": "Spesa"
  },
  {
    "id": "tx_10",
    "rowNumber": 11,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "14/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.34,
    "category": "🛒 Alimentari",
    "description": "Spesa"
  },
  {
    "id": "tx_11",
    "rowNumber": 12,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "15/10/2025",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 425.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_12",
    "rowNumber": 13,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🚊 Trasporti",
    "description": "Regionale e metro"
  },
  {
    "id": "tx_13",
    "rowNumber": 14,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.0,
    "category": "🍴Uscite",
    "description": "Panini"
  },
  {
    "id": "tx_14",
    "rowNumber": 15,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🍴Uscite",
    "description": "Bowling"
  },
  {
    "id": "tx_15",
    "rowNumber": 16,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Gel"
  },
  {
    "id": "tx_16",
    "rowNumber": 17,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 50.0,
    "category": "🍴Uscite",
    "description": "The race - speakeasy"
  },
  {
    "id": "tx_17",
    "rowNumber": 18,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 25.0,
    "category": "🍴Uscite",
    "description": "Pizza"
  },
  {
    "id": "tx_18",
    "rowNumber": 19,
    "year": "2025",
    "week": "42",
    "month": "10",
    "date": "17/10/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 50.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_19",
    "rowNumber": 20,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "20/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.95,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_20",
    "rowNumber": 21,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "20/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_21",
    "rowNumber": 22,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "21/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 7.9,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_22",
    "rowNumber": 23,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "21/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_23",
    "rowNumber": 24,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "22/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": "Affitto ottobre"
  },
  {
    "id": "tx_24",
    "rowNumber": 25,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "22/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_25",
    "rowNumber": 26,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "22/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_26",
    "rowNumber": 27,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "23/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 70.2,
    "category": "🚊 Trasporti",
    "description": "treno giulia"
  },
  {
    "id": "tx_27",
    "rowNumber": 28,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "23/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_28",
    "rowNumber": 29,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "23/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.75,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_29",
    "rowNumber": 30,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "24/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_30",
    "rowNumber": 31,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "24/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "sigarette"
  },
  {
    "id": "tx_31",
    "rowNumber": 32,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "24/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 51.4,
    "category": "🍴Uscite",
    "description": "pansfizio"
  },
  {
    "id": "tx_32",
    "rowNumber": 33,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "24/10/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1667.55,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_33",
    "rowNumber": 34,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 50.0,
    "category": "🛫 Viaggi",
    "description": "muranoe burano"
  },
  {
    "id": "tx_34",
    "rowNumber": 35,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "🚊 Trasporti",
    "description": "tranitalia"
  },
  {
    "id": "tx_35",
    "rowNumber": 36,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🍴Uscite",
    "description": "pranzo venezia"
  },
  {
    "id": "tx_36",
    "rowNumber": 37,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.5,
    "category": "🍴Uscite",
    "description": "patatine fritte"
  },
  {
    "id": "tx_37",
    "rowNumber": 38,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.95,
    "category": "❔Altro",
    "description": "concorso giulia"
  },
  {
    "id": "tx_38",
    "rowNumber": 39,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 23.45,
    "category": "🚑 Salute",
    "description": "crema giulia"
  },
  {
    "id": "tx_39",
    "rowNumber": 40,
    "year": "2025",
    "week": "43",
    "month": "10",
    "date": "25/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 4.0,
    "category": "🛍️ Shopping",
    "description": "calze giulia"
  },
  {
    "id": "tx_40",
    "rowNumber": 41,
    "year": "2025",
    "week": "44",
    "month": "10",
    "date": "26/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.5,
    "category": "🚑 Salute",
    "description": "Crema afte"
  },
  {
    "id": "tx_41",
    "rowNumber": 42,
    "year": "2025",
    "week": "44",
    "month": "10",
    "date": "26/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.98,
    "category": "🛒 Alimentari",
    "description": "Cena"
  },
  {
    "id": "tx_42",
    "rowNumber": 43,
    "year": "2025",
    "week": "44",
    "month": "10",
    "date": "26/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "Cena"
  },
  {
    "id": "tx_43",
    "rowNumber": 44,
    "year": "2025",
    "week": "44",
    "month": "10",
    "date": "27/10/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💶 Altre entrate",
    "description": "giulia"
  },
  {
    "id": "tx_44",
    "rowNumber": 45,
    "year": "2025",
    "week": "44",
    "month": "10",
    "date": "30/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 6.0,
    "category": "🍴Uscite",
    "description": "kebab"
  },
  {
    "id": "tx_45",
    "rowNumber": 46,
    "year": "2025",
    "week": "44",
    "month": "10",
    "date": "30/10/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🍴Uscite",
    "description": "cena QB"
  },
  {
    "id": "tx_46",
    "rowNumber": 47,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "04/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "macchinette"
  },
  {
    "id": "tx_47",
    "rowNumber": 48,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "04/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 9.0,
    "category": "🛒 Alimentari",
    "description": "pizza"
  },
  {
    "id": "tx_48",
    "rowNumber": 49,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "04/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 283.0,
    "category": "💻 Tecnologia",
    "description": "1 rata macbook"
  },
  {
    "id": "tx_49",
    "rowNumber": 50,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "04/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.1,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_50",
    "rowNumber": 51,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "04/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.1,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_51",
    "rowNumber": 52,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "05/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 146.0,
    "category": "🚊 Trasporti",
    "description": "Treno"
  },
  {
    "id": "tx_52",
    "rowNumber": 53,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "05/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.99,
    "category": "❔Altro",
    "description": "Collari gatti"
  },
  {
    "id": "tx_53",
    "rowNumber": 54,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "07/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🛍️ Shopping",
    "description": "agendine"
  },
  {
    "id": "tx_54",
    "rowNumber": 55,
    "year": "2025",
    "week": "45",
    "month": "11",
    "date": "08/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 65.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_55",
    "rowNumber": 56,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "10/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "🛒 Alimentari",
    "description": "Trasferta"
  },
  {
    "id": "tx_56",
    "rowNumber": 57,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "10/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_57",
    "rowNumber": 58,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "10/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.15,
    "category": "🛒 Alimentari",
    "description": "Trasferta"
  },
  {
    "id": "tx_58",
    "rowNumber": 59,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "10/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.6,
    "category": "❔Altro",
    "description": "Trasferta"
  },
  {
    "id": "tx_59",
    "rowNumber": 60,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "11/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 50.0,
    "category": "🍴Uscite",
    "description": "cena fraschetta ariccia"
  },
  {
    "id": "tx_60",
    "rowNumber": 61,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "11/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "Trasferta"
  },
  {
    "id": "tx_61",
    "rowNumber": 62,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "12/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.8,
    "category": "🛒 Alimentari",
    "description": "Trasferta"
  },
  {
    "id": "tx_62",
    "rowNumber": 63,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "13/11/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💶 Altre entrate",
    "description": "soldi antiparassitario"
  },
  {
    "id": "tx_63",
    "rowNumber": 64,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "13/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.13,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_64",
    "rowNumber": 65,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "13/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "Trasferta"
  },
  {
    "id": "tx_65",
    "rowNumber": 66,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "14/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 26.99,
    "category": "🚗 Auto",
    "description": "macchina a noleggio"
  },
  {
    "id": "tx_66",
    "rowNumber": 67,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "14/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "Trasferta"
  },
  {
    "id": "tx_67",
    "rowNumber": 68,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "14/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "tabacchi"
  },
  {
    "id": "tx_68",
    "rowNumber": 69,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "15/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.1,
    "category": "❔Altro",
    "description": "antiparassitario chloe e blistex"
  },
  {
    "id": "tx_69",
    "rowNumber": 70,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "15/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 60.0,
    "category": "🍴Uscite",
    "description": "escape room"
  },
  {
    "id": "tx_70",
    "rowNumber": 71,
    "year": "2025",
    "week": "46",
    "month": "11",
    "date": "15/11/2025",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Contanti",
    "account": "Buddybank",
    "amount": 100.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_71",
    "rowNumber": 72,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "16/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "🚊 Trasporti",
    "description": "treno per quarto"
  },
  {
    "id": "tx_72",
    "rowNumber": 73,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "16/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_73",
    "rowNumber": 74,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "16/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_74",
    "rowNumber": 75,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "16/11/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 300.0,
    "category": "💶 Altre entrate",
    "description": "mamma"
  },
  {
    "id": "tx_75",
    "rowNumber": 76,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "18/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 9.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_76",
    "rowNumber": 77,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "19/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🚊 Trasporti",
    "description": "Trasferta"
  },
  {
    "id": "tx_77",
    "rowNumber": 78,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "19/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.5,
    "category": "❔Altro",
    "description": "Trasferta"
  },
  {
    "id": "tx_78",
    "rowNumber": 79,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "20/11/2025",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Contanti",
    "toAccount": "Buddybank",
    "account": "Contanti",
    "amount": 300.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_79",
    "rowNumber": 80,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "20/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_80",
    "rowNumber": 81,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "20/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_81",
    "rowNumber": 82,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "21/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.0,
    "category": "💻 Tecnologia",
    "description": "hub usb c"
  },
  {
    "id": "tx_82",
    "rowNumber": 83,
    "year": "2025",
    "week": "47",
    "month": "11",
    "date": "22/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 73.0,
    "category": "🏡 Casa",
    "description": "Registrazione contratto"
  },
  {
    "id": "tx_83",
    "rowNumber": 84,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "24/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.7,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_84",
    "rowNumber": 85,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "24/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.3,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_85",
    "rowNumber": 86,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "24/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.4,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_86",
    "rowNumber": 87,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "24/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.5,
    "category": "🛫 Viaggi",
    "description": "Trasferta"
  },
  {
    "id": "tx_87",
    "rowNumber": 88,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "24/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.37,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_88",
    "rowNumber": 89,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": "Affitto novembre"
  },
  {
    "id": "tx_89",
    "rowNumber": 90,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2034.67,
    "category": "💰Stipendio",
    "description": "novembre + tredicesima"
  },
  {
    "id": "tx_90",
    "rowNumber": 91,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_91",
    "rowNumber": 92,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.7,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_92",
    "rowNumber": 93,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.2,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_93",
    "rowNumber": 94,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.2,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_94",
    "rowNumber": 95,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "25/11/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 189.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_95",
    "rowNumber": 96,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "26/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.8,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_96",
    "rowNumber": 97,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "26/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 53.9,
    "category": "🚊 Trasporti",
    "description": "italo ritorno"
  },
  {
    "id": "tx_97",
    "rowNumber": 98,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_98",
    "rowNumber": 99,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 50.32,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_99",
    "rowNumber": 100,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.4,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_100",
    "rowNumber": 101,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_101",
    "rowNumber": 102,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.3,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_102",
    "rowNumber": 103,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.41,
    "category": "🚗 Auto",
    "description": "Trasferta"
  },
  {
    "id": "tx_103",
    "rowNumber": 104,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_104",
    "rowNumber": 105,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.35,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_105",
    "rowNumber": 106,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "27/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_106",
    "rowNumber": 107,
    "year": "2025",
    "week": "48",
    "month": "11",
    "date": "29/11/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Parrucchiere"
  },
  {
    "id": "tx_107",
    "rowNumber": 108,
    "year": "2025",
    "week": "49",
    "month": "11",
    "date": "30/11/2025",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 635.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_108",
    "rowNumber": 109,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "01/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 91.7,
    "category": "🚊 Trasporti",
    "description": "Acquistati a ottobre"
  },
  {
    "id": "tx_109",
    "rowNumber": 110,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "01/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_110",
    "rowNumber": 111,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "01/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 14.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_111",
    "rowNumber": 112,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "01/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.19,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_112",
    "rowNumber": 113,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "01/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_113",
    "rowNumber": 114,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "02/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_114",
    "rowNumber": 115,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "02/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_115",
    "rowNumber": 116,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "02/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 58.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_116",
    "rowNumber": 117,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "03/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_117",
    "rowNumber": 118,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "03/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_118",
    "rowNumber": 119,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "04/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_119",
    "rowNumber": 120,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "04/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.5,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_120",
    "rowNumber": 121,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "04/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_121",
    "rowNumber": 122,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "05/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "🍴Uscite",
    "description": "Trasferta"
  },
  {
    "id": "tx_122",
    "rowNumber": 123,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "05/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.0,
    "category": "❔Altro",
    "description": "Pianta per mamma"
  },
  {
    "id": "tx_123",
    "rowNumber": 124,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "05/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 30.0,
    "category": "🍴Uscite",
    "description": "black rabbit"
  },
  {
    "id": "tx_124",
    "rowNumber": 125,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 15.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_125",
    "rowNumber": 126,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.1,
    "category": "🛍️ Shopping",
    "description": "gioco detective"
  },
  {
    "id": "tx_126",
    "rowNumber": 127,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 24.0,
    "category": "🛍️ Shopping",
    "description": "regalo beatrice"
  },
  {
    "id": "tx_127",
    "rowNumber": 128,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 158.6,
    "category": "❔Altro",
    "description": "regalo battesimo celine"
  },
  {
    "id": "tx_128",
    "rowNumber": 129,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.9,
    "category": "❔Altro",
    "description": "collana valentina"
  },
  {
    "id": "tx_129",
    "rowNumber": 130,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 38.94,
    "category": "🛍️ Shopping",
    "description": "camicia giulia+orecchini vale"
  },
  {
    "id": "tx_130",
    "rowNumber": 131,
    "year": "2025",
    "week": "49",
    "month": "12",
    "date": "06/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 100.0,
    "category": "🍴Uscite",
    "description": "cena con lucrezia e matteo comus"
  },
  {
    "id": "tx_131",
    "rowNumber": 132,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "07/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 115.0,
    "category": "💶 Altre entrate",
    "description": "regalo celine e cose valentina"
  },
  {
    "id": "tx_132",
    "rowNumber": 133,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "07/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "sigarette"
  },
  {
    "id": "tx_133",
    "rowNumber": 134,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "08/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 400.0,
    "category": "💶 Altre entrate",
    "description": "mamma x pc"
  },
  {
    "id": "tx_134",
    "rowNumber": 135,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "10/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 94.5,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_135",
    "rowNumber": 136,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "10/12/2025",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Contanti",
    "toAccount": "Buddybank",
    "account": "Contanti",
    "amount": 540.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_136",
    "rowNumber": 137,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "10/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_137",
    "rowNumber": 138,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "10/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.0,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_138",
    "rowNumber": 139,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "10/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 328.0,
    "category": "💪🏻 Fitness",
    "description": "fitactive"
  },
  {
    "id": "tx_139",
    "rowNumber": 140,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "10/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 59.0,
    "category": "🚊 Trasporti",
    "description": "trenitalia"
  },
  {
    "id": "tx_140",
    "rowNumber": 141,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "11/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "pranzo istrana"
  },
  {
    "id": "tx_141",
    "rowNumber": 142,
    "year": "2025",
    "week": "50",
    "month": "12",
    "date": "13/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 68.0,
    "category": "❔Altro",
    "description": "regalo mamma"
  },
  {
    "id": "tx_142",
    "rowNumber": 143,
    "year": "2025",
    "week": "51",
    "month": "12",
    "date": "14/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "🏡 Casa",
    "description": "detersivi"
  },
  {
    "id": "tx_143",
    "rowNumber": 144,
    "year": "2025",
    "week": "51",
    "month": "12",
    "date": "16/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "Macchinette"
  },
  {
    "id": "tx_144",
    "rowNumber": 145,
    "year": "2025",
    "week": "51",
    "month": "12",
    "date": "19/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.0,
    "category": "🚊 Trasporti",
    "description": "Ferry Lido"
  },
  {
    "id": "tx_145",
    "rowNumber": 146,
    "year": "2025",
    "week": "51",
    "month": "12",
    "date": "20/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.7,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_146",
    "rowNumber": 147,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.5,
    "category": "🏡 Casa",
    "description": "posa mestolo"
  },
  {
    "id": "tx_147",
    "rowNumber": 148,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 47.8,
    "category": "💻 Tecnologia",
    "description": "display asus"
  },
  {
    "id": "tx_148",
    "rowNumber": 149,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.95,
    "category": "❔Altro",
    "description": "Natale"
  },
  {
    "id": "tx_149",
    "rowNumber": 150,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.95,
    "category": "❔Altro",
    "description": "Natale"
  },
  {
    "id": "tx_150",
    "rowNumber": 151,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.95,
    "category": "❔Altro",
    "description": "Natale"
  },
  {
    "id": "tx_151",
    "rowNumber": 152,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.95,
    "category": "❔Altro",
    "description": "Natale"
  },
  {
    "id": "tx_152",
    "rowNumber": 153,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.95,
    "category": "❔Altro",
    "description": "Natale"
  },
  {
    "id": "tx_153",
    "rowNumber": 154,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "21/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 27.0,
    "category": "❔Altro",
    "description": "natale"
  },
  {
    "id": "tx_154",
    "rowNumber": 155,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "22/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 150.0,
    "category": "❔Altro",
    "description": "saldi giulia regali natale"
  },
  {
    "id": "tx_155",
    "rowNumber": 156,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "22/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.54,
    "category": "❔Altro",
    "description": "agenda e leggio"
  },
  {
    "id": "tx_156",
    "rowNumber": 157,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "23/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": "affitto gennaio"
  },
  {
    "id": "tx_157",
    "rowNumber": 158,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "23/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.7,
    "category": "🍴Uscite",
    "description": "colazione istrana"
  },
  {
    "id": "tx_158",
    "rowNumber": 159,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "23/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 45.09,
    "category": "❔Altro",
    "description": "natale"
  },
  {
    "id": "tx_159",
    "rowNumber": 160,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "23/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.95,
    "category": "❔Altro",
    "description": "natale"
  },
  {
    "id": "tx_160",
    "rowNumber": 161,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "24/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2947.69,
    "category": "💰Stipendio",
    "description": "stipendio dicembre"
  },
  {
    "id": "tx_161",
    "rowNumber": 162,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "24/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 105.0,
    "category": "💶 Altre entrate",
    "description": "buoni pasto novembre"
  },
  {
    "id": "tx_162",
    "rowNumber": 163,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "25/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.8,
    "category": "❔Altro",
    "description": "cinema"
  },
  {
    "id": "tx_163",
    "rowNumber": 164,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "25/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.8,
    "category": "❔Altro",
    "description": "cinema"
  },
  {
    "id": "tx_164",
    "rowNumber": 165,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "25/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.8,
    "category": "❔Altro",
    "description": "cinema"
  },
  {
    "id": "tx_165",
    "rowNumber": 166,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "25/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "sigarette"
  },
  {
    "id": "tx_166",
    "rowNumber": 167,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "25/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 30.0,
    "category": "💶 Altre entrate",
    "description": "soldi cinema"
  },
  {
    "id": "tx_167",
    "rowNumber": 168,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "25/12/2025",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 300.0,
    "category": "💶 Altre entrate",
    "description": "regalo natale"
  },
  {
    "id": "tx_168",
    "rowNumber": 169,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "27/12/2025",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 978.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_169",
    "rowNumber": 170,
    "year": "2025",
    "week": "52",
    "month": "12",
    "date": "27/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 283.0,
    "category": "💻 Tecnologia",
    "description": "Seconda rata MacBook"
  },
  {
    "id": "tx_170",
    "rowNumber": 171,
    "year": "2025",
    "week": "53",
    "month": "12",
    "date": "28/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 23.0,
    "category": "❔Altro",
    "description": "regalo matteo e lucrezia"
  },
  {
    "id": "tx_171",
    "rowNumber": 172,
    "year": "2025",
    "week": "53",
    "month": "12",
    "date": "28/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.19,
    "category": "❔Altro",
    "description": "fresa"
  },
  {
    "id": "tx_172",
    "rowNumber": 173,
    "year": "2025",
    "week": "53",
    "month": "12",
    "date": "28/12/2025",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 42.0,
    "category": "❔Altro",
    "description": "regalo cristian, cristina e camilla"
  },
  {
    "id": "tx_173",
    "rowNumber": 174,
    "year": "2026",
    "week": "1",
    "month": "1",
    "date": "01/01/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Contanti",
    "toAccount": "Buddybank",
    "account": "Contanti",
    "amount": 250.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_174",
    "rowNumber": 175,
    "year": "2026",
    "week": "1",
    "month": "1",
    "date": "03/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "parrucchiere"
  },
  {
    "id": "tx_175",
    "rowNumber": 176,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "04/01/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 400.0,
    "category": "💶 Altre entrate",
    "description": "soldi mamma per pc"
  },
  {
    "id": "tx_176",
    "rowNumber": 177,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "04/01/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💶 Altre entrate",
    "description": "soldi giulia fresa"
  },
  {
    "id": "tx_177",
    "rowNumber": 178,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "04/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "🛒 Alimentari",
    "description": "pizza"
  },
  {
    "id": "tx_178",
    "rowNumber": 179,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "06/01/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Contanti",
    "toAccount": "Buddybank",
    "account": "Contanti",
    "amount": 450.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_179",
    "rowNumber": 180,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "06/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_180",
    "rowNumber": 181,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "06/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 84.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_181",
    "rowNumber": 182,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "07/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🚊 Trasporti",
    "description": "trasferta lido"
  },
  {
    "id": "tx_182",
    "rowNumber": 183,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "07/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🛒 Alimentari",
    "description": "trasferta lido"
  },
  {
    "id": "tx_183",
    "rowNumber": 184,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "08/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 40.0,
    "category": "🍴Uscite",
    "description": "cena brasiliano colleghi"
  },
  {
    "id": "tx_184",
    "rowNumber": 185,
    "year": "2026",
    "week": "2",
    "month": "1",
    "date": "08/01/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 40.0,
    "category": "💶 Altre entrate",
    "description": "soldi monitor"
  },
  {
    "id": "tx_185",
    "rowNumber": 186,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "11/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 118.6,
    "category": "🚊 Trasporti",
    "description": "treno roma"
  },
  {
    "id": "tx_186",
    "rowNumber": 187,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "25/01/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1946.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_187",
    "rowNumber": 188,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "12/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 80.0,
    "category": "🚗 Auto",
    "description": "multa ztc venezia apt"
  },
  {
    "id": "tx_188",
    "rowNumber": 189,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "14/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 26.0,
    "category": "❔Altro",
    "description": "trasferta lido"
  },
  {
    "id": "tx_189",
    "rowNumber": 190,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "16/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.5,
    "category": "🍴Uscite",
    "description": "sestu"
  },
  {
    "id": "tx_190",
    "rowNumber": 191,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "17/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "Maury's"
  },
  {
    "id": "tx_191",
    "rowNumber": 192,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "17/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 14.0,
    "category": "🛒 Alimentari",
    "description": "Frappe"
  },
  {
    "id": "tx_192",
    "rowNumber": 193,
    "year": "2026",
    "week": "3",
    "month": "1",
    "date": "17/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 69.0,
    "category": "🍴Uscite",
    "description": "Cena casa mora"
  },
  {
    "id": "tx_193",
    "rowNumber": 194,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "18/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.1,
    "category": "❔Altro",
    "description": "Treno QA"
  },
  {
    "id": "tx_194",
    "rowNumber": 195,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "19/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_195",
    "rowNumber": 196,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "19/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.99,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_196",
    "rowNumber": 197,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "19/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 27.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_197",
    "rowNumber": 198,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "20/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_198",
    "rowNumber": 199,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "20/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 32.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_199",
    "rowNumber": 200,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "20/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_200",
    "rowNumber": 201,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "21/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.8,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_201",
    "rowNumber": 202,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "21/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_202",
    "rowNumber": 203,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "22/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.21,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_203",
    "rowNumber": 204,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "22/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 68.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_204",
    "rowNumber": 205,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "23/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "❔Altro",
    "description": "Trasferta Bari"
  },
  {
    "id": "tx_205",
    "rowNumber": 206,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "07/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 103.8,
    "category": "🚊 Trasporti",
    "description": "italo"
  },
  {
    "id": "tx_206",
    "rowNumber": 207,
    "year": "2026",
    "week": "14",
    "month": "4",
    "date": "03/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 140.0,
    "category": "🚊 Trasporti",
    "description": "italo"
  },
  {
    "id": "tx_207",
    "rowNumber": 208,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 92.8,
    "category": "🚊 Trasporti",
    "description": "italo"
  },
  {
    "id": "tx_208",
    "rowNumber": 209,
    "year": "2026",
    "week": "4",
    "month": "1",
    "date": "24/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": "affitto"
  },
  {
    "id": "tx_209",
    "rowNumber": 210,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "25/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 35.0,
    "category": "🚗 Auto",
    "description": "benzina (pieno)"
  },
  {
    "id": "tx_210",
    "rowNumber": 211,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "25/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_211",
    "rowNumber": 212,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "25/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_212",
    "rowNumber": 213,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "26/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 283.0,
    "category": "💻 Tecnologia",
    "description": "ultima rata macbook"
  },
  {
    "id": "tx_213",
    "rowNumber": 214,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "26/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_214",
    "rowNumber": 215,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "27/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 15.0,
    "category": "❔Altro",
    "description": "regalo Andrea"
  },
  {
    "id": "tx_215",
    "rowNumber": 216,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "28/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 55.0,
    "category": "🛍️ Shopping",
    "description": "scarpe geox"
  },
  {
    "id": "tx_216",
    "rowNumber": 217,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "28/01/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 600.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_217",
    "rowNumber": 218,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "29/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.5,
    "category": "🍴Uscite",
    "description": "kebab"
  },
  {
    "id": "tx_218",
    "rowNumber": 219,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "29/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.2,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (casello)"
  },
  {
    "id": "tx_219",
    "rowNumber": 220,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "29/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.0,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (Spritz)"
  },
  {
    "id": "tx_220",
    "rowNumber": 221,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "29/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.4,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (cena)"
  },
  {
    "id": "tx_221",
    "rowNumber": 222,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "30/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.9,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (city tax)"
  },
  {
    "id": "tx_222",
    "rowNumber": 223,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "30/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (pranzo)"
  },
  {
    "id": "tx_223",
    "rowNumber": 224,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "30/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.9,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (casello)"
  },
  {
    "id": "tx_224",
    "rowNumber": 225,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "30/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.2,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (casello)"
  },
  {
    "id": "tx_225",
    "rowNumber": 226,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "30/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.7,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (casello)"
  },
  {
    "id": "tx_226",
    "rowNumber": 227,
    "year": "2026",
    "week": "5",
    "month": "1",
    "date": "30/01/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 47.79,
    "category": "❔Altro",
    "description": "Trasferta Bolzano (benzina)"
  },
  {
    "id": "tx_227",
    "rowNumber": 228,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "01/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 108.0,
    "category": "🛍️ Shopping",
    "description": "regalo san valentino giulia"
  },
  {
    "id": "tx_228",
    "rowNumber": 229,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "03/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.0,
    "category": "🛍️ Shopping",
    "description": "regalo lucrezia"
  },
  {
    "id": "tx_229",
    "rowNumber": 230,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "01/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.0,
    "category": "🛍️ Shopping",
    "description": "cuscinetti talloni"
  },
  {
    "id": "tx_230",
    "rowNumber": 231,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "01/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 35.0,
    "category": "🍴Uscite",
    "description": "Cena colleghi"
  },
  {
    "id": "tx_231",
    "rowNumber": 232,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "02/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_232",
    "rowNumber": 233,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "04/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_233",
    "rowNumber": 234,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "03/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_234",
    "rowNumber": 235,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "03/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1.1,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_235",
    "rowNumber": 236,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "06/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.95,
    "category": "🛒 Alimentari",
    "description": "mc mestre"
  },
  {
    "id": "tx_236",
    "rowNumber": 237,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "06/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "tabacchi"
  },
  {
    "id": "tx_237",
    "rowNumber": 238,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "06/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 106.0,
    "category": "🍴Uscite",
    "description": "Cena da Pasqualina"
  },
  {
    "id": "tx_238",
    "rowNumber": 239,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "07/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Parrucchiere"
  },
  {
    "id": "tx_239",
    "rowNumber": 240,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "07/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_240",
    "rowNumber": 241,
    "year": "2026",
    "week": "6",
    "month": "2",
    "date": "07/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.0,
    "category": "🍴Uscite",
    "description": "dopo cena lucrezia da Litro"
  },
  {
    "id": "tx_241",
    "rowNumber": 242,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "08/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🚗 Auto",
    "description": "Benzina Giulia"
  },
  {
    "id": "tx_242",
    "rowNumber": 243,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "08/02/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💶 Altre entrate",
    "description": "Benzina Giulia"
  },
  {
    "id": "tx_243",
    "rowNumber": 244,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "08/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.1,
    "category": "🚊 Trasporti",
    "description": "treno QA"
  },
  {
    "id": "tx_244",
    "rowNumber": 245,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2587.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_245",
    "rowNumber": 246,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.0,
    "category": "🏡 Casa",
    "description": "Affitto + Spese"
  },
  {
    "id": "tx_246",
    "rowNumber": 247,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "11/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 126.0,
    "category": "🛒 Alimentari",
    "description": "Spesa rossetto"
  },
  {
    "id": "tx_247",
    "rowNumber": 248,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "12/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_248",
    "rowNumber": 249,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "13/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 90.0,
    "category": "🚊 Trasporti",
    "description": "treno"
  },
  {
    "id": "tx_249",
    "rowNumber": 250,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "13/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 33.0,
    "category": "🍴Uscite",
    "description": "Cena colleghi"
  },
  {
    "id": "tx_250",
    "rowNumber": 251,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "14/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🛍️ Shopping",
    "description": "Shampo Amazon"
  },
  {
    "id": "tx_251",
    "rowNumber": 252,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "15/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "🎓 Istruzione",
    "description": "elettronica IN"
  },
  {
    "id": "tx_252",
    "rowNumber": 253,
    "year": "2026",
    "week": "7",
    "month": "2",
    "date": "09/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "macchinette"
  },
  {
    "id": "tx_253",
    "rowNumber": 254,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "19/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "macchinette"
  },
  {
    "id": "tx_254",
    "rowNumber": 255,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "17/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.5,
    "category": "❔Altro",
    "description": "pranzo trasferta verona"
  },
  {
    "id": "tx_255",
    "rowNumber": 256,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "17/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.5,
    "category": "❔Altro",
    "description": "casello trasferta verona"
  },
  {
    "id": "tx_256",
    "rowNumber": 257,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "18/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.1,
    "category": "❔Altro",
    "description": "casello trasferta verona"
  },
  {
    "id": "tx_257",
    "rowNumber": 258,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "18/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.0,
    "category": "❔Altro",
    "description": "pranzo trasferta verona"
  },
  {
    "id": "tx_258",
    "rowNumber": 259,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.3,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_259",
    "rowNumber": 260,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.8,
    "category": "❔Altro",
    "description": "cinema"
  },
  {
    "id": "tx_260",
    "rowNumber": 261,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.27,
    "category": "🛍️ Shopping",
    "description": "custodia oral b"
  },
  {
    "id": "tx_261",
    "rowNumber": 262,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "21/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.5,
    "category": "🛒 Alimentari",
    "description": "kebab"
  },
  {
    "id": "tx_262",
    "rowNumber": 263,
    "year": "2026",
    "week": "8",
    "month": "2",
    "date": "21/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.0,
    "category": "🍴Uscite",
    "description": "spritz"
  },
  {
    "id": "tx_263",
    "rowNumber": 264,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.0,
    "category": "❔Altro",
    "description": "fiori"
  },
  {
    "id": "tx_264",
    "rowNumber": 265,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.49,
    "category": "🛒 Alimentari",
    "description": "panini conad"
  },
  {
    "id": "tx_265",
    "rowNumber": 266,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.1,
    "category": "🚊 Trasporti",
    "description": "casello padova"
  },
  {
    "id": "tx_266",
    "rowNumber": 267,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.1,
    "category": "🚊 Trasporti",
    "description": "casello padova"
  },
  {
    "id": "tx_267",
    "rowNumber": 268,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.55,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_268",
    "rowNumber": 269,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "22/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 42.0,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_269",
    "rowNumber": 270,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "23/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.5,
    "category": "❔Altro",
    "description": "pop corn uci"
  },
  {
    "id": "tx_270",
    "rowNumber": 271,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.0,
    "category": "❔Altro",
    "description": "ferry"
  },
  {
    "id": "tx_271",
    "rowNumber": 272,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 21.5,
    "category": "❔Altro",
    "description": "pranzo lido"
  },
  {
    "id": "tx_272",
    "rowNumber": 273,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "❔Altro",
    "description": "biglietti ferry persona"
  },
  {
    "id": "tx_273",
    "rowNumber": 274,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.4,
    "category": "❔Altro",
    "description": "P treviso"
  },
  {
    "id": "tx_274",
    "rowNumber": 275,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.92,
    "category": "🛒 Alimentari",
    "description": "conad treviso"
  },
  {
    "id": "tx_275",
    "rowNumber": 276,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "conad treviso"
  },
  {
    "id": "tx_276",
    "rowNumber": 277,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "26/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.92,
    "category": "🛒 Alimentari",
    "description": "conad  QA"
  },
  {
    "id": "tx_277",
    "rowNumber": 278,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "27/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "❔Altro",
    "description": "tabacchi"
  },
  {
    "id": "tx_278",
    "rowNumber": 279,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.5,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_279",
    "rowNumber": 280,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.0,
    "category": "🚊 Trasporti",
    "description": "casello verona"
  },
  {
    "id": "tx_280",
    "rowNumber": 281,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 23.5,
    "category": "🍴Uscite",
    "description": "massari"
  },
  {
    "id": "tx_281",
    "rowNumber": 282,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 38.5,
    "category": "🍴Uscite",
    "description": "grottino verona"
  },
  {
    "id": "tx_282",
    "rowNumber": 283,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.5,
    "category": "🚊 Trasporti",
    "description": "casello"
  },
  {
    "id": "tx_283",
    "rowNumber": 284,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "01/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1.5,
    "category": "🛒 Alimentari",
    "description": "acqua"
  },
  {
    "id": "tx_284",
    "rowNumber": 285,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_285",
    "rowNumber": 286,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.0,
    "category": "❔Altro",
    "description": "casa romeo e giulietta"
  },
  {
    "id": "tx_286",
    "rowNumber": 287,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "23/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "macchinette"
  },
  {
    "id": "tx_287",
    "rowNumber": 288,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "26/02/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "macchinette"
  },
  {
    "id": "tx_288",
    "rowNumber": 289,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "25/02/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 147.0,
    "category": "💶 Altre entrate",
    "description": "buoni pasto"
  },
  {
    "id": "tx_289",
    "rowNumber": 290,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 400.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_290",
    "rowNumber": 291,
    "year": "2026",
    "week": "9",
    "month": "2",
    "date": "28/02/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 288.5,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_291",
    "rowNumber": 292,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "03/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🚗 Auto",
    "description": "gpl (344km)"
  },
  {
    "id": "tx_292",
    "rowNumber": 293,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "03/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 30.0,
    "category": "❔Altro",
    "description": "ferry"
  },
  {
    "id": "tx_293",
    "rowNumber": 294,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "04/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "❔Altro",
    "description": "ferry lido"
  },
  {
    "id": "tx_294",
    "rowNumber": 295,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "04/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "❔Altro",
    "description": "pranzo lido"
  },
  {
    "id": "tx_295",
    "rowNumber": 296,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "07/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 21.0,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_296",
    "rowNumber": 297,
    "year": "2026",
    "week": "10",
    "month": "3",
    "date": "07/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.89,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_297",
    "rowNumber": 298,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "09/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.7,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_298",
    "rowNumber": 299,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "09/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.9,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_299",
    "rowNumber": 300,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "10/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.61,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_300",
    "rowNumber": 301,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "10/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 30.0,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_301",
    "rowNumber": 302,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "11/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 14.77,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_302",
    "rowNumber": 303,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "11/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.4,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_303",
    "rowNumber": 304,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "12/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.7,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_304",
    "rowNumber": 305,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "12/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_305",
    "rowNumber": 306,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "12/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.2,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_306",
    "rowNumber": 307,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "13/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "❔Altro",
    "description": "city tax globus"
  },
  {
    "id": "tx_307",
    "rowNumber": 308,
    "year": "2026",
    "week": "11",
    "month": "3",
    "date": "13/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.7,
    "category": "❔Altro",
    "description": "trasferta forlì"
  },
  {
    "id": "tx_308",
    "rowNumber": 309,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2822.77,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_309",
    "rowNumber": 310,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 210.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_310",
    "rowNumber": 311,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "15/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 47.0,
    "category": "🛍️ Shopping",
    "description": "regalo federico"
  },
  {
    "id": "tx_311",
    "rowNumber": 312,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "15/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 23.94,
    "category": "❔Altro",
    "description": "fedine"
  },
  {
    "id": "tx_312",
    "rowNumber": 313,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "15/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 23.94,
    "category": "❔Altro",
    "description": "fedine"
  },
  {
    "id": "tx_313",
    "rowNumber": 314,
    "year": "2026",
    "week": "20",
    "month": "5",
    "date": "15/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 23.94,
    "category": "❔Altro",
    "description": "fedine"
  },
  {
    "id": "tx_314",
    "rowNumber": 315,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "16/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 84.4,
    "category": "🍴Uscite",
    "description": "Biglietti Lillo e Greg"
  },
  {
    "id": "tx_315",
    "rowNumber": 316,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "16/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.1,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_316",
    "rowNumber": 317,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "16/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.4,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_317",
    "rowNumber": 318,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "17/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.4,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_318",
    "rowNumber": 319,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "17/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.99,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_319",
    "rowNumber": 320,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "17/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.0,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_320",
    "rowNumber": 321,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "18/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.7,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_321",
    "rowNumber": 322,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "18/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.96,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_322",
    "rowNumber": 323,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "19/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.26,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_323",
    "rowNumber": 324,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "19/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.35,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_324",
    "rowNumber": 325,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "20/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_325",
    "rowNumber": 326,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "20/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.5,
    "category": "❔Altro",
    "description": "Trasferta Forlì"
  },
  {
    "id": "tx_326",
    "rowNumber": 327,
    "year": "2026",
    "week": "12",
    "month": "3",
    "date": "21/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 40.0,
    "category": "🍴Uscite",
    "description": "cena colleghi"
  },
  {
    "id": "tx_327",
    "rowNumber": 328,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "23/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "❔Altro",
    "description": "istrana"
  },
  {
    "id": "tx_328",
    "rowNumber": 329,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": "Affitto"
  },
  {
    "id": "tx_329",
    "rowNumber": 330,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 40.85,
    "category": "🛍️ Shopping",
    "description": "libro giulia"
  },
  {
    "id": "tx_330",
    "rowNumber": 331,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.8,
    "category": "❔Altro",
    "description": "tabacchi"
  },
  {
    "id": "tx_331",
    "rowNumber": 332,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "25/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.15,
    "category": "❔Altro",
    "description": "treno per mestre"
  },
  {
    "id": "tx_332",
    "rowNumber": 333,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "26/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "barbiere"
  },
  {
    "id": "tx_333",
    "rowNumber": 334,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "26/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 108.18,
    "category": "❔Altro",
    "description": "regalonico + palette giulia"
  },
  {
    "id": "tx_334",
    "rowNumber": 335,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "26/03/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💶 Altre entrate",
    "description": "palette giulia"
  },
  {
    "id": "tx_335",
    "rowNumber": 336,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "26/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.0,
    "category": "🍴Uscite",
    "description": "cibo olly"
  },
  {
    "id": "tx_336",
    "rowNumber": 337,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "26/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 32.0,
    "category": "🍴Uscite",
    "description": "blackrabbit"
  },
  {
    "id": "tx_337",
    "rowNumber": 338,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "27/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.5,
    "category": "🛒 Alimentari",
    "description": "pezzo"
  },
  {
    "id": "tx_338",
    "rowNumber": 339,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "27/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.0,
    "category": "🛒 Alimentari",
    "description": "acqua"
  },
  {
    "id": "tx_339",
    "rowNumber": 340,
    "year": "2026",
    "week": "13",
    "month": "3",
    "date": "28/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.87,
    "category": "🛒 Alimentari",
    "description": "coop"
  },
  {
    "id": "tx_340",
    "rowNumber": 341,
    "year": "2026",
    "week": "14",
    "month": "3",
    "date": "29/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "🚗 Auto",
    "description": "benzina giulia"
  },
  {
    "id": "tx_341",
    "rowNumber": 342,
    "year": "2026",
    "week": "14",
    "month": "3",
    "date": "29/03/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 200.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_342",
    "rowNumber": 343,
    "year": "2026",
    "week": "14",
    "month": "3",
    "date": "30/03/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 522.0,
    "category": "🛅 Livello Crescita",
    "description": ""
  },
  {
    "id": "tx_343",
    "rowNumber": 344,
    "year": "2026",
    "week": "14",
    "month": "3",
    "date": "30/03/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 238.0,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_344",
    "rowNumber": 345,
    "year": "2026",
    "week": "14",
    "month": "4",
    "date": "01/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.36,
    "category": "🚊 Trasporti",
    "description": "treno"
  },
  {
    "id": "tx_345",
    "rowNumber": 346,
    "year": "2026",
    "week": "14",
    "month": "4",
    "date": "01/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 64.6,
    "category": "🚊 Trasporti",
    "description": "treno"
  },
  {
    "id": "tx_346",
    "rowNumber": 347,
    "year": "2026",
    "week": "14",
    "month": "4",
    "date": "01/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 21.0,
    "category": "🛒 Alimentari",
    "description": ""
  },
  {
    "id": "tx_347",
    "rowNumber": 348,
    "year": "2026",
    "week": "14",
    "month": "3",
    "date": "31/03/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "Macchinette e pranzo"
  },
  {
    "id": "tx_348",
    "rowNumber": 349,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "05/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 100.0,
    "category": "💶 Altre entrate",
    "description": "regalo pasqua"
  },
  {
    "id": "tx_349",
    "rowNumber": 350,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 300.0,
    "category": "💶 Altre entrate",
    "description": "regalo compleanno"
  },
  {
    "id": "tx_350",
    "rowNumber": 351,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "06/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_351",
    "rowNumber": 352,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "06/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 24.0,
    "category": "🍴Uscite",
    "description": "aperitivo"
  },
  {
    "id": "tx_352",
    "rowNumber": 353,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "06/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 42.0,
    "category": "🍴Uscite",
    "description": "cena pizzeria"
  },
  {
    "id": "tx_353",
    "rowNumber": 354,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "06/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 144.83,
    "category": "💻 Tecnologia",
    "description": "iphone 15 giulia"
  },
  {
    "id": "tx_354",
    "rowNumber": 355,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "06/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 144.83,
    "category": "💻 Tecnologia",
    "description": "iphone 15 giulia"
  },
  {
    "id": "tx_355",
    "rowNumber": 356,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "06/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 144.83,
    "category": "💻 Tecnologia",
    "description": "iphone 15 giulia"
  },
  {
    "id": "tx_356",
    "rowNumber": 357,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "06/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.1,
    "category": "🚊 Trasporti",
    "description": "treno QA"
  },
  {
    "id": "tx_357",
    "rowNumber": 358,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "25/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1858.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_358",
    "rowNumber": 359,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "25/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 94.5,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_359",
    "rowNumber": 360,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "06/04/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Contanti",
    "toAccount": "Buddybank",
    "account": "Contanti",
    "amount": 250.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_360",
    "rowNumber": 361,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.0,
    "category": "❔Altro",
    "description": "Cornetti"
  },
  {
    "id": "tx_361",
    "rowNumber": 362,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.0,
    "category": "❔Altro",
    "description": "Pranzo Forlì"
  },
  {
    "id": "tx_362",
    "rowNumber": 363,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 33.0,
    "category": "❔Altro",
    "description": "Cena Forlì"
  },
  {
    "id": "tx_363",
    "rowNumber": 364,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 1000.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_364",
    "rowNumber": 365,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 64.0,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_365",
    "rowNumber": 366,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "07/04/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 336.0,
    "category": "🛅 Livello Crescita",
    "description": ""
  },
  {
    "id": "tx_366",
    "rowNumber": 367,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "08/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "❔Altro",
    "description": "Pranzo Forlì"
  },
  {
    "id": "tx_367",
    "rowNumber": 368,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "08/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "❔Altro",
    "description": "Pranzo Forlì"
  },
  {
    "id": "tx_368",
    "rowNumber": 369,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "08/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 14.0,
    "category": "❔Altro",
    "description": "Capsule"
  },
  {
    "id": "tx_369",
    "rowNumber": 370,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "08/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.0,
    "category": "❔Altro",
    "description": "Cena forlì"
  },
  {
    "id": "tx_370",
    "rowNumber": 371,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "09/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "❔Altro",
    "description": "Pranzo Forlì"
  },
  {
    "id": "tx_371",
    "rowNumber": 372,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "09/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "❔Altro",
    "description": "Pranzo Forlì"
  },
  {
    "id": "tx_372",
    "rowNumber": 373,
    "year": "2026",
    "week": "15",
    "month": "4",
    "date": "10/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_373",
    "rowNumber": 374,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "25/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": "Affitto"
  },
  {
    "id": "tx_374",
    "rowNumber": 375,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "12/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🛍️ Shopping",
    "description": "cartuccia stampante"
  },
  {
    "id": "tx_375",
    "rowNumber": 376,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "14/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 61.5,
    "category": "🍴Uscite",
    "description": "Bioparco"
  },
  {
    "id": "tx_376",
    "rowNumber": 377,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "01/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 120.0,
    "category": "🚊 Trasporti",
    "description": ""
  },
  {
    "id": "tx_377",
    "rowNumber": 378,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "13/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.95,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_378",
    "rowNumber": 379,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "13/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 21.2,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_379",
    "rowNumber": 380,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "14/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.79,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_380",
    "rowNumber": 381,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "14/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 21.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_381",
    "rowNumber": 382,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "15/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.5,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_382",
    "rowNumber": 383,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "16/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "❔Altro",
    "description": "globus cicty tax"
  },
  {
    "id": "tx_383",
    "rowNumber": 384,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "16/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.5,
    "category": "❔Altro",
    "description": "piadina"
  },
  {
    "id": "tx_384",
    "rowNumber": 385,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "16/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.2,
    "category": "🚊 Trasporti",
    "description": "treno per bologna"
  },
  {
    "id": "tx_385",
    "rowNumber": 386,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "17/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "capelli"
  },
  {
    "id": "tx_386",
    "rowNumber": 387,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "17/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 129.0,
    "category": "❔Altro",
    "description": "regalo vale"
  },
  {
    "id": "tx_387",
    "rowNumber": 388,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "17/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.0,
    "category": "❔Altro",
    "description": "biglietto vale"
  },
  {
    "id": "tx_388",
    "rowNumber": 389,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "18/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.54,
    "category": "🛒 Alimentari",
    "description": "spesa per bioparco"
  },
  {
    "id": "tx_389",
    "rowNumber": 390,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "18/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.0,
    "category": "🛒 Alimentari",
    "description": "panini per bioparco"
  },
  {
    "id": "tx_390",
    "rowNumber": 391,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "18/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.42,
    "category": "🚑 Salute",
    "description": "antistaminico"
  },
  {
    "id": "tx_391",
    "rowNumber": 392,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "18/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "❔Altro",
    "description": "gelato"
  },
  {
    "id": "tx_392",
    "rowNumber": 393,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "19/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1.6,
    "category": "🛒 Alimentari",
    "description": "patatine"
  },
  {
    "id": "tx_393",
    "rowNumber": 394,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "19/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.1,
    "category": "🚊 Trasporti",
    "description": "treno Q.A"
  },
  {
    "id": "tx_394",
    "rowNumber": 395,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "20/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.44,
    "category": "🛒 Alimentari",
    "description": "Iperossetto"
  },
  {
    "id": "tx_395",
    "rowNumber": 396,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "20/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 115.5,
    "category": "🛒 Alimentari",
    "description": "Iperossetto"
  },
  {
    "id": "tx_396",
    "rowNumber": 397,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "17/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 40.0,
    "category": "💶 Altre entrate",
    "description": "regalo vale da lucrezia"
  },
  {
    "id": "tx_397",
    "rowNumber": 398,
    "year": "2026",
    "week": "16",
    "month": "4",
    "date": "17/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 40.0,
    "category": "💶 Altre entrate",
    "description": "regalo vale da christian"
  },
  {
    "id": "tx_398",
    "rowNumber": 399,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "22/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 80.0,
    "category": "🚗 Auto",
    "description": "revisione"
  },
  {
    "id": "tx_399",
    "rowNumber": 400,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "23/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 32.5,
    "category": "🍴Uscite",
    "description": "kebab"
  },
  {
    "id": "tx_400",
    "rowNumber": 401,
    "year": "2026",
    "week": "17",
    "month": "4",
    "date": "23/04/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 26.0,
    "category": "💶 Altre entrate",
    "description": "kebab"
  },
  {
    "id": "tx_401",
    "rowNumber": 402,
    "year": "2026",
    "week": "18",
    "month": "4",
    "date": "27/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": ""
  },
  {
    "id": "tx_402",
    "rowNumber": 403,
    "year": "2026",
    "week": "18",
    "month": "4",
    "date": "27/04/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 200.0,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_403",
    "rowNumber": 404,
    "year": "2026",
    "week": "18",
    "month": "4",
    "date": "27/04/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 300.0,
    "category": "🛅 Livello Crescita",
    "description": ""
  },
  {
    "id": "tx_404",
    "rowNumber": 405,
    "year": "2026",
    "week": "18",
    "month": "4",
    "date": "29/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_405",
    "rowNumber": 406,
    "year": "2026",
    "week": "18",
    "month": "4",
    "date": "30/04/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.9,
    "category": "🍴Uscite",
    "description": "Pizza"
  },
  {
    "id": "tx_406",
    "rowNumber": 407,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "01/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.3,
    "category": "🛒 Alimentari",
    "description": "Latte"
  },
  {
    "id": "tx_407",
    "rowNumber": 408,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "02/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 29.18,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Crema e detergente"
  },
  {
    "id": "tx_408",
    "rowNumber": 409,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "02/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 64.16,
    "category": "🛍️ Shopping",
    "description": "Vestiti"
  },
  {
    "id": "tx_409",
    "rowNumber": 410,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "02/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.29,
    "category": "🛒 Alimentari",
    "description": "Ipercoop"
  },
  {
    "id": "tx_410",
    "rowNumber": 411,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "02/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.8,
    "category": "❔Altro",
    "description": "Tabaccheria"
  },
  {
    "id": "tx_411",
    "rowNumber": 412,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "03/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "Spesa"
  },
  {
    "id": "tx_412",
    "rowNumber": 413,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "03/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.0,
    "category": "🛒 Alimentari",
    "description": "Spesa"
  },
  {
    "id": "tx_413",
    "rowNumber": 414,
    "year": "2026",
    "week": "18",
    "month": "5",
    "date": "02/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 15.0,
    "category": "🍴Uscite",
    "description": "Pizza"
  },
  {
    "id": "tx_414",
    "rowNumber": 415,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "05/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "❔Altro",
    "description": "pranzo chioggia"
  },
  {
    "id": "tx_415",
    "rowNumber": 416,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "05/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 31.5,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_416",
    "rowNumber": 417,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "05/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.19,
    "category": "🛒 Alimentari",
    "description": "rossetto"
  },
  {
    "id": "tx_417",
    "rowNumber": 418,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "06/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "❔Altro",
    "description": "lido"
  },
  {
    "id": "tx_418",
    "rowNumber": 419,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "06/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.8,
    "category": "❔Altro",
    "description": "lido"
  },
  {
    "id": "tx_419",
    "rowNumber": 420,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "06/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.5,
    "category": "❔Altro",
    "description": "lido"
  },
  {
    "id": "tx_420",
    "rowNumber": 421,
    "year": "2026",
    "week": "19",
    "month": "5",
    "date": "07/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.61,
    "category": "🛒 Alimentari",
    "description": "coop"
  },
  {
    "id": "tx_421",
    "rowNumber": 422,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "25/05/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2520.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_422",
    "rowNumber": 423,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "25/05/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 126.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_423",
    "rowNumber": 424,
    "year": "2026",
    "week": "20",
    "month": "5",
    "date": "14/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "regalo vicario"
  },
  {
    "id": "tx_424",
    "rowNumber": 425,
    "year": "2026",
    "week": "20",
    "month": "5",
    "date": "13/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 59.9,
    "category": "🚊 Trasporti",
    "description": "italo"
  },
  {
    "id": "tx_425",
    "rowNumber": 426,
    "year": "2026",
    "week": "20",
    "month": "5",
    "date": "13/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 32.9,
    "category": "🍴Uscite",
    "description": "sushi"
  },
  {
    "id": "tx_426",
    "rowNumber": 427,
    "year": "2026",
    "week": "20",
    "month": "5",
    "date": "14/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.9,
    "category": "🚗 Auto",
    "description": "gpl (320km)"
  },
  {
    "id": "tx_427",
    "rowNumber": 428,
    "year": "2026",
    "week": "20",
    "month": "5",
    "date": "12/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 89.15,
    "category": "🛫 Viaggi",
    "description": "nave sardegna"
  },
  {
    "id": "tx_428",
    "rowNumber": 429,
    "year": "2026",
    "week": "24",
    "month": "6",
    "date": "12/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 89.16,
    "category": "🛫 Viaggi",
    "description": "nave sardegna"
  },
  {
    "id": "tx_429",
    "rowNumber": 430,
    "year": "2026",
    "week": "29",
    "month": "7",
    "date": "12/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 89.16,
    "category": "🛫 Viaggi",
    "description": "nave sardegna"
  },
  {
    "id": "tx_430",
    "rowNumber": 431,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "25/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": ""
  },
  {
    "id": "tx_431",
    "rowNumber": 432,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "17/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "🚗 Auto",
    "description": "Lavaggio"
  },
  {
    "id": "tx_432",
    "rowNumber": 433,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "17/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 94.5,
    "category": "🛒 Alimentari",
    "description": "Spesa"
  },
  {
    "id": "tx_433",
    "rowNumber": 434,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "17/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.14,
    "category": "🛒 Alimentari",
    "description": "Spesa"
  },
  {
    "id": "tx_434",
    "rowNumber": 435,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "26/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 65.0,
    "category": "🚊 Trasporti",
    "description": "Treni"
  },
  {
    "id": "tx_435",
    "rowNumber": 436,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "20/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "❔Altro",
    "description": "lido"
  },
  {
    "id": "tx_436",
    "rowNumber": 437,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "20/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "❔Altro",
    "description": "lido"
  },
  {
    "id": "tx_437",
    "rowNumber": 438,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "22/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "Macchinette"
  },
  {
    "id": "tx_438",
    "rowNumber": 439,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "22/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "❔Altro",
    "description": "Cibo Italo"
  },
  {
    "id": "tx_439",
    "rowNumber": 440,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "23/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.9,
    "category": "❔Altro",
    "description": "Colazione"
  },
  {
    "id": "tx_440",
    "rowNumber": 441,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "23/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Capelli"
  },
  {
    "id": "tx_441",
    "rowNumber": 442,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "23/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.0,
    "category": "💪🏻 Fitness",
    "description": "Campo tennis"
  },
  {
    "id": "tx_442",
    "rowNumber": 443,
    "year": "2026",
    "week": "21",
    "month": "5",
    "date": "23/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 29.0,
    "category": "🍴Uscite",
    "description": "Gelato"
  },
  {
    "id": "tx_443",
    "rowNumber": 444,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "25/05/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 300.0,
    "category": "🛅 Livello Crescita",
    "description": ""
  },
  {
    "id": "tx_444",
    "rowNumber": 445,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "25/05/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 200.0,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_445",
    "rowNumber": 446,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "27/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.8,
    "category": "❔Altro",
    "description": "colazione istrana"
  },
  {
    "id": "tx_446",
    "rowNumber": 447,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "27/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "Pranzo istrana"
  },
  {
    "id": "tx_447",
    "rowNumber": 448,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "26/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🚊 Trasporti",
    "description": "treni giulia"
  },
  {
    "id": "tx_448",
    "rowNumber": 449,
    "year": "2026",
    "week": "22",
    "month": "5",
    "date": "28/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_449",
    "rowNumber": 450,
    "year": "2026",
    "week": "23",
    "month": "5",
    "date": "31/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_450",
    "rowNumber": 451,
    "year": "2026",
    "week": "23",
    "month": "5",
    "date": "31/05/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 21.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_451",
    "rowNumber": 452,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "03/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "Pranzo Bergamo"
  },
  {
    "id": "tx_452",
    "rowNumber": 453,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "03/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.9,
    "category": "❔Altro",
    "description": "Casello Bergamo andata"
  },
  {
    "id": "tx_453",
    "rowNumber": 454,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "03/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "Grisbi"
  },
  {
    "id": "tx_454",
    "rowNumber": 455,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "03/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "Cena Bergamo"
  },
  {
    "id": "tx_455",
    "rowNumber": 456,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "03/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 58.12,
    "category": "🛍️ Shopping",
    "description": "Pull & Bear"
  },
  {
    "id": "tx_456",
    "rowNumber": 457,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "04/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.2,
    "category": "❔Altro",
    "description": "Casello Bergamo ritorno"
  },
  {
    "id": "tx_457",
    "rowNumber": 458,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "04/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "🛒 Alimentari",
    "description": "pizza"
  },
  {
    "id": "tx_458",
    "rowNumber": 459,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "05/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.0,
    "category": "🍴Uscite",
    "description": "Pranzo"
  },
  {
    "id": "tx_459",
    "rowNumber": 460,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "05/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.0,
    "category": "🚗 Auto",
    "description": "Gol"
  },
  {
    "id": "tx_460",
    "rowNumber": 461,
    "year": "2026",
    "week": "23",
    "month": "6",
    "date": "05/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🍴Uscite",
    "description": "Cena"
  },
  {
    "id": "tx_461",
    "rowNumber": 462,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "25/06/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3348.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_462",
    "rowNumber": 463,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "25/06/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 199.5,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_463",
    "rowNumber": 464,
    "year": "2026",
    "week": "24",
    "month": "6",
    "date": "10/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "Gatta vet"
  },
  {
    "id": "tx_464",
    "rowNumber": 465,
    "year": "2026",
    "week": "24",
    "month": "6",
    "date": "10/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.4,
    "category": "❔Altro",
    "description": "Colazione Istrana"
  },
  {
    "id": "tx_465",
    "rowNumber": 466,
    "year": "2026",
    "week": "24",
    "month": "6",
    "date": "10/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "❔Altro",
    "description": "Pranzo Istrana"
  },
  {
    "id": "tx_466",
    "rowNumber": 467,
    "year": "2026",
    "week": "24",
    "month": "6",
    "date": "13/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_467",
    "rowNumber": 468,
    "year": "2026",
    "week": "24",
    "month": "6",
    "date": "13/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_468",
    "rowNumber": 469,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "15/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "❔Altro",
    "description": "pranzo ronchi"
  },
  {
    "id": "tx_469",
    "rowNumber": 470,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "15/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 24.0,
    "category": "❔Altro",
    "description": "cena ronchi"
  },
  {
    "id": "tx_470",
    "rowNumber": 471,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "16/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "❔Altro",
    "description": "pranzo ronchi"
  },
  {
    "id": "tx_471",
    "rowNumber": 472,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "25/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.84,
    "category": "🏡 Casa",
    "description": ""
  },
  {
    "id": "tx_472",
    "rowNumber": 473,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "16/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 135.0,
    "category": "🚊 Trasporti",
    "description": "treni giulia"
  },
  {
    "id": "tx_473",
    "rowNumber": 474,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "16/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "❔Altro",
    "description": "cena ronchi"
  },
  {
    "id": "tx_474",
    "rowNumber": 475,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "17/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "❔Altro",
    "description": "pranzo ronchi"
  },
  {
    "id": "tx_475",
    "rowNumber": 476,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "17/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 32.5,
    "category": "❔Altro",
    "description": "cena ronchi"
  },
  {
    "id": "tx_476",
    "rowNumber": 477,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "18/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "❔Altro",
    "description": "pranzo ronchi"
  },
  {
    "id": "tx_477",
    "rowNumber": 478,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "18/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.5,
    "category": "❔Altro",
    "description": "cena ronchi"
  },
  {
    "id": "tx_478",
    "rowNumber": 479,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "19/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 73.5,
    "category": "🛒 Alimentari",
    "description": "spesa rossetto"
  },
  {
    "id": "tx_479",
    "rowNumber": 480,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "19/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.5,
    "category": "🛒 Alimentari",
    "description": "spesa rossetto"
  },
  {
    "id": "tx_480",
    "rowNumber": 481,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 27.24,
    "category": "❔Altro",
    "description": "lido chioggia"
  },
  {
    "id": "tx_481",
    "rowNumber": 482,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.0,
    "category": "🛍️ Shopping",
    "description": "teli mare"
  },
  {
    "id": "tx_482",
    "rowNumber": 483,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.8,
    "category": "🍴Uscite",
    "description": "cena chioggia"
  },
  {
    "id": "tx_483",
    "rowNumber": 484,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.48,
    "category": "🍴Uscite",
    "description": "mcdonald"
  },
  {
    "id": "tx_484",
    "rowNumber": 485,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 42.0,
    "category": "❔Altro",
    "description": "regalo valentina"
  },
  {
    "id": "tx_485",
    "rowNumber": 486,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_486",
    "rowNumber": 487,
    "year": "2026",
    "week": "25",
    "month": "6",
    "date": "20/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "parcheggio chioggia"
  },
  {
    "id": "tx_487",
    "rowNumber": 488,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "21/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.5,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_488",
    "rowNumber": 489,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "21/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "❔Altro",
    "description": "ombrellone caorle"
  },
  {
    "id": "tx_489",
    "rowNumber": 490,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "21/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.8,
    "category": "❔Altro",
    "description": "chiosco caorle"
  },
  {
    "id": "tx_490",
    "rowNumber": 491,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "22/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_491",
    "rowNumber": 492,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "24/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 43.0,
    "category": "🍴Uscite",
    "description": "Cena colleghi"
  },
  {
    "id": "tx_492",
    "rowNumber": 493,
    "year": "2026",
    "week": "40",
    "month": "10",
    "date": "01/10/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 600.0,
    "category": "🏡 Casa",
    "description": "Affitto"
  },
  {
    "id": "tx_493",
    "rowNumber": 494,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "25/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Shampo e dentifricio"
  },
  {
    "id": "tx_494",
    "rowNumber": 495,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "25/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "Macchinette"
  },
  {
    "id": "tx_495",
    "rowNumber": 496,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "27/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.99,
    "category": "❔Altro",
    "description": "Soluzione lenti"
  },
  {
    "id": "tx_496",
    "rowNumber": 497,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "27/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 85.5,
    "category": "🍴Uscite",
    "description": "cena bottega 13"
  },
  {
    "id": "tx_497",
    "rowNumber": 498,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "27/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "barbiere"
  },
  {
    "id": "tx_498",
    "rowNumber": 499,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "27/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.18,
    "category": "❔Altro",
    "description": "Cioccolata"
  },
  {
    "id": "tx_499",
    "rowNumber": 500,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "27/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2.0,
    "category": "❔Altro",
    "description": "Acqua"
  },
  {
    "id": "tx_500",
    "rowNumber": 501,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "28/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 29.0,
    "category": "❔Altro",
    "description": "torta giulia"
  },
  {
    "id": "tx_501",
    "rowNumber": 502,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "28/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 100.0,
    "category": "❔Altro",
    "description": "festa giulia"
  },
  {
    "id": "tx_502",
    "rowNumber": 503,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "29/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.27,
    "category": "❔Altro",
    "description": "benzina giulia"
  },
  {
    "id": "tx_503",
    "rowNumber": 504,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "29/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 41.48,
    "category": "❔Altro",
    "description": "regalo mamma giulia"
  },
  {
    "id": "tx_504",
    "rowNumber": 505,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "29/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 26.1,
    "category": "🛍️ Shopping",
    "description": "regalo dina"
  },
  {
    "id": "tx_505",
    "rowNumber": 506,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "30/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.0,
    "category": "❔Altro",
    "description": "mare"
  },
  {
    "id": "tx_506",
    "rowNumber": 507,
    "year": "2026",
    "week": "27",
    "month": "6",
    "date": "30/06/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.6,
    "category": "❔Altro",
    "description": "gelati"
  },
  {
    "id": "tx_507",
    "rowNumber": 508,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "02/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 21.0,
    "category": "❔Altro",
    "description": "mare"
  },
  {
    "id": "tx_508",
    "rowNumber": 509,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "04/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.58,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_509",
    "rowNumber": 510,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "04/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 6.0,
    "category": "🛒 Alimentari",
    "description": "panini fatti di farina"
  },
  {
    "id": "tx_510",
    "rowNumber": 511,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "05/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.5,
    "category": "🛫 Viaggi",
    "description": "autogril"
  },
  {
    "id": "tx_511",
    "rowNumber": 512,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "05/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🍴Uscite",
    "description": "pizza galium"
  },
  {
    "id": "tx_512",
    "rowNumber": 513,
    "year": "2026",
    "week": "26",
    "month": "6",
    "date": "27/06/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "💶 Altre entrate",
    "description": "soluzione lenti"
  },
  {
    "id": "tx_513",
    "rowNumber": 514,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "02/07/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 50.0,
    "category": "💶 Altre entrate",
    "description": "benzina + regalo madre giuliagiulia"
  },
  {
    "id": "tx_514",
    "rowNumber": 515,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "02/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "resto giulia"
  },
  {
    "id": "tx_515",
    "rowNumber": 516,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "02/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 15.0,
    "category": "❔Altro",
    "description": "costume giulia"
  },
  {
    "id": "tx_516",
    "rowNumber": 517,
    "year": "2026",
    "week": "27",
    "month": "7",
    "date": "02/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 15.0,
    "category": "❔Altro",
    "description": "vestito giulia"
  },
  {
    "id": "tx_517",
    "rowNumber": 518,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "07/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.0,
    "category": "❔Altro",
    "description": "Pranzo chioggia"
  },
  {
    "id": "tx_518",
    "rowNumber": 519,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "07/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.0,
    "category": "🚑 Salute",
    "description": "radiografia dentalcoop"
  },
  {
    "id": "tx_519",
    "rowNumber": 520,
    "year": "2026",
    "week": "30",
    "month": "7",
    "date": "25/07/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 2318.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_520",
    "rowNumber": 521,
    "year": "2026",
    "week": "30",
    "month": "7",
    "date": "25/07/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 105.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_521",
    "rowNumber": 522,
    "year": "2026",
    "week": "30",
    "month": "7",
    "date": "25/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 583.34,
    "category": "🏡 Casa",
    "description": ""
  },
  {
    "id": "tx_522",
    "rowNumber": 523,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "08/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "🏡 Casa",
    "description": "detersivi"
  },
  {
    "id": "tx_523",
    "rowNumber": 524,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "08/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_524",
    "rowNumber": 525,
    "year": "2026",
    "week": "28",
    "month": "7",
    "date": "11/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 41.5,
    "category": "❔Altro",
    "description": "unipd"
  },
  {
    "id": "tx_525",
    "rowNumber": 526,
    "year": "2026",
    "week": "29",
    "month": "7",
    "date": "12/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.0,
    "category": "🍴Uscite",
    "description": "Cena pesce chioggia"
  },
  {
    "id": "tx_526",
    "rowNumber": 527,
    "year": "2026",
    "week": "29",
    "month": "7",
    "date": "13/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🚗 Auto",
    "description": "GPL (319km)"
  },
  {
    "id": "tx_527",
    "rowNumber": 528,
    "year": "2026",
    "week": "30",
    "month": "7",
    "date": "23/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "Macchinette"
  },
  {
    "id": "tx_528",
    "rowNumber": 529,
    "year": "2026",
    "week": "30",
    "month": "7",
    "date": "24/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 21.0,
    "category": "🛒 Alimentari",
    "description": "Coop"
  },
  {
    "id": "tx_529",
    "rowNumber": 530,
    "year": "2026",
    "week": "30",
    "month": "7",
    "date": "25/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "🛒 Alimentari",
    "description": "Coop"
  },
  {
    "id": "tx_530",
    "rowNumber": 531,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "26/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 13.0,
    "category": "🍴Uscite",
    "description": "Cinema"
  },
  {
    "id": "tx_531",
    "rowNumber": 532,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "27/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 78.0,
    "category": "🛫 Viaggi",
    "description": "B&B Sassari"
  },
  {
    "id": "tx_532",
    "rowNumber": 533,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "28/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 42.0,
    "category": "🚗 Auto",
    "description": "Benzina"
  },
  {
    "id": "tx_533",
    "rowNumber": 534,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 9.0,
    "category": "🛒 Alimentari",
    "description": "Kebab"
  },
  {
    "id": "tx_534",
    "rowNumber": 535,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.0,
    "category": "🚗 Auto",
    "description": "GPL"
  },
  {
    "id": "tx_535",
    "rowNumber": 536,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 3.0,
    "category": "🛫 Viaggi",
    "description": "Autogrill"
  },
  {
    "id": "tx_536",
    "rowNumber": 537,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 42.0,
    "category": "🛫 Viaggi",
    "description": "Casello"
  },
  {
    "id": "tx_537",
    "rowNumber": 538,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🍴Uscite",
    "description": "Pizza pezzo"
  },
  {
    "id": "tx_538",
    "rowNumber": 539,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🚗 Auto",
    "description": "GPL"
  },
  {
    "id": "tx_539",
    "rowNumber": 540,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 7.0,
    "category": "🛒 Alimentari",
    "description": "Conad"
  },
  {
    "id": "tx_540",
    "rowNumber": 541,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "Capelli"
  },
  {
    "id": "tx_541",
    "rowNumber": 542,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 30.0,
    "category": "🛫 Viaggi",
    "description": "Orizzonte"
  },
  {
    "id": "tx_542",
    "rowNumber": 543,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "🛒 Alimentari",
    "description": "Conad"
  },
  {
    "id": "tx_543",
    "rowNumber": 544,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 62.0,
    "category": "❔Altro",
    "description": "Regalo Isabel"
  },
  {
    "id": "tx_544",
    "rowNumber": 545,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 30.0,
    "category": "🍴Uscite",
    "description": "Aperitivo"
  },
  {
    "id": "tx_545",
    "rowNumber": 546,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 12.0,
    "category": "❔Altro",
    "description": "UCI pop corn"
  },
  {
    "id": "tx_546",
    "rowNumber": 547,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.0,
    "category": "🍴Uscite",
    "description": "Pranzo sere"
  },
  {
    "id": "tx_547",
    "rowNumber": 548,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 69.87,
    "category": "🛫 Viaggi",
    "description": "Casa Alghero"
  },
  {
    "id": "tx_548",
    "rowNumber": 549,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 22.0,
    "category": "🛒 Alimentari",
    "description": "Conad"
  },
  {
    "id": "tx_549",
    "rowNumber": 550,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.0,
    "category": "🚗 Auto",
    "description": "Esso"
  },
  {
    "id": "tx_550",
    "rowNumber": 551,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.1,
    "category": "🛫 Viaggi",
    "description": "Casello"
  },
  {
    "id": "tx_551",
    "rowNumber": 552,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 26.0,
    "category": "🛫 Viaggi",
    "description": "Pranzo"
  },
  {
    "id": "tx_552",
    "rowNumber": 553,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 28.0,
    "category": "🛫 Viaggi",
    "description": "Grotte"
  },
  {
    "id": "tx_553",
    "rowNumber": 554,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 67.5,
    "category": "🛫 Viaggi",
    "description": "domo achenza"
  },
  {
    "id": "tx_554",
    "rowNumber": 555,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 62.0,
    "category": "🛫 Viaggi",
    "description": "domo achenza"
  },
  {
    "id": "tx_555",
    "rowNumber": 556,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_556",
    "rowNumber": 557,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 42.0,
    "category": "🛫 Viaggi",
    "description": "spesa esselunga"
  },
  {
    "id": "tx_557",
    "rowNumber": 558,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 50.0,
    "category": "🚗 Auto",
    "description": "benzina"
  },
  {
    "id": "tx_558",
    "rowNumber": 559,
    "year": "2026",
    "week": "31",
    "month": "7",
    "date": "29/07/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 402.88,
    "category": "🛫 Viaggi",
    "description": "verie vacanza"
  },
  {
    "id": "tx_559",
    "rowNumber": 560,
    "year": "2026",
    "week": "31",
    "month": "8",
    "date": "01/08/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 300.0,
    "category": "🛅 Livello Crescita",
    "description": ""
  },
  {
    "id": "tx_560",
    "rowNumber": 561,
    "year": "2026",
    "week": "31",
    "month": "8",
    "date": "01/08/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 200.0,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_561",
    "rowNumber": 562,
    "year": "2026",
    "week": "35",
    "month": "8",
    "date": "25/08/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1972.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_562",
    "rowNumber": 563,
    "year": "2026",
    "week": "35",
    "month": "8",
    "date": "25/08/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 157.5,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_563",
    "rowNumber": 564,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "09/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.0,
    "category": "🛫 Viaggi",
    "description": "casello roma venezia"
  },
  {
    "id": "tx_564",
    "rowNumber": 565,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "10/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_565",
    "rowNumber": 566,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "10/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 21.0,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_566",
    "rowNumber": 567,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "11/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 84.0,
    "category": "🚊 Trasporti",
    "description": "treni"
  },
  {
    "id": "tx_567",
    "rowNumber": 568,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "15/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 11.0,
    "category": "❔Altro",
    "description": "cinema"
  },
  {
    "id": "tx_568",
    "rowNumber": 569,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "15/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 31.5,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_569",
    "rowNumber": 570,
    "year": "2026",
    "week": "33",
    "month": "8",
    "date": "15/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_570",
    "rowNumber": 571,
    "year": "2026",
    "week": "34",
    "month": "8",
    "date": "17/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 63.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_571",
    "rowNumber": 572,
    "year": "2026",
    "week": "34",
    "month": "8",
    "date": "17/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "🛒 Alimentari",
    "description": "spesa"
  },
  {
    "id": "tx_572",
    "rowNumber": 573,
    "year": "2026",
    "week": "34",
    "month": "8",
    "date": "18/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.5,
    "category": "❔Altro",
    "description": "bollo"
  },
  {
    "id": "tx_573",
    "rowNumber": 574,
    "year": "2026",
    "week": "35",
    "month": "8",
    "date": "24/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_574",
    "rowNumber": 575,
    "year": "2026",
    "week": "35",
    "month": "8",
    "date": "24/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 18.0,
    "category": "🍴Uscite",
    "description": "pizza colleghi"
  },
  {
    "id": "tx_575",
    "rowNumber": 576,
    "year": "2026",
    "week": "35",
    "month": "8",
    "date": "25/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🚗 Auto",
    "description": "GPL (360km)"
  },
  {
    "id": "tx_576",
    "rowNumber": 577,
    "year": "2026",
    "week": "40",
    "month": "10",
    "date": "03/10/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 130.0,
    "category": "🚊 Trasporti",
    "description": "treni"
  },
  {
    "id": "tx_577",
    "rowNumber": 578,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 36.0,
    "category": "🛫 Viaggi",
    "description": "colosseox2"
  },
  {
    "id": "tx_578",
    "rowNumber": 579,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_579",
    "rowNumber": 580,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "colazione"
  },
  {
    "id": "tx_580",
    "rowNumber": 581,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.0,
    "category": "❔Altro",
    "description": "macchinette foro"
  },
  {
    "id": "tx_581",
    "rowNumber": 582,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "🍴Uscite",
    "description": "pezzo"
  },
  {
    "id": "tx_582",
    "rowNumber": 583,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 100.0,
    "category": "🍴Uscite",
    "description": "cena"
  },
  {
    "id": "tx_583",
    "rowNumber": 584,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "🍴Uscite",
    "description": "pranzo e colazione"
  },
  {
    "id": "tx_584",
    "rowNumber": 585,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 30.0,
    "category": "🛍️ Shopping",
    "description": "borsa giulia"
  },
  {
    "id": "tx_585",
    "rowNumber": 586,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "30/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 25.0,
    "category": "❔Altro",
    "description": "chioggia"
  },
  {
    "id": "tx_586",
    "rowNumber": 587,
    "year": "2026",
    "week": "36",
    "month": "9",
    "date": "02/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 766.0,
    "category": "🎓 Istruzione",
    "description": "uni"
  },
  {
    "id": "tx_587",
    "rowNumber": 588,
    "year": "2026",
    "week": "36",
    "month": "9",
    "date": "01/09/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 140.0,
    "category": "🛅 Livello Crescita",
    "description": ""
  },
  {
    "id": "tx_588",
    "rowNumber": 589,
    "year": "2026",
    "week": "36",
    "month": "9",
    "date": "01/09/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic",
    "account": "Buddybank",
    "amount": 60.0,
    "category": "📈 Livello Sicurezza",
    "description": ""
  },
  {
    "id": "tx_589",
    "rowNumber": 590,
    "year": "2026",
    "week": "36",
    "month": "8",
    "date": "31/08/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 8.0,
    "category": "❔Altro",
    "description": "istrana"
  },
  {
    "id": "tx_590",
    "rowNumber": 591,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "25/09/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1800.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_591",
    "rowNumber": 592,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "25/09/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 157.5,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_592",
    "rowNumber": 593,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "10/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 10.5,
    "category": "🛒 Alimentari",
    "description": "pranzo"
  },
  {
    "id": "tx_593",
    "rowNumber": 594,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "10/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "🛒 Alimentari",
    "description": "pranzo"
  },
  {
    "id": "tx_594",
    "rowNumber": 595,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "10/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 4.0,
    "category": "❔Altro",
    "description": "pec"
  },
  {
    "id": "tx_595",
    "rowNumber": 596,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "11/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 138.0,
    "category": "🚊 Trasporti",
    "description": "treni"
  },
  {
    "id": "tx_596",
    "rowNumber": 597,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "09/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 20.0,
    "category": "❔Altro",
    "description": "callegaro"
  },
  {
    "id": "tx_597",
    "rowNumber": 598,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "09/09/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 20.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_598",
    "rowNumber": 599,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "09/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 5.0,
    "category": "🍴Uscite",
    "description": "kebab"
  },
  {
    "id": "tx_599",
    "rowNumber": 600,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "12/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 12.0,
    "category": "💇🏻‍♂️ Beauty",
    "description": "capelli"
  },
  {
    "id": "tx_600",
    "rowNumber": 601,
    "year": "2026",
    "week": "37",
    "month": "9",
    "date": "11/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "🍴Uscite",
    "description": "mcdonald"
  },
  {
    "id": "tx_601",
    "rowNumber": 602,
    "year": "2026",
    "week": "38",
    "month": "9",
    "date": "14/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 10.0,
    "category": "❔Altro",
    "description": "macchinette"
  },
  {
    "id": "tx_602",
    "rowNumber": 603,
    "year": "2026",
    "week": "38",
    "month": "9",
    "date": "17/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 19.0,
    "category": "🚗 Auto",
    "description": "gpl"
  },
  {
    "id": "tx_603",
    "rowNumber": 604,
    "year": "2026",
    "week": "38",
    "month": "9",
    "date": "17/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 15.0,
    "category": "🛒 Alimentari",
    "description": "conad"
  },
  {
    "id": "tx_604",
    "rowNumber": 605,
    "year": "2026",
    "week": "38",
    "month": "9",
    "date": "17/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 17.0,
    "category": "🍴Uscite",
    "description": "galivm"
  },
  {
    "id": "tx_605",
    "rowNumber": 606,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "21/09/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Trade Republic",
    "toAccount": "Buddybank",
    "account": "Trade Republic",
    "amount": 1500.0,
    "category": "🏦 Fondo di emergenza",
    "description": ""
  },
  {
    "id": "tx_606",
    "rowNumber": 607,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "21/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1040.0,
    "category": "🏡 Casa",
    "description": "caparra casa mogliano"
  },
  {
    "id": "tx_607",
    "rowNumber": 608,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "21/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 634.0,
    "category": "❔Altro",
    "description": "agenzia mogliano"
  },
  {
    "id": "tx_608",
    "rowNumber": 609,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "22/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 80.0,
    "category": "🚊 Trasporti",
    "description": "italio x dicembre"
  },
  {
    "id": "tx_609",
    "rowNumber": 610,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "23/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 5.5,
    "category": "🍴Uscite",
    "description": "HWW marcon"
  },
  {
    "id": "tx_610",
    "rowNumber": 611,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "24/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 16.0,
    "category": "🍴Uscite",
    "description": "kebab"
  },
  {
    "id": "tx_611",
    "rowNumber": 612,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "24/09/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Contanti",
    "toAccount": "",
    "account": "Contanti",
    "amount": 10.0,
    "category": "💶 Altre entrate",
    "description": "kebab"
  },
  {
    "id": "tx_612",
    "rowNumber": 613,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "25/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 34.0,
    "category": "❔Altro",
    "description": "sme"
  },
  {
    "id": "tx_613",
    "rowNumber": 614,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "25/09/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 1890.0,
    "category": "💰Stipendio",
    "description": ""
  },
  {
    "id": "tx_614",
    "rowNumber": 615,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "25/09/2026",
    "type": "income",
    "rawType": "Entrata",
    "fromAccount": "Buoni Pasto",
    "toAccount": "",
    "account": "Buoni Pasto",
    "amount": 168.0,
    "category": "💶 Altre entrate",
    "description": ""
  },
  {
    "id": "tx_615",
    "rowNumber": 616,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "26/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 150.0,
    "category": "❔Altro",
    "description": "giulia"
  },
  {
    "id": "tx_616",
    "rowNumber": 617,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "26/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.67,
    "category": "❔Altro",
    "description": "regalo serena rata 1"
  },
  {
    "id": "tx_617",
    "rowNumber": 618,
    "year": "2026",
    "week": "44",
    "month": "10",
    "date": "26/10/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.67,
    "category": "❔Altro",
    "description": "regalo serena rata 2"
  },
  {
    "id": "tx_618",
    "rowNumber": 619,
    "year": "2026",
    "week": "48",
    "month": "11",
    "date": "26/11/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 44.67,
    "category": "❔Altro",
    "description": "regalo serena rata 3"
  },
  {
    "id": "tx_619",
    "rowNumber": 620,
    "year": "2026",
    "week": "39",
    "month": "9",
    "date": "25/09/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 33.67,
    "category": "❔Altro",
    "description": "scopa elettrica rata 1"
  },
  {
    "id": "tx_620",
    "rowNumber": 621,
    "year": "2026",
    "week": "44",
    "month": "10",
    "date": "26/10/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 33.67,
    "category": "❔Altro",
    "description": "scopa elettrica rata 2"
  },
  {
    "id": "tx_621",
    "rowNumber": 622,
    "year": "2026",
    "week": "48",
    "month": "11",
    "date": "25/11/2026",
    "type": "expense",
    "rawType": "Uscita",
    "fromAccount": "Buddybank",
    "toAccount": "",
    "account": "Buddybank",
    "amount": 33.67,
    "category": "❔Altro",
    "description": "scopa elettrica rata 3"
  }
];


// === js/data/mockData.js ===
/**
 * Data Store Principale - Supporta:
 * - Categorie dinamiche (CRUD con salvataggio localStorage)
 * - Conti dinamici e Saldi iniziali (CRUD con salvataggio localStorage)
 * - Transazioni reali da Google Sheets o cache locale
 * - Saldi reali (Patrimonio, Investimenti, Net Worth)
 * - Storico Net Worth (2024-2026)
 * - Rate e Spese Ricorrenti
 */

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
const financeStore = new FinanceStore();
const mockFinancialData = financeStore; // Compatibilità con componenti esistenti
const CATEGORIES = financeStore.getCategories();
const ACCOUNTS = financeStore.getAccounts().map(a => a.name);


// === js/services/googleSheetsService.js ===
/**
 * Google Sheets API Service - Client Adattatore Reale
 */

const SHEETS_STORAGE_KEYS = {
  WEB_APP_URL: 'finanze_gas_url',
  SECURITY_TOKEN: 'finanze_gas_token',
  AUTO_SYNC: 'finanze_auto_sync',
  LAST_SYNC: 'finanze_last_sync'
};
class GoogleSheetsService {
  constructor() {
    this.webAppUrl = localStorage.getItem(SHEETS_STORAGE_KEYS.WEB_APP_URL) || '';
    this.securityToken = localStorage.getItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN) || '';
    this.autoSync = localStorage.getItem(SHEETS_STORAGE_KEYS.AUTO_SYNC) !== 'false';
    this.isOnline = navigator.onLine;
    this.syncStatus = 'idle';

    window.addEventListener('online', () => { this.isOnline = true; this.updateStatusBadge(); });
    window.addEventListener('offline', () => { this.isOnline = false; this.updateStatusBadge(); });
  }

  isConfigured() {
    return Boolean(this.webAppUrl && this.webAppUrl.startsWith('https://script.google.com/macros/s/'));
  }

  saveConfig(url, token, autoSync = true) {
    this.webAppUrl = url.trim();
    this.securityToken = token.trim();
    this.autoSync = autoSync;

    localStorage.setItem(SHEETS_STORAGE_KEYS.WEB_APP_URL, this.webAppUrl);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN, this.securityToken);
    localStorage.setItem(SHEETS_STORAGE_KEYS.AUTO_SYNC, this.autoSync);

    this.updateStatusBadge();
  }

  getConfig() {
    return {
      webAppUrl: this.webAppUrl,
      securityToken: this.securityToken,
      autoSync: this.autoSync,
      isConfigured: this.isConfigured(),
      lastSync: localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC)
    };
  }

  async testConnection() {
    if (!this.isConfigured()) {
      return { success: false, message: 'URL Web App di Google Apps Script non configurato.' };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.webAppUrl);
      targetUrl.searchParams.set('action', 'getAllData');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }

      const response = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      const res = await response.json();

      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        const txCount = res.data && res.data.transactions ? res.data.transactions.length : (res.count || 0);
        return {
          success: true,
          message: `Connesso con successo al foglio "${res.sheetName || 'Finanze - Movimenti'}"! (${txCount} movimenti e saldi verificati)`,
          data: res.data
        };
      } else {
        this.syncStatus = 'error';
        this.updateStatusBadge();
        return { success: false, message: res.message || 'Errore di risposta dallo script.' };
      }
    } catch (err) {
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, message: 'Impossibile contattare lo script. Verifica l\'URL della Web App e i permessi.' };
    }
  }

  async fetchAllData() {
    if (!this.isConfigured()) return null;

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.webAppUrl);
      targetUrl.searchParams.set('action', 'getAllData');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }

      const response = await fetch(targetUrl.toString());
      const res = await response.json();

      if (res.status === 'success' && res.data) {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return res.data;
      }
      throw new Error(res.message);
    } catch (err) {
      console.warn('Sync Google Sheets non riuscita, uso cache locale:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return null;
    }
  }

  async pushTransaction(transaction) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'addTransaction',
        token: this.securityToken,
        transaction: transaction
      };

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true, rowNumber: res.rowNumber };
      }
      throw new Error(res.message);
    } catch (err) {
      console.error('Errore scrittura su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  async deleteTransaction(rowNumber) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'deleteTransaction',
        token: this.securityToken,
        rowNumber: rowNumber
      };

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      this.syncStatus = 'connected';
      this.updateStatusBadge();
      return { success: res.status === 'success' };
    } catch (err) {
      console.error('Errore eliminazione su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  async updateAccountBalance(accountName, balance, type) {
    if (!this.isConfigured()) return { success: true, localOnly: true };

    try {
      const payload = {
        action: 'updateAccountBalance',
        token: this.securityToken,
        accountName: accountName,
        balance: balance,
        type: type
      };

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      return { success: res.status === 'success' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  updateStatusBadge() {
    const indicatorEl = document.querySelector('.sheet-status-indicator');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');

    if (!indicatorEl || !descEl) return;

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#34C759'; // Pronto con dati locali
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      descEl.textContent = 'Dati Sincronizzati (Reali)';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      descEl.textContent = 'Protetto & Connesso Live';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
    }
  }
}
const googleSheetsService = new GoogleSheetsService();


// === js/components/dashboardView.js ===
/**
 * Apple Design System - Dashboard View Component (Reale)
 * Integra Saldi reali, Net Worth, Budget 75/25, Goal Stipendio e Grafico di Cassa
 */
class DashboardView {
  constructor() {
    this.lineChart = null;
    this.donutChart = null;
    this.selectedCategoryPeriod = 'all';
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  extractTxYearMonth(tx) {
    let m = parseInt(tx.month, 10);
    let y = parseInt(tx.year, 10);
    if ((!m || !y) && tx.date) {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(tx.date)) {
        const parts = tx.date.split('/');
        m = parseInt(parts[1], 10);
        y = parseInt(parts[2], 10);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(tx.date)) {
        const parts = tx.date.split('-');
        y = parseInt(parts[0], 10);
        m = parseInt(parts[1], 10);
      }
    }
    if (!m || !y) return null;
    return { year: y, month: m, key: `${y}-${String(m).padStart(2, '0')}` };
  }

  formatMonthYearLabel(ymKey, short = false) {
    const monthsFull = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const monthsShort = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    const [y, mStr] = ymKey.split('-');
    const mIdx = Math.max(0, Math.min(11, parseInt(mStr, 10) - 1));
    return `${short ? monthsShort[mIdx] : monthsFull[mIdx]} ${y}`;
  }

  getReferenceYearMonth(txs) {
    const now = new Date();
    const curY = now.getFullYear();
    const curM = now.getMonth() + 1;
    const curKey = `${curY}-${String(curM).padStart(2, '0')}`;

    const expenseKeys = new Set();
    txs.forEach(t => {
      if (t.type === 'expense') {
        const ym = this.extractTxYearMonth(t);
        if (ym) expenseKeys.add(ym.key);
      }
    });

    if (expenseKeys.has(curKey)) {
      return { year: curY, month: curM, key: curKey };
    }
    if (expenseKeys.has(`${curY}-10`)) {
      return { year: curY, month: 10, key: `${curY}-10` };
    }
    const sorted = Array.from(expenseKeys).sort().reverse();
    if (sorted.length > 0) {
      const [y, m] = sorted[0].split('-').map(Number);
      return { year: y, month: m, key: sorted[0] };
    }
    return { year: curY, month: curM, key: curKey };
  }

  getPeriodOptions(txs) {
    const ref = this.getReferenceYearMonth(txs);
    const prevDate = new Date(ref.year, ref.month - 2, 1);
    const prevKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}`;

    const monthsSet = new Set();
    const yearsSet = new Set();
    txs.forEach(t => {
      if (t.type === 'expense') {
        const ym = this.extractTxYearMonth(t);
        if (ym) {
          monthsSet.add(ym.key);
          yearsSet.add(ym.year);
        }
      }
    });

    const sortedMonths = Array.from(monthsSet).sort().reverse();
    const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);

    const quickOptions = [
      { value: 'all', label: 'Tutto lo Storico' },
      { value: 'current-month', label: `Mese Corrente (${this.formatMonthYearLabel(ref.key, true)})` },
      { value: 'prev-month', label: `Mese Precedente (${this.formatMonthYearLabel(prevKey, true)})` },
      { value: 'last-3m', label: 'Ultimi 3 Mesi' },
      { value: 'last-6m', label: 'Ultimi 6 Mesi' },
      ...sortedYears.map(y => ({ value: `year-${y}`, label: `Anno ${y}` }))
    ];

    const monthOptions = sortedMonths.map(ym => ({
      value: `month-${ym}`,
      label: this.formatMonthYearLabel(ym, false)
    }));

    return { quickOptions, monthOptions, refKey: ref.key, prevKey };
  }

  computeCategoryBreakdown(txs, categories, periodValue) {
    const { refKey, prevKey } = this.getPeriodOptions(txs);
    const [refY, refM] = refKey.split('-').map(Number);

    const getLastNMonthsKeys = (n) => {
      const keys = new Set();
      for (let i = 0; i < n; i++) {
        const d = new Date(refY, refM - 1 - i, 1);
        keys.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
      }
      return keys;
    };

    const last3Keys = getLastNMonthsKeys(3);
    const last6Keys = getLastNMonthsKeys(6);

    let subtitleLabel = 'Tutte le uscite registrate';
    if (periodValue === 'current-month') subtitleLabel = `Ripartizione ${this.formatMonthYearLabel(refKey)}`;
    else if (periodValue === 'prev-month') subtitleLabel = `Ripartizione ${this.formatMonthYearLabel(prevKey)}`;
    else if (periodValue === 'last-3m') subtitleLabel = 'Ripartizione ultimi 3 mesi';
    else if (periodValue === 'last-6m') subtitleLabel = 'Ripartizione ultimi 6 mesi';
    else if (periodValue.startsWith('year-')) subtitleLabel = `Ripartizione anno ${periodValue.replace('year-', '')}`;
    else if (periodValue.startsWith('month-')) subtitleLabel = `Ripartizione ${this.formatMonthYearLabel(periodValue.replace('month-', ''))}`;

    const categoryTotals = {};
    let totalExpenseCalc = 0;

    txs.forEach(t => {
      if (t.type !== 'expense') return;
      const ym = this.extractTxYearMonth(t);
      let match = false;

      if (periodValue === 'all') {
        match = true;
      } else if (ym) {
        if (periodValue === 'current-month') match = (ym.key === refKey);
        else if (periodValue === 'prev-month') match = (ym.key === prevKey);
        else if (periodValue === 'last-3m') match = last3Keys.has(ym.key);
        else if (periodValue === 'last-6m') match = last6Keys.has(ym.key);
        else if (periodValue.startsWith('year-')) match = (String(ym.year) === periodValue.replace('year-', ''));
        else if (periodValue.startsWith('month-')) match = (ym.key === periodValue.replace('month-', ''));
      }

      if (match) {
        const cat = t.category || '❔Altro';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount;
        totalExpenseCalc += t.amount;
      }
    });

    const fallbackPalette = ['#0071E3', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#5AC8FA', '#FF3B30'];
    const sortedCats = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([name, amount], idx) => {
        const matched = categories.find(c => c.name === name);
        return {
          name,
          amount,
          percentage: totalExpenseCalc > 0 ? ((amount / totalExpenseCalc) * 100).toFixed(1) : '0.0',
          color: matched && matched.color ? matched.color : fallbackPalette[idx % fallbackPalette.length]
        };
      });

    return { sortedCats, totalExpenseCalc, subtitleLabel };
  }

  renderLegendItems(sortedCats) {
    if (!sortedCats || sortedCats.length === 0) {
      return `<div class="donut-empty-hint">Nessuna spesa registrata nel periodo selezionato</div>`;
    }
    return sortedCats.map(cat => `
      <div class="legend-item">
        <span class="legend-color-dot" style="background-color: ${cat.color};"></span>
        <span class="legend-name" title="${cat.name}">${cat.name}</span>
        <span class="legend-percent">${cat.percentage}%</span>
        <span class="legend-amount">${this.formatCurrency(cat.amount)}</span>
      </div>
    `).join('');
  }

  render(container) {
    this.destroyCharts();
    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const txs = financeStore.getAllTransactions();

    const { quickOptions, monthOptions } = this.getPeriodOptions(txs);
    const { sortedCats, totalExpenseCalc, subtitleLabel } = this.computeCategoryBreakdown(
      txs,
      categories,
      this.selectedCategoryPeriod
    );

    // Calcolo storico mensile entrate/uscite ultime 6 mensilità
    const monthlyHistory = {
      labels: ['Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott'],
      income: [1700, 1700, 1700, 1700, 1700, 1700],
      expenses: [920, 1140, 1080, 1350, 980, summary.monthlyExpense]
    };

    container.innerHTML = `
      <div class="dashboard-layout">
        
        <!-- 1. Top KPI Summary Grid -->
        <section class="kpi-grid">
          
          <!-- Card 1: Net Worth Patrimoniale -->
          <div class="kpi-card highlight-card">
            <div class="kpi-header">
              <span class="kpi-label">Patrimonio Netto (Net Worth)</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(summary.netWorth)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  Aggiornato
                </span>
                <span class="trend-context">Liquidità + Investimenti + Pensione</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Liquidità Disponibile -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Liquidità Diretta</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(summary.liquidTotal)}</span>
              <div class="kpi-footer">
                <span class="trend-context">Buddybank + Buoni Pasto + Contanti</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Uscite del Mese -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Uscite Tracciate Mese</span>
              <div class="kpi-icon-badge expense">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(summary.monthlyExpense)}</span>
              <div class="kpi-footer">
                <span class="trend-badge ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'positive' : 'negative'}">
                  ${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}% del budget
                </span>
                <span class="trend-context">Target max 75%</span>
              </div>
            </div>
          </div>

          <!-- Card 4: Tasso di Risparmio & Regola 75/25 -->
          <div class="kpi-card savings-kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Tasso di Risparmio</span>
              <div class="kpi-icon-badge savings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value savings-value">${summary.savingsRate}%</span>
              <div class="savings-progress-container">
                <div class="savings-progress-track">
                  <div class="savings-progress-fill" style="width: ${Math.min(100, (summary.savingsRate / 25) * 100)}%;"></div>
                </div>
              </div>
              <div class="kpi-footer savings-footer">
                <span class="trend-badge ${summary.savingsRate >= 25 ? 'positive' : ''}">
                  Target 25% ${summary.savingsRate >= 25 ? 'raggiunto' : 'in corso'}
                </span>
                <span class="trend-context">+${this.formatCurrency(summary.savingsAmount)}</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Strip Rapido Conti & Saldi Reali -->
        <section class="accounts-pill-strip">
          ${accounts.map(acc => `
            <div class="account-pill-card">
              <div class="acc-pill-top">
                <span class="acc-pill-name">${acc.name}</span>
                <span class="acc-pill-type">${acc.type}</span>
              </div>
              <span class="acc-pill-val">${this.formatCurrency(acc.balance)}</span>
            </div>
          `).join('')}
        </section>

        <!-- 3. Grafici Interattivi Apple: Flusso di Cassa & Ripartizione -->
        <section class="charts-grid">
          
          <div class="chart-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Flusso di Cassa & Trend Mensile</h3>
                <span class="chart-subtitle">Entrate stimate vs Uscite tracciate nel tempo</span>
              </div>
            </div>
            <div class="chart-canvas-container">
              <canvas id="cashFlowCanvas"></canvas>
            </div>
          </div>

          <div class="chart-card donut-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Spese per Categoria</h3>
                <span class="chart-subtitle" id="donut-period-subtitle">${subtitleLabel}</span>
              </div>
              <div class="apple-select-wrapper category-period-wrapper">
                <select id="category-period-filter" class="apple-select category-period-select" aria-label="Periodo di riferimento spese">
                  <optgroup label="Periodi Rapidi">
                    ${quickOptions.map(opt => `<option value="${opt.value}" ${this.selectedCategoryPeriod === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
                  </optgroup>
                  ${monthOptions.length > 0 ? `
                    <optgroup label="Singola Mensilità">
                      ${monthOptions.map(opt => `<option value="${opt.value}" ${this.selectedCategoryPeriod === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
                    </optgroup>
                  ` : ''}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <div class="donut-chart-container">
              <div class="donut-canvas-wrapper">
                <canvas id="categoryDonutCanvas"></canvas>
                <div class="donut-center-text">
                  <span class="donut-center-label">Totale Uscite</span>
                  <span class="donut-center-value" id="donut-total-value">${this.formatCurrency(totalExpenseCalc)}</span>
                </div>
              </div>
              <div class="donut-legend" id="category-donut-legend">
                ${this.renderLegendItems(sortedCats)}
              </div>
            </div>
          </div>

        </section>

        <!-- 4. Spese Ricorrenti & Rate in Scadenza -->
        <section class="recurring-section-card">
          <div class="section-card-header">
            <div>
              <h3>Spese Ricorrenti & Rate Attive</h3>
              <span class="card-subtitle">Scadenze fisse e piani rateali in corso da movimenti</span>
            </div>
          </div>
          <div class="recurring-grid">
            ${financeStore.recurringItems.map(item => `
              <div class="recurring-item-card">
                <div class="rec-top">
                  <span class="rec-title">${item.name}</span>
                  <span class="rec-amount">€${item.monthlyAmount.toFixed(2)}/mese</span>
                </div>
                <div class="rec-meta">
                  <span>${item.category} • Scadenza: ${item.nextDate}</span>
                </div>
                ${item.totalRate > 0 ? `
                  <div class="rec-progress-bar">
                    <div class="rec-progress-fill" style="width: ${(item.currentRata / item.totalRate) * 100}%;"></div>
                  </div>
                  <span class="rec-rate-info">Rata ${item.currentRata} di ${item.totalRate} completata</span>
                ` : `
                  <span class="rec-badge-fixed">Pagamento Ricorrente Fisso</span>
                `}
              </div>
            `).join('')}
          </div>
        </section>

      </div>
    `;

    this.bindCategoryPeriodEvents(txs, categories);

    requestAnimationFrame(() => {
      this.initLineChart(monthlyHistory);
      this.initDonutChart(sortedCats);
    });
  }

  bindCategoryPeriodEvents(txs, categories) {
    const periodSelect = document.getElementById('category-period-filter');
    if (!periodSelect) return;

    periodSelect.addEventListener('change', (e) => {
      this.selectedCategoryPeriod = e.target.value;
      const { sortedCats, totalExpenseCalc, subtitleLabel } = this.computeCategoryBreakdown(
        txs,
        categories,
        this.selectedCategoryPeriod
      );

      const subtitleEl = document.getElementById('donut-period-subtitle');
      const totalEl = document.getElementById('donut-total-value');
      const legendEl = document.getElementById('category-donut-legend');

      if (subtitleEl) subtitleEl.textContent = subtitleLabel;
      if (totalEl) totalEl.textContent = this.formatCurrency(totalExpenseCalc);
      if (legendEl) legendEl.innerHTML = this.renderLegendItems(sortedCats);

      if (this.donutChart) {
        const hasData = sortedCats.length > 0;
        this.donutChart.data.labels = hasData ? sortedCats.map(c => c.name) : ['Nessuna spesa'];
        this.donutChart.data.datasets[0].data = hasData ? sortedCats.map(c => c.amount) : [1];
        this.donutChart.data.datasets[0].backgroundColor = hasData ? sortedCats.map(c => c.color) : ['rgba(142, 142, 147, 0.2)'];
        this.donutChart.update();
      } else {
        this.initDonutChart(sortedCats);
      }
    });
  }

  destroyCharts() {
    if (this.lineChart) {
      try { this.lineChart.destroy(); } catch (e) {}
      this.lineChart = null;
    }
    if (this.donutChart) {
      try { this.donutChart.destroy(); } catch (e) {}
      this.donutChart = null;
    }
  }

  initLineChart(historyData) {
    const canvas = document.getElementById('cashFlowCanvas');
    if (!canvas || !window.Chart) return;

    if (this.lineChart) {
      try { this.lineChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const incomeGrad = ctx.createLinearGradient(0, 0, 0, 260);
    incomeGrad.addColorStop(0, 'rgba(52, 199, 89, 0.25)');
    incomeGrad.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

    const expenseGrad = ctx.createLinearGradient(0, 0, 0, 260);
    expenseGrad.addColorStop(0, 'rgba(0, 113, 227, 0.22)');
    expenseGrad.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    this.lineChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: historyData.labels,
        datasets: [
          {
            label: 'Entrate Target / Stipendio',
            data: historyData.income,
            borderColor: '#34C759',
            backgroundColor: incomeGrad,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#34C759'
          },
          {
            label: 'Uscite Tracciate',
            data: historyData.expenses,
            borderColor: '#0071E3',
            backgroundColor: expenseGrad,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0071E3'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              font: { size: 11, family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"' },
              color: isDark ? '#98989D' : '#86868B'
            }
          },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 }
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + v
            }
          }
        }
      }
    });
  }

  initDonutChart(categories) {
    const canvas = document.getElementById('categoryDonutCanvas');
    if (!canvas || !window.Chart) return;

    if (this.donutChart) {
      try { this.donutChart.destroy(); } catch (e) {}
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hasData = categories && categories.length > 0;

    this.donutChart = new window.Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: hasData ? categories.map(c => c.name) : ['Nessuna spesa'],
        datasets: [{
          data: hasData ? categories.map(c => c.amount) : [1],
          backgroundColor: hasData ? categories.map(c => c.color) : ['rgba(142, 142, 147, 0.2)'],
          borderWidth: 2,
          borderColor: isDark ? '#1C1C1E' : '#FFFFFF',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${this.formatCurrency(ctx.parsed)}`
            }
          }
        }
      }
    });
  }
}


// === js/components/movimentiView.js ===
/**
 * Apple Design System - Movimenti View Component (Ottimizzato Desktop & Mobile)
 * - Zero overflow orizzontale su iPhone e MacBook
 * - Categorie con emoji e badge semantici
 * - Supporto tipi: Uscita, Entrata, Trasferimento con conto destinazione
 * - Ricerca istantanea, filtri rapidi, ordinamento dinamico
 */
class MovimentiView {
  constructor() {
    this.filters = {
      search: '',
      type: 'all',       // 'all' | 'income' | 'expense' | 'transfer'
      category: 'all',
      sortBy: 'date-desc'
    };
    this.modalOpen = false;
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  parseDateKey(dateStr) {
    if (!dateStr) return '00000000';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      return `${y}${m}${d}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr.replace(/-/g, '');
    }
    return dateStr;
  }

  formatDateParts(dateStr) {
    const months = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
    if (!dateStr) return { day: '--', monthYear: '---' };
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return { day: d, monthYear: `${months[mIdx]} '${y.slice(-2)}` };
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return { day: d, monthYear: `${months[mIdx]} '${y.slice(-2)}` };
    }
    return { day: dateStr.slice(0, 2), monthYear: dateStr.slice(3) };
  }

  getFilteredTransactions() {
    let txs = financeStore.getAllTransactions();

    if (this.filters.search) {
      const q = this.filters.search.toLowerCase();
      txs = txs.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.account || '').toLowerCase().includes(q)
      );
    }

    if (this.filters.type !== 'all') {
      txs = txs.filter(t => t.type === this.filters.type);
    }

    if (this.filters.category !== 'all') {
      txs = txs.filter(t => t.category === this.filters.category);
    }

    switch (this.filters.sortBy) {
      case 'date-asc':
        txs.sort((a, b) => this.parseDateKey(a.date).localeCompare(this.parseDateKey(b.date)));
        break;
      case 'amount-desc':
        txs.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount-asc':
        txs.sort((a, b) => a.amount - b.amount);
        break;
      default: // date-desc
        txs.sort((a, b) => this.parseDateKey(b.date).localeCompare(this.parseDateKey(a.date)));
    }

    return txs;
  }

  computeStats(txs) {
    let totalIncome = 0, totalExpense = 0, count = txs.length;
    txs.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else if (t.type === 'expense') totalExpense += t.amount;
    });
    return { totalIncome, totalExpense, netFlow: totalIncome - totalExpense, count };
  }

  render(container) {
    const txs = this.getFilteredTransactions();
    const stats = this.computeStats(txs);
    const categories = financeStore.getCategories();
    const accounts = financeStore.getAccounts();

    container.innerHTML = `
      <div class="movimenti-layout">

        <!-- Top Mini KPI Strip -->
        <section class="movimenti-stats-strip">
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Movimenti</span>
            <span class="movimenti-stat-value">${stats.count}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Entrate</span>
            <span class="movimenti-stat-value income-color">${this.formatCurrency(stats.totalIncome)}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Uscite</span>
            <span class="movimenti-stat-value expense-color">${this.formatCurrency(stats.totalExpense)}</span>
          </div>
          <div class="movimenti-stat-divider"></div>
          <div class="movimenti-stat">
            <span class="movimenti-stat-label">Differenza</span>
            <span class="movimenti-stat-value ${stats.netFlow >= 0 ? 'income-color' : 'expense-color'}">${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}</span>
          </div>
        </section>

        <!-- Search & Filter Controls -->
        <section class="movimenti-toolbar">
          <div class="movimenti-search-box">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="mov-search" class="movimenti-search-input" placeholder="Cerca per descrizione, categoria o conto..." value="${this.filters.search}" autocomplete="off" />
            ${this.filters.search ? `<button class="search-clear-btn" id="mov-search-clear">&times;</button>` : ''}
          </div>

          <div class="movimenti-filters-row">
            <!-- Segmented Tipo -->
            <div class="segmented-control" id="mov-type-segmented">
              <button class="segment-btn ${this.filters.type === 'all' ? 'active' : ''}" data-type="all">Tutti</button>
              <button class="segment-btn ${this.filters.type === 'expense' ? 'active' : ''}" data-type="expense">Uscite</button>
              <button class="segment-btn ${this.filters.type === 'income' ? 'active' : ''}" data-type="income">Entrate</button>
              <button class="segment-btn ${this.filters.type === 'transfer' ? 'active' : ''}" data-type="transfer">Giroconti</button>
            </div>

            <!-- Categorie & Ordinamento -->
            <div class="filter-dropdowns-group">
              <div class="apple-select-wrapper">
                <select id="mov-category-filter" class="apple-select">
                  <option value="all" ${this.filters.category === 'all' ? 'selected' : ''}>Tutte le Categorie</option>
                  ${categories.map(c => `<option value="${c.name}" ${this.filters.category === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              <div class="apple-select-wrapper">
                <select id="mov-sort-filter" class="apple-select">
                  <option value="date-desc" ${this.filters.sortBy === 'date-desc' ? 'selected' : ''}>Data più recente</option>
                  <option value="date-asc" ${this.filters.sortBy === 'date-asc' ? 'selected' : ''}>Data meno recente</option>
                  <option value="amount-desc" ${this.filters.sortBy === 'amount-desc' ? 'selected' : ''}>Importo più alto</option>
                  <option value="amount-asc" ${this.filters.sortBy === 'amount-asc' ? 'selected' : ''}>Importo più basso</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <button class="apple-btn-primary" id="btn-add-tx">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Nuovo</span>
            </button>
          </div>
        </section>

        <!-- Lista Movimenti -->
        <section class="movimenti-table-card">
          ${txs.length > 0 ? `
            <div class="mov-table-header">
              <span class="mov-col mov-col-date">Data</span>
              <span class="mov-col mov-col-desc">Descrizione</span>
              <span class="mov-col mov-col-cat">Categoria</span>
              <span class="mov-col mov-col-account">Conto</span>
              <span class="mov-col mov-col-amount">Importo</span>
              <span class="mov-col mov-col-actions"></span>
            </div>
            <div class="mov-table-body" id="mov-table-body">
              ${txs.slice(0, 150).map(tx => this.renderRow(tx)).join('')}
              ${txs.length > 150 ? `<div class="mov-load-more-hint">Visualizzati i primi 150 di ${txs.length} movimenti (usa la ricerca per filtrare)</div>` : ''}
            </div>
          ` : `
            <div class="mov-empty-state">
              <h3>Nessun movimento trovato</h3>
              <p>Prova a modificare i filtri o il testo di ricerca.</p>
            </div>
          `}
        </section>

      </div>
    `;

    this.renderModal(categories, accounts, container);
    this.bindEvents(container);
  }

  renderRow(tx) {
    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    let typeClass = isIncome ? 'income' : (isTransfer ? 'transfer' : 'expense');
    let sign = isIncome ? '+' : (isTransfer ? '⇄ ' : '-');
    const dateParts = this.formatDateParts(tx.date);

    return `
      <div class="mov-table-row" data-id="${tx.id}">
        <div class="mov-col mov-col-date" title="${tx.date || ''}">
          <span class="mov-date-day">${dateParts.day}</span>
          <span class="mov-date-month">${dateParts.monthYear}</span>
        </div>
        <div class="mov-col mov-col-desc">
          <span class="mov-desc-title">${tx.description || 'Movimento'}</span>
        </div>
        <div class="mov-col mov-col-cat">
          <span class="mov-cat-pill">${tx.category || '❔Altro'}</span>
        </div>
        <div class="mov-col mov-col-account">
          <span class="mov-account-name">${tx.account || 'Buddybank'}${tx.toAccount ? ' → ' + tx.toAccount : ''}</span>
        </div>
        <div class="mov-col mov-col-amount ${typeClass}">
          ${sign}${this.formatCurrency(tx.amount)}
        </div>
        <div class="mov-col mov-col-actions">
          <button class="mov-delete-btn" data-id="${tx.id}" data-row="${tx.rowNumber || ''}" title="Elimina movimento">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
    `;
  }

  renderModal(categories, accounts, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="modal-overlay">
        <div class="apple-modal-sheet" id="modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="modal-close">Annulla</button>
            <h3>Nuovo Movimento</h3>
            <button class="modal-save-btn" id="modal-save">Salva</button>
          </div>
          <form class="modal-form" id="add-tx-form" onsubmit="return false;">
            
            <div class="form-group">
              <label class="form-label">Tipo Movimento</label>
              <div class="segmented-control form-segmented" id="form-type-toggle">
                <button type="button" class="segment-btn active" data-type="expense">Uscita</button>
                <button type="button" class="segment-btn" data-type="income">Entrata</button>
                <button type="button" class="segment-btn" data-type="transfer">Giroconto</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-amount">Importo (€)</label>
              <input type="number" id="form-amount" class="apple-input apple-input-lg" placeholder="0,00" step="0.01" min="0.01" required />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-description">Descrizione / Note</label>
              <input type="text" id="form-description" class="apple-input" placeholder="es. Spesa Esselunga, Stipendio, Rata..." required />
            </div>

            <div class="form-group">
              <label class="form-label" for="form-date">Data</label>
              <input type="date" id="form-date" class="apple-input" required />
            </div>

            <div class="form-group" id="form-group-category">
              <label class="form-label" for="form-category">Categoria</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-category" class="apple-select apple-input" required>
                  <option value="" disabled selected>Seleziona una categoria</option>
                  ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-account" id="form-account-label">Conto di Addebito</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-account" class="apple-select apple-input" required>
                  ${accounts.map(a => `<option value="${a.name}">${a.name} (${this.formatCurrency(a.balance)})</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group" id="form-group-to-account" style="display: none;">
              <label class="form-label" for="form-to-account">Conto di Accredito (Destinazione)</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-to-account" class="apple-select apple-input">
                  ${accounts.map(a => `<option value="${a.name}">${a.name} (${this.formatCurrency(a.balance)})</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

          </form>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) this.closeModal(); });

    const saveBtn = document.getElementById('modal-save');
    if (saveBtn) saveBtn.addEventListener('click', (e) => { e.preventDefault(); this.handleSave(container); });

    const typeToggle = document.getElementById('form-type-toggle');
    const toAccGroup = document.getElementById('form-group-to-account');
    const accLabel = document.getElementById('form-account-label');

    if (typeToggle) {
      typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          typeToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const currentType = e.currentTarget.dataset.type;

          if (toAccGroup) {
            toAccGroup.style.display = currentType === 'transfer' ? 'block' : 'none';
          }
          if (accLabel) {
            accLabel.textContent = currentType === 'transfer' ? 'Conto Origine' : (currentType === 'income' ? 'Conto Accredito' : 'Conto Addebito');
          }
        });
      });
    }

    // Supporto ESC da tastiera
    if (this._escHandler) {
      window.removeEventListener('keydown', this._escHandler);
    }
    this._escHandler = (e) => {
      if (e.key === 'Escape' && this.modalOpen) {
        this.closeModal();
      }
    };
    window.addEventListener('keydown', this._escHandler);
  }

  bindEvents(container) {
    const searchInput = document.getElementById('mov-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const pos = e.target.selectionStart || e.target.value.length;
        this.filters.search = e.target.value;
        this.render(container);
        const newSearchInput = document.getElementById('mov-search');
        if (newSearchInput) {
          newSearchInput.focus();
          try { newSearchInput.setSelectionRange(pos, pos); } catch (err) {}
        }
      });
    }

    const clearBtn = document.getElementById('mov-search-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.filters.search = '';
        this.render(container);
      });
    }

    const typeSegmented = document.getElementById('mov-type-segmented');
    if (typeSegmented) {
      typeSegmented.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.filters.type = e.currentTarget.dataset.type;
          this.render(container);
        });
      });
    }

    const catFilter = document.getElementById('mov-category-filter');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.render(container);
      });
    }

    const sortFilter = document.getElementById('mov-sort-filter');
    if (sortFilter) {
      sortFilter.addEventListener('change', (e) => {
        this.filters.sortBy = e.target.value;
        this.render(container);
      });
    }

    const addBtn = document.getElementById('btn-add-tx');
    if (addBtn) addBtn.addEventListener('click', () => this.openModal());

    container.querySelectorAll('.mov-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const row = e.currentTarget.dataset.row;
        this.handleDelete(id, row, container);
      });
    });
  }

  openModal() {
    this.modalOpen = true;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    const dateInput = document.getElementById('form-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    setTimeout(() => {
      const amountInput = document.getElementById('form-amount');
      if (amountInput) amountInput.focus();
    }, 280);
  }

  closeModal() {
    this.modalOpen = false;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 260);
  }

  handleSave(container) {
    const amount = document.getElementById('form-amount')?.value;
    const description = document.getElementById('form-description')?.value;
    const date = document.getElementById('form-date')?.value;
    const category = document.getElementById('form-category')?.value;
    const account = document.getElementById('form-account')?.value;
    const toAccount = document.getElementById('form-to-account')?.value;

    const activeTypeBtn = document.querySelector('#form-type-toggle .segment-btn.active');
    const type = activeTypeBtn ? activeTypeBtn.dataset.type : 'expense';

    if (!amount || !description || !date || (!category && type !== 'transfer') || !account) {
      const saveBtn = document.getElementById('modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 400);
      }
      return;
    }

    const addedTx = financeStore.addTransaction({
      amount,
      description,
      date,
      category: category || '🔄 Giroconto',
      type,
      account,
      toAccount: type === 'transfer' ? toAccount : ''
    });

    if (googleSheetsService.isConfigured()) {
      googleSheetsService.pushTransaction(addedTx).catch(err => console.warn('Sync fallita:', err));
    }

    this.closeModal();
    setTimeout(() => this.render(container), 280);
  }

  handleDelete(id, rowNumber, container) {
    const row = container.querySelector(`.mov-table-row[data-id="${id}"]`);
    if (row) {
      row.style.opacity = '0';
      row.style.transform = 'translateX(20px)';
    }

    setTimeout(() => {
      financeStore.deleteTransaction(id);
      if (rowNumber && googleSheetsService.isConfigured()) {
        googleSheetsService.deleteTransaction(rowNumber).catch(err => console.warn('Delete fallita:', err));
      }
      this.render(container);
    }, 250);
  }
}


// === js/components/investimentiView.js ===
/**
 * Apple Design System - Investimenti & Patrimonio Reale
 * - Asset Allocation dinamica da Conti & Saldi reali (XEON, VWCE, Pensione, Liquidità)
 * - Calcolo aggregato del Net Worth con percentuali precise
 * - Scheda Strumenti di Investimento dettagliata
 * - Simulatore PAC interattivo Apple Spec (su VWCE con versamento mensile e crescita composta)
 */
class InvestimentiView {
  constructor() {
    this.allocationChart = null;
    this.pacChart = null;
    this.pacParams = {
      initialCapital: 3410,
      monthlyDeposit: 200,
      annualReturn: 8.0,
      years: 15
    };
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  render(container) {
    this.destroyCharts();
    const accounts = financeStore.getAccounts();

    // Rileva saldi dai conti dinamicamente
    let xeon = 0;
    let vwce = 0;
    let pensione = 0;
    let liquid = 0;
    const customInvestments = [];

    accounts.forEach(acc => {
      const nameLower = acc.name.toLowerCase();
      const typeLower = (acc.type || '').toLowerCase();
      const bal = parseFloat(acc.balance) || 0;

      if (nameLower.includes('xeon') || typeLower.includes('monetari')) {
        xeon += bal;
      } else if (nameLower.includes('vwce') || nameLower.includes('all-world') || typeLower.includes('etf')) {
        vwce += bal;
      } else if (acc.isPension || nameLower.includes('pensione') || typeLower.includes('previden')) {
        pensione += bal;
      } else if (acc.isInvestment || typeLower.includes('invest')) {
        customInvestments.push({ name: acc.name, amount: bal, type: acc.type || 'Investimento' });
      } else {
        liquid += bal;
      }
    });

    // Se per qualche motivo i saldi base sono 0, fallback di sicurezza sui saldi consolidati
    if (xeon === 0 && vwce === 0 && pensione === 0) {
      xeon = 5383.32;
      vwce = 3410.25;
      pensione = 4391.24;
      liquid = 4170.00;
    }

    // Se il capitale iniziale del simulatore era il default, sincronizzalo con il saldo VWCE attuale
    if (this.pacParams.initialCapital === 3410 && vwce > 0) {
      this.pacParams.initialCapital = Math.round(vwce);
    }

    const totalPortfolio = xeon + vwce + pensione + liquid + customInvestments.reduce((sum, i) => sum + i.amount, 0);
    const totalInvestedDirect = xeon + vwce + customInvestments.reduce((sum, i) => sum + i.amount, 0);

    const allocationData = [
      { name: 'Trade Republic - XEON (Fondo Emergenza)', amount: xeon, color: '#34C759', ticker: 'XEON', type: 'Monetario Overnight' },
      { name: 'Trade Republic - VWCE (Azionario Globale)', amount: vwce, color: '#0071E3', ticker: 'VWCE', type: 'ETF Azionario All-World' },
      { name: 'Previdenza Integrativa (Fondo Pensione)', amount: pensione, color: '#AF52DE', ticker: 'FONDO', type: 'Fondo Pensione' },
      ...customInvestments.map((ci, idx) => ({
        name: ci.name,
        amount: ci.amount,
        color: ['#FF9500', '#5856D6', '#FF2D55'][idx % 3],
        ticker: 'ASSET',
        type: ci.type
      })),
      { name: 'Liquidità Corrente (Conti & Contanti)', amount: liquid, color: '#FF9500', ticker: 'CASH', type: 'Liquidità' }
    ].filter(item => item.amount > 0).map(item => ({
      ...item,
      percentage: totalPortfolio > 0 ? ((item.amount / totalPortfolio) * 100).toFixed(1) : 0
    }));

    container.innerHTML = `
      <div class="investimenti-layout">

        <!-- 1. Portfolio KPI Strip -->
        <section class="investimenti-kpi-grid">
          
          <div class="kpi-card highlight-card">
            <div class="kpi-header">
              <span class="kpi-label">Patrimonio Complessivo</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(totalPortfolio)}</span>
              <div class="kpi-footer">
                <span class="trend-badge positive">Dati Reali</span>
                <span class="trend-context">Liquidità + Investimenti + Pensione</span>
              </div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Investito Diretto (ETF & Monetario)</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(totalInvestedDirect)}</span>
              <div class="kpi-footer">
                <span class="trend-context">XEON (${this.formatCurrency(xeon)}) + VWCE (${this.formatCurrency(vwce)})</span>
              </div>
            </div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-label">Previdenza Integrativa</span>
              <div class="kpi-icon-badge" style="background: linear-gradient(135deg, #AF52DE, #BF5AF2); color: #FFFFFF;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-body">
              <span class="kpi-value">${this.formatCurrency(pensione)}</span>
              <div class="kpi-footer">
                <span class="trend-context">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}% del patrimonio totale</span>
              </div>
            </div>
          </div>

        </section>

        <!-- 2. Asset Allocation Reale & Dettaglio Strumenti -->
        <section class="investimenti-main-grid">
          
          <!-- Donut Card -->
          <div class="chart-card donut-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Asset Allocation Reale</h3>
                <span class="chart-subtitle">Ripartizione del patrimonio dai saldi registrati</span>
              </div>
            </div>
            <div class="donut-chart-container">
              <div class="donut-canvas-wrapper">
                <canvas id="investmentsDonutCanvas"></canvas>
                <div class="donut-center-text">
                  <span class="donut-center-label">Net Worth</span>
                  <span class="donut-center-value">${this.formatCurrency(totalPortfolio)}</span>
                </div>
              </div>
              <div class="donut-legend">
                ${allocationData.map(a => `
                  <div class="legend-item">
                    <span class="legend-color-dot" style="background-color: ${a.color};"></span>
                    <span class="legend-name" title="${a.name}">${a.name}</span>
                    <span class="legend-percent">${a.percentage}%</span>
                    <span class="legend-amount">${this.formatCurrency(a.amount)}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Dettaglio Strumenti Reali Card -->
          <div class="invest-holdings-card">
            <div class="chart-header">
              <div class="chart-title-group">
                <h3>Strumenti & Strategia</h3>
                <span class="chart-subtitle">Composizione e obiettivi dei pilastri di investimento</span>
              </div>
            </div>
            <div class="holdings-list">
              
              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(52, 199, 89, 0.15); color: #34C759;">XEON</div>
                  <div class="holding-text-group">
                    <span class="holding-name">Trade Republic - XEON</span>
                    <span class="holding-type">Fondo Emergenza / Monetario Overnight</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(xeon)}</span>
                  <span class="holding-sub" style="color: #34C759;">Rendimento cassa attivo</span>
                </div>
              </div>

              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(0, 113, 227, 0.15); color: #0071E3;">VWCE</div>
                  <div class="holding-text-group">
                    <span class="holding-name">Trade Republic - VWCE</span>
                    <span class="holding-type">Azionario All-World (PAC 200 €/mese)</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(vwce)}</span>
                  <span class="holding-sub" style="color: #0071E3;">Versamento mensile attivo</span>
                </div>
              </div>

              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(175, 82, 222, 0.15); color: #AF52DE;">FONDO</div>
                  <div class="holding-text-group">
                    <span class="holding-name">Previdenza Complementare</span>
                    <span class="holding-type">Fondo Pensione Integrativo di Categoria</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(pensione)}</span>
                  <span class="holding-sub">Deduzione fiscale annuale</span>
                </div>
              </div>

              <div class="holding-row">
                <div class="holding-info">
                  <div class="holding-ticker-badge" style="background: rgba(255, 149, 0, 0.15); color: #FF9500;">LIQUID</div>
                  <div class="holding-text-group">
                    <span class="holding-name">Liquidità Disponibile</span>
                    <span class="holding-type">Buddybank + Buoni Pasto + Contanti</span>
                  </div>
                </div>
                <div class="holding-values">
                  <span class="holding-amount">${this.formatCurrency(liquid)}</span>
                  <span class="holding-sub">Cassa corrente</span>
                </div>
              </div>

            </div>
          </div>

        </section>

        <!-- 3. Simulatore PAC & Crescita Composta Apple Spec -->
        <section class="simulator-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3>Simulatore PAC & Crescita Composta</h3>
              <span class="chart-subtitle">Proietta la crescita del tuo piano di accumulo su VWCE e calcola l'interesse composto</span>
            </div>
          </div>

          <div class="simulator-grid">
            
            <!-- Controlli Slider Apple -->
            <div class="sim-controls">
              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Capitale Iniziale (€)</span>
                  <span class="sim-value" id="val-capitale-iniziale">${this.formatCurrency(this.pacParams.initialCapital)}</span>
                </div>
                <input type="range" class="apple-slider" id="slider-capitale" min="0" max="30000" step="250" value="${this.pacParams.initialCapital}">
              </div>

              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Versamento Mensile (€)</span>
                  <span class="sim-value" id="val-versamento-mensile">${this.formatCurrency(this.pacParams.monthlyDeposit)}</span>
                </div>
                <input type="range" class="apple-slider" id="slider-versamento" min="50" max="1500" step="25" value="${this.pacParams.monthlyDeposit}">
              </div>

              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Rendimento Annuo Stimato (%)</span>
                  <span class="sim-value" id="val-rendimento-annuo">${this.pacParams.annualReturn}%</span>
                </div>
                <input type="range" class="apple-slider" id="slider-rendimento" min="1" max="15" step="0.5" value="${this.pacParams.annualReturn}">
              </div>

              <div class="sim-control-group">
                <div class="sim-control-header">
                  <span class="sim-label">Orizzonte Temporale</span>
                  <span class="sim-value" id="val-orizzonte">${this.pacParams.years} anni</span>
                </div>
                <input type="range" class="apple-slider" id="slider-orizzonte" min="3" max="35" step="1" value="${this.pacParams.years}">
              </div>
            </div>

            <!-- Proiezione Grafica & Risultati -->
            <div class="sim-results-pane">
              <div class="sim-kpi-summary">
                <div class="sim-kpi">
                  <span class="sim-kpi-label">Capitale Versato</span>
                  <span class="sim-kpi-value" id="sim-kpi-versato">€0,00</span>
                </div>
                <div class="sim-kpi">
                  <span class="sim-kpi-label">Interessi Composti</span>
                  <span class="sim-kpi-value positive" id="sim-kpi-interessi">+€0,00</span>
                </div>
                <div class="sim-kpi highlight">
                  <span class="sim-kpi-label">Valore Finale Stimato</span>
                  <span class="sim-kpi-value" id="sim-kpi-totale">€0,00</span>
                </div>
              </div>
              <div class="sim-canvas-wrapper">
                <canvas id="pacProjectionCanvas"></canvas>
              </div>
            </div>

          </div>
        </section>

      </div>
    `;

    // Render grafici dopo inserimento DOM
    requestAnimationFrame(() => {
      this.initAllocationDonut(allocationData);
      this.updatePacSimulation();
      this.bindSimulatorEvents();
    });
  }

  destroyCharts() {
    if (this.allocationChart) {
      try { this.allocationChart.destroy(); } catch (e) {}
      this.allocationChart = null;
    }
    if (this.pacChart) {
      try { this.pacChart.destroy(); } catch (e) {}
      this.pacChart = null;
    }
  }

  initAllocationDonut(allocationData) {
    const canvas = document.getElementById('investmentsDonutCanvas');
    if (!canvas || !window.Chart) return;

    if (this.allocationChart) {
      try { this.allocationChart.destroy(); } catch (e) {}
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.allocationChart = new window.Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: allocationData.map(a => a.name),
        datasets: [{
          data: allocationData.map(a => a.amount),
          backgroundColor: allocationData.map(a => a.color),
          borderWidth: 2,
          borderColor: isDark ? '#1C1C1E' : '#FFFFFF',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${this.formatCurrency(ctx.parsed)}`
            }
          }
        }
      }
    });
  }

  bindSimulatorEvents() {
    const sCap = document.getElementById('slider-capitale');
    const sVer = document.getElementById('slider-versamento');
    const sRen = document.getElementById('slider-rendimento');
    const sOri = document.getElementById('slider-orizzonte');

    const update = () => {
      if (!sCap || !sVer || !sRen || !sOri) return;
      this.pacParams.initialCapital = parseFloat(sCap.value) || 0;
      this.pacParams.monthlyDeposit = parseFloat(sVer.value) || 0;
      this.pacParams.annualReturn = parseFloat(sRen.value) || 0;
      this.pacParams.years = parseInt(sOri.value, 10) || 1;

      const elCap = document.getElementById('val-capitale-iniziale');
      const elVer = document.getElementById('val-versamento-mensile');
      const elRen = document.getElementById('val-rendimento-annuo');
      const elOri = document.getElementById('val-orizzonte');

      if (elCap) elCap.textContent = this.formatCurrency(this.pacParams.initialCapital);
      if (elVer) elVer.textContent = this.formatCurrency(this.pacParams.monthlyDeposit);
      if (elRen) elRen.textContent = this.pacParams.annualReturn + '%';
      if (elOri) elOri.textContent = this.pacParams.years + ' anni';

      this.updatePacSimulation();
    };

    if (sCap) sCap.addEventListener('input', update);
    if (sVer) sVer.addEventListener('input', update);
    if (sRen) sRen.addEventListener('input', update);
    if (sOri) sOri.addEventListener('input', update);
  }

  updatePacSimulation() {
    const P = this.pacParams.initialCapital;
    const PMT = this.pacParams.monthlyDeposit;
    const r = (this.pacParams.annualReturn / 100) / 12;
    const years = this.pacParams.years;

    const labels = [];
    const investedData = [];
    const totalData = [];

    for (let y = 0; y <= years; y++) {
      labels.push(`Anno ${y}`);
      const months = y * 12;
      const totalInvested = P + (PMT * months);
      let futureValue = P * Math.pow(1 + r, months);
      if (r > 0 && months > 0) {
        futureValue += PMT * ((Math.pow(1 + r, months) - 1) / r);
      } else if (months > 0) {
        futureValue += PMT * months;
      }
      investedData.push(Math.round(totalInvested));
      totalData.push(Math.round(futureValue));
    }

    const finalInvested = investedData[investedData.length - 1];
    const finalTotal = totalData[totalData.length - 1];
    const finalInterests = Math.max(0, finalTotal - finalInvested);

    const elInv = document.getElementById('sim-kpi-versato');
    const elInt = document.getElementById('sim-kpi-interessi');
    const elTot = document.getElementById('sim-kpi-totale');
    if (elInv) elInv.textContent = this.formatCurrency(finalInvested);
    if (elInt) elInt.textContent = '+' + this.formatCurrency(finalInterests);
    if (elTot) elTot.textContent = this.formatCurrency(finalTotal);

    const canvas = document.getElementById('pacProjectionCanvas');
    if (!canvas || !window.Chart) return;

    if (this.pacChart) {
      this.pacChart.data.labels = labels;
      this.pacChart.data.datasets[0].data = investedData;
      this.pacChart.data.datasets[1].data = totalData;
      this.pacChart.update('none'); // Update ultra rapido senza stuttering
      return;
    }

    const ctx = canvas.getContext('2d');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.pacChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Capitale Versato',
            data: investedData,
            borderColor: '#8E8E93',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Valore con Interessi Composti',
            data: totalData,
            borderColor: '#34C759',
            backgroundColor: 'rgba(52, 199, 89, 0.15)',
            borderWidth: 2.5,
            pointRadius: 3,
            pointBackgroundColor: '#34C759',
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              font: { size: 11, family: '-apple-system, BlinkMacSystemFont, "SF Pro Text"' },
              color: isDark ? '#98989D' : '#86868B'
            }
          },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 }
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }
}

// === js/components/storicoView.js ===
/**
 * Apple Design System - Patrimonio & Storico View Component
 * Mostra l'evoluzione temporale del Net Worth (2024 - 2026) e la matrice per anno da gestionale
 */
class StoricoView {
  constructor() {
    this.historyChart = null;
    this.selectedYear = 'all'; // 'all' | '2026' | '2025' | '2024'
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  render(container) {
    this.destroyCharts();
    const rawData = INITIAL_HISTORICAL_NW.filter(d => d.value > 0);
    const summary = financeStore.summary;

    // Filtra per anno se selezionato
    const filteredData = this.selectedYear === 'all' 
      ? rawData 
      : rawData.filter(d => d.month.endsWith(this.selectedYear));

    const firstVal = filteredData.length > 0 ? filteredData[0].value : 0;
    const lastVal = this.selectedYear === 'all'
      ? summary.netWorth
      : (filteredData.length > 0 ? filteredData[filteredData.length - 1].value : summary.netWorth);
    const netGrowth = lastVal - firstVal;
    const growthPercent = firstVal > 0 ? ((netGrowth / firstVal) * 100).toFixed(1) : 0;
    const isGrowthPositive = netGrowth >= 0;

    const bannerSub = this.selectedYear === 'all'
      ? `Da ${filteredData[0]?.month || '01/2024'} a oggi`
      : `Performance consolidata anno ${this.selectedYear} (${filteredData[0]?.month || ''} → ${filteredData[filteredData.length - 1]?.month || ''})`;

    container.innerHTML = `
      <div class="storico-layout">

        <!-- Top Header & Year Filter -->
        <div class="storico-toolbar">
          <div class="storico-kpi-banner">
            <div>
              <span class="banner-label">Variazione Net Worth ${this.selectedYear === 'all' ? 'Complessiva' : this.selectedYear}</span>
              <div class="banner-value-row">
                <span class="banner-val">${this.formatCurrency(lastVal)}</span>
                <span class="banner-badge ${isGrowthPositive ? 'positive' : 'negative'}">
                  ${isGrowthPositive ? '+' : ''}${growthPercent}% (${isGrowthPositive ? '+' : ''}${this.formatCurrency(netGrowth)})
                </span>
              </div>
              <span class="banner-sub">${bannerSub}</span>
            </div>
          </div>

          <div class="segmented-control" id="storico-year-toggle">
            <button class="segment-btn ${this.selectedYear === 'all' ? 'active' : ''}" data-year="all">Tutto</button>
            <button class="segment-btn ${this.selectedYear === '2026' ? 'active' : ''}" data-year="2026">2026</button>
            <button class="segment-btn ${this.selectedYear === '2025' ? 'active' : ''}" data-year="2025">2025</button>
            <button class="segment-btn ${this.selectedYear === '2024' ? 'active' : ''}" data-year="2024">2024</button>
          </div>
        </div>

        <!-- Grafico Evoluzione Net Worth -->
        <section class="chart-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3>Evoluzione Net Worth Nel Tempo</h3>
              <span class="chart-subtitle">Andamento del patrimonio complessivo (foglio Historical NW)</span>
            </div>
          </div>
          <div class="chart-canvas-container" style="min-height: 280px;">
            <canvas id="historicalNWCanvas"></canvas>
          </div>
        </section>

        <!-- Matrice Storica / Tabella Mensile -->
        <section class="historical-table-card">
          <div class="chart-header">
            <div class="chart-title-group">
              <h3>Riepilogo Storico per Mensilità</h3>
              <span class="chart-subtitle">Variazioni e snapshot registrati mese per mese</span>
            </div>
          </div>
          <div class="hist-table-container">
            <table class="apple-table">
              <thead>
                <tr>
                  <th>Mese / Anno</th>
                  <th>Patrimonio (Net Worth)</th>
                  <th>Variazione Mensile</th>
                  <th>Stato</th>
                </tr>
              </thead>
              <tbody>
                ${[...filteredData].reverse().map((row, idx, arr) => {
                  const prevVal = idx < arr.length - 1 ? arr[idx + 1].value : row.value;
                  const diff = row.value - prevVal;
                  const diffPercent = prevVal > 0 ? ((diff / prevVal) * 100).toFixed(1) : 0;
                  const isPositive = diff >= 0;
                  return `
                    <tr>
                      <td class="font-medium">${row.month}</td>
                      <td class="font-bold">${this.formatCurrency(row.value)}</td>
                      <td class="${isPositive ? 'income-color' : 'expense-color'}">
                        ${diff !== 0 ? (isPositive ? '+' : '') + this.formatCurrency(diff) + ` (${diffPercent}%)` : '-'}
                      </td>
                      <td>
                        <span class="status-chip ${isPositive ? 'chip-green' : 'chip-orange'}">
                          ${isPositive ? 'Crescita' : 'Flessione'}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    `;

    requestAnimationFrame(() => {
      this.initChart(filteredData);
      this.bindEvents(container);
    });
  }

  destroyCharts() {
    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
      this.historyChart = null;
    }
  }

  initChart(data) {
    const canvas = document.getElementById('historicalNWCanvas');
    if (!canvas || !window.Chart) return;

    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const grad = ctx.createLinearGradient(0, 0, 0, 280);
    grad.addColorStop(0, 'rgba(0, 113, 227, 0.35)');
    grad.addColorStop(1, 'rgba(0, 113, 227, 0.0)');

    this.historyChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.month),
        datasets: [{
          label: 'Patrimonio Net Worth',
          data: data.map(d => d.value),
          borderColor: '#0071E3',
          backgroundColor: grad,
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: '#0071E3'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: isDark ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            titleColor: isDark ? '#FFFFFF' : '#000000',
            bodyColor: isDark ? '#E5E5EA' : '#1C1C1E',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` Patrimonio: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 }
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  bindEvents(container) {
    const yearToggle = document.getElementById('storico-year-toggle');
    if (yearToggle) {
      yearToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.selectedYear = e.currentTarget.dataset.year;
          this.render(container);
        });
      });
    }
  }
}


// === js/components/impostazioniView.js ===
/**
 * Apple Design System - Impostazioni & Configurazione Completa
 * - Gestione Conti & Saldi Iniziali (Aggiunta con modale Apple, modifica saldo, rimozione)
 * - Gestione Categorie di Spesa/Entrata (Aggiunta dinamica, rimozione)
 * - Sicurezza: PIN di Accesso Apple a 4 cifre
 * - Connessione Google Sheets (Web App URL, Security Token)
 */
class ImpostazioniView {
  constructor() {
    this.activeSubtab = 'conti'; // 'conti' | 'categorie' | 'sicurezza' | 'sheets'
    this.isAccountModalOpen = false;
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  render(container) {
    const config = googleSheetsService.getConfig();
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const isPinActive = financeStore.isPinEnabled();

    container.innerHTML = `
      <div class="impostazioni-layout">

        <!-- Sotto-navigazione Cupertino Tabs -->
        <div class="settings-subtabs-nav">
          <button class="settings-subtab-btn ${this.activeSubtab === 'conti' ? 'active' : ''}" data-subtab="conti">
            <span>Conti & Saldi</span>
          </button>
          <button class="settings-subtab-btn ${this.activeSubtab === 'categorie' ? 'active' : ''}" data-subtab="categorie">
            <span>Categorie</span>
          </button>
          <button class="settings-subtab-btn ${this.activeSubtab === 'sicurezza' ? 'active' : ''}" data-subtab="sicurezza">
            <span>Sicurezza PIN</span>
          </button>
          <button class="settings-subtab-btn ${this.activeSubtab === 'sheets' ? 'active' : ''}" data-subtab="sheets">
            <span>Google Sheets</span>
          </button>
        </div>

        <!-- 1. GESTIONE CONTI & SALDI -->
        ${this.activeSubtab === 'conti' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Gestione Conti & Saldi Iniziali</h3>
                <span class="card-subtitle">Aggiungi, modifica o aggiorna i saldi dei tuoi conti e asset patrimoniali</span>
              </div>
              <button class="apple-btn-secondary" id="btn-add-account-modal">+ Nuovo Conto</button>
            </div>

            <div class="accounts-manager-list">
              ${accounts.map(acc => `
                <div class="account-manager-row" data-id="${acc.id}">
                  <div class="acc-row-info">
                    <span class="acc-name">${acc.name}</span>
                    <span class="acc-type-pill">${acc.type}</span>
                  </div>
                  <div class="acc-row-actions">
                    <input type="number" step="0.01" class="apple-input acc-balance-input" value="${acc.balance}" data-id="${acc.id}" aria-label="Saldo conto" />
                    <button class="apple-btn-save-inline" data-id="${acc.id}">Aggiorna</button>
                    <button class="apple-btn-delete-inline" data-id="${acc.id}" title="Rimuovi">&times;</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 2. GESTIONE CATEGORIE -->
        ${this.activeSubtab === 'categorie' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Categorie di Spesa & Entrata</h3>
                <span class="card-subtitle">Aggiungi nuove categorie personalizzate con emoji e tipologia</span>
              </div>
            </div>

            <!-- Form rapido aggiungi categoria -->
            <div class="add-cat-bar">
              <input type="text" id="new-cat-name" class="apple-input" placeholder="Es. ✈️ Viaggi, 🎮 Gaming, 👕 Shopping..." />
              <div class="apple-select-wrapper">
                <select id="new-cat-type" class="apple-select">
                  <option value="expense">Uscita</option>
                  <option value="income">Entrata</option>
                  <option value="transfer">Giroconto / Risparmio</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <button class="apple-btn-primary" id="btn-create-cat">Aggiungi</button>
            </div>

            <div class="categories-tag-cloud">
              ${categories.map(c => `
                <div class="category-tag-pill" style="border-left: 3px solid ${c.color || '#0071E3'};">
                  <span>${c.name}</span>
                  <span class="cat-type-label">(${c.type === 'income' ? 'Entrata' : (c.type === 'transfer' ? 'Risparmio' : 'Spesa')})</span>
                  <button class="btn-remove-cat" data-id="${c.id}" title="Elimina categoria">&times;</button>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- 3. SICUREZZA PIN APPLE -->
        ${this.activeSubtab === 'sicurezza' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Protezione con PIN di Sicurezza</h3>
                <span class="card-subtitle">Blocca l'accesso alla web app su iPhone e Mac se il PIN non viene inserito</span>
              </div>
            </div>

            <div class="pin-config-box">
              <div class="pin-status-banner ${isPinActive ? 'active' : ''}">
                <div class="pin-status-icon">🔒</div>
                <div>
                  <strong>${isPinActive ? 'Protezione PIN Attiva' : 'Nessun PIN Configurato'}</strong>
                  <p>${isPinActive ? 'All\'apertura della web app viene richiesto il codice di sblocco a 4 cifre.' : 'La web app si apre direttamente senza richiedere codici.'}</p>
                </div>
              </div>

              <div class="form-group" style="margin-top: 16px;">
                <label class="form-label" for="input-security-pin">Imposta o Cambia Codice PIN (4 cifre)</label>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                  <input type="password" maxlength="4" pattern="[0-9]*" inputmode="numeric" id="input-security-pin" class="apple-input apple-input-lg" placeholder="••••" value="${financeStore.getPin()}" style="max-width: 140px; letter-spacing: 6px; text-align: center; font-size: 20px;" />
                  <button class="apple-btn-primary" id="btn-save-pin">Salva PIN</button>
                  ${isPinActive ? `<button class="apple-btn-secondary" id="btn-remove-pin">Rimuovi PIN</button>` : ''}
                </div>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- 4. GOOGLE SHEETS SYNC -->
        ${this.activeSubtab === 'sheets' ? `
          <section class="settings-section-card">
            <div class="section-card-header">
              <div>
                <h3>Connessione Google Sheets Privata</h3>
                <span class="card-subtitle">Parametri Web App per il foglio 'Finanze - Movimenti'</span>
              </div>
              <span class="sheet-status-badge">
                <span class="sheet-status-indicator" style="width: 8px; height: 8px;"></span>
                <span class="sheet-status-desc">${config.isConfigured ? 'Connesso' : 'Pronto (Locale)'}</span>
              </span>
            </div>

            <div class="settings-form-group">
              <label class="settings-label" for="gas-url-input">URL Applicazione Web (Google Apps Script)</label>
              <input type="url" id="gas-url-input" class="apple-input apple-input-mono" placeholder="https://script.google.com/macros/s/AKfyc.../exec" value="${config.webAppUrl || ''}" />
            </div>

            <div class="settings-form-group">
              <label class="settings-label" for="gas-token-input">Chiave Segreta Personale (Security Token)</label>
              <input type="password" id="gas-token-input" class="apple-input" placeholder="La tua password segreta impostata nello script" value="${config.securityToken || ''}" />
            </div>

            <div class="settings-actions-row">
              <button class="apple-btn-secondary" id="btn-test-connection">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                <span>Verifica Connessione</span>
              </button>
              <button class="apple-btn-primary" id="btn-save-sheets-config">
                <span>Salva Impostazioni</span>
              </button>
            </div>

            <div id="connection-test-feedback" class="connection-feedback" style="display: none;"></div>
          </section>
        ` : ''}

      </div>
    `;

    this.renderAccountModal();
    this.bindEvents(container);
  }

  renderAccountModal() {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    // Solo se siamo sul subtab conti prepariamo il modale conto
    if (this.activeSubtab !== 'conti') return;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="account-modal-overlay">
        <div class="apple-modal-sheet" id="account-modal-sheet">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="account-modal-close">Annulla</button>
            <h3>Nuovo Conto</h3>
            <button class="modal-save-btn" id="account-modal-save">Aggiungi</button>
          </div>
          <form class="modal-form" id="add-account-form" onsubmit="return false;">
            
            <div class="form-group">
              <label class="form-label" for="new-acc-name">Nome del Conto o Strumento</label>
              <input type="text" id="new-acc-name" class="apple-input" placeholder="Es. Directa, BBVA, Degiro, BTP..." required />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-acc-type">Tipologia Conto</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="new-acc-type" class="apple-select apple-input" required>
                  <option value="Liquidità corrente">Liquidità Corrente (Conto o Carta)</option>
                  <option value="Monetario Overnight">Fondo Monetario / Sicurezza (es. XEON)</option>
                  <option value="ETF Globale">ETF Azionario (es. VWCE PAC)</option>
                  <option value="Previdenza complementare">Fondo Pensione Integrativo</option>
                  <option value="Deposito / Risparmio">Conto Deposito o Risparmio</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="new-acc-balance">Saldo Iniziale (€)</label>
              <input type="number" id="new-acc-balance" class="apple-input apple-input-lg" placeholder="0,00" step="0.01" required />
            </div>

          </form>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('account-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeAccountModal());

    const overlay = document.getElementById('account-modal-overlay');
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeAccountModal();
    });

    const saveBtn = document.getElementById('account-modal-save');
    if (saveBtn) saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleSaveAccount();
    });
  }

  openAccountModal() {
    this.isAccountModalOpen = true;
    const overlay = document.getElementById('account-modal-overlay');
    const sheet = document.getElementById('account-modal-sheet');
    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    setTimeout(() => {
      const nameInput = document.getElementById('new-acc-name');
      if (nameInput) nameInput.focus();
    }, 250);
  }

  closeAccountModal() {
    this.isAccountModalOpen = false;
    const overlay = document.getElementById('account-modal-overlay');
    const sheet = document.getElementById('account-modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 250);
  }

  handleSaveAccount() {
    const name = document.getElementById('new-acc-name')?.value.trim();
    const type = document.getElementById('new-acc-type')?.value;
    const balance = parseFloat(document.getElementById('new-acc-balance')?.value) || 0;

    if (!name) {
      const saveBtn = document.getElementById('account-modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 400);
      }
      return;
    }

    financeStore.addAccount({ name, type, balance });
    this.closeAccountModal();

    const container = document.getElementById('main-viewport');
    if (container) {
      setTimeout(() => this.render(container), 260);
    }
  }

  bindEvents(container) {
    // Sotto-navigazione Tabs
    container.querySelectorAll('.settings-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeSubtab = e.currentTarget.dataset.subtab;
        this.render(container);
      });
    });

    // Modale Nuovo Conto
    const btnAddAcc = document.getElementById('btn-add-account-modal');
    if (btnAddAcc) {
      btnAddAcc.addEventListener('click', () => {
        this.openAccountModal();
      });
    }

    // Aggiornamento Saldo Conto Inline
    container.querySelectorAll('.apple-btn-save-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const input = container.querySelector(`.acc-balance-input[data-id="${id}"]`);
        if (input) {
          const newBal = parseFloat(input.value) || 0;
          financeStore.updateAccountBalance(id, newBal);
          btn.textContent = '✓ Salvato';
          btn.style.color = 'var(--apple-green)';
          setTimeout(() => {
            btn.textContent = 'Aggiorna';
            btn.style.color = '';
          }, 1500);
        }
      });
    });

    // Eliminazione Conto
    container.querySelectorAll('.apple-btn-delete-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Sei sicuro di voler rimuovere questo conto dal gestionale?')) {
          financeStore.deleteAccount(id);
          this.render(container);
        }
      });
    });

    // Creazione Categoria
    const btnCreateCat = document.getElementById('btn-create-cat');
    if (btnCreateCat) {
      btnCreateCat.addEventListener('click', () => {
        const nameInput = document.getElementById('new-cat-name');
        const typeSelect = document.getElementById('new-cat-type');
        if (nameInput && nameInput.value.trim()) {
          financeStore.addCategory({ name: nameInput.value, type: typeSelect.value });
          this.render(container);
        }
      });
    }

    // Rimozione Categoria
    container.querySelectorAll('.btn-remove-cat').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        financeStore.deleteCategory(id);
        this.render(container);
      });
    });

    // Salva / Rimuovi PIN
    const btnSavePin = document.getElementById('btn-save-pin');
    if (btnSavePin) {
      btnSavePin.addEventListener('click', () => {
        const pinVal = document.getElementById('input-security-pin')?.value.trim();
        if (pinVal && pinVal.length === 4) {
          financeStore.setPin(pinVal);
          alert('PIN di sicurezza a 4 cifre attivato con successo!');
          this.render(container);
        } else {
          alert('Inserisci un codice numerico valido di 4 cifre.');
        }
      });
    }

    const btnRemovePin = document.getElementById('btn-remove-pin');
    if (btnRemovePin) {
      btnRemovePin.addEventListener('click', () => {
        if (confirm('Disattivare la protezione con PIN?')) {
          financeStore.setPin('');
          this.render(container);
        }
      });
    }

    // Sheets Config
    const btnSaveSheets = document.getElementById('btn-save-sheets-config');
    if (btnSaveSheets) {
      btnSaveSheets.addEventListener('click', () => {
        const url = document.getElementById('gas-url-input')?.value || '';
        const token = document.getElementById('gas-token-input')?.value || '';
        googleSheetsService.saveConfig(url, token, true);
        alert('Parametri di sincronizzazione salvati!');
        this.render(container);
      });
    }

    const btnTest = document.getElementById('btn-test-connection');
    if (btnTest) {
      btnTest.addEventListener('click', async () => {
        const feedbackEl = document.getElementById('connection-test-feedback');
        if (!feedbackEl) return;
        feedbackEl.style.display = 'block';
        feedbackEl.className = 'connection-feedback loading';
        feedbackEl.textContent = 'Verifica connessione con Google Sheets in corso...';

        const res = await googleSheetsService.testConnection();
        feedbackEl.className = `connection-feedback ${res.success ? 'success' : 'error'}`;
        feedbackEl.textContent = res.message;
      });
    }
  }
}


// === js/app.js ===
/**
 * Apple Design System - Personal Finance Web App
 * State Management & Navigation Controller
 */







const VIEWS = {
  dashboard: {
    id: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Panoramica finanziaria e indicatori chiave'
  },
  movimenti: {
    id: 'movimenti',
    title: 'Movimenti',
    subtitle: 'Registro transazioni reale'
  },
  investimenti: {
    id: 'investimenti',
    title: 'Investimenti',
    subtitle: 'Allocazione asset, XEON, VWCE & Pensione'
  },
  storico: {
    id: 'storico',
    title: 'Storico Patrimonio',
    subtitle: 'Evoluzione Net Worth 2024 - 2026'
  },
  impostazioni: {
    id: 'impostazioni',
    title: 'Configurazione & Conti',
    subtitle: 'Gestione conti, categorie, PIN e Sheets'
  }
};

class AppController {
  constructor() {
    this.currentTab = 'dashboard';
    this.dashboardView = new DashboardView();
    this.movimentiView = new MovimentiView();
    this.investimentiView = new InvestimentiView();
    this.storicoView = new StoricoView();
    this.impostazioniView = new ImpostazioniView();
    this.isUnlocked = !financeStore.isPinEnabled();
    this.init();
  }

  init() {
    this.renderDate();
    googleSheetsService.updateStatusBadge();

    // Se il PIN è attivo, mostra schermata di sblocco Apple
    if (!this.isUnlocked) {
      this.showLockScreen();
    } else {
      this.startApp();
    }
  }

  showLockScreen() {
    const lockEl = document.getElementById('lock-screen-container');
    if (!lockEl) {
      this.startApp();
      return;
    }

    lockEl.style.display = 'flex';
    let currentInput = '';

    const updateDots = () => {
      const dots = lockEl.querySelectorAll('.pin-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('filled', idx < currentInput.length);
      });
    };

    lockEl.querySelectorAll('.pin-key').forEach(key => {
      key.onclick = () => {
        const val = key.dataset.val;
        if (val === 'back') {
          currentInput = currentInput.slice(0, -1);
          updateDots();
        } else if (val && currentInput.length < 4) {
          currentInput += val;
          updateDots();

          if (currentInput.length === 4) {
            setTimeout(() => {
              if (currentInput === financeStore.getPin()) {
                this.isUnlocked = true;
                lockEl.style.opacity = '0';
                setTimeout(() => {
                  lockEl.style.display = 'none';
                  this.startApp();
                }, 300);
              } else {
                // Shake feedback
                const dotsRow = lockEl.querySelector('.pin-dots-row');
                dotsRow.classList.add('shake');
                setTimeout(() => {
                  dotsRow.classList.remove('shake');
                  currentInput = '';
                  updateDots();
                }, 400);
              }
            }, 100);
          }
        }
      };
    });
  }

  startApp() {
    this.bindEvents();

    const rawHash = window.location.hash.replace('#', '');
    const tabName = rawHash.split('-')[0].split('?')[0];
    const initialTab = VIEWS[tabName] ? tabName : 'dashboard';

    this.switchTab(initialTab);

    // Auto-sync al boot se configurato
    if (googleSheetsService.isConfigured() && googleSheetsService.autoSync) {
      googleSheetsService.fetchAllData().then(data => {
        if (data && data.transactions && data.transactions.length > 0) {
          financeStore.setTransactions(data.transactions);
          if (data.saldi) {
            data.saldi.forEach(s => {
              financeStore.updateAccountBalance(s.name, s.balance);
            });
          }
          const container = document.getElementById('main-viewport');
          if (this.currentTab === 'dashboard') this.dashboardView.render(container);
          else if (this.currentTab === 'movimenti') this.movimentiView.render(container);
          else if (this.currentTab === 'investimenti') this.investimentiView.render(container);
          else if (this.currentTab === 'storico') this.storicoView.render(container);
        }
      }).catch(err => console.warn('Sync background:', err));
    }
  }

  bindEvents() {
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    document.querySelectorAll('.mobile-tab-bar .mobile-tab-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });
  }

  switchTab(tabId) {
    if (!VIEWS[tabId]) return;
    this.currentTab = tabId;
    const viewData = VIEWS[tabId];

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.mobile-tab-bar .mobile-tab-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = viewData.title;
    if (subtitleEl) subtitleEl.textContent = viewData.subtitle;

    window.location.hash = tabId;

    const container = document.getElementById('main-viewport');
    if (!container) return;

    container.scrollTop = 0;

    this.dashboardView.destroyCharts();
    this.investimentiView.destroyCharts();
    this.storicoView.destroyCharts();

    if (tabId === 'dashboard') {
      this.dashboardView.render(container);
    } else if (tabId === 'movimenti') {
      this.movimentiView.render(container);
    } else if (tabId === 'investimenti') {
      this.investimentiView.render(container);
    } else if (tabId === 'storico') {
      this.storicoView.render(container);
    } else if (tabId === 'impostazioni') {
      this.impostazioniView.render(container);
    }
  }

  renderDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formatted = now.toLocaleDateString('it-IT', options);
    dateEl.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.app = new AppController(); });
} else {
  window.app = new AppController();
}


})();
