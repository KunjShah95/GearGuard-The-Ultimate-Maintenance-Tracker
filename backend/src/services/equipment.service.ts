import prisma from '../config/database.js';

export const getAllEquipment = async () => {
    return await prisma.equipment.findMany({
        include: {
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
            maintenanceTeam: true,
            _count: {
                select: { requests: true },
            },
        },
    });
};

export const getEquipmentById = async (id: string) => {
    return await prisma.equipment.findUnique({
        where: { id },
        include: {
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
            maintenanceTeam: true,
            requests: {
                orderBy: { createdAt: 'desc' },
            },
        },
    });
};

export const createEquipment = async (data: any) => {
    return await prisma.equipment.create({
        data,
    });
};

export const updateEquipment = async (id: string, data: any) => {
    return await prisma.equipment.update({
        where: { id },
        data,
    });
};

export const deleteEquipment = async (id: string) => {
    return await prisma.equipment.delete({
        where: { id },
    });
};

export const getEquipmentRequests = async (id: string) => {
    return await prisma.maintenanceRequest.findMany({
        where: { equipmentId: id },
        orderBy: { createdAt: 'desc' },
        include: {
            createdBy: { select: { id: true, name: true } },
            assignedTo: { select: { id: true, name: true } },
        },
    });
};
