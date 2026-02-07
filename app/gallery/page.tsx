"use client";

import React from 'react';
import { MAJOR_ARCANA } from '@/lib/tarot-data';
import TarotCard from '@/components/tarot/TarotCard';

export default function GalleryPage() {
    return (
        <div className="min-h-screen bg-[#05030a] p-8">
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-cyan-200 mb-8 font-serif tracking-widest">
                BÜYÜK ARKANA GALERİSİ
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {MAJOR_ARCANA.map((card) => (
                    <div key={card.id} className="flex flex-col items-center gap-4">
                        <div className="w-full aspect-[2/3.5]">
                            <TarotCard
                                name={card.name}
                                isRevealed={true}
                                className="w-full h-full shadow-2xl"
                            />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-serif font-bold">{card.name}</p>
                            <p className="text-white/40 text-xs uppercase tracking-widest">{card.englishName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
