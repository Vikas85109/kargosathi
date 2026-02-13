import { useAuth } from '../../context/AuthContext';
import { useBroker } from '../../context/BrokerContext';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-800 sm:mt-0 sm:col-span-2 font-medium">{value || '\u2014'}</dd>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { applications } = useBroker();
  const app = applications.find((a) => a.phone === user?.phone);

  if (!app) return <div className="text-center py-16 text-slate-500">No profile data found.</div>;

  return (
    <div>
      <h1 className="text-xl font-bold text-slate-800 mb-6">My Profile</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">{app.name?.[0] ?? 'B'}</div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{app.name}</h2>
              <p className="text-sm text-slate-500">{app.companyName}</p>
              <p className="text-xs text-slate-400 mt-0.5">ID: {app.id}</p>
            </div>
          </div>
        </div>

        {[
          { title: 'Basic Information', rows: [['Phone', `+91 ${app.phone}`], ['Email', app.email], ['City', app.city], ['Experience', app.experience]] },
          { title: 'Company Details', rows: [['Company', app.companyName], ['GST', app.gst], ['PAN', app.pan], ['Business Type', app.businessType], ['Address', app.address]] },
          { title: 'Bank Details', rows: [['Account Holder', app.accountName], ['Account Number', app.accountNumber ? `****${app.accountNumber.slice(-4)}` : ''], ['IFSC', app.ifsc], ['UPI', app.upi]] },
        ].map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700">{section.title}</h3>
            </div>
            <div className="px-5 divide-y divide-slate-100">
              {section.rows.map(([label, value]) => <Row key={label} label={label} value={value} />)}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700">Operating Area</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: 'Routes', items: app.routes, cls: 'bg-blue-50 text-blue-700' },
              { label: 'Truck Types', items: app.truckTypes, cls: 'bg-emerald-50 text-emerald-700' },
              { label: 'Load Types', items: app.loadTypes, cls: 'bg-amber-50 text-amber-700' },
            ].map((g) => (
              <div key={g.label}>
                <p className="text-xs text-slate-500 mb-1.5">{g.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(g.items || []).map((i) => <span key={i} className={`px-2 py-0.5 rounded text-xs font-medium ${g.cls}`}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
