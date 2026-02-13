import type { Load, Truck, Payment, DashboardStats, ChartPoint } from '../types';

export const dashboardStats: DashboardStats = {
  totalLoads: 142,
  activeTrucks: 38,
  totalEarnings: 284500,
  pendingPayments: 47200,
};

export const chartData: ChartPoint[] = [
  { month: 'Aug', earnings: 18200, loads: 12 },
  { month: 'Sep', earnings: 24800, loads: 18 },
  { month: 'Oct', earnings: 31500, loads: 22 },
  { month: 'Nov', earnings: 28900, loads: 19 },
  { month: 'Dec', earnings: 42000, loads: 31 },
  { month: 'Jan', earnings: 38600, loads: 27 },
];

export const mockLoads: Load[] = [
  { id: 'LD-1001', from: 'Mumbai', to: 'Delhi', weight: '12 Ton', truck: 'Tata 407', status: 'delivered', date: '2025-01-10', amount: 32000 },
  { id: 'LD-1002', from: 'Pune', to: 'Bangalore', weight: '8 Ton', truck: 'Eicher Pro', status: 'in_transit', date: '2025-01-12', amount: 28000 },
  { id: 'LD-1003', from: 'Chennai', to: 'Hyderabad', weight: '15 Ton', truck: 'Ashok Leyland', status: 'delivered', date: '2025-01-08', amount: 18500 },
  { id: 'LD-1004', from: 'Ahmedabad', to: 'Jaipur', weight: '10 Ton', truck: 'BharatBenz', status: 'booked', date: '2025-01-15', amount: 22000 },
  { id: 'LD-1005', from: 'Kolkata', to: 'Patna', weight: '6 Ton', truck: 'Tata 709', status: 'delivered', date: '2025-01-05', amount: 14000 },
  { id: 'LD-1006', from: 'Lucknow', to: 'Varanasi', weight: '4 Ton', truck: 'Mahindra Bolero', status: 'in_transit', date: '2025-01-14', amount: 9500 },
  { id: 'LD-1007', from: 'Indore', to: 'Bhopal', weight: '20 Ton', truck: 'Volvo FH', status: 'booked', date: '2025-01-16', amount: 45000 },
  { id: 'LD-1008', from: 'Surat', to: 'Nagpur', weight: '9 Ton', truck: 'Eicher 1110', status: 'delivered', date: '2025-01-03', amount: 21000 },
];

export const mockTrucks: Truck[] = [
  { id: 'TRK-201', number: 'MH-12-AB-1234', type: 'Open Body', capacity: '12 Ton', driver: 'Ramesh Kumar', status: 'active', location: 'Mumbai' },
  { id: 'TRK-202', number: 'KA-01-CD-5678', type: 'Container', capacity: '20 Ton', driver: 'Suresh Yadav', status: 'active', location: 'Bangalore' },
  { id: 'TRK-203', number: 'DL-05-EF-9012', type: 'Flatbed', capacity: '15 Ton', driver: 'Anil Singh', status: 'maintenance', location: 'Delhi' },
  { id: 'TRK-204', number: 'GJ-06-GH-3456', type: 'Tanker', capacity: '10 Ton', driver: 'Vijay Patel', status: 'active', location: 'Ahmedabad' },
  { id: 'TRK-205', number: 'RJ-14-IJ-7890', type: 'Trailer', capacity: '25 Ton', driver: 'Prakash Meena', status: 'idle', location: 'Jaipur' },
  { id: 'TRK-206', number: 'TN-09-KL-2345', type: 'Refrigerated', capacity: '8 Ton', driver: 'Muthu Raj', status: 'active', location: 'Chennai' },
];

export const mockPayments: Payment[] = [
  { id: 'PAY-301', loadId: 'LD-1001', amount: 32000, status: 'paid', date: '2025-01-12', method: 'Bank Transfer' },
  { id: 'PAY-302', loadId: 'LD-1003', amount: 18500, status: 'paid', date: '2025-01-10', method: 'UPI' },
  { id: 'PAY-303', loadId: 'LD-1005', amount: 14000, status: 'paid', date: '2025-01-07', method: 'Bank Transfer' },
  { id: 'PAY-304', loadId: 'LD-1002', amount: 28000, status: 'pending', date: '2025-01-14', method: 'Pending' },
  { id: 'PAY-305', loadId: 'LD-1008', amount: 21000, status: 'paid', date: '2025-01-06', method: 'UPI' },
  { id: 'PAY-306', loadId: 'LD-1004', amount: 22000, status: 'pending', date: '2025-01-17', method: 'Pending' },
  { id: 'PAY-307', loadId: 'LD-1006', amount: 9500, status: 'processing', date: '2025-01-15', method: 'Bank Transfer' },
];

// ---- Select Options ----
export const routeOptions = [
  'Mumbai → Delhi', 'Delhi → Mumbai', 'Pune → Bangalore', 'Bangalore → Chennai',
  'Chennai → Hyderabad', 'Hyderabad → Mumbai', 'Ahmedabad → Jaipur', 'Jaipur → Delhi',
  'Kolkata → Patna', 'Lucknow → Varanasi', 'Indore → Bhopal', 'Surat → Nagpur',
];

export const truckTypeOptions = [
  'Open Body', 'Container', 'Flatbed', 'Trailer', 'Tanker', 'Refrigerated', 'Mini Truck', 'Tipper',
];

export const loadTypeOptions = [
  'General Goods', 'Perishable', 'Hazardous', 'Fragile', 'Heavy Machinery',
  'Auto Parts', 'Textiles', 'Electronics', 'Construction Material',
];

export const businessTypeOptions = [
  'Sole Proprietorship', 'Partnership', 'Private Limited', 'LLP', 'HUF',
];

export const experienceOptions = [
  { value: '0-1', label: '0 – 1 Years' },
  { value: '1-3', label: '1 – 3 Years' },
  { value: '3-5', label: '3 – 5 Years' },
  { value: '5-10', label: '5 – 10 Years' },
  { value: '10+', label: '10+ Years' },
];
