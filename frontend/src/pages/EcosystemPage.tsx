import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';

const integrations = [
    { name: 'SAP S/4HANA', icon: 'logos:sap' },
    { name: 'Oracle Cloud', icon: 'logos:oracle' },
    { name: 'Salesforce', icon: 'logos:salesforce' },
    { name: 'Microsoft Teams', icon: 'logos:microsoft-teams' },
    { name: 'Slack', icon: 'logos:slack-icon' },
    { name: 'ServiceNow', icon: 'logos:servicenow' },
    { name: 'AWS IoT', icon: 'logos:aws' },
    { name: 'Azure', icon: 'logos:azure-icon' },
];

const ecosystemNodes = [
    {
        name: 'Field Operations',
        icon: 'solar:users-group-rounded-bold-duotone',
        desc: ' empowering technicians with real-time mobile tools.'
    },
    {
        name: 'Industrial IoT',
        icon: 'solar:scanner-bold-duotone',
        desc: 'Direct PLC & SCADA data ingestion via MQTT/OPC-UA.'
    },
    {
        name: 'Supply Chain',
        icon: 'solar:delivery-bold-duotone',
        desc: 'Auto-procurement of spares from vendor APIs.'
    },
    {
        name: 'Executive & Admin',
        icon: 'solar:chart-2-bold-duotone',
        desc: 'Top-floor visibility of shop-floor realities.'
    }
];

export function EcosystemPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-600 selection:bg-primary/30 font-sans">
            <MarketingNavbar />

            <main className="pt-32 pb-32">
                {/* Hero */}
                <section className="px-6 mb-32 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="section-number mb-6 block text-primary font-mono tracking-widest"
                        >
                            // CONNECTED_FACTORY
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-display font-bold text-slate-900 tracking-tight leading-none mb-8"
                        >
                            The Industrial <br />
                            <span className="text-primary">Neural Network.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed"
                        >
                            GearGuard isn't just software; it's the central nervous system connecting your machines, people, and processes into a single living organism.
                        </motion.p>
                    </div>
                </section>

                {/* Core Nodes */}
                <section className="px-6 mb-32">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {ecosystemNodes.map((node, i) => (
                                <motion.div
                                    key={node.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-8 bg-white border border-slate-200 rounded-3xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                        <Icon icon={node.icon} className="w-8 h-8 text-slate-900 group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{node.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{node.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Integrations Grid */}
                <section className="px-6 py-32 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Plays Well With Others</h2>
                            <p className="text-slate-400 text-lg">Seamless native integrations with the tools you already use.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {integrations.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <Icon icon={item.icon} className="w-12 h-12 grayscale hover:grayscale-0 transition-all duration-300" />
                                    <span className="text-sm font-bold text-slate-400">{item.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Developer Experience / API */}
                <section className="px-6 py-32">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6">
                                API First <br /> Architecture.
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                                Built for developers, by developers. Our REST and GraphQL APIs give you full programmatic access to every entity in the system.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <Icon icon="solar:check-circle-bold" className="text-primary w-6 h-6" />
                                    <span className="font-bold text-slate-700">Comprehensive Webhooks</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon icon="solar:check-circle-bold" className="text-primary w-6 h-6" />
                                    <span className="font-bold text-slate-700">Detailed Swagger / OpenAPI Docs</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon icon="solar:check-circle-bold" className="text-primary w-6 h-6" />
                                    <span className="font-bold text-slate-700">SDKs for Python, Node, and Go</span>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <motion.div
                                initial={{ opacity: 0, rotateX: 20 }}
                                whileInView={{ opacity: 1, rotateX: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-slate-800"
                            >
                                <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 text-xs text-slate-400 font-mono">api-request.ts</span>
                                </div>
                                <div className="p-6 overflow-x-auto">
                                    <pre className="text-sm font-mono leading-relaxed">
                                        <code className="text-blue-400">const</code> <code className="text-yellow-300">incident</code> <code className="text-white">=</code> <code className="text-blue-400">await</code> <code className="text-purple-400">gearguard</code><code className="text-white">.</code><code className="text-blue-300">incidents</code><code className="text-white">.</code><code className="text-yellow-300">create</code><code className="text-white">({'{'}</code>{'\n'}
                                        <code className="text-white">  equipment_id: </code><code className="text-green-400">'eq_8j29d'</code><code className="text-white">,</code>{'\n'}
                                        <code className="text-white">  priority: </code><code className="text-green-400">'CRITICAL'</code><code className="text-white">,</code>{'\n'}
                                        <code className="text-white">  description: </code><code className="text-green-400">'Hydraulic failure on Press #4'</code>{'\n'}
                                        <code className="text-white">{'}'});</code>{'\n\n'}
                                        <code className="text-gray-500">// Returns: Incident Created (ID: inc_992)</code>
                                    </pre>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <MarketingFooter />
        </div>
    );
}
