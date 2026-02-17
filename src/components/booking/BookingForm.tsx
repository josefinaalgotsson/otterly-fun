"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SessionOption = {
  id: string;
  label: string;
};

type BookingFormProps = {
  courseId: string;
  courseTitle: string;
  sessions: SessionOption[];
  preselectedSessionId?: string;
};

export default function BookingForm({
  courseId,
  courseTitle,
  sessions,
  preselectedSessionId,
}: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState(
    preselectedSessionId || sessions[0]?.id || ""
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const body = {
      sessionId: selectedSession,
      parent: {
        fullName: formData.get("parentName") as string,
        email: formData.get("parentEmail") as string,
        phone: formData.get("parentPhone") as string,
      },
      child: {
        fullName: formData.get("childName") as string,
        dateOfBirth: formData.get("childDob") as string,
        swimmingLevel: formData.get("swimmingLevel") as string,
        notes: formData.get("notes") as string,
      },
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Bokningen misslyckades");
      }

      router.push("/booking/confirmation");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Något gick fel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-[#0077b6]">{courseTitle}</h3>
      </div>

      {/* Session Selection */}
      <div>
        <label
          htmlFor="session"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Välj tillfälle *
        </label>
        <select
          id="session"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none"
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800 mb-2">Vårdnadshavare</legend>
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">Fullständigt namn *</label>
          <input type="text" name="parentName" id="parentName" required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none" />
        </div>
        <div>
          <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">E-post *</label>
          <input type="email" name="parentEmail" id="parentEmail" required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none" />
        </div>
        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
          <input type="tel" name="parentPhone" id="parentPhone" required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none" />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-800 mb-2">Barn</legend>
        <div>
          <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">Fullständigt namn *</label>
          <input type="text" name="childName" id="childName" required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none" />
        </div>
        <div>
          <label htmlFor="childDob" className="block text-sm font-medium text-gray-700 mb-1">Födelsedatum</label>
          <input type="date" name="childDob" id="childDob"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none" />
        </div>
        <div>
          <label htmlFor="swimmingLevel" className="block text-sm font-medium text-gray-700 mb-1">Simnivå</label>
          <select name="swimmingLevel" id="swimmingLevel"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none">
            <option value="none">Ingen erfarenhet</option>
            <option value="beginner">Nybörjare</option>
            <option value="intermediate">Fortsättning</option>
            <option value="advanced">Avancerad</option>
          </select>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Övrig information (allergier, särskilda behov m.m.)</label>
          <textarea name="notes" id="notes" rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0077b6] focus:border-transparent outline-none" />
        </div>
      </fieldset>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0077b6] text-white py-3 rounded-lg hover:bg-[#005f8d] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Bokar..." : "Bekräfta bokning"}
      </button>
    </form>
  );
}
