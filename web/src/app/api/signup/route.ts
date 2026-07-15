import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const studyField = typeof body?.studyField === "string" ? body.studyField.trim() : "";
  // Optional at signup, per the report — used only by the recommendation
  // feature to match against club tags, so leaving it blank just means no
  // recommendations rather than blocking signup.
  const interests: string[] = Array.isArray(body?.interests)
    ? body.interests.filter((i: unknown): i is string => typeof i === "string" && i.trim().length > 0).map((i: string) => i.trim().toLowerCase())
    : [];

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  await connectToDatabase();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // Everyone signs up as a student; becoming a club owner or admin is a
  // separate, deliberate action (creating/being granted a club, or manual
  // promotion by an admin) — not something set at signup time.
  await User.create({ name, email, passwordHash, role: "student", studyField, interests });

  return NextResponse.json({ success: true }, { status: 201 });
}
