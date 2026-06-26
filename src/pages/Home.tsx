import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, ChevronDown, Truck, ShieldCheck, Quote, Plus, Minus,
  PhoneCall, CheckCircle2,
} from 'lucide-react';
import { Container, SectionHeading } from '@/components/common/Section';
import { Button, ButtonLink } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { StarRating } from '@/components/common/StarRating';
import { StatCounter } from '@/components/common/StatCounter';
import { Select } from '@/components/common/Field';
import { CITIES, TRUCK_TYPES } from '@/data/constants';
import { services, whyChoose, stats, testimonials, faqs } from '@/data';
import { cx } from '@/utils';

export default function Home() {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [truck, setTruck] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const cityOpts = CITIES.map((c) => ({ value: c, label: c }));
  const truckOpts = TRUCK_TYPES.map((t) => ({ value: t, label: t }));

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (pickup) params.set('from', pickup);
    if (drop) params.set('to', drop);
    if (truck) params.set('truck', truck);
    navigate(`/fare-calculator?${params.toString()}`);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-800 to-brand-700" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

        <Container className="relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <ShieldCheck size={14} className="text-accent-400" /> Trusted by 2,500+ verified transporters
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
              India's Smart Transport & <span className="text-accent-400">Logistics</span> Network
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-100 leading-relaxed">
              Connect with verified transporters, track shipments in real-time, calculate freight
              charges, and manage logistics efficiently with KargoSathi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/transporters" size="lg" variant="accent">
                Find Transporter <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink to="/enquiry" size="lg" className="bg-white/10 text-white hover:bg-white/20 shadow-none backdrop-blur">
                Get Quote
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-100">
              {['No hidden charges', 'GST-compliant invoices', 'PAN India coverage'].map((t) => (
                <span key={t} className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-success-500" /> {t}</span>
              ))}
            </div>
          </div>

          {/* Hero search form */}
          <div className="animate-slide-up delay-200 lg:justify-self-end w-full max-w-md">
            <div className="rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Get an instant freight estimate</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Compare rates across truck types in seconds.</p>
              <form onSubmit={onSearch} className="mt-5 space-y-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Pickup City</label>
                  <Select options={cityOpts} placeholder="Select pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Delivery City</label>
                  <Select options={cityOpts} placeholder="Select delivery" value={drop} onChange={(e) => setDrop(e.target.value)} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">Truck Type</label>
                  <Select options={truckOpts} placeholder="Select truck type" value={truck} onChange={(e) => setTruck(e.target.value)} required />
                </div>
                <Button type="submit" size="lg" className="w-full"><Search size={18} /> Search Freight</Button>
              </form>
            </div>
          </div>
        </Container>

        {/* wave divider */}
        <svg className="relative block w-full text-slate-50 dark:text-slate-950" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 60 }}>
          <path fill="currentColor" d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-20">
        <Container>
          <SectionHeading center eyebrow="What we offer" title="Comprehensive Logistics Services"
            subtitle="From last-mile delivery to heavy industrial cargo — one platform for every transport need." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Card key={s.key} hover className="group p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white dark:bg-brand-500/10 dark:text-brand-300">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                <button onClick={() => navigate('/enquiry')} className={cx('mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300', 'opacity-0 group-hover:opacity-100 transition-opacity')}>
                  Enquire now <ArrowRight size={14} />
                </button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading eyebrow="Why KargoSathi" title={<>Logistics made <span className="text-gradient">simple, smart & secure</span></>}
                subtitle="We combine a vast verified network with powerful technology so you can move cargo with complete confidence." />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {whyChoose.map((w) => (
                  <div key={w.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-400">
                      <Icon name={w.icon} size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{w.title}</h4>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gradient-to-br from-brand-700 to-accent-500 opacity-10" />
              <Card className="relative overflow-hidden p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white"><Truck size={24} /></span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Live Shipment</p>
                    <p className="text-xs text-slate-500">BK-10012 · Mumbai → Delhi</p>
                  </div>
                  <span className="ml-auto rounded-full bg-success-100 px-2.5 py-1 text-xs font-bold text-success-700">On Time</span>
                </div>
                <div className="mt-6 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-brand-600 to-accent-500" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-slate-500">
                  <span>Pickup done</span><span>In transit</span><span>Delivery</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {[['ETA', '18h'], ['Distance', '1,420 km'], ['Driver', 'Verified']].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                      <p className="text-xs text-slate-500">{k}</p>
                      <p className="font-bold text-slate-900 dark:text-white">{v}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative overflow-hidden bg-brand-800 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900 to-brand-700" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <Container className="relative">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20">
        <Container>
          <SectionHeading center eyebrow="Testimonials" title="Trusted by businesses across India"
            subtitle="See what logistics leaders say about moving cargo with KargoSathi." />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, i) => (
              <Card key={t.name} hover className={cx('p-6 flex flex-col', `animate-slide-up delay-${(i % 4) * 100 + 100}`)}>
                <Quote className="text-accent-300" size={28} />
                <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">"{t.text}"</p>
                <StarRating value={t.rating} showValue={false} />
                <div className="mt-4 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <Container className="max-w-3xl">
          <SectionHeading center eyebrow="FAQ" title="Frequently asked questions" />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  {f.q}
                  <span className="shrink-0 text-brand-600">{openFaq === i ? <Minus size={18} /> : <Plus size={18} />}</span>
                </button>
                <div className={cx('grid transition-all duration-300', openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-brand-800 px-8 py-14 text-center sm:px-16">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-700 to-accent-600 opacity-95" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Move Your Cargo with Confidence</h2>
              <p className="mx-auto mt-4 max-w-xl text-brand-100">
                Join thousands of businesses shipping smarter with India's most trusted logistics network.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink to="/enquiry" size="lg" variant="accent">Get a Free Quote <ArrowRight size={18} /></ButtonLink>
                <ButtonLink to="/contact" size="lg" className="bg-white/15 text-white hover:bg-white/25 shadow-none backdrop-blur">
                  <PhoneCall size={18} /> Talk to an Expert
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
