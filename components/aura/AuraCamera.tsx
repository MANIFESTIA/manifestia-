"use client";

import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload, RefreshCw, Sparkles, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuraCameraProps {
    onCapture: (imageData: string) => void;
    onClose: () => void;
}

export default function AuraCamera({ onCapture, onClose }: AuraCameraProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
            }
        } catch (err) {
            setError("Kameraya erişilemedi. Lütfen izinleri kontrol et.");
        }
    };

    const stopCamera = useCallback(() => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
        }
    }, []);

    const capturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);

            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            stopCamera();
            onCapture(dataUrl);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onCapture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Bileşen unmount olunca kamerayı kapat
    React.useEffect(() => {
        return () => stopCamera();
    }, [stopCamera]);

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-6 h-full text-center relative">
            <button onClick={onClose} className="absolute top-0 right-0 p-2 text-white/50 hover:text-white">
                <X className="w-6 h-6" />
            </button>

            {!isStreaming ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 w-full max-w-sm"
                >
                    <div className="w-24 h-24 mx-auto bg-manifest-primary/10 rounded-full flex items-center justify-center animate-pulse-slow">
                        <Sparkles className="w-12 h-12 text-manifest-primary" />
                    </div>

                    <h2 className="text-2xl font-serif">Ruhunu Tara</h2>
                    <p className="text-manifest-muted">
                        Yapay zeka, enerjini okumak için seni görmek istiyor.
                        Auranın rengini keşfetmeye hazır mısın?
                    </p>

                    <div className="grid gap-3 pt-4">
                        <button
                            onClick={startCamera}
                            className="flex items-center justify-center gap-2 w-full py-4 bg-manifest-primary text-white rounded-xl hover:bg-manifest-primary/90 transition shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        >
                            <Camera className="w-5 h-5" />
                            Kamerayı Aç
                        </button>

                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileUpload}
                            />
                            <button className="flex items-center justify-center gap-2 w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition">
                                <Upload className="w-5 h-5" />
                                Fotoğraf Yükle
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </motion.div>
            ) : (
                <div className="relative w-full max-w-sm aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover transform scale-x-[-1]" // Ayna efekti
                        onLoadedMetadata={(e) => (e.target as HTMLVideoElement).play()}
                    />

                    {/* Tarayıcı Efekti */}
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-manifest-primary/30 m-4 rounded-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-manifest-primary/50 blur-sm animate-scan"></div>
                    </div>

                    <button
                        onClick={capturePhoto}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-manifest-primary/50 shadow-lg flex items-center justify-center transition hover:scale-105 active:scale-95"
                    >
                        <div className="w-12 h-12 bg-white rounded-full border-2 border-black/10"></div>
                    </button>

                    <button
                        onClick={stopCamera}
                        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white backdrop-blur-sm"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
