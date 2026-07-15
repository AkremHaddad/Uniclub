import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";

export const dynamic = "force-dynamic"; // club list changes often, no reason to cache

interface ClubListItem {
  _id: string;
  name: string;
  description: string;
}

export default async function ClubsPage() {
  await connectToDatabase();
  const clubs = (await Club.find().sort({ createdAt: -1 }).lean()) as unknown as ClubListItem[];

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full p-8">
      <h1 className="text-2xl font-semibold mb-6">Clubs</h1>

      {clubs.length === 0 ? (
        <p className="text-black/60 dark:text-white/60">No clubs yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {clubs.map((club) => (
            <li key={club._id} className="border rounded-md p-4">
              <Link href={`/clubs/${club._id}`} className="font-medium hover:underline">
                {club.name}
              </Link>
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">{club.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
