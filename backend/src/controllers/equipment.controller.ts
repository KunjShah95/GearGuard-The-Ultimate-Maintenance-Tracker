import { Request, Response, NextFunction } from 'express';
import * as equipmentService from '../services/equipment.service.js';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const equipment = await equipmentService.getAllEquipment();
        res.json(equipment);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const equipment = await equipmentService.getEquipmentById(id);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }
        res.json(equipment);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const equipment = await equipmentService.createEquipment(req.body);
        res.status(201).json(equipment);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const equipment = await equipmentService.updateEquipment(id, req.body);
        res.json(equipment);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await equipmentService.deleteEquipment(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const getRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const requests = await equipmentService.getEquipmentRequests(id);
        res.json(requests);
    } catch (error) {
        next(error);
    }
};
