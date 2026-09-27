"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  AuthCard,
  AuthError,
  AuthField,
  AuthSubmitButton,
} from "@/components/auth/auth-ui";
import { getApiErrorMessage } from "@/lib/api";
import { useLogin } from "@/lib/auth/queries";
import { useAuthStore } from "@/lib/auth/store";

export default function LoginPage() {
  const login = useLogin();
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") {
      return "/";
    }
    const param = new URLSearchParams(window.location.search).get("redirect");
    return param && param.startsWith("/") ? param : "/";
  }, []);

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isInitializing, isAuthenticated, router, redirectTo]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    login.mutate(
      { email, password },
      {
        onSuccess: () => router.replace(redirectTo),
        onError: (err) => setError(getApiErrorMessage(err)),
      },
    );
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to manage your tournaments and squads."
      footer={
        <>
          New to Fierzio?{" "}
          <Link
            href="/register"
            className="font-medium text-primary transition-colors hover:text-primary-container"
          >
            Create an account
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
          autoComplete="current-password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <AuthSubmitButton pending={login.isPending}>Log In</AuthSubmitButton>
      </form>
    </AuthCard>
  );
}
