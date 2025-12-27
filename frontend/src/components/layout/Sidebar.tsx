import { NavLink, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { cn } from '../../utils/helpers';
import { useState } from 'react';
import { motion } from 'framer-motion';

const navItems = [
    { path: '/app', label: 'Dashboard', icon: 'solar:widget-3-bold-duotone', code: 'SYS_DSB' },
    { path: '/app/equipment', label: 'Equipment', icon: 'solar:box-minimalistic-bold-duotone', code: 'ASSET_REG' },
    { path: '/app/teams', label: 'Teams', icon: 'solar:users-group-rounded-bold-duotone', code: 'UNIT_SYNC' },
    { path: '/app/requests', label: 'Requests', icon: 'solar:clipboard-list-bold-duotone', code: 'ORD_PROC' },
    { path: '/app/calendar', label: 'Calendar', icon: 'solar:calendar-bold-duotone', code: 'OPS_SCH' },
    { path: '/app/reports', label: 'Reports', icon: 'solar:chart-2-bold-duotone', code: 'ANA_LOG' },
];

interface SidebarProps {
    onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={cn(
                'h-screen bg-zinc-950 border-r border-zinc-800/50 flex flex-col transition-all duration-500 relative z-50 shadow-2xl overflow-hidden font-sans',
                collapsed ? 'w-20' : 'w-72'
            )}
        >
            {/* Logo Section */}
            <div className="flex items-center gap-4 px-6 h-24 border-b border-zinc-800/50 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                    <Icon icon="solar:shield-bold-duotone" className="w-6 h-6 text-white" />
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="truncate"
                    >
                        <h1 className="text-xl font-display font-bold text-white tracking-tight">GearGuard</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                            <p className="text-[10px] text-zinc-400 font-semibold tracking-wide">Online</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto custom-scrollbar relative z-10">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={cn(
                                'flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative',
                                isActive
                                    ? 'bg-primary/10 text-white'
                                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/70'
                            )}
                        >
                            <div className={cn(
                                'w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all',
                                isActive ? 'text-primary' : 'group-hover:text-primary'
                            )}>
                                <Icon icon={item.icon} className="w-full h-full" />
                            </div>

                            {!collapsed && (
                                <div className="flex flex-col flex-1 truncate">
                                    <span className={cn(
                                        'text-sm font-bold tracking-tight transition-all',
                                        isActive ? 'text-white' : 'group-hover:text-white'
                                    )}>{item.label}</span>
                                </div>
                            )}

                            {isActive && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_rgba(37,99,235,1)]"
                                />
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-zinc-800/50 space-y-1 relative z-10">
                <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all group">
                    <Icon icon="solar:settings-bold-duotone" className="w-5 h-5 flex-shrink-0 group-hover:rotate-45 transition-transform duration-500" />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Settings</span>}
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-zinc-500 hover:text-danger hover:bg-danger/10 transition-all group"
                >
                    <Icon icon="solar:power-bold" className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Logout</span>}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-12 w-6 h-6 bg-zinc-950 text-white rounded-full flex items-center justify-center shadow-xl border border-zinc-800 transition-all hover:scale-110 z-[60] group"
            >
                <Icon
                    icon={collapsed ? "solar:alt-arrow-right-bold-duotone" : "solar:alt-arrow-left-bold-duotone"}
                    className="w-4 h-4 text-zinc-300 group-hover:text-primary transition-colors"
                />
            </button>
        </aside>
    );
}
