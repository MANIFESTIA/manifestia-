"use client";

import React, { useState, useEffect } from 'react';
import { RITUALS, Ritual } from '@/lib/rituals';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Moon, Sun, Wind, X, Sparkles, ArrowRight, Loader2, Clock } from 'lucide-react';
import RitualPlayer from './RitualPlayer';

interface RitualViewProps {
    onClose: () => void;
}

export default function RitualView({ onClose }: RitualViewProps) {
    const [viewMode, setViewMode] = useState<'library' | 'player'>('library');
    const [activeRitualId, setActiveRitualId] = useState<string | null>(null);

    // Body Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    const [error, setError] = useState<string | null>(null);

    // Logic for active ritual
    const activeRitual = activeRitualId ? RITUALS.find(r => r.id === activeRitualId) : null;

    const handleComplete = () => {
        // Wait a bit on completion screen, then return to library
        setTimeout(() => {
            setActiveRitualId(null);
            setViewMode('library');
        }, 1500);
    };

    // Filter Rituals

    // Filter Rituals
    const heroRitual = RITUALS.find(r => r.id === 'release-burning');
    const otherRituals = RITUALS.filter(r => r.id !== 'release-burning');

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0F0F12] text-white font-sans overflow-hidden">

            {/* Header - Hidden in Player Mode */}
            {viewMode === 'library' && (
                <div className="p-6 flex justify-between items-center z-10 border-b border-white/5 bg-[#0F0F12]/80 backdrop-blur-md">
                    <h2 className="text-xl font-serif tracking-wider flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-400" />
                        RİTÜEL MERKEZİ
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
                        <X className="w-6 h-6 text-white/60" />
                    </button>
                </div>
            )}

            {/* --- PLAYER MODE --- */}
            {viewMode === 'player' && activeRitual && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black"
                >
                    <RitualPlayer
                        ritual={activeRitual}
                        onComplete={handleComplete}
                        onExit={() => {
                            setActiveRitualId(null);
                            setViewMode('library');
                        }}
                    />
                </motion.div>
            )}

            {/* --- LIBRARY VIEW --- */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 ${viewMode === 'player' ? 'hidden' : ''}`}>

                {/* 1. HERO SECTION (Paper Burning) */}
                {heroRitual && (
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                            setActiveRitualId(heroRitual.id);
                            setViewMode('player');
                        }}
                        className="relative w-full aspect-[4/3] md:aspect-[2/1] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-white/10"
                    >
                        {/* Dynamic Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${heroRitual.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />

                        {/* Animated Particles/Effects Overlay */}
                        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
                                    <Flame className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-orange-200 bg-orange-500/20 px-2 py-1 rounded">Popüler</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 shadow-black drop-shadow-lg">
                                {heroRitual.title}
                            </h2>
                            <p className="text-white/80 text-sm md:text-base max-w-lg mb-4 line-clamp-2">
                                {heroRitual.description}
                            </p>

                            <div className="flex items-center gap-4">
                                <button className="bg-white text-black px-6 py-2 rounded-full font-medium text-sm hover:bg-orange-50 transition flex items-center gap-2">
                                    <Flame className="w-4 h-4" />
                                    Ritüele Başla
                                </button>
                                <span className="text-xs text-white/60 font-medium flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {heroRitual.duration}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. HORIZONTAL SCROLL (AI Tool + Other Rituals) */}
                <div>
                    <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Diğer Ritüeller
                    </h3>

                    <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 snap-x custom-scrollbar">

                        {/* Other Ritual Cards */}
                        {otherRituals.map(ritual => (
                            <motion.div
                                key={ritual.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setActiveRitualId(ritual.id);
                                    setViewMode('player');
                                }}
                                className={`
                                    min-w-[260px] w-[260px] relative overflow-hidden rounded-2xl p-5 cursor-pointer border border-white/5
                                    group hover:border-white/10 transition-all duration-300 shrink-0 snap-start bg-[#121214] flex flex-col justify-between
                                `}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${ritual.color} opacity-5 group-hover:opacity-15 transition-opacity`} />

                                <div>
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center mb-3
                                        bg-gradient-to-br ${ritual.color} bg-opacity-20
                                    `}>
                                        {getIcon(ritual.iconName)}
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-1">{ritual.title}</h3>
                                    <p className="text-xs text-white/50 line-clamp-2 mb-3">{ritual.description}</p>
                                </div>

                                <div className="flex items-center gap-3 text-[10px] font-medium text-white/30 mt-auto">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {ritual.duration}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon Helper
const getIcon = (name: string) => {
    switch (name) {
        case 'Flame': return <Flame className="w-5 h-5 text-white" />;
        case 'Moon': return <Moon className="w-5 h-5 text-white" />;
        case 'Sun': return <Sun className="w-5 h-5 text-white" />;
        case 'Wind': return <Wind className="w-5 h-5 text-white" />;
        default: return <Wind className="w-5 h-5 text-white" />;
    }
};
