import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/website/AuthProvider";
import { brandIntroScript } from "@/components/website/BrandSplash/brandIntro";
import BrandSplash from "@/components/website/BrandSplash/BrandSplash";

//import Navbar from "@/components/website/Navbar/Navbar";
//import Footer from "@/components/website/footer/footer";

import {
  Poppins,
  DM_Serif_Display,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Hebrew
} from "next/font/google";

/* =========================================================
POPPINS
========================================================= */

const ibmHebrew = IBM_Plex_Sans_Hebrew({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-hebrew",
  // Only the hire and opportunities pages use this face, so it is fetched when
  // a page needs it instead of being preloaded on every page.
  preload: false,
});




const poppins = Poppins({
  subsets: ["latin"],
  // Weight 300 is not used by any style, so it is not downloaded.
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* =========================================================
DM SERIF
========================================================= */

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
  // Used on the course detail page and job cards only.
  preload: false,
});

/* =========================================================
IBM PLEX SANS
========================================================= */

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
});

/* =========================================================
METADATA
========================================================= */

export const metadata: Metadata = {
  // Pages set their own name; it shows in the tab as "Name | CleverLN".
  title: { default: "CleverLN", template: "%s | CleverLN" },
  description: "Learn UI/UX and build your skills in a unique modern way.",
};

const rootFontClasses = [
  poppins.variable,
  dmSerif.variable,
  ibm.variable,
  ibmHebrew.variable,
].join(" ");

/* =========================================================
ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior lets Next.js turn off the smooth scrolling from globals.css while it changes pages
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={rootFontClasses}>
        <script dangerouslySetInnerHTML={{ __html: brandIntroScript }} />
        <BrandSplash />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
