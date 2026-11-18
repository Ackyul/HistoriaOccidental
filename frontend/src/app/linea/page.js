import Pizarra from "@/components/Pizarra";
import { lineas } from "@/data/lineas";

export default function Linea() {
  return (
    <main className="flex-1">
      <Pizarra>
        <section className="pz-linea" tabIndex={0} aria-label="Líneas de tiempo">
          {lineas.map((l) => (
            <div key={l.id} className="pz-linea-grupo">
              <h2 className="pz-linea-seccion">Línea de tiempo: {l.titulo}</h2>
              <ol>
                {l.hitos.map((h, i) => (
                  <li key={h.fecha}>
                    <span className="pz-linea-n">{i + 1}</span>
                    <p className="pz-linea-anio">{h.fecha}</p>
                    <h3>{h.texto}</h3>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>
      </Pizarra>
    </main>
  );
}
