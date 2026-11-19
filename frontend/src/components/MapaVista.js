"use client";

import { useCallback, useState } from "react";
import Pizarra from "./Pizarra";
import Esfera from "./Esfera";
import VentanaVideo from "./VentanaVideo";
import { anios } from "@/data/anios";

const ZOOM_MAX = 2.8;
const ZOOM_MIN = 1;
const FUENTE = 15;
const INTERLINEA = 17;
const MAX_CARACTERES = 22;

function encuadre(activos, ancho, alto) {
  const xs = activos.map((p) => p.x);
  const ys = activos.map((p) => p.y);
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
  const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
  const w = Math.max(x1 - x0, 1);
  const h = Math.max(y1 - y0, 1);

  const zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.min((ancho * 0.55) / w, (alto * 0.5) / h)));
  return { zoom, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 };
}

function envolver(texto) {
  const lineas = [];
  let actual = "";
  for (const palabra of texto.split(" ")) {
    const prueba = actual ? `${actual} ${palabra}` : palabra;
    if (prueba.length > MAX_CARACTERES && actual) {
      lineas.push(actual);
      actual = palabra;
    } else {
      actual = prueba;
    }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

function solape(a, b) {
  const w = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
  const h = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
  return w > 0 && h > 0 ? w * h : 0;
}

function fuera(r, v) {
  const area = (r.x1 - r.x0) * (r.y1 - r.y0);
  const w = Math.min(r.x1, v.x1) - Math.max(r.x0, v.x0);
  const h = Math.min(r.y1, v.y1) - Math.max(r.y0, v.y0);
  const dentro = w > 0 && h > 0 ? w * h : 0;
  return area - dentro;
}

// Reparte las etiquetas del año activo para que no se pisen entre sí, no tapen
// ninguna burbuja y no se salgan de la vista. Prueba varias posiciones y
// distancias para cada una y se queda con la que menos molesta.
function colocarEtiquetas(puntos, zoom, vista) {
  const k = 1 / zoom;
  const r = 13 * k;
  const burbujas = puntos.map((p) => ({ x0: p.x - r, x1: p.x + r, y0: p.y - r, y1: p.y + r }));
  const puestas = [];

  return puntos.map((p) => {
    const lineas = [...envolver(p.titulo), `(${p.lugar}, ${p.anio})`];
    const w = Math.max(...lineas.map((l) => l.length)) * FUENTE * 0.52 * k;
    const h = lineas.length * INTERLINEA * k;

    let mejor = null;

    for (let nivel = 0; nivel < 3; nivel++) {
      const d = r + 5 * k + nivel * 20 * k;
      const e = d * 0.7;
      const opciones = [
        { x0: p.x - w / 2, y0: p.y - d - h, ancla: "middle" },
        { x0: p.x + d, y0: p.y - h / 2, ancla: "start" },
        { x0: p.x - d - w, y0: p.y - h / 2, ancla: "end" },
        { x0: p.x - w / 2, y0: p.y + d, ancla: "middle" },
        { x0: p.x + e, y0: p.y - e - h, ancla: "start" },
        { x0: p.x - e - w, y0: p.y - e - h, ancla: "end" },
        { x0: p.x + e, y0: p.y + e, ancla: "start" },
        { x0: p.x - e - w, y0: p.y + e, ancla: "end" },
      ];

      for (const o of opciones) {
        const rect = { x0: o.x0, y0: o.y0, x1: o.x0 + w, y1: o.y0 + h };
        const px2 = 1 / (k * k);
        const coste =
          (puestas.reduce((s, q) => s + solape(rect, q), 0) * 3 +
            burbujas.reduce((s, q) => s + solape(rect, q), 0) * 3 +
            fuera(rect, vista) * 6) *
            px2 +
          nivel * 30;

        if (!mejor || coste < mejor.coste) mejor = { rect, ancla: o.ancla, nivel, coste };
      }
    }

    puestas.push(mejor.rect);

    const { rect, ancla } = mejor;
    const ax = ancla === "middle" ? rect.x0 + w / 2 : ancla === "start" ? rect.x0 : rect.x1;
    const guia = mejor.nivel > 0
      ? {
          x: Math.min(Math.max(p.x, rect.x0), rect.x1),
          y: Math.min(Math.max(p.y, rect.y0), rect.y1),
        }
      : null;

    return { p, lineas, ax, ay: rect.y0 + FUENTE * 0.8 * k, ancla, guia };
  });
}

export default function MapaVista({ contorno, ancho, alto, puntos }) {
  const [actual, setActual] = useState(0);
  const [abierto, setAbierto] = useState(null);
  const cerrarVentana = useCallback(() => setAbierto(null), []);

  const anio = anios[actual];
  const activos = puntos.filter((p) => p.anio === anio);
  const resto = puntos.filter((p) => p.anio !== anio);

  const { zoom, cx, cy } = activos.length
    ? encuadre(activos, ancho, alto)
    : { zoom: ZOOM_MAX, cx: ancho / 2, cy: alto / 2 };
  const tx = ancho / 2 - cx * zoom;
  const ty = alto / 2 - cy * zoom;
  const k = 1 / zoom;

  // Si varios eventos comparten lugar exacto, se abren en horizontal para poder pulsarlos.
  const colocados = activos.map((p) => {
    const mismos = activos.filter((q) => q.lat === p.lat && q.lng === p.lng);
    if (mismos.length < 2) return p;
    const j = mismos.indexOf(p);
    return { ...p, x: p.x + (j - (mismos.length - 1) / 2) * (30 / zoom) };
  });

  const margen = 8 * k;
  const vista = {
    x0: -tx / zoom + margen,
    x1: (ancho - tx) / zoom - margen,
    y0: -ty / zoom + margen,
    y1: (alto - ty) / zoom - margen,
  };
  const etiquetas = colocarEtiquetas(colocados, zoom, vista);

  return (
    <Pizarra base={<Esfera onCambio={(_, i) => setActual(i)} />}>
      <svg className="pz-mapa" viewBox={`0 0 ${ancho} ${alto}`} preserveAspectRatio="xMidYMid meet">
        <g className="pz-mapa-camara" style={{ transform: `translate(${tx}px, ${ty}px) scale(${zoom})` }}>
          <path
            d={contorno}
            fill="#e3d6b6"
            stroke="#231f20"
            strokeWidth="0.8"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {resto.map((p) => (
            <Burbuja key={p.orden} p={p} zoom={zoom} onAbrir={setAbierto} />
          ))}

          {etiquetas.map(({ p, guia }) =>
            guia ? (
              <line
                key={`g${p.orden}`}
                x1={p.x}
                y1={p.y}
                x2={guia.x}
                y2={guia.y}
                stroke="#231f20"
                strokeWidth="0.8"
                vectorEffect="non-scaling-stroke"
              />
            ) : null,
          )}

          {colocados.map((p) => (
            <Burbuja key={p.orden} p={p} zoom={zoom} onAbrir={setAbierto} activa />
          ))}

          {etiquetas.map(({ p, lineas, ax, ay, ancla }) => (
            <text
              key={`t${p.orden}`}
              x={ax}
              y={ay}
              textAnchor={ancla}
              className="pz-mapa-titulo"
              style={{ fontSize: FUENTE * k, strokeWidth: 4 * k }}
            >
              {lineas.map((l, i) => (
                <tspan key={i} x={ax} dy={i === 0 ? 0 : INTERLINEA * k}>
                  {l}
                </tspan>
              ))}
            </text>
          ))}
        </g>
      </svg>

      {abierto && <VentanaVideo evento={abierto} onCerrar={cerrarVentana} />}
    </Pizarra>
  );
}

function Burbuja({ p, zoom, activa, onAbrir }) {
  const k = 1 / zoom;

  const circulo = activa ? (
    <>
      <circle cx={p.x} cy={p.y} r={13 * k} fill="none" stroke="#d4181f" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <circle cx={p.x} cy={p.y} r={8 * k} fill="#d4181f" />
    </>
  ) : (
    <circle cx={p.x} cy={p.y} r={4.5 * k} fill="#f1e7d0" stroke="#231f20" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
  );

  return (
    <g
      className="pz-burbuja"
      role="button"
      tabIndex={0}
      aria-label={`${p.titulo}: abrir video`}
      onClick={() => onAbrir(p)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onAbrir(p);
        }
      }}
    >
      {circulo}
      <title>{p.titulo}</title>
    </g>
  );
}