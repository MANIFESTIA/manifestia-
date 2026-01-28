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
    purchaseDiamonds: (amount: number, cost: number) => void;
    spendDiamonds: (amount: number, description: string) => boolean;
    updateUser: (data: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [dailyReward, setDailyReward] = useState<{ show: boolean; amount: number; streak: number; badges?: string[]; items?: string[] } | null>(null);

    useEffect(() => {
        // Load from localStorage on client mount
        const stored = localStorage.getItem('manifestia_user');
        if (stored) {
            try {
                const parsedUser = JSON.parse(stored);
                // Validate parsedUser structure if necessary
                if (parsedUser && typeof parsedUser === 'object') {
                    setUser(parsedUser);
                    checkDailyLogin(parsedUser);
                } else {
                    // Invalid data structure, reset
                    localStorage.removeItem('manifestia_user');
                }
            } catch (e) {
                console.error("Failed to parse user data", e);
                localStorage.removeItem('manifestia_user');
            }
        }
        setLoading(false);
    }, []);

    const checkDailyLogin = (currentUser: UserProfile) => {
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = currentUser.streak?.lastLoginDate;

        if (lastLogin === today) return;

        // Streak Calculation
        let newStreak = (currentUser.streak?.count || 0);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let isStreakBroken = false;

        if (lastLogin === yesterdayStr) {
            newStreak += 1;
        } else {
            // Streak is broken
            // Future: Implement Freeze Logic here or in UI. For now, reset.
            if (newStreak > 0) isStreakBroken = true;
            newStreak = 1;
        }

        // 7-Day Cycle & Milestone Logic
        const cycleDay = ((newStreak - 1) % 7) + 1; // 1 to 7
        let rewardAmount = 0;

        // Base Rewards (Hook Model)
        switch (cycleDay) {
            case 1: rewardAmount = 5; break;
            case 2: rewardAmount = 10; break;
            case 3: rewardAmount = 15; break;
            case 4: rewardAmount = 20; break;
            case 5: rewardAmount = 25; break;
            case 6: rewardAmount = 30; break;
            case 7: rewardAmount = 100; break; // Golden Day
        }

        // Milestone Bonuses
        let bonusAmount = 0;
        let newBadges: string[] = [];
        let newInventory: string[] = [];

        if (newStreak === 10) {
            bonusAmount += 150;
            if (!currentUser.badges?.includes('seeker')) newBadges.push('seeker');
        }
        if (newStreak === 21) {
            bonusAmount += 300;
            if (!currentUser.inventory?.includes('coupon_10')) newInventory.push('coupon_10');
        }
        if (cycleDay === 7) {
            if (!currentUser.badges?.includes('aura_master')) newBadges.push('aura_master');
        }

        const totalReward = rewardAmount + bonusAmount;

        // Update User
        const updatedUser: UserProfile = {
            ...currentUser,
            diamonds: (currentUser.diamonds || 0) + totalReward,
            streak: {
                count: newStreak,
                lastLoginDate: today
            },
            badges: [...(currentUser.badges || []), ...newBadges],
            inventory: [...(currentUser.inventory || []), ...newInventory]
        };

        saveUser(updatedUser);

        setDailyReward({
            show: true,
            amount: totalReward,
            streak: newStreak,
            badges: newBadges,
            items: newInventory
        });
    };

    const addXp = (amount: number) => {
        // XP System disabled temporarily
        /*
        if (!user) return;

        const currentXp = (user.xp || 0) + amount;
        let currentLevel = user.level || 1;

        // Basit Level Formülü: Level * 1000 XP
        // 1 -> 2: 1000 XP
        // 2 -> 3: 2000 XP
        const nextLevelThreshold = currentLevel * 1000;

        if (currentXp >= nextLevelThreshold) {
            currentLevel += 1;
            // Level atlama animasyonu veya bildirimi eklenebilir
        }

        saveUser({
            ...user,
            xp: currentXp,
            level: currentLevel
        });
        */
    };

    const addDiamonds = (amount: number) => {
        if (!user) return;
        saveUser({
            ...user,
            diamonds: (user.diamonds || 0) + amount
        });
    };

    const purchaseDiamonds = (amount: number, cost: number) => {
        if (!user) return;

        const newTransaction: any = {
            id: Date.now().toString(),
            amount: amount,
            type: 'purchase',
            description: `${amount} Elmas Paketi`,
            date: Date.now()
        };

        const updatedUser = {
            ...user,
            diamonds: (user.diamonds || 0) + amount,
            transactions: [newTransaction, ...(user.transactions || [])].slice(0, 50)
        };
        saveUser(updatedUser);
    };

    const spendDiamonds = (amount: number, description: string): boolean => {
        if (!user) return false;

        const currentBalance = user.diamonds || 0;
        if (currentBalance < amount) return false;

        const newTransaction: any = {
            id: Date.now().toString(),
            amount: -amount,
            type: 'spend',
            description: description,
            date: Date.now()
        };

        const updatedUser = {
            ...user,
            diamonds: currentBalance - amount,
            transactions: [newTransaction, ...(user.transactions || [])].slice(0, 50)
        };
        saveUser(updatedUser);
        return true;
    };

    const updateUser = (data: Partial<UserProfile>) => {
        if (!user) return;
        saveUser({ ...user, ...data });
    };

    const closeDailyReward = () => setDailyReward(null);

    const saveUser = (data: UserProfile) => {
        // Yeni kullanıcı varsayılanları
        const userData = {
            ...data,
            diamonds: data.diamonds ?? 100, // Başlangıç hediyesi
            xp: data.xp ?? 0,
            level: data.level ?? 1,
            streak: data.streak ?? { count: 0, lastLoginDate: '' },
            badges: data.badges ?? [],
            inventory: data.inventory ?? [],
            transactions: data.transactions ?? []
        };
        setUser(userData);
        localStorage.setItem('manifestia_user', JSON.stringify(userData));
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
