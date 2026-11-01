"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";

import styles from "../ProductPageTemplate.module.css";

// Two-plan pricing section shared by the course pages and Opportunities (styles live in ProductPageTemplate.module.css).
// On phones the plans sit in a swipeable carousel. Its scroll position (--p, 0 = first plan, 1 = second plan)
// drives the switcher highlight, the dots and the card depth, so everything follows the finger. The carousel
// runs right-to-left so it opens on the second (trending) plan with no jump on load: scrollLeft is 0 there
// and goes negative towards the first plan.

export type PricingPlan = {
  id: string;
  /** Plain-text name for screen-reader labels. */
  name: string;
  badge: ReactNode;
  /** Whole rupees as shown, e.g. "21099" (rendered as "Rs 21099.00"). */
  price: string;
  description: string;
  /** Short line under the description on phones. */
  note: string;
  features: ReactNode[];
  trending?: boolean;
  onBuy?: () => void;
  buyLabel?: string;
};

// The logo files already include their bordered boxes; widths keep each file's aspect at 30px tall.
const PAYMENT_LOGOS = [
  { src: "/logos/razorpay.png", alt: "Razorpay", width: 98 },
  { src: "/logos/easebuzz.png", alt: "Easebuzz", width: 99 },
  { src: "/logos/nsdc.png", alt: "NSDC", width: 84 },
  { src: "/logos/skill-india.png", alt: "Skill India", width: 84 },
];

export default function PricingPlans({
  plans,
  id,
  heading = "CleverLN plans built for every learner.",
}: {
  plans: [PricingPlan, PricingPlan];
  id?: string;
  heading?: string;
}) {
  const [active, setActive] = useState(1);
  const pricingRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  const onPlansScroll = (el: HTMLDivElement) => {
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;
    const progress = Math.min(1, Math.max(0, 1 + el.scrollLeft / max));
    pricingRef.current?.style.setProperty("--p", progress.toFixed(3));
    setActive(progress > 0.5 ? 1 : 0);
  };

  const showPlan = (index: number) => {
    const el = plansRef.current;
    if (!el) return;
    el.scrollTo({ left: index === 1 ? 0 : el.clientWidth - el.scrollWidth, behavior: "smooth" });
  };

  return (
    <section className={styles.propricingSection} id={id}>

      <div className={styles.propricingContainer} ref={pricingRef}>

        {/* ================= HEADER ================= */}

        <div className={styles.propricingHeader}>

          <h2>{heading}</h2>

          <p>
            Built for competition. Designed for every student’s success.
          </p>

        </div>


        {/* ================= PLAN SWITCHER (mobile) ================= */}

        <div className={styles.propricingSwitch}>
          {plans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              aria-pressed={active === index}
              className={active === index ? styles.propricingSwitchActive : undefined}
              onClick={() => showPlan(index)}
            >
              <span>{plan.badge}</span>
              {plan.trending && <span className={styles.propricingSwitchTag}>Trending</span>}
            </button>
          ))}
        </div>


        {/* ================= PRICING CARDS ================= */}

        <div
          className={styles.propricingCards}
          ref={plansRef}
          onScroll={(e) => onPlansScroll(e.currentTarget)}
        >

          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.propricingCard} ${plan.trending ? styles.propricingCardTrending : ""}`}
            >

              {plan.trending && (
                <span className={styles.propricingTrendingBadge}>
                  Trending Plan
                </span>
              )}

              <div className={styles.propricingCardContent}>

                {/* LEFT SIDE */}

                <div className={styles.propricingMain}>

                  <span className={styles.propricingPlanBadge}>
                    {plan.badge}
                  </span>

                  <div className={styles.propricingPrice}>
                    <span className={styles.propricingCurrency}>Rs</span>
                    <span>{plan.price}</span>
                    <span className={styles.propricingDecimal}>.00</span>
                  </div>

                  <p className={styles.propricingDescription}>
                    {plan.description}
                  </p>

                  <span className={styles.propricingNote}>
                    {plan.note}
                  </span>

                  <button
                    type="button"
                    className={styles.propricingBuyButton}
                    onClick={plan.onBuy}
                  >
                    {plan.buyLabel ?? "BUY NOW"}
                  </button>

                  <span className={styles.propricingSecure}>
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v7h-9z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                    100% secure payment
                  </span>

                </div>


                {/* FEATURES */}

                <ul className={styles.propricingFeatures}>
                  {plan.features.map((feature, i) => (
                    <li key={i} className={styles.propricingFeature}>
                      <Image src="/icons/check.png" alt="" width={16} height={16} className={styles.propricingCheck} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

              </div>

            </div>
          ))}

        </div>

        <div className={styles.propricingDots}>
          {plans.map((plan, index) => (
            <button
              key={plan.id}
              type="button"
              aria-label={`Show ${plan.name} plan`}
              className={active === index ? styles.propricingDotActive : undefined}
              onClick={() => showPlan(index)}
            />
          ))}
        </div>


        {/* ================= TRUST TEXT ================= */}

        <div className={styles.propricingTrust}>

          <p>
            Trusted by 519+ universities, we follow PPP pricing
            to make learning accessible—along with 100% secure
            payments with
          </p>

        </div>


        {/* ================= PAYMENT & PARTNER LOGOS ================= */}

        <div className={styles.propricingPaymentLogos}>
          {PAYMENT_LOGOS.map((logo) => (
            <Image key={logo.src} src={logo.src} alt={logo.alt} width={logo.width} height={30} />
          ))}
        </div>

      </div>

    </section>
  );
}
