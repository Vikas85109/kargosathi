import { cx } from '@/utils';

type Tone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'accent';

const tones: Record<Tone, string> = {
  success: 'bg-success-100 text-success-700 dark:bg-success-500/15 dark:text-success-500',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  error: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  info: 'bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300',
  neutral: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-400',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
  dot = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        tones[tone],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

// Status -> tone mapping helper used across pages
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, Tone> = {
    // payment / generic
    Paid: 'success', Delivered: 'success', Valid: 'success', Verified: 'success',
    Confirmed: 'success', Active: 'success',
    Pending: 'warning', Partial: 'warning', Expiring: 'warning', 'In Review': 'warning',
    'Quotation Sent': 'info', Assigned: 'info', New: 'info', 'Booking Confirmed': 'info',
    'Vehicle Assigned': 'info', 'Pickup Completed': 'info', 'In Transit': 'accent',
    'Near Destination': 'accent', Processing: 'info',
    Overdue: 'error', Expired: 'error', Cancelled: 'error', Unverified: 'error',
    Closed: 'neutral', Idle: 'neutral',
  };
  const tone = map[status] ?? 'neutral';
  return <Badge tone={tone} dot>{status}</Badge>;
}
