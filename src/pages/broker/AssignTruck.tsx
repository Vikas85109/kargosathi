import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { loads, trucks } from '../../mock/data';
import type { Load, Truck } from '../../types';

export default function AssignTruck() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<Load | null>(null);
  const pendingLoads = loads.filter((l) => l.status === 'posted' || l.status === 'assigned');
  const availableTrucks = trucks.filter((t) => t.status === 'available');

  const loadColumns = [
    { key: 'id', label: 'Load ID', render: (r: Load) => <span className="font-semibold">{r.id}</span> },
    { key: 'route', label: 'Route', render: (r: Load) => <span>{r.origin} → {r.destination}</span> },
    { key: 'material', label: 'Material' },
    { key: 'weight', label: 'Weight' },
    { key: 'truckType', label: 'Required Truck' },
    { key: 'status', label: 'Status', render: (r: Load) => <StatusBadge status={r.status} /> },
  ];

  const assign = (truck: Truck) => {
    toast('success', `Truck ${truck.number} assigned to ${selected?.id}`);
    setSelected(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Assign Truck</h1>
        <p className="text-sm text-slate-500 mt-1">Select a load and assign an available truck</p>
      </div>

      <DataTable
        columns={loadColumns}
        data={pendingLoads as unknown as Record<string, unknown>[]}
        onRowClick={(row) => setSelected(row as unknown as Load)}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Assign Truck to ${selected?.id ?? ''}`} width="max-w-2xl">
        {selected && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-700"><strong>Route:</strong> {selected.origin} → {selected.destination}</p>
              <p className="text-sm text-slate-700"><strong>Material:</strong> {selected.material} ({selected.weight})</p>
              <p className="text-sm text-slate-700"><strong>Required:</strong> {selected.truckType}</p>
            </div>

            <p className="text-sm font-semibold text-slate-800">Available Trucks ({availableTrucks.length})</p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableTrucks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.number}</p>
                    <p className="text-xs text-slate-500">{t.type} · {t.capacity} · {t.driver}</p>
                    <p className="text-xs text-slate-400">Location: {t.location}</p>
                  </div>
                  <button
                    onClick={() => assign(t)}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
