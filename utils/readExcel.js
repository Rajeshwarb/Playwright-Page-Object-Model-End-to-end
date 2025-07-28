const path = require('path');
const ExcelJS = require('exceljs');
const fs = require('fs');
async function readExcel(filePath, sheetName) {
    const resolvedPath = path.resolve(filePath);
    if (!fs.existsSync(resolvedPath)) {
        throw new Error(`File not found: ${resolvedPath}`);
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(resolvedPath);
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
        throw new Error(`Sheet "${sheetName}" not found in file: ${filePath}`);
    }
    const headers = [];
    worksheet.getRow(1).eachCell(cell => headers.push(cell.value));
    const records = [];
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header
        const rowData = {};
        headers.forEach((header, colIndex) => {
            rowData[header] = row.getCell(colIndex + 1).value;
        });
        records.push(rowData);
    });
    return records;
}

module.exports = { readExcel };