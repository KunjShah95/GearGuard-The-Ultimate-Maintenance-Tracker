import { Request, Response, NextFunction } from 'express';
import * as requestsService from '../services/requests.service.js';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await requestsService.getAllRequests();
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const request = await requestsService.getRequestById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const createdById = req.user.userId;
        const request = await requestsService.createRequest({
            ...req.body,
            createdById,
        });
        res.status(201).json(request);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const request = await requestsService.updateRequest(id, req.body);
        res.json(request);
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const request = await requestsService.updateRequestStatus(id, status);
        res.json(request);
    } catch (error) {
        next(error);
    }
};

export const getCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await requestsService.getCalendarRequests();
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const getKanban = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await requestsService.getKanbanRequests();
        res.json(requests);
    } catch (error) {
        next(error);
    }
};
