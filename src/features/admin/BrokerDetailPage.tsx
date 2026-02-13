import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBroker } from '../../context/BrokerContext';
import { useToast } from '../../context/ToastContext';
import StatusBadge from '../../components/StatusBadge';
import type { AppStatus } from '../../types';

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      <p className={`text-sm font-medium text-slate-800 ${mono ? 'font-mono' : ''}`}>{value || '\u2014'}</p>
    </div>
  );
}

function DocItem({ label, filename }: { label: string; filename: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700 truncate">{filename || 'Not uploaded'}</p>
      </div>
      {filename && (
        <span className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default function BrokerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { applications, updateStatus } = useBroker();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(false);

  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="text-center py-16">
        <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-3">
          <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">Application not found</p>
        <button onClick={() => navigate('/admin/applications')} className="mt-3 text-sm text-violet-600 hover:underline font-medium">Back to list</button>
      </div>
    );
  }

  const handleAction = async (status: AppStatus) => {
    setLoading(true);
    await updateStatus(app.id, status, remarks);
    toast('success', `Application ${status.replace('_', ' ')} successfully`);
    setRemarks('');
    setShowActions(false);
    setLoading(false);
  };

  const typeLabels: Record<string, string> = { per_load: 'Per Load', monthly: 'Monthly Fixed', hybrid: 'Hybrid' };

  return (
    <div>
      <button onClick={() => navigate('/admin/applications')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Applications
      </button>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 mb-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl font-bold flex-shrink-0">
              {app.name?.[0] ?? '?'}
            </div>
            <div>
              <h1 className="text-xl font-bold">{app.name}</h1>
              <p className="text-slate-300 text-sm">{app.companyName} &middot; {app.businessType}</p>
              <p className="text-slate-400 text-xs mt-1">ID: {app.id} &middot; Applied: {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <StatusBadge status={app.status as AppStatus} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-5 border-t border-white/10">
          <div><p className="text-xs text-slate-400">Phone</p><p className="text-sm font-medium">+91 {app.phone}</p></div>
          <div><p className="text-xs text-slate-400">Email</p><p className="text-sm font-medium truncate">{app.email}</p></div>
          <div><p className="text-xs text-slate-400">City</p><p className="text-sm font-medium">{app.city}</p></div>
          <div><p className="text-xs text-slate-400">Experience</p><p className="text-sm font-medium">{app.experience} years</p></div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <Section title="Company Details" icon={'\uD83C\uDFE2'}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company Name" value={app.companyName} />
            <Field label="Business Type" value={app.businessType} />
            <Field label="GST Number" value={app.gst} mono />
            <Field label="PAN Number" value={app.pan} mono />
            <div className="col-span-2"><Field label="Registered Address" value={app.address} /></div>
          </div>
        </Section>

        <Section title="Bank Details" icon={'\uD83C\uDFE6'}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Account Holder" value={app.accountName} />
            <Field label="Account Number" value={app.accountNumber} mono />
            <Field label="IFSC Code" value={app.ifsc} mono />
            <Field label="UPI ID" value={app.upi} />
          </div>
        </Section>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <Section title="Documents" icon={'\uD83D\uDCC4'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <DocItem label="PAN Card" filename={app.panFile} />
            <DocItem label="GST Certificate" filename={app.gstFile} />
            <DocItem label="Aadhaar Card" filename={app.aadhaarFile} />
            <DocItem label="Cancelled Cheque" filename={app.chequeFile} />
          </div>
        </Section>

        <Section title="Commission Setup" icon={'\uD83D\uDCB0'}>
          <div className="flex items-center gap-6 mb-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Commission Type</p>
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
                {typeLabels[app.commissionType] ?? app.commissionType}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Commission Rate</p>
              <span className="text-3xl font-bold text-slate-800">{app.commissionPercent}%</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-1">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all" style={{ width: `${(Number(app.commissionPercent) / 15) * 100}%` }} />
          </div>
          <p className="text-xs text-slate-400">Range: 0.5% — 15%</p>
        </Section>
      </div>

      {/* Operating Area - Full Width */}
      <Section title="Operating Area" icon={'\uD83D\uDDFA\uFE0F'}>
        <div className="grid sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Routes ({app.routes?.length ?? 0})</p>
            <div className="flex flex-wrap gap-1.5">
              {(app.routes?.length) ? app.routes.map((r) => (
                <span key={r} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100">{r}</span>
              )) : <span className="text-xs text-slate-400">None</span>}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Truck Types ({app.truckTypes?.length ?? 0})</p>
            <div className="flex flex-wrap gap-1.5">
              {(app.truckTypes?.length) ? app.truckTypes.map((t) => (
                <span key={t} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium border border-emerald-100">{t}</span>
              )) : <span className="text-xs text-slate-400">None</span>}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Load Types ({app.loadTypes?.length ?? 0})</p>
            <div className="flex flex-wrap gap-1.5">
              {(app.loadTypes?.length) ? app.loadTypes.map((l) => (
                <span key={l} className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium border border-amber-100">{l}</span>
              )) : <span className="text-xs text-slate-400">None</span>}
            </div>
          </div>
        </div>
      </Section>

      {/* Admin Actions */}
      <div className="mt-6 bg-white rounded-xl border-2 border-violet-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-800">Admin Decision</h3>
          </div>
          {!showActions && (
            <button onClick={() => setShowActions(true)} className="px-5 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">
              Take Action
            </button>
          )}
        </div>

        {app.adminRemarks && (
          <div className="bg-violet-50 rounded-lg p-4 mb-4 border border-violet-100">
            <p className="text-xs font-semibold text-violet-500 mb-1">Previous Remarks</p>
            <p className="text-sm text-violet-800">{app.adminRemarks}</p>
          </div>
        )}

        {showActions && (
          <div className="space-y-4 border-t border-slate-200 pt-4">
            <div>
              <label htmlFor="admin-remarks" className="block text-sm font-medium text-slate-700 mb-1">Remarks for broker (optional)</label>
              <textarea id="admin-remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3}
                placeholder="E.g., 'GST document is unclear, please re-upload' or 'All documents verified successfully'"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm resize-none" />
            </div>
            <div className="flex flex-wrap gap-3">
              <button disabled={loading} onClick={() => handleAction('approved')}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Approve
              </button>
              <button disabled={loading} onClick={() => handleAction('rejected')}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Reject
              </button>
              <button disabled={loading} onClick={() => handleAction('correction_required')}
                className="px-6 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                Need Correction
              </button>
              <button disabled={loading} onClick={() => handleAction('under_review')}
                className="px-6 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50">
                Mark Under Review
              </button>
              <button onClick={() => setShowActions(false)}
                className="px-6 py-2.5 border border-slate-300 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
