import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email ve şifre gereklidir.' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'Hatalı e-posta veya şifre.' }, { status: 401 });
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: 'Hatalı e-posta veya şifre.' }, { status: 401 });
        }

        // Başarılı giriş
        // Not: Gerçek bir uygulamada burada Session Cookie veya JWT set edilmelidir.
        // Şimdilik client-side context için kullanıcı verisini dönüyoruz.

        // Return sanitized user object matching UserProfile interface
        return NextResponse.json({
            success: true,
            message: 'Giriş başarılı.',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,

                // Birth Info
                birthDate: user.birthDate,
                birthTime: user.birthTime,
                birthCity: user.birthCity,
                sign: user.sign,

                // Economy & Gamification
                diamonds: user.diamonds,
                xp: user.xp,
                level: user.level,
                streak: {
                    count: user.streak,
                    lastLoginDate: user.lastLoginDate || ""
                },
                badges: user.badges
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Giriş sırasında bir hata oluştu.' }, { status: 500 });
    }
}
