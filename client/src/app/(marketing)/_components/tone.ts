import type { Tone } from "@/config/marketing";

export const toneText: Record<Tone, string> = {
  crimson: "text-crimson-neon",
  secondary: "text-secondary",
  primary: "text-primary-fixed-dim",
  tertiary: "text-tertiary",
  outline: "text-outline",
  muted: "text-on-surface-variant",
  success: "text-emerald-400",
};

export const toneDot: Record<Tone, string> = {
  crimson: "bg-crimson-neon",
  secondary: "bg-secondary",
  primary: "bg-primary-fixed-dim",
  tertiary: "bg-tertiary",
  outline: "bg-outline",
  muted: "bg-outline-variant",
  success: "bg-emerald-400",
};

export const toneIconBox: Record<Tone, string> = {
  crimson: "text-crimson-neon",
  secondary: "text-secondary",
  primary: "text-primary-fixed-dim",
  tertiary: "text-tertiary",
  outline: "text-outline",
  muted: "text-on-surface-variant",
  success: "text-emerald-400",
};

export const toneChip: Record<Tone, string> = {
  crimson: "bg-crimson-core/20 border border-crimson-neon/40 text-crimson-neon",
  secondary: "bg-secondary-container/30 border border-crimson-neon/25 text-secondary",
  primary: "bg-crimson-core/20 border border-crimson-neon/40 text-primary-fixed-dim",
  tertiary: "bg-tertiary-container/20 border border-tertiary/30 text-tertiary",
  outline: "bg-surface-container-high border border-white/10 text-on-surface-variant",
  muted: "bg-surface-container-high border border-white/10 text-on-surface-variant",
  success: "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400",
};
