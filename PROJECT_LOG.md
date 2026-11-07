# 📓 Finanze Personali — Project & R&D Development Log

> **Scopo del documento**: Questo file costituisce la *Single Source of Truth* (memoria storica e architetturale) del progetto. Riassume lo standard ingegneristico, lo stato aggiornato di tutti i moduli e il registro cronologico delle versioni rilasciate.

---

## 🏛️ Architettura e Standard di Progetto

- **Design System**: Stile nativo Apple (macOS & iOS Human Interface Guidelines + Apple Workout Monolithic Graphite su OLED Mobile). Glassmorphism (`backdrop-filter: blur(28px)`), SF Pro typography con `tabular-nums`, geometria squircle continua (`border-radius: 16px-24px`), accenti semantici Apple (Verde `#34C759`/`#30D158`, Rosso `#FF3B30`/`#FF453A`, Blu `#0071E3`/`#0A84FF`, Viola `#AF52DE`).
- **Frontend Stack**: Vanilla Modern ES6 Modules (`js/components/`, `js/data/`, `js/services/`), CSS3 puro basato su Design Tokens (`css/apple-design.css`), Chart.js locale (`js/vendor/chart.umd.min.js`) e bundle standalone (`js/app.bundle.js`). Zero framework pesanti, zero dipendenze esterne, avvio istantaneo `0.0s`.
- **Backend Serverless & Privacy**:
  - Database demo pubblico anonimo integrato di default (`js/data/demoData.js`), totalmente privo di dati sensibili o riferimenti personali.
  - Sincronizzazione live bidirezionale opzionale con **Google Sheets** tramite **Google Apps Script** (`google-apps-script/Code.gs`) autenticato con Security Token personale, oppure caricamento/esportazione di snapshot locali `.json` / `.csv`.

---

## 🛡️ Politica dei Branch e Protocollo di Sicurezza

1. **`main` (Produzione / Stabile)**:
   - Versione ufficiale validata e pronta all'uso su MacBook e iPhone.
   - Nessun commit sperimentale diretto; aggiornata esclusivamente tramite rilascio approvato da `beta`.
2. **`beta` (Laboratorio R&D / Sviluppo Attivo)**:
   - Ambiente di sviluppo, affinamento UI/UX e collaudo locale (`python3 -m http.server 3000`).
3. **`beta-distribuzione` (In Stand-by)**:
   - Ramo dedicato ai futuri sviluppi di onboarding guidato multi-utente.

---

## 📊 Stato Attuale dei Moduli (v2026.48 — Produzione Ufficiale `main`)

| Modulo | Stato | Dettagli Implementati |
| :--- | :---: | :--- |
| **Impostazioni & Sotto-Menu** | 💎 Segmented Capsule & Workout Graphite | **Allineamento Completo al Design System**: Barra segmentata a capsula Apple HIG / Workout a 5 sezioni (`Conti`, `Stipendio`, `Categorie`, `Sicurezza`, `Cloud`) con icone vettoriali SF Symbols, header contestuale Desktop, card monolitiche Graphite `#161618` su Mobile OLED, switch nativi `.apple-switch` e deep-linking via hash (`#impostazioni-sheets`, ecc.). |
| **Movimenti & Scheda Dettaglio** | 💎 Scroll Nativo & Tab Bar Retrattile | **Scroll-Lock iOS & Azioni Ergonomiche**: Modali a `z-index: 100000`, `body.modal-open` con blocco scroll sottostante, discesa automatica fluida della Bottom Tab Bar all'apertura dei fogli modali, momentum scrolling nativo e pulsante "Elimina Movimento" ben visibile in fondo al foglio. |
| **Dashboard** | 💎 Hero Net Worth, Cash Flow & Conti | **Panoramica Esecutiva Completa**: Hero Card Patrimonio Effettivo con Segmented Allocation Bar, Flusso Mese a 4 pilastri / Micro-Chart Workout, CTA diretta `+ Nuovo Movimento` (`movimentiView.openModal()`), lista conti con pop-up di dettaglio e riepilogo entrate/uscite mensili. |
| **Privacy & Database Demo** | 💎 Zero Dati Sensibili su GitHub | **Isolamento Totale dei Dati Personali**: Repository pubblico equipaggiato esclusivamente con `js/data/demoData.js` (conti, transazioni e saldi dimostrativi fittizi). I dati reali dell'utente si popolano unicamente sincronizzando il proprio foglio Google Sheets o importando un file di backup locale (`.gitignore` protegge `*.local.js` e `finanze_backup_*.json`). |
| **Cloud Sync & Pairing** | 💎 SaldiAdapter & Ledger Multi-Anno | **Sincronizzazione Deterministica Mac ↔ iPhone**: Nuovo motore `SaldiAdapter` (`js/data/saldiAdapter.js`) che tratta la scheda `Saldi` come ledger temporale di conguagli certificati. Isolamento degli asset estinti/chiusi (saldo azzerato nei conti attivi ma conservato nello storico), riconciliazione automatica con i movimenti post-conguaglio, protezione del foglio storico in `Code.gs` e scansione LIFO sull'ultimo conguaglio. |
| **Spese & Budget** | 💎 Regola 50/30/20 & Clean Lists | **Controllo Consumi Mensili**: Hero Card uscite del mese, micro-chart proporzionato per le buste 50/30/20 (Bisogni, Svago, Risparmio), ripartizione per categoria con icone vettoriali e classifica Top Fornitori senza linee divisorie invasive. |
| **Investimenti & F.I.R.E.** | 💎 Multi-Asset Broker, PAC & 4% SWR | **Suite FinTech Completa**: Sotto-menu a 4 sezioni (`Portafoglio`, `Rischio`, `Obiettivi`, `F.I.R.E.`), gestione Broker multi-strumento con catalogo ETF/ISIN integrato, separazione Fondo Emergenza monetario vs crescita azionaria, ribilanciamento smart, simulatori PAC e indipendenza finanziaria. |
| **Storico NW & Fiscale** | 💎 Multi-Anno, Fondo Pensione & Tabella Conti | **Evoluzione Patrimoniale & Riconciliazione Saldi/Movimenti**: Curva di crescita continua e liscia del Fondo Pensione dal 2024 ad oggi, rilevamento automatico multi-anno nello storico (`2024`, `2025`, `2026`), Tabella Conti completa con calcolo retroattivo a zero trattini `-`, integrazione sezione Previdenza Complementare e distinzione contabile netta tra Patrimonio Diretto e Patrimonio Totale. |
| **Assistente Finanziario & Sicurezza** | 💎 CFO Locale + PIN & Face ID | **Analisi Zero-Latenza & WebAuthn**: Motore analitico locale istantaneo (con supporto opzionale API Gemini), Health Score 0-100, calcolo Financial Runway e sblocco protetto tramite PIN a 4 cifre e Face ID / Touch ID. |

---

## 🧪 Registro Sviluppo & Rilasci (Changelog Ufficiale)

- **[MERGE MAIN - v2026.48] Architettura Deterministica T_max: Stato Vivo Esclusivo da Ultimo Conguaglio (31/10/2026) + Movimenti di Novembre**:
  - **Single Source of Truth Attuale ($T_{max}$)**: La situazione operativa ad oggi è generata **esclusivamente** dalle righe presenti nell'ultimo conguaglio certificato della scheda `Saldi` (`31/10/2026`), aggiornate con i soli movimenti effettivi registrati a Novembre 2026 ($T > 31/10/2026$).
  - **Isolamento e Purga Radicale dello Storico Pregresso**: Qualsiasi conto (`BTC`, `Salvadanaio`) o holding ETF (`iShares`, `SWDA`, ecc.) registrato esclusivamente in conguagli antecedenti al 31/10/2026 viene classificato come archivio storico passato: non viene istanziato nei conti vivi, non compare nelle liste della Dashboard o del Broker e non può essere resuscitato dalle transazioni pregresse.
  - **Preservazione Integrale della Serie Storica 2024-2026**: Tutte le consistenze passate rimangono fedelmente custodite nei closing mensili dello **Storico NW**, garantendo che l'evoluzione del patrimonio negli anni passati mantenga la sua esatta quadratura contabile.
  - **Protezione Scritture Apps Script (`Code.gs`)**: Rimossa l'alterazione accidentale della prima riga nella scheda Saldi all'inserimento di un movimento; aggiornato il conguaglio esplicito tramite scansione bottom-up (LIFO) sull'ultimo record valido, garantendo l'integrità del ledger pregresso. [2026-11-07]

- **[MERGE MAIN - v2026.47] Motore Storico Dinamico Multi-Anno: Riconciliazione Armonica Saldi e Movimenti & Curva Continua Fondo Pensione**:
  - **Integrazione Concettuale Saldi & Movimenti ("Dove mi trovo" vs "Come mi muovo")**: I conguagli della scheda `Saldi` costituiscono la verità contabile nei singoli momenti storici ("dove mi trovo"), mentre i `Movimenti` rappresentano il vettore di spostamento ("come mi sto muovendo"). Per i periodi con soli saldi (es. 2024), il sistema fotografa fedelmente le consistenze conguagliate; per i periodi con movimenti (2025/2026), calcola i saldi vivi ad oggi e retroattivamente a fine di ogni mese.
  - **Supporto Saldi Multi-Data & Multi-Anno**: Ingestione intelligente multi-formato (`YYYY-MM-DD`, `DD/MM/YYYY`, `MM/YYYY`, `YYYY-MM`, stringhe testuali italiane es. *"Gennaio 2024"*) per archiviare chiusure certificate per ogni mese presente nel foglio `Saldi`.
  - **Curva di Crescita Continua del Fondo Pensione (`getPensionHistory`)**: Superato il problema della linea piatta orizzontale. La serie storica genera una curva liscia e continua su tutti i mesi (dal 2024 ad oggi), interpolando monotonicamente tra i conguagli certificati ed estrapolando in avanti la quota mensile da cedolino. Aggiunto nella card il badge dinamico di maturato nel periodo (`+€... (+...%)`) e allineamento perfetto tra visualizzazione annuale e "Tutto lo Storico".
  - **Ripristino Anno 2024 nello Storico & Tabella Conti a Zero Trattini**: `getAvailableYears()` include sempre tutti gli anni presenti nei saldi storici (`2024`, `2025`, `2026`). Il metodo `calculateAccountBalanceAtEndOfMonth()` aggancia il conguaglio più vicino nel tempo e applica i delta dei movimenti effettivi, eliminando i trattini vuoti (`-`) e popolando ogni mese della Tabella Conti per Buddybank, Trade Republic, Fondo Pensione, Contanti e Buoni Pasto.
  - **Zero Residui Demo**: Purga automatica completa di conti o chiusure fittizie residue (`Conto Corrente`, `Carta Spese`, `Portafoglio Investimenti`, `Fondo Previdenza`) non presenti nel foglio cloud reale dell'utente. [2026-11-07]

- **[MERGE MAIN - v2026.46] Ottimizzazione Tempi di Sincronizzazione Google Sheets & In-Memory RAM Cache (`Code.gs`)**:
  - **Taglio I/O su Google Sheets**: Sostituito `getDataRange()` con lettura chirurgica delimitata `getRange(1, 1, lastRow, numCols)` su Movimenti (colonne A:J) e Saldi (colonne A:E), abbattendo le celle lette da oltre 52.000 a ~6.600 (-85% overhead I/O).
  - **In-Memory RAM Cache in Apps Script (`CacheService`)**: Implementata cache a chunk sicuri su `CacheService.getScriptCache()` (TTL 10 min); le chiamate di sincronizzazione a freddo/background vengono servite direttamente dalla memoria Google in ~50ms senza aprire il foglio.
  - **Invalidazione Atomica Istantanea**: Ogni operazione di scrittura (`addTransaction`, `updateTransaction`, `deleteTransaction`, `updateAccountBalance`) purga immediatamente la cache (`clearAppCache()`).
  - **Sincronizzazione Intelligente Force/Silent**: Il client frontend invia `force=1` solo su esplicito clic dell'utente ("Sincronizza Ora"), mentre sfrutta la cache ultra-rapida per i controlli in background e al ritorno sull'app (`visibilitychange`). Timeout ottimizzato a 8.5s per azzerare falsi accodamenti offline da cold start serverless. [2026-11-07]

- **[MERGE MAIN - v2026.45] Motore di Auto-Ricostruzione Conti & Saldi da Google Sheets (`syncCloudData`)**:
  - Risolto il disallineamento tra database dimostrativo (`demoData.js`) e foglio personale Google Sheets al collegamento Cloud: il nuovo metodo atomico `financeStore.syncCloudData(data)` in `js/data/mockData.js` rimuove automaticamente i conti fittizi dimostrativi e ricostruisce dinamicamente i conti reali presenti nelle schede `Saldi` e `Movimenti` con i loro nomi esatti.
  - Consolidamento automatico dei sotto-asset Broker (`Provider - Ticker`, es. ETF monetari e azionari) nel conto Broker unificato con allineamento contestuale di `reconciledBalance` e `balance`.
  - Calcolo retroattivo automatico del saldo di conguaglio dai movimenti storici per i conti attivi presenti in `Movimenti` ma non elencati in `Saldi` (es. Buoni Pasto / Benefit), garantendo quadratura al centesimo senza richiedere modifiche al foglio o ridistribuzioni dello script `Code.gs`.
  - Rilevamento 100% dinamico delle rate e spese ricorrenti direttamente dal registro movimenti e pulizia automatica delle chiusure mensili demo in `Storico NW`. [2026-11-07]

- **[MERGE MAIN - v2026.44] Rilascio Ufficiale in Produzione & Reset Cronologia Pubblica GitHub**:
  - Promozione sul ramo stabile `main` (`APP_ENV.branch = 'main'`, `isBeta = false`, `defaultSandboxMode = false`) di tutti gli sviluppi validati su Mac e iPhone.
  - Sanificazione integrale del codice sorgente e della documentazione da qualsiasi saldo o riferimento personale, con cronologia Git pubblica rigenerata ex-novo a partire da uno stato pulito e anonimo.
  - Ricompilazione di `js/app.bundle.js` e validazione sintattica/runtime JavaScriptCore (`jsc`) superata con 0 errori. [2026-11-07]

- **[APPROVATO - BETA v2026.43] Allineamento Sotto-Menu e Sezioni di Impostazioni al Design System Apple HIG / Workout**:
  - Sostituita la tendina `<select>` delle Impostazioni con la barra segmentata a capsula `.impostazioni-segmented-tabs` (`Conti`, `Stipendio`, `Categorie`, `Sicurezza`, `Cloud`) dotata di icone vettoriali SF Symbols (`icons.js`) e header contestuale dinamico su Desktop.
  - Uniformate tutte le 5 sotto-sezioni all'anatomia `.card .settings-card`, garantendo su iPhone superfici Graphite `#161618` e contrasto WCAG AA ottimale anche con iOS in modalità chiara diurna.
  - Introdotti switch nativi `.apple-switch` per 13ª, 14ª e Premio MBO, routing via hash `#impostazioni-*` e collegamento diretto dalla modale Cloud Sync a `#impostazioni-sheets`. [2026-11-07]

- **[APPROVATO - BETA v2026.42] Fix Scroll Scheda Movimento e Auto-Hide Bottom Tab Bar su iPhone**:
  - Portato `--z-modal` a `100000`, introdotto `body.modal-open` per bloccare lo scroll della vista sottostante su iOS Safari e aggiunta l'animazione retrattile della `.mobile-tab-bar` durante l'apertura dei fogli modali, rendendo sempre raggiungibile il pulsante *"Elimina Movimento"*. [2026-11-07]

- **[APPROVATO - BETA v2026.41] Fix CTA Primaria "+ Nuovo Movimento" in Dashboard**:
  - Collegato il pulsante `#btn-hero-new-tx` direttamente a `window.app.movimentiView.openModal()`, evitando il trigger involontario dell'esportazione CSV. [2026-11-07]

- **[APPROVATO - BETA v2026.40] Database Demo Anonimo, Diagnostica Google Sheets & Cloud Sync Hub**:
  - Introdotto `js/data/demoData.js` come dataset dimostrativo predefinito, proteggendo eventuali file locali privati tramite `.gitignore`.
  - Potenziato `googleSheetsService.js` con sanitizzazione automatica dell'URL Apps Script (`/exec`), diagnosi guidata dei permessi di distribuzione (*"Chiunque"*), auto-sync al ritorno sull'app, Cloud Sync Hub nell'header e pairing 1-click Mac → iPhone (`#cloud-setup`). [2026-11-07]

- **[STABILE - v2026.30 → v2026.39] Design System Nativo Apple HIG, Workout Graphite Mobile & Motore Saldi Vivi**:
  - Architettura responsive dedicata per MacBook (Sidebar Glassmorphism `270px`) e iPhone (Top Bar `/// Finanze`, Floating Island Tab Bar centrata a 5 colonne, card monolitiche `#161618` su sfondo OLED `#000000` e grafici a curva continua liscia).
  - Calcolo dinamico dei saldi vivi a partire dall'ultimo conguaglio certificato più i movimenti registrati, gestione pagamenti misti Buoni Pasto + Carta, stima predittiva dello stipendio prima del giorno di accredito, scorporo dedicato del Fondo Pensione (Art. 51 TUIR) e architettura Local-First con coda offline `SyncQueue` e Service Worker PWA.
