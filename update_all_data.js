const fs = require('fs');
const path = require('path');

const parsed = JSON.parse(fs.readFileSync(path.join(__dirname, 'parsed_data.json'), 'utf-8'));

function marginToAmount(marginStr) {
  if (!marginStr) return 0;
  const s = String(marginStr).toUpperCase();
  if (s === '2CR') return 20000000;
  if (s === '1CR') return 10000000;
  return 0;
}

function buildAccount(account, monthKey) {
  // February has no margin
  if (monthKey === 'february') {
    account.margin = '';
  }
  
  const margin = marginToAmount(account.margin);
  const txns = account.transactions.filter(t => /^\d{2}\.\d{2}\.\d{4}$/.test(String(t.date)));
  
  const result = [];
  
  let firstDate = '31.03.2026'; // Default for April
  let lastDate = '28.04.2026'; // Default for April
  
  if (monthKey === 'february') {
    firstDate = '01.02.2026';
    lastDate = '28.02.2026';
  } else if (monthKey === 'march') {
    firstDate = '25.02.2026';
    lastDate = '31.03.2026';
  }

  if (txns.length > 0) {
    firstDate = monthKey === 'april' ? '31.03.2026' : (monthKey === 'march' ? '25.02.2026' : txns[0].date);
    lastDate = monthKey === 'april' ? '28.04.2026' : txns[txns.length - 1].date;
  }
  
  if (margin > 0 || txns.length > 0) {
    // BY MARGIN (not for February since margin is 0)
    if (margin > 0) {
      result.push({ date: firstDate, description: 'BY MARGIN', amount: margin });
    }
    
    // BILL FNO
    txns.forEach(t => {
      result.push({ date: t.date, description: 'BILL FNO', amount: Math.round(t.amount * 100) / 100 });
    });
    
    const billTotal = txns.reduce((sum, t) => sum + t.amount, 0);
    
    // TO MARGIN / TO PNL TRF
    if (margin > 0) {
      result.push({ date: lastDate, description: 'TO MARGIN', amount: -margin });
      const remainder = billTotal;
      if (Math.abs(remainder) > 0.01) {
        result.push({ date: lastDate, description: 'TO PNL TRF A/C DHARMESH', amount: Math.round(-remainder * 100) / 100 });
      }
    } else if (Math.abs(billTotal) > 0.01) {
      // If no margin but there's a bill (like February), we transfer to PNL to close the month
       result.push({ date: lastDate, description: 'TO PNL TRF A/C DHARMESH', amount: Math.round(-billTotal * 100) / 100 });
    }
  } // closing brace for if (margin > 0 || txns.length > 0)

  const finalTotal = result.reduce((sum, t) => sum + t.amount, 0);
  return { id: account.id, margin: account.margin || '', total: Math.round(finalTotal * 100) / 100, transactions: result };
}

// Build all months
const months = {};
for (const [monthKey, monthData] of Object.entries(parsed)) {
  const accounts = [];
  
  // First, map existing accounts from the parsed data
  const existingAccounts = {};
  for (const [, accountData] of Object.entries(monthData)) {
    existingAccounts[accountData.id] = accountData;
  }
  
  // Also ensure ZZJ accounts are processed if they exist
  for (const accId of Object.keys(existingAccounts)) {
    if (!accId.startsWith('ANU')) {
      const built = buildAccount(existingAccounts[accId], monthKey);
      if (built.id) accounts.push(built);
    }
  }

  // Generate ANU0101 to ANU0150 explicitly
  for (let i = 1; i <= 50; i++) {
    const accId = `ANU01${i.toString().padStart(2, '0')}`;
    let accountData = existingAccounts[accId];
    
    // If it doesn't exist, create an empty shell
    if (!accountData) {
      accountData = { id: accId, margin: '', transactions: [], total: 0 };
    }
    
    // Override ANU0128, ANU0129, ANU0130 to have 2CR margin
    if (['ANU0128', 'ANU0129', 'ANU0130'].includes(accId)) {
      accountData.margin = '2CR';
    }
    
    // ANU0131 to ANU0150 will just be blank (margin: '') and have no transactions unless they already did in the sheet
    if (i > 30) {
      // make sure margin is empty if not set
      if (!accountData.margin) accountData.margin = '';
    }
    
    const built = buildAccount(accountData, monthKey);
    accounts.push(built);
  }
  
  months[monthKey] = accounts;
}

// Now read data.ts and replace SUBLEDGER_DATA
const dataFilePath = path.join(__dirname, 'src', 'lib', 'data.ts');
const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

// Find where SUBLEDGER_DATA starts and ends
const startMarker = 'export const SUBLEDGER_DATA = {';
const startIdx = fileContent.indexOf(startMarker);
if (startIdx === -1) { console.error('Could not find SUBLEDGER_DATA'); process.exit(1); }

// Find matching closing brace + semicolon
let braceCount = 0;
let endIdx = -1;
let inString = false;
let escapeNext = false;
for (let i = startIdx + startMarker.length - 1; i < fileContent.length; i++) {
  const ch = fileContent[i];
  if (escapeNext) { escapeNext = false; continue; }
  if (ch === '\\') { escapeNext = true; continue; }
  if (ch === '"' || ch === "'") {
    if (!inString) inString = ch;
    else if (inString === ch) inString = false;
    continue;
  }
  if (inString) continue;
  if (ch === '{') braceCount++;
  if (ch === '}') {
    braceCount--;
    if (braceCount === 0) {
      let j = i + 1;
      while (j < fileContent.length && (fileContent[j] === ' ' || fileContent[j] === '\n' || fileContent[j] === '\r')) j++;
      if (fileContent[j] === ';') endIdx = j + 1;
      else endIdx = i + 1;
      break;
    }
  }
}

if (endIdx === -1) { console.error('Could not find end of SUBLEDGER_DATA'); process.exit(1); }

// Generate replacement
let replacement = 'export const SUBLEDGER_DATA = {\n';

// February
replacement += '  february: {\n    accounts: [\n';
for (const acc of months.february || []) {
  replacement += `      {\n        id: '${acc.id}',\n        margin: '${acc.margin}',\n        total: ${acc.total},\n        transactions: [\n`;
  for (const t of acc.transactions) {
    replacement += `          { date: '${t.date}', description: '${t.description}', amount: ${t.amount} },\n`;
  }
  replacement += '        ],\n      },\n';
}
replacement += '    ],\n';
replacement += '    summary: {\n      pnl: -126156.79,\n      ledgerDebit: -2651.99,\n      softwareCharges: -10620.00,\n      interestCharges: -115068.49,\n      total: -254497.27,\n    },\n  },\n';

// March
replacement += '  march: {\n    accounts: [\n';
for (const acc of months.march || []) {
  replacement += `      {\n        id: '${acc.id}',\n        margin: '${acc.margin}',\n        total: ${acc.total},\n        transactions: [\n`;
  for (const t of acc.transactions) {
    replacement += `          { date: '${t.date}', description: '${t.description}', amount: ${t.amount} },\n`;
  }
  replacement += '        ],\n      },\n';
}
replacement += '    ],\n';
replacement += '    summary: {\n      pnl: -10429381.06,\n      ledgerDebit: -26606.18,\n      softwareCharges: -187620.00,\n      interestCharges: -5095890.41,\n      total: -15739497.65,\n    },\n  },\n';

// April 
replacement += '  april: {\n    accounts: [\n';
for (const acc of months.april || []) {
  replacement += `      {\n        id: '${acc.id}',\n        margin: '${acc.margin}',\n        total: ${acc.total},\n        transactions: [\n`;
  for (const t of acc.transactions) {
    replacement += `          { date: '${t.date}', description: '${t.description}', amount: ${t.amount} },\n`;
  }
  replacement += '        ],\n      },\n';
}
replacement += '    ],\n';
replacement += '    summary: {\n      pnl: 0,\n      ledgerDebit: 0,\n      softwareCharges: -177000.00,\n      interestCharges: -5095890.00,\n      total: -5272890.00,\n    },\n';
replacement += '    note: "SOFTWARE CHARGES APPROVED AS REDUCED FROM 1695+GST PER CTCL",\n  },\n';

// Calculation
replacement += '  calculation: {\n    totalMtm: -21266885.34,\n    tdsPaid: -22019.00,\n    interestUnsecuredLoan: -198173.00,\n    grandTotal: -21487077.34,\n    openingBalance: 20000000.00,\n    closingBalance: -1266885.35,\n  },\n';
replacement += '};\n';

const newContent = fileContent.substring(0, startIdx) + replacement + fileContent.substring(endIdx);
fs.writeFileSync(dataFilePath, newContent);

console.log('Successfully updated data.ts with no margin for Feb and only by margin for Apr!');
