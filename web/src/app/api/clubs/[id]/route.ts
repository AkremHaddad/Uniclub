import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { Post } from "@/models/Post";
import { Event } from "@/models/Event";

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
