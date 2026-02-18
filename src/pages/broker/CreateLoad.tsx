import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { cityOptions, truckTypeOptions, materialOptions } from '../../mock/data';

export default function CreateLoad() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    shipperName: '', origin: '', destination: '', weight: '', material: '',
    truckType: '', rate: '', deliveryDate: '', notes: '',
  });

  const set = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('success', 'Load created successfully! ID: LD' + Date.now().toString().slice(-4));
    setForm({ shipperName: '', origin: '', destination: '', weight: '', material: '', truckType: '', rate: '', deliveryDate: '', notes: '' });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Create Load</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Post a new load for transporters</p>

      <form onSubmit={submit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        {/* Shipper */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Shipper Name</label>
          <input value={form.shipperName} onChange={(e) => set('shipperName', e.target.value)} required
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Reliance FMCG" />
        </div>

        {/* Origin / Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Origin</label>
            <select value={form.origin} onChange={(e) => set('origin', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
              <option value="">Select city</option>
              {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Destination</label>
            <select value={form.destination} onChange={(e) => set('destination', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
              <option value="">Select city</option>
              {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Material / Weight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Material</label>
            <select value={form.material} onChange={(e) => set('material', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
              <option value="">Select material</option>
              {materialOptions.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Weight</label>
            <input value={form.weight} onChange={(e) => set('weight', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. 12 Ton" />
          </div>
        </div>

        {/* Truck type / Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Truck Type</label>
            <select value={form.truckType} onChange={(e) => set('truckType', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white">
              <option value="">Select truck type</option>
              {truckTypeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Freight Rate (₹)</label>
            <input value={form.rate} onChange={(e) => set('rate', e.target.value)} required type="number"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. 85000" />
          </div>
        </div>

        {/* Delivery date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Expected Delivery Date</label>
          <input value={form.deliveryDate} onChange={(e) => set('deliveryDate', e.target.value)} type="date"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
          <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            placeholder="Any special instructions..." />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Post Load
          </button>
          <button type="button" onClick={() => setForm({ shipperName: '', origin: '', destination: '', weight: '', material: '', truckType: '', rate: '', deliveryDate: '', notes: '' })}
            className="px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
