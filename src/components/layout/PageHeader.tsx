import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/common/Breadcrumbs';
import { Container } from '@/components/common/Section';

export function PageHeader({
  title,
  subtitle,
  crumbs,
  action,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  action?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-800 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <Container className="relative py-12 sm:py-14">
        <div className="mb-4 [&_a]:text-brand-100 [&_a:hover]:text-white [&_span]:text-white/90">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 max-w-2xl text-brand-100">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </Container>
    </section>
  );
}
