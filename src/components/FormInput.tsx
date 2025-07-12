import React, { useState, useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface FormInputProps {
  type: 'text' | 'tel' | 'email';
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  errorMessage = 'Campo inválido'
}) => {
  const [isValid, setIsValid] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [formattedValue, setFormattedValue] = useState(value);

  const formatPhoneNumber = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length <= 11) {
      let formatted = numbers;
      if (numbers.length > 2) formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      if (numbers.length > 7) formatted = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      return formatted;
    }
    return phone;
  };

  const validateInput = (value: string) => {
    if (!isDirty) return true;
    if (required && !value) return false;
    if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
    if (type === 'tel' && !/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) return false;
    if (pattern && !new RegExp(pattern).test(value)) return false;
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (type === 'tel') {
      newValue = formatPhoneNumber(newValue);
    }
    setFormattedValue(newValue);
    onChange(newValue);
    setIsDirty(true);
  };

  const handleBlur = () => {
    setIsValid(validateInput(value));
  };

  useEffect(() => {
    if (type === 'tel') {
      setFormattedValue(formatPhoneNumber(value));
    } else {
      setFormattedValue(value);
    }
  }, [value, type]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 dark:text-dark-text-secondary mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={formattedValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 bg-white/10 dark:bg-dark-surface/10 
            border rounded-lg text-white dark:text-dark-text 
            placeholder-gray-400 focus:outline-none focus:ring-2 
            transition-all duration-200
            ${!isValid 
              ? 'border-red-500 focus:ring-red-500' 
              : isDirty && isValid
                ? 'border-green-500 focus:ring-green-500'
                : 'border-white/20 dark:border-dark-border focus:ring-primary'
            }
          `}
        />
        {isDirty && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      {!isValid && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput; 