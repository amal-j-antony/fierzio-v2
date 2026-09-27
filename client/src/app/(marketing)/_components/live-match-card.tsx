import { hero } from "@/config/marketing";
import { Icon } from "./icons";

export function LiveMatchCard() {
  const match = hero.liveMatch;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-crimson-neon/25 bg-surface-container/80 p-4 shadow-[0_0_24px_rgba(255,26,64,0.15)] backdrop-blur-md">
      <div className="flex items-center justify-between">
        <span className="label-mono inline-flex items-center gap-1.5 rounded-full border border-crimson-neon/40 bg-crimson-core/30 px-2.5 py-0.5 text-[10px] text-crimson-neon">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson-neon" />
          {match.status}
        </span>
        <span className="flex items-center gap-1 font-mono text-[10px] text-on-surface-variant">
          <Icon name="eye" className="h-3.5 w-3.5" />
          {match.spectators}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-surface-container-lowest/80 p-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded border border-crimson-neon/40 bg-crimson-core/20 text-crimson-neon">
            <Icon name="shield" className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold uppercase text-on-surface">
              {match.teamA.name}
            </span>
            <span className="font-mono text-[10px] text-crimson-neon">
              {match.teamA.seed}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-mono text-lg font-bold tracking-widest text-crimson-neon drop-shadow-[0_0_8px_rgba(255,42,85,0.5)]">
            {match.teamA.score} - {match.teamB.score}
          </span>
          <span className="label-mono text-[10px] text-outline">{match.map}</span>
        </div>

        <div className="flex flex-row-reverse items-center gap-2 text-right">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-container-high text-secondary">
            <Icon name="bolt" className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold uppercase text-on-surface">
              {match.teamB.name}
            </span>
            <span className="font-mono text-[10px] text-secondary">
              {match.teamB.seed}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between font-mono text-[10px] text-on-surface-variant">
          <span className="font-medium text-crimson-neon">
            {match.probability.labelA}
          </span>
          <span className="text-secondary">{match.probability.labelB}</span>
        </div>
        <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
          <div
            className="h-full bg-crimson-neon shadow-[0_0_8px_rgba(255,42,85,0.7)]"
            style={{ width: `${match.probability.valueA}%` }}
          />
          <div
            className="h-full bg-secondary-container"
            style={{ width: `${match.probability.valueB}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-1 flex w-full items-center justify-center gap-2 rounded border border-crimson-neon/20 bg-surface-container-highest py-2 font-mono text-[11px] uppercase tracking-wider text-on-surface transition-colors hover:border-crimson-neon/50 hover:bg-surface-bright hover:text-white"
      >
        <Icon name="play" className="h-4 w-4 text-crimson-neon" />
        {match.action}
      </button>
    </div>
  );
}
