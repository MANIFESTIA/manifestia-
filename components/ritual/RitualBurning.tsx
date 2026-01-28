"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Send, Sparkles, MoveRight } from 'lucide-react';

export default function RitualBurning({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<'intro' | 'writing' | 'burning' | 'completed'>('intro');
    const [intention, setIntention] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-close handling with clean up
    useEffect(() => {
        if (step === 'completed') {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // 3 seconds wait time
            return () => clearTimeout(timer);
        }
    }, [step, onClose]);

    const handleBurn = () => {
        setStep('burning');
        // Burning animation duration
        setTimeout(() => {
            setStep('completed');
        }, 4000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            {/* Close button - hidden during completion for immersion, but available before */}
            {step !== 'completed' && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition z-50"
                >
                    <X className="w-6 h-6 text-white" />
                </button>
            )}

            <AnimatePresence mode="wait">
                {/* INTRO */}
                {step === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center max-w-md"
                    >
                        <div className="w-20 h-20 mx-auto bg-orange-500/20 rounded-full flex items-center justify-center mb-6">
                            <Flame className="w-10 h-10 text-orange-400 animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-serif text-white mb-4">Niyet Yakma Ritüeli</h2>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            Yüklerinden kurtulmak veya yeni bir dileği evrene göndermek için kadim ateşin gücünü kullan.
                            Yazdıkların küle dönüşecek, enerjisi evrene yayılacak.
                        </p>
                        <button
                            onClick={() => setStep('writing')}
                            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Ritüele Başla
                        </button>
                    </motion.div>
                )}

                {/* WRITING PHASE */}
                {step === 'writing' && (
                    <motion.div
                        key="writing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-lg"
                    >
                        <h3 className="text-center text-white/60 mb-6 uppercase tracking-widest text-sm">Niyetini Kağıda Dök</h3>

                        {/* Parchment Paper */}
                        <div className="bg-[#f4e4bc] text-black/80 p-8 rounded-sm shadow-[0_0_50px_rgba(251,146,60,0.2)] relative overflow-hidden min-h-[400px] flex flex-col">
                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>

                            <textarea
                                ref={textAreaRef}
                                value={intention}
                                onChange={(e) => setIntention(e.target.value)}
                                placeholder="Buraya niyetini, dileğini veya bırakmak istediğin yükü yaz..."
                                className="w-full flex-1 bg-transparent border-none resize-none outline-none font-serif text-xl leading-relaxed placeholder:text-black/30 z-10"
                                autoFocus
                            />

                            <div className="mt-4 flex justify-end z-10">
                                <button
                                    onClick={handleBurn}
                                    disabled={!intention.trim()}
                                    className="flex items-center gap-2 bg-orange-900/10 hover:bg-orange-900/20 text-orange-900 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <span>Ateşe Ver</span>
                                    <MoveRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* BURNING PHASE */}
                {step === 'burning' && (
                    <motion.div
                        key="burning"
                        className="relative w-full max-w-lg h-[600px] flex items-center justify-center"
                    >
                        {/* The Paper being burnt */}
                        <div className="relative w-full h-[400px] flex items-center justify-center">
                            {/* Paper with ClipPath Animation */}
                            <motion.div
                                className="absolute inset-0 bg-[#f4e4bc] text-black/80 p-8 rounded-sm overflow-hidden flex flex-col items-center justify-center shadow-2xl origin-bottom"
                                initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                                animate={{
                                    clipPath: [
                                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                        "polygon(0% 0%, 100% 0%, 100% 80%, 0% 90%)",
                                        "polygon(5% 0%, 95% 0%, 100% 40%, 0% 50%)",
                                        "polygon(20% 0%, 80% 0%, 90% 10%, 10% 10%)",
                                        "polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%)"
                                    ],
                                    opacity: [1, 1, 1, 0]
                                }}
                                transition={{ duration: 4, ease: "easeInOut", times: [0, 0.3, 0.6, 0.9, 1] }}
                            >
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
                                <p className="font-serif text-xl text-center line-clamp-6 relative z-10">{intention}</p>
                                {/* Burn Line Glow */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-orange-600 to-transparent blur-md"
                                    animate={{ bottom: ["0%", "100%"] }}
                                    transition={{ duration: 4, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* Flame Effect Overlay */}
                            <motion.div
                                className="absolute bottom-0 w-full flex justify-center items-end pointer-events-none"
                                animate={{ height: ["0%", "120%"], opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 4, ease: "easeInOut" }}
                            >
                                <div className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent blur-xl opacity-90 mix-blend-screen"></div>
                            </motion.div>

                            {/* Ash Falling Effect */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[...Array(100)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute bg-gray-400 rounded-full"
                                        initial={{
                                            x: Math.random() * 400 - 200,
                                            y: Math.random() * 200,
                                            opacity: 0,
                                            scale: 0
                                        }}
                                        animate={{
                                            y: [null, 800],
                                            opacity: [0, 1, 0],
                                            scale: [0, Math.random() * 0.8 + 0.2, 0],
                                            rotate: Math.random() * 360
                                        }}
                                        transition={{
                                            delay: 2.5 + Math.random() * 1.5,
                                            duration: 2.5 + Math.random(),
                                            ease: "easeIn"
                                        }}
                                        style={{
                                            width: Math.random() * 8 + 2,
                                            height: Math.random() * 8 + 2,
                                            filter: 'blur(1px)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* COMPLETED PHASE - Centered Message */}
                {step === 'completed' && (
                    <motion.div
                        key="completed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-4"
                    >
                        {/* More Ash for the finale */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={`final-ash-${i}`}
                                    className="absolute bg-gray-500 rounded-full opacity-50"
                                    initial={{ x: Math.random() * window.innerWidth, y: -20 }}
                                    animate={{ y: window.innerHeight + 20 }}
                                    transition={{ duration: 3, ease: "linear", delay: Math.random() * 1 }}
                                    style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2 }}
                                />
                            ))}
                        </div>

                        <div className="text-center relative z-20">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="w-24 h-24 mx-auto bg-orange-500/10 rounded-full flex items-center justify-center mb-8 border border-orange-500/20 shadow-[0_0_50px_rgba(249,115,22,0.3)]"
                            >
                                <Sparkles className="w-12 h-12 text-orange-200" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl font-serif text-white font-medium tracking-widest leading-tight mb-4"
                            >
                                Evren Dileklerini<br />Aldı...
                            </motion.h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
