"use client";

import { useState, useEffect } from "react";
import { anios } from "@/data/anios";

const PASO = 45;
const rad = (g) => ((g - 90) * Math.PI) / 180;
const cos = (g) => +Math.cos(rad(g)).toFixed(4);
const sin = (g) => +Math.sin(rad(g)).toFixed(4);

export function animarSalidaEsfera(onComplete) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ocultar-esfera"));
    if (onComplete) {
      setTimeout(onComplete, 420);
    }
  } else if (onComplete) {
    onComplete();
  }
}

function Flecha({ dir, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "izq" ? "Años anteriores" : "Años siguientes"}
      className="pz-flecha"
    >
      <svg viewBox="0 0 40 24" fill="none" style={dir === "izq" ? { transform: "scaleX(-1)" } : undefined}>
        <path d="M2 12h28" stroke="url(#oro)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M22 3l12 9-12 9" stroke="url(#oro)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12c-1-3 1-5 3-5" stroke="url(#oro)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M2 12c-1 3 1 5 3 5" stroke="url(#oro)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export default function Esfera({ onCambio }) {
  const [pos, setPos] = useState(0);
  const [saliendo, setSaliendo] = useState(false);
  const max = Math.max(anios.length - 1, 0);

  useEffect(() => {
    function onOcultar() {
      setSaliendo(true);
    }
    window.addEventListener("ocultar-esfera", onOcultar);
    return () => window.removeEventListener("ocultar-esfera", onOcultar);
  }, []);

  function mover(paso) {
    const nuevo = Math.min(Math.max(pos + paso, 0), max);
    if (nuevo === pos) return;
    setPos(nuevo);
    onCambio?.(anios[nuevo], nuevo);
  }

  return (
    <div className={`pz-base ${saliendo ? "saliendo" : ""}`}>
      <Flecha dir="izq" onClick={() => mover(-1)} disabled={pos === 0} />

      <div className="pz-domo">
        <svg className="pz-disco" viewBox="-100 -100 200 200">
          <circle r="97" fill="#231f20" />
          {[-67.5, 67.5].map((g) => (
            <g key={g}>
              <circle cx={cos(g) * 72} cy={sin(g) * 72} r="3.2" fill="url(#oro)" />
              <path d={`M${cos(g) * 50} ${sin(g) * 50}L${cos(g) * 60} ${sin(g) * 60}`} stroke="url(#oro)" strokeWidth="1" strokeLinecap="round" />
            </g>
          ))}
          <circle r="97" fill="none" stroke="url(#oro)" strokeWidth="3" />
          <circle r="84" fill="none" stroke="url(#oro)" strokeWidth="0.8" />
          <circle r="30" fill="none" stroke="url(#oro)" strokeWidth="2" />
          <path d="M0-22q7 10 0 22-7-12 0-22zM0 22q7-10 0-22-7 12 0 22z" fill="url(#oro)" />
        </svg>

        <div className="pz-anios">
          {anios.map((anio, i) => {
            const angulo = (i - pos) * PASO;
            const visible = i === pos;
            return (
              <span
                key={i}
                className="pz-anio"
                style={{ transform: `translate(-50%, -50%) rotate(${angulo}deg) translateY(calc(var(--r) * -0.58))`, opacity: visible ? 1 : 0 }}
                aria-hidden={!visible}
              >
                {anio ?? "····"}
              </span>
            );
          })}
        </div>

        <div className="pz-brillo" />
      </div>

      <Flecha dir="der" onClick={() => mover(1)} disabled={pos === max} />
    </div>
  );
}
