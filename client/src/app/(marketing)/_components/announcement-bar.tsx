import Link from "next/link";
import { announcement } from "@/config/marketing";

export function AnnouncementBar() {
  return (
    <div className="w-full border-b border-crimson-neon/20 bg-surface-container-lowest/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 px-4 py-1.5 md:px-8">
        <span className="label-mono inline-flex items-center gap-1.5 rounded-lg border border-crimson-neon/40 bg-crimson-core/25 px-2 py-0.5 text-[10px] text-crimson-neon">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-neon" />
          {announcement.badge}
        </span>
        <span className="hidden font-mono text-xs text-on-surface-variant sm:inline">
          {announcement.text}{" "}
          <span className="font-semibold text-crimson-neon drop-shadow-[0_0_8px_rgba(255,42,85,0.6)]">
            {announcement.highlight}
          </span>
        </span>
        <Link
          href={announcement.action.href}
          className="inline-flex items-center gap-1 font-mono text-xs text-primary transition-colors hover:text-crimson-neon"
        >
          {announcement.action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
