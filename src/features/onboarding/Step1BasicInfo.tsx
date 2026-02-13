import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { basicInfoSchema, type BasicInfoForm } from '../../schemas/broker';
import { useBroker } from '../../context/BrokerContext';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { experienceOptions } from '../../mock/data';

export default function Step1BasicInfo({ onNext }: { onNext: () => void }) {
  const { formData, updateForm } = useBroker();
  const { register, handleSubmit, formState: { errors } } = useForm<BasicInfoForm>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      experience: formData.experience,
    },
  });

  const onSubmit = (data: BasicInfoForm) => {
    updateForm(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Basic Details</h3>
        <p className="text-sm text-slate-500">Tell us about yourself</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full Name *" id="name" placeholder="Enter your full name" error={errors.name?.message} {...register('name')} />
        <Input label="Phone Number *" id="phone" placeholder="10 digit mobile" maxLength={10} error={errors.phone?.message} {...register('phone')} />
        <Input label="Email *" id="email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="City *" id="city" placeholder="Your city" error={errors.city?.message} {...register('city')} />
        <div className="sm:col-span-2">
          <Select label="Years of Experience *" id="experience" options={experienceOptions} error={errors.experience?.message} {...register('experience')} />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          Next Step
        </button>
      </div>
    </form>
  );
}
