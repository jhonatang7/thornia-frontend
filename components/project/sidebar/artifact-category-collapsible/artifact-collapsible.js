import {
  ChevronRight,
  ChevronDown,
  Plus,
  RefreshCcw,
  Loader2,
  FolderSync,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useRef, useEffect, createContext } from "react";
import Icon from "@mdi/react";
import { getArtifacts } from "@/services/artifact-service";
import { ArtifactItem } from "./artifact-item";
import { Button } from "@/components/ui/button";

export const ArtifactContext = createContext();

export function ArtifactCollapsible({ iconPath, label, dataArtifact }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [artifactData, setArtifactData] = useState(null);
  const collapsibleRef = useRef(null);

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
      <div className="flex flex-row items-center space-x-0.5">
        <CollapsibleTrigger
          className="flex flex-row w-full"
          onClick={updateCollapsibleIcon}
        >
          <div className="flex flex-row items-center hover:bg-accent rounded-lg font-semibold px-1.5 py-1 space-x-1 h-min w-full justify-start">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
            <Icon
              path={iconPath}
              className="w-6 h-6 rounded-sm bg-lime-50 text-green-600 p-1 dark:bg-lime-950 dark:text-green-500"
            />
            <span className="grow text-left">{label}</span>
          </div>
        </CollapsibleTrigger>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg h-auto p-2"
          onClick={refreshArtifactList}
        >
          <FolderSync className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
      <CollapsibleContent>
        {artifactData === null ? (
          <p className="ml-6">Cargando...</p>
        ) : artifactData.length === 0 ? (
          <p className="ml-6">
            El proyecto aún no tiene {label.toLowerCase()}, agrega uno para
            empezar
          </p>
        ) : (
          <div className="mt-2">
            <ArtifactContext.Provider value={refreshArtifactList}>
              {artifactData.map((artifact, index) => (
                <ArtifactItem
                  key={artifact.id}
                  index={index}
                  artifact={artifact}
                  type={dataArtifact.type}
                  projectId={dataArtifact.projectId}
                />
              ))}
            </ArtifactContext.Provider>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
