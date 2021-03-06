function onSheetEdit(e) {
  updateUpdatedAtColumn(e);
  notifyBuilder();
}

function updateUpdatedAtColumn(e) {
  const sheetName = "products";
  const updatedAtColumnIndex = 7;
  const updatedAtColumnLetter = "G";
  const headerRowIndex = 1;
  const primaryColumnLetter = "A"; // If this column is empty, we assume the row is empty.

  const range = e.range;
  const sheet = range.getSheet();
  const row = range.getRow();
  const column = range.getColumn();
  const primaryValue = sheet.getRange(primaryColumnLetter + row.toString());

  if (sheet.getName() !== sheetName) return;
  if (column == updatedAtColumnIndex) return;
  if (row == headerRowIndex) return;
  if (primaryValue.isBlank()) return;

  const time = new Date().getTime();
  const dateModifiedRange = sheet.getRange(
    updatedAtColumnLetter + row.toString()
  );
  return dateModifiedRange.setValue(time);
}

function notifyBuilder() {
  // Debounce here
  const time = new Date().getTime();
  const SCRIPT_LAST_CALLED_AT = "SCRIPT_LAST_CALLED_AT";

  const properties = PropertiesService.getScriptProperties();
  properties.setProperty(SCRIPT_LAST_CALLED_AT, time);

  Utilities.sleep(10000);

  const newTime = properties.getProperty(SCRIPT_LAST_CALLED_AT);

  if (newTime != time) return;

  return makeRequestToBuilder();
}

function makeRequestToBuilder() {
  const properties = PropertiesService.getScriptProperties();

  const options = {
    method: "get",
    headers: {
      CLIENT_SECRET: properties.getProperty("CLIENT_SECRET")
    }
  };

  const response = UrlFetchApp.fetch(
    "https://us-central1-sheets-as-cms.cloudfunctions.net/builder/",
    options
  );
  Logger.log("SUCCESS", response.getResponseCode());
}
