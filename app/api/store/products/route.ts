import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                priceDiamonds: 'asc'
            }
        });

        // If no products exist, we can return empty or seed some default ones?
        // For now, return empty.

        return NextResponse.json(products);
    } catch (error) {
        console.error("Fetch products error:", error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
