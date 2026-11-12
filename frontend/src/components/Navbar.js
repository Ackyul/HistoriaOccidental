"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const secciones = [
  { nombre: "Home", href: "/" },
  { nombre: "Mapa", href: "/mapa" },
  null,
  null,
  null,
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

  return (
    <nav className="pz-nav">
      {secciones.map((s, i) => (
        <div key={i} className="contents">
          {i > 0 && <Separador />}
          {s ? (
            <Link href={s.href} className={`pz-nav-item ${ruta === s.href ? "activo" : ""}`}>
              {s.nombre}
            </Link>
          ) : (
            <span className="pz-nav-item vacio" />
          )}
        </div>
      ))}
    </nav>
  );
}

