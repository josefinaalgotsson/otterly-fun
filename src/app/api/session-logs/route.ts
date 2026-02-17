import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sessionLogSchema } from "@/lib/validations";
import type { AttendanceEntry } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    let query = supabase
      .from("session_logs")
      .select(
        `
        *,
        course_sessions (
          id,
          day_of_week,
          start_time,
          end_time,
          courses (
            title
          )
        ),
        trainers (
          full_name
        )
      `
      )
      .order("log_date", { ascending: false });

    if (sessionId) {
      query = query.eq("session_id", sessionId);
    }

    const { data: logs, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch session logs" },
        { status: 500 }
      );
    }

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Session logs fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = sessionLogSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { sessionId, trainerId, logDate, notes, attendance } = result.data;
    const supabase = await createClient();

    // Verify the user is authenticated as this trainer
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify trainer owns this session
    const { data: session } = await supabase
      .from("course_sessions")
      .select("trainer_id")
      .eq("id", sessionId)
      .single();

    if (!session || session.trainer_id !== trainerId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: log, error } = await supabase
      .from("session_logs")
      .insert({
        session_id: sessionId,
        trainer_id: trainerId,
        log_date: logDate,
        notes: notes || undefined,
        attendance: attendance as unknown as AttendanceEntry[],
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create session log" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Session log created", logId: log.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Session log error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
