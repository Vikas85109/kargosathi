import { Link } from 'react-router-dom';

const features = [
  { icon: '\uD83D\uDCCB', title: 'Easy Onboarding', desc: 'Complete your broker registration in minutes with our guided 7-step process' },
  { icon: '\uD83D\uDE9B', title: 'Manage Fleet', desc: 'Track trucks, loads, and deliveries from a single dashboard' },
  { icon: '\uD83D\uDCB0', title: 'Earn Commission', desc: 'Competitive commission on every load you book through the platform' },
  { icon: '\uD83D\uDCCA', title: 'Real-time Analytics', desc: 'Monitor your business performance with live charts and reports' },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">KS</div>
            <span className="font-bold text-slate-800">KargoSathi</span>
          </div>
          <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">Admin</Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Now accepting new brokers
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Become a <span className="text-blue-600">KargoSathi</span> Broker
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Join India's growing transport broker network. Register, get approved, and start booking loads with top shippers and fleet owners.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register"
              className="px-8 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
              Get Started
            </Link>
            <Link to="/login"
              className="px-8 py-3.5 border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
              Already Registered? Login
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-6">
        <p className="text-center text-xs text-slate-400">&copy; 2025 KargoSathi. All rights reserved.</p>
      </footer>
    </div>
  );
}
