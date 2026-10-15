"use client";

import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CalendarCheck, List } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import styles from './MyCourses.module.css';

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  grantedAt: string;
  progress: { percentComplete?: number } | null;
};

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        if (active) {
          setError('Sign in to view your courses.');
          setLoading(false);
        }
        return;
      }
      const response = await fetch('/api/my-courses', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const result = await response.json();
      if (!active) return;
      if (!response.ok) setError(result.error || 'Could not load your courses.');
      else setCourses(result.courses || []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const hasCourses = !loading && !error && courses.length > 0;

  return (
    <motion.section
      className={styles.mcourseRoot}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {hasCourses ? (
        <div className={styles.mcoursePurchasedCard}>
          <p className={styles.mcourseSectionTitle}>Course</p>

          {courses.map((course, index) => {
            const percent = Math.round(Math.min(100, Math.max(0, course.progress?.percentComplete ?? 0)));
            return (
              <Fragment key={course.id}>
                {index > 0 && <div className={styles.courseDivider} />}

                <div className={styles.mcourseProductRow}>
                  <div className={styles.mcourseBanner}>
                    <Image
                      src={course.thumbnail_url || '/images/search-section/hr12.png'}
                      alt={course.title}
                      fill
                      sizes="(max-width: 992px) 100vw, 420px"
                      className={styles.mcourseBannerImage}
                      unoptimized={Boolean(course.thumbnail_url?.startsWith('http'))}
                    />
                  </div>

                  <div className={styles.mcourseContent}>
                    <h2 className={styles.mcourseTitle}>{course.title}</h2>

                    <div className={styles.mcourseMeta}>
                      <span><List size={15} />{percent > 0 ? `${percent}% completed` : 'Not started yet'}</span>
                      <span><CalendarCheck size={15} />Access granted {new Date(course.grantedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>

                    <div className={styles.mcourseLine} />

                    {course.description && <p className={styles.mcourseDescription}>{course.description}</p>}
                  </div>
                </div>

                <a className={`${styles.mcourseApplyButton} ${styles.courseOpenButton}`} href={`https://lms.cleverln.com/courses/${course.id}`}>
                  {percent > 0 ? 'Continue Learning' : 'Start Learning'}
                </a>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <div className={styles.mcourseEmptyCard}>
          <p className={styles.mcourseSectionTitle}>Course</p>

          <div className={styles.mcourseEmptyBody}>
            {loading ? (
              <LoadingIndicator label="Loading your courses" />
            ) : error ? (
              <p className={styles.courseError} role="alert">{error}</p>
            ) : (
              <>
                <Image
                  src="/images/dashboard/course-empty.svg"
                  alt=""
                  width={22}
                  height={22}
                  className={styles.mcourseEmptyIcon}
                />
                <h4 className={styles.mcourseEmptyHeading}>No Course Purchased Yet</h4>
                <Link href="/courses" className={`${styles.mcourseEmptyButton} ${styles.courseEmptyLink}`}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}
