import { TruckIcon, Home, ArrowLeft } from 'lucide-react';
import { ButtonLink } from '@/components/common/Button';
import { Container } from '@/components/common/Section';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center py-20">
      <div className="relative">
        <span className="text-[8rem] sm:text-[11rem] font-black leading-none text-gradient">404</span>
        <TruckIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent-500/20 animate-float" size={120} />
      </div>
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
        Looks like this route got lost in transit
      </h1>
      <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or has been moved. Let's get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink to="/" size="lg"><Home size={18} /> Back to Home</ButtonLink>
        <ButtonLink to="/tracking" variant="outline" size="lg"><ArrowLeft size={18} /> Track a Shipment</ButtonLink>
      </div>
    </Container>
  );
}
