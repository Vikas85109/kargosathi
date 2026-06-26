import type {
  Booking, BookingStatus, DocStatus, Enquiry, EnquiryStatus, Invoice,
  PaymentStatus, Review, Transporter, TrackingRecord, TruckOwner, TruckType,
  VerificationStatus, ServiceType,
} from '@/types';
import {
  CITIES, CITY_STATE, MATERIALS, SERVICE_TYPES, TRUCK_TYPES, TRUCK_SPECS, getDistance,
} from './constants';

// ---- deterministic pseudo-random ----
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const pick = <T,>(arr: T[], r: number) => arr[Math.floor(r * arr.length) % arr.length];

const COMPANY_PREFIX = [
  'Bharat', 'Shree', 'National', 'Royal', 'Veer', 'Sai', 'Maa', 'Express',
  'Galaxy', 'Pioneer', 'Sterling', 'Apex', 'Highway', 'Unity', 'Trinity',
  'Eagle', 'Metro', 'Globe', 'Sunrise', 'Prime', 'Reliable', 'Capital',
  'Goldline', 'Speed', 'Cargo', 'Indus', 'Annapurna', 'Krishna', 'Ganesh', 'Jai',
];
const COMPANY_SUFFIX = [
  'Roadways', 'Logistics', 'Transport', 'Carriers', 'Cargo Movers',
  'Freight Lines', 'Transways', 'Logistics Pvt Ltd', 'Road Carriers', 'Goods Transport',
];
const FIRST = [
  'Rajesh', 'Amit', 'Suresh', 'Vikram', 'Anil', 'Manoj', 'Deepak', 'Sandeep',
  'Ravi', 'Prakash', 'Sunil', 'Ramesh', 'Naveen', 'Arun', 'Kiran', 'Mukesh',
  'Harish', 'Vijay', 'Ashok', 'Pankaj', 'Rohit', 'Sachin', 'Yogesh', 'Dinesh',
  'Mohan', 'Gopal', 'Karan', 'Nitin', 'Pawan', 'Rakesh',
];
const LAST = [
  'Sharma', 'Verma', 'Singh', 'Patel', 'Reddy', 'Gupta', 'Yadav', 'Nair',
  'Kumar', 'Mehta', 'Rao', 'Joshi', 'Chauhan', 'Pillai', 'Desai', 'Shah',
  'Iyer', 'Malhotra', 'Bose', 'Khan',
];

const STATE_CODE: Record<string, string> = {
  Delhi: 'DL', Maharashtra: 'MH', Karnataka: 'KA', Telangana: 'TS', 'Tamil Nadu': 'TN',
  'West Bengal': 'WB', Gujarat: 'GJ', Rajasthan: 'RJ', Punjab: 'PB',
  'Uttar Pradesh': 'UP', 'Madhya Pradesh': 'MP', Haryana: 'HR',
};

function name(r: () => number) {
  return `${pick(FIRST, r())} ${pick(LAST, r())}`;
}
function phone(r: () => number) {
  return '+91 ' + (70000 + Math.floor(r() * 29999)).toString() + ' ' + (10000 + Math.floor(r() * 89999)).toString();
}
function vehicleNo(state: string, r: () => number) {
  const code = STATE_CODE[state] ?? 'MH';
  const series = String.fromCharCode(65 + Math.floor(r() * 26)) + String.fromCharCode(65 + Math.floor(r() * 26));
  return `${code} ${(1 + Math.floor(r() * 98)).toString().padStart(2, '0')} ${series} ${(1000 + Math.floor(r() * 8999))}`;
}
const docStatus = (r: number): DocStatus => (r > 0.82 ? 'Expired' : r > 0.65 ? 'Expiring' : 'Valid');

// ===== TRANSPORTERS (30) =====
const REVIEW_TEXT = [
  'Excellent service, delivered on time and goods were handled with care.',
  'Very professional team and transparent pricing. Highly recommended.',
  'Real-time tracking made the whole experience stress-free.',
  'Reliable transporter for our regular shipments across India.',
  'Good response from the support team. Will use again.',
  'Competitive rates and timely pickup. Satisfied with the service.',
];

export const transporters: Transporter[] = Array.from({ length: 30 }, (_, i) => {
  const r = rng(1000 + i * 7);
  const city = pick(CITIES, r());
  const state = CITY_STATE[city];
  const compName = `${pick(COMPANY_PREFIX, r())} ${pick(COMPANY_SUFFIX, r())}`;
  const services = SERVICE_TYPES.filter(() => r() > 0.5);
  const verifiedRoll = r();
  const verified: VerificationStatus = verifiedRoll > 0.25 ? 'Verified' : verifiedRoll > 0.1 ? 'Pending' : 'Unverified';
  const routeCities = [...CITIES].sort(() => r() - 0.5).slice(0, 4);
  const reviews: Review[] = Array.from({ length: 3 + Math.floor(r() * 3) }, (_, k) => ({
    id: `RV-${i}-${k}`,
    author: name(r),
    rating: 3 + Math.floor(r() * 3),
    date: `2026-0${1 + Math.floor(r() * 5)}-${(1 + Math.floor(r() * 27)).toString().padStart(2, '0')}`,
    comment: pick(REVIEW_TEXT, r()),
  }));
  return {
    id: `TR-${(i + 1).toString().padStart(3, '0')}`,
    name: compName,
    logo: compName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    contactPerson: name(r),
    phone: phone(r),
    email: `contact@${compName.split(' ')[0].toLowerCase()}logistics.in`,
    state,
    city,
    fleetSize: 12 + Math.floor(r() * 480),
    serviceTypes: (services.length ? services : ['FTL']) as ServiceType[],
    operatingRoutes: routeCities.map((c, idx) => `${c} → ${routeCities[(idx + 1) % routeCities.length]}`).slice(0, 3),
    rating: +(3.6 + r() * 1.4).toFixed(1),
    reviewsCount: reviews.length * (8 + Math.floor(r() * 40)),
    verified,
    established: 1998 + Math.floor(r() * 24),
    about: `${compName} is a leading transport service provider headquartered in ${city}, ${state}, with a strong presence across India. With a modern fleet and technology-driven operations, we deliver dependable freight solutions for businesses of every scale.`,
    serviceAreas: routeCities,
    documents: [
      { name: 'GST Registration', status: docStatus(r()), expiry: '2027-03-31' },
      { name: 'Transport License', status: docStatus(r()), expiry: '2026-12-31' },
      { name: 'PAN / Company Reg.', status: 'Valid', expiry: '—' },
      { name: 'MSME Certificate', status: docStatus(r()), expiry: '2026-09-30' },
    ],
    reviews,
  };
});

// ===== TRUCK OWNERS (30) =====
export const truckOwners: TruckOwner[] = Array.from({ length: 30 }, (_, i) => {
  const r = rng(5000 + i * 11);
  const city = pick(CITIES, r());
  const state = CITY_STATE[city];
  const truckType = pick(TRUCK_TYPES, r());
  return {
    id: `TO-${(i + 1).toString().padStart(3, '0')}`,
    ownerName: name(r),
    mobile: phone(r),
    email: `owner${i + 1}@gmail.com`,
    address: `${10 + Math.floor(r() * 200)}, Transport Nagar, ${city}`,
    city,
    state,
    truckType,
    vehicleNumber: vehicleNo(state, r),
    driverName: name(r),
    insuranceStatus: docStatus(r()),
    permitStatus: docStatus(r()),
    fitnessStatus: docStatus(r()),
    rcNumber: `RC${state ? STATE_CODE[state] : 'MH'}${20000 + Math.floor(r() * 79999)}`,
    capacityTons: TRUCK_SPECS[truckType].capacity,
    modelYear: 2016 + Math.floor(r() * 9),
    revenue: 350000 + Math.floor(r() * 4200000),
    assignedTrips: 14 + Math.floor(r() * 220),
    rating: +(3.8 + r() * 1.2).toFixed(1),
  };
});

// ===== BOOKINGS (50) =====
const BOOKING_STATUSES: BookingStatus[] = [
  'Booking Confirmed', 'Vehicle Assigned', 'Pickup Completed',
  'In Transit', 'Near Destination', 'Delivered',
];
export const bookings: Booking[] = Array.from({ length: 50 }, (_, i) => {
  const r = rng(9000 + i * 13);
  const source = pick(CITIES, r());
  let destination = pick(CITIES, r());
  if (destination === source) destination = CITIES[(CITIES.indexOf(source) + 3) % CITIES.length];
  const truckType = pick(TRUCK_TYPES, r());
  const transporter = pick(transporters, r());
  const status = r() > 0.92 ? 'Cancelled' : pick(BOOKING_STATUSES, r());
  const distance = getDistance(source, destination);
  return {
    id: `BK-${(10001 + i)}`,
    lrNumber: `LR${(2026000 + i * 37)}`,
    customer: `${pick(COMPANY_PREFIX, r())} ${pick(['Industries', 'Enterprises', 'Traders', 'Exports', 'Pvt Ltd'], r())}`,
    source,
    destination,
    truckType,
    material: pick(MATERIALS, r()),
    weight: +(TRUCK_SPECS[truckType].capacity * (0.6 + r() * 0.4)).toFixed(1),
    amount: TRUCK_SPECS[truckType].base + Math.round(distance * TRUCK_SPECS[truckType].perKm * (1.1 + r() * 0.3)),
    status: status as BookingStatus,
    bookingDate: `2026-0${1 + Math.floor(r() * 6)}-${(1 + Math.floor(r() * 27)).toString().padStart(2, '0')}`,
    transporterId: transporter.id,
    vehicleNumber: vehicleNo(transporter.state, r),
  };
});

// ===== TRACKING (50) =====
const TIMELINE_ORDER: BookingStatus[] = [
  'Booking Confirmed', 'Vehicle Assigned', 'Pickup Completed',
  'In Transit', 'Near Destination', 'Delivered',
];
export const tracking: TrackingRecord[] = bookings
  .filter((b) => b.status !== 'Cancelled')
  .map((b, i) => {
    const r = rng(13000 + i * 17);
    const stageIdx = TIMELINE_ORDER.indexOf(b.status as BookingStatus);
    const idx = stageIdx < 0 ? 3 : stageIdx;
    const progress = Math.round(((idx + (b.status === 'Delivered' ? 1 : 0.5)) / TIMELINE_ORDER.length) * 100);
    return {
      id: `TRK-${(i + 1).toString().padStart(3, '0')}`,
      bookingId: b.id,
      lrNumber: b.lrNumber,
      vehicleNumber: b.vehicleNumber,
      driverName: name(r),
      driverPhone: phone(r),
      currentLocation:
        b.status === 'Delivered' ? b.destination
          : b.status === 'Booking Confirmed' || b.status === 'Vehicle Assigned' ? b.source
            : pick(CITIES.filter((c) => c !== b.source && c !== b.destination), r()),
      lastUpdated: `2026-06-${(10 + Math.floor(r() * 18)).toString().padStart(2, '0')} ${(8 + Math.floor(r() * 12))}:${(10 + Math.floor(r() * 49))} IST`,
      eta: b.status === 'Delivered' ? 'Delivered' : `${1 + Math.floor(r() * 3)} days`,
      source: b.source,
      destination: b.destination,
      distanceCovered: Math.min(100, progress),
      status: b.status as BookingStatus,
      timeline: TIMELINE_ORDER.map((s, k) => ({
        status: s,
        location: k === 0 ? b.source : k === TIMELINE_ORDER.length - 1 ? b.destination : pick(CITIES, rng(i * 7 + k)()),
        time: k <= idx ? `2026-06-${(8 + k * 2).toString().padStart(2, '0')}, ${9 + k}:00` : '—',
        done: k <= idx,
      })),
    };
  });

// ===== INVOICES (30) =====
const PAYMENT_STATUS: PaymentStatus[] = ['Paid', 'Pending', 'Overdue', 'Partial'];
export const invoices: Invoice[] = bookings.slice(0, 30).map((b, i) => {
  const r = rng(17000 + i * 19);
  const distance = getDistance(b.source, b.destination);
  const spec = TRUCK_SPECS[b.truckType];
  const base = spec.base + Math.round(distance * spec.perKm);
  const fuel = Math.round(base * 0.18);
  const toll = Math.round(distance * 1.6);
  const driver = Math.round(distance * 2.2) + 800;
  const handling = 500 + Math.floor(r() * 1500);
  const taxable = base + fuel + toll + driver + handling;
  const gst = Math.round(taxable * 0.18);
  const status = b.status === 'Delivered' ? (r() > 0.3 ? 'Paid' : 'Pending') : pick(PAYMENT_STATUS, r());
  return {
    id: `INV-2026-${(1001 + i)}`,
    bookingId: b.id,
    customer: b.customer,
    customerAddress: `Plot ${10 + i}, Industrial Area, ${b.source}, India`,
    customerGstin: `${STATE_CODE[CITY_STATE[b.source]] ?? '27'}ABCDE${1000 + i}F1Z${i % 9}`,
    date: b.bookingDate,
    dueDate: `2026-0${Math.min(7, 1 + Math.floor(r() * 6) + 1)}-${(1 + Math.floor(r() * 27)).toString().padStart(2, '0')}`,
    lines: [
      { label: `Freight Charges (${b.truckType})`, amount: base },
      { label: 'Fuel Surcharge', amount: fuel },
      { label: 'Toll Charges', amount: toll },
      { label: 'Driver & Loading Charges', amount: driver },
      { label: 'Handling & Documentation', amount: handling },
    ],
    amount: taxable,
    gst,
    total: taxable + gst,
    status: status as PaymentStatus,
    paymentMode: pick(['NEFT', 'UPI', 'Cheque', 'RTGS', 'Net Banking'], r()),
  };
});

// ===== ENQUIRIES (30) =====
const ENQUIRY_STATUS: EnquiryStatus[] = ['New', 'Assigned', 'In Review', 'Quotation Sent', 'Confirmed', 'Closed'];
export const enquiriesSeed: Enquiry[] = Array.from({ length: 30 }, (_, i) => {
  const r = rng(21000 + i * 23);
  const pickup = pick(CITIES, r());
  let delivery = pick(CITIES, r());
  if (delivery === pickup) delivery = CITIES[(CITIES.indexOf(pickup) + 5) % CITIES.length];
  return {
    id: `ENQ-${(5001 + i)}`,
    customerName: name(r),
    company: `${pick(COMPANY_PREFIX, r())} ${pick(['Industries', 'Traders', 'Exports', 'Pvt Ltd'], r())}`,
    mobile: phone(r),
    email: `enquiry${i + 1}@business.in`,
    pickup,
    delivery,
    material: pick(MATERIALS, r()),
    weight: `${2 + Math.floor(r() * 28)} tons`,
    vehicle: pick(TRUCK_TYPES, r()) as TruckType,
    message: 'Please share your best freight quote for the above shipment at the earliest.',
    status: pick(ENQUIRY_STATUS, r()),
    date: `2026-06-${(1 + Math.floor(r() * 25)).toString().padStart(2, '0')}`,
  };
});

// ===== DASHBOARD CHART DATA =====
export const monthlyRevenue = [
  { month: 'Jan', revenue: 4250000, bookings: 320 },
  { month: 'Feb', revenue: 3980000, bookings: 298 },
  { month: 'Mar', revenue: 5120000, bookings: 386 },
  { month: 'Apr', revenue: 4760000, bookings: 354 },
  { month: 'May', revenue: 5840000, bookings: 421 },
  { month: 'Jun', revenue: 6320000, bookings: 458 },
];

export const shipmentTrends = [
  { month: 'Jan', delivered: 280, inTransit: 40 },
  { month: 'Feb', delivered: 265, inTransit: 33 },
  { month: 'Mar', delivered: 350, inTransit: 36 },
  { month: 'Apr', delivered: 318, inTransit: 36 },
  { month: 'May', delivered: 388, inTransit: 33 },
  { month: 'Jun', delivered: 410, inTransit: 48 },
];

export const stateWiseBookings = [
  { state: 'Maharashtra', bookings: 486 },
  { state: 'Gujarat', bookings: 372 },
  { state: 'Delhi', bookings: 341 },
  { state: 'Karnataka', bookings: 298 },
  { state: 'Tamil Nadu', bookings: 254 },
  { state: 'Rajasthan', bookings: 187 },
];

export const truckUtilization = [
  { name: 'Active', value: 68 },
  { name: 'Idle', value: 18 },
  { name: 'Maintenance', value: 14 },
];

// ===== MARKETING CONTENT =====
export const stats = [
  { label: 'Trucks', value: '10,000+', icon: 'truck' },
  { label: 'Transporters', value: '2,500+', icon: 'building' },
  { label: 'Cities Covered', value: '500+', icon: 'map' },
  { label: 'Deliveries Completed', value: '100,000+', icon: 'package' },
];

export const testimonials = [
  { name: 'Anand Krishnan', role: 'Supply Chain Head, BlueOak Industries', text: 'KargoSathi transformed how we move raw material across states. Live tracking and instant quotes save us hours every week.', rating: 5, avatar: 'AK' },
  { name: 'Priya Sehgal', role: 'Founder, Sehgal Exports', text: 'Finding verified transporters used to be a nightmare. Now we book reliable carriers in minutes with full documentation.', rating: 5, avatar: 'PS' },
  { name: 'Rohan Mehta', role: 'Operations Manager, Veer Steels', text: 'Transparent freight rates and on-time delivery, every single time. The dashboard gives us complete visibility.', rating: 4, avatar: 'RM' },
  { name: 'Fatima Sheikh', role: 'Logistics Lead, FreshFarms Co.', text: 'Express delivery for perishables has been a game changer. Their support team is genuinely responsive.', rating: 5, avatar: 'FS' },
];

export const faqs = [
  { q: 'How does KargoSathi verify transporters?', a: 'Every transporter undergoes a multi-step verification including GST validation, transport license checks, fleet inspection, and KYC. Verified partners carry a green badge across the platform.' },
  { q: 'Can I track my shipment in real time?', a: 'Yes. Use the Live Tracking page with your LR number, Booking ID, or vehicle number to view current location, ETA, driver details, and a complete status timeline.' },
  { q: 'How is the freight cost calculated?', a: 'Our Fare Calculator estimates cost from distance, truck type, fuel surcharge, toll, driver charges, and 18% GST. You get a transparent breakup before confirming any booking.' },
  { q: 'What types of trucks are available?', a: 'From Tata Ace and Pickups for last-mile delivery to 22-feet trucks, Trailers, and Containers for heavy industrial cargo — we cover all categories across 500+ cities.' },
  { q: 'Do you provide GST-compliant invoices?', a: 'Absolutely. Every booking generates a GST-compliant invoice with full tax breakup, downloadable as PDF and shareable instantly from the Invoices section.' },
  { q: 'Which regions does KargoSathi cover?', a: 'We operate PAN India across 500+ cities with a network of 2,500+ transporters and 10,000+ trucks serving all major industrial corridors.' },
];

export const services = [
  { key: 'FTL', title: 'Full Truck Load', desc: 'Dedicated trucks for large shipments with direct point-to-point delivery and zero transshipment.', icon: 'truck' },
  { key: 'PTL', title: 'Part Truck Load', desc: 'Cost-effective shared freight for smaller consignments without compromising on speed.', icon: 'boxes' },
  { key: 'Container', title: 'Container Transport', desc: 'Secure containerized movement for import-export and long-haul industrial cargo.', icon: 'container' },
  { key: 'Express', title: 'Express Delivery', desc: 'Time-critical, priority shipments delivered with guaranteed turnaround times.', icon: 'zap' },
  { key: 'Industrial', title: 'Industrial Logistics', desc: 'End-to-end logistics for manufacturing, heavy machinery, and project cargo.', icon: 'factory' },
  { key: 'Warehouse', title: 'Warehouse Support', desc: 'Storage, inventory handling, and distribution from strategically located hubs.', icon: 'warehouse' },
];

export const whyChoose = [
  { title: 'Verified Transporters', desc: 'Every partner is KYC-verified and rated by real customers.', icon: 'shield-check' },
  { title: 'Live Shipment Tracking', desc: 'Real-time GPS visibility from pickup to delivery.', icon: 'map-pin' },
  { title: 'PAN India Network', desc: '500+ cities connected through 2,500+ transporters.', icon: 'globe' },
  { title: 'Competitive Freight Rates', desc: 'Transparent, market-best pricing with instant quotes.', icon: 'badge-percent' },
  { title: 'Secure Documentation', desc: 'GST-compliant invoices, e-way bills, and digital PODs.', icon: 'file-check' },
  { title: 'Dedicated Support', desc: '24x7 logistics experts to assist at every step.', icon: 'headphones' },
];

export const leadership = [
  { name: 'Arvind Kapoor', role: 'Founder & CEO', initials: 'AK', bio: '20+ years in supply chain and logistics technology.' },
  { name: 'Meera Nair', role: 'Head of Operations', initials: 'MN', bio: 'Scaled fleet operations across 12 states.' },
  { name: 'Sanjay Rao', role: 'Logistics Director', initials: 'SR', bio: 'Expert in PAN-India freight network design.' },
  { name: 'Tanvi Shah', role: 'Technology Lead', initials: 'TS', bio: 'Building the platform powering smart logistics.' },
];

export const milestones = [
  { year: '2018', title: 'KargoSathi Founded', desc: 'Started with a vision to digitize freight brokerage in India.' },
  { year: '2020', title: '500 Transporters Onboarded', desc: 'Crossed our first major network milestone.' },
  { year: '2022', title: 'PAN India Expansion', desc: 'Reached 300+ cities with live tracking capability.' },
  { year: '2024', title: '50,000 Deliveries', desc: 'Achieved 50k successful deliveries with 98% on-time rate.' },
  { year: '2026', title: '100,000+ Deliveries', desc: 'Now powering 10,000+ trucks across 500+ cities.' },
];

export const coreValues = [
  { title: 'Trust', desc: 'Verified partners and transparent dealings, always.', icon: 'shield-check' },
  { title: 'Transparency', desc: 'Clear pricing with no hidden charges.', icon: 'eye' },
  { title: 'Reliability', desc: 'On-time delivery you can count on.', icon: 'badge-check' },
  { title: 'Innovation', desc: 'Technology that simplifies logistics.', icon: 'lightbulb' },
  { title: 'Customer First', desc: 'Your success drives every decision we make.', icon: 'heart' },
];

export function getTransporter(id: string) {
  return transporters.find((t) => t.id === id);
}
export function getTruckOwner(id: string) {
  return truckOwners.find((t) => t.id === id);
}
export function getInvoice(id: string) {
  return invoices.find((t) => t.id === id);
}
