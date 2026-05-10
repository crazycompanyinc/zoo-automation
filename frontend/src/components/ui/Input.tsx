import { cn } from '../../utils/cn.js';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full px-4 py-2.5 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-dark-500',
          'focus:outline-none focus:ring-2 focus:ring-zoo-500 focus:border-transparent',
          'transition-colors duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className, id, ...props }: TextAreaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full px-4 py-2.5 bg-dark-900 border border-dark-600 rounded-lg text-white placeholder-dark-500',
          'focus:outline-none focus:ring-2 focus:ring-zoo-500 focus:border-transparent',
          'transition-colors duration-200 resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        rows={4}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
