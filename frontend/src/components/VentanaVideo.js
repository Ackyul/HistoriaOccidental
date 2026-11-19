"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { urlIncrustada } from "@/lib/video";

export default function VentanaVideo({ evento, onCerrar }) {
  const cerrar = useRef(null);

  useEffect(() => {
    cerrar.current?.focus();
    function onKey(e) {
      if (e.key === "Escape") onCerrar();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCerrar]);

  const incrustada = evento.video ? urlIncrustada(evento.video) : null;

  return createPortal(
    <div className="pz-ventana-fondo" onClick={onCerrar}>
      <div
        className="pz-ventana"
        role="dialog"
        aria-modal="true"
        aria-label={evento.titulo}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <div>
            <h2>{evento.titulo}</h2>
            <p>
              {evento.lugar}, {evento.anio}
            </p>
          </div>
          <button ref={cerrar} type="button" onClick={onCerrar} aria-label="Cerrar">
            Cerrar
          </button>
        </header>

        <div className="pz-ventana-video">
          {incrustada ? (
            <iframe
              src={incrustada}
              title={evento.titulo}
              allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : evento.video ? (
            <video src={evento.video} autoPlay playsInline />
          ) : (
            <span>El video se añadirá aquí</span>
          )}
        </div>

        {evento.descripcion && <p className="pz-ventana-desc">{evento.descripcion}</p>}
      </div>
    </div>,
    document.body,
  );
}
