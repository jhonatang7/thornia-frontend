import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProjectSuccessfullyCreatedMessage({ projectData }) {
  return (
    <div className="flex flex-col space-y-6 pt-9">
      <h3 className="text-center scroll-m-20 text-2xl tracking-tight max-w-md">
        ¡{projectData.name} ha sido creado exitosamente y se ha enviado un
        correo de invitación a los demás miembros!
      </h3>
      <Button>Ir a mi proyecto</Button>
    </div>
  );
}

export function ProjectCreationFailedMessage() {
  return (
    <div className="flex flex-col space-y-6 pt-9">
      <h3 className="text-center scroll-m-20 text-2xl tracking-tight max-w-md">
        ¡Ups! :( Ha ocurrido un error inesperado al crear tu proyecto, inténtalo
        otra vez
      </h3>
      <Link href="/home" passHref legacyBehavior>
        <Button>Volver a inicio</Button>
      </Link>
    </div>
  );
}
