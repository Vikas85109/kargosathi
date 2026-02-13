import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Fleet from './components/Fleet';
import BookingForm from './components/BookingForm';
import CTABanner from './components/CTABanner';
import QuotationForm from './components/QuotationForm';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppCTA from './components/WhatsAppCTA';
import RevealOnScroll from './components/RevealOnScroll';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content">
        <Hero />
        {/* <Partners /> */}
        <RevealOnScroll>
          <Services />
        </RevealOnScroll>
        <RevealOnScroll>
          <HowItWorks />
        </RevealOnScroll>
        <RevealOnScroll>
          <Fleet />
        </RevealOnScroll>
        <RevealOnScroll>
          <BookingForm />
        </RevealOnScroll>
        {/* <CTABanner /> */}
        <RevealOnScroll>
          <QuotationForm />
        </RevealOnScroll>
        <Stats />
        <RevealOnScroll>
          <Testimonials />
        </RevealOnScroll>
        <RevealOnScroll>
          <About />
        </RevealOnScroll>
        <RevealOnScroll>
          <FAQ />
        </RevealOnScroll>
        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppCTA />
    </div>
  );
}
