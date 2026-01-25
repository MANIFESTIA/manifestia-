"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface EnergyRingProps {
    percentage: number;
}

export default function EnergyRing({ percentage }: EnergyRingProps) {
    // Çevre hesaplama (r=80 ise 2*pi*r)
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Rengi yüzdesine göre belirle
    let strokeColor = "#A855F7"; // Default Purple
    let glowColor = "rgba(168, 85, 247, 0.6)";

    if (percentage >= 80) {
        strokeColor = "#FDB931"; // Gold
        glowColor = "rgba(253, 185, 49, 0.6)";
    } else if (percentage >= 50) {
        strokeColor = "#A855F7"; // Purple
        glowColor = "rgba(168, 85, 247, 0.6)";
    } else {
        strokeColor = "#EC4899"; // Pink
        glowColor = "rgba(236, 72, 153, 0.6)";
    }

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Arka Plan Glow Efekti - Referans görseldeki mor aura */}
            <div className="absolute inset-0 bg-purple-900/30 rounded-full blur-2xl animate-pulse-slow"></div>

            {/* SVG Ring Container */}
            <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                {/* Track (Arka plandaki sönük halka) */}
                <circle
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="12"
                    fill="transparent"
                />

                {/* Progress Bar (Dolu Kısım) */}
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="128"
                    cy="128"
                    r={radius}
                    stroke={strokeColor}
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    style={{
                        filter: `drop-shadow(0 0 10px ${glowColor})`
                    }}
                />
            </svg>

            {/* İçerik */}
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-sm font-medium text-manifest-muted uppercase tracking-widest mb-1 drop-shadow-md">Günlük Enerji</span>
                <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] font-serif"
                >
                    {percentage}%
                </motion.span>
            </div>

            {/* Hareketli Parçacıklar (Süsleme) */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
        </div>
    );
}
