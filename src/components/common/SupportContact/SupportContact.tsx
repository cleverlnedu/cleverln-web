import Link from "next/link";
import { Phone, Mail, Clock3, ShieldCheck } from "lucide-react";

import styles from "./SupportContact.module.css";

// "Talk to Our Experts" card with the four ways to reach CleverLN. Used by the dashboard Support page
// and the public Help Center page. Cards with a link open it: dialler, email app or the privacy policy.
const supportData = [
  {
    icon: Phone,
    title: "Call Us On",
    details: ["Tel : +91 8069585748", "Mob : +91 8069585748"],
    href: "tel:+918069585748",
  },
  {
    icon: Mail,
    title: "Mail Us On",
    details: ["G-Mail Id :", "support@cleverln.com"],
    href: "mailto:support@cleverln.com",
  },
  {
    icon: Clock3,
    title: "Office Hours",
    details: ["Call : 10AM to 8PM", "Mail : All Time"],
  },
  {
    icon: ShieldCheck,
    title: "View Policies",
    details: ["Know our policy for good", "understanding"],
    href: "/privacy-policy",
  },
];

export default function SupportContact() {
  return (
    <div className={styles.dsupportCard}>
      <div className={styles.dsupportHero}>
        <p className={styles.dsupportTag}>
          Talk to Our Experts
        </p>

        <h1 className={styles.dsupportTitle}>
          Even if you have a small query,
          <br />
          we&apos;re just one call away.
        </h1>

        <p className={styles.dsupportDescription}>
          Have a question? We&apos;re always here to help.
          Even the smallest query matters to us.
          Our expert team is just one call or message away.
          Reach out anytime and get the guidance you need.
        </p>
      </div>

      <div className={styles.dsupportCardGrid}>
        {supportData.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className={styles.dsupportCardHeader}>
                <Icon className={styles.dsupportIcon} size={22} strokeWidth={2.2} />
                <h3>{item.title}</h3>
              </div>

              <div className={styles.dsupportCardBody}>
                {item.details.map((detail) => <p key={detail}>{detail}</p>)}
              </div>
            </>
          );

          if (!item.href) return <div key={item.title} className={styles.dsupportContactCard}>{content}</div>;
          if (item.href.startsWith("/")) return <Link key={item.title} href={item.href} className={styles.dsupportContactCard}>{content}</Link>;
          return <a key={item.title} href={item.href} className={styles.dsupportContactCard}>{content}</a>;
        })}
      </div>
    </div>
  );
}
