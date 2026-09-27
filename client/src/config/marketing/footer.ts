import type { IconName, LinkItem } from "./types";

export type FooterColumn = {
  title: string;
  links: LinkItem[];
};

export const footer = {
  columns: [
    {
      title: "Players",
      links: [
        { label: "Tournament Finder", href: "#player-hub" },
        { label: "Roster Recruiting", href: "#player-hub" },
        { label: "Global Rankings", href: "#" },
        { label: "Protocol Anti-Cheat", href: "#" },
      ],
    },
    {
      title: "Organizers",
      links: [
        { label: "Create Bracket", href: "#organizer-builder" },
        { label: "Ruleset Engine", href: "#" },
        { label: "Instant Prize Splits", href: "#" },
        { label: "Stream HUD Overlays", href: "#" },
      ],
    },
    {
      title: "Platform",
      links: [
        { label: "Feature Matrix", href: "#features" },
        { label: "Subscription Tiers", href: "#pricing" },
        { label: "Protocol Updates", href: "#" },
        { label: "Zero-Trust Telemetry", href: "#" },
      ],
    },
    {
      title: "Developers",
      links: [
        { label: "REST & gRPC APIs", href: "#" },
        { label: "Live Webhooks", href: "#" },
        { label: "Game Client SDKs", href: "#" },
        { label: "System Status", href: "#" },
      ],
    },
  ] satisfies FooterColumn[],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Tournament Guidelines", href: "#" },
  ] satisfies LinkItem[],
  socials: ["forum", "live-tv", "terminal", "headset"] as IconName[],
};
