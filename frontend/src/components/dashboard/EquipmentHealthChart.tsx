import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp } from 'lucide-react';

const mockData = [
    { name: 'Jan', score: 65 },
    { name: 'Feb', score: 70 },
    { name: 'Mar', score: 68 },
    { name: 'Apr', score: 75 },
    { name: 'May', score: 82 },
    { name: 'Jun', score: 86 },
    { name: 'Jul', score: 85 },
    { name: 'Aug', score: 89 },
    { name: 'Sep', score: 87 },
    { name: 'Oct', score: 92 },
    { name: 'Nov', score: 88 },
    { name: 'Dec', score: 94 },
];

interface EquipmentHealthChartProps {
    timeframe: string;
    onTimeframeChange: (timeframe: string) => void;
}

export function EquipmentHealthChart({ timeframe, onTimeframeChange }: EquipmentHealthChartProps) {
    const ranges = ['24H', '7D', '30D', '90D'];

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 w-full h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Equipment Health Index</h3>
                    <p className="text-slate-500 text-sm mt-1">Overall operational efficiency trending</p>
                </div>

                <div className="flex items-center p-1 bg-slate-50 rounded-xl border border-slate-100">
                    {ranges.map((range) => (
                        <button
                            key={range}
                            onClick={() => onTimeframeChange(range.toLowerCase())}
                            className={`
                                px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200
                                ${timeframe.toUpperCase() === range
                                    ? 'bg-white text-primary shadow-sm border border-slate-100'
                                    : 'text-slate-500 hover:text-slate-900'
                                }
                            `}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '12px',
                                border: 'none',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                padding: '12px'
                            }}
                            itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-50">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-sm font-medium text-slate-600">Health Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-slate-600">Target: 85%</span>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 text-success font-bold text-sm bg-success/5 px-3 py-1.5 rounded-lg border border-success/10">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% vs last period</span>
                </div>
            </div>
        </div>
    );
}
