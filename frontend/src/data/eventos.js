// Eventos en orden cronológico. `orden` manda sobre todo lo demás: el reloj,
// el mapa y la línea leen esta misma lista. Datos provisionales.
export const eventos = [
  { orden: 1, anio: 1848, titulo: "Manifiesto Comunista", lugar: "Londres", lat: 51.51, lng: -0.13, video: null },
  { orden: 2, anio: 1917, titulo: "Revolución de Octubre", lugar: "Petrogrado", lat: 59.93, lng: 30.34, video: null },
  { orden: 3, anio: 1934, titulo: "La Larga Marcha", lugar: "Jiangxi", lat: 25.85, lng: 114.93, video: null },
  { orden: 4, anio: 1936, titulo: "Guerra Civil Española", lugar: "Madrid", lat: 40.42, lng: -3.7, video: null },
  { orden: 5, anio: 1949, titulo: "Se crea el COMECON", lugar: "Moscú", lat: 55.76, lng: 37.62, video: null },
  { orden: 6, anio: 1949, titulo: "Toma de Shanghái", lugar: "Shanghái", lat: 31.23, lng: 121.47, video: null },
  { orden: 7, anio: 1949, titulo: "Fundación de la República Popular China", lugar: "Pekín", lat: 39.9, lng: 116.4, video: null },
  { orden: 8, anio: 1949, titulo: "El Kuomintang se retira a Taiwán", lugar: "Taipéi", lat: 25.03, lng: 121.56, video: null },
  { orden: 9, anio: 1958, titulo: "El Gran Salto Adelante", lugar: "Henan", lat: 34.0, lng: 113.5, video: null },
  { orden: 10, anio: 1966, titulo: "Revolución Cultural", lugar: "Pekín", lat: 39.9, lng: 116.4, video: null },
].sort((a, b) => a.orden - b.orden);

// El orden no se negocia: sin saltos ni repetidos, o la app no arranca.
eventos.forEach((e, i) => {
  if (e.orden !== i + 1) {
    throw new Error(`eventos.js: el evento "${e.titulo}" tiene orden ${e.orden}, se esperaba ${i + 1}`);
  }
});
