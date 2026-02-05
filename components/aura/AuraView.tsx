"use client";

import React, { useState } from 'react';
import AuraCamera from './AuraCamera';
import { getApiUrl } from '@/lib/api';
import AuraResult, { AuraAnalysis } from './AuraResult';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCosmicMemory } from '@/hooks/useCosmicMemory';

export default function AuraView({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<'camera' | 'analyzing' | 'result'>('camera');
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AuraAnalysis | null>(null);
    const { saveAura } = useCosmicMemory();

    const handleCapture = async (capturedImage: string) => {
        setImage(capturedImage);
        setStep('analyzing');

        try {
            // API Çağrısı
            const response = await fetch(getApiUrl('api/aura'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: capturedImage })
            });

            if (!response.ok) throw new Error('Analiz hatası');

            const result = await response.json();
            setAnalysis(result);

            // HAFIZAYA KAYDET
            saveAura({
                color: result.color,
                colorName: result.colorName,
                meaning: result.meaning,
                suggestion: result.suggestion,
                imageBase64: capturedImage
            });

            setStep('result');

        } catch (error) {
            console.error(error);
            alert("Ruhunu okurken bir hata oluştu. Lütfen tekrar dene.");
            setStep('camera');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black">
            <AnimatePresence mode="wait">
                {step === 'camera' && (
                    <motion.div
                        key="camera"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full"
                    >
                        <AuraCamera onCapture={handleCapture} onClose={onClose} />
                    </motion.div>
                )}

                {step === 'analyzing' && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-t-4 border-manifest-primary animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-manifest-primary animate-pulse" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif">Enerjin Okunuyor...</h2>
                            <p className="text-manifest-muted animate-pulse">Üçüncü göz açılıyor...</p>
                        </div>
                    </motion.div>
                )}

                {step === 'result' && image && analysis && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full"
                    >
                        <AuraResult
                            image={image}
                            analysis={analysis}
                            onRetake={() => {
                                setStep('camera');
                                setImage(null);
                                setAnalysis(null);
                            }}
                        />
                        {/* Sonuç ekranında da kapatma butonu olsun, ama result overlay olduğu için manuel ekliyoruz */}
                        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 text-white rounded-full z-50 hover:bg-black/50">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
