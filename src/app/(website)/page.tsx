
import AccessSection from "@/components/website/AccessSection/AccessSection";
import BundleShowcase from "@/components/website/BundleShowcase/BundleShowcase";
import GrowthStats from "@/components/website/GrowthStats/GrowthStats";
import Hero from "@/components/website/Hero/Hero";

import SkillsTrending from "@/components/website/SkillsTrending/SkillsTrending";
import Testimonials from "@/components/website/Testimonials/Testimonials";
import TrustedCompanies from "@/components/website/TrustedCompanies/TrustedCompanies";
import WhyJoinUs from "@/components/website/WhyJoinUs/WhyJoinUs";




export default function Home() {
  return (
    <main>
      <Hero />
      <GrowthStats />
      <SkillsTrending />
      <WhyJoinUs />
      <TrustedCompanies />
      <AccessSection />
      
      <Testimonials />
      <BundleShowcase />
      
      
      
      
      
      
      
    </main>
  );
}
