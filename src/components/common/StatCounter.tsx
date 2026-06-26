import { useCountUp } from '@/hooks/useCountUp';
import { Icon } from './Icon';

/** Parses strings like "10,000+" / "500+" into a numeric target + suffix. */
export function StatCounter({ label, value, icon }: { label: string; value: string; icon: string }) {
  const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9,]/g, '');
  const { value: count, ref } = useCountUp(numeric);

  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent-400 backdrop-blur">
        <Icon name={icon} size={26} />
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-white">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="mt-1 text-sm text-brand-100">{label}</div>
    </div>
  );
}
