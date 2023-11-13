import {
  ChevronRight,
  ChevronDown,
  Plus,
  RefreshCcw,
  Loader2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useRef, useEffect } from "react";
import Icon from "@mdi/react";
import Link from "next/link";
import { getArtifacts } from "@/services/artifact-service";

export function ArtifactCollapsible({
  iconPath,
  label,
  newArtifactPath,
  dataArtifact,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [artifactData, setArtifactData] = useState(null);
  const collapsibleRef = useRef(null);

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

  const updateCollapsibleIcon = async () => {
    setIsExpanded(!isExpanded);
  };

  const requestArtifacts = async () => {
    if (artifactData === null) {
      const { success, payload } = await getArtifacts(dataArtifact);
      console.log(payload);
      if (success) setArtifactData(payload);
    }
  };

  const refreshArtifactList = async () => {
    setArtifactData(null);
    const { success, payload } = await getArtifacts(dataArtifact);
    if (success) setArtifactData(payload);
  };

  useEffect(() => {
    if (isExpanded) {
      requestArtifacts();
    }
  }, [isExpanded]);

  return (
    <Collapsible ref={collapsibleRef}>
      <div className="flex flex-row items-center space-x-1">
        <CollapsibleTrigger
          className="flex flex-row w-full"
          onClick={updateCollapsibleIcon}
        >
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
          <div className="flex flex-row items-center border hover:bg-accent rounded-md text-sm font-medium px-1.5 py-1 space-x-1 h-min w-full justify-start">
            <Icon path={iconPath} className="w-5 h-5" />
            <span className="grow text-left">{label}</span>
          </div>
        </CollapsibleTrigger>
        <Link href={newArtifactPath} passHref legacyBehavior>
          <Plus className="w-5 h-5 cursor-pointer rounded-sm hover:bg-accent text-muted-foreground" />
        </Link>
        <RefreshCcw
          className="w-5 h-5 cursor-pointer rounded-sm hover:bg-accent text-muted-foreground"
          onClick={refreshArtifactList}
        />
      </div>
      <CollapsibleContent>
        {artifactData === null ? (
          <p>Cargando...</p>
        ) : artifactData.length === 0 ? (
          <p>
            El proyecto aún no tiene {label.toLowerCase()}, agrega uno para
            empezar
          </p>
        ) : (
          <div className="mt-2">
            {artifactData.map((artifact, index) => (
              <Link
                key={artifact.id}
                href={{
                  pathname: `/projects/${dataArtifact.projectId}`,
                  query: {
                    item: artifact.id,
                    type: dataArtifact.type.toLowerCase(),
                  },
                }}
                legacyBehavior
                passHref
              >
                <div
                  index={index}
                  className="flex border rounded-md text-sm font-medium px-1.5 py-1 h-min w-full justify-start cursor-pointer hover:bg-accent"
                >
                  <div
                    className={`w-3 h-3 aspect-square rounded-full ${getStatusColor(
                      artifact.parameterArtifact.Estado
                    )} ml-1 mr-2 mt-1`}
                  ></div>
                  <label>{artifact.parameterArtifact.Título}</label>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
