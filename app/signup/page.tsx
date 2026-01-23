import { Suspense } from 'react';
import SignUpForm from '../ui/auth/SignupForm';
 
export default function LoginPage() {
  return (
    <main >
        <Suspense>
          <SignUpForm/>
        </Suspense>
    </main>
  );
}