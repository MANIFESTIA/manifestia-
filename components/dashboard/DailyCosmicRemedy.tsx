"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@/lib/UserContext';
import { ProfileManager } from '@/lib/user-profile-manager'; // Import server logic to client? Ideally move logic to shared lib or API. 
// Since ProfileManager is in lib/ and effectively pure JS, we can use it in client components for direct logic if no secrets involved.
import { Sparkles, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Product Data (To avoid fetching all products just for image/name lookup in this component, or we pass product details)
// Ideally we fetch product details. For speed, I'll use a lookup map or fetch.
// Let's reuse the FALLBACK_PRODUCTS or fetch single product.
// Since we want speed, I'll fetch the specific product details on mount.

export default function DailyCosmicRemedy() {
    const { user, purchaseProduct } = useUser();
    const [recommendation, setRecommendation] = useState<any>(null);
    const [productDetails, setProductDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        if (user) {
            const rec = ProfileManager.getRecommendedProduct(user);
            setRecommendation(rec);

            // Veritabanından o ürünün detayını çek
            // (Şimdilik mock data ile simulation yapalım hızlıca, API endpointimiz list dönüyor)
            fetch('/api/store/products')
                .then(res => res.json())
                .then(products => {
                    const found = products.find((p: any) => p.code === rec.productId);
                    if (found) setProductDetails(found);
                })
                .finally(() => setLoading(false));
        }
    }, [user]);

    const handleQuickBuy = async () => {
        if (!productDetails) return;

        const confirmBuy = confirm(`${productDetails.priceDiamonds} Elmas karşılığında almak istiyor musun?`);
        if (!confirmBuy) return;

        setPurchasing(true);
        const result = await purchaseProduct(productDetails.id);
        setPurchasing(false);

        if (result.success) {
            alert("Harika! Kozmik ilacın envanterine eklendi.");
            // Refresh logic handled in context
        } else {
            alert(result.message);
        }
    };

    if (loading || !productDetails) return null;

    // Check if user already owns it
    // Note: user.inventory is string[] of codes in our frontend context logic
    const isOwned = user?.inventory?.includes(recommendation.productId);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a103c] to-[#090514] border border-white/10 p-6 mb-8"
        >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-manifest-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-manifest-primary/20 transition-all duration-700"></div>

            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                {/* Image Section */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-manifest-primary to-cyan-400 rounded-full blur-md opacity-40 animate-pulse-slow"></div>
                    <img
                        src={productDetails.image}
                        alt={productDetails.name}
                        className="w-full h-full object-cover rounded-full border-2 border-white/20 relative z-10 shadow-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/10 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        {recommendation.element}
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-manifest-primary font-bold text-sm tracking-wider uppercase mb-1">
                        Günün Kozmik Şifası
                    </h3>
                    <h2 className="text-xl md:text-2xl font-serif text-white font-bold mb-2">
                        {productDetails.name}
                    </h2>
                    <p className="text-manifest-muted text-sm leading-relaxed mb-4">
                        {recommendation.reason}
                    </p>

                    {/* Action Area */}
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        {isOwned ? (
                            <div className="flex items-center gap-2 text-green-400 font-bold bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                                <Check className="w-5 h-5" />
                                Envanterinde Var
                            </div>
                        ) : (
                            <button
                                onClick={handleQuickBuy}
                                disabled={purchasing}
                                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                {purchasing ? 'İşleniyor...' : (
                                    <>
                                        <ShoppingBag className="w-4 h-4" />
                                        Satın Al ({productDetails.priceDiamonds} 💎)
                                    </>
                                )}
                            </button>
                        )}

                        <a href="/dashboard?tab=store" className="text-xs text-white/40 hover:text-white underline decoration-white/20 transition-colors">
                            Tüm Mağazayı Gör
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
