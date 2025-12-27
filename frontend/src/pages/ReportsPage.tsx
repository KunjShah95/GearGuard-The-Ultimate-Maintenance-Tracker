import { Icon } from '@iconify/react';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/helpers';

export function ReportsPage() {
    return (
        <div className="pb-12">
            <Header
                title="Operation Intelligence"
                subtitle="Analytical insights into facility uptime and maintenance efficiency."
            />

            <div className="px-8 mt-8 space-y-10 animate-fade-in">
                {/* Top KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard title="MTTR" value="4.2h" trend="-12%" isGood={true} desc="Mean Time To Repair" icon="solar:clock-circle-bold-duotone" />
                    <KPICard title="Uptime" value="98.8%" trend="+0.5%" isGood={true} desc="System-wide Reliability" icon="solar:bolt-bold-duotone" />
                    <KPICard title="Compliance" value="92%" trend="-3.2%" isGood={false} desc="PM Schedule Adherence" icon="solar:shield-check-bold-duotone" />
                    <KPICard title="Cost/Asset" value="$142" trend="+2%" isGood={false} desc="Avg Maintenance Spend" icon="solar:wad-of-money-bold-duotone" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Productivity Chart Stub */}
                    <Card className="p-8 bg-surface-light/30 backdrop-blur-md border-white/5 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Workload Efficiency</h3>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1">Resolved vs Reported Requests</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-xl bg-zinc-900/80 text-zinc-400 hover:text-primary flex items-center justify-center border border-white/5 transition-all shadow-inner">
                                    <Icon icon="solar:download-bold-duotone" className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 rounded-xl bg-zinc-900/80 text-zinc-400 hover:text-primary flex items-center justify-center border border-white/5 transition-all shadow-inner">
                                    <Icon icon="solar:filter-bold-duotone" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="h-64 flex items-end gap-3 justify-between relative z-10">
                            {[40, 65, 45, 90, 75, 55, 85, 30, 95, 60, 45, 80].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                                    <div
                                        className="w-full bg-primary/10 group-hover/bar:bg-primary/20 transition-all rounded-t-xl relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all bg-zinc-900 border border-white/10 text-primary text-[10px] font-black px-2 py-1 rounded-lg pointer-events-none shadow-2xl scale-90 group-hover/bar:scale-100">
                                            {h}%
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter group-hover/bar:text-zinc-400 transition-colors">M{i + 1}</span>
                                </div>
                            ))}
                        </div>
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-0" />
                    </Card>

                    {/* Distribution stub */}
                    <Card className="p-8 bg-surface-light/30 backdrop-blur-md border-white/5 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tight">Asset Distribution</h3>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1">Lifecycle Health by Category</p>
                            </div>
                            <button className="text-[10px] font-black text-primary hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                Details <Icon icon="solar:alt-arrow-right-bold" className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="space-y-8 relative z-10">
                            <DistributionRow label="Mechanical Hardware" percentage={65} color="bg-primary" icon="solar:settings-bold-duotone" />
                            <DistributionRow label="Electrical Units" percentage={42} color="bg-blue-500" icon="solar:bolt-bold-duotone" />
                            <DistributionRow label="IT Infrastructure" percentage={95} color="bg-indigo-500" icon="solar:monitor-bold-duotone" />
                            <DistributionRow label="HVAC Systems" percentage={28} color="bg-amber-500" icon="solar:wind-bold-duotone" />
                            <DistributionRow label="Transportation" percentage={52} color="bg-emerald-500" icon="solar:delivery-bold-duotone" />
                        </div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -z-0" />
                    </Card>
                </div>

                {/* Featured Report List */}
                <div className="space-y-6">
                    <h2 className="text-sm font-black text-white flex items-center gap-3 uppercase tracking-[0.2em] px-2">
                        <Icon icon="solar:graph-bold-duotone" className="text-primary w-5 h-5" />
                        Generated Intelligence
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ReportFileCard title="Q4 Preventive Audit" date="Dec 24, 2025" size="2.4 MB" />
                        <ReportFileCard title="Asset Longevity Study" date="Dec 20, 2025" size="1.1 MB" />
                        <ReportFileCard title="Team Productivity (Dec)" date="Jan 01, 2026" size="0.8 MB" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function KPICard({ title, value, trend, isGood, desc, icon }: any) {
    return (
        <div className="p-6 bg-surface-light/30 backdrop-blur-md border border-white/5 rounded-[2rem] hover:border-primary/30 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900/80 flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <Icon icon={icon} className="w-6 h-6 text-primary" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full border",
                    isGood ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                )}>
                    <Icon icon={isGood ? "solar:trend-up-bold" : "solar:trend-down-bold"} className="w-3 h-3" />
                    {trend}
                </div>
            </div>
            <div className="relative z-10">
                <div className="text-4xl font-black text-white mb-1 tracking-tighter">{value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{title}</div>
                <p className="text-[10px] font-bold text-zinc-600">{desc}</p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 blur-2xl rounded-full -z-0 group-hover:bg-primary/10 transition-colors" />
        </div>
    );
}

function DistributionRow({ label, percentage, color, icon }: any) {
    return (
        <div className="space-y-3 group/row">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-900/80 flex items-center justify-center border border-white/5 shadow-inner group-hover/row:scale-110 transition-transform">
                        <Icon icon={icon} className={cn("w-4 h-4", color.replace('bg-', 'text-'))} />
                    </div>
                    <span className="text-xs font-bold text-zinc-400 group-hover/row:text-white transition-colors">{label}</span>
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{percentage}% Operable</span>
            </div>
            <div className="h-2 w-full bg-zinc-900/50 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div className={cn("h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]", color)} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
}

function ReportFileCard({ title, date, size }: any) {
    return (
        <div className="p-5 bg-surface-light/30 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer hover:border-primary/30 hover:-translate-y-1 duration-300">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900/80 flex items-center justify-center text-zinc-500 group-hover:text-primary transition-all border border-white/5 shadow-inner">
                    <Icon icon="solar:document-bold-duotone" className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-0.5">{date} • {size}</p>
                </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-zinc-900/50 flex items-center justify-center text-zinc-700 group-hover:text-white transition-colors border border-white/5">
                <Icon icon="solar:download-linear" className="w-4 h-4" />
            </div>
        </div>
    );
}
