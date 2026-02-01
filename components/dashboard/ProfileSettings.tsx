"use client";
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/lib/UserContext';
import { LogOut, X, User, BookOpen, Star, Camera, Upload, Calendar, MapPin, Clock, Moon, Edit2, Check, Save, ArrowUpCircle } from 'lucide-react';


interface ProfileSettingsProps {
    onClose: () => void;
    onOpenJournal: () => void;
}

// Zodiac Calculation Helper
const getZodiacSign = (dateString?: string): string => {
    if (!dateString) return "Bilinmiyor";

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Kova";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Balık";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Koç";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Boğa";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "İkizler";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Yengeç";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Aslan";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Başak";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Terazi";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Akrep";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Yay";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Oğlak";

    return "Bilinmiyor";
};

// Rising Sign Calculation Helper (Simplified)
const getRisingSign = (dateString?: string, timeString?: string): string => {
    if (!dateString || !timeString) return "Bilinmiyor";

    const sunSign = getZodiacSign(dateString);
    if (sunSign === "Bilinmiyor") return "Bilinmiyor";

    const signs = ["Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];
    const sunSignIndex = signs.indexOf(sunSign);

    // Parse Birth Time
    const [hours, minutes] = timeString.split(':').map(Number);

    // Adjusted Heuristic for Turkey (GMT+3)
    // 1. Subtract 2 hours ~ shifts "Sun Sign Rising" start to ~08:00 instead of 06:00
    //    This accounts for Turkey's fixed GMT+3 timezone (-1h standard, -1h Long Ascension compensation)
    // 2. Base calculation: (Hour - 6) / 2
    //    New calculation: (Hour - 8) / 2
    const offset = Math.floor((hours - 8) / 2);

    let risingIndex = (sunSignIndex + offset) % 12;
    if (risingIndex < 0) risingIndex += 12;

    return signs[risingIndex];
};

export default function ProfileSettings({ onClose, onOpenJournal }: ProfileSettingsProps) {
    const { user, logout, updateUser } = useUser();

    // Body Scroll Lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    // Edit Mode State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        birthDate: '',
        birthTime: '',
        birthCity: ''
    });

    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name || '',
                birthDate: user.birthDate || '',
                birthTime: user.birthTime || '',
                birthCity: user.birthCity || ''
            });
        }
    }, [user]);

    // Calculate Zodiac (Dynamic based on editForm when editing, or user data when not)
    const currentZodiac = useMemo(() => {
        const dateToCheck = isEditing ? editForm.birthDate : user?.birthDate;
        return getZodiacSign(dateToCheck);
    }, [user?.birthDate, isEditing, editForm.birthDate]);

    // Calculate Rising Sign
    const currentRising = useMemo(() => {
        const dateToCheck = isEditing ? editForm.birthDate : user?.birthDate;
        const timeToCheck = isEditing ? editForm.birthTime : user?.birthTime;
        return getRisingSign(dateToCheck, timeToCheck);
    }, [user?.birthDate, user?.birthTime, isEditing, editForm.birthDate, editForm.birthTime]);


    const handleLogout = () => {
        if (confirm("Kozmik kayıtlardan çıkış yapmak istiyor musun?")) {
            logout();
            onClose();
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 500 * 1024) {
            alert("Resim boyutu 500KB'dan küçük olmalıdır.");
            return;
        }

        setUploading(true);

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;

            try {
                const res = await fetch('/api/user/avatar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user?.id, avatar: base64 })
                });
                const data = await res.json();

                if (data.success) {
                    updateUser({ avatar: data.avatar });
                } else {
                    alert(data.error || "Yükleme başarısız.");
                }
            } catch (error) {
                console.error("Upload failed", error);
                alert("Bağlantı hatası.");
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const toggleEdit = () => {
        if (isEditing) {
            // Cancel edit
            setIsEditing(false);
            // Reset form
            if (user) {
                setEditForm({
                    name: user.name || '',
                    birthDate: user.birthDate || '',
                    birthTime: user.birthTime || '',
                    birthCity: user.birthCity || ''
                });
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleSave = async () => {
        try {
            const res = await fetch('/api/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, ...editForm })
            });
            const data = await res.json();

            if (data.success) {
                updateUser(data.user);
                setIsEditing(false);
            } else {
                alert(data.error || "Güncelleme başarısız.");
            }
        } catch (error) {
            alert("Bağlantı hatası.");
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
                className="relative w-full max-w-sm glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-manifest-primary/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif text-white text-glow">Hesap</h2>
                    <div className="flex items-center gap-2">
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <button onClick={toggleEdit} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60">
                                    <X className="w-5 h-5" />
                                </button>
                                <button onClick={handleSave} className="p-2 rounded-full bg-manifest-primary text-white hover:bg-manifest-primary/80 transition-colors shadow-lg shadow-manifest-primary/20">
                                    <Save className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button onClick={toggleEdit} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                                <Edit2 className="w-5 h-5" />
                            </button>
                        )}

                        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-manifest-muted ml-1">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="flex flex-col items-center mb-6">
                    {/* Avatar */}
                    <div
                        onClick={handleAvatarClick}
                        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-manifest-primary to-manifest-secondary p-[2px] mb-4 shadow-lg shadow-manifest-primary/20 cursor-pointer group"
                    >
                        <div className="w-full h-full rounded-full bg-[#0F1629] flex items-center justify-center relative overflow-hidden">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-serif text-white relative z-10">{user?.name?.charAt(0)}</span>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                                <Camera className="w-8 h-8 text-white" />
                            </div>

                            {/* Loading State */}
                            {uploading && (
                                <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                </div>
                            )}

                            {!user?.avatar && !uploading && <div className="absolute inset-0 bg-manifest-primary/10 animate-pulse-slow pointer-events-none"></div>}
                        </div>
                        {/* Edit Badge */}
                        <div className="absolute bottom-0 right-0 bg-manifest-primary rounded-full p-1.5 border-2 border-[#0F1629] shadow-sm group-hover:scale-110 transition-transform">
                            <Upload className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {isEditing ? (
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            className="text-xl font-medium text-white bg-white/5 border border-white/10 rounded-lg px-3 py-1 mb-1 text-center w-full focus:outline-none focus:border-manifest-primary/50"
                            placeholder="İsminiz"
                        />
                    ) : (
                        <h3 className="text-2xl font-serif text-white mb-4">{user?.name}</h3>
                    )}

                    {/* Birth Chart Data Display */}
                    <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/5 backdrop-blur-md space-y-3">
                        <div className="flex items-center justify-between text-sm text-manifest-muted/80 border-b border-white/5 pb-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-manifest-primary" />
                                <span>Doğum Tarihi</span>
                            </div>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={editForm.birthDate}
                                    onChange={(e) => setEditForm({ ...editForm, birthDate: e.target.value })}
                                    className="bg-black/20 text-white rounded px-2 py-1 text-xs border border-white/10 focus:border-manifest-primary/50 outline-none"
                                />
                            ) : (
                                <span className="text-white font-medium">{user?.birthDate || "Belirtilmedi"}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-manifest-muted/80 border-b border-white/5 pb-2">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-manifest-secondary" />
                                <span>Doğum Saati</span>
                            </div>
                            {isEditing ? (
                                <input
                                    type="time"
                                    value={editForm.birthTime}
                                    onChange={(e) => setEditForm({ ...editForm, birthTime: e.target.value })}
                                    className="bg-black/20 text-white rounded px-2 py-1 text-xs border border-white/10 focus:border-manifest-primary/50 outline-none"
                                />
                            ) : (
                                <span className="text-white font-medium">{user?.birthTime || "Belirtilmedi"}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-manifest-muted/80 border-b border-white/5 pb-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-manifest-accent" />
                                <span>Doğum Yeri</span>
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editForm.birthCity}
                                    onChange={(e) => setEditForm({ ...editForm, birthCity: e.target.value })}
                                    className="bg-black/20 text-white rounded px-2 py-1 text-xs text-right border border-white/10 focus:border-manifest-primary/50 outline-none max-w-[120px]"
                                    placeholder="Şehir"
                                />
                            ) : (
                                <span className="text-white font-medium">{user?.birthCity || "Belirtilmedi"}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm text-manifest-muted/80 pt-1">
                            <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4 text-purple-400" />
                                <span>Burç</span>
                            </div>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold font-serif">{currentZodiac}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-manifest-muted/80 pt-1 border-t border-white/5 mt-1">
                            <div className="flex items-center gap-2">
                                <ArrowUpCircle className="w-4 h-4 text-cyan-400" />
                                <span>Yükselen</span>
                            </div>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-bold font-serif">{currentRising}</span>
                        </div>
                    </div>

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
                    <p className="text-[10px] text-manifest-muted/40 uppercase tracking-widest">THEMANİFEST</p>
                </div>

            </motion.div>
        </div>
    );
}
