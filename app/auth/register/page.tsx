'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/UserContext';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const router = useRouter();
    const { saveUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(data.message);

                // Kullanıcı verisini context'e kaydet (Hemen giriş yapmış sayalım)
                saveUser({
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.name,
                    diamonds: 5, // Başlangıç kredisi
                    birthDate: '', birthTime: '', birthCity: ''
                });

                // Onboarding veya Ana sayfaya yönlendir
                setTimeout(() => {
                    router.push('/');
                }, 1000);
            } else {
                setStatus('error');
                setMessage(data.error || 'Kayıt başarısız.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Bağlantı hatası.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Arkaplan Efektleri */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
                        Aramıza Katıl
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Kozmik enerjini keşfetmek için ücretsiz hesabını oluştur.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">
                            Adın
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                id="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="İsmin"
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all group-hover:border-white/20"
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">
                            E-posta Adresi
                        </label>
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ornek@email.com"
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all group-hover:border-white/20"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">
                            Şifre
                        </label>
                        <div className="relative group">
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all group-hover:border-white/20"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        </div>
                    </div>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{message}</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 p-3 rounded-lg border border-green-500/20">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p>{message}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-purple-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Hesap Oluştur
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Zaten hesabın var mı?{' '}
                        <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                            Giriş yap
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
