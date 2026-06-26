import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Phone, Mail, MapPin, Truck, FileText, ShieldCheck, Gauge, IndianRupee, Route,
} from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { StarRating } from '@/components/common/StarRating';
import { ButtonLink } from '@/components/common/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { getTruckOwner, bookings } from '@/data';
import { formatINR, formatINRShort } from '@/utils';
import NotFound from './NotFound';

export default function TruckOwnerDetail() {
  const { id } = useParams();
  const o = getTruckOwner(id ?? '');
  if (!o) return <NotFound />;

  const trips = bookings.filter((b) => b.vehicleNumber === o.vehicleNumber).slice(0, 5);

  return (
    <>
      <PageHeader title={o.ownerName} crumbs={[{ label: 'Truck Owners', to: '/truck-owners' }, { label: o.ownerName }]} />

      <Container className="py-10">
        <Link to="/truck-owners" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700 dark:text-slate-400">
          <ArrowLeft size={16} /> Back to truck owners
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-xl font-extrabold text-white">
                  {o.ownerName.split(' ').map((w) => w[0]).join('')}
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{o.ownerName}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><MapPin size={14} /> {o.address}</p>
                  <div className="mt-2"><StarRating value={o.rating} /></div>
                </div>
              </div>
            </Card>

            {/* Vehicle info */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Truck size={18} className="text-brand-600" /> Vehicle Information</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ['Truck Type', o.truckType], ['Vehicle Number', o.vehicleNumber],
                  ['RC Number', o.rcNumber], ['Model Year', `${o.modelYear}`],
                  ['Capacity', `${o.capacityTons} Tons`], ['Driver', o.driverName],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800 px-4 py-3">
                    <span className="text-sm text-slate-500">{k}</span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{v}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Compliance */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><ShieldCheck size={18} className="text-success-600" /> Documents & Compliance</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Insurance', o.insuranceStatus], ['Permit', o.permitStatus], ['Fitness Certificate', o.fitnessStatus],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center">
                    <FileText size={20} className="mx-auto text-slate-400" />
                    <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">{k}</p>
                    <div className="mt-2 flex justify-center"><StatusBadge status={v} /></div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Assigned trips */}
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Route size={18} className="text-accent-500" /> Recent Assigned Trips</h3>
              {trips.length ? (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead><tr className="text-left text-xs font-bold uppercase text-slate-400">
                      <th className="py-2 pr-4">Booking</th><th className="py-2 pr-4">Route</th><th className="py-2 pr-4">Status</th><th className="py-2">Amount</th>
                    </tr></thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {trips.map((b) => (
                        <tr key={b.id}>
                          <td className="py-3 pr-4 font-mono text-xs">{b.id}</td>
                          <td className="py-3 pr-4">{b.source} → {b.destination}</td>
                          <td className="py-3 pr-4"><StatusBadge status={b.status} /></td>
                          <td className="py-3 font-semibold">{formatINR(b.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">No recent trips recorded for this vehicle.</p>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 p-4 text-white">
                  <IndianRupee size={18} />
                  <p className="mt-2 text-xl font-extrabold">{formatINRShort(o.revenue)}</p>
                  <p className="text-xs text-brand-100">Total Revenue</p>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4">
                  <Gauge size={18} className="text-accent-500" />
                  <p className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">{o.assignedTrips}</p>
                  <p className="text-xs text-slate-500">Trips Completed</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Contact</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Phone size={15} /></span> {o.mobile}</p>
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Mail size={15} /></span> <span className="truncate">{o.email}</span></p>
              </div>
              <ButtonLink to={`/enquiry?vehicle=${encodeURIComponent(o.truckType)}&from=${encodeURIComponent(o.city)}`} className="mt-5 w-full">Book This Truck</ButtonLink>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
