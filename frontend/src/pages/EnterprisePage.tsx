import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';
import { Button } from '../components/ui/Button';

const tiers = [
    {
        name: 'Growth',
        price: 'Standard',
        desc: 'Essential tracking for single-site operations.',
        features: ['Up to 500 Assets', 'Standard Support (24h)', 'Basic Analytics', 'Cloud Hosting', 'Mobile App Access'],
        cta: 'Start Free Trial',
        highlight: false
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'Mission-critical control for global manufacturing networks.',
        features: ['Unlimited Assets', 'Dedicated Success Manager', 'Predictive AI Models', 'On-Premise or Private Cloud', 'Custom ERP Integrations', 'SLA 99.999%'],
        cta: 'Contact Sales',
        highlight: true
    }
];

const deploymentOptions = [
    {
        title: 'SaaS Cloud',
        icon: 'solar:cloud-bold-duotone',
        desc: 'Instant deployment on our secure global infrastructure. Best for rapid scaling.'
    },
    {
        title: 'On-Premise',
        icon: 'solar:server-square-bold-duotone',
        desc: 'Full data sovereignty. Run GearGuard on your own hardware behind your firewall.'
    },
    {
        title: 'Hybrid',
        icon: 'solar:link-circle-bold-duotone',
        desc: 'The flexibility of cloud with the security of local data processing.'
    }
];

export function EnterprisePage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-600 selection:bg-primary/30 font-sans">
            <MarketingNavbar />

            <main className="pt-32 pb-32">
                {/* Hero Section */}
                <section className="px-6 mb-32 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl pointer-events-none" />

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Enterprise Edition</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-display font-bold text-slate-900 tracking-tight leading-[1.1] mb-8"
                        >
                            Scale without <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Compromise.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed mb-12"
                        >
                            The robust infrastructure choice for Fortune 500 manufacturers who demand reliability, security, and absolute control.
                        </motion.p>
                    </div>
                </section>

                {/* Deployment Options */}
                <section className="px-6 mb-32 bg-slate-900 py-32 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Deploy Anywhere</h2>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Whether you need air-gapped security or global cloud availability, GearGuard adapts to your infrastructure.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {deploymentOptions.map((opt, i) => (
                                <motion.div
                                    key={opt.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                                        <Icon icon={opt.icon} className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{opt.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">{opt.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing / Tiers */}
                <section className="px-6 mb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {tiers.map((tier, i) => (
                                <motion.div
                                    key={tier.name}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative p-12 rounded-[3.5rem] border transition-all duration-500 group ${tier.highlight
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-2xl hover:shadow-primary/20'
                                            : 'bg-white text-slate-900 border-slate-200 shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    {tier.highlight && (
                                        <div className="absolute top-10 right-10 px-4 py-1.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                            Recommended
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-4xl font-display font-bold mb-2">{tier.name}</h3>
                                        <p className={`text-sm font-bold uppercase tracking-widest ${tier.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {tier.desc}
                                        </p>
                                    </div>

                                    <div className="mb-12">
                                        <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                                    </div>

                                    <ul className="space-y-6 mb-12">
                                        {tier.features.map(feature => (
                                            <li key={feature} className="flex items-center gap-4">
                                                <div className={`p-1 rounded-full ${tier.highlight ? 'bg-primary/20 text-primary' : 'bg-green-100 text-green-600'}`}>
                                                    <Icon icon="solar:check-read-bold" className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        className={`w-full h-14 rounded-2xl text-base font-bold uppercase tracking-wide ${tier.highlight
                                                ? 'bg-primary hover:bg-primary-dark text-white border-none'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-none'
                                            }`}
                                    >
                                        {tier.cta}
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trust Section */}
                <section className="px-6 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Trusted by Industry Leaders</p>
                    <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <Icon icon="logos:siemens" className="h-10 w-auto" />
                        <Icon icon="logos:ge-monogram" className="h-10 w-auto" />
                        <Icon icon="logos:tesla" className="h-8 w-auto" />
                        <Icon icon="logos:bosch" className="h-10 w-auto" />
                        <Icon icon="logos:honeywell" className="h-8 w-auto" />
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </div>
    );
}
