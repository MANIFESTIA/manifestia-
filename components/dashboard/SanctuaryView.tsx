"use client";
import React, { useState } from 'react';
import { useUser } from '@/lib/UserContext';
import { MessageCircle, Wind, Sparkles, Volume2, Square, Camera, Users, RotateCw } from 'lucide-react';
import { useCosmicGuidance } from '@/hooks/useCosmicGuidance';
import { useVoice } from '@/hooks/useVoice';
import { motion } from 'framer-motion';
import Antigravity from '@/components/ui/Antigravity';
import ChatInterface from '@/components/chat/ChatInterface';
import RitualPlayer from '@/components/ritual/RitualPlayer';
import AuraView from '@/components/aura/AuraView';
import TarotView from '@/components/tarot/TarotView';
import TribeView from '@/components/social/TribeView';
import JournalView from '@/components/journal/JournalView';
import ProfileSettings from '@/components/dashboard/ProfileSettings';
import EnergyRing from '@/components/dashboard/EnergyRing';
import { useCosmicWatcher } from '@/hooks/useCosmicWatcher';
import RitualCard from '@/components/ritual/RitualCard';
import { RITUALS } from '@/lib/rituals';

export default function SanctuaryView() {
    const { user } = useUser();
    const { speak, stop, isPlaying } = useVoice();
    const [view, setView] = useState<'sanctuary' | 'guide' | 'market' | 'tribe'>('sanctuary');
    const [activeRitual, setActiveRitual] = useState<string | null>(null);
    const [showAuraCamera, setShowAuraCamera] = useState(false);
    const [showTarot, setShowTarot] = useState(false);
    const [showJournal, setShowJournal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const { testNotification } = useCosmicWatcher();

    // Dynamic Guidance Hook
    const { message, loading, refresh } = useCosmicGuidance({
        name: user?.name,
        sign: user?.sign
    });

    const dailyMessage = message || "Evrenin sessizliğini dinle...";

    const handlePlayMessage = () => {
        if (isPlaying) {
            stop();
        } else {
            speak(dailyMessage, 'COSMIC_SAGE');
        }
    };

    return (
        <div className="min-h-screen text-manifest-text pb-24 font-sans relative overflow-hidden">

            {/* Nebula Effect (Arka Plan Hareketli Işık) */}
            {/* Nebula Effect (Arka Plan Hareketli Işık) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[#050A18]">
                {/* 3D Background */}
                <div className="absolute inset-0 opacity-80">
                    <Antigravity
                        count={150}
                        magnetRadius={15}
                        ringRadius={12}
                        waveSpeed={0.5}
                        color="#A855F7" // Manifest Secondary
                        particleSize={1.5}
                    />
                </div>
                {/* Fallback gradients for depth */}
                <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
                <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] animate-pulse-slow delay-1000 pointer-events-none"></div>
            </div>

            {/* Header */}
            <header className="p-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md">
                    <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 text-glow">
                        Manifestia
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowTarot(true)}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-indigo-300 transition border border-indigo-400/20 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] backdrop-blur-sm"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowAuraCamera(true)}
                        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 transition border border-purple-400/20 backdrop-blur-sm"
                    >
                        <Camera className="w-5 h-5" />
                    </button>
                    <div
                        onClick={() => setShowProfile(true)}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-white/20 ring-1 ring-white/10 cursor-pointer hover:scale-105 transition backdrop-blur-sm"
                    >
                        <span className="text-sm font-medium text-white">{user?.name?.charAt(0)}</span>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-8">
                {view === 'sanctuary' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {/* Hero / Daily Energy */}
                        <div className="flex flex-col items-center py-6 relative">
                            <EnergyRing percentage={88} />

                            <h2 className="mt-8 text-2xl font-serif text-white/90 text-center">
                                Merhaba, {user?.name || "Ruh"}
                            </h2>
                            <div className="mt-2 min-h-[60px] flex flex-col items-center justify-center">
                                {loading ? (
                                    <div className="flex items-center gap-2 text-manifest-muted animate-pulse">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-xs">Yıldızlar fısıldıyor...</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-manifest-muted italic max-w-xs mx-auto text-center animate-in fade-in slide-in-from-bottom-2 duration-700">
                                        "{dailyMessage}"
                                    </p>
                                )}
                            </div>

                            <div className="mt-4 flex justify-center gap-3">
                                <button
                                    onClick={refresh}
                                    disabled={loading}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-manifest-muted hover:text-white transition disabled:opacity-50"
                                    title="Yeni Mesaj"
                                >
                                    <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                                <button
                                    onClick={handlePlayMessage}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 backdrop-blur-md ${isPlaying ? 'bg-manifest-secondary/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 hover:bg-white/10 text-manifest-primary border border-manifest-primary/30'}`}
                                >
                                    {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
                                    <span className="text-xs font-medium">{isPlaying ? 'Durdur' : 'Dinle'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Store Cards (Rituals) */}
                        <section className="space-y-4">
                            <div className="flex justify-between items-end px-2">
                                <h2 className="text-lg font-medium text-white/80">Ritüel Kartları</h2>
                                <span className="text-xs text-manifest-secondary cursor-pointer hover:text-white transition">Tümünü Gör</span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar snap-x px-2">
                                {RITUALS.map(ritual => (
                                    <RitualCard
                                        key={ritual.id}
                                        ritual={ritual}
                                        onClick={() => setActiveRitual(ritual.id)}
                                    />
                                ))}
                            </div>
                        </section>
                    </motion.div>
                )}

                {view === 'guide' && <ChatInterface />}
                {view === 'tribe' && <TribeView />}
            </main>

            {/* Modals */}
            {activeRitual && <RitualPlayer ritualId={activeRitual} onClose={() => setActiveRitual(null)} />}
            {showAuraCamera && <AuraView onClose={() => setShowAuraCamera(false)} />}
            {showTarot && <TarotView onClose={() => setShowTarot(false)} />}
            {showJournal && <JournalView onClose={() => setShowJournal(false)} />}

            {/* Profile Settings Modal */}
            {showProfile && (
                <ProfileSettings
                    onClose={() => setShowProfile(false)}
                    onOpenJournal={() => {
                        setShowProfile(false);
                        setShowJournal(true);
                    }}
                />
            )}

            {/* Navigation Bar */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass-panel rounded-full p-2 flex justify-between items-center z-50 shadow-2xl backdrop-blur-xl">
                <button
                    onClick={() => setView('sanctuary')}
                    className={`p-3 rounded-full transition-all duration-300 ${view === 'sanctuary' ? 'bg-manifest-primary/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-110' : 'text-manifest-muted hover:text-white'}`}
                >
                    <Wind className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setView('guide')}
                    className={`p-3 rounded-full transition-all duration-300 ${view === 'guide' ? 'bg-manifest-secondary/20 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] scale-110' : 'text-manifest-muted hover:text-white'}`}
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setView('tribe')}
                    className={`p-3 rounded-full transition-all duration-300 ${view === 'tribe' ? 'bg-amber-500/20 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-110' : 'text-manifest-muted hover:text-white'}`}
                >
                    <Users className="w-6 h-6" />
                </button>
            </nav>
        </div>
    );
}
