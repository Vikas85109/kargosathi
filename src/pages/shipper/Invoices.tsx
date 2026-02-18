import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { invoices } from '../../mock/data';
import type { Invoice } from '../../types';
import { Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ShipperInvoices() {
  const { toast } = useToast();
  const myInvoices = invoices.filter((i) => i.shipperName === 'Reliance FMCG' || i.shipperName === 'Asian Paints Ltd.');

  const columns = [
    { key: 'id', label: 'Invoice', render: (r: Invoice) => <span className="font-semibold">{r.id}</span> },
    { key: 'route', label: 'Route', render: (r: Invoice) => `${r.from} → ${r.to}` },
    { key: 'totalAmount', label: 'Amount', render: (r: Invoice) => <span className="font-bold">₹{r.totalAmount.toLocaleString('en-IN')}</span> },
    { key: 'gst', label: 'GST', render: (r: Invoice) => `₹${r.gst.toLocaleString('en-IN')}` },
    { key: 'status', label: 'Status', render: (r: Invoice) => <StatusBadge status={r.status} /> },
    { key: 'dueDate', label: 'Due Date' },
    {
      key: 'action', label: '', render: () => (
        <button onClick={() => toast('info', 'Invoice PDF downloaded')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
          <Download size={16} />
        </button>
      )
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
        <p className="text-sm text-slate-500 mt-1">View and download your invoices</p>
      </div>
      <DataTable columns={columns} data={myInvoices as unknown as Record<string, unknown>[]} />
    </div>
  );
}
