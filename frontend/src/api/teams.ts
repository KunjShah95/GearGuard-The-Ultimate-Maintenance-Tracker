import client from './client.js';
import { MaintenanceTeam } from '../types/index.js';

export const getAllTeams = async (): Promise<MaintenanceTeam[]> => {
    const { data } = await client.get<MaintenanceTeam[]>('/teams');
    return data;
};

export const getTeamById = async (id: string): Promise<MaintenanceTeam> => {
    const { data } = await client.get<MaintenanceTeam>(`/teams/${id}`);
    return data;
};

export const createTeam = async (teamData: Partial<MaintenanceTeam>): Promise<MaintenanceTeam> => {
    const { data } = await client.post<MaintenanceTeam>('/teams', teamData);
    return data;
};

export const updateTeam = async (id: string, teamData: Partial<MaintenanceTeam>): Promise<MaintenanceTeam> => {
    const { data } = await client.patch<MaintenanceTeam>(`/teams/${id}`, teamData);
    return data;
};

export const deleteTeam = async (id: string): Promise<void> => {
    await client.delete(`/teams/${id}`);
};

export const addTeamMember = async (teamId: string, userId: string, role: string): Promise<any> => {
    const { data } = await client.post(`/teams/${teamId}/members`, { userId, role });
    return data;
};

export const removeTeamMember = async (teamId: string, userId: string): Promise<void> => {
    await client.delete(`/teams/${teamId}/members/${userId}`);
};
