import Navbar, { NavbarBottomSpacer } from "@/components/website/Navbar/Navbar";
import Footer from "@/components/website/footer/footer";
import SmoothScroll from "@/components/website/SmoothScroll/SmoothScroll";
import { getTrendingCourses } from "@/components/website/footer/trendingCourses";


export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const trendingCourses = await getTrendingCourses();

  return (
    <>
      <SmoothScroll />
      <Navbar />
      {children}
      <Footer trendingCourses={trendingCourses} />
      <NavbarBottomSpacer />
    </>
  );
}