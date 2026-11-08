"use client";

import { useEffect } from "react";
import Link from "next/link";
// same layout and type as the Terms and Conditions page
import styles from "../TermsAndConditions/TermsAndConditions.module.css";

const SUPPORT_EMAIL = "support@cleverln.com";
const LAST_UPDATED = "8 November 2026";

function Email() {
  return <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>;
}

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <main className={styles.termsPage}>
      <section className={styles.termsHero}>
        <h1>Refund Policy</h1>
      </section>

      <section className={styles.termsContentSection}>
        <div className={styles.termsContentCard}>

          {/* IN SHORT */}
          <section className={`${styles.termsSection} ${styles.termsSummary}`}>
            <h2>In Short</h2>

            <ul>
              <li>All fees paid to CleverLN are non-refundable.</li>
              <li>
                When your payment is successful, a slot (seat) in a batch is
                allotted to you and held only for you.
              </li>
              <li>
                Once your slot is booked, your registration is final. It cannot
                be cancelled, undone or refunded.
              </li>
              <li>
                The only money we return is money taken by mistake, such as a
                duplicate payment (see Section 8).
              </li>
              <li>
                Please read this policy, and ask us any questions, before you
                pay.
              </li>
            </ul>
          </section>

          {/* ABOUT THIS POLICY */}
          <section className={styles.termsSection}>
            <h2>About This Policy</h2>

            <p>
              <strong>1.1</strong>{" "}
              This Refund Policy explains what happens to the fee you pay when
              you register for a program, course or workshop on
              www.cleverln.com (the &quot;Site&quot;). The Site and its
              programs are offered by Cleverln Private Limited (&quot;we&quot;,
              &quot;our&quot;, &quot;us&quot; or the &quot;Company&quot;).
            </p>

            <p>
              <strong>1.2</strong>{" "}
              This policy applies to every learner who registers, whether you
              pay for yourself or someone else pays on your behalf.
            </p>

            <p>
              <strong>1.3</strong>{" "}
              This policy is part of our{" "}
              <Link href="/terms-and-conditions">Terms and Conditions</Link>{" "}
              and should be read together with them. If the two say different
              things about refunds, this Refund Policy applies.
            </p>

            <p>
              <strong>1.4</strong>{" "}
              By registering and paying for a program, you confirm that you have
              read this policy, understood it and agreed to it.
            </p>
          </section>

          {/* MEANINGS */}
          <section className={styles.termsSection}>
            <h2>What These Words Mean</h2>

            <p>
              <strong>2.1</strong>{" "}
              In this policy:
            </p>

            <ul>
              <li>
                <strong>Program</strong> means any course, program or workshop
                offered on the Site.
              </li>
              <li>
                <strong>Batch</strong> means a group of learners who take a
                program together on the same schedule.
              </li>
              <li>
                <strong>Slot</strong> means the seat allotted to you in a batch.
              </li>
              <li>
                <strong>Registration</strong> means signing up for a program
                and completing the payment for it.
              </li>
              <li>
                <strong>Fee</strong> means any amount you pay for a program,
                including amounts paid through EMI and any taxes paid with it.
              </li>
            </ul>
          </section>

          {/* SLOT ALLOTMENT */}
          <section className={styles.termsSection}>
            <h2>How Slot Allotment Works</h2>

            <p>
              <strong>3.1</strong>{" "}
              Every batch has a limited number of seats.
            </p>

            <p>
              <strong>3.2</strong>{" "}
              Your slot is booked the moment your payment is successful and
              your registration is confirmed.
            </p>

            <p>
              <strong>3.3</strong>{" "}
              From that moment, the slot is held only for you. It is removed
              from the seats available to other learners, and live sessions,
              mentor time and learner support for the batch are planned around
              the learners who have booked slots.
            </p>

            <p>
              <strong>3.4</strong>{" "}
              Because a booked slot cannot be offered to anyone else, it cannot
              be released, returned or exchanged for money. This is the reason
              we do not offer refunds.
            </p>
          </section>

          {/* NO REFUNDS */}
          <section className={styles.termsSection}>
            <h2>No Refunds</h2>

            <p>
              <strong>4.1</strong>{" "}
              All fees are non-refundable. Once your slot is booked, the fee
              will not be refunded, in full or in part.
            </p>

            <p>
              <strong>4.2</strong>{" "}
              This applies however the fee was paid: in full, through EMI, or by
              someone else on your behalf.
            </p>

            <p>
              <strong>4.3</strong>{" "}
              The only exception is money taken by mistake, as explained in
              Section 8. That is a correction of a payment error, not a refund
              of the fee.
            </p>
          </section>

          {/* CANNOT BE CANCELLED */}
          <section className={styles.termsSection}>
            <h2>Your Registration Cannot Be Cancelled Or Undone</h2>

            <p>
              <strong>5.1</strong>{" "}
              Once your slot is booked, your registration is final. It cannot
              be cancelled, reversed or undone, and asking us to cancel it does
              not lead to a refund.
            </p>

            <p>
              <strong>5.2</strong>{" "}
              Not using your slot does not cancel your registration. If you do
              not join or do not continue, your slot stays booked and the fee
              stays paid.
            </p>
          </section>

          {/* EXAMPLES */}
          <section className={styles.termsSection}>
            <h2>When No Refund Is Given</h2>

            <p>
              <strong>6.1</strong>{" "}
              To be completely clear, no refund is given in any of these
              situations, or in any similar situation:
            </p>

            <ul>
              <li>You change your mind after registering.</li>
              <li>
                You chose the wrong program, plan or batch when you registered.
              </li>
              <li>
                You cannot attend because of personal, work, study, health,
                travel or any other reasons.
              </li>
              <li>You miss live sessions, classes, assignments or deadlines.</li>
              <li>You stop partway through the program, or never start it.</li>
              <li>
                You feel after joining that the program is not right for you.
              </li>
              <li>
                You get a job, internship or other opportunity before you
                finish the program.
              </li>
              <li>
                Your access is removed because you broke our Terms and
                Conditions, or because EMI payments failed (see
                &quot;Purchase Via RP-EMI&quot; in our Terms and Conditions).
              </li>
            </ul>
          </section>

          {/* EMI */}
          <section className={styles.termsSection}>
            <h2>Payments Through EMI</h2>

            <p>
              <strong>7.1</strong>{" "}
              Choosing EMI changes only how you pay, not what you owe. Once your
              slot is booked through EMI, this policy applies in the same way as
              for a full payment.
            </p>

            <p>
              <strong>7.2</strong>{" "}
              If EMI payments fail, we may ask you to change your card or
              payment method, and we may remove your access if we do not hear
              back, as set out in our Terms and Conditions. Amounts already
              paid are not refunded.
            </p>
          </section>

          {/* PAYMENT ERRORS */}
          <section className={styles.termsSection}>
            <h2>Payment Errors: Duplicate Or Failed Payments</h2>

            <p>
              <strong>8.1</strong>{" "}
              Sometimes a payment goes wrong. We will return money taken by
              mistake if:
            </p>

            <ul>
              <li>you were charged more than once for the same registration; or</li>
              <li>
                money was debited from your account but your registration was
                not confirmed and no slot was allotted to you.
              </li>
            </ul>

            <p>
              <strong>8.2</strong>{" "}
              To report a payment error, write to <Email /> with your name,
              registered email or phone number, the program name, and the
              transaction ID, date and amount of the payment.
            </p>

            <p>
              <strong>8.3</strong>{" "}
              Once we have checked the error with our payment partner, the
              extra or unconfirmed amount will be returned to the original
              payment method. Banks and payment providers may take a few
              working days to show it in your account.
            </p>
          </section>

          {/* BEFORE YOU REGISTER */}
          <section className={styles.termsSection}>
            <h2>Before You Register</h2>

            <p>
              <strong>9.1</strong>{" "}
              Because your registration cannot be undone, please check the
              following before you pay:
            </p>

            <ul>
              <li>
                You have read the program page, including what is covered, how
                long it runs and what your plan includes.
              </li>
              <li>You have chosen the correct program, plan and batch.</li>
              <li>The batch schedule works for you.</li>
              <li>You meet any eligibility requirements for the program.</li>
            </ul>

            <p>
              <strong>9.2</strong>{" "}
              If anything is unclear, write to us at <Email /> before you pay.
              We are happy to help you choose the right program.
            </p>
          </section>

          {/* CHANGES TO THIS POLICY */}
          <section className={styles.termsSection}>
            <h2>Changes To This Policy</h2>

            <p>
              <strong>10.1</strong>{" "}
              We may update this Refund Policy from time to time by posting the
              new version on this page. The version in effect on the date you
              register applies to your registration.
            </p>

            <p>
              <strong>10.2</strong>{" "}
              This policy was last updated on {LAST_UPDATED}.
            </p>
          </section>

          {/* CONTACT US */}
          <section className={styles.termsSection}>
            <h2>Contact Us</h2>

            <p>
              <strong>11.1</strong>{" "}
              For any questions about this Refund Policy, write to us at{" "}
              <Email />. Please include your name, your registered email or
              phone number, and the program name so we can help you quickly.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
