import SignIn from '@/components/sign-in';

export default function SignInPage() {
  return (
    <div className="container absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
      <SignIn />
    </div>
  );
}
