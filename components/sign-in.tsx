'use client';

import { useRef } from 'react';
import { signIn } from '@/app/actions/auth-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UserIcon } from 'lucide-react';

export default function SignIn() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  async function handleSignIn(formData: FormData) {
    const result = await signIn(formData);
    if (result.success) {
      formRef.current?.reset();
      router.push('/'); // Redirect to login page after successful signin
    } else {
      // Handle error (e.g., show error message)
      console.error(result.error);
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSignIn}
      className="min-h-screen flex items-center justify-center bg-[url('@/public/loader.svg?height=400&width=400')] bg-repeat p-4"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="bg-primary text-primary-foreground p-3 rounded-full">
            <UserIcon className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {/* <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                GitHub
              </Button>
            </div> */}
          <p className="text-center text-sm text-muted-foreground">
            Not a user?{' '}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
