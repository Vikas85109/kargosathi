import { useState } from 'react';
import LoadCard from '../../components/LoadCard';
import { loads } from '../../mock/data';
import { useToast } from '../../context/ToastContext';
import { Search } from 'lucide-react';

export default function LoadMarketplace() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const availableLoads = loads.filter((l) => l.status === 'posted');

  const filtered = search
    ? availableLoads.filter((l) =>
        l.origin.toLowerCase().includes(search.toLowerCase()) ||
        l.destination.toLowerCase().includes(search.toLowerCase()) ||
        l.material.toLowerCase().includes(search.toLowerCase())
      )
    : availableLoads;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Load Marketplace</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} loads available for bidding</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full sm:w-64">
          <Search size={16} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by city, material..."
            className="bg-transparent text-sm outline-none flex-1 text-slate-600 placeholder:text-slate-400"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-400 text-sm">No loads match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((l) => (
            <LoadCard
              key={l.id}
              load={l}
              showActions
              onAccept={() => toast('success', `Accepted load ${l.id}! Check My Trips.`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
