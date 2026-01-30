"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";

interface IntroSplashProps {
    onComplete: () => void;
    autoEnter?: boolean;
}

export default function IntroSplash({ onComplete, autoEnter = false }: IntroSplashProps) {
    const [isExiting, setIsExiting] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Attempt auto-play on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().catch(e => console.log("Auto-play blocked:", e));
        }

        // Auto Enter Logic for Returning Users
        if (autoEnter) {
            const timer = setTimeout(() => {
                handleEnter();
            }, 100); // Almost immediate start of exit
            return () => clearTimeout(timer);
        }
    }, [autoEnter]);

    const handleEnter = () => {
        setIsExiting(true);
        if (audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
        // Wait for exit animation to finish
        // If autoEnter, faster exit (700ms), else normal (2000ms)
        setTimeout(onComplete, autoEnter ? 700 : 2000);
    };

    const containerVariants = {
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
        },
        exit: {
            opacity: 0,
            scale: 1.5, // Dramatically zoom into the "portal"
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
                transition={{ duration: autoEnter ? 0.6 : 1.5, ease: "easeInOut" }} // Fast exit for autoEnter
            >
                {/* Background Ambience */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#050508] to-[#050508]" />

                <div className="relative z-10 text-center cursor-pointer" onClick={!isExiting && !autoEnter ? handleEnter : undefined}>

                    {/* Logo / Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="mb-12 flex flex-col items-center justify-center gap-6"
                    >
                        {/* Logo */}
                        <motion.div
                            className="relative"
                        >
                            <div className="absolute -inset-8 bg-indigo-500/20 blur-3xl rounded-full opacity-60 animate-pulse" />
                            <img src="/logo-ankh.png" alt="Manifest Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_25px_rgba(251,191,36,0.5)] relative z-10" />
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-thin tracking-[0.05em] font-serif text-transparent bg-clip-text bg-gradient-to-t from-[#92563d] to-[#f4d49c] drop-shadow-[0_0_15px_rgba(244,212,156,0.3)]">
                            TheManifest
                        </h1>
                    </motion.div>

                    {/* Show Button ONLY if NOT auto-entering */}
                    {!autoEnter && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isExiting ? 0 : 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center gap-3"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(88, 28, 135, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-14 py-4 rounded-full relative overflow-hidden group border border-white/10 bg-gradient-to-r from-[#1a0b2e] via-[#4c1d95] to-[#1a0b2e] bg-[length:200%_auto] animate-gradient-slow transition-all duration-300 hover:border-white/30 shadow-lg"
                            >
                                {/* Shine Effect */}
                                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-shine" />

                                <span className="relative z-10 flex items-center gap-4 text-base tracking-[0.3em] font-medium text-white/90 group-hover:text-white transition-colors uppercase drop-shadow-md">
                                    GİRİŞ YAP
                                    <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                                        <Play className="w-3.5 h-3.5 fill-white" />
                                    </span>
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
