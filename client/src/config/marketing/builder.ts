import type { ActionItem, IconName, SectionHeadingContent, Tone } from "./types";

export type BuilderMember = {
  initials: string;
  name: string;
  role: string;
  tone: Tone;
};

export type BracketRow = {
  team: string;
  score: string;
  tone: Tone;
};

export const builder = {
  heading: {
    eyebrow: "Organizer Velocity Engine",
    title: "From Concept to Bracket in 3 Minutes",
    description:
      "Stop rebuilding identical tournament brackets from scratch every weekend. Load verified Organization Templates, configure team limits, and delegate access levels in three deterministic steps.",
  } satisfies SectionHeadingContent,
  preset: {
    step: 1,
    title: "Load Organization Preset",
    tag: "1-Click Launch",
    name: "Sunday Night Valorant Open — Bo3 Series",
    meta: "Double Elim (32 Teams) • Custom Map Veto Pool • 15m Check-in",
    icon: "copy" as IconName,
  },
  automations: {
    step: 2,
    title: "Automations & Webhooks",
    tag: "Zero-Admin Required",
    items: [
      { label: "Auto Anti-Cheat Gate", value: "Strict (Enforced)", tone: "crimson" as Tone },
      { label: "No-Show Auto Forfeit", value: "10 Min Timer", tone: "muted" as Tone },
      { label: "Discord Webhook Bot", value: "Connected #live-ops", tone: "primary" as Tone },
      { label: "OBS Stream HUD Feed", value: "Key Ready", tone: "crimson" as Tone },
    ],
  },
  staff: {
    step: 3,
    title: "Tiered Staff Access Delegation",
    addLabel: "Add Staff Member",
    members: [
      { initials: "KA", name: "kai_admin (Head Admin)", role: "Full Bracket Override", tone: "crimson" },
      { initials: "RF", name: "ref_nordic (Match Referee)", role: "Score Confirmation & Disputes", tone: "secondary" },
      { initials: "OB", name: "cast_velocity (Observer/Caster)", role: "Observer Delay + Cleanfeed", tone: "muted" },
    ] satisfies BuilderMember[],
  },
  footerNote: "Auto-saved to 'Organization Cloud'",
  deploy: {
    label: "Deploy 32-Team Bracket Now",
    href: "#organizer-builder",
    variant: "primary",
    icon: "rocket",
  } satisfies ActionItem,
  preview: {
    title: "Live Bracket Render Preview",
    meta: "Double-Elimination 32",
    matches: [
      {
        accent: "crimson" as Tone,
        rows: [
          { team: "1. Kaizen Esports", score: "2", tone: "crimson" as Tone },
          { team: "8. Team Aurora", score: "0", tone: "muted" as Tone },
        ] satisfies BracketRow[],
      },
      {
        accent: "secondary" as Tone,
        rows: [
          { team: "4. Apex Dynasty", score: "1", tone: "muted" as Tone },
          { team: "5. Eclipse Gaming", score: "2", tone: "secondary" as Tone },
        ] satisfies BracketRow[],
      },
    ],
    connectorAdvanced: "└── WINNER ADVANCES ──┐",
    connectorSemis: "▼ UPPER BRACKET SEMIS ▼",
    semis: { a: "Kaizen Esports", b: "Eclipse Gaming" },
    callout: {
      icon: "verified" as IconName,
      title: "Organization Preset Sync",
      description:
        "Rulebooks, veto vetoes, and seed distributions automatically propagate across multi-week circuit tiers.",
    },
  },
};
