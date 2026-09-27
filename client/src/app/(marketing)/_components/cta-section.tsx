import { cta } from "@/config/marketing";
import { ButtonLink } from "./button-link";

export function CtaSection() {
  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden bg-surface-container-low px-4 py-20 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-1/4 h-[350px] w-[600px] rounded-full bg-crimson-core/20 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 h-[350px] w-[600px] rounded-full bg-crimson-neon/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-10 rounded-2xl border border-crimson-neon/30 bg-surface-container-lowest/90 p-8 shadow-[0_0_36px_rgba(255,26,64,0.25)] backdrop-blur-xl md:flex-row md:p-12">
        <div className="flex max-w-xl flex-col gap-1">
          <span className="label-mono text-xs font-semibold text-crimson-neon">
            {cta.eyebrow}
          </span>
          <h2 className="font-display text-2xl font-bold uppercase leading-tight text-on-surface sm:text-3xl md:text-[36px] md:leading-[44px]">
            {cta.title}
          </h2>
          <p className="mt-1 text-[15px] leading-6 text-on-surface-variant">
            {cta.description}
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:flex-row md:w-auto">
          {cta.actions.map((action) => (
            <ButtonLink
              key={action.label}
              action={action}
              className="w-full sm:w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
