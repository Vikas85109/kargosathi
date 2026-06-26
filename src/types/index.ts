// ===== KARGOSATHI domain types =====

export type ServiceType =
  | 'FTL'
  | 'PTL'
  | 'Container'
  | 'Express'
  | 'Industrial'
  | 'Warehouse';

export type TruckType =
  | 'Tata Ace'
  | 'Pickup'
  | 'Mini Truck'
  | '14 Feet Truck'
  | '17 Feet Truck'
  | '22 Feet Truck'
  | 'Trailer'
  | 'Container';

export type VerificationStatus = 'Verified' | 'Pending' | 'Unverified';
export type DocStatus = 'Valid' | 'Expiring' | 'Expired';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Transporter {
  id: string;
  name: string;
  logo: string; // initials / emoji placeholder
  contactPerson: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  fleetSize: number;
  serviceTypes: ServiceType[];
  operatingRoutes: string[];
  rating: number;
  reviewsCount: number;
  verified: VerificationStatus;
  established: number;
  about: string;
  serviceAreas: string[];
  documents: { name: string; status: DocStatus; expiry: string }[];
  reviews: Review[];
}

export interface TruckOwner {
  id: string;
  ownerName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  truckType: TruckType;
  vehicleNumber: string;
  driverName: string;
  insuranceStatus: DocStatus;
  permitStatus: DocStatus;
  fitnessStatus: DocStatus;
  rcNumber: string;
  capacityTons: number;
  modelYear: number;
  revenue: number;
  assignedTrips: number;
  rating: number;
}

export type BookingStatus =
  | 'Booking Confirmed'
  | 'Vehicle Assigned'
  | 'Pickup Completed'
  | 'In Transit'
  | 'Near Destination'
  | 'Delivered'
  | 'Cancelled';

export interface Booking {
  id: string; // booking id
  lrNumber: string;
  customer: string;
  source: string;
  destination: string;
  truckType: TruckType;
  material: string;
  weight: number; // tons
  amount: number;
  status: BookingStatus;
  bookingDate: string;
  transporterId: string;
  vehicleNumber: string;
}

export interface TrackingEvent {
  status: BookingStatus;
  location: string;
  time: string;
  done: boolean;
}

export interface TrackingRecord {
  id: string;
  bookingId: string;
  lrNumber: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  currentLocation: string;
  lastUpdated: string;
  eta: string;
  source: string;
  destination: string;
  distanceCovered: number; // %
  status: BookingStatus;
  timeline: TrackingEvent[];
}

export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue' | 'Partial';

export interface InvoiceLine {
  label: string;
  amount: number;
}

export interface Invoice {
  id: string; // invoice number
  bookingId: string;
  customer: string;
  customerAddress: string;
  customerGstin: string;
  date: string;
  dueDate: string;
  lines: InvoiceLine[];
  amount: number; // taxable
  gst: number;
  total: number;
  status: PaymentStatus;
  paymentMode: string;
}

export type EnquiryStatus =
  | 'New'
  | 'Assigned'
  | 'In Review'
  | 'Quotation Sent'
  | 'Confirmed'
  | 'Closed';

export interface Enquiry {
  id: string;
  customerName: string;
  company: string;
  mobile: string;
  email: string;
  pickup: string;
  delivery: string;
  material: string;
  weight: string;
  vehicle: string;
  message: string;
  status: EnquiryStatus;
  date: string;
}

export interface FareResult {
  distance: number;
  baseFare: number;
  fuelCharges: number;
  tollCharges: number;
  driverCharges: number;
  gst: number;
  total: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'success' | 'info' | 'warning';
}
