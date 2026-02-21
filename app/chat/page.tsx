"use client";
import React from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-manifest-background p-4 flex flex-col">
            <header className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => router.push('/')}
                    className="p-2 hover:bg-white/10 rounded-full transition text-white/60"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <h1 className="text-xl font-serif text-white">Kozmik Sohbet</h1>
            </header>
            <div className="flex-1 bg-white/5 rounded-3xl overflow-hidden border border-white/10">
                <ChatInterface onBack={() => router.push('/')} />
            </div>
        </div>
    );
}
