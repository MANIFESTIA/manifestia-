"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Diamond, Sparkles, CheckCircle } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import { getApiUrl } from '@/lib/api';

interface IntentSealViewProps {
    onClose: () => void;
}

type SealStep = 'write' | 'sealing' | 'success';

export default function IntentSealView({ onClose }: IntentSealViewProps) {
    const { user, updateUser } = useUser();
    const [step, setStep] = useState<SealStep>('write');
    const [intent, setIntent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSeal = async () => {
        if (!intent.trim()) return;
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('manifestia_token');
            const headers: HeadersInit = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const res = await fetch(getApiUrl('api/rituals/seal-intent'), {
                method: 'POST',
                headers,
                body: JSON.stringify({ intent: intent.trim() }),
            });
            const data = await res.json();

            if (data.success) {
                updateUser({ diamonds: data.newBalance });
                setStep('sealing');
                setTimeout(() => setStep('success'), 3500);
            } else {
                setError(data.error || 'İşlem başarısız.');
            }
        } catch {
            setError('Bağlantı hatası.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0e] text-white overflow-hidden">
            <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 hover:bg-white/10 rounded-full transition">
                <X className="w-6 h-6 text-white/40 hover:text-white transition-colors" />
            </button>

            <AnimatePresence mode="wait">
                {step === 'write' && (
                    <motion.div
                        key="write"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md mx-4 space-y-6"
                    >
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex p-4 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4"
                            >
                                <Sparkles className="w-8 h-8 text-amber-400" />
                            </motion.div>
                            <h2 className="text-2xl font-serif text-white">Niyetini Mühürle</h2>
                            <p className="text-sm text-white/50 mt-2">İçinden geçirdiğin dileni evrenle paylaş.</p>
                            <div className="flex items-center justify-center gap-1 mt-3">
                                <Diamond className="w-4 h-4 text-purple-400 fill-current" />
                                <span className="text-sm text-purple-300 font-medium">3 Elmas</span>
                            </div>
                        </div>

                        <textarea
                            value={intent}
                            onChange={(e) => setIntent(e.target.value)}
                            placeholder="Niyetini burada yaz..."
                            maxLength={500}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder-white/30 outline-none focus:border-amber-500/40 resize-none transition-colors"
                            rows={4}
                            autoFocus
                        />

                        {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        )}

                        <button
                            onClick={handleSeal}
                            disabled={!intent.trim() || loading || (user?.diamonds || 0) < 3}
                            className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 rounded-2xl text-white font-semibold
                                hover:shadow-[0_0_25px_rgba(251,146,60,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                            ) : 'Mühürle'}
                        </button>
                    </motion.div>
                )}

                {step === 'sealing' && (
                    <motion.div
                        key="sealing"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8"
                    >
                        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                                className="absolute inset-6 rounded-full border border-amber-400/50"
                            />
                            <div className="absolute inset-10 rounded-full bg-amber-400/10 blur-2xl" />
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                className="relative z-10"
                            >
                                <Sparkles className="w-16 h-16 text-amber-400" style={{ filter: 'drop-shadow(0 0 12px rgba(251, 146, 60, 0.8))' }} />
                            </motion.div>
                        </div>

                        <div>
                            <h2 className="text-xl font-serif text-amber-200">Niyet Mühürlendiyor...</h2>
                            <p className="text-sm text-white/40 italic mt-2">"{intent}"</p>
                        </div>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6 max-w-sm mx-4"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/30"
                        >
                            <CheckCircle className="w-12 h-12 text-green-400" />
                        </motion.div>

                        <div>
                            <h2 className="text-2xl font-serif text-white">Niyet Mühürlendiyi</h2>
                            <p className="text-white/50 text-sm mt-2">Niyet evrenle buluştu. Şimdi sadece yolun açılmasını bekle.</p>
                        </div>

                        <p className="text-sm italic text-amber-200/70 border-l-2 border-amber-400/30 pl-4 text-left">
                            "{intent}"
                        </p>

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition"
                        >
                            Kapatma
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
