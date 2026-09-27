import type { ActionItem, IconName, Tone } from "./types";

export type HeroStat = {
  label: string;
  value: string;
  note: string;
  icon: IconName;
  valueTone?: Tone;
  noteTone?: Tone;
};

export const hero = {
  pill: {
    badge: "Season 4 Fierzio Update Live",
    note: "Automated CS2 & Valorant API v2.4 Integrated • Zero-Delay Bracket Sync",
  },
  headlineLead: "The Definitive Arena for",
  headlineHighlight: "Competitive Esports",
  subheadline: "For Players Who Compete, For Organizers Who Command.",
  description:
    "Discover and dominate tournaments across Valorant, CS2, Apex Legends, and Rocket League. Or spin up professional multi-tier championship brackets with reusable templates, automated check-ins, and multi-staff access control in under 3 minutes.",
  actions: [
    {
      label: "Find Tournaments",
      href: "#player-hub",
      variant: "primary",
      trailingArrow: true,
    },
    {
      label: "Host Your First Cup",
      href: "#organizer-builder",
      variant: "secondary",
      icon: "trophy",
    },
  ] satisfies ActionItem[],
  trust: { icon: "shield" as IconName, label: "100% Secure Instant Payouts" },
  liveMatch: {
    status: "Grand Final • Match Point",
    spectators: "14.2k Spectators",
    teamA: {
      name: "Kaizen",
      seed: "Seed #1 • Attack",
      score: 12,
      tone: "crimson" as Tone,
    },
    teamB: {
      name: "Eclipse",
      seed: "Seed #3 • Defense",
      score: 10,
      tone: "secondary" as Tone,
    },
    map: "Map 3 Haven",
    probability: {
      labelA: "Kaizen Probability: 68%",
      labelB: "32% Eclipse",
      valueA: 68,
      valueB: 32,
    },
    action: "Open Stream Cleanfeed Overlay",
  },
  stats: [
    {
      label: "Total Payouts Handled",
      value: "$2,480,000+",
      note: "+$140k this week",
      icon: "chart" as IconName,
      valueTone: "crimson" as Tone,
      noteTone: "primary" as Tone,
    },
    {
      label: "Verified Competitive Squads",
      value: "18,540",
      note: "Global active rosters",
      icon: "users" as IconName,
      noteTone: "muted" as Tone,
    },
    {
      label: "Monthly Live Tournaments",
      value: "450+ Cups",
      note: "Double Elim & Swiss formats",
      icon: "tune" as IconName,
      valueTone: "crimson" as Tone,
      noteTone: "secondary" as Tone,
    },
    {
      label: "Anti-Cheat Client Sync",
      value: "99.98%",
      note: "Riot Vanguard & VAC direct",
      icon: "lock" as IconName,
      noteTone: "primary" as Tone,
    },
  ] as HeroStat[],
};
