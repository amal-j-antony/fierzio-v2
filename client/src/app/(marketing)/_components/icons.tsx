import type { ReactNode, SVGProps } from "react";
import type { IconName } from "@/config/marketing/types";

export type { IconName };

const paths: Record<IconName, ReactNode> = {
  swords: (
    <>
      <path d="M14.5 4.5l5 5M17 2l5 5-3 3-5-5 3-3z" />
      <path d="M9.5 19.5l-5-5M7 22l-5-5 3-3 5 5-3 3z" />
      <path d="M14 10l-4 4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M3 12h2.5M18.5 12H21M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </>
  ),
  explore: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  group: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20v-1a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v1" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M17 15a4 4 0 0 1 3.5 4v1" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M16 14h2" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  "shield-user": (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <circle cx="12" cy="10.5" r="1.8" />
      <path d="M9 15.5a3 3 0 0 1 6 0" />
    </>
  ),
  podium: (
    <>
      <path d="M4 21V11h4v10M10 21V4h4v17M16 21v-7h4v7" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v11M8 11l4 4 4-4" />
      <path d="M4 19h16" />
    </>
  ),
  flight: <path d="M3 13l18-7-4 12-4.5-3.5L10 18l-.8-4.2L3 13z" />,
  soccer: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7l3.2 2.3-1.2 3.7h-4L8.8 9.3 12 7zM12 7V3.5M8.8 9.3L5.5 8M15.2 9.3L18.5 8M10 13l-1.5 3.5M14 13l1.5 3.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M7 5H4.5v2A3.5 3.5 0 0 0 8 10.5M17 5h2.5v2A3.5 3.5 0 0 1 16 10.5" />
      <path d="M12 14v3M8.5 20h7l-1-3h-5l-1 3z" />
    </>
  ),
  chart: <path d="M4 19V5M4 19h16M7 16l3.5-4L14 14l4-6" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20v-1a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v1" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M17 15a4 4 0 0 1 3.5 4v1" />
    </>
  ),
  tune: (
    <>
      <path d="M5 7h14M5 12h14M5 17h14" />
      <circle cx="9" cy="7" r="2" fill="var(--background,#111319)" />
      <circle cx="15" cy="12" r="2" fill="var(--background,#111319)" />
      <circle cx="8" cy="17" r="2" fill="var(--background,#111319)" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  chevron: <path d="M9 6l6 6-6 6" />,
  "person-add": (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 20v-1a4 4 0 0 1 4-4h3a4 4 0 0 1 3 1.3" />
      <path d="M17 14v6M14 17h6" />
    </>
  ),
  expand: <path d="M6 9l6 6 6-6" />,
  "done-all": (
    <>
      <path d="M2 13l4 4 6-7" />
      <path d="M9 15l3 3 8-9" />
    </>
  ),
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3z" />,
  "live-tv": (
    <>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 18v3M8.5 9.5l4 2.5-4 2.5v-5z" />
    </>
  ),
  star: <path d="M12 3l2.6 5.6 6 .7-4.4 4.1 1.2 6L12 16.9 6.6 19.4l1.2-6L3.4 9.3l6-.7L12 3z" />,
  verified: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.5 2.5L16.5 9" />
    </>
  ),
  stream: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 6.5a7.5 7.5 0 0 0 0 11M17.5 6.5a7.5 7.5 0 0 1 0 11M3.5 3.5a11.5 11.5 0 0 0 0 17M20.5 3.5a11.5 11.5 0 0 1 0 17" />
    </>
  ),
  swap: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
  forum: (
    <path d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4V5z" />
  ),
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </>
  ),
  headset: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2zM20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S5.5 6 12 6s9.5 6 9.5 6-3 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l5 3.5-5 3.5v-7z" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 4c3 0 6 3 6 6-1.6 3.4-4.6 6-8 7l-2-2c1-3.4 3.6-6.4 8-7" />
      <path d="M9 15l-3 3M7 11l-3 1 2 2M13 17l-1 3-2-2" />
    </>
  ),
  save: (
    <>
      <path d="M5 3h11l3 3v15H5V3z" />
      <path d="M8 3v6h7V3M8 20v-6h8v6" />
    </>
  ),
  tree: (
    <>
      <rect x="3" y="4" width="6" height="4" rx="1" />
      <rect x="15" y="4" width="6" height="4" rx="1" />
      <rect x="9" y="16" width="6" height="4" rx="1" />
      <path d="M6 8v4h12V8M12 12v4" />
    </>
  ),
  spark: (
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
  ),
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  bolt: <path d="M13 3L5 13h5l-1 8 8-10h-5l1-8z" />,
  domain: (
    <>
      <path d="M4 21V6l8-3 8 3v15" />
      <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
