import { useBroker } from '../../context/BrokerContext';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200">
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-800 mt-0.5">{value || '\u2014'}</p>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-sm text-slate-400">None selected</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">{i}</span>)}
    </div>
  );
}

interface Props { onBack: () => void; onSubmit: () => void }

export default function Step7Review({ onBack, onSubmit }: Props) {
  const { formData } = useBroker();
  const typeLabels: Record<string, string> = { per_load: 'Per Load', monthly: 'Monthly Fixed', hybrid: 'Hybrid' };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Review & Submit</h3>
        <p className="text-sm text-slate-500">Please verify all details before submitting</p>
      </div>

      <div className="space-y-4">
        <Section title="Basic Details">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Full Name" value={formData.name} />
            <Field label="Phone" value={formData.phone} />
            <Field label="Email" value={formData.email} />
            <Field label="City" value={formData.city} />
            <Field label="Experience" value={formData.experience} />
          </div>
        </Section>

        <Section title="Company Details">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Company Name" value={formData.companyName} />
            <Field label="GST Number" value={formData.gst} />
            <Field label="PAN Number" value={formData.pan} />
            <Field label="Business Type" value={formData.businessType} />
            <div className="sm:col-span-2"><Field label="Address" value={formData.address} /></div>
          </div>
        </Section>

        <Section title="Documents">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="PAN Card" value={formData.panFile} />
            <Field label="GST Certificate" value={formData.gstFile} />
            <Field label="Aadhaar Card" value={formData.aadhaarFile} />
            <Field label="Cancelled Cheque" value={formData.chequeFile} />
          </div>
        </Section>

        <Section title="Bank Details">
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Account Holder" value={formData.accountName} />
            <Field label="Account Number" value={formData.accountNumber} />
            <Field label="IFSC Code" value={formData.ifsc} />
            <Field label="UPI ID" value={formData.upi} />
          </div>
        </Section>

        <Section title="Operating Area">
          <div className="space-y-3">
            <div><p className="text-xs text-slate-500 mb-1.5">Routes</p><Tags items={formData.routes} /></div>
            <div><p className="text-xs text-slate-500 mb-1.5">Truck Types</p><Tags items={formData.truckTypes} /></div>
            <div><p className="text-xs text-slate-500 mb-1.5">Load Types</p><Tags items={formData.loadTypes} /></div>
          </div>
        </Section>

        <Section title="Commission">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Commission Type" value={typeLabels[formData.commissionType] || formData.commissionType} />
            <Field label="Commission %" value={formData.commissionPercent ? `${formData.commissionPercent}%` : ''} />
          </div>
        </Section>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Note:</span> Once submitted, your application will be reviewed by the admin team.
        </p>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Back</button>
        <button type="button" onClick={onSubmit} className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">Submit Application</button>
      </div>
    </div>
  );
}
