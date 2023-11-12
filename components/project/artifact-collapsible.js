import { ChevronRight, ChevronDown, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import Icon from "@mdi/react";
import { Button } from "../ui/button";

export function ArtifactCollapsible({ iconPath, label }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible>
      <CollapsibleTrigger
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex flex-row w-full"
      >
        {isExpanded ? <ChevronDown /> : <ChevronRight />}
        <div className="flex flex-row items-center border hover:bg-accent rounded-md text-sm font-medium px-1.5 py-1 space-x-1 h-min w-full justify-start">
          <Icon path={iconPath} className="w-5 h-5" />
          <span className="grow text-left">{label}</span>
          <Plus className="w-5 h-5 hover:bg-white rounded-sm hover:border text-muted-foreground" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
