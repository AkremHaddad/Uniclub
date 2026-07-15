"use client";

import { useEffect, useState } from "react";

interface ClubRequestItem {
  _id: string;
  name: string;
  description: string;
  requestedBy: { name: string; email: string };
}

export function AdminClubRequestsList() {
  const [requests, setRequests] = useState<ClubRequestItem[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Defined inside the effect (rather than calling an outer async
    // function) with a cancellation guard, so a fetch that resolves after
    // the component unmounts doesn't call setState on a gone component.
    let cancelled = false;

    async function load() {
      const res = await fetch("/api/club-requests");
      const data = await res.json().catch(() => ({}));
      if (cancelled) return;
      if (!res.ok) {
        setError(data.error ?? "Failed to load requests.");
        return;
      }
      setRequests(data.requests);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const decide = async (id: string, action: "approve" | "reject") => {
    setBusyId(id);
    setError(null);

    const res = await fetch(`/api/club-requests/${id}/${action}`, { method: "POST" });
    const data = await res.json().catch(() => ({}));

    setBusyId(null);

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setRequests((prev) => prev?.filter((r) => r._id !== id) ?? null);
  };

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (requests === null) return <p className="text-sm text-black/60 dark:text-white/60">Loading...</p>;
  if (requests.length === 0) return <p className="text-sm text-black/60 dark:text-white/60">No pending requests.</p>;

  return (
    <ul className="flex flex-col gap-4">
      {requests.map((req) => (
        <li key={req._id} className="border rounded-md p-4">
          <p className="font-medium">{req.name}</p>
          <p className="text-sm text-black/60 dark:text-white/60 mt-1">{req.description}</p>
          <p className="text-xs text-black/40 dark:text-white/40 mt-1">
            Requested by {req.requestedBy?.name} ({req.requestedBy?.email})
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => decide(req._id, "approve")}
              disabled={busyId === req._id}
              className="bg-black text-white dark:bg-white dark:text-black rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={() => decide(req._id, "reject")}
              disabled={busyId === req._id}
              className="border rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
