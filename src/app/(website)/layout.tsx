import Navbar from "@/components/website/Navbar/Navbar";
import Footer from "@/components/website/footer/footer";


export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}