"use client";

import React, { useState, useEffect } from 'react';
import { MAJOR_ARCANA, TarotCard as TarotCardType } from '@/lib/tarot-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, X, Stars } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import { useCosmicMemory } from '@/hooks/useCosmicMemory';
import TarotCard from './TarotCard';

// --- TİPLER ---
interface ReadingResult {
    interpretation: string;
    affirmation: string;
    suggestion: string;
}

// --- PARTICLE EFFECT (GALAXY SPIRAL) ---
const GalaxyParticles = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 2, 0],
                        rotate: [0, 360],
                        x: Math.cos(i * 18) * 150, // Spiral yarıçap
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
    const { user } = useUser();
    const [step, setStep] = useState<'intro' | 'shuffling' | 'spread' | 'revealing' | 'reading'>('intro');
    const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);
    const [reading, setReading] = useState<ReadingResult | null>(null);
    const { saveTarot } = useCosmicMemory();

    // Otomatik Akış: Intro -> Shuffle -> Spread
    useEffect(() => {
        if (step === 'intro') {
            const timer = setTimeout(() => setStep('shuffling'), 1500);
            return () => clearTimeout(timer);
        }
        if (step === 'shuffling') {
            const timer = setTimeout(() => setStep('spread'), 3000); // 3 sn karıştırma
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handlePickCard = async (card: TarotCardType) => {
        setSelectedCard(card);
        setStep('revealing');
        // Scroll to top
        window.scrollTo(0, 0);

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

            // HAFIZAYA KAYDET
            saveTarot({
                cardName: card.name,
                interpretation: result.interpretation,
                affirmation: result.affirmation,
                suggestion: result.suggestion
            });

            // Animasyon sonrası okuma ekranına geç
            setTimeout(() => setStep('reading'), 2500);

        } catch (e) {
            console.error(e);
            alert("Kartlar sessizliğe büründü. Tekrar dene.");
            setStep('spread');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#05030a] text-white flex flex-col overflow-hidden">
            {/* Arka Plan Efekti (Deep Space) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-50 p-6 flex justify-between items-center bg-transparent">
                <div className="flex items-center gap-2">
                    <Stars className="w-5 h-5 text-amber-300" />
                    <h2 className="text-xl font-serif text-amber-100 tracking-widest text-shadow-glow">
                        TAROT
                    </h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition z-50">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center w-full h-full overflow-hidden perspective-1000">
                <AnimatePresence mode="wait">

                    {/* 1. ADIM: INTRO (GİRİŞ METNİ) */}
                    {step === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center z-10"
                        >
                            <h3 className="text-2xl font-serif text-white/80">Kartlar Enerjine Uyumlanıyor...</h3>
                        </motion.div>
                    )}

                    {/* 2. ADIM: KARIŞTIRMA (SHUFFLING ANIMATION) */}
                    {step === 'shuffling' && (
                        <motion.div
                            key="shuffle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
                            className="relative w-48 h-72"
                        >
                            {/* Deste Animasyonu: Kartlar üst üste biniyor ve titriyor */}
                            {MAJOR_ARCANA.slice(0, 5).map((card, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0"
                                    animate={{
                                        x: [0, -10, 10, -5, 5, 0],
                                        y: [0, -5, 5, 0],
                                        rotate: [0, -2, 2, -1, 1, 0],
                                        zIndex: i
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                        delay: i * 0.1
                                    }}
                                >
                                    <TarotCard className="w-full h-full shadow-2xl" />
                                </motion.div>
                            ))}
                            <div className="absolute -bottom-20 w-full text-center">
                                <p className="text-sm uppercase tracking-widest text-[#D4AF37] animate-pulse">Karıştırılıyor</p>
                            </div>
                        </motion.div>
                    )}

                    {/* 3. ADIM: DAĞITMA VE SEÇİM (SPREAD) */}
                    {step === 'spread' && (
                        <motion.div
                            key="spread"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative w-full h-full flex items-center justify-center overflow-x-auto overflow-y-hidden"
                        >
                            <div className="absolute top-10 w-full text-center z-20 pointer-events-none">
                                <p className="text-lg font-serif italic text-white/70">Bir kart seç ve kaderini dinle</p>
                            </div>

                            {/* Circular Layout Container */}
                            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
                                {MAJOR_ARCANA.map((card, i) => {
                                    // Circular Positioning Math
                                    const total = MAJOR_ARCANA.length;
                                    const angle = (360 / total) * i;
                                    const radius = 180; // Mobilde daha dar, masaüstünde geniş olabilir

                                    return (
                                        <motion.div
                                            key={card.id}
                                            className="absolute w-20 h-32 md:w-24 md:h-40 origin-bottom"
                                            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
                                            animate={{
                                                rotate: angle,
                                                x: Math.cos((angle - 90) * (Math.PI / 180)) * radius,
                                                y: Math.sin((angle - 90) * (Math.PI / 180)) * radius,
                                                opacity: 1
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 60,
                                                damping: 15,
                                                delay: i * 0.05
                                            }}
                                            whileHover={{ scale: 1.2, zIndex: 50, y: -20, boxShadow: "0 0 20px #D4AF37" }}
                                            onClick={() => handlePickCard(card)}
                                        >
                                            <TarotCard className="w-full h-full" />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* 4. ADIM: AÇILMA (REVEAL) */}
                    {step === 'revealing' && selectedCard && (
                        <motion.div
                            key="revealing"
                            className="relative flex flex-col items-center justify-center z-50"
                        >
                            <GalaxyParticles />

                            <motion.div
                                initial={{ scale: 0.1, rotateY: 0 }}
                                animate={{ scale: 1.5, rotateY: 180 }}
                                transition={{ duration: 2, ease: "circOut" }}
                                className="w-48 h-80 preserve-3d relative"
                            >
                                <TarotCard
                                    name={selectedCard.name}
                                    isRevealed={true}
                                    className="w-full h-full"
                                />
                            </motion.div>
                        </motion.div>
                    )}

                    {/* 5. ADIM: YORUM (READING) */}
                    {step === 'reading' && selectedCard && reading && (
                        <motion.div
                            key="reading"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-lg bg-[#0F0821]/90 backdrop-blur-xl rounded-3xl border border-[#D4AF37]/30 p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-20 overflow-y-auto max-h-[80vh] hide-scrollbar mx-4"
                        >
                            {/* Kart Görseli (Küçük) */}
                            <div className="flex justify-center -mt-16 mb-4">
                                <motion.div
                                    className="w-24 h-40 shadow-2xl"
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                >
                                    <TarotCard name={selectedCard.name} isRevealed={true} className="w-full h-full" />
                                </motion.div>
                            </div>

                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-serif text-[#D4AF37] mb-1 drop-shadow-md">{selectedCard.name}</h2>
                                <p className="text-xs text-white/40 uppercase tracking-widest">{selectedCard.englishName}</p>
                            </div>

                            <div className="space-y-6 text-center">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-lg leading-relaxed font-light text-white/90 font-serif italic">
                                        "{reading.interpretation}"
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 border border-purple-500/20">
                                    <h4 className="text-[10px] uppercase text-purple-300 mb-2 font-bold tracking-widest">Günün Olumlaması</h4>
                                    <p className="text-xl text-white font-medium text-shadow-sm">"{reading.affirmation}"</p>
                                </div>

                                <div className="text-sm text-manifest-muted flex flex-col items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                                    <span>{reading.suggestion}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setStep('shuffling');
                                    setReading(null);
                                    setSelectedCard(null);
                                }}
                                className="mt-8 w-full py-3 bg-[#D4AF37] hover:bg-[#FDB931] text-black font-bold rounded-xl transition shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Yeni Kart Seç
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
