import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({
    label,
    error,
    icon,
    className,
    id,
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-xs font-semibold text-zinc-300 mb-2 ml-1"
                >
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={cn(
                        'w-full px-5 py-3.5 bg-zinc-900/50 border border-white/5 rounded-2xl',
                        'text-white placeholder:text-zinc-500 text-sm font-medium',
                        'focus:outline-none focus:border-primary/50 focus:bg-zinc-900',
                        'transition-all duration-300',
                        !!icon && 'pl-14',
                        error && 'border-rose-500/50 focus:border-rose-500',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-rose-500 ml-1">{error}</p>
            )}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function TextArea({
    label,
    error,
    className,
    id,
    ...props
}: TextAreaProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-xs font-semibold text-zinc-300 mb-2 ml-1"
                >
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={cn(
                    'w-full px-5 py-4 bg-zinc-900/50 border border-white/5 rounded-2xl',
                    'text-white placeholder:text-zinc-500 text-sm font-medium resize-none',
                    'focus:outline-none focus:border-primary/50 focus:bg-zinc-900',
                    'transition-all duration-300',
                    error && 'border-rose-500/50 focus:border-rose-500',
                    className
                )}
                rows={4}
                {...props}
            />
            {error && (
                <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-rose-500 ml-1">{error}</p>
            )}
        </div>
    );
}
