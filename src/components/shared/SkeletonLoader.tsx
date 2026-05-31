export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/[0.06] rounded-lg ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-[#111827]/60 border border-white/[0.06] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <SkeletonLoader className="h-4 w-24" />
        <SkeletonLoader className="h-6 w-16 rounded-full" />
      </div>
      <SkeletonLoader className="h-8 w-40" />
      <SkeletonLoader className="h-3 w-32" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl bg-[#111827]/60 border border-white/[0.06] overflow-hidden">
      <div className="p-4 border-b border-white/[0.06]">
        <SkeletonLoader className="h-8 w-full" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-white/[0.04]">
          <SkeletonLoader className="h-4 w-24" />
          <SkeletonLoader className="h-4 w-32" />
          <SkeletonLoader className="h-4 w-40 flex-1" />
          <SkeletonLoader className="h-4 w-20" />
          <SkeletonLoader className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-xl bg-[#111827]/60 border border-white/[0.06] p-6">
      <SkeletonLoader className="h-5 w-48 mb-6" />
      <SkeletonLoader className="h-64 w-full rounded-lg" />
    </div>
  );
}
