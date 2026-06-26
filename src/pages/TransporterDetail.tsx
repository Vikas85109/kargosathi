import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Truck, BadgeCheck, Calendar, FileText, Quote, ArrowLeft, MessageSquare,
} from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Badge, StatusBadge } from '@/components/common/Badge';
import { StarRating } from '@/components/common/StarRating';
import { ButtonLink } from '@/components/common/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { getTransporter } from '@/data';
import { SERVICE_LABELS } from '@/data/constants';
import { formatDate } from '@/utils';
import NotFound from './NotFound';

export default function TransporterDetail() {
  const { id } = useParams();
  const t = getTransporter(id ?? '');
  if (!t) return <NotFound />;

  return (
    <>
      <PageHeader
        title={t.name}
        crumbs={[{ label: 'Transporters', to: '/transporters' }, { label: t.name }]}
      />

      <Container className="py-10">
        <Link to="/transporters" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700 dark:text-slate-400">
          <ArrowLeft size={16} /> Back to directory
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile header */}
            <Card className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-2xl font-extrabold text-white">
                  {t.logo}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t.name}</h2>
                    {t.verified === 'Verified' && <BadgeCheck size={20} className="text-success-500" />}
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><MapPin size={14} /> {t.city}, {t.state}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <StarRating value={t.rating} /> <span className="text-sm text-slate-400">{t.reviewsCount} reviews</span>
                    <Badge tone={t.verified === 'Verified' ? 'success' : 'warning'} dot>{t.verified}</Badge>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t.about}</p>
            </Card>

            {/* Fleet & services */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Fleet & Services</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ['Fleet Size', `${t.fleetSize}`],
                  ['Established', `${t.established}`],
                  ['Service Areas', `${t.serviceAreas.length}`],
                  ['Rating', `${t.rating}/5`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-center">
                    <p className="text-xl font-extrabold text-brand-700 dark:text-brand-300">{v}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{k}</p>
                  </div>
                ))}
              </div>
              <h4 className="mt-6 mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">Services Offered</h4>
              <div className="flex flex-wrap gap-2">
                {t.serviceTypes.map((s) => <Badge key={s} tone="info">{SERVICE_LABELS[s]}</Badge>)}
              </div>
              <h4 className="mt-5 mb-2 text-sm font-bold text-slate-700 dark:text-slate-300">Operating Routes</h4>
              <div className="flex flex-wrap gap-2">
                {t.operatingRoutes.map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Truck size={13} className="text-accent-500" /> {r}
                  </span>
                ))}
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Documents & Compliance</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {t.documents.map((d) => (
                  <div key={d.name} className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"><FileText size={16} /></span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{d.name}</p>
                        <p className="text-xs text-slate-400">Expiry: {d.expiry}</p>
                      </div>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Reviews */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Customer Reviews</h3>
              <div className="mt-4 space-y-4">
                {t.reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-slate-100 dark:border-slate-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-200">
                          {r.author.split(' ').map((w) => w[0]).join('')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{r.author}</p>
                          <p className="text-xs text-slate-400">{formatDate(r.date)}</p>
                        </div>
                      </div>
                      <StarRating value={r.rating} size={12} showValue={false} />
                    </div>
                    <p className="mt-3 flex gap-2 text-sm text-slate-600 dark:text-slate-400"><Quote size={16} className="shrink-0 text-accent-300" /> {r.comment}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Contact Information</h3>
              <div className="mt-4 space-y-3 text-sm">
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Phone size={15} /></span> {t.phone}</p>
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Mail size={15} /></span> <span className="truncate">{t.email}</span></p>
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><MapPin size={15} /></span> {t.city}, {t.state}</p>
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><Calendar size={15} /></span> Since {t.established}</p>
              </div>
              <ButtonLink to={`/enquiry?transporter=${encodeURIComponent(t.name)}&from=${encodeURIComponent(t.city)}`} className="mt-5 w-full"><MessageSquare size={16} /> Request a Quote</ButtonLink>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 dark:text-white">Service Areas</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.serviceAreas.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300"><MapPin size={11} /> {a}</span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
