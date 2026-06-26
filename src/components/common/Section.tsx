import type { ReactNode } from 'react';
import { cx } from '@/utils';

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cx(center && 'text-center mx-auto', center && 'max-w-2xl', className)}>
      {eyebrow && (
        <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
