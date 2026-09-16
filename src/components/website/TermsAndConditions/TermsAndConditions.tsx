"use client";

import { useEffect } from "react";
import styles from "./TermsAndConditions.module.css";

export default function TermsAndConditions() {
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
        <h1>Terms and Conditions</h1>
      </section>

      <section className={styles.termsContentSection}>
        <div className={styles.termsContentCard}>

          {/* ABOUT THE COMPANY */}
          <section className={styles.termsSection}>
            <h2>About The Company</h2>

            <p>
              <strong>1.1</strong>{" "}
              www.cleverln.com (the &quot;Site&quot;), the courses available
              from the Site (the &quot;Courses&quot;), and the training
              services made available on or through the Site and the software
              (the &quot;Services&quot;), are owned, operated, and maintained,
              as applicable, by Cleverln Private Limited (hereinafter referred
              to as &quot;we&quot;, &quot;our&quot;, &quot;us&quot;, or the
              &quot;Company&quot;, as the case may be). The Site, Courses, and
              Services are, collectively referred to as the &quot;Company
              Products&quot;. By (a) using or accessing the Company Products,
              including, but not limited to streaming, accessing or using the
              software; or (b) paying, either for itself or for someone else to
              use or access the Company Products, you agree to the terms and
              conditions set forth in these terms of use (the
              &quot;Terms&quot;).
            </p>

            <p className={styles.termsUppercase}>
              <strong>1.2</strong>{" "}
              THESE TERMS, UNLESS THE SAME HAS BEEN SPECIFICALLY EXCLUDED BY
              ANY OTHER INSTRUMENT TO WHICH THE COMPANY AND/OR AN USER ARE
              SUBJECT TO, INCLUDING THIS INTRODUCTORY SECTION, CREATE A BINDING
              LEGAL CONTRACT BETWEEN YOU AND THE COMPANY. BY USING THE COMPANY
              PRODUCTS, YOU REPRESENT AND WARRANT THAT YOU HAVE READ,
              UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT
              ACCEPT THESE TERMS, YOU MUST NOT USE - AND ARE NOT AUTHORIZED TO
              USE - ALL OR ANY PORTION OF THE COMPANY PRODUCTS.
            </p>

            <p>
              <strong>1.3</strong>{" "}
              For the purposes of the Terms, The term “User(s)/You” shall mean
              and include all persons, natural or artificial, that visit the
              Site including those that have agreed to become registered users
              on the Site by providing registration data while registering on
              the Site as registered users accessing the Company Products
              through the Website. If you are a parent, guardian, or other
              natural person who enables a child to access the Company
              Products, you agree to stand in the shoes of such child for the
              purposes of making us whole in case of damages or indemnification
              that could properly lie against a child, if not for his or her
              age. This Site is intended for use by a natural person only if
              such natural person is 15 (Fiftheen) years of age or older.
            </p>

            <p>
              <strong>1.4</strong>{" "}
              If you are using or opening an account to use the Company
              Products on behalf of a company, entity or organization (each a
              &quot;Subscribing Entity&quot;), then you represent and warrant
              that you: (i) are an authorized representative of that
              Subscribing Entity with the authority to bind such entity to
              these Terms, and (ii) agree to be bound by these Terms on behalf
              of such Subscribing Entity.
            </p>
          </section>

          {/* PRIVACY */}
          <section className={styles.termsSection}>
            <h2>Privacy</h2>

            <p>
              <strong>2.1</strong>{" "}
              Any personal information submitted in connection with your use
              of the Site is subject to our Privacy Policy which is available
              at https://www.Cleverln.com/privacy-policy the terms of which are
              hereby incorporated into these Terms by reference. Please review
              our Privacy Policy to understand our practices.
            </p>
          </section>

          {/* GENERAL */}
          <section className={styles.termsSection}>
            <h2>General</h2>

            <p>
              <strong>3.1</strong>{" "}
              The Company Products enable the Users to learn via live and
              recorded instruction, tutoring, and learning services through our
              proprietary Software. The Services include, without limitation,
              facilitating and hosting Courses, and taking feedback from Users.
            </p>

            <p>
              <strong>3.2</strong>{" "}
              You understand and agree that these Terms are agreed to in
              consideration of your use of the Company Products and other good
              and valuable consideration, the receipt and sufficiency of which
              are hereby acknowledged.
            </p>

            <p>
              <strong>3.3</strong>{" "}
              Changes to these Terms. Company reserves the absolute right to
              revise these Terms in its sole discretion at any time and without
              prior notice to you other than by posting the revised Terms on
              the Site. Any revisions to the Terms are effective upon posting.
              The Terms will be identified as of the most recent date of
              revision. You should visit this page regularly to ensure your
              continued acceptance of these Terms. Your continued use of the
              Company Products after any revision to these Terms constitutes
              your binding acceptance of the revised Terms. Notwithstanding the
              preceding sentences of this section, no revisions to these Terms
              will apply to any dispute between you and the Company that arose
              prior to the date of such revision.
            </p>

            <p>
              <strong>3.4</strong>{" "}
              Evolving Nature of Services. The Company Products are new and
              subject to change at any time. We are continually looking to
              improve the Company Products but if you are at any time
              dissatisfied with the Company Products, then your sole remedy is
              to discontinue use of the Company Products.
            </p>

            <p>
              <strong>3.5</strong>{" "}
              Electronic Notices. By using the Company Products or
              communicating with us, you agree that we may communicate with
              you electronically regarding security, privacy, and
              administrative issues relating to your use of the Company
              Products. If we learn of a security system&apos;s breach, we may
              attempt to notify you electronically by posting a notice on the
              Site or sending an email to you.
            </p>
          </section>

          {/* FEES AND TAXES */}
          <section className={styles.termsSection}>
            <h2>Fees and Taxes</h2>

            <p>
              <strong>5.1</strong>{" "}
              Accessing the Site and browsing Courses is free of cost. Company
              however reserves the right to change its fee policies at any time
              in its sole discretion, including charging for access to the
              Site, but no fee change will be binding upon you until you agree
              to such fee changes.
            </p>

            <p>
              <strong>5.2</strong>{" "}
              Unless otherwise stated, all fees are quoted in INR. You are
              responsible for paying all fees and applicable taxes associated
              with the Site in a timely manner with a valid payment method that
              is accepted by the Company in its sole discretion. If your payment
              method fails or your account is past due, then we may collect fees
              owed using other collection mechanisms. This may include charging
              other payment methods on file with us and/or retaining collection
              agencies and legal counsel. We may also block your access to any
              Company Products pending resolution of any amounts due by you to
              Company.
            </p>
          </section>

          {/* CONDUCT */}
          <section className={styles.termsSection}>
            <h2>Conduct</h2>

            <p>
              <strong>7.1</strong>{" "}
              You shall only access the Company Products for lawful purposes.
              You are solely responsible for the knowledge of and adherence to
              any and all laws, rules, and regulations pertaining to your use
              of the Company Products. You agree not to use the Company
              Products or the Company Content (as defined below) to recruit,
              solicit, or contact in any form Instructors or potential users
              for employment or contracting for a business not affiliated with
              us without our advance written permission, which may be withheld
              in our sole discretion. You assume any and all risks from any
              meetings or contact between you and any Instructors or other
              Users of Company Products. You should be careful before meeting
              any Instructor or other User in person and should only do so in
              public. Remember to always be safe.
            </p>
          </section>

          {/* USER AND SUBMITTED CONTENT */}
          <section className={styles.termsSection}>
            <h2>User and Submitted Content</h2>

            <p>
              <strong>11.1</strong>{" "}
              Any materials, information, communications or ideas that you
              upload, communicate or otherwise transmit or post to us on or
              through Company Products (the &quot;Submitted Content&quot;) will
              be treated as non-confidential and subject to the license below,
              and may be reproduced, distributed, publicly performed, publicly
              distributed, communicated to the public, and otherwise used and
              exploited by us for any purpose related to the delivery,
              marketing, promoting, demonstrating or operating the Company
              Products, including, but not limited to, for quality control,
              redistribution or display to Users, and professional development.
            </p>
          </section>

          {/* COPYRIGHT */}
          <section className={styles.termsSection}>
            <h2>Copyright</h2>

            <p>
              <strong>12.1</strong>{" "}
              You acknowledge that the software, the technology underlying the
              Services, and all other software, designs, materials,
              information, communications, text, graphics, links, electronic
              art, animations, illustrations, artwork, audio clips, video
              clips, photos, images, and other data or copyrightable materials,
              including the selection and arrangements thereof, provided or
              made available to you in connection with the Company Products
              (collectively, the &quot;Company Content&quot;) are the
              proprietary property of Company and its affiliated and/or third
              party providers and suppliers (the &quot;Third Parties&quot;) .
            </p>

            <p>
              <strong>12.2</strong>{" "}
              You agree that any and all material displayed on the Site is
              solely for your personal use and you shall not, whether directly
              or indirectly, copy, reproduce, republish, post, upload, transmit
              or distribute such material in any manner and through any media
              including by way of e-mail or other electronic means and shall
              not assist any other person in doing so. Modification of the said
              materials or use of the materials on any other website or
              networked computer environment or use of the materials for any
              purpose other than personal use is a violation of the said
              copyrights, trademarks and other intellectual proprietary rights,
              and is expressly prohibited. Unless otherwise specified, when any
              content is downloaded to your computer, you do not obtain any
              ownership interest in such content or any use of the content for
              any other purpose. The Company reserves all rights not expressly
              granted to you.
            </p>

            <p>
              <strong>12.3</strong>{" "}
              All services rendered by you as a part of this agreement are
              works made for hire. Company shall have exclusive and sole
              ownership on the intellectual property developed by us as a part
              of this agreement. The entire right, title, and interest in and
              to all copyrights in the Work; all registrations and copyright
              applications relating thereto and all renewals and extensions
              thereof; all works based upon, derived from, or incorporating the
              Work; all income, royalties, damages, claims and payments now or
              hereafter due or payable with respect thereto; all causes of
              action, either in law or in equity for past, present, or future
              infringement based on the copyrights; and all rights corresponding
              to the foregoing throughout the world shall vest with Company
              with respect to the works pursuant to this agreement.
            </p>
          </section>

          {/* LINKS */}
          <section className={styles.termsSection}>
            <h2>Links</h2>

            <p>
              <strong>16.1</strong>{" "}
              As you use the Company Products you may notice links to
              third-party websites (&quot;Third Party Sites&quot;). This may
              include Instructors sending links to Third Party Sites and/or
              causing Third Party Sites (such as study resources or online
              education pages) to pop-up for your review. These links are for
              convenience only. If you use these links, you will leave the
              Site. Certain of these Third-Party Sites may make use of Company
              proprietary intellectual property rights (such as copyrights,
              trademarks, service marks, logos and trade names) under license
              from Company. Company is not responsible for the availability or
              content of these Third Party Sites or for any viruses or other
              damaging elements encountered in linking to a Third Party Site,
              whether or not Company is affiliated with the owners of such
              Third Party Sites. In addition, the provisioning of these links
              to Third Party Sites is not an endorsement or approval by Company
              of the organizations sponsoring such Third Party Sites or their
              products or services, and you may be subjected to offensive,
              harmful, or damaging content on such Third Party Sites. These
              Terms do not apply to Third Party Sites, and you should review
              applicable terms and policies, including any relevant privacy
              policies, associated with any Third Party Sites, applications,
              software or services.
            </p>

            <p className={styles.termsUppercase}>
              <strong>16.2</strong>{" "}
              YOU AGREE THAT COMPANY WILL NOT BE RESPONSIBLE OR LIABLE FOR ANY
              LOSS OR DAMAGE OF ANY SORT INCURRED AS THE RESULT OF ANY SUCH
              DEALINGS YOU MAY HAVE ON OR THROUGH A THIRD PARTY SITE OR AS THE
              RESULT OF THE PRESENCE OF ANY CONTENT OR ADVERTISING ON THE THIRD
              PARTY SITES.
            </p>
          </section>

          {/* MODIFICATION OF SERVICES */}
          <section className={styles.termsSection}>
            <h2>Modification of Services</h2>

            <p>
              <strong>20.1</strong>{" "}
              We may add, change or eliminate features, pricing, nomenclature
              and other aspects of the Company Products and make other changes
              at any time and these Terms will continue to apply to the Company
              Products as modified. We reserve the right at any time and from
              time to time to modify or discontinue, temporarily or permanently,
              the Company Products (or any part thereof) with or without notice.
              You agree that we will not be liable to you or to any third party
              for any such modification, suspension, or discontinuance of all
              or any portion of the Company Products.
            </p>
          </section>

          {/* MISCELLANEOUS */}
          <section className={styles.termsSection}>
            <h2>Miscellaneous</h2>

            <p>
              <strong>24.1</strong>{" "}
              Entire Agreement. These Terms and any policies applicable to you
              posted on the Site constitute the entire agreement between the
              parties with respect to the subject matter hereof, and supersede
              all previous written or oral agreements between the parties with
              respect to such subject matter. All rights not expressly granted
              in the Terms are expressly reserved. These Terms shall inure to
              our benefit and to the benefit of our agents, licensors,
              licensees, successors, and assigns.All electronic communications
              and content presented and / or passed to the Company, including
              that presented and/or passed from remote access connections, may
              be monitored saved, read, transcribed, stored, or retransmitted in
              the course of daily operations by any duly authorized employee or
              agent of the Company in the exercise of their duties, or by law
              enforcement authorities who may be assisting the Company in
              investigating possible contravention/non-compliance with
              applicable laws. Electronic communications and content may be
              examined by automated means. Further, the Company has the right
              to reject, at its sole discretion, from the Site any electronic
              communications or content deemed not to be in compliance with the
              corporate policies and procedures of the Company. The Company
              shall not be under any obligation to furnish any clarifications
              or answers in the event it so rejects any content posted by the
              User. However, the Company has full authority to review the
              content posted by Users on the Site.
            </p>
          </section>

          {/* PURCHASE VIA RP-EMI */}
          <section className={styles.termsSection}>
            <h2>Purchase Via RP-EMI</h2>

            <p>
              <strong>25.1</strong>{" "}
              In this purchase Cleverln is bearing the interest on behalf of
              the learner.
            </p>

            <p>
              <strong>25.2</strong>{" "}
              In case of failed payments, Cleverln can reach out to you
              requesting a change card or payment method.
            </p>

            <p>
              <strong>25.3</strong>{" "}
              If not responded after multiple attempts, Cleverln can remove
              access to your course.
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}