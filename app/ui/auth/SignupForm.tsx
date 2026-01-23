'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { signUp } from '@/app/lib/actions';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(signUp, undefined);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Keep your same illustration code here */}
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

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-8 bg-[#F8F4F0]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sign Up</h2>

            <form action={formAction} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input id="name" name="name" type="text" placeholder="Your Name" required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none transition" />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input id="email" name="email" type="email" placeholder="Email" required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none transition" />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'}
                    placeholder="Create Password" required minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none transition" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" aria-disabled={isPending}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50">
                {isPending ? 'Creating Account...' : 'Create Account'}
              </button>

              {errorMessage && (
                <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{errorMessage}</p>
              )}

              <p className="text-center text-gray-600 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-gray-900 font-semibold underline">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}