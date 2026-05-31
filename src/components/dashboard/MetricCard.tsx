'use client';

import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, DollarSign, Receipt, Percent, Landmark, Calculator, Wallet } from 'lucide-react';
import { FinancialMetric } from '@/types';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { formatCurrency } from '@/lib/formatters';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'February Net PNL': TrendingDown,
  'March Net PNL': TrendingDown,
  'April Net PNL': TrendingDown,
  'Total MTM': Calculator,
  'TDS Amount': Receipt,
  'Interest on Unsecured Loan': Percent,
  'Grand Total': Landmark,
  'Balance': Wallet,
};

interface MetricCardProps {
  metric: FinancialMetric;
  index: number;
}

export function MetricCard({ metric, index }: MetricCardProps) {
  const { count } = useAnimatedCounter(metric.value, 1500 + index * 100);
  const Icon = iconMap[metric.label] || DollarSign;
  const isHighlighted = metric.label === 'Grand Total' || metric.label === 'Balance';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`
        relative overflow-hidden rounded-xl p-5
        ${isHighlighted
          ? 'bg-[#ef4444]/5 border border-[#ef4444]/20 shadow-[0_4px_20px_rgba(239,68,68,0.05)]'
          : 'bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]'
        }
        backdrop-blur-xl transition-shadow duration-300
      `}
    >
      {/* Decorative gradient */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-8 translate-x-8 ${
        isHighlighted ? 'bg-[#ef4444]/5' : 'bg-gray-50'
      }`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {metric.label}
          </span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isHighlighted ? 'bg-[#ef4444]/10' : 'bg-gray-50'
          }`}>
            <Icon className={`w-4 h-4 ${isHighlighted ? 'text-[#ef4444]' : 'text-gray-400'}`} />
          </div>
        </div>

        <p className={`text-xl font-bold font-mono tracking-tight ${
          metric.type === 'loss' ? 'text-[#ef4444]' : 'text-[#91c46b]'
        }`}>
          {formatCurrency(count)}
        </p>

        {metric.description && (
          <p className="text-[11px] text-gray-500 mt-2">{metric.description}</p>
        )}
      </div>
    </motion.div>
  );
}
