import Pizarra from "@/components/Pizarra";
import Esfera from "@/components/Esfera";

export default function Experiencia() {
  return (
    <main className="flex-1">
      <Pizarra base={<Esfera />} />
    </main>
  );
}
