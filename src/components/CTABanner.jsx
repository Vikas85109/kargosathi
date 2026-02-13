export default function CTABanner() {
  return (
    <section className="py-12 sm:py-16 bg-accent relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-white/10 rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
          Ready to Move Your Goods?
        </h2>
        <p className="text-white/80 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
          Get started in minutes. Book a truck or request a free quotation — our team is standing by to help.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href="#booking"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold bg-white text-accent rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Book a Truck
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#quotation"
            className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold text-white border border-white/40 rounded-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
