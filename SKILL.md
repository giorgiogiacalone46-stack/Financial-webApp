---
name: ui-perfect-design
description: Revisione massiva e uniforme della grafica di un'intera web app (design system, spaziature, layout di tutte le pagine). Usare SOLO se l'utente la richiede esplicitamente o chiede di ridisegnare/uniformare tutto il sito. NON usare per modifiche singole, bug CSS isolati, nuove feature o ritocchi a un componente.
---

# UI Perfect Design (uso mirato, a basso consumo)

## Quando NON usarla
Modifica a una pagina/componente, fix di un bug visivo, nuova feature, cambio di colore o testo: lavora normalmente, **senza leggere i file di questa skill**.

## Regole base (sempre valide quando la skill è attiva)
1. Valori solo da token CSS (`references/tokens.md`): niente px/colori sparsi.
2. Spaziature a multipli di 4/8px, uguali per ruolo in tutte le pagine.
3. Layout con Grid/Flex + `gap`; mai `position:absolute` per impaginare; mai altezze fisse su box con testo (usa `min-height`).
4. Le forme si adattano al contenuto: i titoli vanno a capo, i badge no (`nowrap`), nessun testo importante troncato.
5. Card dello stesso tipo = stessa anatomia (`references/cards.md`), via componenti condivisi.

## Procedura (leggi i riferimenti SOLO quando arrivi al passo)
1. **Ambito:** elenca pagine e componenti. Se la richiesta tocca meno di 3 pagine, avvisa l'utente che la skill è eccessiva e procedi in modo leggero.
2. **Token:** crea/aggiorna il file token unico → leggi `references/tokens.md`.
3. **Componenti:** Card, KpiCard, MeterRow, KeyValueRow, Badge → leggi `references/cards.md`.
4. **Pagine:** applica componenti e griglie a una pagina alla volta → leggi `references/layout.md` solo se hai dubbi su sovrapposizioni/overflow.
5. **Verifica (una sola volta a fine lavoro):**
   `node .agent/skills/ui-perfect-design/scripts/audit-layout.mjs <url> <percorsi...>`
   Corregge solo i difetti elencati e rilancia al massimo 2 volte. Screenshot (`--shots`) solo su Dashboard e una pagina dati, non su tutte.

## Risparmio token
- Non rileggere file già letti; non riscrivere file interi per piccole correzioni (usa edit mirati).
- Non generare report lunghi: consegna in 5 righe (file toccati, componenti creati, esito audit).
- Non fare confronti prima/dopo né analisi visive estese se l'audit è a zero difetti.
