import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { Membership } from "@/models/Membership";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in to request to join a club." }, { status: 401 });
  }

  const { id } = await params;
  await connectToDatabase();

  const club = await Club.findById(id);
  if (!club) {
    return NextResponse.json({ error: "Club not found." }, { status: 404 });
  }

  try {
    await Membership.create({ user: session.user.id, club: id, status: "pending" });
  } catch (err) {
    // Duplicate key from the unique (user, club) index — they already have
    // a membership record (pending, approved, or rejected) for this club.
    if (err && typeof err === "object" && "code" in err && err.code === 11000) {
      return NextResponse.json(
        { error: "You've already requested to join this club." },
        { status: 409 }
      );
    }
    throw err;
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
