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

import { getIcon } from './icons.js';

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
export function Badge({ text, type = 'neutral', icon = '', tooltip = '', className = '' }) {
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
export function KeyValueRow({ label, value, tooltip = '', isPositive = false, isNegative = false, isMuted = false, isHighlighted = false, className = '' }) {
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
export function MeterRow({ label, percent = 0, valueText = '', color = 'var(--apple-blue)', statusText = '', labelTooltip = '', className = '' }) {
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
export function AlertItem({ icon = null, title, value = '', detail = '', type = 'warning', badgeText = '', className = '' }) {
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
export function Card({ header = '', value = '', body = '', footer = '', compact = false, highlight = false, className = '', id = '', style = '', attributes = '' }) {
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
export function KpiCard({ title, badge = '', icon = '', value, body = '', footer = '', compact = false, highlight = false, titleTooltip = '', valueTooltip = '', className = '', id = '' }) {
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
