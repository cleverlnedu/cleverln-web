import type { Metadata } from "next";
import "./globals.css";

//import Navbar from "@/components/website/Navbar/Navbar";
//import Footer from "@/components/website/footer/footer";

import {
  Geist,
  Geist_Mono,
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
});




const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* =========================================================
GEIST
========================================================= */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================================================
DM SERIF
========================================================= */

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

/* =========================================================
IBM PLEX SANS
========================================================= */

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
});

/* =========================================================
METADATA
========================================================= */

export const metadata: Metadata = {
  title: "CleverLN",
  description: "Learn UI/UX and build your skills in a unique modern way.",
};

/* =========================================================
ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable}
        ${geistSans.variable}
        ${geistMono.variable}
        ${dmSerif.variable}
        ${ibm.variable}
        ${ibmHebrew.variable} 
        ${poppins.variable}
      `}
    >
      <body>
        
        {children}
        
      </body>
    </html>
  );
}