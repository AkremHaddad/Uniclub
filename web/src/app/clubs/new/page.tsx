"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NewClubRequestPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (status === "loading") return null;

  if (!session) {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <p>
          <Link href="/login" className="underline">
            Log in
          </Link>{" "}
          to request a new club.
        </p>
      </main>
    );
  }

  if (sent) {
    return (
      <main className="flex-1 flex items-center justify-center p-8 text-center">
        <p>
          Request sent — an admin will review it. In the meantime, browse{" "}
          <Link href="/clubs" className="underline">
            existing clubs
          </Link>
          .
        </p>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/club-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setSent(true);
  };

  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">Register a new club</h1>
        <p className="text-sm text-black/60 dark:text-white/60 text-center">
          Subject to admin approval. Once approved, you become the club&apos;s owner.
        </p>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Club name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded-md px-3 py-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="border rounded-md px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-2 font-medium disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit request"}
        </button>
      </form>
    </main>
  );
}
