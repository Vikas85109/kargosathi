const partners = [
  'Tata Motors',
  'Ashok Leyland',
  'Mahindra Logistics',
  'Delhivery',
  'Blue Dart',
  'GATI',
  'Rivigo',
  'Safexpress',
];

export default function Partners() {
  return (
    <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
          Trusted by leading brands across India
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {partners.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center h-12 px-4 rounded-lg bg-gray-50 border border-gray-100"
            >
              <span className="text-xs sm:text-sm font-semibold text-gray-400 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
