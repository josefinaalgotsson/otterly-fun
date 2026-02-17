import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed",
};

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for booking with Otterly Fun Swim School! We&apos;ve sent a
          confirmation email with all the details, including payment
          information.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-3">What happens next?</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">1.</span>
              Check your email for the booking confirmation and payment details.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">2.</span>
              Complete the payment via Swish or Bankgiro within 7 days to secure
              your spot.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">3.</span>
              Read our{" "}
              <Link
                href="/preparation"
                className="text-[#0077b6] hover:underline"
              >
                preparation tips
              </Link>{" "}
              to get your child ready for their first lesson.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">4.</span>
              Show up 15 minutes early on the first day — and get ready to have
              fun!
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses"
            className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8d] transition-colors"
          >
            Browse More Courses
          </Link>
          <Link
            href="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
