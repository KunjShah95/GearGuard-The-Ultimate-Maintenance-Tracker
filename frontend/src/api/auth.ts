import client from './client.js';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types/index.js';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await client.post<AuthResponse>('/auth/login', credentials);
    return data;
};

export const register = async (credentials: RegisterData): Promise<AuthResponse> => {
    const { data } = await client.post<AuthResponse>('/auth/register', credentials);
    return data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await client.get<User>('/auth/me');
    return data;
};
