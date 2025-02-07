/**
 * The doPost function appends rows of data to a specified Google Sheets sheet.
 * It expects a JSON payload with the data to be appended and the target sheet name.
 *
 * Example payload:
 * {
 *   "sheetName": "Sheet1",
 *   "data": [
 *     ["Alice", 25, "New York"],
 *     ["Bob", 30, "Los Angeles"],
 *     ["Charlie", 35, "Chicago"]
 *   ]
 * }
 *
 * @param {Object} e The event object that contains the POST request data.
 * @returns {GoogleAppsScript.Content.TextOutput} A response indicating success or failure.
 */
function doPost(e) {
  try {
    // Parse the incoming JSON payload
    var payload = JSON.parse(e.postData.contents);
    var sheetName = payload.sheetName;
    var data = JSON.parse(payload.data);

    // Open the active spreadsheet and get the target sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(sheetName);
    
    // If the sheet does not exist, create it
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }
    
    // Find the next available row
    var lastRow = sheet.getLastRow();
    var startRow = lastRow + 1;
    
    // Append the new data
    sheet.getRange(startRow, 1, data.length, data[0].length).setValues(data);

    // Return a success response
    return ContentService.createTextOutput('Data appended successfully').setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    // Handle errors and return a failure response
    return ContentService.createTextOutput('Error: ' + error.message).setMimeType(ContentService.MimeType.TEXT);
  }
}
