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
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
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
  { id: 'conguaglio', name: '⚖️ Conguaglio / Rettifica', type: 'expense', color: '#8E8E93' },
  { id: 'altro', name: '❔Altro', type: 'expense', color: '#8E8E93' }
];

const INITIAL_GOALS = [
  {
    id: 'goal_1',
    name: 'Fondo Emergenza 6 Mesi',
    emoji: '🛡️',
    targetAmount: 6000,
    currentAmount: 5383.32,
    deadline: '2027-06-30',
    account: 'Trade Republic - XEON',
    notes: 'Copertura per spese impreviste su XEON'
  },
  {
    id: 'goal_2',
    name: 'Vacanza Estiva',
    emoji: '✈️',
    targetAmount: 1800,
    currentAmount: 850,
    deadline: '2027-08-01',
    account: 'Buddybank',
    notes: 'Risparmio vacanze estive'
  },
  {
    id: 'goal_3',
    name: 'Upgrade MacBook Pro',
    emoji: '💻',
    targetAmount: 2200,
    currentAmount: 600,
    deadline: '2027-12-31',
    account: 'Buddybank',
    notes: 'Nuovo Mac da lavoro'
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
  { keyword: 'telepass', category: '🚗 Auto' },
  { keyword: 'autostrada', category: '🚗 Auto' },
  { keyword: 'eni', category: '🚗 Auto' },
  { keyword: 'q8', category: '🚗 Auto' },
  { keyword: 'ip', category: '🚗 Auto' },
  { keyword: 'benzina', category: '🚗 Auto' },
  { keyword: 'carburante', category: '🚗 Auto' },
  { keyword: 'parcheggio', category: '🚗 Auto' },
  { keyword: 'garage', category: '🚗 Auto' },
  { keyword: 'metro', category: '🚊 Trasporti' },
  { keyword: 'atm', category: '🚊 Trasporti' },
  { keyword: 'trenitalia', category: '🚊 Trasporti' },
  { keyword: 'italo', category: '🚊 Trasporti' },
  { keyword: 'bus', category: '🚊 Trasporti' },
  { keyword: 'biglietto', category: '🚊 Trasporti' },
  { keyword: 'ristorante', category: '🍴Uscite' },
  { keyword: 'pizzeria', category: '🍴Uscite' },
  { keyword: 'trattoria', category: '🍴Uscite' },
  { keyword: 'bar', category: '🍴Uscite' },
  { keyword: 'caffe', category: '🍴Uscite' },
  { keyword: 'aperitivo', category: '🍴Uscite' },
  { keyword: 'glovo', category: '🍴Uscite' },
  { keyword: 'deliveroo', category: '🍴Uscite' },
  { keyword: 'just eat', category: '🍴Uscite' },
  { keyword: 'mcdonald', category: '🍴Uscite' },
  { keyword: 'amazon', category: '🛍️ Shopping' },
  { keyword: 'zara', category: '🛍️ Shopping' },
  { keyword: 'zalando', category: '🛍️ Shopping' },
  { keyword: 'h&m', category: '🛍️ Shopping' },
  { keyword: 'vestiti', category: '🛍️ Shopping' },
  { keyword: 'scarpe', category: '🛍️ Shopping' },
  { keyword: 'farmacia', category: '🚑 Salute' },
  { keyword: 'medico', category: '🚑 Salute' },
  { keyword: 'dentista', category: '🚑 Salute' },
  { keyword: 'analisi', category: '🚑 Salute' },
  { keyword: 'palestra', category: '💪🏻 Fitness' },
  { keyword: 'decathlon', category: '💪🏻 Fitness' },
  { keyword: 'fitness', category: '💪🏻 Fitness' },
  { keyword: 'apple', category: '💻 Tecnologia' },
  { keyword: 'netflix', category: '💻 Tecnologia' },
  { keyword: 'spotify', category: '💻 Tecnologia' },
  { keyword: 'icloud', category: '💻 Tecnologia' },
  { keyword: 'amazon prime', category: '💻 Tecnologia' },
  { keyword: 'affitto', category: '🏡 Casa' },
  { keyword: 'enel', category: '🏡 Casa' },
  { keyword: 'luce', category: '🏡 Casa' },
  { keyword: 'gas', category: '🏡 Casa' },
  { keyword: 'condominio', category: '🏡 Casa' },
  { keyword: 'stipendio', category: '💰Stipendio' },
  { keyword: 'busta paga', category: '💰Stipendio' }
];

const INITIAL_ACCOUNTS = [
  { id: 'buddybank', name: 'Buddybank', type: 'Liquidità corrente', balance: 4160.00, isLiquid: true, lastReconciledMonth: '10/2026', lastReconciledDate: '28/10/2026', defaultMode: 'balance' },
  { id: 'xeon', name: 'Trade Republic - XEON', type: 'Fondo Emergenza / Sicurezza', balance: 5383.32, isInvestment: true, lastReconciledMonth: '10/2026', lastReconciledDate: '28/10/2026', defaultMode: 'balance' },
  { id: 'vwce', name: 'Trade Republic - VWCE', type: 'Azionario Globale (Lungo Termine)', balance: 3410.25, isInvestment: true, lastReconciledMonth: '10/2026', lastReconciledDate: '28/10/2026', defaultMode: 'balance' },
  { id: 'pensione', name: 'Fondo Pensione', type: 'Previdenza complementare', balance: 4391.24, isPension: true, lastReconciledMonth: '09/2026', lastReconciledDate: '30/09/2026', defaultMode: 'delta' },
  { id: 'contanti', name: 'Contanti', type: 'Liquidità contante', balance: 10.00, isLiquid: true, lastReconciledMonth: '10/2026', lastReconciledDate: '28/10/2026', defaultMode: 'balance' },
  { id: 'buoni_pasto', name: 'Buoni Pasto', type: 'Buoni Pasto / Benefit', balance: 388.50, isLiquid: true, lastReconciledMonth: '10/2026', lastReconciledDate: '28/10/2026', defaultMode: 'balance' }
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
  },
  {
    "month": "09/2026",
    "value": 16951.37
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
    "id": "tx_617",
    "rowNumber": 618,
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
    "id": "tx_618",
    "rowNumber": 619,
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
    "id": "tx_619",
    "rowNumber": 620,
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
    "id": "tx_620",
    "rowNumber": 621,
    "year": "2026",
    "week": "44",
    "month": "10",
    "date": "31/10/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic - VWCE",
    "account": "Buddybank",
    "amount": 200.0,
    "category": "🛅 Livello Crescita",
    "description": "Giroconto PAC VWCE"
  },
  {
    "id": "tx_621",
    "rowNumber": 622,
    "year": "2026",
    "week": "44",
    "month": "10",
    "date": "31/10/2026",
    "type": "transfer",
    "rawType": "Trasferimento",
    "fromAccount": "Buddybank",
    "toAccount": "Trade Republic - XEON",
    "account": "Buddybank",
    "amount": 1495.0,
    "category": "🏦 Fondo di emergenza",
    "description": "Giroconto reintegro Fondo Emergenza XEON"
  },
  {
    "id": "tx_622",
    "rowNumber": 623,
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
  },
  {
    "id": "tx_623",
    "rowNumber": 624,
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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('finanze:accounts-updated', { detail: { accounts: this.accounts } }));
    }
  }

  getAccounts() {
    return [...this.accounts];
  }

  findAccount(idOrName) {
    if (!idOrName) return null;
    const q = String(idOrName).trim().toLowerCase();
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

    // Aggiorna saldi conti in tempo reale con robustezza su ID e Nome
    const accObj = this.findAccount(account);
    const toAccObj = type === 'transfer' && toAccount ? this.findAccount(toAccount) : null;

    if (type === 'transfer') {
      if (accObj && toAccObj && accObj.id !== toAccObj.id) {
        accObj.balance = Math.round((accObj.balance - amount) * 100) / 100;
        toAccObj.balance = Math.round((toAccObj.balance + amount) * 100) / 100;
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

    const accObj = this.findAccount(account);
    const toAccObj = type === 'transfer' && toAccount ? this.findAccount(toAccount) : null;

    if (type === 'transfer') {
      if (accObj && toAccObj && accObj.id !== toAccObj.id) {
        accObj.balance = Math.round((accObj.balance + amt) * 100) / 100;
        toAccObj.balance = Math.round((toAccObj.balance - amt) * 100) / 100;
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
    this.saveTransactions();
    return mergedTx;
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

const financeStore = new FinanceStore();
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
  SANDBOX_MODE: 'finanze_sandbox_mode'
};

class GoogleSheetsService {
  constructor() {
    this.webAppUrl = localStorage.getItem(SHEETS_STORAGE_KEYS.WEB_APP_URL) || '';
    this.securityToken = localStorage.getItem(SHEETS_STORAGE_KEYS.SECURITY_TOKEN) || '';
    this.autoSync = localStorage.getItem(SHEETS_STORAGE_KEYS.AUTO_SYNC) !== 'false';

    // Sincronizzazione Reale: Se l'utente configura la Web App di Google Apps Script,
    // la sincronizzazione cloud deve essere SEMPRE attiva e prioritaria sia da PC che da Smartphone.
    // La Sandbox è disattivata di default in modo che nessuna modifica vada persa in locale.
    const storedSandbox = localStorage.getItem(SHEETS_STORAGE_KEYS.SANDBOX_MODE);
    if (storedSandbox !== null) {
      this.sandboxMode = storedSandbox === 'true';
    } else {
      this.sandboxMode = false; // Sempre falso di default: sincronizzazione live reale attiva!
    }

    this.isOnline = navigator.onLine;
    this.syncStatus = 'idle';

    window.addEventListener('online', () => { this.isOnline = true; this.updateStatusBadge(); });
    window.addEventListener('offline', () => { this.isOnline = false; this.updateStatusBadge(); });
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

  saveConfig(url, token, autoSync = true, sandboxMode = this.sandboxMode) {
    this.webAppUrl = url.trim();
    this.securityToken = token.trim();
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
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Scrittura bloccata: la modifica resta solo fittizia sul dispositivo e NON intacca Google Sheets.');
      return { success: true, localOnly: true, sandbox: true };
    }

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

  async updateTransaction(rowNumber, transaction) {
    if (this.sandboxMode) {
      console.log('🛡️ [Sandbox] Aggiornamento remoto bloccato.');
      return { success: true, localOnly: true, sandbox: true };
    }

    if (!this.isConfigured() || !rowNumber) return { success: true, localOnly: true };

    try {
      this.syncStatus = 'syncing';
      this.updateStatusBadge();

      const payload = {
        action: 'updateTransaction',
        token: this.securityToken,
        rowNumber: rowNumber,
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
        return { success: true };
      }
      throw new Error(res.message);
    } catch (err) {
      console.error('Errore modifica su Google Sheets:', err);
      this.syncStatus = 'error';
      this.updateStatusBadge();
      return { success: false, error: err.message };
    }
  }

  async deleteTransaction(rowNumber) {
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Eliminazione remota bloccata: cancellazione solo locale fittizia.');
      return { success: true, localOnly: true, sandbox: true };
    }

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
    if (this.sandboxMode) {
      console.log('🛡️ [Beta Sandbox] Aggiornamento saldo remoto bloccato: conguaglio solo locale fittizio.');
      return { success: true, localOnly: true, sandbox: true };
    }

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
    const nameEl = document.querySelector('.sheet-status-name');
    const descEl = document.querySelector('.sheet-status-desc');
    const mobilePill = document.querySelector('.mobile-sheet-pill .dot');
    const mobileText = document.querySelector('.mobile-sheet-pill span:not(.dot)');

    if (!indicatorEl || !descEl) return;

    if (this.sandboxMode) {
      indicatorEl.style.backgroundColor = '#FF9500';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 149, 0, 0.25)';
      if (nameEl) nameEl.textContent = this.isBeta ? 'Finanze (Beta Sandbox)' : 'Finanze (Sandbox)';
      descEl.textContent = this.isBeta ? '🛡️ Database Protetto' : '🛡️ Sandbox Protetto';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF9500';
      if (mobileText) mobileText.textContent = '🛡️ Sandbox';
      return;
    }

    if (!this.isConfigured()) {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Dati Locali';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
      if (mobileText) mobileText.textContent = 'Finanze';
    } else if (this.syncStatus === 'syncing') {
      indicatorEl.style.backgroundColor = '#0071E3';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.25)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Sincronizzazione...';
      if (mobilePill) mobilePill.style.backgroundColor = '#0071E3';
      if (mobileText) mobileText.textContent = 'Sync...';
    } else if (this.syncStatus === 'connected') {
      indicatorEl.style.backgroundColor = '#34C759';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(52, 199, 89, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Connesso Live';
      if (mobilePill) mobilePill.style.backgroundColor = '#34C759';
      if (mobileText) mobileText.textContent = 'Connesso';
    } else if (this.syncStatus === 'error') {
      indicatorEl.style.backgroundColor = '#FF3B30';
      indicatorEl.style.boxShadow = '0 0 0 3px rgba(255, 59, 48, 0.2)';
      if (nameEl) nameEl.textContent = 'Finanze - Movimenti';
      descEl.textContent = 'Errore Connessione';
      if (mobilePill) mobilePill.style.backgroundColor = '#FF3B30';
      if (mobileText) mobileText.textContent = 'Offline';
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

    // 1. Radar Anomalie & Freshness Chiusura Mese
    const anomalyInsights = [];
    const recStatus = financeStore.getMonthlyReconciliationStatus();
    if (!recStatus.isFullyReconciled) {
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

const financialAssistantService = new FinancialAssistantService();
if (typeof window !== 'undefined') {
  window.FinancialAssistantServiceInstance = financialAssistantService;
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

    // Inizializza lo stato degli input se non presente
    this.accountInputs.clear();
    accounts.forEach(acc => {
      const isPension = acc.isPension || (acc.type || '').toLowerCase().includes('pension');
      const defaultMode = acc.defaultMode || (isPension ? 'delta' : 'balance');
      this.accountInputs.set(acc.name, {
        mode: defaultMode,
        rawInputValue: '',
        value: 0,
        isModified: false,
        createTx: true,
        note: isPension 
          ? `Versamento Fondo Pensione Busta Paga (${status.targetMonthName})` 
          : `Conguaglio Saldo ${acc.name} (${status.targetMonthName})`
      });
    });

    const monthOptions = [
      { key: '10/2026', label: 'Ottobre 2026' },
      { key: '09/2026', label: 'Settembre 2026' },
      { key: '08/2026', label: 'Agosto 2026' },
      { key: '11/2026', label: 'Novembre 2026' }
    ];

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
                Consolida i saldi effettivi dei conti e registra le quote da busta paga per il Net Worth
              </span>
            </div>
            <button class="modal-close-btn" id="btn-close-closing-modal">Chiudi</button>
          </div>

          <!-- Mese di Riferimento & Summary Live Strip -->
          <div class="closing-summary-strip" style="background: var(--bg-hover); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-card-pad-sm) var(--space-card-pad); margin-bottom: var(--space-box-gap-md);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border-subtle);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <label for="select-closing-month" style="font-size: 12.5px; font-weight: 600; color: var(--text-secondary);">Mese di Chiusura:</label>
                <div class="apple-select-wrapper" style="min-width: 140px;">
                  <select id="select-closing-month" class="apple-select" style="padding: 4px 28px 4px 10px; font-size: 13px; font-weight: 600; height: 32px;">
                    ${monthOptions.map(m => `<option value="${m.key}" ${m.key === this.targetMonth ? 'selected' : ''}>${m.label}</option>`).join('')}
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
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
    const recMonth = acc.lastReconciledMonth || (isPension ? '09/2026' : '10/2026');
    const isStale = (recMonth !== this.targetMonth);
    const defaultMode = acc.defaultMode || (isPension ? 'delta' : 'balance');
    const isFocused = this.focusAccount && this.focusAccount.toLowerCase() === acc.name.toLowerCase();

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
              ${this.formatCurrency(acc.balance)}
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
                data-old-balance="${acc.balance}"
                placeholder="${defaultMode === 'delta' ? (isPension ? '+ es. 185,50' : '+/- es. 50,00') : this.formatCurrency(acc.balance)}" 
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

    const res = financeStore.executeMonthlyClosing(this.targetMonth, updates);

    // Mostra feedback visivo di successo
    alert(`✅ Chiusura di ${res.monthName} consolidata con successo!\n\nPatrimonio Net Worth aggiornato a ${this.formatCurrency(res.newTotalNW)} (${res.nwDelta >= 0 ? '+' : ''}${this.formatCurrency(res.nwDelta)}).\n${res.modifiedAccounts.length} conti allineati.`);

    this.close();

    if (typeof this.onSuccessCallback === 'function') {
      this.onSuccessCallback(res);
    }
  }
}

const monthlyClosingModal = new MonthlyClosingModal();

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

    const health = financeStore.getFinancialHealthScore();
    const runway = financeStore.getProjectedMonthEnd();
    const anomalies = financeStore.getCategoryAnomalies();
    const budget5030 = financeStore.getBudget50_30_20();
    const forecast = financeStore.getCashFlowForecast(45);

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

    const recStatus = financeStore.getMonthlyReconciliationStatus();

    container.innerHTML = `
      <div class="page dashboard-page">
        
        <!-- Smart Alert: Chiusura Fine Mese & Riconciliazione Saldi -->
        ${!recStatus.isFullyReconciled ? `
          <div class="card monthly-closing-banner-card" style="border-left: 4px solid var(--apple-orange); background: var(--bg-card); margin-bottom: var(--space-box-gap-lg); padding: 18px 22px;">
            <div style="display: flex; gap: var(--space-box-gap-md); align-items: flex-start; justify-content: space-between; flex-wrap: wrap;">
              <div style="display: flex; gap: var(--space-box-gap-md); align-items: flex-start; flex: 1; min-width: min(100%, 280px);">
                <div style="width: 38px; height: 38px; border-radius: var(--radius-md); background: rgba(255, 149, 0, 0.12); color: var(--apple-orange); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                  ${getIcon('warning', 20)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;">
                    <strong style="font-size: 15px; font-weight: 600; color: var(--text-primary); letter-spacing: -0.015em;">
                      Chiusura Mese di ${recStatus.targetMonthName} in Sospeso
                    </strong>
                    <span style="font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: rgba(255, 149, 0, 0.15); color: var(--apple-orange);">
                      ${recStatus.pendingCount} conto da allineare
                    </span>
                  </div>
                  <p style="font-size: 13px; color: var(--text-secondary); margin: 0; line-height: var(--lh-body);">
                    ${recStatus.staleAccounts.map(a => `<strong>${a.name}</strong> è fermo a ${a.lastMonthName} (${this.formatCurrency(a.balance)})`).join(', ')}. Inserisci la quota da busta paga o il saldo effettivo per consolidare il Net Worth del mese.
                  </p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; align-self: center;">
                <button class="apple-btn-primary btn-launch-monthly-closing" id="btn-dashboard-monthly-closing" style="padding: 9px 18px; font-size: 13px; font-weight: 600;">
                  ${getIcon('conguaglio', 14)}
                  <span>Chiudi Mese & Conguaglia</span>
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- 1. Top KPI Summary Grid -->
        <section class="grid-4">
          
          <!-- Card 1: Net Worth Patrimoniale -->
          <div class="card highlight-card">
            <div class="card__header">
              <span class="card__title">Patrimonio Netto</span>
              <div class="kpi-icon-badge balance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${this.formatCurrency(summary.netWorth)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Liquidità</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(summary.liquidTotal)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Investimenti</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(summary.netWorth - summary.liquidTotal)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-badge positive">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                Aggiornato
              </span>
              <span class="trend-context" title="Liquidità + Investimenti + Pensione">Asset complessivi</span>
            </div>
          </div>

          <!-- Card 2: Liquidità Disponibile -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Liquidità Diretta</span>
              <div class="kpi-icon-badge income">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="3"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${this.formatCurrency(summary.liquidTotal)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Conto corrente</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(4160.00)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Buoni pasto + Cassa</span>
                <span class="kv__value privacy-mask">€ 398,50</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-badge positive">Disponibile</span>
              <span class="trend-context" title="Buddybank + Buoni Pasto + Contanti">Cassa immediata</span>
            </div>
          </div>

          <!-- Card 3: Uscite del Mese (Clickable -> Porta a #spese) -->
          <div class="card dashboard-expense-card" id="dash-expense-kpi-card" title="Clicca per aprire la nuova sezione Dettaglio Spese">
            <div class="card__header">
              <span class="card__title">Uscite Mese</span>
              <div class="kpi-icon-badge expense">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${this.formatCurrency(summary.monthlyExpense)}</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Saturazione budget</span>
                  <span class="meter__val">${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, (summary.monthlyExpense / summary.monthlyIncome) * 100)}%; background: ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'var(--apple-green)' : 'var(--apple-red)'};"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'badge--positive' : 'badge--negative'}">
                ${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}% budget
              </span>
              <span class="trend-context" style="color: var(--apple-blue); font-weight: 600;">Dettaglio spese &rarr;</span>
            </div>
          </div>

          <!-- Card 4: Tasso di Risparmio & Regola 75/25 -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Tasso di Risparmio</span>
              <div class="kpi-icon-badge savings">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div class="card__value privacy-mask">${summary.savingsRate}%</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Risparmio mese</span>
                  <span class="meter__val privacy-mask">+${this.formatCurrency(summary.savingsAmount)}</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, (summary.savingsRate / 25) * 100)}%; background: var(--apple-blue);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">Target 25%</span>
              <span class="trend-context" title="Obiettivo 25% raggiunto con successo">Raggiunto</span>
            </div>
          </div>

        </section>

        <!-- 2. Blocco Unico Saldi Conti & Depositi (Lista Compatta a 4 Zone) -->
        <section class="card accounts-card">
          <div class="card__header">
            <div class="accounts-header-title-group">
              <span class="card__title">Saldi Conti & Depositi</span>
              <span class="accounts-header-sub">Disponibilità liquida, investimenti ETF e fondo pensione</span>
            </div>
            <div class="accounts-header-badges">
              <span class="badge badge--neutral">${accounts.length} Conti Attivi</span>
              <span class="badge badge--info privacy-mask">Totale ${this.formatCurrency(summary.netWorth)}</span>
            </div>
          </div>
          <div class="card__body accounts-card__body">
            <div class="accounts-list-grid">
              ${accounts.map(acc => {
                let badgeClass = 'badge--neutral';
                let badgeLabel = 'Liquidità';
                let iconBg = 'rgba(0, 113, 227, 0.12)';
                let iconColor = 'var(--apple-blue)';
                let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`;

                if (acc.isInvestment) {
                  badgeClass = 'badge--purple';
                  badgeLabel = acc.name.toLowerCase().includes('xeon') ? 'Fondo Emergenza' : 'Portafoglio';
                  iconBg = 'rgba(175, 82, 222, 0.14)';
                  iconColor = 'var(--apple-purple)';
                  iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`;
                } else if (acc.isPension) {
                  badgeClass = 'badge--positive';
                  badgeLabel = 'Previdenza';
                  iconBg = 'rgba(52, 199, 89, 0.14)';
                  iconColor = 'var(--apple-green)';
                  iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 8H2z"></path></svg>`;
                }

                const pctOfTotal = summary.netWorth > 0 ? ((acc.balance / summary.netWorth) * 100).toFixed(1) : '0.0';

                return `
                  <div class="account-row-item">
                    <div class="account-row-leading">
                      <div class="account-row-icon" style="background: ${iconBg}; color: ${iconColor};">
                        ${iconSvg}
                      </div>
                      <div class="account-row-meta">
                        <span class="account-row-name" title="${acc.name}">${acc.name}</span>
                        <span class="account-row-type" title="${acc.type}">${acc.type}</span>
                      </div>
                    </div>
                    <div class="account-row-trailing">
                      <div class="account-row-val privacy-mask">${this.formatCurrency(acc.balance)}</div>
                      <div class="account-row-sub">
                        <span class="account-row-pct" title="Quota su patrimonio totale">${pctOfTotal}% del tot.</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <div class="card__footer accounts-card__footer">
            <div class="accounts-footer-stats">
              <span class="accounts-stat-item">
                <span class="stat-dot" style="background: var(--apple-blue);"></span>
                Liquidità: <strong class="privacy-mask">${this.formatCurrency(summary.liquidTotal)}</strong>
              </span>
              <span class="accounts-stat-item">
                <span class="stat-dot" style="background: var(--apple-purple);"></span>
                Investimenti + Pensione: <strong class="privacy-mask">${this.formatCurrency(summary.netWorth - summary.liquidTotal)}</strong>
              </span>
            </div>
            <a href="#impostazioni" class="accounts-reconcile-link" title="Gestisci e conguaglia i conti nelle Impostazioni">
              Riconcilia saldi &rarr;
            </a>
          </div>
        </section>

        <!-- 3. Smart Financial Intelligence Strip: Health Score, Runway, Anomalies, Budget 50/30/20 -->
        <section class="grid-4">
          
          <!-- Widget 1: Financial Health Score -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Salute Finanziaria</span>
              <span class="badge" style="background: ${health.color}22; color: ${health.color};">
                ${health.label}
              </span>
            </div>
            <div class="card__value" style="color: ${health.color};">
              ${health.score}<small style="font-size: 15px; color: var(--text-tertiary); font-weight: 600;">/100</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Cuscinetto XEON</span>
                  <span class="meter__val">${health.runwayMonths} mesi</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${(health.breakdown.emergencyScore / 35) * 100}%; background: var(--apple-green);"></div>
                </div>
              </div>
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Tasso Risparmio</span>
                  <span class="meter__val">${health.savingsRate}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${(health.breakdown.savingsScore / 35) * 100}%; background: var(--apple-blue);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context" title="${health.tip}">${health.tip}</span>
            </div>
          </div>

          <!-- Widget 2: Previsione Fine Mese & Runway -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Fine Mese Stimato</span>
              <span class="badge badge--positive">Liquidità</span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">
              ${this.formatCurrency(runway.projectedEnd)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Disponibilità c/c</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(runway.liquidBalance)}</span>
              </div>
              <div class="kv">
                <span class="kv__label">Rate & impegni</span>
                <span class="kv__value privacy-mask" style="color: var(--apple-orange);">${this.formatCurrency(runway.remainingObligations)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">Saldo coperto</span>
              <span class="trend-context" title="Residuo stimato a fine mese">Residuo stimato</span>
            </div>
          </div>

          <!-- Widget 3: Spike Detector (Anomalie di Spesa) -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Anomalie Spese</span>
              <span class="badge ${anomalies.length > 0 ? 'badge--warning' : 'badge--positive'}">
                ${anomalies.length > 0 ? `${anomalies.length} alert` : 'Stabile'}
              </span>
            </div>
            <div class="card__value" style="font-size: 20px;">
              ${anomalies.length > 0 ? `${anomalies.length} Fuori Media` : 'Nessuna Anomalia'}
            </div>
            <div class="card__body">
              ${anomalies.length > 0 ? anomalies.slice(0, 2).map(a => `
                <div class="kv">
                  <span class="kv__label" title="${cleanCategoryName(a.category)}" style="display: inline-flex; align-items: center; gap: 6px;">
                    <span style="color: var(--apple-orange); display: inline-flex;">${getIcon('alert', 13)}</span>
                    ${cleanCategoryName(a.category)}
                  </span>
                  <span class="kv__value negative">+${a.spikePercent}%</span>
                </div>
                <div class="kv">
                  <span class="kv__label">Spesa vs Media</span>
                  <span class="kv__value privacy-mask" title="${this.formatCurrency(a.currentAmount)} vs ${this.formatCurrency(a.historicalAvg)}">${this.formatCurrency(a.currentAmount)}</span>
                </div>
              `).join('') : `
                <div class="kv">
                  <span class="kv__label">Abitudini di spesa</span>
                  <span class="kv__value positive">Regolari</span>
                </div>
                <div class="kv">
                  <span class="kv__label">Monitoraggio</span>
                  <span class="kv__value muted">Attivo</span>
                </div>
              `}
            </div>
            <div class="card__footer">
              <span class="trend-context">${anomalies.length > 0 ? 'Spesa superiore alla media' : 'Spese allineate'}</span>
            </div>
          </div>

          <!-- Widget 4: Budget 50/30/20 & Spesa Sicura Giornaliera -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Budget 50/30/20</span>
              <span class="badge ${budget5030.dailySafeSpend > 15 ? 'badge--positive' : 'badge--warning'}">
                ${budget5030.daysRemaining} gg residui
              </span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">
              ${this.formatCurrency(budget5030.dailySafeSpend)}<small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/giorno</small>
            </div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Bisogni (50%)</span>
                  <span class="meter__val privacy-mask">${this.formatCurrency(budget5030.needs.spent)} (${budget5030.needs.pct}%)</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, budget5030.needs.pct)}%; background: var(--apple-blue);"></div>
                </div>
              </div>
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Voluttuari (30%)</span>
                  <span class="meter__val privacy-mask">${this.formatCurrency(budget5030.wants.spent)} (${budget5030.wants.pct}%)</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, budget5030.wants.pct)}%; background: var(--apple-orange);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Spesa giornaliera sostenibile</span>
            </div>
          </div>

        </section>

        <!-- 4. Grafici Interattivi: Flusso di Cassa & Ripartizione Categorie -->
        <section class="charts-grid">
          
          <div class="card chart-card">
            <div class="card__header">
              <span class="card__title">Flusso di Cassa & Trend Mensile</span>
              <span class="trend-badge positive">Ultime 6 Mensilità</span>
            </div>
            <div class="card__value privacy-mask" style="font-size: 22px;">
              ${this.formatCurrency(summary.monthlyIncome)} <small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">vs ${this.formatCurrency(summary.monthlyExpense)} uscite</small>
            </div>
            <div class="card__body" style="padding: var(--space-2) 0;">
              <div class="chart-canvas-container" style="height: 260px; min-height: 260px;">
                <canvas id="cashFlowCanvas"></canvas>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Entrate stimate vs Uscite tracciate nel tempo</span>
            </div>
          </div>

          <div class="card chart-card donut-card">
            <div class="card__header">
              <span class="card__title">Spese per Categoria</span>
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
            <div class="card__value privacy-mask" style="font-size: 22px;">
              <span id="donut-total-value">${this.formatCurrency(totalExpenseCalc)}</span> <small style="font-size: 13px; font-weight: 500; color: var(--text-secondary);">totale uscite</small>
            </div>
            <div class="card__body" style="padding: var(--space-2) 0;">
              <div class="donut-chart-container" style="display: flex; gap: 16px; align-items: center;">
                <div class="donut-canvas-wrapper" style="position: relative; width: 140px; height: 140px; flex-shrink: 0;">
                  <canvas id="categoryDonutCanvas"></canvas>
                </div>
                <div class="donut-legend" id="category-donut-legend" style="flex: 1; min-width: 0; max-height: 180px; overflow-y: auto;">
                  ${this.renderLegendItems(sortedCats)}
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context" id="donut-period-subtitle">${subtitleLabel}</span>
            </div>
          </div>

        </section>

        <!-- 5. Previsione Liquidità & Timeline Scadenze (45 Giorni) -->
        <section class="card forecast-section-card">
          <div class="card__header">
            <span class="card__title">Cash Flow Forecast & Timeline Scadenze</span>
            <div class="forecast-header-stats cluster-gap-sm">
              <span class="forecast-stat-pill">Min: <strong class="privacy-mask">${this.formatCurrency(forecast.minBalance)}</strong></span>
              <span class="forecast-stat-pill positive">Max: <strong class="privacy-mask">${this.formatCurrency(forecast.maxBalance)}</strong></span>
            </div>
          </div>
          <div class="card__value" style="font-size: 20px;">
            <span>Proiezione Cassa sui Prossimi 45 Giorni</span>
          </div>
          <div class="card__body">
            <div class="forecast-timeline-scroll">
              ${forecast.milestones.map(m => `
                <div class="forecast-milestone-card ${m.type}">
                  <div class="milestone-top">
                    <span class="milestone-icon">${m.icon}</span>
                    <span class="milestone-date">${new Date(m.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'short' })}</span>
                  </div>
                  <div class="milestone-body">
                    <span class="milestone-title">${m.title}</span>
                    <span class="milestone-amount privacy-mask ${m.type === 'income' ? 'income-color' : 'expense-color'}">
                      ${m.type === 'income' ? '+' : '-'}${this.formatCurrency(m.amount)}
                    </span>
                  </div>
                  <div class="milestone-footer">
                    <span class="milestone-bal-label">Saldo stimato:</span>
                    <span class="milestone-bal-val privacy-mask">${this.formatCurrency(m.balance)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Evoluzione attesa della cassa corrente tra entrate certe e spese ricorrenti</span>
          </div>
        </section>

        <!-- 6. Spese Ricorrenti & Rate in Scadenza -->
        <section class="card recurring-section-card">
          <div class="card__header">
            <span class="card__title">Spese Ricorrenti & Rate Attive</span>
            <span class="trend-badge positive">${financeStore.recurringItems.length} Piani Attivi</span>
          </div>
          <div class="card__value" style="font-size: 20px;">
            <span>Piani di Spesa Fissi e Rateali</span>
          </div>
          <div class="card__body">
            <div class="grid-4" style="gap: var(--space-5);">
              ${financeStore.recurringItems.map(item => `
                <div class="card" style="background: var(--bg-hover); padding: 18px; box-shadow: none;">
                  <div class="card__header">
                    <span class="card__title" title="${item.name}">${item.name}</span>
                    <span class="cat-pill" style="font-size: 11px;">${item.category}</span>
                  </div>
                  <div class="card__value privacy-mask" style="font-size: 18px;">
                    €${item.monthlyAmount.toFixed(2)}<small style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">/mese</small>
                  </div>
                  <div class="card__body">
                    <div class="kv">
                      <span class="kv__label">Scadenza</span>
                      <span class="kv__value">${item.nextDate}</span>
                    </div>
                    ${item.totalRate > 0 ? `
                      <div class="kv">
                        <span class="kv__label">Piano</span>
                        <span class="kv__value">Rata ${item.currentRata}/${item.totalRate}</span>
                      </div>
                      <div class="meter">
                        <div class="meter__fill" style="width: ${(item.currentRata / item.totalRate) * 100}%; background: var(--apple-blue);"></div>
                      </div>
                    ` : `
                      <div class="kv">
                        <span class="kv__label">Tipo</span>
                        <span class="kv__value">Fisso mensile</span>
                      </div>
                    `}
                  </div>
                  <div class="card__footer">
                    <span class="trend-context">${item.totalRate > 0 ? `Rata ${item.currentRata} di ${item.totalRate}` : 'Pagamento Continuo'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Scadenze fisse e piani rateali in corso desunti dai movimenti</span>
          </div>
        </section>

      </div>
    `;

    this.bindCategoryPeriodEvents(txs, categories);

    const btnMonthlyClosing = container.querySelector('#btn-dashboard-monthly-closing');
    if (btnMonthlyClosing) {
      btnMonthlyClosing.addEventListener('click', () => {
        monthlyClosingModal.open({
          targetMonth: recStatus.targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    }

    const expenseCard = container.querySelector('#dash-expense-kpi-card');
    if (expenseCard) {
      expenseCard.addEventListener('click', () => {
        window.location.hash = '#spese';
      });
    }

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
    switch (period) {
      case 'current_month': return 'Mese Corrente (Ottobre 2026)';
      case 'last_30_days': return 'Ultimi 30 Giorni';
      case 'last_3_months': return 'Ultimi 3 Mesi';
      case 'last_6_months': return 'Ultimi 6 Mesi';
      case 'current_year': return 'Anno Solare 2026';
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
    const txs = financeStore.getAllTransactions().filter(t => t.type === 'expense');
    const categories = financeStore.getCategories().filter(c => c.type === 'expense');
    const budget5030 = financeStore.getBudget50_30_20();
    const recurring = (typeof financeStore.getRecurringExpenses === 'function' ? financeStore.getRecurringExpenses() : (financeStore.recurringItems || []));

    // Calcolo spese fisse vs variabili
    const fixedTotal = recurring.reduce((acc, r) => acc + (parseFloat(r.monthlyAmount || r.amount) || 0), 0);
    const variableTotal = Math.max(0, summary.monthlyExpense - fixedTotal);
    const dailyAvg = summary.monthlyExpense > 0 ? (summary.monthlyExpense / 30) : 0;

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

    container.innerHTML = `
      <div class="page spese-page">
        
        <!-- Header di Sezione & Azioni Rapide -->
        <div class="spese-header-toolbar">
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

        <!-- 1. KPI Cards Uscite (4 Zone Canoniche in .grid-4) -->
        <section class="grid-4">
          
          <!-- Card 1: Spese Mese Corrente -->
          <div class="card highlight-card">
            <div class="card__header">
              <span class="card__title">Uscite Ottobre</span>
              <div class="kpi-icon-badge expense">
                ${getIcon('expense', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">
              ${this.formatCurrency(summary.monthlyExpense)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Media giornaliera</span>
                <span class="kv__value privacy-mask">${this.formatCurrency(dailyAvg)}/gg</span>
              </div>
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Saturazione budget</span>
                  <span class="meter__val">${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, (summary.monthlyExpense / summary.monthlyIncome) * 100)}%; background: ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'var(--apple-green)' : 'var(--apple-red)'};"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge ${summary.monthlyExpense <= (summary.monthlyIncome * 0.75) ? 'badge--positive' : 'badge--negative'}">
                ${((summary.monthlyExpense / summary.monthlyIncome) * 100).toFixed(0)}% del budget
              </span>
              <span class="trend-context" title="Target max 75% stipendio">Max 75% (€ ${(summary.monthlyIncome * 0.75).toFixed(0)})</span>
            </div>
          </div>

          <!-- Card 2: Spese Fisse & Ricorrenti -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Spese Fisse</span>
              <div class="kpi-icon-badge balance">
                ${getIcon('casa', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(fixedTotal)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Incidenza uscite</span>
                <span class="kv__value">${summary.monthlyExpense > 0 ? ((fixedTotal / summary.monthlyExpense) * 100).toFixed(0) : 0}%</span>
              </div>
              <div class="kv">
                <span class="kv__label">Voci contrattualizzate</span>
                <span class="kv__value">${recurring.length} impegni</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--neutral">Fisse Mensili</span>
              <span class="trend-context" title="Affitto, utenze e abbonamenti attivi">Uscite obbligate</span>
            </div>
          </div>

          <!-- Card 3: Spese Variabili / Flessibili -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Spese Variabili</span>
              <div class="kpi-icon-badge income">
                ${getIcon('shopping', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask">
              ${this.formatCurrency(variableTotal)}
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Incidenza uscite</span>
                <span class="kv__value">${summary.monthlyExpense > 0 ? ((variableTotal / summary.monthlyExpense) * 100).toFixed(0) : 0}%</span>
              </div>
              <div class="kv">
                <span class="kv__label">Margine di manovra</span>
                <span class="kv__value positive">Elevato</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--info">Flessibili</span>
              <span class="trend-context" title="Spesa alimentare, svago e acquisti personali">Modulabili a piacere</span>
            </div>
          </div>

          <!-- Card 4: Spesa Sicura Giornaliera -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Spesa Sicura Residua</span>
              <div class="kpi-icon-badge savings">
                ${getIcon('target', 16)}
              </div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">
              ${this.formatCurrency(budget5030.dailySafeSpend)}<small style="font-size: 14px; font-weight: 500; color: var(--text-secondary);">/giorno</small>
            </div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Giorni al mese succ.</span>
                <span class="kv__value">${budget5030.daysRemaining} giorni</span>
              </div>
              <div class="kv">
                <span class="kv__label">Budget rimanente</span>
                <span class="kv__value privacy-mask positive">${this.formatCurrency(budget5030.dailySafeSpend * budget5030.daysRemaining)}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="badge badge--positive">In Regola</span>
              <span class="trend-context" title="Importo spendibile senza intaccare il risparmio">Zero sforamento</span>
            </div>
          </div>

        </section>

        <!-- 2. Budget Preventivo 50/30/20 (Le 3 Buste di Spesa a Card Canoniche) -->
        <section class="card spese-budget-section">
          <div class="card__header">
            <div class="accounts-header-title-group">
              <span class="card__title">Budget Preventivo 50/30/20 & Buste di Spesa</span>
              <span class="accounts-header-sub">Ripartizione scientifica delle entrate mensili (€ ${this.formatCurrency(summary.monthlyIncome)})</span>
            </div>
            <span class="badge badge--neutral">Regola Harvard</span>
          </div>

          <div class="card__body">
            <div class="grid-4" style="grid-template-columns: repeat(3, 1fr);">
              
              <!-- Busta 1: Bisogni 50% -->
              <div class="card card--compact" style="background: var(--bg-hover);">
                <div class="card__header">
                  <span class="card__title">Bisogni & Necessità</span>
                  <span class="badge badge--info">Target 50%</span>
                </div>
                <div class="card__value privacy-mask" style="font-size: 22px;">
                  ${this.formatCurrency(budget5030.needs.spent)} <small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/ ${this.formatCurrency(budget5030.needs.target)}</small>
                </div>
                <div class="card__body">
                  <div class="meter-row">
                    <div class="meter__header">
                      <span class="meter__label">Saturazione</span>
                      <span class="meter__val">${budget5030.needs.pct}%</span>
                    </div>
                    <div class="meter">
                      <div class="meter__fill" style="width: ${Math.min(100, budget5030.needs.pct)}%; background: var(--apple-blue);"></div>
                    </div>
                  </div>
                  <div class="kv" style="margin-top: 8px;">
                    <span class="kv__label">Residuo busta</span>
                    <span class="kv__value privacy-mask positive">${this.formatCurrency(Math.max(0, budget5030.needs.target - budget5030.needs.spent))}</span>
                  </div>
                </div>
                <div class="card__footer">
                  <span class="trend-context">Affitto, bollette, alimentari, trasporti</span>
                </div>
              </div>

              <!-- Busta 2: Voluttuari 30% -->
              <div class="card card--compact" style="background: var(--bg-hover);">
                <div class="card__header">
                  <span class="card__title">Desideri & Svago</span>
                  <span class="badge badge--warning">Target 30%</span>
                </div>
                <div class="card__value privacy-mask" style="font-size: 22px;">
                  ${this.formatCurrency(budget5030.wants.spent)} <small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/ ${this.formatCurrency(budget5030.wants.target)}</small>
                </div>
                <div class="card__body">
                  <div class="meter-row">
                    <div class="meter__header">
                      <span class="meter__label">Saturazione</span>
                      <span class="meter__val">${budget5030.wants.pct}%</span>
                    </div>
                    <div class="meter">
                      <div class="meter__fill" style="width: ${Math.min(100, budget5030.wants.pct)}%; background: var(--apple-orange);"></div>
                    </div>
                  </div>
                  <div class="kv" style="margin-top: 8px;">
                    <span class="kv__label">Residuo busta</span>
                    <span class="kv__value privacy-mask positive">${this.formatCurrency(Math.max(0, budget5030.wants.target - budget5030.wants.spent))}</span>
                  </div>
                </div>
                <div class="card__footer">
                  <span class="trend-context">Ristoranti, cinema, shopping, viaggi</span>
                </div>
              </div>

              <!-- Busta 3: Risparmio & Investimenti 20% -->
              <div class="card card--compact" style="background: var(--bg-hover);">
                <div class="card__header">
                  <span class="card__title">Risparmio & Investimenti</span>
                  <span class="badge badge--positive">Target 20%</span>
                </div>
                <div class="card__value privacy-mask" style="font-size: 22px; color: var(--apple-green);">
                  ${this.formatCurrency(summary.savingsAmount)} <small style="font-size: 13px; color: var(--text-secondary); font-weight: 500;">/ ${this.formatCurrency(summary.monthlyIncome * 0.20)}</small>
                </div>
                <div class="card__body">
                  <div class="meter-row">
                    <div class="meter__header">
                      <span class="meter__label">Tasso Reale</span>
                      <span class="meter__val positive">${summary.savingsRate}%</span>
                    </div>
                    <div class="meter">
                      <div class="meter__fill" style="width: ${Math.min(100, (summary.savingsRate / 20) * 100)}%; background: var(--apple-green);"></div>
                    </div>
                  </div>
                  <div class="kv" style="margin-top: 8px;">
                    <span class="kv__label">Surplus vs target</span>
                    <span class="kv__value positive">+${(summary.savingsRate - 20).toFixed(1)}%</span>
                  </div>
                </div>
                <div class="card__footer">
                  <span class="trend-context">PAC VWCE, fondo pensione, XEON</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 3. Ripartizione per Categoria & Top Fornitori (2 Colonne) -->
        <div class="charts-grid">
          
          <!-- Box Sinistro: Donut Categorie con Selettore Periodo Temporale -->
          <div class="card chart-card">
            <div class="card__header" style="flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; flex-direction: column;">
                <span class="card__title">Ripartizione per Categoria</span>
                <span class="card__subtitle" id="spese-donut-subtitle" style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">
                  ${this.getPeriodLabel(this.donutPeriod)}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; margin-left: auto;">
                <span class="badge badge--info" id="spese-donut-total-badge">
                  ${this.formatCurrency(this.filterTransactionsByPeriod(txs, this.donutPeriod).reduce((s, t) => s + t.amount, 0))}
                </span>
                <div class="apple-select-wrapper" style="min-width: 140px;">
                  <select id="spese-donut-period-select" class="apple-select" style="padding: 4px 26px 4px 10px; font-size: 12px; height: 32px;">
                    <option value="current_month" ${this.donutPeriod === 'current_month' ? 'selected' : ''}>Mese Corrente</option>
                    <option value="last_30_days" ${this.donutPeriod === 'last_30_days' ? 'selected' : ''}>Ultimi 30 Giorni</option>
                    <option value="last_3_months" ${this.donutPeriod === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
                    <option value="last_6_months" ${this.donutPeriod === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
                    <option value="current_year" ${this.donutPeriod === 'current_year' ? 'selected' : ''}>Anno 2026</option>
                    <option value="all" ${this.donutPeriod === 'all' ? 'selected' : ''}>Tutto lo Storico</option>
                  </select>
                  <svg class="select-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
            <div class="card__body">
              <div class="donut-chart-wrapper" style="position: relative; height: 240px;">
                <canvas id="spese-donut-canvas"></canvas>
              </div>
              <div class="spese-categories-list" id="spese-categories-list" style="margin-top: 16px; display: flex; flex-direction: column; gap: 8px;">
                ${this.renderCategoryBreakdownList(this.filterTransactionsByPeriod(txs, this.donutPeriod))}
              </div>
            </div>
          </div>

          <!-- Box Destro: Top Merchant & Fornitori Principali -->
          <div class="card">
            <div class="card__header">
              <span class="card__title">Top Fornitori & Merchant</span>
              <span class="badge badge--neutral">Maggiori Uscite</span>
            </div>
            <div class="card__body">
              <div class="merchants-list" style="display: flex; flex-direction: column; gap: 10px;">
                ${topMerchants.map((m, idx) => `
                  <div class="account-row-item" style="padding: 8px 12px;">
                    <div class="account-row-leading">
                      <div class="account-row-icon" style="background: rgba(0, 113, 227, 0.1); color: var(--apple-blue); width: 32px; height: 32px;">
                        ${getCategoryIcon(m.category, 16)}
                      </div>
                      <div class="account-row-meta">
                        <span class="account-row-name" title="${m.name}">${idx + 1}. ${m.name}</span>
                        <span class="account-row-type">${cleanCategoryName(m.category)} • ${m.count} ${m.count === 1 ? 'spesa' : 'spese'}</span>
                      </div>
                    </div>
                    <div class="account-row-trailing">
                      <div class="account-row-val privacy-mask" style="font-size: 15px;">${this.formatCurrency(m.total)}</div>
                      <span class="account-row-pct">${summary.monthlyExpense > 0 ? ((m.total / summary.monthlyExpense) * 100).toFixed(1) : 0}% del tot.</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">I commercianti e servizi con il maggior impatto di cassa</span>
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
        <div style="padding: 20px; text-align: center; color: var(--text-secondary); font-size: 13px;">
          Nessuna spesa registrata nel periodo selezionato
        </div>
      `;
    }

    return sorted.map(([name, amount]) => {
      const pct = totalAll > 0 ? ((amount / totalAll) * 100).toFixed(1) : 0;
      return `
        <div class="account-row-item" style="padding: 6px 12px; background: transparent; border-color: var(--border-subtle);">
          <div class="account-row-leading">
            <span style="display: flex; align-items: center; color: var(--apple-blue); flex-shrink: 0;">
              ${getCategoryIcon(name, 16)}
            </span>
            <span class="account-row-name" style="font-size: 13px;">${name}</span>
          </div>
          <div class="account-row-trailing" style="flex-direction: row; gap: 12px; align-items: baseline;">
            <span class="account-row-pct" style="font-size: 12px;">${pct}%</span>
            <span class="account-row-val privacy-mask" style="font-size: 14px;">${this.formatCurrency(amount)}</span>
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

    const addBtn = container.querySelector('#spese-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        window.location.hash = '#movimenti';
        setTimeout(() => {
          const openModalBtn = document.querySelector('#open-add-modal-btn, #mov-add-btn, .action-btn-primary');
          if (openModalBtn) openModalBtn.click();
        }, 150);
      });
    }

    const exportBtn = container.querySelector('#spese-export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
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
    }
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
    const refDate = new Date(2026, 9, 31, 23, 59, 59); // 31 Ottobre 2026

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
          
          <div class="spese-header-toolbar movimenti-header-toolbar">
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

          <!-- Sotto-menu Segmentato Apple: Design Armonico, Integrato ed Omogeneo -->
          <div class="movimenti-subtabs-bar">
            <nav class="movimenti-segmented-tabs" id="movimenti-subtabs">
              <button class="movimenti-tab-btn ${this.activeSubtab === 'elenco' ? 'active' : ''}" data-subtab="elenco">
                <span class="tab-icon">${getIcon('list', 15)}</span>
                <span class="tab-label">Elenco Movimenti</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'analisi' ? 'active' : ''}" data-subtab="analisi">
                <span class="tab-icon">${getIcon('chart', 15)}</span>
                <span class="tab-label">Analisi Categorie</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'confronto' ? 'active' : ''}" data-subtab="confronto">
                <span class="tab-icon">${getIcon('conguaglio', 15)}</span>
                <span class="tab-label">Confronto Categorie</span>
              </button>
              <button class="movimenti-tab-btn ${this.activeSubtab === 'budget' ? 'active' : ''}" data-subtab="budget">
                <span class="tab-icon">${getIcon('target', 15)}</span>
                <span class="tab-label">Budget 50/30/20</span>
              </button>
            </nav>
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

    const addBtnHeader = container.querySelector('#btn-add-tx-header');
    if (addBtnHeader) {
      addBtnHeader.addEventListener('click', () => {
        this.openModal();
      });
    }

    const exportBtn = container.querySelector('#btn-export-movimenti');
    if (exportBtn) {
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
    }
  }

  // =========================================================================
  // 1. VISTA ELENCO MOVIMENTI (Apple Wallet & Revolut Standard)
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

    return `
      <!-- Top Mini KPI Strip (Standard 4-Zone Canonical Cards) -->
      <section class="grid-4">
        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Totale Movimenti Censiti">Movimenti</span>
            <div class="kpi-icon-badge balance">${getIcon('list', 16)}</div>
          </div>
          <div class="card__value">${stats.count}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Nel periodo</span>
              <span class="kv__value">Attivi</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Transazioni filtrate</span>
          </div>
        </div>

        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Entrate Totali Registrate">Entrate</span>
            <div class="kpi-icon-badge income">${getIcon('income', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-green);">${this.formatCurrency(stats.totalIncome)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Accrediti</span>
              <span class="kv__value positive">Registrati</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Flusso positivo</span>
          </div>
        </div>

        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Uscite Totali Registrate">Uscite</span>
            <div class="kpi-icon-badge expense">${getIcon('expense', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(stats.totalExpense)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Spese</span>
              <span class="kv__value negative">Tracciate</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Flusso in uscita</span>
          </div>
        </div>

        <div class="card card--compact">
          <div class="card__header">
            <span class="card__title" title="Differenza Netta di Cassa">Differenza</span>
            <div class="kpi-icon-badge savings">${getIcon('conguaglio', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: ${stats.netFlow >= 0 ? 'var(--apple-green)' : 'var(--apple-red)'};">
            ${stats.netFlow >= 0 ? '+' : ''}${this.formatCurrency(stats.netFlow)}
          </div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Saldo periodo</span>
              <span class="kv__value ${stats.netFlow >= 0 ? 'positive' : 'negative'}">${stats.netFlow >= 0 ? 'Surplus' : 'Deficit'}</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Cash flow netto</span>
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
              <option value="current_month" ${this.filters.period === 'current_month' ? 'selected' : ''}>Mese Corrente (Ott 2026)</option>
              <option value="last_30_days" ${this.filters.period === 'last_30_days' ? 'selected' : ''}>Ultimi 30 Giorni</option>
              <option value="last_3_months" ${this.filters.period === 'last_3_months' ? 'selected' : ''}>Ultimi 3 Mesi</option>
              <option value="last_6_months" ${this.filters.period === 'last_6_months' ? 'selected' : ''}>Ultimi 6 Mesi</option>
              <option value="current_year" ${this.filters.period === 'current_year' ? 'selected' : ''}>Anno 2026</option>
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

          <span class="badge badge--neutral" style="margin-left: auto; font-variant-numeric: tabular-nums;">
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

    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${tx.toAccount || 'Destinazione'}`
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

    const accountLabel = isTransfer
      ? `${tx.fromAccount || tx.account || 'Conto'} ➔ ${tx.toAccount || 'Destinazione'}`
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
          <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;">
            <label class="form-label" style="margin: 0; font-size: 13px; font-weight: 600;">Seleziona Categoria:</label>
            <div class="apple-select-wrapper" style="min-width: 220px;">
              <select id="single-cat-picker" class="apple-select">
                ${expenseCategories.map(c => `<option value="${c.name}" ${this.analysisCat === c.name ? 'selected' : ''}>${cleanCategoryName(c.name)}</option>`).join('')}
              </select>
              <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
          <span class="badge badge--neutral">Trend Ultimi 12 Mesi</span>
        </div>

        <!-- 4 KPI Cards (Uniform 4-Zone Canonical Structure) -->
        <section class="grid-4">
          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Totale Speso negli Ultimi 12 Mesi">Totale Speso</span>
              <span class="badge badge--negative">${data.txCount} tx</span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-red);">${this.formatCurrency(data.totalAmount)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Transazioni</span>
                <span class="kv__value">${data.txCount} censite</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Spesa cumulata 12 mesi</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Spesa Media Mensile">Media Mensile</span>
              <div class="kpi-icon-badge income">${getIcon('savings', 16)}</div>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-blue);">${this.formatCurrency(data.avgMonthly)}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Frequenza</span>
                <span class="kv__value">Mensile</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Spesa tipica al mese</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Spesa Singola Più Alta">Picco Più Alto</span>
              <div class="kpi-icon-badge balance">${getIcon('expense', 16)}</div>
            </div>
            <div class="card__value privacy-mask">${data.maxTx ? this.formatCurrency(data.maxTx.amount) : '€ 0,00'}</div>
            <div class="card__body">
              <div class="kv">
                <span class="kv__label">Dettaglio</span>
                <span class="kv__value" title="${data.maxTx ? `${data.maxTx.description} (${data.maxTx.date})` : 'Nessuna transazione'}">${data.maxTx ? data.maxTx.description : 'N/D'}</span>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">${data.maxTx ? data.maxTx.date : 'Nessuna data'}</span>
            </div>
          </div>

          <div class="card">
            <div class="card__header">
              <span class="card__title" title="Incidenza su Uscite Totali">Incidenza Totale</span>
              <span class="badge badge--purple">${data.impactPercent}%</span>
            </div>
            <div class="card__value privacy-mask" style="color: var(--apple-purple);">${data.impactPercent}%</div>
            <div class="card__body">
              <div class="meter-row">
                <div class="meter__header">
                  <span class="meter__label">Saturazione budget</span>
                  <span class="meter__val">${data.impactPercent}%</span>
                </div>
                <div class="meter">
                  <div class="meter__fill" style="width: ${Math.min(100, data.impactPercent)}%; background: var(--apple-purple);"></div>
                </div>
              </div>
            </div>
            <div class="card__footer">
              <span class="trend-context">Delle tue uscite complessive</span>
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
    this.analysisChart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['Nessun dato'],
        datasets: [{
          label: cleanCategoryName(this.analysisCat),
          data: values.length > 0 ? values : [0],
          backgroundColor: 'rgba(0, 113, 227, 0.85)',
          borderRadius: 8,
          borderSkipped: false
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

            <div class="form-group">
              <label class="form-label" for="form-date">Data</label>
              <input type="date" id="form-date" class="apple-input" required />
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

      previewContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0;">
          <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
            <span style="color: var(--apple-red); font-weight: 600;">📤 Origine:</span> <strong>${fromAcc.name}</strong>
          </span>
          <span style="font-variant-numeric: tabular-nums;">
            ${this.formatCurrency(fromOld)} ➔ <strong style="color: var(--apple-red);">${this.formatCurrency(fromNew)}</strong>
          </span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 3px 0; border-top: 1px dashed var(--border-subtle);">
          <span style="color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
            <span style="color: var(--apple-green); font-weight: 600;">📥 Destinazione:</span> <strong>${toAcc.name}</strong>
          </span>
          <span style="font-variant-numeric: tabular-nums;">
            ${this.formatCurrency(toOld)} ➔ <strong style="color: var(--apple-green);">${this.formatCurrency(toNew)}</strong>
          </span>
        </div>
        <div style="margin-top: 3px; padding-top: 3px; border-top: 1px solid var(--border-subtle); font-size: 11px; color: var(--text-tertiary); display: flex; justify-content: space-between;">
          <span>Variazione Net Worth complessivo:</span>
          <strong style="color: var(--text-secondary);">± 0,00 € (Trasferimento interno)</strong>
        </div>
      `;
    };

    this._updateTransferPreview = updateTransferPreview;

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

    if (formToAccount) formToAccount.addEventListener('change', updateTransferPreview);
    if (formAmount) formAmount.addEventListener('input', updateTransferPreview);

    // Supporto Autocategorizzazione Intelligente in Tempo Reale
    const descInput = document.getElementById('form-description');
    const catSelect = document.getElementById('form-category');
    const predContainer = document.getElementById('smart-prediction-container');
    const predText = document.getElementById('smart-prediction-text');

    if (descInput && catSelect) {
      descInput.addEventListener('input', () => {
        const val = descInput.value;
        const allTxs = financeStore.getTransactions();
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
    this.modalOpen = true;
    this.editingTxId = txToEdit ? txToEdit.id : null;
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
      modalTitle.textContent = txToEdit ? 'Modifica Movimento' : 'Nuovo Movimento';
    }
    if (saveBtn) {
      saveBtn.textContent = txToEdit ? 'Aggiorna' : 'Salva';
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
                  <span class="kv__value" style="font-size: 13px; font-weight: 600;">${tx.toAccount || 'N/D'}</span>
                </div>
              ` : ''}

              <div class="kv" style="padding: 10px 0;">
                <span class="kv__label" style="font-size: 13px; color: var(--text-secondary);">Identificativo Interno</span>
                <span class="kv__value" style="font-size: 11px; font-family: monospace; color: var(--text-tertiary);">${tx.id}</span>
              </div>
            </div>

            <!-- Danger Zone: Delete Action inside detail -->
            <div style="display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-1);">
              <button class="apple-btn-secondary" id="tx-detail-del-btn" style="color: var(--apple-red); border-color: rgba(255, 59, 48, 0.3); font-size: 13px;">
                ${getIcon('trash', 14)} <span>Elimina Movimento</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    `;

    const closeDetail = () => {
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

    if (this.editingTxId) {
      // Modalità Modifica Movimento Esistente
      const updatedTx = financeStore.updateTransaction(this.editingTxId, {
        amount,
        description,
        date,
        category: category || 'Giroconto',
        type,
        account,
        toAccount: type === 'transfer' ? toAccount : ''
      });

      if (description && category && category !== '__custom__' && type !== 'transfer') {
        smartCategorizer.learnAssociation(description, category);
      }

      if (updatedTx && updatedTx.rowNumber && googleSheetsService.isConfigured()) {
        googleSheetsService.updateTransaction(updatedTx.rowNumber, updatedTx).catch(err => console.warn('Update fallita:', err));
      }
    } else {
      // Modalità Nuovo Movimento
      const addedTx = financeStore.addTransaction({
        amount,
        description,
        date,
        category: category || 'Giroconto',
        type,
        account,
        toAccount: type === 'transfer' ? toAccount : ''
      });

      if (description && category && category !== '__custom__' && type !== 'transfer') {
        smartCategorizer.learnAssociation(description, category);
      }

      if (googleSheetsService.isConfigured()) {
        googleSheetsService.pushTransaction(addedTx).catch(err => console.warn('Sync fallita:', err));
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
      initialCapital: 3410,
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

        <!-- Header di Sezione in Stile Spese (Titolo + Sottotitolo Dinamico) -->
        <header class="investimenti-header-section">
          
          <div class="spese-header-toolbar investimenti-header-toolbar">
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

          <!-- Sotto-menu Segmentato Apple: Design Armonico, Integrato ed Omogeneo -->
          <div class="investimenti-subtabs-bar">
            <nav class="investimenti-segmented-tabs" id="investimenti-subtabs">
              <button class="investimenti-tab-btn ${this.activeSubtab === 'portafoglio' ? 'active' : ''}" data-subtab="portafoglio">
                <span class="tab-icon">${getIcon('chart', 15)}</span>
                <span class="tab-label">Portafoglio & PAC</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'rischio' ? 'active' : ''}" data-subtab="rischio">
                <span class="tab-icon">${getIcon('target', 15)}</span>
                <span class="tab-label">Profilo & Ribilanciamento</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'obiettivi' ? 'active' : ''}" data-subtab="obiettivi">
                <span class="tab-icon">${getIcon('savings', 15)}</span>
                <span class="tab-label">Obiettivi di Risparmio</span>
              </button>
              <button class="investimenti-tab-btn ${this.activeSubtab === 'fire' ? 'active' : ''}" data-subtab="fire">
                <span class="tab-icon">${getIcon('fire', 15)}</span>
                <span class="tab-label">Indipendenza F.I.R.E.</span>
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

    if (xeon === 0 && vwce === 0 && pensione === 0) {
      xeon = 5383.32;
      vwce = 3410.25;
      pensione = 4391.24;
      liquid = 4170.00;
    }

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

    return { xeon, vwce, pensione, liquid, totalPortfolio, totalInvestedDirect, allocationData };
  }

  renderPortafoglioView() {
    const { xeon, vwce, pensione, liquid, totalPortfolio, totalInvestedDirect, allocationData } = this.getPortafoglioBreakdown();

    return `
      <!-- 1. Portfolio KPI Strip (Uniform 4-Zone Canonical Structure) -->
      <section class="grid-auto" style="grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));">
        <div class="card highlight-card">
          <div class="card__header">
            <span class="card__title" title="Patrimonio Complessivo Totale">Patrimonio Complessivo</span>
            <div class="kpi-icon-badge balance">${getIcon('balance', 16)}</div>
          </div>
          <div class="card__value privacy-mask">${this.formatCurrency(totalPortfolio)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">Liquidità cassa</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(liquid)}</span>
            </div>
            <div class="kv">
              <span class="kv__label">Investimenti + Pensione</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(totalPortfolio - liquid)}</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Liquidità + Investimenti + Pensione</span>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Investito Diretto: ETF e Strumenti Monetari">Investito Diretto</span>
            <div class="kpi-icon-badge income">${getIcon('chart', 16)}</div>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-blue);">${this.formatCurrency(totalInvestedDirect)}</div>
          <div class="card__body">
            <div class="kv">
              <span class="kv__label">XEON Monetario</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(xeon)}</span>
            </div>
            <div class="kv">
              <span class="kv__label">VWCE Azionario</span>
              <span class="kv__value privacy-mask">${this.formatCurrency(vwce)}</span>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Fondo emergenza + ETF azionario</span>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <span class="card__title" title="Previdenza Integrativa e Fondo Pensione">Previdenza Integrativa</span>
            <span class="badge badge--purple">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}%</span>
          </div>
          <div class="card__value privacy-mask" style="color: var(--apple-purple);">${this.formatCurrency(pensione)}</div>
          <div class="card__body">
            <div class="meter-row">
              <div class="meter__header">
                <span class="meter__label">Quota su patrimonio</span>
                <span class="meter__val">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}%</span>
              </div>
              <div class="meter">
                <div class="meter__fill" style="width: ${Math.min(100, (pensione / (totalPortfolio || 1)) * 100)}%; background: var(--apple-purple);"></div>
              </div>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">${((pensione / (totalPortfolio || 1)) * 100).toFixed(1)}% del totale complessivo</span>
          </div>
        </div>
      </section>

      <!-- 2. Asset Allocation Reale & Dettaglio Strumenti -->
      <section class="investimenti-main-grid">
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
                <span class="sim-kpi-label">Valore Finale Stimato</span>
                <span class="sim-kpi-value positive" id="kpi-valore-finale">€0,00</span>
              </div>
              <div class="sim-kpi">
                <span class="sim-kpi-label">Capitale Versato</span>
                <span class="sim-kpi-value" id="kpi-capitale-versato">€0,00</span>
              </div>
              <div class="sim-kpi">
                <span class="sim-kpi-label">Interesse Generato</span>
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
 * Apple Design System - Patrimonio & Storico View Component
 * Mostra l'evoluzione temporale del Net Worth (2024 - 2026) dinamica e continua,
 * calcolata e aggiornata in tempo reale in base a movimenti, conguagli e saldi reali.
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

    // Recupera la serie storica dinamica calcolata da baseline + movimenti + conguagli
    const rawData = financeStore.getHistoricalNetWorth();
    const summary = financeStore.summary;
    const recStatus = financeStore.getMonthlyReconciliationStatus();

    // Filtra per anno se selezionato
    const filteredData = this.selectedYear === 'all' 
      ? rawData 
      : rawData.filter(d => d.month.endsWith(this.selectedYear));

    const firstVal = filteredData.length > 0 ? filteredData[0].value : 0;
    const lastVal = filteredData.length > 0 ? filteredData[filteredData.length - 1].value : summary.netWorth;
    const netGrowth = lastVal - firstVal;
    const growthPercent = firstVal > 0 ? ((netGrowth / firstVal) * 100).toFixed(1) : 0;
    const isGrowthPositive = netGrowth >= 0;

    const bannerSub = this.selectedYear === 'all'
      ? `Da ${filteredData[0]?.month || '01/2024'} a oggi`
      : `Performance anno ${this.selectedYear} (${filteredData[0]?.month || ''} → ${filteredData[filteredData.length - 1]?.month || ''})`;

    container.innerHTML = `
      <div class="page storico-page">

        <!-- Top Header & Year Filter (Canonical Card Architecture) -->
        <section class="card highlight-card">
          <div class="card__header">
            <span class="card__title" title="Variazione Net Worth ${this.selectedYear === 'all' ? 'Complessiva' : this.selectedYear}">
              Variazione Net Worth ${this.selectedYear === 'all' ? 'Complessiva' : this.selectedYear}
            </span>
            <span class="badge ${isGrowthPositive ? 'badge--positive' : 'badge--negative'}">
              ${isGrowthPositive ? '+' : ''}${growthPercent}% (${isGrowthPositive ? '+' : ''}<span class="privacy-mask">${this.formatCurrency(netGrowth)}</span>)
            </span>
          </div>
          <div class="card__value privacy-mask">${this.formatCurrency(lastVal)}</div>
          <div class="card__body">
            <span style="font-size: var(--text-sm); color: var(--text-secondary);">${bannerSub}</span>
            
            <div style="display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; margin-top: var(--space-3);">
              <div class="segmented-control" id="storico-year-toggle">
                <button class="segment-btn ${this.selectedYear === 'all' ? 'active' : ''}" data-year="all">Tutto</button>
                <button class="segment-btn ${this.selectedYear === '2026' ? 'active' : ''}" data-year="2026">2026</button>
                <button class="segment-btn ${this.selectedYear === '2025' ? 'active' : ''}" data-year="2025">2025</button>
                <button class="segment-btn ${this.selectedYear === '2024' ? 'active' : ''}" data-year="2024">2024</button>
              </div>
              <button class="apple-btn-secondary" id="btn-snapshot-modal" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Fissa o salva lo snapshot del mese corrente">
                ${getIcon('target', 13)}
                <span>Fissa Snapshot</span>
              </button>
              <button class="apple-btn-secondary" id="btn-tax-report-modal" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Visualizza e stampa il report patrimoniale e fiscale">
                ${getIcon('list', 13)}
                <span>Report Fiscale</span>
              </button>
              <button class="apple-btn-secondary" id="btn-export-csv" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Esporta tutti i movimenti in formato CSV (Excel / Numbers)">
                ${getIcon('download', 13)}
                <span>Esporta CSV</span>
              </button>
              <button class="apple-btn-secondary" id="btn-export-json" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px;" title="Scarica un backup completo JSON">
                ${getIcon('savings', 13)}
                <span>Backup JSON</span>
              </button>
              <button class="apple-btn-secondary" id="btn-quick-conguaglio" style="font-size: 12px; padding: 7px 14px; border-radius: var(--radius-pill); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; ${!recStatus.isFullyReconciled ? 'border-color: var(--apple-orange); color: var(--apple-orange); background: rgba(255, 149, 0, 0.08);' : ''}" title="Apri studio chiusura fine mese e conguaglio saldi">
                ${getIcon('conguaglio', 13)}
                <span>Chiusura Fine Mese ${!recStatus.isFullyReconciled ? `(${recStatus.pendingCount} in sospeso)` : ''}</span>
              </button>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Serie storica continua basata su movimenti e saldi reali</span>
          </div>
        </section>

        <!-- Grafico Evoluzione Net Worth (Canonical Card) -->
        <section class="card">
          <div class="card__header">
            <span class="card__title" title="Evoluzione Net Worth Nel Tempo">Evoluzione Net Worth Nel Tempo</span>
            <span class="badge badge--info">Dinamico</span>
          </div>
          <div class="card__body" style="padding: var(--space-2) 0;">
            <div class="chart-canvas-container" style="min-height: 280px;">
              <canvas id="historicalNWCanvas"></canvas>
            </div>
          </div>
          <div class="card__footer">
            <span class="trend-context">Progressione continua basata su movimenti, conguagli e saldi reali</span>
          </div>
        </section>

        <!-- Matrice Storica / Tabella Mensile (Canonical Card) -->
        <section class="card" style="padding: 0; overflow: hidden;">
          <div style="padding: var(--space-4) var(--space-5) var(--space-2);">
            <h3 style="font-size: var(--text-base); font-weight: 700; color: var(--text-primary); margin: 0;">Riepilogo Storico per Mensilità</h3>
            <span style="font-size: var(--text-xs); color: var(--text-secondary);">Variazioni e snapshot registrati mese per mese con aggiornamento in tempo reale</span>
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
                  const isCurrent = row.isCurrent;

                  let statusChip = '';
                  if (isCurrent) {
                    statusChip = !recStatus.isFullyReconciled 
                      ? `<span class="status-chip chip-orange"><span class="live-dot" style="background-color: var(--apple-orange);"></span> In sospeso (${recStatus.pendingCount})</span>`
                      : `<span class="status-chip chip-blue"><span class="live-dot"></span> In corso</span>`;
                  } else if (isPositive) {
                    statusChip = `<span class="status-chip chip-green">Crescita</span>`;
                  } else {
                    statusChip = `<span class="status-chip chip-orange">Flessione</span>`;
                  }

                  return `
                    <tr class="${isCurrent ? 'row-current-month' : ''}">
                      <td class="font-medium">
                        ${row.month}
                        ${isCurrent ? '<span class="current-month-badge">Attuale</span>' : ''}
                      </td>
                      <td class="font-bold hist-val privacy-mask">${this.formatCurrency(row.value)}</td>
                      <td class="${isPositive ? 'income-color' : 'expense-color'} hist-delta">
                        ${diff !== 0 ? (isPositive ? '+' : '') + this.formatCurrency(diff) + ` (${diffPercent}%)` : '-'}
                      </td>
                      <td>
                        <div style="display: flex; align-items: center; gap: 8px;">
                          ${statusChip}
                          <button class="apple-btn-secondary btn-table-reconcile" data-month="${row.month}" style="padding: 2px 8px; font-size: 11px; border-radius: var(--radius-pill); cursor: pointer;" title="Apri riconciliazione e chiusura per ${row.month}">
                            ${getIcon('conguaglio', 11)}
                            <span>${isCurrent ? 'Chiudi' : 'Modifica'}</span>
                          </button>
                        </div>
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

    const pointRadius = data.map(d => d.isCurrent ? 6 : 3);
    const pointHoverRadius = data.map(d => d.isCurrent ? 8 : 5);
    const pointBgColor = data.map(d => d.isCurrent ? '#30D158' : '#0071E3');

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
          pointRadius: pointRadius,
          pointHoverRadius: pointHoverRadius,
          pointBackgroundColor: pointBgColor
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
              label: (ctx) => {
                const item = data[ctx.dataIndex];
                const note = item?.isCurrent ? ' (Mese Attivo / Live)' : '';
                return ` Patrimonio: ${this.formatCurrency(ctx.parsed.y)}${note}`;
              }
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
              callback: (v) => '€' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v)
            }
          }
        }
      }
    });
  }

  openSnapshotModal(container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const now = new Date();
    const curMonthKey = `${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const liveNW = Math.round(financeStore.summary.netWorth * 100) / 100;

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="snapshot-modal-overlay">
        <div class="apple-modal-sheet open" id="snapshot-modal-sheet" style="max-width: 460px;">
          <div class="modal-handle"></div>
          <div class="modal-header">
            <button class="modal-close-btn" id="snapshot-cancel">Annulla</button>
            <h3>Fissa Snapshot Net Worth</h3>
            <button class="modal-save-btn" id="snapshot-confirm">Salva</button>
          </div>
          <div class="modal-form">
            <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: var(--space-text-sub); line-height: var(--lh-body);">
              Salva o consolida il valore ufficiale del Net Worth per una specifica mensilità.
            </p>

            <div class="form-group" style="margin-bottom: var(--space-box-gap-md);">
              <label class="form-label" for="snapshot-month">Mese / Anno (MM/AAAA)</label>
              <input type="text" id="snapshot-month" class="apple-input apple-input-mono" value="${curMonthKey}" placeholder="es. 10/2026" />
            </div>

            <div class="form-group" style="margin-bottom: var(--space-box-gap-md);">
              <label class="form-label" for="snapshot-value">Patrimonio Netto Consolidato (€)</label>
              <input type="number" step="0.01" id="snapshot-value" class="apple-input apple-input-mono" value="${liveNW}" />
              <span style="font-size: 11px; color: var(--text-secondary); margin-top: 4px; display: block;">
                Valore live attuale dai conti: <strong>${this.formatCurrency(liveNW)}</strong>
              </span>
            </div>

            <div style="background: rgba(0, 113, 227, 0.08); border-radius: var(--radius-md); padding: 12px; margin-top: var(--space-box-gap-sm); border: 1px solid var(--border-subtle);">
              <div style="font-size: 12px; color: var(--text-secondary); line-height: var(--lh-body); display: flex; align-items: flex-start; gap: 8px;">
                <span style="color: var(--apple-blue); display: inline-flex; margin-top: 1px;">${getIcon('sparkle', 14)}</span>
                <span><strong>Come funziona</strong>: Questo fissa lo snapshot per il mese selezionato nello storico consolidato e nel grafico. Il mese in corso rimarrà comunque dinamico e collegato a spese, entrate e conguagli in tempo reale.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('snapshot-modal-overlay');
    const close = () => {
      overlay.classList.remove('open');
      setTimeout(() => { modalRoot.innerHTML = ''; }, 250);
    };

    document.getElementById('snapshot-cancel')?.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('snapshot-confirm')?.addEventListener('click', () => {
      const monthInput = document.getElementById('snapshot-month')?.value.trim();
      const valInput = parseFloat(document.getElementById('snapshot-value')?.value);

      if (!monthInput || !/^\d{2}\/\d{4}$/.test(monthInput)) {
        alert('Inserisci un formato mese/anno valido come MM/AAAA (es. 10/2026).');
        return;
      }
      if (isNaN(valInput) || valInput <= 0) {
        alert('Inserisci un valore di patrimonio valido maggiore di zero.');
        return;
      }

      financeStore.saveNetWorthSnapshot(monthInput, valInput);
      close();
      this.render(container);
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

    document.getElementById('btn-snapshot-modal')?.addEventListener('click', () => {
      this.openSnapshotModal(container);
    });

    document.getElementById('btn-tax-report-modal')?.addEventListener('click', () => {
      this.openTaxReportModal(container, this.selectedYear === 'all' ? 2026 : parseInt(this.selectedYear, 10));
    });

    const btnCsv = document.getElementById('btn-export-csv');
    if (btnCsv) {
      btnCsv.addEventListener('click', () => this.handleExportCSV(btnCsv));
    }

    const btnJson = document.getElementById('btn-export-json');
    if (btnJson) {
      btnJson.addEventListener('click', () => this.handleExportJSON(btnJson));
    }

    document.getElementById('btn-quick-conguaglio')?.addEventListener('click', () => {
      monthlyClosingModal.open({
        targetMonth: recStatus.targetMonth,
        onSuccess: () => this.render(container)
      });
    });

    container.querySelectorAll('.btn-table-reconcile').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetMonth = e.currentTarget.dataset.month;
        monthlyClosingModal.open({
          targetMonth: targetMonth,
          onSuccess: () => this.render(container)
        });
      });
    });
  }

  // =========================================================================
  // REPORT PATRIMONIALE & FISCALE ANNUALE (STAMPABILE APPLE HIG)
  // =========================================================================
  openTaxReportModal(container, targetYear = 2026) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

    const report = financeStore.getAnnualTaxReport(targetYear);

    modalRoot.innerHTML = `
      <div class="apple-modal-overlay open" id="tax-report-overlay">
        <div class="apple-modal-sheet open tax-report-sheet" style="max-width: 720px; max-height: 90vh; overflow-y: auto;">
          <div class="modal-handle"></div>
          
          <div class="modal-header tax-report-modal-header">
            <button class="modal-close-btn" id="tax-report-close">Chiudi</button>
            <h3 class="tax-report-title">Report Fiscale & Patrimoniale ${report.year}</h3>
            <div class="tax-modal-header-actions">
              <button class="apple-btn-primary print-trigger-btn" id="btn-print-tax-report" style="font-size: 12px; padding: 6px 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                ${getIcon('download', 13)}
                <span>Stampa / Salva PDF</span>
              </button>
            </div>
          </div>

          <div class="tax-report-document-body" id="tax-report-printable-area">
            <!-- Header Istituzionale Apple HIG -->
            <div class="tax-doc-header">
              <div class="tax-doc-badge">DOCUMENTO DI SINTESI PATRIMONIALE</div>
              <h2 class="tax-doc-main-title">Rendiconto Finanziario & Deduzioni IRPEF</h2>
              <div class="tax-doc-meta">
                <span>Esercizio Finanziario: <strong>${report.year}</strong></span>
                <span>Data Generazione: <strong>${report.generatedDate}</strong></span>
                <span>Stato Dati: <strong>Snapshot Ufficiale Riconciliato</strong></span>
              </div>
            </div>

            <!-- Sezione 1: Sintesi del Patrimonio Netto -->
            <div class="tax-doc-section">
              <h4 class="tax-section-title">1. Consistenza Patrimoniale al 31 Dicembre ${report.year}</h4>
              <div class="tax-kpi-row">
                <div class="tax-kpi-box">
                  <span class="tax-kpi-sub">Net Worth Consolidato</span>
                  <div class="tax-kpi-num privacy-mask">${this.formatCurrency(report.closingNetWorth)}</div>
                  <span class="tax-kpi-note">Variazione annua: ${report.growthPct >= 0 ? '+' : ''}${report.growthPct}%</span>
                </div>
                <div class="tax-kpi-box">
                  <span class="tax-kpi-sub">Giacenza Media Stimata Liquidità</span>
                  <div class="tax-kpi-num privacy-mask">${this.formatCurrency(report.estimatedAverageDailyBalance)}</div>
                  <span class="tax-kpi-note">Riferimento per calcolo ISEE e Bollo C/C (5.000 €)</span>
                </div>
                <div class="tax-kpi-box">
                  <span class="tax-kpi-sub">Tasso di Risparmio Medio</span>
                  <div class="tax-kpi-num">${report.totalSavingsRate}%</div>
                  <span class="tax-kpi-note">Risparmio netto medio annuo</span>
                </div>
              </div>
            </div>

            <!-- Sezione 2: Ripartizione Asset Allocation Fiscale -->
            <div class="tax-doc-section">
              <h4 class="tax-section-title">2. Prospetto Asset Allocation per Categoria Fiscale</h4>
              <table class="tax-doc-table">
                <thead>
                  <tr>
                    <th>Asset Class</th>
                    <th>Descrizione Strumenti</th>
                    <th>Valore Consolidato</th>
                    <th>Peso %</th>
                    <th>Regime Fiscale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Liquidità Libera</strong></td>
                    <td>Conti correnti (Buddybank, BBVA, Cassa)</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.liquid)}</td>
                    <td>${report.assetAllocation.liquidPct}%</td>
                    <td>Bollo 34,20 €/anno se giacenza &gt; 5k €</td>
                  </tr>
                  <tr>
                    <td><strong>Monetario Overnight</strong></td>
                    <td>ETF XEON (Fondo Emergenza / Resilienza)</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.monetario)}</td>
                    <td>${report.assetAllocation.monetarioPct}%</td>
                    <td>Imposta sostitutiva 26% su plusvalenze</td>
                  </tr>
                  <tr>
                    <td><strong>Azionario Globale</strong></td>
                    <td>ETF Vanguard FTSE All-World (VWCE PAC)</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.azionario)}</td>
                    <td>${report.assetAllocation.azionarioPct}%</td>
                    <td>Imposta bollo 0,20% + 26% al realizzo</td>
                  </tr>
                  <tr>
                    <td><strong>Previdenza Integrativa</strong></td>
                    <td>Fondo Pensione Negoziale / Aperto</td>
                    <td class="font-mono privacy-mask">${this.formatCurrency(report.assetAllocation.pensione)}</td>
                    <td>${report.assetAllocation.pensionePct}%</td>
                    <td>Tassazione agevolata 9-15% a scadenza</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Sezione 3: Deduzione Fiscale Fondo Pensione (Art. 51 TUIR) -->
            <div class="tax-doc-section">
              <h4 class="tax-section-title">3. Ottimizzazione Fiscale & Deduzione IRPEF Pensione</h4>
              <div class="tax-pension-card">
                <div class="pension-deduction-grid">
                  <div>
                    <span class="pension-label">Totale Versamenti Previdenza ${report.year}</span>
                    <div class="pension-value privacy-mask">${this.formatCurrency(report.pensionDeduction.totalDeposited)}</div>
                  </div>
                  <div>
                    <span class="pension-label">Plafond Massimo Deducibile TUIR</span>
                    <div class="pension-value">5.164,57 €</div>
                  </div>
                  <div>
                    <span class="pension-label">Importo Effettivamente Deducibile</span>
                    <div class="pension-value positive-val privacy-mask">${this.formatCurrency(report.pensionDeduction.actualDeduction)}</div>
                  </div>
                  <div>
                    <span class="pension-label">Risparmio IRPEF Stimato in Busta/730</span>
                    <div class="pension-value irpef-savings privacy-mask">~ ${this.formatCurrency(report.pensionDeduction.estimatedTaxSavings)}</div>
                  </div>
                </div>
                <p class="pension-legal-note">
                  * Ai sensi dell'art. 10, comma 1, lett. e-bis) del TUIR, i contributi versati alle forme pensionistiche complementari sono deducibili dal reddito complessivo per un importo non superiore a 5.164,57 € annui.
                </p>
              </div>
            </div>

            <!-- Firma & Chiusura Apple Doc -->
            <div class="tax-doc-footer">
              <div class="footer-sign-col">
                <span class="sign-label">Elaborato da:</span>
                <span class="sign-name">Financial WebApp — Sistema Riconciliato</span>
              </div>
              <div class="footer-sign-col" style="text-align: right;">
                <span class="sign-label">Validazione Contabile:</span>
                <span class="sign-name">Snapshot Ufficiale Giorgio</span>
              </div>
            </div>

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
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    document.getElementById('btn-print-tax-report')?.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // ESPORTAZIONE CSV & BACKUP JSON
  // =========================================================================
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
      alert('Errore durante la generazione del CSV.');
    }
  }

  handleExportJSON(btn) {
    try {
      const jsonContent = financeStore.exportBackupJSON();
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `backup_finanze_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Backup Scaricato';
        setTimeout(() => { btn.innerHTML = orig; }, 2500);
      }
    } catch (err) {
      console.error('Errore esportazione JSON:', err);
      alert('Errore durante la generazione del backup JSON.');
    }
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
      <div class="page impostazioni-page">

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
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="apple-btn-secondary" id="btn-add-account-modal">+ Nuovo Conto</button>
                <button class="apple-btn-primary" id="btn-open-closing-studio" style="font-size: 13px; padding: 8px 16px;">
                  ${getIcon('conguaglio', 14)}
                  <span>Chiusura Fine Mese & Conguagli</span>
                </button>
              </div>
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
              <input type="text" id="new-cat-name" class="apple-input" placeholder="Es. Viaggi, Gaming, Abbigliamento..." />
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

            <!-- Smart Merge: Accorpamento Categorie Simili -->
            <div class="merge-categories-card">
              <h4>Accorpamento Intelligente Categorie (Smart Merge)</h4>
              <p style="font-size: 12px; color: var(--text-secondary); margin-top: var(--space-text-eyebrow); line-height: var(--lh-body);">
                Unisci due categorie simili (es. "Spesa" in "Alimentari"). Tutti i movimenti passati verranno convertiti automaticamente.
              </p>
              <div class="merge-row-controls">
                <div class="apple-select-wrapper">
                  <select id="merge-source-cat" class="apple-select">
                    <option value="" disabled selected>Categoria da unire...</option>
                    ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </select>
                  <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <span style="font-weight: 700; color: var(--apple-blue); font-size: 14px;">➔</span>
                <div class="apple-select-wrapper">
                  <select id="merge-target-cat" class="apple-select">
                    <option value="" disabled selected>Unisci dentro...</option>
                    ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </select>
                  <svg class="select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <button class="apple-btn-secondary" id="btn-merge-categories">Accorpa</button>
              </div>
            </div>

            <!-- Regole di Auto-Categorizzazione Smart -->
            <div class="merge-categories-card" style="margin-top: var(--space-box-gap-md);">
              <h4>Regole di Auto-Categorizzazione (Smart Rules)</h4>
              <p style="font-size: 12px; color: var(--text-secondary); margin-top: var(--space-text-eyebrow); margin-bottom: var(--space-text-sub); line-height: var(--lh-body);">
                Quando inserisci un movimento, queste parole chiave compilano automaticamente la categoria appropriata:
              </p>
              <div class="cluster-gap-xs">
                ${financeStore.getSmartRules().slice(0, 16).map(r => `
                  <span style="background: var(--bg-card); padding: 4px 10px; border-radius: var(--radius-pill); font-size: 11px; border: 1px solid var(--border-subtle); display: inline-flex; align-items: center; gap: 4px;">
                    <strong style="color: var(--apple-blue);">${r.keyword}</strong> ➔ ${r.category}
                  </span>
                `).join('')}
                <span style="font-size: 11px; color: var(--text-tertiary); align-self: center;">+ altre ${financeStore.getSmartRules().length - 16} regole attive</span>
              </div>
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
                <div class="pin-status-icon" style="color: var(--apple-blue); display: flex; align-items: center; justify-content: center;">${getIcon('lock', 24)}</div>
                <div>
                  <strong>${isPinActive ? 'Protezione PIN Attiva' : 'Nessun PIN Configurato'}</strong>
                  <p>${isPinActive ? 'All\'apertura della web app viene richiesto il codice di sblocco a 4 cifre.' : 'La web app si apre direttamente senza richiedere codici.'}</p>
                </div>
              </div>

              <div class="form-group" style="margin-top: var(--space-box-gap-md);">
                <label class="form-label" for="input-security-pin">Imposta o Cambia Codice PIN (4 cifre)</label>
                <div class="cluster-gap-sm">
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
                <span class="sheet-status-indicator" style="width: 8px; height: 8px; background-color: ${googleSheetsService.isSandboxMode() ? 'var(--apple-orange)' : (config.isConfigured ? 'var(--apple-green)' : 'var(--apple-green)')};"></span>
                <span class="sheet-status-desc">${googleSheetsService.isSandboxMode() ? '🛡️ Sandbox Protetto' : (config.isConfigured ? 'Connesso Live' : 'Pronto (Locale)')}</span>
              </span>
            </div>

            <!-- Apple Toggle: Sandbox Mode -->
            <div class="settings-toggle-row">
              <div class="toggle-label-group">
                <strong>Modalità Sandbox (Protezione Database)</strong>
                <span>${googleSheetsService.isBeta ? 'Attiva di default sul branch Beta per blindare il database reale durante i test e R&D.' : 'Blocca scritture ed eliminazioni sul foglio Google Sheets per simulazioni e test protetti.'}</span>
              </div>
              <label class="apple-switch" title="Attiva/Disattiva Modalità Sandbox">
                <input type="checkbox" id="gas-sandbox-toggle" ${googleSheetsService.isSandboxMode() ? 'checked' : ''} />
                <span class="switch-slider"></span>
              </label>
            </div>

            <!-- Apple Feedback Banner: Sandbox vs Live Sync -->
            ${googleSheetsService.isSandboxMode() ? `
              <div class="sandbox-shield-banner" style="display: flex; gap: var(--space-box-gap-sm); align-items: flex-start; background: rgba(255, 149, 0, 0.1); border: 1px solid rgba(255, 149, 0, 0.3); border-radius: var(--radius-lg); padding: var(--space-card-pad-sm) var(--space-card-pad); margin-bottom: var(--space-box-gap-lg);">
                <div style="color: var(--apple-orange); display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding-top: 2px;">
                  ${getIcon('shield', 26)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div class="cluster-gap-xs mb-text-title">
                    <strong style="color: var(--apple-orange); font-size: 14px; font-weight: 600;">Protezione Database Attiva (${googleSheetsService.isBeta ? 'Ambiente Beta' : 'Sandbox Mode'})</strong>
                    <span style="background: rgba(255, 149, 0, 0.2); color: var(--apple-orange); font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px;">Zero Scritture su Google Sheets</span>
                  </div>
                  <p style="font-size: 12.5px; color: var(--text-secondary); line-height: var(--lh-body); margin: 0;">
                    ${googleSheetsService.isBeta 
                      ? 'Sei sul branch di sviluppo Beta: tutte le operazioni (creazione o eliminazione movimenti, conguagli saldi, nuovi obiettivi) <strong>restano al 100% fittizie e confinate in locale sul tuo browser</strong> per proteggere il tuo foglio Google Sheets reale.' 
                      : 'In questa modalità protetta, tutte le operazioni (creazione o eliminazione di movimenti, conguagli saldi, nuovi obiettivi) <strong>restano al 100% fittizie e confinate in locale sul tuo browser</strong>. Nessuna operazione di scrittura o cancellazione viene inviata al tuo foglio Google Sheets reale originale.'}
                  </p>
                </div>
              </div>
            ` : `
              <div class="sandbox-shield-banner" style="display: flex; gap: var(--space-box-gap-sm); align-items: flex-start; background: rgba(52, 199, 89, 0.08); border: 1px solid rgba(52, 199, 89, 0.25); border-radius: var(--radius-lg); padding: var(--space-card-pad-sm) var(--space-card-pad); margin-bottom: var(--space-box-gap-lg);">
                <div style="color: var(--apple-green); display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding-top: 2px;">
                  ${getIcon('sync', 24)}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <div class="cluster-gap-xs mb-text-title">
                    <strong style="color: var(--apple-green); font-size: 14px; font-weight: 600;">Sincronizzazione Live Bidirezionale</strong>
                    <span style="background: rgba(52, 199, 89, 0.2); color: var(--apple-green); font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 9999px;">Database Produzione</span>
                  </div>
                  <p style="font-size: 12.5px; color: var(--text-secondary); line-height: var(--lh-body); margin: 0;">
                    L'app è collegata al tuo foglio Google Sheets reale: ogni nuovo movimento inserito, conguaglio o modifica viene sincronizzato e salvato istantaneamente sul cloud.
                  </p>
                </div>
              </div>
            `}

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
              <button class="apple-btn-secondary" id="btn-force-sync-now" style="color: var(--apple-blue); border-color: rgba(0, 113, 227, 0.3);">
                ${getIcon('sync', 14)}
                <span>Sincronizza Ora dal Foglio</span>
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

  openConguaglioModal(acc, newBal, container) {
    const modalRoot = document.getElementById('modal-container');
    if (!modalRoot) return;

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

    // Studio Chiusura Fine Mese & Conguagli
    const btnClosingStudio = document.getElementById('btn-open-closing-studio');
    if (btnClosingStudio) {
      btnClosingStudio.addEventListener('click', () => {
        monthlyClosingModal.open({
          onSuccess: () => this.render(container)
        });
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
      btnSaveSheets.addEventListener('click', () => {
        const url = document.getElementById('gas-url-input')?.value || '';
        const token = document.getElementById('gas-token-input')?.value || '';
        const isSandbox = document.getElementById('gas-sandbox-toggle')?.checked ?? googleSheetsService.isSandboxMode();
        googleSheetsService.saveConfig(url, token, true, isSandbox);
        alert('Parametri di sincronizzazione salvati con successo!');
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

    const btnForceSync = document.getElementById('btn-force-sync-now');
    if (btnForceSync) {
      btnForceSync.addEventListener('click', async () => {
        const feedbackEl = document.getElementById('connection-test-feedback');
        if (feedbackEl) {
          feedbackEl.style.display = 'block';
          feedbackEl.className = 'connection-feedback loading';
          feedbackEl.textContent = 'Scaricamento e allineamento dati da Google Sheets in corso...';
        }

        try {
          const data = await googleSheetsService.fetchAllData();
          if (data && data.transactions) {
            financeStore.setTransactions(data.transactions);
            if (data.saldi) {
              data.saldi.forEach(s => {
                financeStore.updateAccountBalance(s.name, s.balance);
              });
            }
            if (feedbackEl) {
              feedbackEl.className = 'connection-feedback success';
              feedbackEl.textContent = `Sincronizzazione completata con successo! ${data.transactions.length} movimenti e saldi allineati.`;
            }
            setTimeout(() => this.render(container), 800);
          } else {
            if (feedbackEl) {
              feedbackEl.className = 'connection-feedback error';
              feedbackEl.textContent = 'Nessun dato ricevuto da Google Sheets o configurazione non valida.';
            }
          }
        } catch (err) {
          if (feedbackEl) {
            feedbackEl.className = 'connection-feedback error';
            feedbackEl.textContent = 'Errore durante la sincronizzazione: ' + (err.message || err);
          }
        }
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
    subtitle: 'Allocazione asset, XEON, VWCE & Pensione'
  },
  storico: {
    id: 'storico',
    title: 'Storico Patrimonio',
    subtitle: 'Evoluzione Net Worth 2024 - 2026'
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
    const parts = rawHash.split('-');
    const tabName = parts[0].split('?')[0];
    const subtab = parts[1] ? parts[1].split('?')[0] : null;
    const initialTab = VIEWS[tabName] ? tabName : 'dashboard';

    if (subtab) {
      if (initialTab === 'movimenti') this.movimentiView.activeSubtab = subtab;
      else if (initialTab === 'investimenti') this.investimentiView.activeSubtab = subtab;
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
        }
        this.switchTab(curTab, curSub);
      }
    });

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
          else if (this.currentTab === 'spese') this.speseView.render(container);
          else if (this.currentTab === 'assistente') this.assistenteView.render(container);
          else if (this.currentTab === 'movimenti') this.movimentiView.render(container);
          else if (this.currentTab === 'investimenti') this.investimentiView.render(container);
          else if (this.currentTab === 'storico') this.storicoView.render(container);
        }
      }).catch(err => console.warn('Sync background:', err));
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
