"use client";
import React from 'react';
import { useUser } from '@/lib/UserContext';
import { Diamond, Check, Star } from 'lucide-react';

const DIAMOND_PACKAGES = [
    { amount: 100, price: 50, id: 'pack_100', highlight: false },
    { amount: 200, price: 80, id: 'pack_200', highlight: false, tag: "En Karlı" },
    { amount: 300, price: 140, id: 'pack_300', highlight: false },
    { amount: 400, price: 180, id: 'pack_400', highlight: false },
    { amount: 500, price: 230, id: 'pack_500', highlight: true, tag: "En Popüler" },
];

export default function DiamondShop() {
    const { purchaseDiamonds } = useUser();

    const handlePurchase = (pkg: typeof DIAMOND_PACKAGES[0]) => {
        // Mock Purchase Flow
        if (confirm(`${pkg.amount} Elmas almak için ${pkg.price} TL ödemeyi onaylıyor musun?`)) {
            purchaseDiamonds(pkg.amount, pkg.price);
            alert("Tebrikler! Kozmik Işıltıların yüklendi. ✨");
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3 pb-20">
            {DIAMOND_PACKAGES.map((pkg) => (
                <button
                    key={pkg.id}
                    onClick={() => handlePurchase(pkg)}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-300 hover:scale-[1.05] active:scale-95 cursor-pointer
                        ${pkg.highlight
                            ? 'bg-gradient-to-br from-manifest-primary/20 to-manifest-secondary/20 border-manifest-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] animate-pulse-subtle hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                        }
                    `}
                >
                    {pkg.tag && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                            {pkg.tag}
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center
                             ${pkg.highlight ? 'bg-manifest-primary/20' : 'bg-white/10'}`}
                        >
                            <Diamond className={`w-4 h-4 ${pkg.highlight ? 'text-manifest-primary fill-manifest-primary/20' : 'text-cyan-300'}`} />
                        </div>
                    </div>

                    <div className="mb-1">
                        <span className="text-lg font-bold text-white">{pkg.amount}</span>
                        <span className="text-xs text-white/60 ml-1">Elmas</span>
                    </div>

                    <div className="text-sm font-medium text-manifest-muted">
                        {pkg.price} TL
                    </div>
                </button>
            ))}
        </div>
    );
}
