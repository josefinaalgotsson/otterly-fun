import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: courses, error } = await supabase
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
          trainer_id,
          trainers (
            full_name
          )
        )
      `
      )
      .eq("is_active", true)
      .order("price_cents", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch courses" },
        { status: 500 }
      );
    }

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Courses fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
