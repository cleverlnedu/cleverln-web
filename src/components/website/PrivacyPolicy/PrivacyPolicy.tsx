"use client";

import { useEffect } from "react";
import styles from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <main className={styles.privacyPage}>
      {/* HEADER */}
      <section className={styles.privacyHero}>
        <h1>Privacy Policy</h1>
      </section>

      {/* CONTENT */}
      <section className={styles.privacyContentSection}>
        <div className={styles.privacyContentCard}>

          <section className={styles.privacySection}>
            <p>
              This web site is owned and operated by cleverln Private Limited
              (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot; or the
              &quot;Company&quot;). We understand and value your privacy. We
              want to make your experience online satisfying and safe.
            </p>

            <p>
              This privacy policy (the &quot;Policy&quot;) governs information
              you provide to us or we learn from your use of this web site (the
              &quot;Site&quot;) and constitutes a legal agreement between you,
              as the user of the Site, and the Company, as the owner of the
              Site. The Policy will also tell you how we may collect, use, and
              in some instances share this information. Our policies do not
              apply to third-party websites that are connected via links to our
              Site and may differ from other service offerings and you should
              carefully review the terms of service and this privacy notice
              before using these services.
            </p>
          </section>

          {/* COLLECTED INFORMATION */}
          <section className={styles.privacySection}>
            <h2>Collected Information</h2>

            <p>
              In general, you can visit the Site without telling us who you are
              or revealing any personally identifiable information about
              yourself. By providing your Personal Information to us, you
              explicitly agree to our collection and use of such information as
              described in this Policy.
            </p>

            <p>
              If you choose to register, and are 15 years of age or older, we
              will collect and process such information from you, including but
              not limited to the below mentioned(“Personal Information”):
            </p>

            <div className={styles.privacyList}>
              <p>
                <strong>(a)</strong>
                Information that you provide to us by filling in forms. This
                includes contact information such as name, email address,
                mailing address, phone number, financial information, if any,
                unique identifiers such as preferences information such as
                favourites lists, transaction history.
              </p>

              <p>
                <strong>(b)</strong>
                Information that you provide when you write directly to us
                (including by e-mail).
              </p>

              <p>
                <strong>(c)</strong>
                Information that you provide to us by writing on our blogs;
              </p>

              <p>
                <strong>(d)</strong>
                Information relating to logs is automatically reported by your
                browser each time you access our Site. When you use the Site,
                our servers automatically record certain information that your
                web browser sends whenever you visit any website. These server
                logs may include information such as your web request, Internet
                Protocol (IP) address, browser type, referring/ exit pages and
                URLs, number of clicks, domain names, landing pages, pages
                viewed, and other such information. We use this information,
                which does not identify users, to analyze trends and to gather
                demographic information about the user base as a whole. We do
                not link this automatically-collected data to personally
                identifiable information.
              </p>

              <p>
                <strong>(e)</strong>
                to recognize you when you return to our Site.
              </p>
            </div>
          </section>

          {/* USAGE OF COLLECTED INFORMATION */}
          <section className={styles.privacySection}>
            <h2>Usage of Collected Information</h2>

            <p>
              We use the information we collect for following purposes,
              including:
            </p>

            <div className={styles.privacyList}>
              <p>
                <strong>(a)</strong>
                To provide, personalise, maintain and improve our products and
                services, such as to enable support and other services, enable
                features to personalise your edureka account;
              </p>

              <p>
                <strong>(b)</strong>
                To carry out our obligations arising from any contracts
                entered into between you and us and to provide you with the
                relevant information and services;
              </p>

              <p>
                <strong>(c)</strong>
                To administer and enhance the security of our Cleverln
                Platform and for internal operations, including troubleshooting,
                data analysis, testing, research, statistical and survey
                purposes;
              </p>

              <p>
                <strong>(d)</strong>
                To provide you with information about services we consider
                similar to those that you are already using, or have enquired
                about, or may interest you such as promotional offers. If you
                are a registered user, we will contact you by electronic means
                (e-mail or push notifications or SMS or telephone) with
                information about these services;
              </p>

              <p>
                <strong>(e)</strong>
                To understand our users (what they do on our Services, what
                features they like, how they use them, etc.), improve the
                content and features of our Services (such as by personalizing
                content to your interests), process and complete your
                transactions, make special offers, provide customer support,
                process and respond to your queries;
              </p>

              <p>
                <strong>(f)</strong>
                To generate and review reports and data about, and to conduct
                research on, our user base and Service usage patterns;
              </p>

              <p>
                <strong>(g)</strong>
                To allow you to participate in interactive features of our
                Services, if any; or
              </p>

              <p>
                <strong>(h)</strong>
                To measure or understand the effectiveness of advertising we
                serve to you and others, and to deliver relevant advertising to
                you.
              </p>

              <p>
                <strong>(i)</strong>
                To remind you of completing payments to obtain course access
                and remind you about class timings or class reschedule or class
                cancellations if any
              </p>

              <p>
                <strong>(j)</strong>
                When you accept our Terms &amp; Conditions, you also accept to
                receive course information &amp; updates on WhatsApp.
              </p>
            </div>

            <p>
              We analyse the log files of our cleverln Platform that may contain
              Internet Protocol (IP) addresses, browser type and language,
              Internet service provider (ISP), referring, app crashes, page
              viewed and exit websites and applications, operating system,
              date/time stamp, and clickstream data. This helps us to administer
              the website, to learn about user behavior on the site, to improve
              our product and services, and to gather demographic information
              about our user base as a whole.
            </p>
          </section>

          {/* CHILDREN'S PRIVACY */}
          <section className={styles.privacySection}>
            <h2>Children&apos;s Privacy</h2>

            <p>
              We are committed to protecting children&apos;s privacy online.
              This Site is intended for users above the age of 15. We do not
              knowingly collect payment related information from children.
            </p>
          </section>

          {/* BILLING */}
          <section className={styles.privacySection}>
            <h2>Billing</h2>

            <p>
              If you use or provide services on the Site for which we implement
              a billing system for you, we will collect additional information
              from you so that we can process and collect billing information.
              For example, we may collect your mailing address to remit
              payments.
            </p>
          </section>

          {/* COOKIES */}
          <section className={styles.privacySection}>
            <h2>Cookies</h2>

            <p>
              The Site uses software tags called &quot;Cookies&quot; to identify
              customers when they visit our Site. Cookies are used to remember
              user preferences and maximize performance of our services. The
              information we collect with cookies is not sold, rented, or shared
              with any outside parties. Users who disable their Web browser&apos;s
              ability to accept cookies will be able to browse our Site but may
              not be able to successfully use our Service.
            </p>

            <p>
              This privacy policy covers the use of cookies by our Site only and
              does not cover the use of cookies by any advertisers.
            </p>
          </section>

          {/* THIRD PARTY COOKIES */}
          <section className={styles.privacySection}>
            <h2>Third Party Cookies:</h2>

            <p>
              We may from time to time engage third parties to track and
              analyze non-personally identifiable usage and volume statistical
              information from visitors to our Site to help us administer our
              Site and improve its quality. Such third parties may use cookies
              to help track visitor behaviour. Such cookies will not be used to
              associate individual Site visitors to any Personal Information.
              All data collected by such third parties on our behalf is used
              only to provide us with information on Site usage and is not
              shared with any other third parties.
            </p>
          </section>

          {/* LOG FILES */}
          <section className={styles.privacySection}>
            <h2>Log Files</h2>

            <p>
              We maintain log files of the traffic that visits our Site. We do
              not link any information gathered in these log files to Personal
              Information. Log files are used to manage traffic loads and
              information technology requirements for providing reliable
              service. Information collected includes IP addresses and browser
              types.
            </p>
          </section>

          {/* SECURITY */}
          <section className={styles.privacySection}>
            <h2>Security</h2>

            <p>
              All information you provide to us is stored on our secure servers.
              As a registered user with an account and a password, you are
              responsible for keeping your password confidential. We take
              commercially reasonable safeguards to protect and preserve the
              integrity and security of your Personal Information submitted to
              us, both during transmission and once we receive it against loss,
              theft, unauthorised access, disclosure, reproduction, use or
              amendment. No method of transmission over the Internet, or method
              of electronic storage, is 100% secure. Therefore, while we strive
              to use commercially reasonable means to protect your Personal
              Information, we assume no liability for any disclosure of
              information due to errors in transmission, unauthorised third
              party access or other acts of third parties, or acts or omissions
              beyond our reasonable control and you agree that you will not hold
              us responsible for any breach of security unless such breach has
              been caused as a direct result of our gross negligence or wilful
              default.. If we learn of a security systems breach we may attempt
              to notify you electronically so that you can take appropriate
              protective steps. By using this Site or providing personal
              information to us you agree that we can communicate with you
              electronically regarding security, privacy, and administrative
              issues relating to your use of this site. We may post a notice on
              our Site if a security breach occurs. We may also send an email to
              you at the email address you have provided to us in these
              circumstances. Depending on where you live, you may have a legal
              right to receive notice of a security breach in writing.
            </p>
          </section>

          {/* RETENTION */}
          <section className={styles.privacySection}>
            <h2>Retention of Information</h2>

            <p>
              We will keep Personal Information of our users for as long as they
              are registered subscribers or users of our products and services,
              and as permitted by law.
            </p>
          </section>

          {/* SHARING */}
          <section className={styles.privacySection}>
            <h2>Sharing your personal information</h2>

            <p>
              If you have purchased Cleverln course, we may ask you for
              testimonial, we will display your testimonial on our website,
              photos and videos or in our social media channels such as
              Facebook, YouTube. You should be aware that your publicly
              identifiable information could be used to send you promotional,
              unsolicited messages. We are not responsible for your personal
              information which you have chosen to display.
            </p>

            <p>
              If you don&apos;t want us to feature your pictures/testimonials on
              our website or on our social media channels, you can raise a
              support ticket from your Cleverln Log in.
            </p>
          </section>

          {/* CORRECTIONS */}
          <section className={styles.privacySection}>
            <h2>Personal Information Corrections</h2>

            <p>
              You can contact us if you notice that the information we are
              holding is incorrect or incomplete. Please raise a support
              ticket(support@cleverln.com)
            </p>
          </section>

          {/* LINKING */}
          <section className={styles.privacySection}>
            <h2>Linking</h2>

            <p>
              This Site may contain links to other web sites. The Company cannot
              and does not control the privacy practices of any such sites. You
              should review the privacy policy on any web site where you may
              submit personal information before providing it to any web site.
            </p>
          </section>

          {/* EMAILS */}
          <section className={styles.privacySection}>
            <h2>Emails</h2>

            <p>
              If you choose to register for our products and services, we will
              send you certain promotional emails. Promotional emails advertise
              our products and services and/or the products and services of our
              Users and Affiliates. If you do not want to receive promotional
              emails from us, you may elect to opt-out of receiving promotional
              emails at any time by hitting the &quot;unsubscribe&quot; button at
              the bottom of any of our e-mails.
            </p>
          </section>

          {/* LEGAL DISCLAIMER */}
          <section className={styles.privacySection}>
            <h2>Legal Disclaimer</h2>

            <p>
              We reserve the right to disclose your Personal Information as
              required by law and when we believe that disclosure doing so in
              the Company&apos;s interest to protect its property or other legal
              rights or the rights or property of others.
            </p>
          </section>

          {/* GOVERNING LAW */}
          <section className={styles.privacySection}>
            <h2>Governing Law and Dispute Resolution</h2>

            <p>
              This Policy shall be governed by and construed in accordance with
              the laws of the Republic of India. Subject to arbitration, the
              courts at Bangalore shall have exclusive jurisdiction in relation
              to any disputes arising out of or in connection with this Policy.
            </p>

            <p>
              If any dispute arises between the Company and You in connection
              with or arising out of the validity, interpretation,
              implementation or alleged breach of any provision of the Policy,
              such dispute shall be referred to arbitration in accordance with
              the Indian Arbitration and Conciliation Act, 1996 for the time
              being in force. Arbitration shall be conducted by one (1)
              arbitrator mutually appointed by the Company and You. The seat of
              arbitration shall be Bangalore, Karnataka. The language of the
              arbitration proceedings and of all written decisions and
              correspondence relating to the arbitration shall be English.
            </p>
          </section>

          {/* INTERNATIONAL USERS */}
          <section className={styles.privacySection}>
            <h2>International Users</h2>

            <p>
              This Site is operated in the India. If you are visiting from
              other regions with laws governing data collection and use that
              may differ from Indian law, please note that you are transferring
              your personal data to India, which does not have the same data
              protection laws and by providing your personal data you consent
              to:
            </p>

            <ul className={styles.privacyBulletList}>
              <li>
                The use of your personal data for the uses identified above in
                accordance with this Privacy Policy;
              </li>

              <li>
                The transfer of your personal data to the India as indicated
                above.
              </li>
            </ul>

            <p>
              The Company is also not making any representation that the content
              contained on the Product is appropriate or to be used or accessed
              outside of the Republic of India and your use or access of the
              Site from outside the Republic of India, is at your own risk and
              you are responsible for compliance with the laws of such
              jurisdiction.
            </p>
          </section>

          {/* MERGER */}
          <section className={styles.privacySection}>
            <h2>Merger, Sale or Insolvency</h2>

            <p>
              If the Company should ever file for bankruptcy or have its assets
              sold to or merge with another entity, information the Company
              receives from you from this Site is a Company asset that may be
              transferred in connection with these types of corporate events.
            </p>
          </section>

          {/* CHANGE IN PRIVACY POLICY */}
          <section className={styles.privacySection}>
            <h2>Change in this Privacy Policy</h2>

            <p>
              We may occasionally update this Privacy Policy. When we do, we
              will also revise the &quot;last updated&quot; date on the Privacy
              Policy. For changes to this Privacy Policy that may be materially
              less restrictive on our use or disclosure of personal information
              you have provided
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}