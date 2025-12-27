import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
};

export function LoginPage() {
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const googleBtnRef = useRef<HTMLDivElement | null>(null);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
    const apiUrlHint = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:5001/api';

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
                    const message = err?.message || 'Google Sign-In failed';
                    setError(
                        message === 'Network Error'
                            ? `Network Error: backend is not reachable. Start backend and ensure VITE_API_URL is ${apiUrlHint}.`
                            : message
                    );
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
        email: 'admin@gearguard.com',
        password: 'password',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(formData);
            navigate('/app');
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-dark overflow-hidden font-sans">
            {/* Background Layers */}
            <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-surface-dark to-surface-light/30" />

            {/* Left Side: Industrial Showcase */}
            <div className="hidden lg:flex flex-col justify-center px-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 border-r border-white/5" />

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
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

                    <h1 className="text-7xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                        Welcome back.
                    </h1>

                    <p className="text-2xl text-zinc-300/80 max-w-lg leading-tight mb-16 font-medium">
                        Sign in to manage equipment, teams, and maintenance requests.
                    </p>

                    <div className="grid grid-cols-2 gap-12 border-t border-white/[0.05] pt-12">
                        {[
                            { value: 'LIVE', label: 'OPERATIONAL_STATUS', color: 'text-emerald-500' },
                            { value: 'v4.2.0', label: 'SYSTEM_VERSION', color: 'text-primary' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className={`text-2xl font-black ${stat.color} mb-2 tracking-widest`}>{stat.value}</div>
                                <div className="text-xs font-semibold tracking-wide text-zinc-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Abstract Visual Element */}
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-10 blur-[100px] bg-primary rounded-full -mr-40 -mb-40" />
            </div>

            {/* Right Side: Authentication */}
            <div className="flex flex-col justify-center items-center p-8 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={springTransition}
                    className="w-full max-w-md"
                >
                    <div className="mb-16">
                        <div className="lg:hidden flex mb-12">
                            <Link to="/" className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Icon icon="solar:shield-bold-duotone" className="w-7 h-7 text-white" />
                            </Link>
                        </div>
                        <span className="text-sm font-semibold text-primary block mb-3">Sign in</span>
                        <h2 className="text-4xl font-display font-bold text-white tracking-tight mb-2 leading-none">Welcome to GearGuard</h2>
                        <p className="text-zinc-300">Use your email and password to continue.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-6 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center gap-4"
                        >
                            <Icon icon="solar:danger-bold-duotone" className="text-rose-500 w-6 h-6 shrink-0" />
                            <div className="text-xs font-bold text-rose-400 tracking-wide leading-relaxed">
                                Sign-in failed.
                                <br />
                                {error}
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-zinc-300 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:user-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-16 pl-14 pr-5 bg-zinc-900/70 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium text-base placeholder:text-zinc-500"
                                    placeholder="you@company.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between px-1">
                                <label className="text-xs font-semibold text-zinc-300">Password</label>
                                <Link to="/forgot-password" className="text-xs font-medium text-zinc-400 hover:text-primary transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:lock-password-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full h-16 pl-14 pr-14 bg-zinc-900/70 border border-white/10 rounded-2xl outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-medium text-base placeholder:text-zinc-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-primary transition-colors"
                                >
                                    <Icon icon={showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

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
                                        Sign In
                                        <Icon icon="solar:power-bold" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </span>
                        </Button>

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
                    </form>

                    <p className="mt-10 text-center text-sm text-zinc-400">
                        New here? <Link to="/register" className="text-primary hover:text-white transition-colors underline underline-offset-4 decoration-primary/30">Create an account</Link>
                    </p>

                    <div className="mt-24 flex items-center justify-center gap-8 opacity-10 border-t border-white/[0.03] pt-12 grayscale">
                        <Icon icon="solar:shield-check-bold" className="w-8 h-8" />
                        <Icon icon="solar:mask-h-bold-duotone" className="w-8 h-8" />
                        <Icon icon="solar:key-minimalistic-square-2-bold-duotone" className="w-8 h-8" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
