import { mockTrucks } from '../../mock/data';

const cls: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  idle: 'bg-amber-50 text-amber-700',
  maintenance: 'bg-red-50 text-red-700',
};

export default function TrucksPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-slate-800">Trucks</h1>
        <span className="text-sm text-slate-500">{mockTrucks.length} trucks</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTrucks.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-slate-800">{t.number}</p>
                <p className="text-xs text-slate-400 mt-0.5">{t.id}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${cls[t.status] ?? ''}`}>{t.status}</span>
            </div>
            <div className="space-y-2 text-sm">
              {[['Type', t.type], ['Capacity', t.capacity], ['Driver', t.driver], ['Location', t.location]].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-500">{k}</span>
                  <span className="text-slate-700 font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
