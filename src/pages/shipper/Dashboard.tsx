import { useState } from 'react';
import { Package, MapPin, FileText, IndianRupee } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import LoadCard from '../../components/LoadCard';
import Modal from '../../components/Modal';
import { useToast } from '../../context/ToastContext';
import { loads, cityOptions, materialOptions, truckTypeOptions } from '../../mock/data';

export default function ShipperDashboard() {
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const myLoads = loads.filter((l) => l.shipperId === 'U002');
  const activeCount = myLoads.filter((l) => l.status === 'in_transit' || l.status === 'assigned').length;
  const totalSpent = myLoads.filter((l) => l.status === 'delivered').reduce((s, l) => s + l.rate, 0);

  const [form, setForm] = useState({ origin: '', destination: '', weight: '', material: '', truckType: '', rate: '' });
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast('success', 'Shipment posted successfully!');
    setShowCreate(false);
    setForm({ origin: '', destination: '', weight: '', material: '', truckType: '', rate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shipper Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back, Anita Verma</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors">
          + Create Shipment
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="My Loads" value={myLoads.length} icon={<Package size={20} />} color="violet" />
        <MetricCard label="Active Shipments" value={activeCount} icon={<MapPin size={20} />} color="blue" />
        <MetricCard label="Delivered" value={myLoads.filter((l) => l.status === 'delivered').length} icon={<FileText size={20} />} color="emerald" />
        <MetricCard label="Total Spent" value={`₹${totalSpent.toLocaleString('en-IN')}`} icon={<IndianRupee size={20} />} color="amber" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Recent Shipments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myLoads.slice(0, 6).map((l) => (
            <LoadCard key={l.id} load={l} />
          ))}
        </div>
      </div>

      {/* Create shipment modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Shipment" width="max-w-lg">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Origin</label>
              <select value={form.origin} onChange={(e) => set('origin', e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                <option value="">Select</option>
                {cityOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Destination</label>
              <select value={form.destination} onChange={(e) => set('destination', e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                <option value="">Select</option>
                {cityOptions.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Material</label>
              <select value={form.material} onChange={(e) => set('material', e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                <option value="">Select</option>
                {materialOptions.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Weight</label>
              <input value={form.weight} onChange={(e) => set('weight', e.target.value)} required placeholder="e.g. 12 Ton" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Truck Type</label>
              <select value={form.truckType} onChange={(e) => set('truckType', e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                <option value="">Select</option>
                {truckTypeOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Budget (₹)</label>
              <input value={form.rate} onChange={(e) => set('rate', e.target.value)} type="number" required placeholder="85000" className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors">
            Post Shipment
          </button>
        </form>
      </Modal>
    </div>
  );
}
