export default function About() {
  return (
    <section id="about" className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
              About Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">
              About KargoSathi
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              KargoSathi is a transport mediator platform built to simplify freight
              logistics across India. We connect shippers and goods owners with a
              verified network of truck operators, enabling fast, transparent, and
              reliable cargo movement.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is to bridge the gap between those who need to move goods
              and those who have the trucks to do it. With transparent pricing, real-time
              tracking, and a commitment to safety, KargoSathi is the trusted partner
              for businesses of all sizes — from small enterprises to large industrial
              operations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                'Verified Transport Partners',
                'Transparent Pricing',
                'Real-time Tracking',
                'Pan-India Coverage',
                'Dedicated Support',
                'Safe & Insured',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="bg-surface rounded-2xl p-8 lg:p-10 border border-gray-100">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary">5+</p>
                  <p className="text-xs text-gray-500 mt-1">Years in Service</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary">800+</p>
                  <p className="text-xs text-gray-500 mt-1">Transport Partners</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary">120+</p>
                  <p className="text-xs text-gray-500 mt-1">Cities Covered</p>
                </div>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="text-2xl font-bold text-primary">99%</p>
                  <p className="text-xs text-gray-500 mt-1">On-time Rate</p>
                </div>
              </div>

              <div className="mt-8 p-5 bg-primary rounded-xl text-center">
                <p className="text-white font-semibold text-lg mb-1">
                  Your Load, Our Truck Network
                </p>
                <p className="text-gray-300 text-sm">
                  Connecting India's freight one shipment at a time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
