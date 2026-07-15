import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { Post } from "@/models/Post";
import { Event } from "@/models/Event";
import { requireClubOwner } from "@/lib/auth-helpers";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();

  const club = await Club.findById(id).populate("owner", "name").lean();
  if (!club) {
    return NextResponse.json({ error: "Club not found." }, { status: 404 });
  }

  const [posts, events] = await Promise.all([
    Post.find({ club: id }).sort({ createdAt: -1 }).lean(),
    Event.find({ club: id }).sort({ date: 1 }).lean(),
  ]);

  return NextResponse.json({ club, posts, events });
}

// Owner-only: update this club's tags (used by the recommendation feature
// to match against a student's interests). Scoped via requireClubOwner,
// same ownership pattern as posts/events/member-approval.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const check = await requireClubOwner(id);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json().catch(() => null);
  if (!Array.isArray(body?.tags) || !body.tags.every((t: unknown) => typeof t === "string")) {
    return NextResponse.json({ error: "tags must be an array of strings." }, { status: 400 });
  }

  const tags = body.tags.map((t: string) => t.trim().toLowerCase()).filter(Boolean);
  check.club.tags = tags;
  await check.club.save();

  return NextResponse.json({ success: true, tags });
}
