import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CapabilityStrip } from "@/components/CapabilityStrip";
import { Manifesto } from "@/components/Manifesto";
import { UseCases } from "@/components/UseCases";
import { Problems } from "@/components/Problems";
import { Services } from "@/components/Services";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Workflow } from "@/components/Workflow";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyRian } from "@/components/WhyRian";
import { Metrics } from "@/components/Metrics";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <CapabilityStrip />
        <Manifesto />
        <Problems />
        <Services />
        <ProductShowcase />
        <UseCases />
        <Workflow />
        <HowItWorks />
        <WhyRian />
        <Metrics />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
