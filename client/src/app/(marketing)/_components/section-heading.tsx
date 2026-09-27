import type { ReactNode } from "react";
import type { SectionHeadingContent } from "@/config/marketing";

export function SectionHeading({
  heading,
  align = "left",
  className = "",
  action,
}: {
  heading: SectionHeadingContent;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const isCenter = align === "center";

  const block = (
    <div
      className={`flex flex-col gap-1 ${
        isCenter ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl"
      }`}
    >
      <span className="label-mono text-xs font-semibold text-crimson-neon">
        {heading.eyebrow}
      </span>
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-on-surface sm:text-3xl md:text-[36px] md:leading-[44px]">
        {heading.title}
      </h2>
      {heading.description ? (
        <p className="text-[15px] leading-6 text-on-surface-variant">
          {heading.description}
        </p>
      ) : null}
    </div>
  );

  if (!action) {
    return <div className={className}>{block}</div>;
  }

  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}
    >
      {block}
      <div className="shrink-0">{action}</div>
    </div>
  );
}
