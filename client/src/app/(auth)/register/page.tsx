"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import {
  AuthCard,
  AuthError,
  AuthField,
  AuthSubmitButton,
} from "@/components/auth/auth-ui";
import { getApiErrorMessage } from "@/lib/api";
import { useRegister } from "@/lib/auth/queries";
import { useAuthStore } from "@/lib/auth/store";

export default function RegisterPage() {
  const register = useRegister();
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/");
    }
  }, [isInitializing, isAuthenticated, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    register.mutate(
      { email, password, passwordConfirmation },
      {
        onSuccess: () => router.replace("/"),
        onError: (err) => setError(getApiErrorMessage(err)),
      },
    );
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start organizing tournaments in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary transition-colors hover:text-primary-container"
          >
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <AuthError message={error} />
        <AuthField
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <AuthField
          label="Password"
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AuthField
          label="Confirm password"
          id="passwordConfirmation"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          required
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
        />
        <AuthSubmitButton pending={register.isPending}>
          Create Account
        </AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
