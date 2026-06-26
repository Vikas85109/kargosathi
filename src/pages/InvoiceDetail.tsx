import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Share2, Truck, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { getInvoice } from '@/data';
import { formatINR, formatDate } from '@/utils';
import { useToast } from '@/context/ToastContext';
import NotFound from './NotFound';

export default function InvoiceDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const inv = getInvoice(id ?? '');
  if (!inv) return <NotFound />;

  const onShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) navigator.clipboard.writeText(url);
    toast('success', 'Invoice link copied to clipboard');
  };
  const onDownload = () => toast('info', 'Generating PDF… (demo)');

  return (
    <>
      <PageHeader title={`Invoice ${inv.id}`} crumbs={[{ label: 'Invoices', to: '/invoices' }, { label: inv.id }]} />

      <Container className="py-10">
        {/* Actions */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/invoices" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700 dark:text-slate-400">
            <ArrowLeft size={16} /> Back to invoices
          </Link>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}><Printer size={15} /> Print</Button>
            <Button variant="outline" size="sm" onClick={onShare}><Share2 size={15} /> Share</Button>
            <Button size="sm" onClick={onDownload}><Download size={15} /> Download PDF</Button>
          </div>
        </div>

        {/* Invoice document */}
        <Card className="print-area mx-auto max-w-3xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-brand-800 to-brand-600 p-8 text-white">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15"><Truck size={24} /></span>
                <div>
                  <p className="text-xl font-extrabold">Kargo<span className="text-accent-400">Sathi</span></p>
                  <p className="text-xs text-brand-100">Logistics Pvt. Ltd.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold">INVOICE</p>
                <p className="text-sm text-brand-100">{inv.id}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* From / To */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">From</p>
                <p className="mt-2 font-bold text-slate-900 dark:text-white">KargoSathi Logistics Pvt. Ltd.</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Smart World Gems, Sector 89,<br />Gurgaon, Haryana 122505</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">GSTIN: 06AAACK5500K1Z5</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">shubham.sharma6803@gmail.com</p>
              </div>
              <div className="sm:text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Bill To</p>
                <p className="mt-2 font-bold text-slate-900 dark:text-white">{inv.customer}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{inv.customerAddress}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">GSTIN: {inv.customerGstin}</p>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 p-4 sm:grid-cols-4">
              {[
                ['Invoice Date', formatDate(inv.date)],
                ['Due Date', formatDate(inv.dueDate)],
                ['Booking ID', inv.bookingId],
                ['Payment Mode', inv.paymentMode],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-slate-400">{k}</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{v}</p>
                </div>
              ))}
            </div>

            {/* Line items */}
            <table className="mt-6 w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3">Description</th>
                  <th className="py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {inv.lines.map((l) => (
                  <tr key={l.label}>
                    <td className="py-3 text-slate-700 dark:text-slate-300">{l.label}</td>
                    <td className="py-3 text-right font-medium text-slate-800 dark:text-slate-100">{formatINR(l.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="mt-4 flex justify-end">
              <div className="w-full max-w-xs space-y-2 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Taxable Amount</span><span>{formatINR(inv.amount)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>CGST (9%)</span><span>{formatINR(Math.round(inv.gst / 2))}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>SGST (9%)</span><span>{formatINR(inv.gst - Math.round(inv.gst / 2))}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 text-base font-extrabold text-slate-900 dark:text-white">
                  <span>Total</span><span className="text-brand-700 dark:text-brand-300">{formatINR(inv.total)}</span>
                </div>
              </div>
            </div>

            {/* Payment status */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Payment Status:</span>
                <StatusBadge status={inv.status} />
              </div>
              {inv.status === 'Paid' && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-success-600"><CheckCircle2 size={16} /> Payment received via {inv.paymentMode}</span>
              )}
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              This is a computer-generated invoice. Thank you for choosing KargoSathi.
            </p>
          </div>
        </Card>
      </Container>
    </>
  );
}
