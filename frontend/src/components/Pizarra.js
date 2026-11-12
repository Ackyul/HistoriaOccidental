import Navbar from "./Navbar";

const mitad = "calc(var(--grosor) / 2)";

function Esquina({ className, style }) {
  return (
    <svg className={`pz-adorno ${className}`} style={style} viewBox="0 0 100 100" fill="none">
      <path d="M7 62V15Q7 7 15 7H62" stroke="url(#oro)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M15 48V19Q15 15 19 15H48" stroke="url(#oro)" strokeWidth="1.3" />
      <path d="M62 7c8 0 13 4 13 9.5 0 4-3 6.5-6.5 6.5-3 0-4.5-2-4.5-4.2" stroke="url(#oro)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M7 62c0 8 4 13 9.5 13 4 0 6.5-3 6.5-6.5 0-3-2-4.5-4.2-4.5" stroke="url(#oro)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 20q13 3 17 17-13-3-17-17z" fill="url(#oro)" />
      <path d="M26 30q-6 6-4 14M30 26q6-6 14-4" stroke="url(#oro)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="42" cy="42" r="2.2" fill="url(#oro)" />
    </svg>
  );
}

function Remate({ style }) {
  return (
    <svg className="pz-adorno pz-remate" style={style} viewBox="0 0 160 40" fill="none">
      <path d="M56 20H24c-8 0-12 5-12 9.5 0 4 3 6.5 6.5 6.5 3 0 4.5-2 4.5-4.2" stroke="url(#oro)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M104 20h32c8 0 12 5 12 9.5 0 4-3 6.5-6.5 6.5-3 0-4.5-2-4.5-4.2" stroke="url(#oro)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M52 15H34M108 15h18" stroke="url(#oro)" strokeWidth="1" strokeLinecap="round" />
      <path d="M80 20q-13-9-23 0 11 7 23 0zM80 20q13-9 23 0-11 7-23 0z" fill="url(#oro)" />
      <path d="M80 4q8 9 0 24-8-15 0-24z" fill="url(#oro)" />
      <circle cx="80" cy="33" r="2" fill="url(#oro)" />
      <circle cx="30" cy="10" r="1.6" fill="url(#oro)" />
      <circle cx="130" cy="10" r="1.6" fill="url(#oro)" />
    </svg>
  );
}

function enBorde(lado, pos) {
  if (lado === "arriba") return { top: mitad, left: pos, transform: "translate(-50%, -50%)" };
  if (lado === "abajo") return { bottom: mitad, left: pos, transform: "translate(-50%, 50%)" };
  if (lado === "izq") return { left: mitad, top: pos, transform: "translate(-50%, -50%) rotate(90deg)" };
  return { right: mitad, top: pos, transform: "translate(50%, -50%) rotate(-90deg)" };
}

const grietas = [
  ["arriba", "14.5%", "M0 13l11-2 7 4 12-6 5 3 15-5 6 3 14-4M30 9l3-7M50 5l4 6", 82],
  ["abajo", "21%", "M0 10l10-3 8 3 9-4 6 2M18 10l-1 6", 36],
  ["abajo", "67%", "M0 8l13 2 5-4 11 3 9-2 7 4 12-1M29 9l4 7", 60],
  ["abajo", "84%", "M0 9l6-3 11 2 4-3 9 4", 34],
  ["izq", "30%", "M0 9l12-3 6 4 14-3 5 3 12-4M32 7l2-6", 54],
  ["izq", "66%", "M0 8l9 2 5-3 10 3 8-2", 34],
  ["der", "32%", "M0 7l8 3 11-2 6 4 13-3M19 8l3 7", 40],
  ["der", "69%", "M0 10l10-4 7 3 12-2 6 3 9-3M17 9l-2 7", 56],
];

const clavos = [
  ["abajo", "29%"], ["abajo", "72%"],
  ["izq", "21%"], ["izq", "79%"],
  ["der", "22%"], ["der", "80%"],
];

const vetas = [
  { d: "M0 0l6 14-3 9 8 12-2 10 7 15M6 14l9 4M11 35l-8 6", w: 22, h: 62, style: { top: 0, left: "31%" } },
  { d: "M0 0l-5 11 4 8-6 13 3 6M-1 19l8 3", w: 14, h: 40, style: { top: 0, right: "22%" } },
  { d: "M0 60l7-12-2-9 9-11-1-8 6-14M5 39l-8-4M14 20l7 3", w: 24, h: 60, style: { bottom: 0, left: "68%" } },
  { d: "M0 0l13 4 8-3 11 6 7-2M21 1l3 8", w: 42, h: 12, style: { top: "57%", left: 0 } },
  { d: "M40 0l-12 5-7-2-10 6-11-1M21 3l-2 8", w: 42, h: 12, style: { top: "41%", right: 0 } },
];

export default function Pizarra({ children, base }) {
  return (
    <div className="pz-marco">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="oro" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d4181f" />
            <stop offset="0.45" stopColor="#d4181f" />
            <stop offset="0.7" stopColor="#8f0f14" />
            <stop offset="1" stopColor="#ff4a50" />
          </linearGradient>
        </defs>
      </svg>

      {grietas.map(([lado, pos, d, w], i) => (
        <svg key={i} className="pz-grieta" style={{ ...enBorde(lado, pos), transform: `${enBorde(lado, pos).transform} scale(1.8)` }} width={w} height="18" viewBox={`0 0 ${w} 18`} fill="none">
          <path d={d} stroke="url(#oro)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      ))}

      {clavos.map(([lado, pos], i) => (
        <span key={i} className="pz-clavo" style={{ ...enBorde(lado, pos), transform: enBorde(lado, pos).transform.replace(/ rotate\(.*\)/, "") }} />
      ))}

      <Remate style={enBorde("izq", "50%")} />
      <Remate style={enBorde("der", "50%")} />

      <Navbar />

      <Esquina className="pz-esquina" style={{ top: 2, left: 2 }} />
      <Esquina className="pz-esquina" style={{ top: 2, right: 2, transform: "scaleX(-1)" }} />
      <Esquina className="pz-esquina" style={{ bottom: 2, left: 2, transform: "scaleY(-1)" }} />
      <Esquina className="pz-esquina" style={{ bottom: 2, right: 2, transform: "scale(-1)" }} />

      <div className="pz-superficie">
        <div className="pz-filete" />

        {vetas.map((v, i) => (
          <svg key={i} className="pz-veta" style={v.style} width={v.w} height={v.h} viewBox={`0 0 ${v.w} ${v.h}`} fill="none">
            <path d={v.d} stroke="url(#oro)" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        ))}

        <Esquina className="pz-esquina-int" style={{ top: 22, left: 22 }} />
        <Esquina className="pz-esquina-int" style={{ top: 22, right: 22, transform: "scaleX(-1)" }} />
        <Esquina className="pz-esquina-int" style={{ bottom: 22, left: 22, transform: "scaleY(-1)" }} />
        <Esquina className="pz-esquina-int" style={{ bottom: 22, right: 22, transform: "scale(-1)" }} />

        <div className="pz-contenido">{children}</div>
      </div>

      {base}
    </div>
  );
}
