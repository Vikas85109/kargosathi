import TripCard from '../../components/TripCard';
import StatusBadge from '../../components/StatusBadge';
import { trips } from '../../mock/data';

export default function MyTrips() {
  const active = trips.filter((t) => t.status !== 'completed');
  const completed = trips.filter((t) => t.status === 'completed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
        <p className="text-sm text-slate-500 mt-1">Track all assigned trips</p>
      </div>

      {/* Active */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-slate-800">Active Trips</h3>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">{active.length}</span>
        </div>
        {active.length === 0 ? (
          <p className="text-sm text-slate-400 bg-white rounded-xl border border-slate-200 p-8 text-center">No active trips</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((t) => <TripCard key={t.id} trip={t} />)}
          </div>
        )}
      </div>

      {/* Completed */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-slate-800">Completed Trips</h3>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">{completed.length}</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {completed.map((t) => (
              <div key={t.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-900">{t.id}</span>
                  <span className="text-sm text-slate-600">{t.origin} → {t.destination}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-800">₹{t.rate.toLocaleString('en-IN')}</span>
                  <StatusBadge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
