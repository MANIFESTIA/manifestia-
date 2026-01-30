"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import { LogOut, X, User, BookOpen, Star } from 'lucide-react';
import BadgesDisplay from '@/components/gamification/BadgesDisplay';

interface ProfileSettingsProps {
    onClose: () => void;
    onOpenJournal: () => void;
}

export default function ProfileSettings({ onClose, onOpenJournal }: ProfileSettingsProps) {
    const { user, logout } = useUser();

    const handleLogout = () => {
        if (confirm("Kozmik kayıtlardan çıkış yapmak istiyor musun?")) {
            logout();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-sm glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-manifest-primary/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-serif text-white text-glow">Hesap</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <X className="w-6 h-6 text-manifest-muted" />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-manifest-primary to-manifest-secondary p-[2px] mb-4 shadow-lg shadow-manifest-primary/20">
                        <div className="w-full h-full rounded-full bg-[#0F1629] flex items-center justify-center relative overflow-hidden">
                            <span className="text-4xl font-serif text-white relative z-10">{user?.name?.charAt(0)}</span>
                            <div className="absolute inset-0 bg-manifest-primary/10 animate-pulse-slow"></div>
                        </div>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-1">{user?.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-manifest-muted">
                        <span>{user?.birthCity}</span>
                        <span>•</span>
                        <span>{user?.birthDate}</span>
                    </div>
                </div>


                {/* Badges Section */}
                <div className="mb-8">
                    <BadgesDisplay />
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={onOpenJournal}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-manifest-primary/30 transition-all flex items-center gap-4 group"
                    >
                        <div className="p-2 rounded-lg bg-manifest-primary/20 text-manifest-primary group-hover:scale-110 transition-transform">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-medium text-white">Kozmik Günlük</h4>
                            <p className="text-xs text-manifest-muted">Geçmiş okumaların</p>
                        </div>
                        <Star className="w-4 h-4 text-manifest-muted opacity-50" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/10 hover:bg-red-500/20 hover:border-red-500/30 transition-all flex items-center gap-4 group mt-6"
                    >
                        <div className="p-2 rounded-lg bg-red-500/20 text-red-400 group-hover:scale-110 transition-transform">
                            <LogOut className="w-5 h-5" />
                        </div>
                        <div className="flex-1 text-left">
                            <h4 className="font-medium text-red-200">Çıkış Yap</h4>
                            <p className="text-xs text-red-200/60">Oturumu sonlandır</p>
                        </div>
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-[10px] text-manifest-muted/40 uppercase tracking-widest">TheManifest v0.1</p>
                </div>

            </motion.div >
        </div >
    );
}
