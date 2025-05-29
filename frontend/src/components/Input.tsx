import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', icon, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`input w-full ${icon ? 'pl-10' : 'pl-3'} ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500 mt-1 animate-slide-up">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;