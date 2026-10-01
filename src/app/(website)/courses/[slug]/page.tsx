"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProductPageTemplate, { type ProductPageCourse } from "@/components/website/ProductPageTemplate";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import styles from "@/components/website/Courses/CourseDetail.module.css";

type Product = ProductPageCourse & { id: string; slug: string; product_courses: { course_id: string }[] };
type AccessibleCourse = { id: string; slug: string };

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [ownedCourseId, setOwnedCourseId] = useState("");
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data, error } = await supabase.from("store_products")
        .select("id,slug,title,description,price_minor,compare_at_price_minor,product_courses(course_id)")
        .eq("slug", slug).eq("status", "published").maybeSingle();
      if (!active) return;
      if (error || !data) {
        setLoadError("This course could not be found.");
        return;
      }
      const currentProduct: Product = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description,
        priceMinor: data.price_minor,
        compareAtPriceMinor: data.compare_at_price_minor,
        product_courses: data.product_courses || [],
      };
      setProduct(currentProduct);

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
  }, [slug]);

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
  if (!product) return <main className={styles.detailPage}><div className={`${styles.detailWrap} ${styles.detailLoadingCenter}`}><LoadingIndicator large label="Loading course" /></div></main>;

  return <ProductPageTemplate
    course={product}
    owned={Boolean(ownedCourseId)}
    onBuyNow={() => void openCheckoutProfile()}
    onOpenCourse={() => ownedCourseId && window.location.assign(`https://lms.cleverln.com/courses/${ownedCourseId}`)}
  />;
}
