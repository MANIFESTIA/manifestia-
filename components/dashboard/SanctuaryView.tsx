"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@/lib/UserContext';
import { MessageCircle, Wind, Sparkles, Users, ShoppingBag, Bell, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import Antigravity from '@/components/ui/Antigravity';
import { useCosmicGuidance } from '@/hooks/useCosmicGuidance';

import ChatInterface from '@/components/chat/ChatInterface';
import RitualView from '@/components/ritual/RitualView';
import TarotView from '@/components/tarot/TarotView';
import BirthChartView from '@/components/astrology/BirthChartView'; // [NEW]

import JournalView from '@/components/journal/JournalView';
import { Image as ImageIcon, Map as MapIcon } from 'lucide-react'; // [NEW] Map icon
import ProfileSettings from '@/components/dashboard/ProfileSettings';
// ...
const [showRitualView, setShowRitualView] = useState(false);
const [showTarot, setShowTarot] = useState(false);
const [showBirthChart, setShowBirthChart] = useState(false); // [NEW]
import EnergyRing from '@/components/dashboard/EnergyRing';
import CosmicAlertWidget from '@/components/dashboard/CosmicAlertWidget';
import { useCosmicWatcher } from '@/hooks/useCosmicWatcher';
import IntroSplash from '@/components/layout/IntroSplash';

import DailyRewardPopup from '@/components/gamification/DailyRewardPopup';
import WalletDisplay from '@/components/gamification/WalletDisplay';
import StoreView from '@/components/store/StoreView';
import TransactionHistoryModal from '@/components/economy/TransactionHistoryModal';
import DiamondShopModal from '@/components/store/DiamondShopModal';

type ViewState = 'sanctuary' | 'guide' | 'market';

export default function SanctuaryView() {
    const { user } = useUser();

    // Initialize view safely (prevents hydration mismatch)
    const [view, setView] = useState<ViewState>('sanctuary');

    // Load view from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('manifestia_last_view');
            // Validate saved view is one of the allowed types
            if (saved === 'sanctuary' || saved === 'guide' || saved === 'market') {
                setView(saved as ViewState);
            }
        }
    }, []);

    const [showRitualView, setShowRitualView] = useState(false);
    const [showTarot, setShowTarot] = useState(false);
    const [showBirthChart, setShowBirthChart] = useState(false);
    const [showJournal, setShowJournal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showDiamondShop, setShowDiamondShop] = useState(false);

    // Intro Splash State - Overlay
    const [showIntro, setShowIntro] = useState(true);

    const { testNotification } = useCosmicWatcher();

    // Cosmic Guidance Hook
    const { message: guidanceMessage, loading: guidanceLoading } = useCosmicGuidance({
        name: user?.name || "Ruh",
        sign: user?.sign || "Bilinmiyor"
    });

    // Save view to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('manifestia_last_view', view);
    }, [view]);

    return (
        <div className="min-h-screen text-manifest-text pb-28 font-sans relative overflow-hidden">
            {/* Daily Reward Popup is global */}
            <DailyRewardPopup />

            {/* Header */}
            <header className="p-6 flex justify-between items-center sticky top-0 z-40 transition-all duration-300">
                <div
                    onClick={() => setView('sanctuary')}
                    className="glass-panel px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                >
                    <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 text-glow">
                        TheManifest
                    </h1>
                </div>

                <div className="flex items-center gap-3 relative">
                    {/* Wallet Display - Redirects to Market/Diamond Shop */}
                    <WalletDisplay onClick={() => setShowDiamondShop(true)} />

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition relative"
                        >
                            <Bell className="w-5 h-5 text-purple-200" />
                            {/* Notification Dot (Mock) */}
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_red]" />
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-12 right-0 w-80 md:w-96 z-50 origin-top-right"
                                    >
                                        <div className="bg-[#0f0a1e]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden">
                                            <div className="px-3 py-2 border-b border-white/5 mb-2">
                                                <h3 className="text-sm font-bold text-white/80">Kozmik Bildirimler</h3>
                                            </div>
                                            <CosmicAlertWidget />
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

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
                        {/* Quick Actions for Tools (Tarot, Aura) */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setShowTarot(true)}
                                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition w-24"
                            >
                                <Sparkles className="w-6 h-6 text-indigo-300" />
                                <span className="text-xs text-white/70">Tarot</span>
                            </button>

                            <button
                                onClick={() => setShowRitualView(true)}
                                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition w-24"
                            >
                                <Flame className="w-6 h-6 text-orange-300" />
                                <span className="text-xs text-white/70">Ritüel</span>
                            </button>

                            <button
                                onClick={() => setShowBirthChart(true)}
                                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition w-24"
                            >
                                <MapIcon className="w-6 h-6 text-indigo-300" />
                                <span className="text-xs text-white/70 text-center leading-tight">Doğum Haritası</span>
                            </button>
                        </div>

                        {/* Cosmic Alert Widget REMOVED from here */}

                        {/* Hero / Daily Energy */}
                        <div className="flex flex-col items-center py-6 relative">
                            <EnergyRing key="energy-ring-v8-living-glow" percentage={88} />

                            <h2 className="mt-8 text-2xl font-serif text-white/90 text-center">
                                Merhaba, {user?.name || "Ruh"}
                            </h2>

                            {guidanceMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 max-w-sm text-center px-4"
                                >
                                    <p className="text-sm text-purple-200/80 italic">
                                        "{guidanceMessage}"
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {view === 'guide' && <ChatInterface onBack={() => setView('sanctuary')} />}

                {view === 'market' && (
                    <StoreView
                        onBack={() => setView('sanctuary')}
                        onShowHistory={() => setShowHistory(true)}
                    />
                )}
            </main>

            {/* Modals */}
            {showRitualView && <RitualView onClose={() => setShowRitualView(false)} />}
            {showBirthChart && <BirthChartView onClose={() => setShowBirthChart(false)} />}

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
            {showHistory && <TransactionHistoryModal onClose={() => setShowHistory(false)} />}
            {showDiamondShop && <DiamondShopModal onClose={() => setShowDiamondShop(false)} />}

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
                    onClick={() => setView('market')} // Market View Action
                    className={`p-3 rounded-full transition-all duration-300 ${view === 'market' ? 'bg-cyan-500/20 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-110' : 'text-manifest-muted hover:text-white'}`}
                >
                    <ShoppingBag className="w-6 h-6" />
                </button>

            </nav>
            {/* Intro Overlay - Concurennt Loading */}
            {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} autoEnter={true} />}
        </div>
    );
}
