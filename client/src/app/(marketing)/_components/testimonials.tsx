import { trust } from "@/config/marketing";
import { Icon } from "./icons";
import { SectionHeading } from "./section-heading";
import { toneText } from "./tone";
import { TrustStrip } from "./trust-strip";

export function Testimonials() {
  return (
    <section className="w-full bg-surface px-4 py-20 md:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        <SectionHeading heading={trust.heading} align="center" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {trust.testimonials.map((item) => (
            <div
              key={item.name}
              className={`flex flex-col justify-between gap-4 rounded-xl border bg-surface-container-low p-4 shadow-md ${
                item.tone === "crimson"
                  ? "border-crimson-neon/20"
                  : "border-white/5"
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className={`flex items-center gap-1 ${toneText[item.tone]}`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Icon key={index} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <p className="text-[15px] leading-6 text-on-surface">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border bg-surface-container-high font-bold ${
                    item.tone === "crimson"
                      ? "border-crimson-neon/30 text-crimson-neon"
                      : "border-white/5 text-secondary"
                  }`}
                >
                  {item.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-on-surface">
                    {item.name}
                  </span>
                  <span className="label-mono text-[10px] text-outline">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <TrustStrip />
      </div>
    </section>
  );
}
