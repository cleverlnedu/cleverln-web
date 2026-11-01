export type TrendingCourse = { slug: string; title: string };

// Courses for the footer's "Trending Courses" list: the same "trending" flag and order the Courses page uses,
// read on the server and cached for 5 minutes. Returns [] if Supabase can't be reached.
export async function getTrendingCourses(limit = 5): Promise<TrendingCourse[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  try {
    const query = new URLSearchParams({
      select: "slug,title",
      status: "eq.published",
      is_trending: "eq.true",
      order: "display_order.asc.nullslast,title.asc",
      limit: String(limit),
    });
    const response = await fetch(`${url}/rest/v1/store_products?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    return (await response.json()) as TrendingCourse[];
  } catch {
    return [];
  }
}
