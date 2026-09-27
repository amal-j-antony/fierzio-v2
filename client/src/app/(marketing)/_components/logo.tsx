import Image from "next/image";
import { site } from "@/config/marketing";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={site.logo}
        alt="Fierzio logo"
        width={36}
        height={36}
        className="h-9 w-9 object-contain drop-shadow-[0_0_14px_rgba(255,26,64,0.55)]"
      />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold uppercase tracking-tight text-on-surface">
            FIERZIO<span className="text-crimson-neon">.GG</span>
          </span>
          <span className="label-mono mt-0.5 text-[9px] text-outline">
            {site.tagline}
          </span>
        </span>
      ) : null}
    </div>
  );
}
