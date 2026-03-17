import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  error?: string;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>;
  as?: 'input' | 'select';
  children?: React.ReactNode;
}

export default function FloatingInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  required,
  error,
  className,
  inputProps,
  as = 'input',
  children,
}: FloatingInputProps) {
  const hasValue = value.trim().length > 0;
  const inputBase = cn(
    'w-full bg-slate-50/80 border rounded-2xl py-3.5 pl-4 pr-4 text-sm transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50',
    Icon ? 'pl-12' : 'pl-4',
    error ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-slate-200'
  );

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
            <Icon className="w-4 h-4" />
          </div>
        )}
        {as === 'select' ? (
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={cn(inputBase, 'appearance-none cursor-pointer')}
            {...(inputProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={inputBase}
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        <label
          htmlFor={id}
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-all duration-200 pointer-events-none',
            (hasValue || (as === 'select' && value)) ? 'opacity-0 -translate-y-4' : 'opacity-100',
            Icon && 'left-12'
          )}
        >
          {placeholder || label}
        </label>
        {(hasValue || (as === 'select' && value)) && (
          <span className="absolute left-4 top-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {label}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
