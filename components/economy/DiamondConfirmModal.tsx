"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

interface DiamondConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cost: number;
    title: string;
    description: string;
}

export default function DiamondConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    cost,
    title,
    description
}: DiamondConfirmModalProps) {
    const { user } = useUser();

    if (!isOpen) return null;

    const currentBalance = user?.diamonds || 0;
    const hasEnough = currentBalance >= cost;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-sm bg-[#0F1629] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-manifest-primary/10 blur-[50px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4
                            ${hasEnough ? 'bg-cyan-500/10' : 'bg-red-500/10'}`}
                        >
                            {hasEnough ? (
                                <Diamond className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                            ) : (
                                <AlertCircle className="w-8 h-8 text-red-400" />
                            )}
                        </div>

                        <h3 className="text-xl font-serif font-bold text-white mb-2">
                            {hasEnough ? 'Kozmik Onay' : 'Yetersiz Işıltı'}
                        </h3>

                        <p className="text-white/60 text-sm mb-6">
                            {hasEnough ? description : 'Bu portalı aralamak için yeterli kozmik ışıltın bulunmuyor.'}
                        </p>

                        {/* Cost Display */}
                        <div className="bg-white/5 rounded-xl p-3 mb-6 flex items-center gap-3 border border-white/5">
                            <span className="text-xs text-white/40 uppercase tracking-wider">Bedel:</span>
                            <div className="flex items-center gap-1.5 ml-auto">
                                <span className={`font-bold text-lg ${hasEnough ? 'text-white' : 'text-red-400'}`}>{cost}</span>
                                <Diamond className="w-4 h-4 text-cyan-300 fill-cyan-300/20" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-colors font-medium text-sm"
                            >
                                Vazgeç
                            </button>

                            {hasEnough ? (
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform text-sm"
                                >
                                    Onayla
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        // TODO: Open Wallet/Shop
                                        onClose();
                                        // Navigate to shop logic here later
                                    }}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-manifest-primary to-manifest-secondary text-white font-bold shadow-lg shadow-manifest-primary/20 hover:scale-[1.02] transition-transform text-sm"
                                >
                                    Cüzdana Git
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
