#!/usr/bin/env node
// Uso: node audit-layout.mjs <baseUrl> [percorsi...] [--full] [--shots]
// Default: 3 viewport (375, 768, 1440). --full: 5 viewport. --shots: salva screenshot.
import { chromium } from 'playwright';
const args = process.argv.slice(2);
const full = args.includes('--full'), shots = args.includes('--shots');
const [base, ...paths] = args.filter(a => !a.startsWith('--'));
if (!base) { console.error('Uso: node audit-layout.mjs <baseUrl> [percorsi...]'); process.exit(2); }
const routes = paths.length ? paths : ['/'];
const widths = full ? [320, 375, 768, 1280, 1920] : [375, 768, 1440];
const MAX = 12;

function audit() {
  const out = [], vw = document.documentElement.clientWidth;
  const sel = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.classList.length ? '.' + [...e.classList].slice(0, 2).join('.') : '');
  const vis = e => { const c = getComputedStyle(e), r = e.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && r.width > 0 && r.height > 0; };
  const all = [...document.body.querySelectorAll('*')].filter(vis);
  if (document.documentElement.scrollWidth > vw + 1) out.push(['scroll-orizzontale', 'html', `${document.documentElement.scrollWidth}>${vw}`]);
  for (const e of all) {
    const c = getComputedStyle(e), r = e.getBoundingClientRect();
    const txt = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
    let sp = false; for (let p = e.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (['auto', 'scroll', 'hidden'].includes(o)) { sp = true; break; } }
    if (!sp && c.position !== 'fixed' && (r.right > vw + 1 || r.left < -1)) out.push(['fuori-viewport', sel(e), `${Math.round(r.left)}..${Math.round(r.right)}`]);
    if (txt && c.display !== 'inline' && e.clientWidth > 0 && e.scrollWidth > e.clientWidth + 1 && c.textOverflow !== 'ellipsis') out.push(['testo-fuoriuscito', sel(e), `${e.scrollWidth}>${e.clientWidth}`]);
    if (c.display.includes('grid') || c.display.includes('flex')) for (const p of ['rowGap', 'columnGap']) { const v = parseFloat(c[p]); if (v && Math.abs(v / 4 - Math.round(v / 4)) > 0.02) out.push(['gap-fuori-scala', sel(e), `${p} ${v}px`]); }
  }
  for (const p of new Set(all.map(e => e.parentElement).filter(Boolean))) {
    const k = [...p.children].filter(c => vis(c) && ['static', 'relative'].includes(getComputedStyle(c).position));
    for (let i = 0; i < k.length; i++) for (let j = i + 1; j < k.length; j++) {
      const a = k[i].getBoundingClientRect(), b = k[j].getBoundingClientRect();
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
      if (ox > 2 && oy > 2) out.push(['sovrapposizione', `${sel(k[i])} x ${sel(k[j])}`, `${Math.round(ox)}x${Math.round(oy)}`]);
    }
  }
  return out;
}

const br = await chromium.launch(); let total = 0;
for (const route of routes) for (const w of widths) {
  const pg = await br.newPage({ viewport: { width: w, height: 900 } }); const errs = [];
  pg.on('pageerror', e => errs.push(['console', 'pageerror', e.message]));
  try {
    await pg.goto(new URL(route, base).href, { waitUntil: 'networkidle', timeout: 30000 });
    const res = [...new Map((await pg.evaluate(audit)).concat(errs).map(i => [i.join('|'), i])).values()];
    total += res.length;
    console.log(`[${route} @${w}] ${res.length ? res.length + ' difetti' : 'OK'}`);
    res.slice(0, MAX).forEach(i => console.log(`  - ${i.join(' · ')}`));
    if (res.length > MAX) console.log(`  ... +${res.length - MAX}`);
    if (shots) await pg.screenshot({ path: `audit-${route.replace(/\W+/g, '_') || 'home'}-${w}.png`, fullPage: true });
  } catch (e) { console.log(`[${route} @${w}] ERRORE ${e.message}`); total++; }
  await pg.close();
}
await br.close();
console.log(total ? `Difetti totali: ${total}` : 'Nessun difetto');
process.exit(total ? 1 : 0);
