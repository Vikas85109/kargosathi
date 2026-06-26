import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Mail, Truck, BadgeCheck, ArrowRight, Filter, X } from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { StarRating } from '@/components/common/StarRating';
import { EmptyState } from '@/components/common/EmptyState';
import { Select, Input } from '@/components/common/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { transporters } from '@/data';
import { CITIES, STATES, SERVICE_TYPES, SERVICE_LABELS } from '@/data/constants';
import { Button } from '@/components/common/Button';

const FLEET_RANGES = [
  { value: '', label: 'Any fleet size' },
  { value: '0-50', label: 'Up to 50 trucks' },
  { value: '50-150', label: '50 – 150 trucks' },
  { value: '150-300', label: '150 – 300 trucks' },
  { value: '300-9999', label: '300+ trucks' },
];

export default function Transporters() {
  const [q, setQ] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [fleet, setFleet] = useState('');
  const [service, setService] = useState('');

  const filtered = useMemo(() => {
    return transporters.filter((t) => {
      if (q && !t.name.toLowerCase().includes(q.toLowerCase()) && !t.contactPerson.toLowerCase().includes(q.toLowerCase())) return false;
      if (state && t.state !== state) return false;
      if (city && t.city !== city) return false;
      if (service && !t.serviceTypes.includes(service as never)) return false;
      if (fleet) {
        const [min, max] = fleet.split('-').map(Number);
        if (t.fleetSize < min || t.fleetSize > max) return false;
      }
      return true;
    });
  }, [q, state, city, fleet, service]);

  const reset = () => { setQ(''); setState(''); setCity(''); setFleet(''); setService(''); };
  const hasFilters = q || state || city || fleet || service;

  return (
    <>
      <PageHeader
        title="Transporters Directory"
        subtitle="Discover verified transport companies across India. Filter by location, fleet size, and service type."
        crumbs={[{ label: 'Transporters' }]}
      />

      <Container className="py-12">
        {/* Filters */}
        <Card className="p-5 mb-8">
          <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-200">
            <Filter size={16} /> <span className="font-bold text-sm">Search & Filter</span>
            {hasFilters && (
              <button onClick={reset} className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline">
                <X size={13} /> Clear all
              </button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-3.5 text-slate-400" />
              <Input placeholder="Company name…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <Select options={STATES.map((s) => ({ value: s, label: s }))} placeholder="All states" value={state} onChange={(e) => setState(e.target.value)} />
            <Select options={CITIES.map((c) => ({ value: c, label: c }))} placeholder="All cities" value={city} onChange={(e) => setCity(e.target.value)} />
            <Select options={FLEET_RANGES.slice(1)} placeholder="Any fleet size" value={fleet} onChange={(e) => setFleet(e.target.value)} />
            <Select options={SERVICE_TYPES.map((s) => ({ value: s, label: SERVICE_LABELS[s] }))} placeholder="All services" value={service} onChange={(e) => setService(e.target.value)} />
          </div>
        </Card>

        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filtered.length}</span> transporters
        </p>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <Card key={t.id} hover className="group flex flex-col p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-lg font-extrabold text-white">
                    {t.logo}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-bold text-slate-900 dark:text-white">{t.name}</h3>
                      {t.verified === 'Verified' && <BadgeCheck size={16} className="shrink-0 text-success-500" />}
                    </div>
                    <p className="text-xs text-slate-500">{t.contactPerson}</p>
                    <div className="mt-1"><StarRating value={t.rating} size={12} /> <span className="text-xs text-slate-400">({t.reviewsCount})</span></div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <p className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" /> {t.city}, {t.state}</p>
                  <p className="flex items-center gap-2"><Truck size={14} className="text-slate-400" /> Fleet of {t.fleetSize} vehicles</p>
                  <p className="flex items-center gap-2 truncate"><Phone size={14} className="text-slate-400" /> {t.phone}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {t.serviceTypes.slice(0, 3).map((s) => (
                    <Badge key={s} tone="info">{s}</Badge>
                  ))}
                  {t.serviceTypes.length > 3 && <Badge tone="neutral">+{t.serviceTypes.length - 3}</Badge>}
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-5">
                  <Badge tone={t.verified === 'Verified' ? 'success' : t.verified === 'Pending' ? 'warning' : 'error'} dot>{t.verified}</Badge>
                  <Link to={`/transporters/${t.id}`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300 group-hover:gap-2 transition-all">
                    View Profile <ArrowRight size={15} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
