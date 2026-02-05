import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function POST(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

export async function PATCH(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, birthDate, birthTime, birthCity, intents, voiceGuide } = body;

        const updateData: any = {};
        if (name !== undefined) updateData.name = name;
        if (birthDate !== undefined) updateData.birthDate = birthDate;
        if (birthTime !== undefined) updateData.birthTime = birthTime;
        if (birthCity !== undefined) updateData.birthCity = birthCity;
        if (intents !== undefined) updateData.intents = intents;
        if (voiceGuide !== undefined) updateData.voiceGuide = voiceGuide;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
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

        const mappedUser = {
            ...updatedUser,
            inventory: updatedUser.inventory.map(item => item.product.code),
            transactions: updatedUser.transactions.map(t => ({
                id: t.id,
                amount: t.amount,
                type: t.type,
                description: t.description,
                date: t.createdAt
            }))
        };

        return NextResponse.json({ success: true, user: mappedUser });

    } catch (error) {
        console.error("Update profile error:", error);
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
