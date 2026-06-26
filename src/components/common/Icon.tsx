import {
  Truck, Boxes, Container, Zap, Factory, Warehouse, ShieldCheck, MapPin,
  Globe, BadgePercent, FileCheck, Headphones, Building2, Map, Package,
  Eye, BadgeCheck, Lightbulb, Heart, type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  truck: Truck,
  boxes: Boxes,
  container: Container,
  zap: Zap,
  factory: Factory,
  warehouse: Warehouse,
  'shield-check': ShieldCheck,
  'map-pin': MapPin,
  globe: Globe,
  'badge-percent': BadgePercent,
  'file-check': FileCheck,
  headphones: Headphones,
  building: Building2,
  map: Map,
  package: Package,
  eye: Eye,
  'badge-check': BadgeCheck,
  lightbulb: Lightbulb,
  heart: Heart,
};

export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const Cmp = ICONS[name] ?? Truck;
  return <Cmp size={size} className={className} />;
}
