import Link from "next/link";
import type { CourseWithSessions } from "@/types/database";

function levelBadge(level: string) {
  const colors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level] || "bg-gray-100 text-gray-800"}`}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

function formatPrice(priceCents: number, currency: string) {
  return (priceCents / 100).toLocaleString("sv-SE", {
    style: "currency",
    currency,
  });
}

export function CourseCard({ course }: { course: CourseWithSessions }) {
  const openSessions = course.course_sessions?.filter((s) => s.status === "open") || [];
  const totalSpots = openSessions.reduce((sum, s) => sum + s.spots_available, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
          {levelBadge(course.level)}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span>💰 {formatPrice(course.price_cents, course.currency)}</span>
          <span>👥 Max {course.max_participants}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${totalSpots > 0 ? "text-green-600" : "text-red-600"}`}>
            {totalSpots > 0 ? `${totalSpots} platser kvar` : "Fullbokad"}
          </span>
          <Link
            href={`/courses/${course.id}`}
            className="bg-[#0077b6] text-white px-4 py-2 rounded-lg hover:bg-[#005f8d] transition-colors text-sm font-medium"
          >
            Visa detaljer
          </Link>
        </div>
      </div>
    </div>
  );
}
