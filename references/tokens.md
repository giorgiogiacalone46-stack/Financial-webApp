# Token (copia in un unico file, importato da tutte le pagine)
```css
:root{
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:24px;--space-6:32px;--space-7:48px;--space-8:64px;
  --grid-gap:var(--space-5); --card-pad:var(--space-5); --header-height:64px; --control-height:44px;
  --text-xs:.75rem;--text-sm:.875rem;--text-base:1rem;--text-lg:1.25rem;--text-xl:1.5rem;--text-2xl:2.25rem;
  --leading-tight:1.2;--leading-normal:1.5;
  --radius-md:10px;--radius-lg:16px;
  --z-sticky:200;--z-modal:1000;--z-toast:1100;
  /* + colori semantici: bg, surface, text, text-muted, border, primary, success, warning, danger */
}
```
Valori fissi: gap card 24px · padding card 24px (16px compatte) · header→contenuto 16px · titolo→valore 8px · blocco→blocco 16px · etichetta→barra 8px.
Contrasto testo ≥ 4.5:1, corpo ≥ 14px, secondari ≥ 12px.
Pagina: `padding-top: calc(var(--header-height) + var(--space-5))`; sezioni separate da `--grid-gap`.
