'use client';

import { motion } from 'framer-motion';
import { FileBarChart, Calendar, Download, Eye } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedContainer';

const statements = [
  { id: '1', title: 'May 2026 Statement', period: '01-May-2026 to 31-May-2026', status: 'Available', size: '2.4 MB' },
  { id: '2', title: 'April 2026 Statement', period: '01-Apr-2026 to 30-Apr-2026', status: 'Available', size: '3.1 MB' },
  { id: '3', title: 'March 2026 Statement', period: '01-Mar-2026 to 31-Mar-2026', status: 'Available', size: '4.7 MB' },
  { id: '4', title: 'February 2026 Statement', period: '01-Feb-2026 to 28-Feb-2026', status: 'Available', size: '1.9 MB' },
  { id: '5', title: 'Q4 FY2025-26 Statement', period: '01-Jan-2026 to 31-Mar-2026', status: 'Available', size: '8.2 MB' },
  { id: '6', title: 'Annual FY2025-26 Statement', period: '01-Apr-2025 to 31-Mar-2026', status: 'Processing', size: '—' },
];

export default function StatementsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Statements</h1>
            <p className="text-xs text-gray-500 mt-0.5">Monthly and quarterly account statements</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>FY 2025-26</span>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      {/* Statements List */}
      <StaggerContainer className="space-y-3" staggerDelay={0.08}>
        {statements.map((statement) => (
          <StaggerItem key={statement.id}>
            <GlassCard className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                    <FileBarChart className="w-5 h-5 text-[#3b82f6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{statement.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-gray-500">{statement.period}</span>
                      <span className="text-[11px] text-gray-600">•</span>
                      <span className="text-[11px] text-gray-500">{statement.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {statement.status === 'Available' ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 text-gray-600 text-xs font-medium hover:bg-white/[0.06] transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Preview
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#91c46b]/10 text-[#91c46b] text-xs font-medium hover:bg-[#7ED957]/15 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </motion.button>
                    </>
                  ) : (
                    <span className="px-3 py-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-medium">
                      Processing...
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

