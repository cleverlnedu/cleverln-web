"use client";

import { lmsUrl } from '@/lib/lmsUrl';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { CalendarCheck, List } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import LoadingIndicator from '@/components/common/LoadingIndicator';
// The course card deliberately shares the Job card's look, so it uses the same styles.
import cardStyles from '@/components/dashboard/JobCard/JobCard.module.css';
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
  const router = useRouter();
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
      className={cardStyles.djobRoot}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {hasCourses ? (
        <div className={cardStyles.djobPurchasedCard}>
          <p className={cardStyles.djobSectionTitle}>Course</p>

          {courses.map((course, index) => {
            const percent = Math.round(Math.min(100, Math.max(0, course.progress?.percentComplete ?? 0)));
            return (
              <Fragment key={course.id}>
                {index > 0 && <div className={styles.courseDivider} />}

                <div className={cardStyles.djobProductRow}>
                  <div className={cardStyles.djobBanner}>
                    <Image
                      src={course.thumbnail_url || '/images/search-section/hr12.png'}
                      alt={course.title}
                      fill
                      sizes="(max-width: 992px) 100vw, 420px"
                      className={cardStyles.djobBannerImage}
                      unoptimized={Boolean(course.thumbnail_url?.startsWith('http'))}
                    />
                  </div>

                  <div className={cardStyles.djobContent}>
                    <h2 className={cardStyles.djobTitle}>{course.title}</h2>

                    <div className={cardStyles.djobMeta}>
                      <span><List size={15} />{percent > 0 ? `${percent}% completed` : 'Not started yet'}</span>
                      <span><CalendarCheck size={15} />Access granted {new Date(course.grantedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>

                    <div className={cardStyles.djobLine} />

                    {course.description && <p className={cardStyles.djobDescription}>{course.description}</p>}
                  </div>
                </div>

                <a className={`${cardStyles.djobApplyButton} ${styles.courseOpenButton}`} href={lmsUrl(`/courses/${course.id}`)}>
                  {percent > 0 ? 'Continue Learning' : 'Start Learning'}
                </a>
              </Fragment>
            );
          })}
        </div>
      ) : (
        <div className={cardStyles.djobEmptyCard}>
          <p className={cardStyles.djobSectionTitle}>Course</p>

          <div className={cardStyles.djobEmptyBody}>
            {loading ? (
              <LoadingIndicator label="Loading your courses" />
            ) : error ? (
              <p className={styles.courseError} role="alert">{error}</p>
            ) : (
              <>
                <Image
                  src="/images/dashboard/course-empty.svg"
                  alt=""
                  width={42}
                  height={42}
                  className={cardStyles.djobEmptyIcon}
                />
                <h4 className={cardStyles.djobEmptyHeading}>No Course Purchased Yet</h4>
                <button type="button" className={cardStyles.djobEmptyButton} onClick={() => router.push('/courses')}>
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}
