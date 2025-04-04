import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { SolutionSection } from "@/components/sections/solution"
import { FrameworkSection } from "@/components/sections/framework"
import { ExamplesSection } from "@/components/sections/examples"
import { UseCasesSection } from "@/components/sections/use-cases"
import { PricingSection } from "@/components/sections/pricing"
import { CTASection } from "@/components/sections/cta"

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-auto">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FrameworkSection />
      <ExamplesSection />
      <UseCasesSection />
      <PricingSection />
      <CTASection />
    </div>
  )
} 