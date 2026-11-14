import Pizarra from "@/components/Pizarra";
import { eventos } from "@/data/eventos";

export default function Linea() {
  return (
    <main className="flex-1">
      <Pizarra>
        <section className="pz-linea" tabIndex={0} aria-label="Línea del tiempo">
          <ol>
            {eventos.map((e) => (
              <li key={e.orden}>
                <span className="pz-linea-n">{e.orden}</span>
                <p className="pz-linea-anio">{e.anio}</p>
                <h2>{e.titulo}</h2>
                <p className="pz-linea-lugar">{e.lugar}</p>
                {e.video ? (
                  <a href={e.video} className="pz-linea-video">
                    Ver video
                  </a>
                ) : (
                  <span className="pz-linea-pendiente">Video pendiente</span>
                )}
              </li>
            ))}
          </ol>
        </section>
      </Pizarra>
    </main>
  );
}

