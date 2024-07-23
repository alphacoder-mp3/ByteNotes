// app/actions/todoActions.js
'use server';

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]';

export async function createTodo(formData: FormData): Promise<void> {
  //   const session = await getServerSession(authOptions);
  //   if (!session) {
  //     throw new Error('You must be logged in to create a todo');
  //   }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  await prisma.todo.create({
    data: {
      title,
      description,
      user: { connect: { id: 'clyx64o9y0000wyma4kaekrmk' } },
    },
  });

  revalidatePath('/');
}
