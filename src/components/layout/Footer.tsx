import { Link } from 'react-router-dom';
import { Truck, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import { Container } from '@/components/common/Section';

const cols = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Transporters', to: '/transporters' },
      { label: 'Truck Owners', to: '/truck-owners' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Full Truck Load', to: '/enquiry' },
      { label: 'Part Truck Load', to: '/enquiry' },
      { label: 'Container Transport', to: '/enquiry' },
      { label: 'Express Delivery', to: '/enquiry' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { label: 'Fare Calculator', to: '/fare-calculator' },
      { label: 'Live Tracking', to: '/tracking' },
      { label: 'Invoices', to: '/invoices' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-white">
                <Truck size={22} />
              </span>
              <span className="text-xl font-extrabold text-white">
                Kargo<span className="text-accent-500">Sathi</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              India's smart transport & logistics network connecting customers, transporters,
              and fleet owners with verified, technology-driven freight solutions.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex max-w-sm">
              <input
                type="email"
                placeholder="Subscribe to updates"
                className="flex-1 rounded-l-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button className="rounded-r-xl bg-accent-500 px-4 text-white hover:bg-accent-600 transition" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
            <div className="mt-5 flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-brand-600 hover:text-white transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-400 hover:text-accent-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2.5"><MapPin size={16} className="shrink-0 mt-0.5 text-accent-500" /> Smart World Gems, Sector 89, Gurgaon</li>
              <li className="flex gap-2.5"><Phone size={16} className="shrink-0 text-accent-500" /> +91 96430 45449</li>
              <li className="flex gap-2.5"><Mail size={16} className="shrink-0 text-accent-500" /> shubham.sharma6803@gmail.com</li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-slate-800">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 text-xs text-slate-500">
          <p>© 2026 KargoSathi Logistics Pvt. Ltd. All rights reserved.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">GST & Compliance</a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
