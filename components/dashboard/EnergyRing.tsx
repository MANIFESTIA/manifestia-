"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface EnergyRingProps {
    percentage: number;
}

export default function EnergyRing({ percentage }: EnergyRingProps) {
    const radius = 85; // Slightly larger for cleaner look
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Soft Ambient Background Ligh (Pinkish/Yellow mix) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>

            {/* SVG Ring Container */}
            <svg className="w-full h-full transform -rotate-90">
                <defs>
                    {/* Pink-Purple Mix Gradient for Outer Ring */}
                    <linearGradient id="pinkPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EC4899" /> {/* Pink */}
                        <stop offset="50%" stopColor="#D946EF" /> {/* Fuchsia */}
                        <stop offset="100%" stopColor="#A855F7" /> {/* Purple */}
                    </linearGradient>

                    {/* Yellow/Gold Gradient for Progress */}
                    <linearGradient id="yellowNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FEF08A" />
                        <stop offset="50%" stopColor="#FACC15" />
                        <stop offset="100%" stopColor="#EAB308" />
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
                    stroke="#FACC15"
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
                    stroke="url(#yellowNeon)"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    style={{
                        filter: "drop-shadow(0 0 4px rgba(250, 204, 21, 1))"
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
                    <span className="text-6xl font-serif text-white drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                        {percentage}
                    </span>
                    <span className="text-2xl text-yellow-200 ml-1 font-light">%</span>
                </motion.div>
            </div>
        </div>
    );
}
