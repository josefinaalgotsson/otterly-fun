import Link from "next/link";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/courses", label: "Kurser" },
  { href: "/schedule", label: "Schema" },
  { href: "/about", label: "Om oss" },
  { href: "/preparation", label: "Förberedelser" },
];

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🦦</span>
            <span className="text-xl font-bold text-[#0077b6]">
              Utterns simskola
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-[#0077b6] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/courses"
              className="bg-[#0077b6] text-white px-4 py-2 rounded-lg hover:bg-[#005f8d] transition-colors font-medium text-sm"
            >
              Boka nu
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-gray-600 transition-colors text-sm"
              title="Instruktörsinloggning"
            >
              🔐
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
