import { auth } from "@/auth";
import type { UserRole } from "@/models/User";

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
