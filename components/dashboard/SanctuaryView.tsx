"use client";
import React, { useState } from 'react';
import { useUser } from '@/lib/UserContext';
import { MessageCircle, ShoppingBag, Wind, Sparkles, Volume2, Square, Camera, Bell, Users } from 'lucide-react';
import { useVoice } from '@/hooks/useVoice';
import { motion } from 'framer-motion';
import ChatInterface from '@/components/chat/ChatInterface';
import RitualPlayer from '@/components/ritual/RitualPlayer';
import AuraView from '@/components/aura/AuraView'; // Import
import TarotView from '@/components/tarot/TarotView'; // Import
import TribeView from '@/components/social/TribeView'; // Import
import JournalView from '@/components/journal/JournalView'; // Import
import { useCosmicWatcher } from '@/hooks/useCosmicWatcher';

export default function SanctuaryView() {
    const { user } = useUser();
    const { speak, stop, isPlaying } = useVoice();
    const [view, setView] = useState<'sanctuary' | 'guide' | 'market' | 'tribe'>('sanctuary');
    const [activeRitual, setActiveRitual] = useState<string | null>(null);
    const [showAuraCamera, setShowAuraCamera] = useState(false); // Yeni State
    const [showTarot, setShowTarot] = useState(false); // Yeni State
    const [showJournal, setShowJournal] = useState(false); // Yeni State: Günlük


    // Kozmik Gözcüyü Başlat
    const { testNotification } = useCosmicWatcher();

    // Şimdilik statik, ileride API'den alınan dinamik mesaj buraya gelecek
    const dailyMessage = "Evren bugün sana bolluk kapılarını açıyor. Niyetini mühürle ve ışığa adım at. " + (user?.name || "Ruh") + ", mucizeler seninle.";

    const handlePlayMessage = () => {
        if (isPlaying) {
            stop();
        } else {
            speak(dailyMessage, 'COSMIC_SAGE');
        }
    };

    return (
    return (
        <div className="min-h-screen text-manifest-text pb-24 font-sans relative overflow-hidden">

            {/* Nebula Effect (Arka Plan Hareketli Işık) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* Header */}
            <header className="p-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
                    <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 text-glow">
                        Manifestia
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowTarot(true)}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-indigo-300 transition border border-indigo-400/20 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowAuraCamera(true)}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 transition border border-purple-400/20"
                    >
                        <Camera className="w-5 h-5" />
                    </button>
                    <div
                        onClick={() => setShowJournal(true)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/20 ring-1 ring-white/10 cursor-pointer hover:scale-105 transition backdrop-blur-sm"
                    >
                        <span className="text-sm font-medium text-white">{user?.name?.charAt(0)}</span>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-8">
                {view === 'sanctuary' && (
                    <>
                        {/* Hero / Daily Energy */}
                        <div className="text-center py-6 relative">
                            {/* Energy Ring */}
                            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                                {/* Dış Halka */}
                                <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                                {/* Dönen Neon Halka */}
                                <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-manifest-secondary shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-spin-slow" style={{ animationDuration: '8s' }}></div>
                                <div className="absolute inset-2 rounded-full border-r-2 border-b-2 border-manifest-primary shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-spin-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>

                                <div className="z-10 bg-black/20 backdrop-blur-xl w-36 h-36 rounded-full flex flex-col items-center justify-center border border-white/10">
                                    <span className="text-xs text-manifest-muted uppercase tracking-widest mb-1">Enerji</span>
                                    <span className="text-4xl font-light text-white text-glow">88%</span>
                                </div>
                            </div>

                            <h2 className="mt-6 text-2xl font-serif text-white/90">
                                Merhaba, {user?.name || "Ruh"}
                            </h2>
                            <p className="text-sm text-manifest-muted mt-1 italic">
                                "{dailyMessage}"
                            </p>
                        </div>

                        {/* Store Cards (Rituals) */}
                        <section className="space-y-4">
                            <div className="flex justify-between items-end px-1">
                                <h2 className="text-lg font-medium text-white/80">Ritüeller</h2>
                                <span className="text-xs text-manifest-secondary cursor-pointer hover:text-white transition">Tümünü Gör</span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar snap-x px-1">
                                <div
                                    onClick={() => setActiveRitual('abundance-777')}
                                    className="glass-card min-w-[200px] p-5 rounded-2xl md:hover:-translate-y-2 transition-transform duration-300 snap-start cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10 group-hover:border-manifest-primary/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                                        🕯️
                                    </div>
                                    <h3 className="font-medium text-base text-white group-hover:text-manifest-primary transition-colors">777 Mucizesi</h3>
                                    <p className="text-xs text-manifest-muted mt-1">Bolluk frekansını aktif et.</p>
                                </div>

                                <div
                                    onClick={() => setActiveRitual('love-444')}
                                    className="glass-card min-w-[200px] p-5 rounded-2xl md:hover:-translate-y-2 transition-transform duration-300 snap-start cursor-pointer group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10 group-hover:border-manifest-secondary/50 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all">
                                        💖
                                    </div>
                                    <h3 className="font-medium text-base text-white group-hover:text-manifest-secondary transition-colors">Aşk Çekimi</h3>
                                    <p className="text-xs text-manifest-muted mt-1">Ruh eşini hayatına çağır.</p>
                                </div>

                                <div
                                    className="glass-card min-w-[200px] p-5 rounded-2xl md:hover:-translate-y-2 transition-transform duration-300 snap-start cursor-pointer group relative overflow-hidden opacity-70"
                                >
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-2xl mb-4 border border-white/10">
                                        🌙
                                    </div>
                                    <h3 className="font-medium text-base text-white">Dolunay Arınması</h3>
                                    <p className="text-[10px] uppercase tracking-wider text-manifest-accent mt-2 border border-manifest-accent/30 rounded px-2 py-0.5 inline-block">Yakında</p>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {view === 'guide' && <ChatInterface />}
                {view === 'tribe' && <TribeView />}
            </main>

            {/* Modals */}
            {activeRitual && <RitualPlayer ritualId={activeRitual} onClose={() => setActiveRitual(null)} />}
            {showAuraCamera && <AuraView onClose={() => setShowAuraCamera(false)} />}
            {showTarot && <TarotView onClose={() => setShowTarot(false)} />}
            {showJournal && <JournalView onClose={() => setShowJournal(false)} />}

            {/* Navigation Bar */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass-panel rounded-full p-2 flex justify-between items-center z-50 shadow-2xl">
                <button
                    onClick={() => setView('sanctuary')}
                    className={`nav-btn p-3 rounded-full transition-all ${view === 'sanctuary' ? 'bg-manifest-primary/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-manifest-muted hover:text-white'}`}
                >
                    <Wind className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setView('guide')}
                    className={`nav-btn p-3 rounded-full transition-all ${view === 'guide' ? 'bg-manifest-secondary/20 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' : 'text-manifest-muted hover:text-white'}`}
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setView('tribe')}
                    className={`nav-btn p-3 rounded-full transition-all ${view === 'tribe' ? 'bg-amber-500/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-manifest-muted hover:text-white'}`}
                >
                    <Users className="w-6 h-6" />
                </button>
            </nav>
        </div>
    );
}

// Add simplistic spin animation if not present globally
// @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    );
}
