import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID gerekli.' }, { status: 400 });
        }

        const entries = await prisma.journalEntry.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(entries);
    } catch (error) {
        console.error('Journal fetch error:', error);
        return NextResponse.json({ error: 'Günlükler alınamadı.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, title, mood, content } = body;

        if (!userId || !content) {
            return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
        }

        const entry = await prisma.journalEntry.create({
            data: {
                userId,
                title: title || "Yeni Kayıt",
                mood: mood || "neutral",
                content,
            },
        });

        return NextResponse.json(entry);
    } catch (error) {
        console.error('Journal create error:', error);
        return NextResponse.json({ error: 'Günlük kaydedilemedi.' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        const userId = searchParams.get('userId'); // Security check ownership

        if (!id || !userId) {
            return NextResponse.json({ error: 'ID gerekli.' }, { status: 400 });
        }

        // Verify ownership
        const entry = await prisma.journalEntry.findUnique({
            where: { id },
        });

        if (!entry || entry.userId !== userId) {
            return NextResponse.json({ error: 'Kayıt bulunamadı veya yetkisiz işlem.' }, { status: 404 });
        }

        await prisma.journalEntry.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Journal delete error:', error);
        return NextResponse.json({ error: 'Silme işlemi başarısız.' }, { status: 500 });
    }
}
