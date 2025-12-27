import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export function MainLayout() {
    const { logout } = useAuth();

    return (
        <div className="flex h-screen w-full bg-zinc-950 overflow-hidden">
            {/* Ambient Background Infrastructure */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]" />
                <div className="absolute inset-0 noise opacity-[0.02]" />
                
                {/* Vertical Grid Lines */}
                <div className="absolute inset-0 flex justify-around px-6 pointer-events-none opacity-[0.02]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-px h-full bg-white" />
                    ))}
                </div>
            </div>

            <Sidebar onLogout={logout} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
                <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 font-sans">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={window.location.pathname}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
