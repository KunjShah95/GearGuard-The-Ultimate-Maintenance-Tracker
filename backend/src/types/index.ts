import { Request } from 'express';

export interface AuthUser {
    userId: string;
    email: string;
    role: 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'USER';
}

export interface AuthenticatedRequest extends Request {
    user?: AuthUser;
}

export interface DashboardStats {
    totalEquipment: number;
    operationalEquipment: number;
    underMaintenance: number;
    totalTeams: number;
    totalRequests: number;
    newRequests: number;
    inProgressRequests: number;
    completedRequests: number;
}
