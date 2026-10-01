"use client";

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './MyCourses.module.css';
import LoadingIndicator from '@/components/common/LoadingIndicator';

type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  grantedAt: string;
  progress: { percentComplete?: number };
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

  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Your learning</p>
          <h2 className={styles.title}>My courses</h2>
        </div>
        <Link className={styles.browseLink} href="/courses">Browse courses</Link>
      </header>
      {loading ? (
        <div className={styles.message}><LoadingIndicator label="Loading course access" /></div>
      ) : error ? (
        <p className={styles.error} role="alert">{error}</p>
      ) : courses.length === 0 ? (
        <p className={styles.message}>Your purchased courses will appear here.</p>
      ) : (
        <div className={styles.list}>
          {courses.map((course) => (
            <article className={styles.course} key={course.id}>
              <div className={styles.courseInfo}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <p className={styles.courseDescription}>{course.description}</p>
                <p className={styles.accessDate}>Access granted {new Date(course.grantedAt).toLocaleDateString()}</p>
              </div>
              <Link className={styles.openButton} href={`https://lms.cleverln.com/courses/${course.id}`}>Open course</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
