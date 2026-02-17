import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Lär känna Utterns simskola — vår historia, vision och instruktören bakom lektionerna.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Om Utterns simskola</h1>
          <p className="text-lg text-blue-100">
            En liten simskola med stort hjärta — mitt i Kolmården.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Vår historia</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Utterns simskola växte fram ur en enkel övertygelse: att varje
              barn förtjänar att känna sig tryggt och glatt i vattnet. Det som
              började som några prova-på-lektioner för vänners barn har vuxit
              till en liten men omtyckt simskola i Kolmården.
            </p>
            <p>
              Vi är medvetet små. Hos oss är grupperna aldrig stora och ingen
              faller mellan stolarna. Varje barn lär känna sin instruktör,
              och varje förälder får personlig återkoppling. Det är det som
              gör oss speciella — den nära kontakten och känslan av att
              tillhöra en gemenskap snarare än att vara en i mängden.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Instructor */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Möt din instruktör
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-full bg-[#0077b6] flex items-center justify-center text-5xl flex-shrink-0">
              🦦
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Josefina Algotsson</h3>
              <p className="text-[#0077b6] font-medium mb-4">
                Siminstruktör &amp; grundare
              </p>
              <div className="text-gray-600 space-y-3">
                <p>
                  Josefina är certifierad siminstruktör med ett brinnande
                  intresse för att lära barn simma. Hennes kärlek till vatten
                  har även resulterat i en masterexamen i oceanografi, ett
                  CMAS-dykcertifikat och otaliga timmar av dykning, snorkling
                  och undervattensutforskande i sjön Örlen, Västkustens skärgård,
                  Kuba och Zanzibar.
                </p>
                <p>
                  Hennes filosofi är enkel: barn lär sig bäst när de har roligt
                  och känner sig trygga. Genom lek, sånger och positiv
                  uppmuntran får varje barn möjlighet att utvecklas i sin egen
                  takt — och gå hem med ett leende.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Här hittar du oss
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Hitta hit</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-medium text-gray-900">Adress</p>
                      <p>Simhallsgatan 12</p>
                      <p>61832 Kolmården</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🚇</span>
                    <div>
                      <p className="font-medium text-gray-900">Vägbeskrivning</p>
                      <p>
                        Parkeringsplats finns för 3 bilar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🏊</span>
                    <div>
                      <p className="font-medium text-gray-900">Bassängen</p>
                      <p>
                        Våra lektioner hålls i en varm och barnvänlig bassäng
                        som håller 32 °C — perfekt för små simmare.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg min-h-[250px] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🗺️</span>
                  <p className="text-sm">Karta kommer snart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Våra värderingar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "🛡️",
                title: "Trygghet först",
                desc: "Varje lektion följer tydliga säkerhetsrutiner. Vi håller grupperna små och har alltid full uppsikt.",
              },
              {
                emoji: "😊",
                title: "Lek och glädje",
                desc: "Barn lär sig bäst när de har roligt. Vi använder lekar, sånger och fantasi för att lära ut viktiga simfärdigheter.",
              },
              {
                emoji: "🌱",
                title: "Utveckling i egen takt",
                desc: "Alla barn utvecklas olika. Vi firar varje framsteg, oavsett hur litet det kan verka.",
              },
              {
                emoji: "👨‍👩‍👦",
                title: "Familjen med på resan",
                desc: "Föräldrar är viktiga partners. Vi ger tips och uppdateringar så att ni kan stötta ert barns framsteg hemma.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <span className="text-3xl mb-3 block">{v.emoji}</span>
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
