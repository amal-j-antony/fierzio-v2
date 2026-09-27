"use client";

import { useState } from "react";
import { pillars } from "@/config/marketing";
import type { Pillar } from "@/config/marketing/pillars";
import { Icon } from "./icons";
import { SectionHeading } from "./section-heading";
import { toneChip, toneText } from "./tone";

export function ArenaPillars() {
  const [active, setActive] = useState<"player" | "organizer">("player");

  return (
    <section
      id="features"
      className="w-full bg-surface px-4 py-20 md:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading heading={pillars.heading} />

          <div className="inline-flex self-start rounded-xl border border-white/5 bg-surface-container-high p-1 shadow-inner md:self-auto">
            {pillars.toggle.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id as "player" | "organizer")}
                className={`flex items-center gap-2 rounded-lg px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all ${
                  active === item.id
                    ? "bg-gradient-to-r from-crimson-core to-crimson-neon text-white shadow-[0_0_16px_rgba(255,26,64,0.4)]"
                    : "text-on-surface-variant hover:text-white"
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {pillars.roles.map((role) => (
            <PillarCard
              key={role.id}
              role={role}
              active={active === role.id}
              onSelect={() => setActive(role.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  role,
  active,
  onSelect,
}: {
  role: Pillar;
  active: boolean;
  onSelect: () => void;
}) {
  const accentTone = role.id === "player" ? "crimson" : "secondary";
  const accentText = toneText[accentTone];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col justify-between gap-4 rounded-xl border bg-surface-container-low p-6 text-left shadow-md transition-all ${
        active
          ? "scale-100 border-crimson-neon/25 opacity-100"
          : "scale-[0.99] border-white/5 opacity-60"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span
            className={`label-mono inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-bold ${toneChip[accentTone]}`}
          >
            <Icon name={role.badge.icon} className="h-4 w-4" />
            {role.badge.label}
          </span>
          <span className="label-mono text-[10px] text-outline">
            {role.meta}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold uppercase text-on-surface md:text-2xl">
          {role.title}
        </h3>
        <p className="text-[15px] leading-6 text-on-surface-variant">
          {role.description}
        </p>

        <div className="grid grid-cols-1 gap-2 pt-1">
          {role.features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-container p-3"
            >
              <div className="rounded bg-surface-container-highest p-2">
                <Icon
                  name={feature.icon}
                  className={`h-5 w-5 ${accentText}`}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-on-surface">
                  {feature.title}
                </span>
                <span className="text-[13px] leading-5 text-on-surface-variant">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span
          className={`flex items-center gap-1 font-mono text-xs font-semibold uppercase ${accentText}`}
        >
          {role.footer.linkLabel}
          <span aria-hidden="true">→</span>
        </span>
        <span className="label-mono text-[10px] text-outline">
          {role.footer.stat}
        </span>
      </div>
    </button>
  );
}
