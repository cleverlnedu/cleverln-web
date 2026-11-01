import type { ProductPageCourse } from "@/components/website/ProductPageTemplate";

// Columns the course page needs, including the LMS courses the product unlocks (for the "already owned" check).
export const COURSE_SELECT = "id,slug,title,description,category,price_minor,compare_at_price_minor,product_courses(course_id)";

export type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string | null;
  price_minor: number;
  compare_at_price_minor: number | null;
  product_courses: { course_id: string }[] | null;
};

export type CourseProduct = ProductPageCourse & { id: string; slug: string; product_courses: { course_id: string }[] };

export function toCourseProduct(row: CourseRow): CourseProduct {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    description: row.description,
    priceMinor: row.price_minor,
    compareAtPriceMinor: row.compare_at_price_minor,
    product_courses: row.product_courses || [],
  };
}

// Reads one published course on the server with the public key (the same rows any visitor's browser can read).
export async function fetchPublishedCourse<T>(slug: string, select: string): Promise<T | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const query = new URLSearchParams({ select, slug: `eq.${slug}`, status: "eq.published", limit: "1" });
    const response = await fetch(`${url}/rest/v1/store_products?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const [row] = (await response.json()) as T[];
    return row ?? null;
  } catch {
    return null;
  }
}
