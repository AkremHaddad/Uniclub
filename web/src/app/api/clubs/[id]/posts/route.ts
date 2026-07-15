import { NextResponse } from "next/server";
import { requireClubOwner } from "@/lib/auth-helpers";
import { Post } from "@/models/Post";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const check = await requireClubOwner(id);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json().catch(() => null);
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  if (!content) {
    return NextResponse.json({ error: "Post content is required." }, { status: 400 });
  }

  const post = await Post.create({ club: id, content });
  return NextResponse.json({ post }, { status: 201 });
}
