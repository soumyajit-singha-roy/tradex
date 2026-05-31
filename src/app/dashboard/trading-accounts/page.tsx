'use client';

import { useState } from 'react';
import { Briefcase, Search, Filter } from 'lucide-react';
import { TRADING_ACCOUNTS } from '@/lib/data';
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedContainer';

export default function TradingAccountsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBroker, setFilterBroker] = useState('all');

  const filteredAccounts = TRADING_ACCOUNTS.filter(account => {
    const matchesSearch = account.accountNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBroker = filterBroker === 'all' || account.broker === filterBroker;
    return matchesSearch && matchesBroker;
  });

  const brokers = [...new Set(TRADING_ACCOUNTS.map(a => a.broker))];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Trading Accounts</h1>
            <p className="text-xs text-gray-500 mt-0.5">{TRADING_ACCOUNTS.length} registered trading accounts</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accounts..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/30 transition-all"
              />
            </div>
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={filterBroker}
                onChange={(e) => setFilterBroker(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 appearance-none focus:outline-none focus:border-[#3b82f6]/30 transition-all cursor-pointer"
              >
                <option value="all">All Brokers</option>
                {brokers.map(broker => (
                  <option key={broker} value={broker}>{broker}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* Accounts List Grid (Shows account numbers in compact responsive grid format, no details, non-clickable) */}
      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3" staggerDelay={0.015}>
        {filteredAccounts.map((account) => (
          <StaggerItem key={account.id}>
            <div className="flex items-center gap-2.5 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <div className="w-6 h-6 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] flex-shrink-0">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-xs font-semibold text-gray-900 truncate">{account.accountNumber}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-16">
          <Briefcase className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-sm text-gray-500">No accounts match your search</p>
        </div>
      )}
    </div>
  );
}
