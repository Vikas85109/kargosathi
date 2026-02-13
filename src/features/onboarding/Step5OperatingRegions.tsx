import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { operatingScopeSchema, type OperatingScopeForm } from '../../schemas/broker';
import { useBroker } from '../../context/BrokerContext';
import MultiSelect from '../../components/MultiSelect';
import { routeOptions, truckTypeOptions, loadTypeOptions } from '../../mock/data';

interface Props { onNext: () => void; onBack: () => void }

export default function Step5OperatingRegions({ onNext, onBack }: Props) {
  const { formData, updateForm } = useBroker();
  const { handleSubmit, control, formState: { errors } } = useForm<OperatingScopeForm>({
    resolver: zodResolver(operatingScopeSchema),
    defaultValues: {
      routes: formData.routes,
      truckTypes: formData.truckTypes,
      loadTypes: formData.loadTypes,
    },
  });

  const onSubmit = (data: OperatingScopeForm) => {
    updateForm(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Operating Area</h3>
        <p className="text-sm text-slate-500">Define your service coverage</p>
      </div>

      <Controller name="routes" control={control} render={({ field }) => (
        <MultiSelect label="Routes You Operate *" options={routeOptions} selected={field.value} onChange={field.onChange} error={errors.routes?.message} />
      )} />

      <Controller name="truckTypes" control={control} render={({ field }) => (
        <MultiSelect label="Truck Types *" options={truckTypeOptions} selected={field.value} onChange={field.onChange} error={errors.truckTypes?.message} />
      )} />

      <Controller name="loadTypes" control={control} render={({ field }) => (
        <MultiSelect label="Load Types *" options={loadTypeOptions} selected={field.value} onChange={field.onChange} error={errors.loadTypes?.message} />
      )} />

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Back</button>
        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Next Step</button>
      </div>
    </form>
  );
}
