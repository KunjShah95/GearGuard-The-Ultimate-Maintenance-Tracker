import React from 'react';
import { cn } from '../../utils/helpers';
import { Icon } from '@iconify/react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
}

export function Select({
    label,
    error,
    options,
    placeholder = 'Select an option',
    className,
    id,
    onChange,
    value,
    ...props
}: SelectProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 ml-1 italic"
                >
                    {label}
                </label>
            )}
            <div className="relative group">
                <select
                    id={inputId}
                    className={cn(
                        'w-full px-5 py-3.5 bg-zinc-900/50 border border-white/5 rounded-2xl',
                        'text-white appearance-none cursor-pointer font-bold',
                        'focus:outline-none focus:border-primary/50 focus:bg-zinc-900',
                        'transition-all duration-300',
                        error && 'border-rose-500/50 focus:border-rose-500',
                        !value && 'text-zinc-600',
                        className
                    )}
                    value={value}
                    onChange={handleChange}
                    {...props}
                >
                    <option value="" disabled className="bg-surface-dark text-zinc-600">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-surface-dark text-white"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600 group-focus-within:text-primary transition-colors">
                    <Icon icon="solar:alt-arrow-down-bold-duotone" className="w-5 h-5" />
                </div>
            </div>
            {error && (
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-rose-500 ml-1">{error}</p>
            )}
        </div>
    );
}
