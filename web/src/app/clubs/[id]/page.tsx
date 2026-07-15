import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { Club } from "@/models/Club";
import { Post } from "@/models/Post";
import { Event } from "@/models/Event";
import { JoinClubButton } from "@/components/JoinClubButton";

export const dynamic = "force-dynamic";

interface ClubDoc {
  _id: string;
  name: string;
  description: string;
}
interface PostDoc {
  _id: string;
  content: string;
  createdAt: string;
}
interface EventDoc {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}

export default async function ClubDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectToDatabase();

  const club = (await Club.findById(id).lean()) as unknown as ClubDoc | null;
  if (!club) notFound();

  const [posts, events] = await Promise.all([
    Post.find({ club: id }).sort({ createdAt: -1 }).lean() as unknown as Promise<PostDoc[]>,
    Event.find({ club: id }).sort({ date: 1 }).lean() as unknown as Promise<EventDoc[]>,
  ]);

  return (
    <main className="flex-1 max-w-3xl mx-auto w-full p-8 flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{club.name}</h1>
          <p className="text-black/60 dark:text-white/60 mt-1">{club.description}</p>
        </div>
        <JoinClubButton clubId={id} />
      </div>

      <section>
        <h2 className="text-lg font-medium mb-3">Upcoming events</h2>
        {events.length === 0 ? (
          <p className="text-sm text-black/60 dark:text-white/60">No events yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {events.map((event) => (
              <li key={event._id} className="border rounded-md p-3">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-black/60 dark:text-white/60">
                  {new Date(event.date).toLocaleString()} — {event.location}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-medium mb-3">Posts</h2>
        {posts.length === 0 ? (
          <p className="text-sm text-black/60 dark:text-white/60">No posts yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {posts.map((post) => (
              <li key={post._id} className="border rounded-md p-3">
                <p>{post.content}</p>
                <p className="text-xs text-black/40 dark:text-white/40 mt-1">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
