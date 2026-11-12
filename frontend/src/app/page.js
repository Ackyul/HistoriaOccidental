import Link from "next/link";
import Pizarra from "@/components/Pizarra";

export default function Home() {
  return (
    <main className="flex-1">
      <Pizarra>
        <div className="flex h-full items-center justify-center">
          <Link
            href="/experiencia"
            className="border border-foreground px-6 py-3 font-serif text-lg tracking-wide transition-colors hover:bg-foreground hover:text-background"
          >
            Pasar a la experiencia interactiva
          </Link>
        </div>
      </Pizarra>
    </main>
  );
}
