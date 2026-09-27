import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/app/(marketing)/_components/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="Fierzio home">
          <Logo />
        </Link>
        <Link
          href="/"
          className="label-mono text-xs text-on-surface-variant transition-colors hover:text-on-surface"
        >
          Back to home
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 pb-24">
        {children}
      </main>
    </div>
  );
}
