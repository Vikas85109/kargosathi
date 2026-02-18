import { useState } from 'react';
import { Camera, Upload, CheckCircle2, FileImage } from 'lucide-react';
import { trips } from '../../mock/data';
import { useToast } from '../../context/ToastContext';
import StatusBadge from '../../components/StatusBadge';

export default function PodUpload() {
  const { toast } = useToast();
  const deliveredTrips = trips.filter((t) => t.status === 'delivered' || t.status === 'completed');
  const [uploaded, setUploaded] = useState<Set<string>>(new Set());

  const handleUpload = (tripId: string) => {
    setUploaded((prev) => new Set(prev).add(tripId));
    toast('success', `POD uploaded for ${tripId}`);
  };

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">POD Upload</h1>
        <p className="text-sm text-slate-500 mt-1">Upload Proof of Delivery documents</p>
      </div>

      <div className="space-y-3">
        {deliveredTrips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{trip.id}</p>
                  <StatusBadge status={trip.status} />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{trip.origin} → {trip.destination} · {trip.shipperName}</p>
              </div>
              {uploaded.has(trip.id) && (
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                  <CheckCircle2 size={14} />
                  <span>Uploaded</span>
                </div>
              )}
            </div>

            {uploaded.has(trip.id) ? (
              <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3">
                <FileImage size={20} className="text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">POD__{trip.id}__signed.jpg</p>
                  <p className="text-xs text-emerald-600">Uploaded successfully</p>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-orange-300 hover:bg-orange-50/30 transition-colors">
                <Camera size={28} className="text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500 mb-3">Take a photo or upload POD document</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => handleUpload(trip.id)}
                    className="px-4 py-2 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-1.5"
                  >
                    <Camera size={14} /> Capture Photo
                  </button>
                  <button
                    onClick={() => handleUpload(trip.id)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <Upload size={14} /> Upload File
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
