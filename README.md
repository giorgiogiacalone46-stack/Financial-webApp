# Finanze Personali - Web App (Stile Apple)

Web app moderna per la gestione finanziaria personale, progettata con un Design System fedele agli standard estetici e funzionali di Apple (macOS & iOS) e architettura serverless integrata con **Google Sheets ("Finanze-Movimenti")** come database, **100% gratuita** e ad **accesso personale esclusivo**.

---

## 📐 Architettura e Roadmap di Sviluppo

```
[Google Sheets: Finanze-Movimenti]  <--- Database Personale Cloud (Gratuito)
               │
               ▼ (Web App Serverless con Security Token)
     [Frontend Web App (Vanilla ES6 + CSS3 + Chart.js)]
         ├── Blocco 1: Scheletro Responsivo (Sidebar MacBook + Bottom Tab Bar iPhone) [COMPLETATO]
         ├── Blocco 2: Dashboard Analitica (KPI 4-Zone, Blocco Unico Conti, Uscite One-Click) [COMPLETATO]
         ├── Blocco 3: Monitoraggio Spese (Donut con Periodo, Budget 50/30/20, Top Merchant) [COMPLETATO]
         ├── Blocco 4: Assistente CFO AI (Radar Anomalie, Runway Fondo XEON, Auto-Reset 15m) [COMPLETATO]
         ├── Blocco 5: Registro Movimenti (Apple Wallet Ledger, Smart Categorizer, Export CSV) [COMPLETATO]
         ├── Blocco 6: Investimenti & Suite FinTech (PAC, MiFID Rebalance, Goals, F.I.R.E. 4% SWR) [COMPLETATO]
         ├── Blocco 7: Storico NW & Fiscale (Net Worth Continuo, Report Art. 51 TUIR Stampabile) [COMPLETATO]
         └── Blocco 8: Integrazione Google Sheets API, PIN Blocco & Impostazioni di Sicurezza [COMPLETATO]
```

---

## 🎨 Design System (Apple Spec)

- **MacBook (Desktop)**: Sidebar fissa laterale sinistra (`270px`) con effetto Glassmorphism (`backdrop-filter: blur(28px)`), indicatori di stato attivi e badge di connessione real-time al foglio *Finanze-Movimenti*.
- **iPhone (Mobile)**: Bottom Tab Bar nativa iOS (`72px` + safe-area insets per Home Indicator e Notch), touch targets ottimali e fogli di dettaglio scorrevoli.
- **Tipografia**: `-apple-system`, SF Pro Text / SF Pro Display.
- **Colori Dati**:
  - Saldo / Entrate: Verde Apple (`#34C759` / `#30D158`)
  - Spese / Uscite: Rosso Apple (`#FF3B30` / `#FF453A`)
  - Accent Principale: Blu macOS/iOS (`#0071E3` / `#0A84FF`)
  - Tasso di Risparmio: Viola / Gradiente Apple Fitness

---

## 🔒 Sicurezza e Privacy (Zero Costi)

L'integrazione con Google Sheets avviene tramite un backend serverless in **Google Apps Script** (`google-apps-script/Code.gs`):
- **100% Gratuito**: Nessuna spesa per server, database esterni o licenze API.
- **Accesso Esclusivo**: Ogni operazione richiede una chiave segreta (**Security Token**) configurata sia nello script che nelle impostazioni dell'app.
- **Resilienza Offline**: Funzionamento immediato anche in locale o in assenza di connessione di rete con sincronizzazione automatica al ripristino.

---

## 🚀 Avvio Locale

L'applicazione è sviluppata in vanilla modern ES6 e CSS3, senza necessità di Node/npm o build step pesanti:

```bash
# Avvio rapido con Python 3:
python3 -m http.server 3000
```

Apri nel browser:
👉 **`http://localhost:3000`**
