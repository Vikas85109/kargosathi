import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyInfoSchema, type CompanyInfoForm } from '../../schemas/broker';
import { useBroker } from '../../context/BrokerContext';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { businessTypeOptions } from '../../mock/data';

interface Props { onNext: () => void; onBack: () => void }

export default function Step2CompanyInfo({ onNext, onBack }: Props) {
  const { formData, updateForm } = useBroker();
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyInfoForm>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: formData.companyName,
      gst: formData.gst,
      pan: formData.pan,
      address: formData.address,
      businessType: formData.businessType,
    },
  });

  const onSubmit = (data: CompanyInfoForm) => {
    updateForm({ ...data, gst: data.gst.toUpperCase(), pan: data.pan.toUpperCase() });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Company Details</h3>
        <p className="text-sm text-slate-500">Your business information</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input label="Company Name *" id="companyName" placeholder="Registered company name" error={errors.companyName?.message} {...register('companyName')} />
        </div>
        <Input label="GST Number *" id="gst" placeholder="22ABCDE1234F1Z5" maxLength={15} className="uppercase" error={errors.gst?.message} {...register('gst', { setValueAs: (v: string) => v.toUpperCase() })} />
        <Input label="PAN Number *" id="pan" placeholder="ABCDE1234F" maxLength={10} className="uppercase" error={errors.pan?.message} {...register('pan', { setValueAs: (v: string) => v.toUpperCase() })} />
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">Registered Address *</label>
          <textarea id="address" rows={3} placeholder="Full registered address"
            className={`w-full px-3 py-2.5 rounded-lg border text-sm resize-none ${errors.address ? 'border-red-400 bg-red-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            {...register('address')} />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <Select label="Business Type *" id="businessType" options={businessTypeOptions.map(b => ({ value: b, label: b }))} error={errors.businessType?.message} {...register('businessType')} />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Back</button>
        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Next Step</button>
      </div>
    </form>
  );
}
