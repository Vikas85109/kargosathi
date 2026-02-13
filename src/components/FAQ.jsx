import { useState } from 'react';

const faqs = [
  {
    q: 'How do I book a truck on KargoSathi?',
    a: 'Simply fill out the booking form with your pickup & drop location, goods type, weight, and contact details. Our team will match you with a verified truck operator within minutes.',
  },
  {
    q: 'What types of trucks are available?',
    a: 'We offer a wide fleet including 14ft trucks, 17ft trucks, 22ft trucks, trailers, containers, and open body vehicles. From 4-tonne city loads to 25-tonne pan-India shipments.',
  },
  {
    q: 'How is the pricing determined?',
    a: 'Pricing depends on distance, truck type, goods weight, and route. We provide transparent quotes with no hidden charges. Request a free quotation to get exact rates.',
  },
  {
    q: 'Is my cargo insured during transport?',
    a: 'Yes, all shipments through KargoSathi are covered by transit insurance. We also work only with verified transport partners who follow safety protocols.',
  },
  {
    q: 'Can I track my shipment in real time?',
    a: 'Absolutely. Once your booking is confirmed, you receive a tracking link to monitor your shipment from pickup to delivery in real time.',
  },
  {
    q: 'What areas do you cover?',
    a: 'KargoSathi operates pan-India, covering 120+ cities. We handle both intra-city, inter-state, and cross-country freight transport.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden transition-colors hover:border-accent/20">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-gray-50/50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold text-primary leading-snug">{faq.q}</span>
        <svg
          className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-12 sm:py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Common Questions
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Everything you need to know about booking and shipping with KargoSathi
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
