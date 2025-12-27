import { useState, useEffect, useCallback } from 'react';
import type { MaintenanceTeam } from '../types';
import * as teamsApi from '../api/teams';

export function useTeams() {
    const [teams, setTeams] = useState<MaintenanceTeam[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTeams = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await teamsApi.getAllTeams();
            setTeams(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch teams');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    const addTeam = async (data: Partial<MaintenanceTeam>) => {
        try {
            const newTeam = await teamsApi.createTeam(data);
            setTeams((prev) => [...prev, newTeam]);
            return newTeam;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to add team');
        }
    };

    const updateTeam = async (id: string, data: Partial<MaintenanceTeam>) => {
        try {
            const updated = await teamsApi.updateTeam(id, data);
            setTeams((prev) => prev.map((t) => (t.id === id ? updated : t)));
            return updated;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to update team');
        }
    };

    const deleteTeam = async (id: string) => {
        try {
            await teamsApi.deleteTeam(id);
            setTeams((prev) => prev.filter((t) => t.id !== id));
        } catch (err: any) {
            throw new Error(err.message || 'Failed to delete team');
        }
    };

    return {
        teams,
        isLoading,
        error,
        refresh: fetchTeams,
        addTeam,
        updateTeam,
        deleteTeam,
    };
}
