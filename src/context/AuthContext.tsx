import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/user';

interface AuthContextType {
    currentUser: User | null;
    allUsers: User[];
    login: (user: User, users: User[]) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const login = (user: User, users: User[]) => {
        setCurrentUser(user);
        setAllUsers(users);
    };

    const logout = () => {
        setCurrentUser(null);
        setAllUsers([]);
    };

    const isAuthenticated = currentUser !== null;

    return (
        <AuthContext.Provider
            value={{ currentUser, allUsers, login, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used with a AuthContext');
    }
    return context;
}