import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { env } from '../config/env.js';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client();

export const register = async (email: string, password: string, name: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};

export const loginWithGoogleIdToken = async (credential?: string) => {
    if (!env.GOOGLE_CLIENT_ID) {
        throw new Error('Google OAuth is not configured');
    }

    if (!credential) {
        throw new Error('Missing Google credential');
    }

    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || payload?.given_name || 'Google User';

    if (!email) {
        throw new Error('Google account email is not available');
    }

    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        // Create a local user record; password is a random secret (not used for Google sign-in)
        const randomSecret = `${payload?.sub || 'google'}-${Date.now()}-${Math.random()}`;
        const hashedPassword = await bcrypt.hash(randomSecret, 10);

        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};
