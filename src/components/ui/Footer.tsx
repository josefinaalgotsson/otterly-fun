import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🦦</span>
              <span className="text-lg font-bold text-[#0077b6]">
                Otterly Fun Swim School
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Teaching children to swim with confidence and joy in Stockholm.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-600 hover:text-[#0077b6] text-sm">
                  Our Courses
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-gray-600 hover:text-[#0077b6] text-sm">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/preparation" className="text-gray-600 hover:text-[#0077b6] text-sm">
                  Preparation Tips
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#0077b6] text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📍 Simhallsgatan 12, Stockholm</li>
              <li>📧 info@otterlyfun.se</li>
              <li>📞 +46 70 123 45 67</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Otterly Fun Swim School. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
