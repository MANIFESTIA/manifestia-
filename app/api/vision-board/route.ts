import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID gerekli.' }, { status: 400 });
        }

        const items = await prisma.visionBoardItem.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' }, // Layer order usually matches creation unless z-index is used
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error('Vision Board fetch error:', error);
        return NextResponse.json({ error: 'Veriler alınamadı.' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, imageUrl, x, y, scale, rotation, zIndex } = body;

        if (!userId || !imageUrl) {
            return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
        }

        const item = await prisma.visionBoardItem.create({
            data: {
                userId,
                imageUrl,
                x: x || 0,
                y: y || 0,
                scale: scale || 1,
                rotation: rotation || 0,
                zIndex: zIndex || 1,
            },
        });

        return NextResponse.json(item);
    } catch (error) {
        console.error('Vision Board create error:', error);
        return NextResponse.json({ error: 'Kaydedilemedi.' }, { status: 500 });
    }
}
