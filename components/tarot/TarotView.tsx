"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MAJOR_ARCANA, TarotCard as TarotCardType } from '@/lib/tarot-data';
import { getApiUrl } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, X, Stars, Diamond, History, Layers } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import { useCosmicMemory } from '@/hooks/useCosmicMemory';
import TarotCard from './TarotCard';
import CosmicBackground from '../layout/CosmicBackground';
import DiamondConfirmModal from '@/components/economy/DiamondConfirmModal';
import { Lock } from 'lucide-react';

// --- TİPLER ---
interface ReadingResult {
    interpretation: string;
    affirmation: string;
    suggestion: string;
}

// --- PARTICLE EFFECT (GALAXY SPIRAL) ---
const GalaxyParticles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 2, 0],
                        rotate: [0, 360],
                        x: Math.cos(i * 18) * 150,
                        y: Math.sin(i * 18) * 150
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "linear"
                    }}
                />
            ))}
            <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        </div>
    );
};

// --- ANA BİLEŞEN ---
export default function TarotView({ onClose }: { onClose: () => void }) {
    const { user, spendDiamonds } = useUser();
    const [step, setStep] = useState<'intro' | 'shuffling' | 'spread' | 'revealing' | 'reading'>('intro');
    const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);
    const [reading, setReading] = useState<ReadingResult | null>(null);
    const [shuffledDeck, setShuffledDeck] = useState<TarotCardType[]>(MAJOR_ARCANA);
    const { saveTarot } = useCosmicMemory();

    // New States
    const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const spreadType = 'single';

    // Paywall State
    const [showPaywall, setShowPaywall] = useState(false);
    const { updateUser } = useUser();

    // Body Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Daily Free Check
    const today = new Date().toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul' });
    const isFree = user?.lastTarotDate !== today;

    // Check Free Status on Reveal attempt
    const checkQuotaAndReveal = (card: TarotCardType) => {
        if (isFree) {
            handlePickCard(card);
            updateUser({ lastTarotDate: today });
        } else {
            setShowPaywall(true);
            setSelectedCard(card);
        }
    };

    const handleSaveWithPaywall = async () => {
        if (!reading || !selectedCard) return;

        // Cost: 3 Diamonds
        const canSpend = await spendDiamonds(3, "Tarot Mühürleme");
        if (canSpend) {
            saveTarot({
                cardName: selectedCard.name,
                interpretation: reading.interpretation,
                affirmation: reading.affirmation,
                suggestion: reading.suggestion
            });
            alert("Kaderin mühürlendi ve günlüğüne kaydedildi.");
        } else {
            setShowPaywall(true);
        }
    };

    // Shuffling Logic
    const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [energyLevel, setEnergyLevel] = useState(0); // 0 to 100
    const [isHolding, setIsHolding] = useState(false);

    const startShuffling = () => {
        setIsHolding(true);
        // Start rapid shuffling visual and energy charge
        if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);

        shuffleIntervalRef.current = setInterval(() => {
            // Shuffle visual
            setShuffledDeck(prev => {
                const newDeck = [...prev];
                const i = Math.floor(Math.random() * newDeck.length);
                const j = Math.floor(Math.random() * newDeck.length);
                [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
                return newDeck;
            });

            // Charge Energy
            setEnergyLevel(prev => {
                const boost = 1.3; // ~3.8 seconds to fill (100 / 1.3 * 50ms)
                const newVal = prev + boost;

                // Auto-complete when full
                if (newVal >= 100) {
                    if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);

                    // Trigger completion logic immediately
                    setTimeout(() => {
                        // Apply Reversed Status Randomly (e.g. 30% chance)
                        const deckWithReversed = shuffledDeck.map(c => ({
                            ...c,
                            isReversed: Math.random() < 0.3
                        }));
                        setShuffledDeck(deckWithReversed); // Note: closures might capture old deck, but state update is functional above.
                        // Actually, better to use the functional update or just proceed, deck shuffling visual is fine.
                        // Re-shuffling one last time for the logical deck:
                        setShuffledDeck(currentDeck => {
                            return currentDeck.map(c => ({ ...c, isReversed: Math.random() < 0.3 }));
                        });

                        setStep('spread');
                        setIsHolding(false);
                    }, 200); // Slight delay for visual satisfaction

                    return 100;
                }
                return newVal;
            });
        }, 50);
    };

    const stopShuffling = () => {
        // If we haven't reached 100 yet and user releases, we decay
        // The auto-transition handles the 100 case effectively, 
        // but we need to check if we are NOT at 100 to start decay.
        // We can't easily check state 'energyLevel' here accurately due to closure staleness if we don't use ref, 
        // but we can check the setEnergyLevel callback or just always start decay. 
        // If it's 100, the step changes anyway, so decay won't be visible/matter or component unmounts.

        setIsHolding(false);
        if (shuffleIntervalRef.current) clearInterval(shuffleIntervalRef.current);

        // Decay if released early
        const decay = setInterval(() => {
            setEnergyLevel(prev => {
                if (prev >= 100) {
                    clearInterval(decay);
                    return 100;
                }
                if (prev <= 0) {
                    clearInterval(decay);
                    return 0;
                }
                return prev - 3; // Fast decay
            });
        }, 20);
    };

    // Auto flow from Intro to Shuffling prompt
    useEffect(() => {
        if (step === 'intro') {
            const timer = setTimeout(() => setStep('shuffling'), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handlePickCard = async (card: TarotCardType) => {
        // Prevent duplicate selection
        if (selectedCards.find(c => c.id === card.id)) return;

        const newSelection = [...selectedCards, card];
        setSelectedCards(newSelection);

        // If Single Card Mode
        if (spreadType === 'single') {
            processReading([card]);
        }
        // If Three Card Mode
        else {
            if (newSelection.length === 3) {
                processReading(newSelection);
            }
        }
    };

    const processReading = async (cards: TarotCardType[]) => {
        setSelectedCard(cards[0]); // For visual anchor during loading
        setStep('revealing');

        try {
            // API İsteği
            const response = await fetch(getApiUrl('api/tarot'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardName: cards[0].englishName, // Legacy fallback
                    cards: cards.map(c => ({
                        name: c.englishName,
                        isReversed: c.isReversed
                    })), // Send objects with reversed status
                    intention: 'Genel Rehberlik',
                    userSign: user?.sign || 'Bilinmiyor',
                    userId: user?.id,
                    spreadType
                })
            });

            if (!response.ok) throw new Error('Yorum alınamadı');

            const result = await response.json();
            setReading(result);

            // Auto-Save (Included in Service - Front-end side backup logic removed as API handles it now)
            // But we keep local state update for 'CosmicMemory' hook if needed, but redundant now.

            setTimeout(() => setStep('reading'), 3000); // Reveal animasyonu süresi

        } catch (e) {
            console.error("Tarot API Hatası:", e);
            const fallbackResult = {
                interpretation: "Yıldızların mesajı şu an sisli, ancak içindeki rehber sana en doğru yolu gösterecektir.",
                affirmation: "Benim gücüm içimdeki sessizlikte saklı.",
                suggestion: "Biraz sessiz kalıp niyetine odaklanman iyi gelebilir."
            };
            setReading(fallbackResult);
            setTimeout(() => setStep('reading'), 3000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-black font-sans">
            {/* --- COSMIC ATMOSPHERE --- */}
            <CosmicBackground />

            {/* Header */}
            <div className="relative z-50 p-4 md:p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 md:p-2 bg-purple-500/20 rounded-lg border border-purple-500/30 backdrop-blur-md">
                        <Stars className="w-4 h-4 md:w-5 md:h-5 text-purple-300" />
                    </div>
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200 tracking-[0.2em]">
                            Kader Portalı
                        </h2>
                        <div className="flex gap-2 text-[9px] md:text-[10px] uppercase tracking-widest mt-1 text-white/40">
                            Haftalık Kehanet Kanalı
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={async () => {
                            if (!showHistory && user?.id) {
                                try {
                                    const res = await fetch(getApiUrl(`api/tarot?userId=${user.id}`));
                                    const data = await res.json();
                                    setHistory(data);
                                } catch (e) {
                                    console.error(e);
                                }
                            }
                            setShowHistory(!showHistory);
                        }}
                        className="p-2 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white"
                        title="Geçmiş Fallarım"
                    >
                        <History className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                        <Diamond className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                        <span className="text-sm font-bold text-cyan-100 font-mono">{user?.diamonds || 0}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 md:p-3 hover:bg-white/5 rounded-full transition z-50 border border-white/5 hover:border-white/20 group"
                    >
                        <X className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* History Sidebar/Modal Overlay */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-[#080510]/95 backdrop-blur-xl border-l border-white/10 z-[60] p-6 overflow-y-auto shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-serif text-white">Geçmiş Fallar</h3>
                            <button onClick={() => setShowHistory(false)}><X className="text-white/50 hover:text-white" /></button>
                        </div>
                        <div className="space-y-4">
                            {history.length === 0 ? (
                                <p className="text-white/40 text-sm italic">Henüz kaydedilmiş bir falın yok.</p>
                            ) : (
                                history.map((h: any) => (
                                    <div key={h.id} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition">
                                        <div className="flex justify-between text-xs text-white/40 mb-2">
                                            <span>{new Date(h.createdAt).toLocaleDateString()}</span>
                                            <span className="uppercase">{h.spreadType}</span>
                                        </div>
                                        {/* Handle legacy or new JSON structure */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-14 bg-white/10 rounded overflow-hidden">
                                                {/* Simple placeholder for card image in history */}
                                                {(Array.isArray(h.cards) ? h.cards : []).map((c: any, i: number) => (
                                                    i === 0 && <div key={i} className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/tarot-cards/${c.name}.jpg')` }}></div>
                                                ))}
                                            </div>
                                            <div>
                                                <p className="text-white font-serif text-sm">{(Array.isArray(h.cards) && h.cards[0]?.name) || 'Bilinmiyor'}</p>
                                                <p className="text-white/60 text-xs line-clamp-2 mt-1">{h.interpretation.substring(0, 100)}...</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Stage */}
            <div className="flex-1 relative flex items-center justify-center w-full h-full perspective-1000 overflow-hidden">
                <AnimatePresence mode="wait">

                    {/* 1. INTRO: GLITCH TEXT */}
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, filter: "blur(20px)" }}
                            className="text-center z-10 p-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl w-[90%] max-w-md"
                        >
                            <h3 className="text-xl md:text-3xl font-light text-white mb-2 tracking-widest">
                                BAĞLANTI KURULUYOR
                            </h3>
                            <div className="flex gap-1 justify-center">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>
                        </motion.div>
                    )}

                    {/* 2. SHUFFLING: INTERACTIVE ENERGY CHARGE */}
                    {step === 'shuffling' && (
                        <motion.div
                            key="shuffle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                            className="relative w-full h-full flex flex-col items-center justify-center perspective-1000 z-10"
                            onMouseDown={startShuffling}
                            onMouseUp={stopShuffling}
                            onTouchStart={startShuffling}
                            onTouchEnd={stopShuffling}
                            // Prevent context menu on hold
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {/* Central Deck Pile */}
                            <div
                                className="relative w-48 h-72 md:w-64 md:h-96 cursor-pointer group touch-none select-none"
                                style={{ WebkitTouchCallout: 'none' }}
                            >
                                {/* Glow behind deck */}
                                <div className={`absolute inset-0 bg-purple-500 rounded-xl blur-[50px] transition-all duration-300 ${isHolding ? 'opacity-80 scale-110' : 'opacity-20 scale-90'}`}></div>

                                {/* Stacked Cards Animation */}
                                {shuffledDeck.slice(0, 5).map((card, i) => (
                                    <motion.div
                                        key={i} // Use simple index force re-render
                                        className="absolute inset-0 border border-white/10 rounded-xl bg-gradient-to-br from-[#1a103c] to-[#0f0a1e] shadow-2xl origin-center pointer-events-none"
                                        animate={isHolding ? {
                                            x: Math.random() * 40 - 20,
                                            y: Math.random() * 40 - 20,
                                            rotate: Math.random() * 20 - 10,
                                            scale: 1.05
                                        } : {
                                            x: i * 2,
                                            y: -i * 2,
                                            rotate: i * 1,
                                            scale: 1
                                        }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <TarotCard className="w-full h-full opacity-90" />
                                    </motion.div>
                                ))}

                                {/* Instruction Overlay (fades out when holding) */}
                                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isHolding ? 'opacity-0' : 'opacity-100'}`}>
                                    <div className="bg-black/60 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center">
                                        <Sparkles className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" />
                                        <p className="text-white text-sm font-bold tracking-widest leading-tight">KARTLARI KARIŞTIRMAK İÇİN</p>
                                        <p className="text-white/60 text-xs mt-1">Ekrana Basılı Tut</p>
                                    </div>
                                </div>
                            </div>

                            {/* Energy Bar Container */}
                            <div className="mt-12 w-64 md:w-80 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5 relative shadow-[0_0_20px_black]">
                                {/* Filled Bar */}
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative"
                                    style={{ width: `${energyLevel}%` }}
                                >
                                    {/* Shining effect on bar */}
                                    <div className="absolute top-0 right-0 h-full w-4 bg-white/50 blur-[4px]"></div>
                                </motion.div>
                            </div>

                            <p className="mt-4 text-xs font-mono text-purple-300/60 uppercase tracking-[0.2em] animate-pulse">
                                {energyLevel < 100 ? `${Math.floor(energyLevel)}% KOZMİK ENERJİ` : "ENERJİ MAKSİMUM - BIRAK!"}
                            </p>

                        </motion.div>
                    )}

                    {/* 3. SPREAD: 3D FAN DECK (Yelpaze) */}
                    {step === 'spread' && (
                        <motion.div
                            key="spread"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full h-full flex flex-col items-center justify-start md:justify-center pt-24 md:pt-0"
                        >
                            <div className="absolute top-10 md:top-20 w-full text-center z-20 pointer-events-none px-4">
                                <p className="text-xl md:text-2xl font-light text-white/90 tracking-widest drop-shadow-md">
                                    KOZMİK REHBERLİK
                                </p>
                                <p className="text-[10px] md:text-xs text-purple-300/60 uppercase tracking-[0.2em] mt-2">
                                    {isFree ? 'Kaderin seninle konuşmak istiyor.' : 'Yıldızların rehberliği için bedel ödenmeli.'}
                                </p>
                            </div>

                            <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center mt-4 md:mt-10 scale-[0.6] sm:scale-75 md:scale-90 origin-center perspective-1000">
                                {shuffledDeck.map((card, i) => {
                                    // Circular Layout Math
                                    const total = shuffledDeck.length;
                                    const radius = 180; // Radius of the circle
                                    const angleDeg = (360 / total) * i; // Angle for this card
                                    const angleRad = (angleDeg - 90) * (Math.PI / 180); // Subtract 90 to start from top

                                    // Position
                                    const x = Math.cos(angleRad) * radius;
                                    const y = Math.sin(angleRad) * radius;

                                    // Rotation: Card should point outwards
                                    // AngleDeg is 0 at top (after -90 shift in math), so rotation should match angleDeg
                                    const rotation = angleDeg;

                                    return (
                                        <motion.div
                                            key={card.id}
                                            className="absolute w-28 h-48 sm:w-32 sm:h-56 transform-gpu cursor-pointer"
                                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                            animate={{
                                                x: x,
                                                y: y,
                                                rotate: rotation,
                                                opacity: 1,
                                                scale: 1,
                                                zIndex: i
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 60,
                                                damping: 15,
                                                delay: i * 0.05
                                            }}
                                            whileHover={{
                                                scale: 1.3,
                                                zIndex: 100,
                                                transition: { duration: 0.2 }
                                            }}
                                            onClick={() => checkQuotaAndReveal(card)}
                                        >
                                            <TarotCard className="w-full h-full shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-shadow" />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* 4. REVEALING: SPARKLE EXPLOSION & MYSTICAL TRAIL */}
                    {step === 'revealing' && selectedCard && (
                        <motion.div
                            key="revealing"
                            className="relative flex flex-col items-center justify-center z-50 h-full w-full"
                        >
                            <GalaxyParticles />

                            {/* Spinning Energy Ring */}
                            <motion.div
                                className="absolute w-[500px] h-[500px] rounded-full border border-purple-500/30"
                                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400/50 blur-[2px]" />
                            </motion.div>

                            <motion.div // Card Container
                                initial={{ scale: 0.1, rotateY: 0, y: 300 }}
                                animate={{ scale: 1.2, rotateY: 1080, y: 0 }} // 3 full spins
                                transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }} // Exponential ease
                                className="w-64 h-96 preserve-3d relative z-10"
                            >
                                {/* Magical Trail / Ghost Effect */}
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute inset-0 bg-purple-500/30 rounded-xl blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1] }}
                                        transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                                    />
                                ))}

                                <TarotCard
                                    name={selectedCard.name}
                                    isRevealed={true}
                                    className="w-full h-full shadow-[0_0_100px_rgba(168,85,247,0.8)]"
                                />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ delay: 1.8, duration: 0.8 }}
                                className="mt-12 text-5xl font-bold font-serif text-white tracking-widest text-shadow-glow"
                            >
                                {selectedCard.name}
                            </motion.h2>
                        </motion.div>
                    )}

                    {/* 5. READING: GLASSMORPHIC MODAL */}
                    {step === 'reading' && selectedCard && reading && (
                        <motion.div
                            key="reading"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-50 w-full h-full flex items-center justify-center p-4 md:p-8"
                        >
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => { }} />

                            <div className="relative w-full max-w-4xl h-full max-h-[90vh] md:max-h-full bg-[#080510]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

                                {/* Sol: Kart Görseli */}
                                <div className="p-4 md:p-8 md:w-1/3 flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/20 to-transparent border-b md:border-b-0 md:border-r border-white/5">
                                    <div className="w-32 h-48 md:w-48 md:h-80 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition duration-500">
                                        <TarotCard name={selectedCard.name} isRevealed={true} className="w-full h-full" />
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-serif text-white mt-4 text-center md:hidden">
                                        {selectedCard.name}
                                    </h2>
                                </div>

                                {/* Sağ: Okuma Metni */}
                                <div className="p-6 md:p-8 md:w-2/3 overflow-y-auto custom-scrollbar flex-1">
                                    <div className="space-y-6 md:space-y-8 pb-8">
                                        {/* Yorum */}
                                        <div className="relative">
                                            <Stars className="w-6 h-6 md:w-8 md:h-8 text-purple-500/50 absolute -top-3 -left-3 md:-top-4 md:-left-4" />
                                            <div className="relative">
                                                {/* Reversed Badge */}
                                                {selectedCard.isReversed && (
                                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500/20 border border-red-500/40 text-red-200 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest z-10 font-bold whitespace-nowrap">
                                                        TERS YÖN (BLOKAJ)
                                                    </div>
                                                )}
                                                <h2 className={`text-3xl font-serif text-white mb-4 hidden md:block ${selectedCard.isReversed ? 'text-red-200' : ''}`}>
                                                    {selectedCard.name}
                                                </h2>
                                            </div>
                                            <p className="text-base md:text-lg leading-relaxed font-light text-gray-300 italic pl-4 md:pl-6 border-l-2 border-purple-500/30 whitespace-pre-line">
                                                {reading.interpretation}
                                            </p>
                                        </div>

                                        {/* Olumlama */}
                                        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-4 md:p-6 rounded-2xl border border-indigo-500/20 shadow-inner">
                                            <h4 className="text-[10px] md:text-xs uppercase text-indigo-300 font-bold tracking-widest mb-2 md:mb-3 flex items-center gap-2">
                                                <Sparkles className="w-3 h-3" /> Kozmik Frekans
                                            </h4>
                                            <p className="text-lg md:text-xl text-white font-medium text-center">"{reading.affirmation}"</p>
                                        </div>

                                        {/* Tavsiye */}
                                        <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-white/5 border border-white/5">
                                            <div className="mt-1">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_green]" />
                                            </div>
                                            <div>
                                                <h5 className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mb-1">Eylem Adımı</h5>
                                                <p className="text-sm text-gray-200">{reading.suggestion}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {/* Auto Saved Indicator */}
                                            <div className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white/50 text-xs font-medium uppercase tracking-widest flex items-center justify-center gap-2">
                                                <Lock className="w-3 h-3" />
                                                Günlüğe Kaydedildi
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setStep('shuffling');
                                                    setReading(null);
                                                    setSelectedCard(null);
                                                    setSelectedCards([]);
                                                }}
                                                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group text-sm md:text-base"
                                            >
                                                <RefreshCw className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-180 transition-transform duration-500" />
                                                YENİDEN KART SEÇ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>

                <DiamondConfirmModal
                    isOpen={showPaywall}
                    onClose={() => setShowPaywall(false)}
                    title="Kozmik Bedel"
                    description="Günlük ücretsiz tarot hakkını doldurdun. Yıldızların sırlarını aralamak için 5 Kozmik Işıltı sunmalısın."
                    cost={5}
                    onConfirm={async () => {
                        const canSpend = await spendDiamonds(5, "Ekstra Tarot Falı");
                        if (canSpend) {
                            setShowPaywall(false);
                            if (selectedCard) handlePickCard(selectedCard);
                        } else {
                            // Modal internal logic handles redirect usually
                        }
                    }}
                />
            </div>
        </div>
    );
}
