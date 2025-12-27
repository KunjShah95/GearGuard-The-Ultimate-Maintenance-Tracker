import client from './client';
import type { DashboardStats } from '../types';

export const getStats = async (): Promise<DashboardStats> => {
    const { data } = await client.get<DashboardStats>('/dashboard/stats');
    return data;
};

export const getRecentRequests = async (limit: number = 5) => {
    const { data } = await client.get(`/dashboard/recent-requests?limit=${limit}`);
    return data;
};

export const getUsers = async () => {
    const { data } = await client.get('/dashboard/users');
    return data;
};
