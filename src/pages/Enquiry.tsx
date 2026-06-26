import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';
import { Send, Clock, FileText, MessageSquareText, Truck, Building2, X } from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { StatusBadge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input, Textarea, Select, Label } from '@/components/common/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { CITIES, MATERIALS, TRUCK_TYPES } from '@/data/constants';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addEnquiry } from '@/redux/enquirySlice';
import { pushNotification } from '@/redux/notificationSlice';
import { useToast } from '@/context/ToastContext';
import { formatDate } from '@/utils';

const schema = z.object({
  customerName: z.string().min(2, 'Enter your name'),
  company: z.string().min(2, 'Enter company name'),
  mobile: z.string().regex(/^[0-9+\s-]{10,15}$/, 'Enter a valid mobile number'),
  email: z.string().email('Enter a valid email'),
  pickup: z.string().min(1, 'Select pickup location'),
  delivery: z.string().min(1, 'Select delivery location'),
  material: z.string().min(1, 'Select material type'),
  weight: z.string().min(1, 'Enter weight'),
  vehicle: z.string().min(1, 'Select vehicle'),
  message: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const STATUS_FLOW = ['New', 'Assigned', 'In Review', 'Quotation Sent', 'Confirmed', 'Closed'];

export default function EnquiryPage() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const enquiries = useAppSelector((s) => s.enquiries.items);
  const [params, setParams] = useSearchParams();

  // Context passed in from a transporter, truck owner, or fare-calculator booking CTA
  const fromTransporter = params.get('transporter') ?? '';
  const fromCity = params.get('from') ?? '';
  const toCity = params.get('to') ?? '';
  const fromVehicle = params.get('vehicle') ?? '';
  const fromMaterial = params.get('material') ?? '';
  const hasContext = Boolean(fromTransporter || fromCity || toCity || fromVehicle);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      pickup: CITIES.includes(fromCity) ? fromCity : '',
      delivery: CITIES.includes(toCity) ? toCity : '',
      vehicle: TRUCK_TYPES.includes(fromVehicle as never) ? fromVehicle : '',
      material: MATERIALS.includes(fromMaterial) ? fromMaterial : '',
      message: fromTransporter ? `I'm interested in a quote from ${fromTransporter}.` : '',
    },
  });

  const onSubmit = (data: FormValues) => {
    const message = [data.message, fromTransporter && `Preferred transporter: ${fromTransporter}`]
      .filter(Boolean).join(' ');
    dispatch(addEnquiry({ ...data, message }));
    dispatch(pushNotification({ title: 'New Enquiry Received', message: `${data.company} · ${data.pickup} → ${data.delivery}`, type: 'info' }));
    toast('success', 'Enquiry submitted! Our team will reach out shortly.');
    reset({
      customerName: '', company: '', mobile: '', email: '',
      pickup: '', delivery: '', material: '', weight: '', vehicle: '', message: '',
    });
    setParams({}, { replace: true });
  };

  const clearContext = () => setParams({}, { replace: true });

  const cityOpts = CITIES.map((c) => ({ value: c, label: c }));

  return (
    <>
      <PageHeader
        title="Get a Freight Quote"
        subtitle="Tell us about your shipment and our logistics experts will send you the best quote."
        crumbs={[{ label: 'Enquiry' }]}
      />

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <Card className="lg:col-span-2 p-7">
            <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><MessageSquareText size={18} className="text-brand-600" /> Enquiry Details</h3>

            {hasContext && (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 dark:border-brand-500/30 dark:bg-brand-500/10">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white">
                  {fromTransporter ? <Building2 size={16} /> : <Truck size={16} />}
                </span>
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-brand-800 dark:text-brand-200">We've pre-filled your enquiry</p>
                  <p className="mt-0.5 text-brand-700/80 dark:text-brand-300/80">
                    {fromTransporter && <>Transporter: <b>{fromTransporter}</b>. </>}
                    {(fromCity || toCity) && <>Route: <b>{fromCity || '—'} → {toCity || '—'}</b>. </>}
                    {fromVehicle && <>Vehicle: <b>{fromVehicle}</b>.</>}
                  </p>
                </div>
                <button onClick={clearContext} className="shrink-0 rounded-lg p-1 text-brand-600 hover:bg-brand-100 dark:hover:bg-brand-500/20" aria-label="Clear">
                  <X size={16} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <Label required>Customer Name</Label>
                <Input placeholder="Your full name" {...register('customerName')} error={errors.customerName?.message} />
              </div>
              <div>
                <Label required>Company Name</Label>
                <Input placeholder="Company / business" {...register('company')} error={errors.company?.message} />
              </div>
              <div>
                <Label required>Mobile Number</Label>
                <Input placeholder="+91 98xxxxxxxx" {...register('mobile')} error={errors.mobile?.message} />
              </div>
              <div>
                <Label required>Email Address</Label>
                <Input placeholder="you@company.in" {...register('email')} error={errors.email?.message} />
              </div>
              <div>
                <Label required>Pickup Location</Label>
                <Select options={cityOpts} placeholder="Select pickup" {...register('pickup')} />
                {errors.pickup && <p className="mt-1 text-xs text-red-500">{errors.pickup.message}</p>}
              </div>
              <div>
                <Label required>Delivery Location</Label>
                <Select options={cityOpts} placeholder="Select delivery" {...register('delivery')} />
                {errors.delivery && <p className="mt-1 text-xs text-red-500">{errors.delivery.message}</p>}
              </div>
              <div>
                <Label required>Material Type</Label>
                <Select options={MATERIALS.map((m) => ({ value: m, label: m }))} placeholder="Select material" {...register('material')} />
                {errors.material && <p className="mt-1 text-xs text-red-500">{errors.material.message}</p>}
              </div>
              <div>
                <Label required>Approx. Weight</Label>
                <Input placeholder="e.g. 12 tons" {...register('weight')} error={errors.weight?.message} />
              </div>
              <div className="sm:col-span-2">
                <Label required>Vehicle Requirement</Label>
                <Select options={TRUCK_TYPES.map((t) => ({ value: t, label: t }))} placeholder="Select vehicle type" {...register('vehicle')} />
                {errors.vehicle && <p className="mt-1 text-xs text-red-500">{errors.vehicle.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label>Message</Label>
                <Textarea rows={4} placeholder="Any specific requirements…" {...register('message')} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  <Send size={16} /> {isSubmitting ? 'Submitting…' : 'Submit Enquiry'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Status sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><Clock size={16} className="text-accent-500" /> Enquiry Lifecycle</h3>
              <ol className="mt-4 space-y-3">
                {STATUS_FLOW.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-300">{i + 1}</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{s}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="p-6 bg-brand-700 text-white border-brand-700">
              <Truck size={24} />
              <p className="mt-3 font-bold">Need it urgently?</p>
              <p className="mt-1 text-sm text-brand-100">Call our 24x7 freight desk for instant assistance.</p>
              <p className="mt-3 text-lg font-extrabold">+91 96430 45449</p>
            </Card>
          </div>
        </div>

        {/* Recent enquiries */}
        <div className="mt-12">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"><FileText size={18} /> Recent Enquiries</h3>
          <p className="text-sm text-slate-500">Live status of submitted enquiries (your new submission appears on top).</p>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60">
                <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-4 py-3">Enquiry ID</th><th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Route</th><th className="px-4 py-3">Material</th>
                  <th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {enquiries.slice(0, 8).map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3.5 font-mono text-xs text-brand-600">{e.id}</td>
                    <td className="px-4 py-3.5 font-semibold text-slate-800 dark:text-slate-100">{e.company}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{e.pickup} → {e.delivery}</td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">{e.material}</td>
                    <td className="px-4 py-3.5 text-slate-500">{formatDate(e.date)}</td>
                    <td className="px-4 py-3.5"><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}
