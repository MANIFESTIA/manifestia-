"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play } from "lucide-react";

interface IntroSplashProps {
    // Logo updated to static Ankh
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
                {/* Background Ambience & Star Tunnel */}
                <div className="absolute inset-0 bg-[#050508]">
                    <StarTunnel isWarping={isExiting} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050508_90%)] z-10" />
                </div>

                <div className="relative z-20 text-center cursor-pointer" onClick={!isExiting && !autoEnter ? handleEnter : undefined}>

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
                            animate={{
                                filter: ["drop-shadow(0 0 10px rgba(251,191,36,0.3))", "drop-shadow(0 0 30px rgba(251,191,36,0.6))", "drop-shadow(0 0 10px rgba(251,191,36,0.3))"]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="absolute -inset-12 bg-indigo-500/20 blur-3xl rounded-full opacity-60 animate-pulse-slow" />
                            <img src="/logo-ankh.png" alt="Manifest Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10" />
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-thin tracking-[0.05em] font-serif text-transparent bg-clip-text bg-gradient-to-t from-[#92563d] to-[#f4d49c] drop-shadow-[0_0_15px_rgba(244,212,156,0.3)]">
                            TheManifest
                        </h1>
                    </motion.div>

                    {/* ... Button ... */}
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

// --- STAR TUNNEL COMPONENT ---
function StarTunnel({ isWarping }: { isWarping: boolean }) {
    // Generate static stars
    const stars = React.useMemo(() => {
        return [...Array(100)].map((_, i) => ({
            id: i,
            x: Math.random() * 100 - 50, // -50 to 50 vw
            y: Math.random() * 100 - 50, // -50 to 50 vh
            size: Math.random() * 2 + 1,
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 2
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden perspective-1000">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: '50%',
                        top: '50%',
                        width: star.size,
                        height: star.size,
                    }}
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0.1
                    }}
                    animate={isWarping ? {
                        x: star.x * 20 + 'vw',
                        y: star.y * 20 + 'vh',
                        opacity: [0, 1, 0],
                        scale: [0.1, 5, 20], // Warp streak effect via scale
                        /* Make them look like lines */
                        width: [star.size, star.size, star.size * 2],
                        height: [star.size, star.size * 10, star.size * 40],
                    } : {
                        x: star.x * 5 + 'vw',
                        y: star.y * 5 + 'vh',
                        opacity: [0, 1, 0],
                        scale: [0.1, 1, 0.1],
                        width: star.size,
                        height: star.size
                    }}
                    transition={{
                        duration: isWarping ? 0.8 : star.duration,
                        repeat: Infinity,
                        ease: isWarping ? "easeIn" : "linear",
                        delay: isWarping ? 0 : star.delay
                    }}
                />
            ))}
        </div>
    );
}
