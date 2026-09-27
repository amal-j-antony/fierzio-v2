import type { IconName, SectionHeadingContent, Tone } from "./types";

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  tone: Tone;
};

export type TrustBadge = {
  icon: IconName;
  label: string;
};

export const trust = {
  heading: {
    eyebrow: "Proven In Premier Competition",
    title: "Trusted By 1,200+ Circuit Directors & Pro Squads",
  } satisfies SectionHeadingContent,
  testimonials: [
    {
      quote:
        "We used to spend 4 hours every Saturday manually confirming match scores and handling Discord screenshot disputes. With Apex Protocol's game-client telemetry integration and staff permission tiers, our tournament runs on autopilot.",
      initials: "MR",
      name: "Marcus Vance",
      role: "Tournament Director, CyberCollegiate League",
      tone: "crimson",
    },
    {
      quote:
        "The Organization Template builder is revolutionary. We configured our 64-team double-elimination CS2 rulebook once, and now our staff can spin up weekly $5k cups in literally two clicks without making configuration errors.",
      initials: "EL",
      name: "Elena Rostova",
      role: "Head Operations Admin, Nordic Masters Cup",
      tone: "secondary",
    },
    {
      quote:
        "As a team captain, getting prize money split to our squad without waiting 90 business days was a game changer. The instant payout pipeline deposited directly to all 5 players within two minutes of the final map.",
      initials: "TK",
      name: "Tyler 'Krypton' K.",
      role: "Captain, Vanguard Cyber (Tier-2 Valorant)",
      tone: "crimson",
    },
  ] satisfies Testimonial[],
  badges: [
    { icon: "verified", label: "Riot Games Anti-Cheat Certified" },
    { icon: "stream", label: "Twitch / YouTube Direct HUD Overlays" },
    { icon: "swap", label: "Discord Official Developer Partner" },
    { icon: "wallet", label: "Instant Escrow Protected Wallets" },
  ] satisfies TrustBadge[],
};
