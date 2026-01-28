"use client";
import React from 'react';
import { useUser } from '@/lib/UserContext';
import { Award, Lock, Sparkles, Zap, Crown } from 'lucide-react';

const BADGE_DEFINITIONS: Record<string, { name: string; desc: string; icon: React.ReactNode; color: string }> = {
    'seeker': {
        name: "Arayışçı",
        desc: "Yolculuğun 10. gününe ulaştın.",
        icon: <Sparkles className="w-5 h-5" />,
        color: "text-blue-300 border-blue-400/30 bg-blue-500/20"
    },
    'aura_master': {
        name: "Aura Ustası",
        desc: "İlk 7 günlük döngüyü tamamladın.",
        icon: <Zap className="w-5 h-5" />,
        color: "text-purple-300 border-purple-400/30 bg-purple-500/20"
    },
    'habit_builder': {
        name: "Alışkanlık Mimarı",
        desc: "21 gün boyunca sadık kaldın.",
        icon: <Crown className="w-5 h-5" />,
        color: "text-amber-300 border-amber-400/30 bg-amber-500/20"
    }
};

export default function BadgesDisplay() {
    const { user } = useUser();
    const userBadges = user?.badges || [];

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider">Rozet Koleksiyonu</h3>
            <div className="grid grid-cols-3 gap-3">
                {Object.entries(BADGE_DEFINITIONS).map(([id, badge]) => {
                    const isUnlocked = userBadges.includes(id);

                    return (
                        <div
                            key={id}
                            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border transition-all
                                ${isUnlocked
                                    ? `${badge.color} border-opacity-50 shadow-[0_0_15px_rgba(0,0,0,0.3)]`
                                    : 'bg-white/5 border-white/10 opacity-50 grayscale'
                                }`}
                        >
                            <div className={`p-2 rounded-full mb-1 ${isUnlocked ? 'bg-black/20' : 'bg-white/5'}`}>
                                {isUnlocked ? badge.icon : <Lock className="w-4 h-4" />}
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-center leading-tight">
                                {badge.name}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
