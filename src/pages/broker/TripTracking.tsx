import { useState } from 'react';
import { trips } from '../../mock/data';
import TripCard from '../../components/TripCard';
import MapPlaceholder from '../../components/MapPlaceholder';
import Timeline from '../../components/Timeline';
import StepProgress from '../../components/StepProgress';
import type { Trip } from '../../types';

const tripSteps = ['Booked', 'Pickup', 'In Transit', 'Delivered', 'Completed'];

function getStepIndex(status: string): number {
  const map: Record<string, number> = { scheduled: 0, pickup: 1, in_transit: 2, delivered: 3, completed: 4 };
  return map[status] ?? 0;
}

export default function TripTracking() {
  const [selected, setSelected] = useState<Trip | null>(null);
  const activeTrips = trips.filter((t) => t.status !== 'completed');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Trip Tracking</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor live trip progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Trip list */}
        <div className="lg:col-span-1 space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Trips ({activeTrips.length})</p>
          {activeTrips.map((t) => (
            <div key={t.id} className={`rounded-xl transition-all ${selected?.id === t.id ? 'ring-2 ring-blue-500' : ''}`}>
              <TripCard trip={t} onClick={() => setSelected(t)} />
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2 space-y-4">
          {selected ? (
            <>
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{selected.id}</h3>
                  <span className="text-sm text-slate-500">{selected.distance}</span>
                </div>
                <StepProgress steps={tripSteps} current={getStepIndex(selected.status)} />
              </div>

              <MapPlaceholder
                origin={selected.origin}
                destination={selected.destination}
                currentLocation={selected.currentLocation}
              />

              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h4 className="text-sm font-semibold text-slate-800 mb-4">Trip Timeline</h4>
                <Timeline events={selected.timeline} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Material', value: selected.material },
                  { label: 'Weight', value: selected.weight },
                  { label: 'Truck', value: selected.truckNumber },
                  { label: 'Rate', value: `₹${selected.rate.toLocaleString('en-IN')}` },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">{item.label}</p>
                    <p className="text-sm font-bold text-slate-800 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <p className="text-slate-400 text-sm">Select a trip from the list to view tracking details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
