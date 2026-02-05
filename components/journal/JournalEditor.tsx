"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Smile, Frown, Meh, Zap, CloudRain } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import { getApiUrl } from '@/lib/api';

const MOODS = [
    { id: 'happy', label: 'Mutlu', icon: Smile, color: 'bg-yellow-500' },
    { id: 'calm', label: 'Sakin', icon: Meh, color: 'bg-blue-400' },
    { id: 'energetic', label: 'Enerjik', icon: Zap, color: 'bg-orange-500' },
    { id: 'anxious', label: 'Endişeli', icon: CloudRain, color: 'bg-gray-500' },
    { id: 'sad', label: 'Üzgün', icon: Frown, color: 'bg-indigo-500' },
];

interface JournalEditorProps {
    onSave: () => void;
    onCancel: () => void;
}

export default function JournalEditor({ onSave, onCancel }: JournalEditorProps) {
    const { user, addXp } = useUser();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!content.trim() || !selectedMood) {
            alert("Lütfen bir his ve içerik ekle.");
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(getApiUrl('api/journal'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user?.id,
                    title: title || "Günlük Düşünceler",
                    mood: selectedMood,
                    content
                })
            });

            if (res.ok) {
                // Reward XP for journaling (Client side visual, server logic should handle real xp ideally)
                // For now, simple client feedback
                addXp(15);
                onSave();
            } else {
                alert("Kaydedilirken bir hatayla karşılaştık.");
            }
        } catch (e) {
            console.error(e);
            alert("Bağlantı hatası.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col h-full max-h-[600px]"
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-white">İç Dökümü</h3>
                <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition">
                    <X className="w-5 h-5 text-white/60" />
                </button>
            </div>

            {/* Mood Selector */}
            <div className="mb-6">
                <label className="text-xs text-manifest-muted uppercase tracking-widest block mb-3">Bugün Ruh Halin Nasıl?</label>
                <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {MOODS.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setSelectedMood(m.id)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all min-w-[70px] ${selectedMood === m.id ? 'bg-white/10 ring-1 ring-white/50 scale-105' : 'bg-white/5 hover:bg-white/10 opacity-70 hover:opacity-100'}`}
                        >
                            <div className={`p-2 rounded-full ${m.color} text-white`}>
                                <m.icon className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] text-white/80">{m.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4 flex-1 flex flex-col">
                <input
                    type="text"
                    placeholder="Başlık (İsteğe bağlı)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 p-2 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition font-serif text-lg"
                />

                <textarea
                    placeholder="Zihninden geçenleri kozmosa bırak..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition resize-none leading-relaxed"
                />
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium shadow-lg shadow-purple-900/40 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Kozmosa Bırak
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
