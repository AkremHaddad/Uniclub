import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { requireRole } from "@/lib/auth-helpers";
import { connectToDatabase } from "@/lib/mongodb";
import { ClubRequest } from "@/models/ClubRequest";

// Any logged-in user can request to register a new club (per the report,
// this is a Student action — but there's no reason to also gate it to
// role "student" specifically, since clubOwners/admins aren't prevented
// from also proposing a new club).
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";

  if (!name || !description) {
    return NextResponse.json({ error: "Name and description are required." }, { status: 400 });
  }

  await connectToDatabase();
  await ClubRequest.create({ requestedBy: session.user.id, name, description, status: "pending" });

  return NextResponse.json({ success: true }, { status: 201 });
}

// Admin-only: list pending requests for the review dashboard.
export async function GET() {
  const check = await requireRole("admin");
  if (!check.ok) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  await connectToDatabase();
  const requests = await ClubRequest.find({ status: "pending" })
    .sort({ createdAt: 1 })
    .populate("requestedBy", "name email")
    .lean();

  return NextResponse.json({ requests });
}
