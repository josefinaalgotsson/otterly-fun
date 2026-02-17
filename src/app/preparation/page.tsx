import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Förberedelser",
  description:
    "Allt du behöver veta för att förbereda ditt barn inför simlektionerna hos Utterns simskola.",
};

export default function PreparationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Förberedelser</h1>
          <p className="text-lg text-blue-100">
            Hjälp ditt barn att få ut det mesta av sina simlektioner med dessa
            enkla tips.
          </p>
        </div>
      </section>

      {/* Vad ska man ta med */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Att ta med
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "👙",
                title: "Badkläder",
                desc: "Välsittande baddräkt eller badbyxor. För bebisar krävs badblöja.",
              },
              {
                emoji: "🥽",
                title: "Simglasögon (valfritt)",
                desc: "Simglasögon kan hjälpa barn som är känsliga för vatten i ögonen. Behövs inte för babyklasser.",
              },
              {
                emoji: "🧴",
                title: "Handduk & schampo",
                desc: "En stor, varm handduk efter lektionen. Schampo och duschkräm för att skölja bort klor.",
              },
              {
                emoji: "🍌",
                title: "Litet mellanmål",
                desc: "Ett litet, nyttigt mellanmål efter lektionen. Undvik tunga måltider inom en timme innan simningen.",
              },
              {
                emoji: "🩴",
                title: "Flipflops / sandaler",
                desc: "Halkfria skor vid bassängkanten för att gå till och från omklädningsrummen.",
              },
              {
                emoji: "🔒",
                title: "Skåpmynt",
                desc: "Våra skåp tar 10-kronor. Ta med ett eller använd växlingsmaskinen i anläggningen.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200"
              >
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innan första lektionen */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Innan första lektionen
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Prata positivt om simning",
                desc: "Bygg upp förväntan! Berätta hur kul det kommer bli att plaska och leka i vattnet. Undvik att nämna rädslor eller faror — håll det positivt.",
              },
              {
                step: "2",
                title: "Öva hemma",
                desc: "Låt ditt barn leka med vatten i badkaret. Öva på att hålla ansiktet nära vattnet, blåsa bubblor och väta håret.",
              },
              {
                step: "3",
                title: "Besök badhuset innan",
                desc: "Om det är möjligt, besök badhuset före första lektionen så att ditt barn känner igen miljön.",
              },
              {
                step: "4",
                title: "Kom i god tid",
                desc: "Planera att komma 15 minuter innan lektionen börjar. Det ger tid att byta om, gå på toaletten och komma till ro utan stress.",
              },
              {
                step: "5",
                title: "Ha realistiska förväntningar",
                desc: "Första lektionen handlar om att bli bekväm. Oroa dig inte om ditt barn gråter eller verkar osäkert — det är helt normalt och våra instruktörer är vana vid det!",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-[#0077b6] text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Under lektionen */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Under lektionen
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8 space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-xl">👋</span>
              <p className="text-gray-700">
                <strong>För babyklasser (Små Uttrar):</strong> Du är med i
                vattnet tillsammans med ditt barn. Ha egna badkläder och var
                beredd att följa instruktörens vägledning.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-xl">👀</span>
              <p className="text-gray-700">
                <strong>För alla andra klasser:</strong> Föräldrar tittar på
                från läktaren. Försök vara synlig så ditt barn kan se dig, men
                undvik att vinka eller ropa — det kan vara distraherande.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-xl">😌</span>
              <p className="text-gray-700">
                <strong>Var lugn och positiv.</strong> Om ditt barn blir
                ledset, lita på instruktören. De har stor erfarenhet av att
                hjälpa nervösa simmare känna sig trygga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Efter lektionen */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Efter lektionen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">🎉</span>
              <h3 className="font-semibold mb-2">Fira!</h3>
              <p className="text-sm text-gray-600">
                Berätta för ditt barn hur stolt du är, oavsett hur lektionen
                gick. Varje steg framåt är framsteg.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">🚿</span>
              <h3 className="font-semibold mb-2">Skölj av</h3>
              <p className="text-sm text-gray-600">
                Duscha och skölj bort kloret direkt efter lektionen. Använd
                fuktkräm om ditt barn har känslig hud.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">💬</span>
              <h3 className="font-semibold mb-2">Prata om det</h3>
              <p className="text-sm text-gray-600">
                Fråga ditt barn vad det tyckte var roligast. Det hjälper till
                att skapa positiva associationer med simning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Redo att börja?
          </h2>
          <p className="text-gray-600 mb-6">
            Se våra kurser och boka ditt barns första lektion redan idag.
          </p>
          <Link
            href="/courses"
            className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8d] transition-colors inline-block"
          >
            Se kurser →
          </Link>
        </div>
      </section>
    </div>
  );
}
