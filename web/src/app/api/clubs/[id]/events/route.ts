import { NextResponse } from "next/server";
import { requireClubOwner } from "@/lib/auth-helpers";
import { Event } from "@/models/Event";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const check = await requireClubOwner(id);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  const location = typeof body?.location === "string" ? body.location.trim() : "";
  const dateRaw = typeof body?.date === "string" ? body.date : "";
  const date = dateRaw ? new Date(dateRaw) : null;

  if (!title || !description || !location || !date || Number.isNaN(date.getTime())) {
    return NextResponse.json(
      { error: "Title, description, location, and a valid date are required." },
      { status: 400 }
    );
  }

  const event = await Event.create({ club: id, title, description, location, date });
  return NextResponse.json({ event }, { status: 201 });
}
