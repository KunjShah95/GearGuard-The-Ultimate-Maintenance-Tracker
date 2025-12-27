import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
    return (
        <div
            className={cn(
                'bg-zinc-900/50 rounded-2xl border border-zinc-800/50 p-6',
                'transition-all duration-300',
                hover && 'hover:border-primary/50 hover:bg-zinc-900 hover:shadow-xl hover:shadow-primary/5 cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('flex items-center justify-between mb-6', className)}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn('text-lg font-display font-bold text-white tracking-tight', className)}>
            {children}
        </h3>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={cn('text-zinc-400 font-light leading-relaxed', className)}>{children}</div>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('flex items-center justify-end gap-3 mt-6 pt-6 border-t border-zinc-800/50', className)}>
            {children}
        </div>
    );
}
