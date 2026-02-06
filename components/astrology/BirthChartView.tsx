"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getApiUrl } from '@/lib/api';
import { X, Star, Moon, Sun, MapPin, Calendar, Clock, Sparkles, Loader2 } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

interface BirthChartViewProps {
    onClose: () => void;
}

interface ChartData {
    sunSign: string;
    moonSign: string;
    risingSign: string;
    elements: {
        fire: string;
        earth: string;
        air: string;
        water: string;
    };
    interpretation: {
        general: string;
        love: string;
        career: string;
        soulPurpose: string;
    };
}

export default function BirthChartView({ onClose }: BirthChartViewProps) {
    const { user } = useUser();
    const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        birthDate: '',
        birthTime: '',
        birthPlace: '',
        unknownTime: false
    });

    const [result, setResult] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('loading');
        setError(null);

        try {
            const res = await fetch(getApiUrl('api/astrology/birth-chart'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'API Error');
            }

            const data = await res.json();
            setResult(data);
            setStep('result');
        } catch (error: any) {
            console.error(error);
            setError(error.message || "Bir hata oluştu.");
            setStep('input');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#0b0b0e] text-white font-sans overflow-hidden overscroll-none touch-none">

            {/* Header */}
            <div className="p-6 flex justify-between items-center z-10 bg-[#0b0b0e]/95 backdrop-blur-xl border-b border-white/5 sticky top-0">
                <div>
                    <h2 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
                        Doğum Haritası
                    </h2>
                    <p className="text-xs text-white/50">Yıldızların Senin İçin Mesajı</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
                    <X className="w-6 h-6 text-white/40 hover:text-white" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center">

                <AnimatePresence mode="wait">
                    {/* STEP 1: INPUT FORM */}
                    {step === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-lg space-y-8"
                        >
                            <div className="text-center space-y-2 mb-8">
                                <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 ring-1 ring-indigo-500/30">
                                    <Star className="w-10 h-10 text-indigo-300" />
                                </div>
                                <h3 className="text-xl font-medium text-white/90">Kozmik Kimliğini Keşfet</h3>
                                <p className="text-white/50 text-sm">
                                    Doğum anındaki gökyüzü, ruhunun haritasıdır. Bilgilerini gir ve yıldızların rehberliğine kulak ver.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm text-center">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Ad Soyad</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                            <Sparkles className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition"
                                            placeholder="İsminiz nedir?"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Doğum Yeri</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                value={formData.birthPlace}
                                                onChange={e => setFormData({ ...formData, birthPlace: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition"
                                                placeholder="Şehir, Ülke"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Doğum Tarihi</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="date"
                                                required
                                                value={formData.birthDate}
                                                onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition [color-scheme:dark]"
                                                placeholder="01.05.2003"
                                            />
                                        </div>
                                        <p className="text-xs text-white/30 ml-1">Örnek: 15.03.1995</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Doğum Saati</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="time"
                                            disabled={formData.unknownTime}
                                            value={formData.birthTime}
                                            onChange={e => setFormData({ ...formData, birthTime: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition [color-scheme:dark] disabled:opacity-50"
                                        />
                                    </div>
                                    <p className="text-xs text-white/30 ml-1">Örnek: 14:30</p>
                                    <div className="flex items-center gap-2 mt-2 ml-1">
                                        <input
                                            type="checkbox"
                                            id="unknownTime"
                                            checked={formData.unknownTime}
                                            onChange={e => setFormData({ ...formData, unknownTime: e.target.checked })}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0"
                                        />
                                        <label htmlFor="unknownTime" className="text-sm text-white/60 cursor-pointer">Doğum saatimi bilmiyorum</label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-4 rounded-2xl font-bold text-white shadow-lg shadow-purple-900/40 transition-all hover:scale-[1.02] active:scale-[0.98] mt-8"
                                >
                                    Doğum Haritamı Oluştur
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* STEP 2: LOADING */}
                    {step === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-full text-center space-y-6"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 animate-pulse" />
                                <Loader2 className="w-16 h-16 text-indigo-300 animate-spin" />
                            </div>
                            <h3 className="text-xl font-serif text-white/90 animate-pulse">Yıldızlara Danışılıyor...</h3>
                            <p className="text-white/50 max-w-xs">Gök cisimlerinin o andaki konumları analiz ediliyor.</p>
                        </motion.div>
                    )}

                    {/* STEP 3: RESULT */}
                    {step === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-2xl space-y-6 pb-20"
                        >
                            {/* Cosmic Identity Card */}
                            <div className="bg-[#15151a] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[60px]" />
                                <div className="relative z-10 grid grid-cols-3 gap-2 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Sun className="w-6 h-6 text-yellow-400" />
                                        <span className="text-xs text-white/50 uppercase">Güneş</span>
                                        <span className="font-serif text-lg text-white">{result.sunSign}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 border-l border-white/5">
                                        <Loader2 className="w-6 h-6 text-indigo-400" /> {/* Should be rising icon */}
                                        <span className="text-xs text-white/50 uppercase">Yükselen</span>
                                        <span className="font-serif text-lg text-white">{result.risingSign}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 border-l border-white/5">
                                        <Moon className="w-6 h-6 text-blue-200" />
                                        <span className="text-xs text-white/50 uppercase">Ay</span>
                                        <span className="font-serif text-lg text-white">{result.moonSign}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Main Interpretation */}
                            <div className="space-y-4">
                                <InterpretationCard title="Ruhsal Özün" content={result.interpretation.general} icon="✨" delay={0.1} />
                                <InterpretationCard title="Aşk ve İlişkiler" content={result.interpretation.love} icon="❤️" delay={0.2} />
                                <InterpretationCard title="Kariyer ve Potansiyel" content={result.interpretation.career} icon="💼" delay={0.3} />
                                <InterpretationCard title="Ruhsal Amacın" content={result.interpretation.soulPurpose} icon="🔮" delay={0.4} />
                            </div>

                            <button
                                onClick={() => setStep('input')}
                                className="w-full py-4 text-white/40 hover:text-white transition text-sm"
                            >
                                Yeni Analiz Yap
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function InterpretationCard({ title, content, icon, delay }: { title: string, content: string, icon: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="bg-white/5 border border-white/5 rounded-2xl p-6"
        >
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{icon}</span>
                <h4 className="font-serif text-lg text-indigo-100">{title}</h4>
            </div>
            <p className="text-white/70 leading-relaxed text-sm">
                {content}
            </p>
        </motion.div>
    );
}
