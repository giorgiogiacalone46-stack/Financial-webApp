/**
 * Google Apps Script Web App Backend per "Finanze - Movimenti"
 * 
 * ISTRUZIONI:
 * 1. Apri il tuo foglio "Finanze - Movimenti" su Google Sheets
 * 2. Estensioni > Apps Script
 * 3. Incolla questo codice sostituendo l'intero contenuto di Codice.gs
 * 4. Configura la tua SECURITY_TOKEN a riga 18
 * 5. Esegui distribuzione > Nuova distribuzione > Tipo "Applicazione web"
 *    - Esegui come: "Io"
 *    - Chi ha accesso: "Chiunque" (protetto dal Security Token)
 * 6. Salva e usa il nuovo URL generato nell'app.
 */

var SECURITY_TOKEN = "CHIAVE_SEGRETA_PERSONALE_2026";
var CACHE_KEY_PREFIX = "finanze_cache_v2";
var CACHE_TTL_SECONDS = 600; // 10 minuti di cache in memoria ultra-rapida (RAM Google)

function doGet(e) {
  return handleRequest(e, "GET");
}

function doPost(e) {
  return handleRequest(e, "POST");
}

function handleRequest(e, method) {
  try {
    var params = e.parameter || {};
    var postData = {};
    if (e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (err) {
        postData = {};
      }
    }

    var token = (params.token || postData.token || "").toString().trim();
    var action = params.action || postData.action || "getAllData";
    var expectedToken = (SECURITY_TOKEN || "").toString().trim();

    // Verifica Token di Sicurezza Personale (tollerante a spazi e maiuscole/minuscole)
    if (expectedToken !== "" && token.toLowerCase() !== expectedToken.toLowerCase()) {
      return createJsonResponse({ 
        status: "error", 
        message: "Accesso negato: Token di sicurezza non corrispondente."
      }, 403);
    }

    var isForce = (params.force === "1" || params.force === "true" || params.nocache === "1");

    // 0. RISPOSTA ULTRA-RAPIDA DA CACHE (RAM SERVERLESS GOOGLE ~50ms)
    if (method === "GET" && (action === "getAllData" || action === "getTransactions") && !isForce) {
      var cachedJson = getJsonFromCache();
      if (cachedJson) {
        return createJsonResponseRaw(cachedJson);
      }
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. LETTURA CHIRURGICA OTTIMIZZATA (Movimenti + Saldi)
    if (action === "getAllData" || action === "getTransactions") {
      var movSheet = ss.getSheetByName("Movimenti");
      var saldiSheet = ss.getSheetByName("Saldi");

      var transactions = [];
      if (movSheet) {
        var lastRowMov = movSheet.getLastRow();
        if (lastRowMov > 1) {
          // Lettura chirurgica delle sole prime 10 colonne (A:J) fino all'ultima riga vera (elimina 25.000 celle vuote)
          var rows = movSheet.getRange(1, 1, lastRowMov, 10).getValues();
          for (var i = 1; i < rows.length; i++) {
            var r = rows[i];
            if (!r[3] && !r[7]) continue; // salta righe vuote

            var dateStr = parseDateString(r[3]);
            var amountNum = parseCurrency(r[7]);

            transactions.push({
              id: "tx_" + i,
              rowNumber: i + 1,
              year: String(r[0] || ""),
              week: String(r[1] || ""),
              month: String(r[2] || ""),
              date: dateStr,
              type: normalizeType(r[4]),
              rawType: String(r[4] || "Uscita"),
              fromAccount: String(r[5] || ""),
              toAccount: String(r[6] || ""),
              account: String(r[5] || "Buddybank"),
              amount: amountNum,
              category: String(r[8] || "❔Altro"),
              description: String(r[9] || "")
            });
          }
          // Ordina per più recenti
          transactions.reverse();
        }
      }

      var saldiList = [];
      if (saldiSheet) {
        var lastRowSaldi = saldiSheet.getLastRow();
        if (lastRowSaldi > 1) {
          // Lettura mirata delle prime 5 colonne (A:E) e delle sole righe con dati reali (da 26.000 a ~35 celle)
          var saldiRows = saldiSheet.getRange(1, 1, lastRowSaldi, 5).getValues();
          for (var s = 1; s < saldiRows.length; s++) {
            var sr = saldiRows[s];
            if (!sr[1] && !sr[3]) continue;
            saldiList.push({
              date: parseDateString(sr[0]),
              name: String(sr[1] || ""),
              type: String(sr[2] || ""),
              balance: parseCurrency(sr[3]),
              notes: String(sr[4] || "")
            });
          }
        }
      }

      var responseData = {
        status: "success",
        count: transactions.length,
        sheetName: ss.getName(),
        cachedAt: new Date().toISOString(),
        data: {
          transactions: transactions,
          saldi: saldiList
        }
      };

      var jsonOutput = JSON.stringify(responseData);
      // Salva in RAM Google per 10 minuti per servire le prossime chiamate a zero attesa
      saveJsonToCache(jsonOutput, CACHE_TTL_SECONDS);

      return createJsonResponseRaw(jsonOutput);
    }

    // 2. SCRITTURA NUOVO MOVIMENTO
    if (action === "addTransaction") {
      var movSheet = ss.getSheetByName("Movimenti");
      if (!movSheet) {
        movSheet = ss.insertSheet("Movimenti");
        movSheet.appendRow(["Anno", "Settimana", "Mese", "Data", "Tipo", "Conto origine", "Conto destinazione", "Importo", "Categoria", "Note"]);
      }

      var tx = postData.transaction || postData;
      var dateObj = tx.date ? new Date(tx.date) : new Date();
      var d = dateObj.getDate();
      var m = dateObj.getMonth() + 1;
      var y = dateObj.getFullYear();
      var formattedDate = (d < 10 ? "0" + d : d) + "/" + (m < 10 ? "0" + m : m) + "/" + y;

      var weekNum = getWeekNumber(dateObj);
      var formattedAmount = "€" + parseFloat(tx.amount || 0).toFixed(2).replace(".", ",");

      var tipoDisplay = "Uscita";
      if (tx.type === "income" || tx.type === "Entrata") tipoDisplay = "Entrata";
      else if (tx.type === "transfer" || tx.type === "Trasferimento" || tx.type === "Giroconto" || tx.type === "giroconto") tipoDisplay = "Trasferimento";

      movSheet.appendRow([
        y,
        weekNum,
        m,
        formattedDate,
        tipoDisplay,
        tx.account || tx.fromAccount || "Buddybank",
        tx.toAccount || "",
        formattedAmount,
        tx.category || "❔Altro",
        tx.description || ""
      ]);

      // Allineamento automatico Saldi per mantenere coerenza istantanea con i movimenti
      try {
        var saldiSheet = ss.getSheetByName("Saldi");
        if (saldiSheet) {
          var lastRowSaldi = saldiSheet.getLastRow();
          if (lastRowSaldi > 1) {
            var sRows = saldiSheet.getRange(1, 1, lastRowSaldi, 5).getValues();
            var updateSaldo = function(accName, deltaAmt) {
              if (!accName) return;
              var lower = String(accName).toLowerCase().trim();
              for (var k = 1; k < sRows.length; k++) {
                var rowAcc = String(sRows[k][1] || "").toLowerCase().trim();
                if (rowAcc === lower || rowAcc.indexOf(lower) !== -1 || lower.indexOf(rowAcc) !== -1) {
                  var curr = parseCurrency(sRows[k][3]);
                  var newB = Math.round((curr + deltaAmt) * 100) / 100;
                  saldiSheet.getRange(k + 1, 4).setValue("€" + newB.toFixed(2).replace(".", ","));
                  saldiSheet.getRange(k + 1, 1).setValue(formattedDate);
                  break;
                }
              }
            };

            var txAmt = parseFloat(tx.amount || 0);
            if (tipoDisplay === "Trasferimento") {
              updateSaldo(tx.account || tx.fromAccount, -txAmt);
              if (tx.toAccount) updateSaldo(tx.toAccount, txAmt);
            } else if (tipoDisplay === "Entrata") {
              updateSaldo(tx.account || tx.fromAccount, txAmt);
            } else if (tipoDisplay === "Uscita") {
              updateSaldo(tx.account || tx.fromAccount, -txAmt);
            }
          }
        }
      } catch (saldiErr) {
        // Non bloccare la scrittura del movimento se il foglio Saldi ha un formato custom
      }

      // Invalida cache in memoria all'istante
      clearAppCache();

      return createJsonResponse({
        status: "success",
        message: "Movimento aggiunto con successo al foglio!",
        rowNumber: movSheet.getLastRow()
      });
    }

    // 2.b MODIFICA MOVIMENTO ESISTENTE
    if (action === "updateTransaction") {
      var movSheet = ss.getSheetByName("Movimenti");
      var rowNum = parseInt(params.rowNumber || postData.rowNumber || 0, 10);
      var tx = postData.transaction || postData;

      if (movSheet && rowNum > 1 && rowNum <= movSheet.getLastRow()) {
        var dateObj = tx.date ? new Date(tx.date) : new Date();
        var d = dateObj.getDate();
        var m = dateObj.getMonth() + 1;
        var y = dateObj.getFullYear();
        var formattedDate = (d < 10 ? "0" + d : d) + "/" + (m < 10 ? "0" + m : m) + "/" + y;

        var weekNum = getWeekNumber(dateObj);
        var formattedAmount = "€" + parseFloat(tx.amount || 0).toFixed(2).replace(".", ",");

        var tipoDisplay = "Uscita";
        if (tx.type === "income" || tx.type === "Entrata") tipoDisplay = "Entrata";
        else if (tx.type === "transfer" || tx.type === "Trasferimento" || tx.type === "Giroconto" || tx.type === "giroconto") tipoDisplay = "Trasferimento";

        // Colonne: Anno, Settimana, Mese, Data, Tipo, Conto origine, Conto destinazione, Importo, Categoria, Note
        movSheet.getRange(rowNum, 1, 1, 10).setValues([[
          y,
          weekNum,
          m,
          formattedDate,
          tipoDisplay,
          tx.account || tx.fromAccount || "Buddybank",
          tx.toAccount || "",
          formattedAmount,
          tx.category || "❔Altro",
          tx.description || ""
        ]]);

        clearAppCache();

        return createJsonResponse({
          status: "success",
          message: "Movimento aggiornato con successo!",
          rowNumber: rowNum
        });
      }
      return createJsonResponse({ status: "error", message: "Numero riga non valido per aggiornamento." }, 400);
    }

    // 3. ELIMINAZIONE MOVIMENTO
    if (action === "deleteTransaction") {
      var movSheet = ss.getSheetByName("Movimenti");
      var rowNum = parseInt(params.rowNumber || postData.rowNumber || 0, 10);
      if (movSheet && rowNum > 1 && rowNum <= movSheet.getLastRow()) {
        movSheet.deleteRow(rowNum);
        clearAppCache();
        return createJsonResponse({ status: "success", message: "Movimento eliminato." });
      }
      return createJsonResponse({ status: "error", message: "Numero riga non valido." }, 400);
    }

    // 4. AGGIORNAMENTO SALDO DI UN CONTO (Scheda Saldi)
    if (action === "updateAccountBalance") {
      var saldiSheet = ss.getSheetByName("Saldi");
      var targetAccount = postData.accountName || params.accountName;
      var newBalance = parseFloat(postData.balance || params.balance || 0);

      if (saldiSheet && targetAccount) {
        var lastRowSaldi = saldiSheet.getLastRow();
        var updated = false;
        if (lastRowSaldi > 1) {
          var sRows = saldiSheet.getRange(1, 1, lastRowSaldi, 5).getValues();
          for (var k = 1; k < sRows.length; k++) {
            if (String(sRows[k][1]).toLowerCase() === targetAccount.toLowerCase()) {
              saldiSheet.getRange(k + 1, 4).setValue("€" + newBalance.toFixed(2).replace(".", ","));
              saldiSheet.getRange(k + 1, 1).setValue(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy"));
              updated = true;
              break;
            }
          }
        }
        if (!updated) {
          // Aggiunge nuova riga
          var todayStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy");
          saldiSheet.appendRow([todayStr, targetAccount, postData.type || "Liquidità", "€" + newBalance.toFixed(2).replace(".", ","), "Aggiunto da WebApp"]);
        }
        clearAppCache();
        return createJsonResponse({ status: "success", message: "Saldo aggiornato con successo." });
      }
    }

    return createJsonResponse({ status: "error", message: "Azione non riconosciuta: " + action }, 400);

  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  }
}

// === GESTIONE CACHE IN MEMORIA (RAM GOOGLE APPS SCRIPT) ===
function clearAppCache() {
  try {
    var cache = CacheService.getScriptCache();
    var countStr = cache.get(CACHE_KEY_PREFIX + "_chunks");
    if (countStr) {
      var count = parseInt(countStr, 10);
      var keys = [CACHE_KEY_PREFIX + "_chunks"];
      for (var i = 0; i < count; i++) {
        keys.push(CACHE_KEY_PREFIX + "_" + i);
      }
      cache.removeAll(keys);
    }
  } catch (e) {
    // Non bloccare se la cache fallisce
  }
}

function saveJsonToCache(jsonStr, ttlSeconds) {
  try {
    var cache = CacheService.getScriptCache();
    var CHUNK_SIZE = 95000; // Limite sicuro sotto i 100KB di Apps Script
    var numChunks = Math.ceil(jsonStr.length / CHUNK_SIZE);
    var entries = {};
    entries[CACHE_KEY_PREFIX + "_chunks"] = String(numChunks);
    for (var i = 0; i < numChunks; i++) {
      entries[CACHE_KEY_PREFIX + "_" + i] = jsonStr.substring(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
    }
    cache.putAll(entries, ttlSeconds || CACHE_TTL_SECONDS);
  } catch (e) {
    // Prosegue normalmente
  }
}

function getJsonFromCache() {
  try {
    var cache = CacheService.getScriptCache();
    var countStr = cache.get(CACHE_KEY_PREFIX + "_chunks");
    if (!countStr) return null;
    var count = parseInt(countStr, 10);
    var keys = [];
    for (var i = 0; i < count; i++) {
      keys.push(CACHE_KEY_PREFIX + "_" + i);
    }
    var chunks = cache.getAll(keys);
    var result = "";
    for (var j = 0; j < count; j++) {
      var c = chunks[CACHE_KEY_PREFIX + "_" + j];
      if (c === null || c === undefined) return null;
      result += c;
    }
    return result;
  } catch (e) {
    return null;
  }
}

function createJsonResponseRaw(jsonString) {
  var output = ContentService.createTextOutput(jsonString);
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// Helper per parsare valute tipo "€15,90", "€ 4.160,00", "4,50"
function parseCurrency(val) {
  if (typeof val === "number") return val;
  if (!val) return 0;
  var str = String(val).replace(/€/g, "").replace(/\s/g, "").trim();
  // Se ha sia punto che virgola (es. 4.160,00), rimuovi il punto e metti la virgola come punto
  if (str.indexOf(".") !== -1 && str.indexOf(",") !== -1) {
    str = str.replace(/\./g, "").replace(",", ".");
  } else if (str.indexOf(",") !== -1) {
    str = str.replace(",", ".");
  }
  var parsed = parseFloat(str);
  return isNaN(parsed) ? 0 : parsed;
}

// Helper per parsare stringhe di data
function parseDateString(val) {
  if (!val) return "";
  if (val instanceof Date) {
    return Utilities.formatDate(val, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  var s = String(val).trim();
  // Formato dd/MM/yyyy
  var parts = s.split("/");
  if (parts.length === 3) {
    var day = parts[0].padStart(2, "0");
    var month = parts[1].padStart(2, "0");
    var year = parts[2];
    return year + "-" + month + "-" + day;
  }
  return s;
}

function normalizeType(val) {
  var s = String(val || "").toLowerCase();
  if (s.indexOf("entrata") !== -1 || s.indexOf("income") !== -1) return "income";
  if (s.indexOf("trasferimento") !== -1 || s.indexOf("transfer") !== -1 || s.indexOf("girocont") !== -1) return "transfer";
  return "expense";
}

function getWeekNumber(d) {
  var target = new Date(d.valueOf());
  var dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
