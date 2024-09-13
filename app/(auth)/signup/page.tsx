import { ModeToggle } from '@/components/mode-toggle';
import SignUp from '@/components/sign-up';

export default function SignUpPage() {
  return (
    <>
      <SignUp />
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
    </>
  );
}
