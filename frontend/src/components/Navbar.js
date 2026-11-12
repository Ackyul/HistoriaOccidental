"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const secciones = [
  { nombre: "Home", href: "/" },
  { nombre: "Mapa", href: "/mapa" },
  null,
  null,
  null,
];

function Separador({ className = "" }) {
  return (
    <svg className={`pz-nav-sep ${className}`} viewBox="0 0 12 24" aria-hidden="true">
      <path d="M6 1v7M6 16v7" stroke="url(#oro)" strokeWidth="1" />
      <path d="M6 9l3 3-3 3-3-3z" fill="url(#oro)" />
    </svg>
  );
}

export default function Navbar() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [prevRuta, setPrevRuta] = useState(ruta);

  // Cerrar menú móvil al cambiar de ruta ajustando estado durante render
  if (prevRuta !== ruta) {
    setPrevRuta(ruta);
    setAbierto(false);
  }

  // Cerrar menú móvil con Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setAbierto(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Cerrar menú móvil si la ventana se amplía a escritorio
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 640) setAbierto(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const seccionActual = secciones.find((s) => s && s.href === ruta);
  const seccionesValidas = secciones.filter(Boolean);

  return (
    <>
      <nav className="pz-nav" aria-label="Navegación principal">
        {/* Vista de escritorio / tablet (>= 640px) */}
        <div className="pz-nav-desktop">
          {secciones.map((s, i) => (
            <div key={i} className="contents">
              {i > 0 && <Separador className={s ? "" : "pz-nav-sep-vacio"} />}
              {s ? (
                <Link
                  href={s.href}
                  className={`pz-nav-item ${ruta === s.href ? "activo" : ""}`}
                >
                  {s.nombre}
                </Link>
              ) : (
                <span className="pz-nav-item vacio" />
              )}
            </div>
          ))}
        </div>

        {/* Vista móvil (< 640px): botón desplegable elegante */}
        <div className="pz-nav-mobile">
          <button
            type="button"
            className="pz-nav-mobile-btn"
            onClick={() => setAbierto((prev) => !prev)}
            aria-expanded={abierto}
            aria-controls="pz-nav-mobile-menu"
            aria-label={abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            <span className="pz-nav-mobile-badge">
              <span className="pz-nav-diamond">❖</span>
              <span className="pz-nav-mobile-title">{seccionActual?.nombre || "Menú"}</span>
            </span>

            <svg className="pz-nav-mobile-icon" viewBox="0 0 24 24" aria-hidden="true">
              {abierto ? (
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="url(#oro)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path d="M4 7h16" stroke="url(#oro)" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M4 12h16" stroke="url(#oro)" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M4 17h16" stroke="url(#oro)" strokeWidth="2.2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Desplegable móvil con temática clásica de madera y oro */}
      {abierto && (
        <div className="pz-nav-mobile-overlay">
          <div
            className="pz-nav-mobile-backdrop"
            onClick={() => setAbierto(false)}
            aria-hidden="true"
          />
          <div
            id="pz-nav-mobile-menu"
            className="pz-nav-mobile-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="pz-nav-mobile-header">
              <span className="pz-nav-diamond">❖</span>
              <span className="pz-nav-mobile-heading">Historia Occidental</span>
              <span className="pz-nav-diamond">❖</span>
            </div>

            <div className="pz-nav-mobile-list">
              {seccionesValidas.map((s, idx) => {
                const activo = ruta === s.href;
                return (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setAbierto(false)}
                    className={`pz-nav-mobile-link ${activo ? "activo" : ""}`}
                  >
                    <span className="pz-nav-mobile-num">
                      {idx === 0 ? "I." : idx === 1 ? "II." : `${idx + 1}.`}
                    </span>
                    <span className="pz-nav-mobile-name">{s.nombre}</span>
                    {activo && <span className="pz-nav-diamond ml-auto">❖</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

