import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trips } from '../../mock/data';
import StatusBadge from '../../components/StatusBadge';
import { MapPin, Package, Calendar, ChevronRight } from 'lucide-react';

export default function DriverTripList() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'active' | 'completed'>('active');
  const myTrips = trips.filter((t) => t.driverId === 'U004');
  const active = myTrips.filter((t) => t.status !== 'completed');
  const completed = myTrips.filter((t) => t.status === 'completed');
  const shown = tab === 'active' ? active : completed;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome, Suresh Kumar</p>
      </div>

      {/* Tab */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {(['active', 'completed'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t === 'active' ? `Active (${active.length})` : `Completed (${completed.length})`}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/driver/trip/${trip.id}`)}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-slate-900">{trip.id}</p>
                  <StatusBadge status={trip.status} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{trip.shipperName} · {trip.material}</p>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 transition-colors mt-1" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-emerald-500" />
                <span className="text-sm text-slate-700">{trip.origin}</span>
              </div>
              <div className="flex-1 border-t border-dashed border-slate-300 mx-1" />
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-red-500" />
                <span className="text-sm text-slate-700">{trip.destination}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Package size={12} />
                <span>{trip.weight}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{trip.startDate}</span>
              </div>
              <span className="font-semibold text-slate-700">₹{trip.rate.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
