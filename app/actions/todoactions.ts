'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]';

// interface UserSession extends Session {
//   user: {
//     id: string;
//     [key: string]: any;
//   }
// }

export async function createTodo(
  formData: FormData,
  userId: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     throw new Error('You must be logged in to create a todo');
  //   }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const done = formData.get('done') === 'true';

  if (!title || !description) {
    return { success: false, error: 'Title and description are required' };
  }

  await prisma.todo.create({
    data: {
      title,
      description,
      done,
      user: { connect: { id: userId } },
    },
  });

  revalidatePath('/');
  return { success: true, message: 'Created todo successfully' };
}

export async function deleteTodo(
  id: string,
  userId: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     throw new Error('You must be logged in to delete a todo');
  //   }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!todo) {
      return { success: false, error: 'Todo not found' };
    }

    // if (todo.userId !== session.user.id) {
    //   throw new Error('You are not authorized to delete this todo');
    // }

    if (todo.userId !== userId) {
      return {
        success: false,
        error: 'You are not authorized to delete this todo',
      };
    }

    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath('/');

    return { success: true, message: 'Deleted todo successfully' };
  } catch (error) {
    return { success: false, error: error as string };
  }
}

export async function updateTodo(
  id: string,
  formData: FormData,
  userId: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     throw new Error('You must be logged in to delete a todo');
  //   }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const done = formData.get('done') === 'true';

    if (!title || !description) {
      return {
        success: false,
        error: 'Title and description are required',
      };
    }

    // if (todo.userId !== session.user.id) {
    //   throw new Error('You are not authorized to update this todo');
    // }

    if (todo.userId !== userId) {
      return {
        success: false,
        error: 'You are not authorized to update this todo',
      };
    }

    await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        done,
      },
    });

    revalidatePath('/');

    return { success: true, message: 'Updated todo successfully' };
  } catch (error) {
    return { success: false, error: error as string };
  }
}
