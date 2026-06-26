import LoadCard from '../../components/LoadCard';
import ListToolbar from '../../components/ListToolbar';
import Pagination from '../../components/Pagination';
import useListControls from '../../hooks/useListControls';
import { loads } from '../../mock/data';
import { useToast } from '../../context/ToastContext';
import type { Load } from '../../types';

const sortOptions = [
  { label: 'Rate', key: 'rate' },
  { label: 'Posted Date', key: 'postedDate' },
];

export default function LoadMarketplace() {
  const { toast } = useToast();
  const availableLoads = loads.filter((l) => l.status === 'posted');

  const { search, setSearch, sortKey, setSort, page, setPage, totalPages, pageStart, pageEnd, totalItems, paginatedData } =
    useListControls({
      data: availableLoads,
      searchKeys: ['origin', 'destination', 'material'],
      pageSize: 6,
    });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Load Marketplace</h1>
        <p className="text-sm text-slate-500 mt-1">Browse available loads for bidding</p>
      </div>

      <ListToolbar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search by city, material..."
        totalItems={totalItems}
        itemLabel="loads available"
        sortOptions={sortOptions}
        sortKey={sortKey as string ?? ''}
        onSortChange={(key) => setSort(key as keyof Load)}
      />

      {paginatedData.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 text-sm">No loads match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedData.map((l) => (
            <LoadCard
              key={l.id}
              load={l}
              showActions
              onAccept={() => toast('success', `Accepted load ${l.id}! Check My Trips.`)}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} pageStart={pageStart} pageEnd={pageEnd} totalItems={totalItems} onPageChange={setPage} />
    </div>
  );
}
