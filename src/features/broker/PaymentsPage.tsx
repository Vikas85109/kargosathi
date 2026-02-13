import { mockPayments } from '../../mock/data';

const cls: Record<string, string> = {
  paid: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  processing: 'bg-blue-50 text-blue-700',
};

export default function PaymentsPage() {
  const totalPaid = mockPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = mockPayments.filter((p) => p.status !== 'paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-6">Payments</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500 mb-1">Total Received</p>
          <p className="text-2xl font-bold text-emerald-600">{'\u20B9'}{totalPaid.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500 mb-1">Pending Amount</p>
          <p className="text-2xl font-bold text-amber-600">{'\u20B9'}{totalPending.toLocaleString('en-IN')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {['Payment ID', 'Load ID', 'Amount', 'Method', 'Date', 'Status'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700">{p.id}</td>
                  <td className="px-4 py-3 text-slate-600">{p.loadId}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{'\u20B9'}{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-slate-600">{p.method}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${cls[p.status] ?? ''}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
