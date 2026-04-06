"use client";

import { useActionState } from 'react';
import { login } from './actions';
import { useTransition } from 'react';

export default function LoginPage() {
  const [error, action, isPending] = useActionState(async (state: any, formData: FormData) => {
    const response = await login(formData);
    return response?.error;
  }, undefined);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface-container-lowest editorial-shadow rounded-2xl p-8 border border-outline-variant/20">
        <div className="text-center mb-8">
          <span className="text-secondary font-bold tracking-widest text-sm uppercase font-label block mb-2">
            Secure Access
          </span>
          <h1 className="font-headline text-3xl font-bold text-on-surface">
            Admin Login
          </h1>
        </div>

        <form action={action} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@fcamp.org"
              className="w-full px-4 py-3 rounded-lg border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-outline bg-surface text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-error-container text-on-error-container text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-primary text-on-primary py-3.5 rounded-xl font-bold font-label hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-[20px]">login</span>
            )}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
