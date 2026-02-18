import { useState } from 'react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';
import { invoices } from '../../mock/data';
import type { Invoice } from '../../types';

export default function BrokerInvoices() {
  const [selected, setSelected] = useState<Invoice | null>(null);

  const columns = [
    { key: 'id', label: 'Invoice', render: (r: Invoice) => <span className="font-semibold text-slate-900">{r.id}</span> },
    { key: 'route', label: 'Route', render: (r: Invoice) => <span>{r.from} → {r.to}</span> },
    { key: 'shipperName', label: 'Shipper' },
    { key: 'baseAmount', label: 'Base', render: (r: Invoice) => <span>₹{r.baseAmount.toLocaleString('en-IN')}</span> },
    { key: 'gst', label: 'GST (18%)', render: (r: Invoice) => <span>₹{r.gst.toLocaleString('en-IN')}</span> },
    { key: 'totalAmount', label: 'Total', render: (r: Invoice) => <span className="font-bold text-slate-900">₹{r.totalAmount.toLocaleString('en-IN')}</span> },
    { key: 'status', label: 'Status', render: (r: Invoice) => <StatusBadge status={r.status} /> },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage all invoices</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Invoiced', value: `₹${(invoices.reduce((s, i) => s + i.totalAmount, 0) / 100000).toFixed(1)}L`, color: 'text-blue-600' },
          { label: 'Paid', value: `₹${(invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.totalAmount, 0) / 100000).toFixed(1)}L`, color: 'text-emerald-600' },
          { label: 'Pending', value: `₹${(invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.totalAmount, 0) / 100000).toFixed(1)}L`, color: 'text-amber-600' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">{c.label}</p>
            <p className={`text-xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={invoices as unknown as Record<string, unknown>[]}
        onRowClick={(row) => setSelected(row as unknown as Invoice)}
      />

      {/* Invoice preview modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Invoice ${selected?.id ?? ''}`} width="max-w-xl">
        {selected && (
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg p-5 space-y-3">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-bold text-slate-900">{selected.id}</p>
                  <p className="text-xs text-slate-500">Trip: {selected.tripId} · Load: {selected.loadId}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="border-t border-slate-100 pt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500">Route</p>
                  <p className="font-medium text-slate-800">{selected.from} → {selected.to}</p>
                </div>
                <div>
                  <p className="text-slate-500">Shipper</p>
                  <p className="font-medium text-slate-800">{selected.shipperName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Transporter</p>
                  <p className="font-medium text-slate-800">{selected.transporterName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Date</p>
                  <p className="font-medium text-slate-800">{selected.date}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Base Amount</span><span>₹{selected.baseAmount.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">GST (18%)</span><span>₹{selected.gst.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Broker Commission (5%)</span><span className="text-emerald-600">₹{selected.brokerCommission.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-base">
                  <span>Total</span>
                  <span>₹{selected.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Download PDF
              </button>
              <button className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">
                Send to Shipper
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
