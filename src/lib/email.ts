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
    from: "Utterns simskola <noreply@utternssimskola.se>",
    to: data.parentEmail,
    subject: `Bokningsbekräftelse: ${data.courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #0077b6;">🦦 Bokning bekräftad!</h1>
        <p>Hej ${data.parentName},</p>
        <p>Tack för din bokning hos Utterns simskola! Här är dina bokningsuppgifter:</p>
        
        <div style="background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h2 style="color: #0077b6; margin-top: 0;">${data.courseName}</h2>
          <p><strong>Barn:</strong> ${data.childName}</p>
          <p><strong>Dag:</strong> ${data.sessionDay}</p>
          <p><strong>Tid:</strong> ${data.sessionTime}</p>
          <p><strong>Period:</strong> ${data.startDate} – ${data.endDate}</p>
          <p><strong>Pris:</strong> ${data.price}</p>
          ${data.location ? `<p><strong>Plats:</strong> ${data.location}</p>` : ""}
        </div>

        <h3 style="color: #0077b6;">Betalningsinformation</h3>
        <p>Vänligen överför <strong>${data.price}</strong> till följande konto:</p>
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p><strong>Bank:</strong> Swedbank</p>
          <p><strong>Bankgiro:</strong> 1234-5678</p>
          <p><strong>Referens:</strong> ${data.childName}</p>
        </div>

        <h3 style="color: #0077b6;">Att ta med</h3>
        <ul>
          <li>Badkläder och handduk</li>
          <li>Badblöja (för bebisar)</li>
          <li>Gott humör! 🌊</li>
        </ul>

        <p>Har du frågor? Svara på det här mailet eller kontakta oss på <a href="mailto:info@utternssimskola.se">info@utternssimskola.se</a>.</p>
        
        <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
          — Utterns simskola 🦦
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send booking confirmation email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
