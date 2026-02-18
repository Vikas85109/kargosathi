const colorMap: Record<string, string> = {
  // Load statuses
  posted: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  assigned: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  in_transit: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
  // Trip statuses
  scheduled: 'bg-slate-50 text-slate-700 ring-slate-600/20',
  pickup: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
  // Payment statuses
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  processing: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  overdue: 'bg-red-50 text-red-700 ring-red-600/20',
  // User statuses
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  suspended: 'bg-red-50 text-red-700 ring-red-600/20',
  // KYC
  verified: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  // Dispute
  open: 'bg-red-50 text-red-700 ring-red-600/20',
  investigating: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  closed: 'bg-slate-50 text-slate-700 ring-slate-600/20',
  // Truck
  available: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  on_trip: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  maintenance: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  inactive: 'bg-slate-50 text-slate-700 ring-slate-600/20',
};

interface Props {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: Props) {
  const colors = colorMap[status] ?? 'bg-slate-50 text-slate-700 ring-slate-600/20';
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset ${colors} ${className}`}>
      {label}
    </span>
  );
}
