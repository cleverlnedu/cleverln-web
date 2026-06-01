import Certifie from "@/components/certifie/certifie";
import Hero from "@/components/Hero/Hero";
import Job from "@/components/jobs/jobcard";
import Recommend from "@/components/recomendation/recommend";



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
