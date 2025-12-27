import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginCredentials, RegisterData } from '../types';
import * as authApi from '../api/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;

    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('gearguard_token');
            if (token) {
                try {
                    const currentUser = await authApi.getMe();
                    setUser(currentUser);
                    localStorage.setItem('gearguard_user', JSON.stringify(currentUser));
                } catch (error) {
                    console.error('Failed to fetch current user:', error);
                    logout();
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const response = await authApi.login(credentials);
            localStorage.setItem('gearguard_token', response.token);
            localStorage.setItem('gearguard_user', JSON.stringify(response.user));
            setUser(response.user);
        } finally {
            setIsLoading(false);
        }
    };



    const register = async (data: RegisterData) => {
        setIsLoading(true);
        try {
            const response = await authApi.register(data);
            localStorage.setItem('gearguard_token', response.token);
            localStorage.setItem('gearguard_user', JSON.stringify(response.user));
            setUser(response.user);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('gearguard_token');
        localStorage.removeItem('gearguard_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,

                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
