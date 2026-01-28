"use client";
import React from 'react';
import { useUser } from '@/lib/UserContext';
import { ShoppingBag, Diamond, ArrowLeft, ExternalLink, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import DiamondShop from '@/components/economy/DiamondShop';

const PRODUCTS = [
    {
        id: 1,
        name: "Kozmik Sitrin Kolye",
        desc: "Bolluk ve bereket enerjisini üzerine çek. Saf doğal taş.",
        price: 750,
        diamondPrice: 600,
        diamondCost: 500,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
        tag: "Bolluk"
    },
    {
        id: 2,
        name: "Ametist Koruma Bilekliği",
        desc: "Negatif enerjilere karşı kalkan oluştur.",
        price: 450,
        diamondPrice: 350,
        diamondCost: 300,
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600",
        tag: "Korunma"
    },
    {
        id: 3,
        name: "7 Çakra Uyumlama Seti",
        desc: "Tüm enerji merkezlerini dengele. Tam set.",
        price: 1200,
        diamondPrice: 950,
        diamondCost: 1000,
        image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=600",
        tag: "Denge"
    },
    {
        id: 4,
        name: "Pembe Kuvars Aşk Taşı",
        desc: "Sevgi frekansını yükselt ve kalbi şifalandır.",
        price: 300,
        diamondPrice: 0, // Sadece kargo
        diamondCost: 1500,
        image: "https://images.unsplash.com/photo-1596919248430-1c64ebc6e8e8?auto=format&fit=crop&q=80&w=600",
        tag: "Aşk",
        special: "Sadece Kargo Öde"
    }
];

export default function StoreView({ onBack, onShowHistory }: { onBack?: () => void, onShowHistory?: () => void }) {
    const { user } = useUser();
    const userDiamonds = user?.diamonds || 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-24"
        >
            <div className="flex items-center gap-4 mb-6">
                {onBack && (
                    <button onClick={onBack} className="p-2 rounded-full bg-white/5 hover:bg-white/10">
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                )}
                <div>
                    <h2 className="text-2xl font-serif font-bold text-white">The Manifest Store</h2>
                    <p className="text-manifest-muted text-sm">Kozmik ışıltını gerçek hazinelere dönüştür.</p>
                </div>
            </div>

            {/* User Wallet Info */}
            <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-white/10 flex items-center justify-between">
                <div>
                    <div className="text-sm text-white/60 mb-1">Mevcut Bakiyen</div>
                    <div className="text-3xl font-mono font-bold text-cyan-300 flex items-center gap-2">
                        <Diamond className="w-6 h-6 fill-cyan-300/20" />
                        {userDiamonds}
                    </div>
                </div>
                <button
                    onClick={onShowHistory}
                    className="px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-white uppercase tracking-wider hover:bg-white/20 transition flex items-center gap-2"
                >
                    <Clock className="w-4 h-4" />
                    İşlem Geçmişi
                </button>
            </div>

            {/* Diamond Shop Section */}
            <div className="mb-8">
                <h3 className="text-lg font-serif text-white mb-4 flex items-center gap-2">
                    <Diamond className="w-5 h-5 text-cyan-400" />
                    Elmas Yükle
                </h3>
                <DiamondShop />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PRODUCTS.map(product => {
                    const canAfford = userDiamonds >= product.diamondCost;
                    const isFreeProduct = product.diamondPrice === 0;

                    return (
                        <div key={product.id} className="group relative bg-[#090514] border border-white/10 rounded-2xl overflow-hidden hover:border-manifest-primary/50 transition-all duration-300">
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-xs font-medium text-white border border-white/10">
                                    {product.tag}
                                </div>
                                {product.special && (
                                    <div className="absolute top-3 right-3 px-2 py-1 bg-manifest-accent/80 backdrop-blur-md rounded-md text-xs font-bold text-black flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" /> {product.special}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-white">{product.name}</h3>
                                    <p className="text-sm text-manifest-muted truncate">{product.desc}</p>
                                </div>

                                {/* Pricing Box */}
                                <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-3">
                                    {/* Normal Price */}
                                    <div className="flex justify-between items-center text-sm opacity-50">
                                        <span>Normal Fiyat:</span>
                                        <span className="line-through">{product.price} TL</span>
                                    </div>

                                    {/* Diamond Deal */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                                                <Diamond className="w-4 h-4 fill-cyan-300/20" />
                                                <span>{product.diamondCost}</span>
                                            </div>
                                            <span className="text-manifest-primary font-bold text-xl">
                                                + {isFreeProduct ? 'ÜCRETSİZ' : `${product.diamondPrice} TL`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                                        ${canAfford
                                            ? 'bg-gradient-to-r from-manifest-primary to-manifest-secondary text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                            : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
                                >
                                    {canAfford ? 'Fırsatı Yakala' : 'Yetersiz Bakiye'}
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-center text-sm text-manifest-muted/50">
                Lütfen dikkat: The Manifest Store stokları sınırlıdır ve ruhsal objeler içerir.
            </div>
        </motion.div>
    );
}
