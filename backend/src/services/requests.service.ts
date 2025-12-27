import prisma from '../config/database.js';

export const getAllRequests = async () => {
    return await prisma.maintenanceRequest.findMany({
        include: {
            equipment: true,
            team: true,
            createdBy: {
                select: { id: true, name: true, email: true },
            },
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const getRequestById = async (id: string) => {
    return await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: {
            equipment: true,
            team: true,
            createdBy: {
                select: { id: true, name: true, email: true },
            },
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
        },
    });
};

export const createRequest = async (data: any) => {
    return await prisma.maintenanceRequest.create({
        data,
    });
};

export const updateRequest = async (id: string, data: any) => {
    return await prisma.maintenanceRequest.update({
        where: { id },
        data,
    });
};

export const updateRequestStatus = async (id: string, status: any) => {
    return await prisma.maintenanceRequest.update({
        where: { id },
        data: { status },
    });
};

export const getCalendarRequests = async () => {
    return await prisma.maintenanceRequest.findMany({
        where: {
            scheduledDate: { not: null },
        },
        select: {
            id: true,
            subject: true,
            scheduledDate: true,
            type: true,
            priority: true,
            status: true,
        },
    });
};

export const getKanbanRequests = async () => {
    return await prisma.maintenanceRequest.findMany({
        select: {
            id: true,
            subject: true,
            priority: true,
            status: true,
            equipmentId: true,
            assignedToId: true,
            equipment: {
                select: { name: true },
            },
        },
    });
};
