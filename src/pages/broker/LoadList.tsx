import { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { loads } from '../../mock/data';
import type { Load, LoadStatus } from '../../types';

const filters: { label: string; value: LoadStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Posted', value: 'posted' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'In Transit', value: 'in_transit' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function LoadList() {
  const [filter, setFilter] = useState<LoadStatus | 'all'>('all');
  const filtered = filter === 'all' ? loads : loads.filter((l) => l.status === filter);

  const columns = [
    { key: 'id', label: 'Load ID', render: (r: Load) => <span className="font-semibold text-slate-900">{r.id}</span> },
    { key: 'route', label: 'Route', render: (r: Load) => <span>{r.origin} → {r.destination}</span> },
    { key: 'material', label: 'Material' },
    { key: 'weight', label: 'Weight' },
    { key: 'truckType', label: 'Truck Type' },
    { key: 'rate', label: 'Rate', render: (r: Load) => <span className="font-semibold">₹{r.rate.toLocaleString('en-IN')}</span> },
    { key: 'status', label: 'Status', render: (r: Load) => <StatusBadge status={r.status} /> },
    { key: 'postedDate', label: 'Posted' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Load List</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} loads found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered as unknown as Record<string, unknown>[]} />
    </div>
  );
}
