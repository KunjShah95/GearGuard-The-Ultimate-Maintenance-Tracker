import { Request, Response, NextFunction } from 'express';
import * as teamsService from '../services/teams.service.js';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamsService.getAllTeams();
        res.json(teams);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const team = await teamsService.getTeamById(id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await teamsService.createTeam(req.body);
        res.status(201).json(team);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const team = await teamsService.updateTeam(id, req.body);
        res.json(team);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await teamsService.deleteTeam(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { userId, role } = req.body;
        const member = await teamsService.addTeamMember(id, userId, role);
        res.status(201).json(member);
    } catch (error) {
        next(error);
    }
};

export const removeMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, userId } = req.params;
        await teamsService.removeTeamMember(id, userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
