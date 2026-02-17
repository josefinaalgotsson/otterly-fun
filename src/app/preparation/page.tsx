import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preparation Tips",
  description:
    "Everything you need to know to prepare your child for swim lessons at Otterly Fun Swim School.",
};

export default function PreparationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Preparation Tips</h1>
          <p className="text-lg text-blue-100">
            Help your child get the most out of their swim lessons with these
            simple tips.
          </p>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What to Bring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "👙",
                title: "Swimwear",
                desc: "A well-fitting swimsuit or swim trunks. For babies, a swim diaper is required.",
              },
              {
                emoji: "🥽",
                title: "Goggles (optional)",
                desc: "Goggles can help children who are sensitive to water in their eyes. Not required for baby classes.",
              },
              {
                emoji: "🧴",
                title: "Towel & Shampoo",
                desc: "A large, warm towel for after the lesson. Shampoo and shower gel for rinsing off chlorine.",
              },
              {
                emoji: "🍌",
                title: "Light Snack",
                desc: "A small, healthy snack for after the lesson. Avoid heavy meals within an hour before swimming.",
              },
              {
                emoji: "🩴",
                title: "Flip-flops / Sandals",
                desc: "Non-slip poolside shoes for walking to and from the changing rooms.",
              },
              {
                emoji: "🔒",
                title: "Locker Coin",
                desc: "Our lockers accept 10 SEK coins. Bring one or use the coin machine at the facility.",
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

      {/* Before the First Lesson */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Before the First Lesson
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Talk about swimming positively",
                desc: "Build excitement! Talk about how fun it will be to splash and play in the water. Avoid mentioning fears or dangers — keep it positive.",
              },
              {
                step: "2",
                title: "Practice at home",
                desc: "Let your child play with water in the bath. Practice putting their face near the water, blowing bubbles, and getting their hair wet.",
              },
              {
                step: "3",
                title: "Visit the pool beforehand",
                desc: "If possible, visit the pool before the first class so your child feels familiar with the environment.",
              },
              {
                step: "4",
                title: "Arrive early",
                desc: "Plan to arrive 15 minutes before the lesson starts. This gives time to change, use the bathroom, and settle in without rushing.",
              },
              {
                step: "5",
                title: "Set realistic expectations",
                desc: "The first lesson is about getting comfortable. Don't worry if your child cries or seems unsure — this is completely normal and our instructors are used to it!",
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

      {/* During the Lesson */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            During the Lesson
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8 space-y-4">
            <div className="flex gap-3 items-start">
              <span className="text-xl">👋</span>
              <p className="text-gray-700">
                <strong>For baby classes (Little Otters):</strong> You will be
                in the water with your child. Wear your own swimwear and be
                ready to follow the instructor&apos;s guidance.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-xl">👀</span>
              <p className="text-gray-700">
                <strong>For all other classes:</strong> Parents watch from the
                viewing area. Try to stay visible so your child can see you,
                but avoid waving or calling out — it can be distracting.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-xl">😌</span>
              <p className="text-gray-700">
                <strong>Stay calm and positive.</strong> If your child is upset,
                trust the instructor. They are experienced in helping nervous
                swimmers feel comfortable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* After the Lesson */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            After the Lesson
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">🎉</span>
              <h3 className="font-semibold mb-2">Celebrate!</h3>
              <p className="text-sm text-gray-600">
                Tell your child how proud you are, regardless of how the
                lesson went. Every step is progress.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">🚿</span>
              <h3 className="font-semibold mb-2">Rinse Off</h3>
              <p className="text-sm text-gray-600">
                Shower and rinse off chlorine right after class. Use
                moisturizer if your child has sensitive skin.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <span className="text-3xl block mb-3">💬</span>
              <h3 className="font-semibold mb-2">Talk About It</h3>
              <p className="text-sm text-gray-600">
                Ask your child what they enjoyed. This helps reinforce
                positive associations with swimming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our courses and book your child&apos;s first lesson today.
          </p>
          <Link
            href="/courses"
            className="bg-[#0077b6] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#005f8d] transition-colors inline-block"
          >
            View Courses →
          </Link>
        </div>
      </section>
    </div>
  );
}
