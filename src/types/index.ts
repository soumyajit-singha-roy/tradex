export interface User {
  userId: string;
  name: string;
  clientId: string;
  status: 'Active' | 'Inactive';
  membership: string;
  broker: string;
  lastLogin: string;
}

export interface TradingAccount {
  id: string;
  accountNumber: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastUpdated: string;
  broker: string;
  segment: string;
}

export interface FinancialMetric {
  label: string;
  value: number;
  formattedValue: string;
  type: 'loss' | 'profit' | 'neutral';
  icon?: string;
  description?: string;
}

export interface Transaction {
  id: string;
  date: string;
  referenceNumber: string;
  description: string;
  credit: number | null;
  debit: number | null;
  balance: number;
  status: 'Successful' | 'Pending' | 'Failed';
  narration?: string;
  type?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: 'trading' | 'ledger' | 'summary' | 'pnl';
  generatedDate: string;
  period: string;
}

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
}
