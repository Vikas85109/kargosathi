import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Container } from '@/components/common/Section';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input, Textarea, Label } from '@/components/common/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { useToast } from '@/context/ToastContext';

const schema = z.object({
  name: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid email'),
  mobile: z.string().regex(/^[0-9+\s-]{10,15}$/, 'Enter a valid mobile number'),
  subject: z.string().min(2, 'Enter a subject'),
  message: z.string().min(5, 'Enter your message'),
});
type FormValues = z.infer<typeof schema>;

const INFO = [
  { icon: MapPin, title: 'Corporate Office', lines: ['Smart World Gems,', 'Sector 89, Gurgaon'] },
  { icon: Phone, title: 'Customer Support', lines: ['+91 96430 45449'] },
  { icon: Mail, title: 'Email Us', lines: ['shubham.sharma6803@gmail.com'] },
  { icon: Clock, title: 'Business Hours', lines: ['Mon – Sat: 9 AM – 8 PM', '24x7 Freight Desk'] },
];

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    toast('success', 'Message sent! We will get back to you within 24 hours.');
    reset();
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question or need a custom logistics solution? Our team is here to help."
        crumbs={[{ label: 'Contact Us' }]}
      />

      <Container className="py-12">
        {/* Info cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {INFO.map((i) => (
            <Card key={i.title} hover className="p-6 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"><i.icon size={22} /></span>
              <h4 className="mt-4 font-bold text-slate-900 dark:text-white">{i.title}</h4>
              {i.lines.map((l) => <p key={l} className="text-sm text-slate-500 dark:text-slate-400">{l}</p>)}
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <Card className="p-7">
            <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white"><MessageSquare size={18} className="text-brand-600" /> Send us a message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label required>Name</Label>
                  <Input placeholder="Your name" {...register('name')} error={errors.name?.message} />
                </div>
                <div>
                  <Label required>Mobile</Label>
                  <Input placeholder="+91 98xxxxxxxx" {...register('mobile')} error={errors.mobile?.message} />
                </div>
              </div>
              <div>
                <Label required>Email</Label>
                <Input placeholder="you@email.com" {...register('email')} error={errors.email?.message} />
              </div>
              <div>
                <Label required>Subject</Label>
                <Input placeholder="How can we help?" {...register('subject')} error={errors.subject?.message} />
              </div>
              <div>
                <Label required>Message</Label>
                <Textarea rows={5} placeholder="Write your message…" {...register('message')} />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                <Send size={16} /> {isSubmitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </Card>

          {/* Map placeholder */}
          <Card className="overflow-hidden p-0">
            <div className="relative h-full min-h-80">
              <div className="absolute inset-0 bg-[#e8eef3] dark:bg-slate-800">
                <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(15,76,129,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,76,129,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
              </div>
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-white shadow-xl ring-8 ring-accent-500/20 animate-float"><MapPin size={22} /></span>
                <span className="mt-3 rounded-lg bg-white dark:bg-slate-900 px-3 py-1.5 text-sm font-semibold shadow">KargoSathi HQ, Sector 89, Gurgaon</span>
              </div>
              <span className="absolute bottom-3 right-3 rounded-md bg-white/80 dark:bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-slate-500">Google Map (demo)</span>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}
