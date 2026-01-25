"use client";

import React, { useState } from 'react';
import { useUser } from '@/lib/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import TribeChat from './TribeChat';

// --- MOCK DATA ---
const FRIENDS = [
    { id: 1, name: "Selin", avatar: "S", sign: "Akrep", online: true, aura: "#9b5de5" },
    { id: 2, name: "Can", avatar: "C", sign: "Aslan", online: false, aura: "#fee440" },
    { id: 3, name: "Elif", avatar: "E", sign: "Balık", online: true, aura: "#00bbf9" },
];

const FEED_ITEMS = [
    { id: 1, user: "Selin", action: "777 Ritüelini tamamladı ✨", time: "10dk önce", likes: 12 },
    { id: 2, user: "Can", action: "Tarot'ta 'Güneş' kartını çekti 🌞", time: "1sa önce", likes: 5 },
    { id: 3, user: "Elif", action: "Aura rengi: Mistik Turkuaz 🌊", time: "2sa önce", likes: 24 },
];

export default function TribeView() {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');
    const [selectedFriend, setSelectedFriend] = useState<typeof FRIENDS[0] | null>(null);

    return (
        <div className="flex flex-col h-full bg-[#0F0F12] text-white overflow-hidden pb-20 relative">
            <AnimatePresence>
                {selectedFriend && (
                    <TribeChat
                        key="chat"
                        friend={selectedFriend}
                        onClose={() => setSelectedFriend(null)}
                    />
                )}
            </AnimatePresence>

            {/* --- HEADER: RUH KARTI --- */}
            <div className="p-6 bg-gradient-to-b from-manifest-primary/20 to-transparent border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-manifest-surface border-2 border-manifest-primary p-1">
                            <img src={`https://api.dicebear.com/7.x/micah/svg?seed=${user?.name}`} alt="Avatar" className="w-full h-full rounded-full bg-black/50" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-black" title="Online"></div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-serif font-bold">{user?.name || "Ruh"}</h2>
                        <div className="flex gap-2 text-xs text-manifest-muted mt-1">
                            <span className="px-2 py-1 bg-white/5 rounded-md border border-white/10">{user?.sign || "Burç Seçilmedi"}</span>
                            <span className="px-2 py-1 bg-white/5 rounded-md border border-white/10">Seviye 3</span>
                        </div>
                    </div>
                    <button className="ml-auto p-2 bg-white/10 rounded-full hover:bg-white/20">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <div className="w-1 h-1 bg-white rounded-full mx-[1px]"></div>
                            <div className="w-1 h-1 bg-white rounded-full mx-[1px]"></div>
                            <div className="w-1 h-1 bg-white rounded-full mx-[1px]"></div>
                        </div>
                    </button>
                </div>

                {/* İstatistikler */}
                <div className="flex justify-between mt-6 px-2">
                    <div className="text-center">
                        <div className="text-xl font-bold">12</div>
                        <div className="text-xs text-manifest-muted">Ritüel</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">21</div>
                        <div className="text-xs text-manifest-muted">Gün Streak</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold">5</div>
                        <div className="text-xs text-manifest-muted">Mühür</div>
                    </div>
                </div>
            </div>

            {/* --- TABS --- */}
            <div className="flex border-b border-white/5 sticky top-0 bg-[#0F0F12]/80 backdrop-blur-md z-10">
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`flex-1 py-4 text-sm font-medium transition relative ${activeTab === 'feed' ? 'text-white' : 'text-manifest-muted'}`}
                >
                    Kabile Akışı
                    {activeTab === 'feed' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-manifest-primary" />}
                </button>
                <button
                    onClick={() => setActiveTab('friends')}
                    className={`flex-1 py-4 text-sm font-medium transition relative ${activeTab === 'friends' ? 'text-white' : 'text-manifest-muted'}`}
                >
                    Yoldaşlar
                    {activeTab === 'friends' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-manifest-primary" />}
                </button>
            </div>

            {/* --- CONTENT --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">

                {activeTab === 'feed' && (
                    <div className="space-y-4">
                        {FEED_ITEMS.map(item => (
                            <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-manifest-primary/20 flex items-center justify-center text-sm font-bold">
                                            {item.user[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{item.user}</h4>
                                            <p className="text-xs text-manifest-muted">{item.time}</p>
                                        </div>
                                    </div>
                                    <button className="text-manifest-muted hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                                </div>
                                <p className="text-sm text-white/90 mb-3 ml-13 pl-13">
                                    {item.action}
                                </p>
                                <div className="flex gap-4 border-t border-white/5 pt-3">
                                    <button className="flex items-center gap-1 text-xs text-manifest-muted hover:text-red-400 transition">
                                        <Heart className="w-4 h-4" /> {item.likes}
                                    </button>
                                    <button className="flex items-center gap-1 text-xs text-manifest-muted hover:text-blue-400 transition">
                                        <MessageCircle className="w-4 h-4" /> Yorum Yap
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-center py-8 text-manifest-muted text-xs">
                            Evren daha fazlasını hazırlıyor...
                        </div>
                    </div>
                )}

                {activeTab === 'friends' && (
                    <div className="space-y-2">
                        {/* Arama Barı */}
                        <div className="bg-white/5 rounded-lg flex items-center px-3 py-2 border border-white/5 mb-4">
                            <Search className="w-4 h-4 text-manifest-muted mr-2" />
                            <input placeholder="Ruh eşini ara..." className="bg-transparent text-sm w-full outline-none text-white placeholder-white/20" />
                        </div>

                        {FRIENDS.map(friend => (
                            <div
                                key={friend.id}
                                onClick={() => setSelectedFriend(friend)}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition group cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border-2" style={{ borderColor: friend.aura, backgroundColor: friend.aura + '20' }}>
                                            {friend.avatar}
                                        </div>
                                        {friend.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{friend.name}</h4>
                                        <span className="text-xs text-manifest-muted">{friend.sign}</span>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full bg-white/5 text-manifest-muted hover:text-manifest-primary hover:bg-white/10 transition opacity-0 group-hover:opacity-100">
                                    <MessageCircle className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FAB: Arkadaş Ekle */}
            <button className="absolute bottom-24 right-6 w-14 h-14 bg-manifest-primary rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center text-white hover:scale-105 transition hover:bg-manifest-secondary z-20">
                <UserPlus className="w-6 h-6" />
            </button>
        </div>
    );
}
