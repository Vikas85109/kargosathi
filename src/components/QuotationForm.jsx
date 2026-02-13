import { useState } from 'react';
import { truckTypes } from '../data/mockData';

const initialForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  pickup: '',
  drop: '',
  goodsType: '',
  weight: '',
  truckType: '',
  date: '',
  requirements: '',
};

const benefits = [
  {
    title: 'Competitive Rates',
    desc: 'Get the best market rates with transparent pricing — no hidden charges.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Quick Response',
    desc: 'Receive your detailed quotation within 30 minutes during business hours.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'No Obligation',
    desc: 'Get your quote with zero commitment. Compare and decide at your own pace.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function QuotationForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 4000);
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors';

  return (
    <section id="quotation" className="py-12 sm:py-20 bg-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Free Estimate
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Get an Instant Quotation
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Tell us about your shipment and receive a detailed cost estimate — fast, free, and with no strings attached.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Panel — Benefits */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Benefit Cards */}
            <div className="space-y-4 sm:space-y-5">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="flex gap-4 p-4 sm:p-5 rounded-xl bg-surface border border-gray-100 hover:border-accent/20 hover:shadow-sm transition-all"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">{b.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-xl bg-primary text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-accent mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-white font-semibold text-base mb-1">Trusted by 800+ Partners</p>
              <p className="text-gray-300 text-xs sm:text-sm">
                Join thousands of businesses that rely on KargoSathi for their logistics needs.
              </p>
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {submitted ? (
              <div className="bg-surface rounded-2xl p-8 sm:p-12 border border-gray-100 shadow-sm text-center min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Quotation Request Sent!</h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Our team will review your details and get back to you with a detailed quote within 30 minutes.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-sm"
              >
                {/* Contact Details */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">1</span>
                    Contact Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="q-name" className="block text-xs font-medium text-gray-600 mb-1.5">Full Name *</label>
                      <input
                        id="q-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Rajesh Kumar"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-company" className="block text-xs font-medium text-gray-600 mb-1.5">Company Name</label>
                      <input
                        id="q-company"
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Kumar Textiles Pvt Ltd"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-email" className="block text-xs font-medium text-gray-600 mb-1.5">Email Address *</label>
                      <input
                        id="q-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="rajesh@example.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number *</label>
                      <input
                        id="q-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 85109 28039"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">2</span>
                    Shipment Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="q-pickup" className="block text-xs font-medium text-gray-600 mb-1.5">Pickup City *</label>
                      <input
                        id="q-pickup"
                        type="text"
                        name="pickup"
                        value={form.pickup}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Mumbai"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-drop" className="block text-xs font-medium text-gray-600 mb-1.5">Drop City *</label>
                      <input
                        id="q-drop"
                        type="text"
                        name="drop"
                        value={form.drop}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Delhi"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-goods" className="block text-xs font-medium text-gray-600 mb-1.5">Goods Type *</label>
                      <input
                        id="q-goods"
                        type="text"
                        name="goodsType"
                        value={form.goodsType}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Electronics, Textiles"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-weight" className="block text-xs font-medium text-gray-600 mb-1.5">Approx. Weight (Tonnes) *</label>
                      <input
                        id="q-weight"
                        type="text"
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 5"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-truck" className="block text-xs font-medium text-gray-600 mb-1.5">Preferred Truck Type</label>
                      <select
                        id="q-truck"
                        name="truckType"
                        value={form.truckType}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select truck type</option>
                        {truckTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-date" className="block text-xs font-medium text-gray-600 mb-1.5">Expected Pickup Date</label>
                      <input
                        id="q-date"
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">3</span>
                    Additional Information
                  </h3>
                  <div>
                    <label htmlFor="q-requirements" className="block text-xs font-medium text-gray-600 mb-1.5">Special Requirements</label>
                    <textarea
                      id="q-requirements"
                      name="requirements"
                      value={form.requirements}
                      onChange={handleChange}
                      rows={3}
                      placeholder="e.g. Fragile goods, temperature-controlled, loading assistance needed..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark active:scale-[0.98] transition-all text-sm flex items-center justify-center gap-2"
                >
                  Get Free Quotation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  By submitting, you agree to our terms. We'll never share your data with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
