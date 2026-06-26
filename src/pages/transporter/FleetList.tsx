import { Truck, AlertTriangle, CheckCircle2, Wrench, CircleDot } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import StatusBadge from '../../components/StatusBadge';
import ListToolbar from '../../components/ListToolbar';
import Pagination from '../../components/Pagination';
import useListControls from '../../hooks/useListControls';
import { trucks } from '../../mock/data';
import type { Truck as TruckType } from '../../types';

const sortOptions = [
  { label: 'Number', key: 'number' },
  { label: 'Type', key: 'type' },
  { label: 'Driver', key: 'driver' },
  { label: 'Location', key: 'location' },
];

export default function FleetList() {
  const myTrucks = trucks.filter((t) => t.ownerId === 'U003');
  const available = myTrucks.filter((t) => t.status === 'available').length;
  const onTrip = myTrucks.filter((t) => t.status === 'on_trip').length;

  const { search, setSearch, sortKey, setSort, page, setPage, totalPages, pageStart, pageEnd, totalItems, paginatedData } =
    useListControls({
      data: myTrucks,
      searchKeys: ['number', 'type', 'driver', 'location'],
      pageSize: 6,
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Fleet</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your trucks and fleet</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Total Trucks" value={myTrucks.length} icon={<Truck size={20} />} color="cyan" />
        <MetricCard label="Available" value={available} icon={<CheckCircle2 size={20} />} color="emerald" />
        <MetricCard label="On Trip" value={onTrip} icon={<CircleDot size={20} />} color="violet" />
        <MetricCard label="Maintenance" value={myTrucks.filter((t) => t.status === 'maintenance').length} icon={<Wrench size={20} />} color="amber" />
      </div>

      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search trucks..."
        totalItems={totalItems}
        itemLabel="trucks"
        sortOptions={sortOptions}
        sortKey={sortKey as string ?? ''}
        onSortChange={(key) => setSort(key as keyof TruckType)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedData.map((truck) => (
          <div key={truck.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Truck size={20} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{truck.number}</p>
                  <p className="text-xs text-slate-500">{truck.type}</p>
                </div>
              </div>
              <StatusBadge status={truck.status} />
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Capacity</span>
                <span className="font-medium">{truck.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver</span>
                <span className="font-medium">{truck.driver}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location</span>
                <span className="font-medium">{truck.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Insurance</span>
                <span className={`font-medium ${new Date(truck.insuranceExpiry) < new Date('2026-06-01') ? 'text-amber-600' : ''}`}>
                  {truck.insuranceExpiry}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fitness</span>
                <span className={`font-medium ${new Date(truck.fitnessExpiry) < new Date('2026-06-01') ? 'text-red-600' : ''}`}>
                  {truck.fitnessExpiry}
                </span>
              </div>
            </div>

            {new Date(truck.fitnessExpiry) < new Date('2026-06-01') && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-2.5 py-1.5 rounded-lg">
                <AlertTriangle size={13} />
                <span>Fitness expiring soon</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {paginatedData.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 text-sm">No trucks match your search</p>
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} pageStart={pageStart} pageEnd={pageEnd} totalItems={totalItems} onPageChange={setPage} />
    </div>
  );
}
