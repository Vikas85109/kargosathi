import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calculator, MapPin, Navigation, Truck, Fuel, Receipt, User, IndianRupee, ArrowRight, RotateCcw,
} from 'lucide-react';
import { Container, SectionHeading } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Button, ButtonLink } from '@/components/common/Button';
import { Select } from '@/components/common/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { CITIES, TRUCK_TYPES } from '@/data/constants';
import { calculateFare, formatINR } from '@/utils';
import { useToast } from '@/context/ToastContext';
import type { FareResult, TruckType } from '@/types';

export default function FareCalculator() {
  const [params] = useSearchParams();
  const { toast } = useToast();
  const [source, setSource] = useState(params.get('from') ?? '');
  const [dest, setDest] = useState(params.get('to') ?? '');
  const [truck, setTruck] = useState<string>(params.get('truck') ?? '');
  const [result, setResult] = useState<FareResult | null>(null);
  const [loading, setLoading] = useState(false);

  const compute = () => {
    if (!source || !dest || !truck) { toast('warning', 'Please fill all fields'); return; }
    if (source === dest) { toast('error', 'Source and destination must differ'); return; }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(calculateFare(source, dest, truck as TruckType));
      setLoading(false);
    }, 600);
  };

  // auto-calc if arriving with query params
  useEffect(() => {
    if (params.get('from') && params.get('to') && params.get('truck')) {
      setLoading(true);
      const t = setTimeout(() => {
        setResult(calculateFare(params.get('from')!, params.get('to')!, params.get('truck') as TruckType));
        setLoading(false);
      }, 600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => { setSource(''); setDest(''); setTruck(''); setResult(null); };

  const cityOpts = CITIES.map((c) => ({ value: c, label: c }));
  const truckOpts = TRUCK_TYPES.map((t) => ({ value: t, label: t }));

  const lines = result && [
    { label: 'Base Fare', value: result.baseFare, icon: Truck },
    { label: 'Fuel Charges', value: result.fuelCharges, icon: Fuel },
    { label: 'Toll Charges', value: result.tollCharges, icon: Navigation },
    { label: 'Driver Charges', value: result.driverCharges, icon: User },
    { label: 'GST (18%)', value: result.gst, icon: Receipt },
  ];

  return (
    <>
      <PageHeader
        title="Freight Rate Calculator"
        subtitle="Get instant, transparent freight estimates for any route and truck type across India."
        crumbs={[{ label: 'Fare Calculator' }]}
      />

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Card className="lg:col-span-2 p-7 h-fit">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white"><Calculator size={22} /></span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Estimate Your Freight</h3>
                <p className="text-xs text-slate-500">Fill in the details below</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"><MapPin size={13} className="inline mr-1 text-success-500" /> Source City</label>
                <Select options={cityOpts} placeholder="Select source" value={source} onChange={(e) => setSource(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"><Navigation size={13} className="inline mr-1 text-brand-600" /> Destination City</label>
                <Select options={cityOpts} placeholder="Select destination" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300"><Truck size={13} className="inline mr-1 text-accent-500" /> Truck Type</label>
                <Select options={truckOpts} placeholder="Select truck type" value={truck} onChange={(e) => setTruck(e.target.value)} />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={compute} size="lg" className="flex-1">Calculate Fare</Button>
                <Button onClick={reset} variant="outline" size="lg"><RotateCcw size={16} /></Button>
              </div>
            </div>
          </Card>

          {/* Result */}
          <div className="lg:col-span-3">
            {loading ? (
              <Card className="p-10 flex flex-col items-center justify-center h-full min-h-80">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-700" />
                <p className="mt-4 text-sm text-slate-500">Calculating best freight rate…</p>
              </Card>
            ) : result && lines ? (
              <Card className="overflow-hidden">
                <div className="relative bg-gradient-to-br from-brand-800 to-brand-600 p-6 text-white">
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-xs text-brand-100">Estimated Total Freight</p>
                      <p className="mt-1 text-4xl font-extrabold">{formatINR(result.total)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-brand-100">Distance</p>
                      <p className="text-2xl font-bold">{result.distance} km</p>
                    </div>
                  </div>
                  <div className="relative mt-4 flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1"><MapPin size={12} /> {source}</span>
                    <ArrowRight size={14} />
                    <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1"><Navigation size={12} /> {dest}</span>
                    <span className="ml-auto rounded-full bg-accent-500 px-3 py-1 font-semibold">{truck}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">Cost Breakdown</h4>
                  <div className="space-y-1">
                    {lines.map((l) => (
                      <div key={l.label} className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <span className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500"><l.icon size={15} /></span>
                          {l.label}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{formatINR(l.value)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 px-3 pt-4">
                    <span className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><IndianRupee size={18} /> Total Freight Cost</span>
                    <span className="text-2xl font-extrabold text-brand-700 dark:text-brand-300">{formatINR(result.total)}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ButtonLink to={`/enquiry?from=${encodeURIComponent(source)}&to=${encodeURIComponent(dest)}&vehicle=${encodeURIComponent(truck)}`} className="flex-1">Book This Shipment <ArrowRight size={16} /></ButtonLink>
                    <ButtonLink to="/transporters" variant="outline">Find Transporters</ButtonLink>
                  </div>
                  <p className="mt-4 text-center text-xs text-slate-400">* Estimate only. Final rates may vary with load, season & availability.</p>
                </div>
              </Card>
            ) : (
              <Card className="flex flex-col items-center justify-center h-full min-h-80 p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10"><Calculator size={30} /></span>
                <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-slate-100">Ready to estimate</h3>
                <p className="mt-1 max-w-xs text-sm text-slate-500">Select your route and truck type, then calculate to see a full cost breakdown.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-12">
          <SectionHeading center eyebrow="Transparent pricing" title="What's included in your freight cost?" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Truck, t: 'Base Fare', d: 'Distance × truck rate' },
              { icon: Fuel, t: 'Fuel Charges', d: 'Current fuel surcharge' },
              { icon: Navigation, t: 'Toll Charges', d: 'Highway & expressway tolls' },
              { icon: User, t: 'Driver Charges', d: 'Driver allowance & loading' },
              { icon: Receipt, t: 'GST', d: '18% as per regulations' },
            ].map((i) => (
              <Card key={i.t} hover className="p-5 text-center">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10"><i.icon size={20} /></span>
                <p className="mt-3 font-bold text-slate-800 dark:text-white">{i.t}</p>
                <p className="mt-1 text-xs text-slate-500">{i.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
