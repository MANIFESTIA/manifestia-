"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@/lib/UserContext';
import { useCosmicMemory } from '@/hooks/useCosmicMemory';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Sparkles, Moon, Sun, Plus, BookOpen } from 'lucide-react';
import JournalEditor from './JournalEditor';

export default function JournalView({ onClose }: { onClose: () => void }) {
    const { user } = useUser(); // Need user for fetching
    const { auraHistory, tarotHistory } = useCosmicMemory();
    const [isEditing, setIsEditing] = useState(false);
    const [textEntries, setTextEntries] = useState<any[]>([]);

    // Fetch text entries
    const fetchJournalEntries = async () => {
        if (!user?.id) return;
        try {
            const res = await fetch(`/api/journal?userId=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setTextEntries(data);
            }
        } catch (e) {
            console.error("Journal fetch failed", e);
        }
    };

    useEffect(() => {
        fetchJournalEntries();
    }, [user?.id]);

    // Combine all events
    const allEvents = [
        ...auraHistory.map(a => ({ type: 'aura', date: new Date(a.date), data: a })),
        ...tarotHistory.map(t => ({ type: 'tarot', date: new Date(t.date), data: t })),
        ...textEntries.map(j => ({ type: 'journal', date: new Date(j.createdAt), data: j }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime());

    const formatDate = (date: Date) => {
        try {
            return new Intl.DateTimeFormat('tr-TR', {
                day: 'numeric',
                month: 'long',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Istanbul'
            }).format(date);
        } catch (e) {
            return date.toLocaleDateString();
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#0F0F12] text-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
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
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition border border-white/10 group"
                        title="Yeni Kayıt"
                    >
                        <Plus className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
                <AnimatePresence mode="wait">
                    {isEditing ? (
                        <div className="h-full flex flex-col justify-center max-w-2xl mx-auto">
                            <JournalEditor
                                onSave={() => {
                                    setIsEditing(false);
                                    fetchJournalEntries();
                                }}
                                onCancel={() => setIsEditing(false)}
                            />
                        </div>
                    ) : (
                        <div className="space-y-6 max-w-2xl mx-auto">
                            {allEvents.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-manifest-muted opacity-50 space-y-4">
                                    <Calendar className="w-12 h-12" />
                                    <p>Henüz bir anı biriktirmedin.</p>
                                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition">
                                        İlk Kaydı Oluştur
                                    </button>
                                </div>
                            ) : (
                                allEvents.map((event, index) => (
                                    <motion.div
                                        key={`${event.type}-${index}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative pl-6 border-l w-full border-white/10 pb-8 last:pb-0"
                                    >
                                        {/* Timeline Dot */}
                                        <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ${event.type === 'aura' ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' :
                                            event.type === 'tarot' ? 'bg-purple-500 shadow-[0_0_10px_purple]' :
                                                'bg-yellow-400 shadow-[0_0_10px_yellow]' // Journal
                                            }`}></div>

                                        <div className="mb-2 text-[10px] uppercase tracking-widest text-manifest-muted font-mono flex items-center gap-2">
                                            {formatDate(event.date)}
                                            <span className="opacity-50">•</span>
                                            <span>{event.type.toUpperCase()}</span>
                                        </div>

                                        {event.type === 'aura' && (
                                            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl p-4 border border-cyan-500/10 hover:border-cyan-500/30 transition group">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Sparkles className="w-4 h-4 text-cyan-400" />
                                                        <h3 className="font-bold text-base text-white">Aura Analizi</h3>
                                                    </div>
                                                    <div
                                                        className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                                                        style={{ backgroundColor: (event.data as any).color }}
                                                    ></div>
                                                </div>
                                                <p className="text-sm font-medium text-white/90 mb-1">{(event.data as any).colorName}</p>
                                                <p className="text-xs text-cyan-100/60 leading-relaxed italic">"{(event.data as any).meaning}"</p>
                                            </div>
                                        )}

                                        {event.type === 'tarot' && (
                                            <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl p-4 border border-purple-500/10 hover:border-purple-500/30 transition group">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Moon className="w-4 h-4 text-purple-400" />
                                                        <h3 className="font-bold text-base text-white">Kozmik Tarot</h3>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-white/90 mb-1">{(event.data as any).cardName}</p>
                                                <p className="text-xs text-purple-100/60 leading-relaxed mb-3 line-clamp-3">{(event.data as any).interpretation}</p>
                                            </div>
                                        )}

                                        {event.type === 'journal' && (
                                            <div className="bg-white/5 rounded-xl p-5 border border-white/5 hover:bg-white/10 transition group">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <BookOpen className="w-4 h-4 text-yellow-400" />
                                                    <h3 className="font-bold text-base text-white">{(event.data as any).title || "Ruh Kaydı"}</h3>
                                                    {/* Mood Icon could go here mapping from string */}
                                                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/60 ml-auto capitalize">
                                                        {(event.data as any).mood}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-serif">
                                                    {(event.data as any).content}
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}

                            <div className="pb-10 pt-4 text-center">
                                <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">Yolculuk Devam Ediyor</p>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
