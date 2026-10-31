import type { Metadata } from "next";

type CourseMeta = { title: string; description: string | null };

// Read on the server so the browser tab (and search results) show the course name straight away.
async function getCourseMeta(slug: string): Promise<CourseMeta | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const query = new URLSearchParams({ select: "title,description", slug: `eq.${slug}`, status: "eq.published", limit: "1" });
    const response = await fetch(`${url}/rest/v1/store_products?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const [course] = (await response.json()) as CourseMeta[];
    return course ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseMeta(slug);
  if (!course) return { title: "Course not found" };

  const name = /course$/i.test(course.title.trim()) ? course.title.trim() : `${course.title.trim()} Course`;
  const description = course.description?.replace(/\s+/g, " ").trim();
  return {
    title: name,
    description: description ? (description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description) : undefined,
  };
}

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
