import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useRef, useEffect } from "react";
import Icon from "@mdi/react";
import Link from "next/link";

export function ArtifactCollapsible({ iconPath, label, newArtifactPath }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const collapsibleRef = useRef(null);

  const updateCollapsibleIcon = () => {
    setIsExpanded(!isExpanded);
  };

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
      </div>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
