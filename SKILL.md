---
name: ui-perfect-design
description: Progetta e costruisce l'interfaccia grafica (UI/UX, layout, stile) di web app con precisione maniacale, senza sovrapposizioni di testi o box, overflow, bug visivi o spaziature incoerenti. Usa SEMPRE questa skill quando l'utente chiede di creare, ridisegnare, sistemare o rifinire la grafica, il design, il layout, le pagine, i componenti o lo stile di un sito/web app, anche se non dice esplicitamente "design". Impone un design system a token, una griglia a 8px, regole anti-sovrapposizione e un ciclo obbligatorio di verifica nel browser (screenshot + audit automatico) su più viewport prima di dichiarare il lavoro concluso.
---

# UI Perfect Design

Obiettivo: ogni pagina deve risultare **coerente, allineata, leggibile e priva di difetti visivi** su desktop, tablet e mobile. "Sembra a posto" NON basta: ogni consegna va **verificata nel browser** (Fase 5).

## Regole d'oro (non negoziabili)

1. **Nessun valore "a occhio".** Colori, font-size, spaziature, raggi, ombre arrivano SOLO da variabili CSS (design token). Vietati valori hardcoded sparsi (`margin: 13px`, `#3a3a3a` inline).
2. **Una sola scala di spaziatura**: multipli di 4px, con preferenza per 8px (4, 8, 12, 16, 24, 32, 48, 64, 96).
3. **Layout con Flexbox/Grid, mai con `position:absolute` per impaginare.** Absolute solo per badge, tooltip, overlay, e sempre dentro un contenitore `position:relative` esplicito.
4. **Nessuna altezza fissa su contenitori con testo** (`height` in px). Usa `min-height`, padding e contenuto che detta l'altezza.
5. **Mai dichiarare "fatto" senza aver eseguito la verifica** (Fase 5) e corretto tutti i difetti trovati.
6. Se manca un'informazione di design (palette, brand, tono), **scegli tu una direzione coerente e dichiarala** in `DESIGN.md`; chiedi all'utente solo se è davvero bloccante.

## Workflow obbligatorio

### Fase 1 — Direzione e inventario
- Leggi il progetto esistente: framework (React/Vue/Svelte/HTML), CSS usato (Tailwind, CSS modules, ecc.), componenti già presenti. **Riusa e non duplicare.**
- Elenca tutte le pagine/viste e i componenti ricorrenti (header, card, form, tabelle, modali, bottoni, empty state).
- Scrivi `DESIGN.md` nella root con: scopo dell'app, tono visivo, palette, tipografia, scala spaziature, breakpoint. Questo file è la fonte di verità per tutte le pagine.

### Fase 2 — Design system a token
Crea un unico file (`tokens.css` o `:root` nel CSS globale) PRIMA di qualsiasi pagina. Schema minimo:

```css
:root {
  /* Spaziatura (base 4px, step 8px) */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px;  --space-7: 48px; --space-8: 64px; --space-9: 96px;

  /* Tipografia (scala modulare ~1.25) */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.125rem; --text-xl: 1.25rem;  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem;
  --leading-tight: 1.2; --leading-normal: 1.5; --leading-relaxed: 1.65;

  /* Colori semantici (non "blue-500" ma ruolo) */
  --color-bg: ...; --color-surface: ...; --color-surface-2: ...;
  --color-text: ...; --color-text-muted: ...; --color-border: ...;
  --color-primary: ...; --color-primary-contrast: ...;
  --color-success: ...; --color-warning: ...; --color-danger: ...;

  /* Forma ed elevazione */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-full: 999px;
  --shadow-sm: ...; --shadow-md: ...;

  /* Layout */
  --container-max: 1200px;
  --gutter: var(--space-4);
  --control-height: 44px;        /* altezza uniforme di bottoni/input */
  --header-height: 64px;
  --z-dropdown: 100; --z-sticky: 200; --z-modal: 1000; --z-toast: 1100;
}
@media (min-width: 768px)  { :root { --gutter: var(--space-5); } }
@media (min-width: 1200px) { :root { --gutter: var(--space-6); } }
```

Regole sui token:
- Contrasto testo/sfondo **≥ 4.5:1** (≥ 3:1 per testo grande e bordi di controlli).
- Supporta dark mode solo se richiesto; se sì, ridefinisci SOLO i token colore.
- Max 2 famiglie di font, max 4 pesi.

### Fase 3 — Componenti prima delle pagine
Costruisci i componenti base una volta sola e riusali ovunque: `Button`, `Input/Select/Textarea`, `Card`, `Badge`, `Modal`, `Table`, `Navbar`, `PageHeader`, `EmptyState`, `Toast`.
Ogni componente deve avere gli stati: default, hover, focus-visible, active, disabled, loading, error. 
- Tutti i controlli interattivi: altezza `var(--control-height)`, area di tocco ≥ 44×44px.
- `:focus-visible` sempre visibile (outline 2px, offset 2px). Mai `outline: none` senza sostituto.
- Transizioni 150–250ms, solo su `color, background, border, box-shadow, transform, opacity`. Rispetta `prefers-reduced-motion`.

### Fase 4 — Impaginazione delle pagine
**Struttura uniforme:** ogni pagina usa lo STESSO scheletro (header → contenuto in `.container` → footer), con stesso padding verticale di sezione (`--space-8` desktop, `--space-7` mobile).

**Ritmo verticale coerente:**
- Tra titolo sezione e contenuto: `--space-5`
- Tra card/box adiacenti (gap): `--space-4` (mobile) / `--space-5` (desktop) — sempre `gap`, non margin sparsi
- Padding interno card: `--space-5` (mobile `--space-4`), identico in TUTTE le card
- Label → input: `--space-2`; input → input: `--space-4`
- Icona → testo: `--space-2`
- Eredita questi valori da classi/utility condivise, non ridefinirli per pagina.

**Come evitare sovrapposizioni (checklist tecnica):**
- Contenitori flex/grid con `gap` invece di margini manuali; `min-width: 0` sui figli flex/grid che contengono testo (previene overflow).
- Testo lungo: `overflow-wrap: anywhere` (o `word-break: break-word`) sui contenuti utente; per troncare usare esplicitamente `text-overflow: ellipsis` + `white-space: nowrap` + `min-width:0` + `title`/tooltip. Mai testo che esce dal box.
- Grid responsive con `repeat(auto-fit, minmax(min(100%, 260px), 1fr))`.
- `box-sizing: border-box` globale; reset `margin:0` su heading/p e spaziatura gestita da un unico meccanismo (flow con `> * + * { margin-top }` oppure `gap`).
- Immagini/video: `max-width:100%; height:auto; display:block;` e `aspect-ratio` per prevenire layout shift.
- Header/sidebar sticky o fixed: compensa con `padding-top`/`scroll-margin-top` pari a `--header-height` e usa i token `--z-*`, mai z-index arbitrari (999999).
- Niente `100vw` per le larghezze (causa scroll orizzontale): usa `100%`. Per l'altezza schermo usa `100dvh`.
- Tabelle larghe: wrapper con `overflow-x:auto`, mai tabella che sfonda la pagina.
- Testi in bottoni/badge/tab: `white-space: nowrap` solo se c'è spazio garantito, altrimenti permetti il wrap e usa `min-height` invece di `height`.
- Modali/dropdown: devono restare nel viewport (`max-height: calc(100dvh - 2*var(--space-4))`, `overflow:auto`).

**Responsive mobile-first:** scrivi prima il mobile (360px), poi amplia con `min-width` a 640 / 768 / 1024 / 1280. Nessun elemento deve richiedere scroll orizzontale a 320px.

**Tipografia:** corpo ≥ 16px; lunghezza riga 45–75 caratteri (`max-width: 65ch` per paragrafi); un solo `<h1>` per pagina; gerarchia heading senza salti; `line-height` per heading `--leading-tight`, per corpo `--leading-normal`.

**Stati obbligatori in ogni vista dati:** caricamento (skeleton/spinner), vuoto (EmptyState con azione), errore (messaggio + retry), testo molto lungo, testo molto corto, 0/1/molti elementi.

### Fase 5 — Verifica obbligatoria (non saltare)

**5.1 Audit automatico.** Esegui lo script incluso:
```bash
npm i -D playwright && npx playwright install chromium   # solo la prima volta
node .agent/skills/ui-perfect-design/scripts/audit-layout.mjs http://localhost:3000 / /login /dashboard
```
Lo script controlla su 5 viewport (320, 375, 768, 1280, 1920): scroll orizzontale, testo che esce dal box, elementi che si sovrappongono, elementi fuori viewport, spaziature fuori scala (non multiple di 4), target di tocco < 44px, errori in console. **Exit code ≠ 0 = ci sono difetti: correggili e rilancia finché è pulito.**

**5.2 Verifica visiva con il browser di Antigravity.** Apri ogni pagina con il browser agent, scatta screenshot a 375px, 768px e 1440px e **guardali davvero**: cerca testi tagliati, box che si toccano, allineamenti sfalsati, spazi irregolari, icone non centrate, gerarchia confusa. Controlla anche: hover/focus, modale aperto, menu mobile aperto, form con errori, testo lungo inserito nei campi.

**5.3 Controllo di coerenza cross-pagina.** Confronta le pagine fianco a fianco: stessi margini laterali, stessa altezza header, stesse spaziature tra sezioni, stessi stili di titoli, bottoni e card. Qualsiasi differenza non intenzionale va ricondotta ai token.

**5.4 Pulizia.** Cerca nel codice valori fuori sistema e sostituiscili:
```bash
grep -rnE "(margin|padding|gap)[^;]*:\s*[0-9]+px" src | grep -vE "var\(--space"   # spaziature hardcoded
grep -rnE "#[0-9a-fA-F]{3,8}\b" src --include=*.css --include=*.tsx --include=*.vue | grep -v tokens   # colori hardcoded
grep -rnE "z-index:\s*[0-9]{4,}" src                                                                   # z-index fuori scala
```

### Fase 6 — Consegna
Riporta all'utente in modo sintetico: pagine realizzate, token principali scelti, viewport verificati, risultato dell'audit (0 difetti), screenshot chiave, eventuali compromessi consapevoli. Se un difetto non è risolvibile, dichiaralo esplicitamente invece di nasconderlo.

## Anti-pattern da evitare
- Altezze fisse in px su box con testo · `position:absolute` per impaginare · `!important` per "far funzionare" · margini negativi di aggiustamento · z-index random · `100vw` · font-size in px sparsi · spaziature diverse per ogni pagina · testo bianco su sfondi chiari/immagini senza overlay · placeholder usato al posto della label · icone senza `aria-label` quando sono l'unico contenuto di un bottone · layout testato solo a una larghezza.

## Checklist finale (tutte devono essere vere)
- [ ] Tutti i valori vengono dai token; nessun valore hardcoded
- [ ] Spaziature identiche per ruolo su tutte le pagine
- [ ] Zero scroll orizzontale da 320px a 1920px
- [ ] Zero testi tagliati o fuoriusciti dai box (anche con testi lunghi)
- [ ] Zero sovrapposizioni tra elementi non intenzionali
- [ ] Contrasto ≥ 4.5:1, focus visibile, target tocco ≥ 44px
- [ ] Stati loading / vuoto / errore presenti
- [ ] Audit automatico a zero difetti + screenshot controllati a 3 larghezze
- [ ] Console del browser senza errori né warning
