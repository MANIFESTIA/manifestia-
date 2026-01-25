"use client";

import React, { SetStateAction, Dispatch } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Share2, Sparkles, ShoppingBag } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

export interface AuraAnalysis {
    color: string;
    colorName: string;
    meaning: string;
    suggestion: string;
}

interface AuraResultProps {
    image: string;
    analysis: AuraAnalysis;
    onRetake: () => void;
    onShare?: () => void;
}

export default function AuraResult({ image, analysis, onRetake, onShare }: AuraResultProps) {
    const { user } = useUser();

    return (
        <div className="h-full flex flex-col relative overflow-hidden text-white">
            <div className="flex-1 relative w-full overflow-hidden">
                {/* Orijinal Fotoğraf */}
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${image})` }}
                />

                {/* Aura Filtresi (Overlay) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    className="absolute inset-0 z-10 mix-blend-overlay"
                    style={{
                        background: `radial-gradient(circle at 50% 30%, ${analysis.color} 0%, transparent 70%)`
                    }}
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="absolute inset-0 z-10 mix-blend-color"
                    style={{ backgroundColor: analysis.color }}
                />

                {/* Alt Kısım Gradient Geçişi */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20"></div>

                {/* İçerik Kartı */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-0 left-0 w-full p-6 z-30 space-y-4"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-8 h-8 rounded-full border-2 border-white shadow-[0_0_10px_white]"
                            style={{ backgroundColor: analysis.color }}
                        ></div>
                        <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                            {analysis.colorName}
                        </h2>
                    </div>

                    <p className="text-lg font-light leading-relaxed text-white/90 italic">
                        "{analysis.meaning}"
                    </p>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 mt-4">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-manifest-accent shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xs uppercase tracking-wider text-manifest-muted mb-1">Kozmik Öneri</h3>
                                <p className="text-sm">{analysis.suggestion}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onRetake}
                            className="flex-1 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Tekrar
                        </button>
                        <button
                            // onClick={onShare} 
                            className="flex-1 py-3 bg-manifest-primary text-white rounded-xl hover:bg-manifest-primary/90 transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        >
                            <Share2 className="w-4 h-4" />
                            Paylaş
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// Global CSS'e eklenecek 'animate-scan' için
// @keyframes scan { 0% { top: 0% } 50% { top: 100% } 100% { top: 0% } }
