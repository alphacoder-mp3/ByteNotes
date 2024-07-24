// app/actions/todoActions.js
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

export async function createTodo(formData: FormData): Promise<void> {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     throw new Error('You must be logged in to create a todo');
  //   }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const done = formData.get('done') === 'true';

  if (!title || !description) {
    throw new Error('Title and description are required');
  }

  await prisma.todo.create({
    data: {
      title,
      description,
      done,
      user: { connect: { id: 'clyx64o9y0000wyma4kaekrmk' } },
    },
  });

  revalidatePath('/');
}

export async function deleteTodo(id: string): Promise<void> {
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

    // if (todo.userId !== session.user.id) {
    //   throw new Error('You are not authorized to delete this todo');
    // }

    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
}

export async function updateTodo(
  id: string,
  formData: FormData
): Promise<void> {
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
      throw new Error('Title and description are required');
    }

    // if (todo.userId !== session.user.id) {
    //   throw new Error('You are not authorized to delete this todo');
    // }

    await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        done,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Failed to update todo');
  }
}
