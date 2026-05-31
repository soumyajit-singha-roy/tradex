'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Table, Printer, BarChart3, BookOpen, Users, TrendingDown, CheckCircle2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { REPORTS } from '@/lib/data';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedContainer, StaggerContainer, StaggerItem } from '@/components/shared/AnimatedContainer';

const reportIcons: Record<string, LucideIcon> = {
  trading: BarChart3,
  ledger: BookOpen,
  summary: Users,
  pnl: TrendingDown,
};

const reportColorClasses: Record<string, { bg: string; text: string }> = {
  trading: { bg: 'bg-[#3b82f6]/10', text: 'text-[#3b82f6]' },
  ledger: { bg: 'bg-[#91c46b]/10', text: 'text-[#91c46b]' },
  summary: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]' },
  pnl: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]' },
};

export default function ReportsPage() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  const handleAction = async (reportTitle: string, action: string) => {
    setDownloadingId(`${reportTitle}-${action}`);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setDownloadingId(null);
    setToastMessage(`${action} for "${reportTitle}" initiated successfully.`);
    
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <AnimatedContainer>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">Reports</h1>
          <p className="text-xs text-gray-500 mt-0.5">Generate and download trading reports and statements</p>
        </div>
      </AnimatedContainer>

      {/* Reports Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
        {REPORTS.map((report) => {
          const Icon = reportIcons[report.type] || FileText;
          const colors = reportColorClasses[report.type] || { bg: 'bg-[#3b82f6]/10', text: 'text-[#3b82f6]' };

          return (
            <StaggerItem key={report.id}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg}`}
                  >
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{report.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-5">
                  <span>Generated: {report.generatedDate}</span>
                  <span>•</span>
                  <span>Period: {report.period}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction(report.title, 'Download PDF')}
                    disabled={downloadingId === `${report.title}-Download PDF`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-xs font-medium hover:bg-[#EF4444]/15 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {downloadingId === `${report.title}-Download PDF` ? 'Processing...' : 'Download PDF'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction(report.title, 'Export Excel')}
                    disabled={downloadingId === `${report.title}-Export Excel`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#91c46b]/10 text-[#91c46b] text-xs font-medium hover:bg-[#7ED957]/15 transition-colors disabled:opacity-50"
                  >
                    <Table className="w-3.5 h-3.5" />
                    {downloadingId === `${report.title}-Export Excel` ? 'Processing...' : 'Export Excel'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAction(report.title, 'Print Report')}
                    disabled={downloadingId === `${report.title}-Print Report`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] text-xs font-medium hover:bg-[#00C2FF]/15 transition-colors disabled:opacity-50"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    {downloadingId === `${report.title}-Print Report` ? 'Processing...' : 'Print Report'}
                  </motion.button>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-[#91c46b]/20 shadow-2xl shadow-black/40 z-50"
        >
          <CheckCircle2 className="w-4 h-4 text-[#91c46b]" />
          <span className="text-sm text-gray-900">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

