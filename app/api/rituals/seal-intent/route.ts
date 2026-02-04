import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function POST(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { intent } = await req.json();

        if (!intent || typeof intent !== 'string' || intent.trim().length === 0) {
            return NextResponse.json({ error: 'Niyet metni gereklidir' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.diamonds < 3) {
            return NextResponse.json({ error: 'Yetersiz elmas' }, { status: 400 });
        }

        const updatedUser = await prisma.$transaction(async (tx) => {
            const updated = await tx.user.update({
                where: { id: userId },
                data: { diamonds: { decrement: 3 } },
            });

            await tx.transaction.create({
                data: {
                    userId,
                    amount: -3,
                    type: 'SPEND',
                    description: 'Niyet Mühürleme',
                },
            });

            await tx.journalEntry.create({
                data: {
                    userId,
                    mood: 'intent',
                    title: 'Niyet Mühürü',
                    content: intent.trim(),
                },
            });

            return updated;
        });

        return NextResponse.json({
            success: true,
            newBalance: updatedUser.diamonds,
        });
    } catch (error) {
        console.error('Seal intent error:', error);
        return NextResponse.json({ error: 'İşlem başarısız' }, { status: 500 });
    }
}
