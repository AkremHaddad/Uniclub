"use client";

import { useEffect, useState } from "react";

interface MembershipItem {
  _id: string;
  user: { name: string; email: string };
}

export function ManageClubMembers({ clubId }: { clubId: string }) {
  const [memberships, setMemberships] = useState<MembershipItem[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const res = await fetch(`/api/clubs/${clubId}/members`);
      const data = await res.json().catch(() => ({}));
      if (cancelled) return;
      if (!res.ok) {
        setError(data.error ?? "Failed to load membership requests.");
        return;
      }
      setMemberships(data.memberships);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [clubId]);

  const decide = async (membershipId: string, action: "approve" | "reject") => {
    setBusyId(membershipId);
    setError(null);

    const res = await fetch(`/api/clubs/${clubId}/members/${membershipId}/${action}`, { method: "POST" });
    const data = await res.json().catch(() => ({}));

    setBusyId(null);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setMemberships((prev) => prev?.filter((m) => m._id !== membershipId) ?? null);
  };

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (memberships === null) return <p className="text-sm text-black/60 dark:text-white/60">Loading...</p>;
  if (memberships.length === 0) {
    return <p className="text-sm text-black/60 dark:text-white/60">No pending join requests.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {memberships.map((m) => (
        <li key={m._id} className="border rounded-md p-3 flex items-center justify-between gap-4">
          <span className="text-sm">
            {m.user?.name} ({m.user?.email})
          </span>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => decide(m._id, "approve")}
              disabled={busyId === m._id}
              className="bg-black text-white dark:bg-white dark:text-black rounded-md px-3 py-1 text-sm font-medium disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={() => decide(m._id, "reject")}
              disabled={busyId === m._id}
              className="border rounded-md px-3 py-1 text-sm font-medium disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
