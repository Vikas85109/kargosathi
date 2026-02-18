import { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { disputes } from '../../mock/data';
import { useToast } from '../../context/ToastContext';
import type { Dispute, DisputeStatus } from '../../types';

export default function DisputeList() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<Dispute | null>(null);
  const [filter, setFilter] = useState<DisputeStatus | 'all'>('all');

  const filtered = filter === 'all' ? disputes : disputes.filter((d) => d.status === filter);

  const columns = [
    { key: 'id', label: 'ID', render: (r: Dispute) => <span className="font-semibold text-slate-900">{r.id}</span> },
    { key: 'tripId', label: 'Trip' },
    { key: 'type', label: 'Type', render: (r: Dispute) => <span className="font-medium">{r.type}</span> },
    { key: 'raisedBy', label: 'Raised By' },
    { key: 'against', label: 'Against' },
    { key: 'amount', label: 'Amount', render: (r: Dispute) => r.amount ? `₹${r.amount.toLocaleString('en-IN')}` : '—' },
    { key: 'status', label: 'Status', render: (r: Dispute) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Created' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Disputes</h1>
        <p className="text-sm text-slate-500 mt-1">{disputes.filter((d) => d.status === 'open').length} open disputes</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'open', 'investigating', 'resolved', 'closed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
              filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered as unknown as Record<string, unknown>[]}
        onRowClick={(row) => setSelected(row as unknown as Dispute)}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Dispute ${selected?.id ?? ''}`} width="max-w-xl">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Trip:</span> <span className="font-medium">{selected.tripId}</span></div>
              <div><span className="text-slate-500">Type:</span> <span className="font-medium">{selected.type}</span></div>
              <div><span className="text-slate-500">Raised By:</span> <span className="font-medium">{selected.raisedBy}</span></div>
              <div><span className="text-slate-500">Against:</span> <span className="font-medium">{selected.against}</span></div>
              <div><span className="text-slate-500">Amount:</span> <span className="font-medium">{selected.amount ? `₹${selected.amount.toLocaleString('en-IN')}` : '—'}</span></div>
              <div><span className="text-slate-500">Status:</span> <StatusBadge status={selected.status} /></div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1">Description</p>
              <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{selected.description}</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Admin Resolution Notes</label>
              <textarea rows={3} placeholder="Enter resolution notes..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
            </div>

            <div className="flex gap-3">
              <button onClick={() => { toast('success', `Dispute ${selected.id} resolved`); setSelected(null); }}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                Resolve
              </button>
              <button onClick={() => { toast('info', `Dispute ${selected.id} under investigation`); setSelected(null); }}
                className="px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-colors">
                Investigate
              </button>
              <button onClick={() => { toast('info', `Dispute ${selected.id} closed`); setSelected(null); }}
                className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
