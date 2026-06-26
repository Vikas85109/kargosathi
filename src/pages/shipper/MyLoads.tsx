import { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import LoadCard from '../../components/LoadCard';
import ListToolbar from '../../components/ListToolbar';
import Pagination from '../../components/Pagination';
import useListControls from '../../hooks/useListControls';
import { loads } from '../../mock/data';
import type { Load } from '../../types';
import { LayoutGrid, List } from 'lucide-react';

export default function MyLoads() {
  const [view, setView] = useState<'table' | 'card'>('table');
  const myLoads = loads.filter((l) => l.shipperId === 'U002');

  const { search, setSearch, sortKey, sortDirection, setSort, page, setPage, totalPages, pageStart, pageEnd, totalItems, paginatedData } =
    useListControls({
      data: myLoads,
      searchKeys: ['id', 'origin', 'destination', 'material'],
      pageSize: 10,
    });

  const columns = [
    { key: 'id', label: 'Load ID', render: (r: Load) => <span className="font-semibold">{r.id}</span> },
    { key: 'route', label: 'Route', render: (r: Load) => `${r.origin} → ${r.destination}` },
    { key: 'material', label: 'Material' },
    { key: 'weight', label: 'Weight' },
    { key: 'rate', label: 'Rate', sortable: true, render: (r: Load) => `₹${r.rate.toLocaleString('en-IN')}` },
    { key: 'status', label: 'Status', render: (r: Load) => <StatusBadge status={r.status} /> },
    { key: 'postedDate', label: 'Posted', sortable: true },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Loads</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your shipments</p>
      </div>

      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search loads..."
        totalItems={totalItems}
        itemLabel="shipments"
      >
        <div className="flex bg-white border border-slate-200 rounded-lg overflow-hidden">
          <button onClick={() => setView('table')} className={`p-2 ${view === 'table' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
            <List size={18} />
          </button>
          <button onClick={() => setView('card')} className={`p-2 ${view === 'card' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
            <LayoutGrid size={18} />
          </button>
        </div>
      </ListToolbar>

      {view === 'table' ? (
        <DataTable
          columns={columns}
          data={paginatedData as unknown as Record<string, unknown>[]}
          sortKey={sortKey as string | null}
          sortDirection={sortDirection}
          onSort={(key) => setSort(key as keyof Load)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((l) => <LoadCard key={l.id} load={l} />)}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} pageStart={pageStart} pageEnd={pageEnd} totalItems={totalItems} onPageChange={setPage} />
    </div>
  );
}
