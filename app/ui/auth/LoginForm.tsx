'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  // 1. Hook into the Server Action
  // errorMessage: returned from the action
  // formAction: the function passed to the form's action prop
  // isPending: true while the action is running
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration (Your custom design) */}
      <div className="hidden lg:flex lg:w-1/3 relative p-5 bg-[#F8F4F0]">
        <div className="relative w-full h-full flex flex-col justify-between p-10 overflow-hidden rounded-2xl bg-black">
          <img 
            src="assets/images/illustration-authentication.svg" 
            alt="Finance Illustration" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10">
            <h1 className="text-white text-3xl font-bold tracking-tight">finance</h1>
          </div>
          <div className="relative z-10 max-w-md">
            <h2 className="text-white text-4xl font-bold mb-6 leading-tight">
              Keep track of your money and save for your future
            </h2>
            <p className="text-gray-200 text-lg font-light leading-relaxed">
              Personal finance app puts you in control of your spending. Track transactions, 
              set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 bg-[#F8F4F0]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Login</h2>

            {/* 2. Use formAction instead of handleSubmit */}
            <form action={formAction} className="space-y-6">
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email" // Crucial: name must match what the backend expects
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none transition"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password" // Crucial: name must match what the backend expects
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* 3. Hidden input for redirect logic */}
              <input type="hidden" name="redirectTo" value={callbackUrl} />

              {/* Login Button - uses isPending for loading state */}
              <button
                type="submit"
                aria-disabled={isPending}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isPending ? 'Logging in...' : 'Login'}
              </button>

              {/* Error Message Display */}
              {errorMessage && (
                <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg">
                   <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <p className="text-center text-gray-600">
                Need to create an account?{' '}
                <Link href="/signup" className="text-gray-900 font-semibold underline hover:text-gray-700">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}