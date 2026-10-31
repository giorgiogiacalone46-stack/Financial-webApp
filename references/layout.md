# Anti-sovrapposizione (consulta solo se serve)
- `min-width:0` sui figli flex/grid con testo; `overflow-wrap:anywhere` sui testi utente.
- Immagini: `max-width:100%;height:auto`. Tabelle larghe in wrapper `overflow-x:auto`.
- Niente `100vw` (usa `100%`), niente z-index arbitrari (usa `--z-*`), `100dvh` per altezze schermo.
- Modali/dropdown: `max-height:calc(100dvh - 2*var(--space-4));overflow:auto`.
- Mobile-first: 360px base, poi `min-width` 640/768/1024/1280.
- Stati da gestire: caricamento, vuoto, errore, testo molto lungo, numeri grandi.
