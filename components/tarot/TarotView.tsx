"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MAJOR_ARCANA, TarotCard as TarotCardType } from '@/lib/tarot-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, X, Stars, Diamond } from 'lucide-react';
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

    // Paywall State
    const [showPaywall, setShowPaywall] = useState(false);
    const { updateUser } = useUser();

    // Daily Free Check
    const today = new Date().toLocaleDateString('tr-TR');
    const isFree = user?.lastTarotDate !== today;

    // Check Free Status on Reveal attempt
    const checkQuotaAndReveal = (card: TarotCardType) => {
        if (isFree) {
            // Free reading
            handlePickCard(card);
            updateUser({ lastTarotDate: today });
        } else {
            // Need to pay
            // Show Modal or check directly if we want
            setShowPaywall(true);
            setSelectedCard(card);
        }
    };

    const handleSaveWithPaywall = () => {
        if (!reading || !selectedCard) return;

        // Cost: 3 Diamonds
        if (spendDiamonds(3, "Tarot Mühürleme")) {
            saveTarot({
                cardName: selectedCard.name,
                interpretation: reading.interpretation,
                affirmation: reading.affirmation,
                suggestion: reading.suggestion
            });
            alert("Kaderin mühürlendi ve günlüğüne kaydedildi.");
        } else {
            setShowPaywall(true); // Show insufficient funds modal if spend returns false (which it handles internally mostly, but let's be safe)
            // Actually spendDiamonds returns false if insufficient. 
            // We should check balance or just let the modal handle the confirmation.
            // Better UX: Show Modal FIRST, then spend on confirm.
        }
    };

    // Shuffling Sesi efekti için ref (İleride eklenebilir)

    // Otomatik Akış
    useEffect(() => {
        if (step === 'intro') {
            const timer = setTimeout(() => setStep('shuffling'), 2000);
            return () => clearTimeout(timer);
        }
        if (step === 'shuffling') {
            // Shuffle Logic (Fisher-Yates)
            const shuffled = [...MAJOR_ARCANA];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setShuffledDeck(shuffled);

            const timer = setTimeout(() => setStep('spread'), 3500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handlePickCard = async (card: TarotCardType) => {
        setSelectedCard(card);
        setStep('revealing');

        try {
            // API İsteği
            const response = await fetch('/api/tarot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardName: card.englishName,
                    intention: 'Genel Rehberlik',
                    userSign: user?.sign || 'Bilinmiyor'
                })
            });

            if (!response.ok) throw new Error('Yorum alınamadı');

            const result = await response.json();
            setReading(result);

            // Auto-Save (Included in Service)
            saveTarot({
                cardName: card.name,
                interpretation: result.interpretation,
                affirmation: result.affirmation,
                suggestion: result.suggestion
            });

            setTimeout(() => setStep('reading'), 3000); // Reveal animasyonu süresi

        } catch (e) {
            console.error("Tarot API Hatası:", e);
            // Fallback (Yedek) Cevap - Hata olsa bile akış bozulmasın
            const fallbackResult = {
                interpretation: "Yıldızların mesajı şu an sisli, ancak içindeki rehber sana en doğru yolu gösterecektir. Kartın enerjisine odaklan ve kalbinin sesini dinle.",
                affirmation: "Benim gücüm içimdeki sessizlikte saklı.",
                suggestion: "Biraz sessiz kalıp niyetine odaklanman iyi gelebilir."
            };
            setReading(fallbackResult);
            // Yine de kaydetmeyi deneyebiliriz veya geçebiliriz
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
                        <p className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest hidden sm:block">Yıldızların fısıltısı, kartların sessizliğinde yankılanıyor.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
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

                    {/* 2. SHUFFLING: COSMIC VORTEX (Optimized) */}
                    {step === 'shuffling' && (
                        <motion.div
                            key="shuffle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative w-full h-full flex items-center justify-center perspective-1000"
                        >
                            {/* Simplified Vortex - Reduced count and complexity */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-32 h-48 border border-white/10 rounded-xl bg-gradient-to-br from-[#1a103c] to-[#0f0a1e]"
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        scale: 0.8,
                                        opacity: 0,
                                        rotate: 0
                                    }}
                                    animate={{
                                        x: [
                                            Math.sin(i * 60) * 80,
                                            Math.cos(i * 60) * 120,
                                            Math.sin(i * 60) * 80
                                        ],
                                        y: [
                                            Math.cos(i * 60) * 80,
                                            Math.sin(i * 60) * 120,
                                            Math.cos(i * 60) * 80
                                        ],
                                        rotate: [0, 180, 360],
                                        scale: [0.8, 1, 0.8],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.2
                                    }}
                                >
                                    <TarotCard className="w-full h-full shadow-[0_0_15px_rgba(168,85,247,0.3)] opacity-90" />
                                </motion.div>
                            ))}

                            {/* Central Energy Core - Static Blur */}
                            <div className="absolute w-24 h-24 bg-white/10 blur-[40px] rounded-full animate-pulse"></div>

                            <div className="absolute bottom-20 md:bottom-32 w-full text-center z-20">
                                <p className="text-xl font-serif text-white/80 animate-pulse tracking-[0.2em] font-light">
                                    KARTLAR KARIŞTIRILIYOR
                                </p>
                            </div>
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
                                    {isFree ? 'GÜNLÜK ÜCRETSİZ FAL' : 'KOZMİK BAĞLANTI (5 💎)'}
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

                    {/* 4. REVEALING: SPARKLE EXPLOSION */}
                    {step === 'revealing' && selectedCard && (
                        <motion.div
                            key="revealing"
                            className="relative flex flex-col items-center justify-center z-50 h-full w-full"
                        >
                            <GalaxyParticles />

                            <motion.div // Card Container
                                initial={{ scale: 0.5, rotateY: 0, y: 100 }}
                                animate={{ scale: 1.2, rotateY: 180, y: 0 }}
                                transition={{ duration: 2, ease: [0.19, 1, 0.22, 1] }} // Exponential ease
                                className="w-64 h-96 preserve-3d relative z-10"
                            >
                                <TarotCard
                                    name={selectedCard.name}
                                    isRevealed={true}
                                    className="w-full h-full shadow-[0_0_100px_rgba(168,85,247,0.6)]"
                                />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
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
                                            <h2 className="text-3xl font-serif text-white mb-4 hidden md:block">
                                                {selectedCard.name}
                                            </h2>
                                            <p className="text-base md:text-lg leading-relaxed font-light text-gray-300 italic pl-4 md:pl-6 border-l-2 border-purple-500/30">
                                                "{reading.interpretation}"
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
                                                }}
                                                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group text-sm md:text-base"
                                            >
                                                <RefreshCw className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-180 transition-transform duration-500" />
                                                YENİDEN BAĞLAN
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
                    onConfirm={() => {
                        if (spendDiamonds(5, "Ekstra Tarot Falı")) {
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
