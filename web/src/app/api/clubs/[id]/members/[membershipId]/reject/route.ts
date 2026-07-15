import { NextResponse } from "next/server";
import { requireClubOwner } from "@/lib/auth-helpers";
import { Membership } from "@/models/Membership";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string; membershipId: string }> }
) {
  const { id, membershipId } = await params;
  const check = await requireClubOwner(id);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const membership = await Membership.findOne({ _id: membershipId, club: id });
  if (!membership) {
    return NextResponse.json({ error: "Membership request not found." }, { status: 404 });
  }
  if (membership.status !== "pending") {
    return NextResponse.json({ error: "This request has already been decided." }, { status: 409 });
  }

  membership.status = "rejected";
  await membership.save();

  return NextResponse.json({ success: true });
}
