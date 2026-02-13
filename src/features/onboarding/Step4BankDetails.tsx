import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bankDetailsSchema, type BankDetailsForm } from '../../schemas/broker';
import { useBroker } from '../../context/BrokerContext';
import Input from '../../components/Input';

interface Props { onNext: () => void; onBack: () => void }

export default function Step4BankDetails({ onNext, onBack }: Props) {
  const { formData, updateForm } = useBroker();
  const { register, handleSubmit, formState: { errors } } = useForm<BankDetailsForm>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      accountName: formData.accountName,
      accountNumber: formData.accountNumber,
      ifsc: formData.ifsc,
      upi: formData.upi,
    },
  });

  const onSubmit = (data: BankDetailsForm) => {
    updateForm({ ...data, ifsc: data.ifsc.toUpperCase() });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Bank Details</h3>
        <p className="text-sm text-slate-500">For payment settlements</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input label="Account Holder Name *" id="accountName" placeholder="Name as per bank account" error={errors.accountName?.message} {...register('accountName')} />
        </div>
        <Input label="Account Number *" id="accountNumber" placeholder="Bank account number" maxLength={18} error={errors.accountNumber?.message} {...register('accountNumber')} />
        <Input label="IFSC Code *" id="ifsc" placeholder="SBIN0001234" maxLength={11} className="uppercase" error={errors.ifsc?.message} {...register('ifsc', { setValueAs: (v: string) => v.toUpperCase() })} />
        <div className="sm:col-span-2">
          <Input label="UPI ID (Optional)" id="upi" placeholder="yourname@upi" {...register('upi')} />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Back</button>
        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Next Step</button>
      </div>
    </form>
  );
}
