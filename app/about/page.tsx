import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold text-zinc-900">About</h1>
      <p className="mb-6 text-zinc-700">
        A small to-do app built with Next.js, React and Tailwind for the Blotz
        Frontend Learning course. The data comes from a json-server API.
      </p>
      <Link href="/" className="font-medium text-blue-600 hover:underline">
        ← Back to my to-dos
      </Link>
    </main>
  );
}
