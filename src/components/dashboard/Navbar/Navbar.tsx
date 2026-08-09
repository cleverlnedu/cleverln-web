"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  House,
  Menu,
  X,
  CheckCheck,
  BriefcaseBusiness,
  BookOpen,
  Sparkles,
} from "lucide-react";

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

const notifications = [
  {
    id: 1,
    title: "New job opportunities",
    description:
      "New jobs matching your profile are now available.",
    time: "Just now",
    type: "job",
    unread: true,
  },
  {
    id: 2,
    title: "Course update",
    description:
      "New learning content has been added to your course.",
    time: "2 hours ago",
    type: "course",
    unread: true,
  },
  {
    id: 3,
    title: "CleverLN opportunity",
    description:
      "Explore new opportunities available for you.",
    time: "Yesterday",
    type: "opportunity",
    unread: false,
  },
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notificationItems, setNotificationItems] =
    useState(notifications);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================================
     CLOSE NOTIFICATION DROPDOWN
     WHEN CLICKING OUTSIDE
  ========================================================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* =========================================================
     UNREAD COUNT
  ========================================================= */

  const unreadCount =
    notificationItems.filter(
      (item) => item.unread
    ).length;

  /* =========================================================
     MARK ALL AS READ
  ========================================================= */

  const markAllAsRead = () => {
    setNotificationItems((items) =>
      items.map((item) => ({
        ...item,
        unread: false,
      }))
    );
  };

  /* =========================================================
     MARK SINGLE NOTIFICATION AS READ
  ========================================================= */

  const handleNotificationClick = (
    id: number
  ) => {
    setNotificationItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              unread: false,
            }
          : item
      )
    );
  };

  /* =========================================================
     NOTIFICATION ICON
  ========================================================= */

  const renderNotificationIcon = (
    type: string
  ) => {
    if (type === "job") {
      return (
        <BriefcaseBusiness
          size={17}
          strokeWidth={1.8}
        />
      );
    }

    if (type === "course") {
      return (
        <BookOpen
          size={17}
          strokeWidth={1.8}
        />
      );
    }

    return (
      <Sparkles
        size={17}
        strokeWidth={1.8}
      />
    );
  };

  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR
      ===================================================== */}

      <header
        className={`${styles.dnavWrapper} ${
          scrolled
            ? styles.dnavScrolled
            : ""
        }`}
      >
        <div
          className={`${styles.dnavNavbar} ${
            scrolled
              ? styles.dnavNavbarScrolled
              : ""
          }`}
        >

          {/* =================================================
              LOGO
          ================================================= */}

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


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className={
              styles.dnavDesktopNav
            }
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  styles.dnavLink
                } ${
                  isActive(item.href)
                    ? styles.dnavActive
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

          <div className={styles.dnavRight}>

            {/* ===============================================
                NOTIFICATION
            =============================================== */}

            <div
              ref={notificationRef}
              className={
                styles.dnavNotificationWrapper
              }
            >

              <button
                type="button"
                className={`${
                  styles.dnavIcon
                } ${
                  notificationOpen
                    ? styles.dnavIconActive
                    : ""
                }`}
                aria-label="Notifications"
                aria-expanded={
                  notificationOpen
                }
                onClick={() =>
                  setNotificationOpen(
                    (prev) => !prev
                  )
                }
              >

                <Bell
                  size={20}
                  strokeWidth={1.8}
                />

                {/* Unread Badge */}

                {unreadCount > 0 && (
                  <span
                    className={
                      styles.dnavNotificationBadge
                    }
                  >
                    {unreadCount > 9
                      ? "9+"
                      : unreadCount}
                  </span>
                )}

              </button>


              {/* =============================================
                  NOTIFICATION DROPDOWN
              ============================================= */}

              <AnimatePresence>
                {notificationOpen && (
                  <motion.div
                    className={
                      styles.dnavNotificationPanel
                    }
                    initial={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >

                    {/* HEADER */}

                    <div
                      className={
                        styles.dnavNotificationHeader
                      }
                    >

                      <div>
                        <h3>
                          Notifications
                        </h3>

                        {unreadCount > 0 && (
                          <p>
                            {unreadCount} unread
                          </p>
                        )}
                      </div>

                      {unreadCount > 0 && (
                        <button
                          type="button"
                          className={
                            styles.dnavMarkAll
                          }
                          onClick={
                            markAllAsRead
                          }
                        >
                          <CheckCheck
                            size={14}
                          />

                          Mark all read
                        </button>
                      )}

                    </div>


                    {/* NOTIFICATIONS */}

                    <div
                      className={
                        styles.dnavNotificationList
                      }
                    >

                      {notificationItems.length >
                      0 ? (
                        notificationItems.map(
                          (notification) => (
                            <button
                              key={
                                notification.id
                              }
                              type="button"
                              className={`${
                                styles.dnavNotificationItem
                              } ${
                                notification.unread
                                  ? styles.dnavNotificationUnread
                                  : ""
                              }`}
                              onClick={() =>
                                handleNotificationClick(
                                  notification.id
                                )
                              }
                            >

                              {/* ICON */}

                              <span
                                className={
                                  styles.dnavNotificationItemIcon
                                }
                              >
                                {renderNotificationIcon(
                                  notification.type
                                )}
                              </span>


                              {/* CONTENT */}

                              <span
                                className={
                                  styles.dnavNotificationContent
                                }
                              >

                                <span
                                  className={
                                    styles.dnavNotificationTitle
                                  }
                                >
                                  {
                                    notification.title
                                  }
                                </span>

                                <span
                                  className={
                                    styles.dnavNotificationDescription
                                  }
                                >
                                  {
                                    notification.description
                                  }
                                </span>

                                <span
                                  className={
                                    styles.dnavNotificationTime
                                  }
                                >
                                  {
                                    notification.time
                                  }
                                </span>

                              </span>


                              {/* UNREAD DOT */}

                              {notification.unread && (
                                <span
                                  className={
                                    styles.dnavUnreadDot
                                  }
                                />
                              )}

                            </button>
                          )
                        )
                      ) : (

                        /* EMPTY */

                        <div
                          className={
                            styles.dnavNotificationEmpty
                          }
                        >
                          <Bell
                            size={24}
                            strokeWidth={1.5}
                          />

                          <p>
                            No notifications yet
                          </p>
                        </div>

                      )}

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>


            {/* ===============================================
                HOME
            =============================================== */}

            <button
              type="button"
              className={
                styles.dnavIcon
              }
              aria-label="Dashboard Home"
              onClick={() =>
                window.location.href =
                  "/"
              }
            >
              <House
                size={20}
                strokeWidth={1.8}
              />
            </button>


            {/* ===============================================
                MOBILE MENU
            =============================================== */}

            <button
              type="button"
              className={
                styles.dnavMobileButton
              }
              aria-label="Open Menu"
              onClick={() =>
                setOpen(true)
              }
            >
              <Menu size={22} />
            </button>

          </div>

        </div>
      </header>


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}

            <motion.div
              className={
                styles.dnavOverlay
              }
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setOpen(false)
              }
            />


            {/* DRAWER */}

            <motion.aside
              className={
                styles.dnavDrawer
              }
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.35,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >

              {/* DRAWER HEADER */}

              <div
                className={
                  styles.dnavDrawerHeader
                }
              >

                <Link
                  href="/"
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  <Image
                    src="/images/dashboard/logo.webp"
                    alt="CleverLN"
                    width={150}
                    height={42}
                  />
                </Link>

                <button
                  type="button"
                  className={
                    styles.dnavIcon
                  }
                  onClick={() =>
                    setOpen(false)
                  }
                  aria-label="Close Menu"
                >
                  <X size={22} />
                </button>

              </div>


              {/* MOBILE NAVIGATION */}

              <nav
                className={
                  styles.dnavMobileNav
                }
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setOpen(false)
                    }
                    className={`${
                      styles.dnavMobileLink
                    } ${
                      isActive(
                        item.href
                      )
                        ? styles.dnavMobileActive
                        : ""
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>


              {/* DRAWER FOOTER */}

              <div
                className={
                  styles.dnavDrawerFooter
                }
              >

               

                <button
                  type="button"
                  className={
                    styles.dnavDrawerButton
                  }
                  onClick={() =>
                    (window.location.href =
                      "/dashboard")
                  }
                >
                  Logout
                </button>

              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}