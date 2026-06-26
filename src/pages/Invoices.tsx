import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, FileText, IndianRupee, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { DataTable, type Column } from '@/components/common/DataTable';
import { Input, Select } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { invoices } from '@/data';
import { downloadCSV, formatINR, formatINRShort, formatDate } from '@/utils';
import type { Invoice } from '@/types';

export default function Invoices() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      if (q) {
        const s = q.toLowerCase();
        if (!inv.id.toLowerCase().includes(s) && !inv.customer.toLowerCase().includes(s) && !inv.bookingId.toLowerCase().includes(s)) return false;
      }
      if (status && inv.status !== status) return false;
      return true;
    });
  }, [q, status]);

  const totals = useMemo(() => ({
    total: invoices.reduce((s, i) => s + i.total, 0),
    paid: invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.total, 0),
    pending: invoices.filter((i) => i.status === 'Pending' || i.status === 'Partial').reduce((s, i) => s + i.total, 0),
    overdue: invoices.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.total, 0),
  }), []);

  const columns: Column<Invoice>[] = [
    { key: 'id', header: 'Invoice No.', sortValue: (r) => r.id, render: (r) => <span className="font-mono text-xs font-semibold text-brand-600">{r.id}</span> },
    { key: 'bookingId', header: 'Booking ID', render: (r) => <span className="font-mono text-xs">{r.bookingId}</span> },
    { key: 'customer', header: 'Customer', sortValue: (r) => r.customer, render: (r) => <span className="font-semibold text-slate-800 dark:text-slate-100">{r.customer}</span> },
    { key: 'date', header: 'Date', sortValue: (r) => r.date, render: (r) => formatDate(r.date) },
    { key: 'amount', header: 'Amount', sortValue: (r) => r.amount, render: (r) => formatINR(r.amount) },
    { key: 'gst', header: 'GST', render: (r) => formatINR(r.gst) },
    { key: 'total', header: 'Total', sortValue: (r) => r.total, render: (r) => <span className="font-bold text-slate-900 dark:text-white">{formatINR(r.total)}</span> },
    { key: 'status', header: 'Payment', render: (r) => <StatusBadge status={r.status} /> },
  ];

  const exportCsv = () => {
    downloadCSV('invoices.csv', filtered.map((i) => ({
      Invoice: i.id, Booking: i.bookingId, Customer: i.customer, Date: i.date,
      Amount: i.amount, GST: i.gst, Total: i.total, Status: i.status,
    })));
  };

  const cards = [
    { label: 'Total Invoiced', value: totals.total, icon: IndianRupee, tone: 'from-brand-700 to-brand-500' },
    { label: 'Paid', value: totals.paid, icon: CheckCircle2, tone: 'from-success-600 to-success-500' },
    { label: 'Pending', value: totals.pending, icon: Clock, tone: 'from-amber-500 to-amber-400' },
    { label: 'Overdue', value: totals.overdue, icon: AlertTriangle, tone: 'from-red-600 to-red-500' },
  ];

  return (
    <>
      <PageHeader
        title="Invoice Management"
        subtitle="View, search, and manage all freight invoices with GST-compliant breakups."
        crumbs={[{ label: 'Invoices' }]}
        action={<Button variant="accent" onClick={exportCsv}><Download size={16} /> Export CSV</Button>}
      />

      <Container className="py-12">
        {/* Summary cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {cards.map((c) => (
            <div key={c.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.tone} p-5 text-white shadow-lg`}>
              <div className="absolute -right-4 -top-4 opacity-20"><c.icon size={80} /></div>
              <c.icon size={22} />
              <p className="mt-3 text-2xl font-extrabold">{formatINRShort(c.value)}</p>
              <p className="text-sm opacity-90">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <Card className="p-5 mb-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative sm:col-span-2">
              <Search size={15} className="absolute left-3 top-3.5 text-slate-400" />
              <Input placeholder="Invoice no, customer or booking ID…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <Select
              options={['Paid', 'Pending', 'Partial', 'Overdue'].map((s) => ({ value: s, label: s }))}
              placeholder="All payment status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </Card>

        <DataTable columns={columns} rows={filtered} pageSize={8} onRowClick={(r) => navigate(`/invoices/${r.id}`)} />
      </Container>
    </>
  );
}
