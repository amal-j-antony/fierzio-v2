"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/lib/auth/queries";
import { useAuthStore } from "@/lib/auth/store";

export function AuthInitializer() {
  const { data, isPending } = useCurrentUser();
  const setUser = useAuthStore((state) => state.setUser);
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    if (!isPending) {
      setUser(data ?? null);
      setInitializing(false);
    }
  }, [isPending, data, setUser, setInitializing]);

  return null;
}
