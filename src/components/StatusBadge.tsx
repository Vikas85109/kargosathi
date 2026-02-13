import type { AppStatus } from '../types';

const cfg: Record<AppStatus, { label: string; cls: string }> = {
  draft:               { label: 'Draft',               cls: 'bg-gray-100 text-gray-700' },
  submitted:           { label: 'Submitted',           cls: 'bg-blue-50 text-blue-700' },
  under_review:        { label: 'Under Review',        cls: 'bg-amber-50 text-amber-700' },
  approved:            { label: 'Approved',             cls: 'bg-emerald-50 text-emerald-700' },
  rejected:            { label: 'Rejected',             cls: 'bg-red-50 text-red-700' },
  correction_required: { label: 'Correction Needed',    cls: 'bg-orange-50 text-orange-700' },
};

export default function StatusBadge({ status }: { status: AppStatus }) {
  const { label, cls } = cfg[status] ?? cfg.draft;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}
