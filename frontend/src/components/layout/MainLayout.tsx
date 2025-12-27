import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export function MainLayout() {
    const { logout } = useAuth();

    return (
        <div className="flex h-screen w-full bg-surface-dark overflow-hidden">
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-surface-dark to-surface-light/30" />

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
