import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CourseCard } from "@/components/courses/CourseCard";
import type { CourseWithSessions } from "@/types/database";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse our swim courses for children of all ages and levels — from baby swim to advanced stroke training.",
};

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      course_sessions (
        id,
        start_date,
        end_date,
        day_of_week,
        start_time,
        end_time,
        spots_available,
        status
      )
    `
    )
    .eq("is_active", true)
    .order("price_cents", { ascending: true });

  const typedCourses = (courses || []) as unknown as CourseWithSessions[];

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            From first splashes to confident swimming — we have a course for
            every age and level.
          </p>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
              (level) => (
                <span
                  key={level}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700"
                >
                  {level}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">
                No courses available at the moment.
              </p>
              <p className="text-gray-400">
                Check back soon — new courses are added regularly!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How do I know which level is right for my child?",
                a: "Our levels are based on age and experience. Beginners are for children with no prior swim experience, Intermediate is for those who are comfortable in water but can't swim independently, and Advanced is for children who can swim but want to improve their technique.",
              },
              {
                q: "What if my child is nervous about water?",
                a: "That's completely normal! Our instructors are experienced in working with nervous swimmers. We use gentle, playful approaches to help children build confidence at their own pace.",
              },
              {
                q: "How many children are in each group?",
                a: "We keep groups small — typically 6–8 children maximum — to ensure every child gets personal attention and supervision.",
              },
              {
                q: "Do I need to be in the water with my child?",
                a: "For our Little Otters class (3–12 months), a parent or guardian joins the child in the water. For all other levels, parents watch from the poolside.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
