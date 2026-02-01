import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        // In a real app, verify user ownership here (passed via header or session)
        // For now, simpler implementation

        await prisma.visionBoardItem.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Vision Board delete error:', error);
        return NextResponse.json({ error: 'Silinemedi.' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const body = await req.json();
        const { x, y, scale, rotation, zIndex } = body;

        const updated = await prisma.visionBoardItem.update({
            where: { id },
            data: {
                x,
                y,
                scale,
                rotation,
                zIndex
            }
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Vision Board update error:', error);
        return NextResponse.json({ error: 'Güncellenemedi.' }, { status: 500 });
    }
}
