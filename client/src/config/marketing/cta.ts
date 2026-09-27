import type { ActionItem } from "./types";

export const cta = {
  eyebrow: "Join The Vanguard Of Competition",
  title: "Ready to Claim the Trophy or Crown the Next Champions?",
  description:
    "Create your verified squad profile to enter weekly cash prize brackets, or claim your organization subdomain to launch automated tournaments today.",
  actions: [
    {
      label: "Register Free as a Player",
      href: "/register",
      variant: "primary",
      icon: "swords",
    },
    {
      label: "Create an Organization",
      href: "/register",
      variant: "secondary",
      icon: "domain",
    },
  ] satisfies ActionItem[],
};
