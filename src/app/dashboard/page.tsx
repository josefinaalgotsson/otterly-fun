import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Trainer } from "@/types/database";

export const metadata: Metadata = {
  title: "Trainer Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  // Get trainer info
  const { data: trainerData } = await supabase
    .from("trainers")
    .select("*")
    .eq("email", user.email!)
    .single();

  const trainer = trainerData as unknown as Trainer | null;

  if (!trainer) {
    redirect("/dashboard/login");
  }

  // Get upcoming sessions
  const { data: sessions } = await supabase
    .from("course_sessions")
    .select(
      `
      id,
      day_of_week,
      start_time,
      end_time,
      start_date,
      end_date,
      spots_available,
      status,
      courses (
        title,
        level,
        max_participants
      )
    `
    )
    .eq("trainer_id", trainer.id)
    .gte("end_date", new Date().toISOString().split("T")[0])
    .order("start_date", { ascending: true });

  // Get recent bookings count
  const { count: recentBookings } = await supabase
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .in(
      "session_id",
      (sessions || []).map((s) => s.id)
    );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {trainer.full_name}! 🦦
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s an overview of your swim school.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Active Sessions</p>
          <p className="text-3xl font-bold text-gray-900">
            {sessions?.length || 0}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-gray-900">
            {recentBookings || 0}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            Total Spots Available
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {sessions?.reduce((acc, s) => acc + s.spots_available, 0) || 0}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link
          href="/dashboard/sessions"
          className="bg-[#0077b6] text-white rounded-xl p-6 hover:bg-[#005f8d] transition-colors block"
        >
          <h3 className="text-lg font-semibold mb-2">📋 Manage Sessions</h3>
          <p className="text-blue-100 text-sm">
            View your sessions, log attendance, and track progress.
          </p>
        </Link>
        <Link
          href="/dashboard/courses"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0077b6] transition-colors block"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            📚 Manage Courses
          </h3>
          <p className="text-gray-500 text-sm">
            Create, edit, and manage your swim courses.
          </p>
        </Link>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Upcoming Sessions
        </h2>
        {sessions && sessions.length > 0 ? (
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session) => {
              const course = session.courses as unknown as {
                title: string;
                level: string;
                max_participants: number;
              } | null;
              return (
                <div
                  key={session.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {course?.title || "Unknown Course"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {session.day_of_week}s {session.start_time}–
                      {session.end_time} |{" "}
                      {new Date(session.start_date).toLocaleDateString("sv-SE")}{" "}
                      →{" "}
                      {new Date(session.end_date).toLocaleDateString("sv-SE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {(course?.max_participants || 0) -
                        session.spots_available}
                      /{course?.max_participants || 0} booked
                    </span>
                    <Link
                      href={`/dashboard/sessions/${session.id}/log`}
                      className="text-[#0077b6] hover:underline text-sm font-medium"
                    >
                      Log Session →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming sessions.</p>
        )}
      </div>
    </div>
  );
}
