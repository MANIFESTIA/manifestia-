"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Moon, Sun, Cloud, Eye } from 'lucide-react';

interface TarotCardProps {
    name?: string;
    isRevealed?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    index?: number; // For animation delay
}

export default function TarotCard({ name, isRevealed = false, onClick, className = "", style, index = 0 }: TarotCardProps) {

    // Kart arkası deseni için basit SVG
    const CardBack = () => (
        <div className="w-full h-full bg-[#120B2E] rounded-xl border-2 border-[#FFE87C]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(110,5,255,0.3)]">
            {/* Arka plan dokusu */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

            {/* Geometrik Çerçeve */}
            <div className="absolute inset-2 border border-[#FFE87C]/20 rounded-lg"></div>
            <div className="absolute inset-3 border border-indigo-500/30 rounded-lg"></div>

            {/* Merkez İkon */}
            <div className="relative z-10 w-16 h-16 rounded-full border-2 border-[#FFE87C]/50 flex items-center justify-center bg-[#1a103c]/80 shadow-[0_0_15px_rgba(255,232,124,0.2)]">
                <Eye className="w-8 h-8 text-[#FFE87C]" />
            </div>

            {/* Dekoratif Yıldızlar */}
            <Sparkles className="absolute top-4 left-4 w-4 h-4 text-purple-400 animate-pulse" />
            <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-pink-400 animate-pulse delay-700" />
        </div>
    );

    // Kart Önü (Neon Stil)
    const CardFront = () => (
        <div className="w-full h-full bg-[#0a051e] rounded-xl border-[3px] border-[#D4AF37] flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            {/* Altın Parıltı Efekti */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent"></div>

            {/* İç Çerçeve (Neon) */}
            <div className="absolute inset-3 border-2 border-purple-500/50 rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.5)_inset]"></div>

            {/* İçerik */}
            <div className="flex-1 flex items-center justify-center relative z-10 p-6">
                {/* Buraya her kart için özel ikon gelebilir, şimdilik generic */}
                <div className="text-[#D4AF37] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
                    {name?.includes("Sun") || name?.includes("Güneş") ? <Sun className="w-20 h-20" /> :
                        name?.includes("Moon") || name?.includes("Ay") ? <Moon className="w-20 h-20" /> :
                            <Star className="w-20 h-20" />}
                </div>
            </div>

            {/* İsim Alanı */}
            <div className="h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center pb-4">
                <div className="border-t border-b border-[#D4AF37] px-6 py-1 bg-black/40 backdrop-blur-sm">
                    <span className="text-[#D4AF37] font-serif tracking-[0.2em] font-bold text-sm uppercase text-shadow-glow">
                        {name || "THE MYSTERY"}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            onClick={onClick}
            className={`relative preserve-3d cursor-pointer ${className}`}
            style={style}
            initial={false}
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
        >
            <div className="absolute inset-0 backface-hidden">
                <CardBack />
            </div>
            <div className="absolute inset-0 backface-hidden rotate-y-180">
                <CardFront />
            </div>
        </motion.div>
    );
}
