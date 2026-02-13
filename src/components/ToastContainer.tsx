import { useToast } from '../context/ToastContext';
import type { ToastType } from '../types';

const styles: Record<ToastType, string> = {
  success: 'bg-emerald-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
};

const icons: Record<ToastType, string> = {
  success: '\u2713',
  error: '\u2717',
  info: '\u2139',
};

export default function ToastContainer() {
  const { toasts } = useToast();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${styles[t.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 animate-slide-in text-sm`}
        >
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
            {icons[t.type]}
          </span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
