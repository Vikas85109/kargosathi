import { MapPin, Navigation, Truck } from 'lucide-react';

export function MapPlaceholder({
  source,
  destination,
  current,
  progress = 50,
  height = 'h-80',
}: {
  source?: string;
  destination?: string;
  current?: string;
  progress?: number;
  height?: string;
}) {
  return (
    <div className={`relative ${height} w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800`}>
      {/* fake map base */}
      <div className="absolute inset-0 bg-[#e8eef3] dark:bg-slate-800">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,76,129,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,76,129,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* faux roads */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <path d="M 5% 80% Q 35% 20% 60% 55% T 95% 25%" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
          <path d="M 5% 80% Q 35% 20% 60% 55% T 95% 25%" fill="none" stroke="#0f4c81" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
        </svg>
      </div>

      {/* origin */}
      <div className="absolute left-[5%] top-[78%] -translate-y-1/2 flex flex-col items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success-500 text-white shadow-lg ring-4 ring-success-500/20">
          <MapPin size={16} />
        </div>
        {source && <span className="mt-1 rounded-md bg-white dark:bg-slate-900 px-2 py-0.5 text-xs font-semibold shadow">{source}</span>}
      </div>

      {/* truck (current) */}
      <div
        className="absolute top-[48%] flex flex-col items-center transition-all"
        style={{ left: `${Math.min(85, Math.max(10, progress * 0.8))}%` }}
      >
        <div className="animate-truck flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-white shadow-xl ring-4 ring-accent-500/25">
          <Truck size={18} />
        </div>
        {current && <span className="mt-1 rounded-md bg-white dark:bg-slate-900 px-2 py-0.5 text-xs font-semibold shadow whitespace-nowrap">{current}</span>}
      </div>

      {/* destination */}
      <div className="absolute right-[5%] top-[24%] -translate-y-1/2 flex flex-col items-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg ring-4 ring-brand-700/20">
          <Navigation size={16} />
        </div>
        {destination && <span className="mt-1 rounded-md bg-white dark:bg-slate-900 px-2 py-0.5 text-xs font-semibold shadow">{destination}</span>}
      </div>

      <span className="absolute bottom-3 right-3 rounded-md bg-white/80 dark:bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-slate-500">
        Interactive map (demo)
      </span>
    </div>
  );
}
