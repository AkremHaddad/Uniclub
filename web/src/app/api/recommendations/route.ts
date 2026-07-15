import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { User } from "@/models/User";
import { Membership } from "@/models/Membership";

/**
 * The "AI recommendation system" from the original report, kept honest:
 * this is content-based filtering (score = count of overlapping tags
 * between the student's `interests` and a club's `tags`), not a trained
 * model. It's simple, explainable, and actually works for a small club
 * catalog — no reason to reach for anything heavier here.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  await connectToDatabase();

  const user = await User.findById(session.user.id).lean();
  const interests = (user?.interests ?? []).map((i: string) => i.toLowerCase());

  if (interests.length === 0) {
    return NextResponse.json({ recommendations: [], reason: "no_interests" });
  }

  // Don't recommend clubs the student is already a member of (approved or
  // pending) — recommendations should surface something new.
  const existingMemberships = await Membership.find({ user: session.user.id }).select("club").lean();
  const excludedClubIds = existingMemberships.map((m) => m.club);

  const clubs = await Club.find({
    _id: { $nin: excludedClubIds },
    tags: { $in: interests },
  }).lean();

  const scored = clubs
    .map((club) => ({
      club: { _id: club._id, name: club.name, description: club.description },
      score: club.tags.filter((t: string) => interests.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return NextResponse.json({ recommendations: scored });
}
