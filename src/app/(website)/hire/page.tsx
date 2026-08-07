"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from "./hirePage.module.css";

export default function HirePage() {
const [step, setStep] = useState(1);
const [active, setActive] = useState("freshers");
  


type FAQItem = {
  question: string;
  answer: string;
};

const goalsRef = useRef<HTMLDivElement | null>(null);
const [submitted, setSubmitted] = useState(false);



/*================ FEATURES SECTION ==============*/
    const features = [
  {
    title: "One Platform for Every ",
    highlight: "Location.",
    desc: "Empowering every journey toward success.",
    image: "/features/location.png",
    reverse: false,
  },
  {
    title: "Verified Talent, ",
    highlight: "Trusted",
    desc: " Results. Find verified CV’s backed by CleverLN AI insights.",
    image: "/features/verified.png",
    reverse: true,
  },
  {
    title: "Always here to ",
    highlight: "Support",
    desc: " you. Get dedicated support whenever you need it.",
    image: "/features/support.png",
    reverse: false,
  },
  {
    title: "Advanced ",
    highlight: "Dashboard",
    desc: " for Recruiter's. Take full control of your hiring with a powerful, all-in-one dashboard.",
    image: "/features/dashboard.png",
    reverse: true,
  },
  {
    title: "",
    highlight: "Top-tier",
    desc: " colleges, interns & graduates. Access top-tier talent from leading colleges, interns, and fresh graduates.",
    image: "/features/college.png",
    reverse: false,
  },
];
  
  /* ================= TESTIMONIAL DATA ================= */


const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth <= 600);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);

  
  const testimonials = [
    {
      name: "Yashna H",
      role: "Full Stack Developer",
      img: "/users/user1.png",
      text: "Improved my resume with expert guidance. Got interview calls within days. Cracked my first job with CleverLN Pro. ",
      tags: ["Congratulations !", "Thanks for sharing with us."]
    },
    {
      name: "Ananya Singh",
      role: "UI/UX Designer",
      img: "/users/user2.png",
      text: "Completed my course but needed direction. CleverLN Pro helped refine my profile. Secured a high-paying MNC job.",
      tags: ["Feeling Proud!", "Your journey doesn’t end here"]
    },
    {
      name: "Nikhil Sharma",
      role: "Performance Marketer",
      img: "/users/user3.png",
      text: "Needed real job support after learning. CleverLN Pro made my profile job-ready. Cracked a premium job offer..",
      tags: ["Congratulations !", "Real talent gets paid more."]
    },
    {
      name: "Rahul Khana",
      role: "Backend Developer",
      img: "/users/user4.png",
      text: "Started with zero freelancing experience. Got real project guidance step by step. Turned skills into steady income.",
      tags: ["Congratulations !", "Don’t chase jobs. Create them."]
    },
    {
      name: "Extra User",
      role: "Developer",
      img: "/users/user1.png",
      text: "Wanted to earn while learning skills. Started freelancing with guidance. Now making consistent income.",
      tags: ["Nice!", "Keep going"]
    },
    {
      name: "Yashna H",
      role: "Full Stack Developer",
      img: "/users/user1.png",
      text: "Applied daily but got zero responses. CleverLN Pro changed everything fast. Landed multiple interviews in one week.",
      tags: ["Congratulations !", "Thanks for sharing with us."]
    },
    {
      name: "Ananya Singh",
      role: "UI/UX Designer",
      img: "/users/user2.png",
      text: "I used to apply every day… but got no calls. After joining CleverLN Pro, everything changed.",
      tags: ["Feeling Proud!", "Your journey doesn’t end here"]
    },
    {
      name: "Nikhil Sharma",
      role: "Performance Marketer",
      img: "/users/user3.png",
      text: "Completed my Digital Marketing course and landed a high-paying MNC job.",
      tags: ["Congratulations !", "Real talent gets paid more."]
    },
    {
      name: "Rahul Khana",
      role: "Backend Developer",
      img: "/users/user4.png",
      text: "Started freelancing and now earning more than full-time roles.",
      tags: ["Congratulations !", "Don’t chase jobs. Create them."]
    },
    {
      name: "Extra User",
      role: "Developer",
      img: "/users/user1.png",
      text: "This extra card ensures smooth sliding behavior.",
      tags: ["Nice!", "Keep going"]
    }
  ];

  /* ================= SLIDER LOGIC ================= */

  const [current, setCurrent] = useState(0);
const totalCards = testimonials.length;

const visibleCards = isMobile ? 1 : 4;

const maxIndex = Math.max(0, totalCards - visibleCards);


const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
 


/* ================= FAQ OPEN/CLOSE ================= */

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  /* ================= FAQ DATA ================= */

  const faqs = [
    {
      question: "What is CleverLN Pro?",
      answer:
        "CleverLN Pro is an AI-driven hiring and learning platform that helps students build strong profiles and helps companies hire verified talent faster.",
    },

    {
      question: "How does the hiring process work?",
      answer:
        "Students complete assessments and build profiles. Companies can then access reports, insights, and verified candidate information before hiring.",
    },

    {
      question: "Is CleverLN Pro suitable for freshers?",
      answer:
        "Yes. CleverLN Pro is specially designed for students, freshers, and early professionals looking for career opportunities and guidance.",
    },

    {
      question: "Do companies trust CleverLN reports?",
      answer:
        "Yes. Many companies use CleverLN reports and AI-driven insights to evaluate candidates efficiently and make better hiring decisions.",
    },

    {
      question: "How quickly will I receive a response?",
      answer:
        "Our team usually responds within 12 hours after form submission depending on request volume.",
    },
  ];


useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, 3000);

  return () => clearInterval(interval);
}, [maxIndex]);



  return (
    <main className={styles.clvHirePage}>
      
      {/* ================= HERO ================= */}
      <section className={styles.clvHireHero}>
        <div className={styles.clvHireHeroContainer}>

          <p className={styles.clvHireHeroTop}>
            Got a vacancy? Hire smarter.
          </p>

          <h1 className={styles.clvHireHeroTitle}>
            Hire the <span>Perfect Fit</span>
          </h1>

          <p className={styles.clvHireHeroSub}>
            Post jobs. Hire and Build Team — CleverLN.
          </p>

          {/* COMBINED INPUT + BUTTON */}
          <div className={styles.clvHireHeroInputWrap}>
            <select className={styles.clvHireHeroSelect}>
              <option>Select your place</option>
              <option>Bangalore</option>
              <option>Coimbatore</option>
            </select>

            <button className={styles.clvHireHeroBtn}>
              Post Jobs
            </button>
          </div>

        </div>
      </section>




        {/* ================= FEATURES ================= */}
  <section className={styles.featuresSection}>
  <div className={styles.featuresContainer}>
    <img
      src="/images/features-section.png"
      alt="CleverLN Features"
      className={styles.featuresImage}
    />
  </div>
</section>




        {/* ================= HIRING TABS ================= */}
 <section className={styles.clvHireSection}>
      <div className={styles.clvHireContainer}>

        <h2>Your all in one Hiring solution.</h2>
        <p>
          One platform for HRs to hire candidates across <br />
          all industries—with CleverLN Pro.
        </p>

        <div className={styles.clvTabs}>
          <button
            className={`${styles.tab} ${
              active === "freshers" ? styles.active : ""
            }`}
            onClick={() => setActive("freshers")}
          >
            Freshers
          </button>

          <button
            className={`${styles.tab} ${
              active === "experienced" ? styles.active : ""
            }`}
            onClick={() => setActive("experienced")}
          >
            Experienced
          </button>

          <button
            className={`${styles.tab} ${
              active === "interns" ? styles.active : ""
            }`}
            onClick={() => setActive("interns")}
          >
            Interns
          </button>
        </div>

      </div>
    </section>




        {/* ================= AI SECTION IMAGE ================= */}
<section className={styles.hireSection}>

  <div className={styles.hireContainer}>

    <img
      src="/images/hire-banner.png"
      alt="Hire smarter with AI"
      className={styles.hireImage}
    />

    <button
      className={styles.hireBtn}
      onClick={() => {
        window.location.href = "/post-job";
      }}
    >
      Hire Now
    </button>

  </div>

</section>





        {/*============CATEGORY============*/}
    
<section className={styles.clvHireWrap}>
  <div className={styles.clvHireGrid}>

    {/* TOP SECTION */}
    <div className={styles.clvHireTop}>

      {/* LEFT TEXT */}
      <div className={styles.clvHireText}>
        <h2>
          With CleverLN Pro, explore top talent
          and hire the best with confidence.
        </h2>

        <p>
          Evaluate candidates with data-driven insights and detailed reports.
          Hire the best talent and build stronger teams—faster.
        </p>
      </div>

      {/* RIGHT TOP CARDS */}
      <div className={styles.clvTopCards}>

        <div className={styles.card}>
          <img src="/icons/marketing.png" alt="" />

          <h3>Marketing</h3>

          <span>857+ Profiles Already In</span>
        </div>

        <div className={styles.card}>
          <img src="/icons/finance.png" alt="" />

          <h3>Finance</h3>

          <span>447+ Profiles Already In</span>
        </div>

      </div>
    </div>

    {/* BOTTOM 4 CARDS */}
    <div className={styles.clvBottomCards}>

      <div className={styles.card}>
        <img src="/icons/sales.png" alt="" />
        <h3>Sales</h3>
        <span>2857+ Profiles Already In</span>
      </div>

      <div className={styles.card}>
        <img src="/icons/engineering.png" alt="" />
        <h3>Engineering</h3>
        <span>1157+ Profiles Already In</span>
      </div>

      <div className={styles.card}>
        <img src="/icons/business.png" alt="" />
        <h3>Business</h3>
        <span>597+ Profiles Already In</span>
      </div>

      <div className={styles.card}>
        <img src="/icons/hr.png" alt="" />
        <h3>HR</h3>
        <span>1839+ Profiles Already In</span>
      </div>

    </div>
  </div>
</section>








      <section className={styles.clvTrustSection}>
  <div className={styles.clvTrustContainer}>

    {/* LEFT IMAGE */}
    <div className={styles.clvTrustImage}>
      <Image
        src="/images/report-card.png"
        alt="Hiring Report"
        width={420}
        height={380}
        priority
      />
    </div>

    {/* RIGHT CONTENT */}
    <div className={styles.clvTrustContent}>
      <h2>
        100+ companies trust CleverLN for,
        authentic AI-driven insights on every,
        student report.
      </h2>

      <p>
        So many people trust us—now imagine the impact, vision, and CleverLN 
        stands for trust, growth, and proven success.
      </p>
    </div>

  </div>
</section>














        {/* ================= TRUST SECTION ================= */}
        
    <section className={styles.leadWrap}>
      <div className={styles.leadCard}>

        {/* LEFT CONTENT */}
        <div className={styles.leftContent}>
          <h2>
            Want to know more?
            <br />
            Submit the form to get complete details.
          </h2>

          <p>
            Whether you have questions, need clarity, or are looking for the
            right direction, connect with our experts for the right guidance.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.rightContent}>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <div className={styles.inputRow}>
                <input
                  type="tel"
                  placeholder="Enter Your Name "
                />

                <button onClick={() => setStep(2)}>
                  Next
                </button>
              </div>

              <div className={styles.bottomArea}>
                <div className={styles.dots}>
                  <span className={styles.active}></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <p>Get Response within 12 Hours</p>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  placeholder="Enter Your Email ID"
                />

                <button onClick={() => setStep(3)}>
                  Next
                </button>
              </div>

              <div className={styles.bottomArea}>
                <div className={styles.dots}>
                  <span></span>
                  <span className={styles.active}></span>
                  <span></span>
                  <span></span>
                </div>

                <p>Get Response within 12 Hours</p>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className={styles.inputRow}>
                <input
                  type="email"
                  placeholder="Enter Phone Number "
                />

                <button onClick={() => setStep(4)}>
                  Next
                </button>
              </div>

              <div className={styles.bottomArea}>
                <div className={styles.dots}>
                  <span></span>
                  <span></span>
                  <span className={styles.active}></span>
                  <span></span>
                </div>

                <p>Get Response within 12 Hours</p>
              </div>
            </>
          )}

          {/* STEP 4 */}
{step === 4 && (
  <>
    <div className={styles.inputRow}>
      <input
        type="text"
        placeholder="Enter College Name"
      />

      <button onClick={() => setStep(5)}>
        Submit
      </button>
    </div>

    <div className={styles.bottomArea}>
      <div className={styles.dots}>
        <span></span>
        <span></span>
        <span></span>
        <span className={styles.active}></span>
      </div>

      <p>Get Response within 12 Hours</p>
    </div>
  </>
)}

{/* SUCCESS SCREEN */}
{step === 5 && (
  <div className={styles.successBox}>
    <p>Get Response within 12 Hours</p>
  </div>
)}

        </div>
      </div>
    </section>
  
  



       {/* ================= TESTIMONIAL SLIDER ================= */}
      <section className={styles.testimonialSection}>
        <h2 className={styles.testimonialHeading}>
          Be inspired. Build your own success.
        </h2>

        <p className={styles.testimonialSub}>
          Where doors meet learners — and inspiration begins.
        </p>

        <div className={styles.testimonialGrid}>
          <div
          
            className={styles.testimonialTrack}
           style={{
  transform: `translateX(-${current * (241 + 18)}px)`,
}}
          >
            {testimonials.map((item, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.testimonialTop}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.chatWrapper}>
                  <div className={styles.chatLeft}>{item.text}</div>

                  {item.tags.map((tag, index) => (
                    <div key={index} className={styles.chatRight}>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className={styles.testimonialDots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <span
              key={i}
              className={current === i ? styles.active : ""}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </section>

      
  



          {/* ================= FAQ SECTION ================= */}

<section className={styles.clvFaqSection}>

  <h2 className={styles.clvFaqTitle}>
    Let’s Clear Things Up
  </h2>

  <p className={styles.clvFaqSubtitle}>
    Quick answers to help you move forward with confidence.
  </p>

  <div className={styles.clvFaqWrapper}>

    {faqs.map((item, index) => {

      const isOpen = activeFAQ === index;

      return (
        <div
          key={index}
          className={`${styles.clvFaqItem} ${
            isOpen ? styles.activeFaq : ""
          }`}
        >

          <div
            className={styles.clvFaqHeader}
            onClick={() =>
              setActiveFAQ(isOpen ? null : index)
            }
          >
            <p>{item.question}</p>

            <div className={styles.clvFaqIcon}>
              {isOpen ? "▲" : "▼"}
            </div>
          </div>

          {isOpen && (
            <div className={styles.clvFaqBody}>
              <p>{item.answer}</p>
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
