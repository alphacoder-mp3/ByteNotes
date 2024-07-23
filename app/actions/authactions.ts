'use server';

import prisma from '@/lib/db';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

export async function signUp(
  formData: FormData
): Promise<{ success: boolean; error?: string; user?: User }> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: 'An error occurred during signup' };
  }
}
