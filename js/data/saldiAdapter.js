/**
 * SaldiAdapter - Motore Adattatore Deterministico per la scheda 'Saldi' (Google Sheets)
 * 
 * SPECIFICA STRUTTURALE SCHEDA 'Saldi':
 * ==============================================================================
 * La scheda 'Saldi' non è una tabella statica, ma un LEDGER TEMPORALE di conguagli mensili
 * certificati a fine mese (2024, 2025, 2026).
 * 
 * SCHEMA COLONNE:
 * - Col A: 'Data Conguaglio'  (formato DD/MM/YYYY, es. 31/01/2024, 31/10/2026)
 * - Col B: 'Conto / Asset'     (es. 'Buddybank', 'Trade Republic - XEON', 'TOTALE NET WORTH')
 * - Col C: 'Tipologia'         (es. 'Liquidità corrente', 'Patrimonio Complessivo')
 * - Col D: 'Saldo Reale'       (stringa valuta es. '€2.393,39' o numero)
 * - Col E: 'Note'              (audit trail e note descrittive)
 * 
 * REGOLE DETERMINISTICHE DI COMPUTAZIONE:
 * 1. CHECKPOINT COMPLETO: Ogni data T rappresenta uno snapshot chiuso. Se un conto o
 *    un asset non è presente alla data T, il suo saldo a quella data è €0,00.
 * 2. STATO VIVO vs STORICO (ISOLAMENTO ASSET ESTINTI):
 *    - L'ultimo conguaglio certificato (T_max = data con timestamp più alto, es. 31/10/2026)
 *      è la "Single Source of Truth" per i conti e gli asset operativi oggi.
 *    - Conti ed asset presenti SOLO in conguagli passati (es. BTC, Salvadanaio, vecchi ETF)
 *      sono considerati ESTINTI/CHIUSI: il loro saldo attuale è rigorosamente 0 e vengono
 *      esclusi dai wallet e conti attivi della dashboard.
 *    - Nei grafici storici (2024-2026), tali asset rimangono invece visibili con i loro
 *      valori storici effettivi alla data in cui esistevano.
 * 3. RICONCILIAZIONE POST-CONGUAGLIO:
 *    Saldo Attivo Oggi = Saldo Certificato a T_max + Somma(Movimenti dal giorno successivo a T_max a oggi)
 */

export class SaldiAdapter {
  /**
   * Normalizza una data dal foglio in oggetto normalizzato { timestamp, monthKey, formattedDate }
   */
  static parseDateInfo(rawDate) {
    if (!rawDate) return null;
    const str = String(rawDate).trim();

    // Formato DD/MM/YYYY o D/M/YYYY
    const dmyMatch = str.match(/^(\d{1,2})[\/\.-](\d{1,2})[\/\.-](\d{4})$/);
    if (dmyMatch) {
      const d = parseInt(dmyMatch[1], 10);
      const m = parseInt(dmyMatch[2], 10);
      const y = parseInt(dmyMatch[3], 10);
      const ts = new Date(y, m - 1, d).getTime();
      const mPad = String(m).padStart(2, '0');
      const dPad = String(d).padStart(2, '0');
      return {
        timestamp: ts,
        monthKey: `${mPad}/${y}`,
        formattedDate: `${dPad}/${mPad}/${y}`,
        year: y,
        month: m,
        day: d
      };
    }

    // Formato ISO YYYY-MM-DD
    const isoMatch = str.match(/^(\d{4})[\/\.-](\d{1,2})[\/\.-](\d{1,2})$/);
    if (isoMatch) {
      const y = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10);
      const d = parseInt(isoMatch[3], 10);
      const ts = new Date(y, m - 1, d).getTime();
      const mPad = String(m).padStart(2, '0');
      const dPad = String(d).padStart(2, '0');
      return {
        timestamp: ts,
        monthKey: `${mPad}/${y}`,
        formattedDate: `${dPad}/${mPad}/${y}`,
        year: y,
        month: m,
        day: d
      };
    }

    // Prova parsing standard Date
    const parsed = new Date(str);
    if (!isNaN(parsed.getTime())) {
      const y = parsed.getFullYear();
      const m = parsed.getMonth() + 1;
      const d = parsed.getDate();
      const mPad = String(m).padStart(2, '0');
      const dPad = String(d).padStart(2, '0');
      return {
        timestamp: parsed.getTime(),
        monthKey: `${mPad}/${y}`,
        formattedDate: `${dPad}/${mPad}/${y}`,
        year: y,
        month: m,
        day: d
      };
    }

    return null;
  }

  /**
   * Converte una stringa valuta o valore misto in numero float
   */
  static parseCurrency(val) {
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    if (!val) return 0;
    const clean = String(val).replace(/[^0-9,\.-]/g, '').replace(/\./g, '').replace(',', '.');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  }

  /**
   * Verifica se una riga è un totale o riepilogo aggregato (Net Worth / Totale Liquido)
   */
  static isSummaryRow(row) {
    if (!row || !row.name) return false;
    const n = String(row.name).trim().toLowerCase();
    const tp = String(row.type || '').trim().toLowerCase();
    if (n.startsWith('totale') || n.startsWith('total') || n === 'net worth' || n === 'nw (eur)') return true;
    if (tp.includes('patrimonio complessivo') || tp.includes('disponibilità diretta')) return true;
    return false;
  }

  /**
   * Analizza e struttura l'intero array di righe da Saldi e Storico
   */
  static processSaldi(saldiRows, storicoRows = []) {
    const rawAll = [
      ...(Array.isArray(saldiRows) ? saldiRows : []),
      ...(Array.isArray(storicoRows) ? storicoRows : [])
    ];
    if (rawAll.length === 0) {
      return {
        latestCheckpoint: null,
        activeAccounts: new Map(),
        activeHoldings: new Map(),
        extinctAssets: new Set(),
        monthlyClosings: new Map(),
        summaryTotalsByMonth: new Map(),
        allRows: []
      };
    }

    const allProcessed = [];
    const summaryTotalsByMonth = new Map();
    let latestCheckpoint = null;

    // 1. Normalizzazione e indicizzazione temporale
    rawAll.forEach(raw => {
      const dInfo = this.parseDateInfo(raw.date);
      if (!dInfo) return;

      const balance = this.parseCurrency(raw.balance);
      const name = String(raw.name || '').trim();
      const type = String(raw.type || '').trim();
      const notes = String(raw.notes || '').trim();

      const item = {
        dateInfo: dInfo,
        name,
        type,
        balance,
        notes,
        isSummary: this.isSummaryRow(raw)
      };

      allProcessed.push(item);

      if (item.isSummary) {
        if (!summaryTotalsByMonth.has(dInfo.monthKey)) {
          summaryTotalsByMonth.set(dInfo.monthKey, {});
        }
        const sObj = summaryTotalsByMonth.get(dInfo.monthKey);
        const nameLower = name.toLowerCase();
        if (nameLower.includes('net worth') || nameLower.includes('patrimonio')) {
          sObj.netWorth = balance;
        } else if (nameLower.includes('liquido')) {
          sObj.liquidInvested = balance;
        }
      } else {
        if (!latestCheckpoint || dInfo.timestamp > latestCheckpoint.timestamp) {
          latestCheckpoint = dInfo;
        }
      }
    });

    // 2. Estrazione conti e asset attivi dell'ultimo conguaglio
    const activeAccounts = new Map();
    const activeHoldings = new Map();
    const seenAssetsAllHistory = new Set();

    allProcessed.forEach(row => {
      if (row.isSummary) return;
      seenAssetsAllHistory.add(row.name);

      // Appartiene all'ultimo conguaglio certificato?
      if (latestCheckpoint && row.dateInfo.monthKey === latestCheckpoint.monthKey) {
        if (row.name.includes(' - ')) {
          // Asset Broker (es. Trade Republic - XEON)
          const parts = row.name.split(' - ');
          const broker = parts[0].trim();
          const ticker = parts.slice(1).join(' - ').trim();
          if (!activeHoldings.has(broker)) {
            activeHoldings.set(broker, new Map());
          }
          activeHoldings.get(broker).set(ticker, {
            balance: row.balance,
            type: row.type,
            notes: row.notes
          });
        } else {
          // Conto standard
          activeAccounts.set(row.name, {
            balance: row.balance,
            type: row.type,
            notes: row.notes,
            lastReconciledDate: row.dateInfo.formattedDate,
            lastReconciledMonth: row.dateInfo.monthKey
          });
        }
      }
    });

    // 3. Rilevazione asset estinti (presenti in passato ma assenti nell'ultimo conguaglio)
    const extinctAssets = new Set();
    seenAssetsAllHistory.forEach(assetName => {
      if (assetName.includes(' - ')) {
        const parts = assetName.split(' - ');
        const broker = parts[0].trim();
        const ticker = parts.slice(1).join(' - ').trim();
        const brokerMap = activeHoldings.get(broker);
        if (!brokerMap || !brokerMap.has(ticker)) {
          extinctAssets.add(assetName);
        }
      } else {
        if (!activeAccounts.has(assetName)) {
          extinctAssets.add(assetName);
        }
      }
    });

    // 4. Generazione Time-Series Mensile (Monthly Closings 2024-2026)
    const monthlyClosings = new Map();
    const rowsByMonth = new Map();

    allProcessed.forEach(row => {
      if (row.isSummary) return;
      const mKey = row.dateInfo.monthKey;
      if (!rowsByMonth.has(mKey)) {
        rowsByMonth.set(mKey, []);
      }
      rowsByMonth.get(mKey).push(row);
    });

    rowsByMonth.forEach((items, mKey) => {
      const first = items[0];
      const accountsBreakdown = {};
      let totalNW = 0;
      let totalLiquidInvested = 0;

      items.forEach(it => {
        accountsBreakdown[it.name] = it.balance;
        totalNW += it.balance;
        const tpLower = it.type.toLowerCase();
        if (!tpLower.includes('previden') && !tpLower.includes('pension')) {
          totalLiquidInvested += it.balance;
        }
      });

      // Se presente il totale esplicito nel foglio, ha precedenza
      const summary = summaryTotalsByMonth.get(mKey);
      if (summary && summary.netWorth) {
        totalNW = summary.netWorth;
      }
      if (summary && summary.liquidInvested) {
        totalLiquidInvested = summary.liquidInvested;
      }

      monthlyClosings.set(mKey, {
        monthKey: mKey,
        formattedDate: first.dateInfo.formattedDate,
        timestamp: first.dateInfo.timestamp,
        year: first.dateInfo.year,
        month: first.dateInfo.month,
        netWorth: Math.round(totalNW * 100) / 100,
        directNW: Math.round(totalLiquidInvested * 100) / 100,
        liquidInvested: Math.round(totalLiquidInvested * 100) / 100,
        accountsBreakdown
      });
    });

    return {
      latestCheckpoint,
      activeAccounts,
      activeHoldings,
      extinctAssets,
      monthlyClosings,
      summaryTotalsByMonth,
      allRows: allProcessed
    };
  }

  /**
   * Riconcilia i movimenti successivi alla data di conguaglio per calcolare i saldi vivi
   */
  static reconcileLiveBalances(activeAccounts, activeHoldings, latestCheckpoint, transactions) {
    if (!latestCheckpoint || !Array.isArray(transactions) || transactions.length === 0) {
      return { activeAccounts, activeHoldings };
    }

    const checkpointTs = latestCheckpoint.timestamp;
    const postCheckpointTxs = transactions.filter(t => {
      const tDate = this.parseDateInfo(t.date);
      return tDate && tDate.timestamp > checkpointTs;
    });

    // Applica delta solo sui conti attivi
    postCheckpointTxs.forEach(t => {
      const amt = typeof t.amount === 'number' ? Math.abs(t.amount) : this.parseCurrency(t.amount);
      const isIncome = t.type === 'income' || t.type === 'Entrata';
      const isExpense = t.type === 'expense' || t.type === 'Uscita';
      const isTransfer = t.type === 'transfer' || t.type === 'Trasferimento' || t.type === 'Giroconto';

      const fromName = t.fromAccount || t.account;
      const toName = t.toAccount;

      if (isIncome && fromName && activeAccounts.has(fromName)) {
        activeAccounts.get(fromName).balance += amt;
      } else if (isExpense && fromName && activeAccounts.has(fromName)) {
        activeAccounts.get(fromName).balance -= amt;
      } else if (isTransfer) {
        if (fromName && activeAccounts.has(fromName)) {
          activeAccounts.get(fromName).balance -= amt;
        }
        if (toName && activeAccounts.has(toName)) {
          activeAccounts.get(toName).balance += amt;
        }
      }
    });

    return { activeAccounts, activeHoldings };
  }
}
