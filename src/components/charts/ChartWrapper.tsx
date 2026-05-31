'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#00C2FF]/30 border-t-[#00C2FF] rounded-full animate-spin" />
    </div>
  ),
});

export default Chart;
