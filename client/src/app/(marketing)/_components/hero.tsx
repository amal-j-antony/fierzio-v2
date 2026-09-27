import { hero } from "@/config/marketing";
import { ButtonLink } from "./button-link";
import { Icon } from "./icons";
import { LiveMatchCard } from "./live-match-card";
import { StatsStrip } from "./stats-strip";

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-surface-container-lowest px-4 pb-10 pt-32 md:px-8 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid-carbon absolute inset-0 opacity-40" />
        <div className="absolute -top-32 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-crimson-neon/20 blur-[130px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[500px] rounded-full bg-crimson-core/25 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label-mono inline-flex items-center gap-1.5 rounded-full border border-crimson-neon/40 bg-surface-container-high/90 px-2.5 py-0.5 text-[10px] text-primary-fixed-dim shadow-[0_0_12px_rgba(255,42,85,0.25)]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-crimson-neon" />
            {hero.pill.badge}
          </span>
          <span className="hidden font-mono text-[11px] text-on-surface-variant md:inline">
            {hero.pill.note}
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-8">
            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-on-surface sm:text-5xl md:text-[56px] md:leading-[64px]">
              {hero.headlineLead}{" "}
              <span className="text-gradient-crimson drop-shadow-[0_0_24px_rgba(255,26,64,0.35)]">
                {hero.headlineHighlight}
              </span>
            </h1>
            <p className="font-display text-lg font-medium text-on-surface sm:text-xl">
              {hero.subheadline}
            </p>
            <p className="max-w-3xl text-lg leading-7 text-on-surface-variant">
              {hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              {hero.actions.map((action) => (
                <ButtonLink key={action.label} action={action} />
              ))}
              <span className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
                <Icon name={hero.trust.icon} className="h-4 w-4 text-crimson-neon" />
                {hero.trust.label}
              </span>
            </div>
          </div>

          <div className="w-full lg:col-span-4">
            <LiveMatchCard />
          </div>
        </div>

        <StatsStrip />
      </div>
    </section>
  );
}
