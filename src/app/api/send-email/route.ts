import { NextRequest, NextResponse } from "next/server";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const required = ["parentName", "parentEmail", "childName", "courseName"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    await sendBookingConfirmation({
      parentName: body.parentName,
      parentEmail: body.parentEmail,
      childName: body.childName,
      courseName: body.courseName,
      sessionDay: body.sessionDay || "",
      sessionTime: body.sessionTime || "",
      startDate: body.startDate || "",
      endDate: body.endDate || "",
      price: body.price || "",
      location: body.location || "",
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
