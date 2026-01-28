import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Güvenlik için kullanıcı bulunamadı dememek daha iyidir ama şimdilik geliştirme aşamasında duralım.
            return NextResponse.json({ error: 'Bu email adresiyle kayıtlı kullanıcı bulunamadı.' }, { status: 404 });
        }

        // Reset Token Oluşturma
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 saat geçerli

        // Tokeni veritabanına kaydet
        await prisma.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // Reset Linki
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

        // Email Gönder
        const emailHtml = `
      <h1>Şifre Sıfırlama İsteği</h1>
      <p>Manifestia hesabınız için şifre sıfırlama isteği aldık.</p>
      <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
      <a href="${resetUrl}" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Şifremi Sıfırla</a>
      <p>Bu isteği siz yapmadıysanız, bu maili görmezden gelebilirsiniz.</p>
      <p>Link 1 saat boyunca geçerlidir.</p>
    `;

        const emailSent = await sendEmail(email, 'Manifestia Şifre Sıfırlama', emailHtml);

        if (emailSent) {
            return NextResponse.json({ success: true, message: 'Sıfırlama bağlantısı e-posta adresinize gönderildi.' });
        } else {
            return NextResponse.json({ error: 'E-posta gönderilirken bir hata oluştu.' }, { status: 500 });
        }

    } catch (error) {
        console.error('Password reset error:', error);
        return NextResponse.json({ error: 'Bir sunucu hatası oluştu.' }, { status: 500 });
    }
}
