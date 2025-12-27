import prisma from '../config/database.js';

export const getAllTeams = async () => {
    return await prisma.maintenanceTeam.findMany({
        include: {
            members: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true, role: true },
                    },
                },
            },
            _count: {
                select: { equipment: true, requests: true },
            },
        },
    });
};

export const getTeamById = async (id: string) => {
    return await prisma.maintenanceTeam.findUnique({
        where: { id },
        include: {
            members: {
                include: {
                    user: {
                        select: { id: true, name: true, email: true, role: true },
                    },
                },
            },
            equipment: true,
            requests: {
                orderBy: { createdAt: 'desc' },
            },
        },
    });
};

export const createTeam = async (data: any) => {
    return await prisma.maintenanceTeam.create({
        data,
    });
};

export const updateTeam = async (id: string, data: any) => {
    return await prisma.maintenanceTeam.update({
        where: { id },
        data,
    });
};

export const deleteTeam = async (id: string) => {
    return await prisma.maintenanceTeam.delete({
        where: { id },
    });
};

export const addTeamMember = async (teamId: string, userId: string, role: 'LEAD' | 'MEMBER' = 'MEMBER') => {
    return await prisma.teamMember.create({
        data: {
            teamId,
            userId,
            role,
        },
    });
};

export const removeTeamMember = async (teamId: string, userId: string) => {
    return await prisma.teamMember.delete({
        where: {
            userId_teamId: {
                userId,
                teamId,
            },
        },
    });
};
