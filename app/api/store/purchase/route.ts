import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId, productId } = await req.json(); // Changed 'amount/cost' to 'productId' for secure backend validation

        if (!userId || !productId) {
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
        const result = await prisma.$transaction(async (prisma) => {
            // Deduct diamonds
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    diamonds: { decrement: product.priceDiamonds }
                }
            });

            // Create Transaction Record
            await prisma.transaction.create({
                data: {
                    userId: userId,
                    amount: -product.priceDiamonds,
                    type: 'PURCHASE',
                    description: `Purchased: ${product.name}`
                }
            });

            // Add to Inventory
            await prisma.userInventory.create({
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
