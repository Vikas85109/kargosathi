import { useState, useEffect, useRef } from 'react';
import { navLinks } from '../data/mockData';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');
  const navRef = useRef(null);

  // Scroll spy — highlight active section
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    function onScroll() {
      const scrollY = window.scrollY + 100;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveHash('#' + sectionIds[i]);
          return;
        }
      }
      setActiveHash('#home');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white font-bold text-lg">
              K
            </span>
            <span className="text-xl font-bold text-primary">
              Kargo<span className="text-accent">Sathi</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeHash === link.href
                    ? 'text-accent bg-accent/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#booking"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
            >
              Book a Truck
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                activeHash === link.href
                  ? 'text-accent bg-accent/5'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMobileOpen(false)}
            className="block text-center px-5 py-2.5 mt-2 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
          >
            Book a Truck
          </a>
        </div>
      </div>

      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 bg-black/20 -z-10"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}
