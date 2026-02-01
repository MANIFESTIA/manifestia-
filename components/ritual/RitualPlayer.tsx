"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, Check, X } from 'lucide-react';
import { Ritual, RitualStep } from '@/lib/rituals';

interface RitualPlayerProps {
    ritual: Ritual;
    onComplete: () => void;
    onExit: () => void;
}

export default function RitualPlayer({ ritual, onComplete, onExit }: RitualPlayerProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(ritual.steps?.[0]?.duration || 0);
    const [isActive, setIsActive] = useState(false); // Start paused so user can prepare
    const [isCompleted, setIsCompleted] = useState(false);

    const steps = ritual.steps || [];
    const currentStep = steps[currentStepIndex];

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0 && !isCompleted) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            handleNextStep();
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft, isCompleted]);

    const handleNextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
            setTimeLeft(steps[currentStepIndex + 1].duration);
        } else {
            setIsActive(false);
            setIsCompleted(true);
        }
    };

    const togglePlay = () => setIsActive(!isActive);

    // Animation Variants
    const getAnimationVariant = (type: RitualStep['animation']) => {
        switch (type) {
            case 'breathe':
                return {
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                    transition: { duration: 4, repeat: Infinity }
                };
            case 'focus':
                return {
                    scale: [1, 1.05, 1],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
                    transition: { duration: 3, repeat: Infinity }
                };
            case 'stars':
                return {
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                    transition: { duration: 10, repeat: Infinity, ease: "linear" as const }
                };
            default:
                return {};
        }
    };

    if (isCompleted) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-xl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                >
                    <Check className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-serif text-white mb-2">Ritüel Tamamlandı</h2>
                <p className="text-white/60 mb-8">+ {ritual.xpReward} XP ve Ruhsal Dinginlik Kazandın</p>
                <button
                    onClick={onComplete}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition border border-white/10"
                >
                    Ruhunu Serbest Bırak
                </button>
            </div>
        );
    }

    if (!steps.length) return <div className="text-white">Hata: Ritüel adımları bulunamadı.</div>;

    return (
        <div className="relative h-full flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Ambient Background Glow based on Ritual Color */}
            <div className={`absolute inset-0 bg-gradient-to-b ${ritual.color} opacity-20 z-0`} />

            {/* Exit Button */}
            <button
                onClick={onExit}
                className="absolute top-6 right-6 z-50 p-2 bg-black/20 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Central Animation Focus */}
            <div className="relative z-10 w-full max-w-md aspect-square flex items-center justify-center">
                <motion.div
                    animate={getAnimationVariant(currentStep.animation)}
                    className={`w-64 h-64 rounded-full bg-gradient-to-br ${ritual.color} blur-3xl opacity-30 absolute`}
                />

                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentStepIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className="text-2xl md:text-3xl font-serif text-center text-white/90 leading-relaxed relative z-20 px-4"
                    >
                        "{currentStep.text}"
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Progress & Controls */}
            <div className="absolute bottom-12 w-full max-w-md px-6 z-20 flex flex-col gap-6">
                {/* Timer Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentStep.duration - timeLeft) / currentStep.duration) * 100}%` }}
                        transition={{ duration: 1, ease: "linear" }}
                        className={`h-full bg-gradient-to-r ${ritual.color}`}
                    />
                </div>

                <div className="flex items-center justify-between text-white/50 text-sm">
                    <span>Adım {currentStepIndex + 1} / {steps.length}</span>
                    <span>{timeLeft}s</span>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center gap-6">
                    <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                    </button>

                    <button
                        onClick={handleNextStep}
                        className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
                    >
                        <SkipForward className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
