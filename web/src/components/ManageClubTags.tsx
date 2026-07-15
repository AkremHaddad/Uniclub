"use client";

import { useState } from "react";

export function ManageClubTags({ clubId, initialTags }: { clubId: string; initialTags: string[] }) {
  const [value, setValue] = useState(initialTags.join(", "));
  const [status, setStatus] = useState<"idle" | "loading" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch(`/api/clubs/${clubId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tags }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setStatus("saved");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <p className="text-sm text-black/60 dark:text-white/60">
        Comma-separated — students with matching interests will see this club recommended to them.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setStatus("idle");
        }}
        placeholder="e.g. robotics, ai, hardware"
        className="border rounded-md px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-1.5 text-sm font-medium disabled:opacity-50"
      >
        {status === "loading" ? "Saving..." : status === "saved" ? "Saved" : "Save tags"}
      </button>
    </form>
  );
}
