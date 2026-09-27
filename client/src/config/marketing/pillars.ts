import type { FeatureRow, IconName, SectionHeadingContent, Tone } from "./types";

export type Pillar = {
  id: "player" | "organizer";
  badge: { icon: IconName; label: string };
  meta: string;
  title: string;
  description: string;
  features: FeatureRow[];
  footer: { linkLabel: string; href: string; stat: string; tone: Tone };
};

export const pillars = {
  heading: {
    eyebrow: "Built For Both Sides Of The Podium",
    title: "Choose Your Arena Architecture",
    description:
      "Whether you're hunting prize pools with your five-stack or organizing multi-stage circuits for thousands of viewers, FIERZIO delivers surgical precision.",
  } satisfies SectionHeadingContent,
  toggle: [
    { id: "player", label: "For Players", icon: "swords" as IconName },
    { id: "organizer", label: "For Organizers", icon: "settings" as IconName },
  ],
  roles: [
    {
      id: "player",
      badge: { icon: "swords", label: "Player Ecosystem" },
      meta: "Tier 1-4 Ranked Circuit",
      title: "Compete, Climb & Withdraw Without Bottlenecks",
      description:
        "Everything an aspiring pro or veteran stack requires: instant matchmaking discovery, integrated roster management, and automated stat-validated payouts.",
      features: [
        {
          icon: "explore",
          title: "Universal Tournament Discovery",
          description:
            "Filter instantly by game title, region (NA/EU/APAC), sub-20ms ping proximity, ELO skill caps, and format (Solo, 2v2 Duos, 5v5 Tactical).",
        },
        {
          icon: "group",
          title: "Browser-Native Squad System",
          description:
            "Create and invite to your permanent squad. Manage starting five, bench reserves, sync Discord voice channels, and execute synchronized 1-click ready-checks.",
        },
        {
          icon: "wallet",
          title: "Instant Automated Payouts & Verified Stats",
          description:
            "Direct API match result scraping guarantees zero organizer delay. Prize funds deposit automatically to squad split wallets within 60 seconds of victory.",
        },
      ],
      footer: {
        linkLabel: "Explore Active Player Cups",
        href: "#player-hub",
        stat: "18.5k Squads Active",
        tone: "crimson",
      },
    },
    {
      id: "organizer",
      badge: { icon: "podium", label: "Organizer Command Suite" },
      meta: "Enterprise Bracket Automation",
      title: "Run Flawless Tournaments In 3 Minutes Flat",
      description:
        "Eliminate spreadsheet chaos and bracket disputes. Reuse validated tournament templates, delegate roles, and deliver studio-grade spectator HUD feeds.",
      features: [
        {
          icon: "copy",
          title: "Reusable Tournament Templates",
          description:
            "Save custom 64-team Double Elimination, Swiss, or Battle Royale point matrices. Duplicate with 1 click to launch consistent weekly or seasonal leagues.",
        },
        {
          icon: "shield-user",
          title: "Tiered Staff Permissions & Roles",
          description:
            "Add multiple admins with distinct roles: Owner, Head Admin (bracket override), Match Referees (ticket disputes), and Casters (clean observer delays).",
        },
        {
          icon: "live-tv",
          title: "Automated Check-Ins & Stream HUD Overlays",
          description:
            "Dynamic seed generation, automated no-show forfeits, custom sponsor banners, and real-time WebSocket overlay feeds for OBS/vMix broadcast teams.",
        },
      ],
      footer: {
        linkLabel: "Test Template Builder",
        href: "#organizer-builder",
        stat: "450+ Monthly Events",
        tone: "secondary",
      },
    },
  ] satisfies Pillar[],
};
