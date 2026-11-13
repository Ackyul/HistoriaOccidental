import Link from "next/link";
import Pizarra from "@/components/Pizarra";

export default function Home() {
  return (
    <main className="flex-1">
      <Pizarra>
        <section className="pz-portada">
          <div className="pz-estrella" />
          <h1>
            Comunismo <br />y <span>Maoísmo</span>
          </h1>
          <p>Proyecto de Historia: de las ideas de Marx a la China de Mao Zedong.</p>
          <Link href="/mapa" className="pz-entrar">
            Pasar a la experiencia interactiva
          </Link>
        </section>
      </Pizarra>
    </main>
  );
}
