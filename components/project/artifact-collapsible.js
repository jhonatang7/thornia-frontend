import { ChevronRight, ChevronDown } from "lucide-react";
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
        <Button
          variant="outline"
          className="px-1.5 py-1 space-x-1 h-min w-full justify-start"
        >
          <Icon path={iconPath} className="w-5 h-5" />
          <span>{label}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
