import { cn } from '../../utils/helpers';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    className?: string;
}

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className,
}: BadgeProps) {
    const variants = {
        default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        info: 'bg-primary/10 text-primary border-primary/20',
    };

    const sizes = {
        sm: 'px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] italic',
        md: 'px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] italic',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-md border',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}

// Status Badge with predefined colors
interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const getVariant = (status: string): BadgeProps['variant'] => {
        switch (status) {
            case 'NEW':
            case 'OPERATIONAL':
                return 'info';
            case 'IN_PROGRESS':
            case 'UNDER_MAINTENANCE':
                return 'warning';
            case 'REPAIRED':
                return 'success';
            case 'SCRAP':
            case 'SCRAPPED':
            case 'DECOMMISSIONED':
                return 'danger';
            default:
                return 'default';
        }
    };

    const formatStatus = (status: string) => {
        return status
            .split('_')
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <Badge variant={getVariant(status)} className={className}>
            {formatStatus(status)}
        </Badge>
    );
}

// Priority Badge
interface PriorityBadgeProps {
    priority: string;
    className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
    const getVariant = (priority: string): BadgeProps['variant'] => {
        switch (priority) {
            case 'LOW':
                return 'default';
            case 'MEDIUM':
                return 'info';
            case 'HIGH':
                return 'warning';
            case 'CRITICAL':
                return 'danger';
            default:
                return 'default';
        }
    };

    return (
        <Badge variant={getVariant(priority)} className={className}>
            {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </Badge>
    );
}
