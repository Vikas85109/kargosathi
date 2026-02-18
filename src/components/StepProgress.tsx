import { Check } from 'lucide-react';

interface Props {
  steps: string[];
  current: number;
}

export default function StepProgress({ steps, current }: Props) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => {
        const isComplete = i < current;
        const isActive = i === current;

        return (
          <div key={step} className="flex items-center gap-1 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isComplete
                    ? 'bg-emerald-600 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isComplete ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={`text-xs font-medium truncate hidden sm:block ${
                  isActive ? 'text-blue-600' : isComplete ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 rounded ${isComplete ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
