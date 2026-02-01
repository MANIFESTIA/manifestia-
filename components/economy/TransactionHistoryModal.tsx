"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDownLeft, ArrowUpRight, Clock, Diamond } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

interface TransactionHistoryModalProps {
    onClose: () => void;
}

export default function TransactionHistoryModal({ onClose }: TransactionHistoryModalProps) {
    // Body Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    const { user } = useUser();
    const transactions = user?.transactions || [];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#0f0a1e] border border-white/10 rounded-3xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h2 className="text-xl font-serif text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-manifest-secondary" />
                        Cüzdan Geçmişi
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
                    >
                        <X className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
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
                                                minute: '2-digit'
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

                {/* Footer Balance */}
                <div className="p-4 bg-white/5 border-t border-white/5 flex justify-between items-center text-sm">
                    <span className="text-white/60">Güncel Işıltı:</span>
                    <span className="text-cyan-300 font-bold font-mono flex items-center gap-1">
                        <Diamond className="w-4 h-4" />
                        {user?.diamonds || 0}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
