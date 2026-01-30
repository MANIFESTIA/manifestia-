"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Smile, Image as ImageIcon, MoreVertical } from 'lucide-react';
import { useUser } from '@/lib/UserContext';

interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them';
    time: string;
    type?: 'text' | 'sticker';
}

interface Friend {
    id: number;
    name: string;
    avatar: string;
    sign: string;
    aura: string;
}

interface TribeChatProps {
    friend: Friend;
    onClose: () => void;
}

export default function TribeChat({ friend, onClose }: TribeChatProps) {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Selam! Bugünün enerjisi çok yüksek, hissettin mi?", sender: 'them', time: "10:30" },
        { id: 2, text: "Evet! Sabah meditasyonumda inanılmaz bir sakinlik vardı.", sender: 'me', time: "10:32" },
        { id: 3, text: "Harika ✨ Ben de az önce Tarot çektim, Güneş geldi!", sender: 'them', time: "10:33" },
    ]);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInputText("");

        // Mock reply
        setTimeout(() => {
            const reply: Message = {
                id: Date.now() + 1,
                text: "Evren seni duyuyor! 🌌",
                sender: 'them',
                time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Istanbul' })
            };
            setMessages(prev => [...prev, reply]);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-[#0F0F12] flex flex-col"
        >
            {/* --- HEADER --- */}
            <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 -ml-2 hover:bg-white/10 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold border border-white/20" style={{ backgroundColor: friend.aura }}>
                            {friend.avatar}
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#0F0F12]"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">{friend.name}</h3>
                        <p className="text-xs text-manifest-primary flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> %88 Kozmik Uyum
                        </p>
                    </div>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full">
                    <MoreVertical className="w-5 h-5 text-white/70" />
                </button>
            </div>

            {/* --- MESSAGES --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/img/stars.png')] bg-fixed opacity-90">
                <div className="text-center text-xs text-white/30 my-4 uppercase tracking-widest">Bugün</div>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me'
                                ? 'bg-manifest-primary text-white rounded-tr-none shadow-[0_4px_15px_rgba(168,85,247,0.3)]'
                                : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                                }`}
                        >
                            {msg.text}
                            <div className={`text-[10px] mt-1 opacity-50 text-right`}>{msg.time}</div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* --- INPUT --- */}
            <div className="p-4 bg-white/5 border-t border-white/5 backdrop-blur-md pb-8">
                <div className="flex items-center gap-2 bg-white/5 rounded-full p-2 border border-white/5 pl-4">
                    <button className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-manifest-primary transition">
                        <Smile className="w-5 h-5" />
                    </button>
                    <input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Enerjini gönder..."
                        className="flex-1 bg-transparent outline-none text-sm text-white placeholder-white/30"
                    />
                    <button
                        onClick={handleSend}
                        className={`p-2 rounded-full transition ${inputText.trim() ? 'bg-manifest-primary text-white shadow-lg' : 'bg-white/10 text-white/30'}`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
