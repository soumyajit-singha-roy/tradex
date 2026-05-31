const xlsx = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '..', 'DHARMESHBHAI (1).xlsx');
const workbook = xlsx.readFile(filePath);

const aprSheet = workbook.Sheets['APRIL AFTER CHARGES'];
const aprData = xlsx.utils.sheet_to_json(aprSheet, { header: 1, raw: true });

console.log('Sheet Names:', workbook.SheetNames);

console.log('=== APRIL AFTER CHARGES - ALL ROWS ===');
for (let r = 0; r < aprData.length; r++) {
  const row = aprData[r];
  if (!row || row.length === 0) { console.log(`Row ${r}: [empty]`); continue; }
  // Only print first 5 columns for readability  
  const preview = row.slice(0, 6).map(v => v === null || v === undefined ? 'null' : v);
  console.log(`Row ${r}: ${JSON.stringify(preview)} ... (${row.length} cols)`);
}

// Also print FEB to double-check
const febSheet = workbook.Sheets['FEB AFTER CHARGES'];
const febData = xlsx.utils.sheet_to_json(febSheet, { header: 1, raw: true });
console.log('\n=== FEB AFTER CHARGES - ALL ROWS ===');
for (let r = 0; r < febData.length; r++) {
  const row = febData[r];
  if (!row || row.length === 0) { console.log(`Row ${r}: [empty]`); continue; }
  const preview = row.slice(0, 5).map(v => v === null || v === undefined ? 'null' : v);
  console.log(`Row ${r}: ${JSON.stringify(preview)} ... (${row.length} cols)`);
}
