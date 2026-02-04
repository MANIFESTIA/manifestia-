"use client";

import React, { useState, useEffect } from 'react';
import { RITUALS, Ritual, getIcon, getDailyRitual } from '@/lib/rituals';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X, Clock, Lock, CheckCircle, Diamond } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import DiamondConfirmModal from '@/components/economy/DiamondConfirmModal';
import RitualPlayer from './RitualPlayer';

interface RitualViewProps {
    onClose: () => void;
}

export default function RitualView({ onClose }: RitualViewProps) {
    const { user, spendDiamonds } = useUser();
    const [viewMode, setViewMode] = useState<'library' | 'player'>('library');
    const [activeRitualId, setActiveRitualId] = useState<string | null>(null);
    const [activeRitualData, setActiveRitualData] = useState<Ritual | null>(null);

    // State for daily tracking
    const [completedRituals, setCompletedRituals] = useState<string[]>([]);

    // Payment Modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingRitualId, setPendingRitualId] = useState<string | null>(null);

    // Load completed rituals from local storage
    useEffect(() => {
        if (!user?.id) return;
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const key = `manifestia_rituals_${user.id}_${today}`;

        try {
            const saved = localStorage.getItem(key);
            if (saved) {
                setCompletedRituals(JSON.parse(saved));
            }
        } catch (e) {
            console.error("Failed to load ritual history", e);
        }
    }, [user?.id]);

    const handleRitualClick = (ritual: Ritual) => {
        const isCompleted = completedRituals.includes(ritual.id);
        const dailyCount = completedRituals.length;

        // If already completed logic (allow re-doing for free)
        if (isCompleted) {
            setActiveRitualId(ritual.id);
            setActiveRitualData(ritual);
            setViewMode('player');
            return;
        }

        // Pricing Logic: 1st is free (cnt=0). 2nd+ is 5 diamonds.
        if (dailyCount >= 1) {
            setPendingRitualId(ritual.id);
            setShowConfirmModal(true);
        } else {
            // Free
            startRitual(ritual);
        }
    };

    const confirmPurchase = async () => {
        if (!pendingRitualId) return;

        const success = await spendDiamonds(5, "Ritüel Açılışı");
        if (success) {
            const ritual = RITUALS.find(r => r.id === pendingRitualId);
            if (ritual) {
                startRitual(ritual);
            }
            setShowConfirmModal(false);
        }
    };

    const startRitual = (ritual: Ritual) => {
        setActiveRitualId(ritual.id);
        setActiveRitualData(ritual);
        setViewMode('player');
    };

    const handleComplete = () => {
        if (!activeRitualId || !user?.id) return;

        const today = new Date().toISOString().split('T')[0];
        const key = `manifestia_rituals_${user.id}_${today}`;

        const newCompleted = [...completedRituals, activeRitualId];
        // Dedupe
        const uniqueCompleted = Array.from(new Set(newCompleted));

        setCompletedRituals(uniqueCompleted);
        localStorage.setItem(key, JSON.stringify(uniqueCompleted));

        setTimeout(() => {
            setActiveRitualId(null);
            setActiveRitualData(null);
            setViewMode('library');
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0e] text-white font-sans overflow-hidden overscroll-none touch-none">

            {/* Header */}
            {viewMode === 'library' && (
                <div className="p-6 flex justify-between items-center z-10 bg-[#0b0b0e]/95 backdrop-blur-xl border-b border-white/5 sticky top-0">
                    <div>
                        <h2 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-purple-200 to-amber-100 animate-pulse-slow">
                            Kutsal Alan
                        </h2>
                        <p className="text-xs text-white/50">Günlük Ruhsal Pratiklerin</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition group">
                        <X className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                    </button>
                </div>
            )}

            {/* --- PLAYER MODE --- */}
            <AnimatePresence>
                {viewMode === 'player' && activeRitualData && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="absolute inset-0 z-50 bg-black"
                    >
                        <RitualPlayer
                            ritual={{
                                ...activeRitualData,
                                // Inject daily variation data here
                                steps: activeRitualData ? (getDailyRitual(activeRitualData).steps || []) : []
                            }}
                            onComplete={handleComplete}
                            onExit={() => {
                                setActiveRitualId(null);
                                setActiveRitualData(null);
                                setViewMode('library');
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- LIBRARY GRID --- */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 ${viewMode === 'player' ? 'hidden' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {RITUALS.map(ritual => {
                        const dailyContent = getDailyRitual(ritual);
                        const isCompleted = completedRituals.includes(ritual.id);
                        const isLocked = !isCompleted && completedRituals.length >= 1; // Locked behind paywall logic visually

                        return (
                            <motion.div
                                key={ritual.id}
                                layoutId={ritual.id}
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleRitualClick(ritual)}
                                className={`
                                    relative group rounded-3xl overflow-hidden cursor-pointer
                                    bg-[#15151a] border border-white/5 shadow-2xl
                                    h-64 flex flex-col justify-between p-6
                                `}
                            >
                                {/* Animated Border / Premium Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${ritual.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                                {/* "Done" State Change - Visual Transform */}
                                {isCompleted && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col gap-2">
                                        <CheckCircle className="w-12 h-12 text-green-400" />
                                        <span className="text-green-200 font-serif text-lg">Tamamlandı</span>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="relative z-10 flex justify-between items-start">
                                    <div className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center
                                        bg-gradient-to-br ${ritual.color} shadow-[0_0_20px_rgba(0,0,0,0.5)]
                                    `}>
                                        {React.createElement(getIcon(ritual.iconName), { className: "w-6 h-6 text-white" })}
                                    </div>

                                    {/* Cost Badge */}
                                    {isLocked && !isCompleted && (
                                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/30 text-purple-300 text-xs font-bold">
                                            <Diamond className="w-3 h-3 fill-current" />
                                            5
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <h3 className="text-xl font-serif font-bold text-white mb-1 leading-tight group-hover:text-purple-200 transition-colors">
                                        {dailyContent.title}
                                    </h3>
                                    <p className="text-sm text-white/50 line-clamp-2">
                                        {dailyContent.description}
                                    </p>

                                    <div className="flex items-center gap-4 mt-4 text-xs font-medium text-white/30 uppercase tracking-widest">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {ritual.duration}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Confirm Purchase Modal */}
            {showConfirmModal && (
                <DiamondConfirmModal
                    isOpen={true}
                    cost={5}
                    title="Bu Ritüeli Aç"
                    description="Günde 1 ücretsiz ritüelden sonraki her ritüel için 5 Elmas gereklidir."
                    onConfirm={confirmPurchase}
                    onClose={() => setShowConfirmModal(false)}
                />
            )}
        </div>
    );
}
