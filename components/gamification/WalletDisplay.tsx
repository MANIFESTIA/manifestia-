"use client";
import React from 'react';
import { useUser } from '@/lib/UserContext';
import { Diamond, Sparkles, User } from 'lucide-react';

export default function WalletDisplay({ onClick }: { onClick?: () => void }) {
    const { user } = useUser();

    if (!user) return null;

    const level = user.level || 1;
    // XP progress (assuming 1000 XP per level as defined in logic)
    const currentLevelBaseXp = (level - 1) * 1000;
    const nextLevelXp = level * 1000;
    const currentXp = user.xp || 0;
    const progressPercent = Math.min(100, Math.max(0, ((currentXp - currentLevelBaseXp) / 1000) * 100));

    return (
        <div className="flex items-center gap-3">


            {/* Diamond Wallet */}
            <div
                onClick={onClick}
                className="flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-full px-3 py-1.5 backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)] group hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
                <Diamond className="w-4 h-4 text-cyan-300 fill-cyan-300/20 filter drop-shadow-[0_0_8px_rgba(103,232,249,0.5)] group-hover:scale-110 transition-transform" />
                <span className="font-mono font-bold text-cyan-100 text-sm tracking-wide">
                    {user.diamonds || 0}
                </span>
            </div>
        </div>
    );
}
