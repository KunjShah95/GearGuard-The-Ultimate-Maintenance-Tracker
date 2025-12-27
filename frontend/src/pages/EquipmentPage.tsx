import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Header } from '../components/layout/Header';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal, ModalActions } from '../components/ui/Modal';
import { StatusBadge } from '../components/ui/Badge';
import { CATEGORY_OPTIONS, DEPARTMENT_OPTIONS, EQUIPMENT_STATUS_OPTIONS } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import type { Equipment, Category } from '../types';

// Mock data
const mockEquipment: Equipment[] = [
    {
        id: '1',
        name: 'CNC Milling Machine V3',
        serialNumber: 'CNC-2024-001',
        category: 'MACHINERY',
        department: 'Production',
        location: 'Building A, Floor 2',
        purchaseDate: '2023-06-15',
        warrantyExpiry: '2026-06-15',
        status: 'OPERATIONAL',
        requestCount: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Industrial Forklift #3',
        serialNumber: 'FL-2022-003',
        category: 'VEHICLE',
        department: 'Logistics',
        location: 'Warehouse B',
        purchaseDate: '2022-03-20',
        status: 'UNDER_MAINTENANCE',
        requestCount: 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Main Server Rack A1',
        serialNumber: 'SRV-2024-A1',
        category: 'IT_EQUIPMENT',
        department: 'IT',
        location: 'Server Room 1',
        purchaseDate: '2024-01-10',
        warrantyExpiry: '2027-01-10',
        status: 'OPERATIONAL',
        requestCount: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Central HVAC Unit',
        serialNumber: 'HVAC-2021-001',
        category: 'HVAC',
        department: 'Facilities',
        location: 'Rooftop South',
        purchaseDate: '2021-08-05',
        status: 'OPERATIONAL',
        requestCount: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function EquipmentPage() {
    const [equipment] = useState<Equipment[]>(mockEquipment);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filtered = equipment.filter(eq => {
        const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            eq.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || eq.category === categoryFilter;
        const matchesStatus = !statusFilter || eq.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getIcon = (cat: Category) => {
        switch (cat) {
            case 'MACHINERY': return 'solar:settings-bold-duotone';
            case 'VEHICLE': return 'solar:delivery-bold-duotone';
            case 'IT_EQUIPMENT': return 'solar:monitor-bold-duotone';
            case 'ELECTRICAL': return 'solar:bolt-bold-duotone';
            case 'HVAC': return 'solar:wind-bold-duotone';
            default: return 'solar:box-bold-duotone';
        }
    };

    return (
        <div className="pb-12">
            <Header
                title="Asset Registry"
                subtitle="Manage and track your entire equipment inventory."
            />

            <div className="px-8 mt-8 space-y-8 animate-fade-in">
                {/* Toolbar */}
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-surface-light/50 backdrop-blur-xl p-4 rounded-3xl border border-white/5 shadow-2xl">
                    <div className="flex flex-1 gap-4 w-full">
                        <div className="relative flex-1 group">
                            <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name or serial..."
                                className="w-full pl-12 pr-4 h-12 bg-zinc-900/50 border border-white/5 rounded-2xl outline-none focus:border-primary/50 text-sm font-medium transition-all placeholder:text-zinc-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select
                                options={CATEGORY_OPTIONS}
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                placeholder="All Categories"
                                className="w-48 h-12"
                            />
                            <Select
                                options={EQUIPMENT_STATUS_OPTIONS}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                placeholder="All Status"
                                className="w-48 h-12"
                            />
                        </div>
                    </div>
                    <Button className="h-12 rounded-2xl px-8 w-full lg:w-auto shadow-lg shadow-primary/20" onClick={() => setIsModalOpen(true)}>
                        <Icon icon="solar:add-circle-bold" className="w-5 h-5 mr-2" />
                        Register Asset
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filtered.map(eq => (
                        <Card key={eq.id} className="group hover:border-primary/30 relative overflow-hidden bg-surface-light/30 backdrop-blur-md border-white/5 transition-all duration-500 hover:-translate-y-1">
                            <CardContent className="p-0">
                                {/* Top Bar */}
                                <div className="p-6 pb-4 flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-zinc-900/80 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/5">
                                            <Icon icon={getIcon(eq.category)} className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors truncate">{eq.name}</h3>
                                            <p className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">{eq.serialNumber}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-zinc-500 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                                        <Icon icon="solar:menu-dots-bold" className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Stats Area */}
                                <div className="px-6 py-4 space-y-3 bg-zinc-900/20">
                                    <div className="flex items-center gap-3 text-xs font-bold text-zinc-400">
                                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Icon icon="solar:map-point-bold-duotone" className="w-3.5 h-3.5 text-primary" />
                                        </div>
                                        {eq.location}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-zinc-400">
                                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                            <Icon icon="solar:calendar-bold-duotone" className="w-3.5 h-3.5 text-blue-500" />
                                        </div>
                                        Deployed: {formatDate(eq.purchaseDate)}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-bold text-zinc-400">
                                        <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                            <Icon icon="solar:users-group-rounded-bold-duotone" className="w-3.5 h-3.5 text-indigo-500" />
                                        </div>
                                        {eq.department} Dept.
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 pt-4 flex items-center justify-between border-t border-white/5">
                                    <StatusBadge status={eq.status} />
                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter py-1.5 px-3 bg-primary/10 text-primary rounded-full border border-primary/20">
                                        <Icon icon="solar:history-bold-duotone" className="w-3.5 h-3.5" />
                                        {eq.requestCount} Logs
                                    </div>
                                </div>
                            </CardContent>
                            {/* Decorative background element */}
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/5 blur-3xl rounded-full -z-10 group-hover:bg-primary/10 transition-colors" />
                        </Card>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center bg-surface-light/20 border border-dashed border-white/10 rounded-[2rem] backdrop-blur-sm">
                        <div className="w-24 h-24 bg-zinc-900/50 rounded-3xl flex items-center justify-center mb-6 border border-white/5 shadow-2xl">
                            <Icon icon="solar:box-minimalistic-bold-duotone" className="w-12 h-12 text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No hardware found</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto">
                            Try adjusting your search query or filters to find what you're looking for.
                        </p>
                        <Button variant="outline" className="mt-8 px-8 rounded-2xl" onClick={() => { setSearchQuery(''); setCategoryFilter(''); setStatusFilter(''); }}>
                            Clear All Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Simple Modal Stub */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Hardware">
                <div className="space-y-6 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Asset Name" placeholder="e.g. Hydraulic Press" />
                        <Input label="Serial ID" placeholder="e.g. SN-90210" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Inventory Category" options={CATEGORY_OPTIONS} />
                        <Select label="Owning Department" options={DEPARTMENT_OPTIONS} />
                    </div>
                    <Input label="Deployment Site" placeholder="e.g. Block B, Section 4" />
                    <ModalActions>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Discard</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Finalize Registry</Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}
