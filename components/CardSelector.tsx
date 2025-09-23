
import React from 'react';
import { Option } from '../types';
import { CheckCircleIcon } from './icons';

interface CardSelectorProps<T extends string> {
  options: Option<T>[];
  selectedValue: T | T[];
  onChange: (value: T) => void;
  type: 'radio' | 'checkbox';
  title: string;
  subtitle: string;
}

export function CardSelector<T extends string,>({
  options,
  selectedValue,
  onChange,
  type,
  title,
  subtitle,
}: CardSelectorProps<T>) {
  const isSelected = (value: T) => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(value);
    }
    return selectedValue === value;
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-1 mb-4">{subtitle}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              isSelected(option.value)
                ? 'border-blue-500 ring-2 ring-blue-500 shadow-lg'
                : 'border-slate-300 bg-white hover:border-blue-400 hover:shadow-md'
            }`}
          >
            {isSelected(option.value) && (
              <CheckCircleIcon className="absolute top-2 right-2 h-6 w-6 text-blue-500" />
            )}
            <h3 className="font-semibold text-slate-700">{option.label}</h3>
            {option.description && <p className="text-xs text-slate-500 mt-1">{option.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
