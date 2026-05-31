'use client';

import { AnimatedContainer } from '@/components/shared/AnimatedContainer';
import { GlassCard } from '@/components/shared/GlassCard';
import {
  PnlTrendChart,
  MtmAnalysisChart,
  AccountPerformanceChart,
  PnlBreakdownChart,
  CapitalUtilizationChart,
} from '@/components/charts/Charts';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Performance Analytics</h1>
          <p className="text-xs text-gray-500 mt-0.5">Interactive charts and performance insights across all trading accounts</p>
        </div>
      </AnimatedContainer>

      {/* Row 1: PNL Trend + MTM Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedContainer delay={0.1}>
          <GlassCard className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Monthly PNL Trend</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Net profit & loss trajectory (Feb - Apr 2026)</p>
            </div>
            <PnlTrendChart />
          </GlassCard>
        </AnimatedContainer>

        <AnimatedContainer delay={0.2}>
          <GlassCard className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">MTM Analysis</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Mark-to-Market, TDS, and interest breakdown</p>
            </div>
            <MtmAnalysisChart />
          </GlassCard>
        </AnimatedContainer>
      </div>

      {/* Row 2: Account Performance */}
      <AnimatedContainer delay={0.3}>
        <GlassCard className="p-6">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Account Performance</h3>
            <p className="text-[11px] text-gray-500 mt-0.5">Realized vs unrealized P&L by top trading accounts</p>
          </div>
          <AccountPerformanceChart />
        </GlassCard>
      </AnimatedContainer>

      {/* Row 3: PNL Breakdown + Capital Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedContainer delay={0.4}>
          <GlassCard className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Profit & Loss Breakdown</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Distribution of losses by category</p>
            </div>
            <PnlBreakdownChart />
          </GlassCard>
        </AnimatedContainer>

        <AnimatedContainer delay={0.5}>
          <GlassCard className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Capital Utilization</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Percentage of deployed capital vs available margin</p>
            </div>
            <CapitalUtilizationChart />
          </GlassCard>
        </AnimatedContainer>
      </div>
    </div>
  );
}

