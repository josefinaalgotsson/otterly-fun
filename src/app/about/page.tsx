import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Otterly Fun Swim School, our mission, location, and the instructor behind the lessons.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Otterly Fun</h1>
          <p className="text-lg text-blue-100">
            A small swim school with a big heart — right here in Stockholm.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Otterly Fun Swim School was founded with a simple belief: every child
              deserves to feel safe and confident in the water. What started as a
              passion project has grown into a beloved local swim school, helping
              dozens of families in Stockholm discover the joy of swimming.
            </p>
            <p>
              We specialize in small-group lessons that give each child the
              individual attention they need. Our teaching philosophy centers on
              building water confidence through play, positive reinforcement, and
              age-appropriate skill progression.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Instructor */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Meet Your Instructor
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-full bg-[#0077b6] flex items-center justify-center text-5xl flex-shrink-0">
              🦦
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Josefina Algotsson</h3>
              <p className="text-[#0077b6] font-medium mb-4">
                Certified Swim Instructor
              </p>
              <div className="text-gray-600 space-y-3">
                <p>
                  Josefina is a certified swim instructor with a deep love for
                  teaching children. She holds certifications in lifeguarding and
                  children&apos;s swim instruction, and has worked with hundreds of
                  families over the years.
                </p>
                <p>
                  Her approach combines structured skill-building with fun and
                  games, ensuring that every child leaves the pool with a smile —
                  and a little more confident in the water.
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
            Our Location
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">Find Us</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p>Simhallsgatan 12</p>
                      <p>111 22 Stockholm, Sweden</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🚇</span>
                    <div>
                      <p className="font-medium text-gray-900">Getting Here</p>
                      <p>
                        5-minute walk from the nearest T-bana station. Street
                        parking is available on weekends.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🏊</span>
                    <div>
                      <p className="font-medium text-gray-900">The Pool</p>
                      <p>
                        Our lessons take place in a warm, child-friendly pool
                        maintained at 32°C — perfect for little swimmers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg min-h-[250px] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <span className="text-4xl block mb-2">🗺️</span>
                  <p className="text-sm">Map coming soon</p>
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
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "🛡️",
                title: "Safety First",
                desc: "Every session follows strict safety protocols. We maintain small group sizes and constant supervision.",
              },
              {
                emoji: "😊",
                title: "Fun & Play",
                desc: "Children learn best when they're having fun. We use games, songs, and play to teach essential swimming skills.",
              },
              {
                emoji: "🌱",
                title: "Individual Growth",
                desc: "Every child develops at their own pace. We celebrate each milestone, no matter how small.",
              },
              {
                emoji: "👨‍👩‍👦",
                title: "Family Involvement",
                desc: "Parents are partners in the learning journey. We provide tips and updates so you can support progress at home.",
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
