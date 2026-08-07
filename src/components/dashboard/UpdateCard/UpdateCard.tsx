"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./UpdateCard.module.css";

interface UpdateCardProps {
  department: string;
  title: string;
  description: string;
  author: string;
  designation: string;
  avatar: string;
  time: string;
  featured?: boolean;
}

export default function UpdateCard({
  department,
  title,
  description,
  author,
  designation,
  avatar,
  time,
  featured = false,
}: UpdateCardProps) {
  return (
    <motion.article
      className={`${styles.dupCard} ${
        featured ? styles.dupFeatured : ""
      }`}
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {/* Top */}

      <div className={styles.dupTop}>
        <p className={styles.dupDepartment}>
          From {department}
        </p>

        <span className={styles.dupTime}>
          {time}
        </span>
      </div>

      {/* Title */}

      <h2 className={styles.dupTitle}>
        {title}
      </h2>

      {/* Description */}

      <p className={styles.dupDescription}>
        {description}
      </p>

      {/* Footer */}

      <div className={styles.dupFooter}>
        <div className={styles.dupUser}>
          <div className={styles.dupAvatar}>
            <Image
              src={avatar}
              alt={author}
              fill
              className={styles.dupAvatarImage}
            />
          </div>

          <p className={styles.dupAuthor}>
            <span className={styles.dupAuthorName}>
              {author}
            </span>

            <span className={styles.dupComma}>
              ,
            </span>

            <span className={styles.dupRole}>
              {" "}
              {designation}
            </span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}