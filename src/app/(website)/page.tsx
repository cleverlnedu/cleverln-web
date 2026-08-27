
import AccessSection from "@/components/website/AccessSection/AccessSection";
import BundleShowcase from "@/components/website/BundleShowcase/BundleShowcase";
import GrowthStats from "@/components/website/GrowthStats/GrowthStats";
import SkillsHero from "@/components/website/SkillsHero/SkillsHero";

import SkillsTrending from "@/components/website/SkillsTrending/SkillsTrending";
import Testimonials from "@/components/website/Testimonials/Testimonials";
import TrustedCompanies from "@/components/website/TrustedCompanies/TrustedCompanies";
import WhyJoinUs from "@/components/website/WhyJoinUs/WhyJoinUs";




export default function Home() {
  return (
    <main>
      <SkillsHero />
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
