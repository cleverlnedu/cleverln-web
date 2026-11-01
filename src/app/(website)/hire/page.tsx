import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Headset, LayoutDashboard, ShieldCheck } from "lucide-react";

import styles from "./comingSoon.module.css";

export const metadata: Metadata = {
  title: "Hire Talent: Coming soon",
  description: "CleverLN for hiring is on its way: verified, job-ready talent and a dashboard built for recruiters.",
};

// What the hiring platform will offer (from the full hire page that's still being built, see FullHirePage.tsx).
const COMING = [
  { icon: ShieldCheck, title: "Verified talent", text: "Verified CVs backed by CleverLN AI insights." },
  { icon: LayoutDashboard, title: "Recruiter dashboard", text: "Take full control of your hiring in one place." },
  { icon: GraduationCap, title: "Top-tier colleges", text: "Interns and fresh graduates from leading colleges." },
  { icon: Headset, title: "Dedicated support", text: "Help from our team whenever you need it." },
];

export default function HirePage() {
  return (
    <main className={styles.soonPage}>
      <section className={styles.soonHero}>

        <span className={styles.soonBadge}>
          <span className={styles.soonDot} aria-hidden="true" />
          Coming soon · For HR teams
        </span>

        <h1 className={styles.soonTitle}>
          We’re building something <span>every HR</span> will be proud of.
        </h1>

        <p className={styles.soonDescription}>
          A smarter way to find verified, job-ready talent from CleverLN is on its way.
          We’re putting the finishing touches on it.
        </p>

        <div className={styles.soonActions}>
          <Link href="/help-center" className={styles.soonPrimary}>
            Talk to our team
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
          <Link href="/courses" className={styles.soonSecondary}>
            Explore courses
          </Link>
        </div>

        <div className={styles.soonPreview}>
          <p className={styles.soonPreviewLabel}>What’s coming</p>

          <div className={styles.soonGrid}>
            {COMING.map(({ icon: Icon, title, text }) => (
              <article key={title} className={styles.soonCard}>
                <span className={styles.soonCardIcon}>
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
