/**
 * Google Apps Script Web App Template (Google Sheets Backend)
 * 
 * ISTRUZIONI DI INSTALLAZIONE:
 * 1. Apri il tuo foglio Google Sheets "Finanze-Movimenti"
 * 2. Clicca su: Estensioni > Apps Script
 * 3. Incolla questo intero codice nel file Codice.gs
 * 4. Clicca su "Esegui distribuzione" (Deploy) > "Nuova distribuzione" (New deployment)
 * 5. Seleziona tipo: "Applicazione web" (Web app)
 * 6. Configura:
 *    - Descrizione: Finanze WebApp Backend
 *    - Esegui come: "Io" (il tuo account Google)
 *    - Chi ha accesso: "Chiunque" (oppure con token segreto di sicurezza configurato qui sotto)
 * 7. Clicca su "Distribuisci", autorizza i permessi e copia l'URL dell'applicazione web!
 */

// Sostituisci questo token con una chiave segreta a tua scelta per proteggere l'accesso
var SECURITY_TOKEN = "CHIAVE_SEGRETA_PERSONALE_2026";

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

    var token = params.token || postData.token;
    var action = params.action || postData.action || "getTransactions";

    // Verifica Token di Sicurezza Personale
    if (SECURITY_TOKEN && SECURITY_TOKEN !== "" && token !== SECURITY_TOKEN) {
      return createJsonResponse({ status: "error", message: "Accesso negato: Token di sicurezza non valido." }, 403);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Movimenti");

    // Crea automaticamente il foglio "Movimenti" se non esiste
    if (!sheet) {
      sheet = ss.insertSheet("Movimenti");
      sheet.appendRow(["ID", "Data", "Descrizione", "Categoria", "Tipo", "Importo", "Conto", "Timestamp"]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#F5F5F7");
      sheet.setFrozenRows(1);
    }

    if (action === "getTransactions" || action === "read") {
      var rows = sheet.getDataRange().getValues();
      var transactions = [];

      // Salta l'intestazione (riga 0)
      for (var i = 1; i < rows.length; i++) {
        var r = rows[i];
        if (!r[0] && !r[2]) continue; // salta righe vuote

        var dateVal = r[1];
        var dateFormatted = "";
        if (dateVal instanceof Date) {
          dateFormatted = Utilities.formatDate(dateVal, Session.getScriptTimeZone(), "yyyy-MM-dd");
        } else {
          dateFormatted = String(dateVal);
        }

        transactions.push({
          id: String(r[0] || "tx_" + i),
          date: dateFormatted,
          description: String(r[2] || ""),
          category: String(r[3] || "Altro"),
          type: String(r[4] || "expense").toLowerCase(),
          amount: parseFloat(r[5]) || 0,
          account: String(r[6] || "Conto Principale")
        });
      }

      // Ordina per data decrescente
      transactions.reverse();

      return createJsonResponse({
        status: "success",
        count: transactions.length,
        sheetName: ss.getName(),
        data: transactions
      });
    }

    if (action === "addTransaction" || action === "write") {
      var tx = postData.transaction || postData;
      if (!tx || !tx.amount || !tx.description) {
        return createJsonResponse({ status: "error", message: "Dati transazione mancanti (amount, description)." }, 400);
      }

      var newId = tx.id || "tx_" + new Date().getTime();
      var now = new Date();

      sheet.appendRow([
        newId,
        tx.date || Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd"),
        tx.description,
        tx.category || "Altro",
        (tx.type || "expense").toLowerCase(),
        parseFloat(tx.amount),
        tx.account || "Conto Principale",
        now.toISOString()
      ]);

      return createJsonResponse({
        status: "success",
        message: "Movimento registrato con successo su Google Sheets!",
        transactionId: newId
      });
    }

    if (action === "deleteTransaction" || action === "delete") {
      var targetId = params.id || postData.id;
      if (!targetId) {
        return createJsonResponse({ status: "error", message: "ID transazione mancante." }, 400);
      }

      var dataRange = sheet.getDataRange().getValues();
      var deleted = false;

      for (var j = 1; j < dataRange.length; j++) {
        if (String(dataRange[j][0]) === String(targetId)) {
          sheet.deleteRow(j + 1);
          deleted = true;
          break;
        }
      }

      return createJsonResponse({
        status: deleted ? "success" : "not_found",
        message: deleted ? "Movimento eliminato dal foglio." : "Movimento non trovato nel foglio."
      });
    }

    return createJsonResponse({ status: "error", message: "Azione non supportata: " + action }, 400);

  } catch (err) {
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  }
}

function createJsonResponse(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
