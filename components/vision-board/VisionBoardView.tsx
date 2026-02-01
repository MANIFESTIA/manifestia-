"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Plus, Image as ImageIcon, Trash2, Save, Sticker } from 'lucide-react';
import { useUser } from '@/lib/UserContext';
import CosmicBackground from '../layout/CosmicBackground';

const STICKERS = [
    '/stickers/manifest-1.png', // Placeholder paths - I will use emojis or reliable hosting if possible
    'https://cdn-icons-png.flaticon.com/512/2659/2659360.png', // Love
    'https://cdn-icons-png.flaticon.com/512/3199/3199853.png', // Money
    'https://cdn-icons-png.flaticon.com/512/2913/2913584.png', // Travel
    'https://cdn-icons-png.flaticon.com/512/744/744922.png',   // Home
];

interface BoardItem {
    id: string;
    imageUrl: string;
    x: number;
    y: number;
    scale: number;
    rotation: number;
    zIndex: number;
}

export default function VisionBoardView({ onClose }: { onClose: () => void }) {
    const { user } = useUser();
    const [items, setItems] = useState<BoardItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const constraintsRef = useRef(null);

    useEffect(() => {
        if (user?.id) fetchItems();
    }, [user?.id]);

    const fetchItems = async () => {
        const res = await fetch(`/api/vision-board?userId=${user?.id}`);
        if (res.ok) {
            setItems(await res.json());
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 5MB limit for S3 (generous)
        if (file.size > 5 * 1024 * 1024) {
            alert("Resim boyutu çok büyük! Lütfen 5MB altı bir resim seç.");
            return;
        }

        setLoading(true);

        try {
            // 1. Get Presigned URL
            const presignRes = await fetch('/api/upload/presigned', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: file.name, fileType: file.type })
            });

            if (!presignRes.ok) throw new Error('Yükleme linki alınamadı');
            const { uploadUrl, publicUrl } = await presignRes.json();

            // 2. Upload to S3
            const uploadRes = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: { "Content-Type": file.type }
            });

            if (!uploadRes.ok) throw new Error('S3 yüklemesi başarısız');

            // 3. Add to Board
            await addItem(publicUrl);

        } catch (error) {
            console.error(error);
            alert("Resim yüklenirken bir hata oluştu. Lütfen AWS ayarlarını kontrol edin.");
        } finally {
            setLoading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const addItem = async (url: string) => {
        if (!user?.id) return;
        const tempId = Date.now().toString();

        // Optimistic UI
        const newItem: BoardItem = {
            id: tempId,
            imageUrl: url,
            x: 100,
            y: 100,
            scale: 1,
            rotation: 0,
            zIndex: items.length + 1
        };
        setItems(prev => [...prev, newItem]);

        // Persist
        try {
            const res = await fetch('/api/vision-board', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newItem, userId: user.id })
            });
            if (res.ok) {
                const saved = await res.json();
                setItems(prev => prev.map(i => i.id === tempId ? saved : i));
            }
        } catch (e) {
            console.error("Failed to add sticker");
        }
    };

    const updateItem = async (id: string, updates: Partial<BoardItem>) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));

        // Debounce update in real app, here simple fire-and-forget
        try {
            await fetch(`/api/vision-board/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
        } catch (e) { console.error(e) }
    };

    const deleteItem = async (id: string) => {
        if (!confirm("Bu öğeyi kaldırmak istiyor musun?")) return;
        setItems(prev => prev.filter(i => i.id !== id));
        try {
            await fetch(`/api/vision-board/${id}`, { method: 'DELETE' });
        } catch (e) { console.error(e) }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-[#0F0F12] text-white flex flex-col overflow-hidden font-sans">
            <CosmicBackground />

            {/* Toolbar */}
            <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-4">
                    <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-md">
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-xl font-serif font-bold text-white tracking-wide">Vizyon Panosu</h2>
                </div>

                <div className="pointer-events-auto flex gap-3">
                    <label className="p-3 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-500 transition shadow-lg shadow-purple-900/40">
                        <ImageIcon className="w-5 h-5 text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                    <button
                        onClick={() => addItem('https://cdn-icons-png.flaticon.com/512/2659/2659360.png')} // Demo Sticker
                        className="p-3 bg-pink-600 rounded-full hover:bg-pink-500 transition shadow-lg shadow-pink-900/40"
                    >
                        <Sticker className="w-5 h-5 text-white" />
                    </button>
                    {/* Save is auto, but maybe a button for feedback */}
                    <div className="p-3 bg-green-600/20 text-green-400 rounded-full border border-green-500/30">
                        <Save className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <div ref={constraintsRef} className="flex-1 w-full h-full relative overflow-hidden bg-white/5 cursor-crosshair">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <p className="text-4xl font-serif text-white/10 uppercase tracking-[1em]">Make It Real</p>
                </div>

                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        drag
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        initial={{ x: item.x, y: item.y, scale: 0 }}
                        animate={{ x: item.x, y: item.y, scale: item.scale, rotate: item.rotation }}
                        onDragEnd={(_, info) => {
                            const newX = item.x + info.offset.x;
                            const newY = item.y + info.offset.y;
                            updateItem(item.id, { x: newX, y: newY });
                        }}
                        style={{ x: item.x, y: item.y, position: 'absolute', left: 0, top: 0, zIndex: selectedId === item.id ? 99 : item.zIndex }}
                        onClick={() => setSelectedId(item.id)}
                        className={`group relative ${selectedId === item.id ? 'ring-2 ring-purple-500' : ''}`}
                    >
                        {/* Controls (Only visible when selected) */}
                        {selectedId === item.id && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-md rounded-lg p-1">
                                <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="p-1.5 hover:bg-white/10 rounded-md text-red-400">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                {/* Scaling could go here */}
                            </div>
                        )}

                        <img
                            src={item.imageUrl}
                            alt="vision"
                            className="w-32 h-32 md:w-48 md:h-48 object-contain pointer-events-none drop-shadow-2xl"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
