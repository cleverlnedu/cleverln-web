"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon } from "@phosphor-icons/react";
import { BookOpenTextIcon } from "@phosphor-icons/react/dist/csr/BookOpenText";
import { BriefcaseIcon } from "@phosphor-icons/react/dist/csr/Briefcase";
import { HouseIcon } from "@phosphor-icons/react/dist/csr/House";
import { UsersThreeIcon } from "@phosphor-icons/react/dist/csr/UsersThree";

import styles from "./Navbar.module.css";
import { useAuth } from "@/components/website/AuthProvider";
import LoadingIndicator from "@/components/common/LoadingIndicator";

// Outline icons, switching to solid for the current page (like iOS tab bars).
const navItems: { title: string; href: string; icon: Icon }[] = [
  {
    title: "Home",
    href: "/",
    icon: HouseIcon,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpenTextIcon,
  },
  {
    title: "Hire Talent",
    href: "/hire",
    icon: UsersThreeIcon,
  },
  {
    title: "Get Hired",
    href: "/opportunities",
    icon: BriefcaseIcon,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const activeIndex = navItems.findIndex((item) => isActive(item.href));

  return (
    <>
      {/* =================================================
          FIXED NAVBAR
      ================================================= */}

      <header
        className={`${styles.wNavbarWrapper} ${
          scrolled
            ? styles.wNavbarWrapperScrolled
            : ""
        }`}
      >
        <div
          className={`${styles.wNavbar} ${
            scrolled
              ? styles.wNavbarScrolled
              : ""
          }`}
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            className={styles.wLogo}
          >
            <Image
              src="/images/dashboard/logo.webp"
              alt="CleverLN"
              width={155}
              height={45}
              priority
            />
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className={styles.wNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.wNavLink} ${
                  isActive(item.href)
                    ? styles.wNavActive
                    : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>


          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className={styles.wRight}>

            {/* LOGIN */}

            <Link
              href={loading ? "/login" : user ? "/dashboard" : "/login"}
              className={styles.wLogin}
              aria-live="polite"
            >
              {loading ? <LoadingIndicator /> : user ? "MY LEARNING" : "LOGIN"}
            </Link>

          </div>

        </div>
      </header>


      {/* =================================================
          TABLET / MOBILE BOTTOM NAVIGATION
          Logo + login stay in the top bar; the pages move here.
      ================================================= */}

      {/* Frosts the strip under and around the floating bar, so no page content shows below it */}
      <div className={styles.wBottomScrim} aria-hidden="true" />

      <nav
        className={styles.wBottomNav}
        aria-label="Main"
        data-has-active={activeIndex >= 0 ? "" : undefined}
        style={{ "--active-index": Math.max(activeIndex, 0) } as CSSProperties}
      >
        {/* Glass bubble that glides to the current page */}
        <span className={styles.wBottomIndicator} aria-hidden="true" />
        {/* Glossy light sweep; re-mounts on tab change so the shine runs across right away */}
        <span className={styles.wBottomGloss} aria-hidden="true">
          <span key={activeIndex} className={styles.wBottomShine} />
        </span>
        {navItems.map(({ title, href, icon: TabIcon }, index) => {
          const active = index === activeIndex;
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.wBottomLink} ${active ? styles.wBottomActive : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {/* Re-mounts on change so the active icon pops in */}
              <TabIcon key={active ? "on" : "off"} className={styles.wBottomIcon} size={24} weight={active ? "fill" : "regular"} aria-hidden="true" />
              <span className={styles.wBottomLabel}>{title}</span>
            </Link>
          );
        })}
      </nav>


      {/* =================================================
          NAVBAR SPACE
          Prevents Hero overlap
      ================================================= */}

      <div
        className={styles.wNavbarSpacer}
        aria-hidden="true"
      />
    </>
  );
}


/** Keeps the end of the page clear of the bottom navigation on tablets and phones. Place after the footer. */
export function NavbarBottomSpacer() {
  return <div className={styles.wBottomNavSpacer} aria-hidden="true" />;
}
