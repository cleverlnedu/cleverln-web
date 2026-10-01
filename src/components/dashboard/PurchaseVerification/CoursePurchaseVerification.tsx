"use client";

import Image from "next/image";
import { List, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import styles from "./PurchaseVerification.module.css";

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url: string;
  price_minor: number;
  compare_at_price_minor: number | null;
  sessions: number;
  delivery_mode: "live" | "recorded";
  product_courses: { course_id: string }[];
};

type OwnedCourse = { id: string; slug: string };
type CheckoutState = "loading" | "ready" | "pending" | "paid" | "owned" | "error";

export default function CoursePurchaseVerification({ courseSlug }: { courseSlug: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [state, setState] = useState<CheckoutState>("loading");
  const [ownedCourseId, setOwnedCourseId] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [idempotencyKey, setIdempotencyKey] = useState("");

  useEffect(() => {
    let active = true;
    void (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace(`/login?next=${encodeURIComponent(`/dashboard?verify=true&course=${courseSlug}`)}`);
        return;
      }

      const { data, error: productError } = await supabase.from("store_products")
        .select("id,slug,title,description,thumbnail_url,price_minor,compare_at_price_minor,sessions,delivery_mode,product_courses(course_id)")
        .eq("slug", courseSlug).eq("status", "published").maybeSingle();
      if (!active) return;
      if (productError || !data) {
        setError("This course is no longer available for purchase.");
        setState("error");
        return;
      }

      const currentProduct = data as Product;
      setProduct(currentProduct);
      const response = await fetch("/api/my-courses", { headers: { Authorization: `Bearer ${session.access_token}` } });
      if (!active) return;
      if (response.ok) {
        const result = await response.json() as { courses: OwnedCourse[] };
        const mappedCourseIds = currentProduct.product_courses.map((course) => course.course_id);
        const owned = result.courses?.find((course) => mappedCourseIds.includes(course.id));
        if (owned) {
          setOwnedCourseId(owned.id);
          setState("owned");
          return;
        }
      }
      setIdempotencyKey(crypto.randomUUID());
      setState("ready");
    })().catch((cause) => {
      if (!active) return;
      setError(cause instanceof Error ? cause.message : "Could not load the checkout.");
      setState("error");
    });
    return () => { active = false; };
  }, [courseSlug, router]);

  const startMockPayment = async () => {
    if (!product || !acceptedTerms || !idempotencyKey) return;
    setState("pending");
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Your session expired. Sign in again.");
      const response = await fetch("/api/mock-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ productId: product.id, idempotencyKey }),
      });
      const result = await response.json();
      if (response.status === 409 && /already have access/i.test(result.error || "")) {
        const mappedCourse = product.product_courses[0]?.course_id || "";
        setOwnedCourseId(mappedCourse);
        setState("owned");
        return;
      }
      if (!response.ok) throw new Error(result.error || "Test checkout failed.");
      setOrderId(result.orderId);
      setOwnedCourseId(product.product_courses[0]?.course_id || "");
      setState("paid");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Test checkout failed.");
      setState("error");
    }
  };

  const openCourse = () => {
    if (ownedCourseId) window.location.assign(`https://lms.cleverln.com/courses/${ownedCourseId}`);
    else router.push("/dashboard");
  };

  if (state === "loading") return <section className={styles.dpurchaseRoot}><div className={styles.dpurchaseCard}><LoadingIndicator large label="Loading checkout" /></div></section>;
  if (!product) return <section className={styles.dpurchaseRoot}><div className={styles.dpurchaseCard}><p role="alert">{error || "Checkout is unavailable."}</p></div></section>;

  const price = Math.round(product.price_minor / 100);
  const complete = state === "paid" || state === "owned";

  return <section className={styles.dpurchaseRoot}>
    <div className={styles.dpurchaseCard}>
      <p className={styles.dpurchaseSectionTitle}>Course checkout</p>
      <div className={styles.dpurchaseCourse}>
        <div className={styles.dpurchaseCourseBanner}>
          <Image src={product.thumbnail_url || "/images/course/digital-marketing-banner.webp"} alt={product.title} fill priority className={styles.dpurchaseBannerImage} unoptimized={product.thumbnail_url.startsWith("http")} />
        </div>
        <div className={styles.dpurchaseCourseContent}>
          <h2 className={styles.dpurchaseCourseTitle}>{product.title}</h2>
          <div className={styles.dpurchaseMeta}>
            <span><List size={15} />{product.sessions} sessions</span>
            <span><Star size={15} />{product.delivery_mode === "live" ? "Live course" : "Recorded course"}</span>
          </div>
          <div className={styles.dpurchaseLine} />
          <p className={styles.dpurchaseDescription}>{product.description}</p>
        </div>
      </div>

      <div className={styles.dpurchaseSummary}>
        <h3 className={styles.dpurchaseSummaryTitle}>{state === "paid" ? "PURCHASE COMPLETE" : state === "owned" ? "COURSE ALREADY OWNED" : "COURSE PURCHASE SUMMARY"}</h3>
        <div className={styles.dpurchaseSummaryRow}><span>Course price</span><span>₹{price.toLocaleString("en-IN")}</span></div>
        <div className={styles.dpurchaseSummaryRow}><span>Taxes and platform charges</span><span>Included</span></div>
        <div className={styles.dpurchaseTotal}><span>{complete ? "ACCESS STATUS:" : "TOTAL AMOUNT PAYABLE:"}</span><strong>{complete ? "Ready to learn" : `₹${price.toLocaleString("en-IN")}`}</strong></div>
      </div>

      {state === "pending" && <div className={styles.courseCheckoutStatus}><LoadingIndicator label="Payment pending · completing your test checkout" /></div>}
      {state === "paid" && <div className={styles.courseCheckoutSuccess} role="status"><strong>Mock payment complete.</strong><span>No payment provider was used. Your LMS access is ready.</span>{orderId && <small>Order {orderId}</small>}</div>}
      {state === "owned" && <div className={styles.courseCheckoutSuccess} role="status"><strong>You already have access to this course.</strong><span>You can continue learning from your CleverLN LMS account.</span></div>}
      {error && state === "error" && <p className={styles.courseCheckoutError} role="alert">{error}</p>}

      {!complete && <>
        <label className={styles.dpurchaseTerms}><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} disabled={state === "pending"} /><span>I agree to CleverLN&apos;s Terms & Conditions and Refund Policy.</span></label>
        <button type="button" disabled={!acceptedTerms || state === "pending" || state === "error"} className={styles.dpurchasePayButton} onClick={() => void startMockPayment()}>
          {state === "pending" ? "Processing…" : "Pay Now · Test checkout"}
        </button>
        <p className={styles.courseCheckoutNote}>Development checkout only. No payment is taken.</p>
      </>}
      {complete && <button type="button" className={styles.dpurchasePayButton} onClick={openCourse}>Open course</button>}
      {state === "error" && <button type="button" className={styles.courseCheckoutRetry} onClick={() => { setError(""); setIdempotencyKey(crypto.randomUUID()); setState("ready"); }}>Try checkout again</button>}
    </div>
  </section>;
}
