import prisma from '../config/database.js';
import type { DashboardStats } from '../types/index.js';

export const getDashboardStats = async (): Promise<DashboardStats> => {
    const [
        totalEquipment,
        operationalEquipment,
        underMaintenance,
        totalTeams,
        totalRequests,
        newRequests,
        inProgressRequests,
        completedRequests,
    ] = await Promise.all([
        prisma.equipment.count(),
        prisma.equipment.count({ where: { status: 'OPERATIONAL' } }),
        prisma.equipment.count({ where: { status: 'UNDER_MAINTENANCE' } }),
        prisma.maintenanceTeam.count(),
        prisma.maintenanceRequest.count(),
        prisma.maintenanceRequest.count({ where: { status: 'NEW' } }),
        prisma.maintenanceRequest.count({ where: { status: 'IN_PROGRESS' } }),
        prisma.maintenanceRequest.count({ where: { status: 'REPAIRED' } }),
    ]);

    return {
        totalEquipment,
        operationalEquipment,
        underMaintenance,
        totalTeams,
        totalRequests,
        newRequests,
        inProgressRequests,
        completedRequests,
    };
};

export const getRecentRequests = async (limit: number = 5) => {
    return await prisma.maintenanceRequest.findMany({
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
            equipment: { select: { name: true } },
            assignedTo: { select: { name: true } },
        },
    });
};

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            department: true,
        },
    });
};
