import MapaVista from "@/components/MapaVista";
import { eventos } from "@/data/eventos";
import { contorno, proyectar, ANCHO, ALTO } from "@/lib/mundo";

export default function Mapa() {
  const puntos = eventos.map((e) => ({ ...e, ...proyectar(e.lng, e.lat) }));

  return (
    <main className="flex-1">
      <MapaVista contorno={contorno} ancho={ANCHO} alto={ALTO} puntos={puntos} />
    </main>
  );
}
