import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId, ...updates } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'Kullanıcı ID gerekli.' }, { status: 400 });
        }

        // Validate allowed fields to update
        const allowedFields = ['name', 'birthDate', 'birthTime', 'birthCity', 'email', 'sign'];
        const dataToUpdate: any = {};

        for (const key of Object.keys(updates)) {
            if (allowedFields.includes(key)) {
                dataToUpdate[key] = updates[key];
            }
        }

        // If nothing to update
        if (Object.keys(dataToUpdate).length === 0) {
            return NextResponse.json({ error: 'Güncellenecek veri yok.' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate
        });

        // Return sanitized user object
        return NextResponse.json({
            success: true,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                birthDate: (updatedUser as any).birthDate,
                birthTime: (updatedUser as any).birthTime,
                birthCity: (updatedUser as any).birthCity,
                sign: (updatedUser as any).sign,
                avatar: updatedUser.avatar,
                diamonds: updatedUser.diamonds
            },
            message: 'Profil güncellendi.'
        });

    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json({ error: 'Güncelleme başarısız.' }, { status: 500 });
    }
}
