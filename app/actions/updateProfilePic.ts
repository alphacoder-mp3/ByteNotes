'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProfilePic(userId: string, filename: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { profilePic: filename },
    });
    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Failed to update profile picture:', error);
    return { success: false, error: String(error) };
  }
}
