"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, House, Menu, X } from "lucide-react";

import styles from "./Navbar.module.css";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Live Updates",
    href: "/live-updates",
  },
  {
    title: "Join Community",
    href: "/community",
  },
  {
    title: "Get Support",
    href: "/support",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* ===============================
          Desktop Navbar
      =============================== */}

      <header
        className={`${styles.dnavWrapper} ${
          scrolled ? styles.dnavScrolled : ""
        }`}
      >
        <div
          className={`${styles.dnavNavbar} ${
            scrolled ? styles.dnavNavbarScrolled : ""
          }`}
        >
          {/* Logo */}

          <Link
            href="/"
            className={styles.dnavLogo}
          >
            <Image
              src="/images/dashboard/logo.webp"
              alt="CleverLN"
              width={180}
              height={52}
              priority
            />
          </Link>

          {/* Desktop Navigation */}

          <nav className={styles.dnavDesktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.dnavLink} ${
                  isActive(item.href)
                    ? styles.dnavActive
                    : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Side */}

          <div className={styles.dnavRight}>
            <button
              className={styles.dnavIcon}
              aria-label="Notifications"
            >
              <Bell
                size={20}
                strokeWidth={1.8}
              />
            </button>

            <button
              className={styles.dnavIcon}
              aria-label="Dashboard Home"
            >
              <House
                size={20}
                strokeWidth={1.8}
              />
            </button>

            <button
              className={styles.dnavMobileButton}
              aria-label="Open Menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* ===============================
          Mobile Drawer
      =============================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}

            <motion.div
              className={styles.dnavOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
              }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}

            <motion.aside
              className={styles.dnavDrawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Drawer Header */}

              <div className={styles.dnavDrawerHeader}>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src="/images/dashboard/logo.webp"
                    alt="CleverLN"
                    width={150}
                    height={42}
                  />
                </Link>

                <button
                  className={styles.dnavIcon}
                  onClick={() => setOpen(false)}
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Navigation */}

              <nav className={styles.dnavMobileNav}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`${styles.dnavMobileLink} ${
                      isActive(item.href)
                        ? styles.dnavMobileActive
                        : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Bottom Section */}

              <div className={styles.dnavDrawerFooter}>
                <button className={styles.dnavDrawerButton}>
                  Notifications
                </button>

                <button className={styles.dnavDrawerButton}>
                  Home
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}