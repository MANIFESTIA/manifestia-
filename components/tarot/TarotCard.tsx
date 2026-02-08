"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, Star, Moon, Sun,
    Hexagon, Disc, Zap, Infinity as InfinityIcon,
    Footprints, Crown, Shield, Book, Heart, Sword,
    Flame, Lightbulb, RefreshCw, Scale, Anchor,
    Skull, Droplet, Ghost, Building, Bell, Globe
} from 'lucide-react';
import { MAJOR_ARCANA } from '@/lib/tarot-data';

interface TarotCardProps {
    name?: string;
    isRevealed?: boolean;
    isReversed?: boolean; // New prop
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function TarotCard({
    name,
    isRevealed = false,
    isReversed = false,
    onClick,
    className = "",
    style
}: TarotCardProps) {

    // Kart verisini bul (Renk ve ID için)
    const cardData = MAJOR_ARCANA.find(c => c.name === name || c.englishName === name);
    const themeColor = cardData?.themeColor || "#D4AF37";

    // --- ÖN YÜZ: DYNAMIC CUSTOM IMAGES Or ICONS ---
    const CardFront = () => {
        const n = name?.toLocaleLowerCase('tr-TR') || "";

        // Hangi kartlar için görselimiz var?
        const customImages: Record<string, string> = {
            // 0 - The Fool
            "mecnun": "/tarot-cards/the-fool.png?v=4", "deli": "/tarot-cards/the-fool.png?v=4", "fool": "/tarot-cards/the-fool.png?v=4",
            // 1 - The Magician
            "büyücü": "/tarot-cards/the-magician.png?v=4", "magician": "/tarot-cards/the-magician.png?v=4",
            // 2 - The High Priestess
            "azize": "/tarot-cards/the-high-priestess.png?v=4", "priestess": "/tarot-cards/the-high-priestess.png?v=4",
            // 3 - The Empress
            "imparatoriçe": "/tarot-cards/the-empress.png?v=4", "empress": "/tarot-cards/the-empress.png?v=4",
            // 4 - The Emperor
            "imparator": "/tarot-cards/the-emperor.png?v=4", "emperor": "/tarot-cards/the-emperor.png?v=4",
            // 5 - The Hierophant
            "aziz": "/tarot-cards/the-hierophant.png?v=4", "hierophant": "/tarot-cards/the-hierophant.png?v=4",
            // 6 - The Lovers
            "aşıklar": "/tarot-cards/the-lovers.png?v=4", "lovers": "/tarot-cards/the-lovers.png?v=4",
            // 7 - The Chariot
            "araba": "/tarot-cards/the-chariot.png?v=4", "chariot": "/tarot-cards/the-chariot.png?v=4",
            // 8 - Strength (Aslan = Strength)
            "güç": "/tarot-cards/strength.png?v=4", "strength": "/tarot-cards/strength.png?v=4", "aslan": "/tarot-cards/strength.png?v=4",
            // 9 - The Hermit
            "ermiş": "/tarot-cards/the-hermit.png?v=4", "hermit": "/tarot-cards/the-hermit.png?v=4",
            // 10 - Wheel of Fortune
            "kader": "/tarot-cards/wheel-of-fortune.png?v=4", "çark": "/tarot-cards/wheel-of-fortune.png?v=4", "wheel": "/tarot-cards/wheel-of-fortune.png?v=4",
            // 11 - Justice
            "adalet": "/tarot-cards/justice.png?v=4", "justice": "/tarot-cards/justice.png?v=4",
            // 12 - The Hanged Man
            "asılan": "/tarot-cards/the-hanged-man.png?v=4", "hanged": "/tarot-cards/the-hanged-man.png?v=4",
            // 13 - Death
            "ölüm": "/tarot-cards/death.png?v=4", "death": "/tarot-cards/death.png?v=4",
            // 14 - Temperance
            "denge": "/tarot-cards/temperance.png?v=4", "temperance": "/tarot-cards/temperance.png?v=4",
            // 15 - The Devil
            "şeytan": "/tarot-cards/the-devil.png?v=4", "devil": "/tarot-cards/the-devil.png?v=4",
            // 16 - The Tower
            "yıkılan kule": "/tarot-cards/the-tower.png?v=4", "kule": "/tarot-cards/the-tower.png?v=4", "tower": "/tarot-cards/the-tower.png?v=4",
            // 17 - The Star
            "yıldız": "/tarot-cards/the-star-full.png?v=5", "star": "/tarot-cards/the-star-full.png?v=5",
            // 18 - The Moon
            "ay": "/tarot-cards/the-moon.png?v=4", "moon": "/tarot-cards/the-moon.png?v=4",
            // 19 - The Sun
            "güneş": "/tarot-cards/the-sun.png?v=4", "sun": "/tarot-cards/the-sun.png?v=4",
            // 20 - Judgement
            "mahkeme": "/tarot-cards/judgement.png?v=4", "judgement": "/tarot-cards/judgement.png?v=4",
            // 21 - The World
            "dünya": "/tarot-cards/the-world.png?v=4", "world": "/tarot-cards/the-world.png?v=4"
        };

        // Bu kartın görseli var mı? (İsim içinde geçen anahtar kelimeye bak)
        // Check for EXACT match first, then strict includes.
        // Sort keys by length descending to ensure "imparatoriçe" is checked before "imparator"
        const sortedKeys = Object.keys(customImages).sort((a, b) => b.length - a.length);
        const imageKey = sortedKeys.find(key => n.includes(key));

        const imageSrc = imageKey ? customImages[imageKey] : null;

        const getIcon = () => {
            // Use safer checks for Turkish characters
            if (n.includes("fool") || n.includes("mecnun")) return <Footprints {...props} />;
            if (n.includes("magician") || n.includes("büyücü")) return <Zap {...props} />;
            if (n.includes("priestess") || n.includes("azize")) return <Moon {...props} />;
            if (n.includes("empress") || n.includes("imparatoriçe")) return <Crown {...props} className="w-24 h-24" />;
            if (n.includes("emperor") || n.includes("imparator")) return <Shield {...props} />;
            if (n.includes("hierophant") || n.includes("aziz")) return <Book {...props} />;
            if (n.includes("lovers") || n.includes("aşıklar")) return <Heart {...props} />;
            if (n.includes("chariot") || n.includes("araba")) return <Sword {...props} className="rotate-45" />;
            if (n.includes("strength") || n.includes("güç")) return <Flame {...props} />;
            if (n.includes("hermit") || n.includes("ermiş")) return <Lightbulb {...props} />;
            if (n.includes("wheel") || n.includes("çark")) return <RefreshCw {...props} />;
            if (n.includes("justice") || n.includes("adalet")) return <Scale {...props} />;
            if (n.includes("hanged") || n.includes("asılan")) return <Anchor {...props} className="rotate-180" />;
            if (n.includes("death") || n.includes("ölüm")) return <Skull {...props} />;
            if (n.includes("temperance") || n.includes("denge")) return <Droplet {...props} />;
            if (n.includes("devil") || n.includes("şeytan")) return <Ghost {...props} />;
            if (n.includes("tower") || n.includes("kule")) return <Building {...props} />;
            if (n.includes("star") || n.includes("yıldız")) return <Star {...props} />;
            if (n.includes("moon") || n.includes("ay")) return <Moon {...props} />;
            if (n.includes("sun") || n.includes("güneş")) return <Sun {...props} />;
            if (n.includes("judgement") || n.includes("mahkeme")) return <Bell {...props} />;
            if (n.includes("world") || n.includes("dünya")) return <Globe {...props} />;

            return <Hexagon {...props} />;
        };

        const props = {
            className: "w-24 h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]",
            style: { color: themeColor, filter: `drop-shadow(0 0 10px ${themeColor})` }
        };

        return (
            <div className={`w-full h-full bg-[#080510] rounded-xl relative flex flex-col overflow-hidden shadow-inner ${imageSrc ? '' : 'border-2'}`}
                style={{
                    borderColor: imageSrc ? 'transparent' : themeColor,
                    transform: isReversed ? 'rotate(180deg)' : 'none'
                }}>

                {imageSrc ? (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <img
                            src={imageSrc}
                            alt={name}
                            className="w-full h-full object-cover scale-105"
                            draggable="false"
                            onContextMenu={(e) => e.preventDefault()}
                        />
                    </div>
                ) : (
                    <>
                        {/* İkon Arkası Efektler (Sadece resim yoksa) */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${themeColor}, transparent 70%)` }} />
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        <div className="flex-1 flex items-center justify-center relative z-10 p-4 pb-16">
                            <div className="absolute w-32 h-32 rounded-full blur-3xl animate-pulse-slow opacity-20" style={{ backgroundColor: themeColor }} />
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {getIcon()}
                            </motion.div>
                        </div>
                    </>
                )}

                {/* Köşe Süsleri (Her zaman) */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 z-30 mix-blend-soft-light" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 z-30 mix-blend-soft-light" />
                <div className="absolute bottom-16 left-2 w-2 h-2 border-b border-l border-white/20 z-30 mix-blend-soft-light" />
                <div className="absolute bottom-16 right-2 w-2 h-2 border-b border-r border-white/20 z-30 mix-blend-soft-light" />

                {/* Alt Metin Alanı */}
                <div
                    className="absolute bottom-0 inset-x-0 h-16 flex flex-col items-center justify-center border-t border-white/10 bg-black/80 backdrop-blur-md z-30"
                >
                    <span className="font-serif font-bold text-lg uppercase tracking-widest drop-shadow-md text-center px-2 leading-none mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        {name || "UNKNOWN"}
                    </span>
                    <span className="text-[9px] text-white/50 uppercase tracking-[0.25em]">
                        {cardData?.englishName || "ARCANA"}
                    </span>
                </div>


                {/* ADAPTIVE PREMIUM FRAMES (CSS/SVG) */}
                {(() => {
                    const lowerName = n.toLowerCase();

                    // --- THE STAR (Startlight & Cosmic Flow) ---
                    if (lowerName.includes("star") || lowerName.includes("yıldız")) {
                        return (
                            <div className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden">
                                {/* Soft Inner Atmosphere */}
                                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_40px_rgba(34,211,238,0.2)] mix-blend-screen" />

                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 500" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="star-frame-grad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                                            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.6" />
                                        </linearGradient>
                                        <filter id="star-glow" height="150%" width="150%" x="-25%" y="-25%">
                                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Main Continuous Elegant Border */}
                                    <rect
                                        x="3" y="3"
                                        width="294" height="494"
                                        rx="12" ry="12"
                                        stroke="url(#star-frame-grad)"
                                        strokeWidth="1.5"
                                        fill="none"
                                        filter="url(#star-glow)"
                                    />

                                    {/* Inner Delicate Line (Cosmic Thread) */}
                                    <rect
                                        x="10" y="10"
                                        width="280" height="480"
                                        rx="8" ry="8"
                                        stroke="white"
                                        strokeWidth="0.5"
                                        strokeOpacity="0.4"
                                        fill="none"
                                    />

                                    {/* Celtic/Cosmic Knots or Stars at midpoints */}
                                    {/* Top Star */}
                                    <path d="M150 0 L153 6 L159 9 L153 12 L150 18 L147 12 L141 9 L147 6 Z" fill="#fff" filter="url(#star-glow)" opacity="0.9" />
                                    {/* Bottom Star */}
                                    <path d="M150 482 L153 488 L159 491 L153 494 L150 500 L147 494 L141 491 L147 488 Z" fill="#fff" filter="url(#star-glow)" opacity="0.9" />

                                </svg>
                            </div>
                        );
                    }

                    // --- DEATH (Gotik & Dikenli) ---
                    if (lowerName.includes("death") || lowerName.includes("ölüm")) {
                        return (
                            <div className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden">
                                <div className="absolute inset-0 border-[3px] border-slate-800/60 rounded-xl shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 500" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="death-grad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#334155" />
                                            <stop offset="50%" stopColor="#0f172a" />
                                            <stop offset="100%" stopColor="#334155" />
                                        </linearGradient>
                                    </defs>
                                    {/* Dark Thorns/Vines */}
                                    <path d="M0,60 C10,30 30,10 60,0" stroke="#1e293b" strokeWidth="6" fill="none" />
                                    <path d="M300,60 C290,30 270,10 240,0" stroke="#1e293b" strokeWidth="6" fill="none" />
                                    <path d="M0,440 C10,470 30,490 60,500" stroke="#1e293b" strokeWidth="6" fill="none" />
                                    <path d="M300,440 C290,470 270,490 240,500" stroke="#1e293b" strokeWidth="6" fill="none" />
                                    {/* Inner Detail */}
                                    <path d="M15,15 L285,15 L285,485 L15,485 Z" stroke="url(#death-grad)" strokeWidth="2" fill="none" />
                                    <circle cx="15" cy="15" r="4" fill="#ef4444" opacity="0.4" />
                                    <circle cx="285" cy="15" r="4" fill="#ef4444" opacity="0.4" />
                                </svg>
                            </div>
                        );
                    }

                    // --- TEMPERANCE (Altın & Akışkan) ---
                    if (lowerName.includes("temperance") || lowerName.includes("denge")) {
                        return (
                            <div className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden">
                                <div className="absolute inset-0 border-[2px] border-amber-400/20 rounded-xl shadow-[inset_0_0_15px_rgba(251,191,36,0.2)]" />
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 500" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="gold-flow" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#fcd34d" />
                                            <stop offset="50%" stopColor="#d97706" />
                                            <stop offset="100%" stopColor="#fffbeb" />
                                        </linearGradient>
                                    </defs>
                                    {/* Fluid Corners */}
                                    <path d="M0,40 Q0,0 40,0 L80,0" stroke="url(#gold-flow)" strokeWidth="3" fill="none" />
                                    <path d="M300,40 Q300,0 260,0 L220,0" stroke="url(#gold-flow)" strokeWidth="3" fill="none" />
                                    <path d="M0,460 Q0,500 40,500 L80,500" stroke="url(#gold-flow)" strokeWidth="3" fill="none" />
                                    <path d="M300,460 Q300,500 260,500 L220,500" stroke="url(#gold-flow)" strokeWidth="3" fill="none" />
                                    {/* Inner decorative line */}
                                    <rect x="12" y="12" width="276" height="476" rx="8" stroke="url(#gold-flow)" strokeWidth="1" fill="none" strokeOpacity="0.5" />
                                </svg>
                            </div>
                        );
                    }

                    // --- DEFAULT GOLD FRAME (Other Cards) ---
                    // The user asked to apply a nice frame to ALL cards eventually. For now, let's keep others simple or apply a default.
                    // Let's apply a subtle default gold border to others if desired, or skip. User said "dediklerim için".

                    return null;
                })()}

            </div>
        );
    };

    return (
        <motion.div
            onClick={onClick}
            className={`relative cursor-pointer group ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                ...style
            }}
            initial={false}
            animate={{ rotateY: isRevealed ? 180 : 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 40, damping: 10 }}
            whileHover={!isRevealed ? { scale: 1.05, y: -10 } : {}}
            title={name}
        >
            <div
                className="absolute inset-0 shadow-2xl rounded-xl bg-[#05030a]"
                style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    zIndex: isRevealed ? 0 : 2
                }}
            >
                <div className="w-full h-full bg-[#05030a] rounded-xl overflow-hidden shadow-inner flex items-center justify-center pointer-events-none">
                    <img
                        src="/tarot-back-v2.png"
                        alt="Tarot Back"
                        className="w-full h-full object-fill"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </div>
            </div>
            <div
                className="absolute inset-0 shadow-2xl rounded-xl bg-[#080510]"
                style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    zIndex: isRevealed ? 2 : 0
                }}
            >
                {isRevealed && <CardFront />}
            </div>
        </motion.div >
    );
}
