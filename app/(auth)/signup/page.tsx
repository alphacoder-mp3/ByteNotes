import SignUp from '@/components/sign-up';

export default function SignUpPage() {
  return (
    <div className="container absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <SignUp />
    </div>
  );
}
