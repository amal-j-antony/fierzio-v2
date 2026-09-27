import Link from "next/link";
import { AuthNav } from "@/components/auth/auth-nav";
import { nav } from "@/config/marketing";
import { AnnouncementBar } from "./announcement-bar";
import { Icon } from "./icons";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />

      <div className="w-full border-b border-white/5 bg-surface-container-low/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/" aria-label="Fierzio home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {nav.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded px-3 py-2 font-mono text-xs uppercase tracking-wider text-on-surface-variant transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={nav.host.href}
              className="hidden items-center gap-2 rounded-lg border border-crimson-neon/30 bg-surface-container-high/90 px-4 py-2 font-mono text-xs uppercase tracking-wider text-on-surface shadow-md transition-all hover:border-crimson-neon hover:bg-surface-bright hover:text-white md:inline-flex"
            >
              <Icon name={nav.host.icon ?? "trophy"} className="h-4 w-4 text-crimson-neon" />
              {nav.host.label}
            </Link>
            <AuthNav />
          </div>
        </div>
      </div>
    </header>
  );
}
