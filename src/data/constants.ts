import type { ServiceType, TruckType } from '@/types';

export const CITIES = [
  'Delhi', 'Mumbai', 'Pune', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Ahmedabad', 'Jaipur', 'Chandigarh', 'Lucknow', 'Surat', 'Indore', 'Nagpur',
];

export const STATES = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal',
  'Gujarat', 'Rajasthan', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Haryana',
];

export const CITY_STATE: Record<string, string> = {
  Delhi: 'Delhi', Mumbai: 'Maharashtra', Pune: 'Maharashtra', Bangalore: 'Karnataka',
  Hyderabad: 'Telangana', Chennai: 'Tamil Nadu', Kolkata: 'West Bengal',
  Ahmedabad: 'Gujarat', Jaipur: 'Rajasthan', Chandigarh: 'Punjab',
  Lucknow: 'Uttar Pradesh', Surat: 'Gujarat', Indore: 'Madhya Pradesh', Nagpur: 'Maharashtra',
};

export const TRUCK_TYPES: TruckType[] = [
  'Tata Ace', 'Pickup', 'Mini Truck', '14 Feet Truck', '17 Feet Truck',
  '22 Feet Truck', 'Trailer', 'Container',
];

export const SERVICE_TYPES: ServiceType[] = [
  'FTL', 'PTL', 'Container', 'Express', 'Industrial', 'Warehouse',
];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  FTL: 'Full Truck Load',
  PTL: 'Part Truck Load',
  Container: 'Container Transport',
  Express: 'Express Delivery',
  Industrial: 'Industrial Logistics',
  Warehouse: 'Warehouse Support',
};

export const MATERIALS = [
  'Electronics', 'Textiles', 'Steel & Metal', 'FMCG Goods', 'Pharmaceuticals',
  'Auto Parts', 'Machinery', 'Cement', 'Agricultural Produce', 'Furniture',
  'Chemicals', 'Plastics', 'Food Grains', 'Construction Material',
];

// truck type -> { rate per km, capacity tons, base }
export const TRUCK_SPECS: Record<TruckType, { perKm: number; capacity: number; base: number }> = {
  'Tata Ace': { perKm: 18, capacity: 0.75, base: 1500 },
  Pickup: { perKm: 22, capacity: 1.5, base: 2000 },
  'Mini Truck': { perKm: 26, capacity: 3.5, base: 2800 },
  '14 Feet Truck': { perKm: 34, capacity: 6, base: 4500 },
  '17 Feet Truck': { perKm: 42, capacity: 9, base: 6000 },
  '22 Feet Truck': { perKm: 55, capacity: 16, base: 8500 },
  Trailer: { perKm: 78, capacity: 30, base: 14000 },
  Container: { perKm: 70, capacity: 28, base: 12000 },
};

// approximate road distances (km) between major cities (symmetric)
export const DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  Delhi: { Mumbai: 1420, Pune: 1480, Bangalore: 2150, Hyderabad: 1580, Chennai: 2200, Kolkata: 1530, Ahmedabad: 950, Jaipur: 280, Chandigarh: 250, Lucknow: 555, Surat: 1180, Indore: 800, Nagpur: 1080 },
  Mumbai: { Pune: 150, Bangalore: 985, Hyderabad: 710, Chennai: 1340, Kolkata: 2000, Ahmedabad: 530, Jaipur: 1180, Chandigarh: 1650, Lucknow: 1390, Surat: 285, Indore: 590, Nagpur: 840 },
  Pune: { Bangalore: 840, Hyderabad: 560, Chennai: 1180, Kolkata: 1870, Ahmedabad: 660, Jaipur: 1310, Surat: 420, Indore: 590, Nagpur: 700 },
  Bangalore: { Hyderabad: 570, Chennai: 350, Kolkata: 1870, Ahmedabad: 1490, Jaipur: 2080, Surat: 1280, Indore: 1380, Nagpur: 1090 },
  Hyderabad: { Chennai: 630, Kolkata: 1490, Ahmedabad: 1210, Jaipur: 1530, Surat: 1000, Indore: 870, Nagpur: 500 },
  Chennai: { Kolkata: 1670, Ahmedabad: 1860, Jaipur: 2200, Surat: 1640, Indore: 1580, Nagpur: 1150 },
  Kolkata: { Ahmedabad: 2000, Jaipur: 1500, Lucknow: 985, Surat: 1900, Indore: 1500, Nagpur: 1130 },
  Ahmedabad: { Jaipur: 660, Surat: 265, Indore: 400, Nagpur: 870, Chandigarh: 1100 },
  Jaipur: { Chandigarh: 520, Lucknow: 570, Indore: 590, Nagpur: 940 },
  Indore: { Nagpur: 440, Surat: 510, Lucknow: 670 },
  Lucknow: { Nagpur: 880, Chandigarh: 770 },
};

export function getDistance(a: string, b: string): number {
  if (a === b) return 0;
  const d = DISTANCE_MATRIX[a]?.[b] ?? DISTANCE_MATRIX[b]?.[a];
  if (d) return d;
  // deterministic fallback based on name length
  return 400 + ((a.length * 53 + b.length * 71) % 1400);
}
