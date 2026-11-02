import { faqJsonLd, getCourseFaqs } from "@/components/website/Courses/courseFaqs";
import CourseDetail from "./CourseDetail";
import { COURSE_SELECT, fetchPublishedCourse, toCourseProduct, type CourseRow } from "./courseData";

// The course is read on the server so the whole page is in the first HTML. With no short loading screen,
// a refresh on a phone keeps its place instead of landing on the footer that used to sit under the loader.
export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await fetchPublishedCourse<CourseRow>(slug, COURSE_SELECT);
  return (
    <>
      {/* the course FAQ as structured data, so search engines can read the questions and answers */}
      {row && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(getCourseFaqs(row).faqs) }} />}
      <CourseDetail slug={slug} initialProduct={row ? toCourseProduct(row) : null} />
    </>
  );
}
