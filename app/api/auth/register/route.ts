import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Tüm alanları doldurun.' }, { status: 400 });
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

        // Kullanıcı oluşturma
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                credits: 5, // Yeni üyelere hoşgeldin hediyesi 5 elmas
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Kayıt başarılı! Giriş yapabilirsiniz.',
            user: { id: newUser.id, name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.' }, { status: 500 });
    }
}
