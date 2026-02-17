import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "View the weekly schedule for all Otterly Fun swim courses and find a session that fits your family.",
};

export default async function SchedulePage() {
  const supabase = await createClient();

  const { data: sessions, error } = await supabase
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
        price_cents
      ),
      trainers (
        full_name
      )
    `
    )
    .order("start_date", { ascending: true });

  if (error) {
    console.error("Error fetching sessions:", error);
  }

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Group sessions by day
  const sessionsByDay: Record<string, typeof sessions> = {};
  if (sessions) {
    for (const session of sessions) {
      const day = session.day_of_week;
      if (!sessionsByDay[day]) {
        sessionsByDay[day] = [];
      }
      sessionsByDay[day]!.push(session);
    }
  }

  const levelColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    advanced: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Weekly Schedule</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Find a time that works for your family. Sessions run on a recurring
            weekly basis during the course period.
          </p>
        </div>
      </section>

      {/* Legend */}
      <section className="py-4 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm text-gray-500 font-medium">Levels:</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Advanced
            </span>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {dayOrder.map((day) => {
            const daySessions = sessionsByDay[day];
            if (!daySessions || daySessions.length === 0) return null;

            return (
              <div key={day} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b">
                  {day}
                </h2>
                <div className="space-y-3">
                  {daySessions.map((session) => {
                    const course = session.courses as unknown as {
                      id: string;
                      title: string;
                      level: string;
                      price_cents: number;
                    } | null;
                    const trainer = session.trainers as unknown as {
                      full_name: string;
                    } | null;
                    const isFull =
                      session.status === "full" ||
                      session.spots_available <= 0;

                    return (
                      <div
                        key={session.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border ${
                          isFull
                            ? "bg-gray-50 border-gray-200"
                            : "bg-white border-gray-200 hover:border-blue-300 transition-colors"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center min-w-[80px]">
                            <p className="font-mono text-lg font-semibold text-gray-900">
                              {session.start_time}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.end_time}
                            </p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Link
                                href={`/courses/${course?.id}`}
                                className="font-semibold text-gray-900 hover:text-[#0077b6] transition-colors"
                              >
                                {course?.title || "Unknown Course"}
                              </Link>
                              {course && (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    levelColors[course.level] || ""
                                  }`}
                                >
                                  {course.level}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                session.start_date
                              ).toLocaleDateString("sv-SE")}{" "}
                              →{" "}
                              {new Date(
                                session.end_date
                              ).toLocaleDateString("sv-SE")}
                              {trainer && ` · ${trainer.full_name}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:ml-auto">
                          <span
                            className={`text-sm font-medium ${
                              isFull ? "text-red-600" : "text-green-600"
                            }`}
                          >
                            {isFull
                              ? "Full"
                              : `${session.spots_available} spots`}
                          </span>
                          {!isFull && course && (
                            <Link
                              href={`/courses/${course.id}/book?session=${session.id}`}
                              className="bg-[#0077b6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#005f8d] transition-colors"
                            >
                              Book
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {(!sessions || sessions.length === 0) && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">
                No sessions scheduled at the moment.
              </p>
              <p className="text-gray-400">
                Check back soon — new sessions are added regularly!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
