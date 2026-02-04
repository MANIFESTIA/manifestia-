import { prisma } from '@/lib/prisma';

export async function verifyAuth(req: Request): Promise<string | null> {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;

    const token = authHeader.slice(7);
    const user = await prisma.user.findFirst({
        where: { sessionToken: token },
        select: { id: true },
    });

    return user?.id || null;
}
