# 📓 Finanze Personali - Project & R&D Development Log

> **Scopo del documento**: Questo file costituisce la *Single Source of Truth* (memoria storica e operativa) del progetto. Qualora questa o future sessioni di chat venissero chiuse o azzerate, la lettura di questo documento ripristina istantaneamente il contesto architetturale, le decisioni prese, lo stato delle versioni e la roadmap.

---

## 🏛️ Architettura e Standard di Progetto

- **Design System**: Stile nativo Apple (macOS & iOS). Glassmorphism (`backdrop-filter: blur`), SF Pro typography, curve `border-radius: 14px-20px`, accenti colore Apple (Verde `#34C759`, Rosso `#FF3B30`, Blu `#0071E3`, Viola `#AF52DE`).
- **Frontend Stack**: Vanilla Modern ES6 Modules (`js/components/`, `js/data/`, `js/services/`), CSS3 puro con custom properties (`css/apple-design.css`), Chart.js per visualizzazioni grafiche. Nessun framework pesante (React/Vue/Node) per mantenere zero dipendenze e velocità estrema.
- **Backend / Database**: Serverless su Google Sheets ("Finanze-Movimenti") via Google Apps Script (`google-apps-script/Code.gs`), protetto da Security Token personale, 100% gratuito e resiliente offline con fallback su localStorage / mockData.

---

## 🛡️ Politica dei Branch e Protocollo di Sicurezza

1. **`main` (Operativo / Produzione)**:
   - È la versione stabile e funzionante dell'app.
   - **Regola ferrea**: nessun commit diretto e nessuna modifica sperimentale.
   - Si aggiorna **solo ed esclusivamente** tramite merge controllato da `beta` dopo conferma esplicita dell'utente.

2. **`beta` (Laboratorio R&D / Sviluppo Attivo)**:
   - Ramo di lavoro corrente per prototipare, testare e validare nuove idee.
   - Test in locale su server HTTP (`http://localhost:3000`).

---

## 📊 Stato Attuale dei Moduli (v2026.18 — Official Production Release)

| Modulo | Stato | Dettagli Implementati |
| :--- | :---: | :--- |
| **Dashboard** | 💎 Perfezionato | **Architettura UI-Perfect-Design 4-Zone**: Ristrutturazione integrale con container `.page`, `.grid-4`, `.grid-6`, `.grid-auto`, `.card` con padding 24px (16px compatte) e gap 24px costanti. Blocco unico conti ad alta densità `.accounts-card`. Card "Uscite Mese" interattiva one-click con reindirizzamento diretto a `#spese`. Iconografia lineare vettoriale Apple (zero emoji a disegnino). Certificato a 0 difetti su 5 viewport. |
| **Spese & Budget** | 💎 Rilasciato | **Nuova Sezione di Primo Livello (`#spese`)**: 4 card KPI uscite (Uscite Mese, Spese Fisse, Spese Variabili, Spesa Sicura Residua), Budget Preventivo 50/30/20 a 3 buste canoniche (`Bisogni 50%`, `Voluttuari 30%`, `Risparmio 20%`), Donut Chart con **Selettore del Periodo Temporale** (Mese Corrente, Ultimi 30 gg, 3 Mesi, 6 Mesi, Anno 2026, Tutto lo Storico) e breakdown reattivo per categoria, tabella Top Fornitori/Merchant con statistiche aggregate ed esportazione rapida CSV. |
| **Assistente AI** | 💎 Rilasciato | **Personal CFO & FinTech Advisor (`#assistente`)**: Briefing esecutivo a 4 card KPI (Radar Anomalie, Runway Fondo Emergenza XEON, Allocazione Surplus & Ottimizzazione Fiscale Art. 51 TUIR, Proiezione F.I.R.E.), chat conversazionale stile Apple Intelligence con **Auto-Reset Intelligente** (TTL inattività 15 minuti, rolling memory a max 12 messaggi per zero sovraccarico del browser, badge `Auto-reset 15m` e pulsante dedicato `Nuova Chat`), quick prompt pills one-click e motore decisionale locale deterministico con 100% privacy e latenza zero. |
| **Movimenti** | 💎 Perfezionato | **Header Dinamico Apple & Sotto-Menu Segmentato Integrato**: Allineamento integrale allo standard grafico di Spese ed Investimenti. Testata di sezione con badge, riga chip con metriche live del mese (`Entrate`, `Uscite`, `Netto`, conteggio transazioni), titolo (`.page-title`) e sottotitolo (`.page-subtitle`) dinamico contestuale per le 4 sotto-aree (*Registro Movimenti*, *Analisi Categorie*, *Confronto Categorie*, *Budget 50/30/20*). Apple Segmented Control integrato (`.movimenti-segmented-tabs`) a 4 colonne con icone SF Symbols. Pulsante primario *"Nuovo Movimento"* ed *"Esporta CSV"* nella testata. Card filtri/comandi riorganizzata ad alto respiro con search input spazioso, view switcher affiancato e selettori armonici. |
| **Investimenti** | 💎 Perfezionato | **Header Dinamico Stile Spese & Sotto-Menu Segmentato Apple**: Header di sezione con chip patrimoniali (`Investito`, `Net Worth`), titolo (`.page-title`) e sottotitolo (`.page-subtitle`) dinamico per ciascuna delle 4 aree (*Portafoglio & Allocazione*, *Profilo di Rischio & Target*, *Obiettivi di Risparmio*, *Indipendenza Finanziaria F.I.R.E.*). Sotto-menu segmentato Apple (`.investimenti-segmented-tabs`) integrato nel layout (4 colonne desktop, 2 colonne tablet, swipe fluido mobile) con icone SF Symbols. Simulatore PAC, Profilo MiFID, Salvadanai e simulatore Crossover Point 4% SWR armonizzati a 0 sovrapposizioni. |
| **Storico** | 💎 Perfezionato | Container unificato `.page.storico-page`. Banner Net Worth dinamico continuo come `.card.highlight-card` a 4 zone, grafico evoluzione in `.card` standard, tabella mensile strutturata in `.card`, **Report Fiscale Annuale Stampabile** (Art. 51 TUIR, ISEE) ed export CSV/JSON. Toolbar ripulita con icone SVG monocromatiche. Integrato pulsante e trigger rapido per la Chiusura Fine Mese. |
| **Impostazioni** | 💎 Perfezionato | Container unificato `.page.impostazioni-page`. Tutte le sezioni (Google Sheets API, Token, Conguaglio Saldi, Smart Merge categorie, PIN blocco iOS) strutturate in `.card` canoniche con gap 24px. Rimosse emoji residue e unificati indicatori di stato. Collegato allo Studio di Chiusura Fine Mese. |
| **Chiusura Mese & Conguagli** | 💎 Perfezionato | **Studio Chiusura Mese & Riconciliazione Saldi**: Gestione duplice modalità (*Saldo Effettivo Totale* per banche/investimenti vs *Quota Busta Paga +/-* per Fondo Pensione/Previdenza). Banner smart con allerta automatica proattiva se un conto è fermo al mese precedente, modale Studio Apple con anteprima live del Net Worth, registrazione automatica della transazione/rettifica nel ledger e sincronizzazione con Google Sheets. Certificato a 0 difetti su 5 viewport. |
| **Sistema Globale** | 💎 Perfezionato | **Design System Centrale, Icons.js & uiComponents.js**: Libreria condivisa di componenti canonici, catalogo iconografico SVG lineare Apple SF Symbols, scala spaziale rigorosa (4, 8, 12, 16, 24, 32, 48, 64 px), gap e stacco 24px, clearance header 24px, contrasto WCAG AA ≥ 4.5:1, numeri tabulari, bundle standalone validato con JavaScriptCore. |

---

## 🧪 Registro Sviluppo & Innovazioni (Beta Log)

Ogni nuova idea segue questo ciclo di vita:
`[IDEA]` ➔ `[IN SVILUPPO]` ➔ `[TEST LOCALE]` ➔ `[APPROVATO]` ➔ `[MERGE MAIN]`

### 📌 Voci di Registro

- **[MERGE MAIN] Risoluzione Flusso Giroconto & Riconciliazione Atomica Saldi (Release v2026.18)**:
  - **Problema Rilevato da Giorgio**:
    - Nell'eseguire un giroconto (sia dalla modale manuale *"Nuovo Movimento"*, sia dal flusso automatico di *"Chiusura Mese / PAC / Reintegro"*), i saldi del conto di origine e del conto di arrivo non variavano come atteso (il primo doveva diminuire e il secondo aumentare).
  - **Diagnosi delle Cause Radice**:
    1. *Collisione Default Conto Origine e Destinazione*: nella modale di inserimento, entrambi i menu a tendina (`form-account` e `form-to-account`) puntavano per impostazione predefinita al primo conto della lista (`Buddybank`). In assenza di selezione esplicita o per errore di distrazione, il prelievo e l'accredito avvenivano sullo stesso conto, annullandosi vicendevolmente (`balance - importo + importo = invariato`).
    2. *Mancato Decremento Conto Origine in Chiusura Mese*: nella funzione `executeMonthlyClosing`, la registrazione del giroconto (es. PAC su VWCE o reintegro XEON con spunta *"Registra come giroconto da Buddybank"*) aggiornava il saldo del conto di arrivo ma ometteva di scalare la quota dal conto di origine (`Buddybank`).
    3. *Mancata Sincronizzazione Foglio "Saldi" e Riconoscimento "Giroconto" in Google Apps Script*: `Code.gs` non riconosceva `"giroconto"` in `normalizeType` (riconoscendo solo `"trasferimento"` o `"transfer"` e classificandolo altrimenti come spesa `"expense"`), e non aggiornava la scheda `Saldi` al momento dell'aggiunta transazione; ad ogni fetch/sync successivo, i vecchi saldi non aggiornati di Google Sheets sovrascrivevano la memoria locale.
  - **Implementazione della Soluzione**:
    1. *Validazione Anti-Collisione & Selezione Intelligente (`movimentiView.js`)*:
       - Alla selezione del tipo *"Giroconto"*, il conto di destinazione viene preimpostato in automatico su un conto diverso da quello di origine.
       - Impedita categoricamente la conferma se conto di partenza e arrivo coincidono (feedback shake + blocco).
       - Integrata la card nativa Apple **"Impatto Saldi in Tempo Reale"**: mostra in anteprima reattiva la variazione esatta di entrambi i conti (`📤 Origine: € X ➔ € X-amt`, `📥 Destinazione: € Y ➔ € Y+amt`, `Net Worth: Invariato`).
    2. *Decremento Atomico Origine in Chiusura Mese (`mockData.js`)*:
       - Estesa `executeMonthlyClosing`: quando viene spuntato il giroconto di reintegro o PAC, scala istantaneamente l'importo dal conto sorgente (`Buddybank`), tracciandolo in `modifiedAccounts` e aggiornando il foglio `Saldi`.
    3. *Risoluzione Robusta Account & Google Apps Script (`Code.gs` & `mockData.js`)*:
       - Aggiunto `findAccount(idOrName)` con matching esatto e fuzzy (gestione alias come `"Trade Republic"` vs `"Trade Republic - XEON"`).
       - Esteso `Code.gs` per riconoscere la tipologia `"Giroconto"` e sincronizzare contestualmente la scheda `Saldi`.
       - Evento globale `finanze:accounts-updated` per aggiornamento live immediato di tutte le card della Dashboard, Impostazioni e Investimenti.
    4. *Bundle & Collaudo*: ricompilato `js/app.bundle.js` e validato con Apple JavaScriptCore (JSC) con esito positivo su tutti e 4 i test di suite. [2026-10-31]

- **[MERGE MAIN] Studio Chiusura Fine Mese & Riconciliazione Saldi Intelligente (Release v2026.17)**:
  - **Requisito & Analisi del Flusso Gestionale di Giorgio**:
    - Nel workflow originario su Google Sheets (fogli 2024, 2025, 2026), Giorgio effettua la riconciliazione di fine mese distinguendo due casistiche operative radicalmente differenti:
      1. *Saldo Effettivo Totale*: per conti correnti e liquidità (es. Buddybank) o fondi monetari/ETF (XEON, VWCE), in cui inserisce direttamente l'ammontare letto sull'app bancaria/broker.
      2. *Differenza Aggiuntiva / Quota Busta Paga (+/-)*: per il Fondo Pensione (Previdenza Complementare), in cui non calcola a mano il montante complessivo ma riporta esclusivamente la quota contributiva mensile incrementale letta sul cedolino della busta paga.
    - Inoltre, l'applicazione non disponeva di alert proattivi che segnalassero se un conto fosse rimasto disallineato o fermo al mese precedente (es. Fondo Pensione fermo a Settembre 2026 rispetto ad Ottobre 2026).
  - **Implementazione Architetturale & Ingegneristica**:
    1. *Data Model & State Engine (`realData.js` e `mockData.js`)*:
       - Esteso lo schema dei conti con i campi `lastReconciledMonth` (es. `'09/2026'`), `lastReconciledDate` e `defaultMode` (`'delta'` per Fondo Pensione, `'balance'` per conti correnti e investimenti).
       - Migrazione trasparente automatica dello stato in `localStorage` in fase di boot senza perdita dei dati esistenti.
       - Funzione `getMonthlyReconciliationStatus(targetMonthKey)`: verifica la completezza dell'allineamento dei saldi per il mese di riferimento e individua con precisione i conti arretrati (`staleAccounts`).
       - Funzione `executeMonthlyClosing(targetMonthKey, updates, options)`: esegue la chiusura atomica del mese supportando in modo nativo la modalità *delta* (somma algebrica del cedolino) e *balance* (nuovo saldo assoluto), genera la scrittura contabile nel registro transazioni (es. *"Versamento Fondo Pensione Busta Paga (Ottobre 2026)"* sotto la categoria *"Livello Crescita"* o *"Conguaglio / Rettifica"*), aggiorna Google Sheets e congela lo snapshot di Net Worth.
    2. *Studio Modale Apple Chiusura Mese (`js/components/monthlyClosingModal.js`)*:
       - Modale interattiva nativa Apple HIG (`.apple-modal`) con selettore mese (`Ottobre 2026`, `Settembre 2026`, etc.).
       - Card per ciascun conto con badge di freschezza (`Aggiornato a Ottobre` vs `Fermo a Settembre`).
       - Apple Segmented Control per ciascun conto: switch istantaneo tra `[ ➕ Quota Busta Paga (+/-) ]` e `[ 🎯 Saldo Effettivo Totale ]`, preimpostato in modo intelligente sul tipo di conto.
       - Calcolo real-time del nuovo saldo risultante, della variazione netta e dell'impatto sul Net Worth complessivo.
       - Checkbox con nota personalizzabile per registrare opzionalmente il movimento contabile nel ledger.
    3. *Banner Alert Proattivo Apple in Dashboard (`js/components/dashboardView.js`)*:
       - Banner ad alto contrasto con stile Apple HIG posizionato in cima alla Dashboard: segnala immediatamente se la chiusura del mese corrente è in sospeso (es. *"⚠️ Chiusura Mese di Ottobre 2026 in Sospeso: 1 conto da allineare (Fondo Pensione: fermo a Settembre 2026)"*).
       - Pulsante one-click *"Esegui Chiusura"* che apre istantaneamente lo studio preconfigurato.
    4. *Punti di Accesso Integrati in Tutta la WebApp*:
       - **Dashboard**: Banner di allerta smart prioritario.
       - **Storico**: Pulsante rapido *"Chiusura Mese"* nella toolbar con badge numerico dei conti in sospeso, e pulsante *"Conguaglia"* in ogni riga della tabella mensile.
       - **Impostazioni**: Pulsante *"Studio Chiusura Fine Mese"* nella card Gestione Conti e link diretto dai tasti conguaglio rapido.
       - **Assistente AI CFO (`financialAssistantService.js`)**: Briefing esecutivo aggiornato con warning esplicito se vi sono conti da riconciliare, con supporto a prompt conversazionali dedicati ("come faccio il conguaglio", "chiudi mese", "fondo pensione busta paga").
    5. *Design System & Resilienza Layout (`css/apple-design.css`)*:
       - Nessuna collisione: layout a schede fluide, input monetari formattati con font tabulare SF Pro, supporto completo alla privacy mode (sfocatura automatica dei saldi durante le presentazioni).
  - **Validazione & Certificazione**:
    - Audit Layout Multi-Viewport (`scripts/audit_layout.py`) eseguito su 5 viewport (iPhone SE 320px, iPhone 8 375px, iPad Mini 768px, MacBook 1280px, Full HD 1920px) su tutte le 9 viste: **Totale difetti rilevati = 0**.
    - Compilazione standalone bundle `js/app.bundle.js` completata e validata con Apple JavaScriptCore (JSC) a 0 errori. [2026-10-31]

- **[MERGE MAIN] Architettura Multi-Ambiente & Isolamento Produzione/Beta (Release v2026.16)**:
  - **Autorizzazione & Requisito**: Giorgio ha formalizzato il principio costitutivo: il ramo `main` (produzione) deve sincronizzarsi direttamente con Google Sheets senza alcun blocco, mentre il ramo `beta` (sviluppo) deve sfruttare automaticamente la Sandbox per proteggere il database reale da modifiche durante i test.
  - **Implementazione Architetturale**:
    1. *Modulo di Configurazione Ambiente (`js/config/environment.js`)*: File di configurazione dedicato che definisce `branch`, `isBeta`, `defaultSandboxMode`, `appName` e `statusDesc` specifici per ciascun ramo.
    2. *Rilevamento Intelligente Host & Branch (`googleSheetsService.js`)*: L'host di produzione cloud (*.github.io) e il ramo `main` disattivano sempre la Sandbox di default, consentendo la scrittura live e trasparente su Google Sheets. Il ramo `beta` (localhost / file://) attiva automaticamente la Sandbox.
    3. *Apple Toggle Switch in Impostazioni*: Aggiunto uno switch nativo Apple (`.apple-switch`) nel tab "Google Sheets" per consentire all'utente di alternare la modalità Sandbox con un tocco e con feedback visivo reattivo.
    4. *Isolamento Permanente via Release Script (`scripts/release_to_main.py`)*: Script automatizzato di merge che garantisce che ogni futura promozione da `beta` a `main` configuri automaticamente `main` in modalità produzione (isBeta: false, diciture "Finanze - Movimenti" e "Dati Sincronizzati", bundle ricompilato) senza sovrascrivere o sporcare la configurazione.
  - **Validazione**: Sintassi e Runtime JSC validati a 0 errori. Main e Beta collaudati con successo. [2026-10-31]

- **[MERGE MAIN] Promozione Ufficiale a Produzione — Release v2026.15**:
  - **Autorizzazione**: Approvazione esplicita ricevuta da Giorgio per il merge su `main` e rilascio in produzione della versione stabile definitiva.
  - **Sintesi del Rilascio Ufficiale**:
    1. *Design System Apple Centrale (`DESIGN.md` & `css/apple-design.css`)*: Scala spaziale rigorosa a 8 token (4, 8, 12, 16, 24, 32, 48, 64 px), padding 24px, gap 24px, clearance header 24px, contrasto WCAG AA ≥ 4.5:1, numeri tabulari e squircle Apple.
    2. *Iconografia Lineare Monocromatica Apple SF Symbols (`icons.js`)*: Sostituzione integrale di tutte le vecchie emoji colorate con icone vettoriali lineari pure, eleganti e professionali in tutte le schermate, tabelle, modali e grafici.
    3. *Sezione di Primo Livello "Spese & Budget" (`#spese`)*: Donut chart interattivo con selettore del periodo temporale (Mese, 30gg, 3M, 6M, Anno, Tutto), 4 card KPI uscite, Budget 50/30/20 a 3 buste, tabella Top Fornitori ed esportazione rapida CSV.
    4. *Assistente Virtuale Personal CFO & FinTech Advisor (`#assistente`)*: Briefing esecutivo a 4 KPI patrimoniali, chat conversazionale con **auto-reset intelligente** (TTL 15 minuti e rolling memory max 12 messaggi a latenza zero e 100% privacy locale).
    5. *Autocategorizzazione Dinamica Transazioni (`smartCategorizer.js`)*: Riconoscimento istantaneo dell'esercente e apprendimento automatico delle abitudini di spesa dell'utente.
    6. *Riprogettazione Radicale di Movimenti & Investimenti*: Entrambe dotate di testata Apple dinamica (`.page-title` e `.page-subtitle` contestuale), riga metadati con chip patrimoniali live e **Apple Segmented Control** (`.segmented-tabs`) responsive a 4 colonne perfettamente integrato.
    7. *Dashboard Ottimizzata*: Blocco unico ad alta densità per tutti i conti (`.accounts-card`), card uscite cliccabile con jump a Spese, e layout 4-zone garantito a zero collisioni.
    8. *Motori Strategici FinTech*: Simulatore F.I.R.E. & Crossover Point con regola del 4% SWR, Profilo di Rischio MiFID con Rebalance automatico da nuovo capitale, Modulo Salvadanai & Saving Goals, Report Fiscale Annuale stampabile conforme ad Art. 51 TUIR.
  - **Validazione**: Sintassi e Runtime verificati con JavaScriptCore (JSC) a 0 errori. Suite standalone bundle sincronizzata. [2026-10-31]

- **[TEST LOCALE] Allineamento Integrale Sezione Movimenti allo Standard Apple Spese & Investimenti (v2026.15)**:
  1. *Testata Unificata Apple con Titolo e Sottotitolo Contestuale Dinamico*:
     - Portata la medesima architettura di testata di Spese e Investimenti in Movimenti (`.movimenti-header-section`):
       - **Riga Metadati & Chip Patrimoniali**: Badge di contesto per sub-sezione, chip dinamici per *Entrate Mese* (+Verde), *Uscite Mese* (-Rosso), *Netto Cash Flow* (Blu/Verde) e *Conteggio Transazioni*, tutti conformi alla modalità Privacy.
       - **Titoli e Sottotitoli Contestuali**:
         - **Elenco Movimenti**: *"Registro Movimenti"* — *"Cronologia entrate e uscite con filtri multicriterio, vista Apple Wallet e tabella dati"*
         - **Analisi Categorie**: *"Analisi Categorie"* — *"Approfondimento storico su 12 mesi, spesa media mensile e concentrazione uscite"*
         - **Confronto Categorie**: *"Confronto Categorie"* — *"Analisi comparativa testa a testa tra due categorie di spesa e scostamento nel tempo"*
         - **Budget 50/30/20**: *"Budget Preventivo 50/30/20"* — *"Ripartizione delle entrate nelle tre buste (Bisogni 50%, Voluttuari 30%, Risparmio 20%)"*
       - **Azioni Rapide di Testata**: Pulsante primario *"Nuovo Movimento"* (apre la modale di inserimento con smart categorizer) e pulsante *"Esporta CSV"* per il download istantaneo del ledger transazioni.
  2. *Sotto-Menu Segmentato Apple Integrato (`.movimenti-segmented-tabs`)*:
     - Rimossa definitivamente la vecchia barra fluttuante disconnessa (`.view-subtabs-nav`) e sostituita con un Apple Segmented Control incastonato nella testata.
     - Griglia responsive a 4 colonne (`repeat(4, 1fr)`) su desktop/laptop, 2 colonne su tablet (`≤ 900px`) e barra a scorrimento fluido touch-friendly senza scrollbar antiestetiche su mobile (`≤ 600px`).
     - Icone vettoriali lineari SF Symbols per ciascuna scheda (`list`, `chart`, `conguaglio`, `target`).
  3. *Riorganizzazione Card Comandi & Filtri ad Alto Respiro*:
     - Rimosso il pulsante "Nuovo Movimento" dalla search bar (ora in posizione d'onore nella testata di pagina): la barra di ricerca ora si estende con ampio respiro ed è affiancata al selettore di vista (Lista Apple vs Tabella Dati).
     - Seconda riga dedicata al Segmented Control del tipo (Tutti / Uscite / Entrate / Giroconti).
     - Terza riga con i selettori a discesa (Categoria, Conto, Ordinamento) e badge di conteggio risultati allineato a destra.
  4. *Rifinimento Selettori in Analisi e Confronto*:
     - Introdotte `.mov-selector-card` e `.mov-compare-selector-card` eliminando layout inline grezzi, con VS badge Apple e layout bilanciato a 0 collisioni.
     - Risolto piccolo refuso sull'incidenza percentuale della Categoria B nel confronto.
  5. *Build & Validazione Bundle*:
     - Bundle `js/app.bundle.js` rigenerato con successo e validato con JavaScriptCore a 0 errori. [2026-10-31]

- **[TEST LOCALE] Header Dinamico Stile Spese & Sotto-Menu Segmentato Apple per Investimenti (v2026.14)**:
  1. *Testata Unificata Apple con Titolo e Sottotitolo Contestuale*:
     - Portato lo standard visivo della sezione `#spese` nella sezione `#investimenti`: integrato un header dedicato (`.investimenti-header-section`) con riga metadati (`.investimenti-meta-row`), badge categoria, chip dinamici per *Totale Investito* e *Net Worth Complessivo* (entrambi con mascheramento privacy mode).
     - Titolo di sezione esplicito (`.page-title`) e sottotitolo descrittivo (`.page-subtitle`) che si aggiornano reattivamente ad ogni cambio di sub-sezione:
       - **Portafoglio & PAC**: *"Panoramica asset allocation (Liquidità, XEON, VWCE, Pensione) e simulatore piano di accumulo"*
       - **Profilo & Ribilanciamento**: *"Questionario MiFID leggero, asset allocation ideale e calcolo del ribilanciamento con nuovo capitale"*
       - **Obiettivi di Risparmio**: *"Monitoraggio dei salvadanai dedicati, stima delle quote mensili e date obiettivo"*
       - **Indipendenza F.I.R.E.**: *"Simulatore del crossover point, tasso di prelievo sicuro (SWR 4%) e proiezioni di rendita passiva"*
     - Azioni contestuali integrate nell'header a destra (es. pulsante *"Nuovo Obiettivo"*, scroll rapido a simulatore PAC o questionario MiFID).
  2. *Sotto-Menu Segmentato Apple Integrato ed Omogeneo (`.investimenti-segmented-tabs`)*:
     - Sostituito il vecchio stile con un componente Apple Segmented Control inserito organicamente all'interno dell'header della pagina, perfettamente allineato alle card sottostanti.
     - Griglia responsive nativa: 4 colonne bilanciate (`repeat(4, 1fr)`) su schermi desktop/laptop, 2 colonne su tablet (`≤ 900px`) e barra a scorrimento orizzontale touch-friendly senza scrollbar antiestetiche su schermi mobile (`≤ 600px`).
     - Feedback visivo Apple con sfondo card attiva in risalto, colore di accento Apple Blue e icone vettoriali lineari SF Symbols per ciascun tab.
  3. *Pulizia Architetturale & Risoluzione Spaziature*:
     - Rimossi wrapper `.page` annidati ridondanti in F.I.R.E. e banner duplicati nella vista Obiettivi di Risparmio, unificando il ritmo verticale con `.investimenti-subview-stack` a 24px di gap uniforme.
  4. *Compilazione & Validazione Bundle*:
     - Eseguito `scripts/build_bundle.py` con sincronizzazione di `js/app.bundle.js` e validazione JavaScriptCore superata a 0 errori. [2026-10-31]

- **[TEST LOCALE] Autocategorizzazione Transazioni, Iconografia Lineare Apple Vettoriale, Sezione Spese & Assistente AI (v2026.11)**:
  1. *Motore di Autocategorizzazione Intelligente (`js/services/smartCategorizer.js`)*:
     - Algoritmo di matching multi-livello a 3 priorità:
       - Priorità 1: Regole personalizzate apprese direttamente dalle abitudini dell'utente in `localStorage` (`finanze_smart_rules`).
       - Priorità 2: Analisi frequenziale dello storico delle transazioni reali registrate nel database.
       - Priorità 3: Dizionario FinTech precaricato con i principali merchant, brand ed esercenti italiani (Esselunga, Conad, Coop, Lidl, Telepass, Enel, Netflix, Amazon, Technosky, VWCE, XEON, etc.).
     - Durante la digitazione della descrizione nel campo modale, la categoria viene selezionata istantaneamente nel dropdown e compare un chip visivo in stile Apple `✨ Autocategorizzato: <Icona> <Nome>`.
     - Apprendimento automatico continuo: modificando a mano la selezione o salvando la transazione, `learnAssociation()` memorizza la preferenza per il futuro.
  2. *Libreria Iconografica Vettoriale Apple Lineare (`js/components/icons.js`)*:
     - Rimozione totale di qualsiasi emoji a disegnino colorato da tutta l'applicazione (Dashboard, Movimenti, Spese, Investimenti, Storico, Impostazioni, Sidebar, Tab Bar).
     - Catalogo SVG vettoriali monocromatici ad alto contrasto con stile Apple SF Symbols (tratto 2px, curve continue, `currentColor`, responsive `width`/`height`).
     - Funzione `cleanCategoryName(name)` per garantire retrocompatibilità trasparente con i dati storici contenenti emoji nel database Sheets senza corrompere gli ID pregressi.
  3. *Nuova Sezione di Primo Livello "Spese & Budget" (`js/components/speseView.js` & `#spese`)*:
     - Accessibile direttamente dalla Sidebar Desktop, dalla Bottom Tab Bar Mobile e cliccando sul tastone "Uscite Tracciate Mese" nella Dashboard principale.
     - 4 card KPI canoniche a 4 zone: Totale Uscite Mese, Spese Fisse / Ricorrenti, Spese Variabili / Discrezionali, Spesa Sicura Giornaliera Residua.
     - Budget Preventivo 50/30/20 a 3 buste canoniche (`Bisogni Primari 50%`, `Svago & Stile di Vita 30%`, `Risparmio & Investimenti 20%`) con barre di avanzamento `.meter-row` e ripartizioni chiare.
     - Analisi visuale avanzata con Donut Chart e breakdown categorie con percentuali, importi e icone lineari SVG.
     - Classifica Top Fornitori & Merchant con conteggio transazioni, spesa cumulata, incidenza percentuale e funzione one-click per esportazione CSV.
  4. *Assistente Finanziario AI (Personal CFO & FinTech Advisor) (`js/services/financialAssistantService.js` & `js/components/assistenteView.js`)*:
     - Briefing Esecutivo Proattivo a 4 Card KPI in `.grid-4`:
       - *Radar Anomalie & Picchi di Spesa*: rileva scostamenti insoliti e categorie fuori budget.
       - *Runway Fondo Emergenza*: calcola con precisione i mesi di autonomia residua coperti dal cuscinetto XEON sulle spese correnti.
       - *Allocazione Surplus & Ottimizzazione Fiscale*: suggerisce dove indirizzare il risparmio mensile (PAC VWCE vs Fondo Pensione integrativo per massimizzare la deducibilità fino a 5.164,57 € annui ex Art. 51 TUIR).
       - *Proiezione Traguardo F.I.R.E.*: monitora la percentuale di indipendenza finanziaria e anni stimati al crossover point.
     - Interfaccia conversazionale intelligente stile Apple Intelligence con quick pills di avvio rapido (Analisi Budget, Fondo Pensione, Consigli Risparmio, Simulazione F.I.R.E.) e motore locale deterministico a latenza zero e 100% privacy dei dati.
  5. *Navigazione Unificata Desktop & Mobile (`index.html` & `js/app.js`)*:
     - Sidebar Desktop arricchita con voci dedicate "Spese" e "Assistente", raggruppate semanticamente con icone lineari SVG e indicatori puliti.
     - Mobile Tab Bar estesa e bilanciata (Home, Movimenti, Spese, Investimenti, Storico, Assistente, Config) perfettamente ergonomica a 44px touch-target.
  6. *Certificazione Multi-Viewport & Standalone Build*:
     - Audit layout automatico `scripts/audit_layout.py` eseguito su tutti i 5 viewport (320px, 375px, 768px, 1280px, 1920px) su tutte le 9 viste dell'app: **45/45 test superati con 0 difetti**.
     - Standalone bundle `js/app.bundle.js` ricompilato e validato con JavaScriptCore.
     - Catturata serie completa di screenshot ad alta risoluzione per desktop e mobile. [2026-10-31]

- **[TEST LOCALE] Riprogettazione Movimenti Apple Wallet, Filtro Periodo Spese & Auto-Reset Chat (v2026.12)**:
  1. *Riprogettazione Radicale Registro Movimenti (`js/components/movimentiView.js` & `css/apple-design.css`)*:
     - Sostituita la vecchia tabella grezza con quadratini calendario con una nuova vista nativa in stile **Apple Wallet / Revolut**.
     - Raggruppamento per Mese/Anno con intestazioni pulite, conteggio transazioni e subtotali dedicati (`Uscite: -808,34 € • Entrate: +1.700,00 €`).
     - Squircle avatar 42x42px con palette pastello Apple semantiche in base alla categoria e icone lineari SF Symbols.
     - Metadati della transazione ordinati su una riga fluida sotto la descrizione: data estesa in italiano, bullet, conto di addebito/accredito (con chiara indicazione `Origine ➔ Destinazione` per i giroconti) e pillola della categoria.
     - Importi in grande formato `tabular-nums` con colore semantico (`#30D158` verde per entrate, `#0A84FF` blu per giroconti, testo primario per uscite).
     - Nuova **Toolbar di Controllo Unificata Glassmorphic**:
       - Ricerca istantanea con clear button.
       - Segmented control a 4 tipi (Tutti / Uscite / Entrate / Giroconti).
       - Toggle switch per alternare istantaneamente tra **Vista Lista Apple** (default) e **Vista Tabella Dati** compatta.
       - Filtro per Categoria, nuovo filtro per **Conto** (Buddybank, Trade Republic, Buoni Pasto, Contanti) e ordinamento dinamico per data e importo.
  2. *Selettore Periodo Temporale nel Donut Chart Spese (`js/components/speseView.js`)*:
     - Introdotto dropdown Apple per selezionare dinamicamente il periodo temporale di osservazione: *Mese Corrente*, *Ultimi 30 Giorni*, *Ultimi 3 Mesi*, *Ultimi 6 Mesi*, *Anno 2026*, *Tutto lo Storico*.
     - Aggiornamento in tempo reale del grafico a ciambella, del subtitolo, del badge con il totale speso e del breakdown dettagliato delle categorie senza ricaricare la pagina.
  3. *Auto-Reset Intelligente e Gestione Memoria Chat Assistente (`js/components/assistenteView.js`)*:
     - Introdotto TTL di inattività di 15 minuti: alla riapertura dopo 15 minuti di assenza, la sessione della chat si resetta automaticamente al briefing iniziale.
     - Rolling memory: limite massimo di 12 messaggi nel DOM per garantire zero decadimento di prestazioni e mantenere la pagina leggerissima.

- **[TEST LOCALE] Revisione Minuziosa Grafica Sezione Movimenti (v2026.13)**:
  1. *Risoluzione Collisione Search Bar (`css/apple-design.css`)*:
     - Risolto conflitto di specificità tra `.apple-input` e `.movimenti-search-input`. Imposto padding forzato `padding: 11px 38px 11px 42px !important;` e `box-sizing: border-box !important;`.
     - Lente SVG posizionata a `left: 14px; top: 50%; transform: translateY(-50%); pointer-events: none; z-index: 2;`: eliminata qualsiasi sovrapposizione col testo segnaposto.
  2. *Riprogettazione Griglia Tabella Movimenti (`css/apple-design.css` & `js/components/movimentiView.js`)*:
     - Unificate le 5 colonne su griglia rigorosa: `grid-template-columns: 96px minmax(180px, 1fr) 150px 120px 40px; gap: 16px;`.
     - Header tabella ripulito: Data (96px, giorno e mese/anno tabulari), Descrizione / Conto, Categoria (badge pill con icona SF Symbol), Importo (tabular-nums), Azioni (icona cestino).
     - Rimosso avatar quadrato sporgente dalla colonna Data. Layout mobile adattato a cella compatta fluida iOS nativa.
  3. *Eliminazione Totale Emoji e Aggiornamento Icone Vettoriali Lineari (`js/components/icons.js` & `movimentiView.js`)*:
     - `ICONS.altro` sostituita con icona ricevuta/scontrino lineare Apple SF Symbol.
     - Sub-tab Analisi aggiornata a icona `chart`.
     - Rimozione di tutte le emoji hardcoded dai selettori e dalle card delle sub-tab Analisi, Confronto e Budget 50/30/20.
  4. *Risoluzione Subview Stack e Chart.js Contrast*:
     - Sostituiti i wrapper duplicati `.page` annidati in Analisi, Confronto e Budget con `.mov-subview-stack` a ritmo spaziale 24px.
     - `getCategoryAnalytics` in `mockData.js` reso clean-aware per abbinare le categorie storiche sia con che senza emoji.
     - Chart.js su Analisi e Confronto configurato con contrasto dinamico dark mode (`#98989D` ticks e griglie `rgba(255, 255, 255, 0.08)`).
  5. *Verifica e Certificazione Multi-Viewport*:
     - Audit layout automatico superato con **0 difetti** su tutti i 5 viewport (320px, 375px, 768px, 1280px, 1920px).
     - Rigenerati tutti gli screenshot ad alta risoluzione in `screenshots/`. [2026-10-31]
     - Pulsante manuale **"Nuova Chat"** con icona SF Symbol `refresh` nell'header per azzerare e ripartire da zero con un clic.
     - Badge informativo trasparente: *"Auto-reset 15m"*.
  4. *Audit & Validazione*:
     - Audit layout automatico eseguito con successo con **0 difetti** su tutti i 5 viewport (320px, 375px, 768px, 1280px, 1920px).
     - Bundle `js/app.bundle.js` sincronizzato e validato con JSC. [2026-10-31]

- **[TEST LOCALE] Blocco Unico Saldi Conti & Risoluzione Totale Overflow Testi (v2026.10-patch)**:
  1. *Blocco Unico Compatto Saldi Conti & Depositi*:
     - Sostituite le 6 card frammentate individuali (che occupavano 2 righe lasciando buchi vuoti nella griglia) con un'unica card canonica ad alta densità `.accounts-card`.
     - Layout a 2 colonne responsive (`.accounts-list-grid`): ogni conto presenta icona squircle semantica (blu liquidità, viola ETF/overnight, verde pensione), nome, tipo, saldo tabulare e quota percentuale sul totale.
     - Footer informativo con riepilogo Liquidità immediata vs Investimenti/Pensione e link rapido di riconciliazione saldi (`#impostazioni`).
     - Supporto totale alla Privacy Mode sia sul saldo del conto che sul riepilogo.
  2. *Risoluzione Radicale Fuoriuscita Testi dai Blocchi*:
     - **Correzione `.kv__label`**: rimosso `min-width: max-content` (che impediva al testo di andare a capo a livello di parola e spingeva il valore fuori dal bordo) e impostato `min-width: 0; word-break: normal; overflow-wrap: break-word;`.
     - **Garanzia Anti-Overflow Globale**: aggiunto `overflow: hidden` a `.card` per assicurare che nessun elemento sporga visivamente oltre le curvature squircle.
     - **Breakpoint `.grid-4` Ottimizzato a 1280px**: su viewport fino a 1280px (inclusi MacBook 13" e finestre browser a 1024px) la griglia KPI passa elegantemente a 2x2 colonne, donando oltre 450px di ampiezza a ciascuna card ed eliminando ogni compressione dei testi.
     - **Card Tasso di Risparmio & Uscite**: integrato componente `.meter-row` per etichetta e valore distanziati a 8px sopra la barra, e razionalizzato il footer con badge compatto (`Target 25%`) e stato (`Raggiunto`) senza alcuna sovrapposizione o troncamento.
  3. *Audit Multi-Viewport & Bundle Sync*:
     - Rieseguito l'audit layout su 5 viewport (320px, 375px, 768px, 1280px, 1920px): **35/35 casi di test passati a 0 difetti**.
     - Ricompilato e validato `js/app.bundle.js` con JavaScriptCore. [2026-10-31]

- **[TEST LOCALE] Sistema di Design Unificato Centrale & Architettura Spaziale Globale (v2026.10)**:
  1. *Design System Centrale Unificato (`DESIGN.md` & `css/apple-design.css`)*:
     - Rimossa ogni regola specifica per singola pagina: creato un unico sistema centrale di token e classi riusabili valido per tutta l'applicazione.
     - **Scala Spaziature Esclusiva**: codificati unicamente i valori ammessi `4, 8, 12, 16, 24, 32, 48, 64 px` (`--space-1` .. `--space-8`).
     - **Stacco e Gap Standard**: gap orizzontale e verticale tra card e stacco tra sezioni fissato a esattamente `24px` (`var(--space-5)`).
     - **Padding Card**: `24px` per le card standard e `16px` (`var(--space-4)`) per le card compatte (`.card--compact`).
     - **Distanze Interne Codificate**: Card header -> contenuto: `16px`; Titolo -> valore: `8px`; Blocco -> blocco: `16px`; Etichetta -> meter: `8px`; Meter -> riga successiva: `16px`.
     - **Clearance Header Garantita**: `padding-top: var(--space-5)` (24px di luce libera sotto l'header su desktop e mobile, eliminando ogni rischio di sovrapposizione col titolo di pagina o la top bar).
  2. *Libreria Componenti Condivisi (`js/components/uiComponents.js`)*:
     - Creato modulo riusabile con pattern factory per: `Card`, `KpiCard`, `MeterRow`, `KeyValueRow`, `Badge`, `AlertItem`.
     - Compatibile sia con Vanilla ES6 Modules sia con fallback globale `window.UiComponents` per esecuzione bundle standalone.
  3. *Anatomia Fissa delle Card a 4 Zone Canoniche*:
     - Tutte le card dell'applicazione adottano la medesima struttura gerarchica:
       1. `.card__header`: Titolo a sinistra, icona o badge a destra; min-height 38px (supporta 2 righe senza disallineare le card adiacenti nella stessa riga).
       2. `.card__value`: Metrica principale a 26px, `tabular-nums`, privacy mask e distacco 8px dal titolo e 16px dal corpo.
       3. `.card__body`: Contenitore flessibile (`flex: 1 1 auto`) che assorbe lo spazio residuo con gap uniforme di 16px tra blocchi (`.meter-row`, `.kv`, liste).
       4. `.card__footer`: Nota o stato ancorato sul fondo con `margin-top: auto`.
  4. *Adattamento Fluido al Contenuto (Zero-Collision & Anti-Truncation)*:
     - Eliminata qualsiasi altezza/larghezza fissa in px sui box con testo: layout basati esclusivamente su `min-height`, `padding` e `gap`.
     - I badge mantengono `white-space: nowrap` e avvolgono sulla riga successiva in caso di spazio ridotto (`flex-wrap: wrap`).
     - Nelle righe chiave-valore (`.kv`), l'etichetta può andare a capo preservando leggibilità (`overflow-wrap: break-word; min-width: max-content; max-width: 60%`), mentre il valore monetario rimane protetto da `white-space: nowrap; max-width: 65%;` con gap garantito di almeno `12px` (`var(--space-3)`).
     - Griglia uniforme per le card compatte e conti: `repeat(auto-fit, minmax(min(100%, 220px), 1fr))`.
  5. *Refactoring Integrale di Tutte le Viste*:
     - `dashboardView.js`: Riorganizzazione conti in `.grid-auto` e card canoniche compatte a 4 zone; rimossi inline font-size; aggiunti tooltip completi su elementi troncati.
     - `movimentiView.js`: Root incapsulata in `.page.movimenti-page`; 4 card KPI `.grid-4` con `.card--compact`; refactoring di Analisi Categoria (4 KPI card + chart card + table card a 4 zone), Confronto Categorie (`.grid-auto` + card canoniche) e Budget 50/30/20 (3 card buste canoniche con `.meter-row` e `.kv`).
     - `investimentiView.js`: Root `.page.investimenti-page`; Portafoglio totale (3 card canoniche `.grid-auto`); Simulatore F.I.R.E. (card hero a 4 zone, 4 KPI `.grid-4`, card progress, 3 varianti `.grid-auto`).
     - `storicoView.js`: Root `.page.storico-page`; banner Net Worth unificato in `.card.highlight-card`, grafico e tabella mensile in `.card` canoniche.
     - `impostazioniView.js`: Root `.page.impostazioni-page`; tutte le sezioni (connessione, token, conguagli, merge, sicurezza) in `.card` canoniche.
  6. *Accessibilità e Contrasto WCAG AA (≥ 4.5:1)*:
     - Aggiornato `--text-secondary: #6E6E73` in tema light per garantire un rapporto di contrasto effettivo di 5.7:1 rispetto allo sfondo bianco.
     - Numeri monetari formattati con `font-variant-numeric: tabular-nums` e allineati a destra.
     - Barre di progresso con altezza costante (8px) e testi descrittivi/percentuali sempre all'esterno della barra.
  7. *Certificazione Multi-Viewport Automatica & Zero Difetti*:
     - Esecuzione dello script `scripts/audit_layout.py` su 5 risoluzioni (320px, 375px, 768px, 1280px, 1920px) su tutte le 7 visuali dell'app: **35/35 test superati con 0 difetti (0 overflow orizzontali, 0 collisioni, 0 elementi fuori bordo)**.
  8. *Sincronizzazione Bundle & Validazione JavaScriptCore*:
     - Creato script `scripts/build_bundle.py` che assembla `js/app.bundle.js` includendo `uiComponents.js`. Validazione runtime con motore `jsc` di macOS superata con successo. [2026-10-31]

- **[TEST LOCALE] Refactoring Architetturale Dashboard a 4 Zone Canoniche (v2026.9)**:
  1. *Architettura delle Card a 4 Zone Omogenee*:
     - Riconfigurata l'intera Dashboard (`js/components/dashboardView.js`) adottando il modello canonico a 4 zone imposto dalla skill `ui-perfect-design`:
       - `.card__header`: Titoli su riga singola con `white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`, `min-width: 0` e badge/icona di stato contestuale. Eliminata qualsiasi oscillazione di altezza delle testate.
       - `.card__value`: Metrica primaria in grande evidenza con font monospaziato tabulare (`tabular-nums`) e supporto totale alla Modalità Privacy.
       - `.card__body`: Contenitore dati secondari strutturati con componenti `.meter` (progress bar con riempimento semantico animato) e `.kv` (coppie chiave-valore `.kv__label` e `.kv__value`).
       - `.card__footer`: Nota informativa, stato o badge ausiliario.
  2. *Layout Grid & Spaziature Rigorose a Token (24px)*:
     - Root incapsulata in `.page.dashboard-page`.
     - Fila 1 (KPI Macro): 4 card strutturate in `.grid-4` con `gap: var(--space-5)` (24px).
     - Fila 2 (Saldi Conti Reali): 6 card conti in `.grid-6` con `gap: var(--space-5)` (24px) e padding `var(--space-5)` (24px).
     - Fila 3 (FinTech Intelligence): 4 card (Health Score, Runway, Spike Detector, Budget 50/30/20) in `.grid-4`.
     - Fila 4 (Grafici Interattivi): Cash Flow Trend e Donut Categorie in `.charts-grid` con `gap: 24px`.
     - Fila 5 (Forecast 45gg): Card estesa con le 4 zone canoniche e timeline orizzontale.
     - Fila 6 (Spese Ricorrenti): Card contenitore con griglia interna `.grid-4` a 4 zone per le prossime uscite fisse.
  3. *Certificazione Multi-Viewport Automatica & Zero Difetti*:
     - Esecuzione dello script `scripts/audit_layout.py` su 5 risoluzioni (320px, 375px, 768px, 1280px, 1920px) su tutti i percorsi dell'app: **35/35 casi di test passati con 0 collisioni, 0 overflow orizzontali e 0 difetti visivi**.
  4. *Sincronizzazione Bundle Standalone*:
     - Aggiornato `js/app.bundle.js` e validato con il motore JavaScriptCore di macOS. [2026-10-31]

- **[TEST LOCALE] Integrazione Skill UI-Perfect-Design & Certificazione Multi-Viewport (v2026.8)**:
  1. *Adozione Nuova Skill `ui-perfect-design`*:
     - Integrato il file `SKILL.md` sia nella root del progetto sia nella directory ufficiale `.agents/skills/ui-perfect-design/SKILL.md`.
     - Creata la specifica esaustiva `DESIGN.md` (Single Source of Truth per palette semantica, scala spaziature 8px, scala tipografica e regole anti-collisione).
  2. *Design System Tokens Ufficiali in CSS*:
     - Aggiunti in `:root` i token standard `--space-1` (4px) fino a `--space-9` (96px), i token tipografici modulari (`--text-xs` .. `--text-4xl`, `--leading-*`) e i ruoli semantici di colore (`--color-bg`, `--color-surface`, `--color-primary`, `--color-success`, `--color-warning`, `--color-danger`).
     - Rimossi tutti i riferimenti a `100vw` a favore di `100%` e `100dvh` per eliminare qualsiasi rischio di scrollbar orizzontale imprevista.
     - Implementato focus ring universale accessibile (`outline: 2px solid var(--apple-blue) !important; outline-offset: 2px !important`) per `:focus-visible`.
     - Standardizzati tutti i touch target mobili a un'area minima di 44×44px (`.apple-btn-icon`, `.mov-delete-btn`, `.view-subtab-btn`, `.mobile-tab-item`).
  3. *Script di Audit Automatico Multi-Viewport (`scripts/audit_layout.py`)*:
     - Implementato script di verifica headless conforme alla Fase 5.1 della skill per scansionare 5 viewport: iPhone SE (320px), iPhone standard (375px), iPad (768px), MacBook (1280px), Desktop FHD (1920px).
     - Eseguito test su tutte e 7 le visuali e viste secondarie (#dashboard, #movimenti, #movimenti-budget, #investimenti, #investimenti-fire, #storico, #impostazioni).
     - **Esito Audit: 35 casi di test su 35 superati con ZERO difetti (0 errori di scroll, 0 elementi fuori bordo, 0 collisioni)**.
  4. *Sincronizzazione Bundle Standalone*:
     - Ricompilato e validato `js/app.bundle.js` per garantire la perfetta esecuzione nativa `file://` da doppio clic e via HTTP locale su porta 3001. [2026-10-30]

- **[TEST LOCALE] Revisione Grafica Globale Apple HIG & Perfezionamento Layout Responsive (v2026.7)**:
  1. *Audit Estetico Completo Desktop & Mobile (Screenshot Verification)*:
     - Eseguita scansione visiva ad altissima fedeltà di tutte le schermate dell'applicazione sia su visuale MacBook Desktop (1440px) che su iPhone (500px/mobile).
     - Rilevati e risolti puntualmente difetti di allineamento, densità informativa, clipping e bilanciamento cromatico.
  2. *Dashboard FinTech Smart Strip Uniformata*:
     - Incapsulato il 4° widget (`.budget-gauge-card`) nel contenitore standard `.smart-strip-card`, equiparando padding (`24px`), raggio di curvatura squircle (`var(--radius-xl)`), sfondo semitrasparente e bordi sottili.
     - Implementata griglia desktop bilanciata a 4 colonne (`repeat(4, 1fr)`) oltre i 1200px, 2 colonne su tablet e colonna singola su mobile, garantendo perfetta simmetria orizzontale.
     - Corretto il generatore di mock del Cash Flow Forecast per eliminare la duplicazione dello stipendio e garantire rigoroso ordine cronologico.
  3. *Eliminazione Totale Overflow Orizzontale su iPhone*:
     - Trasformata la barra di sottoschede `.view-subtabs-nav` (presente in Movimenti e Investimenti) in uno strip orizzontale a scorrimento tattile nativo iOS con `overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; flex-wrap: nowrap;` e `flex-shrink: 0;` sui pulsanti. Eliminata la dilatazione involontaria del viewport.
     - Riorganizzata la striscia indicatori `.movimenti-stats-strip` su mobile in un layout a griglia compatto 2x2 perfettamente ordinato (`repeat(2, 1fr)`).
     - Inserita stilizzazione responsive per `.movimenti-selects-row`: dropdown a larghezza condivisa 50% su mobile e pulsante principale a tutta larghezza, preservando l'allineamento a destra su desktop.
  4. *iPhone Native Tab Bar & Top Bar Shield Optimization*:
     - Ottimizzati i 5 pulsanti della Bottom Tab Bar (`Home`, `Movimenti`, `Investimenti`, `Storico`, `Config`) con dimensionamento elastico `flex: 1 1 0; min-width: 0;` per garantire visibilità e leggibilità immediata su tutti i modelli di iPhone senza troncamenti.
     - Sintetizzato il badge sandbox nella Top Bar mobile (`🛡️ Sandbox`) per garantire un distacco aereo armonioso accanto al selettore della Modalità Privacy.
  5. *Tipografia & Grafici Apple Stocks Style*:
     - Impostati i tick dell'asse orizzontale X per tutti i grafici a linee (Simulatore PAC, Indipendenza F.I.R.E. e Storico Net Worth) con `maxTicksLimit: 6-7, maxRotation: 0, minRotation: 0`, eliminando qualsiasi inclinazione a 45° ed esibendo date ed etichette perfettamente orizzontali e spaziate in stile Apple Borsa / Apple Salute.
  6. *Sincronizzazione Bundle e Test di Conformità*:
     - Rigenerato e convalidato il bundle standalone `js/app.bundle.js` per garantire operatività impeccabile e zero errori runtime sia su server locale che da doppio clic `file://` con JavaScriptCore. [2026-10-30]

- **[TEST LOCALE] Rilascio 5 Nuove Feature Strategiche FinTech & Personal Finance (v2026.6)**:
  1. *Budget Preventivo 50/30/20 & Buste di Spesa (Envelopes)*:
     - Calcolo automatico in `FinanceStore.getBudget50_30_20()` basato su stipendio e spese tracciate del mese corrente.
     - Widget integrato nella Dashboard Smart Strip (`.budget-gauge-card`) con spesa giornaliera sicura residua (`€/giorno`) e barre di saturazione per Bisogni (50%), Voluttuari (30%) e Risparmio (20%).
     - Quarto subtab Cupertino in Movimenti (`🎯 Budget 50/30/20`) con KPI strip, 3 macro-buste a visualizzazione Apple Card, progress track squircle e dettaglio spese per singola sottocategoria.
  2. *Simulatore F.I.R.E. & Crossover Point (Indipendenza Finanziaria)*:
     - Motore di calcolo `FinanceStore.calculateFireMetrics()` basato sulla Trinity Study 4% Safe Withdrawal Rate (SWR) e compounding interest su orizzonte a 35 anni.
     - Quarto subtab Cupertino in Investimenti (`🔥 Indipendenza F.I.R.E.`) con 4 card KPI (Numero F.I.R.E., Rendita mensile netta attuale generata dal patrimonio reale, Anni al Crossover Point, Percentuale di avanzamento).
     - Confronto tra 3 varianti di stile di vita: Lean F.I.R.E. (spese al 70%), Standard F.I.R.E. (100%), Fat F.I.R.E. (135% agiato).
     - Slider interattivi nativi Apple (spesa mensile, SWR 3-5%, rendimento atteso 4-10%, inflazione 1-4%) e grafico a doppia curva Chart.js (Rendita passiva reale vs Spesa annua di mantenimento) con individuazione visiva immediata del Crossover Point.
  3. *Calcolatore Operativo di Ribilanciamento (Smart Rebalance Engine)*:
     - Algoritmo `FinanceStore.calculateSmartRebalance()` per la ripartizione ottimale di nuovi flussi di liquidità (es. 500 € o 1.000 €) tra VWCE (azionario globale), XEON (monetario overnight) e Fondo Pensione.
     - Permette il riallineamento progressivo al profilo di rischio MiFID assegnato senza vendere quote né generare plusvalenze tassabili al 26%.
     - Card interattiva nel subtab `Profilo di Rischio` con pulsanti di selezione rapida (+250 €, +500 €, +1.000 €), ripartizione analitica per strumento e pulsante con copia negli appunti delle istruzioni formattate per il broker.
  4. *Cash Flow Forecast & Timeline Scadenze (45 Giorni)*:
     - Motore predittivo `FinanceStore.getCashFlowForecast()` che proietta la liquidità sui successivi 45 giorni integrando accredito stipendio (il 27 del mese) e impegni ricorrenti.
     - Sezione orizzontale scrollabile in Dashboard (`.forecast-section-card`) con badge di saldo minimo e massimo atteso, e card traguardo a due tinte (entrate in verde `#34C759`, uscite in rosso `#FF3B30`).
  5. *Report Patrimoniale & Fiscale Stampabile (Annual Snapshot & Export)*:
     - Generatore di rendiconto annuale `FinanceStore.getAnnualTaxReport()` con ripartizione asset allocation per regime fiscale, calcolo giacenza media per ISEE e bollo, e deducibilità fiscale fondo pensione secondo l'Art. 51 TUIR (plafond 5.164,57 € e risparmio IRPEF stimato).
     - Nuovi pulsanti nella toolbar dello Storico per l'apertura del report istituzionale, esportazione completa transazioni in formato CSV (formattato con punto e virgola e UTF-8 BOM per Excel/Numbers) e salvataggio di backup JSON.
     - Foglio di stile `@media print` ottimizzato per stampa cartacea A4 o esportazione diretta in PDF pulito con formattazione Apple Executive.
  6. *Conformità Totale Privacy Mode & Esecuzione Autonoma*:
     - Tutte le nuove metriche, importi e saldi sono protetti da `privacy-mask` e mascherati in modalità privacy attiva.
     - Aggiornato e collaudato con JavaScriptCore il bundle `js/app.bundle.js` per garantire l'apertura istantanea sia via HTTP che da doppio clic `file://` da Finder senza codice Python. [2026-10-30]

- **[TEST LOCALE] Motore Continuo Net Worth Dinamico & Sincronizzazione Real-Time dello Storico (v2026.5)**:
  1. *Superamento del Limite Statico ad Agosto 2026*: identificata la causa dello stop ad agosto 2026 (assenza di formule nella scheda originaria `Historical NW` del vecchio Google Sheet). Integrato in `FinanceStore` il motore dinamico `getHistoricalNetWorth()` che unisce la baseline consolidata (2024-2026), i flussi di cassa reali (entrate, uscite e conguagli di ogni mese) e la situazione patrimoniale live calcolata in tempo reale.
  2. *Integrazione Settembre e Ottobre 2026*: Settembre 2026 consolidato a quota € 16.951,37 (flussi di cassa reali netti +€ 977,16 da stipendio Technosky e spese tracciate); Ottobre 2026 agganciato in tempo reale al saldo di tutti i conti attivi (€ 17.743,31 con Buoni Pasto, o € 17.354,81 saldi base).
  3. *Reattività Immediata a Movimenti e Conguagli*: ogni nuova transazione inserita o conguaglio eseguito nelle impostazioni aggiorna all'istante il punto del mese corrente sia nel banner KPI, sia nel grafico a linee (con punto attivo verde pulsante `#30D158`), sia nella tabella mensile con badge Apple `In corso`.
  4. *Modale Apple "Fissa Snapshot" & Azione Rapida Conguagli*: aggiunti nella toolbar dello Storico i pulsanti rapidi per aprire la modale di consolidamento manuale di qualsiasi mensilità (`finanze_nw_snapshots`) e per accedere immediatamente alla riconciliazione saldi.
  5. *Coerenza Ripristino Saldi su Eliminazione*: esteso `deleteTransaction()` per ripristinare il saldo contabile del conto associato quando una transazione viene rimossa, preservando l'integrità del Net Worth.
  6. *Sincronizzazione Bundle file://*: rigenerato e validato `js/app.bundle.js` con JavaScriptCore per assicurare la perfetta esecuzione nativa sia via HTTP che da apertura diretta `file://`. [2026-10-30]
- **[TEST LOCALE] Estensione Globale Modalità Privacy (Eye Toggle) a Tutte le Viste**:
  1. *Diagnosi Mancato Oscuramento*: individuato che le classi utilizzate nelle viste Movimenti (`.amount-val`, `.movimenti-stat-value`), Investimenti (`.holding-amount`, `.sim-value`, `.alloc-card-total`, `.alloc-row-val`, `.goal-target-val`, `.goal-rate-pill`), Storico (`.banner-val`, `.banner-badge`, `.hist-val`, `.hist-delta`), e Impostazioni (`.conguaglio-delta-val`, saldi conguagli) non erano presenti nei selettori di `body.privacy-mode`, limitando l'oscuramento visivo alla sola Dashboard.
  2. *Offuscamento a 360 Gradi*: integrati tutti i selettori di importi, delta e saldi di ogni singola vista, con classe utility universale `.privacy-mask`.
  3. *Protezione Grafici & Tooltip*: applicato `filter: blur(8px)` e `pointer-events: none` a tutti gli elementi `canvas` in modalità privacy, impedendo a chiunque guardi lo schermo di rilevare dati, picchi o visualizzare tooltip numerici su hover.
  4. *Protezione Input Saldi*: applicato effetto soft text-shadow e colore trasparente sugli input numerici dei saldi per totale riservatezza visiva.
  5. *Sincronizzazione Bundle file://*: ricompilato e collaudato con JavaScriptCore il file `js/app.bundle.js` per garantire identica funzionalità con apertura diretta da Finder. [2026-10-30]
- **[TEST LOCALE] Standardizzazione Spaziature & Anti-Collisione Sezione Investimenti**:
  1. *Decompressione Strutturale & Subtabs Navigation*: incrementato lo stacco della barra di navigazione sottopagine (`.view-subtabs-nav`) a `margin-bottom: var(--space-section-gap)` (32px) e del layout primario a 32px, donando il tipico respiro aereo dell'ecosistema Apple.
  2. *Risoluzione Sovrapposizione Domande Profilo di Rischio*: corretto il comportamento di `.survey-question-title` impostando `display: block` e margine inferiore protetto (`14px`), eliminando il difetto per cui il testo inline toccava direttamente i pulsanti di opzione. Ampliato il padding dei pulsanti a `16px 18px` e il gap tra domande a `30px`.
  3. *Holdings & Asset Allocation Decompressa*: aumentato il padding delle card strumenti a `16px 18px` (desktop) e `14px 16px` (mobile), portando il distacco verticale tra nome e tipo asset da 2px a `var(--space-text-title)` (6px) con interlinee protette, evitando ogni accavallamento tra testi descrittivi e importi.
  4. *Simulatore PAC con Controlli e KPI Isolati*: ampliato il padding del box di controllo a `24px` con gap tra slider ed etichette a `12px` (eliminando la collisione con il cursore circolare), e ridefinito il sommario KPI con card ad ampio respiro (`padding: 16px 18px`, `gap: 8px`).
  5. *Obiettivi di Risparmio (Saving Goals) a Sezioni Protette*: incapsulati valore, progress track e quota mensile nel nuovo blocco `.goal-progress-section` con distanziamento uniforme a 10px; separata la barra di versamento rapido con divider morbido (`margin-top: 8px; padding-top: 16px`); standardizzati i titoli con `.cat-selector-info` ed eliminati tutti i margini hardcoded da 2px.
  6. *Sincronizzazione Bundle & Skill*: codificata la regola specifica nella skill `apple-design-system` e rigenerato `js/app.bundle.js` per garantire identica resa senza server HTTP. [2026-10-30]
- **[TEST LOCALE] Master Table & List Pattern (Risoluzione Distribuzione Movimenti)**:
  1. *Architettura CSS Grid per Tabelle*: unificata la specifica di colonna tra intestazione e righe (`56px minmax(180px, 1fr) 140px 130px 36px`), eliminando scostamenti e disallineamenti verticali a qualsiasi allargamento/riduzione della finestra.
  2. *Stacking Verticale Descrizione & Conto*: disposte descrizione (`.desc-main`) e conto (`.desc-account`) su due livelli verticali con `min-width: 0;` e troncamento pulito (`ellipsis`), eliminando le collisioni orizzontali tra testi.
  3. *Badge Data Squircle & Pill Categoria*: reingegnerizzato il widget data con giorno grande e mese compatto, e incapsulata la categoria in pill protetta con larghezza controllata.
  4. *Layout Cellulare Mobile iOS (Apple Wallet Style)*: sotto i 768px la tabella si trasforma fluidamente in una griglia a 2 righe (`date desc amount / date cat actions`), garantendo leggibilità totale e zero sovrapposizioni anche su schermi ridotti.
  5. *Allineamento Skill*: codificato il pattern nella skill `.agents/skills/apple-design-system/SKILL.md` come standard di riferimento. [2026-10-30]
- **[TEST LOCALE] Rollout Completo Spaziature Standard & Design Tokens Anti-Sovrapposizione**:
  1. *Scala Spaziale Apple (4pt/8pt Hierarchy)*: codificati i token metrici ufficiali da `--space-3xs` (2px) fino a `--space-4xl` (48px) in `css/apple-design.css`.
  2. *Distanze Predefinite tra le Scritte (Typography Matrix)*: standardizzati gli spazi tra titolo e sottotitolo (`--space-text-title: 6px`), tra sottotitolo e corpo (`--space-text-sub: 12px`), tra paragrafi (`--space-text-p: 12px`), e tra label e valore (`--space-text-label: 6px`), con interlinee protette anti-accavallamento (`--lh-tight`, `--lh-title`, `--lh-body`, `--lh-caption`).
  3. *Distanze Predefinite tra i Box & Layout*: standardizzati i gap tra badge/pill (`8px`), pulsanti e filtri (`12px`), righe form e dati (`16px`), card di griglia (`20px`), macro-blocchi (`24px`) e sezioni (`32px`), con padding card responsive (`24px` desktop / `18px` mobile).
  4. *Refactoring Integrale dei Componenti*: eliminati tutti gli inline style con margini/padding hardcoded da `dashboardView.js`, `movimentiView.js`, `investimentiView.js`, `impostazioniView.js`, `storicoView.js` e `index.html`, rimpiazzati con token semantici (`var(--space-*)`) e classi utility (`.cluster-gap-*`, `.stack-gap-*`, `.label-val-pair`).
  5. *Motore Automatico Anti-Overlap & Bundle Rebuild*: formalizzati gli standard in `AGENTS.md` e `.agents/skills/apple-design-system/SKILL.md`; ricompilato e validato `js/app.bundle.js` per garantire identica resa sia su server locale che da apertura diretta `file://`. [2026-10-30]
- **[TEST LOCALE] Protezione Database Reale & Modalità Sandbox Protetto (Beta)**:
  1. *Blindatura Scritture su Google Sheets*: attivata `sandboxMode = true` in `googleSheetsService.js` che intercetta e blocca incondizionatamente qualsiasi chiamata remota di scrittura (`pushTransaction`), eliminazione (`deleteTransaction`) e aggiornamento saldi (`updateAccountBalance`).
  2. *Isolamento 100% Locale*: tutte le modifiche, nuovi movimenti, conguagli, obiettivi e accorpamenti di categorie effettuati durante le prove restano strettamente fittizi e confinati in `localStorage`/mock nel browser locale. Il foglio Google Sheets reale non viene toccato.
  3. *Indicatori Visivi Apple*: visualizzazione dello stato `🛡️ Database Protetto` nella sidebar Mac, pill `🛡️ Sandbox` nell'header mobile iPhone e banner descrittivo nella sezione Google Sheets delle Impostazioni.
  4. *Aggiornamento Bundle file://*: rigenerato `js/app.bundle.js` per supportare sia l'apertura immediata via doppio clic nel Finder che tramite server locale. [2026-10-30]
- **[TEST LOCALE] Refactoring Visivo & Anti-Overlap Mandate (Apple.com High-Fidelity)**:
  1. *Art Direction & Mandato Zero-Collision*: integrata in `AGENTS.md` la direzione artistica Apple UI/UX con standard rigorosi anti-sovrapposizione a qualsiasi breakpoint.
  2. *Creazione Skill Dedicata (`.agents/skills/apple-design-system/SKILL.md`)*: formalizzati pattern visivi, geometria squircle, ritmica degli spazi (`22px-28px`), gerarchia tipografica SF Pro e layout grid fluidi con `min-width: 0;`.
  3. *Eliminazione Sovrapposizioni Visive*: ridisegnata la strip intelligence (`.dashboard-smart-strip`), l'allocazione a barre (`.alloc-row`), le card degli obiettivi con deposit bar protetta e le pill delle anomalie di spesa su due livelli per evitare collisioni di stringhe lunghe. [2026-10-30]
- **[TEST LOCALE] Suite Funzionalità Intelligenti & Financial Advisory (Beta v2026.5)**:
  1. *Analisi & Confronto Categorie*: introdotte viste deep-dive per singola categoria (trend a 12 mesi, spesa media, picco, incidenza budget) e confronto testa a testa con delta e grafico comparativo.
  2. *Conguagli Conti*: modale Apple di riconciliazione che chiede esplicitamente se registrare la differenza come movimento reale (`⚖️ Conguaglio / Rettifica`) o mantenerla solo fittizia.
  3. *Categorie Dinamiche & Smart Merge*: creazione al volo di nuove categorie dalla modale spesa con rilevamento somiglianza; strumento di fusione bulk nelle impostazioni con aggiornamento automatico dello storico.
  4. *Smart Rules*: predizione automatica della categoria digitando la descrizione della spesa.
  5. *Profilo di Rischio & Target Allocation*: questionario a 4 domande, calcolo profilo (Conservativo, Bilanciato, Dinamico, Aggressivo), confronto visivo Allocazione Reale vs Target e calcolo dei delta per il ribilanciamento.
  6. *Obiettivi di Risparmio (Saving Goals)*: gestione salvadanai con barra di avanzamento, calcolo rata mensile necessaria in base alla deadline e verifica di fattibilità rispetto al risparmio medio.
  7. *Intelligence Dashboard*: Financial Health Score sintetico (0-100), Previsione liquidità libera a fine mese e Rilevatore anomalie/spike di spesa.
  8. *Modalità Privacy*: toggle occhio per mascherare importi e saldi in ambienti pubblici. [2026-10-30]
- **[APPROVATO] Integrazione Costituzione Operativa (`AGENTS.md`)**: Definiti standard ingegneristici professionali, ruolo proattivo Senior Software Engineer + Apple UI/UX + FinTech Advisor, no-build Vanilla ES6, gestione branch e protocollo di sviluppo sicuro. [2026-10-30]

---

## 💡 Backlog & Idee Future in Valutazione

- [ ] Esportazione report spese fiscalmente detraibili (Pronto 730) in CSV/PDF.
- [ ] Supporto multi-valuta e tracciamento crypto/metalli in tempo reale.
