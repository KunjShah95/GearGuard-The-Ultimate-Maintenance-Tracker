import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { PriorityBadge } from '../components/ui/Badge';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { cn } from '../utils/helpers';

const mockEvents = [
    { id: '1', date: new Date(2025, 11, 28), title: 'Compressor Service', priority: 'HIGH' },
    { id: '2', date: new Date(2025, 11, 30), title: 'HVAC Calibration', priority: 'MEDIUM' },
    { id: '3', date: new Date(2026, 0, 5), title: 'Filter Replacement', priority: 'LOW' },
];

export function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="pb-12">
            <Header
                title="Service Schedule"
                subtitle="Visual timeline of preventive maintenance and inspections."
            />

            <div className="px-8 mt-8 grid grid-cols-1 xl:grid-cols-3 gap-10 animate-fade-in">
                {/* Left: Main Calendar */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between bg-surface-light/50 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-900/80 flex items-center justify-center border border-white/5 shadow-inner">
                                <Icon icon="solar:calendar-bold-duotone" className="w-7 h-7 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight">{format(currentDate, 'MMMM yyyy')}</h3>
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{days.length} Operable Days</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prevMonth} className="p-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl border border-white/5 transition-all text-zinc-400 hover:text-white">
                                <Icon icon="solar:alt-arrow-left-bold" className="w-5 h-5" />
                            </button>
                            <button onClick={nextMonth} className="p-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl border border-white/5 transition-all text-zinc-400 hover:text-white">
                                <Icon icon="solar:alt-arrow-right-bold" className="w-5 h-5" />
                            </button>
                            <Button onClick={() => { }} className="ml-4 rounded-xl px-6 font-bold h-12 shadow-lg shadow-primary/20">
                                <Icon icon="solar:add-circle-bold" className="w-5 h-5 mr-2" />
                                New Event
                            </Button>
                        </div>
                    </div>

                    <div className="bg-surface-light/20 border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-sm">
                        <div className="grid grid-cols-7 border-b border-white/5 bg-zinc-900/40">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 border-r border-white/5 last:border-0">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {days.map((day, idx) => {
                                const eventsForDay = mockEvents.filter(e => isSameDay(e.date, day));
                                return (
                                    <div
                                        key={day.toString()}
                                        className={cn(
                                            "min-h-[140px] p-4 border-r border-b border-white/5 hover:bg-white/[0.02] transition-colors relative",
                                            !isSameMonth(day, currentDate) && "opacity-20 pointer-events-none bg-black/20",
                                            (idx + 1) % 7 === 0 && "border-r-0"
                                        )}
                                    >
                                        <span className={cn(
                                            "text-sm font-bold",
                                            isSameDay(day, new Date()) ? "w-8 h-8 bg-primary text-white flex items-center justify-center rounded-xl shadow-lg shadow-primary/30" : "text-zinc-500"
                                        )}>
                                            {format(day, 'd')}
                                        </span>

                                        <div className="mt-4 space-y-1.5 overflow-hidden">
                                            {eventsForDay.map(evt => (
                                                <div key={evt.id} className="p-1.5 px-2.5 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center gap-2 truncate group cursor-pointer hover:border-primary/50 transition-all shadow-lg">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)]",
                                                        evt.priority === 'HIGH' ? 'bg-rose-500 shadow-rose-500/50' :
                                                            evt.priority === 'MEDIUM' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-blue-400 shadow-blue-400/50'
                                                    )} />
                                                    <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white transition-colors truncate">{evt.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Agenda/Insights */}
                <div className="space-y-8 pt-4">
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 px-2">Upcoming Agenda</h3>
                        <div className="space-y-4">
                            {mockEvents.map(evt => (
                                <div key={evt.id} className="p-5 bg-surface-light/30 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-surface-light/50 transition-all backdrop-blur-md hover:-translate-y-1 duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-900/80 flex items-center justify-center text-primary border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                                            <Icon icon="solar:clock-circle-bold-duotone" className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{evt.title}</h4>
                                            <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest mt-0.5">{format(evt.date, 'MMM dd, yyyy')}</p>
                                        </div>
                                    </div>
                                    <PriorityBadge priority={evt.priority as any} />
                                </div>
                            ))}
                            <button className="w-full py-5 rounded-2xl border border-dashed border-white/10 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] hover:border-primary/50 hover:text-primary transition-all bg-zinc-900/20">
                                View Full Schedule
                            </button>
                        </div>
                    </div>

                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-[2rem] relative overflow-hidden group">
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Icon icon="solar:lightbulb-bold-duotone" className="text-primary w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-white">Smart Insight</h4>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed italic relative z-10">
                            "We noticed a spike in HVAC requests during the upcoming cooling month. Consider pre-emptive filter inventory check."
                        </p>
                        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/10 blur-3xl rounded-full -z-0 group-hover:bg-primary/20 transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
