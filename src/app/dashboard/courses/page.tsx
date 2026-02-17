import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types/database";

export const metadata: Metadata = {
  title: "Manage Courses",
};

export default async function ManageCoursesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  const { data: trainerData } = await supabase
    .from("trainers")
    .select("id")
    .eq("email", user.email!)
    .single();

  const trainer = trainerData as unknown as { id: string } | null;

  if (!trainer) {
    redirect("/dashboard/login");
  }

  // Get all courses (trainers can manage all courses in this simple implementation)
  const { data: courses } = await supabase
    .from("courses")
    .select(
      `
      *,
      course_sessions (
        id,
        spots_available,
        status
      )
    `
    )
    .order("created_at", { ascending: false });

  type CourseWithSessionInfo = Course & {
    course_sessions: { id: string; spots_available: number; status: string }[];
  };
  const typedCourses = (courses || []) as unknown as CourseWithSessionInfo[];

  const levelColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
          <p className="text-gray-500 mt-1">
            View and manage your swim school courses.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-[#0077b6] hover:underline text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Course List */}
      {typedCourses.length > 0 ? (
        <div className="space-y-4">
          {typedCourses.map((course) => {
            const sessions = course.course_sessions;
            const totalSessions = sessions?.length || 0;
            const openSessions =
              sessions?.filter((s) => s.status === "open").length || 0;

            return (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          levelColors[course.level] || ""
                        }`}
                      >
                        {course.level}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          course.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                      <span>💰 {formatPrice(course.price_cents)}</span>
                      <span>👥 Max {course.max_participants}</span>
                      <span>
                        📅 {openSessions}/{totalSessions} sessions open
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg text-sm border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-2">No courses yet.</p>
          <p className="text-gray-400">
            Course creation will be available soon.
          </p>
        </div>
      )}
    </div>
  );
}
