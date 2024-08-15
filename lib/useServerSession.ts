import { getSession } from '@/lib/session';
import { cache } from 'react';

export const useServerSession = cache(() => {
  let session = getSession();
  if (!session) return null;
  return session.userId;
});
