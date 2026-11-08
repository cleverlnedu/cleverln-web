"use client";

import styles from "./ProductPageTemplate.module.css";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, Briefcase, CalendarDays, Hammer, TrendingUp, Users } from "lucide-react";
import CourseHeroArt from "./Courses/CourseHeroArt";
import ContactLeadForm from "./ProductSections/ContactLeadForm";
import FaqSection from "./ProductSections/FaqSection";
import PricingPlans, { type PricingPlan } from "./ProductSections/PricingPlans";
import { getCourseDetails } from "./Courses/courseDetails";
import { getCourseFaqs } from "./Courses/courseFaqs";
import { getCourseHero } from "./Courses/courseHero";

export type ProductPageCourse = {
  slug?: string;
  category?: string | null;
  title: string;
  description: string;
  priceMinor: number;
  compareAtPriceMinor: number | null;
};

// Icons for the three "How it works" steps (the steps themselves are per course, see Courses/courseDetails.ts).
const IMPACT_STEP_ICONS = [Hammer, Briefcase, TrendingUp];

const IMPACT_COMPANIES = [
  { src: "/products/mmmiles.webp", alt: "Miles", width: 448, height: 128 },
  { src: "/products/redit.webp", alt: "Reddit", width: 576, height: 212 },
  { src: "/products/swiggy.webp", alt: "Swiggy", width: 608, height: 168 },
];

// Both plans are shown on /product and on every course page.
const PLANS = [
  {
    id: "standard",
    name: "Standard",
    badge: "Standard",
    price: "21099",
    description: "Perfect for beginners who prefer flexible, self-paced learning.",
    trending: false,
    features: [
      "LMS + interactive live sessions",
      <>Earn your <strong>CleverLN</strong> certificate.</>,
      "Get job portal access. Apply now.",
      "2+ Real-time projects",
      "Integrate AI into your daily work.",
    ],
  },
  {
    id: "advantage",
    name: "Advantage +",
    badge: <>Advantage <strong>+</strong></>,
    price: "23199",
    description: "Perfect for students aiming to grow under expert guidance.",
    trending: true,
    features: [
      "Complete Standard plan Included",
      <>Earn your <strong>CleverLN Pro</strong> certificate.</>,
      "Get Real-Time Internship + LOR",
      "Dedicated Growth Mentor Provided",
      "Weekly AI Interviews, Tests & Reports",
    ],
  },
];

// Shown on the Advantage + card on mobile (Standard gets "Most affordable plan"), so the step up reads as a small one.
const ADVANTAGE_EXTRA = (Number(PLANS[1].price) - Number(PLANS[0].price)).toLocaleString("en-IN");

export default function ProductPage({ course, onBuyNow, owned = false, onOpenCourse }: { course?: ProductPageCourse; onBuyNow?: () => void; owned?: boolean; onOpenCourse?: () => void }) {

  // Questions written for this course (see Courses/courseFaqs.ts); also sent as FAQPage data by the course route.
  const { name: faqName, faqs } = getCourseFaqs(course);
  // "What this program is about" copy and the industry tools, written for this course.
  const { impact, tools, stats } = getCourseDetails(course);







  // Standard goes through the course checkout; Advantage + has no checkout yet.
  const plans: [PricingPlan, PricingPlan] = [
    { ...PLANS[0], note: "Most affordable plan", onBuy: owned ? onOpenCourse : onBuyNow, buyLabel: owned ? "OPEN COURSE" : "BUY NOW" },
    { ...PLANS[1], note: `Just Rs ${ADVANTAGE_EXTRA} more than Standard` },
  ];

  // Each course has its own headline, photo, colours and layout in the hero.
  const hero = getCourseHero(course);

  return (
    <main className={styles.page}>
      
      {/* ================= HERO SECTION ================= */}
    <section className={styles.prohero}>
      <div className={styles.proheroContainer}>

        {/* LEFT CONTENT */}
        <div className={styles.proheroLeft}>

          <h1 className={styles.proheroHeading}>
            {hero.headline}
          </h1>

          <p className={styles.proheroSubtext}>
            {hero.description || course?.description || <>Learn UI/UX design through a practical, hands-on approach focused on
            applications and helps you understand user behavior, design intuitive
            interfaces, and work with industry tools like Figma.</>}
          </p>

          <div className={styles.proheroButtons}>
            <button className={styles.proheroPrimaryBtn} onClick={() => document.getElementById("course-pricing")?.scrollIntoView({ behavior: "smooth" })}>
              Enroll Now
            </button>

            <button className={styles.proheroSecondaryBtn} onClick={() => document.getElementById("course-pricing")?.scrollIntoView({ behavior: "smooth" })}>
              Know More
            </button>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.proheroRight}>
          <div className={styles.proheroImageWrapper}>

            {/* the course's own person over its decorative backdrop (desktop and mobile) */}
            <CourseHeroArt hero={hero} alt={course?.title || "UI/UX course"} className={styles.proheroArt} />

          </div>
        </div>

      </div>
    </section>







    {/* ================= TRUSTED LOGOS ================= */}
    <section className={styles.protrusted}>
      <div className={styles.protrustedContainer}>

        <p className={styles.protrustedText}>
          Join us, grow with us, and build your future with

        </p>

        <div className={styles.protrustedLogos}>

          <img
            src="/logos/dell.webp"
            alt="Rise"
          />

          <img
            src="/logos/host.webp"
            alt="Vertigo"
          />

          <img
            src="/logos/linkedin.webp"
            alt="Minty"
          />

          <img
            src="/logos/rpay.webp"
            alt="Glossy"
          />

          <img
            src="/logos/slack.webp"
            alt="Rise"
          />

          <img
            src="/logos/spotify.webp"
            alt="Waveless"
          />

        </div>

      </div>
    </section>





      {/* ================= IMPACT (bento grid) =================
          What the program is about, how it works, who it is built with and the numbers, in one grid. */}
      <section className={styles.proimpactSection}>
        <div className={styles.proimpactContainer}>

          <header className={styles.proimpactHeader}>
            <p className={styles.proimpactTag}>
              WHAT THIS PROGRAM IS ABOUT
            </p>

            <h2 className={styles.proimpactHeading}>
              {impact.heading[0]}<span>{impact.heading[1]}</span>{impact.heading[2]}
            </h2>

            <p className={styles.proimpactDescription}>
              {impact.description}
            </p>
          </header>

          <div className={styles.proimpactGrid}>

            {/* HOW IT WORKS */}
            <article className={`${styles.proimpactCard} ${styles.proimpactSteps}`}>
              <p className={styles.proimpactCardLabel}>How it works</p>
              <h3 className={styles.proimpactCardTitle}>{impact.steps.map((s) => s.title).join(". ")}</h3>

              <ol className={styles.proimpactStepList}>
                {impact.steps.map(({ title, text }, i) => {
                  const Icon = IMPACT_STEP_ICONS[i];
                  return (
                  <li key={title}>
                    <span className={styles.proimpactStepIcon}>
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <span className={styles.proimpactStepNumber}>0{i + 1}</span>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </li>
                  );
                })}
              </ol>
            </article>

            {/* STATS */}
            <article className={`${styles.proimpactCard} ${styles.proimpactStat}`}>
              <span className={styles.proimpactStatIcon}>
                <CalendarDays size={20} strokeWidth={2} />
              </span>
              <div>
                <p className={styles.proimpactStatNumber}>{stats.duration}</p>
                <p className={styles.proimpactStatLabel}>Course duration</p>
              </div>
            </article>

            <article className={`${styles.proimpactCard} ${styles.proimpactStat}`}>
              <span className={styles.proimpactStatIcon}>
                <Users size={20} strokeWidth={2} />
              </span>
              <div>
                <p className={styles.proimpactStatNumber}>{stats.students}</p>
                <p className={styles.proimpactStatLabel}>Students registered</p>
              </div>
            </article>

            {/* COMPANIES */}
            <article className={`${styles.proimpactCard} ${styles.proimpactCompanies}`}>
              <p className={styles.proimpactCardLabel}>Learn by building</p>
              <h3 className={styles.proimpactCardTitle}>{impact.casesTitle}</h3>

              <div className={styles.proimpactLogos}>
                {IMPACT_COMPANIES.map((logo) => (
                  <div key={logo.alt} className={styles.proimpactLogoItem}>
                    <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
                  </div>
                ))}
              </div>

              <p className={styles.proimpactFooter}>
                {impact.casesFooter}
              </p>
            </article>

            {/* JOBS */}
            <article className={`${styles.proimpactCard} ${styles.proimpactJobs}`}>
              <p className={styles.proimpactCardLabel}>This year</p>
              <p className={styles.proimpactJobsNumber}>{stats.jobs}</p>
              <p className={styles.proimpactJobsText}>Jobs are listed this year.</p>
              <p className={styles.proimpactJobsText}>
                {impact.jobsLine}
              </p>

              <button
                type="button"
                className={styles.proimpactJobsButton}
                onClick={() => document.getElementById("course-pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start with CleverLN
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>

              {/* decorative growth chart (no data, just the idea of jobs going up) */}
              <svg className={styles.proimpactJobsChart} viewBox="0 0 232 150" aria-hidden="true">
                <defs>
                  <linearGradient id="proimpactJobsArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
                    <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[[6, 104], [44, 90], [82, 94], [120, 70], [158, 54], [196, 32]].map(([x, y]) => (
                  <rect key={x} x={x} y={y} width="24" height={150 - y} rx="6" fill="#ffffff" fillOpacity="0.08" />
                ))}
                <path d="M2 122C30 114 52 106 78 102C106 98 122 74 148 64C172 56 190 40 214 20L214 150L2 150Z" fill="url(#proimpactJobsArea)" />
                <path className={styles.proimpactJobsLine} pathLength={1} d="M2 122C30 114 52 106 78 102C106 98 122 74 148 64C172 56 190 40 214 20" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <circle cx="78" cy="102" r="4" fill="#0b6e4b" stroke="#ffffff" strokeWidth="2" />
                <circle cx="148" cy="64" r="4" fill="#0b6e4b" stroke="#ffffff" strokeWidth="2" />
                <circle className={styles.proimpactJobsPulse} cx="214" cy="20" r="11" fill="#ffffff" />
                <circle cx="214" cy="20" r="6" fill="#ffffff" />
              </svg>
            </article>

          </div>
        </div>
      </section>










<PricingPlans id="course-pricing" plans={plans} />


























    <ContactLeadForm />












    
<section className={styles.protoolsSection}>
  <div className={styles.protoolsContainer}>

    {/* ================= HEADING ================= */}
    <div className={styles.protoolsHeader}>
      <h2>
        Work with Industry Tools
      </h2>

      <p>
        Core Skills You’ll Build with CleverLN
      </p>
    </div>


    {/* ================= LOGOS ================= */}
        {/* the tools taught in this course (see Courses/courseDetails.ts) */}
        {"wordmarks" in tools ? (
          <div className={styles.protoolsLogos}>
            {tools.wordmarks.map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={logo.alt} src={logo.src} alt={logo.alt} />
            ))}
          </div>
        ) : tools.list.length > 0 ? (
          <ul className={styles.protoolsLogos} aria-label="Tools you will learn">
            {tools.list.map((tool) => (
              <li key={tool.icon + tool.name} className={styles.protoolsTool} title={tool.name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/tools/icons/${tool.icon}.svg`}
                  alt={tool.label === "" ? tool.name : ""}
                  className={tool.wide ? styles.protoolsToolWide : undefined}
                  style={tool.wide ? ({ "--wide": tool.wide } as CSSProperties) : undefined}
                />
                {tool.label !== "" && <span>{tool.label ?? tool.name}</span>}
              </li>
            ))}
          </ul>
        ) : null}


        {/* ================= BROCHURE CARD ================= */}
        <div className={styles.protoolsBrochureCard}>

          {/* LEFT */}
          <div className={styles.protoolsBrochureLeft}>

            <h3>
              Access Course Brochure
            </h3>

            <p>
              Want to know more about the course? Click the download button to check it out.
            </p>

          </div>


          {/* RIGHT */}
          <button
            type="button"
            className={styles.protoolsBrochureButton}
          >
            Download Brochure
          </button>

        </div>

      </div>
    </section>




















      




<FaqSection faqs={faqs} subheading={`Quick answers to the most asked questions about the ${faqName} course.`} />


















      </main>

  );
}




