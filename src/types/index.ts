export type UserRole = 'broker' | 'shipper' | 'transporter' | 'driver' | 'admin';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'pending' | 'suspended';
  kycStatus: 'verified' | 'pending' | 'rejected';
  createdAt: string;
}

export type LoadStatus = 'posted' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
export type TripStatus = 'scheduled' | 'pickup' | 'in_transit' | 'delivered' | 'completed';
export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'overdue';
export type DisputeStatus = 'open' | 'investigating' | 'resolved' | 'closed';

export interface Load {
  id: string;
  shipperName: string;
  shipperId: string;
  origin: string;
  destination: string;
  distance: string;
  weight: string;
  material: string;
  truckType: string;
  rate: number;
  status: LoadStatus;
  postedDate: string;
  deliveryDate: string;
  assignedTruck?: string;
  assignedDriver?: string;
  brokerCommission: number;
  gstAmount: number;
}

export interface Truck {
  id: string;
  number: string;
  type: string;
  capacity: string;
  owner: string;
  ownerId: string;
  driver: string;
  driverId: string;
  status: 'available' | 'on_trip' | 'maintenance' | 'inactive';
  location: string;
  insuranceExpiry: string;
  fitnessExpiry: string;
}

export interface TripEvent {
  status: string;
  location: string;
  timestamp: string;
  note?: string;
}

export interface Trip {
  id: string;
  loadId: string;
  truckId: string;
  driverId: string;
  origin: string;
  destination: string;
  status: TripStatus;
  startDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  currentLocation: string;
  distance: string;
  shipperName: string;
  driverName: string;
  truckNumber: string;
  material: string;
  weight: string;
  rate: number;
  timeline: TripEvent[];
}

export interface Invoice {
  id: string;
  tripId: string;
  loadId: string;
  from: string;
  to: string;
  shipperName: string;
  transporterName: string;
  baseAmount: number;
  gst: number;
  brokerCommission: number;
  totalAmount: number;
  status: PaymentStatus;
  date: string;
  dueDate: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  date: string;
  reference: string;
}

export interface Dispute {
  id: string;
  tripId: string;
  raisedBy: string;
  against: string;
  type: string;
  description: string;
  status: DisputeStatus;
  createdAt: string;
  resolvedAt?: string;
  amount?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

export interface ChartData {
  month: string;
  revenue: number;
  trips: number;
  loads: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
