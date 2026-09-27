import { trust } from "@/config/marketing";
import { Icon } from "./icons";

export function TrustStrip() {
  return (
    <div className="flex w-full flex-wrap items-center justify-around gap-4 rounded-xl border border-white/5 bg-surface-container-lowest p-4">
      {trust.badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-2 text-outline transition-colors hover:text-crimson-neon"
        >
          <Icon name={badge.icon} className="h-6 w-6" />
          <span className="label-mono text-xs font-semibold">
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
}
