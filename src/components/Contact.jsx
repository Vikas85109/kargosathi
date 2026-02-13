import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
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
    <section id="contact" className="py-12 sm:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-accent font-semibold text-sm tracking-wider uppercase mb-2">
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">Contact Us</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Have questions? Reach out and our team will get back to you promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <a href="tel:+918510928039" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Phone</h3>
                <p className="text-sm text-gray-500">+91 85109 28039</p>
              </div>
            </a>

            <a href="mailto:info@kargosathi.in" className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Email</h3>
                <p className="text-sm text-gray-500">info@kargosathi.in</p>
                <p className="text-sm text-gray-500">bookings@kargosathi.in</p>
              </div>
            </a>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Address</h3>
                <p className="text-sm text-gray-500">
                  KargoSathi Logistics Pvt. Ltd.<br />
                  IMT Manesar, Sector 1<br />
                  Gurugram, Haryana 122052, India
                </p>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-gray-100 h-48 sm:h-56">
              <iframe
                title="KargoSathi Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.5!2d76.93!3d28.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIMT%20Manesar!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Message Sent!</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Thanks for reaching out. Our team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="c-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="c-name"
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
                  <label htmlFor="c-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="c-email"
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
                  <label htmlFor="c-message" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark active:scale-[0.98] transition-all text-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
