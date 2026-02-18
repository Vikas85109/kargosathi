import type { Trip } from '../types';
import StatusBadge from './StatusBadge';
import { MapPin, Truck, Calendar, User } from 'lucide-react';

interface Props {
  trip: Trip;
  onClick?: () => void;
}

export default function TripCard({ trip, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-slate-900">{trip.id}</p>
          <p className="text-xs text-slate-500 mt-0.5">{trip.shipperName}</p>
        </div>
        <StatusBadge status={trip.status} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <MapPin size={14} className="text-emerald-500" />
          <span>{trip.origin}</span>
        </div>
        <div className="flex-1 border-t border-dashed border-slate-300 mx-1" />
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <MapPin size={14} className="text-red-500" />
          <span>{trip.destination}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Truck size={13} className="text-slate-400" />
          <span>{trip.truckNumber}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User size={13} className="text-slate-400" />
          <span>{trip.driverName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-slate-400" />
          <span>{trip.startDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-blue-500 animate-pulse-dot" />
          <span className="font-medium">{trip.currentLocation}</span>
        </div>
      </div>
    </div>
  );
}
