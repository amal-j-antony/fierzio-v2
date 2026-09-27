import type { ReactNode } from "react";
import { builder } from "@/config/marketing";
import { ButtonLink } from "./button-link";
import { Icon } from "./icons";
import { SectionHeading } from "./section-heading";
import { toneChip, toneDot, toneText } from "./tone";

export function BuilderSection() {
  return (
    <section
      id="organizer-builder"
      className="w-full bg-surface px-4 py-20 md:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <SectionHeading heading={builder.heading} />

        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-crimson-neon/20 bg-surface-container-low p-6 shadow-xl lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <StepCard
              number={builder.preset.step}
              tone="crimson"
              title={builder.preset.title}
              tag={builder.preset.tag}
            >
              <div className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-container-lowest p-3">
                <div className="flex items-center gap-3">
                  <Icon
                    name={builder.preset.icon}
                    className="h-5 w-5 text-crimson-neon"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">
                      {builder.preset.name}
                    </span>
                    <span className="label-mono text-[10px] text-outline">
                      {builder.preset.meta}
                    </span>
                  </div>
                </div>
                <Icon name="expand" className="h-4 w-4 text-on-surface-variant" />
              </div>
            </StepCard>

            <StepCard
              number={builder.automations.step}
              tone="secondary"
              title={builder.automations.title}
              tag={builder.automations.tag}
            >
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {builder.automations.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded border border-white/5 bg-surface-container-lowest p-2"
                  >
                    <span className="text-[12px] text-on-surface-variant">
                      {item.label}
                    </span>
                    <span
                      className={`label-mono text-[10px] font-bold ${toneText[item.tone]}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </StepCard>

            <StepCard
              number={builder.staff.step}
              tone="muted"
              title={builder.staff.title}
              action={
                <span className="flex items-center gap-1 font-mono text-[11px] font-medium text-crimson-neon">
                  <Icon name="person-add" className="h-3.5 w-3.5" />
                  {builder.staff.addLabel}
                </span>
              }
            >
              <div className="flex flex-col gap-1">
                {builder.staff.members.map((member) => (
                  <div
                    key={member.initials}
                    className="flex items-center justify-between rounded border border-white/5 bg-surface-container-lowest p-2"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${toneChip[member.tone]}`}
                      >
                        {member.initials}
                      </span>
                      <span className="text-[12px] font-semibold text-on-surface">
                        {member.name}
                      </span>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] ${toneChip[member.tone]}`}
                    >
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </StepCard>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="flex items-center gap-1 font-mono text-[10px] text-outline">
                <Icon name="save" className="h-4 w-4" />
                {builder.footerNote}
              </span>
              <ButtonLink action={builder.deploy} />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-xl border border-crimson-neon/20 bg-surface-container-lowest p-4 lg:col-span-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="tree" className="h-4 w-4 text-crimson-neon" />
                <span className="font-display text-sm font-bold uppercase text-on-surface">
                  {builder.preview.title}
                </span>
              </div>
              <span className="label-mono text-[10px] font-mono text-primary-fixed-dim">
                {builder.preview.meta}
              </span>
            </div>

            <div className="flex flex-col gap-3 overflow-hidden rounded-lg border border-white/5 bg-surface-container-high/40 p-3">
              {builder.preview.matches.map((match, index) => (
                <div key={index}>
                  <div
                    className={`rounded border-l-2 bg-surface-container p-2 shadow-sm ${
                      match.accent === "crimson"
                        ? "border-crimson-neon"
                        : "border-secondary"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      {match.rows.map((row) => (
                        <div
                          key={row.team}
                          className="flex items-center justify-between font-mono text-[11px]"
                        >
                          <span
                            className={`flex items-center gap-1 ${toneText[row.tone]}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${toneDot[row.tone]}`}
                            />
                            {row.team}
                          </span>
                          <span
                            className={
                              row.tone === "muted"
                                ? "text-on-surface-variant"
                                : `font-bold ${toneText[row.tone]}`
                            }
                          >
                            {row.score}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {index === 0 ? (
                    <div className="my-1 flex items-center justify-center">
                      <span className="font-mono text-[10px] text-crimson-neon/80">
                        {builder.preview.connectorAdvanced}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="flex items-center justify-center">
                <span className="font-mono text-[10px] text-crimson-neon">
                  {builder.preview.connectorSemis}
                </span>
              </div>

              <div className="flex items-center justify-between rounded border border-crimson-neon/30 bg-surface-container-highest/90 p-2 font-mono text-[11px] font-bold shadow-md">
                <span className="text-crimson-neon">
                  {builder.preview.semis.a}
                </span>
                <span className="text-outline">VS</span>
                <span className="text-secondary">
                  {builder.preview.semis.b}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-surface-container p-3">
              <Icon
                name={builder.preview.callout.icon}
                className="h-6 w-6 shrink-0 text-crimson-neon"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-on-surface">
                  {builder.preview.callout.title}
                </span>
                <span className="text-[12px] leading-5 text-on-surface-variant">
                  {builder.preview.callout.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  tone,
  title,
  tag,
  action,
  children,
}: {
  number: number;
  tone: "crimson" | "secondary" | "muted";
  title: string;
  tag?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const circle =
    tone === "crimson"
      ? "bg-crimson-core text-white shadow-[0_0_8px_rgba(255,26,64,0.5)]"
      : tone === "secondary"
        ? "bg-secondary-container text-white"
        : "bg-surface-container-highest text-on-surface";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-surface-container p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold ${circle}`}
          >
            {number}
          </span>
          <span className="font-display text-sm font-bold uppercase text-on-surface">
            {title}
          </span>
        </div>
        {tag ? (
          <span
            className={`label-mono rounded border px-2 py-0.5 font-mono text-[10px] font-medium ${
              tone === "secondary"
                ? "border-crimson-neon/20 bg-secondary-container/40 text-secondary"
                : "border-crimson-neon/30 bg-crimson-core/15 text-crimson-neon"
            }`}
          >
            {tag}
          </span>
        ) : (
          action
        )}
      </div>
      {children}
    </div>
  );
}
