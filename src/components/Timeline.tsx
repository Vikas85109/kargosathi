import type { TripEvent } from '../types';
import { CheckCircle2, Circle, MapPin } from 'lucide-react';

interface Props {
  events: TripEvent[];
}

export default function Timeline({ events }: Props) {
  return (
    <div className="space-y-0">
      {events.map((event, i) => {
        const isLast = i === events.length - 1;
        const isFirst = i === 0;

        return (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              {isLast && !isFirst ? (
                <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
              ) : i === 0 && events.length === 1 ? (
                <Circle size={18} className="text-blue-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              )}
              {!isLast && <div className="w-px flex-1 bg-slate-200 my-1" />}
            </div>
            <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
              <p className="text-sm font-semibold text-slate-800">{event.status}</p>
              <p className="text-xs text-slate-500">{event.location}</p>
              <p className="text-xs text-slate-400 mt-0.5">{event.timestamp}</p>
              {event.note && <p className="text-xs text-slate-500 mt-1 italic">{event.note}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
