'use server';
import prisma from '@/lib/db';

export async function addCollaborator(todoId: string, username: string) {
  try {
    return await prisma.$transaction(async prisma => {
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
  } catch (error) {
    console.error('Error adding collaborator:', error);
    throw error;
  }
}

export async function removeCollaborator(todoId: string, userId: string) {
  try {
    return await prisma.collaborator.deleteMany({
      where: {
        todoId,
        userId,
      },
    });
  } catch (error) {
    console.error('Error removing collaborator:', error);
    throw error;
  }
}

export async function getCollaborators(todoId: string) {
  try {
    return await prisma.collaborator.findMany({
      where: { todoId },
      include: { user: true },
    });
  } catch (error) {
    console.error('Error getting collaborators:', error);
    throw error;
  }
}
