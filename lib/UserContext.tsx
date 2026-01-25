"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface UserContextType {
    user: UserProfile | null;
    saveUser: (data: UserProfile) => void;
    isOnboarded: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load from localStorage on client mount
        const stored = localStorage.getItem('manifestia_user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
        setLoading(false);
    }, []);

    const saveUser = (data: UserProfile) => {
        setUser(data);
        localStorage.setItem('manifestia_user', JSON.stringify(data));
    };

    return (
        <UserContext.Provider value={{ user, saveUser, isOnboarded: !!user }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
