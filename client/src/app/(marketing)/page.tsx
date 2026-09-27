import { ArenaPillars } from "./_components/arena-pillars";
import { BuilderSection } from "./_components/builder-section";
import { CtaSection } from "./_components/cta-section";
import { Hero } from "./_components/hero";
import { SquadEngine } from "./_components/squad-engine";
import { Testimonials } from "./_components/testimonials";
import { TitlesCups } from "./_components/titles-cups";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ArenaPillars />
      <TitlesCups />
      <BuilderSection />
      <SquadEngine />
      <Testimonials />
      <CtaSection />
    </>
  );
}
