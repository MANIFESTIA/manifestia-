import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    // Ideally GET with session token, but using POST with userId for simplicity as per current auth flow
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'User ID required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                transactions: {
                    take: 20,
                    orderBy: { createdAt: 'desc' }
                },
                inventory: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Map backend data to frontend UserProfile format
        // Frontend UserProfile: { ..., inventory: string[] (codes), transactions: any[] }
        const mappedUser = {
            ...user,
            inventory: user.inventory.map(item => item.product.code), // Validating product code usage
            transactions: user.transactions.map(t => ({
                id: t.id,
                amount: t.amount,
                type: t.type,
                description: t.description,
                date: t.createdAt
            }))
        };

        return NextResponse.json({ success: true, user: mappedUser });

    } catch (error) {
        console.error("Sync User error:", error);
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
