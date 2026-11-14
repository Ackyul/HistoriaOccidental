import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import mundo from "world-atlas/land-110m.json";

export const ANCHO = 1000;
export const ALTO = 500;

const tierra = feature(mundo, mundo.objects.land);
const proyeccion = geoNaturalEarth1().fitExtent(
  [
    [10, 10],
    [ANCHO - 10, ALTO - 10],
  ],
  tierra,
);

export const contorno = geoPath(proyeccion)(tierra);

export function proyectar(lng, lat) {
  const [x, y] = proyeccion([lng, lat]);
  return { x: +x.toFixed(1), y: +y.toFixed(1) };
}

