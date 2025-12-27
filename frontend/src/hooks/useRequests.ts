import { useState, useEffect, useCallback } from 'react';
import type { MaintenanceRequest } from '../types';
import * as requestsApi from '../api/requests';

export function useRequests() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await requestsApi.getAllRequests();
            setRequests(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch requests');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const addRequest = async (data: Partial<MaintenanceRequest>) => {
        try {
            const newReq = await requestsApi.createRequest(data);
            setRequests((prev) => [newReq, ...prev]);
            return newReq;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to create request');
        }
    };

    const updateRequestStatus = async (id: string, status: string) => {
        try {
            const updated = await requestsApi.updateRequestStatus(id, status);
            setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
            return updated;
        } catch (err: any) {
            throw new Error(err.message || 'Failed to update request status');
        }
    };

    const getKanbanData = async () => {
        try {
            return await requestsApi.getKanbanRequests();
        } catch (err: any) {
            throw new Error(err.message || 'Failed to fetch kanban data');
        }
    };

    const getCalendarData = async () => {
        try {
            return await requestsApi.getCalendarRequests();
        } catch (err: any) {
            throw new Error(err.message || 'Failed to fetch calendar data');
        }
    };

    return {
        requests,
        isLoading,
        error,
        refresh: fetchRequests,
        addRequest,
        updateRequestStatus,
        getKanbanData,
        getCalendarData,
    };
}
