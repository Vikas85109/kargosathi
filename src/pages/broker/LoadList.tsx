import { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import ListToolbar from '../../components/ListToolbar';
import Pagination from '../../components/Pagination';
import useListControls from '../../hooks/useListControls';
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
  const statusFiltered = filter === 'all' ? loads : loads.filter((l) => l.status === filter);

  const { search, setSearch, sortKey, sortDirection, setSort, page, setPage, totalPages, pageStart, pageEnd, totalItems, paginatedData } =
    useListControls({
      data: statusFiltered,
      searchKeys: ['id', 'origin', 'destination', 'material', 'shipperName'],
      pageSize: 10,
    });

  const columns = [
    { key: 'id', label: 'Load ID', render: (r: Load) => <span className="font-semibold text-slate-900">{r.id}</span> },
    { key: 'route', label: 'Route', render: (r: Load) => <span>{r.origin} → {r.destination}</span> },
    { key: 'material', label: 'Material' },
    { key: 'weight', label: 'Weight' },
    { key: 'truckType', label: 'Truck Type' },
    { key: 'rate', label: 'Rate', sortable: true, render: (r: Load) => <span className="font-semibold">₹{r.rate.toLocaleString('en-IN')}</span> },
    { key: 'status', label: 'Status', render: (r: Load) => <StatusBadge status={r.status} /> },
    { key: 'postedDate', label: 'Posted', sortable: true },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Load List</h1>
        <p className="text-sm text-slate-500 mt-1">Manage all loads</p>
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

      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search loads..."
        totalItems={totalItems}
        itemLabel="loads"
      />

      <DataTable
        columns={columns}
        data={paginatedData as unknown as Record<string, unknown>[]}
        sortKey={sortKey as string | null}
        sortDirection={sortDirection}
        onSort={(key) => setSort(key as keyof Load)}
      />

      <Pagination page={page} totalPages={totalPages} pageStart={pageStart} pageEnd={pageEnd} totalItems={totalItems} onPageChange={setPage} />
    </div>
  );
}
