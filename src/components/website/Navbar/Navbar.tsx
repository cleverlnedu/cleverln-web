"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import styles from "./Navbar.module.css";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Hire Talent",
    href: "/hire",
  },
  {
    title: "Get Hired",
    href: "/opportunities",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
            onClick={closeMenu}
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
              href="/login"
              className={styles.wLogin}
            >
              LOGIN
            </Link>


            {/* HAMBURGER
                Tablet + Mobile only
            */}

            <button
              type="button"
              className={styles.wMenuButton}
              onClick={handleMenuToggle}
              aria-label={
                menuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X
                  size={25}
                  strokeWidth={2}
                />
              ) : (
                <Menu
                  size={25}
                  strokeWidth={2}
                />
              )}
            </button>

          </div>

        </div>
      </header>


      {/* =================================================
          TABLET / MOBILE MENU
      ================================================= */}

      <div
        className={`${styles.wMobileMenu} ${
          menuOpen
            ? styles.wMobileMenuOpen
            : ""
        }`}
      >
        <nav className={styles.wMobileNav}>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={`${styles.wMobileLink} ${
                isActive(item.href)
                  ? styles.wMobileActive
                  : ""
              }`}
            >
              {item.title}
            </Link>
          ))}

        </nav>
      </div>


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