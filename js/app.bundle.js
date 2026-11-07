(function() {
"use strict";

// === js/config/environment.js ===
/**
 * Configurazione Ambiente Applicazione
 * Branch: main (Produzione / Stabile)
 * 
 * Regola Costituzionale:
 * - In main (produzione): Sincronizzazione reale attiva di default con Google Sheets.
 * - In beta: Sandbox attiva di default per proteggere il database reale da qualsiasi scrittura.
 */

const APP_ENV = {
  branch: 'main',
  isBeta: false,
  defaultSandboxMode: false,
  appName: 'Finanze - Movimenti',
  statusDesc: 'Dati Sincronizzati',
  mobileText: 'Finanze'
};

// === js/components/icons.js ===
/**
 * Apple Design System - Centralized Vector Linear Iconography (SF Symbols Style)
 * 100% SVG lineari, geometrici, senza emoji colorate a disegnino.
 * Monocromatici, contrasto perfetto con lo sfondo (currentColor / design tokens).
 */

const ICONS = {
  // --- Categorie di Spesa & Flussi ---
  alimentari: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>`,
  auto: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>`,
  ristoranti: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v20M18 8a4 4 0 0 1-4-4V2M6 2v20M3 2v6a3 3 0 0 0 6 0V2"></path></svg>`,
  casa: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  utenze: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  salute: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
  svago: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  shopping: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  viaggi: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path></svg>`,
  lavoro: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
  stipendio: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
  investimenti: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>`,
  fondo_emergenza: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  pensione: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 8H2z"></path></svg>`,
  conguaglio: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>`,
  giroconto: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
  altro: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path><line x1="8" y1="8" x2="16" y2="8"></line><line x1="8" y1="12" x2="16" y2="12"></line><line x1="8" y1="16" x2="12" y2="16"></line></svg>`,

  // --- Icone di Sistema & Azioni ---
  income: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`,
  expense: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>`,
  balance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  savings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  sparkle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>`,
  target: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  fire: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  list: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  card: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  alert: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  filter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  bot: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"></path><rect width="16" height="12" x="4" y="8" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>`,
  lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  table: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>`,
  refresh: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>`,
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  wallet: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>`,
  cloud: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  sync: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>`,
  tag: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>`,
  smartphone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>`,
  upload: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
  merge: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path></svg>`,
  faceid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M7 21H5a2 2 0 0 1-2-2v-2M17 21h2a2 2 0 0 0 2-2v-2"></path><path d="M9 9h.01M15 9h.01M12 10v3M9.5 16a3.5 3.5 0 0 0 5 0"></path></svg>`,
  info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>`
};

/**
 * Pulisce qualsiasi nome di categoria rimuovendo emoji o prefissi strani.
 * Esempio: "🛒 Alimentari" -> "Alimentari", "🚗 Auto" -> "Auto"
 */
function cleanCategoryName(name) {
  if (!name) return 'Altro';
  // Rimuove qualsiasi carattere emoji o simbolo non standard iniziale
  return name.replace(/^[\p{Emoji}\p{Symbol}\s]+/u, '').trim() || name;
}

/**
 * Restituisce l'icona SVG lineare appropriata in base al nome o tipo della categoria.
 * Monocromatico, geometrico, stile Apple SF Symbols.
 */
function getCategoryIcon(categoryName, customSize = null, customClass = '') {
  const clean = cleanCategoryName(categoryName).toLowerCase();
  
  let key = 'altro';
  if (clean.includes('alimentar') || clean.includes('spesa') || clean.includes('supermercat')) key = 'alimentari';
  else if (clean.includes('auto') || clean.includes('trasport') || clean.includes('carburant') || clean.includes('benzina')) key = 'auto';
  else if (clean.includes('ristorant') || clean.includes('bar') || clean.includes('pranz') || clean.includes('cen')) key = 'ristoranti';
  else if (clean.includes('cas') || clean.includes('affitt') || clean.includes('mutuo') || clean.includes('arred')) key = 'casa';
  else if (clean.includes('utenz') || clean.includes('bollett') || clean.includes('luce') || clean.includes('gas') || clean.includes('internet')) key = 'utenze';
  else if (clean.includes('salut') || clean.includes('farmaci') || clean.includes('medic') || clean.includes('visita')) key = 'salute';
  else if (clean.includes('svag') || clean.includes('intratteniment') || clean.includes('cinema') || clean.includes('streaming')) key = 'svago';
  else if (clean.includes('shop') || clean.includes('acquist') || clean.includes('abbigliament')) key = 'shopping';
  else if (clean.includes('viagg') || clean.includes('vacanz') || clean.includes('hotel') || clean.includes('volo')) key = 'viaggi';
  else if (clean.includes('lavor') || clean.includes('uffici') || clean.includes('consulenz')) key = 'lavoro';
  else if (clean.includes('stipendi') || clean.includes('accredit') || clean.includes('bonifico')) key = 'stipendio';
  else if (clean.includes('invest') || clean.includes('vwce') || clean.includes('etf') || clean.includes('pac') || clean.includes('azionar')) key = 'investimenti';
  else if (clean.includes('emergenz') || clean.includes('sicurezz') || clean.includes('xeon') || clean.includes('cuscinett')) key = 'fondo_emergenza';
  else if (clean.includes('pension') || clean.includes('previdenz')) key = 'pensione';
  else if (clean.includes('conguagli') || clean.includes('rettific')) key = 'conguaglio';
  else if (clean.includes('girocont') || clean.includes('trasferiment')) key = 'giroconto';

  let svg = ICONS[key] || ICONS.altro;
  if (customSize) {
    svg = svg.replace(/width="18"/, `width="${customSize}"`).replace(/height="18"/, `height="${customSize}"`);
  }
  if (customClass) {
    svg = svg.replace('<svg', `<svg class="${customClass}"`);
  }
  return svg;
}

/**
 * Helper per estrarre una specifica icona per nome.
 */
function getIcon(name, customSize = null, customClass = '') {
  let svg = ICONS[name] || ICONS.altro;
  if (customSize) {
    svg = svg.replace(/width="18"/, `width="${customSize}"`).replace(/height="18"/, `height="${customSize}"`);
  }
  if (customClass) {
    svg = svg.replace('<svg', `<svg class="${customClass}"`);
  }
  return svg;
}

if (typeof window !== 'undefined') {
  window.AppIcons = { ICONS, cleanCategoryName, getCategoryIcon, getIcon };
}

// === js/components/uiComponents.js ===
/**
 * Apple Design System - Reusable UI Components & Card Factory
 * Conforme alla skill ui-perfect-design e DESIGN.md
 * 
 * Componenti condivisi:
 * - Card: Contenitore universale con 4 zone canoniche (header, value, body, footer)
 * - KpiCard: Card standard per metriche e indicatori
 * - MeterRow: Barra di progresso con etichetta esterna e spaziatura 8px/16px
 * - KeyValueRow: Riga chiave/valore con etichetta elastica e valore nowrap (min 12px gap)
 * - Badge: Pillola di stato anti-spezzamento con ruoli semantici
 * - AlertItem: Riga di avviso / anomalia uniforme
 */


function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 1. Badge Component
 * @param {Object} opts
 * @param {string} opts.text
 * @param {'positive'|'negative'|'warning'|'purple'|'neutral'|'info'} [opts.type='neutral']
 * @param {string} [opts.icon='']
 * @param {string} [opts.tooltip='']
 * @param {string} [opts.className='']
 */
function Badge({ text, type = 'neutral', icon = '', tooltip = '', className = '' }) {
  const titleAttr = tooltip ? `title="${escapeHtml(tooltip)}"` : '';
  const iconMarkup = icon ? `<span class="badge__icon">${icon}</span>` : '';
  return `<span class="badge badge--${escapeHtml(type)} ${escapeHtml(className)}" ${titleAttr}>${iconMarkup}${escapeHtml(text)}</span>`;
}

/**
 * 2. KeyValueRow Component
 * @param {Object} opts
 * @param {string} opts.label
 * @param {string} opts.value
 * @param {string} [opts.tooltip='']
 * @param {boolean} [opts.isPositive=false]
 * @param {boolean} [opts.isNegative=false]
 * @param {boolean} [opts.isMuted=false]
 * @param {boolean} [opts.isHighlighted=false]
 * @param {string} [opts.className='']
 */
function KeyValueRow({ label, value, tooltip = '', isPositive = false, isNegative = false, isMuted = false, isHighlighted = false, className = '' }) {
  const titleAttr = tooltip ? `title="${escapeHtml(tooltip)}"` : `title="${escapeHtml(label)}"`;
  const valClasses = [
    'kv__value',
    isPositive ? 'positive' : '',
    isNegative ? 'negative' : '',
    isMuted ? 'muted' : '',
    isHighlighted ? 'highlight' : ''
  ].filter(Boolean).join(' ');

  return `
    <div class="kv ${escapeHtml(className)}">
      <span class="kv__label" ${titleAttr}>${escapeHtml(label)}</span>
      <span class="${valClasses}">${value}</span>
    </div>
  `;
}

/**
 * 3. MeterRow Component (Barra di progresso con etichetta esterna)
 * Spaziatura: etichetta -> barra: 8px, barra -> riga successiva: 16px
 * @param {Object} opts
 * @param {string} opts.label
 * @param {number} [opts.percent=0]
 * @param {string} [opts.valueText='']
 * @param {string} [opts.color='var(--apple-blue)']
 * @param {string} [opts.statusText='']
 * @param {string} [opts.labelTooltip='']
 * @param {string} [opts.className='']
 */
function MeterRow({ label, percent = 0, valueText = '', color = 'var(--apple-blue)', statusText = '', labelTooltip = '', className = '' }) {
  const safePercent = Math.min(100, Math.max(0, Number(percent) || 0));
  const titleAttr = labelTooltip ? `title="${escapeHtml(labelTooltip)}"` : `title="${escapeHtml(label)}"`;

  return `
    <div class="meter-row ${escapeHtml(className)}">
      <div class="meter__header">
        <span class="meter__label" ${titleAttr}>${escapeHtml(label)}</span>
        ${valueText ? `<span class="meter__val">${valueText}</span>` : ''}
      </div>
      <div class="meter">
        <div class="meter__fill" style="width: ${safePercent}%; background: ${escapeHtml(color)};"></div>
      </div>
      ${statusText ? `<div class="meter__footer">${statusText}</div>` : ''}
    </div>
  `;
}

/**
 * 4. AlertItem Component
 * @param {Object} opts
 * @param {string} [opts.icon]
 * @param {string} opts.title
 * @param {string} [opts.value='']
 * @param {string} [opts.detail='']
 * @param {'warning'|'danger'|'info'|'success'} [opts.type='warning']
 * @param {string} [opts.badgeText='']
 * @param {string} [opts.className='']
 */
function AlertItem({ icon = null, title, value = '', detail = '', type = 'warning', badgeText = '', className = '' }) {
  const iconHtml = icon || getIcon('alert', 16);
  return `
    <div class="alert-item alert-item--${escapeHtml(type)} ${escapeHtml(className)}">
      <div class="alert-item__icon">${iconHtml}</div>
      <div class="alert-item__content">
        <div class="alert-item__header">
          <span class="alert-item__title" title="${escapeHtml(title)}">${escapeHtml(title)}</span>
          ${value ? `<span class="alert-item__val">${value}</span>` : ''}
          ${badgeText ? `<span class="alert-item__badge">${escapeHtml(badgeText)}</span>` : ''}
        </div>
        ${detail ? `<div class="alert-item__detail">${escapeHtml(detail)}</div>` : ''}
      </div>
    </div>
  `;
}

/**
 * 5. Card Component (Universale a 4 Zone)
 * @param {Object} opts
 * @param {string} [opts.header='']   - Zona 1: Titolo + Badge / Icona
 * @param {string} [opts.value='']    - Zona 2: Metrica primaria
 * @param {string} [opts.body='']     - Zona 3: Corpo informativo (meter, kv, liste)
 * @param {string} [opts.footer='']   - Zona 4: Footer / Stato ancorato in basso
 * @param {boolean} [opts.compact=false]
 * @param {boolean} [opts.highlight=false]
 * @param {string} [opts.className='']
 * @param {string} [opts.id='']
 * @param {string} [opts.style='']
 * @param {string} [opts.attributes='']
 */
function Card({ header = '', value = '', body = '', footer = '', compact = false, highlight = false, className = '', id = '', style = '', attributes = '' }) {
  const cardClasses = [
    'card',
    compact ? 'card--compact' : '',
    highlight ? 'highlight-card' : '',
    className
  ].filter(Boolean).join(' ');

  const idAttr = id ? `id="${escapeHtml(id)}"` : '';
  const styleAttr = style ? `style="${style}"` : '';

  return `
    <div class="${cardClasses}" ${idAttr} ${styleAttr} ${attributes}>
      ${header ? `<div class="card__header">${header}</div>` : ''}
      ${value ? `<div class="card__value">${value}</div>` : ''}
      ${body ? `<div class="card__body">${body}</div>` : '<div class="card__body"></div>'}
      ${footer ? `<div class="card__footer">${footer}</div>` : ''}
    </div>
  `;
}

/**
 * 6. KpiCard Component (Standardizzata a 4 Zone)
 * @param {Object} opts
 * @param {string} opts.title
 * @param {string} [opts.badge='']
 * @param {string} [opts.icon='']
 * @param {string} opts.value
 * @param {string} [opts.body='']
 * @param {string} [opts.footer='']
 * @param {boolean} [opts.compact=false]
 * @param {boolean} [opts.highlight=false]
 * @param {string} [opts.titleTooltip='']
 * @param {string} [opts.valueTooltip='']
 * @param {string} [opts.className='']
 * @param {string} [opts.id='']
 */
function KpiCard({ title, badge = '', icon = '', value, body = '', footer = '', compact = false, highlight = false, titleTooltip = '', valueTooltip = '', className = '', id = '' }) {
  const titleAttr = titleTooltip ? `title="${escapeHtml(titleTooltip)}"` : `title="${escapeHtml(title)}"`;
  const valAttr = valueTooltip ? `title="${escapeHtml(valueTooltip)}"` : '';

  const headerMarkup = `
    <span class="card__title" ${titleAttr}>${title}</span>
    ${badge ? `<div class="card__badge-wrapper">${badge}</div>` : ''}
    ${icon ? `<div class="card__icon-wrapper">${icon}</div>` : ''}
  `;

  const valueMarkup = `<span class="privacy-mask" ${valAttr}>${value}</span>`;

  return Card({
    header: headerMarkup,
    value: valueMarkup,
    body: body,
    footer: footer,
    compact: compact,
    highlight: highlight,
    className: className,
    id: id
  });
}

// Global browser fallback when running without bundlers
if (typeof window !== 'undefined') {
  window.UiComponents = {
    Badge,
    KeyValueRow,
    MeterRow,
    AlertItem,
    Card,
    KpiCard,
    escapeHtml
  };
}

// === js/data/demoData.js ===
/**
 * Demo Data Store - Finanze Personali (Database Dimostrativo Fittizio e Anonimo)
 * Dati realistici generici per dimostrazione, test e distribuzione pubblica.
 * Nessun riferimento a dati sensibili, conti bancari personali o transazioni private.
 */

const INITIAL_CATEGORIES = [
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

const INITIAL_GOALS = [
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

const DEFAULT_SMART_RULES = [
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

const INITIAL_PROVIDERS = [
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

const INITIAL_ACCOUNTS = [
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

const INITIAL_SALDI = [
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

const INITIAL_HISTORICAL_NW = [
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

const INITIAL_MONTHLY_BREAKDOWNS = {
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

const INITIAL_TRANSACTIONS = [
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

// === js/data/assetCatalog.js ===
/**
 * Catalogo Asset & Strumenti Finanziari JustETF
 * Database integrato di ETF, Ticker, ISIN, Asset Class e Metadati Finanziari
 */

const ASSET_CLASSES = {
  monetario: {
    id: 'monetario',
    label: 'Monetario / Liquidità Sicura',
    color: '#34C759',
    riskLevel: 1,
    description: 'Strumenti a bassissima volatilità, tasso overnight interbancario (€STR), liquidità remunerata o BOT.'
  },
  azionario_globale: {
    id: 'azionario_globale',
    label: 'Azionario Globale (All-World)',
    color: '#0071E3',
    riskLevel: 4,
    description: 'Esposizione diversificata globale a mercati sviluppati ed emergenti (es. FTSE All-World, MSCI ACWI).'
  },
  azionario_sviluppati: {
    id: 'azionario_sviluppati',
    label: 'Azionario Paesi Sviluppati (DM)',
    color: '#0A84FF',
    riskLevel: 4,
    description: 'Grandi e medie capitalizzazioni dei paesi sviluppati (es. MSCI World).'
  },
  azionario_usa: {
    id: 'azionario_usa',
    label: 'Azionario USA (S&P 500 / Nasdaq)',
    color: '#5856D6',
    riskLevel: 4,
    description: 'Principali titoli del mercato statunitense (es. S&P 500, MSCI USA).'
  },
  azionario_emergenti: {
    id: 'azionario_emergenti',
    label: 'Azionario Mercati Emergenti (EM)',
    color: '#FF9500',
    riskLevel: 5,
    description: 'Economie in via di sviluppo ad alto potenziale di crescita (es. MSCI Emerging Markets).'
  },
  obbligazionario_globale: {
    id: 'obbligazionario_globale',
    label: 'Obbligazionario Globale (Aggregate Bond)',
    color: '#30D158',
    riskLevel: 2,
    description: 'Mix di titoli governativi e societari investment-grade globali.'
  },
  obbligazionario_gov: {
    id: 'obbligazionario_gov',
    label: 'Titoli di Stato / BTP / Gov Bond',
    color: '#34C759',
    riskLevel: 2,
    description: 'Obbligazioni governative della zona euro o italiane (BTP, Bund, Bonos).'
  },
  oro_commodities: {
    id: 'oro_commodities',
    label: 'Oro Fisico & Materie Prime (ETC)',
    color: '#FFCC00',
    riskLevel: 3,
    description: 'Metalli preziosi con copertura fisica a protezione dall\'inflazione.'
  },
  crypto: {
    id: 'crypto',
    label: 'Criptovalute / Digital Assets',
    color: '#FF9500',
    riskLevel: 7,
    description: 'Attività digitali ad altissima volatilità (es. Bitcoin, Ethereum).'
  },
  previdenza: {
    id: 'previdenza',
    label: 'Previdenza Complementare (Pensione)',
    color: '#AF52DE',
    riskLevel: 3,
    description: 'Fondi pensione negoziali o aperti con deducibilità fiscale Art. 51 TUIR.'
  },
  liquidita: {
    id: 'liquidita',
    label: 'Liquidità di Conto / Cassa Libera',
    color: '#64D2FF',
    riskLevel: 1,
    description: 'Liquidità non investita presente sul conto bancario o sul conto del broker.'
  }
};

const POPULAR_ASSETS = [
  {
    ticker: 'XEON',
    isin: 'LU0290358497',
    name: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF 1C',
    issuer: 'DWS (Xtrackers)',
    assetClass: 'monetario',
    ter: 0.10,
    distribution: 'Accumulazione',
    exchange: 'XETRA / Borsa Italiana',
    notes: 'Tasso interbancario €STR Overnight, ideale per Fondo Emergenza e Liquidità Sicura'
  },
  {
    ticker: 'VWCE',
    isin: 'IE00BK5BQT80',
    name: 'Vanguard FTSE All-World UCITS ETF (USD) Acc',
    issuer: 'Vanguard',
    assetClass: 'azionario_globale',
    ter: 0.22,
    distribution: 'Accumulazione',
    exchange: 'XETRA / Borsa Italiana',
    notes: 'Standard de facto per PAC azionario passivo globale (3.700+ titoli)'
  },
  {
    ticker: 'VGWL',
    isin: 'IE00B3RBWM25',
    name: 'Vanguard FTSE All-World UCITS ETF (USD) Dist',
    issuer: 'Vanguard',
    assetClass: 'azionario_globale',
    ter: 0.22,
    distribution: 'Distribuzione',
    exchange: 'Borsa Italiana',
    notes: 'Versione a distribuzione dei dividendi di VWCE'
  },
  {
    ticker: 'SWDA',
    isin: 'IE00B4L5Y983',
    name: 'iShares Core MSCI World UCITS ETF (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'azionario_sviluppati',
    ter: 0.20,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Solo paesi sviluppati (MSCI World, 1.500+ titoli)'
  },
  {
    ticker: 'CSSPX',
    isin: 'IE00B5BMR087',
    name: 'iShares Core S&P 500 UCITS ETF (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'azionario_usa',
    ter: 0.07,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Le 500 aziende a maggiore capitalizzazione degli Stati Uniti'
  },
  {
    ticker: 'EIMI',
    isin: 'IE00BKM4GZ66',
    name: 'iShares Core MSCI EM IMI UCITS ETF (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'azionario_emergenti',
    ter: 0.18,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Mercati emergenti globali (Cina, India, Taiwan, Brasile, ecc.)'
  },
  {
    ticker: 'AGGH',
    isin: 'IE00BDBRDM35',
    name: 'iShares Core Global Aggregate Bond UCITS ETF EUR Hedged (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'obbligazionario_globale',
    ter: 0.10,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'Obbligazionario mondiale con copertura valutaria in Euro'
  },
  {
    ticker: 'VAGF',
    isin: 'IE00BG47KH54',
    name: 'Vanguard Global Aggregate Bond UCITS ETF EUR Hedged (Acc)',
    issuer: 'Vanguard',
    assetClass: 'obbligazionario_globale',
    ter: 0.10,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'Obbligazioni globali governative e societarie coperto in EUR'
  },
  {
    ticker: 'XG7S',
    isin: 'LU1681045370',
    name: 'Xtrackers Eurozone Government Bond 1-3 UCITS ETF 1C',
    issuer: 'DWS (Xtrackers)',
    assetClass: 'obbligazionario_gov',
    ter: 0.07,
    distribution: 'Accumulazione',
    exchange: 'XETRA / Borsa Italiana',
    notes: 'Titoli di stato Eurozona a breve termine (1-3 anni) a basso rischio'
  },
  {
    ticker: 'SGLD',
    isin: 'IE00B579F325',
    name: 'Invesco Physical Gold ETC',
    issuer: 'Invesco',
    assetClass: 'oro_commodities',
    ter: 0.12,
    distribution: 'N/A',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Oro fisico con lingotti allocati nei caveau di Londra'
  },
  {
    ticker: 'IGLN',
    isin: 'IE00B4ND3602',
    name: 'iShares Physical Gold ETC',
    issuer: 'iShares (BlackRock)',
    assetClass: 'oro_commodities',
    ter: 0.12,
    distribution: 'N/A',
    exchange: 'Borsa Italiana',
    notes: 'ETC oro fisico con replica diretta'
  },
  {
    ticker: 'LCWD',
    isin: 'LU1781541179',
    name: 'Amundi Core MSCI World (DR) UCITS ETF',
    issuer: 'Amundi',
    assetClass: 'azionario_sviluppati',
    ter: 0.12,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'ETF MSCI World a basso costo (TER 0.12%)'
  },
  {
    ticker: 'MEUD',
    isin: 'LU0908500753',
    name: 'Amundi STOXX Europe 600 UCITS ETF (Acc)',
    issuer: 'Amundi',
    assetClass: 'azionario_sviluppati',
    ter: 0.07,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'Azionario europeo ad altissima diversificazione'
  },
  {
    ticker: 'BTP',
    isin: 'IT0005000000',
    name: 'Buoni del Tesoro Poliennali (Titoli di Stato)',
    issuer: 'Repubblica Italiana (MEF)',
    assetClass: 'obbligazionario_gov',
    ter: 0.00,
    distribution: 'Cedola Semestrale',
    exchange: 'MOT / Borsa Italiana',
    notes: 'Obbligazioni sovrane emesse dallo Stato Italiano'
  },
  {
    ticker: 'BOT',
    isin: 'IT0006000000',
    name: 'Buoni Ordinari del Tesoro (Monetario Italia)',
    issuer: 'Repubblica Italiana (MEF)',
    assetClass: 'monetario',
    ter: 0.00,
    distribution: 'Scarto di emissione',
    exchange: 'MOT / Borsa Italiana',
    notes: 'Titoli di stato italiani a breve scadenza (3, 6, 12 mesi)'
  }
];

const AssetCatalogService = {
  /**
   * Cerca uno strumento nel catalogo JustETF per Ticker, ISIN o Nome
   */
  lookupAsset(query) {
    if (!query) return null;
    const q = String(query).trim().toUpperCase();

    // 1. Cerca nel catalogo integrato
    let match = POPULAR_ASSETS.find(a => 
      a.ticker.toUpperCase() === q || 
      a.isin.toUpperCase() === q
    );

    if (!match) {
      match = POPULAR_ASSETS.find(a => 
        a.ticker.toUpperCase().includes(q) || 
        a.isin.toUpperCase().includes(q) ||
        a.name.toUpperCase().includes(q)
      );
    }

    // 2. Cerca negli asset personalizzati dell'utente
    if (!match) {
      const customAssets = this.getCustomAssets();
      match = customAssets.find(a => 
        (a.ticker && a.ticker.toUpperCase() === q) || 
        (a.isin && a.isin.toUpperCase() === q)
      );
    }

    if (match) {
      const classMeta = ASSET_CLASSES[match.assetClass] || ASSET_CLASSES.monetario;
      return {
        ...match,
        classLabel: classMeta.label,
        color: classMeta.color,
        riskLevel: classMeta.riskLevel,
        isRecognized: true
      };
    }

    return null;
  },

  /**
   * Restituisce tutti gli asset personalizzati salvati dall'utente
   */
  getCustomAssets() {
    try {
      const saved = localStorage.getItem('finanze_custom_assets');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  },

  /**
   * Salva o aggiorna un asset personalizzato inserito dall'utente
   */
  saveCustomAsset(asset) {
    if (!asset || (!asset.ticker && !asset.isin)) return false;
    const list = this.getCustomAssets();
    const cleanTicker = (asset.ticker || '').trim().toUpperCase();
    const cleanIsin = (asset.isin || '').trim().toUpperCase();

    const idx = list.findIndex(a => 
      (cleanTicker && a.ticker === cleanTicker) || 
      (cleanIsin && a.isin === cleanIsin)
    );

    const newObj = {
      ticker: cleanTicker || 'ASSET',
      isin: cleanIsin || 'ND',
      name: (asset.name || cleanTicker || 'Strumento Finanziario').trim(),
      issuer: (asset.issuer || 'Custom').trim(),
      assetClass: asset.assetClass || 'azionario_globale',
      ter: parseFloat(asset.ter) || 0,
      distribution: asset.distribution || 'Accumulazione'
    };

    if (idx >= 0) {
      list[idx] = newObj;
    } else {
      list.push(newObj);
    }

    try {
      localStorage.setItem('finanze_custom_assets', JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Restituisce l'elenco di tutte le macro-classi di investimento con label e colori
   */
  getAllAssetClasses() {
    return Object.values(ASSET_CLASSES);
  },

  /**
   * Restituisce i dettagli di una specifica asset class
   */
  getAssetClassMeta(classId) {
    return ASSET_CLASSES[classId] || ASSET_CLASSES.monetario;
  }
};

if (typeof window !== 'undefined') {
  window.AssetCatalogService = AssetCatalogService;
}

// === js/data/saldiAdapter.js ===
/**
 * SaldiAdapter - Motore Adattatore Deterministico per la scheda 'Saldi' (Google Sheets)
 * 
 * SPECIFICA STRUTTURALE SCHEDA 'Saldi':
 * ==============================================================================
 * La scheda 'Saldi' non è una tabella statica, ma un LEDGER TEMPORALE di conguagli mensili
 * certificati a fine mese (2024, 2025, 2026).
 * 
 * SCHEMA COLONNE:
 * - Col A: 'Data Conguaglio'  (formato DD/MM/YYYY, es. 31/01/2024, 31/10/2026)
 * - Col B: 'Conto / Asset'     (es. 'Buddybank', 'Trade Republic - XEON', 'TOTALE NET WORTH')
 * - Col C: 'Tipologia'         (es. 'Liquidità corrente', 'Patrimonio Complessivo')
 * - Col D: 'Saldo Reale'       (stringa valuta es. '€2.393,39' o numero)
 * - Col E: 'Note'              (audit trail e note descrittive)
 * 
 * REGOLE DETERMINISTICHE DI COMPUTAZIONE:
 * 1. CHECKPOINT COMPLETO: Ogni data T rappresenta uno snapshot chiuso. Se un conto o
 *    un asset non è presente alla data T, il suo saldo a quella data è €0,00.
 * 2. STATO VIVO vs STORICO (ISOLAMENTO ASSET ESTINTI):
 *    - L'ultimo conguaglio certificato (T_max = data con timestamp più alto, es. 31/10/2026)
 *      è la "Single Source of Truth" per i conti e gli asset operativi oggi.
 *    - Conti ed asset presenti SOLO in conguagli passati (es. BTC, Salvadanaio, vecchi ETF)
 *      sono considerati ESTINTI/CHIUSI: il loro saldo attuale è rigorosamente 0 e vengono
 *      esclusi dai wallet e conti attivi della dashboard.
 *    - Nei grafici storici (2024-2026), tali asset rimangono invece visibili con i loro
 *      valori storici effettivi alla data in cui esistevano.
 * 3. RICONCILIAZIONE POST-CONGUAGLIO:
 *    Saldo Attivo Oggi = Saldo Certificato a T_max + Somma(Movimenti dal giorno successivo a T_max a oggi)
 */

class SaldiAdapter {
  /**
   * Normalizza una data dal foglio in oggetto normalizzato { timestamp, monthKey, formattedDate }
   */
  static parseDateInfo(rawDate) {
    if (!rawDate) return null;
    const str = String(rawDate).trim();

    // Formato DD/MM/YYYY o D/M/YYYY
    const dmyMatch = str.match(/^(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{4})$/);
    if (dmyMatch) {
      const d = parseInt(dmyMatch[1], 10);
      const m = parseInt(dmyMatch[2], 10);
      const y = parseInt(dmyMatch[3], 10);
      const ts = new Date(y, m - 1, d).getTime();
      const mPad = String(m).padStart(2, '0');
      const dPad = String(d).padStart(2, '0');
      return {
        timestamp: ts,
        monthKey: `${mPad}/${y}`,
        formattedDate: `${dPad}/${mPad}/${y}`,
        year: y,
        month: m,
        day: d
      };
    }

    // Formato ISO YYYY-MM-DD
    const isoMatch = str.match(/^(\d{4})[\/\.-](\d{1,2})[\/\.-](\d{1,2})$/);
    if (isoMatch) {
      const y = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10);
      const d = parseInt(isoMatch[3], 10);
      const ts = new Date(y, m - 1, d).getTime();
      const mPad = String(m).padStart(2, '0');
      const dPad = String(d).padStart(2, '0');
      return {
        timestamp: ts,
        monthKey: `${mPad}/${y}`,
        formattedDate: `${dPad}/${mPad}/${y}`,
        year: y,
        month: m,
        day: d
      };
    }

    // Prova parsing standard Date
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const m = parsed.getMonth() + 1;
      const d = parsed.getDate();
      const mPad = String(m).padStart(2, '0');
      const dPad = String(d).padStart(2, '0');
      return {
        timestamp: parsed.getTime(),
        monthKey: `${mPad}/${y}`,
        formattedDate: `${dPad}/${mPad}/${y}`,
        year: y,
        month: m,
        day: d
      };
    }

    return null;
  }

  /**
   * Converte una stringa valuta o valore misto in numero float
   */
  static parseCurrency(val) {
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    if (!val) return 0;
    const clean = String(val).replace(/[^0-9,\.-]/g, '').replace(/\./g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  }

  /**
   * Verifica se una riga è un totale o riepilogo aggregato (Net Worth / Totale Liquido)
   */
  static isSummaryRow(row) {
    if (!row || !row.name) return false;
    const n = String(row.name).trim().toLowerCase();
    const tp = String(row.type || '').trim().toLowerCase();
    if (n.startsWith('totale') || n.startsWith('total') || n === 'net worth' || n === 'nw (eur)') return true;
    if (tp.includes('patrimonio complessivo') || tp.includes('disponibilità diretta')) return true;
    return false;
  }

  /**
   * Analizza e struttura l'intero array di righe da Saldi
   */
  static processSaldi(saldiRows) {
    if (!Array.isArray(saldiRows) || saldiRows.length === 0) {
      return {
        latestCheckpoint: null,
        activeAccounts: new Map(),
        activeHoldings: new Map(),
        extinctAssets: new Set(),
        monthlyClosings: new Map(),
        summaryTotalsByMonth: new Map(),
        allRows: []
      };
    }

    const allProcessed = [];
    const summaryTotalsByMonth = new Map();
    let latestCheckpoint = null;

    // 1. Normalizzazione e indicizzazione temporale
    saldiRows.forEach(raw => {
      const dInfo = this.parseDateInfo(raw.date);
      if (!dInfo) return;

      const balance = this.parseCurrency(raw.balance);
      const name = String(raw.name || '').trim();
      const type = String(raw.type || '').trim();
      const notes = String(raw.notes || '').trim();

      const item = {
        dateInfo: dInfo,
        name,
        type,
        balance,
        notes,
        isSummary: this.isSummaryRow(raw)
      };

      allProcessed.push(item);

      if (item.isSummary) {
        if (!summaryTotalsByMonth.has(dInfo.monthKey)) {
          summaryTotalsByMonth.set(dInfo.monthKey, {});
        }
        const sObj = summaryTotalsByMonth.get(dInfo.monthKey);
        const nameLower = name.toLowerCase();
        if (nameLower.includes('net worth') || nameLower.includes('patrimonio')) {
          sObj.netWorth = balance;
        } else if (nameLower.includes('liquido')) {
          sObj.liquidInvested = balance;
        }
      } else {
        if (!latestCheckpoint || dInfo.timestamp > latestCheckpoint.timestamp) {
          latestCheckpoint = dInfo;
        }
      }
    });

    // 2. Estrazione conti e asset attivi dell'ultimo conguaglio
    const activeAccounts = new Map();
    const activeHoldings = new Map();
    const seenAssetsAllHistory = new Set();

    allProcessed.forEach(row => {
      if (row.isSummary) return;
      seenAssetsAllHistory.add(row.name);

      // Appartiene all'ultimo conguaglio certificato?
      if (latestCheckpoint && row.dateInfo.monthKey === latestCheckpoint.monthKey) {
        if (row.name.includes(' - ')) {
          // Asset Broker (es. Trade Republic - XEON)
          const parts = row.name.split(' - ');
          const broker = parts[0].trim();
          const ticker = parts.slice(1).join(' - ').trim();
          if (!activeHoldings.has(broker)) {
            activeHoldings.set(broker, new Map());
          }
          activeHoldings.get(broker).set(ticker, {
            balance: row.balance,
            type: row.type,
            notes: row.notes
          });
        } else {
          // Conto standard
          activeAccounts.set(row.name, {
            balance: row.balance,
            type: row.type,
            notes: row.notes,
            lastReconciledDate: row.dateInfo.formattedDate,
            lastReconciledMonth: row.dateInfo.monthKey
          });
        }
      }
    });

    // 3. Rilevazione asset estinti (presenti in passato ma assenti nell'ultimo conguaglio)
    const extinctAssets = new Set();
    seenAssetsAllHistory.forEach(assetName => {
      if (assetName.includes(' - ')) {
        const parts = assetName.split(' - ');
        const broker = parts[0].trim();
        const ticker = parts.slice(1).join(' - ').trim();
        const brokerMap = activeHoldings.get(broker);
        if (!brokerMap || !brokerMap.has(ticker)) {
          extinctAssets.add(assetName);
        }
      } else {
        if (!activeAccounts.has(assetName)) {
          extinctAssets.add(assetName);
        }
      }
    });

    // 4. Generazione Time-Series Mensile (Monthly Closings 2024-2026)
    const monthlyClosings = new Map();
    const rowsByMonth = new Map();

    allProcessed.forEach(row => {
      if (row.isSummary) return;
      const mKey = row.dateInfo.monthKey;
      if (!rowsByMonth.has(mKey)) {
        rowsByMonth.set(mKey, []);
      }
      rowsByMonth.get(mKey).push(row);
    });

    rowsByMonth.forEach((items, mKey) => {
      const first = items[0];
      const accountsBreakdown = {};
      let totalNW = 0;
      let totalLiquidInvested = 0;

      items.forEach(it => {
        accountsBreakdown[it.name] = it.balance;
        totalNW += it.balance;
        const tpLower = it.type.toLowerCase();
        if (!tpLower.includes('previden') && !tpLower.includes('pension')) {
          totalLiquidInvested += it.balance;
        }
      });

      // Se presente il totale esplicito nel foglio, ha precedenza
      const summary = summaryTotalsByMonth.get(mKey);
      if (summary && summary.netWorth) {
        totalNW = summary.netWorth;
      }
      if (summary && summary.liquidInvested) {
        totalLiquidInvested = summary.liquidInvested;
      }

      monthlyClosings.set(mKey, {
        monthKey: mKey,
        formattedDate: first.dateInfo.formattedDate,
        timestamp: first.dateInfo.timestamp,
        year: first.dateInfo.year,
        month: first.dateInfo.month,
        netWorth: Math.round(totalNW * 100) / 100,
        liquidInvested: Math.round(totalLiquidInvested * 100) / 100,
        accountsBreakdown
      });
    });

    return {
      latestCheckpoint,
      activeAccounts,
      activeHoldings,
      extinctAssets,
      monthlyClosings,
      summaryTotalsByMonth,
      allRows: allProcessed
    };
  }

  /**
   * Riconcilia i movimenti successivi alla data di conguaglio per calcolare i saldi vivi
   */
  static reconcileLiveBalances(activeAccounts, activeHoldings, latestCheckpoint, transactions) {
    if (!latestCheckpoint || !Array.isArray(transactions) || transactions.length === 0) {
      return { activeAccounts, activeHoldings };
    }

    const checkpointTs = latestCheckpoint.timestamp;
    const postCheckpointTxs = transactions.filter(t => {
      const tDate = this.parseDateInfo(t.date);
      return tDate && tDate.timestamp > checkpointTs;
    });

    // Applica delta solo sui conti attivi
    postCheckpointTxs.forEach(t => {
      const amt = typeof t.amount === 'number' ? Math.abs(t.amount) : this.parseCurrency(t.amount);
      const isIncome = t.type === 'income' || t.type === 'Entrata';
      const isExpense = t.type === 'expense' || t.type === 'Uscita';
      const isTransfer = t.type === 'transfer' || t.type === 'Trasferimento' || t.type === 'Giroconto';

      const fromName = t.fromAccount || t.account;
      const toName = t.toAccount;

      if (isIncome && fromName && activeAccounts.has(fromName)) {
        activeAccounts.get(fromName).balance += amt;
      } else if (isExpense && fromName && activeAccounts.has(fromName)) {
        activeAccounts.get(fromName).balance -= amt;
      } else if (isTransfer) {
        if (fromName && activeAccounts.has(fromName)) {
          activeAccounts.get(fromName).balance -= amt;
        }
        if (toName && activeAccounts.has(toName)) {
          activeAccounts.get(toName).balance += amt;
        }
      }
    });

    return { activeAccounts, activeHoldings };
  }
}

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

    // Auto-pulizia conti storici estinti/dismessi (es. BTC, Salvadanaio) rimasti memorizzati nel localStorage
    accs = accs.filter(a => {
      const n = String(a.name || '').trim().toLowerCase();
      if (n === 'btc' || n === 'salvadanaio' || a.id === 'btc' || a.id === 'salvadanaio' || a.isExtinct) return false;
      return true;
    });

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

    // 4.1 Identificazione deterministica dell'ultimo conguaglio (T_max) e isolamento asset estinti
    validSaldiRows.forEach(s => {
      const dInfo = this._parseSheetDateInfo(s.date);
      if (dInfo && (!latestSaldiInfo || dInfo.timestamp >= latestSaldiInfo.timestamp)) {
        latestSaldiInfo = dInfo;
      }
    });

    const activeSaldiAccountNames = new Set();
    const activeSaldiHoldings = new Set();
    validSaldiRows.forEach(s => {
      const dInfo = this._parseSheetDateInfo(s.date);
      if (dInfo && latestSaldiInfo && dInfo.monthKey === latestSaldiInfo.monthKey) {
        const rawName = String(s.name || '').trim();
        if (rawName.includes(' - ')) {
          activeSaldiHoldings.add(rawName.toLowerCase());
          const broker = rawName.split(' - ')[0].trim().toLowerCase();
          activeSaldiAccountNames.add(broker);
        } else {
          activeSaldiAccountNames.add(rawName.toLowerCase());
        }
      }
    });

    const extinctAccountNames = new Set();
    validSaldiRows.forEach(s => {
      const rawName = String(s.name || '').trim();
      if (rawName.includes(' - ')) {
        if (!activeSaldiHoldings.has(rawName.toLowerCase())) {
          extinctAccountNames.add(rawName.toLowerCase());
        }
      } else {
        if (!activeSaldiAccountNames.has(rawName.toLowerCase())) {
          extinctAccountNames.add(rawName.toLowerCase());
        }
      }
    });

    // Pulisce immediatamente dai conti operativi qualsiasi conto estinto o dismesso (es. BTC, Salvadanaio)
    this.accounts = (this.accounts || []).filter(a => {
      const aNameLower = String(a.name || '').trim().toLowerCase();
      if (extinctAccountNames.has(aNameLower)) return false;
      return true;
    });

    // Registra e crea solo i conti ed holdings attivi oggi presenti nei Saldi
    validSaldiRows.forEach(s => {
      const rawName = String(s.name || '').trim();
      const rawType = String(s.type || '').trim();
      const bal = parseFloat(s.balance);
      if (!rawName || isNaN(bal)) return;

      const dInfo = this._parseSheetDateInfo(s.date);

      // Salta la creazione di conti o holdings storiche estinte tra i conti operativi vivi
      if (extinctAccountNames.has(rawName.toLowerCase())) return;

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
            // Solo se l'holding è presente nell'ultimo conguaglio certificato ha saldo/valore attivo oggi
            if (latestHoldingRow && latestHoldingRow.dInfo && latestHoldingRow.dInfo.monthKey === latestSaldiInfo?.monthKey) {
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
            } else {
              // Holding storica chiusa o liquidata nel passato (es. SWDA, XMME, SEGA, LYQ3)
              h.currentValue = 0;
              h.shares = 0;
              h.safeInvestmentQuota = 0;
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
        // Solo se il conto compare nell'ultimo conguaglio certificato ha saldo attivo oggi
        if (latestRow && latestRow.dInfo && latestRow.dInfo.monthKey === latestSaldiInfo?.monthKey) {
          const newBal = parseFloat(latestRow.s.balance) || 0;
          acc.reconciledBalance = newBal;
          acc.balance = newBal;
          if (latestRow.dInfo) {
            acc.lastReconciledMonth = latestRow.dInfo.monthKey;
            acc.lastReconciledDate = latestRow.dInfo.formattedDate;
          }
          reconciledAccountIds.add(acc.id);
        } else {
          // Conto storico chiuso o estinto nel passato (es. BTC o Salvadanaio)
          acc.reconciledBalance = 0;
          acc.balance = 0;
          acc.isExtinct = true;
          if (latestRow && latestRow.dInfo) {
            acc.lastReconciledMonth = latestRow.dInfo.monthKey;
            acc.lastReconciledDate = latestRow.dInfo.formattedDate;
          }
          reconciledAccountIds.add(acc.id);
        }
      }
    });

    // Rimuove dai conti attivi operativi (this.accounts) i conti storici estinti o con saldo zero
    this.accounts = this.accounts.filter(acc => {
      const accNameLower = (acc.name || '').toLowerCase();
      if (extinctAccountNames.has(accNameLower) || acc.isExtinct) return false;
      if (acc.balance > 0 || acc.reconciledBalance > 0) return true;
      if (acc.isBroker) {
        return Array.isArray(acc.holdings) && acc.holdings.some(h => (parseFloat(h.currentValue) || 0) > 0);
      }
      return false;
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

          // Se il conto è un conto storico estinto/dismesso, NON deve essere ricreato dai movimenti
          if (extinctAccountNames.has(cleanName.toLowerCase())) return;

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

const financeStore = new FinanceStore();
if (typeof window !== 'undefined') {
  window.financeStore = financeStore;
}
const mockFinancialData = financeStore; // Compatibilità con componenti esistenti
const CATEGORIES = financeStore.getCategories();
const ACCOUNTS = financeStore.getAccounts().map(a => a.name);

// === js/services/smartCategorizer.js ===
/**
 * Financial WebApp - Smart Auto-Categorization Engine
 * Autocategorizza le transazioni durante la digitazione in tempo reale.
 * Apprende costantemente dalle abitudini di Giorgio (historical learning + keyword dictionary).
 */


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

class SmartCategorizer {
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

const smartCategorizer = new SmartCategorizer();
if (typeof window !== 'undefined') {
  window.SmartCategorizerInstance = smartCategorizer;
}

// === js/services/googleSheetsService.js ===
/**
 * Google Sheets API Service - Client Adattatore Reale
 */


const SHEETS_STORAGE_KEYS = {
  WEB_APP_URL: 'finanze_gas_url',
  SECURITY_TOKEN: 'finanze_gas_token',
  AUTO_SYNC: 'finanze_auto_sync',
  LAST_SYNC: 'finanze_last_sync',
  SANDBOX_MODE: 'finanze_sandbox_mode',
  SYNC_QUEUE: 'finanze_sync_queue'
};

class GoogleSheetsService {
  constructor() {
    this.webAppUrl = localStorage.getItem(SHEETS_STORAGE_KEYS.WEB_APP_URL) || '';
    this.securityToken = localStorage.getItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN) || '';
    this.autoSync = localStorage.getItem(SHEETS_STORAGE_KEYS.AUTO_SYNC) !== 'false';
    this.isBeta = Boolean(APP_ENV.isBeta);

    // Sandbox Mode:
    // - In beta (R&D): Sandbox attiva di default per proteggere il database Google Sheets ufficiale da scritture accidentali.
    // - In main (produzione): Sincronizzazione live attiva di default.
    const storedSandbox = localStorage.getItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE);
    if (storedSandbox !== null) {
      this.sandboxMode = storedSandbox === 'true';
    } else {
      this.sandboxMode = Boolean(APP_ENV.defaultSandboxMode);
    }

    this.isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    this.syncStatus = 'idle';
    this.isProcessingQueue = false;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => { 
        this.isOnline = true; 
        this.updateStatusBadge(); 
        this.processQueue();
      });
      window.addEventListener('offline', () => { 
        this.isOnline = false; 
        this.updateStatusBadge(); 
      });

      // Rinfresco automatico leggero in background quando l'app torna visibile (dopo standby o switch app)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.isOnline && this.isConfigured() && this.autoSync) {
          const last = localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC);
          const now = Date.now();
          if (!last || (now - new Date(last).getTime()) > 3 * 60 * 1000) {
            this.fetchAllData().catch(() => {});
          }
        }
      });

      // Tenta lo svuotamento automatico della coda offline all'avvio dopo breve pausa
      setTimeout(() => {
        if (this.isOnline && this.isConfigured()) {
          this.processQueue();
        }
      }, 1800);
    }
  }

  // === CODA DI SINCRONIZZAZIONE OFFLINE (LOCAL-FIRST) ===
  getQueue() {
    try {
      const saved = localStorage.getItem(SHEETS_STORAGE_KEYS.SYNC_QUEUE);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveQueue(queue) {
    try {
      localStorage.setItem(SHEETS_STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue || []));
    } catch (e) {}
  }

  enqueueOperation(action, payload) {
    const queue = this.getQueue();
    const item = {
      id: 'sq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      action,
      payload,
      createdAt: new Date().toISOString(),
      attempts: 0
    };
    queue.push(item);
    this.saveQueue(queue);
    this.updateStatusBadge();
    return item;
  }

  getPendingQueueCount() {
    return this.getQueue().length;
  }

  async processQueue() {
    if (this.isProcessingQueue || !this.isOnline || !this.isConfigured() || this.sandboxMode) return;
    const queue = this.getQueue();
    if (!queue || queue.length === 0) return;

    this.isProcessingQueue = true;
    this.syncStatus = 'syncing';
    this.updateStatusBadge();

    const remaining = [];
    for (const item of queue) {
      try {
        const bodyPayload = {
          action: item.action,
          token: this.securityToken,
          ...item.payload
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8500);

        const response = await fetch(this.webAppUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(bodyPayload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const res = await response.json();
        if (res.status !== 'success') {
          item.attempts = (item.attempts || 0) + 1;
          if (item.attempts < 5) remaining.push(item);
        }
      } catch (err) {
        console.warn('Errore processamento elemento coda:', err);
        item.attempts = (item.attempts || 0) + 1;
        remaining.push(item);
        // Interrompi se la connessione è caduta
        if (!navigator.onLine) break;
      }
    }

    this.saveQueue(remaining);
    this.isProcessingQueue = false;
    this.syncStatus = remaining.length === 0 ? 'connected' : 'idle';
    localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    this.updateStatusBadge();
  }

  isSandboxMode() {
    return this.sandboxMode;
  }

  setSandboxMode(val) {
    this.sandboxMode = Boolean(val);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE, this.sandboxMode ? 'true' : 'false');
    this.updateStatusBadge();
  }

  isConfigured() {
    return Boolean(this.webAppUrl && this.webAppUrl.startsWith('https://script.google.com/macros/s/'));
  }

  sanitizeUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    let url = rawUrl.trim();
    if (url.includes('/edit')) {
      url = url.replace(/\/edit(\?.*)?$/, '/exec');
    }
    return url;
  }

  saveConfig(url, token, autoSync = true, sandboxMode = this.sandboxMode) {
    this.webAppUrl = this.sanitizeUrl(url);
    this.securityToken = (token || '').trim();
    this.autoSync = autoSync;
    this.sandboxMode = Boolean(sandboxMode);

    localStorage.setItem(SHEETS_STORAGE_KEYS.WEB_APP_URL, this.webAppUrl);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN, this.securityToken);
    localStorage.setItem(SHEETS_STORAGE_KEYS.AUTO_SYNC, this.autoSync);
    localStorage.setItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE, this.sandboxMode ? 'true' : 'false');

    this.updateStatusBadge();
  }

  getConfig() {
    return {
      webAppUrl: this.webAppUrl,
      securityToken: this.securityToken,
      autoSync: this.autoSync,
      sandboxMode: this.sandboxMode,
      isConfigured: this.isConfigured(),
      lastSync: localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC)
    };
  }

  async testConnection(customUrl = null, customToken = null) {
    const urlToCheck = this.sanitizeUrl(customUrl || this.webAppUrl);
    const tokenToCheck = (customToken !== null ? customToken : this.securityToken).trim();

    if (!urlToCheck) {
      return { success: false, message: 'Inserisci l\'URL della Web App di Google Apps Script.' };
    }

    if (urlToCheck.includes('docs.google.com/spreadsheets/')) {
      return { 
        success: false, 
        message: '⚠️ Questo è il link del foglio Google Sheets, non della Web App! Clicca su Estensioni > Apps Script > Distribuisci > Nuova distribuzione (tipo Web App) e copia il link che termina con /exec.' 
      };
    }

    if (!urlToCheck.startsWith('https://script.google.com/macros/s/')) {
      return { 
        success: false, 
        message: 'URL non valido: deve iniziare con "https://script.google.com/macros/s/" e terminare con "/exec".' 
      };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(urlToCheck);
      targetUrl.searchParams.set('action', 'getAllData');
      if (tokenToCheck) {
        targetUrl.searchParams.set('token', tokenToCheck);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(targetUrl.toString(), {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const text = await response.text();
      let res;

      try {
        res = JSON.parse(text);
      } catch (parseErr) {
        if (text.includes('accounts.google.com') || text.includes('ServiceLogin') || text.includes('<!DOCTYPE html>')) {
          this.syncStatus = 'error';
          this.updateStatusBadge();
          return {
            success: false,
            message: '🚫 Permessi Google insufficienti: lo script richiede l\'accesso account. Vai su Apps Script > Gestisci distribuzioni > Modifica e imposta "Chi ha accesso" su "Chiunque" (il foglio rimane protetto dal tuo Security Token personale).'
          };
        }
        this.syncStatus = 'error';
        this.updateStatusBadge();
        return { success: false, message: 'Risposta non valida dallo script Google Apps Script.' };
      }

      if (res.status === 'success') {
        this.syncStatus = 'connected';
        if (customUrl) this.webAppUrl = urlToCheck;
        if (customToken !== null) this.securityToken = tokenToCheck;
        localStorage.setItem(SHEETS_STORAGE_KEYS.WEB_APP_URL, this.webAppUrl);
        localStorage.setItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN, this.securityToken);
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();

        const txCount = res.data && res.data.transactions ? res.data.transactions.length : (res.count || 0);
        const saldiCount = res.data && res.data.saldi ? res.data.saldi.length : 0;
        return {
          success: true,
          message: `✅ Connessione stabilita con "${res.sheetName || 'Finanze - Movimenti'}"! Trovati ${txCount} movimenti e ${saldiCount} saldi verificati.`,
          data: res.data
        };
      } else {
        this.syncStatus = 'error';
        this.updateStatusBadge();
        const msg = res.message || '';
        if (msg.toLowerCase().includes('token') || msg.toLowerCase().includes('accesso negato')) {
          return { success: false, message: '🔑 Token di sicurezza non valido: verifica che il Security Token inserito qui sia identico a quello configurato nel file Code.gs.' };
        }
        return { success: false, message: msg || 'Errore di risposta dallo script.' };
      }
    } catch (err) {
      this.syncStatus = 'error';
      this.updateStatusBadge();
      if (err.name === 'AbortError') {
        return { success: false, message: '⏱️ Timeout connessione (12s): Google Apps Script sta impiegando troppo tempo ad avviarsi (cold start). Riprova tra pochi istanti.' };
      }
      return { success: false, message: 'Impossibile contattare lo script: ' + (err.message || 'Verifica la connessione internet e l\'URL della Web App.') };
    }
  }

  async fetchAllData(forceRefresh = false) {
    if (!this.isConfigured()) return null;

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const targetUrl = new URL(this.sanitizeUrl(this.webAppUrl));
      targetUrl.searchParams.set('action', 'getAllData');
      if (this.securityToken) {
        targetUrl.searchParams.set('token', this.securityToken);
      }
      if (forceRefresh) {
        targetUrl.searchParams.set('force', '1');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(targetUrl.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);

      const res = await response.json();

      if (res.status === 'success' && res.data) {
        this.syncStatus = 'connected';
        const nowIso = new Date().toISOString();
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, nowIso);
        this.updateStatusBadge();
        if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
          window.dispatchEvent(new CustomEvent('finanze:sync-completed', { detail: { data: res.data, timestamp: nowIso } }));
        }
        return res.data;
      }
      throw new Error(res.message || 'Risposta non valida');
    } catch (err) {
      console.warn('Sync Google Sheets non riuscita, uso cache locale:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return null;
    }
  }

  async pushTransaction(transaction) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Scrittura bloccata: la modifica resta solo fittizia sul dispositivo e NON intacca Google Sheets.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured()) return { success: true, localOnly: true };

    // Se offline, accoda subito per zero attese
    if (!this.isOnline) {
      this.enqueueOperation('addTransaction', { transaction });
      return { success: true, queued: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'addTransaction',
        token: this.securityToken,
        transaction: transaction
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true, rowNumber: res.rowNumber };
      }
      throw new Error(res.message);
    } catch (err) {
      console.warn('Network non disponibile o timeout push, accodamento offline automatico:', err.message);
      this.enqueueOperation('addTransaction', { transaction });
      this.syncStatus = 'idle';
      this.updateStatusBadge();
      return { success: true, queued: true };
    }
  }

  async updateTransaction(rowNumber, transaction) {
    if (this.sandboxMode) {
      console.log('🛡️ [Sandbox] Aggiornamento remoto bloccato.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured() || !rowNumber) return { success: true, localOnly: true };

    if (!this.isOnline) {
      this.enqueueOperation('updateTransaction', { rowNumber, transaction });
      return { success: true, queued: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'updateTransaction',
        token: this.securityToken,
        rowNumber: rowNumber,
        transaction: transaction
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      if (res.status === 'success') {
        this.syncStatus = 'connected';
        localStorage.setItem(SHEETS_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
        this.updateStatusBadge();
        return { success: true };
      }
      throw new Error(res.message);
    } catch (err) {
      console.warn('Update non riuscito, accodamento offline automatico:', err.message);
      this.enqueueOperation('updateTransaction', { rowNumber, transaction });
      this.syncStatus = 'idle';
      this.updateStatusBadge();
      return { success: true, queued: true };
    }
  }

  async deleteTransaction(rowNumber) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Eliminazione remota bloccata: cancellazione solo locale fittizia.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured()) return { success: true, localOnly: true };

    if (!this.isOnline) {
      this.enqueueOperation('deleteTransaction', { rowNumber });
      return { success: true, queued: true };
    }

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'deleteTransaction',
        token: this.securityToken,
        rowNumber: rowNumber
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      this.syncStatus = 'connected';
      this.updateStatusBadge();
      return { success: res.status === 'success' };
    } catch (err) {
      console.warn('Delete non riuscito, accodamento offline automatico:', err.message);
      this.enqueueOperation('deleteTransaction', { rowNumber });
      this.syncStatus = 'idle';
      this.updateStatusBadge();
      return { success: true, queued: true };
    }
  }

  async updateAccountBalance(accountName, balance, type) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Aggiornamento saldo remoto bloccato: conguaglio solo locale fittizio.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured()) return { success: true, localOnly: true };

    if (!this.isOnline) {
      this.enqueueOperation('updateAccountBalance', { accountName, balance, type });
      return { success: true, queued: true };
    }

    try {
      const payload = {
        action: 'updateAccountBalance',
        token: this.securityToken,
        accountName: accountName,
        balance: balance,
        type: type
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8500);

      const response = await fetch(this.webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const res = await response.json();
      return { success: res.status === 'success' };
    } catch (err) {
      console.warn('Update account balance offline, accodamento:', err.message);
      this.enqueueOperation('updateAccountBalance', { accountName, balance, type });
      return { success: true, queued: true };
    }
  }

  updateStatusBadge() {
    const indicatorEl = document.querySelector('.sheet-status-indicator');
    const nameEl = document.querySelector('.sheet-status-name');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');
    const mobileText = document.querySelector('.mobile-sheet-pill span:not(.dot)');
    const cloudSyncDot = document.querySelector('.cloud-sync-dot');
    const cloudSyncBtn = document.querySelector('.cloud-sync-btn');

    const pendingCount = this.getPendingQueueCount();

    // Notifica ad altri componenti dell'interfaccia
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('finanze:sync-status-changed', {
        detail: {
          status: this.syncStatus,
          isConfigured: this.isConfigured(),
          pendingQueue: pendingCount,
          lastSync: localStorage.getItem(SHEETS_STORAGE_KEYS.LAST_SYNC),
          sandboxMode: this.sandboxMode
        }
      }));
    }

    if (!indicatorEl || !descEl) return;

    if (pendingCount > 0 && this.syncStatus !== 'syncing') {
      indicatorEl.style.backgroundColor = '#0A84FF';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(10, 132, 255, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = `☁️ ${pendingCount} in coda offline`;
      if (mobilePill) mobilePill.style.backgroundColor = '#0A84FF';
      if (mobileText) mobileText.textContent = `Coda (${pendingCount})`;
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot queued';
        cloudSyncDot.style.backgroundColor = '#0A84FF';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = `Cloud: ${pendingCount} modifiche in coda offline`;
      return;
    }

    if (this.sandboxMode) {
      indicatorEl.style.backgroundColor = '#FF9500';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 149, 0, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze (Sandbox)';
      descEl.textContent = '🛡️ Sandbox Protetto';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF9500';
      if (mobileText) mobileText.textContent = '🛡️ Sandbox';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot sandbox';
        cloudSyncDot.style.backgroundColor = '#FF9500';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Modalità Sandbox attiva';
      return;
    }

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#8E8E93';
      indicatorEl.style.boxShadow = '0 0 0 2px rgba(142, 142, 147, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze (Locale)';
      descEl.textContent = '📱 Solo su questo dispositivo';
      if (mobilePill) mobilePill.style.backgroundColor = '#8E8E93';
      if (mobileText) mobileText.textContent = 'Locale';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot local';
        cloudSyncDot.style.backgroundColor = '#8E8E93';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud Google Sheets non configurato (Dati locali)';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
      if (mobileText) mobileText.textContent = 'Sync...';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot syncing';
        cloudSyncDot.style.backgroundColor = '#0071E3';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Sincronizzazione in corso...';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Connesso Live';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
      if (mobileText) mobileText.textContent = 'Connesso';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot connected';
        cloudSyncDot.style.backgroundColor = '#34C759';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Sincronizzato con Google Sheets';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
      if (mobileText) mobileText.textContent = 'Offline';
      if (cloudSyncDot) {
        cloudSyncDot.className = 'cloud-sync-dot error';
        cloudSyncDot.style.backgroundColor = '#FF3B30';
      }
      if (cloudSyncBtn) cloudSyncBtn.title = 'Cloud: Errore di connessione a Google Sheets';
    }
  }
}

const googleSheetsService = new GoogleSheetsService();

// === js/services/financialAssistantService.js ===
/**
 * Apple Design System - Financial Assistant Service (AI Personal CFO)
 * Analizza costantemente i dati finanziari di Giorgio:
 * - Genera Briefing Esecutivo (Anomalie, Runway, Allocazione Surplus, F.I.R.E.)
 * - Motore conversazionale locale ad alta fedeltà (Zero-Latency, 100% Privacy)
 * - Predisposizione opzionale per Google Gemini API
 */


class FinancialAssistantService {
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

    // 1. Radar Anomalie & Freshness Chiusura Mese (attivo solo a fine mese o con arretrati)
    const anomalyInsights = [];
    const recStatus = financeStore.getMonthlyReconciliationStatus();
    if (recStatus.shouldShowAlert && !recStatus.isFullyReconciled) {
      anomalyInsights.push({
        title: `Chiusura Mese: ${recStatus.targetMonthName} in Sospeso`,
        desc: `Il ${recStatus.staleAccounts.map(a => `<strong>${a.name}</strong> (fermo a ${a.lastMonthName})`).join(', ')} non è aggiornato. Inserisci la quota da busta paga per consolidare il Net Worth.`,
        level: 'warning',
        action: 'Apri la Chiusura Fine Mese dalla Dashboard o dallo Storico per riconciliare i saldi.'
      });
    }

    if (anomalies.length > 0) {
      anomalies.forEach(a => {
        anomalyInsights.push({
          title: `Picco spesa: ${cleanCategoryName(a.category)}`,
          desc: `La spesa attuale (${this.formatCurrency(a.currentAmount)}) supera del +${a.spikePercent}% la tua media storica (${this.formatCurrency(a.historicalAvg)}).`,
          level: a.spikePercent > 50 ? 'warning' : 'info',
          action: 'Verifica le singole uscite per accertarti che non siano addebiti non previsti.'
        });
      });
    } else if (recStatus.isFullyReconciled) {
      anomalyInsights.push({
        title: 'Nessuna anomalia rilevata',
        desc: 'I tuoi consumi del mese sono perfettamente allineati alle medie storiche.',
        level: 'success',
        action: 'Mantieni questo ritmo per massimizzare il surplus a fine mese.'
      });
    }

    // 2. Sicurezza & Runway
    const xeonAcc = accounts.find(a => a.name.toLowerCase().includes('xeon'));
    const xeonBal = summary.xeonTotal > 0 ? summary.xeonTotal : (xeonAcc ? xeonAcc.balance : 4500.00);
    const monthlyExp = summary.monthlyExpense || 850.00;
    const runwayMonths = (monthlyExp > 0 ? (xeonBal / monthlyExp) : 6.0).toFixed(1);

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
    if (q.includes('conguagli') || q.includes('chiusur') || q.includes('fine mese') || q.includes('pensione') || q.includes('busta paga')) {
      const rec = financeStore.getMonthlyReconciliationStatus();
      if (!rec.isFullyReconciled) {
        return `⚠️ **Chiusura Mese di ${rec.targetMonthName} in Sospeso**:\n\nIl conto **Fondo Pensione** è fermo a ${rec.staleAccounts[0].lastMonthName} (${this.formatCurrency(rec.staleAccounts[0].balance)}).\n\n👉 **Come procedere**:\n1. Apri la funzione **Chiusura Fine Mese** dalla Dashboard o dalla sezione *Storico*.\n2. Inserisci semplicemente la **quota letta sulla busta paga** (l'app calcolerà automaticamente il saldo risultante sommando la differenza).\n3. Clicca su **Conferma Chiusura** per consolidare il Net Worth e allineare il mese!`;
      } else {
        return `✅ **Chiusura Fine Mese Allineata**:\nTutti i tuoi conti risultano riconciliati e aggiornati per **${rec.targetMonthName}**. Il Patrimonio Netto ufficiale consolidato è di **${this.formatCurrency(summary.netWorth)}**.`;
      }
    }

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
      const xeon = summary.xeonTotal > 0 ? summary.xeonTotal : (accounts.find(a => a.name.toLowerCase().includes('xeon'))?.balance || 4500.00);
      const months = (xeon / (summary.monthlyExpense || 850)).toFixed(1);
      return `🛡️ **Runway & Sicurezza**: con il capitale di **${this.formatCurrency(xeon)}** allocato sul comparto monetario *XEON*, hai un'autonomia coperta di **${months} mesi** di spese correnti a zero entrate. Sei pienamente protetto da imprevisti.`;
    }

    if (q.includes('ottimizz') || q.includes('consigl') || q.includes('tass') || q.includes('invest')) {
      return `💡 **Consiglio FinTech Personalizzato**:\n\n1. **Fondo Pensione (Art. 51 TUIR)**: puoi versare fino a € 5.164,57 all'anno deducibili al 100% dal reddito IRPEF, ottenendo un rimborso fiscale fino a circa il 35-43%.\n2. **PAC ETF VWCE**: mantieni l'investimento sistematico automatico per sfruttare il dollar-cost averaging.\n3. **Cassa Overnight**: lascia la liquidità di rispetto su XEON per generare interessi senza vincoli temporali.`;
    }

    if (q.includes('patrimonio') || q.includes('net worth') || q.includes('saldo') || q.includes('totale')) {
      return `🏛️ **Stato Patrimoniale**: il tuo Patrimonio Netto attuale ammonta a **${this.formatCurrency(summary.netWorth)}**, suddiviso in:\n- **Liquidità cassa immediata**: ${this.formatCurrency(summary.liquidTotal)}\n- **Investimenti & Previdenza**: ${this.formatCurrency(summary.netWorth - summary.liquidTotal)}\n\nIl tuo Tasso di Risparmio mensile è al **${summary.savingsRate}%** (+${this.formatCurrency(summary.savingsAmount)}).`;
    }

    // Risposta predefinita con panoramica esecutiva
    const xeonDefault = summary.xeonTotal > 0 ? summary.xeonTotal : (accounts.find(a => a.name.toLowerCase().includes('xeon'))?.balance || 4500.00);
    return `👋 Ciao! Sono il tuo **Assistente Finanziario Personale**.

Al momento il tuo bilancio è in **ottima salute** (Health Score: ${financeStore.getFinancialHealthScore().score}/100):
- **Patrimonio Netto**: ${this.formatCurrency(summary.netWorth)}
- **Spesa giornaliera sostenibile**: ${this.formatCurrency(budget.dailySafeSpend)}/giorno
- **Fondo Emergenza Monetario**: ${(xeonDefault / (summary.monthlyExpense || 850)).toFixed(1)} mesi di autonomia

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

const financialAssistantService = new FinancialAssistantService();
if (typeof window !== 'undefined') {
  window.FinancialAssistantServiceInstance = financialAssistantService;
}

// === js/services/biometricService.js ===
/**
 * BiometricService - Sblocco Biometrico Apple Face ID / Touch ID (WebAuthn)
 * Conforme alle Human Interface Guidelines Apple per autenticazione nativa
 */

const BiometricService = {
  /**
   * Verifica se il browser/ambiente supporta le Web Authentication API (WebAuthn)
   */
  isSupported() {
    return typeof window !== 'undefined' &&
           !!window.PublicKeyCredential &&
           !!navigator.credentials &&
           typeof navigator.credentials.get === 'function';
  },

  /**
   * Verifica se è disponibile un autenticatore biometrico di piattaforma (Face ID / Touch ID)
   */
  async isPlatformAuthenticatorAvailable() {
    if (!this.isSupported()) return false;
    try {
      if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Verifica se l'utente ha abilitato lo sblocco biometrico nelle impostazioni
   */
  isEnabled() {
    try {
      return localStorage.getItem('finanze_biometric_enabled') === 'true';
    } catch (e) {
      return false;
    }
  },

  /**
   * Abilita o disabilita lo sblocco biometrico
   */
  setEnabled(enabled) {
    try {
      if (enabled) {
        localStorage.setItem('finanze_biometric_enabled', 'true');
      } else {
        localStorage.removeItem('finanze_biometric_enabled');
        localStorage.removeItem('finanze_biometric_cred_id');
      }
    } catch (e) {
      console.warn('Impossibile salvare preferenza biometrica:', e);
    }
  },

  /**
   * Registra una chiave biometrica locale di piattaforma (Face ID / Touch ID)
   */
  async enrollBiometric() {
    if (!this.isSupported()) {
      throw new Error('WebAuthn non supportato su questo dispositivo o browser.');
    }

    // Verifica disponibilità piattaforma
    const available = await this.isPlatformAuthenticatorAvailable();
    if (!available) {
      console.info('Autenticatore di piattaforma non segnalato, tentativo diretto.');
    }

    const challenge = new Uint8Array(32);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(challenge);
    } else {
      for (let i = 0; i < 32; i++) challenge[i] = Math.floor(Math.random() * 256);
    }

    const userId = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(userId);
    } else {
      for (let i = 0; i < 16; i++) userId[i] = Math.floor(Math.random() * 256);
    }

    const hostname = (window.location && window.location.hostname) ? window.location.hostname : 'localhost';

    const creationOptions = {
      challenge,
      rp: {
        name: "Financial WebApp Apple",
        id: hostname
      },
      user: {
        id: userId,
        name: "giorgio@personal-finance",
        displayName: "Giorgio"
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },  // ES256 (standard Apple Face ID / Touch ID)
        { alg: -257, type: "public-key" } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform", // Forza Face ID / Touch ID nativo
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "none"
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: creationOptions
      });

      if (credential && credential.id) {
        // Memorizza ID credenziale
        localStorage.setItem('finanze_biometric_cred_id', credential.id);
        this.setEnabled(true);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Errore registrazione biometrica:', err);
      // Se l'errore è dovuto al contesto (es. file:// o cert non attendibile), informiamo l'utente
      if (err.name === 'NotAllowedError') {
        throw new Error('Riconoscimento biometrico annullato o negato dall\'utente.');
      } else if (err.name === 'SecurityError') {
        throw new Error('WebAuthn richiede un contesto sicuro (HTTPS o localhost).');
      } else {
        throw new Error(err.message || 'Errore durante la registrazione biometrica.');
      }
    }
  },

  /**
   * Esegue la verifica biometrica (Face ID / Touch ID)
   */
  async authenticate() {
    if (!this.isEnabled() || !this.isSupported()) {
      return false;
    }

    const challenge = new Uint8Array(32);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(challenge);
    } else {
      for (let i = 0; i < 32; i++) challenge[i] = Math.floor(Math.random() * 256);
    }

    const hostname = (window.location && window.location.hostname) ? window.location.hostname : 'localhost';
    const credId = localStorage.getItem('finanze_biometric_cred_id');

    const getOptions = {
      challenge,
      timeout: 60000,
      userVerification: "required",
      rpId: hostname
    };

    if (credId) {
      try {
        // Decodifica l'ID credenziale registrata
        const rawId = Uint8Array.from(atob(credId), c => c.charCodeAt(0));
        getOptions.allowCredentials = [{
          id: rawId,
          type: 'public-key',
          transports: ['internal']
        }];
      } catch (e) {
        // Fallback su chiamata aperta
      }
    }

    try {
      const assertion = await navigator.credentials.get({
        publicKey: getOptions
      });
      return !!assertion;
    } catch (err) {
      console.warn('Autenticazione biometrica annullata o non riuscita:', err);
      return false;
    }
  }
};

if (typeof window !== 'undefined') {
  window.BiometricService = BiometricService;
}

// === js/components/monthlyClosingModal.js ===
/**
 * Apple Design System - Chiusura Fine Mese & Riconciliazione Saldi Studio
 * Gestione guidata del conguaglio mensile e consolidamento Net Worth:
 * - Supporto per Saldo Effettivo (conti bancari/investimento)
 * - Supporto per Quota Aggiuntiva da Busta Paga (Fondo Pensione / Previdenza)
 * - Calcolo automatico in tempo reale del Net Worth risultante
 * - Notifiche e alert proattivi per conti rimasti fermi al mese precedente
 */


class MonthlyClosingModal {
  constructor() {
    this.targetMonth = null;
    this.onSuccessCallback = null;
    this.accountInputs = new Map(); // accId -> { mode: 'balance'|'delta', value: number, createTx: boolean, note: string }
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  open(options = {}) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    const defaultMonth = `${String(curMonth).padStart(2, '0')}/${curYear}`;

    this.targetMonth = options.targetMonth || defaultMonth;
    this.onSuccessCallback = options.onSuccess || null;
    this.focusAccount = options.focusAccount || null;

    this.render(modalRoot);
  }

  close() {
    const overlay = document.getElementById('monthly-closing-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      setTimeout(() => {
        const modalRoot = document.getElementById('modal-container');
        if (modalRoot) modalRoot.innerHTML = '';
      }, 250);
    }
  }

  render(modalRoot) {
    const status = financeStore.getMonthlyReconciliationStatus(this.targetMonth);
    const accounts = financeStore.getAccounts();
    const currentNW = financeStore.summary.netWorth;
    const savedClosing = financeStore.getMonthlyClosing(this.targetMonth);

    // Inizializza lo stato degli input con i dati salvati di quel fine mese se disponibili
    this.accountInputs.clear();
    accounts.forEach(acc => {
      const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension');
      const defaultMode = acc.defaultMode || (isPension ? 'delta' : 'balance');
      const savedBal = savedClosing?.accounts?.[acc.name];
      const hasSaved = typeof savedBal === 'number';

      this.accountInputs.set(acc.name, {
        mode: defaultMode,
        rawInputValue: hasSaved ? String(savedBal) : '',
        value: hasSaved ? savedBal : 0,
        isModified: hasSaved,
        createTx: true,
        note: isPension 
          ? `Versamento Fondo Pensione Busta Paga (${status.targetMonthName})` 
          : `Conguaglio Saldo ${acc.name} (${status.targetMonthName})`
      });
    });

    const now = new Date();
    let tYear = now.getFullYear();
    let tMonth = now.getMonth() + 1;
    if (this.targetMonth && this.targetMonth.includes('/')) {
      const parts = this.targetMonth.split('/');
      tMonth = parseInt(parts[0], 10) || tMonth;
      tYear = parseInt(parts[1], 10) || tYear;
    }
    const lastDayOfTargetMonth = new Date(tYear, tMonth, 0).getDate();
    const effectiveClosingDate = `${String(lastDayOfTargetMonth).padStart(2, '0')}/${String(tMonth).padStart(2, '0')}/${tYear}`;

    const monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];

    const monthOptions = [];
    for (let m = 1; m <= 12; m++) {
      const key = `${String(m).padStart(2, '0')}/${tYear}`;
      monthOptions.push({ key, label: `${monthNames[m - 1]} ${tYear}` });
    }

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="monthly-closing-overlay">
        <div class="apple-modal-sheet open" id="monthly-closing-sheet" style="max-width: 640px; width: 95%;">
          <div class="modal-handle"></div>
          
          <div class="modal-header" style="margin-bottom: var(--space-box-gap-md);">
            <div>
              <div class="cluster-gap-xs" style="margin-bottom: 2px;">
                <span style="color: var(--apple-blue);">${getIcon('conguaglio', 18)}</span>
                <h3 style="margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.02em;">Chiusura Fine Mese & Riconciliazione Saldi</h3>
              </div>
              <span style="font-size: 12.5px; color: var(--text-secondary);">
                Consolida i saldi al fine mese (${effectiveClosingDate}) e registra le quote da busta paga per il Net Worth
              </span>
            </div>
            <button class="modal-close-btn" id="btn-close-closing-modal">Chiudi</button>
          </div>

          <!-- Mese di Riferimento & Summary Live Strip -->
          <div class="closing-summary-strip" style="background: var(--bg-hover); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-card-pad-sm) var(--space-card-pad); margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <label for="select-closing-month" style="font-size: 12.5px; font-weight: 600; color: var(--text-secondary);">Mese di Chiusura:</label>
                <div class="apple-select-wrapper" style="min-width: 140px;">
                  <select id="select-closing-month" class="apple-select" style="padding: 4px 28px 4px 10px; font-size: 13px; font-weight: 600; height: 32px;">
                    ${monthOptions.map(m => `<option value="${m.key}" ${m.key === this.targetMonth ? 'selected' : ''}>${m.label}</option>`).join('')}
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <span style="font-size: 11px; padding: 2px 8px; border-radius: 9999px; background: rgba(0, 113, 227, 0.1); color: var(--apple-blue); font-weight: 600;">Data contabile: ${effectiveClosingDate}</span>
              </div>
              <div id="closing-status-pill" style="font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 9999px; background: ${status.isFullyReconciled ? 'rgba(52, 199, 89, 0.15)' : 'rgba(255, 149, 0, 0.15)'}; color: ${status.isFullyReconciled ? 'var(--apple-green)' : 'var(--apple-orange)'};">
                ${status.isFullyReconciled ? 'Tutti i conti allineati' : `${status.pendingCount} conto in sospeso`}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
              <div>
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 2px;">Net Worth Attuale</span>
                <strong style="font-size: 15px; font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums;">
                  ${this.formatCurrency(currentNW)}
                </strong>
              </div>
              <div>
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 2px;">Nuovo Net Worth Stimato</span>
                <strong id="preview-new-nw" style="font-size: 15px; font-weight: 700; color: var(--apple-blue); font-variant-numeric: tabular-nums;">
                  ${this.formatCurrency(currentNW)}
                </strong>
              </div>
              <div>
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 2px;">Variazione Netta</span>
                <strong id="preview-nw-delta" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); font-variant-numeric: tabular-nums;">
                  +0,00 €
                </strong>
              </div>
            </div>
          </div>

          <!-- Alert Promemoria Sezione Sospesi -->
          ${status.staleAccounts.length > 0 ? `
            <div style="display: flex; gap: 10px; align-items: flex-start; background: rgba(255, 149, 0, 0.1); border: 1px solid rgba(255, 149, 0, 0.3); border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: var(--space-box-gap-md);">
              <span style="color: var(--apple-orange); display: flex; align-items: center; margin-top: 1px;">${getIcon('warning', 18)}</span>
              <div style="font-size: 12.5px; color: var(--text-primary); line-height: 1.4;">
                <strong>Promemoria Fondo Pensione / Conti non aggiornati:</strong><br/>
                ${status.staleAccounts.map(a => `Il conto <strong>${a.name}</strong> è fermo a ${a.lastMonthName}. Per il Fondo Pensione inserisci semplicemente la quota letta sul cedolino della busta paga.`).join('<br/>')}
              </div>
            </div>
          ` : ''}

          <!-- Lista Conti per Riconciliazione -->
          <div class="closing-accounts-list" style="display: flex; flex-direction: column; gap: var(--space-box-gap-sm); max-height: 48vh; overflow-y: auto; padding-right: 4px; margin-bottom: var(--space-box-gap-md);">
            ${accounts.map(acc => this.renderAccountRow(acc, status)).join('')}
          </div>

          <!-- Azioni di Chiusura -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-top: var(--space-box-gap-md); border-top: 1px solid var(--border-subtle);">
            <button class="apple-btn-secondary" id="btn-cancel-closing">Annulla</button>
            <button class="apple-btn-primary" id="btn-confirm-monthly-closing" style="padding: 10px 20px; font-size: 13.5px; font-weight: 600;">
              ${getIcon('conguaglio', 14)}
              <span>Conferma Chiusura e Salva Saldi [${status.targetMonthName}]</span>
            </button>
          </div>

        </div>
      </div>
    `;

    this.bindEvents(modalRoot);
    this.updatePreviewCalculations();
  }

  renderAccountRow(acc, status) {
    const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension');
    const isInvestment = acc.isInvestment || acc.id === 'xeon' || acc.id === 'vwce' || (acc.name || '').toLowerCase().includes('xeon') || (acc.name || '').toLowerCase().includes('vwce');
    const recMonth = acc.lastReconciledMonth || this.targetMonth;
    const isStale = (recMonth !== this.targetMonth);
    const defaultMode = acc.defaultMode || (isPension ? 'delta' : 'balance');
    const isFocused = this.focusAccount && this.focusAccount.toLowerCase() === acc.name.toLowerCase();

    const savedClosing = financeStore.getMonthlyClosing(this.targetMonth);
    const savedBal = savedClosing?.accounts?.[acc.name];
    const initialInputVal = (typeof savedBal === 'number' && defaultMode === 'balance') ? savedBal : '';
    const displayedBal = (typeof savedBal === 'number') ? savedBal : acc.balance;

    return `
      <div class="reconcile-card ${isStale ? 'reconcile-stale' : ''} ${isFocused ? 'reconcile-focused' : ''}" data-account="${acc.name}" style="background: var(--bg-card); border: 1px solid ${isStale ? 'rgba(255, 149, 0, 0.4)' : 'var(--border-subtle)'}; border-radius: var(--radius-md); padding: 14px 16px;">
        
        <!-- Header Conto -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--bg-hover); display: flex; align-items: center; justify-content: center; color: var(--apple-blue);">
              ${getIcon(isPension ? 'savings' : 'wallet', 16)}
            </div>
            <div>
              <strong style="font-size: 14px; font-weight: 600; color: var(--text-primary); display: block; line-height: 1.2;">
                ${acc.name}
              </strong>
              <span style="font-size: 11.5px; color: var(--text-tertiary);">${acc.type || 'Conto'}</span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12px; color: var(--text-secondary);">Attuale:</span>
            <strong class="privacy-mask" style="font-size: 13.5px; font-weight: 600; font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(displayedBal)}
            </strong>
            <span style="font-size: 10.5px; font-weight: 600; padding: 2px 7px; border-radius: 9999px; background: ${isStale ? 'rgba(255, 149, 0, 0.15)' : 'rgba(52, 199, 89, 0.15)'}; color: ${isStale ? 'var(--apple-orange)' : 'var(--apple-green)'};">
              ${isStale ? `Fermo a ${acc.lastMonthName || 'mese prec.'}` : 'Allineato'}
            </span>
          </div>
        </div>

        <!-- Selettore Modalità (Saldo Effettivo vs Quota Busta Paga) -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--bg-hover); padding: 8px 12px; border-radius: var(--radius-sm); margin-bottom: 10px;">
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Modalità Inserimento:</span>
          
          <div class="segmented-control-mini" style="display: inline-flex; background: var(--bg-primary); padding: 2px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle);">
            <button type="button" class="seg-btn-mini ${defaultMode === 'delta' ? 'active' : ''}" data-mode="delta" data-target="${acc.name}" style="padding: 3px 10px; font-size: 11.5px; border-radius: var(--radius-pill); border: none; background: ${defaultMode === 'delta' ? 'var(--apple-blue)' : 'transparent'}; color: ${defaultMode === 'delta' ? '#FFFFFF' : 'var(--text-secondary)'}; font-weight: 600; cursor: pointer;">
              ${isPension ? '➕ Quota Busta Paga (+/-)' : '➕ Differenza (+/-)'}
            </button>
            <button type="button" class="seg-btn-mini ${defaultMode === 'balance' ? 'active' : ''}" data-mode="balance" data-target="${acc.name}" style="padding: 3px 10px; font-size: 11.5px; border-radius: var(--radius-pill); border: none; background: ${defaultMode === 'balance' ? 'var(--apple-blue)' : 'transparent'}; color: ${defaultMode === 'balance' ? '#FFFFFF' : 'var(--text-secondary)'}; font-weight: 600; cursor: pointer;">
              🎯 Saldo Effettivo Totale
            </button>
          </div>
        </div>

        <!-- Riga Input e Risultato Dinamico -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center;">
          <div>
            <label class="form-label" style="font-size: 11.5px; margin-bottom: 4px;" id="label-input-${acc.name}">
              ${defaultMode === 'delta' ? (isPension ? 'Quota Busta Paga (€)' : 'Variazione Netta (€)') : 'Nuovo Saldo Effettivo (€)'}
            </label>
            <div style="position: relative;">
              <input 
                type="number" 
                step="0.01" 
                class="apple-input input-reconcile-val" 
                id="input-val-${acc.name}" 
                data-account="${acc.name}"
                data-old-balance="${displayedBal}"
                value="${initialInputVal !== '' ? initialInputVal : ''}"
                placeholder="${defaultMode === 'delta' ? (isPension ? '+ es. 185,50' : '+/- es. 50,00') : this.formatCurrency(displayedBal)}" 
                style="font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums;"
              />
            </div>
          </div>

          <div style="background: var(--bg-hover); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: center;">
            <span style="font-size: 11px; color: var(--text-tertiary); margin-bottom: 2px;">Saldo Risultante:</span>
            <div style="display: flex; align-items: baseline; justify-content: space-between;">
              <strong id="preview-acc-bal-${acc.name}" style="font-size: 14px; font-weight: 700; color: var(--text-primary); font-variant-numeric: tabular-nums;">
                ${this.formatCurrency(acc.balance)}
              </strong>
              <span id="preview-acc-delta-${acc.name}" style="font-size: 11.5px; font-weight: 600; color: var(--text-tertiary);">
                0,00 €
              </span>
            </div>
          </div>
        </div>

        <!-- Opzione Creazione Movimento -->
        <div style="margin-top: 8px; display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--text-secondary);">
          <label style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <input type="checkbox" id="check-tx-${acc.name}" data-account="${acc.name}" checked style="accent-color: var(--apple-blue);" />
            <span>${isInvestment ? 'Registra come giroconto da Buddybank' : (isPension ? 'Crea versamento nel registro' : 'Crea movimento di conguaglio')}</span>
          </label>
          <span style="font-size: 11px; color: var(--text-tertiary);">
            ${isInvestment ? (acc.id === 'vwce' || (acc.name || '').toLowerCase().includes('vwce') ? 'Giroconto: 🛅 Livello Crescita' : 'Giroconto: 🏦 Fondo emergenza') : (isPension ? 'Cat: 🛅 Livello Crescita' : 'Cat: ⚖️ Conguaglio')}
          </span>
        </div>

      </div>
    `;
  }

  bindEvents(modalRoot) {
    // Chiudi Modal
    const btnClose = document.getElementById('btn-close-closing-modal');
    if (btnClose) btnClose.addEventListener('click', () => this.close());
    const btnCancel = document.getElementById('btn-cancel-closing');
    if (btnCancel) btnCancel.addEventListener('click', () => this.close());

    const overlay = document.getElementById('monthly-closing-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    // Cambio Mese
    const selectMonth = document.getElementById('select-closing-month');
    if (selectMonth) {
      selectMonth.addEventListener('change', (e) => {
        this.targetMonth = e.target.value;
        this.render(modalRoot);
      });
    }

    // Toggle Modalità (Saldo Effettivo vs Quota Busta Paga) per ciascun conto
    modalRoot.querySelectorAll('.seg-btn-mini').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const accName = e.currentTarget.dataset.target;
        const newMode = e.currentTarget.dataset.mode;
        const accData = this.accountInputs.get(accName);
        if (!accData) return;

        accData.mode = newMode;
        
        // Aggiorna classi bottoni
        const parent = e.currentTarget.parentElement;
        parent.querySelectorAll('.seg-btn-mini').forEach(b => {
          const isActive = b.dataset.mode === newMode;
          b.style.background = isActive ? 'var(--apple-blue)' : 'transparent';
          b.style.color = isActive ? '#FFFFFF' : 'var(--text-secondary)';
        });

        // Aggiorna etichetta e placeholder input
        const isPension = accName.toLowerCase().includes('pension');
        const labelEl = document.getElementById(`label-input-${accName}`);
        const inputEl = document.getElementById(`input-val-${accName}`);

        if (labelEl) {
          labelEl.textContent = newMode === 'delta' 
            ? (isPension ? 'Quota Busta Paga (€)' : 'Variazione Netta (€)') 
            : 'Nuovo Saldo Effettivo (€)';
        }
        if (inputEl) {
          inputEl.placeholder = newMode === 'delta' 
            ? (isPension ? '+ es. 185,50' : '+/- es. 50,00') 
            : this.formatCurrency(parseFloat(inputEl.dataset.oldBalance));
        }

        this.updateAccountCalculation(accName);
        this.updatePreviewCalculations();
      });
    });

    // Input Numerici
    modalRoot.querySelectorAll('.input-reconcile-val').forEach(input => {
      input.addEventListener('input', (e) => {
        const accName = e.target.dataset.account;
        const rawVal = e.target.value.trim();
        const accData = this.accountInputs.get(accName);
        if (!accData) return;

        accData.rawInputValue = rawVal;
        accData.value = rawVal === '' ? 0 : parseFloat(rawVal);
        accData.isModified = rawVal !== '';

        this.updateAccountCalculation(accName);
        this.updatePreviewCalculations();
      });
    });

    // Checkbox Transazione
    modalRoot.querySelectorAll('input[type="checkbox"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const accName = e.target.dataset.account;
        const accData = this.accountInputs.get(accName);
        if (accData) {
          accData.createTx = e.target.checked;
        }
      });
    });

    // Pulsante Conferma e Salva
    const btnConfirm = document.getElementById('btn-confirm-monthly-closing');
    if (btnConfirm) {
      btnConfirm.addEventListener('click', () => {
        this.handleSaveClosing();
      });
    }
  }

  updateAccountCalculation(accName) {
    const accData = this.accountInputs.get(accName);
    const inputEl = document.getElementById(`input-val-${accName}`);
    const previewBalEl = document.getElementById(`preview-acc-bal-${accName}`);
    const previewDeltaEl = document.getElementById(`preview-acc-delta-${accName}`);

    if (!accData || !inputEl || !previewBalEl || !previewDeltaEl) return;

    const oldBal = parseFloat(inputEl.dataset.oldBalance) || 0;
    let resultingBal = oldBal;
    let delta = 0;

    if (accData.isModified && !isNaN(accData.value)) {
      if (accData.mode === 'delta') {
        delta = accData.value;
        resultingBal = Math.round((oldBal + delta) * 100) / 100;
      } else {
        resultingBal = accData.value;
        delta = Math.round((resultingBal - oldBal) * 100) / 100;
      }
    }

    previewBalEl.textContent = this.formatCurrency(resultingBal);
    
    if (delta > 0) {
      previewDeltaEl.textContent = `+${this.formatCurrency(delta)}`;
      previewDeltaEl.style.color = 'var(--apple-green)';
    } else if (delta < 0) {
      previewDeltaEl.textContent = this.formatCurrency(delta);
      previewDeltaEl.style.color = 'var(--apple-red)';
    } else {
      previewDeltaEl.textContent = '0,00 €';
      previewDeltaEl.style.color = 'var(--text-tertiary)';
    }
  }

  updatePreviewCalculations() {
    const accounts = financeStore.getAccounts();
    let totalEstimatedNW = 0;
    let totalDelta = 0;

    accounts.forEach(acc => {
      const accData = this.accountInputs.get(acc.name);
      const oldBal = parseFloat(acc.balance) || 0;
      let finalBal = oldBal;

      if (accData && accData.isModified && !isNaN(accData.value)) {
        if (accData.mode === 'delta') {
          finalBal = Math.round((oldBal + accData.value) * 100) / 100;
        } else {
          finalBal = accData.value;
        }
      }

      totalEstimatedNW += finalBal;
      totalDelta += (finalBal - oldBal);
    });

    const previewNwEl = document.getElementById('preview-new-nw');
    const previewDeltaEl = document.getElementById('preview-nw-delta');

    if (previewNwEl) {
      previewNwEl.textContent = this.formatCurrency(totalEstimatedNW);
    }
    if (previewDeltaEl) {
      if (totalDelta > 0) {
        previewDeltaEl.textContent = `+${this.formatCurrency(totalDelta)}`;
        previewDeltaEl.style.color = 'var(--apple-green)';
      } else if (totalDelta < 0) {
        previewDeltaEl.textContent = this.formatCurrency(totalDelta);
        previewDeltaEl.style.color = 'var(--apple-red)';
      } else {
        previewDeltaEl.textContent = '+0,00 €';
        previewDeltaEl.style.color = 'var(--text-secondary)';
      }
    }
  }

  handleSaveClosing() {
    const updates = [];
    const accounts = financeStore.getAccounts();
    const now = new Date();
    const curMonthKey = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const isCurrentMonth = (this.targetMonth === curMonthKey);

    accounts.forEach(acc => {
      const data = this.accountInputs.get(acc.name);
      if (data && data.isModified && !isNaN(data.value)) {
        updates.push({
          accountName: acc.name,
          mode: data.mode,
          value: data.value,
          note: data.note,
          createTx: data.createTx
        });
      }
    });

    if (updates.length === 0) {
      alert('Non hai inserito alcuna modifica o conguaglio. Per confermare, inserisci almeno la quota della busta paga o un saldo effettivo.');
      return;
    }

    if (isCurrentMonth) {
      const res = financeStore.executeMonthlyClosing(this.targetMonth, updates);
      alert(`✅ Chiusura di ${res.monthName} consolidata con successo!\n\nPatrimonio Net Worth aggiornato a ${this.formatCurrency(res.newTotalNW)} (${res.nwDelta >= 0 ? '+' : ''}${this.formatCurrency(res.nwDelta)}).\n${res.modifiedAccounts.length} conti allineati.`);
      this.close();
      if (typeof this.onSuccessCallback === 'function') {
        this.onSuccessCallback(res);
      }
    } else {
      // Modifica / Rettifica fine mese passato o futuro nel Foglio Gestionale
      const existingClosing = financeStore.getMonthlyClosing(this.targetMonth) || { accounts: {} };
      const newAccounts = { ...(existingClosing.accounts || {}) };

      updates.forEach(u => {
        const oldBal = parseFloat(newAccounts[u.accountName]) || 0;
        if (u.mode === 'delta') {
          newAccounts[u.accountName] = Math.round((oldBal + parseFloat(u.value)) * 100) / 100;
        } else {
          newAccounts[u.accountName] = Math.round(parseFloat(u.value) * 100) / 100;
        }
      });

      const totalNW = Math.round(Object.values(newAccounts).reduce((sum, b) => sum + (parseFloat(b) || 0), 0) * 100) / 100;

      financeStore.saveMonthlyClosingData(this.targetMonth, {
        monthKey: this.targetMonth,
        label: this.targetMonth,
        date: `31/${this.targetMonth}`,
        accounts: newAccounts,
        totalNW,
        notes: `Rettifica fine mese ${this.targetMonth}`
      });

      alert(`✅ Fine mese di ${this.targetMonth} aggiornato con successo!\n\nPatrimonio Net Worth ricalcolato a ${this.formatCurrency(totalNW)}.`);
      this.close();
      if (typeof this.onSuccessCallback === 'function') {
        this.onSuccessCallback({ success: true, targetMonthKey: this.targetMonth, newTotalNW: totalNW });
      }
    }
  }
}

const monthlyClosingModal = new MonthlyClosingModal();

// === js/components/dashboardView.js ===
/**
 * Apple Design System - Dashboard View Component (Restauro Esecutivo HIG)
 * Visione limpida, aerea ed essenziale:
 * 1. Hero Card: Patrimonio Netto Effettivo Reale (Liquidità + Investimenti Trade Republic + Buoni Pasto)
 * 2. Flusso Mese Corrente (4 Pilastri): Entrate, Spese Fisse, Spese Extra, Rimanenza / Risparmio Extra
 * 3. Saldi Conti Reali (Buddybank, Trade Republic, Buoni Pasto)
 * 4. Previdenza a Lungo Termine: Fondo Pensione tracciato a parte ("Zero Allucinazioni")
 * 5. Grafico Cash Flow Mensile Essenziale
 */


class DashboardView {
  constructor() {
    this.lineChart = null;
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
    if (!container) return;

    const summary = financeStore.summary;
    const accounts = financeStore.getAccounts();
    const liveAnalysis = financeStore.getCurrentMonthLiveAnalysis();
    const monthlyHistory = financeStore.getMonthlyTrendHistory(6);
    const recStatus = financeStore.getMonthlyReconciliationStatus();

    // Conti reali operativi (escluso il Fondo Pensione che ha la sua card dedicata e conti storici estinti)
    const operationalAccounts = accounts.filter(acc => {
      if (acc.isPension || (acc.name || '').toLowerCase().includes('pensione')) return false;
      const n = (acc.name || '').toLowerCase();
      if (n === 'btc' || n === 'salvadanaio' || acc.id === 'btc' || acc.id === 'salvadanaio' || acc.isExtinct) return false;
      return true;
    });
    const pensionAccount = accounts.find(acc => acc.isPension || acc.name.toLowerCase().includes('pensione'));
    const pensionBalance = pensionAccount ? pensionAccount.balance : summary.pensionFundTotal;

    // Trade Republic Breakdown
    const trAccount = operationalAccounts.find(a => a.id === 'trade_republic' || a.name.toLowerCase().includes('trade republic'));
    const trCash = trAccount ? (parseFloat(trAccount.cashBalance) || 0) : 0;
    const trInvested = trAccount ? Math.max(0, (trAccount.balance || 0) - trCash) : summary.investedTotal;

    // Calcolo 4 pilastri del mese corrente
    const effectiveIncome = liveAnalysis.effectiveIncome;
    const fixedExpenses = liveAnalysis.fixedExpenses;
    const variableExpenses = liveAnalysis.variableExpenses;
    const totalExpenses = liveAnalysis.actualExpense;
    const remainingSavings = liveAnalysis.remainingExtraSavings;
    const savingsRate = liveAnalysis.realSavingsRate;

    // Percentuali e proporzioni per visual grafici Workout / Apple HIG
    const totalNW = summary.effectiveNetWorth || 1;
    const pctLiquid = Math.max(0, Math.min(100, Math.round(((summary.liquidTotal || 0) / totalNW) * 100)));
    const pctVoucher = Math.max(0, Math.min(100, Math.round(((summary.voucherTotal || 0) / totalNW) * 100)));
    const pctInvested = Math.max(0, 100 - pctLiquid - pctVoucher);

    const maxBarVal = Math.max(effectiveIncome, fixedExpenses + variableExpenses, 1);
    const hEntrate = Math.round(Math.min(48, Math.max(10, (effectiveIncome / maxBarVal) * 48)));
    const hFisse = Math.round(Math.min(48, Math.max(6, (fixedExpenses / maxBarVal) * 48)));
    const hExtra = Math.round(Math.min(48, Math.max(6, (variableExpenses / maxBarVal) * 48)));

    const showClosingBanner = recStatus.needsReconciliation && (typeof sessionStorage === 'undefined' || !sessionStorage.getItem(`finanze_dismiss_closing_${recStatus.targetMonth}`));

    container.innerHTML = `
      <div class="view-container dashboard-view-restructured" style="animation: fadeIn 0.25s ease;">

        <!-- Mobile Workout-Style Primary CTA Button (Start Workout -> Nuovo Movimento) -->
        <div class="mobile-cta-wrap mobile-only-block">
          <button class="cta-workout-btn" id="btn-hero-new-tx" aria-label="Aggiungi Nuovo Movimento">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Nuovo Movimento</span>
          </button>
        </div>
        
        <!-- Banner Conguaglio Fine Mese (se necessario) -->
        ${showClosingBanner ? `
          <div class="monthly-closing-banner-card" style="margin-bottom: var(--space-box-gap-md); background: linear-gradient(135deg, rgba(255, 149, 0, 0.12) 0%, rgba(255, 204, 0, 0.08) 100%); border: 1px solid rgba(255, 149, 0, 0.3); border-radius: var(--radius-card); padding: 16px 20px;">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 36px; height: 36px; border-radius: var(--radius-pill); background: var(--apple-orange); color: white; display: flex; align-items: center; justify-content: center;">
                  ${getIcon('conguaglio', 18)}
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: var(--text-primary);">Chiusura Mese di ${recStatus.targetMonthLabel}</h4>
                  <p style="margin: 2px 0 0; font-size: 12px; color: var(--text-secondary);">Riconcilia i saldi reali prima di passare al nuovo mese.</p>
                </div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button class="apple-btn-secondary" id="btn-snooze-closing-banner" data-target-month="${recStatus.targetMonth}" style="padding: 7px 14px; font-size: 12px;">Posticipa</button>
                <button class="apple-btn-primary" id="btn-dashboard-monthly-closing" style="padding: 7px 16px; font-size: 12px;">Riconcilia Ora</button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 1. HERO CARD: PATRIMONIO NETTO EFFETTIVO ("Zero Allucinazioni") -->
        <section class="card hero-patrimonio-card" id="dash-hero-networth-card" title="Visualizza evoluzione patrimonio nello Storico">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">Patrimonio Netto Effettivo</span>
                <span class="badge badge--positive hero-badge-tag">Disponibile &amp; Investito</span>
              </div>
              <div class="card__value privacy-mask hero-networth-val">
                ${this.formatCurrency(summary.effectiveNetWorth)}
              </div>
            </div>
            <div class="hero-trend-wrap">
              <span class="trend-badge positive">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                In crescita
              </span>
              <span class="trend-context">Storico &rarr;</span>
            </div>
          </div>

          <!-- Segmented Allocation Bar (Apple HIG / Workout Visual) -->
          <div class="alloc-bar-track">
            <div class="alloc-segment seg-liquid" style="width: ${pctLiquid}%;" title="Liquidità: ${pctLiquid}%"></div>
            <div class="alloc-segment seg-invested" style="width: ${pctInvested}%;" title="Investiti: ${pctInvested}%"></div>
            <div class="alloc-segment seg-voucher" style="width: ${pctVoucher}%;" title="Buoni Pasto: ${pctVoucher}%"></div>
          </div>

          <!-- Legenda Composizione a 3 Colonne Pulite -->
          <div class="alloc-legend">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-blue);"></span>
                <span class="legend-name">Liquidità</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-blue);">
                ${this.formatCurrency(summary.liquidTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-purple);"></span>
                <span class="legend-name">Trade Rep.</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-purple);">
                ${this.formatCurrency(summary.investedTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-orange);"></span>
                <span class="legend-name">Buoni Pasto</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-orange);">
                ${this.formatCurrency(summary.voucherTotal || 0)}
              </span>
            </div>
          </div>
        </section>

        <!-- 2. FLUSSO MESE CORRENTE -->
        <section class="cashflow-section">
          <div class="cashflow-header-row">
            <div class="cashflow-header-left">
              <h3 class="cashflow-title">
                <span>Flusso Mese • ${liveAnalysis.curMonthName} ${liveAnalysis.curYear}</span>
                <span class="badge badge--info flow-day-badge">
                  <span class="live-dot"></span>
                  Giorno ${liveAnalysis.curDay}/${liveAnalysis.daysInMonth}
                </span>
              </h3>
              <p class="cashflow-desc desk-only">
                Quadro sintetico entrate, impegni fissi, uscite variabili e risparmio extra residuo.
              </p>
            </div>
            <a href="#spese" class="cashflow-link">
              Dettaglio Spese &rarr;
            </a>
          </div>

          <!-- Mobile Workout-Style Micro Bar Chart (Mobile Only) -->
          <div class="native-card mobile-workout-cashflow-card mobile-only-block">
            <div class="cashflow-kpi-row">
              <div>
                <span class="cashflow-kpi-sub">Rimanenza Prevista</span>
                <div class="cashflow-kpi-val privacy-mask">+${this.formatCurrency(remainingSavings)}</div>
              </div>
              <span class="cashflow-pct-tag">${savingsRate}% Risparmio</span>
            </div>

            <!-- Micro Bar Chart (Entrate / Fisse / Extra) -->
            <div class="workout-bars-grid">
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(effectiveIncome)} €</div>
                <div class="bar-pill bar-entrate" style="height: ${hEntrate}px;"></div>
                <div class="bar-label">Entrate</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(fixedExpenses)} €</div>
                <div class="bar-pill bar-fisse" style="height: ${hFisse}px;"></div>
                <div class="bar-label">Fisse</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(variableExpenses)} €</div>
                <div class="bar-pill bar-extra" style="height: ${hExtra}px;"></div>
                <div class="bar-label">Extra</div>
              </div>
            </div>

            <div class="timeline-footer">
              <span>Avanzamento: <strong>Giorno ${liveAnalysis.curDay} di ${liveAnalysis.daysInMonth}</strong> (${liveAnalysis.monthProgressPct}%)</span>
              <span><strong>${liveAnalysis.daysRemaining} gg</strong> a fine mese</span>
            </div>
          </div>

          <!-- Desktop 4-Step Cards (Desktop Only) -->
          <div class="cashflow-4step-grid desk-only">
            
            <!-- Step 1: Entrate Mese -->
            <div class="cashflow-step-card step-income">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  1. Entrate
                </span>
                <span class="cashflow-step-badge badge--positive">
                  ${liveAnalysis.isIncomeEstimated ? 'Stimato' : 'Ricevuto'}
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-green);">
                ${this.formatCurrency(effectiveIncome)}
              </div>
              <div class="cashflow-step-subtext">
                ${liveAnalysis.extraIncomeLabel ? `Base stipendio ${liveAnalysis.extraIncomeLabel}` : 'Stipendio netto mensile'}
              </div>
            </div>

            <!-- Step 2: Spese Fisse -->
            <div class="cashflow-step-card step-fixed">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  2. Spese Fisse
                </span>
                <span class="cashflow-step-badge badge-orange-subtle">
                  Obbligate
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-orange);">
                ${this.formatCurrency(fixedExpenses)}
              </div>
              <div class="cashflow-step-subtext">
                Rate, casa e abbonamenti
              </div>
            </div>

            <!-- Step 3: Spese Extra -->
            <div class="cashflow-step-card step-extra">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  3. Spese Extra
                </span>
                <span class="cashflow-step-badge badge--neutral">
                  Variabili
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-red);">
                ${this.formatCurrency(variableExpenses)}
              </div>
              <div class="cashflow-step-subtext">
                Uscite correnti e svago
              </div>
            </div>

            <!-- Step 4: Rimanenza / Risparmio Extra -->
            <div class="cashflow-step-card step-savings">
              <div class="cashflow-step-header">
                <span class="cashflow-step-title">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  4. Rimanenza
                </span>
                <span class="cashflow-step-badge badge-purple-subtle">
                  ${savingsRate}%
                </span>
              </div>
              <div class="cashflow-step-amount privacy-mask" style="color: var(--apple-purple);">
                ${this.formatCurrency(remainingSavings)}
              </div>
              <div class="cashflow-step-subtext">
                Tasso risparmio: ${savingsRate}%
              </div>
            </div>

          </div>

          <!-- Barra di Progresso Temporale Mese (Desktop Only) -->
          <div class="flow-progress-card desk-only">
            <div class="flow-progress-header">
              <span>Avanzamento mese: <strong>${liveAnalysis.curDay} su ${liveAnalysis.daysInMonth} gg</strong> (${liveAnalysis.monthProgressPct}%)</span>
              <span><strong>${liveAnalysis.daysRemaining} gg</strong> residui</span>
            </div>
            <div class="flow-progress-track">
              <div class="flow-progress-bar" style="width: ${liveAnalysis.monthProgressPct}%;"></div>
            </div>
          </div>
        </section>

        <!-- 3. SALDI CONTI REALI -->
        <section class="card accounts-overview-card">
          <div class="card__header">
            <div>
              <span class="card__title">Conti Reali &amp; Disponibilità</span>
              <span class="accounts-desc desk-only">
                I tuoi conti operativi, broker e benefit spesa
              </span>
            </div>
            <span class="badge badge--neutral">${operationalAccounts.length} Conti</span>
          </div>

          <div class="accounts-list-container">
            ${operationalAccounts.map(acc => {
              const isTR = acc.id === 'trade_republic' || acc.name.toLowerCase().includes('trade republic');
              const isVoucher = acc.isVoucher || acc.id === 'buoni_pasto';
              const targetRoute = isTR ? '#investimenti' : (isVoucher ? '#spese' : '#movimenti');
              const iconSvg = isTR 
                ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`
                : (isVoucher 
                    ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>`
                    : `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="3"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`);
              
              const iconBg = isTR ? 'rgba(175, 82, 222, 0.12)' : (isVoucher ? 'rgba(255, 149, 0, 0.12)' : 'rgba(0, 113, 227, 0.12)');
              const iconColor = isTR ? 'var(--apple-purple)' : (isVoucher ? 'var(--apple-orange)' : 'var(--apple-blue)');

              return `
                <div class="account-row-item interactive" data-acc-id="${acc.id}" data-target-route="${targetRoute}" title="Visualizza dettagli ${acc.name}">
                  <div class="account-row-left">
                    <div class="account-row-icon" style="background: ${iconBg}; color: ${iconColor};">
                      ${iconSvg}
                    </div>
                    <div class="account-row-info">
                      <strong class="account-row-name">${acc.name}</strong>
                      <span class="account-row-type">
                        ${isTR ? (trCash > 0 ? `Titoli ${this.formatCurrency(trInvested).replace(',00', '')} • Cassa ${this.formatCurrency(trCash).replace(',00', '')}` : 'XEON & VWCE • Portafoglio ETF') : acc.type}
                      </span>
                    </div>
                  </div>
                  <div class="account-row-right">
                    <div class="privacy-mask account-row-balance">
                      ${this.formatCurrency(acc.balance)}
                    </div>
                    <span class="account-row-arrow">Dettagli &rarr;</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- 4. PREVIDENZA A LUNGO TERMINE (CARD SEPARATA STANDALONE) -->
        <section class="card pension-card">
          <div class="pension-layout">
            <div class="pension-left">
              <div class="pension-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="pension-info">
                <div class="pension-title-row">
                  <h4 class="pension-title">Previdenza • Fondo Pensione</h4>
                  <span class="badge pension-badge">Separato</span>
                </div>
                <p class="pension-desc">
                  Accantonamento in busta paga • Deducibile fino a 5.164,57 €/anno (Art. 51 TUIR) • Non disponibile immediato.
                </p>
              </div>
            </div>
            <div class="pension-right">
              <span class="pension-val-label desk-only">Valore Maturato</span>
              <div class="privacy-mask pension-val-number">
                ${this.formatCurrency(pensionBalance)}
              </div>
            </div>
          </div>
        </section>

        <!-- 5. GRAFICO CASH FLOW MENSILE ESSENZIALE -->
        <section class="card dashboard-chart-card">
          <div class="card__header">
            <div>
              <span class="card__title">Trend Flusso di Cassa (Ultime 6 Mensilità)</span>
              <span class="chart-desc desk-only">
                Confronto lineare Entrate vs Uscite
              </span>
            </div>
            <span class="badge badge--positive">Ultime 6 Mensilità</span>
          </div>

          <div class="dashboard-chart-canvas-wrap">
            <canvas id="dashboardCashFlowCanvas"></canvas>
          </div>
        </section>

      </div>
    `;

    // Event Listener Banner Conguaglio
    const btnMonthlyClosing = container.querySelector('#btn-dashboard-monthly-closing');
    if (btnMonthlyClosing) {
      btnMonthlyClosing.addEventListener('click', () => {
        monthlyClosingModal.open({
          targetMonth: recStatus.targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    }

    const btnSnooze = container.querySelector('#btn-snooze-closing-banner');
    if (btnSnooze) {
      btnSnooze.addEventListener('click', () => {
        const targetMonth = btnSnooze.getAttribute('data-target-month');
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(`finanze_dismiss_closing_${targetMonth}`, 'true');
        }
        const banner = container.querySelector('.monthly-closing-banner-card');
        if (banner) banner.style.display = 'none';
      });
    }

    // Navigazione interattiva dalla Hero Card allo Storico
    const heroCard = container.querySelector('#dash-hero-networth-card');
    if (heroCard) {
      heroCard.addEventListener('click', () => {
        window.location.hash = '#storico';
      });
    }

    // Listener per il pulsante d'azione primario mobile (+ Nuovo Movimento)
    const btnHeroNewTx = container.querySelector('#btn-hero-new-tx');
    if (btnHeroNewTx) {
      btnHeroNewTx.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window !== 'undefined' && window.app) {
          window.app.switchTab('movimenti');
          setTimeout(() => {
            if (window.app.movimentiView) {
              window.app.movimentiView.openModal();
            } else {
              const btnAdd = document.getElementById('btn-add-tx-header') || document.getElementById('btn-add-tx-mobile');
              if (btnAdd) btnAdd.click();
            }
          }, 80);
        } else {
          window.location.hash = '#movimenti';
          setTimeout(() => {
            const btnAdd = document.getElementById('btn-add-tx-header') || document.getElementById('btn-add-tx-mobile');
            if (btnAdd) btnAdd.click();
          }, 120);
        }
      });
    }

    // Apertura Dettaglio Conto con Pop-Up Apple al click
    container.querySelectorAll('.account-row-item.interactive').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const accId = item.getAttribute('data-acc-id');
        const acc = operationalAccounts.find(a => a.id === accId || (a.name || '').toLowerCase() === (accId || '').toLowerCase())
          || accounts.find(a => a.id === accId || (a.name || '').toLowerCase() === (accId || '').toLowerCase());
        if (acc) {
          this.openAccountDetailModal(acc);
        } else {
          const route = item.getAttribute('data-target-route');
          if (route) window.location.hash = route;
        }
      });
    });

    // Interattività anche sulla Card Fondo Pensione
    const pensionCard = container.querySelector('.pension-card');
    if (pensionCard && pensionAccount) {
      pensionCard.style.cursor = 'pointer';
      pensionCard.title = 'Visualizza dettagli Fondo Pensione';
      pensionCard.addEventListener('click', () => {
        this.openAccountDetailModal(pensionAccount);
      });
    }

    // Inizializza Grafico Cash Flow
    requestAnimationFrame(() => {
      this.initLineChart(monthlyHistory);
    });
  }

  openAccountDetailModal(acc) {
    if (!acc) return;
    document.body.classList.add('modal-open');
    
    // Rimuovi eventuale modale precedente
    const oldModal = document.getElementById('account-detail-modal-root');
    if (oldModal) oldModal.remove();

    const isTR = acc.id === 'trade_republic' || (acc.name || '').toLowerCase().includes('trade republic');
    const isVoucher = acc.isVoucher || acc.id === 'buoni_pasto' || (acc.name || '').toLowerCase().includes('buoni pasto');
    const isBuddy = acc.id === 'buddybank' || (acc.name || '').toLowerCase().includes('buddybank');
    const isPension = acc.isPension || (acc.name || '').toLowerCase().includes('pensione');

    const liveAnalysis = financeStore.getCurrentMonthLiveAnalysis();

    // Transazioni del conto in modo sicuro e retrocompatibile
    const allTxs = (typeof financeStore.getAllTransactions === 'function' 
      ? financeStore.getAllTransactions() 
      : (typeof financeStore.getTransactions === 'function' ? financeStore.getTransactions() : financeStore.transactions)) || [];

    // Tutti i movimenti collegati a questo conto
    const accAllTxs = allTxs.filter(t => {
      const aName = (t.account || '').toLowerCase();
      const fromName = (t.fromAccount || '').toLowerCase();
      const toName = (t.toAccount || '').toLowerCase();
      const targetName = (acc.name || '').toLowerCase();
      const targetId = (acc.id || '').toLowerCase();
      return (targetName && (aName.includes(targetName) || fromName.includes(targetName) || toName.includes(targetName))) ||
             (targetId && (aName.includes(targetId) || fromName.includes(targetId) || toName.includes(targetId)));
    });

    const accTxs = accAllTxs.slice(0, 5);

    // Calcolo Entrate vs Uscite del Mese Corrente per questo specifico conto
    const curM = String(liveAnalysis.curMonth).padStart(2, '0');
    const curY = String(liveAnalysis.curYear);
    const accMonthTxs = accAllTxs.filter(t => String(t.month).padStart(2, '0') === curM && String(t.year) === curY);

    let accMonthIncome = 0;
    let accMonthExpense = 0;

    accMonthTxs.forEach(t => {
      const amt = Math.abs(parseFloat(t.amount) || 0);
      const type = (t.type || '').toLowerCase();
      const rawType = (t.rawType || '').toLowerCase();
      if (type === 'income' || rawType === 'entrata') {
        accMonthIncome += amt;
      } else if (type === 'expense' || rawType === 'uscita') {
        accMonthExpense += amt;
      } else if (type === 'transfer' || rawType === 'trasferimento' || rawType === 'giroconto') {
        const isTo = (t.toAccount || '').toLowerCase().includes((acc.name || '').toLowerCase());
        if (isTo) accMonthIncome += amt;
        else accMonthExpense += amt;
      }
    });

    const netFlow = accMonthIncome - accMonthExpense;
    const netSign = netFlow >= 0 ? '+' : '';
    const totalActivity = accMonthIncome + accMonthExpense;

    let pctIncome = totalActivity > 0 ? Math.round((accMonthIncome / totalActivity) * 100) : 0;
    let pctExpense = totalActivity > 0 ? (100 - pctIncome) : 0;
    if (accMonthIncome > 0 && pctIncome < 6) {
      pctIncome = 6;
      pctExpense = 94;
    } else if (accMonthExpense > 0 && pctExpense < 6) {
      pctExpense = 6;
      pctIncome = 94;
    }

    // Dati specifici per composizione ETF Broker
    const xeonHolding = (acc.holdings || []).find(h => (h.ticker || '').toUpperCase() === 'XEON') || { currentValue: 4500.00 };
    const vwceHolding = (acc.holdings || []).find(h => (h.ticker || '').toUpperCase() === 'VWCE') || { currentValue: 3700.00 };
    const xeonVal = typeof xeonHolding.currentValue === 'number' ? xeonHolding.currentValue : 4500.00;
    const vwceVal = typeof vwceHolding.currentValue === 'number' ? vwceHolding.currentValue : 3700.00;
    const trTotalHoldings = xeonVal + vwceVal;
    const pctXeon = trTotalHoldings > 0 ? Math.round((xeonVal / trTotalHoldings) * 100) : 66;
    const pctVwce = 100 - pctXeon;

    // Dati conguaglio
    const recDate = acc.lastReconciledDate || '31/10/2026';
    const recBal = typeof acc.reconciledBalance !== 'undefined' ? acc.reconciledBalance : acc.balance;
    const diffFromRec = acc.balance - recBal;
    const diffSign = diffFromRec >= 0 ? '+' : '';

    const modalRoot = document.createElement('div');
    modalRoot.id = 'account-detail-modal-root';
    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="account-detail-overlay">
        <div class="apple-modal-sheet" id="account-detail-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 16px;">
            <button class="modal-close-btn" id="account-detail-close">Chiudi</button>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Scheda Conto</h3>
            <span style="width: 44px;"></span>
          </div>

          <!-- Hero del Conto -->
          <div style="text-align: center; padding: 6px 0 16px;">
            <div style="width: 54px; height: 54px; border-radius: 18px; background: ${isTR ? 'rgba(175, 82, 222, 0.14)' : (isVoucher ? 'rgba(255, 149, 0, 0.14)' : (isPension ? 'rgba(52, 199, 89, 0.14)' : 'rgba(0, 113, 227, 0.14)'))}; color: ${isTR ? 'var(--apple-purple)' : (isVoucher ? 'var(--apple-orange)' : (isPension ? 'var(--apple-green)' : 'var(--apple-blue)'))}; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 10px;">
              ${isTR 
                ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>` 
                : (isVoucher 
                    ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>` 
                    : (isPension 
                        ? `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
                        : `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="4" width="20" height="16" rx="3"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`))}
            </div>
            <h2 style="font-size: 20px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px;">${acc.name}</h2>
            <span class="badge ${isTR ? 'badge--info' : (isVoucher ? 'badge-orange-subtle' : (isPension ? 'badge--positive' : 'badge--neutral'))}" style="font-size: 11px;">
              ${isTR ? 'Broker & Investimenti ETF' : (isVoucher ? 'Ticket Restaurant & Benefit' : (isPension ? 'Previdenza Integrativa' : 'Conto Operativo Principale'))}
            </span>

            <div style="margin-top: 14px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); display: block;">Saldo Disponibile Attuale</span>
              <div class="privacy-mask" style="font-size: 32px; font-weight: 800; color: var(--text-primary); font-variant-numeric: tabular-nums; letter-spacing: -0.025em; margin-top: 2px;">
                ${this.formatCurrency(acc.balance)}
              </div>
            </div>
          </div>

          <!-- 2. Riepilogo Flusso Mese (Entrate vs Spese con Segmented Bar Stile Apple HIG) -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em;">
                Riepilogo Flusso • ${liveAnalysis.curMonthName}
              </span>
              <span class="badge badge--neutral" style="font-size: 10px;">${accMonthTxs.length} mov.</span>
            </div>

            <!-- Segmented Allocation Bar (Verde Entrate vs Rosso Uscite) -->
            <div class="alloc-bar-track" style="margin: 10px 0 10px; height: 8px;">
              ${totalActivity === 0 ? `
                <div class="alloc-segment" style="width: 100%; background: rgba(255, 255, 255, 0.08);" title="Nessun movimento registrato nel mese"></div>
              ` : `
                ${accMonthIncome > 0 ? `<div class="alloc-segment" style="width: ${pctIncome}%; background: #30D158;" title="Entrate: ${pctIncome}% (+${this.formatCurrency(accMonthIncome)})"></div>` : ''}
                ${accMonthExpense > 0 ? `<div class="alloc-segment" style="width: ${pctExpense}%; background: #FF453A;" title="Uscite: ${pctExpense}% (-${this.formatCurrency(accMonthExpense)})"></div>` : ''}
              `}
            </div>

            <!-- Legenda a 3 Colonne (Entrate, Uscite, Flusso Netto) -->
            <div class="alloc-legend">
              <div class="legend-col">
                <div class="legend-label-row">
                  <span class="dot-indicator" style="background: #30D158;"></span>
                  <span class="legend-name">Entrate</span>
                </div>
                <span class="privacy-mask legend-amount" style="color: #30D158; font-size: 13px;">
                  +${this.formatCurrency(accMonthIncome)}
                </span>
              </div>
              <div class="legend-col">
                <div class="legend-label-row">
                  <span class="dot-indicator" style="background: #FF453A;"></span>
                  <span class="legend-name">Uscite</span>
                </div>
                <span class="privacy-mask legend-amount" style="color: #FF453A; font-size: 13px;">
                  -${this.formatCurrency(accMonthExpense)}
                </span>
              </div>
              <div class="legend-col">
                <div class="legend-label-row">
                  <span class="dot-indicator" style="background: ${netFlow >= 0 ? '#30D158' : '#0A84FF'};"></span>
                  <span class="legend-name">Flusso Netto</span>
                </div>
                <span class="privacy-mask legend-amount" style="color: ${netFlow >= 0 ? '#30D158' : 'var(--text-primary)'}; font-size: 13px;">
                  ${netSign}${this.formatCurrency(netFlow)}
                </span>
              </div>
            </div>

            ${isBuddy && liveAnalysis.isIncomeEstimated ? `
              <div style="margin-top: 10px; padding-top: 8px; border-top: 0.5px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; color: var(--text-tertiary);">Accredito stipendio atteso (25 ${liveAnalysis.curMonthName})</span>
                <span style="font-size: 11.5px; font-weight: 600; color: var(--apple-blue);">~${this.formatCurrency(liveAnalysis.effectiveIncome)}</span>
              </div>
            ` : ''}
          </div>

          <!-- Box Riconciliazione & Controprova Saldi (Pulito) -->
          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 12px; color: var(--text-secondary);">Ultimo Conguaglio (${recDate})</span>
              <strong class="privacy-mask" style="font-size: 13px; font-variant-numeric: tabular-nums;">${this.formatCurrency(recBal)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: var(--text-secondary);">Variazione dal conguaglio</span>
              <strong class="privacy-mask" style="font-size: 13px; font-variant-numeric: tabular-nums; color: ${diffFromRec >= 0 ? 'var(--apple-green)' : 'var(--apple-red)'};">
                ${diffSign}${this.formatCurrency(diffFromRec)}
              </strong>
            </div>
          </div>

          <!-- Breakdown Specifico per Tipo Conto -->
          ${isBuddy ? `
            <div style="background: rgba(0, 113, 227, 0.05); border: 1px solid rgba(0, 113, 227, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-blue); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 10px;">Dettagli Operativi Buddybank</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Istituto Bancario</span>
                <strong style="font-size: 12.5px; color: var(--text-primary);">UniCredit S.p.A.</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Canale Primario</span>
                <strong style="font-size: 12.5px; color: var(--text-primary);">Debit Card &amp; Bonifici SEPA</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Prossimo Accredito Previsto</span>
                <strong style="font-size: 12.5px; color: var(--apple-green);">Stipendio il 25 del mese</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(0, 113, 227, 0.15);">
                <span style="font-size: 11px; color: var(--text-tertiary);">Destinazione d'uso</span>
                <span style="font-size: 11.5px; color: var(--text-secondary);">Spese fisse &amp; liquidità operativa</span>
              </div>
            </div>
          ` : ''}

          ${isTR ? `
            <div style="background: rgba(175, 82, 222, 0.06); border: 1px solid rgba(175, 82, 222, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-purple); text-transform: uppercase; letter-spacing: 0.04em;">Composizione Portafoglio ETF</span>
                <span class="badge badge--info" style="font-size: 10px;">2 Strumenti</span>
              </div>

              <!-- Segmented Allocation Bar (XEON vs VWCE) -->
              <div class="alloc-bar-track" style="margin: 8px 0 10px; height: 8px;">
                <div class="alloc-segment" style="width: ${pctXeon}%; background: var(--apple-purple);" title="XEON Monetario: ${pctXeon}%"></div>
                <div class="alloc-segment" style="width: ${pctVwce}%; background: var(--apple-blue);" title="VWCE Azionario: ${pctVwce}%"></div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">🛡️ XEON • Liquidità (€STR) (${pctXeon}%)</span>
                <strong class="privacy-mask" style="font-size: 13px; color: var(--apple-purple); font-variant-numeric: tabular-nums;">${this.formatCurrency(xeonVal)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">📈 VWCE • Azionario Globale (${pctVwce}%)</span>
                <strong class="privacy-mask" style="font-size: 13px; color: var(--apple-blue); font-variant-numeric: tabular-nums;">${this.formatCurrency(vwceVal)}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(175, 82, 222, 0.15);">
                <span style="font-size: 11.5px; color: var(--text-secondary);">Rendimento netto stimato</span>
                <strong style="font-size: 12px; color: var(--apple-green);">+233,86 € / anno</strong>
              </div>
            </div>
          ` : ''}

          ${isVoucher ? (() => {
            const voucherUnit = (acc.balance > 0 && Math.abs((acc.balance / 10.5) - Math.round(acc.balance / 10.5)) < 0.02) ? 10.50 : 8.00;
            const voucherCount = Math.round(acc.balance / voucherUnit);
            return `
            <div style="background: rgba(255, 149, 0, 0.06); border: 1px solid rgba(255, 149, 0, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-orange); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 8px;">Dettaglio Buoni Pasto</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">Valore unitario buono</span>
                <strong style="font-size: 13px;">${this.formatCurrency(voucherUnit)} / buono</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12.5px; color: var(--text-primary);">Buoni residui disponibili</span>
                <strong class="privacy-mask" style="font-size: 13px; color: var(--apple-orange); font-variant-numeric: tabular-nums;">${voucherCount} buoni</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(255, 149, 0, 0.15);">
                <span style="font-size: 11px; color: var(--text-tertiary);">Trattamento fiscale</span>
                <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">100% Esente da imposte (Art. 51 TUIR)</span>
              </div>
            </div>
            `;
          })() : ''}

          ${isPension ? `
            <div style="background: rgba(52, 199, 89, 0.06); border: 1px solid rgba(52, 199, 89, 0.2); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
              <span style="font-size: 11.5px; font-weight: 700; color: var(--apple-green); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 8px;">Dettaglio Fondo Pensione</span>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Deducibilità annuale</span>
                <strong style="font-size: 12.5px; color: var(--text-primary);">Fino a 5.164,57 €/anno</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 12px; color: var(--text-secondary);">Regime Fiscale Riscatto</span>
                <strong style="font-size: 12.5px; color: var(--apple-green);">Tassazione agevolata 9% - 15%</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 0.5px solid rgba(52, 199, 89, 0.15);">
                <span style="font-size: 11px; color: var(--text-tertiary);">Finalità</span>
                <span style="font-size: 11.5px; color: var(--text-secondary);">Previdenza complementare integrativa</span>
              </div>
            </div>
          ` : ''}

          <!-- Ultimi Movimenti Registrati sul Conto -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Ultimi Movimenti Registrati</span>
              <span style="font-size: 11.5px; color: var(--text-secondary);">${accTxs.length} recenti</span>
            </div>
            ${accTxs.length === 0 ? `
              <div style="padding: 12px; text-align: center; color: var(--text-secondary); font-size: 12px; background: rgba(255,255,255,0.02); border-radius: 10px;">
                Nessun movimento recente registrato su questo conto
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${accTxs.map(t => {
                  const isInc = t.type === 'income';
                  const sign = isInc ? '+' : '-';
                  const color = isInc ? 'var(--apple-green)' : 'var(--text-primary)';
                  return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; background: rgba(255,255,255,0.03); border-radius: 10px;">
                      <div>
                        <strong style="font-size: 12.5px; color: var(--text-primary); display: block;">${t.description}</strong>
                        <span style="font-size: 11px; color: var(--text-secondary);">${t.date} • ${t.category}</span>
                      </div>
                      <span class="privacy-mask" style="font-size: 13px; font-weight: 700; color: ${color}; font-variant-numeric: tabular-nums;">
                        ${sign}${this.formatCurrency(t.amount)}
                      </span>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

          <!-- Pulsanti di Azione -->
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="apple-btn-primary" id="account-detail-action-btn" style="flex: 1; justify-content: center; padding: 11px;">
              ${isTR ? 'Apri Portafoglio Investimenti' : (isVoucher ? 'Vedi Spese e Categorie' : 'Vedi Tutti i Movimenti')}
            </button>
            <button class="apple-btn-secondary" id="account-detail-close-btn" style="padding: 11px 18px;">
              Chiudi
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalRoot);

    // Animazione fluida Apple sheet
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modalRoot.querySelector('#account-detail-overlay')?.classList.add('open');
        modalRoot.querySelector('#account-detail-sheet')?.classList.add('open');
      });
    });

    const close = () => {
      document.body.classList.remove('modal-open');
      const sheet = modalRoot.querySelector('#account-detail-sheet');
      const overlay = modalRoot.querySelector('#account-detail-overlay');
      if (sheet) sheet.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      setTimeout(() => modalRoot.remove(), 260);
      document.removeEventListener('keydown', onKeydown);
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeydown);

    modalRoot.querySelector('#account-detail-close')?.addEventListener('click', close);
    modalRoot.querySelector('#account-detail-close-btn')?.addEventListener('click', close);
    modalRoot.querySelector('#account-detail-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'account-detail-overlay') close();
    });

    const handle = modalRoot.querySelector('.modal-handle');
    const sheet = modalRoot.querySelector('#account-detail-sheet');
    if (handle && sheet) {
      handle.addEventListener('click', close);
      let startY = 0;
      let currentY = 0;
      handle.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
      }, { passive: true });
      handle.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        if (diff > 0) {
          sheet.style.transform = `translateY(${diff}px)`;
        }
      }, { passive: true });
      handle.addEventListener('touchend', () => {
        const diff = currentY - startY;
        if (diff > 75) {
          close();
        } else {
          sheet.style.transform = '';
        }
      }, { passive: true });
    }

    modalRoot.querySelector('#account-detail-action-btn')?.addEventListener('click', () => {
      close();
      if (isTR) {
        window.location.hash = '#investimenti';
      } else if (isVoucher) {
        window.location.hash = '#spese';
      } else {
        window.location.hash = '#movimenti';
      }
    });
  }

  destroyCharts() {
    if (this.lineChart) {
      try { this.lineChart.destroy(); } catch (e) {}
      this.lineChart = null;
    }
  }

  initLineChart(historyData) {
    const canvas = document.getElementById('dashboardCashFlowCanvas');
    if (!canvas || !window.Chart) return;

    this.destroyCharts();

    const ctx = canvas.getContext('2d');
    const incomeGrad = ctx.createLinearGradient(0, 0, 0, 240);
    incomeGrad.addColorStop(0, 'rgba(52, 199, 89, 0.2)');
    incomeGrad.addColorStop(1, 'rgba(52, 199, 89, 0.0)');

    const expenseGrad = ctx.createLinearGradient(0, 0, 0, 240);
    expenseGrad.addColorStop(0, 'rgba(255, 59, 48, 0.15)');
    expenseGrad.addColorStop(1, 'rgba(255, 59, 48, 0.0)');

    this.lineChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: historyData.labels,
        datasets: [
          {
            label: 'Entrate (€)',
            data: historyData.income,
            borderColor: '#30D158',
            backgroundColor: incomeGrad,
            fill: true,
            tension: 0.42,
            cubicInterpolationMode: 'monotone',
            borderWidth: 2.8,
            pointRadius: 0,
            pointHitRadius: 20,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#30D158'
          },
          {
            label: 'Uscite (€)',
            data: historyData.expenses,
            borderColor: '#FF453A',
            backgroundColor: expenseGrad,
            fill: true,
            tension: 0.42,
            cubicInterpolationMode: 'monotone',
            borderWidth: 2.8,
            pointRadius: 0,
            pointHitRadius: 20,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#FF453A'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              font: { size: 12, family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(28, 28, 30, 0.94)',
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 12 },
            padding: 10,
            cornerRadius: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: € ${ctx.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 } }
          },
          y: {
            grid: { color: 'rgba(120, 120, 128, 0.1)' },
            ticks: {
              font: { size: 11 },
              callback: (val) => '€ ' + val.toLocaleString('it-IT')
            }
          }
        }
      }
    });
  }
}

// === js/components/speseView.js ===
/**
 * Apple Design System - Spese View Component (Deep Analytics & Expense Management)
 * Monitoraggio e analisi avanzata delle uscite:
 * - KPI Macro (Fisse, Variabili, Voluttuarie 50/30/20)
 * - Budget Preventivo a Buste
 * - Analisi Categorie & Top Merchant / Fornitori
 * - Confronto Temporale MoM & Trend Uscite
 */


class SpeseView {
  constructor() {
    this.donutChart = null;
    this.trendChart = null;
    this.donutPeriod = 'current_month'; // 'current_month' | 'last_30_days' | 'last_3_months' | 'last_6_months' | 'current_year' | 'all'
    this.selectedPeriod = 'current-month';
    this.selectedSubtab = 'overview'; // 'overview', 'budget', 'merchants', 'confronto'
  }

  filterTransactionsByPeriod(allExpenseTxs, period) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based

    return allExpenseTxs.filter(t => {
      if (!t.date) return true;
      // Normalizza formato data YYYY-MM-DD o DD/MM/YYYY
      let dateObj = null;
      if (t.date.includes('-')) {
        dateObj = new Date(t.date);
      } else if (t.date.includes('/')) {
        const parts = t.date.split('/');
        if (parts.length === 3) {
          dateObj = new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0]);
        }
      }
      if (!dateObj || isNaN(dateObj.getTime())) return true;

      if (period.startsWith('month_')) {
        const parts = period.replace('month_', '').split('_');
        const targetM = parseInt(parts[0], 10) - 1;
        const targetY = parseInt(parts[1], 10);
        return dateObj.getFullYear() === targetY && dateObj.getMonth() === targetM;
      }

      switch (period) {
        case 'current_month':
          return dateObj.getFullYear() === currentYear && dateObj.getMonth() === currentMonth;
        case 'last_30_days': {
          const past30 = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
          return dateObj >= past30;
        }
        case 'last_3_months': {
          const past90 = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));
          return dateObj >= past90;
        }
        case 'last_6_months': {
          const past180 = new Date(now.getTime() - (180 * 24 * 60 * 60 * 1000));
          return dateObj >= past180;
        }
        case 'current_year':
          return dateObj.getFullYear() === currentYear;
        case 'all':
        default:
          return true;
      }
    });
  }

  getPeriodLabel(period) {
    if (period.startsWith('month_')) {
      const parts = period.replace('month_', '').split('_');
      const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
      const m = parseInt(parts[0], 10);
      const y = parseInt(parts[1], 10);
      return `${monthNames[m - 1] || 'Mese'} ${y || 2026}`;
    }

    const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const now = new Date();
    const curMonthName = monthNames[now.getMonth()];
    const curYear = now.getFullYear();

    switch (period) {
      case 'current_month': return `Mese Corrente (${curMonthName} ${curYear})`;
      case 'last_30_days': return 'Ultimi 30 Giorni';
      case 'last_3_months': return 'Ultimi 3 Mesi';
      case 'last_6_months': return 'Ultimi 6 Mesi';
      case 'current_year': return `Anno Solare ${curYear}`;
      case 'all': return 'Intero Storico Registrato';
      default: return 'Periodo Selezionato';
    }
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  destroyCharts() {
    if (this.donutChart) {
      try { this.donutChart.destroy(); } catch (e) {}
      this.donutChart = null;
    }
    if (this.trendChart) {
      try { this.trendChart.destroy(); } catch (e) {}
      this.trendChart = null;
    }
  }

  render(container) {
    this.destroyCharts();
    const summary = financeStore.summary;
    const liveAnalysis = financeStore.getCurrentMonthLiveAnalysis();
    const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
    const categories = financeStore.getCategories().filter(c => c.type === 'expense');
    const budget5030 = financeStore.getBudget50_30_20();
    const cycleStatus = financeStore.getPaycheckCycleStatus();
    const recurring = (typeof financeStore.getRecurringExpenses === 'function' ? financeStore.getRecurringExpenses() : (financeStore.recurringItems || []));

    const curMonthName = liveAnalysis.curMonthName;
    const curYear = liveAnalysis.curYear;

    // Calcolo spese fisse vs variabili live
    const fixedTotal = liveAnalysis.fixedExpenses;
    const variableTotal = liveAnalysis.variableExpenses;
    const totalMonthExpense = liveAnalysis.actualExpense;
    const remainingExtra = liveAnalysis.remainingExtraSavings;
    const realSavingsRate = liveAnalysis.realSavingsRate;
    const dailyAvg = liveAnalysis.curDay > 0 ? (totalMonthExpense / liveAnalysis.curDay) : 0;

    // Calcolo aggregato per fornitore / merchant
    const merchantMap = {};
    txs.forEach(t => {
      const desc = (t.description || 'Sconosciuto').trim();
      if (!merchantMap[desc]) {
        merchantMap[desc] = { name: desc, total: 0, count: 0, category: t.category };
      }
      merchantMap[desc].total += t.amount;
      merchantMap[desc].count += 1;
    });
    const topMerchants = Object.values(merchantMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);

    const incomeRef = Math.max(liveAnalysis.effectiveIncome || 1, totalMonthExpense + Math.max(0, remainingExtra));
    const incomeSatPct = liveAnalysis.effectiveIncome > 0 ? ((totalMonthExpense / liveAnalysis.effectiveIncome) * 100).toFixed(1) : '0.0';
    const pctFixedBar = Math.max(fixedTotal > 0 ? 5 : 0, Math.round((fixedTotal / incomeRef) * 100));
    const pctVarBar = Math.max(variableTotal > 0 ? 5 : 0, Math.round((variableTotal / incomeRef) * 100));
    const pctRemBar = Math.max(4, 100 - pctFixedBar - pctVarBar);

    // Altezze barre Micro-Chart 50/30/20 (armonizzate, compatte e con limite max rigido anti-overflow)
    const maxBarHeight = 52;
    const maxEnv = Math.max(budget5030.needs.target || 1, budget5030.wants.target || 1, budget5030.savings?.target || 1);
    const hNeeds = Math.min(maxBarHeight, Math.max(8, Math.round(((budget5030.needs.spent || 0) / maxEnv) * maxBarHeight)));
    const hWants = Math.min(maxBarHeight, Math.max(8, Math.round(((budget5030.wants.spent || 0) / maxEnv) * maxBarHeight)));
    const savingsVal = Math.max(0, (budget5030.monthlyIncome - totalMonthExpense));
    const hSavings = Math.min(maxBarHeight, Math.max(8, Math.round((savingsVal / maxEnv) * maxBarHeight)));
    const totalRemainingEnvelopes = Math.max(0, (budget5030.needs.target - budget5030.needs.spent)) + Math.max(0, (budget5030.wants.target - budget5030.wants.spent));

    const totalHistoricalExpenses = txs.reduce((s, t) => s + t.amount, 0) || 1;

    container.innerHTML = `
      <div class="page spese-page">
        
        <!-- Pulsante d'Azione Primario Stile Workout (Mobile Only) -->
        <div class="mobile-only-block">
          <button type="button" class="cta-workout-btn" id="spese-add-btn-mobile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Registra Nuova Spesa</span>
          </button>
        </div>

        <!-- Header di Sezione & Azioni Rapide (Desktop Only) -->
        <div class="spese-header-toolbar desk-only">
          <div class="spese-header-info">
            <h2 class="page-title">Monitoraggio Spese</h2>
            <p class="page-subtitle">Analisi avanzata delle uscite, budget preventivo 50/30/20 e controllo fornitori</p>
          </div>
          <div class="spese-header-actions">
            <button class="apple-btn-secondary" id="spese-export-csv">
              ${getIcon('list', 14)} Esporta Spese
            </button>
            <button class="apple-btn-primary" id="spese-add-btn">
              ${getIcon('plus', 14)} Registra Spesa
            </button>
          </div>
        </div>

        <!-- 1. HERO CARD MONOLITICA: USCITE & FLUSSO MESE (Workout Style) -->
        <section class="card hero-patrimonio-card spese-hero-card">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">Uscite ${curMonthName} ${curYear}</span>
                <span class="badge ${totalMonthExpense <= (liveAnalysis.effectiveIncome * 0.75) ? 'badge--positive' : 'badge--negative'} hero-badge-tag">
                  ${incomeSatPct}% Entrate
                </span>
              </div>
              <div class="card__value privacy-mask hero-networth-val">
                ${this.formatCurrency(totalMonthExpense)}
              </div>
            </div>
            <div class="hero-trend-wrap">
              <span class="trend-badge positive">
                ${this.formatCurrency(dailyAvg)}/gg
              </span>
              <button type="button" class="cashflow-link" id="spese-export-csv-hero" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;">
                Esporta CSV &rarr;
              </button>
            </div>
          </div>

          <!-- Segmented Allocation Bar (Spese Fisse / Spese Extra / Rimanenza) -->
          <div class="alloc-bar-track">
            ${pctFixedBar > 0 ? `<div class="alloc-segment" style="width: ${pctFixedBar}%; background: #FF9F0A;" title="Spese Fisse: ${this.formatCurrency(fixedTotal)}"></div>` : ''}
            ${pctVarBar > 0 ? `<div class="alloc-segment" style="width: ${pctVarBar}%; background: #FF453A;" title="Spese Extra: ${this.formatCurrency(variableTotal)}"></div>` : ''}
            <div class="alloc-segment" style="width: ${pctRemBar}%; background: #AF52DE;" title="Rimanenza: ${this.formatCurrency(remainingExtra)}"></div>
          </div>

          <!-- Legenda Composizione a 3 Colonne Pulite -->
          <div class="alloc-legend">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #FF9F0A;"></span>
                <span class="legend-name">Fisse (${liveAnalysis.fixedItems.length})</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #FF9F0A;">
                ${this.formatCurrency(fixedTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #FF453A;"></span>
                <span class="legend-name">Extra (${liveAnalysis.variableItems.length})</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #FF453A;">
                ${this.formatCurrency(variableTotal)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #AF52DE;"></span>
                <span class="legend-name">Rimanenza (${realSavingsRate}%)</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #AF52DE;">
                ${this.formatCurrency(remainingExtra)}
              </span>
            </div>
          </div>
        </section>

        <!-- 2. BUDGET PREVENTIVO 50/30/20 (Workout Micro Bar Chart) -->
        <section class="cashflow-section">
          <div class="cashflow-header-row">
            <div class="cashflow-header-left">
              <h3 class="cashflow-title">
                <span>Budget 50/30/20 • Buste Mese</span>
                <span class="badge badge--info flow-day-badge">
                  <span class="live-dot"></span>
                  Harvard Rule
                </span>
              </h3>
            </div>
            <a href="#movimenti" class="cashflow-link">
              Vedi Movimenti &rarr;
            </a>
          </div>

          <div class="native-card mobile-workout-cashflow-card spese-workout-budget-card">
            <div class="cashflow-kpi-row">
              <div>
                <span class="cashflow-kpi-sub">Margine Residuo Buste (Bisogni + Svago)</span>
                <div class="cashflow-kpi-val privacy-mask" style="color: #30D158;">${this.formatCurrency(totalRemainingEnvelopes)}</div>
              </div>
              <span class="cashflow-pct-tag" style="color: #30D158; background: rgba(48, 209, 88, 0.14);">${summary.savingsRate}% Risparmio</span>
            </div>

            <!-- Micro Bar Chart (Bisogni 50% / Svago 30% / Risparmio 20%) -->
            <div class="workout-bars-grid">
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(budget5030.needs.spent)} €</div>
                <div class="bar-pill" style="height: ${hNeeds}px; background: linear-gradient(180deg, #0A84FF 0%, rgba(10, 132, 255, 0.4) 100%);"></div>
                <div class="bar-label">Bisogni (${budget5030.needs.pct}%)</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(budget5030.wants.spent)} €</div>
                <div class="bar-pill bar-fisse" style="height: ${hWants}px;"></div>
                <div class="bar-label">Svago (${budget5030.wants.pct}%)</div>
              </div>
              <div class="workout-bar-col">
                <div class="bar-val privacy-mask">${Math.round(summary.savingsAmount)} €</div>
                <div class="bar-pill bar-entrate" style="height: ${hSavings}px;"></div>
                <div class="bar-label">Risparmio (20%)</div>
              </div>
            </div>

            <div class="timeline-footer">
              <span>Bisogni: <strong class="privacy-mask">${Math.round(budget5030.needs.spent)} / ${Math.round(budget5030.needs.target)} €</strong></span>
              <span>Svago: <strong class="privacy-mask">${Math.round(budget5030.wants.spent)} / ${Math.round(budget5030.wants.target)} €</strong></span>
            </div>
          </div>
        </section>

        <!-- 3. Ripartizione per Categoria & Top Fornitori (LinkedIn Dark Card Lists) -->
        <div class="charts-grid">
          
          <!-- Box Sinistro: Donut Categorie + LinkedIn List -->
          <div class="card accounts-overview-card chart-card">
            <div class="card__header" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
              <div>
                <span class="card__title">Ripartizione Categorie</span>
                <span class="accounts-desc" id="spese-donut-subtitle" style="display: block; font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">
                  ${this.getPeriodLabel(this.donutPeriod)}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="badge badge--info" id="spese-donut-total-badge">
                  ${this.formatCurrency(this.filterTransactionsByPeriod(txs, this.donutPeriod).reduce((s, t) => s + t.amount, 0))}
                </span>
                <div class="apple-select-wrapper" style="min-width: 128px;">
                  <select id="spese-donut-period-select" class="apple-select" style="padding: 5px 24px 5px 10px; font-size: 11.5px; height: 30px; border-radius: 9999px;">
                    <option value="current_month" ${this.donutPeriod === 'current_month' ? 'selected' : ''}>Mese Corrente</option>
                    <option value="last_30_days" ${this.donutPeriod === 'last_30_days' ? 'selected' : ''}>Ultimi 30 gg</option>
                    <option value="last_3_months" ${this.donutPeriod === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
                    <option value="last_6_months" ${this.donutPeriod === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
                    <option value="current_year" ${this.donutPeriod === 'current_year' ? 'selected' : ''}>Anno 2026</option>
                    <option value="all" ${this.donutPeriod === 'all' ? 'selected' : ''}>Tutto</option>
                    <optgroup label="Mesi Specifici">
                      <option value="month_11_2026" ${this.donutPeriod === 'month_11_2026' ? 'selected' : ''}>Novembre 2026</option>
                      <option value="month_10_2026" ${this.donutPeriod === 'month_10_2026' ? 'selected' : ''}>Ottobre 2026</option>
                      <option value="month_09_2026" ${this.donutPeriod === 'month_09_2026' ? 'selected' : ''}>Settembre 2026</option>
                      <option value="month_08_2026" ${this.donutPeriod === 'month_08_2026' ? 'selected' : ''}>Agosto 2026</option>
                      <option value="month_07_2026" ${this.donutPeriod === 'month_07_2026' ? 'selected' : ''}>Luglio 2026</option>
                    </optgroup>
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
            <div class="card__body">
              <div class="donut-chart-wrapper" style="position: relative; height: 200px; margin-bottom: 12px;">
                <canvas id="spese-donut-canvas"></canvas>
              </div>
              <div class="accounts-list-container" id="spese-categories-list">
                ${this.renderCategoryBreakdownList(this.filterTransactionsByPeriod(txs, this.donutPeriod))}
              </div>
            </div>
          </div>

          <!-- Box Destro: Top Merchant & Fornitori Principali (LinkedIn List) -->
          <div class="card accounts-overview-card">
            <div class="card__header">
              <div>
                <span class="card__title">Top Fornitori &amp; Merchant</span>
                <span class="accounts-desc desk-only">I commercianti con il maggior impatto sulle uscite</span>
              </div>
              <span class="badge badge--neutral">${topMerchants.length} Voci</span>
            </div>
            <div class="accounts-list-container">
              ${topMerchants.map((m, idx) => {
                const pct = ((m.total / totalHistoricalExpenses) * 100).toFixed(1);
                return `
                  <div class="account-row-item">
                    <div class="account-row-left">
                      <div class="account-row-icon" style="background: rgba(10, 132, 255, 0.14); color: #0A84FF;">
                        ${getCategoryIcon(m.category, 16)}
                      </div>
                      <div class="account-row-info">
                        <strong class="account-row-name" title="${m.name}">${idx + 1}. ${m.name}</strong>
                        <span class="account-row-type">${cleanCategoryName(m.category)} • ${m.count} ${m.count === 1 ? 'operazione' : 'operazioni'} (${pct}%)</span>
                      </div>
                    </div>
                    <div class="account-row-right">
                      <span class="account-row-balance privacy-mask">
                        ${this.formatCurrency(m.total)}
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    this.initDonutChart(txs, categories);
    this.bindEvents(container);
  }

  renderCategoryBreakdownList(txs) {
    const totals = {};
    let totalAll = 0;
    txs.forEach(t => {
      const cat = cleanCategoryName(t.category) || 'Altro';
      totals[cat] = (totals[cat] || 0) + t.amount;
      totalAll += t.amount;
    });

    const sorted = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    if (sorted.length === 0) {
      return `
        <div style="padding: 18px; text-align: center; color: var(--text-secondary); font-size: 13px;">
          Nessuna spesa registrata nel periodo selezionato
        </div>
      `;
    }

    const palette = ['#0A84FF', '#30D158', '#FF9F0A', '#AF52DE', '#FF375F', '#5E5CE6'];

    return sorted.map(([name, amount], i) => {
      const pct = totalAll > 0 ? ((amount / totalAll) * 100).toFixed(1) : '0.0';
      const col = palette[i % palette.length];
      return `
        <div class="account-row-item">
          <div class="account-row-left">
            <div class="account-row-icon" style="background: ${col}22; color: ${col};">
              ${getCategoryIcon(name, 16)}
            </div>
            <div class="account-row-info">
              <strong class="account-row-name">${name}</strong>
              <span class="account-row-type">Incidenza sul periodo: ${pct}%</span>
            </div>
          </div>
          <div class="account-row-right">
            <span class="account-row-balance privacy-mask" style="color: ${col};">
              ${this.formatCurrency(amount)}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  initDonutChart(txs, categories) {
    const canvas = document.getElementById('spese-donut-canvas');
    if (!canvas || typeof Chart === 'undefined') return;

    const periodTxs = this.filterTransactionsByPeriod(txs, this.donutPeriod);
    const totals = {};
    periodTxs.forEach(t => {
      const cat = cleanCategoryName(t.category) || 'Altro';
      totals[cat] = (totals[cat] || 0) + t.amount;
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(s => s[0]);
    const data = sorted.map(s => s[1]);
    const colors = ['#0071E3', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#5AC8FA', '#FF3B30'];

    this.donutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels.length > 0 ? labels : ['Nessuna spesa'],
        datasets: [{
          data: data.length > 0 ? data : [1],
          backgroundColor: data.length > 0 ? colors.slice(0, labels.length) : ['rgba(142, 142, 147, 0.2)'],
          borderWidth: 2,
          borderColor: 'var(--bg-card)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: € ${ctx.raw.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
            }
          }
        }
      }
    });
  }

  updateDonutData(period, allExpenseTxs) {
    const periodTxs = this.filterTransactionsByPeriod(allExpenseTxs, period);
    const periodTotal = periodTxs.reduce((s, t) => s + t.amount, 0);

    // Aggiorna badge e sottotitolo
    const badge = document.getElementById('spese-donut-total-badge');
    if (badge) badge.textContent = this.formatCurrency(periodTotal);

    const sub = document.getElementById('spese-donut-subtitle');
    if (sub) sub.textContent = this.getPeriodLabel(period);

    // Aggiorna lista categorie breakdown
    const listEl = document.getElementById('spese-categories-list');
    if (listEl) {
      listEl.innerHTML = this.renderCategoryBreakdownList(periodTxs);
    }

    // Aggiorna Donut Chart
    if (this.donutChart) {
      const totals = {};
      periodTxs.forEach(t => {
        const cat = cleanCategoryName(t.category) || 'Altro';
        totals[cat] = (totals[cat] || 0) + t.amount;
      });

      const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
      const labels = sorted.map(s => s[0]);
      const data = sorted.map(s => s[1]);
      const colors = ['#0071E3', '#34C759', '#FF9500', '#AF52DE', '#FF2D55', '#5856D6', '#5AC8FA', '#FF3B30'];

      this.donutChart.data.labels = labels.length > 0 ? labels : ['Nessuna spesa'];
      this.donutChart.data.datasets[0].data = data.length > 0 ? data : [1];
      this.donutChart.data.datasets[0].backgroundColor = data.length > 0 ? colors.slice(0, labels.length) : ['rgba(142, 142, 147, 0.2)'];
      this.donutChart.update();
    }
  }

  bindEvents(container) {
    const periodSelect = container.querySelector('#spese-donut-period-select');
    if (periodSelect) {
      periodSelect.addEventListener('change', (e) => {
        this.donutPeriod = e.target.value;
        const allExpenseTxs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
        this.updateDonutData(this.donutPeriod, allExpenseTxs);
      });
    }

    container.querySelectorAll('#spese-add-btn, #spese-add-btn-mobile').forEach(btn => {
      btn.addEventListener('click', () => {
        window.location.hash = '#movimenti';
        setTimeout(() => {
          const openModalBtn = document.querySelector('#btn-add-tx-mobile, #btn-add-tx-header, #btn-hero-add-tx, #open-add-modal-btn');
          if (openModalBtn) openModalBtn.click();
        }, 150);
      });
    });

    container.querySelectorAll('#spese-export-csv, #spese-export-csv-hero').forEach(btn => {
      btn.addEventListener('click', () => {
        const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
        let csv = 'Data;Descrizione;Categoria;Conto;Importo (EUR)\n';
        txs.forEach(t => {
          csv += `"${t.date || ''}";"${(t.description || '').replace(/"/g, '""')}";"${cleanCategoryName(t.category)}";"${t.account || ''}";"${(t.amount || 0).toFixed(2)}"\n`;
        });
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Spese_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  }
}

// === js/components/movimentiView.js ===
/**
 * Apple Design System - Movimenti View Component (Ottimizzato Desktop & Mobile)
 * - Sub-navigazione: Elenco Movimenti, Analisi Singola Categoria, Confronto Categorie
 * - Categorie con emoji, badge semantici e auto-aggiunta dinamica
 * - Smart Rules con suggerimento predittivo in tempo reale durante la digitazione
 * - Controllo similarità categorie (Smart Deduplication & Merge)
 * - Ricerca istantanea, filtri rapidi, ordinamento dinamico
 */


class MovimentiView {
  constructor() {
    this.activeSubtab = 'elenco'; // 'elenco' | 'analisi' | 'confronto' | 'budget'
    this.analysisCat = '';
    this.compareCatA = '';
    this.compareCatB = '';
    this.analysisChart = null;
    this.compareChart = null;
    this.viewMode = 'list'; // 'list' (Apple Wallet native) | 'table' (Data grid)

    this.filters = {
      search: '',
      type: 'all',       // 'all' | 'income' | 'expense' | 'transfer'
      category: 'all',
      account: 'all',
      sortBy: 'date-desc',
      period: 'all',     // 'all' | 'current_month' | 'last_30_days' | 'last_3_months' | 'last_6_months' | 'current_year' | 'custom'
      customFrom: '',
      customTo: ''
    };
    this.modalOpen = false;
    this.editingTxId = null; // null = nuovo movimento, string = id movimento in modifica
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  destroyCharts() {
    if (this.analysisChart) {
      try { this.analysisChart.destroy(); } catch (e) {}
      this.analysisChart = null;
    }
    if (this.compareChart) {
      try { this.compareChart.destroy(); } catch (e) {}
      this.compareChart = null;
    }
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

  parseDateObject(dateStr) {
    if (!dateStr) return null;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
    }
    return null;
  }

  filterByPeriod(txs, period, customFrom, customTo) {
    const refDate = new Date(); // Data dinamica reale corrente

    return txs.filter(t => {
      const d = this.parseDateObject(t.date);
      if (!d) return true;

      switch (period) {
        case 'current_month':
          return d.getFullYear() === refDate.getFullYear() && d.getMonth() === refDate.getMonth();
        case 'last_30_days': {
          const past30 = new Date(refDate);
          past30.setDate(past30.getDate() - 30);
          return d >= past30 && d <= refDate;
        }
        case 'last_3_months': {
          const past90 = new Date(refDate);
          past90.setMonth(past90.getMonth() - 3);
          return d >= past90 && d <= refDate;
        }
        case 'last_6_months': {
          const past180 = new Date(refDate);
          past180.setMonth(past180.getMonth() - 6);
          return d >= past180 && d <= refDate;
        }
        case 'current_year':
          return d.getFullYear() === refDate.getFullYear();
        case 'custom': {
          if (customFrom) {
            const fromD = new Date(customFrom + 'T00:00:00');
            if (d < fromD) return false;
          }
          if (customTo) {
            const toD = new Date(customTo + 'T23:59:59');
            if (d > toD) return false;
          }
          return true;
        }
        default:
          return true;
      }
    });
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

  formatDateFull(dateStr) {
    const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
    if (!dateStr) return 'Data non disp.';
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [d, m, y] = dateStr.split('/');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return `${parseInt(d, 10)} ${months[mIdx]} ${y}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-');
      const mIdx = Math.max(0, Math.min(11, parseInt(m, 10) - 1));
      return `${parseInt(d, 10)} ${months[mIdx]} ${y}`;
    }
    return dateStr;
  }

  getMonthYearGroup(dateStr) {
    const monthsLong = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];
    if (!dateStr) return { key: '0000-00', label: 'Altro Periodo' };

    let y = '2026', m = 10;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const parts = dateStr.split('/');
      y = parts[2];
      m = parseInt(parts[1], 10);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const parts = dateStr.split('-');
      y = parts[0];
      m = parseInt(parts[1], 10);
    }
    const mIdx = Math.max(0, Math.min(11, m - 1));
    const mKey = `${y}-${String(m).padStart(2, '0')}`;
    return { key: mKey, label: `${monthsLong[mIdx]} ${y}` };
  }

  getCategoryAvatarClass(category, type) {
    if (type === 'income') return 'cat-avatar--income';
    if (type === 'transfer') return 'cat-avatar--giroconto';

    const clean = cleanCategoryName(category).toLowerCase();
    if (clean.includes('alimentar') || clean.includes('spesa') || clean.includes('supermercat')) return 'cat-avatar--alimentari';
    if (clean.includes('ristorant') || clean.includes('bar') || clean.includes('pranz') || clean.includes('cen')) return 'cat-avatar--ristoranti';
    if (clean.includes('cas') || clean.includes('affitt') || clean.includes('mutuo')) return 'cat-avatar--casa';
    if (clean.includes('utenz') || clean.includes('bollett') || clean.includes('luce') || clean.includes('gas')) return 'cat-avatar--utenze';
    if (clean.includes('auto') || clean.includes('trasport') || clean.includes('benzina')) return 'cat-avatar--auto';
    if (clean.includes('salut') || clean.includes('farmaci') || clean.includes('medic')) return 'cat-avatar--salute';
    if (clean.includes('svag') || clean.includes('cinema') || clean.includes('streaming')) return 'cat-avatar--svago';
    if (clean.includes('shop') || clean.includes('acquist') || clean.includes('abbigliament')) return 'cat-avatar--shopping';
    if (clean.includes('viagg') || clean.includes('vacanz') || clean.includes('hotel') || clean.includes('volo')) return 'cat-avatar--viaggi';
    if (clean.includes('lavor') || clean.includes('consulenz')) return 'cat-avatar--lavoro';
    if (clean.includes('stipendi') || clean.includes('accredit')) return 'cat-avatar--stipendio';
    if (clean.includes('invest') || clean.includes('vwce') || clean.includes('pac')) return 'cat-avatar--investimenti';
    if (clean.includes('emergenz') || clean.includes('xeon')) return 'cat-avatar--fondo_emergenza';
    if (clean.includes('pension') || clean.includes('previdenz')) return 'cat-avatar--pensione';
    if (clean.includes('girocont')) return 'cat-avatar--giroconto';
    return 'cat-avatar--default';
  }

  groupTransactionsByMonth(txs) {
    const groupsMap = new Map();

    txs.forEach(tx => {
      const { key, label } = this.getMonthYearGroup(tx.date);
      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          key,
          label,
          txCount: 0,
          totalExpense: 0,
          totalIncome: 0,
          transactions: []
        });
      }
      const g = groupsMap.get(key);
      g.txCount++;
      g.transactions.push(tx);
      if (tx.type === 'expense') g.totalExpense += tx.amount;
      else if (tx.type === 'income') g.totalIncome += tx.amount;
    });

    return Array.from(groupsMap.values());
  }

  getFilteredTransactions() {
    let txs = financeStore.getAllTransactions();

    if (this.filters.search) {
      const q = this.filters.search.toLowerCase();
      txs = txs.filter(t =>
        (t.description || '').toLowerCase().includes(q) ||
        (t.category || '').toLowerCase().includes(q) ||
        (t.account || '').toLowerCase().includes(q) ||
        (t.fromAccount || '').toLowerCase().includes(q) ||
        (t.toAccount || '').toLowerCase().includes(q)
      );
    }

    if (this.filters.type !== 'all') {
      txs = txs.filter(t => t.type === this.filters.type);
    }

    if (this.filters.category !== 'all') {
      txs = txs.filter(t => t.category === this.filters.category);
    }

    if (this.filters.account !== 'all') {
      const acc = this.filters.account.toLowerCase();
      txs = txs.filter(t =>
        (t.account && t.account.toLowerCase().includes(acc)) ||
        (t.fromAccount && t.fromAccount.toLowerCase().includes(acc)) ||
        (t.toAccount && t.toAccount.toLowerCase().includes(acc))
      );
    }

    // Filtro per periodo di riferimento
    if (this.filters.period && this.filters.period !== 'all') {
      txs = this.filterByPeriod(txs, this.filters.period, this.filters.customFrom, this.filters.customTo);
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
    this.destroyCharts();
    const categories = financeStore.getCategories();
    const accounts = financeStore.getAccounts();
    const summary = financeStore.summary;
    const allTxs = financeStore.getAllTransactions();
    const curMonthIncome = summary.monthlyIncome || 0;
    const curMonthExpense = summary.monthlyExpense || 0;
    const curMonthNet = curMonthIncome - curMonthExpense;

    const tabMeta = {
      elenco: {
        badge: 'Registro Ufficiale',
        badgeClass: 'badge--blue',
        title: 'Registro Movimenti',
        subtitle: 'Cronologia entrate e uscite con filtri multicriterio, vista Apple Wallet e tabella dati',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-export-movimenti">
            ${getIcon('list', 14)} <span>Esporta CSV</span>
          </button>
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      },
      analisi: {
        badge: 'Trend & Breakdown',
        badgeClass: 'badge--purple',
        title: 'Analisi Categorie',
        subtitle: 'Approfondimento storico su 12 mesi, spesa media mensile e concentrazione uscite',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      },
      confronto: {
        badge: 'Head-to-Head',
        badgeClass: 'badge--warning',
        title: 'Confronto Categorie',
        subtitle: 'Analisi comparativa testa a testa tra due categorie di spesa e scostamento nel tempo',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      },
      budget: {
        badge: 'Regola 50/30/20',
        badgeClass: 'badge--positive',
        title: 'Budget Preventivo 50/30/20',
        subtitle: 'Ripartizione delle entrate nelle tre buste (Bisogni 50%, Voluttuari 30%, Risparmio 20%)',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-tx-header">
            ${getIcon('plus', 14)} <span>Nuovo Movimento</span>
          </button>
        `
      }
    };
    const currentMeta = tabMeta[this.activeSubtab] || tabMeta.elenco;

    // Sottotitoli contestuali per la navbar in app
    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = 'Movimenti';
    if (subtitleEl) subtitleEl.textContent = currentMeta.subtitle;

    container.innerHTML = `
      <div class="page movimenti-page">

        <!-- Header di Sezione in Stile Apple (Titolo + Sottotitolo Dinamico) -->
        <header class="movimenti-header-section">
          
          <div class="spese-header-toolbar movimenti-header-toolbar desk-only">
            <div class="spese-header-info movimenti-header-info">
              <div class="movimenti-meta-row">
                <span class="badge ${currentMeta.badgeClass}">${currentMeta.badge}</span>
                <span class="movimenti-chip privacy-mask" style="color: var(--apple-green);">
                  Entrate: <strong>+${this.formatCurrency(curMonthIncome)}</strong>
                </span>
                <span class="movimenti-chip privacy-mask" style="color: var(--apple-red);">
                  Uscite: <strong>-${this.formatCurrency(curMonthExpense)}</strong>
                </span>
                <span class="movimenti-chip privacy-mask">
                  Netto: <strong>${curMonthNet >= 0 ? '+' : ''}${this.formatCurrency(curMonthNet)}</strong>
                </span>
                <span class="movimenti-chip">
                  <strong>${allTxs.length}</strong> transazioni
                </span>
              </div>
              <h2 class="page-title">${currentMeta.title}</h2>
              <p class="page-subtitle">${currentMeta.subtitle}</p>
            </div>
            
            <div class="spese-header-actions movimenti-header-actions">
              ${currentMeta.actionHtml}
            </div>
          </div>

          <!-- Sotto-menu Segmentato Apple Workout Capsule -->
          <div class="movimenti-subtabs-bar">
            <nav class="movimenti-segmented-tabs" id="movimenti-subtabs">
              <button class="movimenti-tab-btn ${this.activeSubtab === 'elenco' ? 'active' : ''}" data-subtab="elenco">
                <span class="tab-icon">${getIcon('list', 15)}</span>
                <span class="tab-label">Elenco</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'analisi' ? 'active' : ''}" data-subtab="analisi">
                <span class="tab-icon">${getIcon('chart', 15)}</span>
                <span class="tab-label">Analisi</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'confronto' ? 'active' : ''}" data-subtab="confronto">
                <span class="tab-icon">${getIcon('conguaglio', 15)}</span>
                <span class="tab-label">Confronto</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'budget' ? 'active' : ''}" data-subtab="budget">
                <span class="tab-icon">${getIcon('target', 15)}</span>
                <span class="tab-label">Budget</span>
              </button>
            </nav>
          </div>

          <!-- Mobile Primary CTA Pill (Workout Style) -->
          <div class="mobile-only-block" style="margin-top: 8px;">
            <button type="button" class="cta-workout-btn" id="btn-add-tx-mobile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Nuovo Movimento</span>
            </button>
          </div>

        </header>

        ${this.activeSubtab === 'elenco' ? this.renderElencoView(categories, accounts) : ''}
        ${this.activeSubtab === 'analisi' ? this.renderAnalisiView(categories) : ''}
        ${this.activeSubtab === 'confronto' ? this.renderConfrontoView(categories) : ''}
        ${this.activeSubtab === 'budget' ? this.renderBudgetView() : ''}

      </div>
    `;

    this.bindSubtabEvents(container);

    if (this.activeSubtab === 'elenco') {
      this.bindEvents(container);
    } else if (this.activeSubtab === 'analisi') {
      this.bindAnalisiEvents(container);
      requestAnimationFrame(() => this.initAnalysisChart());
    } else if (this.activeSubtab === 'confronto') {
      this.bindConfrontoEvents(container);
      requestAnimationFrame(() => this.initCompareChart());
    }

    this.renderModal(categories, accounts, container);
  }

  bindSubtabEvents(container) {
    container.querySelectorAll('#movimenti-subtabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          if (window.location.hash !== `#movimenti-${sub}`) {
            window.location.hash = `movimenti-${sub}`;
          }
          this.render(container);
        }
      });
    });

    container.querySelectorAll('#btn-add-tx-header, #btn-add-tx-mobile').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openModal();
      });
    });

    container.querySelectorAll('#btn-export-movimenti, #btn-export-movimenti-hero').forEach(exportBtn => {
      exportBtn.addEventListener('click', () => {
        const txs = this.getFilteredTransactions();
        let csv = 'Data;Tipo;Descrizione;Categoria;Conto;Importo (EUR)\n';
        txs.forEach(t => {
          csv += `"${t.date || ''}";"${t.type || 'expense'}";"${(t.description || '').replace(/"/g, '""')}";"${cleanCategoryName(t.category)}";"${t.account || ''}";"${(t.amount || 0).toFixed(2)}"\n`;
        });
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Movimenti_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
    });
  }

  // =========================================================================
  // 1. VISTA ELENCO MOVIMENTI (Workout & LinkedIn Standard)
  // =========================================================================
  renderElencoView(categories, accounts) {
    const txs = this.getFilteredTransactions();
    const stats = this.computeStats(txs);
    const monthGroups = this.groupTransactionsByMonth(txs);

    // Lista conti univoci per il filtro
    const allAccountNames = Array.from(new Set([
      ...accounts.map(a => a.name),
      ...financeStore.getAllTransactions().map(t => t.account).filter(Boolean)
    ]));

    const flowTotal = Math.max(stats.totalIncome + stats.totalExpense, 1);
    const incomePct = Math.round((stats.totalIncome / flowTotal) * 100);
    const expensePct = Math.max(0, 100 - incomePct);

    return `
      <!-- Monolithic Hero Card: Bilancio Flusso Cassa (Workout & LinkedIn Style) -->
      <section class="card hero-patrimonio-card movimenti-hero-card">
        <div class="hero-top-row">
          <div class="hero-title-group">
            <div class="hero-badge-row">
              <span class="hero-title-label">Saldo Flusso Periodo</span>
              <span class="badge ${stats.netFlow >= 0 ? 'badge--positive' : 'badge--negative'} hero-badge-tag">
                ${stats.netFlow >= 0 ? 'Surplus' : 'Deficit'}
              </span>
            </div>
            <div class="card__value privacy-mask hero-networth-val" style="color: ${stats.netFlow >= 0 ? '#30D158' : '#FF453A'};">
              ${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}
            </div>
          </div>
          <div class="hero-trend-wrap">
            <span class="trend-badge positive">
              ${stats.count} mov.
            </span>
            <button type="button" class="cashflow-link" id="btn-export-movimenti-hero" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;">
              Esporta CSV &rarr;
            </button>
          </div>
        </div>

        <!-- Segmented Allocation Bar: Entrate vs Uscite -->
        <div class="alloc-bar-track" title="Ripartizione Entrate vs Uscite">
          <div class="alloc-segment" style="width: ${Math.max(incomePct, 8)}%; background: #30D158;"></div>
          <div class="alloc-segment" style="width: ${Math.max(expensePct, 8)}%; background: #FF453A;"></div>
        </div>

        <!-- 3-Column Breakdown Legend -->
        <div class="alloc-legend">
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #30D158;"></span>
              <span class="legend-name">Entrate</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #30D158;">
              +${this.formatCurrency(stats.totalIncome)}
            </span>
          </div>
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #FF453A;"></span>
              <span class="legend-name">Uscite</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #FF453A;">
              -${this.formatCurrency(stats.totalExpense)}
            </span>
          </div>
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #0A84FF;"></span>
              <span class="legend-name">Operazioni</span>
            </div>
            <span class="legend-amount" style="color: #0A84FF;">
              ${stats.count} reg.
            </span>
          </div>
        </div>
      </section>

      <!-- Apple Glassmorphic Unified Controls Card -->
      <section class="mov-controls-card">
        <!-- Top Row: Search Input + View Mode Switcher -->
        <div class="mov-controls-top">
          <div class="mov-search-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="mov-search" class="movimenti-search-input apple-input" placeholder="Cerca descrizione, conto o categoria..." value="${this.filters.search}" />
            ${this.filters.search ? `<button id="mov-search-clear" class="search-clear-btn" title="Cancella ricerca">&times;</button>` : ''}
          </div>

          <!-- View Mode Toggle: Apple List vs Data Table -->
          <div class="mov-view-segmented" id="mov-view-segmented">
            <button class="mov-view-btn ${this.viewMode === 'list' ? 'active' : ''}" data-mode="list" title="Vista Lista Apple Wallet">
              ${getIcon('list', 14)}
              <span>Lista</span>
            </button>
            <button class="mov-view-btn ${this.viewMode === 'table' ? 'active' : ''}" data-mode="table" title="Vista Tabella Dati">
              ${getIcon('table', 14)}
              <span>Tabella</span>
            </button>
          </div>
        </div>

        <!-- Middle Row: Type Segmented Control -->
        <div class="mov-controls-mid">
          <div class="segmented-control" id="mov-type-segmented">
            <button class="segment-btn ${this.filters.type === 'all' ? 'active' : ''}" data-type="all">Tutti</button>
            <button class="segment-btn ${this.filters.type === 'expense' ? 'active' : ''}" data-type="expense">Uscite</button>
            <button class="segment-btn ${this.filters.type === 'income' ? 'active' : ''}" data-type="income">Entrate</button>
            <button class="segment-btn ${this.filters.type === 'transfer' ? 'active' : ''}" data-type="transfer">Giroconti</button>
          </div>
        </div>

        <!-- Filter Dropdowns Row: Period, Category, Account, Sort -->
        <div class="mov-controls-filters">
          <div class="apple-select-wrapper">
            <select id="mov-period-filter" class="apple-select">
              <option value="all" ${this.filters.period === 'all' ? 'selected' : ''}>Tutto lo Storico</option>
              <option value="current_month" ${this.filters.period === 'current_month' ? 'selected' : ''}>Mese Corrente</option>
              <option value="last_30_days" ${this.filters.period === 'last_30_days' ? 'selected' : ''}>Ultimi 30 Giorni</option>
              <option value="last_3_months" ${this.filters.period === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
              <option value="last_6_months" ${this.filters.period === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
              <option value="current_year" ${this.filters.period === 'current_year' ? 'selected' : ''}>Anno Corrente</option>
              <option value="custom" ${this.filters.period === 'custom' ? 'selected' : ''}>Intervallo Personalizzato...</option>
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="apple-select-wrapper">
            <select id="mov-category-filter" class="apple-select">
              <option value="all" ${this.filters.category === 'all' ? 'selected' : ''}>Tutte le Categorie</option>
              ${categories.map(c => `<option value="${c.name}" ${this.filters.category === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="apple-select-wrapper">
            <select id="mov-account-filter" class="apple-select">
              <option value="all" ${this.filters.account === 'all' ? 'selected' : ''}>Tutti i Conti</option>
              ${allAccountNames.map(acc => `<option value="${acc}" ${this.filters.account === acc ? 'selected' : ''}>${acc}</option>`).join('')}
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <div class="apple-select-wrapper">
            <select id="mov-sort-filter" class="apple-select">
              <option value="date-desc" ${this.filters.sortBy === 'date-desc' ? 'selected' : ''}>Data: Più recenti</option>
              <option value="date-asc" ${this.filters.sortBy === 'date-asc' ? 'selected' : ''}>Data: Meno recenti</option>
              <option value="amount-desc" ${this.filters.sortBy === 'amount-desc' ? 'selected' : ''}>Importo: Più alto</option>
              <option value="amount-asc" ${this.filters.sortBy === 'amount-asc' ? 'selected' : ''}>Importo: Più basso</option>
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>

          <span class="badge badge--neutral desk-only" style="margin-left: auto; font-variant-numeric: tabular-nums;">
            ${stats.count} movimenti
          </span>
        </div>

        <!-- Custom Date Range Bar (Conditional) -->
        ${this.filters.period === 'custom' ? `
          <div class="mov-custom-date-row" style="display: flex; align-items: center; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 12px; font-weight: 600;">Dal:</label>
              <input type="date" id="mov-custom-from" class="apple-input" style="padding: 4px 10px; font-size: 13px; height: 32px;" value="${this.filters.customFrom || ''}" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 12px; font-weight: 600;">Al:</label>
              <input type="date" id="mov-custom-to" class="apple-input" style="padding: 4px 10px; font-size: 13px; height: 32px;" value="${this.filters.customTo || ''}" />
            </div>
            <button class="apple-btn-secondary" id="btn-apply-custom-dates" style="height: 32px; padding: 0 12px; font-size: 12px;">
              Applica Filtro Date
            </button>
          </div>
        ` : ''}
      </section>

      <!-- Main Transactions Content: Grouped List or Data Table -->
      ${this.renderMainTransactionsContent(txs, monthGroups)}
    `;
  }

  renderMainTransactionsContent(txs, monthGroups) {
    if (txs.length === 0) {
      return `
        <div class="card mov-empty-state">
          <span class="empty-icon" style="color: var(--text-tertiary);">${getIcon('list', 36)}</span>
          <h3>Nessun movimento trovato</h3>
          <p>Nessuna transazione corrisponde ai filtri di ricerca selezionati.</p>
        </div>
      `;
    }

    if (this.viewMode === 'list') {
      return `
        <section class="mov-apple-grouped-container">
          ${monthGroups.map(group => this.renderAppleMonthGroup(group)).join('')}
        </section>
      `;
    }

    // Modalità Tabella Dati Compatta
    return `
      <section class="movimenti-table-wrapper">
        <div class="movimenti-table-header">
          <div class="mov-col mov-col-date">Data</div>
          <div class="mov-col mov-col-desc">Descrizione / Conto</div>
          <div class="mov-col mov-col-cat">Categoria</div>
          <div class="mov-col mov-col-amount">Importo</div>
          <div class="mov-col mov-col-actions"></div>
        </div>

        <div class="movimenti-table-body">
          ${txs.map(tx => this.renderTransactionRow(tx)).join('')}
        </div>
      </section>
    `;
  }

  renderAppleMonthGroup(group) {
    return `
      <div class="mov-month-group">
        <div class="mov-month-header">
          <div class="mov-month-title">
            ${getIcon('calendar', 14)}
            <span>${group.label}</span>
            <span class="badge badge--neutral" style="font-size: 11px; padding: 2px 7px;">${group.txCount} mov</span>
          </div>
          <div class="mov-month-totals">
            ${group.totalExpense > 0 ? `<span style="color: var(--text-secondary);">Uscite: <strong class="privacy-mask" style="color: var(--text-primary);">${this.formatCurrency(group.totalExpense)}</strong></span>` : ''}
            ${group.totalIncome > 0 ? `<span style="color: var(--apple-green);">Entrate: <strong class="privacy-mask" style="color: var(--apple-green);">+${this.formatCurrency(group.totalIncome)}</strong></span>` : ''}
          </div>
        </div>
        <div class="mov-apple-card">
          ${group.transactions.map(tx => this.renderAppleTransactionRow(tx)).join('')}
        </div>
      </div>
    `;
  }

  renderAppleTransactionRow(tx) {
    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    const sign = isIncome ? '+' : (isTransfer ? '' : '-');
    const amountClass = isIncome ? 'income' : (isTransfer ? 'transfer' : 'expense');
    const formattedDate = this.formatDateFull(tx.date);
    const catName = cleanCategoryName(tx.category || (isTransfer ? 'Giroconto' : 'Altro'));
    const avatarClass = this.getCategoryAvatarClass(tx.category, tx.type);
    const catIcon = getCategoryIcon(tx.category || (isTransfer ? 'giroconto' : 'altro'), 18);

    let destLabel = tx.toAccount || 'Destinazione';
    if (isTransfer && tx.toAccount) {
      if (tx.brokerDestinationType === 'asset' && (tx.targetHoldingTicker || tx.targetHoldingName)) {
        destLabel += ` (${tx.targetHoldingTicker || tx.targetHoldingName})`;
      } else if (tx.brokerDestinationType === 'cash') {
        destLabel += ' (Liquidità)';
      }
    }
    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${destLabel}`
      : (tx.account || 'Buddybank');

    return `
      <div class="tx-apple-row tx-interactive-row" data-id="${tx.id}" style="cursor: pointer;" title="Clicca per visualizzare dettagli e modificare">
        <div class="tx-avatar ${avatarClass}">
          ${catIcon}
        </div>

        <div class="tx-details">
          <span class="tx-title" title="${tx.description}">${tx.description || 'Movimento'}</span>
          <div class="tx-meta">
            <span class="tx-date">${formattedDate}</span>
            <span class="tx-dot">•</span>
            <span class="tx-account">${accountLabel}</span>
            <span class="tx-cat-badge">${catName}</span>
          </div>
        </div>

        <div class="tx-right">
          <span class="tx-amount ${amountClass} privacy-mask">
            ${sign}${this.formatCurrency(tx.amount)}
          </span>
          <button class="tx-del-btn" data-id="${tx.id}" data-row="${tx.rowNumber || ''}" title="Elimina movimento">
            ${getIcon('trash', 14)}
          </button>
        </div>
      </div>
    `;
  }

  renderTransactionRow(tx) {
    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    const sign = isIncome ? '+' : (isTransfer ? '' : '-');
    const colorClass = isIncome ? 'income-color' : (isTransfer ? 'transfer-color' : 'expense-color');
    const { day, monthYear } = this.formatDateParts(tx.date);
    const catName = cleanCategoryName(tx.category || (isTransfer ? 'Giroconto' : 'Altro'));
    const catIcon = getCategoryIcon(tx.category || (isTransfer ? 'giroconto' : 'altro'), 14);

    let destLabel = tx.toAccount || 'Destinazione';
    if (isTransfer && tx.toAccount) {
      if (tx.brokerDestinationType === 'asset' && (tx.targetHoldingTicker || tx.targetHoldingName)) {
        destLabel += ` (${tx.targetHoldingTicker || tx.targetHoldingName})`;
      } else if (tx.brokerDestinationType === 'cash') {
        destLabel += ' (Liquidità)';
      }
    }
    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${destLabel}`
      : (tx.account || 'Buddybank');

    return `
      <div class="mov-table-row tx-interactive-row" data-id="${tx.id}" style="cursor: pointer;" title="Clicca per visualizzare dettagli e modificare">
        <div class="mov-col mov-col-date">
          <span>${day}</span>
          <span class="date-sub">${monthYear}</span>
        </div>

        <div class="mov-col mov-col-desc">
          <span class="desc-main" title="${tx.description}">${tx.description || 'Movimento'}</span>
          <span class="desc-account">${accountLabel}</span>
        </div>

        <div class="mov-col mov-col-cat">
          <span class="cat-pill" title="${catName}">
            <span style="display: inline-flex; flex-shrink: 0; color: var(--apple-blue);">${catIcon}</span>
            <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${catName}</span>
          </span>
        </div>

        <div class="mov-col mov-col-amount">
          <span class="amount-val ${colorClass} privacy-mask">
            ${sign}${this.formatCurrency(tx.amount)}
          </span>
        </div>

        <div class="mov-col mov-col-actions">
          <button class="mov-delete-btn" data-id="${tx.id}" data-row="${tx.rowNumber || ''}" title="Elimina movimento">
            ${getIcon('trash', 14)}
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. VISTA ANALISI SINGOLA CATEGORIA (Deep Dive)
  // =========================================================================
  renderAnalisiView(categories) {
    const expenseCategories = categories.filter(c => c.type === 'expense');
    if ((!this.analysisCat || !expenseCategories.some(c => c.name === this.analysisCat)) && expenseCategories.length > 0) {
      this.analysisCat = expenseCategories[0].name;
    }

    const data = financeStore.getCategoryAnalytics(this.analysisCat, 12);

    return `
      <div class="mov-subview-stack">
        
        <!-- Category Selector Bar -->
        <div class="mov-selector-card">
          <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; flex: 1 1 auto; min-width: 0;">
            <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600; white-space: nowrap;">Seleziona Categoria:</label>
            <div class="apple-select-wrapper" style="min-width: 220px; max-width: 100%;">
              <select id="single-cat-picker" class="apple-select" style="width: 100% !important; padding-right: 34px !important;">
                ${expenseCategories.map(c => `<option value="${c.name}" ${this.analysisCat === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <span class="badge badge--neutral">Trend Ultimi 12 Mesi</span>
        </div>

        <!-- Monolithic Hero Card: Analisi Categoria (Workout Style) -->
        <section class="card hero-patrimonio-card">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">Totale Speso • ${cleanCategoryName(this.analysisCat)}</span>
                <span class="badge badge--negative hero-badge-tag">${data.txCount} tx</span>
              </div>
              <div class="card__value privacy-mask hero-networth-val" style="color: #FF453A;">
                ${this.formatCurrency(data.totalAmount)}
              </div>
            </div>
            <div class="hero-trend-wrap">
              <span class="trend-badge positive">
                ${data.impactPercent}% totale
              </span>
            </div>
          </div>

          <div class="alloc-bar-track">
            <div class="alloc-segment" style="width: ${Math.max(8, Math.min(100, data.impactPercent))}%; background: #FF453A;"></div>
            <div class="alloc-segment" style="width: ${Math.max(8, 100 - Math.min(100, data.impactPercent))}%; background: #0A84FF;"></div>
          </div>

          <div class="alloc-legend">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #0A84FF;"></span>
                <span class="legend-name">Media/Mese</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #0A84FF;">
                ${this.formatCurrency(data.avgMonthly)}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #FF9F0A;"></span>
                <span class="legend-name">Picco Max</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: #FF9F0A;">
                ${data.maxTx ? this.formatCurrency(data.maxTx.amount) : '€ 0,00'}
              </span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: #AF52DE;"></span>
                <span class="legend-name">Incidenza</span>
              </div>
              <span class="legend-amount" style="color: #AF52DE;">
                ${data.impactPercent}% uscite
              </span>
            </div>
          </div>
        </section>

        <!-- Chart Card: Monthly Spending Trend (4 Canonical Zones) -->
        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Trend Mensile: ${cleanCategoryName(this.analysisCat)}">Trend Mensile: ${cleanCategoryName(this.analysisCat)}</span>
            <span class="badge badge--info">12 Mesi</span>
          </div>
          <div class="card__value privacy-mask" style="font-size: 20px;">
            ${this.formatCurrency(data.totalAmount)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">negli ultimi 12 mesi</small>
          </div>
          <div class="card__body" style="padding: var(--space-2) 0;">
            <div style="position: relative; width: 100%; height: 260px;">
              <canvas id="catTrendCanvas"></canvas>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Evoluzione delle uscite per questa categoria mese su mese</span>
          </div>
        </div>

        <!-- Filtered Table for this category -->
        <section class="card movimenti-table-wrapper" style="padding: 0; overflow: hidden;">
          <div style="padding: var(--space-4) var(--space-5) var(--space-2);">
            <h4 style="font-size: var(--text-base); font-weight: 700; color: var(--text-primary); margin: 0;">Ultime Spese Registrate in "${cleanCategoryName(this.analysisCat)}"</h4>
          </div>
          <div class="movimenti-table-header">
            <div class="mov-col mov-col-date">Data</div>
            <div class="mov-col mov-col-desc">Descrizione / Conto</div>
            <div class="mov-col mov-col-cat">Categoria</div>
            <div class="mov-col mov-col-amount">Importo</div>
            <div class="mov-col mov-col-actions"></div>
          </div>
          <div class="movimenti-table-body">
            ${data.transactions.length === 0 ? `
              <div class="mov-empty-state">
                <span class="empty-icon" style="color: var(--text-tertiary);">${getIcon('list', 36)}</span>
                <p>Nessun movimento trovato per la categoria ${cleanCategoryName(this.analysisCat)}</p>
              </div>
            ` : data.transactions.map(tx => this.renderTransactionRow(tx)).join('')}
          </div>
        </section>

      </div>
    `;
  }

  bindAnalisiEvents(container) {
    const picker = document.getElementById('single-cat-picker');
    if (picker) {
      picker.addEventListener('change', (e) => {
        this.analysisCat = e.target.value;
        this.render(container);
      });
    }

    container.querySelectorAll('.mov-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const row = e.currentTarget.dataset.row;
        this.handleDelete(id, row, container);
      });
    });
  }

  initAnalysisChart() {
    const canvas = document.getElementById('catTrendCanvas');
    if (!canvas || !window.Chart) return;

    const data = financeStore.getCategoryAnalytics(this.analysisCat, 12);
    const labels = data.monthlySeries.map(s => s.ym);
    const values = data.monthlySeries.map(s => s.val);

    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDark ? '#98989D' : '#86868B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(10, 132, 255, 0.28)');
    gradient.addColorStop(1, 'rgba(10, 132, 255, 0.0)');

    this.analysisChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length > 0 ? labels : ['Nessun dato'],
        datasets: [{
          label: cleanCategoryName(this.analysisCat),
          data: values.length > 0 ? values : [0],
          borderColor: '#0A84FF',
          backgroundColor: gradient,
          borderWidth: 2.8,
          fill: true,
          tension: 0.42,
          cubicInterpolationMode: 'monotone',
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHitRadius: 14,
          pointBackgroundColor: '#0A84FF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `Spesa: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textColor,
              font: { size: 11, weight: '500' }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => '€' + v
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  // =========================================================================
  // 3. VISTA CONFRONTO CATEGORIE (Head-to-Head)
  // =========================================================================
  renderConfrontoView(categories) {
    const expenseCategories = categories.filter(c => c.type === 'expense');
    if ((!this.compareCatA || !expenseCategories.some(c => c.name === this.compareCatA)) && expenseCategories.length > 0) {
      this.compareCatA = expenseCategories[0].name;
    }
    if ((!this.compareCatB || !expenseCategories.some(c => c.name === this.compareCatB)) && expenseCategories.length > 1) {
      this.compareCatB = expenseCategories[1].name;
    }

    const comp = financeStore.compareCategories(this.compareCatA, this.compareCatB, 8);

    return `
      <div class="mov-subview-stack">

        <!-- Selector Row -->
        <div class="mov-compare-selector-card">
          <div class="mov-compare-selector-grid">
            <div class="cat-selector-group" style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600;">Categoria A:</label>
              <div class="apple-select-wrapper">
                <select id="compare-cat-a-picker" class="apple-select">
                  ${expenseCategories.map(c => `<option value="${c.name}" ${this.compareCatA === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <span class="mov-compare-vs-badge">VS</span>

            <div class="cat-selector-group" style="display: flex; align-items: center; gap: 8px;">
              <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600;">Categoria B:</label>
              <div class="apple-select-wrapper">
                <select id="compare-cat-b-picker" class="apple-select">
                  ${expenseCategories.map(c => `<option value="${c.name}" ${this.compareCatB === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>
          <span class="badge badge--neutral">Trend 8 Mesi</span>
        </div>

        <!-- Head-to-Head Cards (Uniform 4-Zone Canonical Structure) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));">
          <div class="card ${comp.higher === this.compareCatA ? 'highlight-card' : ''}">
            <div class="card__header">
              <span class="card__title" title="${cleanCategoryName(this.compareCatA)}">${cleanCategoryName(this.compareCatA)}</span>
              <span class="badge ${comp.higher === this.compareCatA ? 'badge--negative' : 'badge--neutral'}">
                ${comp.higher === this.compareCatA ? 'Spesa Maggiore' : 'Spesa Minore'}
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(comp.catA.totalAmount)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Media mensile</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(comp.catA.avgMonthly)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Incidenza budget</span>
                <span class="kv__value">${comp.catA.impactPercent}%</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Cumulato 8 mensilità</span>
            </div>
          </div>

          <div class="card ${comp.higher === this.compareCatB ? 'highlight-card' : ''}">
            <div class="card__header">
              <span class="card__title" title="${cleanCategoryName(this.compareCatB)}">${cleanCategoryName(this.compareCatB)}</span>
              <span class="badge ${comp.higher === this.compareCatB ? 'badge--negative' : 'badge--neutral'}">
                ${comp.higher === this.compareCatB ? 'Spesa Maggiore' : 'Spesa Minore'}
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(comp.catB.totalAmount)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Media mensile</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(comp.catB.avgMonthly)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Incidenza budget</span>
                <span class="kv__value">${comp.catB.impactPercent}%</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Cumulato 8 mensilità</span>
            </div>
          </div>
        </section>

        <!-- Insight Card -->
        <div class="card" style="background: rgba(0, 113, 227, 0.05); border-color: rgba(0, 113, 227, 0.2);">
          <div class="card__header">
            <span class="card__title" title="Esito Analisi Comparativa" style="display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-blue); display: inline-flex;">${getIcon('sparkle', 16)}</span>
              <span>Verdetto Comparativo</span>
            </span>
            <span class="badge badge--info">+${comp.percentDiff}% Differenza</span>
          </div>
          <div class="card__body">
            <p style="font-size: var(--text-base); color: var(--text-primary); line-height: var(--leading-normal); margin: 0;">
              Nel periodo considerato, <strong>${cleanCategoryName(comp.higher)}</strong> supera l'altra categoria di una differenza netta di <strong class="privacy-mask">${this.formatCurrency(Math.abs(comp.deltaTotal))}</strong> (+${comp.percentDiff}%).
            </p>
          </div>
          <div class="card__footer">
            <span class="trend-context">Monitoraggio automatico scostamenti</span>
          </div>
        </div>

        <!-- Comparison Chart (4 Canonical Zones) -->
        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Confronto Mensile a Barre">Confronto Mensile a Barre</span>
            <span class="badge badge--info">Affiancato</span>
          </div>
          <div class="card__value" style="font-size: 20px;">
            ${cleanCategoryName(this.compareCatA)} <span style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">vs</span> ${cleanCategoryName(this.compareCatB)}
          </div>
          <div class="card__body" style="padding: var(--space-2) 0;">
            <div style="position: relative; width: 100%; height: 280px;">
              <canvas id="catCompareCanvas"></canvas>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Spesa affiancata per mese</span>
          </div>
        </div>

      </div>
    `;
  }

  bindConfrontoEvents(container) {
    const pickerA = document.getElementById('compare-cat-a-picker');
    const pickerB = document.getElementById('compare-cat-b-picker');

    if (pickerA) {
      pickerA.addEventListener('change', (e) => {
        this.compareCatA = e.target.value;
        this.render(container);
      });
    }
    if (pickerB) {
      pickerB.addEventListener('change', (e) => {
        this.compareCatB = e.target.value;
        this.render(container);
      });
    }
  }

  initCompareChart() {
    const canvas = document.getElementById('catCompareCanvas');
    if (!canvas || !window.Chart) return;

    const comp = financeStore.compareCategories(this.compareCatA, this.compareCatB, 8);
    const labels = comp.mergedSeries.map(s => s.ym);
    const valuesA = comp.mergedSeries.map(s => s.valA);
    const valuesB = comp.mergedSeries.map(s => s.valB);

    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const textColor = isDark ? '#98989D' : '#86868B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

    const ctx = canvas.getContext('2d');
    this.compareChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['Nessun dato'],
        datasets: [
          {
            label: cleanCategoryName(this.compareCatA),
            data: valuesA,
            backgroundColor: '#0071E3',
            borderRadius: 6
          },
          {
            label: cleanCategoryName(this.compareCatB),
            data: valuesB,
            backgroundColor: '#AF52DE',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              boxWidth: 12,
              font: { weight: '600', size: 12 },
              color: isDark ? '#F5F5F7' : '#1D1D1F'
            }
          },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${this.formatCurrency(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: textColor,
              font: { size: 11, weight: '500' }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => '€' + v
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  // =========================================================================
  // 4. VISTA BUDGET PREVENTIVO 50/30/20 & BUSTE DI SPESA
  // =========================================================================
  renderBudgetView() {
    const b = financeStore.getBudget50_30_20();

    const getSpendForCat = (canonicalName) => {
      let total = 0;
      Object.entries(b.catSpendMap || {}).forEach(([rawKey, val]) => {
        if (cleanCategoryName(rawKey).toLowerCase().includes(canonicalName.toLowerCase())) {
          total += val;
        }
      });
      return total;
    };

    const needsDefs = ['Alimentari', 'Casa', 'Auto', 'Trasporti', 'Utenze', 'Salute', 'Istruzione'];
    const needsCats = needsDefs.map(name => ({
      name,
      spent: getSpendForCat(name),
      icon: getCategoryIcon(name, 14)
    })).filter(c => c.spent > 0);

    const wantsDefs = ['Ristoranti', 'Shopping', 'Tecnologia', 'Fitness', 'Beauty', 'Viaggi', 'Svago', 'Altro'];
    const wantsCats = wantsDefs.map(name => ({
      name: name === 'Ristoranti' ? 'Ristoranti & Bar' : name,
      spent: getSpendForCat(name),
      icon: getCategoryIcon(name, 14)
    })).filter(c => c.spent > 0);

    return `
      <div class="mov-subview-stack">
        
        <!-- KPI Strip Budget (4-Zone Canonical Structure) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Entrate Nette del Mese">Entrate del Mese</span>
              <div class="kpi-icon-badge income">${getIcon('income', 16)}</div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-green);">${this.formatCurrency(b.monthlyIncome)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Base 50/30/20</span>
                <span class="kv__value">100% Entrate</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Base di calcolo della regola</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Budget Residuo Spese">Budget Residuo</span>
              <span class="badge ${b.totalRemaining > 0 ? 'badge--info' : 'badge--negative'}">
                ${b.totalRemaining > 0 ? 'Disponibile' : 'Esaurito'}
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: ${b.totalRemaining > 0 ? 'var(--apple-blue)' : 'var(--apple-red)'};">
              ${this.formatCurrency(b.totalRemaining)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Tetto complessivo</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(b.needs.target + b.wants.target)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Bisogni primari + Svago</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Spesa Sicura Giornaliera Stimata">Spesa Sicura Giornaliera</span>
              <span class="badge ${b.dailySafeSpend > 15 ? 'badge--positive' : 'badge--warning'}">
                ${b.daysRemaining} gg rimanenti
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: ${b.dailySafeSpend > 15 ? 'var(--apple-green)' : 'var(--apple-orange)'};">
              ${this.formatCurrency(b.dailySafeSpend)}<small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/giorno</small>
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Giorni al mese succ.</span>
                <span class="kv__value">${b.daysRemaining} giorni</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Per non sforare il target</span>
            </div>
          </div>
        </section>

        <!-- 3 Buste di Spesa 50/30/20 (4-Zone Canonical Structure) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));">
          
          <!-- Busta 1: Bisogni Primari (50%) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Bisogni Primari: Alloggio, Spesa, Mobilità">Bisogni Primari (50%)</span>
              <span class="badge ${b.needs.pct <= 100 ? 'badge--info' : 'badge--negative'}">
                ${b.needs.pct}% Utilizzato
              </span>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(b.needs.spent)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ ${this.formatCurrency(b.needs.target)}</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Avanzamento tetto 50%</span>
                  <span class="meter__val">${b.needs.pct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, b.needs.pct)}%; background: #0071E3;"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Ripartizione Spese:</span>
                ${needsCats.length > 0 ? needsCats.map(c => `
                  <div class="kv">
                    <span class="kv__label" style="display: inline-flex; align-items: center; gap: 6px;">
                      <span style="color: var(--apple-blue); display: inline-flex;">${c.icon}</span>
                      <span>${c.name}</span>
                    </span>
                    <span class="kv__value privacy-mask">${this.formatCurrency(c.spent)}</span>
                  </div>
                `).join('') : '<span style="font-size: 12px; color: var(--text-secondary);">Nessuna spesa registrata</span>'}
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">
                ${b.needs.remaining >= 0 ? `Residuo: ${this.formatCurrency(b.needs.remaining)}` : `Sforamento: -${this.formatCurrency(Math.abs(b.needs.remaining))}`}
              </span>
            </div>
          </div>

          <!-- Busta 2: Svago & Stile di Vita (30%) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Svago & Stile di Vita: Uscite, Shopping, Hobby">Svago & Stile di Vita (30%)</span>
              <span class="badge ${b.wants.pct <= 100 ? 'badge--warning' : 'badge--negative'}">
                ${b.wants.pct}% Utilizzato
              </span>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(b.wants.spent)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ ${this.formatCurrency(b.wants.target)}</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Avanzamento tetto 30%</span>
                  <span class="meter__val">${b.wants.pct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, b.wants.pct)}%; background: #FF9500;"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Ripartizione Spese:</span>
                ${wantsCats.length > 0 ? wantsCats.map(c => `
                  <div class="kv">
                    <span class="kv__label" style="display: inline-flex; align-items: center; gap: 6px;">
                      <span style="color: var(--apple-orange); display: inline-flex;">${c.icon}</span>
                      <span>${c.name}</span>
                    </span>
                    <span class="kv__value privacy-mask">${this.formatCurrency(c.spent)}</span>
                  </div>
                `).join('') : '<span style="font-size: 12px; color: var(--text-secondary);">Nessuna spesa registrata</span>'}
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">
                ${b.wants.remaining >= 0 ? `Residuo: ${this.formatCurrency(b.wants.remaining)}` : `Sforamento: -${this.formatCurrency(Math.abs(b.wants.remaining))}`}
              </span>
            </div>
          </div>

          <!-- Busta 3: Risparmio & Investimenti (20%) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Risparmio & Investimenti: PAC, XEON, Pensione">Risparmio & Futuro (20%)</span>
              <span class="badge badge--positive">
                ${b.savings.pct}% Raggiunto
              </span>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(b.savings.actual)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/ ${this.formatCurrency(b.savings.target)}</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Target accantonamento</span>
                  <span class="meter__val">${b.savings.pct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, b.savings.pct)}%; background: var(--apple-green);"></div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-3);">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Destinazione Risparmio:</span>
                <div class="kv">
                  <span class="kv__label">ETF VWCE + Pensione</span>
                  <span class="kv__value positive">In Accumulo</span>
                </div>
                <div class="kv">
                  <span class="kv__label">Liquidità Remunerata</span>
                  <span class="kv__value">XEON Overnight</span>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">
                ${b.savings.actual >= b.savings.target ? 'Target 20% pienamente centrato' : `Mancano ${this.formatCurrency(b.savings.target - b.savings.actual)} al target`}
              </span>
            </div>
          </div>

        </section>

      </div>
    `;
  }

  // =========================================================================
  // 5. MODALE NUOVO MOVIMENTO CON AUTO-AGGIUNTA E SMART RULES
  // =========================================================================
  renderModal(categories, accounts, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const voucherAcc = accounts.find(a => a.id === 'buoni_pasto' || (a.name || '').toLowerCase().includes('buoni pasto'));
    const voucherBalance = voucherAcc ? (parseFloat(voucherAcc.balance) || 0) : 0;

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
              <!-- Smart Suggestion Pill -->
              <div id="smart-prediction-container" style="display: none; margin-top: var(--space-text-title);">
                <span class="category-suggestion-pill" id="smart-prediction-pill">
                  <span id="smart-prediction-text"></span>
                </span>
              </div>
            </div>

            <div class="form-group" style="width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box; overflow: hidden;">
              <label class="form-label" for="form-date">Data</label>
              <input type="date" id="form-date" class="apple-input" style="width: 100% !important; max-width: 100% !important; min-width: 0 !important; box-sizing: border-box !important;" required />
            </div>

            <div class="form-group" id="form-group-category">
              <label class="form-label" for="form-category">Categoria</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-category" class="apple-select apple-input" required>
                  <option value="" disabled selected>Seleziona una categoria</option>
                  ${categories.map(c => `<option value="${c.name}">${cleanCategoryName(c.name)}</option>`).join('')}
                  <option value="__custom__">+ Crea nuova categoria...</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>

              <!-- Input Categoria Personalizzata al volo -->
              <div id="custom-cat-input-group" style="display: none; margin-top: var(--space-box-gap-xs);">
                <input type="text" id="form-custom-category-name" class="apple-input" placeholder="Nome nuova categoria (es. Sport & Tempo Libero)" />
                <div id="category-similar-hint" style="display: none; margin-top: var(--space-text-title);"></div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="form-account" id="form-account-label">Conto di Addebito</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-account" class="apple-select apple-input" required>
                  ${accounts.map(a => `<option value="${a.name}">${a.name} ${financeStore.isPrivacyMode() ? '' : `(${this.formatCurrency(a.balance)})`}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group" id="form-group-to-account" style="display: none;">
              <label class="form-label" for="form-to-account" id="form-to-account-label">Conto di Accredito (Destinazione)</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="form-to-account" class="apple-select apple-input">
                  ${accounts.map(a => `<option value="${a.name}">${a.name} ${financeStore.isPrivacyMode() ? '' : `(${this.formatCurrency(a.balance)})`}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <!-- Apple Broker Allocation: Liquidità (Cash) vs Asset già attivi -->
            <div class="form-group" id="form-group-broker-allocation" style="display: none; margin-top: var(--space-box-gap-xs);">
              <div style="padding: 13px 15px; background: rgba(0, 113, 227, 0.05); border: 1px solid rgba(0, 113, 227, 0.20); border-radius: 14px; display: flex; flex-direction: column; gap: 11px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 15px;">📈</span>
                    <strong style="font-size: 13px; color: var(--text-primary);">Destinazione su <span id="broker-alloc-name">Trade Republic</span></strong>
                  </div>
                  <span class="badge badge--info" style="font-size: 10px;">Opzione Broker</span>
                </div>

                <!-- Segmented Control: Liquidità vs Asset -->
                <div class="segmented-control" id="broker-alloc-type-toggle" style="display: flex; width: 100%; background: var(--bg-card); padding: 3px; border-radius: 10px; border: 1px solid var(--border-subtle);">
                  <button type="button" class="segment-btn active" data-alloctype="cash" style="flex: 1; font-size: 12px; padding: 6px 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <span>💵</span> Liquidità (Cash)
                  </button>
                  <button type="button" class="segment-btn" data-alloctype="asset" style="flex: 1; font-size: 12px; padding: 6px 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <span>📊</span> Asset già attivo
                  </button>
                </div>

                <!-- Sotto-selettore Asset già attivo -->
                <div id="broker-asset-selector-group" style="display: none; flex-direction: column; gap: 6px;">
                  <label class="form-label" for="form-broker-target-asset" style="font-size: 11.5px; margin: 0; color: var(--text-secondary);">Strumento / ETF attivo:</label>
                  <div class="apple-select-wrapper form-select-wrapper">
                    <select id="form-broker-target-asset" class="apple-select apple-input" style="font-size: 13px;">
                    </select>
                    <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                  <span id="broker-asset-hint" style="font-size: 11px; color: var(--apple-blue); margin-top: 2px;"></span>
                </div>

                <!-- Info Box Liquidità Cash del Broker -->
                <div id="broker-cash-info-group" style="font-size: 11.5px; color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-subtle);">
                  <span>Liquidità non investita (Cash):</span>
                  <strong id="broker-current-cash-badge" style="color: var(--apple-green); font-variant-numeric: tabular-nums;">0,00 €</strong>
                </div>
              </div>
            </div>

            <!-- Apple Live Transfer Preview Card -->
            <div id="form-transfer-preview-card" style="display: none; margin-top: var(--space-box-gap-xs); padding: 12px 14px; border-radius: 14px; background: rgba(0, 113, 227, 0.06); border: 1px solid rgba(0, 113, 227, 0.16); transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--apple-blue); display: flex; align-items: center; gap: 6px;">
                  ${getIcon('giroconto', 14)} Impatto Saldi in Tempo Reale
                </span>
                <span id="transfer-preview-status-badge" class="badge badge--info" style="font-size: 10px;">Giroconto</span>
              </div>
              <div id="transfer-preview-content" style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;"></div>
            </div>

            <!-- Apple Pagamento Misto Spesa Alimentare (Buoni Pasto + Carta) -->
            <div class="form-group" id="form-group-split-bp" style="display: block; margin-top: var(--space-box-gap-xs);">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: rgba(255, 149, 0, 0.08); border: 1px solid rgba(255, 149, 0, 0.22); border-radius: 14px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                  <span style="font-size: 20px; flex-shrink: 0;">🛍️</span>
                  <div style="min-width: 0;">
                    <strong style="font-size: 13.5px; color: var(--text-primary); display: block;">Pagamento Misto Buoni Pasto</strong>
                    <span style="font-size: 11.5px; color: var(--text-secondary); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Quota Buoni Pasto (${this.formatCurrency(voucherBalance)} disp.) + residuo Buddybank</span>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva pagamento con Buoni Pasto + Carta" style="flex-shrink: 0; margin-left: 8px;">
                  <input type="checkbox" id="form-toggle-split-bp" />
                  <span class="switch-slider"></span>
                </label>
              </div>

              <!-- Sezione Calcolatore Buoni Pasto (visibile quando toggle è attivo) -->
              <div id="split-bp-calculator-box" style="display: none; padding: 14px 16px; background: var(--bg-card-subtle); border-radius: 14px; border: 1px solid var(--border-subtle); margin-bottom: 12px;">
                <div style="margin-bottom: 10px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label class="form-label" style="margin: 0; font-size: 12px; font-weight: 600;">Quota Buoni Pasto (€)</label>
                    <span style="font-size: 11px; color: var(--apple-orange); font-weight: 600;" id="bp-available-badge">Disponibili: ${this.formatCurrency(voucherBalance)}</span>
                  </div>
                  <input type="number" id="form-split-voucher-amount" class="apple-input" placeholder="0,00" step="0.01" min="0" />
                </div>

                <!-- Quick Buttons Buoni (8€ ciascuno) -->
                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="1" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+1 Buono (8€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="2" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+2 (16€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="3" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+3 (24€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp" data-vouchercount="4" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px;">+4 (32€)</button>
                  <button type="button" class="apple-btn-secondary btn-quick-bp-reset" id="btn-split-bp-reset" style="padding: 5px 10px; font-size: 11.5px; border-radius: 9999px; color: var(--apple-red);">Azzera</button>
                </div>

                <!-- Live Split Breakdown -->
                <div id="split-live-breakdown" style="padding: 10px 12px; background: rgba(0, 113, 227, 0.06); border-radius: 10px; border: 1px solid rgba(0, 113, 227, 0.15); font-size: 12px; display: flex; flex-direction: column; gap: 5px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">🏷️ Quota Buoni Pasto:</span>
                    <strong style="color: var(--apple-orange); font-variant-numeric: tabular-nums;" id="split-preview-voucher">0,00 €</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--text-secondary);">💳 Residuo Addebito (<span id="split-card-name">Buddybank</span>):</span>
                    <strong style="color: var(--apple-blue); font-variant-numeric: tabular-nums;" id="split-preview-card">0,00 €</strong>
                  </div>
                </div>
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

    const sheet = document.getElementById('modal-sheet');
    const handle = sheet ? sheet.querySelector('.modal-handle') : null;
    if (handle) {
      handle.addEventListener('click', () => this.closeModal());
    }

    // Gestione swipe verso il basso per chiudere il foglio modale (Apple Sheet Dismiss)
    // Previene il pull-to-refresh nativo di Safari con preventDefault su movimento verso il basso
    const dragTargets = [handle, sheet?.querySelector('.modal-header')].filter(Boolean);
    let touchStartY = 0;
    let touchCurrentY = 0;
    let isDraggingSheet = false;

    dragTargets.forEach(el => {
      el.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchCurrentY = touchStartY;
        isDraggingSheet = true;
        if (sheet) sheet.style.transition = 'none';
      }, { passive: true });

      el.addEventListener('touchmove', (e) => {
        if (!isDraggingSheet || !sheet) return;
        touchCurrentY = e.touches[0].clientY;
        const diffY = touchCurrentY - touchStartY;
        if (diffY > 0) {
          // Movimento verso il basso: blocca il pull-to-refresh nativo di Safari
          if (e.cancelable) e.preventDefault();
          sheet.style.transform = `translateY(${diffY}px)`;
        }
      }, { passive: false });

      el.addEventListener('touchend', () => {
        if (!isDraggingSheet || !sheet) return;
        isDraggingSheet = false;
        const diffY = touchCurrentY - touchStartY;
        sheet.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        if (diffY > 65) {
          sheet.style.transform = 'translateY(100%)';
          setTimeout(() => {
            this.closeModal();
            sheet.style.transform = '';
          }, 220);
        } else {
          sheet.style.transform = '';
        }
      }, { passive: true });
    });

    const saveBtn = document.getElementById('modal-save');
    if (saveBtn) saveBtn.addEventListener('click', (e) => { e.preventDefault(); this.handleSave(container); });

    const typeToggle = document.getElementById('form-type-toggle');
    const toAccGroup = document.getElementById('form-group-to-account');
    const catGroup = document.getElementById('form-group-category');
    const accLabel = document.getElementById('form-account-label');
    const formAccount = document.getElementById('form-account');
    const formToAccount = document.getElementById('form-to-account');
    const formAmount = document.getElementById('form-amount');

    const updateTransferPreview = () => {
      const activeBtn = typeToggle?.querySelector('.segment-btn.active');
      const isTransfer = activeBtn?.dataset.type === 'transfer';
      const previewCard = document.getElementById('form-transfer-preview-card');
      const previewContent = document.getElementById('transfer-preview-content');
      const previewBadge = document.getElementById('transfer-preview-status-badge');

      if (!isTransfer || !previewCard || !previewContent) {
        if (previewCard) previewCard.style.display = 'none';
        return;
      }

      previewCard.style.display = 'block';
      const fromName = formAccount?.value || '';
      const toName = formToAccount?.value || '';
      const amt = parseFloat(formAmount?.value || 0);

      const fromAcc = financeStore.findAccount(fromName);
      const toAcc = financeStore.findAccount(toName);

      const brokerAllocGroup = document.getElementById('form-group-broker-allocation');
      const brokerAllocName = document.getElementById('broker-alloc-name');
      const brokerCashBadge = document.getElementById('broker-current-cash-badge');
      const brokerCashInfo = document.getElementById('broker-cash-info-group');
      const brokerAssetGroup = document.getElementById('broker-asset-selector-group');
      const brokerTargetAsset = document.getElementById('form-broker-target-asset');
      const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
      const activeAllocBtn = brokerAllocToggle?.querySelector('.segment-btn.active');
      const allocType = activeAllocBtn?.dataset.alloctype || 'cash';

      const isBroker = toAcc && (toAcc.isBroker || toAcc.isInvestment || (Array.isArray(toAcc.holdings) && toAcc.holdings.length > 0));

      if (isTransfer && isBroker && brokerAllocGroup) {
        brokerAllocGroup.style.display = 'block';
        if (brokerAllocName) brokerAllocName.textContent = toAcc.name;
        if (brokerCashBadge) brokerCashBadge.textContent = this.formatCurrency(toAcc.cashBalance || 0);

        if (allocType === 'asset') {
          if (brokerAssetGroup) brokerAssetGroup.style.display = 'flex';
          if (brokerCashInfo) brokerCashInfo.style.display = 'none';
        } else {
          if (brokerAssetGroup) brokerAssetGroup.style.display = 'none';
          if (brokerCashInfo) brokerCashInfo.style.display = 'flex';
        }
      } else if (brokerAllocGroup) {
        brokerAllocGroup.style.display = 'none';
      }

      if (!fromAcc || !toAcc || fromAcc.name === toAcc.name) {
        if (previewBadge) {
          previewBadge.className = 'badge badge--negative';
          previewBadge.textContent = 'Errore';
        }
        previewCard.style.background = 'rgba(255, 59, 48, 0.08)';
        previewCard.style.borderColor = 'rgba(255, 59, 48, 0.28)';
        previewContent.innerHTML = `
          <div style="color: var(--apple-red); font-weight: 600; font-size: 11.5px; display: flex; align-items: center; gap: 6px; padding: 2px 0;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Il conto di partenza e di arrivo non possono coincidere. Seleziona due conti distinti.</span>
          </div>
        `;
        return;
      }

      previewCard.style.background = 'rgba(0, 113, 227, 0.06)';
      previewCard.style.borderColor = 'rgba(0, 113, 227, 0.16)';
      if (previewBadge) {
        previewBadge.className = 'badge badge--info';
        previewBadge.textContent = amt > 0 ? 'Valido' : 'Inserisci Importo';
      }

      const fromOld = parseFloat(fromAcc.balance) || 0;
      const fromNew = Math.round((fromOld - amt) * 100) / 100;
      const toOld = parseFloat(toAcc.balance) || 0;
      const toNew = Math.round((toOld + amt) * 100) / 100;

      let destRowHtml = '';
      if (isBroker && allocType === 'asset') {
        const selOpt = brokerTargetAsset?.selectedOptions?.[0];
        const hId = selOpt?.value;
        const h = (toAcc.holdings || []).find(x => x.id === hId) || toAcc.holdings?.[0];
        const hOld = h ? (parseFloat(h.currentValue) || 0) : 0;
        const hNew = Math.round((hOld + amt) * 100) / 100;
        const hLabel = h ? (h.ticker || h.name) : 'Asset';

        destRowHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
            <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong> ➔ <span style="color: var(--apple-blue); font-weight: 600;">Asset ${hLabel}</span>
            </span>
            <span style="font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(hOld)} ➔ <strong style="color: var(--apple-blue);">${this.formatCurrency(hNew)}</strong>
            </span>
          </div>
          <div style="font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between; padding: 2px 0 0 16px;">
            <span>Totale complessivo ${toAcc.name}:</span>
            <span>${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong></span>
          </div>
        `;
      } else if (isBroker && allocType === 'cash') {
        const cashOld = parseFloat(toAcc.cashBalance) || 0;
        const cashNew = Math.round((cashOld + amt) * 100) / 100;

        destRowHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
            <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong> ➔ <span style="color: var(--apple-green); font-weight: 600;">Liquidità (Cash)</span>
            </span>
            <span style="font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(cashOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(cashNew)}</strong>
            </span>
          </div>
          <div style="font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between; padding: 2px 0 0 16px;">
            <span>Totale complessivo ${toAcc.name}:</span>
            <span>${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong></span>
          </div>
        `;
      } else {
        destRowHtml = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
            <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
              <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong>
            </span>
            <span style="font-variant-numeric: tabular-nums;">
              ${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong>
            </span>
          </div>
        `;
      }

      previewContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0;">
          <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
            <span style="color: var(--apple-red); font-weight: 600;">📤 Origine:</span> <strong>${fromAcc.name}</strong>
          </span>
          <span style="font-variant-numeric: tabular-nums;">
            ${this.formatCurrency(fromOld)} ➔ <strong style="color: var(--apple-red);">${this.formatCurrency(fromNew)}</strong>
          </span>
        </div>
        ${destRowHtml}
        <div style="margin-top: 3px; padding-top: 3px; border-top: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between;">
          <span>Variazione Net Worth complessivo:</span>
          <strong style="color: var(--text-secondary);">± 0,00 € (Trasferimento interno)</strong>
        </div>
      `;
    };

    const populateBrokerAssets = (toAcc, preferredHoldingId) => {
      const brokerTargetAsset = document.getElementById('form-broker-target-asset');
      const brokerAssetHint = document.getElementById('broker-asset-hint');
      if (!brokerTargetAsset || !toAcc) return;

      const holdings = Array.isArray(toAcc.holdings) ? toAcc.holdings : [];
      if (holdings.length === 0) {
        brokerTargetAsset.innerHTML = '<option value="">Nessun asset attivo (allocazione automatica su Liquidità Cash)</option>';
        if (brokerAssetHint) brokerAssetHint.textContent = '';
        return;
      }

      brokerTargetAsset.innerHTML = holdings.map(h => `
        <option value="${h.id}" data-ticker="${h.ticker || ''}" data-name="${h.name || ''}" data-value="${h.currentValue || 0}" ${preferredHoldingId && (preferredHoldingId === h.id || preferredHoldingId === h.ticker) ? 'selected' : ''}>
          ${h.ticker ? `${h.ticker} — ` : ''}${h.name || 'Strumento'} (${this.formatCurrency(h.currentValue || 0)})
        </option>
      `).join('');

      const selOpt = brokerTargetAsset.selectedOptions?.[0];
      const selVal = parseFloat(selOpt?.dataset.value || 0);
      if (brokerAssetHint) {
        brokerAssetHint.textContent = `Valore attuale strumento: ${this.formatCurrency(selVal)}`;
      }
    };

    this._populateBrokerAssets = populateBrokerAssets;
    this._updateTransferPreview = updateTransferPreview;

    const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
    if (brokerAllocToggle) {
      brokerAllocToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          brokerAllocToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          updateTransferPreview();
        });
      });
    }

    const brokerTargetAsset = document.getElementById('form-broker-target-asset');
    if (brokerTargetAsset) {
      brokerTargetAsset.addEventListener('change', () => {
        const selOpt = brokerTargetAsset.selectedOptions?.[0];
        const selVal = parseFloat(selOpt?.dataset.value || 0);
        const brokerAssetHint = document.getElementById('broker-asset-hint');
        if (brokerAssetHint) {
          brokerAssetHint.textContent = `Valore attuale strumento: ${this.formatCurrency(selVal)}`;
        }
        updateTransferPreview();
      });
    }

    if (typeToggle) {
      typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          typeToggle.querySelectorAll('.segment-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          const currentType = e.currentTarget.dataset.type;

          if (toAccGroup) {
            toAccGroup.style.display = currentType === 'transfer' ? 'block' : 'none';
          }
          if (catGroup) {
            catGroup.style.display = currentType === 'transfer' ? 'none' : 'block';
          }
          if (accLabel) {
            accLabel.textContent = currentType === 'transfer' ? 'Conto di Origine (Preleva da)' : (currentType === 'income' ? 'Conto Accredito' : 'Conto Addebito');
          }

          if (splitBpGroup) {
            splitBpGroup.style.display = currentType === 'expense' ? 'block' : 'none';
            if (currentType !== 'expense' && splitToggle) {
              splitToggle.checked = false;
              if (splitCalcBox) splitCalcBox.style.display = 'none';
            }
          }

          // Se è giroconto e il conto di destinazione coincide con l'origine, auto-seleziona il successivo
          if (currentType === 'transfer' && formAccount && formToAccount) {
            if (formAccount.value === formToAccount.value) {
              const diffAcc = accounts.find(a => a.name !== formAccount.value);
              if (diffAcc) formToAccount.value = diffAcc.name;
            }
          }

          updateTransferPreview();
        });
      });
    }

    if (formAccount) formAccount.addEventListener('change', () => {
      const activeBtn = typeToggle?.querySelector('.segment-btn.active');
      if (activeBtn?.dataset.type === 'transfer' && formToAccount && formAccount.value === formToAccount.value) {
        const diffAcc = accounts.find(a => a.name !== formAccount.value);
        if (diffAcc) formToAccount.value = diffAcc.name;
      }
      updateTransferPreview();
    });

    if (formToAccount) formToAccount.addEventListener('change', () => {
      const toAcc = financeStore.findAccount(formToAccount.value);
      if (toAcc && typeof populateBrokerAssets === 'function') populateBrokerAssets(toAcc);
      updateTransferPreview();
    });
    if (formAmount) formAmount.addEventListener('input', () => {
      updateTransferPreview();
      if (typeof updateSplitBreakdown === 'function') updateSplitBreakdown();
    });

    // === GESTIONE PAGAMENTO MISTO BUONI PASTO ===
    const splitBpGroup = document.getElementById('form-group-split-bp');
    const splitToggle = document.getElementById('form-toggle-split-bp');
    const splitCalcBox = document.getElementById('split-bp-calculator-box');
    const splitVoucherInput = document.getElementById('form-split-voucher-amount');
    const splitPreviewVoucher = document.getElementById('split-preview-voucher');
    const splitPreviewCard = document.getElementById('split-preview-card');
    const splitCardName = document.getElementById('split-card-name');

    const updateSplitBreakdown = () => {
      const tot = parseFloat(formAmount?.value) || 0;
      const vAmt = parseFloat(splitVoucherInput?.value) || 0;
      const clampedVoucher = Math.min(tot, Math.max(0, vAmt));
      const cardResidual = Math.max(0, Math.round((tot - clampedVoucher) * 100) / 100);

      if (splitPreviewVoucher) splitPreviewVoucher.textContent = this.formatCurrency(clampedVoucher);
      if (splitPreviewCard) splitPreviewCard.textContent = this.formatCurrency(cardResidual);
      if (splitCardName && formAccount) splitCardName.textContent = formAccount.value;
    };

    if (splitToggle && splitCalcBox) {
      splitToggle.addEventListener('change', () => {
        if (splitToggle.checked) {
          splitCalcBox.style.display = 'block';
          const tot = parseFloat(formAmount?.value) || 0;
          if ((!splitVoucherInput.value || parseFloat(splitVoucherInput.value) === 0) && tot > 0) {
            const possibleVouchers = Math.min(voucherBalance, Math.floor(tot / 8) * 8);
            splitVoucherInput.value = possibleVouchers > 0 ? possibleVouchers : (tot <= 8 ? tot : 8);
          }
          updateSplitBreakdown();
        } else {
          splitCalcBox.style.display = 'none';
        }
      });
    }

    if (splitVoucherInput) {
      splitVoucherInput.addEventListener('input', updateSplitBreakdown);
    }

    if (formAccount) {
      formAccount.addEventListener('change', () => {
        if (splitCardName) splitCardName.textContent = formAccount.value;
      });
    }

    modalRoot.querySelectorAll('.btn-quick-bp').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const count = parseInt(btn.dataset.vouchercount, 10) || 1;
        const targetVal = count * 8;
        const tot = parseFloat(formAmount?.value) || 0;
        const allowedVal = tot > 0 ? Math.min(tot, targetVal) : targetVal;
        if (splitVoucherInput) {
          splitVoucherInput.value = Math.min(voucherBalance, allowedVal);
          updateSplitBreakdown();
        }
      });
    });

    const resetBpBtn = document.getElementById('btn-split-bp-reset');
    if (resetBpBtn) {
      resetBpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (splitVoucherInput) splitVoucherInput.value = '';
        updateSplitBreakdown();
      });
    }

    // Supporto Autocategorizzazione Intelligente in Tempo Reale
    const descInput = document.getElementById('form-description');
    const catSelect = document.getElementById('form-category');
    const predContainer = document.getElementById('smart-prediction-container');
    const predText = document.getElementById('smart-prediction-text');

    if (descInput && catSelect) {
      descInput.addEventListener('input', () => {
        const val = descInput.value;
        const qDesc = val.toLowerCase();
        const isGrocery = qDesc.includes('esselunga') || qDesc.includes('coop') || qDesc.includes('conad') || qDesc.includes('carrefour') || qDesc.includes('spesa') || qDesc.includes('supermercato') || qDesc.includes('lidl') || qDesc.includes('alimentar');
        const activeTypeBtn = typeToggle?.querySelector('.segment-btn.active');
        if (isGrocery && splitToggle && !splitToggle.checked && (!activeTypeBtn || activeTypeBtn.dataset.type === 'expense')) {
          splitToggle.checked = true;
          if (splitCalcBox) splitCalcBox.style.display = 'block';
          updateSplitBreakdown();
        }

        const allTxs = (typeof financeStore.getAllTransactions === 'function' 
          ? financeStore.getAllTransactions() 
          : (typeof financeStore.getTransactions === 'function' ? financeStore.getTransactions() : financeStore.transactions)) || [];
        const prediction = smartCategorizer.predictCategory(val, allTxs, categories);
        if (prediction && prediction.category) {
          catSelect.value = prediction.category;
          const cleanName = cleanCategoryName(prediction.category);
          const iconSvg = getCategoryIcon(prediction.category, 14);
          if (predContainer && predText) {
            predText.innerHTML = `
              <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--apple-blue); font-weight: 500;">
                <span style="display: inline-flex;">${getIcon('sparkle', 14)}</span>
                <span>Autocategorizzato:</span>
                <strong style="color: var(--text-primary); display: inline-flex; align-items: center; gap: 4px; background: rgba(0,113,227,0.1); padding: 2px 8px; border-radius: 9999px;">
                  ${iconSvg} ${cleanName}
                </strong>
              </span>
            `;
            predContainer.style.display = 'block';
          }
        } else if (predContainer) {
          predContainer.style.display = 'none';
        }
      });
    }

    // Supporto Nuova Categoria Personalizzata & Apprendimento Automatico
    const customGroup = document.getElementById('custom-cat-input-group');
    const customInput = document.getElementById('form-custom-category-name');
    const similarHint = document.getElementById('category-similar-hint');

    if (catSelect) {
      catSelect.addEventListener('change', () => {
        if (catSelect.value === '__custom__') {
          if (customGroup) customGroup.style.display = 'block';
          if (customInput) customInput.focus();
        } else {
          if (customGroup) customGroup.style.display = 'none';
          if (descInput && descInput.value.trim().length >= 3) {
            smartCategorizer.learnAssociation(descInput.value, catSelect.value);
          }
        }
      });
    }

    if (customInput && similarHint) {
      customInput.addEventListener('input', () => {
        const query = customInput.value.trim();
        const similars = financeStore.findSimilarCategories(query);
        if (similars.length > 0) {
          similarHint.style.display = 'block';
          similarHint.innerHTML = `
            <span style="font-size: 11px; color: var(--apple-blue); cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
              <span>Simile a "<strong>${cleanCategoryName(similars[0].name)}</strong>". Clicca per selezionare quella esistente.</span>
            </span>
          `;
          similarHint.onclick = () => {
            catSelect.value = similars[0].name;
            customGroup.style.display = 'none';
            similarHint.style.display = 'none';
          };
        } else {
          similarHint.style.display = 'none';
        }
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

    const viewSegmented = document.getElementById('mov-view-segmented');
    if (viewSegmented) {
      viewSegmented.querySelectorAll('.mov-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const mode = e.currentTarget.dataset.mode;
          if (mode && mode !== this.viewMode) {
            this.viewMode = mode;
            this.render(container);
          }
        });
      });
    }

    const periodFilter = document.getElementById('mov-period-filter');
    if (periodFilter) {
      periodFilter.addEventListener('change', (e) => {
        this.filters.period = e.target.value;
        this.render(container);
      });
    }

    const applyCustomDatesBtn = document.getElementById('btn-apply-custom-dates');
    if (applyCustomDatesBtn) {
      applyCustomDatesBtn.addEventListener('click', () => {
        const fromInput = document.getElementById('mov-custom-from');
        const toInput = document.getElementById('mov-custom-to');
        this.filters.customFrom = fromInput ? fromInput.value : '';
        this.filters.customTo = toInput ? toInput.value : '';
        this.render(container);
      });
    }

    const catFilter = document.getElementById('mov-category-filter');
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.render(container);
      });
    }

    const accountFilter = document.getElementById('mov-account-filter');
    if (accountFilter) {
      accountFilter.addEventListener('change', (e) => {
        this.filters.account = e.target.value;
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

    // Apertura Dettaglio/Modifica al click sulla riga movimento (sia vista Apple che tabella)
    container.querySelectorAll('.tx-interactive-row').forEach(row => {
      row.addEventListener('click', (e) => {
        // Se il click è sul pulsante elimina, non aprire il dettaglio
        if (e.target.closest('.tx-del-btn') || e.target.closest('.mov-delete-btn')) {
          return;
        }
        const txId = row.dataset.id;
        if (txId) {
          this.openDetailModal(txId, container);
        }
      });
    });

    // Eliminazione transazioni sia da vista lista (.tx-del-btn) che da vista tabella (.mov-delete-btn)
    container.querySelectorAll('.tx-del-btn, .mov-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const row = e.currentTarget.dataset.row;
        this.handleDelete(id, row, container);
      });
    });
  }

  openModal(txToEdit = null) {
    document.body.classList.add('modal-open');
    this.modalOpen = true;
    this.editingTxId = (txToEdit && txToEdit.id) ? txToEdit.id : null;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    const modalTitle = sheet ? sheet.querySelector('.modal-header h3') : null;
    const saveBtn = document.getElementById('modal-save');
    const dateInput = document.getElementById('form-date');
    const amountInput = document.getElementById('form-amount');
    const descInput = document.getElementById('form-description');
    const catSelect = document.getElementById('form-category');
    const accSelect = document.getElementById('form-account');
    const toAccSelect = document.getElementById('form-to-account');
    const toAccGroup = document.getElementById('form-group-to-account');
    const typeToggle = document.getElementById('form-type-toggle');
    const predContainer = document.getElementById('smart-prediction-container');

    if (modalTitle) {
      modalTitle.textContent = (txToEdit && txToEdit.id) ? 'Modifica Movimento' : 'Nuovo Movimento';
    }
    if (saveBtn) {
      saveBtn.textContent = (txToEdit && txToEdit.id) ? 'Aggiorna' : 'Salva';
    }
    if (predContainer) {
      predContainer.style.display = 'none';
    }

    if (txToEdit) {
      // Precompila campi con il movimento esistente
      if (amountInput) amountInput.value = parseFloat(txToEdit.amount || 0).toFixed(2);
      if (descInput) descInput.value = txToEdit.description || '';
      
      // Formatta la data per l'input date (YYYY-MM-DD)
      if (dateInput) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(txToEdit.date)) {
          const [d, m, y] = txToEdit.date.split('/');
          dateInput.value = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(txToEdit.date)) {
          dateInput.value = txToEdit.date;
        } else {
          dateInput.value = new Date().toISOString().split('T')[0];
        }
      }

      if (catSelect) catSelect.value = txToEdit.category || '';
      if (accSelect) accSelect.value = txToEdit.account || txToEdit.fromAccount || '';
      if (toAccSelect) toAccSelect.value = txToEdit.toAccount || '';

      if (typeToggle) {
        typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.type === (txToEdit.type || 'expense'));
        });
      }
      const isTransfer = txToEdit.type === 'transfer';
      const catGroup = document.getElementById('form-group-category');
      const accLabel = document.getElementById('form-account-label');
      if (toAccGroup) {
        toAccGroup.style.display = isTransfer ? 'block' : 'none';
      }
      if (catGroup) {
        catGroup.style.display = isTransfer ? 'none' : 'block';
      }
      if (accLabel) {
        accLabel.textContent = isTransfer ? 'Conto di Origine (Preleva da)' : (txToEdit.type === 'income' ? 'Conto Accredito' : 'Conto Addebito');
      }

      if (isTransfer && txToEdit.toAccount) {
        const toAcc = financeStore.findAccount(txToEdit.toAccount);
        if (toAcc && typeof this._populateBrokerAssets === 'function') {
          this._populateBrokerAssets(toAcc, txToEdit.targetHoldingId || txToEdit.targetHoldingTicker);
        }
        const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
        if (brokerAllocToggle) {
          brokerAllocToggle.querySelectorAll('.segment-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.alloctype === (txToEdit.brokerDestinationType || 'cash'));
          });
        }
      }

      if (typeof this._updateTransferPreview === 'function') {
        this._updateTransferPreview();
      }
    } else {
      // Reset campi per nuovo inserimento
      if (amountInput) amountInput.value = '';
      if (descInput) descInput.value = '';
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      if (catSelect) catSelect.value = '';
      if (typeToggle) {
        typeToggle.querySelectorAll('.segment-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.type === 'expense');
        });
      }
      const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
      if (brokerAllocToggle) {
        brokerAllocToggle.querySelectorAll('.segment-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.alloctype === 'cash');
        });
      }
      const initialToAcc = financeStore.findAccount(toAccSelect?.value || 'Trade Republic');
      if (initialToAcc && typeof this._populateBrokerAssets === 'function') {
        this._populateBrokerAssets(initialToAcc);
      }
      const brokerAllocGroup = document.getElementById('form-group-broker-allocation');
      if (brokerAllocGroup) brokerAllocGroup.style.display = 'none';

      const catGroup = document.getElementById('form-group-category');
      const accLabel = document.getElementById('form-account-label');
      const previewCard = document.getElementById('form-transfer-preview-card');
      if (toAccGroup) toAccGroup.style.display = 'none';
      if (catGroup) catGroup.style.display = 'block';
      if (accLabel) accLabel.textContent = 'Conto di Addebito';
      if (previewCard) previewCard.style.display = 'none';
    }

    if (overlay) overlay.classList.add('open');
    if (sheet) sheet.classList.add('open');

    setTimeout(() => {
      if (amountInput) amountInput.focus();
    }, 280);
  }

  closeModal() {
    document.body.classList.remove('modal-open');
    this.modalOpen = false;
    this.editingTxId = null;
    const overlay = document.getElementById('modal-overlay');
    const sheet = document.getElementById('modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 260);
  }

  openDetailModal(txId, container) {
    const tx = financeStore.getAllTransactions().find(t => t.id === txId);
    if (!tx) return;

    document.body.classList.add('modal-open');

    // Crea o recupera il container dell'ispettore dettaglio
    let detailModal = document.getElementById('tx-detail-modal-root');
    if (!detailModal) {
      detailModal = document.createElement('div');
      detailModal.id = 'tx-detail-modal-root';
      document.body.appendChild(detailModal);
    }

    const isIncome = tx.type === 'income';
    const isTransfer = tx.type === 'transfer';
    const sign = isIncome ? '+' : (isTransfer ? '' : '-');
    const amountColor = isIncome ? 'var(--apple-green)' : (isTransfer ? 'var(--apple-blue)' : 'var(--apple-red)');
    const typeLabel = isIncome ? 'Entrata / Accredito' : (isTransfer ? 'Giroconto tra Conti' : 'Uscita / Spesa');
    const catName = cleanCategoryName(tx.category || (isTransfer ? 'Giroconto' : 'Altro'));
    const catIcon = getCategoryIcon(tx.category || (isTransfer ? 'giroconto' : 'altro'), 22);
    const fullDate = this.formatDateFull(tx.date);

    detailModal.innerHTML = `
      <div class="apple-modal-overlay open" id="tx-detail-overlay">
        <div class="apple-modal-sheet open" id="tx-detail-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-3);">
            <button class="modal-close-btn" id="tx-detail-close">Chiudi</button>
            <h3 style="font-size: var(--text-base); font-weight: 700; margin: 0;">Scheda Movimento</h3>
            <button class="apple-btn-secondary" id="tx-detail-edit-btn" style="height: 32px; padding: 0 12px; font-size: 13px; font-weight: 600;">
              ${getIcon('edit', 13)} <span>Modifica</span>
            </button>
          </div>

          <div class="modal-body" style="padding: var(--space-4) var(--space-2); display: flex; flex-direction: column; gap: var(--space-4);">
            
            <!-- Amount & Title Hero Box -->
            <div style="text-align: center; padding: var(--space-3) var(--space-2); background: var(--bg-hover); border-radius: var(--radius-card); border: 1px solid var(--border-subtle);">
              <div style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 9999px; background: rgba(0, 113, 227, 0.1); color: var(--apple-blue); margin-bottom: 8px;">
                ${catIcon}
              </div>
              <h2 class="privacy-mask" style="font-size: 32px; font-weight: 800; letter-spacing: -0.03em; color: ${amountColor}; margin: 0; font-variant-numeric: tabular-nums;">
                ${sign}${this.formatCurrency(tx.amount)}
              </h2>
              <p style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 6px 0 0 0;">
                ${tx.description || 'Movimento'}
              </p>
              <span class="badge ${isIncome ? 'badge--positive' : (isTransfer ? 'badge--info' : 'badge--neutral')}" style="margin-top: 8px;">
                ${typeLabel}
              </span>
            </div>

            <!-- KV Details List -->
            <div class="card" style="padding: var(--space-3) var(--space-4); margin: 0; background: var(--bg-card);">
              <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Data di Registrazione</span>
                <span class="kv__value" style="font-size: 13px; font-weight: 600;">${fullDate}</span>
              </div>

              <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Categoria</span>
                <span class="kv__value" style="font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
                  <span style="color: var(--apple-blue); display: inline-flex;">${getCategoryIcon(tx.category, 14)}</span>
                  <span>${catName}</span>
                </span>
              </div>

              <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">${isTransfer ? 'Conto Origine' : 'Conto di Addebito/Accredito'}</span>
                <span class="kv__value" style="font-size: 13px; font-weight: 600;">${tx.account || tx.fromAccount || 'N/D'}</span>
              </div>

              ${isTransfer ? `
                <div class="kv" style="padding: 10px 0; border-bottom: 1px solid var(--border-subtle);">
                  <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Conto Destinazione</span>
                  <span class="kv__value" style="font-size: 13px; font-weight: 600;">
                    ${tx.toAccount || 'N/D'}
                    ${tx.brokerDestinationType === 'asset' && (tx.targetHoldingTicker || tx.targetHoldingName) ? ` ➔ <span style="color: var(--apple-blue);">Asset ${tx.targetHoldingTicker || tx.targetHoldingName}</span>` : (tx.brokerDestinationType === 'cash' ? ' ➔ <span style="color: var(--apple-green);">Liquidità Cash</span>' : '')}
                  </span>
                </div>
              ` : ''}

              <div class="kv" style="padding: 10px 0;">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Identificativo Interno</span>
                <span class="kv__value" style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">${tx.id}</span>
              </div>
            </div>

            <!-- Danger Zone: Delete Action inside detail -->
            <div style="display: flex; justify-content: center; margin-top: var(--space-2); margin-bottom: var(--space-4);">
              <button class="apple-btn-secondary" id="tx-detail-del-btn" style="color: var(--apple-red); border-color: rgba(255, 59, 48, 0.35); font-size: 13.5px; font-weight: 600; padding: 12px 20px; border-radius: var(--radius-pill); width: 100%; justify-content: center; background: rgba(255, 59, 48, 0.08);">
                ${getIcon('trash', 15)} <span>Elimina Movimento</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    `;

    const closeDetail = () => {
      document.body.classList.remove('modal-open');
      const sheet = document.getElementById('tx-detail-sheet');
      const ov = document.getElementById('tx-detail-overlay');
      if (sheet) sheet.classList.remove('open');
      setTimeout(() => {
        if (ov) ov.classList.remove('open');
        if (detailModal) detailModal.innerHTML = '';
      }, 240);
    };

    const closeBtn = document.getElementById('tx-detail-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDetail);

    const overlay = document.getElementById('tx-detail-overlay');
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDetail(); });

    const detailSheet = document.getElementById('tx-detail-sheet');
    const detailHandle = detailSheet ? detailSheet.querySelector('.modal-handle') : null;
    if (detailHandle) detailHandle.addEventListener('click', closeDetail);

    // Swipe verso il basso per chiudere anche la scheda di dettaglio
    const detailDragTargets = [detailHandle, detailSheet?.querySelector('.modal-header')].filter(Boolean);
    let dTouchStartY = 0;
    let dTouchCurrentY = 0;
    let dIsDragging = false;

    detailDragTargets.forEach(el => {
      el.addEventListener('touchstart', (e) => {
        dTouchStartY = e.touches[0].clientY;
        dTouchCurrentY = dTouchStartY;
        dIsDragging = true;
        if (detailSheet) detailSheet.style.transition = 'none';
      }, { passive: true });

      el.addEventListener('touchmove', (e) => {
        if (!dIsDragging || !detailSheet) return;
        dTouchCurrentY = e.touches[0].clientY;
        const diffY = dTouchCurrentY - dTouchStartY;
        if (diffY > 0) {
          if (e.cancelable) e.preventDefault();
          detailSheet.style.transform = `translateY(${diffY}px)`;
        }
      }, { passive: false });

      el.addEventListener('touchend', () => {
        if (!dIsDragging || !detailSheet) return;
        dIsDragging = false;
        const diffY = dTouchCurrentY - dTouchStartY;
        detailSheet.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        if (diffY > 65) {
          detailSheet.style.transform = 'translateY(100%)';
          setTimeout(() => {
            closeDetail();
            detailSheet.style.transform = '';
          }, 220);
        } else {
          detailSheet.style.transform = '';
        }
      }, { passive: true });
    });

    const editBtn = document.getElementById('tx-detail-edit-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        closeDetail();
        setTimeout(() => {
          this.openModal(tx);
        }, 260);
      });
    }

    const delBtn = document.getElementById('tx-detail-del-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (confirm(`Confermi l'eliminazione definitiva di questo movimento (${tx.description})?`)) {
          closeDetail();
          this.handleDelete(tx.id, tx.rowNumber, container);
        }
      });
    }
  }

  handleSave(container) {
    const amount = document.getElementById('form-amount')?.value;
    const description = document.getElementById('form-description')?.value;
    const date = document.getElementById('form-date')?.value;
    let category = document.getElementById('form-category')?.value;
    const account = document.getElementById('form-account')?.value;
    const toAccount = document.getElementById('form-to-account')?.value;

    const activeTypeBtn = document.querySelector('#form-type-toggle .segment-btn.active');
    const type = activeTypeBtn ? activeTypeBtn.dataset.type : 'expense';

    // Auto-aggiunta Categoria Personalizzata al volo
    if (category === '__custom__') {
      const customCatName = document.getElementById('form-custom-category-name')?.value.trim();
      if (customCatName) {
        financeStore.addCategory({ name: customCatName, type });
        category = customCatName;
      }
    }

    if (!amount || !description || !date || (!category && type !== 'transfer') || !account) {
      const saveBtn = document.getElementById('modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 400);
      }
      return;
    }

    if (type === 'transfer') {
      if (!toAccount || account.trim().toLowerCase() === toAccount.trim().toLowerCase()) {
        const toAccSelect = document.getElementById('form-to-account');
        if (toAccSelect) {
          toAccSelect.classList.add('shake');
          setTimeout(() => toAccSelect.classList.remove('shake'), 400);
        }
        alert('Attenzione: Il conto di partenza e il conto di arrivo non possono coincidere. Seleziona due conti differenti per eseguire il giroconto.');
        return;
      }
    }

    // Parametri opzionali di allocazione broker (Liquidità vs Asset già attivo)
    const brokerAllocToggle = document.getElementById('broker-alloc-type-toggle');
    const activeAllocBtn = brokerAllocToggle?.querySelector('.segment-btn.active');
    const brokerDestinationType = activeAllocBtn?.dataset.alloctype || 'cash';
    const targetAssetSelect = document.getElementById('form-broker-target-asset');
    const selectedAssetOption = targetAssetSelect?.selectedOptions?.[0];
    const targetHoldingId = selectedAssetOption?.value || '';
    const targetHoldingTicker = selectedAssetOption?.dataset.ticker || '';
    const targetHoldingName = selectedAssetOption?.dataset.name || '';

    if (this.editingTxId) {
      // Modalità Modifica Movimento Esistente
      const updatedTx = financeStore.updateTransaction(this.editingTxId, {
        amount,
        description,
        date,
        category: category || 'Giroconto',
        type,
        account,
        toAccount: type === 'transfer' ? toAccount : '',
        brokerDestinationType: type === 'transfer' ? brokerDestinationType : undefined,
        targetHoldingId: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingId : undefined,
        targetHoldingTicker: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingTicker : undefined,
        targetHoldingName: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingName : undefined
      });

      if (description && category && category !== '__custom__' && type !== 'transfer') {
        smartCategorizer.learnAssociation(description, category);
      }

      if (updatedTx && updatedTx.rowNumber && googleSheetsService.isConfigured()) {
        googleSheetsService.updateTransaction(updatedTx.rowNumber, updatedTx).catch(err => console.warn('Update fallita:', err));
      }
    } else {
      // Modalità Nuovo Movimento
      const isSplitActive = document.getElementById('form-toggle-split-bp')?.checked;
      const voucherAmount = parseFloat(document.getElementById('form-split-voucher-amount')?.value) || 0;

      if (isSplitActive && voucherAmount > 0 && type === 'expense') {
        // Pagamento Misto: Buoni Pasto + Carta Buddybank (o conto selezionato)
        const totalNum = parseFloat(amount) || 0;
        const cardAmount = Math.max(0, Math.round((totalNum - voucherAmount) * 100) / 100);

        const { txVoucher, txCard } = financeStore.addSplitTransaction({
          totalAmount: totalNum,
          voucherAmount,
          cardAmount,
          description,
          category: category || '🛒 Spesa Alimentare',
          date,
          cardAccount: account
        });

        if (description && category && category !== '__custom__') {
          smartCategorizer.learnAssociation(description, category);
        }

        if (googleSheetsService.isConfigured()) {
          if (txVoucher) googleSheetsService.pushTransaction(txVoucher).catch(err => console.warn('Sync BP fallita:', err));
          if (txCard) googleSheetsService.pushTransaction(txCard).catch(err => console.warn('Sync Carta fallita:', err));
        }
      } else {
        const addedTx = financeStore.addTransaction({
          amount,
          description,
          date,
          category: category || 'Giroconto',
          type,
          account,
          toAccount: type === 'transfer' ? toAccount : '',
          brokerDestinationType: type === 'transfer' ? brokerDestinationType : undefined,
          targetHoldingId: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingId : undefined,
          targetHoldingTicker: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingTicker : undefined,
          targetHoldingName: type === 'transfer' && brokerDestinationType === 'asset' ? targetHoldingName : undefined
        });

        if (description && category && category !== '__custom__' && type !== 'transfer') {
          smartCategorizer.learnAssociation(description, category);
        }

        if (googleSheetsService.isConfigured()) {
          googleSheetsService.pushTransaction(addedTx).catch(err => console.warn('Sync fallita:', err));
        }
      }
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
 * - Sub-navigazione: Portafoglio & PAC, Profilo di Rischio, Obiettivi di Risparmio
 * - Asset Allocation dinamica da Conti & Saldi reali (XEON, VWCE, Pensione, Liquidità)
 * - Calcolo aggregato del Net Worth con percentuali precise
 * - Simulatore PAC interattivo Apple Spec (su VWCE con crescita composta)
 * - Profilatore di Rischio (MiFID leggero) con Target Allocation e Calcolo Rebalance
 * - Modulo Obiettivi di Risparmio (Saving Goals) con calcolo rata e fattibilità cash flow
 */


class InvestimentiView {
  constructor() {
    this.activeSubtab = 'portafoglio'; // 'portafoglio' | 'rischio' | 'obiettivi' | 'fire'
    this.allocationChart = null;
    this.pacChart = null;
    this.targetDonutChart = null;
    this.fireChart = null;
    this.freshCapital = 500;

    this.pacParams = {
      initialCapital: 3700,
      monthlyDeposit: 200,
      annualReturn: 8.0,
      years: 15
    };

    this.fireParams = {
      monthlyExpense: 1400,
      swr: 4.0,
      annualReturn: 7.0,
      inflation: 2.0
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

  destroyCharts() {
    if (this.allocationChart) {
      try { this.allocationChart.destroy(); } catch (e) {}
      this.allocationChart = null;
    }
    if (this.pacChart) {
      try { this.pacChart.destroy(); } catch (e) {}
      this.pacChart = null;
    }
    if (this.targetDonutChart) {
      try { this.targetDonutChart.destroy(); } catch (e) {}
      this.targetDonutChart = null;
    }
    if (this.fireChart) {
      try { this.fireChart.destroy(); } catch (e) {}
      this.fireChart = null;
    }
  }

  render(container) {
    this.destroyCharts();

    const { totalPortfolio, totalInvestedDirect, pensione } = this.getPortafoglioBreakdown();

    const tabMeta = {
      portafoglio: {
        badge: 'Asset Management',
        badgeClass: 'badge--purple',
        title: 'Portafoglio & Allocazione',
        subtitle: 'Asset allocation tra strumenti monetari (XEON), azionario globale (VWCE), previdenza e simulatore PAC',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-scroll-pac">
            ${getIcon('chart', 14)} Simulatore PAC
          </button>
        `
      },
      rischio: {
        badge: 'MiFID & Rebalance',
        badgeClass: 'badge--info',
        title: 'Profilo di Rischio & Target',
        subtitle: 'Questionario di tolleranza al rischio (MiFID), modello di allocazione ideale e ribilanciamento guidato',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-scroll-mifid">
            ${getIcon('target', 14)} Questionario MiFID
          </button>
        `
      },
      obiettivi: {
        badge: 'Saving Goals',
        badgeClass: 'badge--positive',
        title: 'Obiettivi di Risparmio & Traguardi',
        subtitle: 'Piani di accumulo per traguardi personali, calcolo rata mensile sostenibile e monitoraggio scadenze',
        actionHtml: `
          <button class="apple-btn-primary" id="btn-add-goal-header">
            ${getIcon('plus', 14)} Nuovo Obiettivo
          </button>
        `
      },
      fire: {
        badge: 'F.I.R.E. Engine',
        badgeClass: 'badge--warning',
        title: 'Indipendenza Finanziaria (F.I.R.E.)',
        subtitle: 'Simulatore del crossover point, tasso di prelievo sicuro (SWR 4%) e proiezioni di rendita passiva',
        actionHtml: `
          <span class="badge badge--neutral" style="font-size: 12px; padding: 6px 12px;">
            ${getIcon('fire', 12)} Regola del 4% / 25x Uscite
          </span>
        `
      }
    };
    const currentMeta = tabMeta[this.activeSubtab] || tabMeta.portafoglio;

    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = 'Investimenti';
    if (subtitleEl) subtitleEl.textContent = currentMeta.subtitle;

    container.innerHTML = `
      <div class="page investimenti-page">

        <!-- Header di Sezione in Stile Spese (Desktop) + Subtabs Workout (Mobile & Desktop) -->
        <header class="investimenti-header-section">
          
          <div class="spese-header-toolbar investimenti-header-toolbar desk-only">
            <div class="spese-header-info investimenti-header-info">
              <div class="investimenti-meta-row">
                <span class="badge ${currentMeta.badgeClass}">${currentMeta.badge}</span>
                <span class="investimenti-chip privacy-mask">
                  Investito: <strong>${this.formatCurrency(totalInvestedDirect + pensione)}</strong>
                </span>
                <span class="investimenti-chip privacy-mask">
                  Net Worth: <strong>${this.formatCurrency(totalPortfolio)}</strong>
                </span>
              </div>
              <h2 class="page-title">${currentMeta.title}</h2>
              <p class="page-subtitle">${currentMeta.subtitle}</p>
            </div>
            
            <div class="spese-header-actions investimenti-header-actions">
              ${currentMeta.actionHtml}
            </div>
          </div>

          <!-- Sotto-menu Segmentato Apple / Workout Capsule -->
          <div class="investimenti-subtabs-bar">
            <nav class="investimenti-segmented-tabs" id="investimenti-subtabs">
              <button class="investimenti-tab-btn ${this.activeSubtab === 'portafoglio' ? 'active' : ''}" data-subtab="portafoglio">
                <span class="tab-icon">${getIcon('chart', 14)}</span>
                <span class="tab-label">Portafoglio</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'rischio' ? 'active' : ''}" data-subtab="rischio">
                <span class="tab-icon">${getIcon('target', 14)}</span>
                <span class="tab-label">Rischio</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'obiettivi' ? 'active' : ''}" data-subtab="obiettivi">
                <span class="tab-icon">${getIcon('savings', 14)}</span>
                <span class="tab-label">Obiettivi</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'fire' ? 'active' : ''}" data-subtab="fire">
                <span class="tab-icon">${getIcon('fire', 14)}</span>
                <span class="tab-label">F.I.R.E.</span>
              </button>
            </nav>
          </div>

        </header>

        ${this.activeSubtab === 'portafoglio' ? this.renderPortafoglioView() : ''}
        ${this.activeSubtab === 'rischio' ? this.renderRischioView() : ''}
        ${this.activeSubtab === 'obiettivi' ? this.renderObiettiviView() : ''}
        ${this.activeSubtab === 'fire' ? this.renderFireView() : ''}

      </div>
    `;

    this.bindSubtabEvents(container);

    if (this.activeSubtab === 'portafoglio') {
      this.bindPortafoglioEvents(container);
      requestAnimationFrame(() => {
        this.initAllocationChart();
        this.initPacChart();
      });
    } else if (this.activeSubtab === 'rischio') {
      this.bindRischioEvents(container);
    } else if (this.activeSubtab === 'obiettivi') {
      this.bindObiettiviEvents(container);
    } else if (this.activeSubtab === 'fire') {
      this.bindFireEvents(container);
      requestAnimationFrame(() => {
        this.initFireChart();
      });
    }
  }

  bindSubtabEvents(container) {
    container.querySelectorAll('#investimenti-subtabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          if (window.location.hash !== `#investimenti-${sub}`) {
            window.location.hash = `investimenti-${sub}`;
          }
          this.render(container);
        }
      });
    });

    const btnScrollPac = container.querySelector('#btn-scroll-pac');
    if (btnScrollPac) {
      btnScrollPac.addEventListener('click', () => {
        const el = container.querySelector('#pac-simulator-card, .pac-controls-card, .interactive-sim-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnScrollMifid = container.querySelector('#btn-scroll-mifid');
    if (btnScrollMifid) {
      btnScrollMifid.addEventListener('click', () => {
        const el = container.querySelector('.risk-survey-card, .survey-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnAddGoalHeader = container.querySelector('#btn-add-goal-header');
    if (btnAddGoalHeader) {
      btnAddGoalHeader.addEventListener('click', () => {
        this.openGoalModal(container);
      });
    }
  }

  // =========================================================================
  // 1. VISTA PORTAFOGLIO & PAC (Esistente Ottimizzata)
  // =========================================================================
  getPortafoglioBreakdown() {
    const accounts = financeStore.getAccounts();
    let xeon = 0;
    let vwce = 0;
    let pensione = 0;
    let liquid = 0;
    let brokerCashTotal = 0;
    const brokers = [];
    const customInvestments = [];
    const allHoldings = [];

    accounts.forEach(acc => {
      const nameLower = (acc.name || '').toLowerCase();
      const typeLower = (acc.type || '').toLowerCase();
      const bal = parseFloat(acc.balance) || 0;

      if (acc.isBroker || (Array.isArray(acc.holdings) && acc.holdings.length > 0)) {
        const cash = parseFloat(acc.cashBalance) || 0;
        brokerCashTotal += cash;
        const brokerHoldings = Array.isArray(acc.holdings) ? acc.holdings : [];
        const brokerHoldingsTotal = brokerHoldings.reduce((s, h) => s + (parseFloat(h.currentValue) || 0), 0);
        const consolidatedTotal = Math.round((cash + brokerHoldingsTotal) * 100) / 100;

        brokers.push({
          id: acc.id,
          name: acc.name,
          provider: acc.provider || acc.name,
          balance: consolidatedTotal || bal,
          cashBalance: cash,
          holdingsTotal: brokerHoldingsTotal,
          holdings: brokerHoldings
        });

        brokerHoldings.forEach(h => {
          const hVal = parseFloat(h.currentValue) || 0;
          const ticker = (h.ticker || '').toUpperCase();
          if (ticker === 'XEON' || h.assetClass === 'monetario') {
            xeon += hVal;
          } else if (ticker === 'VWCE' || (h.assetClass && h.assetClass.includes('azionario'))) {
            vwce += hVal;
          } else {
            customInvestments.push({
              name: `${acc.name} - ${h.name || h.ticker}`,
              amount: hVal,
              color: h.color || '#0071E3',
              ticker: h.ticker || 'ASSET',
              type: h.assetClassLabel || 'ETF / Strumento'
            });
          }
          allHoldings.push({
            ...h,
            brokerId: acc.id,
            brokerName: acc.name
          });
        });
      } else if (acc.isPension || nameLower.includes('pensione') || typeLower.includes('previden')) {
        pensione += bal;
      } else if (acc.isInvestment || typeLower.includes('invest') || nameLower.includes('xeon') || nameLower.includes('vwce')) {
        if (nameLower.includes('xeon')) xeon += bal;
        else if (nameLower.includes('vwce')) vwce += bal;
        else customInvestments.push({ name: acc.name, amount: bal, color: '#FF9500', ticker: 'ASSET', type: acc.type || 'Investimento' });
      } else {
        liquid += bal;
      }
    });

    if (xeon === 0 && vwce === 0 && pensione === 0 && brokers.length === 0) {
      xeon = 4500.00;
      vwce = 3700.00;
      pensione = 3200.00;
      liquid = 2450.00;
    }

    if (this.pacParams.initialCapital === 3700 && vwce > 0) {
      this.pacParams.initialCapital = Math.round(vwce);
    }

    // Sdoppiamento XEON: 5 Mensilità Fondo Emergenza + Quota Investimento Sicuro
    const avgExpenseRef = 1000.00;
    const emergencyFundTarget = avgExpenseRef * 5; // 5.000 € target 5 mensilità
    const xeonEmergency = Math.min(xeon, emergencyFundTarget);
    const xeonSafeInvestment = Math.max(0, xeon - xeonEmergency);

    const totalInvestedDirect = xeon + vwce + customInvestments.reduce((sum, i) => sum + i.amount, 0);
    // Portafoglio Investimenti ("Zero Allucinazioni"): 100% dedicato a Trade Republic (Azionario VWCE + Monetario XEON + Liquidità Broker)
    // Il Fondo Pensione è escluso per non alterare l'asset allocation e l'analisi di esposizione
    const totalPortfolio = totalInvestedDirect + brokerCashTotal;

    const rawAllocations = [
      { name: 'ETF Azionario Globale (All-World)', amount: vwce, color: '#0071E3', ticker: 'VWCE', type: 'ETF Azionario All-World (Crescita)' },
      { name: 'Monetario / Fondo Emergenza (5 Mesi)', amount: xeonEmergency, color: '#34C759', ticker: 'XEON', type: 'Monetario Overnight (5 Mesi)' },
      ...(xeonSafeInvestment > 0 ? [{ name: 'Monetario / Quota Sicura & Rendimento', amount: xeonSafeInvestment, color: '#30D158', ticker: 'XEON', type: 'Investimento Monetario Sicuro' }] : []),
      ...customInvestments,
      ...(brokerCashTotal > 0 ? [{ name: 'Liquidità Broker non allocata', amount: brokerCashTotal, color: '#64D2FF', ticker: 'CASH', type: 'Liquidità Remunerata Trade Republic' }] : [])
    ];

    const allocationData = rawAllocations.filter(item => item.amount > 0).map(item => ({
      ...item,
      percentage: totalPortfolio > 0 ? ((item.amount / totalPortfolio) * 100).toFixed(1) : 0
    }));

    return {
      xeon,
      vwce,
      pensione,
      liquid,
      brokerCashTotal,
      brokers,
      allHoldings,
      totalPortfolio,
      totalInvestedDirect,
      xeonEmergency,
      xeonSafeInvestment,
      emergencyFundTarget,
      allocationData
    };
  }

  renderPortafoglioView() {
    const { xeon, vwce, pensione, liquid, brokerCashTotal, brokers, totalPortfolio, totalInvestedDirect, xeonEmergency, xeonSafeInvestment, allocationData } = this.getPortafoglioBreakdown();

    const totPort = totalPortfolio || 1;
    const pctXeonRaw = (xeon / totPort) * 100;
    const pctVwceRaw = (vwce / totPort) * 100;
    const pctCashRaw = (brokerCashTotal / totPort) * 100;

    const pctXeonBar = brokerCashTotal > 0 ? Math.max(4, Math.round(pctXeonRaw)) : Math.round(pctXeonRaw);
    const pctVwceBar = brokerCashTotal > 0 ? Math.max(4, Math.round(pctVwceRaw)) : (100 - Math.round(pctXeonRaw));
    const pctCashBar = brokerCashTotal > 0 ? Math.max(0, 100 - pctXeonBar - pctVwceBar) : 0;

    const annualXeonYield = xeon * 0.034;
    const monthlyXeonYield = annualXeonYield / 12;
    const dailyXeonYield = annualXeonYield / 365;

    // Bar heights for Workout Micro Bar Chart (Emergency 5m / Extra XEON / VWCE)
    const maxBucket = Math.max(xeonEmergency, xeonSafeInvestment, vwce, 1);
    const hEmerg = Math.max(10, Math.round((xeonEmergency / maxBucket) * 44));
    const hSafe = Math.max(8, Math.round((xeonSafeInvestment / maxBucket) * 44));
    const hVwce = Math.max(10, Math.round((vwce / maxBucket) * 44));

    const primaryBroker = brokers[0] || { id: 'trade_republic', name: 'Trade Republic', provider: 'Trade Republic', balance: totalPortfolio, cashBalance: brokerCashTotal, holdingsTotal: totalInvestedDirect, holdings: [] };

    return `
      <!-- 1. HERO CARD: PORTAFOGLIO TRADE REPUBLIC (Workout Monolithic Style) -->
      <section class="card hero-patrimonio-card invest-hero-card">
        <div class="hero-top-row">
          <div class="hero-title-group">
            <div class="hero-badge-row">
              <span class="hero-title-label">Portafoglio Trade Republic</span>
              <span class="badge badge--positive hero-badge-tag">${brokerCashTotal > 0 ? 'ETF &amp; Liquidità' : '100% Investito ETF'}</span>
            </div>
            <div class="card__value privacy-mask hero-networth-val">
              ${this.formatCurrency(totalPortfolio)}
            </div>
          </div>
          <div class="hero-trend-wrap">
            <span class="trend-badge positive">
              +3,4% €STR
            </span>
            <button type="button" class="cashflow-link" id="btn-hero-scroll-pac" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;">
              Simulatore PAC &rarr;
            </button>
          </div>
        </div>

        <!-- Segmented Allocation Bar (Monetario XEON / Azionario VWCE / Liquidità) -->
        <div class="alloc-bar-track">
          <div class="alloc-segment" style="width: ${pctXeonBar}%; background: #30D158;" title="Monetario XEON: ${pctXeonRaw.toFixed(1)}%"></div>
          <div class="alloc-segment" style="width: ${pctVwceBar}%; background: #0A84FF;" title="Azionario VWCE: ${pctVwceRaw.toFixed(1)}%"></div>
          ${pctCashBar > 0 ? `<div class="alloc-segment" style="width: ${pctCashBar}%; background: #AF52DE;" title="Liquidità Broker: ${pctCashRaw.toFixed(1)}%"></div>` : ''}
        </div>

        <!-- Legenda Composizione a Colonne Pulite -->
        <div class="alloc-legend" style="${brokerCashTotal > 0 ? '' : 'grid-template-columns: repeat(2, 1fr);'}">
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #30D158;"></span>
              <span class="legend-name">Monetario (${pctXeonRaw.toFixed(0)}%)</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #30D158;">
              ${this.formatCurrency(xeon)}
            </span>
          </div>
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #0A84FF;"></span>
              <span class="legend-name">Azionario (${pctVwceRaw.toFixed(0)}%)</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #0A84FF;">
              ${this.formatCurrency(vwce)}
            </span>
          </div>
          ${brokerCashTotal > 0 ? `
          <div class="legend-col">
            <div class="legend-label-row">
              <span class="dot-indicator" style="background: #AF52DE;"></span>
              <span class="legend-name">Cassa Broker</span>
            </div>
            <span class="privacy-mask legend-amount" style="color: #AF52DE;">
              ${this.formatCurrency(brokerCashTotal)}
            </span>
          </div>
          ` : ''}
        </div>
      </section>

      <!-- 2. STRATEGIA & RENDIMENTO ATTIVO (Workout Micro Bar Chart) -->
      <section class="cashflow-section">
        <div class="cashflow-header-row">
          <div class="cashflow-header-left">
            <h3 class="cashflow-title">
              <span>Ripartizione &amp; Rendimento</span>
              <span class="badge badge--info flow-day-badge">
                <span class="live-dot"></span>
                PAC 200 €/m
              </span>
            </h3>
          </div>
          <button type="button" class="cashflow-link btn-add-holding" data-broker-id="${primaryBroker.id}" style="background:none;border:none;padding:0;cursor:pointer;font-family:inherit;">
            + Nuovo Strumento
          </button>
        </div>

        <div class="native-card mobile-workout-cashflow-card invest-workout-card">
          <div class="cashflow-kpi-row">
            <div>
              <span class="cashflow-kpi-sub">Rendimento Monetario Stimato (XEON)</span>
              <div class="cashflow-kpi-val privacy-mask" style="color: #30D158;">+${this.formatCurrency(annualXeonYield)}<span style="font-size: 14px; font-weight: 600; color: #8E8E93;"> / anno</span></div>
            </div>
            <span class="cashflow-pct-tag" style="color: #30D158; background: rgba(48, 209, 88, 0.14);">~${monthlyXeonYield.toFixed(1)} €/mese</span>
          </div>

          <!-- Micro Bar Chart (Fondo Emergenza / Riserva XEON / Azionario VWCE) -->
          <div class="workout-bars-grid">
            <div class="workout-bar-col">
              <div class="bar-val privacy-mask">${Math.round(xeonEmergency)} €</div>
              <div class="bar-pill bar-entrate" style="height: ${hEmerg}px;"></div>
              <div class="bar-label">Emergenza 5m</div>
            </div>
            <div class="workout-bar-col">
              <div class="bar-val privacy-mask">${Math.round(xeonSafeInvestment)} €</div>
              <div class="bar-pill" style="height: ${hSafe}px; background: linear-gradient(180deg, #64D2FF 0%, rgba(100, 210, 255, 0.35) 100%);"></div>
              <div class="bar-label">Riserva XEON</div>
            </div>
            <div class="workout-bar-col">
              <div class="bar-val privacy-mask">${Math.round(vwce)} €</div>
              <div class="bar-pill" style="height: ${hVwce}px; background: linear-gradient(180deg, #0A84FF 0%, rgba(10, 132, 255, 0.4) 100%);"></div>
              <div class="bar-label">Crescita VWCE</div>
            </div>
          </div>

          <div class="timeline-footer">
            <span>Cuscinetto: <strong>5 mensilità coperte</strong> su XEON</span>
            <span>Maturazione: <strong>~${dailyXeonYield.toFixed(2)} €/gg</strong></span>
          </div>
        </div>
      </section>

      <!-- 3. POSIZIONI & STRUMENTI ATTIVI (LinkedIn Dark Card List) -->
      <section class="card accounts-overview-card invest-positions-card">
        <div class="card__header" style="display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;">
          <div>
            <span class="card__title">Posizioni &amp; Strumenti Attivi</span>
            <span class="accounts-desc desk-only">
              Titoli ETF su Trade Republic, liquidità remunerata e previdenza complementare
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <button type="button" class="apple-btn-secondary btn-edit-broker-cash" data-broker-id="${primaryBroker.id}" style="font-size: 11.5px; padding: 5px 10px; width: auto;">
              ${getIcon('wallet', 12)} Cassa
            </button>
            <button type="button" class="apple-btn-primary btn-add-holding" data-broker-id="${primaryBroker.id}" style="font-size: 11.5px; padding: 5px 11px; width: auto;">
              + ETF
            </button>
          </div>
        </div>

        <div class="accounts-list-container">
          ${brokers.length > 0 ? brokers.map(b => b.holdings.map(h => {
            const weightOnPortfolio = totalPortfolio > 0 ? ((h.currentValue / totalPortfolio) * 100).toFixed(1) : '0.0';
            const isXeon = (h.ticker || '').toUpperCase() === 'XEON';
            const badgeColor = isXeon ? '#30D158' : (h.color || '#0A84FF');
            const badgeBg = isXeon ? 'rgba(48, 209, 88, 0.14)' : 'rgba(10, 132, 255, 0.14)';

            return `
              <div class="account-row-item interactive btn-edit-holding" data-broker-id="${b.id}" data-holding-id="${h.id}" title="Tocca per modificare ${h.ticker}">
                <div class="account-row-left">
                  <div class="account-row-icon" style="background: ${badgeBg}; color: ${badgeColor}; font-size: 10.5px; font-weight: 800; letter-spacing: -0.02em;">
                    ${h.ticker || 'ETF'}
                  </div>
                  <div class="account-row-info">
                    <strong class="account-row-name">${h.name}</strong>
                    <span class="account-row-type">
                      ${weightOnPortfolio}% portafoglio • ${h.isPac ? `PAC ${this.formatCurrency(h.pacAmount || 200).replace(',00', '')}/m` : (isXeon ? 'Monetario €STR' : (h.isin || 'ETF'))}
                    </span>
                  </div>
                </div>
                <div class="account-row-right" style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                  <div style="text-align: right;">
                    <span class="account-row-balance privacy-mask" style="color: ${badgeColor}; display: block;">
                      ${this.formatCurrency(h.currentValue)}
                    </span>
                    <span style="font-size: 10.5px; color: #8E8E93; display: block;">
                      Modifica &rarr;
                    </span>
                  </div>
                </div>
              </div>
            `;
          }).join('')).join('') : `
            <div class="account-row-item">
              <div class="account-row-left">
                <div class="account-row-icon" style="background: rgba(48, 209, 88, 0.14); color: #30D158; font-size: 10.5px; font-weight: 800;">XEON</div>
                <div class="account-row-info">
                  <strong class="account-row-name">Xtrackers II EUR Overnight Rate Swap</strong>
                  <span class="account-row-type">65.5% • Fondo Emergenza &amp; Monetario</span>
                </div>
              </div>
              <div class="account-row-right">
                <span class="account-row-balance privacy-mask" style="color: #30D158;">${this.formatCurrency(xeon)}</span>
              </div>
            </div>
            <div class="account-row-item">
              <div class="account-row-left">
                <div class="account-row-icon" style="background: rgba(10, 132, 255, 0.14); color: #0A84FF; font-size: 10.5px; font-weight: 800;">VWCE</div>
                <div class="account-row-info">
                  <strong class="account-row-name">Vanguard FTSE All-World UCITS ETF</strong>
                  <span class="account-row-type">34.4% • PAC Azionario 200 €/mese</span>
                </div>
              </div>
              <div class="account-row-right">
                <span class="account-row-balance privacy-mask" style="color: #0A84FF;">${this.formatCurrency(vwce)}</span>
              </div>
            </div>
          `}

          <!-- Riga Liquidità Broker Non Investita -->
          <div class="account-row-item interactive btn-edit-broker-cash" data-broker-id="${primaryBroker.id}" title="Modifica liquidità non investita su Trade Republic">
            <div class="account-row-left">
              <div class="account-row-icon" style="background: rgba(175, 82, 222, 0.14); color: #AF52DE; font-size: 10px; font-weight: 800;">
                CASH
              </div>
              <div class="account-row-info">
                <strong class="account-row-name">Liquidità Libera Trade Republic</strong>
                <span class="account-row-type">Cassa broker disponibile per il PAC</span>
              </div>
            </div>
            <div class="account-row-right" style="text-align: right; flex-shrink: 0;">
              <span class="account-row-balance privacy-mask" style="color: #AF52DE; display: block;">
                ${this.formatCurrency(brokerCashTotal)}
              </span>
              <span style="font-size: 10.5px; color: #8E8E93; display: block;">Modifica &rarr;</span>
            </div>
          </div>

          <!-- Riga Previdenza Complementare (Tracciata Separatamente) -->
          <div class="account-row-item" style="opacity: 0.92;">
            <div class="account-row-left">
              <div class="account-row-icon" style="background: rgba(255, 159, 10, 0.14); color: #FF9F0A; font-size: 9.5px; font-weight: 800;">
                PENS
              </div>
              <div class="account-row-info">
                <strong class="account-row-name">Fondo Pensione Integrativo</strong>
                <span class="account-row-type">Previdenza complementare (Esclusa da NW)</span>
              </div>
            </div>
            <div class="account-row-right" style="text-align: right; flex-shrink: 0;">
              <span class="account-row-balance privacy-mask" style="color: #FF9F0A; display: block;">
                ${this.formatCurrency(pensione)}
              </span>
              <span style="font-size: 10.5px; color: #8E8E93; display: block;">Lungo termine</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Simulatore PAC & Crescita Composta Apple Spec -->
      <section class="simulator-card" id="pac-simulator-card">
        <div class="chart-header">
          <div class="chart-title-group">
            <h3>Simulatore PAC &amp; Interesse Composto</h3>
            <span class="chart-subtitle">Proiezione futura del piano di accumulo su VWCE con curva continua</span>
          </div>
        </div>

        <div class="simulator-grid">
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

          <div class="sim-results-pane">
            <div class="sim-kpi-summary">
              <div class="sim-kpi highlight">
                <span class="sim-kpi-label">Valore Finale</span>
                <span class="sim-kpi-value positive" id="kpi-valore-finale">€0,00</span>
              </div>
              <div class="sim-kpi">
                <span class="sim-kpi-label">Versato</span>
                <span class="sim-kpi-value" id="kpi-capitale-versato">€0,00</span>
              </div>
              <div class="sim-kpi">
                <span class="sim-kpi-label">Interessi</span>
                <span class="sim-kpi-value positive" id="kpi-interessi">€0,00</span>
              </div>
            </div>
            <div class="sim-canvas-wrapper">
              <canvas id="pacSimulationCanvas"></canvas>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  bindPortafoglioEvents(container) {
    const btnHeroScrollPac = container.querySelector('#btn-hero-scroll-pac');
    if (btnHeroScrollPac) {
      btnHeroScrollPac.addEventListener('click', () => {
        const el = container.querySelector('#pac-simulator-card');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const bindSlider = (id, key, formatFn, valId) => {
      const slider = container.querySelector(id);
      const valEl = container.querySelector(valId);
      if (slider && valEl) {
        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          this.pacParams[key] = val;
          valEl.textContent = formatFn(val);
          this.updatePacSimulation();
        });
      }
    };

    bindSlider('#slider-capitale', 'initialCapital', v => this.formatCurrency(v), '#val-capitale-iniziale');
    bindSlider('#slider-versamento', 'monthlyDeposit', v => this.formatCurrency(v), '#val-versamento-mensile');
    bindSlider('#slider-rendimento', 'annualReturn', v => v + '%', '#val-rendimento-annuo');
    bindSlider('#slider-orizzonte', 'years', v => v + ' anni', '#val-orizzonte');

    container.querySelectorAll('.btn-add-holding').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const brokerId = e.currentTarget.dataset.brokerId;
        this.openHoldingModal(brokerId, null, container);
      });
    });

    container.querySelectorAll('.btn-edit-holding').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const brokerId = e.currentTarget.dataset.brokerId;
        const holdingId = e.currentTarget.dataset.holdingId;
        this.openHoldingModal(brokerId, holdingId, container);
      });
    });

    container.querySelectorAll('.btn-delete-holding').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const brokerId = e.currentTarget.dataset.brokerId;
        const holdingId = e.currentTarget.dataset.holdingId;
        if (confirm('Sei sicuro di voler eliminare questo strumento dal portafoglio?')) {
          financeStore.deleteHolding(brokerId, holdingId);
          this.render(container);
        }
      });
    });

    container.querySelectorAll('.btn-edit-broker-cash').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const brokerId = e.currentTarget.dataset.brokerId;
        this.openBrokerCashModal(brokerId, container);
      });
    });
  }

  openHoldingModal(brokerId, holdingId = null, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const acc = financeStore.findAccount(brokerId);
    if (!acc) return;

    const isEdit = !!holdingId;
    const existing = isEdit ? (acc.holdings || []).find(h => h.id === holdingId || h.ticker === holdingId) : null;
    const assetClasses = AssetCatalogService.getAllAssetClasses();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="holding-modal-overlay">
        <div class="apple-modal-sheet open" id="holding-modal-sheet" style="max-width: 500px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="holding-modal-cancel">Annulla</button>
            <h3>${isEdit ? 'Modifica Strumento' : 'Nuovo Strumento JustETF'}</h3>
            <button class="modal-save-btn" id="holding-modal-save">Salva</button>
          </div>
          <div class="modal-form">
            <div style="background: var(--bg-hover); border-radius: var(--radius-md); padding: 8px 12px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 12px; color: var(--text-secondary);">Broker:</span>
              <strong style="font-size: 13px; color: var(--text-primary);">${acc.name}</strong>
            </div>

            <div class="form-group">
              <label class="form-label" for="hm-search">Cerca nel Catalogo JustETF (Ticker o ISIN)</label>
              <input type="text" id="hm-search" class="apple-input" placeholder="Es. XEON, VWCE, SWDA, CSSPX, LU0290358497..." value="${existing ? existing.ticker : ''}" />
              <div id="hm-preview" style="${existing ? 'display: block;' : 'display: none;'} margin-top: 8px;">
                ${existing ? `
                  <div style="background: rgba(0, 113, 227, 0.08); border: 1px solid rgba(0, 113, 227, 0.25); border-radius: var(--radius-md); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
                    <div>
                      <strong style="color: ${existing.color || '#0071E3'}; font-size: 13px;">${existing.ticker}</strong>
                      <span class="badge badge--neutral" style="font-size: 10px; margin-left: 6px;">${existing.assetClassLabel || existing.assetClass}</span>
                      <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${existing.name}</div>
                    </div>
                    <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">✓ Riconosciuto</span>
                  </div>
                ` : ''}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="hm-name">Nome Strumento Completo</label>
              <input type="text" id="hm-name" class="apple-input" value="${existing ? existing.name : ''}" placeholder="Es. Vanguard FTSE All-World UCITS ETF" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="form-group">
                <label class="form-label" for="hm-ticker">Ticker Simbolo</label>
                <input type="text" id="hm-ticker" class="apple-input apple-input-mono" value="${existing ? existing.ticker : ''}" placeholder="Es. VWCE" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="hm-isin">Codice ISIN</label>
                <input type="text" id="hm-isin" class="apple-input apple-input-mono" value="${existing ? existing.isin : ''}" placeholder="Es. IE00BK5BQT80" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="hm-asset-class">Asset Class (Categoria JustETF)</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="hm-asset-class" class="apple-select apple-input">
                  ${assetClasses.map(ac => `
                    <option value="${ac.id}" ${existing && existing.assetClass === ac.id ? 'selected' : ''}>${ac.label}</option>
                  `).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="form-group">
                <label class="form-label" for="hm-shares">Numero Quote (opzionale)</label>
                <input type="number" id="hm-shares" class="apple-input" step="0.0001" placeholder="Es. 28.97" value="${existing && existing.shares ? existing.shares : ''}" />
              </div>
              <div class="form-group">
                <label class="form-label" for="hm-price">Prezzo per Quota (€)</label>
                <input type="number" id="hm-price" class="apple-input" step="0.01" placeholder="Es. 124.62" value="${existing && existing.price ? existing.price : ''}" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="hm-value">Controvalore Totale Attuale (€)</label>
              <input type="number" id="hm-value" class="apple-input apple-input-lg" step="0.01" placeholder="0,00" value="${existing ? existing.currentValue : ''}" required />
            </div>

            <div class="settings-toggle-row" style="margin-top: 8px; padding: 12px 14px; background: var(--bg-hover); border-radius: var(--radius-md);">
              <div class="toggle-label-group">
                <strong style="font-size: 13px;">Piano di Accumulo (PAC)</strong>
                <span style="font-size: 11px;">Includi questo strumento nella strategia di investimento periodica</span>
              </div>
              <label class="apple-switch">
                <input type="checkbox" id="hm-pac-toggle" ${existing && existing.isPac ? 'checked' : ''} />
                <span class="switch-slider"></span>
              </label>
            </div>

            <div class="form-group" id="hm-pac-val-group" style="${existing && existing.isPac ? 'display: block;' : 'display: none;'} margin-top: 10px;">
              <label class="form-label" for="hm-pac-amount">Quota Versamento Mensile (€/mese)</label>
              <input type="number" id="hm-pac-amount" class="apple-input" step="1" placeholder="Es. 200" value="${existing && existing.pacAmount ? existing.pacAmount : 200}" />
            </div>

            ${isEdit ? `
              <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-end;">
                <button class="apple-btn-secondary" id="hm-btn-delete" style="color: var(--apple-red); border-color: rgba(255, 59, 48, 0.3); font-size: 12px; padding: 6px 12px;">
                  Elimina Strumento
                </button>
              </div>
            ` : ''}

          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('holding-modal-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('holding-modal-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    const searchInput = document.getElementById('hm-search');
    const previewEl = document.getElementById('hm-preview');
    const nameInput = document.getElementById('hm-name');
    const tickerInput = document.getElementById('hm-ticker');
    const isinInput = document.getElementById('hm-isin');
    const assetClassSelect = document.getElementById('hm-asset-class');
    const pacToggle = document.getElementById('hm-pac-toggle');
    const pacValGroup = document.getElementById('hm-pac-val-group');
    const sharesInput = document.getElementById('hm-shares');
    const priceInput = document.getElementById('hm-price');
    const valueInput = document.getElementById('hm-value');

    let currentMeta = existing ? { color: existing.color, classLabel: existing.assetClassLabel } : null;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        const match = AssetCatalogService.lookupAsset(q);
        if (match) {
          currentMeta = match;
          tickerInput.value = match.ticker;
          if (match.isin) isinInput.value = match.isin;
          if (match.name) nameInput.value = match.name;
          if (match.assetClass) assetClassSelect.value = match.assetClass;
          if (previewEl) {
            previewEl.style.display = 'block';
            previewEl.innerHTML = `
              <div style="background: rgba(0, 113, 227, 0.08); border: 1px solid rgba(0, 113, 227, 0.25); border-radius: var(--radius-md); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <strong style="color: ${match.color}; font-size: 13px;">${match.ticker}</strong>
                  <span class="badge badge--neutral" style="font-size: 10px; margin-left: 6px;">${match.classLabel}</span>
                  <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${match.name} • TER ${match.ter}%</div>
                </div>
                <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">✓ Riconosciuto</span>
              </div>
            `;
          }
        }
      });
    }

    const recalcValue = () => {
      const s = parseFloat(sharesInput.value);
      const p = parseFloat(priceInput.value);
      if (!isNaN(s) && !isNaN(p) && s > 0 && p > 0) {
        valueInput.value = (s * p).toFixed(2);
      }
    };
    sharesInput?.addEventListener('input', recalcValue);
    priceInput?.addEventListener('input', recalcValue);

    pacToggle?.addEventListener('change', () => {
      if (pacValGroup) pacValGroup.style.display = pacToggle.checked ? 'block' : 'none';
    });

    document.getElementById('holding-modal-save')?.addEventListener('click', () => {
      const ticker = tickerInput.value.trim().toUpperCase();
      const name = nameInput.value.trim() || ticker;
      const isin = isinInput.value.trim().toUpperCase() || 'N/D';
      const assetClass = assetClassSelect.value;
      const classMeta = AssetCatalogService.getAssetClassMeta(assetClass);
      const shares = parseFloat(sharesInput.value) || 0;
      const price = parseFloat(priceInput.value) || 0;
      const currentValue = parseFloat(valueInput.value) || 0;
      const isPac = pacToggle.checked;
      const pacAmount = isPac ? (parseFloat(document.getElementById('hm-pac-amount')?.value) || 200) : 0;

      if (!ticker || currentValue <= 0) {
        alert('Inserisci almeno il simbolo ticker e un valore di investimento valido.');
        return;
      }

      const holdingPayload = {
        ticker,
        name,
        isin,
        assetClass,
        assetClassLabel: classMeta.label,
        shares,
        price,
        currentValue,
        color: classMeta.color,
        isPac,
        pacAmount,
        emergencyMonthsQuota: ticker === 'XEON' ? Math.min(currentValue, 5000) : 0,
        safeInvestmentQuota: ticker === 'XEON' ? Math.max(0, currentValue - 5000) : 0
      };

      if (isEdit) {
        financeStore.updateHolding(acc.id, existing.id, holdingPayload);
      } else {
        financeStore.addHolding(acc.id, holdingPayload);
      }

      close();
      this.render(container);
    });

    document.getElementById('hm-btn-delete')?.addEventListener('click', () => {
      if (confirm(`Sei sicuro di voler rimuovere ${existing.ticker} da ${acc.name}?`)) {
        financeStore.deleteHolding(acc.id, existing.id);
        close();
        this.render(container);
      }
    });
  }

  openBrokerCashModal(brokerId, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const acc = financeStore.findAccount(brokerId);
    if (!acc) return;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="broker-cash-overlay">
        <div class="apple-modal-sheet open" id="broker-cash-sheet" style="max-width: 440px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="bc-cancel">Annulla</button>
            <h3>Liquidità ${acc.name}</h3>
            <button class="modal-save-btn" id="bc-save">Salva</button>
          </div>
          <div class="modal-form">
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
              Modifica la liquidità non investita (cassa libera o remunerata) presente sul conto broker <strong>${acc.name}</strong>.
            </p>
            <div class="form-group">
              <label class="form-label" for="bc-cash-input">Liquidità Disponibile (€)</label>
              <input type="number" id="bc-cash-input" class="apple-input apple-input-lg" step="0.01" value="${acc.cashBalance || 0}" placeholder="0,00" required />
            </div>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('broker-cash-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('bc-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('bc-save')?.addEventListener('click', () => {
      const val = parseFloat(document.getElementById('bc-cash-input')?.value);
      if (!isNaN(val) && val >= 0) {
        financeStore.updateAccountCash(acc.id, val);
        close();
        this.render(container);
      }
    });
  }

  // =========================================================================
  // 2. VISTA PROFILO DI RISCHIO & TARGET ALLOCATION (Nuova R&D)
  // =========================================================================
  renderRischioView() {
    const stored = financeStore.getRiskProfile();
    const answers = stored.answers || { horizon: '2', tolerance: '2', goal: '2', knowledge: '2' };
    const templates = financeStore.getRiskProfileTemplates();

    // Calcolo punteggio
    const totalScore = parseInt(answers.horizon, 10) + parseInt(answers.tolerance, 10) + parseInt(answers.goal, 10) + parseInt(answers.knowledge, 10);
    let profileKey = 'bilanciato';
    if (totalScore <= 6) profileKey = 'conservativo';
    else if (totalScore <= 9) profileKey = 'bilanciato';
    else if (totalScore <= 11) profileKey = 'dinamico';
    else profileKey = 'aggressivo';

    const activeProfile = templates[profileKey];
    const { liquid, xeon, vwce, pensione, totalPortfolio } = this.getPortafoglioBreakdown();

    // Ripartizione attuale %
    const curLiquidPct = totalPortfolio > 0 ? (liquid / totalPortfolio) * 100 : 25;
    const curMonetarioPct = totalPortfolio > 0 ? (xeon / totalPortfolio) * 100 : 30;
    const curAzionarioPct = totalPortfolio > 0 ? (vwce / totalPortfolio) * 100 : 20;
    const curPensionePct = totalPortfolio > 0 ? (pensione / totalPortfolio) * 100 : 25;

    // Target amounts
    const targetLiquidAmount = totalPortfolio * (activeProfile.allocations.liquid / 100);
    const targetMonetarioAmount = totalPortfolio * (activeProfile.allocations.monetario / 100);
    const targetAzionarioAmount = totalPortfolio * (activeProfile.allocations.azionario / 100);
    const targetPensioneAmount = totalPortfolio * (activeProfile.allocations.pensione / 100);

    const deltaAzionario = targetAzionarioAmount - vwce;
    const deltaLiquid = targetLiquidAmount - liquid;
    const rebalanceData = financeStore.calculateSmartRebalance(this.freshCapital);

    return `
      <div class="risk-profile-layout">

        <!-- Questionario Apple MiFID Leggero -->
        <section class="risk-survey-card">
          <div class="section-card-header">
            <div>
              <h3>Questionario Profilo di Rischio</h3>
              <span class="card-subtitle">4 semplici quesiti per definire la tua propensione al rischio e l'asset allocation ideale</span>
            </div>
            <span class="profile-badge" style="background: ${activeProfile.color};">${activeProfile.title}</span>
          </div>

          <!-- Domanda 1 -->
          <div class="survey-question-block">
            <span class="survey-question-title">1. Orizzonte Temporale di Investimento</span>
            <div class="survey-options-grid" data-q="horizon">
              <button class="survey-option-btn ${answers.horizon === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Breve Termine (&lt; 2 anni)</span>
                <span class="survey-option-desc">Spese previste a breve, preferenza per liquidità e conti deposito.</span>
              </button>
              <button class="survey-option-btn ${answers.horizon === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Medio Termine (3 - 7 anni)</span>
                <span class="survey-option-desc">Progetti di vita futuri, equilibrio tra crescita e sicurezza.</span>
              </button>
              <button class="survey-option-btn ${answers.horizon === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Lungo Termine (&gt; 10 anni)</span>
                <span class="survey-option-desc">Orizzonte decennale per capitalizzare sull'interesse composto.</span>
              </button>
            </div>
          </div>

          <!-- Domanda 2 -->
          <div class="survey-question-block">
            <span class="survey-question-title">2. Tolleranza alla Volatilità di Mercato</span>
            <div class="survey-options-grid" data-q="tolerance">
              <button class="survey-option-btn ${answers.tolerance === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Bassa (Vendo o temo le perdite)</span>
                <span class="survey-option-desc">Un calo del -10% mi toglie il sonno, voglio proteggere il capitale.</span>
              </button>
              <button class="survey-option-btn ${answers.tolerance === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Moderata (Mantengo la calma)</span>
                <span class="survey-option-desc">So che i mercati oscillano e aspetto con serenità la ripresa.</span>
              </button>
              <button class="survey-option-btn ${answers.tolerance === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Elevata (Compro sui ribassi)</span>
                <span class="survey-option-desc">Considero i drawdown come sconti d'acquisto per accumulare quote.</span>
              </button>
            </div>
          </div>

          <!-- Domanda 3 -->
          <div class="survey-question-block">
            <span class="survey-question-title">3. Obiettivo Finanziario Primario</span>
            <div class="survey-options-grid" data-q="goal">
              <button class="survey-option-btn ${answers.goal === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Preservazione del Capitale</span>
                <span class="survey-option-desc">Batter l'inflazione senza rischiare perdite di valore nominale.</span>
              </button>
              <button class="survey-option-btn ${answers.goal === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Rendimento Equilibrato</span>
                <span class="survey-option-desc">Crescita costante moderando l'esposizione azionaria.</span>
              </button>
              <button class="survey-option-btn ${answers.goal === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Massima Espansione Patrimoniale</span>
                <span class="survey-option-desc">Crescita esponenziale a lungo raggio accettando forti oscillazioni.</span>
              </button>
            </div>
          </div>

          <!-- Domanda 4 -->
          <div class="survey-question-block" style="margin-bottom: 0;">
            <span class="survey-question-title">4. Esperienza e Conoscenza Finanziaria</span>
            <div class="survey-options-grid" data-q="knowledge">
              <button class="survey-option-btn ${answers.knowledge === '1' ? 'selected' : ''}" data-val="1">
                <span class="survey-option-title">Base (Conto & Libretto)</span>
                <span class="survey-option-desc">Esperienza limitata a conti correnti e strumenti bancari classici.</span>
              </button>
              <button class="survey-option-btn ${answers.knowledge === '2' ? 'selected' : ''}" data-val="2">
                <span class="survey-option-title">Buona (ETF, PAC, BTP)</span>
                <span class="survey-option-desc">Comprendo la diversificazione globale e la gestione automatizzata.</span>
              </button>
              <button class="survey-option-btn ${answers.knowledge === '3' ? 'selected' : ''}" data-val="3">
                <span class="survey-option-title">Avanzata (Asset Allocation Attiva)</span>
                <span class="survey-option-desc">Gestisco in autonomia strumenti complessi e ribilanciamenti.</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Scheda Profilo Assegnato & Target Allocation -->
        <section class="profile-result-card">
          <div class="profile-result-header">
            <div>
              <h3>Profilo: ${activeProfile.title}</h3>
              <p class="card-subtitle" style="max-width: 600px;">
                ${activeProfile.description}
              </p>
            </div>
            <div class="score-display-block">
              <span class="score-display-label">Punteggio Rilevato</span>
              <div class="score-display-value" style="color: ${activeProfile.color};">${totalScore} / 12</div>
            </div>
          </div>

          <!-- Confronto Allocazione: Reale vs Target -->
          <div class="allocation-compare-grid">
            
            <!-- Colonna 1: Allocazione Attuale Reale -->
            <div class="allocation-col-card">
              <div class="alloc-card-header">
                <span class="alloc-card-title">Allocazione Attuale Reale</span>
                <span class="alloc-card-total">${this.formatCurrency(totalPortfolio)}</span>
              </div>
              
              <div class="alloc-rows-list">
                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Liquidità Libera (Buddybank / Cassa)</span>
                    <span class="alloc-row-val">${curLiquidPct.toFixed(1)}% • ${this.formatCurrency(liquid)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curLiquidPct}%; background: #FF9500;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Monetario Overnight (XEON Fondo Emergenza)</span>
                    <span class="alloc-row-val">${curMonetarioPct.toFixed(1)}% • ${this.formatCurrency(xeon)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curMonetarioPct}%; background: #34C759;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Azionario Globale (VWCE PAC)</span>
                    <span class="alloc-row-val">${curAzionarioPct.toFixed(1)}% • ${this.formatCurrency(vwce)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curAzionarioPct}%; background: #0071E3;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Previdenza Complementare (Pensione)</span>
                    <span class="alloc-row-val">${curPensionePct.toFixed(1)}% • ${this.formatCurrency(pensione)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${curPensionePct}%; background: #AF52DE;"></div></div>
                </div>
              </div>
            </div>

            <!-- Colonna 2: Allocazione Target per il tuo Profilo -->
            <div class="allocation-col-card">
              <div class="alloc-card-header">
                <span class="alloc-card-title">Target Ideale (${activeProfile.badge})</span>
                <span class="alloc-card-total" style="color: ${activeProfile.color};">100% Target</span>
              </div>

              <div class="alloc-rows-list">
                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Liquidità Target (${activeProfile.allocations.liquid}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetLiquidAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.liquid}%; background: #FF9500;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Monetario Target (${activeProfile.allocations.monetario}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetMonetarioAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.monetario}%; background: #34C759;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Azionario Globale Target (${activeProfile.allocations.azionario}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetAzionarioAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.azionario}%; background: #0071E3;"></div></div>
                </div>

                <div class="alloc-row">
                  <div class="alloc-row-header">
                    <span class="alloc-row-name">Previdenza Target (${activeProfile.allocations.pensione}%)</span>
                    <span class="alloc-row-val">${this.formatCurrency(targetPensioneAmount)}</span>
                  </div>
                  <div class="health-bar-track"><div class="health-bar-fill" style="width: ${activeProfile.allocations.pensione}%; background: #AF52DE;"></div></div>
                </div>
              </div>
            </div>

          </div>

          <!-- Box Ribilanciamento & Consiglio Operativo -->
          <div class="rebalance-advice-box">
            <div class="rebalance-advice-inner">
              <span class="rebalance-advice-icon" style="color: var(--apple-blue); display: inline-flex;">${getIcon('balance', 22)}</span>
              <div class="rebalance-advice-content">
                <h4 class="rebalance-advice-title">Piano di Ribilanciamento Consigliato</h4>
                <p class="rebalance-advice-desc">
                  ${deltaAzionario > 0 
                    ? `Per allineare il tuo portafoglio al profilo <strong>${activeProfile.title}</strong>, hai un gap azionario di <strong class="privacy-mask">${this.formatCurrency(deltaAzionario)}</strong> su VWCE. Attualmente hai <strong class="privacy-mask">${this.formatCurrency(Math.abs(deltaLiquid))}</strong> di liquidità in eccedenza che puoi convogliare sul PAC o con versamenti una tantum.`
                    : `La tua esposizione azionaria è perfettamente in linea o superiore al target. Mantieni la regolarità del tuo PAC mensile da 200 €.`}
                </p>
                <div class="rebalance-advice-pills">
                  ${activeProfile.instruments.map(inst => `
                    <span class="rebalance-pill">
                      ✓ ${inst}
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Calcolatore Operativo Ribilanciamento con Nuova Liquidità -->
          <div class="smart-rebalance-card">
            <div class="smart-rebalance-header">
              <div class="smart-rebalance-header-left">
                <span class="badge-rebalance">Smart Rebalance Engine</span>
                <h4 class="smart-rebalance-title">Allocazione Nuova Liquidità & Ordini Broker</h4>
                <p class="smart-rebalance-desc">
                  Calcola come ripartire nuovi versamenti per riallineare il portafoglio ai target MiFID <strong>${activeProfile.title}</strong>, senza vendere asset né incorrere in tassazione su plusvalenze.
                </p>
              </div>
              <div class="rebalance-input-group">
                <label for="input-fresh-capital" class="rebalance-input-label">Nuova Liquidità da Ripartire</label>
                <div class="rebalance-input-wrap">
                  <span class="currency-symbol">€</span>
                  <input type="number" id="input-fresh-capital" class="rebalance-input-field" value="${this.freshCapital}" min="50" step="50" />
                </div>
                <div class="rebalance-quick-pills">
                  <button type="button" class="rebalance-quick-btn ${this.freshCapital === 250 ? 'active' : ''}" data-amt="250">+250 €</button>
                  <button type="button" class="rebalance-quick-btn ${this.freshCapital === 500 ? 'active' : ''}" data-amt="500">+500 €</button>
                  <button type="button" class="rebalance-quick-btn ${this.freshCapital === 1000 ? 'active' : ''}" data-amt="1000">+1.000 €</button>
                </div>
              </div>
            </div>

            <!-- Ripartizione Ordini -->
            <div class="rebalance-orders-grid" id="rebalance-orders-grid">
              ${this.renderRebalanceOrderCards(rebalanceData)}
            </div>

            <div class="rebalance-footer-action">
              <div class="rebalance-instruction-text">
                <span class="instruction-icon" style="color: var(--apple-blue); display: inline-flex;">${getIcon('sparkle', 16)}</span>
                <span id="rebalance-instruction-msg">${rebalanceData.summaryInstruction}</span>
              </div>
              <button type="button" class="btn-copy-broker" id="btn-copy-broker-orders">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span id="copy-broker-text">Copia Istruzioni Broker</span>
              </button>
            </div>
          </div>

        </section>

      </div>
    `;
  }

  renderRebalanceOrderCards(rebalanceData) {
    if (!rebalanceData || !rebalanceData.allocations || rebalanceData.allocations.length === 0) {
      return `<p class="empty-state-text">Nessun ordine necessario con questo importo.</p>`;
    }
    return rebalanceData.allocations.map(item => `
      <div class="rebalance-order-item" style="border-left-color: ${item.color};">
        <div class="order-item-header">
          <span class="order-item-ticker" style="background: ${item.color}15; color: ${item.color};">${item.ticker}</span>
          <span class="order-item-action">ORDINE ACQUISTO</span>
        </div>
        <div class="order-item-name">${item.asset}</div>
        <div class="order-item-amount privacy-mask">${this.formatCurrency(item.amount)}</div>
        <div class="order-item-pct">
          Quota: ${Math.round((item.amount / rebalanceData.freshCapital) * 100)}% del versamento
        </div>
      </div>
    `).join('');
  }

  bindRischioEvents(container) {
    container.querySelectorAll('.survey-options-grid').forEach(grid => {
      const q = grid.dataset.q;
      grid.querySelectorAll('.survey-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const val = btn.dataset.val;
          const stored = financeStore.getRiskProfile();
          const answers = stored.answers || {};
          answers[q] = val;

          // Ricalcolo profilo
          const totalScore = parseInt(answers.horizon || '2', 10) + parseInt(answers.tolerance || '2', 10) + parseInt(answers.goal || '2', 10) + parseInt(answers.knowledge || '2', 10);
          let pKey = 'bilanciato';
          if (totalScore <= 6) pKey = 'conservativo';
          else if (totalScore <= 9) pKey = 'bilanciato';
          else if (totalScore <= 11) pKey = 'dinamico';
          else pKey = 'aggressivo';

          financeStore.saveRiskProfile(answers, pKey);
          this.render(container);
        });
      });
    });

    // Smart Rebalance Event Listeners
    const inputCapital = container.querySelector('#input-fresh-capital');
    const ordersGrid = container.querySelector('#rebalance-orders-grid');
    const msgEl = container.querySelector('#rebalance-instruction-msg');
    const quickBtns = container.querySelectorAll('.rebalance-quick-btn');
    const copyBtn = container.querySelector('#btn-copy-broker-orders');

    const updateRebalanceUI = (val) => {
      this.freshCapital = Math.max(0, parseFloat(val) || 0);
      const rebal = financeStore.calculateSmartRebalance(this.freshCapital);
      if (ordersGrid) ordersGrid.innerHTML = this.renderRebalanceOrderCards(rebal);
      if (msgEl) msgEl.textContent = rebal.summaryInstruction;
      quickBtns.forEach(b => {
        b.classList.toggle('active', parseFloat(b.dataset.amt) === this.freshCapital);
      });
    };

    if (inputCapital) {
      inputCapital.addEventListener('input', (e) => {
        updateRebalanceUI(e.target.value);
      });
    }

    quickBtns.forEach(b => {
      b.addEventListener('click', () => {
        const amt = parseFloat(b.dataset.amt);
        if (inputCapital) inputCapital.value = amt;
        updateRebalanceUI(amt);
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const rebal = financeStore.calculateSmartRebalance(this.freshCapital);
        const textToCopy = [
          `=== PIANO DI RIBILANCIAMENTO SMART ===`,
          `Capitale Fresco da Investire: ${this.formatCurrency(this.freshCapital)}`,
          `Profilo: ${rebal.profileTitle} (${rebal.profileBadge})`,
          `Data: ${new Date().toLocaleDateString('it-IT')}`,
          ``,
          `ORDINI DA ESEGUIRE SUL BROKER:`,
          ...rebal.allocations.map(a => `• ACQUISTA ${a.ticker} (${a.asset}): ${this.formatCurrency(a.amount)}`),
          ``,
          `Nota: ${rebal.summaryInstruction}`
        ].join('\n');

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            const span = copyBtn.querySelector('#copy-broker-text');
            if (span) {
              const orig = span.textContent;
              span.textContent = '✓ Istruzioni Copiate!';
              setTimeout(() => { span.textContent = orig; }, 2500);
            }
          }).catch(() => {
            alert(textToCopy);
          });
        } else {
          alert(textToCopy);
        }
      });
    }
  }

  // =========================================================================
  // 3. VISTA OBIETTIVI DI RISPARMIO (Saving Goals)
  // =========================================================================
  renderObiettiviView() {
    const goals = financeStore.getGoals();
    const sum = financeStore.summary;
    const monthlySavings = sum.savingsAmount || 400;

    let totalTarget = 0;
    let totalCurrent = 0;
    let totalMonthlyQuota = 0;

    const enrichedGoals = goals.map(g => {
      totalTarget += g.targetAmount;
      totalCurrent += g.currentAmount;

      const pct = Math.min(100, Math.round((g.currentAmount / (g.targetAmount || 1)) * 100));
      const remaining = Math.max(0, g.targetAmount - g.currentAmount);

      // Calcolo mesi mancanti alla deadline
      let monthsLeft = 12;
      if (g.deadline) {
        const [dy, dm] = g.deadline.split('-').map(Number);
        const now = new Date();
        const diffMonths = (dy - now.getFullYear()) * 12 + (dm - (now.getMonth() + 1));
        monthsLeft = Math.max(1, diffMonths);
      }

      const monthlyQuota = remaining / monthsLeft;
      totalMonthlyQuota += monthlyQuota;

      return {
        ...g,
        pct,
        remaining,
        monthsLeft,
        monthlyQuota
      };
    });

    const isFeasible = monthlySavings >= totalMonthlyQuota;

    return `
      <div class="goals-pane investimenti-subview-stack">

        <!-- KPI Strip Obiettivi -->
        <div class="cat-kpis-grid">
          <div class="cat-kpi-card">
            <span class="cat-kpi-label">Totale Accumulato</span>
            <span class="cat-stat-num income-color">${this.formatCurrency(totalCurrent)}</span>
            <span class="cat-stat-sub">Su target complessivo di <span class="privacy-mask">${this.formatCurrency(totalTarget)}</span></span>
          </div>

          <div class="cat-kpi-card">
            <span class="cat-kpi-label">Quota Mensile Necessaria</span>
            <span class="cat-stat-num accent">${this.formatCurrency(totalMonthlyQuota)}/mese</span>
            <span class="cat-stat-sub">Per completare tutti i target in tempo</span>
          </div>

          <div class="cat-kpi-card">
            <span class="cat-kpi-label">Fattibilità Cash Flow</span>
            <span class="cat-stat-num" style="color: ${isFeasible ? 'var(--apple-green)' : 'var(--apple-orange)'};">
              ${isFeasible ? 'Sostenibile' : 'Attenzione'}
            </span>
            <span class="cat-stat-sub">Risparmio medio attuale: <span class="privacy-mask">${this.formatCurrency(monthlySavings)}/mese</span></span>
          </div>
        </div>

        <!-- Griglia Cards Obiettivi -->
        <div class="goals-grid">
          ${enrichedGoals.map(g => `
            <div class="goal-card" data-id="${g.id}">
              <div class="goal-header">
                <div class="goal-title-group">
                  <span class="goal-emoji" style="color: var(--apple-blue); display: inline-flex;">${getIcon('target', 20)}</span>
                  <div class="goal-titles">
                    <span class="goal-name">${g.name}</span>
                    <span class="goal-account">Conto: ${g.account}</span>
                  </div>
                </div>
                <button class="apple-btn-delete-inline btn-delete-goal" data-id="${g.id}" title="Elimina obiettivo">&times;</button>
              </div>

              <div class="goal-progress-section">
                <div class="goal-amounts-row">
                  <span class="goal-val">${this.formatCurrency(g.currentAmount)}</span>
                  <span class="goal-target-val">di ${this.formatCurrency(g.targetAmount)} (${g.pct}%)</span>
                </div>

                <div class="goal-progress-bar">
                  <div class="goal-progress-fill" style="width: ${g.pct}%;"></div>
                </div>

                <div class="goal-footer">
                  <span>Scadenza: ${g.deadline || 'Aperta'} (${g.monthsLeft} mesi)</span>
                  <span class="goal-rate-pill">+${this.formatCurrency(g.monthlyQuota)}/mese</span>
                </div>
              </div>

              <div class="goal-deposit-bar">
                <input type="number" step="50" class="apple-input input-goal-add" placeholder="+€ Versa importo" />
                <button class="apple-btn-secondary btn-goal-deposit" data-id="${g.id}">Versa</button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  bindObiettiviEvents(container) {
    const btnAdd = document.getElementById('btn-add-goal');
    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        this.openGoalModal(container);
      });
    }

    container.querySelectorAll('.btn-delete-goal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        if (confirm('Sei sicuro di voler rimuovere questo obiettivo?')) {
          financeStore.deleteGoal(id);
          this.render(container);
        }
      });
    });

    container.querySelectorAll('.btn-goal-deposit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const card = container.querySelector(`.goal-card[data-id="${id}"]`);
        const input = card?.querySelector('.input-goal-add');
        if (input && input.value) {
          const addVal = parseFloat(input.value) || 0;
          const goals = financeStore.getGoals();
          const target = goals.find(g => g.id === id);
          if (target && addVal > 0) {
            financeStore.updateGoal(id, { currentAmount: target.currentAmount + addVal });
            this.render(container);
          }
        }
      });
    });
  }

  openGoalModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const accounts = financeStore.getAccounts();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="goal-modal-overlay">
        <div class="apple-modal-sheet open" id="goal-modal-sheet" style="max-width: 460px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="goal-modal-cancel">Annulla</button>
            <h3>Nuovo Obiettivo</h3>
            <button class="modal-save-btn" id="goal-modal-save">Salva</button>
          </div>
          <form class="modal-form" id="add-goal-form" onsubmit="return false;">
            <div class="form-group">
              <label class="form-label" for="goal-name-input">Nome Obiettivo</label>
              <input type="text" id="goal-name-input" class="apple-input" placeholder="Es. Vacanze Tokyo, Fondo Casa..." required />
            </div>

            <div class="form-group">
              <label class="form-label">Importo Target Desiderato (€)</label>
              <input type="number" id="goal-target-input" class="apple-input apple-input-lg" placeholder="2.000,00" step="50" required />
            </div>

            <div class="form-group">
              <label class="form-label">Importo Attualmente Risparmiato (€)</label>
              <input type="number" id="goal-current-input" class="apple-input" placeholder="0,00" step="50" value="0" />
            </div>

            <div class="form-group">
              <label class="form-label">Data Scadenza Obiettivo</label>
              <input type="date" id="goal-deadline-input" class="apple-input" />
            </div>

            <div class="form-group">
              <label class="form-label">Conto / Salvadanaio Associato</label>
              <div class="apple-select-wrapper">
                <select id="goal-account-select" class="apple-select">
                  ${accounts.map(a => `<option value="${a.name}">${a.name}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    const overlay = document.getElementById('goal-modal-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('goal-modal-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('goal-modal-save')?.addEventListener('click', () => {
      const emoji = '';
      const name = document.getElementById('goal-name-input')?.value.trim();
      const targetAmount = parseFloat(document.getElementById('goal-target-input')?.value) || 0;
      const currentAmount = parseFloat(document.getElementById('goal-current-input')?.value) || 0;
      const deadline = document.getElementById('goal-deadline-input')?.value || '';
      const account = document.getElementById('goal-account-select')?.value || 'Buddybank';

      if (!name || targetAmount <= 0) {
        alert('Inserisci un nome e un importo target valido.');
        return;
      }

      financeStore.addGoal({ emoji, name, targetAmount, currentAmount, deadline, account });
      close();
      this.render(container);
    });
  }

  // =========================================================================
  // CHARTS INITIALIZATION (Portafoglio & PAC)
  // =========================================================================
  initAllocationChart() {
    const canvas = document.getElementById('investmentsDonutCanvas');
    if (!canvas || !window.Chart) return;

    const { allocationData } = this.getPortafoglioBreakdown();

    if (this.allocationChart) {
      try { this.allocationChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    this.allocationChart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: allocationData.map(a => a.name),
        datasets: [{
          data: allocationData.map(a => a.amount),
          backgroundColor: allocationData.map(a => a.color),
          borderWidth: 2,
          borderColor: document.body.classList.contains('dark-theme') ? '#1C1C1E' : '#FFFFFF',
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
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${this.formatCurrency(ctx.parsed)}`
            }
          }
        }
      }
    });
  }

  calculatePacSeries() {
    const { initialCapital, monthlyDeposit, annualReturn, years } = this.pacParams;
    const monthlyRate = Math.pow(1 + (annualReturn / 100), 1 / 12) - 1;
    const totalMonths = years * 12;

    const labels = [];
    const totalSeries = [];
    const investedSeries = [];

    let currentTotal = initialCapital;
    let currentInvested = initialCapital;

    labels.push('Oggi');
    totalSeries.push(Math.round(currentTotal));
    investedSeries.push(Math.round(currentInvested));

    for (let m = 1; m <= totalMonths; m++) {
      currentTotal = (currentTotal + monthlyDeposit) * (1 + monthlyRate);
      currentInvested += monthlyDeposit;

      if (m % 12 === 0) {
        labels.push(`Anno ${m / 12}`);
        totalSeries.push(Math.round(currentTotal));
        investedSeries.push(Math.round(currentInvested));
      }
    }

    const finalValue = Math.round(currentTotal);
    const finalInvested = Math.round(currentInvested);
    const finalInterest = Math.max(0, finalValue - finalInvested);

    return { labels, totalSeries, investedSeries, finalValue, finalInvested, finalInterest };
  }

  initPacChart() {
    const canvas = document.getElementById('pacSimulationCanvas');
    if (!canvas || !window.Chart) return;

    if (this.pacChart) {
      try { this.pacChart.destroy(); } catch (e) {}
    }

    const sim = this.calculatePacSeries();

    const valFinEl = document.getElementById('kpi-valore-finale');
    const capVersEl = document.getElementById('kpi-capitale-versato');
    const intGenEl = document.getElementById('kpi-interessi');

    if (valFinEl) valFinEl.textContent = this.formatCurrency(sim.finalValue);
    if (capVersEl) capVersEl.textContent = this.formatCurrency(sim.finalInvested);
    if (intGenEl) intGenEl.textContent = '+' + this.formatCurrency(sim.finalInterest);

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const ctx = canvas.getContext('2d');

    this.pacChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: sim.labels,
        datasets: [
          {
            label: 'Capitale Versato',
            data: sim.investedSeries,
            borderColor: '#8E8E93',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0.2
          },
          {
            label: 'Valore Totale Composto',
            data: sim.totalSeries,
            borderColor: '#34C759',
            backgroundColor: 'rgba(52, 199, 89, 0.12)',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.35
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
              font: { size: 11 },
              maxTicksLimit: 6,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  updatePacSimulation() {
    if (!this.pacChart) return;
    const sim = this.calculatePacSeries();

    const valFinEl = document.getElementById('kpi-valore-finale');
    const capVersEl = document.getElementById('kpi-capitale-versato');
    const intGenEl = document.getElementById('kpi-interessi');

    if (valFinEl) valFinEl.textContent = this.formatCurrency(sim.finalValue);
    if (capVersEl) capVersEl.textContent = this.formatCurrency(sim.finalInvested);
    if (intGenEl) intGenEl.textContent = '+' + this.formatCurrency(sim.finalInterest);

    this.pacChart.data.labels = sim.labels;
    this.pacChart.data.datasets[0].data = sim.investedSeries;
    this.pacChart.data.datasets[1].data = sim.totalSeries;
    this.pacChart.update('none');
  }

  // =========================================================================
  // 4. VISTA SIMULATORE F.I.R.E. & CROSSOVER POINT
  // =========================================================================
  renderFireView() {
    const fire = financeStore.calculateFireMetrics(this.fireParams);
    const monthlyPassive = fire.currentPassiveIncome / 12;

    return `
      <div class="investimenti-subview-stack">
        <!-- Hero Apple Card -->
        <section class="card highlight-card" style="background: linear-gradient(135deg, rgba(175, 82, 222, 0.08) 0%, rgba(0, 113, 227, 0.04) 100%);">
          <div class="card__header">
            <span class="card__title" title="Financial Independence, Retire Early">Financial Independence, Retire Early</span>
            <span class="badge badge--purple">F.I.R.E. Engine</span>
          </div>
          <div class="card__value" style="font-size: 24px;">Simulatore F.I.R.E. & Crossover Point</div>
          <div class="card__body">
            <p style="font-size: var(--text-base); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
              Calcola la tua libertà finanziaria basata sulla regola del 4% (Trinity Study). Il Crossover Point è il momento in cui i rendimenti passivi del tuo capitale coprono interamente le tue spese di vita senza intaccare il patrimonio reale.
            </p>
          </div>
          <div class="card__footer">
            <span class="trend-context">Regola del 4% Safe Withdrawal Rate (SWR)</span>
          </div>
        </section>

        <!-- KPI Strip Spec Apple (Uniform 4-Zone Canonical Structure) -->
        <section class="grid-4">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Numero F.I.R.E. Obiettivo">Numero F.I.R.E.</span>
              <div class="kpi-icon-badge balance">${getIcon('target', 16)}</div>
            </div>
            <div class="card__value privacy-mask" id="fire-val-number">${this.formatCurrency(fire.fireNumber)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Spese stimate</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(fire.annualSpending)}/anno</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">25x spesa annuale</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Rendita Mensile Passiva Stimata">Rendita Passiva</span>
              <div class="kpi-icon-badge income">${getIcon('income', 16)}</div>
            </div>
            <div class="card__value privacy-mask" id="fire-val-passive" style="color: var(--apple-blue);">${this.formatCurrency(monthlyPassive)} / mese</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Da patrimonio</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(fire.netWorth)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Generata da Net Worth</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Anni al Crossover Point">Crossover Point</span>
              <div class="kpi-icon-badge expense">⏳</div>
            </div>
            <div class="card__value ${fire.yearsToFire !== '> 35' ? 'fire-highlight' : ''}" id="fire-val-years" style="color: var(--apple-orange);">
              ${fire.yearsToFire === '> 35' ? '> 35 anni' : fire.yearsToFire + ' anni'}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Traguardo</span>
                <span class="kv__value">Rendita ≥ Spese</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Rendita passiva netta</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Avanzamento Globale F.I.R.E.">Avanzamento</span>
              <span class="badge badge--purple">${fire.fireProgressPct}%</span>
            </div>
            <div class="card__value" id="fire-val-progress" style="color: var(--apple-purple);">${fire.fireProgressPct}%</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Progresso</span>
                  <span class="meter__val">${fire.fireProgressPct}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, fire.fireProgressPct)}%; background: var(--apple-purple);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Verso l'indipendenza totale</span>
            </div>
          </div>
        </section>

        <!-- Barra di Avanzamento F.I.R.E. Apple Glass (Canonical Card) -->
        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Stato di Avanzamento Patrimonio vs FIRE Number">Avanzamento Patrimonio vs F.I.R.E.</span>
            <span class="badge badge--info" id="fire-track-pct">${fire.fireProgressPct}% Completato</span>
          </div>
          <div class="card__body">
            <div class="meter-row">
              <div class="meter" style="height: 10px;">
                <div class="meter__fill" id="fire-track-fill" style="width: ${Math.min(100, fire.fireProgressPct)}%; background: linear-gradient(90deg, var(--apple-blue), var(--apple-purple));"></div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2); font-size: var(--text-sm);">
              <span>Patrimonio Reale: <strong class="privacy-mask">${this.formatCurrency(fire.netWorth)}</strong></span>
              <span>Target 100%: <strong class="privacy-mask" id="fire-legend-target">${this.formatCurrency(fire.fireNumber)}</strong></span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Aggiornato in tempo reale con i parametri selezionati</span>
          </div>
        </div>

        <!-- 3 Varianti F.I.R.E. (Canonical Cards in Grid Auto) -->
        <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Lean F.I.R.E. - Stile Minimalista">LEAN F.I.R.E.</span>
              <span class="badge badge--positive">Minimal</span>
            </div>
            <div class="card__value privacy-mask" id="fire-variant-lean">${this.formatCurrency(fire.leanFire)}</div>
            <div class="card__body">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
                Spese ridotte del 30% (${this.formatCurrency(this.fireParams.monthlyExpense * 0.70)}/mese). Stile di vita minimalista ed essenziale.
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context">-30% spese ordinarie</span>
            </div>
          </div>

          <div class="card highlight-card">
            <div class="card__header">
              <span class="card__title" title="Standard F.I.R.E. - Stile Corrente">STANDARD F.I.R.E.</span>
              <span class="badge badge--info">Target Attuale</span>
            </div>
            <div class="card__value privacy-mask" id="fire-variant-standard" style="color: var(--apple-blue);">${this.formatCurrency(fire.fireNumber)}</div>
            <div class="card__body">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
                Spese stabili al 100% (${this.formatCurrency(this.fireParams.monthlyExpense)}/mese). Mantiene inalterato il tenore di vita attuale.
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context">100% tenore attuale</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Fat F.I.R.E. - Stile Agiato">FAT F.I.R.E.</span>
              <span class="badge badge--purple">Agiato</span>
            </div>
            <div class="card__value privacy-mask" id="fire-variant-fat" style="color: var(--apple-purple);">${this.formatCurrency(fire.fatFire)}</div>
            <div class="card__body">
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: var(--leading-normal); margin: 0;">
                Spese maggiorate (+35% a ${this.formatCurrency(this.fireParams.monthlyExpense * 1.35)}/mese). Ampio margine per viaggi, hobby e comfort.
              </p>
            </div>
            <div class="card__footer">
              <span class="trend-context">+35% margine extra</span>
            </div>
          </div>
        </section>

        <!-- Pannello Interattivo: Sliders & Crossover Chart -->
        <div class="fire-interactive-grid">
          <!-- Colonna Controlli Parametri -->
          <div class="fire-controls-card">
            <h4 class="fire-controls-title">Parametri di Simulazione</h4>
            
            <div class="fire-slider-group">
              <div class="slider-header">
                <label for="fire-slider-expense">Spesa Mensile Desiderata</label>
                <span class="slider-val" id="val-fire-expense">${this.formatCurrency(this.fireParams.monthlyExpense)}</span>
              </div>
              <input type="range" id="fire-slider-expense" min="800" max="3500" step="50" value="${this.fireParams.monthlyExpense}" />
            </div>

            <div class="fire-slider-group">
              <div class="slider-header">
                <label for="fire-slider-swr">Safe Withdrawal Rate (SWR)</label>
                <span class="slider-val" id="val-fire-swr">${this.fireParams.swr.toFixed(2)}%</span>
              </div>
              <input type="range" id="fire-slider-swr" min="3.0" max="5.0" step="0.25" value="${this.fireParams.swr}" />
              <span class="slider-hint">Standard Trinity Study: 4.0%</span>
            </div>

            <div class="fire-slider-group">
              <div class="slider-header">
                <label for="fire-slider-return">Rendimento Lordo Atteso</label>
                <span class="slider-val" id="val-fire-return">${this.fireParams.annualReturn.toFixed(1)}%</span>
              </div>
              <input type="range" id="fire-slider-return" min="4.0" max="10.0" step="0.5" value="${this.fireParams.annualReturn}" />
              <span class="slider-hint">Media storica azionario globale: 7-8%</span>
            </div>

            <div class="fire-slider-group" style="margin-bottom: 0;">
              <div class="slider-header">
                <label for="fire-slider-inflation">Inflazione Media Stimata</label>
                <span class="slider-val" id="val-fire-inflation">${this.fireParams.inflation.toFixed(1)}%</span>
              </div>
              <input type="range" id="fire-slider-inflation" min="1.0" max="4.0" step="0.5" value="${this.fireParams.inflation}" />
              <span class="slider-hint">Target BCE a lungo termine: 2.0%</span>
            </div>
          </div>

          <!-- Colonna Grafico Crossover Point -->
          <div class="fire-chart-card">
            <div class="fire-chart-header">
              <div>
                <h4 class="fire-chart-title">Curva Crossover Point (Rendita vs Spese)</h4>
                <p class="fire-chart-sub">Proiezione a 35 anni con rendimento reale netto e PAC attivo</p>
              </div>
              <div class="fire-chart-legend-pills">
                <span class="pill-crossover-rendita">Rendita Passiva</span>
                <span class="pill-crossover-spesa">Spesa Annua</span>
              </div>
            </div>
            <div class="fire-canvas-container" style="position: relative; height: 300px;">
              <canvas id="fireCrossoverChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Consiglio Apple HIG -->
        <div class="fire-note-box">
          <div class="fire-note-inner">
            <span class="fire-note-icon" style="color: var(--apple-blue); display: inline-flex;">${getIcon('sparkle', 16)}</span>
            <p class="fire-note-text">
              <strong>Principio del Crossover Point:</strong> quando la rendita passiva (curva verde) supera la spesa annua di mantenimento (curva rossa tratteggiata), raggiungi l'indipendenza finanziaria piena. Continuando ad alimentare il PAC su VWCE e preservando il fondo di emergenza XEON, acceleri la data del crossover.
            </p>
          </div>
        </div>

      </div>
    `;
  }

  bindFireEvents(container) {
    const sExpense = container.querySelector('#fire-slider-expense');
    const sSwr = container.querySelector('#fire-slider-swr');
    const sReturn = container.querySelector('#fire-slider-return');
    const sInflation = container.querySelector('#fire-slider-inflation');

    const updateFromSliders = () => {
      if (sExpense) this.fireParams.monthlyExpense = parseFloat(sExpense.value);
      if (sSwr) this.fireParams.swr = parseFloat(sSwr.value);
      if (sReturn) this.fireParams.annualReturn = parseFloat(sReturn.value);
      if (sInflation) this.fireParams.inflation = parseFloat(sInflation.value);

      const valExp = container.querySelector('#val-fire-expense');
      const valSwr = container.querySelector('#val-fire-swr');
      const valRet = container.querySelector('#val-fire-return');
      const valInf = container.querySelector('#val-fire-inflation');

      if (valExp) valExp.textContent = this.formatCurrency(this.fireParams.monthlyExpense);
      if (valSwr) valSwr.textContent = this.fireParams.swr.toFixed(2) + '%';
      if (valRet) valRet.textContent = this.fireParams.annualReturn.toFixed(1) + '%';
      if (valInf) valInf.textContent = this.fireParams.inflation.toFixed(1) + '%';

      this.updateFireSimulation(container);
    };

    if (sExpense) sExpense.addEventListener('input', updateFromSliders);
    if (sSwr) sSwr.addEventListener('input', updateFromSliders);
    if (sReturn) sReturn.addEventListener('input', updateFromSliders);
    if (sInflation) sInflation.addEventListener('input', updateFromSliders);
  }

  initFireChart() {
    const canvas = document.getElementById('fireCrossoverChart');
    if (!canvas || typeof window.Chart === 'undefined') return;

    if (this.fireChart) {
      try { this.fireChart.destroy(); } catch (e) {}
      this.fireChart = null;
    }

    const fire = financeStore.calculateFireMetrics(this.fireParams);
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const ctx = canvas.getContext('2d');

    const labels = fire.series.map(s => s.label);
    const passiveData = fire.series.map(s => s.passiveIncome);
    const spendingData = fire.series.map(s => s.annualSpending);

    this.fireChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Spesa Annua di Mantenimento',
            data: spendingData,
            borderColor: '#FF3B30',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0
          },
          {
            label: 'Rendita Passiva Annua Netta',
            data: passiveData,
            borderColor: '#34C759',
            backgroundColor: 'rgba(52, 199, 89, 0.12)',
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.35
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
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
              font: { size: 11 },
              maxTicksLimit: 7,
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: { color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)' },
            ticks: {
              color: isDark ? '#98989D' : '#86868B',
              font: { size: 11 },
              callback: (v) => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  updateFireSimulation(container) {
    const fire = financeStore.calculateFireMetrics(this.fireParams);
    const monthlyPassive = fire.currentPassiveIncome / 12;

    const valNum = container.querySelector('#fire-val-number');
    const valPas = container.querySelector('#fire-val-passive');
    const valYrs = container.querySelector('#fire-val-years');
    const valPrg = container.querySelector('#fire-val-progress');
    const trkPct = container.querySelector('#fire-track-pct');
    const trkFil = container.querySelector('#fire-track-fill');
    const legTar = container.querySelector('#fire-legend-target');
    const varLean = container.querySelector('#fire-variant-lean');
    const varStd = container.querySelector('#fire-variant-standard');
    const varFat = container.querySelector('#fire-variant-fat');

    if (valNum) valNum.textContent = this.formatCurrency(fire.fireNumber);
    if (valPas) valPas.textContent = this.formatCurrency(monthlyPassive) + ' / mese';
    if (valYrs) {
      valYrs.textContent = fire.yearsToFire === '> 35' ? '> 35 anni' : fire.yearsToFire + ' anni';
      valYrs.className = `fire-kpi-value ${fire.yearsToFire !== '> 35' ? 'fire-highlight' : ''}`;
    }
    if (valPrg) valPrg.textContent = fire.fireProgressPct + '%';
    if (trkPct) trkPct.textContent = fire.fireProgressPct + '% Completato';
    if (trkFil) trkFil.style.width = Math.min(100, fire.fireProgressPct) + '%';
    if (legTar) legTar.textContent = this.formatCurrency(fire.fireNumber);
    if (varLean) varLean.textContent = this.formatCurrency(fire.leanFire);
    if (varStd) varStd.textContent = this.formatCurrency(fire.fireNumber);
    if (varFat) varFat.textContent = this.formatCurrency(fire.fatFire);

    if (this.fireChart) {
      this.fireChart.data.labels = fire.series.map(s => s.label);
      this.fireChart.data.datasets[0].data = fire.series.map(s => s.annualSpending);
      this.fireChart.data.datasets[1].data = fire.series.map(s => s.passiveIncome);
      this.fireChart.update('none');
    }
  }
}

// === js/components/storicoView.js ===
/**
 * Apple Design System - Patrimonio & Storico View Component (Ristrutturato Esecutivo)
 * Focus: Semplicità, Intuitività e Precisione
 * 1. Hero Card: Patrimonio Netto Effettivo ("Zero Allucinazioni", escluso Fondo Pensione)
 * 2. Grafico Temporale Evoluzione Patrimonio Effettivo (in primo piano, touch-friendly)
 * 3. Card Mensili Snelle per consultazione da mobile e desktop
 * 4. Tracciamento Separato Previdenza a Lungo Termine (Fondo Pensione)
 * 5. Strumenti: Chiusura Mese, Report Fiscale, Backup JSON/CSV
 */


class StoricoView {
  constructor() {
    this.historyChart = null;
    this.pensionChart = null;
    const availableYears = financeStore.getAvailableYears();
    this.selectedYear = availableYears[0] || String(new Date().getFullYear());
    this.activeSubtab = 'panoramica'; // 'panoramica' | 'dettaglio'
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      useGrouping: 'always'
    }).format(value || 0);
  }

  destroyCharts() {
    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
      this.historyChart = null;
    }
    if (this.pensionChart) {
      try { this.pensionChart.destroy(); } catch (e) {}
      this.pensionChart = null;
    }
  }

  render(container) {
    if (!container) return;
    this.destroyCharts();

    const summary = financeStore.summary;
    const availableYears = financeStore.getAvailableYears();
    const defaultYear = availableYears[0] || String(new Date().getFullYear());
    if (this.selectedYear !== 'all' && !availableYears.includes(this.selectedYear)) {
      this.selectedYear = defaultYear;
    }

    // Dati storici effettivi (senza pensione)
    const rawData = financeStore.getHistoricalNetWorth();
    const filteredData = this.selectedYear === 'all'
      ? rawData
      : rawData.filter(d => d.month.endsWith(this.selectedYear));

    // Storico Fondo Pensione separato
    const pensionHistory = typeof financeStore.getPensionHistory === 'function' ? financeStore.getPensionHistory() : [];
    const filteredPension = this.selectedYear === 'all'
      ? pensionHistory
      : pensionHistory.filter(d => d.month.endsWith(this.selectedYear));

    // Calcolo crescita patrimonio effettivo
    const firstVal = filteredData.length > 0 ? filteredData[0].value : summary.effectiveNetWorth;
    const lastVal = filteredData.length > 0 ? filteredData[filteredData.length - 1].value : summary.effectiveNetWorth;
    const lastPoint = filteredData.length > 0 ? filteredData[filteredData.length - 1] : null;
    const hasPendingSalary = Boolean(lastPoint && lastPoint.isCurrent && lastPoint.pendingEstimatedIncome > 0);
    const pendingSalaryAmount = hasPendingSalary ? lastPoint.pendingEstimatedIncome : 0;
    const netGrowth = lastVal - firstVal;
    const growthPercent = firstVal > 0 ? ((netGrowth / firstVal) * 100).toFixed(1) : '0.0';
    const isGrowthPositive = netGrowth >= 0;

    // Calcolo crescita Fondo Pensione nel periodo selezionato
    const pFirstVal = filteredPension.length > 0 ? filteredPension[0].value : summary.pensionFundTotal;
    const pLastVal = filteredPension.length > 0 ? filteredPension[filteredPension.length - 1].value : summary.pensionFundTotal;
    const pNetGrowth = Math.round((pLastVal - pFirstVal) * 100) / 100;
    const pGrowthPercent = pFirstVal > 0 ? ((pNetGrowth / pFirstVal) * 100).toFixed(1) : '0.0';
    const isPGrowthPositive = pNetGrowth >= 0;

    // Matrice annuale per dettaglio
    const matrix = financeStore.getYearlyNetworthMatrix(this.selectedYear === 'all' ? defaultYear : this.selectedYear);

    // Mesi invertiti per lista cronologica recente -> passato
    const monthsReversed = [...matrix.months].reverse().filter(m => m.hasData || m.isCurrent || (m.closing && m.closing.totalNW > 0));

    const totalNW = summary.effectiveNetWorth || 1;
    const pctLiquid = Math.max(2, Math.round(((summary.liquidTotal || 0) / totalNW) * 100));
    const pctInvested = Math.max(2, Math.round(((summary.investedTotal || 0) / totalNW) * 100));
    const pctVoucher = Math.max(2, 100 - pctLiquid - pctInvested);

    container.innerHTML = `
      <div class="page storico-page">

        <!-- 1. Hero Card Patrimonio Effettivo Reale (Workout Monolithic Style) -->
        <section class="card hero-patrimonio-card storico-hero-card">
          <div class="hero-top-row">
            <div class="hero-title-group">
              <div class="hero-badge-row">
                <span class="hero-title-label">
                  Patrimonio Effettivo ${this.selectedYear === 'all' ? '• Storico' : `• ${this.selectedYear}`}
                </span>
                <span class="badge badge--positive hero-badge-tag">Disponibile &amp; Investito</span>
                ${hasPendingSalary ? `
                  <span class="badge badge--info hero-badge-tag" style="background: rgba(0, 113, 227, 0.12); color: var(--apple-blue); border: 1px solid rgba(0, 113, 227, 0.25);">
                    Incl. stima stipendio (+${this.formatCurrency(pendingSalaryAmount)})
                  </span>
                ` : ''}
              </div>
              <div class="card__value privacy-mask hero-networth-val" style="overflow: visible !important; text-overflow: clip !important; white-space: nowrap !important; max-width: 100% !important;">
                ${this.formatCurrency(lastVal)}
              </div>
              ${hasPendingSalary ? `
                <div style="font-size: 11.5px; color: var(--text-secondary); margin-top: 3px;">
                  Saldo attuale conti: <strong class="privacy-mask" style="color: var(--text-primary); font-weight: 600;">${this.formatCurrency(summary.effectiveNetWorth)}</strong>
                </div>
              ` : ''}
            </div>

            <div class="hero-trend-wrap">
              <span class="trend-badge ${isGrowthPositive ? 'positive' : 'negative'}">
                ${isGrowthPositive ? '+' : ''}${growthPercent}% (${isGrowthPositive ? '+' : ''}<span class="privacy-mask">${this.formatCurrency(netGrowth)}</span>)
              </span>
              <span class="trend-context" style="color: var(--text-secondary);">Crescita periodo</span>
            </div>
          </div>

          <!-- Segmented Allocation Bar -->
          <div class="alloc-bar-track">
            <div class="alloc-segment seg-liquid" style="width: ${pctLiquid}%;" title="Liquidità: ${pctLiquid}%"></div>
            <div class="alloc-segment seg-invested" style="width: ${pctInvested}%;" title="Investiti: ${pctInvested}%"></div>
            <div class="alloc-segment seg-voucher" style="width: ${pctVoucher}%;" title="Buoni Pasto: ${pctVoucher}%"></div>
          </div>

          <div class="alloc-legend" style="margin-bottom: 14px;">
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-blue);"></span>
                <span class="legend-name">Liquidità</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-blue);">${this.formatCurrency(summary.liquidTotal)}</span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-purple);"></span>
                <span class="legend-name">Trade Rep.</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-purple);">${this.formatCurrency(summary.investedTotal)}</span>
            </div>
            <div class="legend-col">
              <div class="legend-label-row">
                <span class="dot-indicator" style="background: var(--apple-orange);"></span>
                <span class="legend-name">Buoni Pasto</span>
              </div>
              <span class="privacy-mask legend-amount" style="color: var(--apple-orange);">${this.formatCurrency(summary.voucherTotal || 0)}</span>
            </div>
          </div>

          <!-- Toolbar Azioni & Selettore Anno a Tendina -->
          <div class="storico-hero-toolbar">
            <div class="apple-select-wrapper storico-year-select-wrap" style="position: relative; min-width: 185px;">
              <select id="storico-year-select" class="apple-select" style="width: 100% !important; min-width: 185px; padding: 8px 36px 8px 14px; font-size: 13px; font-weight: 600; border-radius: 9999px;">
                <option value="all" ${this.selectedYear === 'all' ? 'selected' : ''}>Tutto lo Storico</option>
                ${availableYears.map(y => `
                  <option value="${y}" ${this.selectedYear === y ? 'selected' : ''}>Anno ${y}</option>
                `).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>

            <div class="storico-hero-actions">
              <button class="apple-btn-secondary" id="btn-storico-report-fiscale">
                ${getIcon('list', 13)} <span>Report Fiscale</span>
              </button>
              <button class="apple-btn-secondary" id="btn-storico-export-csv">
                ${getIcon('download', 13)} <span>CSV</span>
              </button>
              <button class="apple-btn-primary" id="btn-storico-chiusura-mese">
                ${getIcon('conguaglio', 13)} <span>Chiusura Mese</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Sotto-Menu Subtabs Apple -->
        <div class="investimenti-subtabs-bar" style="margin-bottom: 14px;">
          <nav class="investimenti-segmented-tabs storico-segmented-tabs">
            <button class="investimenti-tab-btn view-subtab-btn ${this.activeSubtab === 'panoramica' ? 'active' : ''}" data-subtab="panoramica">
              <span class="tab-icon">${getIcon('chart', 14)}</span>
              <span class="tab-label">Evoluzione &amp; Mensilità</span>
            </button>
            <button class="investimenti-tab-btn view-subtab-btn ${this.activeSubtab === 'dettaglio' ? 'active' : ''}" data-subtab="dettaglio">
              <span class="tab-icon">${getIcon('list', 14)}</span>
              <span class="tab-label">Tabella Conti</span>
            </button>
          </nav>
        </div>

        ${this.activeSubtab === 'panoramica' ? `
          <!-- 2. Grafico Temporale Patrimonio Effettivo (Curva Liscia Apple Stocks) -->
          <section class="card storico-smooth-chart-card">
            <div class="card__header" style="margin-bottom: 14px;">
              <div>
                <span class="card__title">Curva di Crescita Patrimonio</span>
                <span style="display: block; font-size: 11.5px; color: var(--text-secondary); margin-top: 2px;">
                  Andamento storico netto (Liquidità + Trade Republic + Buoni Pasto${hasPendingSalary ? ' • Con stima entrate mese' : ''})
                </span>
              </div>
              <span class="badge badge--positive">Curva Continua</span>
            </div>

            <div style="height: 240px; min-height: 240px; position: relative;">
              <canvas id="storicoPatrimonioCanvas"></canvas>
            </div>
          </section>

          <!-- 3. Schede Mensili Touch-Friendly (Workout & LinkedIn Style) -->
          <section style="margin-bottom: var(--space-box-gap-lg);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; flex-wrap: wrap; gap: 8px; padding: 0 2px;">
              <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0;">
                Riepilogo Mensile (${this.selectedYear === 'all' ? 'Storico' : this.selectedYear})
              </h3>
              <span class="badge badge--neutral">${monthsReversed.length} Mesi</span>
            </div>

            <div class="storico-months-grid">
              ${monthsReversed.map((m) => {
                const idx = m.monthNum - 1;
                const effNW = matrix.totals.effectiveNetWorth[idx] || 0;
                const delta = matrix.totals.delta[idx] || 0;
                const deltaPct = matrix.totals.deltaPct[idx] || '0.0';
                const isPos = delta >= 0;

                const liquidVal = matrix.liquid.subtotals[idx] || 0;
                const voucherVal = matrix.voucher.subtotals[idx] || 0;
                const investedVal = matrix.invested.subtotals[idx] || 0;

                const mTot = effNW || 1;
                const mPctLiq = Math.max(2, Math.round((liquidVal / mTot) * 100));
                const mPctInv = Math.max(2, Math.round((investedVal / mTot) * 100));
                const mPctVou = Math.max(2, 100 - mPctLiq - mPctInv);

                return `
                  <div class="card storico-month-workout-card">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${m.name} ${matrix.year}</span>
                        ${m.isCurrent ? `
                          <span class="badge badge--info" style="font-size: 10px; font-weight: 600;">
                            ${m.pendingEstimatedIncome > 0 ? 'Live (con stima)' : 'Live'}
                          </span>
                        ` : ''}
                      </div>
                      <span class="badge ${isPos ? 'badge--positive' : 'badge--negative'}" style="font-size: 11px; font-weight: 700;">
                        ${isPos ? '+' : ''}${deltaPct}%
                      </span>
                    </div>

                    <div style="display: flex; align-items: baseline; justify-content: space-between; margin-top: 4px;">
                      <div>
                        <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em; display: block;">Patrimonio Effettivo</span>
                        <div class="privacy-mask" style="font-size: 23px; font-weight: 800; color: var(--text-primary); font-variant-numeric: tabular-nums; letter-spacing: -0.025em;">
                          ${this.formatCurrency(effNW)}
                        </div>
                        ${m.isCurrent && m.pendingEstimatedIncome > 0 ? `
                          <span style="font-size: 11px; color: var(--apple-blue); font-weight: 600; display: block; margin-top: 2px;">
                            Incl. stipendio stimato (+${this.formatCurrency(m.pendingEstimatedIncome)})
                          </span>
                        ` : ''}
                      </div>
                      <div style="text-align: right;">
                        <span style="font-size: 10.5px; color: var(--text-secondary); display: block;">Variazione</span>
                        <span class="privacy-mask" style="font-size: 13px; font-weight: 700; color: ${isPos ? 'var(--apple-green)' : 'var(--apple-red)'}; font-variant-numeric: tabular-nums;">
                          ${isPos ? '+' : ''}${this.formatCurrency(delta)}
                        </span>
                      </div>
                    </div>

                    <!-- Mini Segmented Bar -->
                    <div class="alloc-bar-track" style="height: 5px; margin: 8px 0 6px;">
                      <div class="alloc-segment seg-liquid" style="width: ${mPctLiq}%;"></div>
                      <div class="alloc-segment seg-invested" style="width: ${mPctInv}%;"></div>
                      <div class="alloc-segment seg-voucher" style="width: ${mPctVou}%;"></div>
                    </div>

                    <!-- Breakdown rapido a 3 voci -->
                    <div class="alloc-legend" style="padding-top: 2px;">
                      <div class="legend-col">
                        <span class="legend-name">Liquidità</span>
                        <span class="privacy-mask legend-amount" style="color: var(--apple-blue); font-size: 12px;">${this.formatCurrency(liquidVal)}</span>
                      </div>
                      <div class="legend-col">
                        <span class="legend-name">Trade Rep.</span>
                        <span class="privacy-mask legend-amount" style="color: var(--apple-purple); font-size: 12px;">${this.formatCurrency(investedVal)}</span>
                      </div>
                      <div class="legend-col">
                        <span class="legend-name">Buoni</span>
                        <span class="privacy-mask legend-amount" style="color: var(--apple-orange); font-size: 12px;">${this.formatCurrency(voucherVal)}</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>

          <!-- 4. Tracciamento Separato Previdenza a Lungo Termine (Fondo Pensione) -->
          <section class="card storico-pension-card">
            <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
              <div style="display: flex; align-items: center; gap: 12px; flex: 1; min-width: 200px;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(175, 82, 222, 0.14); color: #AF52DE; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">
                    Fondo Pensione • Previdenza Complementare
                  </h4>
                  <p style="margin: 2px 0 0; font-size: 11.5px; color: var(--text-secondary);">
                    Tracciato separatamente dal patrimonio liquido disponibile
                  </p>
                </div>
              </div>
              <div style="text-align: right;">
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
                  <span style="font-size: 10.5px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em;">
                    ${this.selectedYear === 'all' ? 'Maturato Complessivo' : `Maturato a fine ${this.selectedYear}`}
                  </span>
                  ${pNetGrowth !== 0 ? `
                    <span class="apple-badge" style="background: rgba(175, 82, 222, 0.14); color: #AF52DE; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 9999px;">
                      ${isPGrowthPositive ? '+' : ''}${this.formatCurrency(pNetGrowth)} (${isPGrowthPositive ? '+' : ''}${pGrowthPercent}%)
                    </span>
                  ` : ''}
                </div>
                <div class="privacy-mask" style="font-size: 22px; font-weight: 800; color: #AF52DE; font-variant-numeric: tabular-nums;">
                  ${this.formatCurrency(pLastVal)}
                </div>
              </div>
            </div>

            <!-- Mini grafico curva liscia pensione -->
            <div style="height: 170px; min-height: 170px; position: relative;">
              <canvas id="storicoPensioneCanvas"></canvas>
            </div>
          </section>
        ` : `
          <!-- 5. TABELLA DETTAGLIATA CONTI (OPZIONALE SU RICHIESTA) -->
          <section class="card" style="margin-bottom: var(--space-box-gap-lg); padding: 20px; border-radius: var(--radius-card); border: 1px solid var(--border-subtle); background: var(--bg-card); overflow-x: auto;">
            <div style="margin-bottom: 14px;">
              <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-primary);">Dettaglio Saldi per Conto (${matrix.year})</h4>
              <p style="margin: 3px 0 0; font-size: 12px; color: var(--text-secondary);">Prospetto contabile mensile suddiviso per macro-area.</p>
            </div>

            <table class="apple-table" style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-subtle); text-align: left;">
                  <th style="padding: 10px 8px;">Conto</th>
                  ${matrix.months.map(m => `<th style="padding: 10px 8px; text-align: right;">${m.shortName}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr style="background: var(--bg-hover); font-weight: 700;">
                  <td colspan="${matrix.months.length + 1}" style="padding: 8px;">Liquidità Corrente</td>
                </tr>
                ${matrix.liquid.accounts.map(acc => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px;">${acc.name}</td>
                    ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                  </tr>
                `).join('')}

                <tr style="background: var(--bg-hover); font-weight: 700;">
                  <td colspan="${matrix.months.length + 1}" style="padding: 8px;">Investimenti &amp; Broker (Trade Republic)</td>
                </tr>
                ${matrix.invested.accounts.map(acc => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px;">${acc.name}</td>
                    ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                  </tr>
                `).join('')}

                <tr style="background: var(--bg-hover); font-weight: 700;">
                  <td colspan="${matrix.months.length + 1}" style="padding: 8px;">Buoni Pasto &amp; Benefit</td>
                </tr>
                ${matrix.voucher.accounts.map(acc => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px;">${acc.name}</td>
                    ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                  </tr>
                `).join('')}

                <tr style="background: rgba(175, 82, 222, 0.08); font-weight: 700; color: #AF52DE;">
                  <td colspan="${matrix.months.length + 1}" style="padding: 8px; color: #AF52DE;">
                    🛡️ Previdenza Complementare (Fondo Pensione)
                  </td>
                </tr>
                ${matrix.pension.accounts.map(acc => `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 8px; color: var(--text-primary);">${acc.name}</td>
                    ${acc.values.map(v => `<td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums; color: #AF52DE; font-weight: 600;">${v > 0 ? this.formatCurrency(v) : '-'}</td>`).join('')}
                  </tr>
                `).join('')}

                ${matrix.totals.pendingEstimatedIncome > 0 ? `
                  <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--apple-blue); font-style: italic; background: rgba(0, 113, 227, 0.04);">
                    <td style="padding: 8px;">Entrate Stimate Mese (in arrivo)</td>
                    ${matrix.months.map(m => `
                      <td class="privacy-mask" style="padding: 8px; text-align: right; font-variant-numeric: tabular-nums; font-weight: 600;">
                        ${m.isCurrent && matrix.totals.pendingEstimatedIncome > 0 ? `+${this.formatCurrency(matrix.totals.pendingEstimatedIncome)}` : '-'}
                      </td>
                    `).join('')}
                  </tr>
                ` : ''}

                <tr style="background: rgba(52, 199, 89, 0.08); font-weight: 800; border-top: 1.5px solid var(--apple-green);">
                  <td style="padding: 10px 8px; color: var(--apple-green);">Patrimonio Diretto (Disponibile + Broker)</td>
                  ${matrix.totals.effectiveNetWorth.map(v => `
                    <td class="privacy-mask" style="padding: 10px 8px; text-align: right; color: var(--apple-green); font-variant-numeric: tabular-nums;">
                      ${this.formatCurrency(v)}
                    </td>
                  `).join('')}
                </tr>

                <tr style="background: rgba(0, 113, 227, 0.1); font-weight: 800; border-top: 2px solid var(--apple-blue);">
                  <td style="padding: 10px 8px; color: var(--apple-blue);">Patrimonio Totale (Net Worth con Pensione)</td>
                  ${matrix.totals.totalWithPension.map(v => `
                    <td class="privacy-mask" style="padding: 10px 8px; text-align: right; color: var(--apple-blue); font-variant-numeric: tabular-nums;">
                      ${this.formatCurrency(v)}
                    </td>
                  `).join('')}
                </tr>
              </tbody>
            </table>
          </section>
        `}

      </div>
    `;

    // Listener Selettore Anno a Tendina
    const yearSelect = container.querySelector('#storico-year-select');
    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        const y = e.target.value;
        if (y && y !== this.selectedYear) {
          this.selectedYear = y;
          this.render(container);
        }
      });
    }

    // Listener Subtab
    container.querySelectorAll('.view-subtab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          this.render(container);
        }
      });
    });

    // Listener Chiusura Mese
    const btnClosing = container.querySelector('#btn-storico-chiusura-mese');
    if (btnClosing) {
      btnClosing.addEventListener('click', () => {
        const rec = financeStore.getMonthlyReconciliationStatus();
        monthlyClosingModal.open({
          targetMonth: rec.targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    }

    // Listener Esporta CSV
    const btnCSV = container.querySelector('#btn-storico-export-csv');
    if (btnCSV) {
      btnCSV.addEventListener('click', () => this.handleExportCSV(btnCSV));
    }

    // Listener Report Fiscale
    const btnTax = container.querySelector('#btn-storico-report-fiscale');
    if (btnTax) {
      btnTax.addEventListener('click', () => this.openTaxReportModal(container));
    }

    // Inizializza Grafici
    if (this.activeSubtab === 'panoramica') {
      requestAnimationFrame(() => {
        this.initHistoryChart(filteredData);
        this.initPensionChart(filteredPension);
      });
    }
  }

  formatShortMonthLabel(rawLabel) {
    if (!rawLabel || typeof rawLabel !== 'string') return rawLabel;
    const monthsMap = {
      '01': 'Gen', '02': 'Feb', '03': 'Mar', '04': 'Apr',
      '05': 'Mag', '06': 'Giu', '07': 'Lug', '08': 'Ago',
      '09': 'Set', '10': 'Ott', '11': 'Nov', '12': 'Dic'
    };
    const parts = rawLabel.split('/');
    if (parts.length === 2) {
      const mName = monthsMap[parts[0]] || parts[0];
      return this.selectedYear === 'all' ? `${mName} '${parts[1].slice(-2)}` : mName;
    }
    return rawLabel;
  }

  initHistoryChart(dataPoints) {
    const canvas = document.getElementById('storicoPatrimonioCanvas');
    if (!canvas || !window.Chart) return;

    if (this.historyChart) {
      try { this.historyChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 240);
    grad.addColorStop(0, 'rgba(48, 209, 88, 0.34)');
    grad.addColorStop(0.7, 'rgba(48, 209, 88, 0.08)');
    grad.addColorStop(1, 'rgba(48, 209, 88, 0.0)');

    const labels = dataPoints.map(d => this.formatShortMonthLabel(d.month));
    const values = dataPoints.map(d => d.value);

    this.historyChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Patrimonio Effettivo (€)',
          data: values,
          borderColor: '#30D158',
          backgroundColor: grad,
          fill: true,
          tension: 0.42,
          cubicInterpolationMode: 'monotone',
          borderWidth: 3,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          pointRadius: (ctx) => {
            const pt = dataPoints && dataPoints[ctx.dataIndex];
            return (pt && pt.isCurrent) ? 5 : 0;
          },
          pointHitRadius: 20,
          pointHoverRadius: 7,
          pointBackgroundColor: '#30D158',
          pointBorderColor: '#FFFFFF',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#30D158',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(22, 22, 24, 0.95)',
            titleFont: { size: 13, weight: '600' },
            bodyFont: { size: 12.5, weight: '600' },
            padding: 10,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
              label: (ctx) => {
                const pt = dataPoints && dataPoints[ctx.dataIndex];
                const baseStr = `€ ${ctx.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
                if (pt && pt.isCurrent && pt.pendingEstimatedIncome > 0) {
                  return `${baseStr} (con stipendio stimato)`;
                }
                return baseStr;
              },
              afterLabel: (ctx) => {
                const pt = dataPoints && dataPoints[ctx.dataIndex];
                if (pt && pt.isCurrent && pt.pendingEstimatedIncome > 0) {
                  return `Stima entrate mese: +€ ${pt.pendingEstimatedIncome.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`;
                }
                return null;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 11, weight: '500' },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            border: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 11 },
              maxTicksLimit: 5,
              callback: (val) => val >= 1000 ? '€' + (val / 1000).toLocaleString('it-IT', { maximumFractionDigits: 1 }) + 'k' : '€' + val
            }
          }
        }
      }
    });
  }

  initPensionChart(pensionPoints) {
    const canvas = document.getElementById('storicoPensioneCanvas');
    if (!canvas || !window.Chart || !pensionPoints.length) return;

    if (this.pensionChart) {
      try { this.pensionChart.destroy(); } catch (e) {}
    }

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 170);
    grad.addColorStop(0, 'rgba(175, 82, 222, 0.30)');
    grad.addColorStop(1, 'rgba(175, 82, 222, 0.0)');

    const labels = pensionPoints.map(d => this.formatShortMonthLabel(d.month));
    const values = pensionPoints.map(d => d.value);

    this.pensionChart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Fondo Pensione (€)',
          data: values,
          borderColor: '#AF52DE',
          backgroundColor: grad,
          fill: true,
          tension: 0.42,
          cubicInterpolationMode: 'monotone',
          borderWidth: 2.8,
          borderCapStyle: 'round',
          borderJoinStyle: 'round',
          pointRadius: 0,
          pointHitRadius: 20,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#AF52DE',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(22, 22, 24, 0.95)',
            titleFont: { size: 12, weight: '600' },
            bodyFont: { size: 12, weight: '600' },
            padding: 9,
            cornerRadius: 10,
            displayColors: false,
            callbacks: {
              label: (ctx) => `€ ${ctx.parsed.y.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 10.5 },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6
            }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            border: { display: false },
            ticks: {
              color: '#8E8E93',
              font: { size: 10.5 },
              maxTicksLimit: 4,
              callback: (val) => val >= 1000 ? '€' + (val / 1000).toLocaleString('it-IT', { maximumFractionDigits: 1 }) + 'k' : '€' + val
            }
          }
        }
      }
    });
  }

  handleExportCSV(btn) {
    try {
      const csvContent = financeStore.exportTransactionsCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `movimenti_finanze_${new Date().getFullYear()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ CSV Scaricato';
        setTimeout(() => { btn.innerHTML = orig; }, 2500);
      }
    } catch (err) {
      console.error('Errore esportazione CSV:', err);
    }
  }

  openTaxReportModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const summary = financeStore.summary;
    const curYear = new Date().getFullYear();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="tax-report-overlay">
        <div class="apple-modal-sheet" style="max-width: 640px; border-radius: var(--radius-card); padding: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">Rendiconto Fiscale &amp; Previdenza (${curYear})</h3>
            <button class="apple-btn-icon" id="tax-report-close">&times;</button>
          </div>
          <div style="font-size: 13.5px; line-height: 1.5; color: var(--text-secondary);">
            <div style="background: var(--bg-hover); padding: 14px; border-radius: var(--radius-md); margin-bottom: 16px;">
              <span style="display: block; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Deduzione Fondo Pensione (Art. 51 TUIR)</span>
              <p style="margin: 0;">I contributi versati alla previdenza complementare sono deducibili dal reddito complessivo IRPEF fino a un massimo di <strong>5.164,57 € annui</strong>.</p>
            </div>
            <div class="kv" style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
              <span class="kv__label">Valore maturato ad oggi</span>
              <span class="kv__value font-mono privacy-mask" style="color: #5856D6; font-weight: 700;">${this.formatCurrency(summary.pensionFundTotal)}</span>
            </div>
            <div class="kv" style="padding: 8px 0; border-bottom: 1px solid var(--border-subtle);">
              <span class="kv__label">Plafond annuo deducibile</span>
              <span class="kv__value font-mono">5.164,57 €</span>
            </div>
            <div class="kv" style="padding: 8px 0;">
              <span class="kv__label">Regime fiscale a scadenza</span>
              <span class="kv__value font-mono">Ritenuta agevolata 9% - 15%</span>
            </div>
          </div>
          <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 8px;">
            <button class="apple-btn-primary" id="tax-report-done" style="padding: 8px 18px;">Chiudi</button>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('tax-report-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('tax-report-close')?.addEventListener('click', close);
    document.getElementById('tax-report-done')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  }
}

// === js/components/assistenteView.js ===
/**
 * Apple Design System - Assistente Finanziario View Component (AI Personal CFO)
 * Sezione dedicata al monitoraggio predittivo e consulenza finanziaria automatizzata.
 * Struttura a 4 zone canoniche, icone lineari SVG Apple e chat interattiva.
 */


class AssistenteView {
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

// === js/components/impostazioniView.js ===
/**
 * Apple Design System - Impostazioni & Configurazione Completa
 * Allineato al Design System centrale (Apple HIG & Native iOS Workout Capsule):
 * - Sotto-navigazione segmentata a capsula (Conti, Stipendio, Categorie, Sicurezza, Cloud)
 * - Gestione Conti & Saldi Iniziali (Modale Apple, modifica inline con conguaglio, chiusura mese)
 * - Parametri Stipendio & Busta Paga (13ª, 14ª, Premi MBO e calendario proiezione 12 mesi)
 * - Categorie di Spesa/Entrata, Smart Merge e Smart Rules
 * - Sicurezza PIN a 4 cifre & Sblocco Biometrico Face ID / Touch ID
 * - Google Sheets Cloud Sync, Snapshot JSON/CSV e Scorciatoie Rapide iOS
 */


const VALID_SUBTABS = ['conti', 'stipendio', 'categorie', 'sicurezza', 'sheets'];

class ImpostazioniView {
  constructor() {
    this.activeSubtab = 'conti'; // 'conti' | 'stipendio' | 'categorie' | 'sicurezza' | 'sheets'
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
    if (!VALID_SUBTABS.includes(this.activeSubtab)) {
      this.activeSubtab = 'conti';
    }

    const config = googleSheetsService.getConfig();
    const accounts = financeStore.getAccounts();
    const categories = financeStore.getCategories();
    const isPinActive = financeStore.isPinEnabled();
    const isBiometricActive = typeof BiometricService !== 'undefined'
      ? BiometricService.isEnabled()
      : (localStorage.getItem('finanze_biometric_enabled') === 'true');
    const salaryCfg = financeStore.getSalaryConfig();
    const isSandbox = googleSheetsService.isSandboxMode();

    const tabMeta = {
      conti: {
        badge: 'Patrimonio & Conti',
        badgeClass: 'badge--info',
        title: 'Conti & Saldi Iniziali',
        subtitle: 'Gestisci conti correnti, carte, broker, saldi attuali e chiusure di fine mese',
        actionHtml: `
          <button class="apple-btn-secondary js-add-account-modal">
            ${getIcon('plus', 14)} <span>Nuovo Conto</span>
          </button>
          <button class="apple-btn-primary js-open-closing-studio">
            ${getIcon('conguaglio', 14)} <span>Chiusura Mese</span>
          </button>
        `
      },
      stipendio: {
        badge: 'Cash Flow Predittivo',
        badgeClass: 'badge--positive',
        title: 'Stipendio & Busta Paga',
        subtitle: 'Configura retribuzione netta, giorno accredito, 13ª, 14ª e premi per la stima mensile',
        actionHtml: `
          <button class="apple-btn-primary js-save-salary-config">
            ${getIcon('check', 14)} <span>Salva Parametri</span>
          </button>
        `
      },
      categorie: {
        badge: 'Tassonomia & Regole',
        badgeClass: 'badge--purple',
        title: 'Categorie & Auto-Regole',
        subtitle: 'Personalizza le categorie di entrata e uscita, unisci duplicati e consulta le Smart Rules',
        actionHtml: `
          <button class="apple-btn-secondary" id="btn-focus-new-cat">
            ${getIcon('plus', 14)} <span>Nuova Categoria</span>
          </button>
        `
      },
      sicurezza: {
        badge: isPinActive ? 'Accesso Protetto' : 'Accesso Libero',
        badgeClass: isPinActive ? 'badge--positive' : 'badge--neutral',
        title: 'Sicurezza & Biometria',
        subtitle: 'Proteggi la tua web app su iPhone e Mac con codice PIN a 4 cifre, Face ID o Touch ID',
        actionHtml: ''
      },
      sheets: {
        badge: isSandbox ? 'Sandbox Protetta' : (config.isConfigured ? 'Cloud Live' : 'Local-First'),
        badgeClass: isSandbox ? 'badge--warning' : (config.isConfigured ? 'badge--positive' : 'badge--neutral'),
        title: 'Cloud Sync & Backup',
        subtitle: 'Sincronizzazione Google Sheets in tempo reale, snapshot locali JSON/CSV e comandi iOS',
        actionHtml: `
          ${config.isConfigured ? `
            <button class="apple-btn-secondary js-share-cloud-settings">
              ${getIcon('smartphone', 14)} <span>Passa a iPhone</span>
            </button>
          ` : ''}
          <button class="apple-btn-primary js-force-sync-now">
            ${getIcon('sync', 14)} <span>Sincronizza Ora</span>
          </button>
        `
      }
    };

    const currentMeta = tabMeta[this.activeSubtab] || tabMeta.conti;

    const titleEl = document.getElementById('view-title');
    const subtitleEl = document.getElementById('view-subtitle');
    if (titleEl) titleEl.textContent = 'Impostazioni';
    if (subtitleEl) subtitleEl.textContent = currentMeta.subtitle;

    container.innerHTML = `
      <div class="page impostazioni-page">

        <!-- Header di Sezione in Stile Apple (Desktop) + Subtabs Workout Capsule (Mobile & Desktop) -->
        <header class="impostazioni-header-section">

          <div class="spese-header-toolbar impostazioni-header-toolbar desk-only">
            <div class="spese-header-info impostazioni-header-info">
              <div class="impostazioni-meta-row">
                <span class="badge ${currentMeta.badgeClass}">${currentMeta.badge}</span>
                <span class="impostazioni-chip">
                  Conti: <strong>${accounts.length}</strong>
                </span>
                <span class="impostazioni-chip">
                  Categorie: <strong>${categories.length}</strong>
                </span>
                <span class="impostazioni-chip">
                  Sicurezza: <strong>${isPinActive ? (isBiometricActive ? 'PIN + Face ID' : 'PIN Attivo') : 'Libero'}</strong>
                </span>
                <span class="impostazioni-chip">
                  Cloud: <strong>${isSandbox ? 'Sandbox' : (config.isConfigured ? 'Collegato' : 'Locale')}</strong>
                </span>
              </div>
              <h2 class="page-title">${currentMeta.title}</h2>
              <p class="page-subtitle">${currentMeta.subtitle}</p>
            </div>

            <div class="spese-header-actions impostazioni-header-actions">
              ${currentMeta.actionHtml}
            </div>
          </div>

          <!-- Sotto-menu Segmentato Apple / Workout Capsule -->
          <div class="impostazioni-subtabs-bar">
            <nav class="impostazioni-segmented-tabs" id="impostazioni-subtabs" aria-label="Sezioni Impostazioni">
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'conti' ? 'active' : ''}" data-subtab="conti">
                <span class="tab-icon">${getIcon('card', 14)}</span>
                <span class="tab-label">Conti</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'stipendio' ? 'active' : ''}" data-subtab="stipendio">
                <span class="tab-icon">${getIcon('stipendio', 14)}</span>
                <span class="tab-label">Stipendio</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'categorie' ? 'active' : ''}" data-subtab="categorie">
                <span class="tab-icon">${getIcon('tag', 14)}</span>
                <span class="tab-label">Categorie</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'sicurezza' ? 'active' : ''}" data-subtab="sicurezza">
                <span class="tab-icon">${getIcon('lock', 14)}</span>
                <span class="tab-label">Sicurezza</span>
              </button>
              <button class="impostazioni-tab-btn ${this.activeSubtab === 'sheets' ? 'active' : ''}" data-subtab="sheets">
                <span class="tab-icon">${getIcon('cloud', 14)}</span>
                <span class="tab-label">Cloud</span>
              </button>
            </nav>
          </div>

        </header>

        <div class="impostazioni-subview-stack">
          ${this.activeSubtab === 'conti' ? this.renderContiView(accounts) : ''}
          ${this.activeSubtab === 'stipendio' ? this.renderStipendioView(salaryCfg) : ''}
          ${this.activeSubtab === 'categorie' ? this.renderCategorieView(categories) : ''}
          ${this.activeSubtab === 'sicurezza' ? this.renderSicurezzaView(isPinActive, isBiometricActive) : ''}
          ${this.activeSubtab === 'sheets' ? this.renderSheetsView(config) : ''}
        </div>

      </div>
    `;

    this.renderAccountModal();
    this.bindEvents(container);
  }

  renderContiView(accounts) {
    const totalBalance = accounts.reduce((acc, item) => acc + (parseFloat(item.balance) || 0), 0);

    return `
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge badge-tint-blue">
              ${getIcon('card', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Conti &amp; Asset Patrimoniali</h3>
              <p class="settings-card-sub">Modifica il saldo per generare un conguaglio o avvia la chiusura di fine mese</p>
            </div>
          </div>
          <div class="settings-header-pills">
            <span class="badge badge--neutral">${accounts.length} Conti</span>
            <span class="badge badge--info privacy-mask">${this.formatCurrency(totalBalance)}</span>
          </div>
        </div>

        <!-- Barra Azioni Rapide Mobile & Desktop Compatta -->
        <div class="settings-quick-toolbar mobile-only-flex">
          <button class="apple-btn-secondary" id="btn-add-account-modal">
            ${getIcon('plus', 14)}
            <span>Nuovo Conto</span>
          </button>
          <button class="apple-btn-primary" id="btn-open-closing-studio">
            ${getIcon('conguaglio', 14)}
            <span>Chiusura Mese</span>
          </button>
        </div>

        <div class="settings-accounts-list">
          ${accounts.map(acc => {
            const isBroker = Boolean(acc.isBroker) || (acc.type || '').toLowerCase().includes('broker') || (acc.type || '').toLowerCase().includes('invest');
            const isPension = (acc.type || '').toLowerCase().includes('previdenza') || (acc.type || '').toLowerCase().includes('pensione');
            const isVoucher = Boolean(acc.isVoucher) || (acc.type || '').toLowerCase().includes('buoni');

            const tintClass = (isBroker || isPension) ? 'badge-tint-purple' : (isVoucher ? 'badge-tint-orange' : 'badge-tint-blue');
            const iconName = isPension ? 'pensione' : (isBroker ? 'investimenti' : (isVoucher ? 'tag' : 'card'));

            const subMeta = (acc.isBroker && Array.isArray(acc.holdings) && acc.holdings.length > 0)
              ? `<span class="settings-acc-holdings privacy-mask">Liquidità: ${this.formatCurrency(acc.cashBalance || 0)} • Investiti: ${this.formatCurrency(acc.balance - (acc.cashBalance || 0))} (${acc.holdings.length} strumenti)</span>`
              : '';

            return `
              <div class="settings-account-row" data-id="${acc.id}">
                <div class="settings-acc-left">
                  <div class="settings-acc-icon ${tintClass}">
                    ${getIcon(iconName, 17)}
                  </div>
                  <div class="settings-acc-info">
                    <div class="settings-acc-title-line">
                      <span class="settings-acc-name">${acc.name}</span>
                      <span class="settings-acc-pill">${acc.provider || acc.name}</span>
                    </div>
                    <span class="settings-acc-type">${acc.type}</span>
                    ${subMeta}
                  </div>
                </div>

                <div class="settings-acc-actions">
                  <div class="settings-acc-input-wrap">
                    <span class="settings-currency-prefix">€</span>
                    <input type="number" step="0.01" class="apple-input acc-balance-input" value="${acc.balance}" data-id="${acc.id}" aria-label="Saldo ${acc.name}" />
                  </div>
                  <button class="apple-btn-save-inline" data-id="${acc.id}">Aggiorna</button>
                  <button class="apple-btn-delete-inline" data-id="${acc.id}" title="Rimuovi conto" aria-label="Rimuovi ${acc.name}">
                    ${getIcon('trash', 14)}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  renderStipendioView(salaryCfg) {
    const monthsFull = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    const monthsShort = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const annualTotal = monthsShort.reduce((sum, _, idx) => sum + (financeStore.getEstimatedSalaryForMonth(idx + 1) || 0), 0);

    return `
      <div class="settings-two-col-grid">

        <!-- Card 1: Retribuzione Base Mensile -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-green">
                ${getIcon('wallet', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Retribuzione Base Mensile</h3>
                <p class="settings-card-sub">Accredito ordinario e data di valuta mensile</p>
              </div>
            </div>
            <span class="badge badge--positive">Ordinario</span>
          </div>

          <div class="settings-form-stack">
            <div class="form-group">
              <label class="form-label" for="salary-base">Stipendio Netto Base (€)</label>
              <input type="number" step="10" id="salary-base" class="apple-input apple-input-mono" value="${salaryCfg.baseSalary}" />
              <span class="settings-field-hint">Accredito netto mensile ordinario sul conto principale</span>

              <div class="settings-callout-note tint-purple">
                ${getIcon('pensione', 15)}
                <div>
                  <strong>Fondo Pensione Complementare:</strong> già trattenuto a monte in busta paga (Art. 51 TUIR), non riduce la liquidità disponibile sul conto corrente.
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="salary-payday">Giorno del Mese di Accredito</label>
              <div class="apple-select-wrapper">
                <select id="salary-payday" class="apple-select apple-input">
                  ${Array.from({ length: 28 }, (_, i) => i + 1).map(day => `
                    <option value="${day}" ${parseInt(salaryCfg.payDay, 10) === day ? 'selected' : ''}>Giorno ${day} del mese ${day === 25 ? '(Predefinito)' : ''}</option>
                  `).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <span class="settings-field-hint">Prima di questa data la Dashboard usa la stima predittiva</span>
            </div>

            <div class="form-group">
              <label class="form-label" for="salary-allowances">Indennità &amp; Benefit Mensili Extra (€)</label>
              <input type="number" step="10" id="salary-allowances" class="apple-input apple-input-mono" value="${salaryCfg.extraMonthlyAllowances || 0}" />
              <span class="settings-field-hint">Reperibilità, trasferte forfettarie, welfare o rimborsi fissi</span>
            </div>
          </div>
        </section>

        <!-- Card 2: Mensilità Aggiuntive & Premi -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-blue">
                ${getIcon('sparkle', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Mensilità Extra &amp; Premi</h3>
                <p class="settings-card-sub">13ª, 14ª mensilità e bonus variabile annuale</p>
              </div>
            </div>
            <span class="badge badge--info">Extra</span>
          </div>

          <div class="settings-form-stack">

            <!-- 13esima -->
            <div class="settings-bonus-module">
              <div class="settings-bonus-top">
                <div class="settings-bonus-title-group">
                  <strong>Tredicesima (13ª)</strong>
                  <div class="apple-select-wrapper settings-mini-select">
                    <select id="salary-13th-month" class="apple-select" aria-label="Mese 13esima">
                      <option value="11" ${parseInt(salaryCfg.thirteenthMonth, 10) === 11 ? 'selected' : ''}>Novembre</option>
                      <option value="12" ${parseInt(salaryCfg.thirteenthMonth, 10) === 12 ? 'selected' : ''}>Dicembre</option>
                    </select>
                    <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva/Disattiva Tredicesima">
                  <input type="checkbox" id="salary-has-13th" ${salaryCfg.has13th ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
              <div class="form-group">
                <label class="form-label" for="salary-13th-amount">Importo Netto 13ª (€)</label>
                <input type="number" step="10" id="salary-13th-amount" class="apple-input apple-input-mono" value="${salaryCfg.thirteenthAmount}" />
              </div>
            </div>

            <!-- 14esima -->
            <div class="settings-bonus-module">
              <div class="settings-bonus-top">
                <div class="settings-bonus-title-group">
                  <strong>Quattordicesima (14ª)</strong>
                  <div class="apple-select-wrapper settings-mini-select">
                    <select id="salary-14th-month" class="apple-select" aria-label="Mese 14esima">
                      <option value="6" ${parseInt(salaryCfg.fourteenthMonth, 10) === 6 ? 'selected' : ''}>Giugno</option>
                      <option value="7" ${parseInt(salaryCfg.fourteenthMonth, 10) === 7 ? 'selected' : ''}>Luglio</option>
                    </select>
                    <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva/Disattiva Quattordicesima">
                  <input type="checkbox" id="salary-has-14th" ${salaryCfg.has14th ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
              <div class="form-group">
                <label class="form-label" for="salary-14th-amount">Importo Netto 14ª (€)</label>
                <input type="number" step="10" id="salary-14th-amount" class="apple-input apple-input-mono" value="${salaryCfg.fourteenthAmount}" />
              </div>
            </div>

            <!-- Premio Produzione / MBO -->
            <div class="settings-bonus-module">
              <div class="settings-bonus-top">
                <div class="settings-bonus-title-group">
                  <strong>Premio Produzione / MBO</strong>
                  <div class="apple-select-wrapper settings-mini-select">
                    <select id="salary-bonus-month" class="apple-select" aria-label="Mese Premio">
                      ${monthsFull.map((mName, idx) => `
                        <option value="${idx + 1}" ${parseInt(salaryCfg.productionBonusMonth, 10) === (idx + 1) ? 'selected' : ''}>${mName}</option>
                      `).join('')}
                    </select>
                    <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <label class="apple-switch" title="Attiva/Disattiva Premio Produzione">
                  <input type="checkbox" id="salary-has-bonus" ${salaryCfg.hasProductionBonus ? 'checked' : ''} />
                  <span class="switch-slider"></span>
                </label>
              </div>
              <div class="form-group">
                <label class="form-label" for="salary-bonus-amount">Importo Netto Premio (€)</label>
                <input type="number" step="50" id="salary-bonus-amount" class="apple-input apple-input-mono" value="${salaryCfg.productionBonusAmount || 1200}" />
              </div>
            </div>

          </div>
        </section>

      </div>

      <!-- Card 3: Proiezione Calendario Annuale (12 Mesi) -->
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge badge-tint-purple">
              ${getIcon('calendar', 17)}
            </div>
            <div>
              <h3 class="settings-card-title">Proiezione Entrate Annuali Stimate</h3>
              <p class="settings-card-sub">Calendario dei flussi netti attesi mese per mese</p>
            </div>
          </div>
          <span class="badge badge--purple privacy-mask">Totale Annuo: ${this.formatCurrency(annualTotal)}</span>
        </div>

        <div class="settings-calendar-grid">
          ${monthsShort.map((mShort, idx) => {
            const mNum = idx + 1;
            const estimated = financeStore.getEstimatedSalaryForMonth(mNum);
            const is13 = salaryCfg.has13th && mNum === parseInt(salaryCfg.thirteenthMonth, 10);
            const is14 = salaryCfg.has14th && mNum === parseInt(salaryCfg.fourteenthMonth, 10);
            const isBonus = salaryCfg.hasProductionBonus && mNum === parseInt(salaryCfg.productionBonusMonth, 10);
            const isSpecial = is13 || is14 || isBonus;

            return `
              <div class="settings-month-tile ${isSpecial ? 'is-special' : ''}">
                <span class="settings-month-label">${mShort}</span>
                <strong class="settings-month-val privacy-mask">
                  €${estimated >= 1000 ? (estimated / 1000).toFixed(1) + 'k' : estimated}
                </strong>
                <div class="settings-month-tags">
                  ${is13 ? '<span class="month-mini-tag tag-green">13ª</span>' : ''}
                  ${is14 ? '<span class="month-mini-tag tag-blue">14ª</span>' : ''}
                  ${isBonus ? '<span class="month-mini-tag tag-orange">Premio</span>' : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="settings-actions-footer">
          <div id="salary-save-feedback" class="settings-inline-feedback" style="display: none;">
            ${getIcon('check', 15)}
            <span>Parametri stipendio salvati con successo</span>
          </div>
          <button class="apple-btn-primary" id="btn-save-salary-config">
            ${getIcon('check', 15)}
            <span>Salva Parametri Stipendio</span>
          </button>
        </div>
      </section>
    `;
  }

  renderCategorieView(categories) {
    const allRules = financeStore.getSmartRules();
    const previewRules = allRules.slice(0, 18);
    const remainingRules = Math.max(0, allRules.length - previewRules.length);

    return `
      <!-- Card 1: Gestione Categorie -->
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge badge-tint-blue">
              ${getIcon('tag', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Categorie di Spesa, Entrata &amp; Risparmio</h3>
              <p class="settings-card-sub">Crea nuove categorie personalizzate o rimuovi quelle inutilizzate</p>
            </div>
          </div>
          <span class="badge badge--neutral">${categories.length} Categorie</span>
        </div>

        <div class="settings-add-cat-bar">
          <input type="text" id="new-cat-name" class="apple-input" placeholder="Nuova categoria (es. Viaggi, Sport, Formazione...)" />
          <div class="apple-select-wrapper settings-cat-type-select">
            <select id="new-cat-type" class="apple-select apple-input" aria-label="Tipo categoria">
              <option value="expense">Uscita</option>
              <option value="income">Entrata</option>
              <option value="transfer">Giroconto / Risparmio</option>
            </select>
            <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <button class="apple-btn-primary" id="btn-create-cat">
            ${getIcon('plus', 14)}
            <span>Aggiungi</span>
          </button>
        </div>

        <div class="settings-categories-cloud">
          ${categories.map(c => {
            const typeLabel = c.type === 'income' ? 'Entrata' : (c.type === 'transfer' ? 'Risparmio' : 'Spesa');
            const cleanName = cleanCategoryName(c.name);
            const dotColor = c.color || '#0A84FF';
            return `
              <div class="settings-cat-pill">
                <span class="settings-cat-icon" style="color: ${dotColor};">
                  ${getCategoryIcon(c.name, 14)}
                </span>
                <span class="settings-cat-name">${cleanName}</span>
                <span class="settings-cat-type">${typeLabel}</span>
                <button class="btn-remove-cat" data-id="${c.id}" title="Elimina ${cleanName}" aria-label="Elimina ${cleanName}">&times;</button>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <div class="settings-two-col-grid">

        <!-- Card 2: Smart Merge -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-orange">
                ${getIcon('merge', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Accorpamento Categorie (Smart Merge)</h3>
                <p class="settings-card-sub">Unisci due voci simili convertendo automaticamente lo storico</p>
              </div>
            </div>
          </div>

          <div class="settings-merge-stack">
            <div class="form-group">
              <label class="form-label" for="merge-source-cat">Categoria da unire (Sorgente)</label>
              <div class="apple-select-wrapper">
                <select id="merge-source-cat" class="apple-select apple-input">
                  <option value="" disabled selected>Seleziona categoria da unire...</option>
                  ${categories.map(c => `<option value="${c.name}">${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="merge-target-cat">Categoria di destinazione</label>
              <div class="apple-select-wrapper">
                <select id="merge-target-cat" class="apple-select apple-input">
                  <option value="" disabled selected>Seleziona destinazione...</option>
                  ${categories.map(c => `<option value="${c.name}">${cleanCategoryName(c.name)}</option>`).join('')}
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="settings-actions-footer">
              <button class="apple-btn-secondary" id="btn-merge-categories">
                ${getIcon('merge', 14)}
                <span>Accorpa Categorie</span>
              </button>
            </div>
          </div>
        </section>

        <!-- Card 3: Smart Rules -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-purple">
                ${getIcon('sparkle', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Auto-Categorizzazione (Smart Rules)</h3>
                <p class="settings-card-sub">Parole chiave che compilano in automatico la categoria</p>
              </div>
            </div>
            <span class="badge badge--purple">${allRules.length} Regole</span>
          </div>

          <div class="settings-rules-cloud">
            ${previewRules.map(r => `
              <span class="settings-rule-pill">
                <strong>${r.keyword}</strong>
                <span class="rule-arrow">→</span>
                <span>${cleanCategoryName(r.category)}</span>
              </span>
            `).join('')}
            ${remainingRules > 0 ? `
              <span class="settings-rules-more">+ altre ${remainingRules} regole attive</span>
            ` : ''}
          </div>
        </section>

      </div>
    `;
  }

  renderSicurezzaView(isPinActive, isBiometricActive) {
    return `
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge ${isPinActive ? 'badge-tint-green' : 'badge-tint-blue'}">
              ${getIcon('lock', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Protezione Accesso &amp; Biometria</h3>
              <p class="settings-card-sub">Blocca l'apertura della web app su iPhone e Mac tramite codice PIN o Face ID</p>
            </div>
          </div>
          <span class="badge ${isPinActive ? 'badge--positive' : 'badge--neutral'}">
            ${isPinActive ? 'PIN Attivo' : 'Disattivato'}
          </span>
        </div>

        <div class="settings-status-callout ${isPinActive ? 'callout-green' : 'callout-neutral'}">
          <div class="callout-icon">
            ${getIcon(isPinActive ? 'shield' : 'lock', 22)}
          </div>
          <div class="callout-body">
            <strong>${isPinActive ? 'Protezione PIN Attiva sul Dispositivo' : 'Nessun Codice PIN Configurato'}</strong>
            <p>${isPinActive
              ? 'Ad ogni avvio della web app viene richiesto il codice numerico a 4 cifre o il riconoscimento biometrico Apple.'
              : 'La web app si apre istantaneamente senza schermata di blocco. Imposta un PIN a 4 cifre per abilitare anche Face ID / Touch ID.'}</p>
          </div>
        </div>

        <div class="settings-pin-controls">
          <div class="form-group">
            <label class="form-label" for="input-security-pin">Codice PIN Numerico (4 cifre)</label>
            <div class="settings-pin-input-row">
              <input type="password" maxlength="4" pattern="[0-9]*" inputmode="numeric" id="input-security-pin" class="apple-input settings-pin-field" placeholder="••••" value="${financeStore.getPin()}" />
              <button class="apple-btn-primary" id="btn-save-pin">
                ${getIcon('check', 14)}
                <span>${isPinActive ? 'Aggiorna PIN' : 'Attiva PIN'}</span>
              </button>
              ${isPinActive ? `
                <button class="apple-btn-secondary" id="btn-remove-pin">
                  <span>Rimuovi PIN</span>
                </button>
              ` : ''}
            </div>
          </div>

          <div class="settings-toggle-row">
            <div class="settings-toggle-left">
              <div class="settings-icon-badge badge-tint-blue">
                ${getIcon('faceid', 18)}
              </div>
              <div class="toggle-label-group">
                <strong>Sblocco con Face ID / Touch ID</strong>
                <span>Autenticazione biometrica nativa WebAuthn su iPhone, iPad e Mac (${isPinActive ? 'Pronto' : 'Richiede PIN a 4 cifre attivo'}).</span>
              </div>
            </div>
            <label class="apple-switch" title="Attiva/Disattiva Sblocco Biometrico">
              <input type="checkbox" id="biometric-toggle" ${isBiometricActive ? 'checked' : ''} ${!isPinActive ? 'disabled' : ''} />
              <span class="switch-slider"></span>
            </label>
          </div>
        </div>
      </section>
    `;
  }

  renderSheetsView(config) {
    const isSandbox = googleSheetsService.isSandboxMode();
    const isConnected = Boolean(config.isConfigured);

    let calloutClass = 'callout-blue';
    let calloutIcon = 'cloud';
    let calloutTitle = 'Modalità Local-First Attiva';
    let calloutBadge = 'Archivio Locale';
    let calloutDesc = 'I tuoi dati risiedono in sicurezza sul browser di questo dispositivo. Inserisci l\'URL della tua Web App Google Apps Script e il Security Token qui sotto per attivare il backup e la sincronizzazione bidirezionale gratuita su Google Sheets.';

    if (isSandbox) {
      calloutClass = 'callout-orange';
      calloutIcon = 'shield';
      calloutTitle = `Protezione Sandbox Attiva (${googleSheetsService.isBeta ? 'Ambiente Beta' : 'Test Protetto'})`;
      calloutBadge = 'Zero Scritture Cloud';
      calloutDesc = 'Tutte le modifiche, nuovi movimenti e conguagli restano confinati in locale sul tuo browser senza sovrascrivere il foglio Google Sheets reale.';
    } else if (isConnected) {
      calloutClass = 'callout-green';
      calloutIcon = 'sync';
      calloutTitle = 'Sincronizzazione Live Bidirezionale Attiva';
      calloutBadge = 'Google Sheets Live';
      calloutDesc = 'L\'app è collegata al tuo foglio Google Sheets: ogni movimento, conguaglio o modifica viene sincronizzato automaticamente sul cloud e riallineato tra Mac e iPhone.';
    }

    return `
      <!-- Card 1: Connessione Google Sheets -->
      <section class="card settings-card">
        <div class="card__header settings-card-header">
          <div class="settings-card-title-wrap">
            <div class="settings-icon-badge ${isSandbox ? 'badge-tint-orange' : (isConnected ? 'badge-tint-green' : 'badge-tint-blue')}">
              ${getIcon('cloud', 18)}
            </div>
            <div>
              <h3 class="settings-card-title">Sincronizzazione Google Sheets</h3>
              <p class="settings-card-sub">Collegamento serverless privato al foglio "Finanze - Movimenti"</p>
            </div>
          </div>
          <span class="sheet-status-badge">
            <span class="sheet-status-indicator" style="width: 8px; height: 8px; border-radius: 50%; background-color: ${isSandbox ? 'var(--apple-orange)' : (isConnected ? 'var(--apple-green)' : 'var(--apple-blue)')};"></span>
            <span class="sheet-status-desc">${isSandbox ? 'Sandbox Protetta' : (isConnected ? 'Connesso Live' : 'Solo Locale')}</span>
          </span>
        </div>

        <div class="settings-status-callout ${calloutClass}">
          <div class="callout-icon">
            ${getIcon(calloutIcon, 22)}
          </div>
          <div class="callout-body">
            <div class="callout-title-row">
              <strong>${calloutTitle}</strong>
              <span class="callout-pill">${calloutBadge}</span>
            </div>
            <p>${calloutDesc}</p>
          </div>
        </div>

        <div class="settings-toggle-row">
          <div class="toggle-label-group">
            <strong>Modalità Sandbox (Protezione Scritture)</strong>
            <span>Blocca temporaneamente scritture ed eliminazioni verso il foglio Google Sheets durante simulazioni e prove.</span>
          </div>
          <label class="apple-switch" title="Attiva/Disattiva Modalità Sandbox">
            <input type="checkbox" id="gas-sandbox-toggle" ${isSandbox ? 'checked' : ''} />
            <span class="switch-slider"></span>
          </label>
        </div>

        <div class="settings-form-stack">
          <div class="form-group">
            <label class="form-label" for="gas-url-input">URL Applicazione Web (Google Apps Script)</label>
            <input type="url" id="gas-url-input" class="apple-input apple-input-mono" placeholder="https://script.google.com/macros/s/AKfyc.../exec" value="${config.webAppUrl || ''}" />
          </div>

          <div class="form-group">
            <label class="form-label" for="gas-token-input">Chiave Segreta Personale (Security Token)</label>
            <input type="password" id="gas-token-input" class="apple-input" placeholder="La password segreta impostata nello script Code.gs" value="${config.securityToken || ''}" />
          </div>
        </div>

        <div class="settings-cloud-actions">
          <button class="apple-btn-secondary" id="btn-test-connection">
            ${getIcon('salute', 14)}
            <span>Verifica Connessione</span>
          </button>
          <button class="apple-btn-secondary" id="btn-force-sync-now">
            ${getIcon('sync', 14)}
            <span>Sincronizza Ora</span>
          </button>
          ${isConnected ? `
            <button class="apple-btn-secondary" id="btn-share-cloud-settings">
              ${getIcon('smartphone', 14)}
              <span>Passa a iPhone</span>
            </button>
          ` : ''}
          <button class="apple-btn-primary" id="btn-save-sheets-config">
            ${getIcon('check', 14)}
            <span>Salva e Collega</span>
          </button>
        </div>

        <div id="connection-test-feedback" class="connection-feedback" style="display: none;"></div>

        <div class="settings-guide-box">
          <div class="settings-guide-title">
            ${getIcon('info', 15)}
            <strong>Guida rapida all'URL Web App (/exec)</strong>
          </div>
          <ol class="settings-guide-steps">
            <li>Apri il tuo foglio Google Sheets e seleziona <strong>Estensioni → Apps Script</strong>.</li>
            <li>Clicca in alto a destra su <strong>Distribuisci → Nuova distribuzione</strong>.</li>
            <li>Imposta Tipo: <em>Applicazione Web</em>, Esegui come: <em>Io</em>, Chi ha accesso: <strong>Chiunque</strong>.</li>
            <li>Autorizza e incolla qui sopra l'URL generato che termina con <code>/exec</code>.</li>
          </ol>
        </div>
      </section>

      <div class="settings-two-col-grid">

        <!-- Card 2: Snapshot & Backup Locale / iCloud Drive -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-blue">
                ${getIcon('download', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Snapshot &amp; Backup Locale</h3>
                <p class="settings-card-sub">Esporta o ripristina il tuo archivio su Mac, iPhone o iCloud Drive</p>
              </div>
            </div>
            <span class="badge badge--info">Local-First</span>
          </div>

          <p class="settings-body-copy">
            Salva una copia integrale di sicurezza in formato <strong>JSON</strong> (ripristinabile in 1 clic su qualsiasi dispositivo) oppure esporta i movimenti in <strong>CSV</strong> per aprirli su Numbers o Excel.
          </p>

          <div class="settings-backup-actions">
            <button class="apple-btn-secondary" id="btn-export-backup-json">
              ${getIcon('download', 14)}
              <span>Esporta Snapshot (.JSON)</span>
            </button>
            <button class="apple-btn-secondary" id="btn-export-tx-csv">
              ${getIcon('table', 14)}
              <span>Esporta Movimenti (.CSV)</span>
            </button>
            <button class="apple-btn-primary" id="btn-import-backup-trigger">
              ${getIcon('upload', 14)}
              <span>Ripristina da Backup (.JSON)</span>
            </button>
            <input type="file" id="input-backup-file" accept=".json" style="display: none;" />
          </div>
        </section>

        <!-- Card 3: Scorciatoie Rapide iOS & Siri -->
        <section class="card settings-card">
          <div class="card__header settings-card-header">
            <div class="settings-card-title-wrap">
              <div class="settings-icon-badge badge-tint-green">
                ${getIcon('smartphone', 18)}
              </div>
              <div>
                <h3 class="settings-card-title">Comandi Rapidi iOS &amp; Siri</h3>
                <p class="settings-card-sub">Inserimento istantaneo dal Tasto Azione o Widget iPhone</p>
              </div>
            </div>
            <span class="badge badge--positive">iOS Shortcuts</span>
          </div>

          <p class="settings-body-copy">
            Nell'app <strong>Comandi Rapidi</strong> su iPhone usa l'azione <em>"Apri URL"</em> con parametri precompilati per registrare una spesa al volo:
          </p>

          <div class="settings-code-snippet">
            #quick-add?amount=15.00&amp;cat=Alimentari&amp;desc=Pranzo
          </div>

          <div class="settings-actions-footer">
            <button class="apple-btn-secondary" id="btn-test-quick-add">
              ${getIcon('utenze', 14)}
              <span>Simula Inserimento Rapido</span>
            </button>
          </div>
        </section>

      </div>
    `;
  }

  renderAccountModal() {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    if (this.activeSubtab !== 'conti') return;

    const providers = financeStore.getProviders();

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay" id="account-modal-overlay">
        <div class="apple-modal-sheet" id="account-modal-sheet" style="max-width: 500px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="account-modal-close">Annulla</button>
            <h3>Nuovo Conto</h3>
            <button class="modal-save-btn" id="account-modal-save">Aggiungi</button>
          </div>
          <form class="modal-form" id="add-account-form" onsubmit="return false;">

            <div class="form-group">
              <label class="form-label" for="new-acc-provider">Banca o Provider</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="new-acc-provider" class="apple-select apple-input">
                  ${providers.map(p => `<option value="${p}">${p}</option>`).join('')}
                  <option value="__custom__">+ Altro Provider / Banca...</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <div class="form-group" id="custom-provider-group" style="display: none;">
              <label class="form-label" for="new-acc-custom-provider">Nome Nuovo Provider</label>
              <input type="text" id="new-acc-custom-provider" class="apple-input" placeholder="Es. Directa, BBVA, Fineco, Scalable..." />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-acc-name">Nome Identificativo del Conto</label>
              <input type="text" id="new-acc-name" class="apple-input" placeholder="Es. Conto Principale, Broker ETF, Carta..." required />
            </div>

            <div class="form-group">
              <label class="form-label" for="new-acc-type">Tipologia Conto</label>
              <div class="apple-select-wrapper form-select-wrapper">
                <select id="new-acc-type" class="apple-select apple-input" required>
                  <option value="Liquidità corrente">Liquidità Corrente (Conto o Carta)</option>
                  <option value="Broker / Investimenti">Broker / Piattaforma Investimenti (Holdings &amp; Liquidità)</option>
                  <option value="Previdenza complementare">Previdenza Complementare (Fondo Pensione)</option>
                  <option value="Buoni Pasto / Benefit">Buoni Pasto / Benefit Spesa</option>
                  <option value="Liquidità contante">Liquidità Contante</option>
                </select>
                <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>

            <!-- Sezione standard per conti non-broker -->
            <div class="form-group" id="standard-balance-group">
              <label class="form-label" for="new-acc-balance">Saldo Iniziale (€)</label>
              <input type="number" id="new-acc-balance" class="apple-input apple-input-lg" placeholder="0,00" step="0.01" />
            </div>

            <!-- Sezione specifica per Broker / Investimenti a due livelli -->
            <div id="broker-extra-fields" style="display: none; background: var(--bg-hover); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
              <div class="form-group" style="margin-bottom: 12px;">
                <label class="form-label" for="new-acc-cash">Liquidità Libera non investita (€)</label>
                <input type="number" id="new-acc-cash" class="apple-input" placeholder="0,00" step="0.01" value="0.00" />
                <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-top: 4px;">Liquidità sul broker in attesa di investimento o remunerata</span>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="new-acc-holding-search">Primo Strumento da JustETF (Opzionale)</label>
                <input type="text" id="new-acc-holding-search" class="apple-input" placeholder="Cerca Ticker o ISIN (es. XEON, VWCE, SWDA...)" />
                <div id="new-acc-holding-preview" style="display: none; margin-top: 10px;"></div>
                <div id="new-acc-holding-val-row" style="display: none; margin-top: 10px;">
                  <label class="form-label" for="new-acc-holding-val">Valore Iniziale Investito (€)</label>
                  <input type="number" id="new-acc-holding-val" class="apple-input" placeholder="0,00" step="0.01" />
                </div>
              </div>
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

    const providerSelect = document.getElementById('new-acc-provider');
    const customGroup = document.getElementById('custom-provider-group');
    const customInput = document.getElementById('new-acc-custom-provider');
    const nameInput = document.getElementById('new-acc-name');
    const typeSelect = document.getElementById('new-acc-type');
    const standardBalGroup = document.getElementById('standard-balance-group');
    const brokerExtra = document.getElementById('broker-extra-fields');
    const holdingSearch = document.getElementById('new-acc-holding-search');
    const holdingPreview = document.getElementById('new-acc-holding-preview');
    const holdingValRow = document.getElementById('new-acc-holding-val-row');

    if (providerSelect && nameInput) {
      if (!nameInput.value) nameInput.value = providerSelect.value;
      providerSelect.addEventListener('change', () => {
        if (providerSelect.value === '__custom__') {
          if (customGroup) customGroup.style.display = 'block';
          if (customInput) customInput.focus();
        } else {
          if (customGroup) customGroup.style.display = 'none';
          nameInput.value = providerSelect.value;
          const pLower = providerSelect.value.toLowerCase();
          if (pLower.includes('republic') || pLower.includes('directa') || pLower.includes('degiro') || pLower.includes('scalable') || pLower.includes('interactive') || pLower.includes('broker')) {
            if (typeSelect) {
              typeSelect.value = 'Broker / Investimenti';
              typeSelect.dispatchEvent(new Event('change'));
            }
          }
        }
      });
    }

    if (typeSelect) {
      typeSelect.addEventListener('change', () => {
        const isBroker = typeSelect.value === 'Broker / Investimenti';
        if (isBroker) {
          if (standardBalGroup) standardBalGroup.style.display = 'none';
          if (brokerExtra) brokerExtra.style.display = 'block';
        } else {
          if (standardBalGroup) standardBalGroup.style.display = 'block';
          if (brokerExtra) brokerExtra.style.display = 'none';
        }
      });
    }

    if (holdingSearch) {
      holdingSearch.addEventListener('input', (e) => {
        const q = e.target.value.trim();
        const detected = AssetCatalogService.lookupAsset(q);
        if (detected) {
          if (holdingPreview) {
            holdingPreview.style.display = 'block';
            holdingPreview.innerHTML = `
              <div style="background: rgba(0, 113, 227, 0.08); border: 1px solid rgba(0, 113, 227, 0.25); border-radius: var(--radius-md); padding: 8px 12px; display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div style="min-width: 0; flex: 1;">
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <strong style="color: ${detected.color}; font-size: 13px;">${detected.ticker}</strong>
                    <span class="badge badge--neutral" style="font-size: 10px; padding: 1px 6px;">${detected.classLabel}</span>
                  </div>
                  <div style="font-size: 11px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${detected.name} • TER ${detected.ter}%
                  </div>
                </div>
                <span style="font-size: 11px; color: var(--apple-green); font-weight: 600;">✓ Riconosciuto</span>
              </div>
            `;
          }
          if (holdingValRow) holdingValRow.style.display = 'block';
        } else {
          if (holdingPreview) holdingPreview.style.display = 'none';
          if (holdingValRow) holdingValRow.style.display = 'none';
        }
      });
    }
  }

  openAccountModal() {
    this.isAccountModalOpen = true;
    document.body.classList.add('modal-open');
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
    document.body.classList.remove('modal-open');
    const overlay = document.getElementById('account-modal-overlay');
    const sheet = document.getElementById('account-modal-sheet');
    if (sheet) sheet.classList.remove('open');
    setTimeout(() => {
      if (overlay) overlay.classList.remove('open');
    }, 250);
  }

  handleSaveAccount() {
    const providerSelect = document.getElementById('new-acc-provider');
    const customInput = document.getElementById('new-acc-custom-provider');
    let provider = providerSelect?.value;
    if (provider === '__custom__') {
      provider = customInput?.value.trim() || 'Altro Provider';
    }

    const name = document.getElementById('new-acc-name')?.value.trim() || provider;
    const type = document.getElementById('new-acc-type')?.value;
    const isBroker = type === 'Broker / Investimenti';

    if (!name) {
      const saveBtn = document.getElementById('account-modal-save');
      if (saveBtn) {
        saveBtn.classList.add('shake');
        setTimeout(() => saveBtn.classList.remove('shake'), 400);
      }
      return;
    }

    if (provider) {
      financeStore.addProvider(provider);
    }

    let balance = 0;
    let cashBalance = 0;
    const holdings = [];

    if (isBroker) {
      cashBalance = parseFloat(document.getElementById('new-acc-cash')?.value) || 0;
      const holdingVal = parseFloat(document.getElementById('new-acc-holding-val')?.value) || 0;
      const holdingSearchVal = document.getElementById('new-acc-holding-search')?.value.trim();

      if (holdingSearchVal && holdingVal > 0) {
        const detected = AssetCatalogService.lookupAsset(holdingSearchVal);
        const ticker = (detected?.ticker || holdingSearchVal).toUpperCase();
        holdings.push({
          id: 'holding_' + Date.now(),
          ticker,
          isin: detected?.isin || 'N/D',
          name: detected?.name || ticker,
          assetClass: detected?.assetClass || 'azionario_globale',
          assetClassLabel: detected?.classLabel || 'Investimento Finanziario',
          currentValue: holdingVal,
          shares: 0,
          price: 0,
          color: detected?.color || '#0071E3',
          emergencyMonthsQuota: ticker === 'XEON' ? Math.min(holdingVal, 5000) : 0,
          safeInvestmentQuota: ticker === 'XEON' ? Math.max(0, holdingVal - 5000) : 0,
          isPac: ticker === 'VWCE'
        });
      }
      balance = Math.round((cashBalance + holdingVal) * 100) / 100;
    } else {
      balance = parseFloat(document.getElementById('new-acc-balance')?.value) || 0;
    }

    financeStore.addAccount({
      name,
      provider,
      type,
      balance,
      cashBalance,
      isBroker,
      holdings
    });

    this.closeAccountModal();

    const container = document.getElementById('main-viewport');
    if (container) {
      setTimeout(() => this.render(container), 260);
    }
  }

  // === BACKUP & EXPORT ICLOUD DRIVE ===
  exportBackupJson() {
    const data = financeStore.exportBackupData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `finanze_backup_${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  exportTransactionsCsv() {
    const txs = financeStore.getAllTransactions();
    const headers = ['ID', 'Data', 'Mese', 'Anno', 'Descrizione', 'Importo', 'Tipo', 'Categoria', 'Conto', 'Conto Destinazione'];
    const rows = txs.map(t => [
      t.id,
      t.date,
      t.month,
      t.year,
      `"${(t.description || '').replace(/"/g, '""')}"`,
      (t.amount || 0).toFixed(2).replace('.', ','),
      t.type,
      `"${(t.category || '').replace(/"/g, '""')}"`,
      `"${(t.account || '').replace(/"/g, '""')}"`,
      `"${(t.toAccount || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `movimenti_export_${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  handleImportBackupFile(file, container) {
    if (!file) return;
    if (!confirm('ATTENZIONE: Il ripristino sovrascriverà i dati correnti con quelli del file di backup.\nVuoi procedere?')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const res = financeStore.importBackupData(content);
        if (res.success) {
          alert('✅ Dati ripristinati con successo dal file di backup!');
          this.render(container);
        } else {
          alert('❌ Errore durante il ripristino: ' + res.error);
        }
      } catch (err) {
        alert('❌ Errore nella lettura del file: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  openConguaglioModal(acc, newBal, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    document.body.classList.add('modal-open');

    const oldBal = parseFloat(acc.balance) || 0;
    const delta = Math.round((newBal - oldBal) * 100) / 100;
    const isPositive = delta >= 0;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="conguaglio-modal-overlay">
        <div class="apple-modal-sheet open" id="conguaglio-modal-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="conguaglio-cancel">Annulla</button>
            <h3>Conguaglio Saldo</h3>
            <button class="modal-save-btn" id="conguaglio-confirm">Conferma</button>
          </div>
          <div class="modal-form">
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: var(--space-text-sub); line-height: var(--lh-body);">
              Stai modificando il saldo del conto <strong>${acc.name}</strong>.
            </p>

            <div class="conguaglio-box">
              <div class="conguaglio-delta-row">
                <span style="font-size: 13px; color: var(--text-secondary);">Saldo Attuale:</span>
                <strong class="privacy-mask">${this.formatCurrency(oldBal)}</strong>
              </div>
              <div class="conguaglio-delta-row">
                <span style="font-size: 13px; color: var(--text-secondary);">Nuovo Saldo:</span>
                <strong class="privacy-mask">${this.formatCurrency(newBal)}</strong>
              </div>
              <div class="conguaglio-delta-row" style="margin-top: var(--space-text-title); padding-top: var(--space-text-title); border-top: 1px dashed var(--border-subtle);">
                <span style="font-size: 13px; font-weight: 600;">Differenza (Delta):</span>
                <span class="conguaglio-delta-val ${isPositive ? 'positive' : 'negative'}">
                  ${isPositive ? '+' : ''}${this.formatCurrency(delta)}
                </span>
              </div>
            </div>

            <label class="form-label" style="margin-top: var(--space-box-gap-md);">Come registrare questo conguaglio?</label>
            <div class="conguaglio-options">
              <label class="conguaglio-option-label">
                <input type="radio" name="conguaglio-choice" value="real" checked />
                <div>
                  <strong style="font-size: 13px; display: block; color: var(--text-primary); line-height: var(--lh-title);">Crea movimento di conguaglio reale</strong>
                  <span style="font-size: 11px; color: var(--text-secondary); line-height: var(--lh-body);">
                    Genera una transazione (${isPositive ? 'Entrata' : 'Uscita'}) in data odierna con categoria "Conguaglio / Rettifica" per giustificare la variazione nei grafici e nello storico.
                  </span>
                </div>
              </label>

              <label class="conguaglio-option-label">
                <input type="radio" name="conguaglio-choice" value="fictional" />
                <div>
                  <strong style="font-size: 13px; display: block; color: var(--text-primary); line-height: var(--lh-title);">Solo rettifica fittizia (Nessun movimento)</strong>
                  <span style="font-size: 11px; color: var(--text-secondary); line-height: var(--lh-body);">
                    Aggiorna solo il saldo attuale del conto senza inserire alcuna transazione nello storico dei movimenti.
                  </span>
                </div>
              </label>
            </div>

            <div class="form-group" id="conguaglio-note-group" style="margin-top: var(--space-box-gap-md);">
              <label class="form-label" for="conguaglio-note">Nota per il movimento</label>
              <input type="text" id="conguaglio-note" class="apple-input" value="Rettifica Saldo ${acc.name}" />
            </div>

          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('conguaglio-modal-overlay');
    const close = () => {
      document.body.classList.remove('modal-open');
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('conguaglio-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    const radios = overlay.querySelectorAll('input[name="conguaglio-choice"]');
    const noteGroup = document.getElementById('conguaglio-note-group');
    radios.forEach(r => {
      r.addEventListener('change', () => {
        if (noteGroup) {
          noteGroup.style.display = r.value === 'real' ? 'block' : 'none';
        }
      });
    });

    document.getElementById('conguaglio-confirm')?.addEventListener('click', () => {
      const selected = overlay.querySelector('input[name="conguaglio-choice"]:checked')?.value;
      const isReal = selected === 'real';
      const note = document.getElementById('conguaglio-note')?.value.trim();

      financeStore.reconcileAccount(acc.name, newBal, isReal, note);
      close();
      this.render(container);
    });
  }

  saveSalaryParameters(container) {
    const base = parseFloat(document.getElementById('salary-base')?.value) || 1700.00;
    const payday = parseInt(document.getElementById('salary-payday')?.value, 10) || 25;
    const allowances = parseFloat(document.getElementById('salary-allowances')?.value) || 0;

    const has13 = Boolean(document.getElementById('salary-has-13th')?.checked);
    const m13 = parseInt(document.getElementById('salary-13th-month')?.value, 10) || 11;
    const amt13 = parseFloat(document.getElementById('salary-13th-amount')?.value) || base;

    const has14 = Boolean(document.getElementById('salary-has-14th')?.checked);
    const m14 = parseInt(document.getElementById('salary-14th-month')?.value, 10) || 6;
    const amt14 = parseFloat(document.getElementById('salary-14th-amount')?.value) || base;

    const hasBonus = Boolean(document.getElementById('salary-has-bonus')?.checked);
    const mBonus = parseInt(document.getElementById('salary-bonus-month')?.value, 10) || 4;
    const amtBonus = parseFloat(document.getElementById('salary-bonus-amount')?.value) || 1200;

    financeStore.saveSalaryConfig({
      baseSalary: base,
      payDay: payday,
      has13th: has13,
      thirteenthAmount: amt13,
      thirteenthMonth: m13,
      has14th: has14,
      fourteenthAmount: amt14,
      fourteenthMonth: m14,
      hasProductionBonus: hasBonus,
      productionBonusAmount: amtBonus,
      productionBonusMonth: mBonus,
      extraMonthlyAllowances: allowances
    });

    const feedback = document.getElementById('salary-save-feedback');
    if (feedback) {
      feedback.style.display = 'inline-flex';
      setTimeout(() => {
        this.render(container);
      }, 850);
    } else {
      this.render(container);
    }
  }

  async triggerForceSync(container) {
    const feedbackEl = document.getElementById('connection-test-feedback');
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.className = 'connection-feedback loading';
      feedbackEl.textContent = 'Scaricamento e allineamento conti, saldi e movimenti da Google Sheets in corso...';
    }

    try {
      const data = await googleSheetsService.fetchAllData(true);
      if (data) {
        financeStore.syncCloudData(data);
        const accCount = financeStore.getAccounts().length;
        const txCount = Array.isArray(data.transactions) ? data.transactions.length : 0;
        if (feedbackEl) {
          feedbackEl.className = 'connection-feedback success';
          feedbackEl.textContent = `Sincronizzazione completata! ${accCount} conti reali e ${txCount} movimenti allineati al foglio.`;
        }
        setTimeout(() => this.render(container), 800);
      } else if (feedbackEl) {
        feedbackEl.className = 'connection-feedback error';
        feedbackEl.textContent = 'Nessun dato ricevuto da Google Sheets o configurazione non valida.';
      }
    } catch (err) {
      if (feedbackEl) {
        feedbackEl.className = 'connection-feedback error';
        feedbackEl.textContent = 'Errore durante la sincronizzazione: ' + (err.message || err);
      }
    }
  }

  bindEvents(container) {
    // Sotto-navigazione Segmentata Apple / Workout Capsule
    container.querySelectorAll('#impostazioni-subtabs button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sub = e.currentTarget.dataset.subtab;
        if (sub && sub !== this.activeSubtab) {
          this.activeSubtab = sub;
          if (window.location.hash !== `#impostazioni-${sub}`) {
            window.location.hash = `impostazioni-${sub}`;
          }
          this.render(container);
        }
      });
    });

    // Azioni Nuovo Conto (Header Desktop + Toolbar Card)
    container.querySelectorAll('#btn-add-account-modal, .js-add-account-modal').forEach(btn => {
      btn.addEventListener('click', () => this.openAccountModal());
    });

    // Studio Chiusura Fine Mese & Conguagli (Header Desktop + Toolbar Card)
    container.querySelectorAll('#btn-open-closing-studio, .js-open-closing-studio').forEach(btn => {
      btn.addEventListener('click', () => {
        monthlyClosingModal.open({
          onSuccess: () => this.render(container)
        });
      });
    });

    // Focus rapido Nuova Categoria da Header Desktop
    const btnFocusNewCat = container.querySelector('#btn-focus-new-cat');
    if (btnFocusNewCat) {
      btnFocusNewCat.addEventListener('click', () => {
        const input = container.querySelector('#new-cat-name');
        if (input) input.focus();
      });
    }

    // Aggiornamento Saldo Conto Inline con Conguaglio Apple
    container.querySelectorAll('.apple-btn-save-inline').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const input = container.querySelector(`.acc-balance-input[data-id="${id}"]`);
        const accounts = financeStore.getAccounts();
        const acc = accounts.find(a => a.id === id);
        if (input && acc) {
          const newBal = parseFloat(input.value);
          if (isNaN(newBal)) return;
          if (Math.abs(newBal - acc.balance) > 0.001) {
            this.openConguaglioModal(acc, newBal, container);
          } else {
            monthlyClosingModal.open({
              focusAccount: acc.name,
              onSuccess: () => this.render(container)
            });
          }
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

    // Salva Parametri Stipendio, 13esima, 14esima & Benefit
    container.querySelectorAll('#btn-save-salary-config, .js-save-salary-config').forEach(btn => {
      btn.addEventListener('click', () => this.saveSalaryParameters(container));
    });

    // Creazione Categoria (Click + Invio)
    const btnCreateCat = document.getElementById('btn-create-cat');
    const newCatInput = document.getElementById('new-cat-name');
    const createCategoryHandler = () => {
      const typeSelect = document.getElementById('new-cat-type');
      if (newCatInput && newCatInput.value.trim()) {
        financeStore.addCategory({ name: newCatInput.value, type: typeSelect?.value || 'expense' });
        this.render(container);
      }
    };
    if (btnCreateCat) {
      btnCreateCat.addEventListener('click', createCategoryHandler);
    }
    if (newCatInput) {
      newCatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          createCategoryHandler();
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

    // Accorpamento Categorie Smart Merge
    const btnMerge = document.getElementById('btn-merge-categories');
    if (btnMerge) {
      btnMerge.addEventListener('click', () => {
        const src = document.getElementById('merge-source-cat')?.value;
        const dest = document.getElementById('merge-target-cat')?.value;
        if (!src || !dest || src === dest) {
          alert('Seleziona due categorie diverse per procedere con l\'accorpamento.');
          return;
        }
        if (confirm(`Sei sicuro di voler accorpare la categoria "${src}" dentro "${dest}"?\nTutti i movimenti passati verranno convertiti a "${dest}".`)) {
          const res = financeStore.mergeCategories(src, dest);
          alert(`Accorpamento completato con successo!\n${res.updatedCount} movimenti storici convertiti in "${dest}".`);
          this.render(container);
        }
      });
    }

    // Salva / Rimuovi PIN
    const btnSavePin = document.getElementById('btn-save-pin');
    if (btnSavePin) {
      btnSavePin.addEventListener('click', () => {
        const pinVal = document.getElementById('input-security-pin')?.value.trim();
        if (pinVal && pinVal.length === 4 && /^\d{4}$/.test(pinVal)) {
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
          if (typeof BiometricService !== 'undefined') {
            BiometricService.setEnabled(false);
          }
          this.render(container);
        }
      });
    }

    // Toggle Biometrico Face ID / Touch ID
    const bioToggle = container.querySelector('#biometric-toggle');
    if (bioToggle) {
      bioToggle.addEventListener('change', async () => {
        if (!financeStore.isPinEnabled() || !financeStore.getPin()) {
          alert('Attenzione: Imposta prima un codice PIN a 4 cifre per poter attivare lo sblocco biometrico.');
          bioToggle.checked = false;
          return;
        }

        if (bioToggle.checked) {
          try {
            if (typeof BiometricService !== 'undefined') {
              const enrolled = await BiometricService.enrollBiometric();
              if (enrolled) {
                alert('✅ Face ID / Touch ID abilitato con successo!');
              } else {
                bioToggle.checked = false;
              }
            } else {
              bioToggle.checked = false;
              alert('Servizio biometrico non disponibile.');
            }
          } catch (err) {
            bioToggle.checked = false;
            alert(err.message || 'Riconoscimento biometrico non riuscito.');
          }
        } else if (typeof BiometricService !== 'undefined') {
          BiometricService.setEnabled(false);
        }
      });
    }

    // Toggle Sandbox Mode
    const sandboxToggle = document.getElementById('gas-sandbox-toggle');
    if (sandboxToggle) {
      sandboxToggle.addEventListener('change', (e) => {
        googleSheetsService.setSandboxMode(e.target.checked);
        this.render(container);
      });
    }

    // Sheets Config
    const btnSaveSheets = document.getElementById('btn-save-sheets-config');
    if (btnSaveSheets) {
      btnSaveSheets.addEventListener('click', async () => {
        const url = (document.getElementById('gas-url-input')?.value || '').trim();
        const token = (document.getElementById('gas-token-input')?.value || '').trim();
        const isSandbox = document.getElementById('gas-sandbox-toggle')?.checked ?? googleSheetsService.isSandboxMode();

        const feedbackEl = document.getElementById('connection-test-feedback');
        if (feedbackEl) {
          feedbackEl.style.display = 'block';
          feedbackEl.className = 'connection-feedback loading';
          feedbackEl.textContent = 'Salvataggio e verifica parametri in corso...';
        }

        googleSheetsService.saveConfig(url, token, true, isSandbox);

        if (url) {
          const testRes = await googleSheetsService.testConnection();
          if (feedbackEl) {
            feedbackEl.className = `connection-feedback ${testRes.success ? 'success' : 'error'}`;
            feedbackEl.textContent = testRes.message;
          }
          if (testRes.success) {
            const cloudData = await googleSheetsService.fetchAllData();
            if (cloudData && typeof window !== 'undefined' && window.app) {
              window.app.applyCloudData(cloudData);
            }
            setTimeout(() => this.render(container), 1000);
          }
        } else {
          if (feedbackEl) {
            feedbackEl.className = 'connection-feedback success';
            feedbackEl.textContent = 'Parametri salvati (Modalità locale attiva).';
          }
          setTimeout(() => this.render(container), 800);
        }
      });
    }

    container.querySelectorAll('#btn-share-cloud-settings, .js-share-cloud-settings').forEach(btn => {
      btn.addEventListener('click', () => {
        if (typeof window !== 'undefined' && window.app) {
          window.app.openShareConfigModal();
        }
      });
    });

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

    container.querySelectorAll('#btn-force-sync-now, .js-force-sync-now').forEach(btn => {
      btn.addEventListener('click', () => this.triggerForceSync(container));
    });

    // Backup & Snapshot iCloud Drive / File Locale
    const btnExpJson = document.getElementById('btn-export-backup-json');
    if (btnExpJson) {
      btnExpJson.addEventListener('click', () => this.exportBackupJson());
    }

    const btnExpCsv = document.getElementById('btn-export-tx-csv');
    if (btnExpCsv) {
      btnExpCsv.addEventListener('click', () => this.exportTransactionsCsv());
    }

    const btnImpTrigger = document.getElementById('btn-import-backup-trigger');
    const inputBackupFile = document.getElementById('input-backup-file');
    if (btnImpTrigger && inputBackupFile) {
      btnImpTrigger.addEventListener('click', () => inputBackupFile.click());
      inputBackupFile.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          this.handleImportBackupFile(file, container);
        }
      });
    }

    // Prova rapida Scorciatoia iOS
    document.getElementById('btn-test-quick-add')?.addEventListener('click', () => {
      window.location.hash = 'quick-add?amount=15.00&cat=Alimentari&desc=Pranzo';
    });
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
  spese: {
    id: 'spese',
    title: 'Spese & Budget',
    subtitle: 'Analisi avanzata uscite, buste 50/30/20 e merchant'
  },
  movimenti: {
    id: 'movimenti',
    title: 'Movimenti',
    subtitle: 'Registro transazioni reale'
  },
  investimenti: {
    id: 'investimenti',
    title: 'Investimenti',
    subtitle: 'Allocazione asset, XEON, VWCE & Liquidità Trade Republic'
  },
  storico: {
    id: 'storico',
    title: 'Storico Patrimonio',
    subtitle: 'Evoluzione Patrimonio Effettivo & Previdenza'
  },
  assistente: {
    id: 'assistente',
    title: 'Assistente Finanziario',
    subtitle: 'Personal CFO, runway, ottimizzazione fiscale & analisi proattiva'
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
    this.speseView = new SpeseView();
    this.assistenteView = new AssistenteView();
    this.movimentiView = new MovimentiView();
    this.investimentiView = new InvestimentiView();
    this.storicoView = new StoricoView();
    this.impostazioniView = new ImpostazioniView();
    this.isUnlocked = !financeStore.isPinEnabled();
    this.init();
  }

  init() {
    window.app = this;
    window.googleSheetsService = googleSheetsService;
    window.financeStore = financeStore;
    this.renderDate();
    googleSheetsService.updateStatusBadge();

    if (financeStore.isPrivacyMode()) {
      document.body.classList.add('privacy-mode');
    }

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

    const unlockBiometrically = async () => {
      if (typeof BiometricService !== 'undefined' && BiometricService.isEnabled()) {
        try {
          const success = await BiometricService.authenticate();
          if (success) {
            this.isUnlocked = true;
            lockEl.style.opacity = '0';
            setTimeout(() => {
              lockEl.style.display = 'none';
              this.startApp();
            }, 300);
            return true;
          }
        } catch (e) {
          console.warn('Biometric auth error:', e);
        }
      }
      return false;
    };

    // Configurazione visibilità pulsanti biometrici Face ID / Touch ID
    const hasBiometric = typeof BiometricService !== 'undefined' && BiometricService.isEnabled();
    const bioKey = lockEl.querySelector('#pin-key-biometric');
    const emptyFallback = lockEl.querySelector('#pin-key-empty-fallback');
    const bioPrompt = lockEl.querySelector('#lock-biometric-prompt');
    const quickBioBtn = lockEl.querySelector('#btn-quick-biometric');

    if (hasBiometric) {
      if (bioKey) bioKey.style.display = 'flex';
      if (emptyFallback) emptyFallback.style.display = 'none';
      if (bioPrompt) bioPrompt.style.display = 'block';
      if (quickBioBtn) quickBioBtn.onclick = () => unlockBiometrically();

      // Auto-trigger biometric prompt all'avvio dopo 300ms
      setTimeout(() => {
        if (!this.isUnlocked) unlockBiometrically();
      }, 300);
    } else {
      if (bioKey) bioKey.style.display = 'none';
      if (emptyFallback) emptyFallback.style.display = 'block';
      if (bioPrompt) bioPrompt.style.display = 'none';
    }

    lockEl.querySelectorAll('.pin-key').forEach(key => {
      key.onclick = () => {
        const val = key.dataset.val;
        if (val === 'biometric') {
          unlockBiometrically();
        } else if (val === 'back') {
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
    const parts = rawHash.split('-');
    const tabName = parts[0].split('?')[0];
    const subtab = parts[1] ? parts[1].split('?')[0] : null;
    const initialTab = VIEWS[tabName] ? tabName : 'dashboard';

    if (subtab) {
      if (initialTab === 'movimenti') this.movimentiView.activeSubtab = subtab;
      else if (initialTab === 'investimenti') this.investimentiView.activeSubtab = subtab;
      else if (initialTab === 'impostazioni') this.impostazioniView.activeSubtab = subtab;
    }

    this.switchTab(initialTab, subtab);

    window.addEventListener('hashchange', () => {
      const currentRaw = window.location.hash.replace('#', '');
      const curParts = currentRaw.split('-');
      const curTab = curParts[0].split('?')[0];
      const curSub = curParts[1] ? curParts[1].split('?')[0] : null;
      if (VIEWS[curTab]) {
        if (curSub) {
          if (curTab === 'movimenti') this.movimentiView.activeSubtab = curSub;
          else if (curTab === 'investimenti') this.investimentiView.activeSubtab = curSub;
          else if (curTab === 'impostazioni') this.impostazioniView.activeSubtab = curSub;
        }
        this.switchTab(curTab, curSub);
      }
      this.handleQuickAddRoute();
      this.handleCloudSetupRoute();
    });

    this.handleQuickAddRoute();
    this.handleCloudSetupRoute();

    // Auto-sync al boot se configurato
    if (googleSheetsService.isConfigured() && googleSheetsService.autoSync) {
      googleSheetsService.fetchAllData().then(data => {
        if (data) {
          this.applyCloudData(data);
        }
      }).catch(err => console.warn('Sync background:', err));
    }
  }

  applyCloudData(data) {
    if (!data) return;
    const updated = financeStore.syncCloudData(data);
    if (updated) {
      const container = document.getElementById('main-viewport');
      if (!container) return;
      if (this.currentTab === 'dashboard') this.dashboardView.render(container);
      else if (this.currentTab === 'spese') this.speseView.render(container);
      else if (this.currentTab === 'assistente') this.assistenteView.render(container);
      else if (this.currentTab === 'movimenti') this.movimentiView.render(container);
      else if (this.currentTab === 'investimenti') this.investimentiView.render(container);
      else if (this.currentTab === 'storico') this.storicoView.render(container);
      else if (this.currentTab === 'impostazioni') this.impostazioniView.render(container);
    }
  }

  handleCloudSetupRoute() {
    const rawHash = window.location.hash || '';
    if (rawHash.includes('cloud-setup')) {
      const qIdx = rawHash.indexOf('?');
      const params = qIdx !== -1 ? new URLSearchParams(rawHash.slice(qIdx + 1)) : new URLSearchParams();
      const url = params.get('url');
      const token = params.get('token');
      if (url && token) {
        try {
          history.replaceState(null, null, window.location.pathname + '#impostazioni');
        } catch (e) {}
        this.promptCloudSetup(url, token);
      }
    }
  }

  async promptCloudSetup(url, token) {
    const confirmed = confirm(
      "☁️ Configurazione Google Sheets Rilevata!\n\n" +
      "È stato trovato un collegamento per il foglio Google Sheets.\n\n" +
      "Vuoi configurare questo dispositivo per sincronizzare movimenti e saldi?"
    );

    if (confirmed) {
      googleSheetsService.saveConfig(url, token, true, false);
      const testRes = await googleSheetsService.testConnection();
      if (testRes.success) {
        alert("✅ Collegamento stabilito con successo!\nScaricamento dei dati dal foglio in corso...");
        const cloudData = await googleSheetsService.fetchAllData();
        if (cloudData) {
          this.applyCloudData(cloudData);
        }
        this.switchTab('dashboard');
      } else {
        alert("⚠️ Impossibile completare il collegamento automatico:\n" + testRes.message);
        this.switchTab('impostazioni', 'sheets');
      }
    }
  }

  openCloudSyncModal() {
    const existing = document.getElementById('apple-cloud-sync-modal');
    if (existing) existing.remove();

    document.body.classList.add('modal-open');

    const isCfg = googleSheetsService.isConfigured();
    const isSandbox = googleSheetsService.isSandboxMode();
    const status = googleSheetsService.syncStatus;
    const pendingCount = googleSheetsService.getPendingQueueCount();
    const lastSyncIso = localStorage.getItem('finanze_last_sync');
    let lastSyncFormatted = 'Mai sincronizzato';
    if (lastSyncIso) {
      try {
        const d = new Date(lastSyncIso);
        const hours = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        lastSyncFormatted = `${day}/${month} alle ${hours}:${mins}`;
      } catch (e) {}
    }

    const txCount = financeStore.getAllTransactions().length;
    const accCount = financeStore.getAccounts().length;

    let statusPill = '';
    let statusTitle = '';
    let statusDesc = '';

    if (!isCfg) {
      statusPill = '<span class="badge badge--neutral" style="font-size: 12px; padding: 4px 10px;">📱 Modalità Locale</span>';
      statusTitle = 'Nessun foglio Google collegato';
      statusDesc = 'I dati sono salvati esclusivamente sul browser di questo dispositivo. Puoi collegare il tuo Google Sheet in qualsiasi momento per attivare il backup su cloud gratuito.';
    } else if (isSandbox) {
      statusPill = '<span class="badge badge--warning" style="font-size: 12px; padding: 4px 10px;">🛡️ Sandbox Attiva</span>';
      statusTitle = 'Google Sheets (Protetto)';
      statusDesc = 'Modalità sandbox attiva: i dati vengono letti dal foglio ma le modifiche non alterano il foglio Google Sheets.';
    } else if (status === 'error') {
      statusPill = '<span class="badge badge--negative" style="font-size: 12px; padding: 4px 10px;">⚠️ Errore Connessione</span>';
      statusTitle = 'Google Sheets non raggiungibile';
      statusDesc = 'Verifica la connessione internet, i permessi della distribuzione ("Chiunque") o la validità del Security Token.';
    } else {
      statusPill = '<span class="badge badge--positive" style="font-size: 12px; padding: 4px 10px;">🟢 Connesso & Sincronizzato</span>';
      statusTitle = 'Sincronizzazione Live Attiva';
      statusDesc = 'Ogni movimento, conguaglio e saldo è allineato e sincronizzato in tempo reale con il tuo foglio Google Sheets.';
    }

    const modalHtml = `
      <div class="apple-modal-overlay open" id="apple-cloud-sync-modal" style="z-index: 99999;">
        <div class="apple-modal-sheet" style="max-width: 480px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header-row" style="margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(0, 113, 227, 0.12); color: var(--apple-blue); display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
              <div>
                <h3 style="font-size: 17px; font-weight: 600; margin: 0; color: var(--text-primary); letter-spacing: -0.015em;">Google Sheets Cloud</h3>
                <span style="font-size: 12px; color: var(--text-secondary);">${statusTitle}</span>
              </div>
            </div>
            <button class="apple-modal-close" id="btn-close-cloud-modal" aria-label="Chiudi">&times;</button>
          </div>

          <div style="margin-bottom: var(--space-box-gap-md); display: flex; justify-content: flex-start;">
            ${statusPill}
          </div>

          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.45; margin-bottom: var(--space-box-gap-lg);">
            ${statusDesc}
          </p>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: var(--space-box-gap-lg);">
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Ultima Sincronizzazione</span>
              <strong style="font-size: 13px; color: var(--text-primary); font-variant-numeric: tabular-nums;">${lastSyncFormatted}</strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Modifiche in Coda</span>
              <strong style="font-size: 13px; color: ${pendingCount > 0 ? 'var(--apple-orange)' : 'var(--text-primary)'}; font-variant-numeric: tabular-nums;">
                ${pendingCount > 0 ? `${pendingCount} da inviare` : '0 (Allineato)'}
              </strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Movimenti Registrati</span>
              <strong style="font-size: 13px; color: var(--text-primary); font-variant-numeric: tabular-nums;">${txCount} movimenti</strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px;">
              <span style="font-size: 11px; color: var(--text-tertiary); display: block; margin-bottom: 4px;">Conti Sincronizzati</span>
              <strong style="font-size: 13px; color: var(--text-primary); font-variant-numeric: tabular-nums;">${accCount} conti attivi</strong>
            </div>
          </div>

          <div id="cloud-modal-sync-feedback" style="display: none; padding: 10px 14px; border-radius: var(--radius-sm); font-size: 12.5px; margin-bottom: var(--space-box-gap-md);"></div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${isCfg ? `
              <button class="apple-btn-primary" id="btn-cloud-modal-sync" style="width: 100%; justify-content: center; height: 42px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" id="icon-sync-spin">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                </svg>
                <span>Sincronizza Ora</span>
              </button>
            ` : `
              <button class="apple-btn-primary" id="btn-cloud-modal-setup" style="width: 100%; justify-content: center; height: 42px;">
                <span>Configura Google Sheets</span>
              </button>
            `}
            
            <div style="display: flex; gap: 10px;">
              ${isCfg ? `
                <button class="apple-btn-secondary" id="btn-cloud-modal-share" style="flex: 1; justify-content: center;">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  <span>Passa a iPhone</span>
                </button>
              ` : ''}
              <button class="apple-btn-secondary" id="btn-cloud-modal-settings" style="flex: 1; justify-content: center;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Impostazioni Cloud</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modalEl = document.getElementById('apple-cloud-sync-modal');

    const closeModal = () => {
      document.body.classList.remove('modal-open');
      modalEl?.classList.remove('open');
      setTimeout(() => modalEl?.remove(), 260);
    };

    modalEl?.querySelector('#btn-close-cloud-modal')?.addEventListener('click', closeModal);
    modalEl?.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal();
    });

    modalEl?.querySelector('#btn-cloud-modal-settings')?.addEventListener('click', () => {
      closeModal();
      this.switchTab('impostazioni', 'sheets');
    });

    modalEl?.querySelector('#btn-cloud-modal-setup')?.addEventListener('click', () => {
      closeModal();
      this.switchTab('impostazioni', 'sheets');
    });

    modalEl?.querySelector('#btn-cloud-modal-share')?.addEventListener('click', () => {
      closeModal();
      this.openShareConfigModal();
    });

    const btnSyncNow = modalEl?.querySelector('#btn-cloud-modal-sync');
    if (btnSyncNow) {
      btnSyncNow.addEventListener('click', async () => {
        const feedback = modalEl.querySelector('#cloud-modal-sync-feedback');
        const iconSpin = modalEl.querySelector('#icon-sync-spin');
        if (iconSpin) iconSpin.style.animation = 'appleCloudPulse 0.8s infinite ease-in-out';
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = 'rgba(0, 113, 227, 0.12)';
          feedback.style.color = 'var(--apple-blue)';
          feedback.style.border = '1px solid rgba(0, 113, 227, 0.3)';
          feedback.textContent = 'Sincronizzazione in corso con Google Sheets...';
        }

        try {
          const cloudData = await googleSheetsService.fetchAllData(true);
          if (iconSpin) iconSpin.style.animation = '';
          if (cloudData) {
            this.applyCloudData(cloudData);
            if (feedback) {
              feedback.style.background = 'rgba(52, 199, 89, 0.14)';
              feedback.style.color = 'var(--apple-green)';
              feedback.style.border = '1px solid rgba(52, 199, 89, 0.35)';
              const txs = cloudData.transactions ? cloudData.transactions.length : 0;
              const sld = cloudData.saldi ? cloudData.saldi.length : 0;
              feedback.textContent = `✅ Sincronizzazione completata! ${txs} movimenti e ${sld} saldi allineati.`;
            }
            setTimeout(() => closeModal(), 1400);
          } else {
            if (feedback) {
              feedback.style.background = 'rgba(255, 59, 48, 0.14)';
              feedback.style.color = 'var(--apple-red)';
              feedback.style.border = '1px solid rgba(255, 59, 48, 0.35)';
              feedback.textContent = '⚠️ Errore di sincronizzazione: verifica lo script o la connessione.';
            }
          }
        } catch (err) {
          if (iconSpin) iconSpin.style.animation = '';
          if (feedback) {
            feedback.style.background = 'rgba(255, 59, 48, 0.14)';
            feedback.style.color = 'var(--apple-red)';
            feedback.style.border = '1px solid rgba(255, 59, 48, 0.35)';
            feedback.textContent = 'Errore: ' + (err.message || err);
          }
        }
      });
    }
  }

  openShareConfigModal() {
    const existing = document.getElementById('apple-share-config-modal');
    if (existing) existing.remove();

    document.body.classList.add('modal-open');

    const cfg = googleSheetsService.getConfig();
    const currentOrigin = window.location.origin || '';
    const currentPath = window.location.pathname || '';
    const setupLink = `${currentOrigin}${currentPath}#cloud-setup?url=${encodeURIComponent(cfg.webAppUrl)}&token=${encodeURIComponent(cfg.securityToken)}`;

    const modalHtml = `
      <div class="apple-modal-overlay open" id="apple-share-config-modal" style="z-index: 100000;">
        <div class="apple-modal-sheet" style="max-width: 460px;">
          <div class="modal-handle"></div>
          
          <div class="modal-header-row" style="margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: rgba(52, 199, 89, 0.12); color: var(--apple-green); display: flex; align-items: center; justify-content: center;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <div>
                <h3 style="font-size: 17px; font-weight: 600; margin: 0; color: var(--text-primary);">Passa a iPhone (1-Click)</h3>
                <span style="font-size: 12px; color: var(--text-secondary);">Accoppiamento Rapido</span>
              </div>
            </div>
            <button class="apple-modal-close" id="btn-close-share-modal" aria-label="Chiudi">&times;</button>
          </div>

          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.45; margin-bottom: var(--space-box-gap-md);">
            Invia questo link al tuo iPhone (tramite <strong>AirDrop</strong>, <strong>Messaggi</strong> o <strong>WhatsApp</strong>). Aprendolo, l'app configurerà automaticamente l'URL e la chiave segreta senza digitare nulla a mano!
          </p>

          <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; font-family: var(--font-mono); font-size: 11.5px; color: var(--apple-blue); word-break: break-all; max-height: 80px; overflow-y: auto; margin-bottom: var(--space-box-gap-md);">
            ${setupLink}
          </div>

          <div id="copy-link-feedback" style="display: none; padding: 8px 12px; border-radius: var(--radius-sm); background: rgba(52, 199, 89, 0.15); color: var(--apple-green); font-size: 12px; margin-bottom: var(--space-box-gap-md); text-align: center;">
            ✅ Link di configurazione copiato negli appunti!
          </div>

          <div style="display: flex; gap: 10px;">
            <button class="apple-btn-primary" id="btn-copy-setup-link" style="flex: 1; justify-content: center; height: 42px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copia Link Rapido</span>
            </button>
            <button class="apple-btn-secondary" id="btn-dismiss-share-modal">
              <span>Fatto</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modalEl = document.getElementById('apple-share-config-modal');

    const closeModal = () => {
      document.body.classList.remove('modal-open');
      modalEl?.classList.remove('open');
      setTimeout(() => modalEl?.remove(), 260);
    };

    modalEl?.querySelector('#btn-close-share-modal')?.addEventListener('click', closeModal);
    modalEl?.querySelector('#btn-dismiss-share-modal')?.addEventListener('click', closeModal);
    modalEl?.addEventListener('click', (e) => {
      if (e.target === modalEl) closeModal();
    });

    const btnCopy = modalEl?.querySelector('#btn-copy-setup-link');
    if (btnCopy) {
      btnCopy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(setupLink);
          const fb = modalEl.querySelector('#copy-link-feedback');
          if (fb) fb.style.display = 'block';
          btnCopy.querySelector('span').textContent = 'Copiato!';
          setTimeout(() => {
            if (btnCopy.querySelector('span')) btnCopy.querySelector('span').textContent = 'Copia Link Rapido';
          }, 3000);
        } catch (e) {
          prompt('Copia manualmente questo link:', setupLink);
        }
      });
    }
  }

  handleQuickAddRoute() {
    const rawHash = window.location.hash || '';
    if (rawHash.includes('quick-add')) {
      const qIdx = rawHash.indexOf('?');
      const params = qIdx !== -1 ? new URLSearchParams(rawHash.slice(qIdx + 1)) : new URLSearchParams();
      const amount = params.get('amount') || params.get('importo');
      const desc = params.get('desc') || params.get('descrizione') || '';
      const cat = params.get('cat') || params.get('categoria') || '';
      const type = params.get('type') || params.get('tipo') || 'expense';
      const account = params.get('account') || params.get('conto') || 'Buddybank';

      try {
        history.replaceState(null, null, window.location.pathname + '#movimenti');
      } catch (e) {}

      this.switchTab('movimenti');
      setTimeout(() => {
        if (this.movimentiView) {
          this.movimentiView.openModal({
            amount: amount ? parseFloat(amount) : null,
            description: desc,
            category: cat,
            type: type,
            account: account
          });
        }
      }, 200);
    }
  }

  bindEvents() {
    const togglePrivacy = () => {
      const isNow = !financeStore.isPrivacyMode();
      financeStore.setPrivacyMode(isNow);
      document.body.classList.toggle('privacy-mode', isNow);
    };

    const dPrivacyBtn = document.getElementById('privacy-toggle-btn');
    if (dPrivacyBtn) dPrivacyBtn.addEventListener('click', togglePrivacy);

    const mPrivacyBtn = document.getElementById('mobile-privacy-toggle-btn');
    if (mPrivacyBtn) mPrivacyBtn.addEventListener('click', togglePrivacy);

    // Apple Intelligence Buttons (Header Desktop & Mobile)
    const dAiBtn = document.getElementById('desktop-ai-btn');
    if (dAiBtn) dAiBtn.addEventListener('click', () => this.switchTab('assistente'));

    const mAiBtn = document.getElementById('mobile-ai-btn');
    if (mAiBtn) mAiBtn.addEventListener('click', () => this.switchTab('assistente'));

    // Mobile Settings Gear Button
    const mSettingsBtn = document.getElementById('mobile-settings-btn');
    if (mSettingsBtn) mSettingsBtn.addEventListener('click', () => this.switchTab('impostazioni'));

    // Cloud Sync Buttons (Mobile & Desktop)
    const mCloudBtn = document.getElementById('mobile-cloud-sync-btn');
    if (mCloudBtn) mCloudBtn.addEventListener('click', () => this.openCloudSyncModal());

    const dCloudBtn = document.getElementById('desktop-sheet-status-btn');
    if (dCloudBtn) {
      dCloudBtn.addEventListener('click', () => this.openCloudSyncModal());
      dCloudBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openCloudSyncModal();
        }
      });
    }

    // Ascolto sincronizzazione cloud completata per allineamento reattivo
    window.addEventListener('finanze:sync-completed', (e) => {
      if (e.detail && e.detail.data) {
        this.applyCloudData(e.detail.data);
      }
    });

    // Ascolto aggiornamenti saldi conti in tempo reale per re-render reattivo
    window.addEventListener('finanze:accounts-updated', () => {
      const container = document.getElementById('main-viewport');
      if (!container) return;
      if (this.currentTab === 'dashboard') {
        this.dashboardView.render(container);
      } else if (this.currentTab === 'impostazioni') {
        this.impostazioniView.render(container);
      } else if (this.currentTab === 'investimenti') {
        this.investimentiView.render(container);
      }
    });

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

  switchTab(tabId, subtab = null) {
    if (!VIEWS[tabId]) return;
    this.currentTab = tabId;
    const viewData = VIEWS[tabId];

    if (subtab) {
      if (tabId === 'movimenti') this.movimentiView.activeSubtab = subtab;
      else if (tabId === 'investimenti') this.investimentiView.activeSubtab = subtab;
      else if (tabId === 'impostazioni') this.impostazioniView.activeSubtab = subtab;
    }

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

    const targetHash = subtab ? `${tabId}-${subtab}` : tabId;
    if (window.location.hash.replace('#', '') !== targetHash) {
      window.location.hash = targetHash;
    }

    const container = document.getElementById('main-viewport');
    if (!container) return;

    container.scrollTop = 0;

    this.dashboardView.destroyCharts();
    this.investimentiView.destroyCharts();
    this.storicoView.destroyCharts();
    this.speseView.destroyCharts();

    if (tabId === 'dashboard') {
      this.dashboardView.render(container);
    } else if (tabId === 'spese') {
      this.speseView.render(container);
    } else if (tabId === 'assistente') {
      this.assistenteView.render(container);
    } else if (tabId === 'movimenti') {
      this.movimentiView.render(container);
    } else if (tabId === 'investimenti') {
      this.investimentiView.render(container);
    } else if (tabId === 'storico') {
      this.storicoView.render(container);
    } else if (tabId === 'impostazioni') {
      this.impostazioniView.render(container);
    }

    if (window.location.hash.includes('audit') || window.location.search.includes('audit')) {
      setTimeout(() => this.runLayoutAudit(), 100);
    }
  }

  runLayoutAudit() {
    try {
      const issues = [];
      const winW = window.innerWidth;
      const docScrollW = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      if (docScrollW > winW + 2) {
        issues.push({
          type: 'HORIZONTAL_SCROLL',
          msg: `Page scrollWidth (${docScrollW}px) exceeds viewport (${winW}px)`
        });
      }

      document.querySelectorAll('body *').forEach(el => {
        if (el.offsetParent === null && el.offsetWidth === 0 && el.offsetHeight === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return;

        const rect = el.getBoundingClientRect();
        if (rect.right > winW + 4 && !['svg', 'path', 'g', 'defs', 'clippath'].includes(el.tagName.toLowerCase())) {
          let parent = el.parentElement;
          let hasScrollParent = false;
          while (parent && parent !== document.body) {
            const pStyle = window.getComputedStyle(parent);
            if (pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll' || pStyle.overflowX === 'hidden') {
              hasScrollParent = true;
              break;
            }
            parent = parent.parentElement;
          }
          if (!hasScrollParent) {
            issues.push({
              type: 'OVERFLOW_BOUNDS',
              tag: el.tagName.toLowerCase(),
              cls: el.className ? String(el.className).substring(0, 30) : '',
              right: Math.round(rect.right),
              winW: winW
            });
          }
        }
      });

      document.title = 'AUDIT:' + JSON.stringify({ winW, docScrollW, issuesCount: issues.length, issues });
    } catch(e) {}
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
