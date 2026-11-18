import Pizarra from "@/components/Pizarra";
import Relacion from "@/components/Relacion";
import { relaciones } from "@/data/relaciones";

export default function Relaciones() {
  return (
    <main className="flex-1">
      <Pizarra>
        <section className="pz-rel" tabIndex={0} aria-label="Relaciones históricas">
          <h1>Relaciones históricas</h1>
          <div className="pz-rel-cols">
            {relaciones.map((r) => (
              <Relacion key={r.id} r={r} />
            ))}
          </div>
        </section>
      </Pizarra>
    </main>
  );
}
