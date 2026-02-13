import { useState } from 'react';
import { truckTypes } from '../data/mockData';

const initialForm = {
  pickup: '',
  drop: '',
  goodsType: '',
  weight: '',
  truckType: '',
  contact: '',
};

export default function BookingForm() {
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
    'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors';

  return (
    <section id="booking" className="py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Get Started
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">Book a Truck</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Fill in the details below and we'll match you with the right truck
          </p>
        </div>

        {submitted ? (
          <div className="bg-surface rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Booking Request Submitted!</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              We're matching you with the best truck operator. You'll receive a confirmation call shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-surface rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="b-pickup" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pickup Location
                </label>
                <input
                  id="b-pickup"
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
                <label htmlFor="b-drop" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Drop Location
                </label>
                <input
                  id="b-drop"
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
                <label htmlFor="b-goods" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Goods Type
                </label>
                <input
                  id="b-goods"
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
                <label htmlFor="b-weight" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Weight (Tonnes)
                </label>
                <input
                  id="b-weight"
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
                <label htmlFor="b-truck" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Required Truck Type
                </label>
                <select
                  id="b-truck"
                  name="truckType"
                  value={form.truckType}
                  onChange={handleChange}
                  required
                  className={`${inputClass} bg-white`}
                >
                  <option value="">Select truck type</option>
                  {truckTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="b-contact" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Contact Number
                </label>
                <input
                  id="b-contact"
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 8510928039"
                  className={inputClass}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-full sm:w-auto px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark active:scale-[0.98] transition-all text-sm"
            >
              Submit Booking Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
