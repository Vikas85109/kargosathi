import { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { users } from '../../mock/data';
import { useToast } from '../../context/ToastContext';
import type { User } from '../../types';

export default function UserApproval() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'suspended'>('all');

  const filtered = filter === 'all' ? users : users.filter((u) => u.status === filter);

  const columns = [
    { key: 'id', label: 'ID', render: (r: User) => <span className="font-semibold text-slate-900">{r.id}</span> },
    { key: 'name', label: 'Name', render: (r: User) => (
      <div>
        <p className="font-medium text-slate-800">{r.name}</p>
        <p className="text-xs text-slate-500">{r.email}</p>
      </div>
    )},
    { key: 'role', label: 'Role', render: (r: User) => <span className="capitalize">{r.role}</span> },
    { key: 'company', label: 'Company', render: (r: User) => r.company || '—' },
    { key: 'status', label: 'Status', render: (r: User) => <StatusBadge status={r.status} /> },
    { key: 'kycStatus', label: 'KYC', render: (r: User) => <StatusBadge status={r.kycStatus} /> },
    { key: 'createdAt', label: 'Joined' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Approval</h1>
        <p className="text-sm text-slate-500 mt-1">{users.filter((u) => u.status === 'pending').length} users pending approval</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'pending', 'active', 'suspended'] as const).map((f) => (
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
        onRowClick={(row) => setSelected(row as unknown as User)}
      />

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`User: ${selected?.name ?? ''}`}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">ID:</span> <span className="font-medium">{selected.id}</span></div>
              <div><span className="text-slate-500">Role:</span> <span className="font-medium capitalize">{selected.role}</span></div>
              <div><span className="text-slate-500">Email:</span> <span className="font-medium">{selected.email}</span></div>
              <div><span className="text-slate-500">Phone:</span> <span className="font-medium">{selected.phone}</span></div>
              <div><span className="text-slate-500">Company:</span> <span className="font-medium">{selected.company || '—'}</span></div>
              <div><span className="text-slate-500">Joined:</span> <span className="font-medium">{selected.createdAt}</span></div>
              <div><span className="text-slate-500">Status:</span> <StatusBadge status={selected.status} /></div>
              <div><span className="text-slate-500">KYC:</span> <StatusBadge status={selected.kycStatus} /></div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => { toast('success', `${selected.name} approved`); setSelected(null); }}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                Approve
              </button>
              <button onClick={() => { toast('error', `${selected.name} suspended`); setSelected(null); }}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
                Suspend
              </button>
              <button onClick={() => setSelected(null)}
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
