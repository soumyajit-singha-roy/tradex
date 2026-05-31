'use client';

import { useState, useMemo } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { SUBLEDGER_DATA } from '@/lib/data';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { GlassCard } from '@/components/shared/GlassCard';
import { formatCurrency } from '@/lib/formatters';

const YEARS = ['2025', '2026', '2027'] as const;
const MONTHS = ['February', 'March', 'April'] as const;

type YearType = typeof YEARS[number];
type MonthType = typeof MONTHS[number];

export default function SubledgerPage() {
  const [selectedYear, setSelectedYear] = useState<YearType>('2026');
  const [selectedMonth, setSelectedMonth] = useState<MonthType>('March');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');

  const getMonthKey = (month: MonthType) => {
    switch (month) {
      case 'February': return 'february';
      case 'March': return 'march';
      case 'April': return 'april';
    }
  };

  const monthKey = getMonthKey(selectedMonth);
  // We only have data for 2026 in our current dataset
  const monthlyData = selectedYear === '2026' ? SUBLEDGER_DATA[monthKey] : null;

  const accounts = useMemo(() => {
    return monthlyData?.accounts || [];
  }, [monthlyData]);

  // If the selected account is not in the new month's list, reset it (or keep it if we want it to persist, but better to clear or validate)
  const activeAccount = useMemo(() => {
    return accounts.find(a => a.id === selectedAccountId) || null;
  }, [accounts, selectedAccountId]);

  const formatAmount = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '—';
    return formatCurrency(Math.abs(val));
  };

  const dynamicSubtitle = useMemo(() => {
    if (!activeAccount || !activeAccount.transactions) return '';
    const dateRegex = /\d{2}[\.\-]\d{2}[\.\-]\d{4}/;

    // Prioritize BY MARGIN to TO MARGIN
    // @ts-expect-error - description may not exist on all transactions
    const byMarginTxn = activeAccount.transactions.find(t => t.description?.toUpperCase().includes('BY MARGIN'));
    // @ts-expect-error - description may not exist on all transactions
    const toMarginTxn = activeAccount.transactions.find(t => t.description?.toUpperCase().includes('TO MARGIN'));

    if (byMarginTxn && toMarginTxn && dateRegex.test(byMarginTxn.date) && dateRegex.test(toMarginTxn.date)) {
      return `${byMarginTxn.date.replace(/\./g, '-')} to ${toMarginTxn.date.replace(/\./g, '-')}`;
    }

    const validDates = activeAccount.transactions
      .filter(t => dateRegex.test(t.date))
      .map(t => t.date.replace(/\./g, '-'));
      
    if (validDates.length === 0) {
      // @ts-expect-error - subtitle may not exist on activeAccount
      return activeAccount.subtitle || '';
    }
    if (validDates.length === 1) return validDates[0];
    return `${validDates[0]} to ${validDates[validDates.length - 1]}`;
  }, [activeAccount]);

  const enrichedTransactions = useMemo(() => {
    if (!activeAccount || !activeAccount.transactions) return [];
    let runningBalance = 0;
    return activeAccount.transactions.map(txn => {
      // We only calculate running balance for real transactions, 
      // not summary rows like 'TOTAL' or 'March PNL'
      
      // Update running balance if it's a real transaction, or if it explicitly has amount
      runningBalance += txn.amount;
      
      return {
        ...txn,
        calculatedBalance: runningBalance
      };
    });
  }, [activeAccount]);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
              Subledger
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Detailed monthly calculations and transaction logs</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Statement
          </button>
        </div>
      </AnimatedContainer>

      {/* Cascading Filters */}
      <AnimatedContainer delay={0.1}>
        <GlassCard className="p-4">
          <div className="flex flex-wrap items-end gap-6">
            
            <div className="space-y-1.5 flex-1 min-w-[150px]">
              <label htmlFor="year-select" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Financial Year
              </label>
              <div className="relative">
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value as YearType);
                    setSelectedAccountId(''); // Reset account on year change
                  }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:border-[#3b82f6]/40 transition-all cursor-pointer appearance-none"
                >
                  {YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-[150px]">
              <label htmlFor="month-select" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Month
              </label>
              <div className="relative">
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value as MonthType);
                    setSelectedAccountId(''); // Reset account on month change
                  }}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:border-[#3b82f6]/40 transition-all cursor-pointer appearance-none"
                >
                  {MONTHS.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 flex-1 min-w-[200px]">
              <label htmlFor="account-select" className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Trading Account
              </label>
              <div className="relative">
                <select
                  id="account-select"
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(e.target.value)}
                  disabled={accounts.length === 0}
                  className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 text-gray-900 text-sm font-semibold rounded-lg shadow-sm focus:outline-none focus:border-[#3b82f6]/40 transition-all cursor-pointer appearance-none disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="" disabled>Select an account</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>{account.id}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </GlassCard>
      </AnimatedContainer>

      {/* Account Data Display */}
      <AnimatedContainer delay={0.2} className="space-y-6">
        {!selectedAccountId ? (
          <div className="p-16 flex flex-col items-center justify-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm font-medium">Please select an account to view its subledger.</p>
          </div>
        ) : !activeAccount ? (
          <div className="p-12 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">No transaction logs available for this account in {selectedMonth} {selectedYear}.</p>
          </div>
        ) : (
          <GlassCard className="overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-white/50 flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold text-gray-900 font-mono tracking-wider">{activeAccount.id}</h2>
              {dynamicSubtitle && (
                <p className="text-sm font-semibold text-gray-500 mt-1 uppercase">{dynamicSubtitle}</p>
              )}
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <span>Date</span>
              <span className="col-span-2">Description</span>
              <span className="text-right">Debit</span>
              <span className="text-right">Credit</span>
              <span className="text-right">Balance</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/[0.04]">
              {enrichedTransactions.map((txn, index) => {
                const isDebit = txn.amount < 0;
                const isCredit = txn.amount > 0;
                
                return (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 px-6 py-3 hover:bg-gray-50/80 transition-colors bg-white items-center"
                  >
                    <span className="text-xs text-gray-600 font-medium">
                      <span className="md:hidden text-gray-400 mr-2 text-[10px] uppercase">Date:</span>
                      {txn.date}
                    </span>
                    <span className="text-xs text-gray-800 col-span-2 font-medium">
                      <span className="md:hidden text-gray-400 mr-2 text-[10px] uppercase">Desc:</span>
                      {/* @ts-ignore */}
                      {txn.description || (txn.date.toUpperCase().includes('TOTAL') ? '' : 'BILL FNO')}
                    </span>
                    <span className="text-xs text-right font-mono font-semibold">
                      <span className="md:hidden text-gray-400 mr-2 text-[10px] uppercase font-sans">Debit:</span>
                      {isDebit ? (
                        <span className="text-[#EF4444]">{formatAmount(txn.amount)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </span>
                    <span className="text-xs text-right font-mono font-semibold">
                      <span className="md:hidden text-gray-400 mr-2 text-[10px] uppercase font-sans">Credit:</span>
                      {isCredit ? (
                        <span className="text-[#91c46b]">{formatAmount(txn.amount)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </span>
                    <span className="text-xs text-right font-mono text-gray-900 font-bold">
                      <span className="md:hidden text-gray-400 mr-2 text-[10px] uppercase font-sans">Balance:</span>
                      {formatAmount(txn.calculatedBalance)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer Total */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-wider col-span-3">
                Closing Balance
              </span>
              <span className="text-xs text-right font-mono font-bold text-gray-900 hidden md:block"></span>
              <span className="text-xs text-right font-mono font-bold text-gray-900 hidden md:block"></span>
              <span className={`text-sm text-right font-mono font-bold ${activeAccount.total < 0 ? 'text-[#EF4444]' : 'text-[#91c46b]'}`}>
                <span className="md:hidden text-gray-500 mr-2 text-[10px] uppercase font-sans">Total:</span>
                {formatAmount(activeAccount.total)}
              </span>
            </div>
          </GlassCard>
        )}
      </AnimatedContainer>
    </div>
  );
}
