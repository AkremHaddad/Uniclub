"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function JoinClubButton({ clubId }: { clubId: string }) {
  const { data: session, status } = useSession();
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (status === "loading") return null;

  if (!session) {
    return (
      <Link href="/login" className="underline text-sm">
        Log in to request to join
      </Link>
    );
  }

  const handleJoin = async () => {
    setState("loading");
    setMessage(null);

    const res = await fetch(`/api/clubs/${clubId}/join`, { method: "POST" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setState("error");
      setMessage(data.error ?? "Something went wrong.");
      return;
    }

    setState("sent");
  };

  if (state === "sent") {
    return <p className="text-sm text-black/60 dark:text-white/60">Join request sent.</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleJoin}
        disabled={state === "loading"}
        className="bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
      >
        {state === "loading" ? "Requesting..." : "Request to join"}
      </button>
      {message && <p className="text-sm text-red-600">{message}</p>}
    </div>
  );
}
