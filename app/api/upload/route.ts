import { writeFile, mkdir, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filepath = path.join(uploadDir, filename);

    // Create the uploads directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true });

    // Temporarily store the file
    await writeFile(filepath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filepath, {
      folder: 'profile-pictures',
    });

    // Delete the temporary file
    await unlink(filepath);

    return NextResponse.json({ success: true, filename: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      error:
        'File upload failed: ' +
        (error instanceof Error ? error.message : String(error)),
    });
  }
}
