"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Recommendation {
  club: { _id: string; name: string; description: string };
  score: number;
}

export function RecommendedClubs() {
  const { data: session, status } = useSession();
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    async function load() {
      const res = await fetch("/api/recommendations");
      const data = await res.json().catch(() => ({}));
      if (cancelled) return;
      if (res.ok) setRecommendations(data.recommendations ?? []);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [session]);

  // Nothing to show while logged out, loading, or with no matches — this
  // section should disappear quietly rather than show an empty state that
  // implies something's broken.
  if (status === "loading" || !session || !recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="text-lg font-medium mb-3">Recommended for you</h2>
      <p className="text-xs text-black/40 dark:text-white/40 mb-3">
        Based on your interests, matched against club tags.
      </p>
      <ul className="flex flex-col gap-3">
        {recommendations.map(({ club }) => (
          <li key={club._id} className="border rounded-md p-3">
            <Link href={`/clubs/${club._id}`} className="font-medium hover:underline">
              {club.name}
            </Link>
            <p className="text-sm text-black/60 dark:text-white/60 mt-1">{club.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
