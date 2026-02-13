export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-16 bg-primary overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-20 -right-10 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 border-2 border-white rounded-full" />
        <div className="absolute -bottom-10 -left-10 sm:bottom-10 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 border-2 border-white rounded-full" />
        <div className="absolute top-40 left-1/3 w-32 sm:w-48 h-32 sm:h-48 border border-white rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-4">
              Your Load, Our Truck Network
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Reliable Truck Transport{' '}
              <span className="text-accent">Across India</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
              KargoSathi connects your goods with trusted truck operators —
              fast, safe, and cost-effective. From local pickups to pan-India
              freight, we have you covered.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
              >
                Book Now
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
              >
                Become a Transporter
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white">12,000+</p>
                <p className="text-xs sm:text-sm text-gray-400">Trips Completed</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white">120+</p>
                <p className="text-xs sm:text-sm text-gray-400">Cities</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold text-white">3,500+</p>
                <p className="text-xs sm:text-sm text-gray-400">Trucks</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-[420px] lg:h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/truck-hero.jpg"
                  alt="Truck transport on highway"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                Pan India Coverage
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                Verified Transporters
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
