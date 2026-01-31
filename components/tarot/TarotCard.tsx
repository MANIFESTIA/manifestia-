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
        const n = name?.toLowerCase() || "";

        // Hangi kartlar için görselimiz var?
        const customImages: Record<string, string> = {
            // 0 - The Fool
            "fool": "/tarot-cards/the-fool.png", "mecnun": "/tarot-cards/the-fool.png", "deli": "/tarot-cards/the-fool.png",
            // 1 - The Magician
            "magician": "/tarot-cards/the-magician.png", "büyücü": "/tarot-cards/the-magician.png",
            // 2 - The High Priestess
            "priestess": "/tarot-cards/the-high-priestess.png", "azize": "/tarot-cards/the-high-priestess.png",
            // 3 - The Empress
            "empress": "/tarot-cards/the-empress.png", "imparatoriçe": "/tarot-cards/the-empress.png",
            // 4 - The Emperor
            "emperor": "/tarot-cards/the-emperor.png", "imparator": "/tarot-cards/the-emperor.png",
            // 5 - The Hierophant
            "hierophant": "/tarot-cards/the-hierophant.png", "aziz": "/tarot-cards/the-hierophant.png",
            // 6 - The Lovers
            "lovers": "/tarot-cards/the-lovers.png", "aşıklar": "/tarot-cards/the-lovers.png",
            // 7 - The Chariot
            "chariot": "/tarot-cards/the-chariot.png", "araba": "/tarot-cards/the-chariot.png",
            // 8 - Strength
            "strength": "/tarot-cards/strength.png", "güç": "/tarot-cards/strength.png",
            // 9 - The Hermit
            "hermit": "/tarot-cards/the-hermit.png", "ermiş": "/tarot-cards/the-hermit.png",
            // 10 - Wheel of Fortune
            "wheel": "/tarot-cards/wheel-of-fortune.png", "çark": "/tarot-cards/wheel-of-fortune.png", "kader": "/tarot-cards/wheel-of-fortune.png",
            // 11 - Justice
            "justice": "/tarot-cards/justice.png", "adalet": "/tarot-cards/justice.png",
            // 12 - The Hanged Man
            "hanged": "/tarot-cards/the-hanged-man.png", "aslan": "/tarot-cards/the-hanged-man.png", "asılan": "/tarot-cards/the-hanged-man.png",
            // 13 - Death
            "death": "/tarot-cards/death.png", "ölüm": "/tarot-cards/death.png",
            // 14 - Temperance
            "temperance": "/tarot-cards/temperance.png", "denge": "/tarot-cards/temperance.png",
            // 15 - The Devil
            "devil": "/tarot-cards/the-devil.png", "şeytan": "/tarot-cards/the-devil.png",
            // 16 - The Tower
            "tower": "/tarot-cards/the-tower.png", "kule": "/tarot-cards/the-tower.png",
            // 17 - The Star
            "star": "/tarot-cards/the-star.png", "yıldız": "/tarot-cards/the-star.png",
            // 18 - The Moon
            "moon": "/tarot-cards/the-moon.png", "ay": "/tarot-cards/the-moon.png",
            // 19 - The Sun
            "sun": "/tarot-cards/the-sun.png", "güneş": "/tarot-cards/the-sun.png",
            // 20 - Judgement
            "judgement": "/tarot-cards/judgement.png", "mahkeme": "/tarot-cards/judgement.png",
            // 21 - The World
            "world": "/tarot-cards/the-world.png", "dünya": "/tarot-cards/the-world.png"
        };

        // Bu kartın görseli var mı? (İsim içinde geçen anahtar kelimeye bak)
        const imageKey = Object.keys(customImages).find(key => n.includes(key));
        const imageSrc = imageKey ? customImages[imageKey] : null;

        const getIcon = () => {
            const props = {
                className: "w-24 h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]",
                style: { color: themeColor, filter: `drop-shadow(0 0 10px ${themeColor})` }
            };

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
            if (n.includes("hanged") || n.includes("aslan") || n.includes("asılan")) return <Anchor {...props} className="rotate-180" />;
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

        return (
            <div className={`w-full h-full bg-[#080510] rounded-xl relative flex flex-col overflow-hidden shadow-inner ${imageSrc ? '' : 'border-2'}`}
                style={{
                    borderColor: imageSrc ? 'transparent' : themeColor,
                    // Eğer kart ters ise 180 derece döndür
                    transform: isReversed ? 'rotate(180deg)' : 'none'
                }}>

                {/* Image varsa onu göster, yoksa standart arka plan ve ikon */}
                {imageSrc ? (
                    <div className="absolute inset-0 z-20">
                        <img
                            src={imageSrc}
                            alt={name}
                            className="w-full h-full object-cover scale-105"
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
                                style={{ transform: 'rotateY(180deg)' }}
                            >
                                {getIcon()}
                            </motion.div>
                        </div>
                    </>
                )}

                {/* Köşe Süsleri (Her zaman) */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 z-30 mix-blend-overlay" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 z-30 mix-blend-overlay" />
                <div className="absolute bottom-16 left-2 w-2 h-2 border-b border-l border-white/40 z-30 mix-blend-overlay" />
                <div className="absolute bottom-16 right-2 w-2 h-2 border-b border-r border-white/40 z-30 mix-blend-overlay" />

                {/* Alt Metin Alanı */}
                <div
                    className="absolute bottom-0 inset-x-0 h-16 flex flex-col items-center justify-center border-t border-white/10 bg-black/80 backdrop-blur-md z-30"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <span className="font-serif font-bold text-lg uppercase tracking-widest drop-shadow-md text-center px-2 leading-none mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        {name || "UNKNOWN"}
                    </span>
                    <span className="text-[9px] text-white/50 uppercase tracking-[0.25em]">
                        {cardData?.englishName || "ARCANA"}
                    </span>
                </div>
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
                <div className="w-full h-full bg-[#05030a] rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                    <img
                        src="/tarot-back-v2.png"
                        alt="Tarot Back"
                        className="w-full h-full object-fill"
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
