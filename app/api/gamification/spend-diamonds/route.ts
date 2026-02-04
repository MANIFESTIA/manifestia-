import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function POST(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { amount, description } = await req.json();

        if (!amount || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.diamonds < amount) {
            return NextResponse.json({ error: 'Yetersiz elmas' }, { status: 400 });
        }

        const updatedUser = await prisma.$transaction(async (tx) => {
            const updated = await tx.user.update({
                where: { id: userId },
                data: { diamonds: { decrement: amount } },
            });

            await tx.transaction.create({
                data: {
                    userId,
                    amount: -amount,
                    type: 'SPEND',
                    description,
                },
            });

            return updated;
        });

        return NextResponse.json({
            success: true,
            newBalance: updatedUser.diamonds,
        });
    } catch (error) {
        console.error('Spend diamonds error:', error);
        return NextResponse.json({ error: 'İşlem başarısız' }, { status: 500 });
    }
}
