"use client";

import { useState } from "react";

export function ManageClubEvents({ clubId }: { clubId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const res = await fetch(`/api/clubs/${clubId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, location, date }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setStatus("idle");
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title"
        required
        className="border rounded-md px-3 py-2 text-sm"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        rows={2}
        className="border rounded-md px-3 py-2 text-sm"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
        className="border rounded-md px-3 py-2 text-sm"
      />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="border rounded-md px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-1.5 text-sm font-medium disabled:opacity-50"
      >
        {status === "loading" ? "Creating..." : "Create event"}
      </button>
    </form>
  );
}
