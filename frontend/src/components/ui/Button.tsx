import React from 'react';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'success';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = `
        relative inline-flex items-center justify-center gap-2.5
        font-semibold rounded-xl
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        overflow-hidden
        active:scale-[0.98]
    `;

    const variants: Record<string, string> = {
        primary: `
            bg-primary hover:bg-primary-dark text-white
            shadow-lg shadow-primary/25 hover:shadow-primary/40
            focus-visible:ring-primary
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
            before:translate-x-[-100%] hover:before:translate-x-[100%]
            before:transition-transform before:duration-500
        `,
        secondary: `
            bg-white hover:bg-slate-50 text-slate-900
            border border-slate-200 hover:border-slate-300
            shadow-sm hover:shadow-md
            focus-visible:ring-primary
        `,
        danger: `
            bg-danger hover:bg-red-600 text-white
            shadow-lg shadow-danger/25 hover:shadow-danger/40
            focus-visible:ring-danger
        `,
        success: `
            bg-success hover:bg-emerald-600 text-white
            shadow-lg shadow-success/25 hover:shadow-success/40
            focus-visible:ring-success
        `,
        ghost: `
            bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-900
            focus-visible:ring-primary
        `,
        outline: `
            bg-transparent border border-slate-200 hover:border-slate-300
            text-slate-600 hover:text-slate-900 hover:bg-slate-50
            focus-visible:ring-primary
        `,
    };

    const sizes: Record<string, string> = {
        xs: 'px-2.5 py-1 text-[10px] uppercase tracking-widest gap-1.5',
        sm: 'px-3.5 py-1.5 text-xs uppercase tracking-wider',
        md: 'px-5 py-2.5 text-xs uppercase tracking-wider',
        lg: 'px-7 py-3.5 text-sm uppercase tracking-wider',
        xl: 'px-10 py-4 text-sm uppercase tracking-wider',
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && 'w-full',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>
            )}
            <span className="relative z-10">{children}</span>
            {!loading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </button>
    );
}

// Icon Button Variant
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

export function IconButton({
    variant = 'ghost',
    size = 'md',
    loading = false,
    children,
    className,
    disabled,
    ...props
}: IconButtonProps) {
    const baseStyles = `
        inline-flex items-center justify-center
        rounded-xl transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
    `;

    const variants: Record<string, string> = {
        primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20 focus-visible:ring-primary',
        secondary: 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 focus-visible:ring-primary',
        ghost: 'bg-transparent hover:bg-slate-100 text-slate-500 hover:text-slate-900 focus-visible:ring-primary',
        outline: 'bg-transparent border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 focus-visible:ring-primary',
        danger: 'bg-transparent hover:bg-danger/10 text-slate-600 hover:text-danger focus-visible:ring-danger',
    };

    const sizes: Record<string, string> = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </button>
    );
}

// Button Group Component
interface ButtonGroupProps {
    children: React.ReactNode;
    className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
    return (
        <div className={cn('inline-flex rounded-xl overflow-hidden border border-slate-200', className)}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    const c = child as React.ReactElement<{ className?: string }>;
                    return React.cloneElement(c, {
                        className: cn(
                            c.props.className,
                            'rounded-none border-0',
                            index > 0 && 'border-l border-slate-200'
                        ),
                    });
                }
                return child;
            })}
        </div>
    );
}
