"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/lib/auth/store";

export function AuthLoadingScreen({ label = "Checking your session..." }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-on-surface-variant">{label}</p>
    </div>
  );
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      router.replace(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
    }
  }, [isInitializing, isAuthenticated, router]);

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, isInitializing } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitializing && user?.globalRole !== "ADMIN") {
      router.replace("/");
    }
  }, [isInitializing, user, router]);

  if (isInitializing) {
    return <AuthLoadingScreen />;
  }

  if (user?.globalRole !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}
