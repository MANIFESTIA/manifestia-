"use client";
import React, { useState, useEffect } from 'react';
import { VOICE_GALLERY, VoicePersona } from '@/lib/voice/voice-service';
import { useVoice } from '@/hooks/useVoice';
import { Play, Check, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceSettingsProps {
    isOpen: boolean;
    onClose: () => void;
    currentPersona: VoicePersona;
    onSelect: (persona: VoicePersona) => void;
}

export default function VoiceSettings({ isOpen, onClose, currentPersona, onSelect }: VoiceSettingsProps) {
    const { speak, stop, isPlaying } = useVoice();
    const [previewing, setPreviewing] = useState<VoicePersona | null>(null);

    // Önizleme bittiğinde state'i sıfırla
    useEffect(() => {
        if (!isPlaying) setPreviewing(null);
    }, [isPlaying]);

    const handlePreview = (persona: VoicePersona, name: string) => {
        if (previewing === persona) {
            stop();
            setPreviewing(null);
        } else {
            setPreviewing(persona);
            speak(`Ben ${name}. Kozmik yolculuğunda sana rehberlik etmek için buradayım.`, persona);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-lg bg-[#0F0F12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="text-xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-manifest-primary to-manifest-secondary">
                        Kozmik Ses Galerisi
                    </h2>
                    <button onClick={onClose} className="text-manifest-muted hover:text-white transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-6 hide-scrollbar flex-1">
                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-wider text-manifest-muted font-medium ml-1">Kadın Sesleri</h3>
                        <div className="grid gap-3">
                            {(Object.keys(VOICE_GALLERY) as VoicePersona[])
                                .filter(k => VOICE_GALLERY[k].gender === 'FEMALE')
                                .map(key => (
                                    <VoiceOption
                                        key={key}
                                        id={key}
                                        config={VOICE_GALLERY[key]}
                                        isSelected={currentPersona === key}
                                        isPreviewing={previewing === key}
                                        onSelect={() => onSelect(key)}
                                        onPreview={() => handlePreview(key, VOICE_GALLERY[key].name)}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-wider text-manifest-muted font-medium ml-1">Erkek Sesleri</h3>
                        <div className="grid gap-3">
                            {(Object.keys(VOICE_GALLERY) as VoicePersona[])
                                .filter(k => VOICE_GALLERY[k].gender === 'MALE')
                                .map(key => (
                                    <VoiceOption
                                        key={key}
                                        id={key}
                                        config={VOICE_GALLERY[key]}
                                        isSelected={currentPersona === key}
                                        isPreviewing={previewing === key}
                                        onSelect={() => onSelect(key)}
                                        onPreview={() => handlePreview(key, VOICE_GALLERY[key].name)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function VoiceOption({ id, config, isSelected, isPreviewing, onSelect, onPreview }: any) {
    return (
        <div
            onClick={onSelect}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${isSelected
                    ? 'bg-manifest-primary/10 border-manifest-primary/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
        >
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-manifest-primary text-white' : 'bg-white/10 text-manifest-muted group-hover:bg-white/20'
                    }`}>
                    {isSelected ? <Volume2 className="w-5 h-5" /> : <span className="text-xs font-bold opacity-50">{config.name[0]}</span>}
                </div>
                <div>
                    <h4 className={`font-medium ${isSelected ? 'text-white' : 'text-manifest-text'}`}>{config.name}</h4>
                    <span className="text-xs text-manifest-muted capitalize">
                        {id.toLowerCase().replace('_', ' ')}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={(e) => { e.stopPropagation(); onPreview(); }}
                    className="p-2 rounded-full hover:bg-white/10 text-manifest-primary transition"
                    title="Önizle"
                >
                    {isPreviewing ? <div className="w-4 h-4 bg-current animate-pulse rounded-sm" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                {isSelected && <Check className="w-5 h-5 text-manifest-primary" />}
            </div>
        </div>
    );
}
