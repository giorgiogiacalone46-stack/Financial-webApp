# Anatomia card (identica ovunque)
Zone in ordine: 1 header (titolo + icona/badge) · 2 valore · 3 corpo · 4 footer ancorato in basso.
```css
.grid{display:grid;gap:var(--grid-gap);align-items:stretch;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))}
.card{display:grid;grid-template-rows:auto auto 1fr auto;row-gap:var(--space-4);padding:var(--card-pad);min-width:0}
.card__header{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--space-3);min-height:calc(2 * 1.5em)}
.card__badge{flex:none;white-space:nowrap}
.card__value{font-variant-numeric:tabular-nums;line-height:var(--leading-tight)}
.card__body{display:flex;flex-direction:column;gap:var(--space-4);min-width:0}
.card__footer{align-self:end}
.meter{display:grid;row-gap:var(--space-2)} .meter__row{display:flex;justify-content:space-between;align-items:baseline;gap:var(--space-3)}
.meter__value{flex:none;white-space:nowrap} .meter__bar{height:8px}
.kv{display:flex;justify-content:space-between;align-items:baseline;gap:var(--space-3)} .kv__val{flex:none;white-space:nowrap}
```
Card nella stessa riga = stessa altezza. Testo mai dentro la barra di progresso. Etichetta può andare a capo, valore no.
