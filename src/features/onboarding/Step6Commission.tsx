import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commissionSchema, type CommissionForm } from '../../schemas/broker';
import { useBroker } from '../../context/BrokerContext';

interface Props { onNext: () => void; onBack: () => void }

const types = [
  { value: 'per_load', label: 'Per Load', desc: 'Fixed percentage on each load booking' },
  { value: 'monthly', label: 'Monthly Fixed', desc: 'Fixed monthly retainer percentage' },
  { value: 'hybrid', label: 'Hybrid', desc: 'Base retainer + per load bonus' },
];

export default function Step6Commission({ onNext, onBack }: Props) {
  const { formData, updateForm } = useBroker();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<CommissionForm>({
    resolver: zodResolver(commissionSchema),
    defaultValues: {
      commissionType: formData.commissionType,
      commissionPercent: formData.commissionPercent as number || ('' as unknown as number),
    },
  });

  const selectedType = watch('commissionType');

  const onSubmit = (data: CommissionForm) => {
    updateForm(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Commission Setup</h3>
        <p className="text-sm text-slate-500">Choose your preferred commission model</p>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-3">Commission Type *</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {types.map((ct) => (
            <button key={ct.value} type="button"
              onClick={() => setValue('commissionType', ct.value, { shouldValidate: true })}
              className={`p-4 rounded-lg border-2 text-left transition-all
                ${selectedType === ct.value ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300'}`}>
              <p className={`text-sm font-semibold ${selectedType === ct.value ? 'text-blue-700' : 'text-slate-700'}`}>{ct.label}</p>
              <p className="text-xs text-slate-500 mt-1">{ct.desc}</p>
            </button>
          ))}
        </div>
        {errors.commissionType && <p className="mt-1.5 text-xs text-red-500">{errors.commissionType.message}</p>}
      </div>

      <div>
        <label htmlFor="commissionPercent" className="block text-sm font-medium text-slate-700 mb-1">Commission Percentage (%) *</label>
        <div className="relative max-w-xs">
          <input id="commissionPercent" type="number" step="0.5" min="0.5" max="15" placeholder="e.g., 5"
            className={`w-full px-3 py-2.5 rounded-lg border text-sm pr-10 ${errors.commissionPercent ? 'border-red-400 bg-red-50' : 'border-slate-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            {...register('commissionPercent')} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">%</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">Range: 0.5% — 15%</p>
        {errors.commissionPercent && <p className="mt-1 text-xs text-red-500">{errors.commissionPercent.message}</p>}
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Back</button>
        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Next Step</button>
      </div>
    </form>
  );
}
