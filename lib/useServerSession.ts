import { getSession } from '@/lib/session';
import { cache } from 'react';

export const useServerSession = cache(() => {
  let session = getSession();
  return session;
});
