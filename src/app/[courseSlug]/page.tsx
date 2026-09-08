import { notFound } from "next/navigation";

import {
  cleverLNCourses,
} from "@/data/coursesData";


type CoursePageProps = {
  params: Promise<{
    courseSlug: string;
  }>;
};


export default async function CoursePage({
  params,
}: CoursePageProps) {

  const { courseSlug } = await params;


  const course =
    cleverLNCourses.find(
      (item) =>
        item.slug === courseSlug
    );


  if (!course) {
    notFound();
  }


  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "120px 40px",
        background: "#ffffff",
      }}
    >

      <h1>
        {course.title}
      </h1>

      <p>
        {course.description}
      </p>

      <p>
        Rating: {course.rating}
      </p>

    </main>
  );
}