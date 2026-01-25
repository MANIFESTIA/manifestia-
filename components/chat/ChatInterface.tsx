"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useChat, Message } from 'ai/react';
import { useVoice } from '@/hooks/useVoice';
import { VoicePersona } from '@/lib/voice/voice-service';
import { Mic, MicOff, Send, Sparkles, Volume2, Square, Globe, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import VoiceSettings from '@/components/settings/VoiceSettings';

// --- STT Hook (Web Speech API) ---
// Bu hook'u buraya dahil ediyoruz (şimdilik), ileride ayrı dosyaya taşıyabiliriz.
const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'tr-TR';

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
            };
            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                console.warn("Already started");
            }
        } else {
            alert("Tarayıcınız sesli komutu desteklemiyor.");
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    return { isListening, transcript, startListening, stopListening, setTranscript };
};


export default function ChatInterface() {
    const { user } = useUser();
    const { speak, stop: stopVoice, isPlaying: isVoicePlaying } = useVoice();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Ses Ayarları State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState<VoicePersona>('COSMIC_SAGE');

    // LocalStorage'dan sesi yükle
    useEffect(() => {
        const saved = localStorage.getItem('manifestia_voice_persona');
        if (saved) setSelectedPersona(saved as VoicePersona);
    }, []);

    const handleVoiceSelect = (persona: VoicePersona) => {
        setSelectedPersona(persona);
        localStorage.setItem('manifestia_voice_persona', persona);
    };

    // Vercel AI SDK
    const { messages, input, handleInputChange, handleSubmit, setInput } = useChat({
        api: '/api/chat',
        body: { data: user }, // Kullanıcı profilini gönder
        onFinish: (message: Message) => {
            // Otomatik okuma opsiyonel olabilir
            // speak(message.content, selectedPersona); 
        }
    });

    // STT Integration
    const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechToText();

    // Ses kaydı bitince input'a yaz
    useEffect(() => {
        if (transcript) {
            setInput((prev: string) => prev + (prev ? ' ' : '') + transcript);
            setTranscript(''); // Temizle
        }
    }, [transcript, setInput]);

    // Otomatik scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] relative">
            <VoiceSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentPersona={selectedPersona}
                onSelect={handleVoiceSelect}
            />

            {/* Header / Ayarlar Butonu */}
            <div className="absolute top-0 right-0 p-4 z-10">
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 rounded-full bg-manifest-surface border border-white/5 text-manifest-muted hover:text-manifest-primary hover:border-manifest-primary/30 transition-all shadow-lg backdrop-blur-md"
                    title="Ses Ayarları"
                >
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            {/* Arka Plan Efekti */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-manifest-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-manifest-secondary/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
            </div>

            {/* Mesaj Listesi */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 hide-scrollbar pt-12">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                        <Sparkles className="w-12 h-12 text-manifest-primary/50" />
                        <p className="font-serif italic text-lg">"Seni dinliyorum, {user?.name || 'Ruh'}..."</p>
                    </div>
                )}

                <AnimatePresence>
                    {messages.map((m: Message) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`relative max-w-[85%] rounded-2xl p-4 shadow-lg ${m.role === 'user'
                                    ? 'bg-manifest-primary/20 text-white rounded-tr-sm border border-manifest-primary/30'
                                    : 'bg-manifest-surface text-manifest-text rounded-tl-sm border border-white/10'
                                }`}>
                                <p className="leading-relaxed text-sm md:text-base font-light whitespace-pre-wrap">{m.content}</p>

                                {m.role === 'assistant' && (
                                    <button
                                        onClick={() => isVoicePlaying ? stopVoice() : speak(m.content, selectedPersona)}
                                        className="absolute -bottom-6 left-0 p-2 text-manifest-muted hover:text-manifest-primary transition-colors hover:bg-white/5 rounded-full"
                                        title="Seslendir"
                                    >
                                        {isVoicePlaying ? <Square className="w-3 h-3 fill-current" /> : <Volume2 className="w-3 h-3" />}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={scrollRef} />
            </div>

            {/* Input Alanı (Energy Bar) */}
            <div className="mt-4 relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-2 mx-2 mb-2 flex items-center shadow-2xl z-20">
                {/* Mikrofon Butonu (Visualizer Effects) */}
                <button
                    onClick={handleMicClick}
                    className={`p-3 rounded-full transition-all duration-300 relative group overflow-hidden ${isListening
                        ? 'bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                        : 'bg-white/5 text-manifest-muted hover:text-white hover:bg-white/10'
                        }`}
                >
                    {isListening ? (
                        <>
                            <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-full"></div>
                            <MicOff className="w-5 h-5 relative z-10" />
                        </>
                    ) : (
                        <Mic className="w-5 h-5 relative z-10" />
                    )}
                </button>

                <form onSubmit={handleSubmit} className="flex-1 flex px-2 text-black">
                    <input
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/30 px-3 font-light text-sm md:text-base"
                        value={input}
                        onChange={handleInputChange}
                        placeholder={isListening ? "Dinliyorum..." : "Evrene bir mesaj gönder..."}
                        disabled={isListening}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-3 bg-manifest-primary text-manifest-background rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 transform active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
