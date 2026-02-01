"use client";

import React, { useState } from 'react';
import { RITUALS, Ritual } from '@/lib/rituals';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Moon, Sun, Wind, X, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import RitualPlayer from './RitualPlayer';

interface RitualViewProps {
    onClose: () => void;
}

export default function RitualView({ onClose }: RitualViewProps) {
    const [viewMode, setViewMode] = useState<'library' | 'player'>('library');
    const [activeRitualId, setActiveRitualId] = useState<string | null>(null);
    const [aiRitual, setAiRitual] = useState<Ritual | null>(null);

    // AI States
    const [customEmotion, setCustomEmotion] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const activeRitual = aiRitual || (activeRitualId ? RITUALS.find(r => r.id === activeRitualId) : null);

    const handleComplete = () => {
        // Wait a bit on completion screen, then return to library
        setTimeout(() => {
            setActiveRitualId(null);
            setAiRitual(null);
            setViewMode('library');
            setCustomEmotion('');
        }, 1500);
    };

    const handleGenerateRitual = async () => {
        if (!customEmotion.trim()) return;

        setIsGenerating(true);
        try {
            const res = await fetch('/api/ritual/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emotion: customEmotion })
            });

            if (!res.ok) throw new Error('API Error');

            const data = await res.json();

            if (data.error) throw new Error(data.error);

            setAiRitual(data);
            setViewMode('player');
        } catch (e) {
            console.error("Failed to generate ritual:", e);
            alert("Evren şu an yoğun, lütfen tekrar dene.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#0F0F12] text-white font-sans overflow-hidden relative">

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
                            setAiRitual(null);
                            setViewMode('library');
                        }}
                    />
                </motion.div>
            )}

            {/* --- LIBRARY VIEW --- */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 ${viewMode === 'player' ? 'hidden' : ''}`}>

                {/* AI Creation Section */}
                <div className="mb-10 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[50px] -mr-10 -mt-10 group-hover:bg-purple-500/30 transition-all duration-700"></div>

                    <h3 className="text-lg font-serif text-purple-200 mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        Sana Özel Ritüel Yarat
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                        Şu an nasıl hissediyorsun? Evren sana özel bir akış hazırlasın.
                    </p>

                    <div className="flex gap-2 relative z-10">
                        <input
                            type="text"
                            value={customEmotion}
                            onChange={(e) => setCustomEmotion(e.target.value)}
                            placeholder="Örn: Çok yorgunum, Stresliyim, Enerjik..."
                            disabled={isGenerating}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition disabled:opacity-50"
                            onKeyDown={(e) => e.key === 'Enter' && handleGenerateRitual()}
                        />
                        <button
                            onClick={handleGenerateRitual}
                            disabled={isGenerating || !customEmotion.trim()}
                            className="bg-purple-500/20 hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 rounded-xl transition flex items-center justify-center min-w-[60px] border border-purple-500/20"
                        >
                            {isGenerating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <ArrowRight className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Standard Library Grid */}
                <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Klasik Ritüeller</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {RITUALS.map(ritual => (
                        <motion.div
                            key={ritual.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setActiveRitualId(ritual.id);
                                setViewMode('player');
                            }}
                            className={`
                                relative overflow-hidden rounded-2xl p-5 cursor-pointer border border-white/5
                                group hover:border-white/10 transition-all duration-300
                            `}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${ritual.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center mb-3
                                        bg-gradient-to-br ${ritual.color} bg-opacity-20
                                    `}>
                                        {getIcon(ritual.iconName)}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1">{ritual.title}</h3>
                                    <p className="text-sm text-white/60 line-clamp-2 mb-3">{ritual.description}</p>

                                    <div className="flex items-center gap-3 text-xs font-medium text-white/40">
                                        <span className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                            {ritual.duration}
                                        </span>
                                        <span className="flex items-center gap-1 text-purple-300/80">
                                            Ruhsal Dinginlik
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
