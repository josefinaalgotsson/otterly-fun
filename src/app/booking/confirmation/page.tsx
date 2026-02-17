import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bokning bekräftad",
};

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Bokning bekräftad!
        </h1>
        <p className="text-gray-600 mb-6">
          Tack för din bokning hos Utterns simskola! Vi har skickat ett
          bekräftelsemail med alla detaljer, inklusive betalningsinformation.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-gray-900 mb-3">Vad händer nu?</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">1.</span>
              Kolla din e-post för bokningsbekräftelse och betalningsuppgifter.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">2.</span>
              Betala via Swish eller Bankgiro inom 7 dagar för att säkra
              din plats.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">3.</span>
              Läs våra{" "}
              <Link
                href="/preparation"
                className="text-[#0077b6] hover:underline"
              >
                förberedelsetips
              </Link>{" "}
              för att göra ditt barn redo inför första lektionen.
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#0077b6]">4.</span>
              Kom 15 minuter tidigt första dagen — och förbered er på att ha
              kul!
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses"
            className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8d] transition-colors"
          >
            Se fler kurser
          </Link>
          <Link
            href="/"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}
