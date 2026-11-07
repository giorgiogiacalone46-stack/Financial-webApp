---
name: apple-design-system
description: >-
  Master guidelines, design principles, spacing rules, typography, and anti-overlap engineering for Apple HIG (macOS & iOS) and Apple.com visual style. Use whenever developing, styling, or reviewing UI components, CSS, layouts, cards, and animations in the Financial WebApp.
---

# Apple Design System & Graphic Standards

This skill defines the definitive design system and engineering rules for crafting interfaces that match the visual fidelity, craftsmanship, and elegance of **Apple.com** and native **macOS / iOS Human Interface Guidelines (HIG)**.

---

## 🎨 1. Core Visual Principles (Apple.com Benchmark)

1. **Airy Whitespace & Visual Rhythm**:
   - Never crowd content. Elements must breathe with generous, deliberate spacing.
   - Section spacing: `margin-bottom: 28px - 36px`.
   - Grid and flex gaps: `18px - 24px`.
   - Card internal paddings: `22px - 28px` (never less than `18px` on mobile).

2. **Apple Typographic Hierarchy**:
   - **Font Family**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif`.
   - **Display Headings**: `font-weight: 700 - 800`, `letter-spacing: -0.025em`, `line-height: 1.15`.
   - **Section Headers**: `font-size: 17px - 20px`, `font-weight: 700`, `letter-spacing: -0.015em`.
   - **KPI Large Numbers**: `font-size: 28px - 36px`, `font-weight: 800`, `letter-spacing: -0.03em`, `font-variant-numeric: tabular-nums`.
   - **Body & Subtitles**: `font-size: 13px - 14px`, `color: var(--text-secondary)`, `line-height: 1.45 - 1.5`.
   - **Caption / Meta**: `font-size: 10px - 11px`, `text-transform: uppercase`, `letter-spacing: 0.04em`, `font-weight: 600`.

3. **Continuous Squircle Geometry & Corners**:
   - Container cards: `border-radius: 18px - 24px`.
   - Small cards / Modals: `border-radius: 14px - 18px`.
   - Buttons & Badges: `border-radius: 9999px` (Pills) or `10px - 12px`.
   - Never use sharp rectangular corners.

4. **Multi-Tier Glassmorphism & Depth**:
   - Backgrounds: `background: var(--bg-card);` with fallback.
   - Translucent elements: `backdrop-filter: blur(28px) saturate(180%); -webkit-backdrop-filter: blur(28px) saturate(180%);`.
   - Soft dual-layer shadows:
     - Light: `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02);`
     - Dark: `box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);`
   - Subtle borders: `border: 1px solid var(--border-subtle);` (`rgba(0, 0, 0, 0.06)` light / `rgba(255, 255, 255, 0.08)` dark).

5. **Official Apple Color Palette**:
   - Apple Blue (Primary Accent): `#0071E3` (Light) / `#0A84FF` (Dark)
   - Apple Green (Success / Incomes): `#34C759` (Light) / `#30D158` (Dark)
   - Apple Red (Danger / Expenses): `#FF3B30` (Light) / `#FF453A` (Dark)
   - Apple Orange (Warning / Runway): `#FF9500` (Light) / `#FF9F0A` (Dark)
   - Apple Purple (Savings / Pension): `#AF52DE` (Light) / `#BF5AF2` (Dark)

---

## 📐 2. Predefined Spacing Tokens & Spatial Matrix (Margini Standard)

To eliminate any risk of accidental collisions, crowding, or overlaps now and in future updates, every margin, gap, and padding must derive exclusively from the official **Apple Spatial Tokens scale**:

### A. Core Spatial Scale (Apple 4pt / 8pt Grid)
| Token | Pixels | Semantic Usage |
| :--- | :--- | :--- |
| `--space-3xs` | `2px` | Micro offsets, border alignments |
| `--space-2xs` | `4px` | Eyebrow text, badge separation, dot indicator margin |
| `--space-xs` | `6px` | Title-to-subtitle gap, form label to input |
| `--space-sm` | `8px` | Minimum horizontal gap between chips, badges, icons |
| `--space-md` | `12px` | Subtitle-to-body margin, paragraph spacing, button cluster gap |
| `--space-base` | `16px` | Compact card gap, form rows, table row padding |
| `--space-lg` | `20px` | Standard grid gap, card header separation |
| `--space-xl` | `24px` | Desktop card internal padding, large layout gaps |
| `--space-2xl` | `32px` | Macro section separation, main container margins |
| `--space-3xl` | `40px` | Viewport desktop horizontal padding |

### B. Typography Spacing Matrix (Tra le Scritte)
* **Title to Subtitle**: `--space-text-title: 6px` (`h1/h2/h3 + subtitle`).
* **Subtitle to Content**: `--space-text-sub: 12px` (`.card-subtitle + content`).
* **Paragraph to Paragraph**: `--space-text-p: 12px` (`p + p`).
* **Label to Field / Value**: `--space-text-label: 6px` (`.form-label + input`).
* **KPI Number to Trend / Caption**: `--space-text-kpi-sub: 4px` (`.kpi-value + .kpi-sub`).
* **Protected Line Heights**:
  * Large Numbers & KPIs: `--lh-tight: 1.15`
  * Headings (`h1`, `h2`, `h3`): `--lh-title: 1.25`
  * Body Text & Descriptions: `--lh-body: 1.50`
  * Labels, Badges & Chips: `--lh-caption: 1.30`

### C. Box & Layout Spacing Matrix (Tra i Box e Componenti)
* **Pill & Tag Chips**: `gap: var(--space-box-gap-xs)` (`8px`).
* **Toolbar Buttons & Action Pairs**: `gap: var(--space-box-gap-sm)` (`12px`).
* **Form Field Rows & List Items**: `gap: var(--space-box-gap-md)` (`16px`).
* **Grid Cards Separation**: `gap: var(--space-box-gap-lg)` (`20px`).
* **Major Layout Blocks**: `gap: var(--space-box-gap-xl)` (`24px`).
* **Macro Sections**: `margin-bottom: var(--space-section-gap)` (`32px`).
* **Card Internal Padding**: `--space-card-pad` (`24px` on desktop, automatically responsive to `18px` on mobile).
* **Modal Internal Padding**: `--space-modal-pad` (`26px` desktop, `20px` mobile).

### D. Reusable Spatial Utility Classes
```css
/* Stacks (Vertical spacing between boxes) */
.stack-gap-xs /* 8px */  .stack-gap-sm /* 12px */  .stack-gap-md /* 16px */
.stack-gap-lg /* 20px */ .stack-gap-xl /* 24px */

/* Clusters (Horizontal wrapping chips, buttons, badges) */
.cluster-gap-xs /* 8px */  .cluster-gap-sm /* 12px */
.cluster-gap-md /* 16px */ .cluster-gap-lg /* 20px */

/* Label-Value Anti-Overlap Row */
.label-val-pair /* Left label shrinks/ellipsizes, right number never shrinks (tabular-nums) */
```

---

## 🛡️ 3. Anti-Overlap Engineering Rules (Zero-Collision Mandate)

A visual overlap or cramped container breaks the illusion of quality. Follow these strict engineering rules:

1. **Defensive Grid Columns (`minmax(min(100%, X), 1fr)`)**:
   - Avoid fixed column fractions like `1.4fr 1fr 1fr` that squeeze cards below 320px.
   - Use auto-fitting fluid grids:
     ```css
     grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
     ```
   - This automatically cascades from 3 columns on large screens to 2 columns on MacBook, to 1 column on iPhone.

2. **The `min-width: 0` Flexbox Rule**:
   - In CSS flexbox, flex children default to `min-width: auto`, which prevents them from shrinking below their content size and causes layout blowouts.
   - **Always** apply `min-width: 0;` to flex children containing text or responsive cards.

3. **No Overlapping Text Pairs**:
   - When displaying a label next to a value (e.g. `Nome Categoria` and `1.200,00 €`), avoid cramped single-line `justify-content: space-between` with long text strings.
   - Use structured pairs:
     ```html
     <div class="row-header">
       <span class="row-label">Nome Categoria</span>
       <span class="row-val">1.200,00 €</span>
     </div>
     ```
     With `gap: 12px;` and `white-space: nowrap;` on the currency value, allowing the label to truncate cleanly with `text-overflow: ellipsis;` if necessary.

4. **Multi-Row Breakdowns for Dense Cards**:
   - Instead of squeezing 3 bars side-by-side inside an already small card, stack them vertically with a header row:
     - Top: Label on left, Metric / Percentage on right.
     - Bottom: Full-width progress track (`height: 6px; border-radius: 9999px;`).

5. **Tabular Numerals for Currency (`tabular-nums`)**:
   - Always set `font-variant-numeric: tabular-nums;` on all amounts. This ensures digits align vertically and prevents horizontal jitter when values update.

6. **Input & Button Pair Spacing**:
   - Deposit bars and form action rows must have clear separation:
     ```css
     display: grid;
     grid-template-columns: 1fr auto;
     gap: 10px;
     align-items: center;
     ```

7. **Master Table & List Pattern (Zero-Collision Tables)**:
   - Header e righe dati devono condividere la medesima specifica CSS Grid:
     ```css
     grid-template-columns: 56px minmax(180px, 1fr) 140px 130px 36px;
     gap: var(--space-box-gap-md);
     ```
   - **Descrizione e Conto**: mai affiancati orizzontalmente in flex row. Vanno disposti verticalmente in colonna con `min-width: 0;` e `text-overflow: ellipsis;`.
   - **Badge Data**: squircle a larghezza fissa (48px) con giorno grande e mese abbreviato.
   - **Pill Categoria**: larghezza controllata con ellipsis per stringhe lunghe.
   - **Importo**: sempre in `tabular-nums` con `flex-shrink: 0` e allineamento a destra.
   - **Comportamento Mobile (≤ 768px)**: l'header viene nascosto e la riga si trasforma nel layout a 2 righe stile Apple Wallet (`grid-template-areas: "date desc amount" "date cat actions"`).

8. **Spaziatura e Layout Sezione Investimenti & Salvadanai (Airy Investment Cards)**:
   - **Titoli domande e sezioni**: `survey-question-title` sempre `display: block` con `margin-bottom: 14px` per evitare che testi e box di selezione si tocchino.
   - **Holding Rows**: padding `16px 18px`, `gap: 16px`, con distacco verticale tra nome e tipo asset di `var(--space-text-title)` (6px) e linea di supporto per importo/cassa.
   - **Simulatore PAC**: controlli isolati con `gap: 12px` e margine per il thumb dello slider; KPI summary con card a `padding: 16px 18px` e `gap: 8px` per separare etichetta e grande valore composto.
   - **Obiettivi di Risparmio**: wrapper `.goal-progress-section` per raggruppare importi, progress track e quota mensile con `gap: 10px`, e barra di versamento separata da un divider morbido (`margin-top: 8px; padding-top: 16px`).

---

## 📱 4. Responsive Breakpoint Standards

- **MacBook Pro / Desktop (≥ 1024px)**:
  - Sidebar: Fixed left `270px`.
  - Main viewport: Fluid with padding `32px 40px`.
  - Grids: 2 to 3 columns with `gap: 20px - 24px`.
- **iPad / Split View (768px - 1023px)**:
  - Grids gracefully wrap to 2 columns or 1 column.
  - Subtab navigation maintains horizontal scroll with hidden scrollbar.
- **iPhone (≤ 767px)**:
  - Sidebar hidden, iOS native bottom tab bar (`72px` + safe-area insets).
  - Main viewport padding: `16px 20px`.
  - Grids collapse to single-column cards with full touch targets (`min-height: 44px`).
