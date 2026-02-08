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


                {/* UNIFIED PREMIUM FRAME SYSTEM */}
                {(() => {
                    const lowerName = n.toLowerCase();

                    // Configuration for Card Themes
                    const cardThemes: { [key: string]: { stops: [string, string, string], glow: string, accent: string, bottomOpacity: number } } = {
                        // 0. The Fool (Mecnun) - Cyan/Yellow/White
                        fool: { stops: ["#22d3ee", "#facc15", "#ffffff"], glow: "#22d3ee", accent: "#facc15", bottomOpacity: 0.6 },
                        mecnun: { stops: ["#22d3ee", "#facc15", "#ffffff"], glow: "#22d3ee", accent: "#facc15", bottomOpacity: 0.6 },

                        // 1. The Magician (Büyücü) - Gold/Magenta/Violet
                        magician: { stops: ["#fbbf24", "#d946ef", "#8b5cf6"], glow: "#fbbf24", accent: "#d946ef", bottomOpacity: 0.8 },
                        büyücü: { stops: ["#fbbf24", "#d946ef", "#8b5cf6"], glow: "#fbbf24", accent: "#d946ef", bottomOpacity: 0.8 },

                        // 2. The High Priestess (Azize) - Blue/Silver/Purple
                        priestess: { stops: ["#3b82f6", "#e2e8f0", "#a855f7"], glow: "#3b82f6", accent: "#e2e8f0", bottomOpacity: 0.7 },
                        azize: { stops: ["#3b82f6", "#e2e8f0", "#a855f7"], glow: "#3b82f6", accent: "#e2e8f0", bottomOpacity: 0.7 },

                        // 3. The Empress (İmparatoriçe) - Rose/Deep Pink/Emerald
                        empress: { stops: ["#fbcfe8", "#f472b6", "#34d399"], glow: "#f472b6", accent: "#34d399", bottomOpacity: 0.7 },
                        imparatoriçe: { stops: ["#fbcfe8", "#f472b6", "#34d399"], glow: "#f472b6", accent: "#34d399", bottomOpacity: 0.7 },

                        // 4. The Emperor (İmparator) - Red/Orange/Slate
                        emperor: { stops: ["#ef4444", "#f97316", "#374151"], glow: "#ef4444", accent: "#f97316", bottomOpacity: 0.8 },
                        imparator: { stops: ["#ef4444", "#f97316", "#374151"], glow: "#ef4444", accent: "#f97316", bottomOpacity: 0.8 },

                        // 5. The Hierophant (Aziz) - Light Gold/Bronze/Dark Wood
                        hierophant: { stops: ["#fcd34d", "#b45309", "#78350f"], glow: "#fcd34d", accent: "#b45309", bottomOpacity: 0.9 },
                        aziz: { stops: ["#fcd34d", "#b45309", "#78350f"], glow: "#fcd34d", accent: "#b45309", bottomOpacity: 0.9 },

                        // 6. The Lovers (Aşıklar) - Neon Hot Pink/Magenta
                        lovers: { stops: ["#ff66c4", "#ff0080", "#ff00ff"], glow: "#ff0080", accent: "#ff00ff", bottomOpacity: 0.9 },
                        aşıklar: { stops: ["#ff66c4", "#ff0080", "#ff00ff"], glow: "#ff0080", accent: "#ff00ff", bottomOpacity: 0.9 },

                        // 7. The Chariot (Araba) - Cyan/Silver/Blue
                        chariot: { stops: ["#22d3ee", "#e2e8f0", "#3b82f6"], glow: "#06b6d4", accent: "#22d3ee", bottomOpacity: 0.8 },
                        araba: { stops: ["#22d3ee", "#e2e8f0", "#3b82f6"], glow: "#06b6d4", accent: "#22d3ee", bottomOpacity: 0.8 },

                        // 8. Strength (Güç) - Amber/Light Red/Gold
                        strength: { stops: ["#f59e0b", "#fca5a5", "#fbbf24"], glow: "#f59e0b", accent: "#fbbf24", bottomOpacity: 0.8 },
                        güç: { stops: ["#f59e0b", "#fca5a5", "#fbbf24"], glow: "#f59e0b", accent: "#fbbf24", bottomOpacity: 0.8 },
                        aslan: { stops: ["#f59e0b", "#fca5a5", "#fbbf24"], glow: "#f59e0b", accent: "#fbbf24", bottomOpacity: 0.8 },

                        // 9. The Hermit (Ermiş) - Indigo/Blue/White (Lantern light)
                        hermit: { stops: ["#6366f1", "#1e1b4b", "#ffffff"], glow: "#6366f1", accent: "#ffffff", bottomOpacity: 0.8 },
                        ermiş: { stops: ["#6366f1", "#1e1b4b", "#ffffff"], glow: "#6366f1", accent: "#ffffff", bottomOpacity: 0.8 },

                        // 10. Wheel of Fortune (Kader Çarkı) - High Visibility GOLD
                        wheel: { stops: ["#fcd34d", "#f59e0b", "#fcd34d"], glow: "#f59e0b", accent: "#ffffff", bottomOpacity: 1.0 },
                        kader: { stops: ["#fcd34d", "#f59e0b", "#fcd34d"], glow: "#f59e0b", accent: "#ffffff", bottomOpacity: 1.0 },

                        // 11. Justice (Adalet) - Silver/Blue/Red
                        justice: { stops: ["#94a3b8", "#3b82f6", "#ef4444"], glow: "#94a3b8", accent: "#ef4444", bottomOpacity: 0.8 },
                        adalet: { stops: ["#94a3b8", "#3b82f6", "#ef4444"], glow: "#94a3b8", accent: "#ef4444", bottomOpacity: 0.8 },

                        // 12. The Hanged Man (Asılan Adam) - Teal/Purple/Blue
                        hanged: { stops: ["#14b8a6", "#7c3aed", "#3b82f6"], glow: "#14b8a6", accent: "#7c3aed", bottomOpacity: 0.7 },
                        asılan: { stops: ["#14b8a6", "#7c3aed", "#3b82f6"], glow: "#14b8a6", accent: "#7c3aed", bottomOpacity: 0.7 },

                        // 13. Death (Ölüm) - White/Silver Spectral (No Red)
                        death: { stops: ["#e2e8f0", "#ffffff", "#94a3b8"], glow: "#ffffff", accent: "#e2e8f0", bottomOpacity: 0.8 },
                        ölüm: { stops: ["#e2e8f0", "#ffffff", "#94a3b8"], glow: "#ffffff", accent: "#e2e8f0", bottomOpacity: 0.8 },

                        // 14. Temperance (Denge) - Bright Yellow/Gold (Requested)
                        temperance: { stops: ["#fef08a", "#facc15", "#eab308"], glow: "#facc15", accent: "#fef08a", bottomOpacity: 1.0 },
                        denge: { stops: ["#fef08a", "#facc15", "#eab308"], glow: "#facc15", accent: "#fef08a", bottomOpacity: 1.0 },

                        // 15. The Devil (Şeytan) - PURE PURPLE (Requested)
                        devil: { stops: ["#d8b4fe", "#a855f7", "#581c87"], glow: "#a855f7", accent: "#d8b4fe", bottomOpacity: 1.0 },
                        şeytan: { stops: ["#d8b4fe", "#a855f7", "#581c87"], glow: "#a855f7", accent: "#d8b4fe", bottomOpacity: 1.0 },

                        // 16. The Tower (Yıkılan Kule) - Shattered Crystal & Lightning (White/Cyan)
                        tower: { stops: ["#ffffff", "#22d3ee", "#94a3b8"], glow: "#ffffff", accent: "#22d3ee", bottomOpacity: 1.0 },
                        kule: { stops: ["#ffffff", "#22d3ee", "#94a3b8"], glow: "#ffffff", accent: "#22d3ee", bottomOpacity: 1.0 },

                        // 17. The Star (Yıldız) - Cyan/White/Indigo (Updated to new frame)
                        star: { stops: ["#22d3ee", "#ffffff", "#6366f1"], glow: "#22d3ee", accent: "#ffffff", bottomOpacity: 0.6 },
                        yıldız: { stops: ["#22d3ee", "#ffffff", "#6366f1"], glow: "#22d3ee", accent: "#ffffff", bottomOpacity: 0.6 },

                        // 18. The Moon (Ay) - Indigo/Blue/Silver
                        moon: { stops: ["#4338ca", "#3b82f6", "#e2e8f0"], glow: "#6366f1", accent: "#e2e8f0", bottomOpacity: 0.8 },
                        ay: { stops: ["#4338ca", "#3b82f6", "#e2e8f0"], glow: "#6366f1", accent: "#e2e8f0", bottomOpacity: 0.8 },

                        // 19. The Sun (Güneş) - Yellow/Orange/Gold
                        sun: { stops: ["#facc15", "#fb923c", "#fcd34d"], glow: "#facc15", accent: "#ffffff", bottomOpacity: 0.5 },
                        güneş: { stops: ["#facc15", "#fb923c", "#fcd34d"], glow: "#facc15", accent: "#ffffff", bottomOpacity: 0.5 },

                        // 20. Judgement (Mahkeme) - Red/Gold/Light Blue
                        judgement: { stops: ["#ef4444", "#fbbf24", "#bae6fd"], glow: "#ef4444", accent: "#fbbf24", bottomOpacity: 0.7 },
                        mahkeme: { stops: ["#ef4444", "#fbbf24", "#bae6fd"], glow: "#ef4444", accent: "#fbbf24", bottomOpacity: 0.7 },

                        // 21. The World (Dünya) - Green/Blue/Gold
                        world: { stops: ["#22c55e", "#3b82f6", "#fbbf24"], glow: "#22c55e", accent: "#fbbf24", bottomOpacity: 0.6 },
                        dünya: { stops: ["#22c55e", "#3b82f6", "#fbbf24"], glow: "#22c55e", accent: "#fbbf24", bottomOpacity: 0.6 },
                    };

                    // MATCHING LOGIC
                    let activeTheme = null;
                    // Try exact match first
                    for (const key in cardThemes) {
                        if (lowerName.includes(key)) {
                            activeTheme = cardThemes[key];
                            break;
                        }
                    }

                    // Fallback to Default Premium Gold if no specific theme found
                    if (!activeTheme) {
                        activeTheme = { stops: ["#fbbf24", "#d97706", "#fef3c7"], glow: "#fbbf24", accent: "#ffffff", bottomOpacity: 0.6 };
                    }

                    // RENDER UNIFIED FRAME
                    return (
                        <>
                            <div className="absolute inset-x-0 top-0 bottom-16 z-50 pointer-events-none rounded-t-xl overflow-hidden">
                                {/* Ambient Glow */}
                                <div className="absolute inset-0 rounded-t-xl mix-blend-screen"
                                    style={{ boxShadow: `inset 0 0 25px ${activeTheme.glow}66` }} // 66 = 40% hex opacity approx
                                />

                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 436" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id={`frame-grad-${n}`} x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor={activeTheme.stops[0]} />
                                            <stop offset="50%" stopColor={activeTheme.stops[1]} />
                                            <stop offset="100%" stopColor={activeTheme.stops[2]} />
                                        </linearGradient>
                                        <filter id={`frame-blur-${n}`}><feGaussianBlur stdDeviation="1.5" /></filter>
                                    </defs>

                                    {/* Unified 'Perfect' Geometry Frame - Hugs Edge with True Arcs */}
                                    <path
                                        d="M1.5,435 L1.5,12 A10.5,10.5 0 0 1 12,1.5 L288,1.5 A10.5,10.5 0 0 1 298.5,12 L298.5,435"
                                        stroke={`url(#frame-grad-${n})`}
                                        strokeWidth="3"
                                        fill="none"
                                        filter={`url(#frame-blur-${n})`}
                                    />

                                    {/* Separator Line */}
                                    <line
                                        x1="5" y1="434" x2="295" y2="434"
                                        stroke={activeTheme.stops[1]}
                                        strokeWidth="2"
                                        opacity={activeTheme.bottomOpacity}
                                    />
                                </svg>
                            </div>

                            {/* Bottom Text Area Frame */}
                            <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none rounded-b-xl overflow-hidden z-50">
                                <div
                                    className="absolute inset-0 border-l-[3px] border-r-[3px] border-b-[3px] rounded-b-xl"
                                    style={{ borderColor: `${activeTheme.stops[1]}80` }} // 50% opacity
                                />
                                <div
                                    className="absolute inset-0 mix-blend-overlay"
                                    style={{ background: `linear-gradient(to top, ${activeTheme.stops[1]}4D, transparent)` }}
                                />
                            </div>
                        </>
                    );
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
