import { Suspense } from 'react';
import LoginForm from '../ui/auth/LoginForm';
 
export default function LoginPage() {
  return (
    <main >
        <Suspense>
          <LoginForm/>
        </Suspense>
    </main>
  );
}