"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, ChevronLeft } from 'lucide-react';
import RitualPlayer from './RitualPlayer';
import RitualBurning from './RitualBurning';
import RitualLibrary from './RitualLibrary';
import { RITUALS } from '@/lib/rituals';
import { useUser } from '@/lib/UserContext';
import CosmicBackground from '../layout/CosmicBackground';

export default function RitualView({ onClose }: { onClose: () => void }) {
    const { addXp } = useUser();
    const [activeRitualId, setActiveRitualId] = useState<string | null>(null);

    const activeRitual = activeRitualId ? RITUALS.find(r => r.id === activeRitualId) : null;

    const handleComplete = () => {
        // XP system temporarily disabled
        // if (activeRitual) {
        //     addXp(activeRitual.xpReward);
        // }
        setTimeout(() => {
            setActiveRitualId(null);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#0F0F12] text-white flex flex-col font-sans overflow-hidden">
            <CosmicBackground />

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-4">
                    {activeRitualId ? (
                        <button
                            onClick={() => setActiveRitualId(null)}
                            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition text-white/80 hover:text-white"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                                <Flame className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-red-200">
                                Ritüel Merkezi
                            </h2>
                        </div>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="pointer-events-auto p-2 bg-white/5 hover:bg-white/10 rounded-full transition border border-white/5 backdrop-blur-sm group"
                >
                    <X className="w-6 h-6 text-white/60 group-hover:text-white" />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-y-auto custom-scrollbar z-40">
                <AnimatePresence mode="wait">
                    {!activeRitualId ? (
                        <motion.div
                            key="library"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-6 pt-24 max-w-5xl mx-auto h-full"
                        >
                            <div className="mb-8">
                                <h1 className="text-3xl font-serif font-light text-white mb-2">Ruhsal Dönüşüm</h1>
                                <p className="text-white/60">Enerjini yükseltmek ve niyetlerini güçlendirmek için bir ritüel seç.</p>
                            </div>
                            <RitualLibrary onSelectRitual={setActiveRitualId} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="player"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="h-full w-full"
                        >
                            {/* Render Specific Ritual Component based on Type */}
                            {activeRitual?.type === 'burning' ? (
                                <RitualBurning onClose={handleComplete} />
                            ) : (
                                <RitualPlayer
                                    ritual={activeRitual!}
                                    onComplete={handleComplete}
                                    onExit={() => setActiveRitualId(null)}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
