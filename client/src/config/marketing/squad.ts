import type { ActionItem, SectionHeadingContent, Tone } from "./types";

export type RosterSlot = {
  slot: string;
  name: string;
  role: string;
  roleTone: Tone;
  meta: string;
  status: string;
  statusTone: Tone;
  kd?: string;
  action?: string;
};

export const squad = {
  heading: {
    eyebrow: "Built-In Team Roster Management",
    title: "The Browser-Native Squad Engine",
    description:
      "No more chaotic Discord spreadsheets or missing team captains. Manage your starting roster, bench substitutes, cross-game gamertags, and match check-ins in one unified card.",
  } satisfies SectionHeadingContent,
  action: {
    label: "Create New Squad",
    href: "#player-hub",
    variant: "secondary",
    icon: "person-add",
  } satisfies ActionItem,
  summary: {
    name: "Vanguard Cyber",
    verified: true,
    tag: "TAG: [VNGD] • NA East Region",
    tier: "Diamond Tier Circuit • Rank #4",
    stats: [
      {
        label: "Match Win Rate",
        value: "74.2%",
        note: "38W - 13L",
        valueTone: "crimson" as Tone,
        noteTone: "muted" as Tone,
      },
      {
        label: "Total Earnings",
        value: "$18,450",
        note: "Auto-split synced",
        valueTone: "crimson" as Tone,
        noteTone: "primary" as Tone,
      },
    ],
    ready: {
      label: "Next Match Ready Check",
      value: "5/5 Ready",
      note: "All 5 Starting Squad Members Checked In",
    },
    action: {
      label: "Enter Match Lobby (Server #4)",
      href: "#player-hub",
      variant: "primary",
      icon: "trophy",
    } satisfies ActionItem,
  },
  rosterHeader: "Active Roster & Substitutes (5 Starters • 2 Reserves)",
  discord: "Discord Voice Channel: Synced",
  roster: [
    {
      slot: "C",
      name: "VNGD_Krypton",
      role: "Captain",
      roleTone: "crimson",
      meta: "Riot ID: Krypton#NA1 • Role: Duelist / Entry",
      status: "Ready",
      statusTone: "success",
      kd: "1.42 K/D",
    },
    {
      slot: "S1",
      name: "VNGD_Sovereign",
      role: "Starter",
      roleTone: "muted",
      meta: "Riot ID: Sovereign#777 • Role: Controller / Smokes",
      status: "Ready",
      statusTone: "success",
      kd: "1.18 K/D",
    },
    {
      slot: "S2",
      name: "VNGD_Aegis",
      role: "Starter",
      roleTone: "muted",
      meta: "Riot ID: AegisAim#001 • Role: Initiator",
      status: "Ready",
      statusTone: "success",
      kd: "1.25 K/D",
    },
    {
      slot: "S3",
      name: "VNGD_Nyx",
      role: "Starter",
      roleTone: "muted",
      meta: "Riot ID: NyxVal#NA2 • Role: Sentinel",
      status: "Ready",
      statusTone: "success",
      kd: "1.09 K/D",
    },
    {
      slot: "SUB",
      name: "VNGD_Phantom",
      role: "Substitute",
      roleTone: "outline",
      meta: "Riot ID: PhantomFPS#009 • Flexible Role",
      status: "On Standby",
      statusTone: "outline",
      action: "Swap to Active",
    },
  ] satisfies RosterSlot[],
};
