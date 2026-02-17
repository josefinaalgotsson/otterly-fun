import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Course, CourseSession } from "@/types/database";

type SessionWithTrainer = CourseSession & {
  trainers: { full_name: string } | null;
};

type CourseWithSessions = Course & {
  course_sessions: SessionWithTrainer[];
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase
    .from("courses")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!course) return { title: "Kursen hittades inte" };

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course, error } = await supabase
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
        status,
        trainers (
          full_name
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error || !course) {
    notFound();
  }

  const typedCourse = course as unknown as CourseWithSessions;

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
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="text-blue-200 hover:text-white transition-colors mb-4 inline-block"
          >
            ← Tillbaka till kurser
          </Link>
          <div className="flex items-start gap-4">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                  levelColors[typedCourse.level] || "bg-gray-100 text-gray-800"
                }`}
              >
                {typedCourse.level.charAt(0).toUpperCase() + typedCourse.level.slice(1)}
              </span>
              <h1 className="text-4xl font-bold mb-4">{typedCourse.title}</h1>
              <p className="text-lg text-blue-100 mb-2">{typedCourse.description}</p>
              <p className="text-2xl font-bold mt-4">
                {formatPrice(typedCourse.price_cents)}
                <span className="text-base font-normal text-blue-200">
                  {" "}
                  / kurs
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Prerequisites */}
              {typedCourse.prerequisites && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Förkunskaper
                  </h2>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <p className="text-gray-700">{typedCourse.prerequisites}</p>
                  </div>
                </div>
              )}

              {/* Goals */}
              {typedCourse.goals && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Vad ditt barn kommer lära sig
                  </h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <p className="text-gray-700">{typedCourse.goals}</p>
                  </div>
                </div>
              )}

              {/* Sessions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Tillgängliga tillfällen
                </h2>
                {typedCourse.course_sessions && typedCourse.course_sessions.length > 0 ? (
                  <div className="space-y-4">
                    {typedCourse.course_sessions.map(
                      (session: {
                        id: string;
                        day_of_week: string;
                        start_time: string;
                        end_time: string;
                        start_date: string;
                        end_date: string;
                        spots_available: number;
                        status: string;
                        trainers: { full_name: string } | null;
                      }) => {
                        const isFull =
                          session.status === "full" ||
                          session.spots_available <= 0;
                        return (
                          <div
                            key={session.id}
                            className={`border rounded-xl p-6 ${
                              isFull
                                ? "border-gray-200 bg-gray-50"
                                : "border-blue-200 bg-white"
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <p className="font-semibold text-lg text-gray-900">
                                  {session.day_of_week}s, {session.start_time} –{" "}
                                  {session.end_time}
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                  {new Date(
                                    session.start_date
                                  ).toLocaleDateString("sv-SE")}{" "}
                                  →{" "}
                                  {new Date(
                                    session.end_date
                                  ).toLocaleDateString("sv-SE")}
                                </p>
                                {session.trainers && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    Instruktör: {session.trainers.full_name}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p
                                  className={`text-sm font-medium mb-2 ${
                                    isFull ? "text-red-600" : "text-green-600"
                                  }`}
                                >
                                  {isFull
                                    ? "Fullbokad"
                                    : `${session.spots_available} platser kvar`}
                                </p>
                                {!isFull ? (
                                  <Link
                                    href={`/courses/${id}/book?session=${session.id}`}
                                    className="bg-[#0077b6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#005f8d] transition-colors inline-block"
                                  >
                                    Boka nu
                                  </Link>
                                ) : (
                                  <span className="text-gray-400 text-sm">
                                    Inga platser kvar
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Inga tillfällen är schemalagda just nu. Kolla tillbaka snart!
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Kursdetaljer</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nivå</span>
                    <span className="font-medium">
                      {typedCourse.level.charAt(0).toUpperCase() +
                        typedCourse.level.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pris</span>
                    <span className="font-medium">
                      {formatPrice(typedCourse.price_cents)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Max deltagare</span>
                    <span className="font-medium">
                      {typedCourse.max_participants}
                    </span>
                  </div>
                  {typedCourse.location && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Plats</span>
                      <span className="font-medium">{typedCourse.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
