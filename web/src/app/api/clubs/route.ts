import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";

// Public: browsing clubs doesn't require auth (visitors can consult clubs
// per the report's actor model — only joining/posting does).
export async function GET() {
  await connectToDatabase();
  const clubs = await Club.find().sort({ createdAt: -1 }).populate("owner", "name").lean();
  return NextResponse.json({ clubs });
}
