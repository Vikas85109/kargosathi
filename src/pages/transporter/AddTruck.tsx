import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { truckTypeOptions } from '../../mock/data';

export default function AddTruck() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    number: '', type: '', capacity: '', driver: '', driverPhone: '',
    insuranceExpiry: '', fitnessExpiry: '', permitStates: '',
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast('success', `Truck ${form.number} added successfully!`);
    setForm({ number: '', type: '', capacity: '', driver: '', driverPhone: '', insuranceExpiry: '', fitnessExpiry: '', permitStates: '' });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">Add Truck</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Register a new truck to your fleet</p>

      <form onSubmit={submit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Registration Number</label>
            <input value={form.number} onChange={(e) => set('number', e.target.value)} required placeholder="e.g. MH04-AB-1234"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Truck Type</label>
            <select value={form.type} onChange={(e) => set('type', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-white">
              <option value="">Select type</option>
              {truckTypeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Capacity</label>
            <input value={form.capacity} onChange={(e) => set('capacity', e.target.value)} required placeholder="e.g. 15 Ton"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Permit States</label>
            <input value={form.permitStates} onChange={(e) => set('permitStates', e.target.value)} placeholder="e.g. MH, GJ, RJ"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Driver Name</label>
            <input value={form.driver} onChange={(e) => set('driver', e.target.value)} required placeholder="Full name"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Driver Phone</label>
            <input value={form.driverPhone} onChange={(e) => set('driverPhone', e.target.value)} required placeholder="10-digit mobile"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Insurance Expiry</label>
            <input type="date" value={form.insuranceExpiry} onChange={(e) => set('insuranceExpiry', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Fitness Expiry</label>
            <input type="date" value={form.fitnessExpiry} onChange={(e) => set('fitnessExpiry', e.target.value)} required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors">
            Add Truck
          </button>
          <button type="reset" className="px-6 py-2.5 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
