import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteArtifact } from "@/services/artifact-service";
import { useContext } from "react";
import { ArtifactContext } from "@/components/project/artifact-collapsible";
import { Button } from "@/components/ui/button";

export function ArtifactDialog({ artifactId, type, title, children }) {
  const refreshArtifactList = useContext(ArtifactContext);
  const deleteArtifactItem = async () => {
    let { success } = await deleteArtifact({ id: artifactId, type });
    if (success) refreshArtifactList();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar eliminación</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Esta seguro que desea eliminar el artefacto '{title}' de tipo {type}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={deleteArtifactItem}
            >
              Eliminar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
