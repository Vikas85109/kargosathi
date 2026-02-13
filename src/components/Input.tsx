import { forwardRef, type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, className = '', ...rest }, ref) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm transition-colors
          ${error ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'}
          focus:outline-none focus:ring-2 focus:border-transparent ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

Input.displayName = 'Input';
export default Input;
