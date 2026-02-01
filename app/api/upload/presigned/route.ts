import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3";

export async function POST(req: Request) {
    try {
        const { filename, fileType } = await req.json();

        // Unique file name: timestamp-cleanfilename
        const uniqueFileName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "")}`;
        const key = `uploads/${uniqueFileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        });

        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        return NextResponse.json({ uploadUrl, publicUrl });
    } catch (error) {
        console.error("S3 Presign Error:", error);
        return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
    }
}
