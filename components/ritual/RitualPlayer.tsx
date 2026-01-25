"use client";

import React, { useState, useEffect, useRef } from 'react';
import { RITUALS, RitualDefinition, RitualStep } from '@/lib/rituals';
import { useVoice } from '@/hooks/useVoice';
import { useUser } from '@/lib/UserContext';
import { Gamification } from '@/lib/gamification';
import { X, Play, SkipForward, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RitualPlayerProps {
    ritualId: string;
    onClose: () => void;
}

export default function RitualPlayer({ ritualId, onClose }: RitualPlayerProps) {
    const { user } = useUser();
    const { speak, stop: stopVoice, isPlaying: isVoicePlaying } = useVoice();
    const [ritual, setRitual] = useState<RitualDefinition | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Audio Refs for Ambient
    const ambientRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const found = RITUALS.find(r => r.id === ritualId);
        if (found) setRitual(found);
    }, [ritualId]);

    // Ambient Müziği Başlat
    useEffect(() => {
        if (isStarted && ritual) {
            // Placeholder: Eğer dosya yoksa hata vermesin diye try-catch veya kontrol
            // Gerçekte: ambientRef.current = new Audio(ritual.frequencyUrl);
            // ambientRef.current.loop = true;
            // ambientRef.current.play().catch(e => console.log("Ambient play failed (user interaction needed)", e));

            // Şimdilik sessiz modda simüle ediyoruz
        }
        return () => {
            if (ambientRef.current) {
                ambientRef.current.pause();
                ambientRef.current = null;
            }
            stopVoice();
        };
    }, [isStarted, ritual, stopVoice]);

    // Adım Değişimi
    useEffect(() => {
        if (isStarted && ritual && currentStepIndex < ritual.steps.length) {
            const step = ritual.steps[currentStepIndex];

            // Metni İşle (İsim değiştirme vs)
            const processedText = step.text.replace('{name}', user?.name || 'Ruh');

            // Biraz bekle sonra konuş
            const timeout = setTimeout(() => {
                speak(processedText, 'COSMIC_SAGE'); // Varsayılan ses
            }, 1000);

            return () => clearTimeout(timeout);
        }

    }, [currentStepIndex, isStarted, ritual, user?.name, speak]);

    const handleNext = () => {
        stopVoice();
        if (ritual && currentStepIndex < ritual.steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        if (ritual) {
            Gamification.completeRitual(ritual.id);
            setIsCompleted(true);
            stopVoice();
        }
    };

    if (!ritual) return null;

    const currentStep = ritual.steps[currentStepIndex];

    return (
        <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Arka Plan Ritüel Modu */}
            <div className={`absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] transition-opacity duration-1000 ${isStarted ? 'opacity-100' : 'opacity-90'}`}>
                {/* Yıldız Efektleri */}
                <div className="absolute inset-0 bg-[url('/img/stars.png')] opacity-20 animate-pulse-slow"></div>
            </div>

            {/* Kapat Butonu */}
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 z-50">
                <X className="w-6 h-6" />
            </button>

            {!isStarted ? (
                // --- BAŞLANGIÇ EKRANI ---
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8 z-10 max-w-md"
                >
                    <div className="w-32 h-32 rounded-full border-2 border-manifest-primary/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-black/20 backdrop-blur-md">
                        <Play className="w-12 h-12 text-manifest-primary ml-1" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif mb-2">{ritual.title}</h2>
                        <p className="text-manifest-muted text-lg">{ritual.frequencyName}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                        <p className="italic text-white/80">"{ritual.intention}"</p>
                    </div>
                    <button
                        onClick={() => setIsStarted(true)}
                        className="w-full py-4 bg-manifest-primary text-white rounded-full font-medium text-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all"
                    >
                        Ritüeli Başlat
                    </button>
                    <p className="text-xs text-white/40 uppercase tracking-widest">Kulaklık Önerilir</p>
                </motion.div>

            ) : !isCompleted ? (
                // --- RİTÜEL AKIŞI ---
                <motion.div
                    key="step-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full z-10 w-full max-w-lg text-center"
                >
                    {/* Nefes/Odak Halkası */}
                    <div className="relative mb-12">
                        <div className="w-64 h-64 rounded-full border border-manifest-primary/20 absolute top-0 left-0 animate-ping opacity-20"></div>
                        <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-manifest-primary/10 to-blue-500/10 backdrop-blur-3xl animate-breathe flex items-center justify-center border border-white/10">
                            <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                {currentStep.id === 'preparation' && '🧘'}
                                {currentStep.id === 'cleansing' && '✨'}
                                {currentStep.id === 'charging' && '⚡'}
                                {currentStep.id === 'sealing' && '🔒'}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-xl font-medium text-manifest-primary mb-4 uppercase tracking-wider">
                        {currentStep.title}
                    </h3>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentStepIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-2xl font-serif leading-relaxed text-white/90 min-h-[120px]"
                        >
                            {currentStep.text.replace('{name}', user?.name || '')}
                        </motion.p>
                    </AnimatePresence>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 h-1 rounded-full mt-12 mb-8 overflow-hidden">
                        <motion.div
                            className="bg-manifest-primary h-full"
                            initial={{ width: `${(currentStepIndex / ritual.steps.length) * 100}%` }}
                            animate={{ width: `${((currentStepIndex + 1) / ritual.steps.length) * 100}%` }}
                        />
                    </div>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                    >
                        <SkipForward className="w-5 h-5" />
                        <span className="text-sm">Sonraki Adım</span>
                    </button>

                </motion.div>

            ) : (
                // --- SONUÇ / ÖDÜL EKRANI ---
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center z-10 space-y-6 max-w-md"
                >
                    <div className="w-40 h-40 mx-auto relative">
                        <div className="absolute inset-0 bg-yellow-400/20 blur-[50px] rounded-full animate-pulse-slow"></div>
                        <Award className="w-full h-full text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                    </div>

                    <h2 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                        Mühürlendi!
                    </h2>
                    <p className="text-lg text-white/80">
                        "{ritual.intention}" niyeti artık seninle.
                        21 günlük zincirin: <span className="text-manifest-primary font-bold">{Gamification.getProgress().currentStreak}. Gün</span>
                    </p>

                    <div className="bg-white/10 rounded-xl p-4 mt-8">
                        <p className="text-sm text-manifest-muted mb-2">Nasıl Hissediyorsun?</p>
                        <div className="flex justify-center gap-4 text-2xl">
                            <button className="hover:scale-125 transition">😌</button>
                            <button className="hover:scale-125 transition">✨</button>
                            <button className="hover:scale-125 transition">🥺</button>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-full font-medium mt-4 transition"
                    >
                        Sanctuary'ye Dön
                    </button>
                </motion.div>
            )}
        </div>
    );
}
