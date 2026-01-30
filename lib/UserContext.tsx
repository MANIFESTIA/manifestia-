"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface UserContextType {
    user: UserProfile | null;
    saveUser: (data: UserProfile) => void;
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

    useEffect(() => {
        // Initial load from localStorage for speed
        const stored = localStorage.getItem('manifestia_user');
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                if (parsedUser && parsedUser.id) {
                    setUser(parsedUser);
                    // Immediately sync with server
                    syncUserWithServer(parsedUser.id);
                }
            } catch (e) {
                console.error("Failed to parse local user", e);
            }
        }
        setLoading(false);
    }, []);

    const syncUserWithServer = async (userId: string) => {
        try {
            const res = await fetch('/api/user/me', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();

            if (data.success && data.user) {
                // Determine if we need to show daily reward (logic moved to client check after sync or explicit call)
                // For now, let's check daily login after sync
                checkDailyLogin(data.user.id);

                // Update local state without overwriting everything blindly if needed, 
                // but sync usually means server is source of truth.
                setUser(data.user);
                localStorage.setItem('manifestia_user', JSON.stringify(data.user));
            }
        } catch (error) {
            console.error("Sync failed:", error);
        }
    };

    const checkDailyLogin = async (userId: string) => {
        try {
            const res = await fetch('/api/gamification/daily-checkin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
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
        // This is generic spend. We should use specific endpoints.
        return false;
    };

    const purchaseProduct = async (productId: string) => {
        if (!user) return { success: false, message: 'Giriş yapmalısınız' };

        try {
            const res = await fetch('/api/store/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, productId })
            });
            const data = await res.json();

            if (data.success) {
                // Update local balance
                const updated = { ...user, diamonds: data.newBalance };
                // We should also update inventory? 
                // Best to re-sync user to get fresh inventory
                syncUserWithServer(user.id);
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

    const saveUser = (data: UserProfile) => {
        setUser(data);
        localStorage.setItem('manifestia_user', JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('manifestia_user');
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
