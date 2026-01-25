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
        <div className="min-h-screen bg-manifest-background text-manifest-text pb-24 font-sans">
            {/* Header */}
            <header className="p-6 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-manifest-background/80 border-b border-white/5">
                <h1 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-manifest-primary to-manifest-secondary">Manifestia</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowTarot(true)}
                        className="p-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition border border-indigo-500/20"
                        title="Kozmik Tarot"
                    >
                        <Sparkles className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowAuraCamera(true)}
                        className="p-2 rounded-full bg-manifest-primary/10 hover:bg-manifest-primary/20 text-manifest-primary transition border border-manifest-primary/20"
                        title="Aura Analizi"
                    >
                        <Camera className="w-5 h-5" />
                    </button>
                    <button
                        onClick={testNotification}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-manifest-muted hover:text-manifest-primary transition"
                        title="Bildirim Testi"
                    >
                        <Bell className="w-5 h-5" />
                    </button>
                    <div
                        onClick={() => setShowJournal(true)}
                        className="w-10 h-10 rounded-full bg-manifest-surfaceHighlight flex items-center justify-center border border-white/10 ring-2 ring-manifest-primary/20 cursor-pointer hover:scale-105 transition"
                    >
                        <span className="text-sm font-medium">{user?.name?.charAt(0)}</span>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-8">
                {view === 'sanctuary' && (
                    <>
                        {/* Daily Message Card */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-manifest-primary to-manifest-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative p-8 rounded-2xl bg-manifest-surface border border-white/10 overflow-hidden shadow-2xl">
                                <Sparkles className="absolute top-4 right-4 text-manifest-primary w-6 h-6 animate-pulse-slow" />
                                <h2 className="text-xs uppercase tracking-[0.2em] text-manifest-muted mb-4 font-medium">Günün Mesajı</h2>
                                <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-white/90">
                                    "{dailyMessage}"
                                </p>

                                <div className="mt-8 flex items-center gap-4">
                                    <button
                                        onClick={handlePlayMessage}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${isPlaying ? 'bg-manifest-secondary text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 hover:bg-white/10 text-manifest-primary border border-manifest-primary/30'}`}
                                    >
                                        {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
                                        <span className="text-sm font-medium">{isPlaying ? 'Durdur' : 'Dinle'}</span>
                                    </button>

                                    <button className="px-6 py-3 bg-manifest-primary/10 text-manifest-primary rounded-full hover:bg-manifest-primary hover:text-manifest-background transition border border-transparent hover:border-manifest-primary-30">
                                        <span className="text-sm font-medium">Kabul Ediyorum</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Natal Summary (Quick view) */}
                        <section className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-manifest-surface border border-white/5 hover:border-manifest-primary/20 transition-colors">
                                <h3 className="text-manifest-muted text-xs uppercase tracking-wider mb-2">Güneş Burcu</h3>
                                <p className="text-xl font-medium">Aslan 🦁</p>
                            </div>
                            <div className="p-5 rounded-xl bg-manifest-surface border border-white/5 hover:border-manifest-primary/20 transition-colors">
                                <h3 className="text-manifest-muted text-xs uppercase tracking-wider mb-2">Yükselen</h3>
                                <p className="text-xl font-medium">Başak 🌾</p>
                            </div>
                        </section>

                        {/* Store Teaser */}
                        <section className="space-y-4">
                            <div className="flex justify-between items-end">
                                <h2 className="text-xl font-serif">Enerji Marketi</h2>
                                <span className="text-xs text-manifest-accent cursor-pointer hover:underline">Tümünü Gör</span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                                <div
                                    onClick={() => setActiveRitual('abundance-777')}
                                    className="min-w-[160px] p-4 bg-manifest-surface rounded-xl border border-white/5 hover:border-manifest-primary/30 transition-all snap-start cursor-pointer hover:scale-105"
                                >
                                    <div className="h-24 bg-black/20 rounded-lg mb-3 flex items-center justify-center text-4xl">🕯️</div>
                                    <h3 className="font-medium text-sm">777 Mucize Sekansı</h3>
                                    <span className="text-[10px] text-manifest-primary uppercase tracking-wide">Ritüeli Başlat</span>
                                </div>
                                <div
                                    onClick={() => setActiveRitual('love-444')}
                                    className="min-w-[160px] p-4 bg-manifest-surface rounded-xl border border-white/5 hover:border-manifest-primary/30 transition-all snap-start cursor-pointer hover:scale-105"
                                >
                                    <div className="h-24 bg-black/20 rounded-lg mb-3 flex items-center justify-center text-4xl">💎</div>
                                    <h3 className="font-medium text-sm">Ametist Kolye</h3>
                                    <span className="text-[10px] text-manifest-primary uppercase tracking-wide">Ritüeli Başlat</span>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {view === 'guide' && (
                    <ChatInterface />
                )}
                {view === 'tribe' && (
                    <TribeView />
                )}
                {/* TODO: Add 'market' view later if needed */}
            </main>

            {/* Ritüel Oyuncusu */}
            {activeRitual && (
                <RitualPlayer
                    ritualId={activeRitual}
                    onClose={() => setActiveRitual(null)}
                />
            )}

            {/* Aura Vision */}
            {showAuraCamera && (
                <AuraView onClose={() => setShowAuraCamera(false)} />
            )}

            {/* Tarot View */}
            {showTarot && (
                <TarotView onClose={() => setShowTarot(false)} />
            )}

            {/* Journal View */}
            {showJournal && (
                <JournalView onClose={() => setShowJournal(false)} />
            )}

            {/* Navigation Bar */}
            <nav className="fixed bottom-0 left-0 w-full glass-panel border-t border-white/10 p-4 pb-8 flex justify-around items-center z-50 backdrop-blur-xl bg-manifest-background/80">
                <button
                    onClick={() => setView('sanctuary')}
                    className={`flex flex-col items-center gap-1 transition-transform active:scale-95 ${view === 'sanctuary' ? 'text-manifest-primary' : 'text-manifest-muted hover:text-manifest-text'}`}
                >
                    <Wind className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Akış</span>
                </button>
                <button
                    onClick={() => setView('guide')}
                    className={`flex flex-col items-center gap-1 transition-transform active:scale-95 ${view === 'guide' ? 'text-manifest-primary' : 'text-manifest-muted hover:text-manifest-text'}`}
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Rehber</span>
                </button>
                <button
                    onClick={() => setView('tribe')}
                    className={`flex flex-col items-center gap-1 ${view === 'tribe' ? 'text-manifest-primary' : 'text-manifest-muted hover:text-white'}`}
                >
                    <Users className="w-6 h-6" />
                    <span className="text-[10px] uppercase tracking-widest font-medium">Kabile</span>
                </button>
            </nav>
        </div>
    );
}
