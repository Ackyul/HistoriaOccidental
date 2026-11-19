// Solo hay dos videos, así que el mapa tiene dos burbujas.
// `orden` manda sobre todo lo demás: el reloj y el mapa leen esta misma lista.
export const eventos = [
  {
    orden: 1,
    anio: 1924,
    titulo: "Lucha por el poder en la URSS",
    lugar: "Moscú",
    descripcion:
      "Tras la muerte de Lenin, la disputa entre Estalin y Trotsky por el control del partido marca el inicio del estalinismo",
    lat: 55.76,
    lng: 37.62,
    video: null,
  },
  {
    orden: 2,
    anio: 1949,
    titulo: "El Maoísmo",
    lugar: "Pekín",
    descripcion: "Proclamación de la República Popular China en la Plaza de Tiananmén",
    lat: 39.9,
    lng: 116.4,
    video: null,
  },
].sort((a, b) => a.orden - b.orden);

// El orden no se negocia: sin saltos ni repetidos, o la app no arranca.
eventos.forEach((e, i) => {
  if (e.orden !== i + 1) {
    throw new Error(`eventos.js: el evento "${e.titulo}" tiene orden ${e.orden}, se esperaba ${i + 1}`);
  }
});
