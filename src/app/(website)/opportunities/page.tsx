"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./opportunities.module.css";
import Image from "next/image";
import Link from "next/link";

export default function OpHeroSection() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [goalIndex, setGoalIndex] = useState(0);
const [blogIndex, setBlogIndex] = useState(0);

  const handleNext = () => {
    if (step === 1 && name.trim()) setStep(2);
    else if (step === 2 && phone.trim()) setStep(3);
    else if (step === 3 && email.trim()) {
      setStep(4);
      console.log({ name, phone, email });
    }
  };



const goalsRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const container = goalsRef.current;
  if (!container) return;

  if (window.innerWidth > 600) return;

  let index = 0;

  const interval = setInterval(() => {
    const cards = container.children;
    if (!cards.length) return;

    index++;

    if (index >= cards.length) {
      index = 0;
    }

    const card = cards[index] as HTMLElement;

    container.scrollTo({
      left: card.offsetLeft - 20, // 🔥 aligns perfectly center
      behavior: "smooth",
    });
  }, 2500);

  return () => clearInterval(interval);
}, []);



useEffect(() => {
  const goalInterval = setInterval(() => {
    setGoalIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  }, 3000);

  const blogInterval = setInterval(() => {
    setBlogIndex((prev) => (prev >= 3 ? 0 : prev + 1));
  }, 3000);

  return () => {
    clearInterval(goalInterval);
    clearInterval(blogInterval);
  };
}, []);

  
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

  useEffect(() => {
  if (isHovered) return;       // 🔥 stop when hovered
  if (maxIndex === 0) return;

  const interval = setInterval(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, 4000);

  return () => clearInterval(interval);
}, [isHovered, maxIndex]);


    const [activeFAQ, setActiveFAQ] = useState<number | null>(1);

const faqs = [
  {
    q: "Is technical support available if I encounter issues with the online platform?",
    a: "Yes, our dedicated technical support team is available 24/7 to assist you with any platform-related issues. You can reach us via chat, email, or our support portal."
  },
  {
    q: "Is technical support available if I encounter issues with the online platform?",
    a: "Yes, we provide full-time support for all users."
  },
  {
    q: "Is technical support available if I encounter issues with the online platform?",
    a: "Support is available through multiple channels."
  },
  {
    q: "Is technical support available if I encounter issues with the online platform?",
    a: "We ensure quick resolution within hours."
  }
];



const blogCards = [
  "/blogs/blog.1.png",
  "/blogs/blog.2.png",
  "/blogs/blog.1.png",
  "/blogs/blog.2.png"
];

const blogsRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const container = blogsRef.current;
  if (!container) return;

  if (window.innerWidth > 600) return; // mobile only

  let animationId: number;
  const speed = 0.5; // 🔥 control speed

  const scroll = () => {
    container.scrollLeft += speed;

    // 🔥 seamless loop
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }

    animationId = requestAnimationFrame(scroll);
  };

  animationId = requestAnimationFrame(scroll);

  return () => cancelAnimationFrame(animationId);
}, []);





  return (
    <>
      {/* ================= HERO SECTION ================= */}
<section className={styles.opHero}>
  <div className={styles.opHeroContainer}>

    {/* TOP TEXT */}
    <p className={styles.opHeroTop}>
      Got talent? We support.
    </p>

    {/* MAIN HEADING */}
    <h1 className={styles.opHeroHeading}>
      Meet <span>Opportunities</span>
    </h1>

    {/* SUBTEXT */}
    <p className={styles.opHeroSub}>
      Jobs. Freelancing. Guidance — CleverLN.
    </p>

    {/* ACTIONS */}
    <div className={styles.opHeroActions}>

      {/* SELECT */}
      <div className={styles.selectWrapper}>
        <select className={styles.heroSelect}>
          <option>Select your place</option>
          <option>Bangalore</option>
          <option>Chennai</option>
          <option>Coimbatore</option>
        </select>
      </div>

      {/* BUTTON */}
      <button className={styles.heroBtn}>
        Apply Now
      </button>

    </div>

  </div>
</section>







        {/* ================= GOALS ================= */}
      <section className={styles.opGoalsWrapper}>
        <h2 className={styles.opGoalsHeading}>Built Around Your Goals.</h2>

        <p className={styles.opGoalsSub}>
          We understood the problem first—then <span>Designed</span> the solution.
        </p>

        <div ref={goalsRef} className={styles.opGoalsGrid}>
          {[
            {
              img: "/goals/goal1.png",
              
            },
            {
              img: "/goals/goal2.png",
  
            },
            {
              img: "/goals/goal3.png",
              
            },
            {
              img: "/goals/goal4.png",
              
            },
          ].map((card, i) => (
            <div key={i} className={styles.opGoalCard}>
              <div className={styles.opGoalImage}>
                <Image src={card.img} alt="goal" width={200} height={150} />
              </div>
              
            </div>
          ))}
        </div>
      </section>


        
    {/* ================= CTA ================= */}
        <section className={styles.opCtaWrapper}>
  <div className={styles.opCtaContainer}>

    {/* LEFT */}
    <div className={styles.opCtaText}>
      <h2>
        Unlock free job portal access now !
      </h2>
      <p>
        Enroll in a CleverLN Pro course and unlock free access to our job portal.
      </p>
    </div>

    {/* RIGHT */}
    <button className={styles.opCtaBtn}>
      Explore Courses
    </button>

  </div>
</section>


      



      {/* ================= PRICING ================= */}
<section className={styles.pricing}>

  {/* HEADING */}
  <div className={styles.pricingHeader}>
    <h2>CleverLN plans built for every learner.</h2>
    <p>Built for competition. Designed for every student’s success.</p>
  </div>

  <div className={styles.pricingContainer}>

    {/* ================= LEFT CARD ================= */}
    <div className={styles.priceCard}>
      
      {/* ✅ ONLY STANDARD BADGE */}
      <span className={styles.badge}>Free Trial</span>

      <div className={styles.cardContent}>

        {/* LEFT */}
        <div className={styles.leftContent}>
          <h2 className={styles.price}>
  Rs 000.00
</h2>

          <p className={styles.priceDesc}>
            Perfect for beginners who prefer flexible, self-paced learning.
          </p>

          <button className={styles.buyBtn}>BUY NOW</button>
        </div>

        {/* RIGHT */}
        <ul className={styles.features}>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    Life time LMS access
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    Earn your <span>CleverLN</span> certificate.
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    Get job portal access. Apply now.
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    2+ Real-time projects
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    Integrate AI into your daily work.
  </li>
</ul>

      </div>
    </div>

    {/* ================= RIGHT CARD ================= */}
    <div className={`${styles.priceCard} ${styles.highlightCard}`}>
      
      {/* ✅ TRENDING ONLY HERE */}
      <span className={styles.trending}>Trending Plan</span>

      {/* ✅ ADVANTAGE BADGE */}
      <span className={styles.badge}>Advantage +</span>

      <div className={styles.cardContent}>

        {/* LEFT */}
        <div className={styles.leftContent}>
          <h2 className={styles.price}>
            Rs 199.00
          </h2>

          <p className={styles.priceDesc}>
            Perfect for students aiming to grow under expert guidance.
          </p>

          <button
            type="button"
            className={styles.buyBtn}
            onClick={() => {
              window.location.href =
                "/dashboard?jobVerify=true&plan=advantage";
            }}
          >
            BUY NOW
          </button>
          
        </div>

        {/* RIGHT */}
        <ul className={styles.features}>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    LMS + interactive live sessions
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    Earn your <span>CleverLN Pro</span> certificate.
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    Get job access + LOR. Apply now.
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    4+ Real-time projects
  </li>
  <li>
    <img src="/icons/check.png" className={styles.icon} />
    100% doubt clearance & job assistance
  </li>
</ul>

      </div>
    </div>

  </div>

  {/* FOOTER */}
  <p className={styles.paymentText}>
    Trusted by 519+ universities, we follow PPP pricing to make learning accessible—along with 100% secure payments with
  </p>

  <div className={styles.paymentLogos}>
    <img src="/logos/razorpay.png" alt="razorpay" />
    <img src="/logos/easebuzz.png" alt="easebuzz" />
    <img src="/logos/nsdc.png" alt="nsdc" />
    <img src="/logos/skill-india.png" alt="skillindia" />
  </div>

</section>





      {/* ================= CONTACT ================= */}
      <section className={styles.productContactSection}>
        <div className={styles.productContactContainer}>
          <div className={styles.productContactLeft}>
            <h2>Want to know more?</h2>
            <h1>Submit the form to get complete details.</h1>
            <p>
              Whether you have questions, need clarity, or are looking for the right
              direction, connect with our experts.
            </p>
          </div>

          <div className={styles.productContactRight}>
            {step === 1 && (
              <div className={styles.productInputRow}>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.productInput}
                />
                <button onClick={handleNext} className={styles.productNextBtn}>
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div className={styles.productInputRow}>
                <input
                  type="tel"
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.productInput}
                />
                <button onClick={handleNext} className={styles.productNextBtn}>
                  Next
                </button>
              </div>
            )}

            {step === 3 && (
              <div className={styles.productInputRow}>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.productInput}
                />
                <button onClick={handleNext} className={styles.productNextBtn}>
                  Submit
                </button>
              </div>
            )}

            {step === 4 && (
              <p className={styles.productSuccess}>
                ✅ Thank you! We’ll contact you soon.
              </p>
            )}

            <div className={styles.productDots}>
              <span className={`${styles.productDot} ${step >= 1 ? styles.productActive : ""}`} />
              <span className={`${styles.productDot} ${step >= 2 ? styles.productActive : ""}`} />
              <span className={`${styles.productDot} ${step >= 3 ? styles.productActive : ""}`} />
              <span className={`${styles.productDot} ${step >= 4 ? styles.productActive : ""}`} />
            </div>

            <p className={styles.productResponse}>
              Get Response within 12 Hours
            </p>
          </div>
        </div>
      </section>






      {/* ================= TESTIMONIAL ================= */}

      <section className={styles.testimonialSection}>
        <h2 className={styles.testimonialHeading}>
          Be inspired. Build your own success.
        </h2>

        <p className={styles.testimonialSub}>
          Where doors meet learners — and inspiration begins.
        </p>

        <div className={styles.testimonialGrid}>
          <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
            className={styles.testimonialTrack}
           style={{
  transform: `translateX(-${current * 100}%)`,
  transition: "transform 0.5s ease",
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





<section className={styles.faqSection}>

  <h2 className={styles.faqHeading}>
    Let’s Clear Things Up
  </h2>

  <p className={styles.faqSub}>
    Quick answers to help you move forward with confidence.
  </p>

  <div className={styles.faqWrapper}>
    {faqs.map((item, i) => (
      <div
        key={i}
        className={`${styles.faqItem} ${
          activeFAQ === i ? styles.activeFaq : ""
        }`}
      >
        {/* HEADER */}
        <div
          className={styles.faqHeader}
          onClick={() =>
            setActiveFAQ(activeFAQ === i ? null : i)
          }
        >
          <p>{item.q}</p>

          <div className={styles.faqIcon}>
            {activeFAQ === i ? "▲" : "▼"}
          </div>
        </div>

        {/* BODY */}
        {activeFAQ === i && (
         <div
  className={`${styles.faqBody} ${
    activeFAQ === i ? styles.open : ""
  }`}
>
  <p>{item.a}</p>
</div>
        )}
      </div>
    ))}
  </div>

</section>



    {/* ================= BLOG SECTION ================= */}
<section className={styles.blogSection}>

  <h2 className={styles.blogHeading}>
    Real Stories. Real Blogs.
  </h2>

  <p className={styles.blogSub}>
    We understood the problem first—then <span>Designed</span> the solution.
  </p>

  <div className={styles.wrapper}>
    <div ref={blogsRef} className={styles.grid}>

      {[...blogCards, ...blogCards].map((img, i) => (
        <div key={i} className={styles.card}>
          <img src={img} alt="blog" className={styles.imageOnly} />
        </div>
      ))}

    </div>
  </div>

</section>




  

    </>
  );
}