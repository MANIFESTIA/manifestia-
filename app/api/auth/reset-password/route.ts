import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: 'Token ve yeni şifre gereklidir.' }, { status: 400 });
        }

        // Token ile kullanıcıyı bul ve süresini kontrol et
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(), // Şu anki zamandan büyük olmalı (süresi dolmamış)
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş bağlantı.' }, { status: 400 });
        }

        // Yeni şifreyi hashle
        const hashedPassword = await hashPassword(password);

        // Kullanıcıyı güncelle
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,       // Token'ı temizle
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({ success: true, message: 'Şifreniz başarıyla güncellendi. Giriş yapabilirsiniz.' });

    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Şifre sıfırlama sırasında bir hata oluştu.' }, { status: 500 });
    }
}
