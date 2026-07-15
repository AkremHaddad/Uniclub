import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { ManageClubPosts } from "@/components/ManageClubPosts";
import { ManageClubEvents } from "@/components/ManageClubEvents";
import { ManageClubMembers } from "@/components/ManageClubMembers";
import { ManageClubTags } from "@/components/ManageClubTags";

export const dynamic = "force-dynamic";

export default async function ManageClubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  await connectToDatabase();
  const club = await Club.findById(id).lean();
  if (!club) notFound();

  // Checked server-side, same reasoning as /admin/club-requests — a
  // non-owner never sees the manage UI shell, not just a failed fetch.
  if (!session?.user || club.owner.toString() !== session.user.id) {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <p className="text-black/60 dark:text-white/60">You don&apos;t have access to this page.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-2xl mx-auto w-full p-8 flex flex-col gap-10">
      <h1 className="text-2xl font-semibold">Manage {club.name}</h1>

      <section>
        <h2 className="text-lg font-medium mb-3">Tags</h2>
        <ManageClubTags clubId={id} initialTags={club.tags ?? []} />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">New post</h2>
        <ManageClubPosts clubId={id} />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">New event</h2>
        <ManageClubEvents clubId={id} />
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">Pending join requests</h2>
        <ManageClubMembers clubId={id} />
      </section>
    </main>
  );
}
