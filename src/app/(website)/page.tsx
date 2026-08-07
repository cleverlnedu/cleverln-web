import Certifie from "@/components/website/certifie/certifie";
import Hero from "@/components/website/Hero/Hero";
import Job from "@/components/website/jobs/jobcard";
import Recommend from "@/components/website/recomendation/recommend";



export default function Home() {
  return (
    <main>
      <Hero />
      <Certifie />
      <Recommend />
      <Job />
      
    </main>
  );
}
