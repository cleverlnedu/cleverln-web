"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./product.module.css";
import Image from "next/image";

export default function ProductPage() {


  /* =====================================================
  STATES
  ===================================================== */
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [submitted, setSubmitted] =
    useState(false);

  /* =====================================================
  NEXT BUTTON LOGIC
  ===================================================== */

  const handleNext = () => {

  if (step === 1) {

    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setStep(2);
    return;
  }

  if (step === 2) {

    if (!phone.trim()) {
      alert("Please enter your phone number");
      return;
    }

    setStep(3);
    return;
  }

  if (step === 3) {

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    setSubmitted(true);

    console.log({
      name,
      phone,
      email,
    });

    setTimeout(() => {

      setStep(1);

      setName("");
      setPhone("");
      setEmail("");

      setSubmitted(false);

    }, 2500);
  }
};




  


const [activeFAQ, setActiveFAQ] =
  useState<number | null>(null);

const faqs = [
  {
    question:
      "Is technical support available if I encounter issues with the online platform?",
    answer:
      "Yes, our dedicated technical support team is available 24/7 to assist you with any platform-related issues.",
  },

  {
    question:
      "Will I get access to recorded sessions and study materials?",
    answer:
      "Yes, all enrolled students receive lifetime access to recordings and materials.",
  },

  {
    question:
      "Do I receive a certificate after completing the course?",
    answer:
      "Yes, you will receive an industry-recognized CleverLN certificate.",
  },

  {
    question:
      "Can beginners join this program?",
    answer:
      "Absolutely. The course is beginner-friendly.",
  },
];


const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {

  if (e.key === "Enter") {

    handleNext();
  }
};




  return (
    <main className={styles.page}>
      
      {/* ================= HERO SECTION ================= */}
      <section className={styles.hero}>
  <div className={styles.heroContainer}>

    {/* LEFT CONTENT */}
    <div className={styles.heroLeft}>

      <h1 className={styles.productheroHeading}>
        Learn UI/UX and build your skills in a unique, modern way.
      </h1>

      <p className={styles.heroSubtext}>
        Learn UI/UX design through a practical, hands-on approach focused on
        applications and helps you understand user behavior, design intuitive
        interfaces, and work with industry tools like Figma.
      </p>

      <div className={styles.heroButtons}>
        <button className={styles.heroPrimaryBtn}>
          Enroll Now
        </button>

        <button className={styles.heroSecondaryBtn}>
          Know More
        </button>
      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className={styles.heroRight}>

      <div className={styles.heroImageWrapper}>

        {/* BACKGROUND SHAPE */}
        <Image
          src="/hero-person.png"
          alt="shape"
          fill
          priority
          className={styles.heroBgShape}
        />

        {/* PERSON */}
        <Image
          src="/hero.person.png"
          alt="hero"
          fill
          priority
          className={styles.heroPerson}
        />

      </div>

    </div>

  </div>
</section>








      {/* ================= TRUSTED LOGOS ================= */}
<section className={styles.trusted}>
  <div className={styles.trustedContainer}>
    
    <p className={styles.trustedText}>
      Trusted by world’s leading brands
    </p>

    <div className={styles.logos}>
      <img src="/logos/rise.svg" alt="Rise" />
      <img src="/logos/vertigo.svg" alt="Vertigo" />
      <img src="/logos/minty.svg" alt="Minty" />
      <img src="/logos/glossy.svg" alt="Glossy" />
      <img src="/logos/rise.svg" alt="Rise" />
      <img src="/logos/waveless.svg" alt="Waveless" />
    </div>

  </div>
</section>





      {/* ================= IMPACT SECTION ================= */}
<section className={styles.impactSection}>
  <div className={styles.impactContainer}>

    {/* TOP LABEL */}

    <p className={styles.impactTag}>
      WHAT THIS PROGRAM IS ABOUT
    </p>

    {/* MAIN HEADING */}

    <h2 className={styles.impactHeading}>
      Turn ideas into real impact with CleverLN.
    </h2>

    {/* SUBTEXT */}

    <p className={styles.impactSubHeading}>
      Build. Apply. Impact
    </p>

    {/* DESCRIPTION */}

    <p className={styles.impactDescription}>
      Bring your ideas to life with designs that are creative,
      intuitive, and user-focused.
      <br />
      Where creativity meets usability.
    </p>

    {/* SMALL TEXT */}

    <p className={styles.impactSmallText}>
      Learn by building—weekly AI use cases inspired by real companies.
    </p>

    {/* COMPANY LOGOS */}

    <div className={styles.impactLogos}>

  <div className={`${styles.logoItem} ${styles.logoMiles}`}>
    <img src="/logos/miles.png" alt="Miles" />
  </div>

  <div className={`${styles.logoItem} ${styles.logoReddit}`}>
    <img src="/logos/reddit.png" alt="Reddit" />
  </div>

  <div className={`${styles.logoItem} ${styles.logoSwiggy}`}>
    <img src="/logos/swiggy.png" alt="Swiggy" />
  </div>

</div>

    {/* FOOTER TEXT */}

    <p className={styles.impactFooter}>
      Learn from those who’ve built real AI systems and driven measurable growth.
    </p>

  </div>
</section>






      {/* ================= STATS ================= */}
<section className={styles.statsSection}>
  <div className={styles.statsContainer}>

    {/* LEFT CARD */}

    <div className={styles.statsCard}>

  <div className={styles.statsCardInner}>

    <h3>07+</h3>

    <p>YEARS OF EXPERIENCE</p>

  </div>

</div>

    {/* CENTER CARD */}

    <div className={styles.statsCenterCard}>

      <div className={styles.statsCenterLeft}>
        <h2>20000+</h2>
      </div>

      <div className={styles.statsDivider}></div>

      <div className={styles.statsCenterRight}>

        <p>
          Jobs are Listed this year.
        </p>

        <p>
          Don’t wait <span>Start with CleverLN</span> and are you ready?
        </p>

      </div>

    </div>

    {/* RIGHT CARD */}

    <div className={styles.statsCard}>

      <h3>2K+</h3>

      <p>
        Registered in this Years
      </p>

    </div>

  </div>
</section>







      {/* ================= PRICING ================= */}
<section className={styles.pricingSection}>

  {/* HEADING */}

  <div className={styles.pricingHeader}>

    <h2>
      CleverLN plans built for every learner.
    </h2>

    <p>
      Built for competition. Designed for every student’s success.
    </p>

  </div>

  {/* CARDS */}

  <div className={styles.pricingCards}>

    {/* ================= CARD 1 ================= */}

    <div className={styles.pricingCard}>

      <div className={styles.pricingLeft}>

        <span className={styles.planBadge}>
          Standard
        </span>

        <h3 className={styles.price}>
          Rs 399<span>.00</span>
        </h3>

        <p className={styles.priceDesc}>
          Perfect for beginners who prefer
          flexible, self-paced learning.
        </p>

        <button
          className={styles.buyBtn}
          onClick={() =>
            router.push("/dashboard?verify=true&plan=standard")
          }
        >
          BUY NOW
        </button>

      </div>

      <div className={styles.pricingRight}>

        <ul className={styles.featuresList}>

          <li>
            <img src="/icons/check.png" alt="" />
            Life time LMS access
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            Earn your <span>CleverLN</span> certificate.
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            Get job portal access. Apply now.
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            2+ Real-time projects
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            Integrate AI into your daily work.
          </li>

        </ul>

      </div>

    </div>

    {/* ================= CARD 2 ================= */}

    <div className={styles.pricingCard}>

      <div className={styles.trendingBadge}>
        Trending Plan
      </div>

      <div className={styles.pricingLeft}>

        <span className={styles.planBadge}>
          Advantage +
        </span>

        <h3 className={styles.price}>
          Rs 1499<span>.00</span>
        </h3>

        <p className={styles.priceDesc}>
          Perfect for students aiming to
          grow under expert guidance.
        </p>

        <button
          className={styles.buyBtn}
          onClick={() =>
            router.push("/dashboard?verify=true&plan=advantage")
          }
        >
          BUY NOW
        </button>

      </div>

      <div className={styles.pricingRight}>

        <ul className={styles.featuresList}>

          <li>
            <img src="/icons/check.png" alt="" />
            LMS + Interactive live sessions
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            Earn your<span>CleverLN Pro</span>certificate.
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            Get job access + LOR. Apply now.
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            4+ Real-time projects
          </li>

          <li>
            <img src="/icons/check.png" alt="" />
            100% doubt clearance & job assistance
          </li>

        </ul>

      </div>

    </div>

  </div>

  {/* PAYMENTS */}

  <div className={styles.paymentSection}>

    <p>
      Trusted by 519+ universities, we follow PPP pricing
      to make learning accessible—along with 100% secure payments with
    </p>

    <div className={styles.paymentLogos}>

      <img src="/logos/razorpay.png" alt="" />

      <img src="/logos/easebuzz.png" alt="" />

      <img src="/logos/nsdc.png" alt="" />

      <img src="/logos/skill-india.png" alt="" />

    </div>

  </div>

</section>








{/* ================= CONTACT ================= */}

<section className={styles.clvContactSection}>

        <div className={styles.clvContactContainer}>

          {/* LEFT */}

          <div className={styles.clvContactLeft}>

            <h2 className={styles.clvContactTitle}>
              Want to know more?
            </h2>

            <h1 className={styles.clvContactHeading}>
              Submit the form to get complete details.
            </h1>

            <p className={styles.clvContactDescription}>
              Whether you have questions, need clarity,
              or are looking for the right direction,
              connect with our experts for the right guidance.
            </p>

          </div>

          {/* RIGHT */}

          <div className={styles.clvContactRight}>

            {!submitted ? (

              <>

                {/* INPUT ROW */}

                <div className={styles.clvInputWrapper}>

                  {/* STEP 1 */}

                  {step === 1 && (

                    <input
                      type="text"

                      placeholder="Enter Your Name"

                      value={name}

                      onChange={(e) =>
                        setName(e.target.value)
                      }

                      onKeyDown={handleKeyDown}

                      className={styles.clvContactInput}
                    />

                  )}

                  {/* STEP 2 */}

                  {step === 2 && (

                    <input
                      type="tel"

                      placeholder="Enter Your Phone Number"

                      value={phone}

                      onChange={(e) =>
                        setPhone(e.target.value)
                      }

                      onKeyDown={handleKeyDown}

                      className={styles.clvContactInput}
                    />

                  )}

                  {/* STEP 3 */}

                  {step === 3 && (

                    <input
                      type="email"

                      placeholder="Enter Your Email"

                      value={email}

                      onChange={(e) =>
                        setEmail(e.target.value)
                      }

                      onKeyDown={handleKeyDown}

                      className={styles.clvContactInput}
                    />

                  )}

                  {/* BUTTON */}

                  <button
                    onClick={handleNext}
                    className={styles.clvContactButton}
                  >
                    {step === 3
                      ? "Submit"
                      : "Next"}
                  </button>

                </div>

                {/* PROGRESS */}

                <div className={styles.clvProgressWrapper}>

                  <span
                    className={`${styles.clvProgressBar} ${
                      step >= 1
                        ? styles.clvProgressActive
                        : ""
                    }`}
                  />

                  <span
                    className={`${styles.clvProgressBar} ${
                      step >= 2
                        ? styles.clvProgressActive
                        : ""
                    }`}
                  />

                  <span
                    className={`${styles.clvProgressBar} ${
                      step >= 3
                        ? styles.clvProgressActive
                        : ""
                    }`}
                  />

                </div>

                <p className={styles.clvResponseText}>
                  Get Response within 12 Hours
                </p>

              </>

            ) : (

              <div className={styles.clvSuccessWrapper}>

                <p className={styles.clvSuccessMessage}>
                  ✅ Thank you! We’ll contact you soon.
                </p>

              </div>

            )}

          </div>

        </div>

      </section>








      {/* ================= TOOLS SECTION ================= */}

<section className={styles.clvToolsSection}>

  <div className={styles.clvToolsContainer}>

    {/* ================= HEADING ================= */}

    <div className={styles.clvToolsHeader}>

      <h2>
        Work with Industry Tools
      </h2>

      <p>
        Core Skills You’ll Build with CleverLN
      </p>

    </div>

    {/* ================= LOGOS ================= */}

    <div className={styles.clvToolsLogos}>

      <img src="/tools/canva.png" alt="Canva" />

      <img src="/tools/figma.png" alt="Figma" />

      <img src="/tools/claude.png" alt="Claude" />

      <img src="/tools/adobe.png" alt="Adobe XD" />

      <img src="/tools/framer.png" alt="Framer" />

    </div>

    {/* ================= BROCHURE CARD ================= */}

    <div className={styles.clvBrochureCard}>

      {/* LEFT */}

      <div className={styles.clvBrochureLeft}>

        <h3>
          Access Course Brochure
        </h3>

        <p>
          Want to know more about the course? Click the download button to check it out.
        </p>

      </div>

      {/* RIGHT */}

      <button className={styles.clvBrochureBtn}>
        Download Brochure
      </button>

    </div>

  </div>

</section>






{/* ================= CTA SECTION ================= */}
<section className={styles.ctaSection}>
  <div className={styles.ctaContainer}>

    {/* LEFT IMAGE */}
    <div className={styles.ctaLeft}>
      <img src="/cta/person.png" alt="person" className={styles.person} />
      <img src="/cta/bubble.png" alt="bubble" className={styles.bubble} />
    </div>

    {/* RIGHT CONTENT */}
    <div className={styles.ctaRight}>
      <h2>
        Start your journey—unlock opportunities and grow into a future leader.
      </h2>

      <p>
        More than just courses—CleverLN connects you to real opportunities.
        Enroll now for <strong>free job portal</strong> access and start applying with confidence.
      </p>

      <div className={styles.ctaButtons}>

  <button
    className={styles.primaryBtn}
    onClick={() => router.push("/enroll")}
  >
    ENROLL TODAY TO UNLOCK FOR FREE
  </button>

  <button
    className={styles.secondaryBtn}
    onClick={() => router.push("/job-portal")}
  >
    EXPLORE JOB PORTAL
  </button>

</div>
    </div>

  </div>
</section>









{/* ================= FAQ SECTION ================= */}

<section className={styles.productPageFaqSection}>

  {/* HEADING */}

  <div className={styles.productFaqHeading}>

    <h2>
      Let’s Clear Things Up
    </h2>

    <p>
      Quick answers to help you move forward with confidence.
    </p>

  </div>

  {/* FAQ WRAPPER */}

  <div className={styles.productPageFaqWrapper}>

    {faqs.map((item, index) => {

      const isOpen =
  activeFAQ === index;

      return (

        <div
          key={index}
          className={styles.productPageFaqItem}
        >

          {/* FAQ HEADER */}

          <div
            className={styles.productPageFaqHeader}

            onClick={() =>
  setActiveFAQ(
    isOpen ? null : index
  )
}

           
          >

            <p>
              {item.question}
            </p>

            <div
              className={styles.productPageFaqIcon}
            >
              {isOpen ? "▲" : "▼"}
            </div>

          </div>

          {/* FAQ ANSWER */}

          {activeFAQ === index && (

            <div
              className={styles.productPageFaqBody}
            >

              <p>
                {item.answer}
              </p>

            </div>

          )}

        </div>

      );
    })}

  </div>

</section>
      </main>

  );
}




