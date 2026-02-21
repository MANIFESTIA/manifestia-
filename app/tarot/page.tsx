"use client";
import React from 'react';
import TarotView from '@/components/tarot/TarotView';
import { useRouter } from 'next/navigation';

export default function TarotPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black">
            <TarotView onClose={() => router.push('/')} />
        </div>
    );
}
