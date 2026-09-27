export type IconName =
  | "swords"
  | "settings"
  | "explore"
  | "group"
  | "wallet"
  | "copy"
  | "shield-user"
  | "podium"
  | "target"
  | "download"
  | "flight"
  | "soccer"
  | "shield"
  | "trophy"
  | "chart"
  | "users"
  | "tune"
  | "lock"
  | "chevron"
  | "person-add"
  | "expand"
  | "done-all"
  | "bookmark"
  | "live-tv"
  | "star"
  | "verified"
  | "check-circle"
  | "stream"
  | "swap"
  | "forum"
  | "terminal"
  | "headset"
  | "person"
  | "eye"
  | "play"
  | "rocket"
  | "save"
  | "tree"
  | "spark"
  | "arrow-right"
  | "bolt"
  | "domain";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type Tone =
  | "crimson"
  | "secondary"
  | "primary"
  | "tertiary"
  | "outline"
  | "muted"
  | "success";

export type LinkItem = {
  label: string;
  href: string;
};

export type ActionItem = LinkItem & {
  variant?: ButtonVariant;
  icon?: IconName;
  trailingArrow?: boolean;
};

export type NavItem = LinkItem & {
  active?: boolean;
};

export type SectionHeadingContent = {
  eyebrow: string;
  title: string;
  description?: string;
};

export type FeatureRow = {
  icon: IconName;
  title: string;
  description: string;
};
