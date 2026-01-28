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
            // Doğum bilgileri girildi, Niyet seçimine geç
            setStep(3);
        } else if (step === 3) {
            // Niyet seçildi, Ses rehberine geç
            setStep(4);
        } else if (step === 4) {
            // Ses seçildi, Hesaplamaya geç
            setStep(5);
        } else if (step === 5) {
            // Bu adım useEffect ile otomatik tetiklenecek (Hesaplama)
        } else if (step === 6) {
            // Sonuç görüldü, kaydet ve bitir
            saveUser(formData as UserProfile);
        } else {
            setStep(prev => prev + 1);
        }
    };

    // Step 5 (Hesaplama) tetiklendiğinde API'ye git
    useEffect(() => {
        if (step === 5) {
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
                        setTimeout(() => setStep(6), 2500); // Biraz daha uzun beklet heyecan artsın
                    }
                } catch (error) {
                    console.error("Cosmic connection error:", error);
                    setCosmicMessage("Yıldızlar şu an sessiz, ancak enerjin evrene ulaştı.");
                    setStep(6);
                } finally {
                    setLoading(false);
                }
            };
            fetchCosmicMessage();
        }
    }, [step, formData]);

    const updateField = (field: keyof UserProfile, value: string | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleIntent = (intent: string) => {
        const current = formData.intents || [];
        if (current.includes(intent)) {
            updateField('intents', current.filter(i => i !== intent));
        } else {
            if (current.length < 3) {
                updateField('intents', [...current, intent]);
            }
        }
    };

    // INTENT DATA
    const intents = [
        { id: 'love', label: 'Aşk & İlişkiler', icon: '❤️', desc: 'Ruh eşini ve sevgiyi çek.' },
        { id: 'abundance', label: 'Bolluk & Bereket', icon: '💰', desc: 'Maddi ve manevi zenginlik.' },
        { id: 'protection', label: 'Korunma', icon: '🛡️', desc: 'Negatif enerjilerden arın.' },
        { id: 'clarity', label: 'Zihinsel Berraklık', icon: '🧠', desc: 'Kararlarında net ol.' },
        { id: 'awakening', label: 'Ruhsal Uyanış', icon: '✨', desc: 'İçindeki gücü keşfet.' },
        { id: 'career', label: 'Kariyer & Başarı', icon: '🚀', desc: 'Hedeflerine hızla ulaş.' },
    ];

    // VOICE DATA
    const voices = [
        { id: 'A', name: 'Mistik Rehber', k: 'Mist', color: 'from-purple-500 to-indigo-500' },
        { id: 'B', name: 'Doğa Ana', k: 'Gaia', color: 'from-green-500 to-emerald-500' },
        { id: 'C', name: 'Kozmik Bilge', k: 'Cosmos', color: 'from-blue-500 to-cyan-500' },
        { id: 'D', name: 'Ateş Ruhu', k: 'Fire', color: 'from-red-500 to-orange-500' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
            {/* Arka Plan Efektleri (Hafif Nebula Katmanı) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-manifest-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow"></div>

            <AnimatePresence mode="wait">
                {/* STEP 0: INTRO */}
                {step === 0 && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        className="text-center space-y-8 z-10 glass-panel p-12 rounded-3xl max-w-lg mx-4"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="inline-block p-4 rounded-full border border-manifest-primary/30 bg-white/5 backdrop-blur-md"
                        >
                            <Sparkles className="w-12 h-12 text-manifest-primary text-glow" />
                        </motion.div>

                        <div>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 text-glow mb-4">Manifestia</h1>
                            <p className="text-manifest-muted text-xl font-light">Evrenden sana bir mesaj var ✨</p>
                        </div>

                        <button
                            onClick={handleNext}
                            className="group relative px-10 py-5 bg-gradient-to-r from-manifest-primary via-purple-600 to-manifest-secondary text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(168,85,247,0.4)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Yolculuğa Başla <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full"></div>
                        </button>
                    </motion.div>
                )}

                {/* STEP 1: NAME */}
                {step === 1 && (
                    <motion.div
                        key="name"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md z-10 space-y-8 glass-panel p-8 rounded-3xl mx-4"
                    >
                        <div className="text-center">
                            <h2 className="text-3xl font-serif text-white text-glow mb-3">Seni nasıl çağıralım?</h2>
                            <p className="text-manifest-muted font-light">Evren seni isminle tanır.</p>
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="İsminiz..."
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-2xl p-5 text-2xl text-center text-white placeholder-white/20 outline-none focus:border-manifest-primary/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300 backdrop-blur-sm"
                                autoFocus
                            />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-manifest-primary/20 to-manifest-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleNext}
                                disabled={!formData.name}
                                className="w-full py-4 bg-gradient-to-r from-manifest-primary to-manifest-secondary rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                <span>Devam Et</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: BIRTH DATA */}
                {step === 2 && (
                    <motion.div
                        key="birth"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-md z-10 space-y-6 glass-panel p-8 rounded-3xl mx-4 relative overflow-hidden"
                    >
                        {/* Yıldız Haritası Animasyon Arka Planı (Sadece bu adımda) */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                            <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }}></div>
                        </div>

                        <div className="text-center mb-2">
                            <h2 className="text-3xl font-serif text-white text-glow mb-2">Yıldız Haritan</h2>
                            <p className="text-manifest-muted font-light text-sm">Doğum bilgilerini girerek enerjini keşfet.</p>
                        </div>

                        <div className="space-y-5 relative z-10">
                            {/* Doğum Tarihi */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-manifest-muted/80 ml-1 block text-left">Doğum Tarihi</label>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center gap-4 group focus-within:border-manifest-primary/50 focus-within:bg-black/30 transition-all hover:border-white/10">
                                    <Sun className="text-manifest-primary w-5 h-5 group-focus-within:text-white group-focus-within:scale-110 transition-all" />
                                    <input
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(e) => updateField('birthDate', e.target.value)}
                                        className="bg-transparent w-full outline-none text-white font-light text-lg"
                                    />
                                </div>
                            </div>

                            {/* Doğum Saati */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-manifest-muted/80 ml-1 block text-left">Doğum Saati</label>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center gap-4 group focus-within:border-manifest-secondary/50 focus-within:bg-black/30 transition-all hover:border-white/10">
                                    <Moon className="text-manifest-secondary w-5 h-5 group-focus-within:text-white group-focus-within:scale-110 transition-all" />
                                    <input
                                        type="time"
                                        value={formData.birthTime}
                                        onChange={(e) => updateField('birthTime', e.target.value)}
                                        className="bg-transparent w-full outline-none text-white font-light text-lg"
                                    />
                                </div>
                            </div>

                            {/* Doğum Yeri */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-manifest-muted/80 ml-1 block text-left">Doğum Yeri</label>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex items-center gap-4 group focus-within:border-manifest-accent/50 focus-within:bg-black/30 transition-all hover:border-white/10">
                                    <MapPin className="text-manifest-accent w-5 h-5 group-focus-within:text-white group-focus-within:scale-110 transition-all" />
                                    <input
                                        type="text"
                                        placeholder="Şehir (örn. İstanbul)"
                                        value={formData.birthCity}
                                        onChange={(e) => updateField('birthCity', e.target.value)}
                                        className="bg-transparent w-full outline-none text-white placeholder:text-manifest-muted/40 font-light text-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4 relative z-10">
                            <button
                                onClick={handleNext}
                                disabled={!formData.birthDate || !formData.birthTime || !formData.birthCity}
                                className="w-full py-4 bg-gradient-to-r from-manifest-primary to-manifest-secondary rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                <span>Devam Et</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: INTENT GRID (NEW) */}
                {step === 3 && (
                    <motion.div
                        key="intents"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full max-w-2xl z-10 space-y-6 glass-panel p-8 rounded-3xl mx-4"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-serif text-white text-glow mb-2">Niyetini Belirle</h2>
                            <p className="text-manifest-muted font-light">Senin için hangileri önemli? (En fazla 3 seçim)</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {intents.map((intent) => {
                                const isSelected = (formData.intents || []).includes(intent.id);
                                return (
                                    <button
                                        key={intent.id}
                                        onClick={() => toggleIntent(intent.id)}
                                        className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 group text-center
                                            ${isSelected
                                                ? 'bg-manifest-primary/20 border-manifest-primary shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                                : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20'}`}
                                    >
                                        <div className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">{intent.icon}</div>
                                        <div>
                                            <div className={`font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>{intent.label}</div>
                                            <div className="text-[10px] text-white/40 mt-1 leading-tight">{intent.desc}</div>
                                        </div>
                                        {isSelected && <div className="absolute top-2 right-2 text-manifest-primary"><Sparkles className="w-3 h-3" /></div>}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleNext}
                                disabled={!(formData.intents && formData.intents.length > 0)}
                                className="w-full py-4 bg-gradient-to-r from-manifest-primary to-manifest-secondary rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                <span>Devam Et</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: VOICE GUIDE (NEW) */}
                {step === 4 && (
                    <motion.div
                        key="guide"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-md z-10 space-y-6 glass-panel p-8 rounded-3xl mx-4"
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-serif text-white text-glow mb-2">Rehberini Seç</h2>
                            <p className="text-manifest-muted font-light">Yolculuğunda sana kim eşlik etsin?</p>
                        </div>

                        <div className="space-y-3">
                            {voices.map((bg) => (
                                <button
                                    key={bg.id}
                                    onClick={() => updateField('voiceGuide', bg.id)}
                                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all group
                                        ${formData.voiceGuide === bg.id
                                            ? `bg-gradient-to-r ${bg.color} border-transparent text-white shadow-lg`
                                            : 'bg-black/20 border-white/5 hover:bg-white/5 text-white/70'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg
                                             ${formData.voiceGuide === bg.id ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'}`}>
                                            {bg.k[0]}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold">{bg.name}</div>
                                            <div className="text-xs opacity-70">Rehber {bg.id}</div>
                                        </div>
                                    </div>
                                    {formData.voiceGuide === bg.id && <Sparkles className="w-5 h-5" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleNext}
                                disabled={!formData.voiceGuide}
                                className="w-full py-4 bg-gradient-to-r from-manifest-primary to-manifest-secondary rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                <span>Analizi Başlat</span>
                                <Sparkles className="w-5 h-5 group-hover:spin-slow" />
                            </button>
                        </div>
                    </motion.div>
                )}


                {/* STEP 5: CALCULATING (Old Step 3) */}
                {step === 5 && (
                    <motion.div
                        key="calculating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center z-10 glass-panel p-12 rounded-full aspect-square flex flex-col items-center justify-center max-w-sm mx-auto relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-manifest-primary/10 animate-pulse-slow"></div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-24 h-24 mb-6 relative"
                        >
                            <div className="absolute inset-0 border-t-2 border-r-2 border-manifest-primary rounded-full"></div>
                            <div className="absolute inset-2 border-b-2 border-l-2 border-manifest-secondary rounded-full opacity-50"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Star className="w-8 h-8 text-white fill-white animate-pulse" />
                            </div>
                        </motion.div>
                        <h2 className="text-2xl font-serif mb-2 text-white relative z-10">Gökyüzü Okunuyor...</h2>
                        <p className="text-manifest-muted text-sm font-light relative z-10">Kozmik parmak izin analiz ediliyor.</p>
                    </motion.div>
                )}

                {/* STEP 6: RESULT (Old Step 4) */}
                {step === 6 && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg z-10 mx-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-[2px] bg-gradient-to-r from-manifest-primary via-white/50 to-manifest-secondary rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse-slow"></div>
                            <div className="relative p-8 rounded-3xl bg-[#090514] border border-white/10 shadow-2xl">
                                <div className="flex justify-center mb-6">
                                    <div className="p-3 bg-white/5 rounded-full border border-white/10">
                                        <Sparkles className="w-8 h-8 text-manifest-accent animate-pulse" />
                                    </div>
                                </div>
                                <h2 className="text-center text-xl font-serif text-manifest-accent mb-6 uppercase tracking-widest text-glow">Kozmik Mesajın</h2>
                                <div className="text-lg leading-relaxed text-center italic text-white/90 mb-8 font-light border-l-2 border-manifest-primary/30 pl-4 py-2">
                                    "{cosmicMessage}"
                                </div>
                                <button
                                    onClick={handleNext}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center gap-2 transition group-hover:border-manifest-primary/50 text-white"
                                >
                                    <span>Niyet Et ve Başla</span>
                                    <ArrowRight className="w-5 h-5 ml-1" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
