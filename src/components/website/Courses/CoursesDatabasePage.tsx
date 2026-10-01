"use client";

import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './Courses.module.css';
import LoadingIndicator from '@/components/common/LoadingIndicator';

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  sessions: number;
  price_minor: number;
  compare_at_price_minor: number | null;
  delivery_mode: 'live' | 'recorded';
  product_courses: { course_id: string }[];
};

type Filter = 'all' | 'live' | 'recorded';

const categories: { label: string; filter: Filter }[] = [
  { label: 'Recommended', filter: 'all' },
  { label: 'Live Sessions', filter: 'live' },
  { label: 'Recorded Sessions', filter: 'recorded' },
];

function CourseSection({ title, products }: { title: string; products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'next' | 'prev') => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`.${styles.coursesMarketplaceCard}`);
    track.scrollBy({
      left: (card?.offsetWidth ?? 280) * (direction === 'next' ? 1 : -1),
      behavior: 'smooth',
    });
  };

  if (!products.length) return null;

  return (
    <section className={styles.coursesMarketplaceSection}>
      <div className={styles.coursesMarketplaceHeadingRow}>
        <h2 className={styles.coursesMarketplaceSectionTitle}>{title}</h2>
      </div>
      <div className={styles.coursesMarketplaceSlider}>
        <div className={styles.coursesMarketplaceTrack} ref={trackRef}>
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/courses/${product.slug}`}
              className={styles.coursesMarketplaceCard}
              aria-label={`View ${product.title}`}
            >
              <div className={styles.coursesMarketplaceImageWrapper}>
                {product.compare_at_price_minor !== null && product.compare_at_price_minor > product.price_minor && (
                  <span className={styles.coursesMarketplacePremiumBadge}>Special price</span>
                )}
                <Image
                  src="/images/course/career-build-pack.webp"
                  alt=""
                  width={360}
                  height={200}
                  className={styles.coursesMarketplaceImage}
                />
              </div>
              <h3 className={styles.coursesMarketplaceCardTitle}>{product.title}</h3>
              <p className={styles.courseMarketplaceMeta}>
                {product.delivery_mode === 'live' ? 'Live sessions' : 'Recorded'}
                {product.sessions > 0 ? ` · ${product.sessions} sessions` : ''}
              </p>
              <p className={styles.courseMarketplaceDescription}>{product.description}</p>
              <div className={styles.courseMarketplacePrice}>
                <strong>₹{Math.round(product.price_minor / 100).toLocaleString('en-IN')}</strong>
                {product.compare_at_price_minor !== null && product.compare_at_price_minor > product.price_minor && (
                  <del>₹{Math.round(product.compare_at_price_minor / 100).toLocaleString('en-IN')}</del>
                )}
                <span>View course →</span>
              </div>
            </Link>
          ))}
        </div>
        {products.length > 4 && (
          <>
            <button type="button" className={`${styles.coursesMarketplaceSliderArrow} ${styles.coursesMarketplaceSliderArrowPrev}`} onClick={() => scroll('prev')} aria-label={`Previous ${title} courses`}>‹</button>
            <button type="button" className={`${styles.coursesMarketplaceSliderArrow} ${styles.coursesMarketplaceSliderArrowNext}`} onClick={() => scroll('next')} aria-label={`Next ${title} courses`}>›</button>
          </>
        )}
      </div>
    </section>
  );
}

export default function CoursesDatabasePage() {
  const [activeTab, setActiveTab] = useState<Filter>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void supabase
      .from('store_products')
      .select('id,slug,title,description,sessions,price_minor,compare_at_price_minor,delivery_mode,product_courses(course_id)')
      .eq('status', 'published')
      .order('created_at', { ascending: true })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) setError('Course listings are temporarily unavailable. Please try again shortly.');
        else setProducts((data || []) as Product[]);
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const filtered = products.filter((product) => activeTab === 'all' || product.delivery_mode === activeTab);
  const live = filtered.filter((product) => product.delivery_mode === 'live');
  const recorded = filtered.filter((product) => product.delivery_mode === 'recorded');

  return (
    <main className={styles.coursesMarketplacePage}>
      <div className={styles.coursesMarketplaceCategoryBar}>
        <nav className={styles.coursesMarketplaceCategoryContainer} aria-label="Course categories">
          {categories.map(({ label, filter }) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeTab === filter}
              className={`${styles.coursesMarketplaceCategoryItem} ${activeTab === filter ? styles.courseMarketplaceActiveCategory : ''}`}
              onClick={() => setActiveTab(filter)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.coursesMarketplaceContainer}>
        <header className={styles.courseMarketplaceIntro}>
          <p>Learn with CleverLN</p>
          <h1>Build skills for what comes next.</h1>
          <span>Explore practical courses led by people who know the work.</span>
        </header>
        {loading ? (
          <div className={styles.catalogLoadingLabel} aria-live="polite"><LoadingIndicator large label="Loading courses" /></div>
        ) : error ? (
          <p className={styles.courseMarketplaceStatus} role="alert">{error}</p>
        ) : filtered.length === 0 ? (
          <p className={styles.courseMarketplaceStatus}>No published courses found.</p>
        ) : (
          <>
            {activeTab === 'all' && <CourseSection title="Recommended for you" products={filtered.slice(0, 7)} />}
            {(activeTab === 'all' || activeTab === 'live') && <CourseSection title="Live sessions" products={live} />}
            {(activeTab === 'all' || activeTab === 'recorded') && <CourseSection title="Recorded sessions" products={recorded} />}
          </>
        )}
      </div>
    </main>
  );
}
