"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TarotCard from './TarotCard';
import { TarotCard as TarotCardType } from '@/lib/tarot-data';

interface CardDeckProps {
    cards: TarotCardType[];
    onPick: (card: TarotCardType) => void;
    isFree: boolean;
}

export default function CardDeck({ cards, onPick, isFree }: CardDeckProps) {
    // We can move the shuffling logic here if we want, but let's keep it simple
    // and just render the fan/deck since TarotView already manages the state 
    // for the entire flow.

    return (
        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center mt-4 md:mt-10 scale-[0.6] sm:scale-75 md:scale-90 origin-center perspective-1000">
            {cards.map((card, i) => {
                const total = cards.length;
                const radius = 180;
                const angleDeg = (360 / total) * i;
                const angleRad = (angleDeg - 90) * (Math.PI / 180);

                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;
                const rotation = angleDeg;

                return (
                    <motion.div
                        key={card.id || i}
                        className="absolute w-28 h-48 sm:w-32 sm:h-56 transform-gpu cursor-pointer"
                        initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                        animate={{
                            x: x,
                            y: y,
                            rotate: rotation,
                            opacity: 1,
                            scale: 1,
                            zIndex: i
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 15,
                            delay: i * 0.05
                        }}
                        whileHover={{
                            scale: 1.3,
                            zIndex: 100,
                            transition: { duration: 0.2 }
                        }}
                        onClick={() => onPick(card)}
                    >
                        <TarotCard className="w-full h-full shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-shadow" />
                    </motion.div>
                );
            })}
        </div>
    );
}
