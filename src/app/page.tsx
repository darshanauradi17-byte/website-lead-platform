import { Hero } from "@/components/home/Hero";
import { WhoWeHelp } from "@/components/home/WhoWeHelp";
import { Process } from "@/components/home/Process";
import { PortfolioTeaser } from "@/components/home/PortfolioTeaser";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhoWeHelp />
      <Process />
      <PortfolioTeaser />
      <PricingTeaser />
      <Testimonials />
      <FAQ />
      <CTASection />
    </main>
  );
}
