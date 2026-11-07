import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Link
        href="/experiencia"
        className="border border-foreground px-6 py-3 font-serif text-lg tracking-wide transition-colors hover:bg-foreground hover:text-background"
      >
        Pasar a la experiencia interactiva
      </Link>
    </main>
  );
}
