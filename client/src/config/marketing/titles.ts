import type { ActionItem, IconName, SectionHeadingContent, Tone } from "./types";

export type GameTitle = {
  icon: IconName;
  name: string;
  meta: string;
  tone: Tone;
};

export type CupMeta = {
  label: string;
  value: string;
  tone?: Tone;
};

export type LiveCup = {
  status: string;
  statusTone: Tone;
  statusPulse: "pulse" | "ping";
  timing: string;
  timingTone: Tone;
  game: string;
  gameTone: Tone;
  name: string;
  nameTone: Tone;
  meta: CupMeta[];
  description: string;
  action: ActionItem;
};

export const titles = {
  heading: {
    eyebrow: "Supported Premier Competitive Titles",
    title: "Active Game Ecosystems & Live Cups",
  } satisfies SectionHeadingContent,
  action: { label: "View All 14 Supported Titles", href: "#" },
  games: [
    { icon: "target", name: "Valorant", meta: "5v5 Tactical FPS", tone: "crimson" },
    { icon: "download", name: "Counter-Strike 2", meta: "Premier MR12", tone: "secondary" },
    { icon: "flight", name: "Apex Legends", meta: "Trios Battle Royale", tone: "primary" },
    { icon: "soccer", name: "Rocket League", meta: "3v3 Boost Arena", tone: "primary" },
    { icon: "shield", name: "League of Legends", meta: "Summoner's Rift 5v5", tone: "tertiary" },
  ] satisfies GameTitle[],
  cups: [
    {
      status: "Registration Open",
      statusTone: "primary",
      statusPulse: "pulse",
      timing: "Starts in 3h 20m",
      timingTone: "outline",
      game: "Valorant • North America East",
      gameTone: "primary",
      name: "Redline Protocol Open #42",
      nameTone: "crimson",
      meta: [
        { label: "Prize Pool", value: "$10,000", tone: "crimson" },
        { label: "Entry Fee", value: "Free ($0)" },
        { label: "Squads", value: "28 / 32" },
      ],
      description:
        "Double-elimination bracket with live Riot Vanguard verification. Top 4 teams qualify for the $50k Masters Invitational.",
      action: {
        label: "Register Squad",
        href: "/register",
        variant: "primary",
        icon: "chevron",
      },
    },
    {
      status: "Check-in Window Live",
      statusTone: "crimson",
      statusPulse: "pulse",
      timing: "14m Remaining",
      timingTone: "crimson",
      game: "Counter-Strike 2 • Europe Central",
      gameTone: "secondary",
      name: "Nexus Prime European Masters",
      nameTone: "secondary",
      meta: [
        { label: "Prize Pool", value: "$25,000", tone: "crimson" },
        { label: "Entry Fee", value: "$25 / Squad" },
        { label: "Squads", value: "64 / 64" },
      ],
      description:
        "Swiss system 5-round qualifier to 8-team single elimination. Valve Anti-Cheat sync with automatic MR12 server deployment.",
      action: {
        label: "Captain Check-In",
        href: "#player-hub",
        variant: "primary",
        icon: "done-all",
      },
    },
    {
      status: "In Quarterfinals • Live",
      statusTone: "crimson",
      statusPulse: "ping",
      timing: "Bo3 Matches",
      timingTone: "outline",
      game: "Apex Legends • Global Trios",
      gameTone: "primary",
      name: "Outlands Championship Series Cup",
      nameTone: "crimson",
      meta: [
        { label: "Prize Pool", value: "$5,000", tone: "crimson" },
        { label: "Entry Fee", value: "Free ($0)" },
        { label: "Squads", value: "20 / 20" },
      ],
      description:
        "Match point threshold rule enabled. Automated kill point telemetry scraping directly from Apex Custom Lobby spectator API.",
      action: {
        label: "Watch Live HUD Feed",
        href: "#player-hub",
        variant: "secondary",
        icon: "live-tv",
      },
    },
  ] satisfies LiveCup[],
};
