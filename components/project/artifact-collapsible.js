import { ChevronRight, ChevronDown, Plus, RefreshCcw } from "lucide-react";
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
  const [artifactData, setArtifactData] = useState([]);
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

  const artifactsList = async () => {
    if (artifactData.length === 0) {
      const { success, payload } = await getArtifacts(dataArtifact);
      if (success) setArtifactData(payload);
    }
  };

  const refreshArtifactList = async () => {
    const { success, payload } = await getArtifacts(dataArtifact);
    if (success) setArtifactData(payload);
  };

  useEffect(() => {
    if (isExpanded) {
      artifactsList();
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
        {artifactData.length === 0 ? (
          <h4>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </h4>
        ) : (
          <div className="mt-2">
            {artifactData.map((artifact, index) => (
              <div
                key={artifact.id}
                index={index}
                className="flex items-center border rounded-md text-sm font-medium px-1.5 py-1 h-min w-full justify-start cursor-pointer hover:bg-accent"
              >
                <div
                  className={`w-3 h-3 rounded-full ${getStatusColor(
                    artifact.parameterArtifact.Estado
                  )} ml-1 mr-2`}
                ></div>
                <label>{artifact.parameterArtifact.Título}</label>
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
