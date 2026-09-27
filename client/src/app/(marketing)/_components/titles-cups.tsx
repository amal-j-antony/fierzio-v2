import { titles } from "@/config/marketing";
import type { LiveCup } from "@/config/marketing/titles";
import { ButtonLink } from "./button-link";
import { Icon } from "./icons";
import { SectionHeading } from "./section-heading";
import { toneChip, toneText } from "./tone";

export function TitlesCups() {
  return (
    <section
      id="tournaments"
      className="w-full bg-surface-container-lowest px-4 py-20 md:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        <SectionHeading
          heading={titles.heading}
          action={
            <a
              href={titles.action.href}
              className="flex items-center gap-1 font-mono text-xs font-semibold uppercase text-on-surface-variant transition-colors hover:text-crimson-neon"
            >
              {titles.action.label}
              <span aria-hidden="true">→</span>
            </a>
          }
        />

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {titles.games.map((game) => (
            <div
              key={game.name}
              className="group flex cursor-pointer items-center gap-3 rounded-lg border border-white/5 bg-surface-container-low p-3 transition-all hover:border-crimson-neon/40 hover:bg-surface-container"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded bg-surface-container-high transition-all group-hover:shadow-[0_0_12px_rgba(255,26,64,0.4)] ${toneText[game.tone]}`}
              >
                <Icon name={game.icon} className="h-5 w-5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-bold text-on-surface transition-colors group-hover:text-crimson-neon">
                  {game.name}
                </span>
                <span className="label-mono text-[10px] text-outline">
                  {game.meta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {titles.cups.map((cup) => (
            <CupCard key={cup.name} cup={cup} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CupCard({ cup }: { cup: LiveCup }) {
  return (
    <div className="group flex flex-col justify-between gap-4 rounded-xl border border-crimson-neon/20 bg-surface-container p-4 shadow-md transition-all hover:border-crimson-neon/50 hover:bg-surface-container-high">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`label-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
              toneChip[cup.statusTone]
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full bg-crimson-neon ${
                cup.statusPulse === "ping" ? "animate-ping" : "animate-pulse"
              }`}
            />
            {cup.status}
          </span>
          <span
            className={`label-mono text-[10px] font-mono ${toneText[cup.timingTone]}`}
          >
            {cup.timing}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <span
            className={`label-mono text-[10px] font-mono ${toneText[cup.gameTone]}`}
          >
            {cup.game}
          </span>
          <h3
            className={`font-display text-base font-bold transition-colors group-hover:text-crimson-neon ${
              toneText[cup.nameTone]
            }`}
          >
            {cup.name}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-lg border border-white/5 bg-surface-container-lowest/70 p-1 text-center">
          {cup.meta.map((meta) => (
            <div key={meta.label} className="flex flex-col py-1">
              <span className="label-mono text-[9px] text-outline">
                {meta.label}
              </span>
              <span
                className={`font-mono text-sm font-bold ${
                  meta.tone ? toneText[meta.tone] : "text-on-surface"
                }`}
              >
                {meta.value}
              </span>
            </div>
          ))}
        </div>

        <p className="line-clamp-2 text-[13px] leading-5 text-on-surface-variant">
          {cup.description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <ButtonLink action={cup.action} className="flex-1" />
        <button
          type="button"
          title="Bookmark"
          className="rounded bg-surface-container-highest p-2.5 text-on-surface-variant transition-colors hover:text-white"
        >
          <Icon name="bookmark" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
