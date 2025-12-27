import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: error.errors.map((e) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                });
            }
            next(error);
        }
    };
};

// Auth Schemas
export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(1, 'Name is required'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// Equipment Schemas
export const createEquipmentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    serialNumber: z.string().min(1, 'Serial number is required'),
    category: z.enum(['MACHINERY', 'VEHICLE', 'IT_EQUIPMENT', 'ELECTRICAL', 'HVAC', 'PLUMBING', 'OTHER']),
    department: z.string().min(1, 'Department is required'),
    location: z.string().min(1, 'Location is required'),
    purchaseDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    warrantyExpiry: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
    assignedToId: z.string().optional(),
    maintenanceTeamId: z.string().optional(),
});

// Team Schemas
export const createTeamSchema = z.object({
    name: z.string().min(1, 'Team name is required'),
    specialization: z.string().min(1, 'Specialization is required'),
    description: z.string().optional(),
});

export const addMemberSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    role: z.enum(['LEAD', 'MEMBER']).optional(),
});

// Request Schemas
export const createRequestSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    description: z.string().min(1, 'Description is required'),
    type: z.enum(['CORRECTIVE', 'PREVENTIVE']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
    equipmentId: z.string().min(1, 'Equipment ID is required'),
    teamId: z.string().optional(),
    assignedToId: z.string().optional(),
    scheduledDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
});

export const updateStatusSchema = z.object({
    status: z.enum(['NEW', 'IN_PROGRESS', 'REPAIRED', 'SCRAP']),
});
