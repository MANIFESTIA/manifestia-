"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { DailyEnergyPalette } from '@/lib/dailyEnergy';

interface EnergyRingProps {
    percentage: number;
    energyPalette?: DailyEnergyPalette;
}

const DEFAULT_PALETTE: DailyEnergyPalette = {
    name: 'Bolluk Işığı', element: 'Altın',
    primary: '#FACC15', secondary: '#EAB308', glowColor: 'rgba(250, 204, 21, 0.6)',
};

export default function EnergyRing({ percentage, energyPalette = DEFAULT_PALETTE }: EnergyRingProps) {
    const radius = 85; // Slightly larger for cleaner look
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ background: `linear-gradient(to top right, ${energyPalette.primary}33, ${energyPalette.secondary}33)` }}></div>

            {/* SVG Ring Container */}
            <svg className="w-full h-full transform -rotate-90">
                <defs>
                    {/* Pink-Purple Mix Gradient for Outer Ring */}
                    <linearGradient id="pinkPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EC4899" /> {/* Pink */}
                        <stop offset="50%" stopColor="#D946EF" /> {/* Fuchsia */}
                        <stop offset="100%" stopColor="#A855F7" /> {/* Purple */}
                    </linearGradient>

                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={energyPalette.primary} />
                        <stop offset="50%" stopColor={energyPalette.secondary} />
                        <stop offset="100%" stopColor={energyPalette.primary} />
                    </linearGradient>
                </defs>

                {/* --- TRACK LAYER (Background Ring) --- */}
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="8"
                    fill="transparent"
                    style={{
                        filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))"
                    }}
                />
                <circle
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="#EC4899"
                    strokeWidth="1"
                    fill="transparent"
                    className="opacity-40"
                />

                {/* --- NEW OUTER PINK-PURPLE RING (Animated Glow) --- */}
                <motion.circle
                    animate={{ opacity: [0.6, 1, 0.6], strokeWidth: [1.5, 2.5, 1.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    cx="160"
                    cy="160"
                    r={radius + 14}
                    stroke="url(#pinkPurple)"
                    strokeWidth="2"
                    fill="transparent"
                    style={{
                        // Intense Shining Glow (Living Effect)
                        filter: "drop-shadow(0 0 6px rgba(236, 72, 153, 1)) drop-shadow(0 0 16px rgba(168, 85, 247, 1))"
                    }}
                />

                {/* --- PROGRESS LAYER (Yellow Ring) --- */}

                {/* Glow Underlay */}
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke={energyPalette.primary}
                    strokeWidth="14"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    className="blur-[8px] opacity-60"
                />

                {/* Main Visible Bar */}
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="url(#energyGradient)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    style={{
                        filter: `drop-shadow(0 0 4px ${energyPalette.glowColor})`
                    }}
                />

                {/* Glassy Top Reflection */}
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="160"
                    cy="160"
                    r={radius}
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    className="opacity-40"
                />
            </svg>

            {/* Content Centered */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none z-10">
                <span className="text-xs font-bold text-white/60 uppercase tracking-[0.2em] mb-2 drop-shadow-md">
                    Günlük Enerji
                </span>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="text-6xl font-serif text-white" style={{ textShadow: `0 0 15px ${energyPalette.glowColor}` }}>
                        {percentage}
                    </span>
                    <span className="text-2xl ml-1 font-light" style={{ color: energyPalette.primary }}>%</span>
                </motion.div>
            </div>
        </div>
    );
}
