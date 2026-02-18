import { useState } from 'react';
import { users } from '../../mock/data';
import StatusBadge from '../../components/StatusBadge';
import DocumentCard from '../../components/DocumentCard';
import Modal from '../../components/Modal';
import { useToast } from '../../context/ToastContext';
import type { User } from '../../types';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function KycReview() {
  const { toast } = useToast();
  const [selected, setSelected] = useState<User | null>(null);
  const pendingKyc = users.filter((u) => u.kycStatus === 'pending');
  const allUsers = users.filter((u) => u.role !== 'admin');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">KYC Review</h1>
        <p className="text-sm text-slate-500 mt-1">{pendingKyc.length} KYC applications pending review</p>
      </div>

      {/* Pending KYC */}
      {pendingKyc.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-500" />
            Pending Review
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingKyc.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelected(user)}
                className="bg-white rounded-xl border-2 border-amber-200 p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                  <StatusBadge status={user.kycStatus} />
                </div>
                <p className="text-xs text-slate-500">{user.email}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role} · {user.company || 'Individual'}</p>
                <p className="text-xs text-slate-400 mt-2">Submitted: {user.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All users KYC status */}
      <div>
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-500" />
          All Users KYC Status
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {allUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelected(user)}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role} · {user.company || 'Individual'}</p>
                  </div>
                </div>
                <StatusBadge status={user.kycStatus} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KYC Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`KYC Review: ${selected?.name ?? ''}`} width="max-w-2xl">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Name:</span> <span className="font-medium">{selected.name}</span></div>
              <div><span className="text-slate-500">Role:</span> <span className="font-medium capitalize">{selected.role}</span></div>
              <div><span className="text-slate-500">Phone:</span> <span className="font-medium">{selected.phone}</span></div>
              <div><span className="text-slate-500">Company:</span> <span className="font-medium">{selected.company || '—'}</span></div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800 mb-2">Documents</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DocumentCard title="PAN Card" fileName={`PAN_${selected.id}.pdf`} status={selected.kycStatus === 'verified' ? 'verified' : 'pending'} />
                <DocumentCard title="Aadhaar Card" fileName={`AADHAAR_${selected.id}.pdf`} status={selected.kycStatus === 'verified' ? 'verified' : 'pending'} />
                <DocumentCard title="GST Certificate" fileName={`GST_${selected.id}.pdf`} status={selected.kycStatus === 'verified' ? 'verified' : 'pending'} />
                <DocumentCard title="Bank Proof" fileName={`BANK_${selected.id}.pdf`} status={selected.kycStatus === 'verified' ? 'verified' : 'pending'} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => { toast('success', `KYC verified for ${selected.name}`); setSelected(null); }}
                className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
                Verify KYC
              </button>
              <button onClick={() => { toast('error', `KYC rejected for ${selected.name}`); setSelected(null); }}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors">
                Reject
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
