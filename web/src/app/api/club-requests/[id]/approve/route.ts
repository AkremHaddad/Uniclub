import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireRole } from "@/lib/auth-helpers";
import { connectToDatabase } from "@/lib/mongodb";
import { ClubRequest } from "@/models/ClubRequest";
import { Club } from "@/models/Club";
import { User } from "@/models/User";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireRole("admin");
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const { id } = await params;
  await connectToDatabase();

  const clubRequest = await ClubRequest.findById(id);
  if (!clubRequest) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }
  if (clubRequest.status !== "pending") {
    return NextResponse.json({ error: "This request has already been decided." }, { status: 409 });
  }

  // Approving does three things at once: mark the request approved, create
  // the Club, and promote the requester to clubOwner. If any one of these
  // failed partway (e.g. the process crashes between creating the Club and
  // updating the role) without a transaction, you'd end up with a Club that
  // has no real owner, or an "approved" request with no actual Club — a
  // real data-integrity risk, not a hypothetical one. A session transaction
  // makes the three writes atomic: either all of them land, or none do.
  const dbSession = await mongoose.startSession();
  try {
    let clubId: string | undefined;

    await dbSession.withTransaction(async () => {
      clubRequest.status = "approved";
      await clubRequest.save({ session: dbSession });

      const [club] = await Club.create(
        [{ name: clubRequest.name, description: clubRequest.description, owner: clubRequest.requestedBy }],
        { session: dbSession }
      );
      clubId = club._id.toString();

      await User.findByIdAndUpdate(
        clubRequest.requestedBy,
        { role: "clubOwner" },
        { session: dbSession }
      );
    });

    return NextResponse.json({ success: true, clubId }, { status: 200 });
  } finally {
    await dbSession.endSession();
  }
}
