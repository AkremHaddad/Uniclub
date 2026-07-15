import type { DefaultSession } from "next-auth";

// Auth.js's default Session/JWT types don't know about our custom fields
// (role, id) — without this augmentation, session.user.role would be a
// TypeScript error everywhere it's read.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
