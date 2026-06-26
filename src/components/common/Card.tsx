import type { ReactNode } from 'react';
import { cx } from '@/utils';

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cx(
        'rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm',
        hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 dark:hover:border-brand-800',
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('glass rounded-2xl shadow-lg', className)}>{children}</div>;
}
