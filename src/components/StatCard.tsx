interface Props {
  icon: string;
  label: string;
  value: number | string;
  prefix?: string;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'violet';
}

const gradients: Record<string, string> = {
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
  amber: 'from-amber-500 to-amber-600',
  rose: 'from-rose-500 to-rose-600',
  violet: 'from-violet-500 to-violet-600',
};

export default function StatCard({ icon, label, value, prefix = '', color = 'blue' }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800">
            {prefix}
            {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${gradients[color]} flex items-center justify-center text-white text-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
