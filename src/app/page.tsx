import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Utterns simskola — Simundervisning för barn i Kolmården",
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Simundervisning med värme, trygghet &amp; glädje 🦦
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Utterns simskola är en liten och personlig simskola i Kolmården.
              Vi undervisar i små grupper så att varje barn får den
              uppmärksamhet det behöver — från babysim till simsäkerhet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="bg-white text-[#0077b6] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Se våra kurser
              </Link>
              <Link
                href="/schedule"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                Visa schema
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Varför Utterns simskola?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-semibold mb-2">Alla åldrar</h3>
              <p className="text-gray-600">
                Från babysim för de allra minsta till simträning för äldre barn.
                Vi har en kurs för varje ålder och nivå.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Små grupper</h3>
              <p className="text-gray-600">
                Hos oss är grupperna alltid små — max 6–8 barn — så att varje
                barn får personlig uppmärksamhet och känner sig tryggt.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏊</div>
              <h3 className="text-xl font-semibold mb-2">Personlig undervisning</h3>
              <p className="text-gray-600">
                En liten simskola med stort hjärta. Vi lär känna varje barn
                och anpassar undervisningen efter just deras behov.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Våra kurser
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Vi erbjuder kurser för alla nivåer — från nyfikna vattenbebisar
            till barn som vill bli riktigt simkunniga.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Små Uttrar", age: "3–12 mån", level: "Nybörjare", emoji: "🦦" },
              { title: "Plaskare", age: "1–3 år", level: "Nybörjare", emoji: "💦" },
              { title: "Simstartare", age: "4–6 år", level: "Fortsättning", emoji: "🏊" },
              { title: "Simmare", age: "6–10 år", level: "Avancerad", emoji: "🏅" },
            ].map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{course.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{course.age}</p>
                <span className="text-xs bg-blue-100 text-[#0077b6] px-2 py-1 rounded-full">
                  {course.level}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/courses"
              className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8d] transition-colors inline-block"
            >
              Se alla kurser →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Redo att hoppa i?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Platserna är begränsade — hitta en kurs som passar er och boka
            ditt barns plats redan idag.
          </p>
          <Link
            href="/courses"
            className="bg-[#0077b6] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#005f8d] transition-colors inline-block"
          >
            Bläddra &amp; boka →
          </Link>
        </div>
      </section>
    </div>
  );
}
