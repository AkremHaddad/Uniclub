import { auth } from "@/auth";
import { AdminClubRequestsList } from "@/components/AdminClubRequestsList";

export default async function AdminClubRequestsPage() {
  const session = await auth();

  // Checked server-side so a non-admin never even gets the page shell, not
  // just a failed fetch inside it (the API route enforces this too, but
  // defense in depth is cheap here and avoids a flash of admin UI).
  if (!session?.user || session.user.role !== "admin") {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <p className="text-black/60 dark:text-white/60">You don&apos;t have access to this page.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full p-8">
      <h1 className="text-2xl font-semibold mb-6">Pending club requests</h1>
      <AdminClubRequestsList />
    </main>
  );
}
