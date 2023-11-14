import { ChevronRight, ChevronDown, Plus, RefreshCcw } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useRef, useEffect, createContext } from "react";
import Icon from "@mdi/react";
import Link from "next/link";
import { getArtifacts } from "@/services/artifact-service";
import { ArtifactItem } from "./artifact-item";

export const ArtifactContext = createContext();

export function ArtifactCollapsible({
  iconPath,
  label,
  newArtifactPath,
  dataArtifact,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [artifactData, setArtifactData] = useState([]);
  const collapsibleRef = useRef(null);

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
            <ArtifactContext.Provider value={refreshArtifactList}>
            {artifactData.map((artifact, index) => (
              <ArtifactItem
                key={artifact.id}
                index={index}
                artifact={artifact}
                type={dataArtifact.type}
              />
            ))}
            </ArtifactContext.Provider>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
