'use server';
import prisma from '@/lib/db';

export async function searchNotes(
  query: string,
  userId: string
): Promise<{
  success: boolean;
  error?: unknown;
  message?: string;
  data?: {
    title: string;
    description: string;
    done: boolean;
    id: string;
    todoColor: string;
    updatedAt: Date;
    lastModifiedBy: string;
    user: { username: string };
    images: {
      id: string;
      url: string;
    }[];
  }[];
}> {
  try {
    const results = await prisma.todo.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        title: true,
        description: true,
        done: true,
        id: true,
        todoColor: true,
        updatedAt: true,
        lastModifiedBy: true,
        user: {
          select: {
            username: true,
          },
        },
        images: {
          select: {
            url: true,
            id: true,
          },
        },
      },
    });

    return { success: true, data: results };
  } catch (error) {
    return { success: false, message: 'Error fetching notes.', error };
  }
}
