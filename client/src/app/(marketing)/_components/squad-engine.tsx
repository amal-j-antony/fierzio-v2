import { squad } from "@/config/marketing";
import type { RosterSlot } from "@/config/marketing/squad";
import { ButtonLink } from "./button-link";
import { Icon } from "./icons";
import { SectionHeading } from "./section-heading";
import { toneChip, toneDot, toneText } from "./tone";

export function SquadEngine() {
  return (
    <section
      id="player-hub"
      className="w-full bg-surface-container-lowest px-4 py-20 md:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <SectionHeading
          heading={squad.heading}
          action={<ButtonLink action={squad.action} />}
        />

        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-crimson-neon/20 bg-surface-container-low p-6 shadow-xl lg:grid-cols-12">
          <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/5 bg-surface-container p-4 shadow-md lg:col-span-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-crimson-neon/30 bg-surface-container-highest text-crimson-neon shadow-[0_0_16px_rgba(255,26,64,0.3)]">
                  <Icon name="shield" className="h-9 w-9" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-lg font-bold uppercase text-on-surface">
                      {squad.summary.name}
                    </h3>
                    {squad.summary.verified ? (
                      <Icon
                        name="verified"
                        className="h-4 w-4 text-crimson-neon"
                      />
                    ) : null}
                  </div>
                  <span className="label-mono text-[10px] text-outline">
                    {squad.summary.tag}
                  </span>
                  <span className="label-mono text-[10px] text-primary-fixed-dim">
                    {squad.summary.tier}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/5 bg-surface-container-lowest p-3 text-center">
                {squad.summary.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="label-mono text-[9px] text-outline">
                      {stat.label}
                    </span>
                    <span
                      className={`font-mono text-lg font-bold ${toneText[stat.valueTone]}`}
                    >
                      {stat.value}
                    </span>
                    <span
                      className={`label-mono text-[9px] ${toneText[stat.noteTone]}`}
                    >
                      {stat.note}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 rounded-lg border border-white/5 bg-surface-container-high p-3">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-[10px] font-semibold text-on-surface">
                    {squad.summary.ready.label}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-crimson-neon">
                    {squad.summary.ready.value}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <div className="h-full w-full bg-crimson-neon shadow-[0_0_8px_rgba(255,42,85,0.7)]" />
                </div>
                <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                  <Icon
                    name="check-circle"
                    className="h-3.5 w-3.5 text-emerald-400"
                  />
                  {squad.summary.ready.note}
                </span>
              </div>
            </div>

            <ButtonLink action={squad.summary.action} className="w-full" />
          </div>

          <div className="flex flex-col gap-2 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
              <span className="label-mono text-[11px] font-semibold text-on-surface">
                {squad.rosterHeader}
              </span>
              <span className="label-mono text-[10px] text-primary-fixed-dim">
                {squad.discord}
              </span>
            </div>

            {squad.roster.map((slot) => (
              <RosterRow key={slot.name} slot={slot} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RosterRow({ slot }: { slot: RosterSlot }) {
  const isCaptain = slot.slot === "C";
  const isSub = slot.slot === "SUB";

  const avatarClass = isCaptain
    ? "bg-gradient-to-br from-crimson-core to-crimson-neon text-white"
    : isSub
      ? "bg-surface-container text-outline"
      : "bg-surface-container-high text-on-surface";

  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-3 shadow-sm ${
        isCaptain
          ? "border-crimson-neon/20 bg-surface-container"
          : isSub
            ? "border-white/5 bg-surface-container-highest/60"
            : "border-white/5 bg-surface-container"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded font-mono text-[10px] font-bold ${avatarClass}`}
        >
          {slot.slot}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-on-surface">
              {slot.name}
            </span>
            <span
              className={`label-mono rounded px-1.5 py-0.5 text-[9px] ${toneChip[slot.roleTone]}`}
            >
              {slot.role}
            </span>
          </div>
          <span className="label-mono text-[10px] text-outline">
            {slot.meta}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <span
          className={`flex items-center gap-1 font-mono text-[10px] font-medium ${toneText[slot.statusTone]}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${toneDot[slot.statusTone]} ${
              slot.statusTone === "success"
                ? "shadow-[0_0_6px_#34d399]"
                : ""
            }`}
          />
          {slot.status}
        </span>
        {slot.kd ? (
          <span className="hidden font-mono text-[10px] text-outline sm:inline">
            {slot.kd}
          </span>
        ) : null}
        {slot.action ? (
          <button
            type="button"
            className="hidden font-mono text-[10px] font-medium text-crimson-neon transition-colors hover:text-white md:inline"
          >
            {slot.action}
          </button>
        ) : null}
      </div>
    </div>
  );
}
