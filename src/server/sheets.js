const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = (sheetIndex) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

export const setCurrentCellValues = (value) => {

    if(Array.isArray(value)){
        const sheet = SpreadsheetApp.getActiveSheet()
        const cell = sheet.getActiveCell();

        //the row number of the cell that was edited
        const row = cell.getRow();

        //the column number of the cell that was edited
        const column = cell.getColumn();
        
        const range = sheet.getRange(row, column, 1, value.length).setValues([value])

    }else{
        const cell = SpreadsheetApp.getActiveSheet().getCurrentCell().setValue(value);
    }
}
