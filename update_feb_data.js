const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '..', 'DHARMESHBHAI.xlsx');
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets['FEB AFTER CHARGES'];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const headerRow = data[0]; // First item is 'Date', next are account IDs
const accountsMap = new Map();

for (let i = 1; i < headerRow.length; i++) {
  const accountId = headerRow[i];
  if (accountId) {
    accountsMap.set(i, { id: accountId, total: 0, transactions: [] });
  }
}

// Sum logic from row 1 to end
for (let rowIdx = 1; rowIdx < data.length; rowIdx++) {
  const row = data[rowIdx];
  const dateStr = row[0];
  if (!dateStr || dateStr === 'TOTAL' || dateStr.toString().toLowerCase().includes('total')) continue;

  for (let colIdx = 1; colIdx < headerRow.length; colIdx++) {
    if (accountsMap.has(colIdx)) {
      const amount = row[colIdx] || 0;
      if (amount !== 0) { 
         accountsMap.get(colIdx).transactions.push({ date: dateStr, amount: amount });
      }
      accountsMap.get(colIdx).total += amount;
    }
  }
}

const accountsArray = Array.from(accountsMap.values());
const accountsJson = JSON.stringify(accountsArray, null, 6);

// Now update data.ts
const dataTsPath = path.join(__dirname, 'src', 'lib', 'data.ts');
let content = fs.readFileSync(dataTsPath, 'utf8');

// We need to replace the february.accounts array.
const blockStartIndex = content.indexOf('february: {');
if (blockStartIndex === -1) throw new Error("Could not find february: { in data.ts");

const accountsStartIndex = content.indexOf('accounts: [', blockStartIndex);
if (accountsStartIndex === -1) throw new Error("Could not find accounts: [ in block");

const summaryStartIndex = content.indexOf('summary: {', accountsStartIndex);
if (summaryStartIndex === -1) throw new Error("Could not find summary: { after accounts");

// Format it properly
const prefix = content.substring(0, accountsStartIndex);
const suffix = content.substring(summaryStartIndex);

const newAccountsString = `accounts: ${accountsJson},\n    `;

const newContent = prefix + newAccountsString + suffix;
fs.writeFileSync(dataTsPath, newContent, 'utf8');
console.log("Successfully updated data.ts with February transactions!");
