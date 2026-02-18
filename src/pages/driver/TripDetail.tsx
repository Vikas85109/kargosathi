import { useParams, useNavigate } from 'react-router-dom';
import { trips } from '../../mock/data';
import StatusBadge from '../../components/StatusBadge';
import MapPlaceholder from '../../components/MapPlaceholder';
import Timeline from '../../components/Timeline';
import StepProgress from '../../components/StepProgress';
import { useToast } from '../../context/ToastContext';
import { ArrowLeft, Phone } from 'lucide-react';

const tripSteps = ['Booked', 'Pickup', 'In Transit', 'Delivered', 'Completed'];
function getStepIndex(status: string): number {
  const map: Record<string, number> = { scheduled: 0, pickup: 1, in_transit: 2, delivered: 3, completed: 4 };
  return map[status] ?? 0;
}

export default function TripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Trip not found</p>
      </div>
    );
  }

  const statusActions: { label: string; next: string }[] = [
    { label: 'Start Loading', next: 'Pickup started' },
    { label: 'Start Trip', next: 'Trip started' },
    { label: 'Mark Delivered', next: 'Delivered' },
  ];

  return (
    <div className="space-y-5 max-w-3xl">
      <button onClick={() => navigate('/driver')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <ArrowLeft size={16} /> Back to Trips
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{trip.id}</h1>
          <p className="text-sm text-slate-500">{trip.shipperName}</p>
        </div>
        <StatusBadge status={trip.status} />
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <StepProgress steps={tripSteps} current={getStepIndex(trip.status)} />
      </div>

      {/* Map */}
      <MapPlaceholder origin={trip.origin} destination={trip.destination} currentLocation={trip.currentLocation} />

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Origin', value: trip.origin },
          { label: 'Destination', value: trip.destination },
          { label: 'Truck', value: trip.truckNumber },
          { label: 'Distance', value: trip.distance },
          { label: 'Material', value: trip.material },
          { label: 'Weight', value: trip.weight },
          { label: 'Rate', value: `₹${trip.rate.toLocaleString('en-IN')}` },
          { label: 'ETA', value: trip.estimatedDelivery },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-3">
            <p className="text-[11px] text-slate-500">{item.label}</p>
            <p className="text-sm font-semibold text-slate-800 mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Status update buttons */}
      {trip.status !== 'completed' && trip.status !== 'delivered' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Update Status</h3>
          <div className="flex flex-wrap gap-3">
            {statusActions.map((a) => (
              <button
                key={a.label}
                onClick={() => toast('success', a.next)}
                className="px-4 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                {a.label}
              </button>
            ))}
            <button
              onClick={() => toast('info', 'Calling shipper...')}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <Phone size={14} /> Call Shipper
            </button>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">Trip Timeline</h3>
        <Timeline events={trip.timeline} />
      </div>
    </div>
  );
}
