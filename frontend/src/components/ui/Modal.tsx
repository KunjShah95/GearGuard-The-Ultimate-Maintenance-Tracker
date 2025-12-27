import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className,
}: ModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            'relative w-full bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden',
                            sizes[size],
                            className
                        )}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                                <div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] block mb-1 italic">// SYSTEM_OVERLAY</span>
                                    <h2 className="text-2xl font-black text-white tracking-tighter">{title}</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                >
                                    <Icon icon="solar:close-circle-bold-duotone" className="w-6 h-6" />
                                </button>
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-8">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

interface ModalActionsProps {
    children: React.ReactNode;
    className?: string;
}

export function ModalActions({ children, className }: ModalActionsProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/5',
                className
            )}
        >
            {children}
        </div>
    );
}
