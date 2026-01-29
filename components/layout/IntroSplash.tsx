"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";

interface IntroSplashProps {
    onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
    const [isExiting, setIsExiting] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Attempt auto-play on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Auto-play blocked by browser policy:", e));
        }
    }, []);

    const handleEnter = () => {
        setIsExiting(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
        // Wait for animation/sound to finish partly before unmounting
        // Extended to 6000ms to allow full audio playback while dashboard is visible
        setTimeout(onComplete, 6000);
    };

    const containerVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            pointerEvents: "none" as const
        }
    };

    return (
        <>
            {/* Audio stays mounted even after visual exit */}
            <audio ref={audioRef} src="/sounds/intro.ogg" preload="auto" />

            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050508] text-white overflow-hidden origin-center"
                initial="visible"
                animate={isExiting ? "exit" : "visible"}
                variants={containerVariants}
                transition={{ duration: 2.0, ease: "easeInOut" }}
            >
                {/* Background Ambience */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#050508] to-[#050508]" />

                <div className="relative z-10 text-center cursor-pointer" onClick={!isExiting ? handleEnter : undefined}>
                    {/* Logo / Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        whileHover={!isExiting ? { scale: 1.05 } : {}}
                        className="mb-8 relative"
                    >
                        <div className="absolute -inset-8 bg-indigo-500/10 blur-3xl rounded-full opacity-50 animate-pulse" />
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-[0.15em] md:tracking-[0.2em] font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-indigo-200 to-indigo-900 drop-shadow-[0_0_15px_rgba(165,180,252,0.3)] max-w-[95vw] mx-auto break-words">
                            THEMANIFEST
                        </h1>
                        <motion.div
                            className="absolute -right-2 -top-2 md:-right-4 md:-top-4"
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-amber-200" />
                        </motion.div>
                    </motion.div>

                    {/* Prompt - Fades out quickly on exit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExiting ? 0 : 0.6 }}
                        transition={{ duration: 0.5 }} // Faster exit for button
                        className="flex flex-col items-center gap-3"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 md:px-8 md:py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs md:text-sm tracking-widest uppercase hover:bg-white/10 hover:border-indigo-500/30 transition-all group"
                        >
                            <span className="flex items-center gap-2">
                                GİRİŞ YAP <Play className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current group-hover:text-indigo-300" />
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
}
