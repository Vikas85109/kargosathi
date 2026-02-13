import { forwardRef, type SelectHTMLAttributes } from 'react';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, placeholder = 'Select...', id, className = '', ...rest }, ref) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        ref={ref}
        className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white transition-colors
          ${error ? 'border-red-400 bg-red-50 focus:ring-red-400' : 'border-slate-300 focus:ring-blue-500'}
          focus:outline-none focus:ring-2 focus:border-transparent ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';
export default Select;
