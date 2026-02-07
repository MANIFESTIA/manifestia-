import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useChat, Message } from '@ai-sdk/react';
import { useVoice } from '@/hooks/useVoice';
import { VoicePersona } from '@/lib/voice/voice-service';
import { Mic, MicOff, Send, Sparkles, Volume2, Square, Globe, Settings, ArrowLeft, Headphones, X, ArrowUp, AudioWaveform } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import VoiceSettings from '@/components/settings/VoiceSettings';

// --- STT Hook (Web Speech API) ---
const useSpeechToText = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false; // Turn off for auto-submit logic
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

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (e) {
                // Already started
            }
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, []);

    return { isListening, transcript, startListening, stopListening, setTranscript };
};

interface ChatInterfaceProps {
    onBack?: () => void;
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
    const { user } = useUser();
    const { speak, stop: stopVoice, isPlaying: isVoicePlaying } = useVoice();
    const scrollRef = useRef<HTMLDivElement>(null);

    // Body Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Voice Mode State
    const [isVoiceMode, setIsVoiceMode] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState<'IDLE' | 'LISTENING' | 'PROCESSING' | 'SPEAKING'>('IDLE');

    // Ses Ayarları State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState<VoicePersona>('COSMIC_SAGE');

    // Load Persona
    useEffect(() => {
        const saved = localStorage.getItem('manifestia_voice_persona');
        if (saved) setSelectedPersona(saved as VoicePersona);
    }, []);

    const handleVoiceSelect = (persona: VoicePersona) => {
        setSelectedPersona(persona);
        localStorage.setItem('manifestia_voice_persona', persona);
    };

    // Vercel AI SDK
    // Manual State Management
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setLoading] = useState(false);

    // Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // Manual Send Message
    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

        console.log('📤 Mesaj gönderiliyor:', message);
        setLoading(true);
        setInput(''); // Clear input immediately

        // Add user message temporarily
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: message };
        setMessages(prev => [...prev, userMsg]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    sessionId: 'test-session'
                })
            });

            console.log('📥 API Response:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('❌ API Error Data:', errorData);
                throw new Error(errorData.error || errorData.details || `API Hatası: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Yanıt:', data);

            // Add assistant message
            const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response };

            setMessages(prev => [...prev, assistantMsg]);

            // Voice integration
            if (isVoiceMode) {
                setVoiceStatus('SPEAKING');
                speak(data.response, selectedPersona);
            }

        } catch (error) {
            console.error('❌ Chat error:', error);
            // Optionally add error message to chat
            setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "Bir hata oluştu. Lütfen tekrar deneyin." }]);
        } finally {
            setLoading(false);
        }
    };

    // Wrapper for form submission to match existing calls
    const handleSubmit = async (e?: { preventDefault?: () => void }, data?: { data?: any }) => {
        if (e && e.preventDefault) e.preventDefault();
        const msg = data?.data?.content || input;
        await sendMessage(msg);
    };

    // STT Integration
    const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechToText();

    // --- Voice Mode Logic Loop ---

    // 1. Handle STT Result
    useEffect(() => {
        if (transcript) {
            if (isVoiceMode) {
                // Voice Mode: Auto Submit
                setInput(transcript);
                setVoiceStatus('PROCESSING');
                // Small delay to ensure state update before submit
                setTimeout(() => {
                    const formEvent = { preventDefault: () => { } } as any;
                    handleSubmit(formEvent, { data: { ...user, content: transcript } as any });
                    setTranscript('');
                }, 100);
            } else {
                // Manual Mode: Append to input
                setInput((prev) => prev + (prev ? ' ' : '') + transcript);
                setTranscript('');
            }
        }
    }, [transcript, isVoiceMode, user, handleSubmit, setInput, setTranscript]);

    // 2. Handle Speaking End (Loop back to Listening)
    // We need to track when 'isPlaying' goes from true to false while in VoiceMode
    const wasPlayingRef = useRef(false);
    useEffect(() => {
        if (isVoiceMode) {
            if (wasPlayingRef.current && !isVoicePlaying && voiceStatus === 'SPEAKING') {
                // Finished speaking -> Start Listening again
                setVoiceStatus('LISTENING');
                startListening();
            }
        }
        wasPlayingRef.current = isVoicePlaying;
    }, [isVoicePlaying, isVoiceMode, voiceStatus, startListening]);

    // 3. Start Cycle when entering Voice Mode
    const toggleVoiceMode = () => {
        if (!isVoiceMode) {
            setIsVoiceMode(true);
            setVoiceStatus('SPEAKING'); // Fake speaking state to allow "intro"
            speak(`Merhaba ${user?.name || ''}, seni dinliyorum.`, selectedPersona);
            // After speak finishes, loop above will catch it and start listening
        } else {
            setIsVoiceMode(false);
            setVoiceStatus('IDLE');
            stopVoice();
            stopListening();
        }
    };

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleMicClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <div
            className="flex flex-col h-[calc(100vh-140px)] relative font-sans"
            onContextMenu={(e) => e.preventDefault()}
        >
            <VoiceSettings
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                currentPersona={selectedPersona}
                onSelect={handleVoiceSelect}
            />

            {/* Voice Mode Overlay */}
            <AnimatePresence>
                {isVoiceMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                    >
                        <button
                            onClick={toggleVoiceMode}
                            className="absolute top-6 right-6 p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Visualizer Orb */}
                        <div className="relative w-48 h-48 flex items-center justify-center mb-12">
                            <motion.div
                                animate={{
                                    scale: voiceStatus === 'SPEAKING' || isVoicePlaying ? [1, 1.2, 1] : 1,
                                    opacity: 0.5
                                }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className={`absolute inset-0 rounded-full blur-3xl ${voiceStatus === 'LISTENING' ? 'bg-red-500/40' :
                                    voiceStatus === 'SPEAKING' ? 'bg-manifest-primary/40' :
                                        'bg-blue-500/20'
                                    }`}
                            />
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 backdrop-blur-md transition-all duration-500 ${voiceStatus === 'LISTENING' ? 'border-red-400 bg-red-900/20' :
                                voiceStatus === 'SPEAKING' ? 'border-manifest-primary bg-manifest-primary/20' :
                                    'border-white/10 bg-white/5'
                                }`}>
                                {voiceStatus === 'LISTENING' ? (
                                    <Mic className="w-12 h-12 text-red-400" />
                                ) : (
                                    <Sparkles className="w-12 h-12 text-manifest-primary animate-pulse" />
                                )}
                            </div>
                        </div>

                        <div className="text-center space-y-4 max-w-md">
                            <h3 className="text-2xl font-light text-white">
                                {voiceStatus === 'LISTENING' ? 'Dinliyorum...' :
                                    voiceStatus === 'PROCESSING' ? 'Düşünüyor...' :
                                        voiceStatus === 'SPEAKING' ? 'Konuşuyor...' : 'Hazır'}
                            </h3>
                            <p className="text-white/40">
                                {voiceStatus === 'LISTENING' ? transcript || "..." :
                                    "Sohbeti sonlandırmak için kapat butonuna bas."}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Normal Link Header Buttons */}
            {!isVoiceMode && (
                <>
                    {onBack && (
                        <div className="absolute top-0 left-0 p-4 z-10">
                            <button onClick={onBack} className="p-2 rounded-full bg-manifest-surface/50 border border-white/5 text-white/70 hover:text-white transition-all shadow-lg backdrop-blur-md">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    <div className="absolute top-0 right-0 p-4 z-10">
                        <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-full bg-manifest-surface/50 border border-white/5 text-white/70 hover:text-white transition-all shadow-lg backdrop-blur-md">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 hide-scrollbar pt-16 pb-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2 opacity-50">
                            <Sparkles className="w-8 h-8 text-manifest-primary/50" />
                        </div>
                        <p className="font-light text-lg opacity-50">"Evren seni dinliyor..."</p>

                        {/* Suggested Questions */}
                        <div className="grid grid-cols-2 gap-3 mt-8 w-full max-w-md px-4">
                            {[
                                "Bu ay benim için nasıl geçecek?",
                                "Aşk hayatım hakkında ne söylersin?",
                                "Kariyer için tavsiyelerin var mı?",
                                "Bugün enerjim nasıl?"
                            ].map((question, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setInput(question);
                                        // Small delay to ensure state update before submit
                                        setTimeout(() => {
                                            // Create a synthetic event
                                            const syntheticEvent = {
                                                preventDefault: () => { },
                                            } as React.FormEvent<HTMLFormElement>;
                                            handleSubmit(syntheticEvent);
                                        }, 100);
                                    }}
                                    className="p-4 text-xs md:text-sm text-left bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-white/60 hover:text-white transition-all hover:-translate-y-1 duration-300"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {messages.map((m: Message) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`relative max-w-[85%] rounded-3xl p-4 px-5 text-sm md:text-base leading-relaxed ${m.role === 'user'
                                ? 'bg-[#2f2f2f] text-white rounded-br-sm'
                                : 'bg-transparent text-white/90'
                                }`}>
                                {m.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-manifest-primary to-blue-600 flex items-center justify-center absolute -left-10 top-0">
                                        <Sparkles className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <p className="whitespace-pre-wrap">{m.content}</p>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && !isVoiceMode && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="ml-10 bg-transparent text-white/50 text-sm italic">
                                Yazıyor...
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={scrollRef} />
            </div>

            {/* ChatGPT Style Input Area */}
            <div className="w-full px-4 pb-4 z-20">
                <div className="flex items-end gap-4">

                    {/* Input Pills Container */}
                    <div className="flex-1 bg-[#2f2f2f] rounded-[26px] p-2 pl-4 flex items-center relative border border-white/5 transition-colors focus-within:border-white/10 shadow-lg group-hover:border-white/20">

                        <input
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 min-h-[44px] max-h-32 text-[16px] leading-[20px] font-normal"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Evrene mesaj gönder..."
                            disabled={isListening || isLoading}
                        />

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-2 pr-1 ml-2">
                            {/* Listening Indicator / Mic Button */}
                            {isListening ? (
                                <button onClick={handleMicClick} className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                </button>
                            ) : (
                                !input.trim() && (
                                    <button onClick={handleMicClick} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                                        <Mic className="w-5 h-5" />
                                    </button>
                                )
                            )}

                            {/* Send Button (Arrow Up) */}
                            <button
                                onClick={(e) => input.trim() && handleSubmit(e as any)}
                                disabled={!input.trim() || isLoading}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${input.trim()
                                    ? 'bg-white text-black hover:bg-gray-200 shadow-lg scale-100'
                                    : 'bg-white/5 text-white/10 cursor-default scale-95'
                                    }`}
                            >
                                <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    {/* New Voice Mode Button - ChatGPT Style Waveform Icon */}
                    <button
                        onClick={toggleVoiceMode}
                        className="w-[80px] h-[56px] rounded-full bg-[#2f2f2f] border border-white/10 hover:bg-white/5 flex items-center justify-center text-white transition-all shadow-xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                        title="Sesli Konuşma Modu"
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <AudioWaveform className="w-8 h-8 text-white/90 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    );
}
