import { useState, useEffect, useCallback } from 'react';
import type { Equipment } from '../types';
import * as equipmentApi from '../api/equipment';

export function useEquipment() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEquipment = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await equipmentApi.getAllEquipment();
            setEquipment(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch equipment');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEquipment();
    }, [fetchEquipment]);

    const addEquipment = async (data: Partial<Equipment>) => {
        try {
            const newEquip = await equipmentApi.createEquipment(data);
            setEquipment((prev) => [...prev, newEquip]);
            return newEquip;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to add equipment');
        }
    };

    const updateEquipment = async (id: string, data: Partial<Equipment>) => {
        try {
            const updated = await equipmentApi.updateEquipment(id, data);
            setEquipment((prev) => prev.map((e) => (e.id === id ? updated : e)));
            return updated;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to update equipment');
        }
    };

    const deleteEquipment = async (id: string) => {
        try {
            await equipmentApi.deleteEquipment(id);
            setEquipment((prev) => prev.filter((e) => e.id !== id));
        } catch (err: any) {
            throw new Error(err.message || 'Failed to delete equipment');
        }
    };

    return {
        equipment,
        isLoading,
        error,
        refresh: fetchEquipment,
        addEquipment,
        updateEquipment,
        deleteEquipment,
    };
}
