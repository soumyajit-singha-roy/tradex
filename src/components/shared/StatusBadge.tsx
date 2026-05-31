interface StatusBadgeProps {
  status: 'Active' | 'Inactive' | 'Successful' | 'Pending' | 'Failed' | 'Suspended';
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  Active: { bg: 'bg-[#7ED957]/10', text: 'text-[#7ED957]', dot: 'bg-[#7ED957]' },
  Successful: { bg: 'bg-[#7ED957]/10', text: 'text-[#7ED957]', dot: 'bg-[#7ED957]' },
  Inactive: { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-400' },
  Pending: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' },
  Failed: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]' },
  Suspended: { bg: 'bg-[#EF4444]/10', text: 'text-[#EF4444]', dot: 'bg-[#EF4444]' },
};

const sizeConfig = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = sizeConfig[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
