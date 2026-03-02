import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Kullanıcı ID gerekli.' }, { status: 400 });
        }

        // Hesabı sil. Veritabanındaki "Cascade" özellikleri sayesinde (örneğin TarotRead vb.) bağlı veriler de silinecektir.
        // Prisma schema'da cascade silme eklenmemişse buraya manuel dahil etmek gerekebilir.
        await prisma.user.delete({
            where: { id: userId }
        });

        return NextResponse.json({
            success: true,
            message: 'Hesabınız ve tüm verileriniz başarıyla silindi.'
        });

    } catch (error) {
        console.error('Delete account error:', error);
        return NextResponse.json({ error: 'Hesap silinirken bir hata oluştu.' }, { status: 500 });
    }
}
