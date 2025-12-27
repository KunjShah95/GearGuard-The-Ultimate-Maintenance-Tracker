import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const env = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
};

if (!env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not defined in .env file');
}

if (!env.GOOGLE_CLIENT_ID) {
    console.warn('⚠️  GOOGLE_CLIENT_ID is not defined in .env file (Google OAuth disabled)');
}
