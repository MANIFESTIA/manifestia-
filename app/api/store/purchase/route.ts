import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function POST(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!user || !product) {
            return NextResponse.json({ error: 'User or Product not found' }, { status: 404 });
        }

        // Check if user has enough diamonds
        if (user.diamonds < product.priceDiamonds) {
            return NextResponse.json({ error: 'Yetersiz bakiye' }, { status: 400 });
        }

        // Create Purchase Transaction
        // Use a transaction to ensure atomicity
        const result = await prisma.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: {
                    diamonds: { decrement: product.priceDiamonds }
                }
            });

            await tx.transaction.create({
                data: {
                    userId: userId,
                    amount: -product.priceDiamonds,
                    type: 'PURCHASE',
                    description: `Purchased: ${product.name}`
                }
            });

            await tx.userInventory.create({
                data: {
                    userId: userId,
                    productId: productId
                }
            });

            return updatedUser;
        });

        return NextResponse.json({
            success: true,
            newBalance: result.diamonds,
            message: 'Satın alma başarılı'
        });

    } catch (error) {
        console.error("Purchase error:", error);
        return NextResponse.json({ error: 'Transaction failed' }, { status: 500 });
    }
}
