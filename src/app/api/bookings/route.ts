import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { bookingFormSchema } from "@/lib/validations";
import { sendBookingConfirmation } from "@/lib/email";
import type { CourseSession, Course } from "@/types/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = bookingFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { sessionId, parent, child } = result.data;
    const supabase = createAdminClient();

    // Check session availability
    const { data: sessionData, error: sessionError } = await supabase
      .from("course_sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (sessionError || !sessionData) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const session = sessionData as unknown as CourseSession;

    if (session.spots_available <= 0 || session.status === "full") {
      return NextResponse.json(
        { error: "This session is full. Please choose another session." },
        { status: 409 }
      );
    }

    // Get course info for email
    const { data: courseData } = await supabase
      .from("courses")
      .select("*")
      .eq("id", session.course_id)
      .single();

    const course = courseData as unknown as Course | null;

    // Upsert parent (find by email or create)
    const { data: existingParent } = await supabase
      .from("parents")
      .select("*")
      .eq("email", parent.email)
      .single();

    let parentId: string;

    if (existingParent) {
      parentId = (existingParent as { id: string }).id;
      // Update name/phone if changed
      await supabase
        .from("parents")
        .update({ full_name: parent.fullName, phone: parent.phone })
        .eq("id", parentId);
    } else {
      const { data: newParent, error: parentError } = await supabase
        .from("parents")
        .insert({
          email: parent.email,
          full_name: parent.fullName,
          phone: parent.phone,
        })
        .select("*")
        .single();

      if (parentError || !newParent) {
        return NextResponse.json(
          { error: "Failed to create parent record" },
          { status: 500 }
        );
      }
      parentId = (newParent as { id: string }).id;
    }

    // Create child record
    const { data: newChild, error: childError } = await supabase
      .from("children")
      .insert({
        parent_id: parentId,
        full_name: child.fullName,
        date_of_birth: child.dateOfBirth || undefined,
        swimming_level: child.swimmingLevel || "none",
        notes: child.notes || undefined,
      })
      .select("*")
      .single();

    if (childError || !newChild) {
      return NextResponse.json(
        { error: "Failed to create child record" },
        { status: 500 }
      );
    }

    const childId = (newChild as { id: string }).id;

    // Create booking (the trigger will decrement spots_available)
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        session_id: sessionId,
        child_id: childId,
        parent_id: parentId,
        status: "confirmed",
        payment_status: "unpaid",
      })
      .select("*")
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: "Failed to create booking" },
        { status: 500 }
      );
    }

    const bookingId = (booking as { id: string }).id;

    // Send confirmation email
    try {
      await sendBookingConfirmation({
        parentName: parent.fullName,
        parentEmail: parent.email,
        childName: child.fullName,
        courseName: course?.title || "Swim Course",
        sessionDay: session.day_of_week,
        sessionTime: `${session.start_time}–${session.end_time}`,
        startDate: session.start_date,
        endDate: session.end_date,
        price: course ? `${course.price_cents / 100} ${course.currency}` : "",
        location: course?.location || "",
      });
    } catch (emailError) {
      // Don't fail the booking if email fails
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json(
      { message: "Booking confirmed", bookingId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
