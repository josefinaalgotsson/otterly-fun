import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type BookingConfirmationData = {
  parentName: string;
  parentEmail: string;
  childName: string;
  courseName: string;
  sessionDay: string;
  sessionTime: string;
  startDate: string;
  endDate: string;
  price: string;
  location: string;
};

export async function sendBookingConfirmation(data: BookingConfirmationData) {
  const { error } = await resend.emails.send({
    from: "Otterly Fun Swim School <noreply@otterlyfun.se>",
    to: data.parentEmail,
    subject: `Booking Confirmed: ${data.courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0077b6;">🦦 Booking Confirmed!</h1>
        <p>Hi ${data.parentName},</p>
        <p>Thank you for booking a spot at Otterly Fun Swim School! Here are your booking details:</p>
        
        <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h2 style="color: #0077b6; margin-top: 0;">${data.courseName}</h2>
          <p><strong>Child:</strong> ${data.childName}</p>
          <p><strong>Day:</strong> ${data.sessionDay}</p>
          <p><strong>Time:</strong> ${data.sessionTime}</p>
          <p><strong>Period:</strong> ${data.startDate} – ${data.endDate}</p>
          <p><strong>Price:</strong> ${data.price}</p>
          ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ""}
        </div>

        <h3 style="color: #0077b6;">Payment Information</h3>
        <p>Please transfer <strong>${data.price}</strong> to the following account:</p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p><strong>Bank:</strong> Swedbank</p>
          <p><strong>Bankgiro:</strong> 1234-5678</p>
          <p><strong>Reference:</strong> ${data.childName}</p>
        </div>

        <h3 style="color: #0077b6;">What to Bring</h3>
        <ul>
          <li>Swimsuit and towel</li>
          <li>Swim diaper (for babies)</li>
          <li>Positive attitude! 🌊</li>
        </ul>

        <p>If you have any questions, reply to this email or contact us at <a href="mailto:info@otterlyfun.se">info@otterlyfun.se</a>.</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
          — Otterly Fun Swim School 🦦
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send booking confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
