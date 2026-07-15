export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold">UniClub</h1>
      <p className="text-sm text-black/60 dark:text-white/60 max-w-md">
        Rebuild in progress — see <code>PROJECT_REPORT.md</code> in the repo
        root for the full spec (actors, requirements, UI reference) this is
        being rebuilt from, and <code>CLAUDE.md</code> for current status.
      </p>
    </main>
  );
}
