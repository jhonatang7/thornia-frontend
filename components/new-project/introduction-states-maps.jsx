import { Button } from "@/components/ui/button";

export function IntroductionStatesMaps() {
  return (
    <div className="flex mx-1 justify-between space-x-8">
      <div className="flex flex-col space-y-4 justify-center">
        <div className="flex flex-col space-y-2">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Conoce los Mapas de Estados
          </h2>
          <p className="max-w-md">
            Con los <span className="font-semibold">Mapas de Estados</span> de
            Thornia tendrás una vista rápida de las pruebas y errores de tu
            sistema, visualizando cómo se relacionan y a qué funcionalidades
            afectan
          </p>
        </div>
        <div className="flex space-x-4 justify-end">
          <Button variant="ghost">Atrás</Button>
          <Button>Siguiente</Button>
        </div>
      </div>
      <div className="h-96">HOLA</div>
    </div>
  );
}
