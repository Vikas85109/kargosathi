import { cx } from '@/utils';
import type { ReactNode } from 'react';

const fieldBase =
  'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition disabled:opacity-60';

export function Label({ children, htmlFor, required }: { children: ReactNode; htmlFor?: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block mb-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
      {children}
      {required && <span className="text-accent-500 ml-0.5">*</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const { error, className, ...rest } = props;
  return (
    <>
      <input className={cx(fieldBase, error && 'border-red-400 focus:ring-red-400', className)} {...rest} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </>
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return <textarea className={cx(fieldBase, 'resize-none', className)} {...rest} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[]; placeholder?: string }) {
  const { options, placeholder, className, ...rest } = props;
  return (
    <select className={cx(fieldBase, 'appearance-none bg-no-repeat cursor-pointer', className)} {...rest}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
