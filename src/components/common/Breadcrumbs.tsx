import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm">
      <Link to="/" className="text-slate-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300 transition-colors">
        <Home size={15} />
      </Link>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="text-slate-400" />
          {c.to && i < items.length - 1 ? (
            <Link to={c.to} className="text-slate-500 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300 transition-colors">
              {c.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-700 dark:text-slate-200">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
