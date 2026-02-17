import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CourseCard } from "@/components/courses/CourseCard";
import type { CourseWithSessions } from "@/types/database";

export const metadata: Metadata = {
  title: "Kurser",
  description:
    "Utforska våra simkurser för barn i alla åldrar och nivåer — från babysim till avancerad simträning.",
};

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select(
      `
      *,
      course_sessions (
        id,
        start_date,
        end_date,
        day_of_week,
        start_time,
        end_time,
        spots_available,
        status
      )
    `
    )
    .eq("is_active", true)
    .order("price_cents", { ascending: true });

  const typedCourses = (courses || []) as unknown as CourseWithSessions[];

  if (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Våra kurser</h1>
          <p className="text-lg text-blue-100 max-w-2xl">
            Från första plasket till säker simning — vi har en kurs för
            varje ålder och nivå.
          </p>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {["Alla nivåer", "Nybörjare", "Fortsättning", "Avancerad"].map(
              (level) => (
                <span
                  key={level}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700"
                >
                  {level}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">
                Inga kurser tillgängliga just nu.
              </p>
              <p className="text-gray-400">
                Kolla tillbaka snart — nya kurser läggs till regelbundet!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Vanliga frågor
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Hur vet jag vilken nivå som passar mitt barn?",
                a: "Våra nivåer baseras på ålder och erfarenhet. Nybörjare passar barn utan tidigare simerfarenhet, Fortsättning för barn som är bekväma i vatten men inte kan simma självständigt, och Avancerad för barn som redan kan simma men vill förbättra sin teknik.",
              },
              {
                q: "Vad händer om mitt barn är nervöst inför vattnet?",
                a: "Det är helt normalt! Vår instruktör har stor erfarenhet av att jobba med nervösa simmare. Vi använder mjuka, lekfulla metoder för att hjälpa barn bygga självförtroende i sin egen takt.",
              },
              {
                q: "Hur många barn är det i varje grupp?",
                a: "Vi håller grupperna små — max 6–8 barn — för att säkerställa att varje barn får personlig uppmärksamhet och trygg handledning.",
              },
              {
                q: "Behöver jag vara i vattnet med mitt barn?",
                a: "För vår Små Uttrar-klass (3–12 månader) är en förälder eller vårdnadshavare med barnet i vattnet. För alla andra nivåer tittar föräldrarna på från bassängkanten.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-xl p-6 border border-gray-200"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
