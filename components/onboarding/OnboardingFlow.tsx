"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import { UserProfile } from '@/types';
import { Star, ChevronRight, Moon, Sun, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function OnboardingFlow() {
    const { saveUser } = useUser();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Partial<UserProfile>>({
        name: '',
        birthDate: '',
        birthTime: '',
        birthCity: ''
    });

    // API'den gelen mesajı tutacak state
    const [cosmicMessage, setCosmicMessage] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        if (step === 2) {
            // Doğum bilgileri girildi, hesaplamaya geç
            setStep(3);
        } else if (step === 3) {
            // Bu adım useEffect ile otomatik tetiklenecek
        } else if (step === 4) {
            // Kullanıcı mesajı okudu, kaydet ve bitir
            saveUser(formData as UserProfile);
        } else {
            setStep(prev => prev + 1);
        }
    };

    // Step 3 (Hesaplama) tetiklendiğinde API'ye git
    useEffect(() => {
        if (step === 3) {
            const fetchCosmicMessage = async () => {
                setLoading(true);
                try {
                    const response = await fetch('/api/universe-message', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ data: formData }),
                    });
                    const result = await response.json();

                    if (result.message) {
                        setCosmicMessage(result.message);
                        // Mesaj geldi, biraz bekleyip göster (loading efekti için)
                        setTimeout(() => setStep(4), 2000);
                    }
                } catch (error) {
                    console.error("Cosmic connection error:", error);
                    // Hata olursa varsayılan bir mesajla devam et
                    setCosmicMessage("Yıldızlar şu an sessiz, ancak enerjin evrene ulaştı.");
                    setStep(4);
                } finally {
                    setLoading(false);
                }
            };
            fetchCosmicMessage();
        }
    }, [step, formData]);

    const updateField = (field: keyof UserProfile, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-manifest-background overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-manifest-secondary rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-manifest-primary rounded-full blur-[128px]" />
            </div>

            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-8 z-10"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="inline-block p-4 rounded-full border border-manifest-primary/30"
                        >
                            <Star className="w-12 h-12 text-manifest-primary" />
                        </motion.div>

                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-manifest-text mb-4">Manifestia</h1>
                            <p className="text-manifest-muted text-lg">Evrenden sana bir mesaj var ✨</p>
                        </div>

                        <button
                            onClick={handleNext}
                            className="px-8 py-4 bg-gradient-to-r from-manifest-primaryDim to-manifest-primary text-manifest-background font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                        >
                            Yolculuğa Başla
                        </button>
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="name"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-md z-10 space-y-6"
                    >
                        <h2 className="text-3xl font-serif text-center mb-8">Seni nasıl çağıralım?</h2>
                        <input
                            type="text"
                            placeholder="İsminiz..."
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full bg-manifest-surface border border-manifest-highlight/10 rounded-xl p-4 text-xl text-center focus:border-manifest-primary/50 outline-none transition-colors"
                            autoFocus
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={handleNext}
                                disabled={!formData.name}
                                className="p-4 bg-manifest-surfaceHighlight rounded-full hover:bg-manifest-primary hover:text-manifest-background transition-colors disabled:opacity-50"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="birth"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-md z-10 space-y-6"
                    >
                        <h2 className="text-3xl font-serif text-center mb-2">Yıldız Haritan</h2>
                        <p className="text-center text-manifest-muted mb-6">Doğum bilgilerini girerek enerjini keşfet.</p>

                        <div className="space-y-4">
                            <div className="bg-manifest-surface p-4 rounded-xl border border-white/5 flex items-center gap-4 group focus-within:border-manifest-primary/30 transition-colors">
                                <Sun className="text-manifest-primary w-6 h-6 group-focus-within:text-white transition-colors" />
                                <input
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={(e) => updateField('birthDate', e.target.value)}
                                    className="bg-transparent w-full outline-none text-manifest-text"
                                />
                            </div>

                            <div className="bg-manifest-surface p-4 rounded-xl border border-white/5 flex items-center gap-4 group focus-within:border-manifest-secondary/30 transition-colors">
                                <Moon className="text-manifest-secondary w-6 h-6 group-focus-within:text-white transition-colors" />
                                <input
                                    type="time"
                                    value={formData.birthTime}
                                    onChange={(e) => updateField('birthTime', e.target.value)}
                                    className="bg-transparent w-full outline-none text-manifest-text"
                                />
                            </div>

                            <div className="bg-manifest-surface p-4 rounded-xl border border-white/5 flex items-center gap-4 group focus-within:border-manifest-accent/30 transition-colors">
                                <MapPin className="text-manifest-accent w-6 h-6 group-focus-within:text-white transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Doğum Yeri (Şehir)"
                                    value={formData.birthCity}
                                    onChange={(e) => updateField('birthCity', e.target.value)}
                                    className="bg-transparent w-full outline-none text-manifest-text placeholder:text-manifest-muted"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleNext}
                                disabled={!formData.birthDate || !formData.birthTime || !formData.birthCity}
                                className="p-4 bg-manifest-surfaceHighlight rounded-full hover:bg-manifest-primary hover:text-manifest-background transition-colors disabled:opacity-50"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="calculating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center z-10"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-32 h-32 bg-manifest-secondary/20 rounded-full blur-xl mx-auto mb-8 relative"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Star className="w-12 h-12 text-manifest-primary animate-spin-slow" />
                            </div>
                        </motion.div>
                        <h2 className="text-2xl font-serif mb-2">Gökyüzü Okunuyor...</h2>
                        <p className="text-manifest-muted animate-pulse">Kozmik parmak izin analiz ediliyor.</p>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg z-10"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-manifest-primary to-manifest-secondary rounded-2xl blur opacity-30"></div>
                            <div className="relative p-8 rounded-2xl bg-manifest-surface/90 border border-white/10 backdrop-blur-xl">
                                <div className="flex justify-center mb-6">
                                    <Sparkles className="w-10 h-10 text-manifest-primary animate-pulse" />
                                </div>
                                <h2 className="text-center text-xl font-serif text-manifest-accent mb-6">Kozmik Karşılama</h2>
                                <div className="text-lg leading-relaxed text-center italic text-manifest-text/90 mb-8 font-light">
                                    "{cosmicMessage}"
                                </div>
                                <button
                                    onClick={handleNext}
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition group-hover:border-manifest-primary/50"
                                >
                                    <span>Niyet Et ve Başla</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
