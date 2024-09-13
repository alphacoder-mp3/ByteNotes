import { ModeToggle } from '@/components/mode-toggle';
import SignIn from '@/components/sign-in';

export default function SignInPage() {
  return (
    <>
      <SignIn />
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </>
  );
}
