"use client";

import React, { useState } from 'react';
import { MAJOR_ARCANA, TarotCard } from '@/lib/tarot-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowLeft, X } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import { useCosmicMemory } from '@/hooks/useCosmicMemory';

// --- TİPLER ---
interface ReadingResult {
    interpretation: string;
    affirmation: string;
    suggestion: string;
}

// --- ANA BİLEŞEN ---
export default function TarotView({ onClose }: { onClose: () => void }) {
    const { user } = useUser();
    const [step, setStep] = useState<'shuffle' | 'pick' | 'revealing' | 'reading'>('shuffle');
    const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
    const [reading, setReading] = useState<ReadingResult | null>(null);
    const { saveTarot } = useCosmicMemory();

    const handlePickCard = async (card: TarotCard) => {
        setSelectedCard(card);
        setStep('revealing');

        try {
            // API İsteği
            const response = await fetch('/api/tarot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardName: card.englishName,
                    intention: 'Genel Rehberlik', // İleride dropdown yapılabilir
                    userSign: 'Bilinmiyor' // UserContext'ten burç çekilebilir
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

            // Animasyon için biraz bekle
            setTimeout(() => setStep('reading'), 2000);

        } catch (e) {
            console.error(e);
            alert("Kartlar sessizliğe büründü. Tekrar dene.");
            setStep('shuffle');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-[#1a103c] text-white flex flex-col overflow-hidden">
            {/* Arka Plan Efekti */}
            <div className="absolute inset-0 bg-[url('/img/stars.png')] opacity-30 animate-pulse-slow pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-20 p-6 flex justify-between items-center bg-black/20 backdrop-blur-md">
                <h2 className="text-xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Kozmik Tarot
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-6">
                <AnimatePresence mode="wait">

                    {/* 1. ADIM: KARIŞTIRMA & SEÇİM */}
                    {(step === 'shuffle' || step === 'pick') && (
                        <motion.div
                            key="deck"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center w-full max-w-4xl"
                        >
                            <p className="mb-8 text-manifest-muted font-light text-lg">
                                {step === 'shuffle' ? "Zihnen niyetine odaklan..." : "Bir kart seç..."}
                            </p>

                            {step === 'shuffle' ? (
                                <button
                                    onClick={() => setStep('pick')}
                                    className="px-8 py-4 bg-manifest-primary rounded-full font-medium shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition transform"
                                >
                                    Kartları Karıştır
                                </button>
                            ) : (
                                <div className="flex flex-wrap justify-center gap-2 perspective-1000">
                                    {MAJOR_ARCANA.map((card, i) => (
                                        <motion.div
                                            key={card.id}
                                            initial={{ opacity: 0, y: 50, rotateY: 180 }}
                                            animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            whileHover={{ y: -20, scale: 1.1, zIndex: 10 }}
                                            onClick={() => handlePickCard(card)}
                                            className="w-16 h-28 md:w-24 md:h-40 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg border border-white/10 cursor-pointer shadow-lg relative overflow-hidden group"
                                        >
                                            {/* Kart Arkası Deseni */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50"></div>
                                            <div className="absolute inset-2 border border-white/20 rounded-sm flex items-center justify-center">
                                                <Sparkles className="w-4 h-4 text-white/30 group-hover:text-white/80 transition" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 2. ADIM: AÇILMA EFEKTİ */}
                    {step === 'revealing' && selectedCard && (
                        <motion.div
                            key="revealing"
                            className="perspective-1000"
                        >
                            <motion.div
                                initial={{ rotateY: 0, scale: 0.5 }}
                                animate={{ rotateY: 180, scale: 1.2 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="w-48 h-80 relative transform-style-3d"
                            >
                                {/* Ön Yüz (Kapalı) */}
                                <div className="absolute inset-0 bg-indigo-900 rounded-xl backface-hidden flex items-center justify-center border-2 border-white/20">
                                    <Sparkles className="w-12 h-12 text-white/50 animate-pulse" />
                                </div>
                                {/* Arka Yüz (Açık - Kart Resmi) */}
                                <div className="absolute inset-0 bg-black rounded-xl backface-hidden rotate-y-180 border-2 border-manifest-primary overflow-hidden flex flex-col items-center justify-center bg-white/5">
                                    {/* Placeholder Image */}
                                    <div className="text-4xl mb-4">🃏</div>
                                    <h3 className="text-xl font-serif text-center px-2">{selectedCard.name}</h3>
                                    <p className="text-xs text-manifest-muted mt-2 uppercase tracking-widest">{selectedCard.englishName}</p>
                                </div>
                            </motion.div>
                            <p className="mt-8 text-center text-manifest-muted animate-pulse">Evren mesajını dokuyor...</p>
                        </motion.div>
                    )}

                    {/* 3. ADIM: YORUM */}
                    {step === 'reading' && selectedCard && reading && (
                        <motion.div
                            key="reading"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-lg bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-manifest-primary to-transparent"></div>

                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-serif text-white mb-1">{selectedCard.name}</h2>
                                <div className="flex justify-center gap-2 mt-2">
                                    {selectedCard.keywords.map(k => (
                                        <span key={k} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded-full text-manifest-muted">{k}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6 text-center">
                                <p className="text-lg leading-relaxed font-light text-white/90">
                                    "{reading.interpretation}"
                                </p>

                                <div className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20">
                                    <h4 className="text-xs uppercase text-indigo-300 mb-2 font-bold">Günün Olumlaması</h4>
                                    <p className="italic font-serif text-lg text-indigo-100">"{reading.affirmation}"</p>
                                </div>

                                <div className="text-sm text-manifest-muted">
                                    <span className="block text-xs uppercase mb-1 opacity-50">Öneri</span>
                                    {reading.suggestion}
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setStep('shuffle');
                                    setReading(null);
                                    setSelectedCard(null);
                                }}
                                className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition flex items-center justify-center gap-2"
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
