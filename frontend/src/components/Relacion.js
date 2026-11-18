"use client";

import { useState } from "react";

export default function Relacion({ r }) {
  const [abierto, setAbierto] = useState(false);

  const i = r.evento.indexOf(r.resaltar);
  const antes = r.evento.slice(0, i);
  const despues = r.evento.slice(i + r.resaltar.length);

  return (
    <article className="pz-rel-bloque">
      <h2>{r.titulo}</h2>

      <h3>¿Dónde comenzó?</h3>
      <p>{r.donde}</p>

      <h3>Evento histórico</h3>
      <p>
        {antes}
        <button
          type="button"
          className="pz-rel-nombre"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          {r.resaltar}
        </button>
        {despues}
      </p>

      {abierto && (
        <aside className="pz-rel-personaje">
          <h4>
            Personaje histórico: {r.personaje.nombre} ({r.personaje.anios})
          </h4>
          <p>{r.personaje.texto}</p>
        </aside>
      )}
    </article>
  );
}
