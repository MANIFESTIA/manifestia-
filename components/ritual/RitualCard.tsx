"use client";
import React from 'react';
import { RitualDefinition } from '@/lib/rituals';
import { Moon, Shield, Flower, Heart, Sun, Infinity, Briefcase } from 'lucide-react';

interface RitualCardProps {
    ritual: RitualDefinition;
    onClick: () => void;
}

// Icon Mapping
const getIcon = (id: string) => {
    switch (id) {
        case 'abundance-777': return <Infinity className="w-10 h-10 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />;
        case 'love-444': return <Heart className="w-10 h-10 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />;
        case 'moon-ritual': return <Moon className="w-10 h-10 text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]" />;
        case 'protection-shield': return <Shield className="w-10 h-10 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" />;
        case 'career-success': return <Briefcase className="w-10 h-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />;
        case 'self-love': return <Flower className="w-10 h-10 text-rose-300 drop-shadow-[0_0_8px_rgba(253,164,175,0.8)]" />;
        default: return <Sun className="w-10 h-10 text-white" />;
    }
};

const getGradient = (id: string) => {
    switch (id) {
        case 'abundance-777': return 'from-amber-500/10 to-transparent';
        case 'love-444': return 'from-pink-500/10 to-transparent';
        case 'moon-ritual': return 'from-purple-500/10 to-transparent';
        case 'protection-shield': return 'from-blue-500/10 to-transparent';
        case 'career-success': return 'from-emerald-500/10 to-transparent';
        case 'self-love': return 'from-rose-500/10 to-transparent';
        default: return 'from-white/5 to-transparent';
    }
};

export default function RitualCard({ ritual, onClick }: RitualCardProps) {
    return (
        <div
            onClick={onClick}
            className="relative min-w-[140px] w-[140px] h-[180px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-4 cursor-pointer group hover:scale-105 transition-all duration-300 hover:border-white/20 hover:bg-white/10 overflow-hidden snap-start"
        >
            {/* Arka Plan Glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${getGradient(ritual.id)} opacity-30 group-hover:opacity-60 transition-opacity`}></div>

            {/* Neon Çizgiler (Süsleme) */}
            <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent`}></div>

            {/* Icon */}
            <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                {getIcon(ritual.id)}
            </div>

            {/* Title */}
            <div className="relative z-10 text-center px-2">
                <span className="text-sm font-medium text-white/90 leading-tight group-hover:text-white transition-colors">
                    {ritual.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </span>
                <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">{ritual.intention.split(' ')[0]}</p>
            </div>

        </div>
    );
}
