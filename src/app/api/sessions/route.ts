import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    let query = supabase
      .from("course_sessions")
      .select(
        `
        *,
        courses (
          id,
          title,
          level,
          price_cents,
          currency
        ),
        trainers (
          full_name
        )
      `
      )
      .order("start_date", { ascending: true });

    if (courseId) {
      query = query.eq("course_id", courseId);
    }

    const { data: sessions, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch sessions" },
        { status: 500 }
      );
    }

    return NextResponse.json(sessions);
  } catch (error) {
    console.error("Sessions fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
