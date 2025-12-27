import client from './client.js';
import { Equipment } from '../types/index.js';

export const getAllEquipment = async (): Promise<Equipment[]> => {
    const { data } = await client.get<Equipment[]>('/equipment');
    return data;
};

export const getEquipmentById = async (id: string): Promise<Equipment> => {
    const { data } = await client.get<Equipment>(`/equipment/${id}`);
    return data;
};

export const createEquipment = async (equipmentData: Partial<Equipment>): Promise<Equipment> => {
    const { data } = await client.post<Equipment>('/equipment', equipmentData);
    return data;
};

export const updateEquipment = async (id: string, equipmentData: Partial<Equipment>): Promise<Equipment> => {
    const { data } = await client.patch<Equipment>(`/equipment/${id}`, equipmentData);
    return data;
};

export const deleteEquipment = async (id: string): Promise<void> => {
    await client.delete(`/equipment/${id}`);
};
