"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Diamond, Clock, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import DiamondShop from '@/components/economy/DiamondShop';
import { useUser } from '@/lib/UserContext';

interface DiamondShopModalProps {
    onClose: () => void;
}

export default function DiamondShopModal({ onClose }: DiamondShopModalProps) {
    // Body Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    const [activeTab, setActiveTab] = React.useState<'buy' | 'history'>('buy');
    const { user } = useUser();
    const transactions = user?.transactions || [];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-4xl glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setActiveTab('buy')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'buy' ? 'bg-manifest-primary/20 text-white border border-manifest-primary/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="flex items-center gap-2">
                                <Diamond className="w-4 h-4" />
                                Elmas Yükle
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-manifest-secondary/20 text-white border border-manifest-secondary/50 shadow-[0_0_10px_rgba(236,72,153,0.3)]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Geçmiş
                            </span>
                        </button>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <X className="w-6 h-6 text-manifest-muted" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {activeTab === 'buy' ? (
                        <DiamondShop />
                    ) : (
                        <div className="space-y-3 p-1">
                            {transactions.length === 0 ? (
                                <div className="text-center py-12 text-white/40">
                                    <Diamond className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>Henüz bir işlem bulunmuyor.</p>
                                </div>
                            ) : (
                                transactions.map((tx: any) => (
                                    <div key={tx.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/10 transition">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                                ${tx.amount > 0
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'bg-red-500/10 text-red-400'
                                                }`}
                                            >
                                                {tx.amount > 0 ? (
                                                    <ArrowDownLeft className="w-5 h-5" />
                                                ) : (
                                                    <ArrowUpRight className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium text-sm">{tx.description}</div>
                                                <div className="text-xs text-white/40">
                                                    {new Date(tx.date).toLocaleDateString('tr-TR', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        timeZone: 'Europe/Istanbul'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`font-mono font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                                            {tx.amount > 0 ? '+' : ''}{tx.amount}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
}
