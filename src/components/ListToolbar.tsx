import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import type { SortOption } from '../hooks/useListControls';

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  totalItems: number;
  itemLabel?: string;
  sortOptions?: SortOption[];
  sortKey?: string;
  onSortChange?: (key: string) => void;
  children?: ReactNode;
}

export default function ListToolbar({
  search,
  onSearchChange,
  placeholder = 'Search...',
  totalItems,
  itemLabel = 'results',
  sortOptions,
  sortKey,
  onSortChange,
  children,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-xs">
        <Search size={16} className="text-slate-400 shrink-0" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent text-sm outline-none flex-1 text-slate-600 placeholder:text-slate-400"
        />
      </div>

      <span className="text-xs text-slate-500">
        {totalItems} {itemLabel}
      </span>

      {sortOptions && onSortChange && (
        <select
          value={sortKey ?? ''}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-slate-600 outline-none cursor-pointer"
        >
          <option value="">Sort by...</option>
          {sortOptions.map((opt) => (
            <option key={opt.key} value={opt.key}>{opt.label}</option>
          ))}
        </select>
      )}

      {children}
    </div>
  );
}
