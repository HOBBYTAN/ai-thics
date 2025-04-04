import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { SolutionSection } from "@/components/sections/solution"
import { FrameworkSection } from "@/components/sections/framework"
import { ResultsSection } from "@/components/sections/results"
import { IndustriesSection } from "@/components/sections/industries"
import { PricingSection } from "@/components/sections/pricing"
import { SubscribeSection } from "@/components/sections/subscribe"

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <div className="space-y-16 py-12">
        <ProblemSection />
        <SolutionSection />
        <FrameworkSection />
        <ResultsSection />
        <IndustriesSection />
        <PricingSection />
      </div>
      <SubscribeSection />
    </div>
  )
}
