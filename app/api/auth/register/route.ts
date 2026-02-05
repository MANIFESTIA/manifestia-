import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { name, email, password, birthDate, birthTime, birthCity, intents, voiceGuide } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'E-posta ve şifre gerekli.' }, { status: 400 });
        }

        // Email kontrolü
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Bu e-posta adresi zaten kullanımda.' }, { status: 409 });
        }

        // Şifreleme
        const hashedPassword = await hashPassword(password);

        const token = crypto.randomUUID();
        const newUser = await prisma.user.create({
            data: {
                name: name || '',
                email,
                password: hashedPassword,
                diamonds: 5,
                sessionToken: token,
                birthDate: birthDate || null,
                birthTime: birthTime || null,
                birthCity: birthCity || null,
                intents: intents || [],
                voiceGuide: voiceGuide || null,
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Kayıt başarılı! Giriş yapabilirsiniz.',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                diamonds: newUser.diamonds,
                birthDate: newUser.birthDate,
                birthTime: newUser.birthTime,
                birthCity: newUser.birthCity,
                intents: newUser.intents,
                voiceGuide: newUser.voiceGuide,
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.' }, { status: 500 });
    }
}
