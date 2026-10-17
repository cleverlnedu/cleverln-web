import Navbar, { NavbarBottomSpacer } from "@/components/website/Navbar/Navbar";
import Footer from "@/components/website/footer/footer";
import SmoothScroll from "@/components/website/SmoothScroll/SmoothScroll";


export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      {children}
      <Footer />
      <NavbarBottomSpacer />
    </>
  );
}