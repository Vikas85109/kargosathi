import { Star } from 'lucide-react';
import { cx } from '@/utils';

export function StarRating({ value, size = 14, showValue = true }: { value: number; size?: number; showValue?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cx(
              i < Math.round(value) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'
            )}
          />
        ))}
      </span>
      {showValue && <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{value.toFixed(1)}</span>}
    </span>
  );
}
