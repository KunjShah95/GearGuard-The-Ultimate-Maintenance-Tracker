import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { DEPARTMENT_OPTIONS } from '../../utils/constants';

const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
};

export function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('PASSWORDS_DO_NOT_MATCH');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await register(formData);
            navigate('/app');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-dark overflow-hidden font-sans">
            {/* Background Layers */}
            <div className="fixed inset-0 dot-grid pointer-events-none opacity-[0.05]" />

            {/* Left Side: Authentication Form */}
            <div className="flex flex-col justify-center items-center p-8 relative z-10 lg:order-1 order-2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={springTransition}
                    className="w-full max-w-xl"
                >
                    <div className="mb-16">
                        <div className="lg:hidden flex mb-12">
                            <Link to="/" className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Icon icon="solar:shield-bold-duotone" className="w-7 h-7 text-white" />
                            </Link>
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block mb-4 italic">// NODE_PROVISIONING</span>
                        <h2 className="text-5xl font-black text-white tracking-tighter mb-2 leading-none">Deploy New Node</h2>
                        <p className="text-zinc-500 font-bold">Establish your identity within the industrial mesh.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-6 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center gap-4"
                        >
                            <Icon icon="solar:danger-bold-duotone" className="text-rose-500 w-6 h-6 shrink-0" />
                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
                                SYSTEM_REJECTION: SECURITY_PROTOCOL_VIOLATION <br />
                                {error}
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-8">
                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 ml-1 italic">Operator_Name</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:user-id-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full h-16 pl-16 pr-6 bg-zinc-900/50 border border-white/5 rounded-[1.5rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-bold placeholder:text-zinc-700"
                                    placeholder="J. Smith"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 ml-1 italic">Sector_ID (Email)</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:letter-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full h-16 pl-16 pr-6 bg-zinc-900/50 border border-white/5 rounded-[1.5rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-bold placeholder:text-zinc-700"
                                    placeholder="operator@system.sys"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 ml-1 italic">Operational_Sector</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                                    <Icon icon="solar:structure-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <select
                                    className="w-full h-16 pl-16 pr-12 bg-zinc-900/50 border border-white/5 rounded-[1.5rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-bold appearance-none cursor-pointer"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                >
                                    <option value="" disabled className="bg-surface-dark">Select Assignment</option>
                                    {DEPARTMENT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-surface-dark">{opt.label}</option>
                                    ))}
                                </select>
                                <Icon icon="solar:alt-arrow-down-bold-duotone" className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 pointer-events-none" />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Auth_Cipher</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:lock-keyhole-minimalistic-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full h-16 pl-16 pr-6 bg-zinc-900/50 border border-white/5 rounded-[1.5rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-mono text-sm tracking-[0.5em] placeholder:text-zinc-700"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Confirm_Cipher</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:check-circle-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full h-16 pl-16 pr-6 bg-zinc-900/50 border border-white/5 rounded-[1.5rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-mono text-sm tracking-[0.5em] placeholder:text-zinc-700"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 pt-4">
                            <Button
                                type="submit"
                                className="w-full h-24 rounded-[2.5rem] text-xl font-black group relative overflow-hidden transition-all duration-500 shadow-[0_0_60px_rgba(99,102,241,0.1)] hover:shadow-[0_0_80px_rgba(99,102,241,0.2)]"
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    {isLoading ? (
                                        <Icon icon="solar:restart-bold-duotone" className="w-8 h-8 animate-spin" />
                                    ) : (
                                        <>
                                            INITIALIZE_UNIT_NODE
                                            <Icon icon="solar:power-bold" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>
                    </form>

                    <p className="mt-16 text-center text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">
                        Already provisioned? <Link to="/login" className="text-primary hover:text-white transition-colors underline underline-offset-8 decoration-primary/30">Resume Session</Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Side: Visual Showcase */}
            <div className="hidden lg:flex flex-col justify-center px-24 relative overflow-hidden lg:order-2 order-1 border-l border-white/[0.05]">
                <div className="absolute inset-0 bg-primary/5 shadow-inner" />

                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={springTransition}
                    className="relative z-10"
                >
                    <Link to="/" className="inline-flex items-center gap-4 mb-20 group">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-500">
                            <Icon icon="solar:shield-bold-duotone" className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">GearGuard</span>
                    </Link>

                    <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                        The Standard for <br />
                        <span className="italic font-medium text-zinc-600">Enterprise Assets.</span>
                    </h1>

                    <div className="space-y-12">
                        <FeatureItem icon="solar:database-bold-duotone" title="Hyper-Indexed Registry" desc="Sub-millisecond access to asset provenance and maintenance history." />
                        <FeatureItem icon="solar:diagram-up-bold-duotone" title="Predictive Routing" desc="AI-driven work order dispatching based on real-time telemetry." />
                        <FeatureItem icon="solar:chart-square-bold-duotone" title="Industrial BI" desc="Deep-dive analytics on equipment longevity and team velocity." />
                    </div>
                </motion.div>

                {/* Satellite Decorative Elements */}
                <div className="absolute top-0 right-0 p-12 text-[10px] font-black text-white opacity-10 tracking-[0.5em] vertical-text uppercase">
                    Core_OS_v4.2.0 // STABLE
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ title, desc, icon }: any) {
    return (
        <div className="flex gap-8 group">
            <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900/50 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                <Icon icon={icon} className="w-8 h-8 text-zinc-600 group-hover:text-white transition-all duration-700" />
            </div>
            <div className="flex-1 border-b border-white/[0.05] pb-10 last:border-0">
                <h4 className="font-bold text-2xl mb-2 text-white group-hover:text-primary transition-colors tracking-tight">{title}</h4>
                <p className="text-zinc-500 text-lg leading-tight font-medium">{desc}</p>
            </div>
        </div>
    );
}
