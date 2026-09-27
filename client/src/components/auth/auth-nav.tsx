"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { nav } from "@/config/marketing";
import { Icon } from "@/app/(marketing)/_components/icons";
import { useLogout } from "@/lib/auth/queries";
import { useAuthStore } from "@/lib/auth/store";

export function AuthNav() {
  const { user, isAuthenticated, isInitializing } = useAuthStore();
  const logout = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.push("/"),
    });
  };

  if (!isInitializing && isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-on-surface-variant sm:inline">
          {user.email}
        </span>
        <button
          type="button"
          onClick={handleLogout}
          disabled={logout.isPending}
          className="label-mono rounded px-4 py-2 text-xs text-on-surface-variant transition-colors hover:text-on-surface disabled:opacity-60"
        >
          {logout.isPending ? "Logging out..." : "Log Out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={nav.login.href}
        className="hidden rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-wider text-on-surface-variant transition-colors hover:text-white sm:inline-flex"
      >
        {nav.login.label}
      </Link>
      <Link
        href={nav.cta.href}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-crimson-core to-crimson-neon px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(255,26,64,0.45)] transition-all hover:shadow-[0_0_32px_rgba(255,42,85,0.7)] active:scale-[0.98]"
      >
        {nav.cta.icon ? (
          <Icon name={nav.cta.icon} className="hidden h-4 w-4 sm:block" />
        ) : null}
        {nav.cta.label}
      </Link>
    </div>
  );
}
