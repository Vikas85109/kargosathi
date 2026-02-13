const steps = [
  { num: 1, label: 'Basic' },
  { num: 2, label: 'Company' },
  { num: 3, label: 'Documents' },
  { num: 4, label: 'Bank' },
  { num: 5, label: 'Operations' },
  { num: 6, label: 'Commission' },
  { num: 7, label: 'Review' },
];

export default function Stepper({ current }: { current: number }) {
  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex items-center min-w-[600px] px-2">
        {steps.map((s, i) => {
          const active = s.num === current;
          const done = s.num < current;
          return (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all
                    ${done ? 'bg-emerald-500 text-white' : ''}
                    ${active ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                    ${!active && !done ? 'bg-slate-200 text-slate-500' : ''}`}
                >
                  {done ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </div>
                <span className={`mt-1.5 text-xs font-medium ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mt-[-16px] ${done ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
