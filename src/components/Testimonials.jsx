import { testimonials } from '../data/mockData';

function TestimonialCard({ item }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Quote icon */}
      <svg className="w-8 h-8 text-accent/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391C0 7.905 3.748 4.039 9 3l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
      </svg>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">{item.feedback}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">{item.name}</p>
          <p className="text-xs text-gray-400">{item.company}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Client Stories
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">What Our Clients Say</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Trusted by hundreds of businesses for their logistics needs
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
