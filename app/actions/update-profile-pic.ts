'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProfilePic(userId: string, profilePicUrl: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { profilePic: profilePicUrl },
    });
    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Failed to update profile picture:', error);
    return { success: false, error: String(error) };
  }
}
