import { NextResponse } from "next/server";
import { requireClubOwner } from "@/lib/auth-helpers";
import { Membership } from "@/models/Membership";

// Only pending requests are surfaced here — the owner acts on those.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const check = await requireClubOwner(id);
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const memberships = await Membership.find({ club: id, status: "pending" })
    .populate("user", "name email")
    .sort({ createdAt: 1 })
    .lean();

  return NextResponse.json({ memberships });
}
