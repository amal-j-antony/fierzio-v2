import type { ActionItem, NavItem } from "./types";

export const announcement = {
  badge: "Live Stream",
  text: "Season 4 Championships Live Now •",
  highlight: "$250,000 Prize Pool",
  action: { label: "Watch Stream", href: "#tournaments" },
};

export const nav = {
  links: [
    { label: "Explore Tournaments", href: "#player-hub" },
    { label: "Squads", href: "#player-hub" },
    { label: "For Organizers", href: "#organizer-builder" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ] satisfies NavItem[],
  host: {
    label: "Host a Tournament",
    href: "#organizer-builder",
    variant: "secondary",
    icon: "trophy",
  } satisfies ActionItem,
  login: { label: "Login", href: "/login" },
  cta: {
    label: "Find Tournaments / Sign Up",
    href: "/register",
    variant: "primary",
    icon: "person",
  } satisfies ActionItem,
};
