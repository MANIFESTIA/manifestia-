import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId, avatar } = await req.json();

        if (!userId || !avatar) {
            return NextResponse.json({ error: 'Eksik veri.' }, { status: 400 });
        }

        // Validate base64 string simple check
        if (!avatar.startsWith('data:image')) {
            return NextResponse.json({ error: 'Geçersiz resim formatı.' }, { status: 400 });
        }

        // Basic payload size check is handled by potential server limits, 
        // but here we just update.
        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { avatar }
        });

        return NextResponse.json({
            success: true,
            avatar: updatedUser.avatar,
            message: 'Profil fotoğrafı güncellendi.'
        });

    } catch (error) {
        console.error('Avatar upload error:', error);
        return NextResponse.json({ error: 'Yükleme başarısız.' }, { status: 500 });
    }
}
