'use client';
import { Button } from '@/components/ui/button';
import { signOut } from '@/app/actions/auth-actions';
export const SignOutButton = () => {
  return (
    <Button className="bg-violet-400" onClick={() => signOut()}>
      Sign out
    </Button>
  );
};
