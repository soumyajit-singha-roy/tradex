'use client';

import { FINANCIAL_METRICS } from '@/lib/data';
import { MetricCard } from './MetricCard';
import { AnimatedContainer } from '@/components/shared/AnimatedContainer';

export function FinancialSummary() {
  return (
    <AnimatedContainer delay={0.2}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Financial Summary</h3>
        <p className="text-xs text-gray-500 mt-0.5">Real-time P&L overview across all trading accounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FINANCIAL_METRICS.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </div>
    </AnimatedContainer>
  );
}
