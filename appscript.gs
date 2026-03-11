var SHEET_ID   = "1eWGvYNCXvwznOae2lGxvwZ_q6rtEfb50kFWbmWErf8c";
var SHEET_NAME = "Leads";

var HEADERS = [
  "Date", "Type", "Référence", "Titre du bien", "Ville",
  "Catégorie", "Transaction", "Prix",
  "UTM Source", "UTM Medium", "UTM Campaign", "UTM Content", "UTM Term",
  "GCLID", "Page URL", "Source"
];

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#1a3c6e")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    var raw  = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(raw);
    var ss   = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.getSheets()[0];
      sheet.setName(SHEET_NAME);
    }
    ensureHeaders(sheet);
    sheet.appendRow([
      data.timestamp      || new Date().toISOString(),
      data.type           || "",
      data.property_ref   || "",
      data.property_title || "",
      data.city           || "",
      data.category       || "",
      data.transaction    || "",
      data.price          || "",
      data.utm_source     || "",
      data.utm_medium     || "",
      data.utm_campaign   || "",
      data.utm_content    || "",
      data.utm_term       || "",
      data.gclid          || "",
      data.page_url       || "",
      data.source         || "mecalus-site",
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Mecalus Leads Script — OK")
    .setMimeType(ContentService.MimeType.TEXT);
}

function testDoPost() {
  var e = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        type: "test",
        source: "debug",
        city: "Marrakech",
        page_url: "http://localhost:5173"
      })
    }
  };
  var result = doPost(e);
  Logger.log(result.getContent());
}
