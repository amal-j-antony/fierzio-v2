import Link from "next/link";
import type { ActionItem } from "@/config/marketing";
import { Icon } from "./icons";

const variantClasses: Record<
  NonNullable<ActionItem["variant"]>,
  string
> = {
  primary:
    "bg-gradient-to-r from-crimson-core to-crimson-neon text-white font-bold shadow-[0_0_24px_rgba(255,26,64,0.45)] hover:shadow-[0_0_32px_rgba(255,42,85,0.7)] hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-surface-container-high/90 border border-crimson-neon/30 text-secondary hover:bg-surface-bright hover:border-crimson-neon hover:text-white shadow-md",
  ghost:
    "text-on-surface-variant hover:text-white border border-transparent hover:border-white/10",
};

export function ButtonLink({
  action,
  className = "",
  size = "md",
}: {
  action: ActionItem;
  className?: string;
  size?: "md" | "sm";
}) {
  const variant = action.variant ?? "primary";
  const sizing =
    size === "sm"
      ? "px-4 py-2 text-xs"
      : "px-6 py-2.5 text-sm";

  return (
    <Link
      href={action.href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg font-mono font-medium uppercase tracking-wider transition-all ${sizing} ${variantClasses[variant]} ${className}`}
    >
      {action.icon ? (
        <Icon
          name={action.icon}
          className={`h-4 w-4 ${
            variant === "secondary" ? "text-crimson-neon" : ""
          }`}
        />
      ) : null}
      {action.label}
      {action.trailingArrow ? (
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      ) : null}
    </Link>
  );
}
