"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import ps from "@/components/website/ProductPageTemplate.module.css";
import ContactLeadForm from "@/components/website/ProductSections/ContactLeadForm";
import FaqSection from "@/components/website/ProductSections/FaqSection";
import PricingPlans, { type PricingPlan } from "@/components/website/ProductSections/PricingPlans";

import OpportunitiesHero from "./OpportunitiesHero";
import styles from "./opportunities.module.css";

// Opportunities uses the course page's design system: its type scale, cards and buttons come from
// ProductPageTemplate.module.css (imported as `ps`), and pricing, the contact form and the FAQ are the
// same shared components. Only the sections unique to this page are styled in opportunities.module.css.

const TRUSTED = [
  { src: "/logos/dell.webp", alt: "Dell", width: 114, height: 55 },
  { src: "/logos/host.webp", alt: "Hostinger", width: 916, height: 284 },
  { src: "/logos/linkedin.webp", alt: "LinkedIn", width: 856, height: 256 },
  { src: "/logos/rpay.webp", alt: "Razorpay", width: 776, height: 284 },
  { src: "/logos/slack.webp", alt: "Slack", width: 712, height: 284 },
  { src: "/logos/spotify.webp", alt: "Spotify", width: 608, height: 284 },
];

const GOALS = [
  { img: "/goals/goal1.png", alt: "Track your success every day" },
  { img: "/goals/goal2.png", alt: "Upgrade your resume with expert guidance" },
  { img: "/goals/goal3.png", alt: "Skip the wait, go priority with CleverLN Pro" },
  { img: "/goals/goal4.png", alt: "A dedicated AI model to guide and support everyone" },
];

const PLANS: [PricingPlan, PricingPlan] = [
  {
    id: "free",
    name: "Free Trial",
    badge: "Free Trial",
    price: "000",
    description: "Perfect for beginners who prefer flexible, self-paced learning.",
    note: "Start for free",
    buyLabel: "Apply Now",
    features: [
      "Get 5 real time Job openings",
      <>100% <strong>CleverLN</strong> Job assistance.</>,
      "Get job portal access. Apply now.",
      "Get response in 72 hours.",
      "Better job matches.",
    ],
  },
  {
    id: "advantage",
    name: "Advantage +",
    badge: <>Advantage <strong>+</strong></>,
    price: "199",
    description: "Perfect for students aiming to grow under expert guidance.",
    note: "Just Rs 199 for unlimited job openings",
    trending: true,
    features: [
      "Get Unlimited Job openings",
      <>100% <strong>CleverLN Pro</strong> Job assistance.</>,
      "24/7 Priority Support",
      "Apply for all High paying jobs",
      "Weekly Profile Boost Sessions.",
    ],
    onBuy: () => {
      window.location.href = "/dashboard?jobVerify=true&plan=advantage";
    },
  },
];

const TESTIMONIALS = [
  {
    name: "Yashna H",
    role: "Full Stack Developer",
    img: "/users/user1.png",
    text: "Improved my resume with expert guidance. Got interview calls within days. Cracked my first job with CleverLN Pro.",
    tags: ["Congratulations !", "Thanks for sharing with us."],
  },
  {
    name: "Ananya Singh",
    role: "UI/UX Designer",
    img: "/users/user2.png",
    text: "Completed my course but needed direction. CleverLN Pro helped refine my profile. Secured a high-paying MNC job.",
    tags: ["Feeling Proud!", "Your journey doesn’t end here"],
  },
  {
    name: "Nikhil Sharma",
    role: "Performance Marketer",
    img: "/users/user3.png",
    text: "Needed real job support after learning. CleverLN Pro made my profile job-ready. Cracked a premium job offer.",
    tags: ["Congratulations !", "Real talent gets paid more."],
  },
  {
    name: "Rahul Khana",
    role: "Backend Developer",
    img: "/users/user4.png",
    text: "Started with zero freelancing experience. Got real project guidance step by step. Turned skills into steady income.",
    tags: ["Congratulations !", "Don’t chase jobs. Create them."],
  },
  {
    name: "Yashna H",
    role: "Full Stack Developer",
    img: "/users/user1.png",
    text: "Applied daily but got zero responses. CleverLN Pro changed everything fast. Landed multiple interviews in one week.",
    tags: ["Congratulations !", "Thanks for sharing with us."],
  },
  {
    name: "Ananya Singh",
    role: "UI/UX Designer",
    img: "/users/user2.png",
    text: "I used to apply every day… but got no calls. After joining CleverLN Pro, everything changed.",
    tags: ["Feeling Proud!", "Your journey doesn’t end here"],
  },
  {
    name: "Nikhil Sharma",
    role: "Performance Marketer",
    img: "/users/user3.png",
    text: "Completed my Digital Marketing course and landed a high-paying MNC job.",
    tags: ["Congratulations !", "Real talent gets paid more."],
  },
  {
    name: "Rahul Khana",
    role: "Backend Developer",
    img: "/users/user4.png",
    text: "Started freelancing and now earning more than full-time roles.",
    tags: ["Congratulations !", "Don’t chase jobs. Create them."],
  },
];

// Job-seeker questions, answered only with what this page already promises.
const FAQS = [
  {
    question: "What do I get with the Free Trial?",
    answer: "You get 5 real-time job openings, CleverLN job assistance and access to our job portal, with a response within 72 hours.",
  },
  {
    question: "How is Advantage + different from the Free Trial?",
    answer: "For Rs 199 you get unlimited job openings, CleverLN Pro job assistance, 24/7 priority support, access to all high-paying jobs and weekly profile boost sessions.",
  },
  {
    question: "Can I get job portal access for free?",
    answer: "Yes. Enroll in a CleverLN Pro course and you unlock free access to our job portal.",
  },
  {
    question: "Is technical support available if I run into issues on the platform?",
    answer: "Yes, our dedicated technical support team is available 24/7 to assist you with any platform-related issues. You can reach us via chat, email, or our support portal.",
  },
  {
    question: "How soon will someone get back to me?",
    answer: "Share your details in the form below and our team will get back to you within 12 hours.",
  },
];

const BLOGS = ["/blogs/blog.1.png", "/blogs/blog.2.png", "/blogs/blog.1.png", "/blogs/blog.2.png"];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function OpportunitiesPage() {
  const router = useRouter();

  const blogsRef = useRef<HTMLDivElement | null>(null);
  const storiesRef = useRef<HTMLDivElement | null>(null);

  const [storyPage, setStoryPage] = useState(0);
  const [storyPages, setStoryPages] = useState(1);
  const [storiesPaused, setStoriesPaused] = useState(false);

  // Phones: the blog cards drift past in a seamless loop (the list is rendered twice).
  useEffect(() => {
    const container = blogsRef.current;
    if (!container || window.innerWidth > 600 || prefersReducedMotion()) return;

    let animationId: number;
    const scroll = () => {
      container.scrollLeft += 0.5;
      if (container.scrollLeft >= container.scrollWidth / 2) container.scrollLeft = 0;
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Testimonials: a native scroll-snap row. Work out how many stops it has (one per card that can lead the row).
  useEffect(() => {
    const el = storiesRef.current;
    if (!el) return;
    const measure = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const second = el.children[1] as HTMLElement | undefined;
      if (!first || !second) return;
      const step = second.offsetLeft - first.offsetLeft;
      const visible = Math.max(1, Math.round(el.clientWidth / step));
      setStoryPages(Math.max(1, el.children.length - visible + 1));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const showStory = (index: number) => {
    const el = storiesRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !first || !card) return;
    el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: "smooth" });
  };

  const onStoriesScroll = (el: HTMLDivElement) => {
    const first = el.children[0] as HTMLElement | undefined;
    const second = el.children[1] as HTMLElement | undefined;
    if (!first || !second) return;
    setStoryPage(Math.round(el.scrollLeft / (second.offsetLeft - first.offsetLeft)));
  };

  // Auto-advance every 4 seconds unless the visitor is hovering, touching or focused on a card.
  useEffect(() => {
    if (storiesPaused || storyPages <= 1 || prefersReducedMotion()) return;
    const timer = setTimeout(() => showStory(storyPage + 1 >= storyPages ? 0 : storyPage + 1), 4000);
    return () => clearTimeout(timer);
  }, [storiesPaused, storyPage, storyPages]);

  return (
    <main className={styles.opPage}>

      {/* ================= HERO ================= */}
      <OpportunitiesHero />


      {/* ================= TRUSTED BY (course page logo strip) ================= */}
      <section className={ps.protrusted}>
        <div className={ps.protrustedContainer}>
          <p className={ps.protrustedText}>Join us, grow with us, and build your future with</p>
          <div className={ps.protrustedLogos}>
            {TRUSTED.map((logo) => (
              <Image key={logo.src} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} />
            ))}
          </div>
        </div>
      </section>


      {/* ================= GOALS ================= */}
      <section className={styles.opSection}>
        <div className={styles.opContainer}>

          <div className={ps.propricingHeader}>
            <h2>Built Around Your Goals.</h2>
            <p>We understood the problem first—then <span className={styles.opAccent}>Designed</span> the solution.</p>
          </div>

          <div className={styles.opGoalsGrid}>
            {GOALS.map((goal) => (
              <div key={goal.img} className={styles.opGoalCard}>
                <Image src={goal.img} alt={goal.alt} width={1253} height={1221} sizes="(max-width: 900px) 48vw, 270px" />
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ================= JOB PORTAL CTA (course brochure card style) ================= */}
      <section className={ps.protoolsSection}>
        <div className={ps.protoolsContainer}>
          <div className={ps.protoolsBrochureCard}>

            <div className={ps.protoolsBrochureLeft}>
              <h3>Unlock free job portal access now!</h3>
              <p>Enroll in a CleverLN Pro course and unlock free access to our job portal.</p>
            </div>

            <button type="button" className={ps.protoolsBrochureButton} onClick={() => router.push("/courses")}>
              Explore Courses
            </button>

          </div>
        </div>
      </section>


      {/* ================= TESTIMONIALS ================= */}
      <section className={styles.opSection}>
        <div className={styles.opContainer}>

          <div className={ps.propricingHeader}>
            <h2>Be inspired. Build your own success.</h2>
            <p>Where doers meet learners — and inspiration begins.</p>
          </div>

          <div
            ref={storiesRef}
            className={styles.opStories}
            onScroll={(e) => onStoriesScroll(e.currentTarget)}
            onMouseEnter={() => setStoriesPaused(true)}
            onMouseLeave={() => setStoriesPaused(false)}
            onTouchStart={() => setStoriesPaused(true)}
            onFocus={() => setStoriesPaused(true)}
            onBlur={() => setStoriesPaused(false)}
          >
            {TESTIMONIALS.map((story, i) => (
              <article key={i} className={styles.opStory}>
                <div className={styles.opStoryTop}>
                  <Image src={story.img} alt="" width={160} height={140} className={styles.opStoryPhoto} />
                  <div>
                    <h3>{story.name}</h3>
                    <p>{story.role}</p>
                  </div>
                </div>

                <div className={styles.opStoryChat}>
                  <p className={styles.opStoryText}>{story.text}</p>
                  {story.tags.map((tag) => <span key={tag} className={styles.opStoryTag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>

          {storyPages > 1 && <div className={styles.opDots}>
            {Array.from({ length: storyPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to story ${i + 1}`}
                className={storyPage === i ? styles.opDotActive : undefined}
                onClick={() => showStory(i)}
              />
            ))}
          </div>}

        </div>
      </section>


      {/* ================= PRICING (shared with the course pages) ================= */}
      <PricingPlans id="plans" heading="CleverLN plans built for every Job Seeker." plans={PLANS} />


      {/* ================= FAQ (shared): answers questions before the contact form ================= */}
      <FaqSection faqs={FAQS} />


      {/* ================= CONTACT (shared): for anything the FAQ did not answer ================= */}
      <ContactLeadForm />


      {/* ================= BLOGS ================= */}
      <section className={styles.opSection}>
        <div className={styles.opContainer}>

          <div className={ps.protoolsHeader}>
            <h2>Real Stories. Real Blogs.</h2>
            <p>We understood the problem first—then <span className={styles.opAccent}>Designed</span> the solution.</p>
          </div>

          {/* rendered twice so the phone marquee can loop; desktop shows the first four */}
          <div ref={blogsRef} className={styles.opBlogGrid}>
            {[...BLOGS, ...BLOGS].map((img, i) => (
              <Link key={i} href="/blogs" className={styles.opBlogCard} aria-hidden={i >= BLOGS.length} tabIndex={i >= BLOGS.length ? -1 : undefined}>
                <Image src={img} alt="Optimizing Workflow Processes for Maximum Efficiency" width={884} height={1048} sizes="(max-width: 600px) 70vw, 270px" />
              </Link>
            ))}
          </div>

          <Link href="/blogs" className={styles.opViewAll}>
            View all blogs
            <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
          </Link>

        </div>
      </section>

    </main>
  );
}
