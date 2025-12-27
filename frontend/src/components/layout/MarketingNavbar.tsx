import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function MarketingNavbar() {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md rounded-full px-8 h-14 border border-slate-200 shadow-sm">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <Icon icon="solar:shield-bold-duotone" className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-display font-bold tracking-tight text-slate-900">
                        GearGuard
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-bold text-slate-500">
                    <Link to="/capabilities" className="hover:text-slate-900 transition-colors">Capabilities</Link>
                    <Link to="/ecosystem" className="hover:text-slate-900 transition-colors">Ecosystem</Link>
                    <Link to="/enterprise" className="hover:text-slate-900 transition-colors">Enterprise</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Sign In</Link>
                    <Link to="/register">
                        <Button className="rounded-full px-5 h-9 text-[11px] font-bold uppercase tracking-widest bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
