"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import { Sparkles, Diamond, X, Check, Lock } from 'lucide-react';

export default function DailyRewardPopup() {
    const { dailyReward, closeDailyReward } = useUser();

    if (!dailyReward || !dailyReward.show) return null;

    // Calculate current cycle day (1-7)
    // Streak 1 -> Day 1
    // Streak 7 -> Day 7
    // Streak 8 -> Day 1
    const currentStreak = dailyReward.streak;
    const cycleDay = ((currentStreak - 1) % 7) + 1;

    // Reward Tier Mockup for Visualization
    const REWARDS = [
        { day: 1, amount: 5 },
        { day: 2, amount: 10 },
        { day: 3, amount: 15 },
        { day: 4, amount: 20 },
        { day: 5, amount: 25 },
        { day: 6, amount: 30 },
        { day: 7, amount: 100, big: true },
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={closeDailyReward}
                />

                {/* Popup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative w-full max-w-md bg-[#090514] border border-manifest-primary/30 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden"
                >
                    {/* Confetti / Burst Effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-manifest-primary/20 rounded-full blur-[80px] animate-pulse-slow"></div>
                    </div>

                    <div className="relative z-10">
                        {/* Header */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-cyan-200">
                                Günlük Kozmik Hediye
                            </h2>
                            <p className="text-manifest-muted text-sm mt-1">Evren sadakatini ödüllendiriyor.</p>
                        </motion.div>

                        {/* Main Reward Display */}
                        <div className="mb-8">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", damping: 12 }}
                                className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full border border-cyan-400/30 flex items-center justify-center relative"
                            >
                                <Diamond className="w-12 h-12 text-cyan-300 drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]" />
                                <motion.div
                                    className="absolute -top-2 -right-8 bg-gradient-to-r from-manifest-primary to-manifest-secondary text-white text-lg font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] rotate-12"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    +{dailyReward.amount} Elmas
                                </motion.div>
                            </motion.div>
                            <div className="mt-4 text-white/80 font-medium">
                                {currentStreak} Günlük Seri!
                            </div>
                        </div>

                        {/* 7-Day Progress Bar */}
                        <div className="bg-white/5 rounded-2xl p-4 mb-8 overflow-x-auto">
                            <div className="flex justify-between items-center min-w-[280px] gap-2">
                                {REWARDS.map((tier) => {
                                    const isCompleted = tier.day < cycleDay;
                                    const isCurrent = tier.day === cycleDay;
                                    const isLocked = tier.day > cycleDay;

                                    return (
                                        <div key={tier.day} className="flex flex-col items-center gap-2">
                                            <div className="text-[10px] text-white/40 uppercase font-bold">Gün {tier.day}</div>
                                            <div
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative
                                                    ${isCompleted ? 'bg-green-500/20 border-green-500/50 text-green-400' : ''}
                                                    ${isCurrent ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-110' : ''}
                                                    ${isLocked ? 'bg-white/5 border-white/10 text-white/20' : ''}
                                                `}
                                            >
                                                {isCompleted && <Check className="w-5 h-5" />}
                                                {isLocked && <Lock className="w-4 h-4 opacity-50" />}
                                                {isCurrent && <Diamond className="w-5 h-5 animate-pulse" />}

                                                {/* Amount Tag */}
                                                {!isCompleted && !isLocked && (
                                                    <div className="absolute -bottom-2 text-[9px] font-bold bg-black/80 px-1 rounded border border-white/10">
                                                        {tier.amount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Badges Earned Section */}
                        {dailyReward.badges && dailyReward.badges.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4"
                            >
                                <div className="p-2 bg-amber-500/20 rounded-full">
                                    <Sparkles className="w-6 h-6 text-amber-300" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-amber-200 font-bold text-sm">Yeni Rozet Kazanıldı!</h4>
                                    <p className="text-amber-200/60 text-xs">Profilinde görüntüleyebilirsin.</p>
                                </div>
                            </motion.div>
                        )}

                        <button
                            onClick={closeDailyReward}
                            className="w-full py-4 bg-white text-black rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-white/10"
                        >
                            Harika
                        </button>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={closeDailyReward}
                        className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
