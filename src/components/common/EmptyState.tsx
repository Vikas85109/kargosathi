import { SearchX } from 'lucide-react';
import type { ReactNode } from 'react';

export function EmptyState({
  title = 'No results found',
  message = 'Try adjusting your search or filters.',
  icon,
}: {
  title?: string;
  message?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
        {icon ?? <SearchX size={28} />}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">{message}</p>
    </div>
  );
}
