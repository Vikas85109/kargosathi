import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { documentsSchema, type DocumentsForm } from '../../schemas/broker';
import { useBroker } from '../../context/BrokerContext';
import FileUpload from '../../components/FileUpload';

interface Props { onNext: () => void; onBack: () => void }

const fields: { name: keyof DocumentsForm; label: string }[] = [
  { name: 'panFile', label: 'PAN Card *' },
  { name: 'gstFile', label: 'GST Certificate *' },
  { name: 'aadhaarFile', label: 'Aadhaar Card *' },
  { name: 'chequeFile', label: 'Cancelled Cheque *' },
];

export default function Step3Documents({ onNext, onBack }: Props) {
  const { formData, updateForm } = useBroker();
  const { handleSubmit, control, formState: { errors } } = useForm<DocumentsForm>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      panFile: formData.panFile,
      gstFile: formData.gstFile,
      aadhaarFile: formData.aadhaarFile,
      chequeFile: formData.chequeFile,
    },
  });

  const onSubmit = (data: DocumentsForm) => {
    updateForm(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Document Upload</h3>
        <p className="text-sm text-slate-500">Upload required documents (filenames stored only)</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <Controller
            key={f.name}
            name={f.name}
            control={control}
            render={({ field }) => (
              <FileUpload
                label={f.label}
                value={field.value}
                onChange={field.onChange}
                error={errors[f.name]?.message}
              />
            )}
          />
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button type="button" onClick={onBack} className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">Back</button>
        <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">Next Step</button>
      </div>
    </form>
  );
}
