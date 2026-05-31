export function formatCurrency(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absValue);
  
  return `${isNegative ? '-' : ''}${formatted}`;
}

export function formatCurrencyCompact(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  if (absValue >= 10000000) {
    return `${isNegative ? '-' : ''}${(absValue / 10000000).toFixed(2)} Cr`;
  } else if (absValue >= 100000) {
    return `${isNegative ? '-' : ''}${(absValue / 100000).toFixed(2)} L`;
  } else if (absValue >= 1000) {
    return `${isNegative ? '-' : ''}${(absValue / 1000).toFixed(2)} K`;
  }
  return formatCurrency(value);
}

export function formatDate(dateStr: string): string {
  return dateStr;
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return dateStr;
}
