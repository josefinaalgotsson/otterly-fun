import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Otterly Fun Swim School — Swimming Lessons for Children in Stockholm",
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Teaching Children to Swim with Confidence &amp; Joy 🦦
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Small groups, experienced instructor, and a warm pool in Stockholm.
              From baby swim to stroke mastery — every child can learn to love the water.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="bg-white text-[#0077b6] px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                View Courses
              </Link>
              <Link
                href="/schedule"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                See Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Otterly Fun?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👶</div>
              <h3 className="text-xl font-semibold mb-2">All Ages Welcome</h3>
              <p className="text-gray-600">
                From 3-month-old baby swim to advanced stroke training for older children.
                We have a course for every level.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Small Groups</h3>
              <p className="text-gray-600">
                Maximum 6-8 children per group ensures personal attention and
                a safe learning environment.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏊</div>
              <h3 className="text-xl font-semibold mb-2">Expert Instruction</h3>
              <p className="text-gray-600">
                Certified swim instructor with a passion for teaching children
                water safety and swimming skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Our Courses
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer courses for every level, from first-time water babies to aspiring swimmers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Little Otters", age: "3-12 months", level: "Beginner", emoji: "🦦" },
              { title: "Splash Explorers", age: "1-3 years", level: "Beginner", emoji: "💦" },
              { title: "Swim Starters", age: "4-6 years", level: "Intermediate", emoji: "🏊" },
              { title: "Stroke Masters", age: "6-10 years", level: "Advanced", emoji: "🏅" },
            ].map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{course.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">Ages {course.age}</p>
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
              View All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Dive In?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Spots fill up quickly — find a course that fits your schedule and
            book your child&apos;s place today.
          </p>
          <Link
            href="/courses"
            className="bg-[#0077b6] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#005f8d] transition-colors inline-block"
          >
            Browse &amp; Book →
          </Link>
        </div>
      </section>
    </div>
  );
}
