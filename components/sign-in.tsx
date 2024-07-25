'use client';

import { useRef } from 'react';
import { signIn } from '@/app/actions/authactions';
import { useRouter } from 'next/navigation';

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
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium ">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium ">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign In
      </button>
    </form>
  );
}
