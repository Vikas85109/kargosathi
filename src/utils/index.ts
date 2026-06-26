import type { FareResult, TruckType } from '@/types';
import { TRUCK_SPECS, getDistance } from '@/data/constants';

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function formatINRShort(n: number): string {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + ' L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + 'K';
  return '₹' + n;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function calculateFare(source: string, destination: string, truckType: TruckType): FareResult {
  const distance = getDistance(source, destination);
  const spec = TRUCK_SPECS[truckType];
  const baseFare = spec.base + Math.round(distance * spec.perKm);
  const fuelCharges = Math.round(baseFare * 0.18);
  const tollCharges = Math.round(distance * 1.6);
  const driverCharges = Math.round(distance * 2.2) + 800;
  const subtotal = baseFare + fuelCharges + tollCharges + driverCharges;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  return { distance, baseFare, fuelCharges, tollCharges, driverCharges, gst, total };
}

export function downloadCSV(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = String(v ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [
    headers.join(','),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(',')),
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
