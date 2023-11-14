import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil } from "lucide-react";
import { useState } from "react";
import { ArtifactDialog } from "./artifact-dialog";
import Link from "next/link";

export function ArtifactItem({ artifact, type, projectId }) {
  const [shouldBeVisible, setShouldBeVisible] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pendiente":
        return "bg-gray-400";
      case "Aprobado":
        return "bg-green-500";
      case "Fallido":
        return "bg-red-600";
      case "En progreso":
        return "bg-blue-800";
      case "Resuelto":
        return "bg-green-500";
      default:
        return "bg-gray-400";
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
        className="flex items-center border rounded-md text-sm font-medium px-1.5 py-1 h-min w-full justify-between cursor-pointer hover:bg-accent"
        onMouseOver={() => setShouldBeVisible(true)}
        onMouseOut={() => setShouldBeVisible(false)}
      >
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full ${getStatusColor(
              artifact.parameterArtifact.Estado
            )} ml-1 mr-2`}
          ></div>
          <h4>{artifact.parameterArtifact.Título}</h4>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`h-min w-min ${
                shouldBeVisible ? "opacity-100" : "opacity-50"
              } hover:bg-slate-200 dark:hover:bg-slate-600`}
              onClick={() => setShouldBeVisible(true)}
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ArtifactDialog
              artifactId={artifact.id}
              type={type}
              title={artifact.parameterArtifact.Título}
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Delete
              </DropdownMenuItem>
            </ArtifactDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
