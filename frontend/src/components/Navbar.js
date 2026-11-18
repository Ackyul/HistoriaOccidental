"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animarSalidaEsfera } from "./Esfera";

const secciones = [
  { nombre: "Home", href: "/" },
  { nombre: "Relaciones Históricas", href: "/relaciones" },
  { nombre: "Mapa", href: "/mapa" },
  { nombre: "Línea", href: "/linea" },
];

function Separador() {
  return (
    <svg className="pz-nav-sep" viewBox="0 0 12 24" aria-hidden="true">
      <path d="M6 1v7M6 16v7" stroke="url(#oro)" strokeWidth="1" />
      <path d="M6 9l3 3-3 3-3-3z" fill="url(#oro)" />
    </svg>
  );
}

export default function Navbar() {
  const ruta = usePathname();
  const router = useRouter();
  const [navegando, setNavegando] = useState(false);
  const [prevRuta, setPrevRuta] = useState(ruta);

  if (prevRuta !== ruta) {
    setPrevRuta(ruta);
    setNavegando(false);
  }

  function navegarA(e, href) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    if (ruta === href) {
      e.preventDefault();
      return;
    }

    // Al salir de /mapa la esfera baja antes de cambiar de página.
    if (ruta === "/mapa") {
      e.preventDefault();
      if (navegando) return;
      setNavegando(true);
      animarSalidaEsfera(() => router.push(href));
    }
  }

  return (
    <nav className="pz-nav" aria-label="Navegación principal">
      <div className="pz-nav-desktop">
        {secciones.map((s, i) => (
          <div key={s.href} className="contents">
            {i > 0 && <Separador />}
            <Link
              href={s.href}
              onClick={(e) => navegarA(e, s.href)}
              className={`pz-nav-item ${ruta === s.href ? "activo" : ""}`}
            >
              {s.nombre}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}
