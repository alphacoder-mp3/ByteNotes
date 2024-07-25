import { getServerSession } from './session';
import { redirect } from 'next/navigation';

export async function useServerSession(redirectTo: string = '/signin') {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo);
  }

  return session;
}
