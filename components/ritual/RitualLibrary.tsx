"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RITUALS, getIcon } from '@/lib/rituals';
import { Play, Clock, Sparkles } from 'lucide-react';

interface RitualLibraryProps {
    onSelectRitual: (ritualId: string) => void;
}

export default function RitualLibrary({ onSelectRitual }: RitualLibraryProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
            {RITUALS.map((ritual, index) => {
                const Icon = getIcon(ritual.iconName);

                return (
                    <motion.div
                        key={ritual.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:border-purple-500/50 cursor-pointer"
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${ritual.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

                        <div className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${ritual.color} text-white shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-black/20 rounded-md border border-white/5">
                                    <Clock className="w-3 h-3 text-white/60" />
                                    <span className="text-xs text-white/80 font-mono">{ritual.duration}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                                {ritual.baseTitle}
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
                                {ritual.baseDescription}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-500">
                                    <Sparkles className="w-3 h-3" />
                                    <span>+{ritual.xpReward} XP</span>
                                </div>

                                <button
                                    onClick={() => onSelectRitual(ritual.id)}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white font-medium transition flex items-center gap-2 group-hover:scale-105 active:scale-95"
                                >
                                    <Play className="w-3 h-3 fill-current" />
                                    Başlat
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
