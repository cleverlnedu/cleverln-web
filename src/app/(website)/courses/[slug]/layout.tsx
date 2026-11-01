import type { Metadata } from "next";
import { fetchPublishedCourse } from "./courseData";

type CourseMeta = { title: string; description: string | null };

// Read on the server so the browser tab (and search results) show the course name straight away.
function getCourseMeta(slug: string) {
  return fetchPublishedCourse<CourseMeta>(slug, "title,description");
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
