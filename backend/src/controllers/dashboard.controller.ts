import { Request, Response, NextFunction } from 'express';
import * as dashboardService from '../services/dashboard.service.js';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        res.json(stats);
    } catch (error) {
        next(error);
    }
};

export const getRecentRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = parseInt(req.query.limit as string) || 5;
        const requests = await dashboardService.getRecentRequests(limit);
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await dashboardService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};
