import type { Metadata } from "next";
import Courses from "@/components/website/Courses/Courses";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  return <Courses />;
}