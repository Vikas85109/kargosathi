import { Target, Eye, ArrowRight, MapPin } from 'lucide-react';
import { Container, SectionHeading } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Icon } from '@/components/common/Icon';
import { ButtonLink } from '@/components/common/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { coreValues, leadership, milestones, stats } from '@/data';
import { CITIES } from '@/data/constants';

export default function About() {
  return (
    <>
      <PageHeader
        title="About KargoSathi"
        subtitle="Your trusted partner in smart transportation & logistics, powering India's freight movement with technology and trust."
        crumbs={[{ label: 'About Us' }]}
      />

      {/* Intro */}
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Who we are" title="Connecting cargo owners with trusted transporters" />
            <p className="mt-5 text-slate-600 dark:text-slate-400 leading-relaxed">
              KargoSathi is a technology-driven transport brokerage platform that connects customers,
              transporters, fleet owners, and truck operators across India. We provide freight booking,
              transporter discovery, truck tracking, fare estimation, invoice management, and complete
              logistics solutions for businesses of all sizes.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              With a network of 2,500+ verified transporters and 10,000+ trucks, we've simplified how
              India moves goods — making it transparent, reliable, and effortless.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 text-center">
                  <p className="text-2xl font-extrabold text-brand-700 dark:text-brand-300">{s.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="p-7 sm:mt-8">
              <Target className="text-accent-500" size={32} />
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To simplify logistics and transportation management through technology and trusted partnerships.
              </p>
            </Card>
            <Card className="p-7">
              <Eye className="text-brand-600" size={32} />
              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                To become India's most trusted logistics ecosystem connecting cargo owners and transport providers.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <Container>
          <SectionHeading center eyebrow="What drives us" title="Our Core Values" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((v) => (
              <Card key={v.title} hover className="p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">
                  <Icon name={v.icon} size={24} />
                </div>
                <h4 className="mt-4 font-bold text-slate-900 dark:text-white">{v.title}</h4>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <Container>
          <SectionHeading center eyebrow="The team" title="Leadership Team"
            subtitle="Experienced logistics and technology leaders building India's freight future." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((l) => (
              <Card key={l.name} hover className="p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-2xl font-extrabold text-white">
                  {l.initials}
                </div>
                <h4 className="mt-4 font-bold text-slate-900 dark:text-white">{l.name}</h4>
                <p className="text-sm font-semibold text-accent-600">{l.role}</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{l.bio}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* PAN India presence */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Nationwide" title="PAN India Presence"
              subtitle="Operating across 500+ cities and all major industrial corridors of India." />
            <div className="mt-6 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 dark:bg-slate-800 px-3 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
                  <MapPin size={13} /> {c}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-brand-500/10 blur-2xl" />
            <div className="relative grid grid-cols-4 gap-3">
              {CITIES.slice(0, 12).map((c, i) => (
                <div key={c} className="flex h-16 w-16 flex-col items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center shadow-sm" style={{ animationDelay: `${i * 60}ms` }}>
                  <MapPin size={16} className="text-accent-500" />
                  <span className="mt-1 text-[10px] font-semibold text-slate-600 dark:text-slate-300">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <Container>
          <SectionHeading center eyebrow="Our journey" title="Milestones & Achievements" />
          <div className="relative mt-14 mx-auto max-w-3xl">
            <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-slate-700" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative mb-8 flex items-start gap-6 sm:w-1/2 ${i % 2 ? 'sm:ml-auto sm:flex-row' : 'sm:flex-row-reverse sm:text-right'} pl-12 sm:pl-0`}>
                <div className={`absolute left-4 sm:left-auto ${i % 2 ? 'sm:-left-3' : 'sm:-right-3'} top-2 z-10 flex h-6 w-6 -translate-x-1/2 sm:translate-x-0 items-center justify-center rounded-full bg-accent-500 ring-4 ring-accent-500/20`}>
                  <span className="h-2 w-2 rounded-full bg-white" />
                </div>
                <Card className="flex-1 p-5">
                  <span className="text-sm font-extrabold text-accent-600">{m.year}</span>
                  <h4 className="mt-1 font-bold text-slate-900 dark:text-white">{m.title}</h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <Container>
          <Card className="flex flex-col items-center justify-between gap-4 p-8 sm:flex-row">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ready to partner with KargoSathi?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Join our growing network of transporters and businesses.</p>
            </div>
            <ButtonLink to="/contact" size="lg">Get in Touch <ArrowRight size={18} /></ButtonLink>
          </Card>
        </Container>
      </section>
    </>
  );
}
