import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import BookingForm from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Spot",
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session?: string }>;
};

export default async function BookingPage({ params, searchParams }: Props) {
  const { id: courseId } = await params;
  const { session: sessionId } = await searchParams;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title, price_cents, level")
    .eq("id", courseId)
    .single();

  if (!course) {
    notFound();
  }

  // Fetch available sessions for this course
  const { data: sessions } = await supabase
    .from("course_sessions")
    .select("id, day_of_week, start_time, end_time, start_date, end_date, spots_available, status")
    .eq("course_id", courseId)
    .gt("spots_available", 0)
    .eq("status", "open")
    .order("start_date", { ascending: true });

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("sv-SE", {
      style: "currency",
      currency: "SEK",
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/courses/${courseId}`}
            className="text-blue-200 hover:text-white transition-colors mb-4 inline-block"
          >
            ← Back to {course.title}
          </Link>
          <h1 className="text-3xl font-bold mb-2">Book a Spot</h1>
          <p className="text-blue-100">
            {course.title} — {formatPrice(course.price_cents)}
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {sessions && sessions.length > 0 ? (
            <BookingForm
              courseId={course.id}
              courseTitle={course.title}
              sessions={sessions.map((s) => ({
                id: s.id,
                label: `${s.day_of_week}s ${s.start_time}–${s.end_time} (${new Date(s.start_date).toLocaleDateString("sv-SE")} → ${new Date(s.end_date).toLocaleDateString("sv-SE")}) — ${s.spots_available} spots left`,
              }))}
              preselectedSessionId={sessionId}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">
                Sorry, all sessions for this course are currently full.
              </p>
              <Link
                href="/courses"
                className="text-[#0077b6] font-medium hover:underline"
              >
                Browse other courses →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
