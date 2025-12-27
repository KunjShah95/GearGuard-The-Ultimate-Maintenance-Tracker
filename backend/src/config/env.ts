import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const env = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',

};

if (!env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not defined in .env file');
}


