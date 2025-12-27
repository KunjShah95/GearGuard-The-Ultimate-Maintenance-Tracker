import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full px-8 py-6 bg-zinc-950/40 backdrop-blur-xl border-b border-zinc-800/50">
            <div className="flex items-center justify-between">
                {/* Title area */}
                <div className="animate-fade-in">
                    <h1 className="text-2xl font-display font-bold text-white tracking-tight leading-none">{title}</h1>
                    {subtitle && (
                        <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-[0.2em]">{subtitle}</p>
                    )}
                </div>

                {/* Action area */}
                <div className="flex items-center gap-6">
                    {/* Search bar */}
                    <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-zinc-800/50 rounded-xl w-80 group focus-within:border-primary/50 focus-within:bg-zinc-900 transition-all duration-300">
                        <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            className="bg-transparent border-none outline-none text-xs font-bold text-white placeholder:text-zinc-700 w-full tracking-wide"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2.5 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/50 rounded-xl transition-all group">
                        <Icon icon="solar:bell-bold-duotone" className="w-5 h-5 text-zinc-500 group-hover:text-primary transition-colors" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-zinc-950 animate-pulse" />
                    </button>

                    {/* Profile dropdown */}
                    <div className="flex items-center gap-4 pl-6 border-l border-zinc-800/50 cursor-pointer group">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{user?.name || 'Guest Operator'}</p>
                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest group-hover:text-primary/60 transition-colors">{user?.role || 'External Unit'}</p>
                        </div>
                        <div className="relative">
                            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold group-hover:border-primary/50 transition-all overflow-hidden">
                                {user?.name ? getInitials(user.name) : <Icon icon="solar:user-bold-duotone" className="w-5 h-5" />}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-zinc-950 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
