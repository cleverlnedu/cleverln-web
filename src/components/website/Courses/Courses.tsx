"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./Courses.module.css";
import LoadingIndicator from "@/components/common/LoadingIndicator";

type Product = {
  id: string; slug: string; title: string; description: string; thumbnail_url: string;
  category: string; rating: number | null; review_count: number | null;
  is_featured: boolean; is_recommended: boolean; is_trending: boolean; display_order: number;
};

let cachedCourseProducts: Product[] | null = null;
let cachedCourseProductsAt = 0;
let courseProductsRequest: Promise<{ products: Product[] | null; failed: boolean }> | null = null;
const COURSE_CACHE_TTL = 2 * 60 * 1000;
const COURSE_CACHE_KEY = "cleverln:published-courses:v1";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function CourseCard({ course }: { course: Product }) {
  const image = course.thumbnail_url || "/images/search-section/ai.webp";
  return <Link href={`/courses/${course.slug}`} className={styles.coursesMarketplaceCard}>
    <div className={styles.coursesMarketplaceImageWrapper}>
      {course.is_featured && <span className={styles.coursesMarketplacePremiumBadge}>✷ Most Placed</span>}
      <Image src={image} alt={course.title} width={320} height={180} className={styles.coursesMarketplaceImage} unoptimized={image.startsWith("http")} />
    </div>
    <h3 className={styles.coursesMarketplaceCardTitle}>{course.title}</h3>
    {course.rating !== null && course.review_count !== null ? <div className={styles.coursesMarketplaceRating}>
      <span className={styles.coursesMarketplaceRatingNumber}>{course.rating.toFixed(1)}</span>
      <span className={styles.coursesMarketplaceStars}><span className={styles.coursesMarketplaceStarsEmpty}>★★★★★</span>
        <span className={styles.coursesMarketplaceStarsFill} style={{ width: `${Math.max(0, Math.min(100, course.rating / 5 * 100))}%` }}>★★★★★</span>
      </span>
      <span className={styles.coursesMarketplaceReviewCount}>({course.review_count.toLocaleString("en-IN")})</span>
    </div> : null}
  </Link>;
}

function CourseSection({ title, courses, sectionId }: { title: string; courses: Product[]; sectionId: string }) {
  const track = useRef<HTMLDivElement>(null);
  if (!courses.length) return null;
  const scroll = (direction: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector(`.${styles.coursesMarketplaceCard}`) as HTMLElement | null;
    el.scrollBy({ left: direction * ((card?.offsetWidth ?? 240) + 32), behavior: "smooth" });
  };
  return <section id={sectionId} className={styles.coursesMarketplaceSection}>
    <div className={styles.coursesMarketplaceHeadingRow}><h2 className={styles.coursesMarketplaceSectionTitle}>{title}</h2></div>
    <div className={styles.coursesMarketplaceSlider}>
      <div ref={track} className={styles.coursesMarketplaceTrack}>{courses.map((course) => <CourseCard key={course.id} course={course} />)}</div>
      {courses.length > 5 && <button type="button" className={`${styles.coursesMarketplaceSliderArrow} ${styles.coursesMarketplaceSliderArrowNext}`} onClick={() => scroll(1)} aria-label={`Next ${title} courses`}>❯</button>}
    </div>
  </section>;
}

function CourseCatalogLoading() {
  return <div className={styles.catalogLoading} role="status" aria-label="Loading courses">
    {["Recommended for you", "Trending Courses in CleverLN"].map((title) => <section key={title} className={styles.coursesMarketplaceSection}>
      <div className={`${styles.catalogSkeleton} ${styles.catalogSkeletonHeading}`} />
      <div className={styles.catalogSkeletonRow}>{Array.from({ length: 5 }, (_, index) => <div className={styles.catalogSkeletonCard} key={index}>
        <div className={`${styles.catalogSkeleton} ${styles.catalogSkeletonImage}`} />
        <div className={`${styles.catalogSkeleton} ${styles.catalogSkeletonTitle}`} />
        <div className={`${styles.catalogSkeleton} ${styles.catalogSkeletonRating}`} />
      </div>)}</div>
    </section>)}
    <div
      className={styles.catalogLoadingLabel}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        width: "100vw",
        minHeight: "100vh",
        zIndex: 1200,
        pointerEvents: "none",
      }}
    >
      <LoadingIndicator large label="Loading courses" />
    </div>
  </div>;
}

export default function Courses() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    if (cachedCourseProducts === null) {
      try {
        const stored = sessionStorage.getItem(COURSE_CACHE_KEY);
        if (stored) {
          const parsed: unknown = JSON.parse(stored);
          if (parsed && typeof parsed === "object" && "products" in parsed && "savedAt" in parsed &&
            Array.isArray(parsed.products) && typeof parsed.savedAt === "number") {
            cachedCourseProducts = parsed.products as Product[];
            cachedCourseProductsAt = parsed.savedAt;
          }
        }
      } catch {
        // Ignore malformed or unavailable browser storage and fetch fresh data.
      }
    }
    const initialCachedProducts = cachedCourseProducts;
    const hasCachedProducts = initialCachedProducts !== null;
    if (hasCachedProducts) {
      setProducts(initialCachedProducts);
      setLoading(false);
    }

    if (hasCachedProducts && Date.now() - cachedCourseProductsAt < COURSE_CACHE_TTL) {
      return () => { active = false; };
    }

    if (!courseProductsRequest) {
      courseProductsRequest = Promise.resolve().then(() => supabase.from("store_products")
        .select("id,slug,title,description,thumbnail_url,category,rating,review_count,is_featured,is_recommended,is_trending,display_order")
        .eq("status", "published").order("display_order", { ascending: true }))
        .then(({ data, error: queryError }) => ({
          products: queryError ? null : (data ?? []) as Product[],
          failed: Boolean(queryError),
        }));
    }

    const request = courseProductsRequest!;
    void request.then(({ products: nextProducts, failed }) => {
      if (courseProductsRequest === request) courseProductsRequest = null;
      if (!failed && nextProducts) {
        cachedCourseProducts = nextProducts;
        cachedCourseProductsAt = Date.now();
        try {
          sessionStorage.setItem(COURSE_CACHE_KEY, JSON.stringify({ products: nextProducts, savedAt: cachedCourseProductsAt }));
        } catch {
          // In-memory caching still works when browser storage is unavailable.
        }
      }
      if (!active) return;
      if (failed) {
        if (!hasCachedProducts) setError("We couldn’t load courses right now. Please refresh to try again.");
      } else {
        setProducts(nextProducts ?? []);
        setError("");
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category).filter(Boolean))], [products]);
  return <main className={styles.coursesMarketplacePage}>
    {!loading && products.length > 0 && <div className={styles.coursesMarketplaceCategoryBar}><nav className={styles.coursesMarketplaceCategoryContainer}>
      {categories.map((category) => <a key={category} href={`#${slugify(category)}`} className={styles.coursesMarketplaceCategoryItem}>{category}</a>)}
    </nav></div>}
    <div className={styles.coursesMarketplaceContainer}>
      {loading && <CourseCatalogLoading />}
      {error && <p role="alert" className={styles.courseCatalogStatus}>{error}</p>}
      {!loading && !error && products.length === 0 && <p className={styles.courseCatalogStatus}>New courses are coming soon.</p>}
      {!loading && !error && <>
        <CourseSection title="Recommended for you" sectionId="recommended" courses={products.filter((p) => p.is_recommended)} />
        <CourseSection title="Trending Courses in CleverLN" sectionId="trending" courses={products.filter((p) => p.is_trending)} />
        {categories.map((category) => <CourseSection key={category} title={category} sectionId={slugify(category)} courses={products.filter((p) => p.category === category)} />)}
      </>}
    </div>
  </main>;
}
