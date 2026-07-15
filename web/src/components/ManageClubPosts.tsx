"use client";

import { useState } from "react";

export function ManageClubPosts({ clubId }: { clubId: string }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const res = await fetch(`/api/clubs/${clubId}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setStatus("idle");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a post..."
        required
        rows={3}
        className="border rounded-md px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start bg-black text-white dark:bg-white dark:text-black rounded-md px-4 py-1.5 text-sm font-medium disabled:opacity-50"
      >
        {status === "loading" ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
