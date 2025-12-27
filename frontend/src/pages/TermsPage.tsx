import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-600 p-8 md:p-24 selection:bg-primary/30">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-12 transition-colors">
                <Icon icon="solar:alt-arrow-left-linear" />
                <span className="text-[10px] font-black uppercase tracking-widest">Back to Base</span>
            </Link>

            <div className="max-w-3xl">
                <h1 className="text-5xl font-display font-bold text-slate-900 mb-8">Service Directives</h1>
                <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest leading-relaxed">// MISSION_TERMS_V1</p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Operational License</h2>
                        <p className="text-slate-600 leading-relaxed font-light">
                            By deploying the GearGuard infrastructure, you agree to utilize the platform solely for its intended purpose of industrial asset management and maintenance orchestration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Availability & Escalation</h2>
                        <p className="text-slate-600 leading-relaxed font-light">
                            Enterprise deployments are subject to a 99.999% uptime SLA. Standard tactical deployments receive best-effort availability and community-driven support escalation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">Liability Constraints</h2>
                        <p className="text-slate-600 leading-relaxed font-light">
                            While GearGuard provides high-fidelity predictive intelligence, maintenance decisions remain the final responsibility of the on-site certified engineer. GearGuard is not liable for hardware failures resulting from lack of manual secondary verification.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
