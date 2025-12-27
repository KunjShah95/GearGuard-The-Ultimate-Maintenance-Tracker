import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, name } = req.body;
        const user = await authService.register(email, password, name);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const google = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { credential } = req.body as { credential?: string };
        const result = await authService.loginWithGoogleIdToken(credential);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const user = req.user;
        res.json(user);
    } catch (error) {
        next(error);
    }
};
