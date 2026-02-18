import type { User, Load, Truck, Trip, Invoice, Payment, Dispute, Notification, ChartData } from '../types';

export const users: User[] = [
  { id: 'U001', name: 'Rajesh Sharma', role: 'broker', email: 'rajesh@kargosathi.in', phone: '9876543210', company: 'KargoSathi Logistics', status: 'active', kycStatus: 'verified', createdAt: '2025-01-15' },
  { id: 'U002', name: 'Anita Verma', role: 'shipper', email: 'anita@reliancefmcg.com', phone: '9876543211', company: 'Reliance FMCG', status: 'active', kycStatus: 'verified', createdAt: '2025-02-10' },
  { id: 'U003', name: 'Vikram Patel', role: 'transporter', email: 'vikram@pateltransport.com', phone: '9876543212', company: 'Patel Transport Co.', status: 'active', kycStatus: 'verified', createdAt: '2025-01-20' },
  { id: 'U004', name: 'Suresh Kumar', role: 'driver', email: 'suresh@gmail.com', phone: '9876543213', status: 'active', kycStatus: 'verified', createdAt: '2025-03-01' },
  { id: 'U005', name: 'Priya Singh', role: 'admin', email: 'priya@kargosathi.in', phone: '9876543214', company: 'KargoSathi', status: 'active', kycStatus: 'verified', createdAt: '2025-01-01' },
  { id: 'U006', name: 'Amit Joshi', role: 'shipper', email: 'amit@asianpaints.com', phone: '9876543215', company: 'Asian Paints Ltd.', status: 'active', kycStatus: 'verified', createdAt: '2025-03-15' },
  { id: 'U007', name: 'Deepak Reddy', role: 'transporter', email: 'deepak@reddycarriers.com', phone: '9876543216', company: 'Reddy Carriers', status: 'active', kycStatus: 'pending', createdAt: '2025-04-01' },
  { id: 'U008', name: 'Manoj Tiwari', role: 'driver', email: 'manoj@gmail.com', phone: '9876543217', status: 'active', kycStatus: 'verified', createdAt: '2025-02-20' },
  { id: 'U009', name: 'Ravi Gupta', role: 'shipper', email: 'ravi@tatasteel.com', phone: '9876543218', company: 'Tata Steel', status: 'pending', kycStatus: 'pending', createdAt: '2025-05-10' },
  { id: 'U010', name: 'Sunita Devi', role: 'transporter', email: 'sunita@singhlogistics.com', phone: '9876543219', company: 'Singh Logistics', status: 'pending', kycStatus: 'rejected', createdAt: '2025-05-20' },
  { id: 'U011', name: 'Karan Mehta', role: 'driver', email: 'karan@gmail.com', phone: '9876543220', status: 'pending', kycStatus: 'pending', createdAt: '2025-06-01' },
  { id: 'U012', name: 'Neha Agarwal', role: 'shipper', email: 'neha@godrej.com', phone: '9876543221', company: 'Godrej Industries', status: 'active', kycStatus: 'verified', createdAt: '2025-04-12' },
];

export const loads: Load[] = [
  { id: 'LD001', shipperName: 'Reliance FMCG', shipperId: 'U002', origin: 'Mumbai', destination: 'Delhi', distance: '1,400 km', weight: '12 Ton', material: 'FMCG Products', truckType: 'Container 20ft', rate: 85000, status: 'delivered', postedDate: '2026-01-10', deliveryDate: '2026-01-14', assignedTruck: 'MH04-AB-1234', assignedDriver: 'Suresh Kumar', brokerCommission: 4250, gstAmount: 15300 },
  { id: 'LD002', shipperName: 'Asian Paints Ltd.', shipperId: 'U006', origin: 'Pune', destination: 'Hyderabad', distance: '560 km', weight: '8 Ton', material: 'Paints & Chemicals', truckType: 'Eicher 17ft', rate: 42000, status: 'in_transit', postedDate: '2026-02-12', deliveryDate: '2026-02-15', assignedTruck: 'MH12-CD-5678', assignedDriver: 'Manoj Tiwari', brokerCommission: 2100, gstAmount: 7560 },
  { id: 'LD003', shipperName: 'Tata Steel', shipperId: 'U009', origin: 'Jamshedpur', destination: 'Chennai', distance: '1,680 km', weight: '24 Ton', material: 'Steel Coils', truckType: 'Trailer', rate: 145000, status: 'assigned', postedDate: '2026-02-14', deliveryDate: '2026-02-19', assignedTruck: 'JH01-EF-9012', brokerCommission: 7250, gstAmount: 26100 },
  { id: 'LD004', shipperName: 'Godrej Industries', shipperId: 'U012', origin: 'Mumbai', destination: 'Bangalore', distance: '980 km', weight: '6 Ton', material: 'Consumer Appliances', truckType: 'Eicher 14ft', rate: 55000, status: 'posted', postedDate: '2026-02-16', deliveryDate: '2026-02-20', brokerCommission: 2750, gstAmount: 9900 },
  { id: 'LD005', shipperName: 'Reliance FMCG', shipperId: 'U002', origin: 'Delhi', destination: 'Jaipur', distance: '280 km', weight: '4 Ton', material: 'FMCG Products', truckType: 'Tata 407', rate: 18000, status: 'delivered', postedDate: '2026-01-25', deliveryDate: '2026-01-26', assignedTruck: 'DL01-GH-3456', assignedDriver: 'Suresh Kumar', brokerCommission: 900, gstAmount: 3240 },
  { id: 'LD006', shipperName: 'Asian Paints Ltd.', shipperId: 'U006', origin: 'Ahmedabad', destination: 'Mumbai', distance: '520 km', weight: '10 Ton', material: 'Paints', truckType: 'Container 20ft', rate: 38000, status: 'in_transit', postedDate: '2026-02-10', deliveryDate: '2026-02-12', assignedTruck: 'GJ01-IJ-7890', assignedDriver: 'Karan Mehta', brokerCommission: 1900, gstAmount: 6840 },
  { id: 'LD007', shipperName: 'Godrej Industries', shipperId: 'U012', origin: 'Bangalore', destination: 'Chennai', distance: '350 km', weight: '3 Ton', material: 'Furniture', truckType: 'Eicher 14ft', rate: 22000, status: 'posted', postedDate: '2026-02-17', deliveryDate: '2026-02-19', brokerCommission: 1100, gstAmount: 3960 },
  { id: 'LD008', shipperName: 'Tata Steel', shipperId: 'U009', origin: 'Kolkata', destination: 'Patna', distance: '600 km', weight: '20 Ton', material: 'Steel Bars', truckType: 'Multi-Axle', rate: 65000, status: 'delivered', postedDate: '2026-01-05', deliveryDate: '2026-01-08', assignedTruck: 'WB02-KL-1122', assignedDriver: 'Manoj Tiwari', brokerCommission: 3250, gstAmount: 11700 },
  { id: 'LD009', shipperName: 'Reliance FMCG', shipperId: 'U002', origin: 'Chennai', destination: 'Hyderabad', distance: '630 km', weight: '7 Ton', material: 'Packaged Foods', truckType: 'Eicher 17ft', rate: 40000, status: 'assigned', postedDate: '2026-02-15', deliveryDate: '2026-02-18', assignedTruck: 'TN01-MN-3344', brokerCommission: 2000, gstAmount: 7200 },
  { id: 'LD010', shipperName: 'Asian Paints Ltd.', shipperId: 'U006', origin: 'Delhi', destination: 'Lucknow', distance: '550 km', weight: '9 Ton', material: 'Paints & Primers', truckType: 'Tata 22ft', rate: 35000, status: 'posted', postedDate: '2026-02-17', deliveryDate: '2026-02-20', brokerCommission: 1750, gstAmount: 6300 },
  { id: 'LD011', shipperName: 'Godrej Industries', shipperId: 'U012', origin: 'Nagpur', destination: 'Mumbai', distance: '800 km', weight: '5 Ton', material: 'Electronics', truckType: 'Eicher 14ft', rate: 48000, status: 'in_transit', postedDate: '2026-02-13', deliveryDate: '2026-02-16', assignedTruck: 'MH31-OP-5566', assignedDriver: 'Suresh Kumar', brokerCommission: 2400, gstAmount: 8640 },
  { id: 'LD012', shipperName: 'Tata Steel', shipperId: 'U009', origin: 'Indore', destination: 'Nagpur', distance: '500 km', weight: '15 Ton', material: 'Steel Sheets', truckType: 'Container 20ft', rate: 52000, status: 'cancelled', postedDate: '2026-02-08', deliveryDate: '2026-02-11', brokerCommission: 2600, gstAmount: 9360 },
];

export const trucks: Truck[] = [
  { id: 'TK001', number: 'MH04-AB-1234', type: 'Container 20ft', capacity: '15 Ton', owner: 'Vikram Patel', ownerId: 'U003', driver: 'Suresh Kumar', driverId: 'U004', status: 'available', location: 'Mumbai', insuranceExpiry: '2026-12-15', fitnessExpiry: '2026-08-20' },
  { id: 'TK002', number: 'MH12-CD-5678', type: 'Eicher 17ft', capacity: '7 Ton', owner: 'Vikram Patel', ownerId: 'U003', driver: 'Manoj Tiwari', driverId: 'U008', status: 'on_trip', location: 'Pune → Hyderabad', insuranceExpiry: '2026-10-30', fitnessExpiry: '2026-06-15' },
  { id: 'TK003', number: 'JH01-EF-9012', type: 'Trailer', capacity: '30 Ton', owner: 'Deepak Reddy', ownerId: 'U007', driver: 'Karan Mehta', driverId: 'U011', status: 'on_trip', location: 'Jamshedpur', insuranceExpiry: '2026-09-20', fitnessExpiry: '2026-07-10' },
  { id: 'TK004', number: 'DL01-GH-3456', type: 'Tata 407', capacity: '2.5 Ton', owner: 'Vikram Patel', ownerId: 'U003', driver: 'Suresh Kumar', driverId: 'U004', status: 'available', location: 'Delhi', insuranceExpiry: '2026-11-25', fitnessExpiry: '2026-09-30' },
  { id: 'TK005', number: 'GJ01-IJ-7890', type: 'Container 20ft', capacity: '15 Ton', owner: 'Deepak Reddy', ownerId: 'U007', driver: 'Manoj Tiwari', driverId: 'U008', status: 'on_trip', location: 'Ahmedabad → Mumbai', insuranceExpiry: '2027-01-10', fitnessExpiry: '2026-11-05' },
  { id: 'TK006', number: 'WB02-KL-1122', type: 'Multi-Axle', capacity: '25 Ton', owner: 'Singh Logistics', ownerId: 'U010', driver: 'Karan Mehta', driverId: 'U011', status: 'available', location: 'Kolkata', insuranceExpiry: '2026-08-15', fitnessExpiry: '2026-05-20' },
  { id: 'TK007', number: 'TN01-MN-3344', type: 'Eicher 17ft', capacity: '7 Ton', owner: 'Deepak Reddy', ownerId: 'U007', driver: 'Suresh Kumar', driverId: 'U004', status: 'on_trip', location: 'Chennai', insuranceExpiry: '2026-12-01', fitnessExpiry: '2026-10-15' },
  { id: 'TK008', number: 'MH31-OP-5566', type: 'Eicher 14ft', capacity: '4 Ton', owner: 'Vikram Patel', ownerId: 'U003', driver: 'Manoj Tiwari', driverId: 'U008', status: 'on_trip', location: 'Nagpur → Mumbai', insuranceExpiry: '2027-02-28', fitnessExpiry: '2026-12-10' },
  { id: 'TK009', number: 'RJ14-QR-7788', type: 'Tata 22ft', capacity: '9 Ton', owner: 'Singh Logistics', ownerId: 'U010', driver: 'Karan Mehta', driverId: 'U011', status: 'maintenance', location: 'Jaipur', insuranceExpiry: '2026-07-20', fitnessExpiry: '2026-04-30' },
  { id: 'TK010', number: 'KA01-ST-9900', type: 'Container 40ft', capacity: '25 Ton', owner: 'Deepak Reddy', ownerId: 'U007', driver: 'Suresh Kumar', driverId: 'U004', status: 'available', location: 'Bangalore', insuranceExpiry: '2027-03-15', fitnessExpiry: '2027-01-20' },
];

export const trips: Trip[] = [
  {
    id: 'TR001', loadId: 'LD001', truckId: 'TK001', driverId: 'U004',
    origin: 'Mumbai', destination: 'Delhi', status: 'completed',
    startDate: '2026-01-10', estimatedDelivery: '2026-01-14', actualDelivery: '2026-01-13',
    currentLocation: 'Delhi', distance: '1,400 km',
    shipperName: 'Reliance FMCG', driverName: 'Suresh Kumar', truckNumber: 'MH04-AB-1234',
    material: 'FMCG Products', weight: '12 Ton', rate: 85000,
    timeline: [
      { status: 'Booked', location: 'Mumbai', timestamp: '2026-01-10 08:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Mumbai Warehouse', timestamp: '2026-01-10 14:00', note: 'Goods loaded' },
      { status: 'In Transit', location: 'Nashik', timestamp: '2026-01-11 06:00', note: 'En route via NH-48' },
      { status: 'In Transit', location: 'Jaipur', timestamp: '2026-01-12 18:00', note: 'Rest stop completed' },
      { status: 'Delivered', location: 'Delhi Warehouse', timestamp: '2026-01-13 10:00', note: 'Goods delivered, POD signed' },
    ],
  },
  {
    id: 'TR002', loadId: 'LD002', truckId: 'TK002', driverId: 'U008',
    origin: 'Pune', destination: 'Hyderabad', status: 'in_transit',
    startDate: '2026-02-12', estimatedDelivery: '2026-02-15',
    currentLocation: 'Solapur', distance: '560 km',
    shipperName: 'Asian Paints Ltd.', driverName: 'Manoj Tiwari', truckNumber: 'MH12-CD-5678',
    material: 'Paints & Chemicals', weight: '8 Ton', rate: 42000,
    timeline: [
      { status: 'Booked', location: 'Pune', timestamp: '2026-02-12 07:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Pune Factory', timestamp: '2026-02-12 11:00', note: 'Goods loaded, sealed' },
      { status: 'In Transit', location: 'Solapur', timestamp: '2026-02-13 08:00', note: 'Crossed Solapur checkpoint' },
    ],
  },
  {
    id: 'TR003', loadId: 'LD005', truckId: 'TK004', driverId: 'U004',
    origin: 'Delhi', destination: 'Jaipur', status: 'completed',
    startDate: '2026-01-25', estimatedDelivery: '2026-01-26', actualDelivery: '2026-01-26',
    currentLocation: 'Jaipur', distance: '280 km',
    shipperName: 'Reliance FMCG', driverName: 'Suresh Kumar', truckNumber: 'DL01-GH-3456',
    material: 'FMCG Products', weight: '4 Ton', rate: 18000,
    timeline: [
      { status: 'Booked', location: 'Delhi', timestamp: '2026-01-25 06:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Delhi Hub', timestamp: '2026-01-25 09:00', note: 'Loaded & dispatched' },
      { status: 'In Transit', location: 'Gurugram', timestamp: '2026-01-25 11:00', note: 'Passed toll plaza' },
      { status: 'Delivered', location: 'Jaipur Store', timestamp: '2026-01-26 07:00', note: 'Delivered, POD received' },
    ],
  },
  {
    id: 'TR004', loadId: 'LD006', truckId: 'TK005', driverId: 'U011',
    origin: 'Ahmedabad', destination: 'Mumbai', status: 'in_transit',
    startDate: '2026-02-10', estimatedDelivery: '2026-02-12',
    currentLocation: 'Vapi', distance: '520 km',
    shipperName: 'Asian Paints Ltd.', driverName: 'Karan Mehta', truckNumber: 'GJ01-IJ-7890',
    material: 'Paints', weight: '10 Ton', rate: 38000,
    timeline: [
      { status: 'Booked', location: 'Ahmedabad', timestamp: '2026-02-10 08:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Ahmedabad Plant', timestamp: '2026-02-10 12:00', note: 'Loading complete' },
      { status: 'In Transit', location: 'Vadodara', timestamp: '2026-02-11 06:00', note: 'Crossed Vadodara' },
      { status: 'In Transit', location: 'Vapi', timestamp: '2026-02-12 02:00', note: 'Approaching Mumbai' },
    ],
  },
  {
    id: 'TR005', loadId: 'LD008', truckId: 'TK006', driverId: 'U008',
    origin: 'Kolkata', destination: 'Patna', status: 'completed',
    startDate: '2026-01-05', estimatedDelivery: '2026-01-08', actualDelivery: '2026-01-07',
    currentLocation: 'Patna', distance: '600 km',
    shipperName: 'Tata Steel', driverName: 'Manoj Tiwari', truckNumber: 'WB02-KL-1122',
    material: 'Steel Bars', weight: '20 Ton', rate: 65000,
    timeline: [
      { status: 'Booked', location: 'Kolkata', timestamp: '2026-01-05 07:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Kolkata Yard', timestamp: '2026-01-05 13:00', note: 'Steel loaded' },
      { status: 'In Transit', location: 'Dhanbad', timestamp: '2026-01-06 10:00', note: 'Checkpoint cleared' },
      { status: 'Delivered', location: 'Patna Depot', timestamp: '2026-01-07 16:00', note: 'Unloaded, POD signed' },
    ],
  },
  {
    id: 'TR006', loadId: 'LD011', truckId: 'TK008', driverId: 'U004',
    origin: 'Nagpur', destination: 'Mumbai', status: 'in_transit',
    startDate: '2026-02-13', estimatedDelivery: '2026-02-16',
    currentLocation: 'Nashik', distance: '800 km',
    shipperName: 'Godrej Industries', driverName: 'Suresh Kumar', truckNumber: 'MH31-OP-5566',
    material: 'Electronics', weight: '5 Ton', rate: 48000,
    timeline: [
      { status: 'Booked', location: 'Nagpur', timestamp: '2026-02-13 06:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Nagpur Warehouse', timestamp: '2026-02-13 10:00', note: 'Electronics packed & loaded' },
      { status: 'In Transit', location: 'Aurangabad', timestamp: '2026-02-14 14:00', note: 'Via NH-753' },
      { status: 'In Transit', location: 'Nashik', timestamp: '2026-02-15 08:00', note: 'ETA Mumbai: 6hrs' },
    ],
  },
  {
    id: 'TR007', loadId: 'LD003', truckId: 'TK003', driverId: 'U011',
    origin: 'Jamshedpur', destination: 'Chennai', status: 'scheduled',
    startDate: '2026-02-18', estimatedDelivery: '2026-02-22',
    currentLocation: 'Jamshedpur', distance: '1,680 km',
    shipperName: 'Tata Steel', driverName: 'Karan Mehta', truckNumber: 'JH01-EF-9012',
    material: 'Steel Coils', weight: '24 Ton', rate: 145000,
    timeline: [
      { status: 'Booked', location: 'Jamshedpur', timestamp: '2026-02-17 16:00', note: 'Trip scheduled for tomorrow' },
    ],
  },
  {
    id: 'TR008', loadId: 'LD009', truckId: 'TK007', driverId: 'U004',
    origin: 'Chennai', destination: 'Hyderabad', status: 'pickup',
    startDate: '2026-02-17', estimatedDelivery: '2026-02-19',
    currentLocation: 'Chennai', distance: '630 km',
    shipperName: 'Reliance FMCG', driverName: 'Suresh Kumar', truckNumber: 'TN01-MN-3344',
    material: 'Packaged Foods', weight: '7 Ton', rate: 40000,
    timeline: [
      { status: 'Booked', location: 'Chennai', timestamp: '2026-02-16 18:00', note: 'Trip confirmed' },
      { status: 'Pickup', location: 'Chennai Depot', timestamp: '2026-02-17 09:00', note: 'Loading in progress' },
    ],
  },
];

export const invoices: Invoice[] = [
  { id: 'INV001', tripId: 'TR001', loadId: 'LD001', from: 'Mumbai', to: 'Delhi', shipperName: 'Reliance FMCG', transporterName: 'Patel Transport Co.', baseAmount: 85000, gst: 15300, brokerCommission: 4250, totalAmount: 100300, status: 'paid', date: '2026-01-14', dueDate: '2026-01-28' },
  { id: 'INV002', tripId: 'TR003', loadId: 'LD005', from: 'Delhi', to: 'Jaipur', shipperName: 'Reliance FMCG', transporterName: 'Patel Transport Co.', baseAmount: 18000, gst: 3240, brokerCommission: 900, totalAmount: 21240, status: 'paid', date: '2026-01-26', dueDate: '2026-02-09' },
  { id: 'INV003', tripId: 'TR005', loadId: 'LD008', from: 'Kolkata', to: 'Patna', shipperName: 'Tata Steel', transporterName: 'Singh Logistics', baseAmount: 65000, gst: 11700, brokerCommission: 3250, totalAmount: 76700, status: 'paid', date: '2026-01-08', dueDate: '2026-01-22' },
  { id: 'INV004', tripId: 'TR002', loadId: 'LD002', from: 'Pune', to: 'Hyderabad', shipperName: 'Asian Paints Ltd.', transporterName: 'Patel Transport Co.', baseAmount: 42000, gst: 7560, brokerCommission: 2100, totalAmount: 49560, status: 'pending', date: '2026-02-12', dueDate: '2026-02-26' },
  { id: 'INV005', tripId: 'TR004', loadId: 'LD006', from: 'Ahmedabad', to: 'Mumbai', shipperName: 'Asian Paints Ltd.', transporterName: 'Reddy Carriers', baseAmount: 38000, gst: 6840, brokerCommission: 1900, totalAmount: 44840, status: 'pending', date: '2026-02-10', dueDate: '2026-02-24' },
  { id: 'INV006', tripId: 'TR006', loadId: 'LD011', from: 'Nagpur', to: 'Mumbai', shipperName: 'Godrej Industries', transporterName: 'Patel Transport Co.', baseAmount: 48000, gst: 8640, brokerCommission: 2400, totalAmount: 56640, status: 'processing', date: '2026-02-13', dueDate: '2026-02-27' },
];

export const payments: Payment[] = [
  { id: 'PAY001', invoiceId: 'INV001', amount: 100300, status: 'paid', method: 'NEFT', date: '2026-01-20', reference: 'NEFT2026012034567' },
  { id: 'PAY002', invoiceId: 'INV002', amount: 21240, status: 'paid', method: 'UPI', date: '2026-02-02', reference: 'UPI2026020298765' },
  { id: 'PAY003', invoiceId: 'INV003', amount: 76700, status: 'paid', method: 'NEFT', date: '2026-01-18', reference: 'NEFT2026011856789' },
  { id: 'PAY004', invoiceId: 'INV004', amount: 49560, status: 'pending', method: 'NEFT', date: '2026-02-26', reference: '' },
  { id: 'PAY005', invoiceId: 'INV005', amount: 44840, status: 'pending', method: 'RTGS', date: '2026-02-24', reference: '' },
  { id: 'PAY006', invoiceId: 'INV006', amount: 56640, status: 'processing', method: 'NEFT', date: '2026-02-27', reference: 'NEFT2026022711223' },
];

export const disputes: Dispute[] = [
  { id: 'DSP001', tripId: 'TR001', raisedBy: 'Reliance FMCG', against: 'Patel Transport Co.', type: 'Damage Claim', description: 'Minor damage to 3 cartons during transit. Cartons dented on delivery.', status: 'resolved', createdAt: '2026-01-15', resolvedAt: '2026-01-22', amount: 8500 },
  { id: 'DSP002', tripId: 'TR005', raisedBy: 'Singh Logistics', against: 'Tata Steel', type: 'Payment Delay', description: 'Payment not received within 15 days of delivery as per agreement.', status: 'closed', createdAt: '2026-01-25', resolvedAt: '2026-02-01', amount: 76700 },
  { id: 'DSP003', tripId: 'TR002', raisedBy: 'Asian Paints Ltd.', against: 'Patel Transport Co.', type: 'Late Delivery', description: 'Shipment delayed by estimated 1 day due to driver detour. Requesting penalty.', status: 'investigating', createdAt: '2026-02-14', amount: 5000 },
  { id: 'DSP004', tripId: 'TR004', raisedBy: 'Reddy Carriers', against: 'Asian Paints Ltd.', type: 'Overloading', description: 'Actual weight exceeded declared weight by 1.5 tons at weighbridge.', status: 'open', createdAt: '2026-02-12', amount: 12000 },
  { id: 'DSP005', tripId: 'TR006', raisedBy: 'Godrej Industries', against: 'Patel Transport Co.', type: 'Documentation Issue', description: 'E-way bill mismatch found at state border checkpoint.', status: 'open', createdAt: '2026-02-15', amount: 3000 },
];

export const notifications: Notification[] = [
  { id: 'N001', title: 'New Load Posted', message: 'Godrej Industries posted a load: Mumbai → Bangalore (6 Ton)', type: 'info', read: false, timestamp: '2026-02-17 14:30' },
  { id: 'N002', title: 'Trip Delivered', message: 'TR001 Mumbai → Delhi delivered successfully', type: 'success', read: true, timestamp: '2026-01-13 10:15' },
  { id: 'N003', title: 'Payment Received', message: '₹1,00,300 received for INV001', type: 'success', read: true, timestamp: '2026-01-20 11:00' },
  { id: 'N004', title: 'Dispute Raised', message: 'New dispute DSP004: Overloading claim by Reddy Carriers', type: 'warning', read: false, timestamp: '2026-02-12 16:45' },
  { id: 'N005', title: 'KYC Pending', message: 'Deepak Reddy (Reddy Carriers) KYC awaiting verification', type: 'warning', read: false, timestamp: '2026-02-15 09:00' },
  { id: 'N006', title: 'Truck Maintenance Due', message: 'RJ14-QR-7788 fitness certificate expires on 2026-04-30', type: 'error', read: false, timestamp: '2026-02-16 08:00' },
  { id: 'N007', title: 'New Load Available', message: 'Delhi → Lucknow, 9 Ton Paints & Primers. Rate: ₹35,000', type: 'info', read: false, timestamp: '2026-02-17 10:00' },
  { id: 'N008', title: 'Trip Update', message: 'TR006 Nagpur → Mumbai reached Nashik. ETA: 6 hours', type: 'info', read: false, timestamp: '2026-02-15 08:30' },
];

export const chartData: ChartData[] = [
  { month: 'Sep', revenue: 320000, trips: 12, loads: 15 },
  { month: 'Oct', revenue: 480000, trips: 18, loads: 22 },
  { month: 'Nov', revenue: 410000, trips: 15, loads: 19 },
  { month: 'Dec', revenue: 560000, trips: 22, loads: 28 },
  { month: 'Jan', revenue: 720000, trips: 28, loads: 35 },
  { month: 'Feb', revenue: 650000, trips: 24, loads: 30 },
];

export const truckTypeOptions = [
  'Tata Ace', 'Tata 407', 'Eicher 14ft', 'Eicher 17ft', 'Tata 22ft',
  'Container 20ft', 'Container 40ft', 'Multi-Axle', 'Trailer',
];

export const materialOptions = [
  'FMCG Products', 'Paints & Chemicals', 'Steel Coils', 'Steel Bars', 'Steel Sheets',
  'Electronics', 'Furniture', 'Packaged Foods', 'Textiles', 'Auto Parts',
  'Pharmaceuticals', 'Cement', 'Agriculture Produce', 'Building Materials', 'Machinery',
];

export const cityOptions = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Ahmedabad',
  'Jaipur', 'Kolkata', 'Lucknow', 'Nagpur', 'Indore', 'Patna', 'Jamshedpur',
  'Surat', 'Chandigarh', 'Bhopal', 'Coimbatore', 'Visakhapatnam', 'Kochi',
];
