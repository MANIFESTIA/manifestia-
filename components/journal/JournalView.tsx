"use client";

import React from 'react';
import { useCosmicMemory } from '@/hooks/useCosmicMemory';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Sparkles, Moon, Sun } from 'lucide-react';

export default function JournalView({ onClose }: { onClose: () => void }) {
    const { auraHistory, tarotHistory } = useCosmicMemory();

    // Verileri birleştirip tarihe göre sıralayalım
    const allEvents = [
        ...auraHistory.map(a => ({ type: 'aura', date: new Date(a.date), data: a })),
        ...tarotHistory.map(t => ({ type: 'tarot', date: new Date(t.date), data: t }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#0F0F12] text-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center gap-4 backdrop-blur-md">
                <button onClick={onClose} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h2 className="text-xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                        Ruh Günlüğü
                    </h2>
                    <p className="text-xs text-manifest-muted">Yolculuğunun izleri...</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {allEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-manifest-muted opacity-50 space-y-4">
                        <Calendar className="w-12 h-12" />
                        <p>Henüz bir anı biriktirmedin.</p>
                    </div>
                ) : (
                    allEvents.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-6 border-l w-full border-white/10 pb-6 last:pb-0"
                        >
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ${event.type === 'aura' ? 'bg-manifest-accent' : 'bg-manifest-primary'}`}></div>

                            <div className="mb-1 text-xs text-manifest-muted font-mono">
                                {formatDate(event.date)}
                            </div>

                            {event.type === 'aura' ? (
                                // AURA KARTI
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition group">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-manifest-accent" />
                                            <h3 className="font-bold text-lg text-white">Aura Analizi</h3>
                                        </div>
                                        <div
                                            className="w-4 h-4 rounded-full border border-white/20"
                                            style={{ backgroundColor: (event.data as any).color }}
                                        ></div>
                                    </div>
                                    <p className="text-sm font-medium text-white/90 mb-1">{(event.data as any).colorName}</p>
                                    <p className="text-xs text-manifest-muted leading-relaxed italic">"{(event.data as any).meaning}"</p>
                                </div>
                            ) : (
                                // TAROT KARTI
                                <div className="bg-indigo-900/20 rounded-xl p-4 border border-indigo-500/20 hover:bg-indigo-900/30 transition group">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Moon className="w-4 h-4 text-indigo-400" />
                                            <h3 className="font-bold text-lg text-indigo-100">Kozmik Tarot</h3>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-white/90 mb-1">{(event.data as any).cardName}</p>
                                    <p className="text-xs text-indigo-200/70 leading-relaxed mb-3">{(event.data as any).interpretation}</p>
                                    <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                                        <p className="text-[10px] text-manifest-muted uppercase tracking-widest mb-1">Olumlama</p>
                                        <p className="text-xs italic text-white">"{(event.data as any).affirmation}"</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}

                <div className="pb-10 pt-4 text-center">
                    <p className="text-xs text-white/20 uppercase tracking-[0.2em]">Yolculuk Devam Ediyor</p>
                </div>
            </div>
        </div>
    );
}
