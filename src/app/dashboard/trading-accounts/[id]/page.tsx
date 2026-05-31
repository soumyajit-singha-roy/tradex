'use client';

import { use, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, TrendingUp, TrendingDown, Table, Calendar } from 'lucide-react';
import Link from 'next/link';
import { SUBLEDGER_DATA, TRADING_ACCOUNTS } from '@/lib/data';
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedContainer';
import { GlassCard } from '@/components/shared/GlassCard';

export default function TradingAccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const accountId = resolvedParams.id;
  
  // Find account details
  const accountMeta = TRADING_ACCOUNTS.find(a => a.accountNumber === accountId) || {
    accountNumber: accountId,
    status: 'Active',
    broker: accountId.startsWith('ZZJ') ? 'Zerodha' : 'Angel One',
    segment: 'F&O',
    lastUpdated: '31-May-2026 03:30 PM'
  };

  // Collect data from all months for this account
  const accountData = useMemo(() => {
    let febData = SUBLEDGER_DATA.february.accounts?.find(a => a.id === accountId);
    let marchData = SUBLEDGER_DATA.march.accounts?.find(a => a.id === accountId);
    let aprilData = SUBLEDGER_DATA.april.accounts?.find(a => a.id === accountId);

    const totalPnl = (febData?.total || 0) + (marchData?.total || 0) + (aprilData?.total || 0);

    // Combine transactions
    const allTransactions = [
      ...(febData?.transactions || []),
      ...(marchData?.transactions || []),
      ...(aprilData?.transactions || [])
    ];

    return {
      totalPnl,
      febPnl: febData?.total || 0,
      marchPnl: marchData?.total || 0,
      aprilPnl: aprilData?.total || 0,
      transactions: allTransactions
    };
  }, [accountId]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-10">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/trading-accounts"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                  {accountId}
                </h1>
                <span className="px-2.5 py-1 rounded-full bg-[#91c46b]/10 text-[#91c46b] text-xs font-semibold uppercase tracking-wider">
                  {accountMeta.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {accountMeta.broker} • {accountMeta.segment} • Last updated: {accountMeta.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* Summary Cards */}
      <AnimatedContainer delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className={`w-4 h-4 ${accountData.totalPnl < 0 ? 'text-[#ef4444]' : 'text-[#91c46b]'}`} />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total MTM</span>
            </div>
            <p className={`text-2xl font-bold font-mono ${accountData.totalPnl < 0 ? 'text-[#ef4444]' : 'text-[#91c46b]'}`}>
              {formatCurrency(accountData.totalPnl)}
            </p>
          </GlassCard>
          <GlassCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">February PNL</span>
            </div>
            <p className={`text-xl font-bold font-mono ${accountData.febPnl < 0 ? 'text-[#ef4444]' : accountData.febPnl > 0 ? 'text-[#91c46b]' : 'text-gray-900'}`}>
              {formatCurrency(accountData.febPnl)}
            </p>
          </GlassCard>
          <GlassCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">March PNL</span>
            </div>
            <p className={`text-xl font-bold font-mono ${accountData.marchPnl < 0 ? 'text-[#ef4444]' : accountData.marchPnl > 0 ? 'text-[#91c46b]' : 'text-gray-900'}`}>
              {formatCurrency(accountData.marchPnl)}
            </p>
          </GlassCard>
          <GlassCard className="p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">April PNL</span>
            </div>
            <p className={`text-xl font-bold font-mono ${accountData.aprilPnl < 0 ? 'text-[#ef4444]' : accountData.aprilPnl > 0 ? 'text-[#91c46b]' : 'text-gray-900'}`}>
              {formatCurrency(accountData.aprilPnl)}
            </p>
          </GlassCard>
        </div>
      </AnimatedContainer>

      {/* Transaction List */}
      <AnimatedContainer delay={0.2}>
        <GlassCard className="overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-2 bg-white">
            <Table className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-900">Detailed Transaction History</h3>
          </div>
          
          <div className="overflow-x-auto">
            {accountData.transactions.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {accountData.transactions.map((txn, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-sm font-mono text-gray-700">
                        {txn.date}
                      </td>
                      <td className={`py-4 px-6 text-sm font-mono text-right font-medium ${txn.amount < 0 ? 'text-[#ef4444]' : 'text-[#91c46b]'}`}>
                        {txn.amount > 0 ? '+' : ''}{formatCurrency(txn.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p>No detailed transactions found for this account.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </AnimatedContainer>
    </div>
  );
}
