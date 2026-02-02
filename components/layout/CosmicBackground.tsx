"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STAR_COUNT = 100;
const SHOOTING_STAR_INTERVAL = 4000;

export default function CosmicBackground() {
    const [stars, setStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);
    const [shootingStar, setShootingStar] = useState<{ id: number; style: React.CSSProperties } | null>(null);

    // Initial Star Generation
    useEffect(() => {
        // Generate stars only on client side to avoid hydration mismatch
        const newStars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
            id: i,
            style: {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                scale: Math.random() * 0.5 + 0.5,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
            } as React.CSSProperties
        }));
        setStars(newStars);
    }, []);

    // Shooting Star Logic
    useEffect(() => {
        const interval = setInterval(() => {
            const startX = Math.random() * 100;
            const startY = Math.random() * 50; // Start from top half

            setShootingStar({
                id: Date.now(),
                style: {
                    top: `${startY}%`,
                    left: `${startX}%`,
                    animation: 'shoot 1s linear forwards'
                }
            });

            // Cleanup
            setTimeout(() => setShootingStar(null), 1000);

        }, SHOOTING_STAR_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full bg-[#030205] overflow-hidden -z-10 perspective-1000">
            <style jsx>{`
                @keyframes shoot {
                    0% { transform: translate(0, 0) rotate(45deg) scale(0); opacity: 1; }
                    10% { transform: translate(0, 0) rotate(45deg) scale(1); opacity: 1; }
                    100% { transform: translate(200px, 200px) rotate(45deg) scale(0); opacity: 0; }
                }
            `}</style>

            {/* --- Deep Atmosphere Layers --- */}

            {/* Base Deep Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-40" />

            {/* Drifting Nebula 1 (Blue/Cyan) */}
            <motion.div
                animate={{
                    x: [-50, 50, -50],
                    y: [-20, 20, -20],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] left-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
            />

            {/* Drifting Nebula 2 (Purple/Pink) */}
            <motion.div
                animate={{
                    x: [50, -50, 50],
                    y: [20, -20, 20],
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-[20%] right-[10%] w-[800px] h-[800px] bg-purple-600/15 rounded-full blur-[140px] mix-blend-screen"
            />

            {/* Drifting Nebula 3 (Gold/Amber - subtle) */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] mix-blend-screen"
            />

            {/* --- Star Field --- */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse shadow-[0_0_2px_#fff]"
                    style={star.style}
                />
            ))}

            {/* --- Shooting Star --- */}
            {shootingStar && (
                <div
                    className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                    style={{
                        ...shootingStar.style,
                        opacity: 0, // Handled by @keyframe shoot
                        filter: 'drop-shadow(0 0 5px white)'
                    }}
                />
            )}

            {/* --- Fog/Mist Overlay --- */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Vignette for cinematic feel */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#000000_100%)] opacity-80" />
        </div>
    );
}
