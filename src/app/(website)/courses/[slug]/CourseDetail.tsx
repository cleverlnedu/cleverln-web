"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { lmsUrl } from "@/lib/lmsUrl";
import { supabase } from "@/lib/supabase";
import ProductPageTemplate from "@/components/website/ProductPageTemplate";
import PageLoader from "@/components/common/PageLoader";
import styles from "@/components/website/Courses/CourseDetail.module.css";
import { COURSE_SELECT, toCourseProduct, type CourseProduct, type CourseRow } from "./courseData";

type AccessibleCourse = { id: string; slug: string };

// The course normally arrives from the server; if that read failed it is fetched here instead.
// Whether the visitor already owns it, and checkout, need their session, so they stay in the browser.
export default function CourseDetail({ slug, initialProduct }: { slug: string; initialProduct: CourseProduct | null }) {
  const router = useRouter();
  const [product, setProduct] = useState<CourseProduct | null>(initialProduct);
  const [ownedCourseId, setOwnedCourseId] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    void (async () => {
      let currentProduct = initialProduct;
      if (!currentProduct) {
        const { data, error } = await supabase.from("store_products")
          .select(COURSE_SELECT)
          .eq("slug", slug).eq("status", "published").maybeSingle();
        if (!active) return;
        if (error || !data) {
          setLoadError("This course could not be found.");
          return;
        }
        currentProduct = toCourseProduct(data as CourseRow);
        setProduct(currentProduct);
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !active) return;
      const response = await fetch("/api/my-courses", { headers: { Authorization: `Bearer ${session.access_token}` } });
      if (!response.ok || !active) return;
      const result = await response.json() as { courses: AccessibleCourse[] };
      const mappedCourseIds = currentProduct.product_courses.map((course) => course.course_id);
      const ownedCourse = result.courses?.find((course) => mappedCourseIds.includes(course.id));
      if (ownedCourse && active) setOwnedCourseId(ownedCourse.id);
    })().catch(() => {
      if (active) setLoadError("We couldn’t load this course. Please try again.");
    });
    return () => { active = false; };
  }, [slug, initialProduct]);

  const openCheckoutProfile = useCallback(async () => {
    if (!product) return;
    const checkoutPath = `/dashboard?verify=true&course=${encodeURIComponent(product.slug)}`;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push(`/login?next=${encodeURIComponent(checkoutPath)}`);
      return;
    }
    if (!session.user.user_metadata?.phone_number) {
      router.push(`/profile-complete?next=${encodeURIComponent(checkoutPath)}`);
      return;
    }
    router.push(checkoutPath);
  }, [product, router]);

  if (loadError) return <main className={styles.detailPage}><div className={styles.detailWrap} role="alert">{loadError}</div></main>;
  if (!product) return <main className={styles.detailPage}><div className={`${styles.detailWrap} ${styles.detailLoadingCenter}`}><PageLoader label="Loading course" /></div></main>;

  return <ProductPageTemplate
    course={product}
    owned={Boolean(ownedCourseId)}
    onBuyNow={() => void openCheckoutProfile()}
    onOpenCourse={() => ownedCourseId && window.location.assign(lmsUrl(`/courses/${ownedCourseId}`))}
  />;
}
