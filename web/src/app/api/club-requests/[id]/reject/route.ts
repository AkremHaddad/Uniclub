import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-helpers";
import { connectToDatabase } from "@/lib/mongodb";
import { ClubRequest } from "@/models/ClubRequest";

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

  clubRequest.status = "rejected";
  await clubRequest.save();

  return NextResponse.json({ success: true });
}
