'use server';

import prisma from '@/lib/db';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setSession } from '@/lib/session';
import { clearSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signUp(
  formData: FormData
): Promise<{ success: boolean; error: boolean; user?: User; message: string }> {
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
      return {
        success: false,
        error: true,
        message: 'Username already exists',
      };
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

    //set session
    setSession(newUser);

    return {
      success: true,
      user: newUser,
      error: false,
      message: 'Signed up successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during signup' + error,
      error: true,
    };
  }
}

export async function signIn(formData: FormData): Promise<{
  success: boolean;
  error: boolean;
  user?: User;
  message: string;
}> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return {
        success: false,
        error: true,
        message: 'Invalid username or password',
      };
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: true,
        message: 'Invalid username or password',
      };
    }

    //set session
    setSession(user);

    // Password is valid, return success and user data
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      error: false,
      user: userWithoutPassword as User,
      message: 'Signed in successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: 'An error occurred during signin' + error,
    };
  }
}

export async function signOut() {
  clearSession();
  redirect('/signin');
  return { success: true, message: 'Signed out successfully', error: false };
}
