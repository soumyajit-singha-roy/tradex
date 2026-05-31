'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { TRANSACTION_HISTORY } from '@/lib/data';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
export default function LedgerPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = TRANSACTION_HISTORY.filter(t =>
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatNumberOnly = (value: number): string => {
    const isNegative = value < 0;
    const absValue = Math.abs(value);
    const formatted = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(absValue);
    return `${isNegative ? '-' : ''}${formatted}`;
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Ledger</h1>
            <p className="text-xs text-gray-500 mt-0.5">Transaction history and account ledger</p>
          </div>
          <a href="/dashboard/subledger" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors self-start sm:self-auto">
            View Subledger
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        </div>
      </AnimatedContainer>

      {/* Transaction History */}
      <AnimatedContainer delay={0.1}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Transaction History</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">All ledger entries and settlements</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/30 transition-all"
            />
          </div>
        </div>

        <GlassCard className="overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
            <span>Date</span>
            <span className="col-span-2">Description</span>
            <span className="text-right">Debit</span>
            <span className="text-right">Credit</span>
            <span className="text-right">Balance</span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/[0.04]">
            {filteredTransactions.map((txn, index) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xs text-gray-500">
                  <span className="md:hidden text-gray-600 mr-2">Date:</span>
                  {txn.date}
                </span>
                <span className="text-xs text-gray-600 col-span-2">
                  <span className="md:hidden text-gray-600 mr-2">Desc:</span>
                  {txn.description}
                </span>
                <span className="text-xs text-right font-mono">
                  <span className="md:hidden text-gray-600 mr-2 font-sans">Debit:</span>
                  {txn.debit ? (
                    <span className="text-[#EF4444]">{formatNumberOnly(txn.debit)}</span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </span>
                <span className="text-xs text-right font-mono">
                  <span className="md:hidden text-gray-600 mr-2 font-sans">Credit:</span>
                  {txn.credit ? (
                    <span className="text-[#91c46b]">{formatNumberOnly(txn.credit)}</span>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </span>
                <span className="text-xs text-right font-mono text-gray-900 font-semibold">
                  <span className="md:hidden text-gray-600 mr-2 font-sans">Balance:</span>
                  {formatNumberOnly(txn.balance)}
                </span>
              </motion.div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No transactions found</p>
            </div>
          )}
        </GlassCard>
      </AnimatedContainer>
    </div>
  );
}
