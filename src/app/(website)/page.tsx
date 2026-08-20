
import GrowthStats from "@/components/website/GrowthStats/GrowthStats";
import Hero from "@/components/website/Hero/Hero";
import Job from "@/components/website/jobs/jobcard";
import SkillsTrending from "@/components/website/SkillsTrending/SkillsTrending";
import Testimonials from "@/components/website/Testimonials/Testimonials";




export default function Home() {
  return (
    <main>
      <Hero />
      <GrowthStats />
      <SkillsTrending />
      <Testimonials />
      
      
      <Job />
      
    </main>
  );
}
