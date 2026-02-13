import { useState } from 'react';
import { mockLoads } from '../../mock/data';

const cls: Record<string, string> = {
  delivered: 'bg-emerald-50 text-emerald-700',
  in_transit: 'bg-blue-50 text-blue-700',
  booked: 'bg-amber-50 text-amber-700',
};

const filters = ['all', 'booked', 'in_transit', 'delivered'] as const;

export default function LoadsPage() {
  const [filter, setFilter] = useState<string>('all');
  const list = filter === 'all' ? mockLoads : mockLoads.filter((l) => l.status === filter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl font-bold text-slate-800">Loads</h1>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {f === 'all' ? 'All' : f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Load ID', 'Route', 'Weight', 'Truck', 'Date', 'Amount', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{l.id}</td>
                  <td className="px-4 py-3 text-slate-600">{l.from} → {l.to}</td>
                  <td className="px-4 py-3 text-slate-600">{l.weight}</td>
                  <td className="px-4 py-3 text-slate-600">{l.truck}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(l.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{'\u20B9'}{l.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${cls[l.status] ?? ''}`}>{l.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <div className="text-center py-10 text-sm text-slate-400">No loads found</div>}
      </div>
    </div>
  );
}
