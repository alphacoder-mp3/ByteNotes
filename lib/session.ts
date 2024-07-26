import { cookies } from 'next/headers';
import { User } from '@prisma/client';
import prisma from './db';

export function setSession(user: User) {
  cookies().set('session', JSON.stringify({ userId: user.id }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export function getSession() {
  const session = cookies().get('session')?.value;
  return session ? JSON.parse(session) : null;
}

export function clearSession() {
  cookies().delete('session');
}

export async function getServerSession() {
  const sessionCookie = cookies().get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const { userId } = JSON.parse(sessionCookie);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true },
    });

    if (!user) {
      return null;
    }

    return { user };
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
}
