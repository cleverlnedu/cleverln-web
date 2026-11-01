"use client";

import { useId, useState } from "react";

import styles from "../ProductPageTemplate.module.css";

export type Faq = { question: string; answer: string };

// "Let's Clear Things Up" accordion. Shared by the course pages and Opportunities
// (styles live in ProductPageTemplate.module.css).
export default function FaqSection({
  faqs,
  heading = "Let’s Clear Things Up",
  subheading = "Quick answers to help you move forward with confidence.",
}: {
  faqs: Faq[];
  heading?: string;
  subheading?: string;
}) {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const idPrefix = useId();

  return (
    <section className={styles.profaqSection}>

      <div className={styles.profaqContainer}>

        {/* HEADER */}

        <div className={styles.profaqHeader}>
          <h2>{heading}</h2>
          <p>{subheading}</p>
        </div>


        {/* FAQ LIST */}

        <div className={styles.profaqList}>

          {faqs.map((faq, index) => {
            const isOpen = activeFAQ === index;
            const answerId = `${idPrefix}-answer-${index}`;

            return (
              <div
                key={index}
                className={`${styles.profaqItem} ${isOpen ? styles.profaqItemOpen : ""}`}
              >

                {/* QUESTION */}

                <button
                  type="button"
                  className={styles.profaqQuestion}
                  onClick={() => setActiveFAQ(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >

                  <span className={styles.profaqQuestionText}>
                    {faq.question}
                  </span>

                  <span
                    className={`${styles.profaqIcon} ${isOpen ? styles.profaqIconOpen : ""}`}
                    aria-hidden="true"
                  >
                    <span className={styles.profaqChevron} />
                  </span>

                </button>


                {/* ANSWER */}

                <div
                  id={answerId}
                  className={`${styles.profaqAnswerWrapper} ${isOpen ? styles.profaqAnswerWrapperOpen : ""}`}
                >
                  <div className={styles.profaqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
