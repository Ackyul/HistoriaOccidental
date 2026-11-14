import { eventos } from "./eventos";

// Años que muestra el reloj, sin repetir y en el orden de los eventos.
export const anios = [...new Set(eventos.map((e) => e.anio))];
