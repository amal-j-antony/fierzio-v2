import Link from "next/link";
import { footer, site } from "@/config/marketing";
import { Icon } from "./icons";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-crimson-neon/15 bg-surface-container-lowest pb-8 pt-10">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm leading-5 text-on-surface-variant">
              {site.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="label-mono inline-flex items-center gap-1.5 rounded-full border border-crimson-neon/30 bg-surface-container-high px-2.5 py-1 text-[10px] text-primary-fixed-dim">
                <span className="h-2 w-2 rounded-full bg-crimson-neon shadow-[0_0_8px_#ff1a40]" />
                {site.status}
              </span>
              <span className="label-mono text-[10px] font-semibold text-outline">
                {site.ping}
              </span>
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <span className="label-mono text-xs font-semibold text-on-surface">
                {column.title}
              </span>
              <nav className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13px] leading-5 text-on-surface-variant transition-colors hover:text-crimson-neon"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="label-mono text-[10px] text-on-surface-variant">
            © {new Date().getFullYear()} {site.domain} Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {footer.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="label-mono text-[10px] text-on-surface-variant transition-colors hover:text-crimson-neon"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {footer.socials.map((social) => (
              <span
                key={social}
                className="flex h-8 w-8 items-center justify-center rounded border border-white/5 bg-surface-container-high text-on-surface-variant transition-colors hover:border-crimson-neon/40 hover:text-crimson-neon"
              >
                <Icon name={social} className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
