import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Sessions",
};

export default async function SessionsPage() {
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
        id,
        title,
        level,
        max_participants
      )
    `
    )
    .eq("trainer_id", trainer.id)
    .order("start_date", { ascending: false });

  const now = new Date().toISOString().split("T")[0];
  const upcoming =
    sessions?.filter((s) => s.end_date >= now) || [];
  const past = sessions?.filter((s) => s.end_date < now) || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Sessions</h1>
          <p className="text-gray-500 mt-1">
            View and manage your course sessions.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-[#0077b6] hover:underline text-sm font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Upcoming Sessions */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Upcoming & Active ({upcoming.length})
        </h2>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((session) => {
              const course = session.courses as unknown as {
                id: string;
                title: string;
                level: string;
                max_participants: number;
              } | null;
              const enrolled =
                (course?.max_participants || 0) - session.spots_available;

              return (
                <div
                  key={session.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {course?.title || "Unknown"}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          session.status === "open"
                            ? "bg-green-100 text-green-800"
                            : session.status === "full"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {session.day_of_week}s {session.start_time}–
                      {session.end_time}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(session.start_date).toLocaleDateString(
                        "sv-SE"
                      )}{" "}
                      →{" "}
                      {new Date(session.end_date).toLocaleDateString("sv-SE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {enrolled}/{course?.max_participants || 0}
                      </p>
                      <p className="text-xs text-gray-500">enrolled</p>
                    </div>
                    <Link
                      href={`/dashboard/sessions/${session.id}/log`}
                      className="bg-[#0077b6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005f8d] transition-colors"
                    >
                      Session Log
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

      {/* Past Sessions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Past Sessions ({past.length})
        </h2>
        {past.length > 0 ? (
          <div className="space-y-3">
            {past.map((session) => {
              const course = session.courses as unknown as {
                id: string;
                title: string;
                level: string;
                max_participants: number;
              } | null;

              return (
                <div
                  key={session.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 justify-between opacity-75"
                >
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      {course?.title || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {session.day_of_week}s {session.start_time}–
                      {session.end_time} |{" "}
                      {new Date(session.start_date).toLocaleDateString(
                        "sv-SE"
                      )}{" "}
                      →{" "}
                      {new Date(session.end_date).toLocaleDateString("sv-SE")}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/sessions/${session.id}/log`}
                    className="text-[#0077b6] hover:underline text-sm font-medium"
                  >
                    View Logs →
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No past sessions yet.</p>
        )}
      </div>
    </div>
  );
}
