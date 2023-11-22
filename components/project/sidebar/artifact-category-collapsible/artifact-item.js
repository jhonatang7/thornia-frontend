import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ArtifactDialog } from "./artifact-dialog";
import Link from "next/link";
import { useContext } from "react";
import { SelectedArtifactContext } from "@/components/project/sidebar/project-sidebar";

export function ArtifactItem({ artifact, type, projectId, index }) {
  const { selectedArtifactItem, setSelectedArtifactItem } = useContext(
    SelectedArtifactContext
  );
  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "bg-gray-300";
      case "Aprobado":
        return "bg-lime-400";
      case "Fallido":
        return "bg-rose-500";
      case "En progreso":
        return "bg-orange-300";
      case "Resuelto":
        return "bg-lime-400";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <Link
      key={artifact.id}
      href={{
        pathname: `/projects/${projectId}`,
        query: {
          item: artifact.id,
          type: type.toLowerCase(),
        },
      }}
      legacyBehavior
      passHref
    >
      <div
        className={`flex group items-center rounded-lg pr-1 py-1 h-min justify-between space-x-1 cursor-pointer hover:bg-accent pl-3 ml-3 ${
          selectedArtifactItem.type === type &&
          selectedArtifactItem.index === index
            ? "bg-accent"
            : ""
        }`}
        onClick={() => setSelectedArtifactItem({ type: type, index: index })}
      >
        <div className="flex flex-row items-start">
          <div
            className={`w-3 h-3 aspect-square rounded-full ${getStatusColor(
              artifact.parameterArtifact.Estado
            )} ml-1 mr-2 mt-2`}
          ></div>
          <p className="mt-0">{artifact.parameterArtifact.Título}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-auto w-auto p-1 border-0 group-hover:opacity-100 opacity-30 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ArtifactDialog
              artifactId={artifact.id}
              type={type}
              title={artifact.parameterArtifact.Título}
            >
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-destructive"
              >
                Eliminar
              </DropdownMenuItem>
            </ArtifactDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
