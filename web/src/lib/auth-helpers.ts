import { auth } from "@/auth";
import type { UserRole } from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";

/**
 * Role-based access control helper. Server routes/pages that need a
 * specific role call this instead of re-implementing the same
 * session-check + role-check + error-shape logic everywhere.
 */
export async function requireRole(...allowed: UserRole[]) {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, status: 401, error: "You must be logged in." };
  }
  if (!allowed.includes(session.user.role as UserRole)) {
    return { ok: false as const, status: 403, error: "You don't have permission to do that." };
  }
  return { ok: true as const, session };
}

/**
 * Ownership check, distinct from requireRole: having the "clubOwner" role
 * only means you own *some* club, not this one. Multiple club owners exist
 * in the system, each managing only their own club — every route that lets
 * an owner manage a club (post, event, member approval) needs to check
 * against *this specific* club's `owner` field, not just the role.
 */
export async function requireClubOwner(clubId: string) {
  const session = await auth();
  if (!session?.user) {
    return { ok: false as const, status: 401, error: "You must be logged in." };
  }

  await connectToDatabase();
  const club = await Club.findById(clubId);
  if (!club) {
    return { ok: false as const, status: 404, error: "Club not found." };
  }
  if (club.owner.toString() !== session.user.id) {
    return { ok: false as const, status: 403, error: "You don't own this club." };
  }

  return { ok: true as const, session, club };
}
