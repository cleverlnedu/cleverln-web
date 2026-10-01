import { redirect } from "next/navigation";

export default async function LegacyCourseRoute({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  redirect(`/courses/${encodeURIComponent(courseSlug)}`);
}
