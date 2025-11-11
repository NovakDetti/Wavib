import { AIContentEngine } from "@/components/AIContentEngine";
import { Comparison } from "@/components/Comparison";
import { FAQ } from "@/components/FAQ";
import { Features } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Integrations } from "@/components/Integrations";
import { Navbar } from "@/components/Navbar"
import { Pricing } from "@/components/Pricing";
import { Security } from "@/components/Security";
import { SmartScheduler } from "@/components/SmartScheduler";
import { SocialProof } from "@/components/SocialProof";

export function generateStaticParams() {
  return [{ slug: [''] }]
}
 
export default function Page() {
    return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <SocialProof />
      <Integrations />
      <AIContentEngine />
      <SmartScheduler />
      <Comparison />
      <Security />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}