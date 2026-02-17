"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Child = {
  id: string;
  full_name: string;
};

type SessionLog = {
  id: string;
  log_date: string;
  notes: string | null;
  attendance: string;
  created_at: string;
};

type SessionInfo = {
  id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  courses: { title: string } | null;
};

export default function SessionLogPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;
  const supabase = createClient();

  const [session, setSession] = useState<SessionInfo | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [logs, setLogs] = useState<SessionLog[]>([]);
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // New log form state
  const [logDate, setLogDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [attendance, setAttendance] = useState<
    Record<string, boolean>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      // Check auth
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/dashboard/login");
        return;
      }

      // Get trainer
      const { data: trainerData } = await supabase
        .from("trainers")
        .select("id")
        .eq("email", user.email!)
        .single();

      const trainer = trainerData as unknown as { id: string } | null;

      if (!trainer) {
        router.push("/dashboard/login");
        return;
      }
      setTrainerId(trainer.id);

      // Get session details
      const { data: sessionData } = await supabase
        .from("course_sessions")
        .select(
          `
          id,
          day_of_week,
          start_time,
          end_time,
          start_date,
          end_date,
          courses (title)
        `
        )
        .eq("id", sessionId)
        .single();

      if (sessionData) {
        setSession(sessionData as unknown as SessionInfo);
      }

      // Get enrolled children via bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select(
          `
          children (
            id,
            full_name
          )
        `
        )
        .eq("session_id", sessionId)
        .eq("status", "confirmed");

      if (bookings) {
        const enrolledChildren = bookings
          .map(
            (b) =>
              (b.children as unknown as Child)
          )
          .filter(Boolean);
        setChildren(enrolledChildren);

        // Initialize attendance
        const initialAttendance: Record<string, boolean> = {};
        enrolledChildren.forEach((c) => {
          initialAttendance[c.id] = true;
        });
        setAttendance(initialAttendance);
      }

      // Get existing logs
      const { data: existingLogs } = await supabase
        .from("session_logs")
        .select("*")
        .eq("session_id", sessionId)
        .order("log_date", { ascending: false });

      if (existingLogs) {
        setLogs(existingLogs as unknown as SessionLog[]);
      }

      setLoading(false);
    }

    loadData();
  }, [sessionId, router, supabase]);

  async function handleSubmitLog(e: React.FormEvent) {
    e.preventDefault();
    if (!trainerId) return;
    setSubmitting(true);
    setError(null);

    const attendanceArray = children.map((c) => ({
      child_id: c.id,
      child_name: c.full_name,
      present: attendance[c.id] ?? true,
    }));

    try {
      const res = await fetch("/api/session-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          trainerId,
          logDate,
          notes,
          attendance: attendanceArray,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save log");
      }

      // Refresh logs
      const { data: updatedLogs } = await supabase
        .from("session_logs")
        .select("*")
        .eq("session_id", sessionId)
        .order("log_date", { ascending: false });

      if (updatedLogs) setLogs(updatedLogs as unknown as SessionLog[]);

      // Reset form
      setNotes("");
      setLogDate(new Date().toISOString().split("T")[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Loading session data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dashboard/sessions"
        className="text-[#0077b6] hover:underline text-sm font-medium mb-6 inline-block"
      >
        ← Back to Sessions
      </Link>

      {/* Session Header */}
      {session && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {(session.courses as { title: string } | null)?.title || "Session"}
          </h1>
          <p className="text-gray-500">
            {session.day_of_week}s {session.start_time}–{session.end_time} |{" "}
            {new Date(session.start_date).toLocaleDateString("sv-SE")} →{" "}
            {new Date(session.end_date).toLocaleDateString("sv-SE")}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {children.length} enrolled children
          </p>
        </div>
      )}

      {/* New Log Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Add Session Log
        </h2>
        <form onSubmit={handleSubmitLog} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={logDate}
              onChange={(e) => setLogDate(e.target.value)}
              required
              className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none"
            />
          </div>

          {/* Attendance */}
          {children.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendance
              </label>
              <div className="space-y-2">
                {children.map((child) => (
                  <label
                    key={child.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={attendance[child.id] ?? true}
                      onChange={(e) =>
                        setAttendance((prev) => ({
                          ...prev,
                          [child.id]: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-[#0077b6] rounded focus:ring-[#0077b6]"
                    />
                    <span className="text-gray-900">{child.full_name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="What was covered in this session? Any observations about individual children?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#0077b6] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#005f8d] transition-colors disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Log"}
          </button>
        </form>
      </div>

      {/* Previous Logs */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Previous Logs ({logs.length})
        </h2>
        {logs.length > 0 ? (
          <div className="space-y-4">
            {logs.map((log) => {
              let attendanceParsed: {
                child_name: string;
                present: boolean;
              }[] = [];
              try {
                attendanceParsed =
                  typeof log.attendance === "string"
                    ? JSON.parse(log.attendance)
                    : log.attendance;
              } catch {
                // ignore
              }

              return (
                <div
                  key={log.id}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-gray-900">
                      {new Date(log.log_date).toLocaleDateString("sv-SE", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-400">
                      Logged{" "}
                      {new Date(log.created_at).toLocaleDateString("sv-SE")}
                    </p>
                  </div>
                  {log.notes && (
                    <p className="text-gray-600 mb-3">{log.notes}</p>
                  )}
                  {attendanceParsed.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {attendanceParsed.map((a, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full ${
                            a.present
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {a.present ? "✓" : "✗"} {a.child_name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No logs recorded yet.</p>
        )}
      </div>
    </div>
  );
}
