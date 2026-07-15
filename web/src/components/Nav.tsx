"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Nav() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-semibold">
          UniClub
        </Link>
        <Link href="/clubs" className="text-sm underline">
          Clubs
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {status === "loading" ? null : session ? (
          <>
            <span className="text-black/60 dark:text-white/60">
              {session.user?.name} ({session.user?.role})
            </span>
            <button onClick={() => signOut()} className="underline">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="underline">
              Log in
            </Link>
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
