import { MapPin, Navigation } from 'lucide-react';

interface Props {
  origin: string;
  destination: string;
  currentLocation?: string;
  className?: string;
}

export default function MapPlaceholder({ origin, destination, currentLocation, className = '' }: Props) {
  return (
    <div className={`relative bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden ${className}`}>
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Route visualization */}
      <div className="relative flex items-center justify-center h-full min-h-[260px] p-6">
        <div className="flex items-center gap-4 w-full max-w-md">
          {/* Origin */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <MapPin size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-slate-700 text-center">{origin}</span>
          </div>

          {/* Route line */}
          <div className="flex-1 relative">
            <div className="h-1 bg-slate-300 rounded-full" />
            <div className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full" style={{ width: '60%' }} />
            {currentLocation && (
              <div className="absolute -top-6 flex flex-col items-center" style={{ left: '60%', transform: 'translateX(-50%)' }}>
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 animate-pulse-dot">
                  <Navigation size={13} className="text-white" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 mt-1 whitespace-nowrap bg-white/80 px-1.5 py-0.5 rounded">{currentLocation}</span>
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-200">
              <MapPin size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-slate-700 text-center">{destination}</span>
          </div>
        </div>
      </div>

      {/* Map badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-medium text-slate-500 shadow-sm">
        Live Tracking Map
      </div>
    </div>
  );
}
