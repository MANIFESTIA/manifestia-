"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface UserContextType {
    user: UserProfile | null;
    saveUser: (data: UserProfile, token?: string) => void;
    logout: () => void;
    isOnboarded: boolean;
    // Gamification Methods
    addXp: (amount: number) => void;
    addDiamonds: (amount: number) => void;
    dailyReward: { show: boolean; amount: number; streak: number; badges?: string[]; items?: string[] } | null;
    closeDailyReward: () => void;
    // Economy Methods
    purchaseDiamonds: (amount: number, cost: number) => Promise<boolean>;
    spendDiamonds: (amount: number, description: string) => Promise<boolean>;
    purchaseProduct: (productId: string) => Promise<{ success: boolean; message?: string }>;
    updateUser: (data: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [dailyReward, setDailyReward] = useState<{ show: boolean; amount: number; streak: number; badges?: string[]; items?: string[] } | null>(null);

    const getAuthHeaders = (): HeadersInit => {
        const storedToken = localStorage.getItem('manifestia_token');
        return {
            'Content-Type': 'application/json',
            ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {}),
        };
    };

    useEffect(() => {
        const stored = localStorage.getItem('manifestia_user');
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                if (parsedUser && parsedUser.id) {
                    setUser(parsedUser);
                    syncUserWithServer();
                }
            } catch (e) {
                console.error("Failed to parse local user", e);
            }
        }
        setLoading(false);
    }, []);

    const syncUserWithServer = async () => {
        try {
            const res = await fetch('/api/user/me', {
                method: 'POST',
                headers: getAuthHeaders(),
            });
            const data = await res.json();

            if (data.success && data.user) {
                checkDailyLogin();
                setUser(data.user);
                localStorage.setItem('manifestia_user', JSON.stringify(data.user));
            }
        } catch (error) {
            console.error("Sync failed:", error);
        }
    };

    const checkDailyLogin = async () => {
        try {
            const res = await fetch('/api/gamification/daily-checkin', {
                method: 'POST',
                headers: getAuthHeaders(),
            });
            const data = await res.json();

            if (data.success) {
                // Show Reward Popup
                setDailyReward({
                    show: true,
                    amount: data.reward,
                    streak: data.streak,
                    badges: data.badges, // Backend returns full list or new? API sends newBadges in response usually? 
                    // My API implementation returns `badges: newBadges`. 
                    items: []
                });

                // Update user diamonds locally to reflect immediate change
                if (user) {
                    const updated = { ...user, diamonds: data.newBalance, streak: { count: data.streak, lastLoginDate: new Date().toISOString().split('T')[0] } };
                    setUser(updated);
                    localStorage.setItem('manifestia_user', JSON.stringify(updated));
                }
            }
        } catch (error) {
            console.error("Daily check-in failed:", error);
        }
    };

    const addXp = (amount: number) => {
        // XP impl later
    };

    const addDiamonds = (amount: number) => {
        // This is usually server side now via transactions.
        // We can optimistically update or call an endpoint?
        // For security, client shouldn't just "addDiamonds".
        // Use purchaseDiamonds or specific actions.
        console.warn("Client-side addDiamonds is deprecated. Use server actions.");
    };

    // Deprecated client-side method, kept for compatibility if needed
    const purchaseDiamonds = async (amount: number, cost: number) => {
        // Implement "Buy Diamonds" logic here if we have a real payment gateway.
        // For now, this might just be a mock or "Buy with TL".
        return true;
    };

    const spendDiamonds = async (amount: number, description: string) => {
        if (!user?.id) return false;

        try {
            const res = await fetch('/api/gamification/spend-diamonds', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ amount, description }),
            });
            const data = await res.json();

            if (data.success) {
                updateUser({ diamonds: data.newBalance });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Spend diamonds failed:', error);
            return false;
        }
    };

    const purchaseProduct = async (productId: string) => {
        if (!user) return { success: false, message: 'Giriş yapmalısınız' };

        try {
            const res = await fetch('/api/store/purchase', {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({ productId })
            });
            const data = await res.json();

            if (data.success) {
                syncUserWithServer();
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.error };
            }
        } catch (error) {
            return { success: false, message: 'Bağlantı hatası' };
        }
    };

    const updateUser = (data: Partial<UserProfile>) => {
        if (!user) return;
        const updated = { ...user, ...data };
        setUser(updated);
        localStorage.setItem('manifestia_user', JSON.stringify(updated));
    };

    const closeDailyReward = () => setDailyReward(null);

    const saveUser = (data: UserProfile, token?: string) => {
        setUser(data);
        localStorage.setItem('manifestia_user', JSON.stringify(data));
        if (token) {
            localStorage.setItem('manifestia_token', token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('manifestia_user');
        localStorage.removeItem('manifestia_token');
    };

    return (
        <UserContext.Provider value={{
            user,
            saveUser,
            logout,
            isOnboarded: !!user,
            addXp,
            addDiamonds,
            dailyReward,
            closeDailyReward,
            purchaseDiamonds,
            spendDiamonds,
            purchaseProduct,
            updateUser
        }}>
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
