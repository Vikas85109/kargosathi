import { useState } from 'react';
import { trips } from '../../mock/data';
import MapPlaceholder from '../../components/MapPlaceholder';
import Timeline from '../../components/Timeline';
import StatusBadge from '../../components/StatusBadge';
import StepProgress from '../../components/StepProgress';
import type { Trip } from '../../types';

const tripSteps = ['Booked', 'Pickup', 'In Transit', 'Delivered', 'Completed'];
function getStepIndex(status: string): number {
  const map: Record<string, number> = { scheduled: 0, pickup: 1, in_transit: 2, delivered: 3, completed: 4 };
  return map[status] ?? 0;
}

export default function TrackShipment() {
  const myTrips = trips.filter((t) => t.shipperName === 'Reliance FMCG');
  const [selected, setSelected] = useState<Trip>(myTrips[0]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Track Shipment</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time tracking of your shipments</p>
      </div>

      {/* Trip selector */}
      <div className="flex flex-wrap gap-2">
        {myTrips.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selected.id === t.id
                ? 'bg-violet-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.id}: {t.origin} → {t.destination}
          </button>
        ))}
      </div>

      {selected && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">{selected.id}</h3>
                <StatusBadge status={selected.status} />
              </div>
              <StepProgress steps={tripSteps} current={getStepIndex(selected.status)} />
            </div>

            <MapPlaceholder origin={selected.origin} destination={selected.destination} currentLocation={selected.currentLocation} />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Truck', value: selected.truckNumber },
                { label: 'Driver', value: selected.driverName },
                { label: 'Material', value: selected.material },
                { label: 'Weight', value: selected.weight },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-3">
                  <p className="text-[11px] text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-800 mb-4">Tracking History</h4>
            <Timeline events={selected.timeline} />
          </div>
        </div>
      )}
    </div>
  );
}
