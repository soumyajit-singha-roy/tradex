'use client';

import Chart from './ChartWrapper';
import { CHART_COLORS } from '@/lib/data';

export function PnlTrendChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      animations: {
        enabled: true,
        speed: 1000,
      },
    },
    colors: [CHART_COLORS.loss],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    stroke: { curve: 'smooth', width: 2 },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['February', 'March', 'April'],
      labels: { style: { colors: '#6B7280', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280', fontSize: '11px' },
        formatter: (val: number) => {
          const abs = Math.abs(val);
          if (abs >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
          if (abs >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
          return `₹${val.toFixed(0)}`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.05)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val: number) => `₹ ${Math.abs(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      },
    },
    theme: { mode: 'light' },
  };

  const series = [
    {
      name: 'Net PNL',
      data: [-254497.28, -15739497.65, -5272890.41],
    },
  ];

  return <Chart options={options} series={series} type="area" height={280} />;
}

export function MtmAnalysisChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '50%',
        distributed: true,
        dataLabels: { position: 'top' },
      },
    },
    colors: [CHART_COLORS.loss, CHART_COLORS.blue, CHART_COLORS.warning],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Total MTM', 'TDS', 'Interest'],
      labels: { style: { colors: '#6B7280', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#6B7280', fontSize: '11px' },
        formatter: (val: number) => {
          const abs = Math.abs(val);
          if (abs >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
          if (abs >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
          return `₹${val.toFixed(0)}`;
        },
      },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.05)',
      strokeDashArray: 4,
    },
    tooltip: { theme: 'light' },
    legend: { show: false },
    theme: { mode: 'light' },
  };

  const series = [
    {
      name: 'Amount',
      data: [-21266885.34, -22019.0, -198173.0],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={280} />;
}

export function AccountPerformanceChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      stacked: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '60%',
      },
    },
    colors: [CHART_COLORS.loss, CHART_COLORS.blue],
    dataLabels: { enabled: false },
    xaxis: {
      labels: {
        style: { colors: '#6B7280', fontSize: '11px' },
        formatter: (val: string) => {
          const num = parseFloat(val);
          const abs = Math.abs(num);
          if (abs >= 100000) return `₹${(num / 100000).toFixed(0)}L`;
          return `₹${num.toFixed(0)}`;
        },
      },
    },
    yaxis: {
      labels: { style: { colors: '#6B7280', fontSize: '11px' } },
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.05)',
      strokeDashArray: 4,
    },
    tooltip: { theme: 'light' },
    legend: {
      labels: { colors: '#9CA3AF' },
      fontSize: '11px',
    },
    theme: { mode: 'light' },
  };

  const series = [
    {
      name: 'Realized P&L',
      data: [-845230, -523400, -312450, -178900, -95200],
    },
    {
      name: 'Unrealized P&L',
      data: [-234100, -167800, -89200, -45600, -12300],
    },
  ];

  return (
    <Chart
      options={{
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: ['ZZJ16183', 'ZZJ17007', 'ZZJ17008', 'ANU0101', 'ANU0102'],
        },
      }}
      series={series}
      type="bar"
      height={280}
    />
  );
}

export function PnlBreakdownChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    labels: ['February PNL', 'March PNL', 'April PNL', 'TDS', 'Interest'],
    colors: ['#EF4444', '#DC2626', '#F87171', '#F59E0B', '#00C2FF'],
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: { color: '#9CA3AF', fontSize: '12px' },
            value: {
              color: '#111827',
              fontSize: '16px',
              formatter: (val: string) => {
                const num = parseFloat(val);
                return `${num.toFixed(1)}%`;
              },
            },
            total: {
              show: true,
              label: 'Total Loss',
              color: '#9CA3AF',
              fontSize: '11px',
              formatter: () => '₹2.15 Cr',
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: '#9CA3AF' },
      fontSize: '11px',
    },
    tooltip: { theme: 'light' },
    theme: { mode: 'light' },
  };

  const series = [254497.28, 15739497.65, 5272890.41, 22019.0, 198173.0];

  return <Chart options={options} series={series} type="donut" height={320} />;
}

export function CapitalUtilizationChart() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'radialBar',
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: {
          background: 'rgba(0,0,0,0.05)',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: { color: '#9CA3AF', fontSize: '12px', offsetY: -5 },
          value: {
            color: '#111827',
            fontSize: '22px',
            fontWeight: 700,
            offsetY: 5,
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },
    colors: [CHART_COLORS.loss],
    labels: ['Capital Utilized'],
    stroke: { lineCap: 'round' },
    theme: { mode: 'light' },
  };

  const series = [89.3];

  return <Chart options={options} series={series} type="radialBar" height={300} />;
}

