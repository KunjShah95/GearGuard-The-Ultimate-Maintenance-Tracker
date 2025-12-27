import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';
import { DEPARTMENT_OPTIONS } from '../../utils/constants';

const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
};

export function RegisterPage() {
    const { register, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const googleBtnRef = useRef<HTMLDivElement | null>(null);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

    useEffect(() => {
        const existing = document.querySelector('script[data-google-identity]');
        if (existing) return;

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.setAttribute('data-google-identity', 'true');
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (!googleClientId) return;

        // @ts-expect-error - Google Identity Services script defines window.google
        const google = window.google;
        if (!google?.accounts?.id) return;
        if (!googleBtnRef.current) return;
        if (googleBtnRef.current.childElementCount > 0) return;

        google.accounts.id.initialize({
            client_id: googleClientId,
            callback: async (response: any) => {
                try {
                    if (!response?.credential) {
                        setError('Google Sign-In did not return a credential.');
                        return;
                    }
                    setIsLoading(true);
                    setError('');
                    await loginWithGoogle(response.credential);
                    navigate('/app');
                } catch (err: any) {
                    setError(err?.message || 'Google Sign-In failed');
                } finally {
                    setIsLoading(false);
                }
            },
        });

        google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'large',
            text: 'continue_with',
            shape: 'pill',
            width: 420,
        });
    }, [googleClientId, loginWithGoogle, navigate]);

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
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-surface-dark to-surface-light/30" />

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
                        <span className="text-sm font-semibold text-primary block mb-3">Create account</span>
                        <h2 className="text-4xl font-display font-bold text-white tracking-tight mb-2 leading-none">Get started with GearGuard</h2>
                        <p className="text-zinc-300">Create your profile to access the dashboard.</p>
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
                            <label className="text-xs font-semibold text-zinc-300 ml-1">Name</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:user-id-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="text"
                                    className="w-full h-16 pl-14 pr-5 bg-zinc-900/50 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium placeholder:text-zinc-500"
                                    placeholder="J. Smith"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-xs font-semibold text-zinc-300 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:letter-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="email"
                                    className="w-full h-16 pl-14 pr-5 bg-zinc-900/50 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium placeholder:text-zinc-500"
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 space-y-3">
                            <label className="text-xs font-semibold text-zinc-300 ml-1">Department</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                                    <Icon icon="solar:structure-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <select
                                    className="w-full h-16 pl-14 pr-12 bg-zinc-900/50 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium appearance-none cursor-pointer"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                >
                                    <option value="" disabled className="bg-surface-dark">Select Assignment</option>
                                    {DEPARTMENT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-surface-dark">{opt.label}</option>
                                    ))}
                                </select>
                                <Icon icon="solar:alt-arrow-down-bold-duotone" className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-xs font-semibold text-zinc-300">Password</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:lock-keyhole-minimalistic-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full h-16 pl-14 pr-5 bg-zinc-900/50 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium placeholder:text-zinc-500"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-3">
                            <label className="text-xs font-semibold text-zinc-300">Confirm password</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:check-circle-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="password"
                                    className="w-full h-16 pl-14 pr-5 bg-zinc-900/50 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium placeholder:text-zinc-500"
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
                                className="w-full h-14 rounded-2xl text-base font-bold group relative overflow-hidden transition-all duration-300 shadow-lg shadow-primary/10"
                                disabled={isLoading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-4">
                                    {isLoading ? (
                                        <Icon icon="solar:restart-bold-duotone" className="w-8 h-8 animate-spin" />
                                    ) : (
                                        <>
                                            Create account
                                            <Icon icon="solar:power-bold" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </Button>
                        </div>

                        <div className="col-span-2">
                            <div className="space-y-3">
                                {googleClientId ? (
                                    <div className="w-full flex justify-center">
                                        <div ref={googleBtnRef} />
                                    </div>
                                ) : (
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        To enable Google sign-in, set <span className="text-zinc-200 font-semibold">VITE_GOOGLE_CLIENT_ID</span> in <span className="text-zinc-200 font-semibold">frontend/.env</span> and restart.
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-zinc-400">
                        Already have an account? <Link to="/login" className="text-primary hover:text-white transition-colors underline underline-offset-4 decoration-primary/30">Sign in</Link>
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
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.45)] group-hover:scale-110 transition-transform duration-500">
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
            <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900/50 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(37,99,235,0.45)]">
                <Icon icon={icon} className="w-8 h-8 text-zinc-600 group-hover:text-white transition-all duration-700" />
            </div>
            <div className="flex-1 border-b border-white/[0.05] pb-10 last:border-0">
                <h4 className="font-bold text-2xl mb-2 text-white group-hover:text-primary transition-colors tracking-tight">{title}</h4>
                <p className="text-zinc-400 text-lg leading-tight font-medium">{desc}</p>
            </div>
        </div>
    );
}
