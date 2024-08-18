'use server';
import prisma from '@/lib/db';
import { Collaborator, User } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function addCollaborator(
  todoId: string,
  username: string
): Promise<{ success: boolean; message: string; data?: Collaborator }> {
  try {
    const result = await prisma.$transaction(async prisma => {
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) {
        throw new Error('User not found');
      }

      const existingCollaboration = await prisma.collaborator.findUnique({
        where: {
          userId_todoId: {
            userId: user.id,
            todoId,
          },
        },
      });

      if (existingCollaboration) {
        throw new Error('User is already a collaborator');
      }

      return await prisma.collaborator.create({
        data: {
          userId: user.id,
          todoId,
        },
      });
    });

    revalidatePath('/');
    return {
      success: true,
      message: 'Collaborator added successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error adding collaborator:', error);
    return {
      success: false,
      message: (error as any) ?? 'error while fetching collaborator data',
    };
  }
}

export async function removeCollaborator(
  todoId: string,
  userId: string
): Promise<{
  success: boolean;
  message: string;
  data?: { count: number };
}> {
  try {
    const result = await prisma.collaborator.deleteMany({
      where: {
        todoId,
        userId,
      },
    });

    revalidatePath('/');
    return {
      success: true,
      message: 'Collaborator removed successfully',
      data: result,
    };
  } catch (error) {
    console.error('Error removing collaborator:', error);
    return { success: false, message: error as any };
  }
}

export async function getCollaborators(todoId: string): Promise<{
  success: boolean;
  message?: string;
  data?: (Collaborator & { user: User })[];
}> {
  try {
    const collaborators = await prisma.collaborator.findMany({
      where: { todoId },
      include: { user: true },
    });

    return { success: true, data: collaborators };
  } catch (error) {
    console.error('Error getting collaborators:', error);
    return { success: false, message: error as any };
  }
}
