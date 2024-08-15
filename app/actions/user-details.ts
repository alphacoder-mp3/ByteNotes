'use server';

import prisma from '@/lib/db';

export async function fetchUserDetails(
  userId: string
): Promise<{ success: boolean; error: boolean; message: string }> {
  if (!userId) {
    return {
      success: false,
      error: true,
      message: 'User id is required',
    };
  }

  await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return {
    success: true,
    message: 'User details fetched successfully',
    error: false,
  };
}
