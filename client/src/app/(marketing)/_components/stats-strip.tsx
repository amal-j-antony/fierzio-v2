import { hero } from "@/config/marketing";
import { Icon } from "./icons";
import { toneText } from "./tone";

export function StatsStrip() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 rounded-xl border border-crimson-neon/20 bg-surface-container-low/90 p-4 shadow-md backdrop-blur-md md:grid-cols-4">
      {hero.stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-0.5">
          <span className="label-mono text-[10px] text-outline">
            {stat.label}
          </span>
          <span
            className={`font-display text-2xl font-bold tracking-tight md:text-3xl ${
              toneText[stat.valueTone ?? "muted"]
            } ${
              stat.valueTone === "crimson"
                ? "drop-shadow-[0_0_12px_rgba(255,42,85,0.4)]"
                : ""
            }`}
          >
            {stat.value}
          </span>
          <span
            className={`flex items-center gap-1 font-mono text-[10px] ${
              toneText[stat.noteTone ?? "muted"]
            }`}
          >
            <Icon name={stat.icon} className="h-3.5 w-3.5" />
            {stat.note}
          </span>
        </div>
      ))}
    </div>
  );
}
