import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Filter, X, Phone } from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { DataTable, type Column } from '@/components/common/DataTable';
import { Input, Select } from '@/components/common/Field';
import { Button } from '@/components/common/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { truckOwners } from '@/data';
import { CITIES, TRUCK_TYPES } from '@/data/constants';
import { downloadCSV, formatINRShort } from '@/utils';
import type { TruckOwner } from '@/types';

export default function TruckOwners() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [city, setCity] = useState('');
  const [truck, setTruck] = useState('');

  const filtered = useMemo(() => {
    return truckOwners.filter((o) => {
      if (q) {
        const s = q.toLowerCase();
        if (!o.ownerName.toLowerCase().includes(s) && !o.vehicleNumber.toLowerCase().includes(s) && !o.driverName.toLowerCase().includes(s)) return false;
      }
      if (city && o.city !== city) return false;
      if (truck && o.truckType !== truck) return false;
      return true;
    });
  }, [q, city, truck]);

  const reset = () => { setQ(''); setCity(''); setTruck(''); };
  const hasFilters = q || city || truck;

  const columns: Column<TruckOwner>[] = [
    {
      key: 'ownerName', header: 'Owner', sortValue: (r) => r.ownerName,
      render: (r) => (
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">{r.ownerName}</p>
          <p className="flex items-center gap-1 text-xs text-slate-400"><Phone size={11} /> {r.mobile}</p>
        </div>
      ),
    },
    { key: 'truckType', header: 'Truck Type', sortValue: (r) => r.truckType, render: (r) => <span className="font-medium">{r.truckType}</span> },
    { key: 'vehicleNumber', header: 'Vehicle No.', render: (r) => <span className="font-mono text-xs">{r.vehicleNumber}</span> },
    { key: 'driverName', header: 'Driver', render: (r) => r.driverName },
    { key: 'city', header: 'Location', sortValue: (r) => r.city, render: (r) => <span>{r.city}, {r.state}</span> },
    { key: 'insuranceStatus', header: 'Insurance', render: (r) => <StatusBadge status={r.insuranceStatus} /> },
    { key: 'permitStatus', header: 'Permit', render: (r) => <StatusBadge status={r.permitStatus} /> },
    { key: 'revenue', header: 'Revenue', sortValue: (r) => r.revenue, render: (r) => <span className="font-semibold">{formatINRShort(r.revenue)}</span> },
  ];

  const exportCsv = () => {
    downloadCSV('truck-owners.csv', filtered.map((o) => ({
      Owner: o.ownerName, Mobile: o.mobile, Email: o.email, TruckType: o.truckType,
      Vehicle: o.vehicleNumber, Driver: o.driverName, City: o.city, State: o.state,
      Insurance: o.insuranceStatus, Permit: o.permitStatus, Revenue: o.revenue,
    })));
  };

  return (
    <>
      <PageHeader
        title="Truck Owners"
        subtitle="Browse registered fleet owners, their vehicles, compliance status, and trip history."
        crumbs={[{ label: 'Truck Owners' }]}
        action={<Button variant="accent" onClick={exportCsv}><Download size={16} /> Export CSV</Button>}
      />

      <Container className="py-12">
        <Card className="p-5 mb-8">
          <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-200">
            <Filter size={16} /> <span className="font-bold text-sm">Search & Filter</span>
            {hasFilters && (
              <button onClick={reset} className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline"><X size={13} /> Clear all</button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-3.5 text-slate-400" />
              <Input placeholder="Owner, driver or vehicle no…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <Select options={CITIES.map((c) => ({ value: c, label: c }))} placeholder="All cities" value={city} onChange={(e) => setCity(e.target.value)} />
            <Select options={TRUCK_TYPES.map((t) => ({ value: t, label: t }))} placeholder="All truck types" value={truck} onChange={(e) => setTruck(e.target.value)} />
          </div>
        </Card>

        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-bold text-slate-800 dark:text-slate-200">{filtered.length}</span> truck owners
        </p>

        <DataTable columns={columns} rows={filtered} pageSize={8} onRowClick={(r) => navigate(`/truck-owners/${r.id}`)} />
      </Container>
    </>
  );
}
