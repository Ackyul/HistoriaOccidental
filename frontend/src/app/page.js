import Link from "next/link";
import Pizarra from "@/components/Pizarra";

export default function Home() {
  return (
    <main className="flex-1">
      <Pizarra>
        <div className="pz-home" tabIndex={0}>
          <section className="pz-texto">
            <h1>
              Estalinismo en la Unión Soviética <br />y <span>Maoísmo en China</span>
            </h1>

            <h2>Pregunta central</h2>
            <p className="pz-pregunta">
              ¿De qué manera el estalinismo en la Unión Soviética y el maoísmo en China adaptaron el comunismo a sus
              realidades nacionales, y qué similitudes y diferencias marcaron sus estrategias de control político,
              transformación económica y costo social?
            </p>

            <h2>Contexto histórico</h2>
            <p>
              En el siglo XX, el comunismo emergió como una de las fuerzas políticas más influyentes del planeta. Lejos
              de desarrollarse en los países industrializados como preveía la teoría marxista original, este modelo
              triunfó en dos gigantes agrarios: Rusia y China. Bajo el liderazgo de Iósif Stalin y Mao Zedong,
              respectivamente, ambos países atravesaron procesos acelerados y traumáticos de modernización,
              colectivización y control ideológico absoluto, dando forma a dos de los regímenes totalitarios más
              determinantes de la historia contemporánea.
            </p>

            <Link href="/mapa" className="pz-entrar">
              Pasar a la experiencia interactiva
            </Link>
          </section>
        </div>
      </Pizarra>
    </main>
  );
}
