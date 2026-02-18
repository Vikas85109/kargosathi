import type { Load } from '../types';
import StatusBadge from './StatusBadge';
import { MapPin, Package, Truck, IndianRupee } from 'lucide-react';

interface Props {
  load: Load;
  onClick?: () => void;
  showActions?: boolean;
  onAccept?: () => void;
}

export default function LoadCard({ load, onClick, showActions, onAccept }: Props) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-slate-900">{load.id}</p>
          <p className="text-xs text-slate-500 mt-0.5">{load.shipperName}</p>
        </div>
        <StatusBadge status={load.status} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <MapPin size={14} className="text-emerald-500" />
          <span>{load.origin}</span>
        </div>
        <div className="flex-1 border-t border-dashed border-slate-300 mx-1" />
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <MapPin size={14} className="text-red-500" />
          <span>{load.destination}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Package size={13} className="text-slate-400" />
          <span>{load.material}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck size={13} className="text-slate-400" />
          <span>{load.truckType}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <IndianRupee size={13} className="text-slate-400" />
          <span className="font-semibold">₹{load.rate.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-400">{load.weight} · {load.distance}</span>
        {showActions && load.status === 'posted' && (
          <button
            onClick={(e) => { e.stopPropagation(); onAccept?.(); }}
            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accept Load
          </button>
        )}
      </div>
    </div>
  );
}
