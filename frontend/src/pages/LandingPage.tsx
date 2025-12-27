import { Icon } from '@iconify/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const springTransition = {
    type: "spring",
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
};

export function LandingPage() {
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

    return (
        <div className="min-h-screen bg-zinc-950 selection:bg-primary/30 font-sans overflow-x-hidden text-zinc-200">
            {/* Background Infrastructure */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
                <div className="absolute inset-0 noise opacity-[0.02]" />
                
                {/* Vertical Grid Lines */}
                <div className="absolute inset-0 flex justify-around px-6 pointer-events-none opacity-[0.03]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-px h-full bg-white" />
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-8 h-14 border-zinc-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                            <Icon icon="solar:shield-bold-duotone" className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-display font-bold tracking-tight text-white">
                            GearGuard
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-bold text-zinc-500">
                        <a href="#features" className="hover:text-white transition-colors">Capabilities</a>
                        <a href="#teams" className="hover:text-white transition-colors">Ecosystem</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Enterprise</a>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Sign In</Link>
                        <Link to="/register">
                            <Button className="rounded-full px-5 h-9 text-[11px] font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 z-10">
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="grid grid-cols-12 gap-12 items-center">
                        <div className="col-span-12 lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={springTransition}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-bold text-primary mb-8 uppercase tracking-widest"
                            >
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                Industrial Intelligence v4.0
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...springTransition, delay: 0.1 }}
                                className="text-6xl md:text-8xl font-display font-bold tracking-tight leading-[0.9] mb-8 text-white"
                            >
                                Orchestrate <br />
                                <span className="text-zinc-500">Industrial</span> <br />
                                <span className="text-primary">Excellence.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...springTransition, delay: 0.2 }}
                                className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-12 font-light"
                            >
                                The unified operating system for high-stakes asset management. 
                                Precision tracking, predictive maintenance, and elite team coordination.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ...springTransition, delay: 0.3 }}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <Link to="/register">
                                    <Button className="h-14 px-8 rounded-2xl text-lg font-display font-bold bg-primary text-white hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                                        Start Deploying
                                    </Button>
                                </Link>
                                <button className="h-14 px-8 rounded-2xl text-sm font-bold text-white border border-zinc-800 hover:bg-zinc-900 transition-all">
                                    View Documentation
                                </button>
                            </motion.div>
                        </div>

                        <div className="col-span-12 lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                className="relative z-10"
                            >
                                <div className="glass-panel rounded-[32px] p-2 border-zinc-800/50 shadow-2xl overflow-hidden">
                                    <div className="bg-zinc-950 rounded-[24px] overflow-hidden border border-zinc-800/50">
                                        <div className="h-10 border-b border-zinc-800/50 bg-zinc-900/50 flex items-center px-6 justify-between">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                                            </div>
                                            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Terminal_v4</div>
                                        </div>
                                        <div className="p-6 space-y-4">
                                            <div className="h-32 bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Icon icon="solar:chart-bold-duotone" className="text-primary w-4 h-4" />
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[10px] text-zinc-500 font-bold uppercase">Efficiency</div>
                                                        <div className="text-xl font-display font-bold text-white">94.2%</div>
                                                    </div>
                                                </div>
                                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "94.2%" }}
                                                        transition={{ duration: 1.5, delay: 1 }}
                                                        className="h-full bg-primary" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-24 bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-4">
                                                    <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Active Nodes</div>
                                                    <div className="text-2xl font-display font-bold text-white">128</div>
                                                </div>
                                                <div className="h-24 bg-zinc-900/50 rounded-xl border border-zinc-800/50 p-4">
                                                    <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Uptime</div>
                                                    <div className="text-2xl font-display font-bold text-white">99.9%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Decorative Elements */}
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-[100px] -z-10" />
                                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 blur-[100px] -z-10" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="w-12 h-px bg-primary" />
                            <span className="text-[11px] font-bold text-primary uppercase tracking-[0.3em]">01 / Capabilities</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
                            Engineered for <br />
                            <span className="text-zinc-500">Maximum Reliability.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Asset Intelligence",
                                desc: "Real-time telemetry and health monitoring for every piece of equipment in your fleet.",
                                icon: "solar:cpu-bold-duotone",
                                color: "primary"
                            },
                            {
                                title: "Predictive Maintenance",
                                desc: "AI-driven insights that identify potential failures before they occur, reducing downtime.",
                                icon: "solar:bolt-bold-duotone",
                                color: "indigo"
                            },
                            {
                                title: "Team Orchestration",
                                desc: "Seamlessly coordinate maintenance teams with automated dispatch and task tracking.",
                                icon: "solar:users-group-rounded-bold-duotone",
                                color: "blue"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-[32px] bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all group"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <Icon icon={feature.icon} className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-zinc-400 leading-relaxed font-light">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-32 px-6 border-y border-zinc-900 bg-zinc-950/50 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Assets Managed", value: "50k+" },
                            { label: "Uptime Guaranteed", value: "99.99%" },
                            { label: "Cost Reduction", value: "32%" },
                            { label: "Active Users", value: "12k+" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-48 px-6 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-[48px] p-16 md:p-24 border-zinc-800/50 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                        <h2 className="text-4xl md:text-7xl font-display font-bold text-white tracking-tight mb-8">
                            Ready to <span className="text-primary">Optimize?</span>
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light">
                            Join the world's leading industrial teams and transform your asset management today.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <Link to="/register">
                                <Button className="h-16 px-10 rounded-2xl text-lg font-display font-bold bg-white text-black hover:bg-zinc-200 transition-all">
                                    Get Started Now
                                </Button>
                            </Link>
                            <Button variant="outline" className="h-16 px-10 rounded-2xl text-lg font-display font-bold border-zinc-800 text-white hover:bg-zinc-900 transition-all">
                                Contact Sales
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-zinc-900 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-12 gap-12 mb-20">
                        <div className="col-span-12 lg:col-span-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <Icon icon="solar:shield-bold-duotone" className="text-white w-5 h-5" />
                                </div>
                                <span className="text-xl font-display font-bold text-white">GearGuard</span>
                            </div>
                            <p className="text-zinc-500 leading-relaxed max-w-xs font-light">
                                The industrial standard for asset orchestration and tactical intelligence.
                            </p>
                        </div>
                        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { title: "Product", links: ["Features", "Security", "Enterprise", "Pricing"] },
                                { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
                                { title: "Resources", links: ["Documentation", "API Reference", "Guides", "Support"] },
                                { title: "Legal", links: ["Privacy", "Terms", "Cookie Policy", "SLA"] }
                            ].map((col, i) => (
                                <div key={i}>
                                    <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">{col.title}</h4>
                                    <ul className="space-y-4">
                                        {col.links.map((link, j) => (
                                            <li key={j}>
                                                <a href="#" className="text-sm text-zinc-500 hover:text-primary transition-colors">{link}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest">
                            © 2025 GearGuard Inc. All rights reserved.
                        </div>
                        <div className="flex gap-6">
                            {['solar:share-circle-bold', 'solar:clapperboard-edit-bold', 'solar:letter-bold'].map((icon, i) => (
                                <a key={i} href="#" className="text-zinc-600 hover:text-white transition-colors">
                                    <Icon icon={icon} className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

