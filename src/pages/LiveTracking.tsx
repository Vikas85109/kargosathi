import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, MapPin, Navigation, Truck, Clock, User, Phone, PackageCheck, CircleDot, CheckCircle2,
} from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Field';
import { EmptyState } from '@/components/common/EmptyState';
import { MapPlaceholder } from '@/components/common/MapPlaceholder';
import { PageHeader } from '@/components/layout/PageHeader';
import { tracking } from '@/data';
import { cx } from '@/utils';
import type { TrackingRecord } from '@/types';

export default function LiveTracking() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [result, setResult] = useState<TrackingRecord | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const runSearch = (term: string) => {
    const s = term.trim().toLowerCase();
    if (!s) return;
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      const found = tracking.find(
        (t) =>
          t.lrNumber.toLowerCase() === s ||
          t.bookingId.toLowerCase() === s ||
          t.vehicleNumber.toLowerCase().replace(/\s/g, '') === s.replace(/\s/g, '')
      ) ?? tracking.find((t) => t.lrNumber.toLowerCase().includes(s) || t.bookingId.toLowerCase().includes(s));
      setResult(found ?? null);
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    if (params.get('q')) runSearch(params.get('q')!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sample = tracking[0];

  return (
    <>
      <PageHeader
        title="Live Truck Tracking"
        subtitle="Track your shipment in real-time using your LR number, Booking ID, or vehicle number."
        crumbs={[{ label: 'Live Tracking' }]}
      />

      <Container className="py-12">
        {/* Search bar */}
        <Card className="p-6 mb-8">
          <form
            onSubmit={(e) => { e.preventDefault(); runSearch(query); }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
              <Input
                placeholder="Enter LR Number, Booking ID or Vehicle Number…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-11 py-3"
              />
            </div>
            <Button type="submit" size="lg"><Search size={18} /> Track Shipment</Button>
          </form>
          <p className="mt-3 text-xs text-slate-400">
            Try: <button type="button" onClick={() => { setQuery(sample.bookingId); runSearch(sample.bookingId); }} className="font-semibold text-brand-600 hover:underline">{sample.bookingId}</button>
            {' '}or <button type="button" onClick={() => { setQuery(sample.lrNumber); runSearch(sample.lrNumber); }} className="font-semibold text-brand-600 hover:underline">{sample.lrNumber}</button>
          </p>
        </Card>

        {loading ? (
          <Card className="flex flex-col items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700" />
            <p className="mt-4 text-sm text-slate-500">Locating your shipment…</p>
          </Card>
        ) : result ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Map + details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-400">Booking ID</p>
                    <p className="font-extrabold text-slate-900 dark:text-white">{result.bookingId} · {result.lrNumber}</p>
                  </div>
                  <StatusBadge status={result.status} />
                </div>
                <MapPlaceholder source={result.source} destination={result.destination} current={result.currentLocation} progress={result.distanceCovered} />
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{result.source}</span>
                    <span className="font-semibold text-brand-600">{result.distanceCovered}% completed</span>
                    <span>{result.destination}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-500 transition-all" style={{ width: `${result.distanceCovered}%` }} />
                  </div>
                </div>
              </Card>

              {/* Status timeline */}
              <Card className="p-6">
                <h3 className="font-bold text-slate-900 dark:text-white">Shipment Status Timeline</h3>
                <div className="mt-5 space-y-0">
                  {result.timeline.map((ev, i) => {
                    const isLastDone = ev.done && (i === result.timeline.length - 1 || !result.timeline[i + 1].done);
                    return (
                      <div key={ev.status} className="relative flex gap-4 pb-6 last:pb-0">
                        {i < result.timeline.length - 1 && (
                          <span className={cx('absolute left-[11px] top-7 h-full w-0.5', ev.done ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-700')} />
                        )}
                        <span className={cx(
                          'relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                          ev.done ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400',
                          isLastDone && 'ring-4 ring-brand-500/20'
                        )}>
                          {ev.done ? (isLastDone ? <CircleDot size={14} className="animate-pulse-dot" /> : <CheckCircle2 size={14} />) : <CircleDot size={12} />}
                        </span>
                        <div className="flex flex-1 flex-wrap items-center justify-between gap-1">
                          <div>
                            <p className={cx('text-sm font-semibold', ev.done ? 'text-slate-900 dark:text-white' : 'text-slate-400')}>{ev.status}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={11} /> {ev.location}</p>
                          </div>
                          <span className="text-xs text-slate-400">{ev.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Side info */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-br from-brand-800 to-brand-600 p-5 text-white">
                  <p className="text-xs text-brand-100">Estimated Arrival</p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-extrabold"><Clock size={22} /> {result.eta}</p>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { icon: MapPin, k: 'Current Location', v: result.currentLocation },
                    { icon: Truck, k: 'Vehicle Number', v: result.vehicleNumber },
                    { icon: User, k: 'Driver Name', v: result.driverName },
                    { icon: Phone, k: 'Driver Contact', v: result.driverPhone },
                    { icon: Clock, k: 'Last Updated', v: result.lastUpdated },
                  ].map((row) => (
                    <div key={row.k} className="flex items-center gap-3 px-5 py-3.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500"><row.icon size={15} /></span>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-400">{row.k}</p>
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{row.v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Navigation size={16} className="text-accent-500" /> Route Details</h4>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <span className="h-3 w-3 rounded-full bg-success-500" />
                    <span className="my-1 h-10 w-0.5 bg-slate-200 dark:bg-slate-700" />
                    <span className="h-3 w-3 rounded-full bg-brand-700" />
                  </div>
                  <div className="flex-1 space-y-7">
                    <div><p className="text-xs text-slate-400">Pickup</p><p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{result.source}</p></div>
                    <div><p className="text-xs text-slate-400">Drop</p><p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{result.destination}</p></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : searched ? (
          <Card>
            <EmptyState
              icon={<PackageCheck size={28} />}
              title="No shipment found"
              message="We couldn't find a shipment matching that reference. Please check the LR number, Booking ID, or vehicle number and try again."
            />
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10"><Truck size={30} /></span>
            <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-slate-100">Track your shipment</h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">Enter your LR number, Booking ID, or vehicle number above to see live location, ETA, and full status history.</p>
          </Card>
        )}
      </Container>
    </>
  );
}
