import { BarChart3, ChevronsUpDown, X, Menu } from "lucide-react";
import Icon from "@mdi/react";
import {
  mdiTestTubeEmpty,
  mdiGraphOutline,
  mdiFileDocumentOutline,
  mdiBugOutline,
} from "@mdi/js";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArtifactCollapsible } from "./artifact-collapsible";
import { useEffect, useRef } from "react";

export function ProjectNavBar({
  showSidebar,
  toggleSidebarButtonVisibility,
  projectId,
}) {
  const sidebarRef = useRef(null);
  const typeArtifact = {
    LLTC: "LLTC",
    HLTC: "HLTC",
    Bug: "Bug"
  };

  useEffect(() => toggleSidebar(), [showSidebar]);

  const toggleSidebar = () => {
    sidebarRef.current.classList.toggle("hidden");
    sidebarRef.current.classList.toggle("flex");
    toggleSidebarButtonVisibility();
  };

  return (
    <div
      ref={sidebarRef}
      className="lg:flex flex-col px-3 py-4 space-y-3 w-screen sm:w-[24rem] sidebar fixed lg:relative hidden lg:visible top-0 bottom-0 overflow-y-auto max-w-[24rem] bg-background border-l"
      // className="lg:flex flex-col px-3 py-4 space-y-3 w-screen sm:w-[24rem] sidebar fixed hidden lg:visible right-0 top-0 bottom-0 overflow-y-auto max-w-[24rem] bg-background border-l"
    >
      <div className="flex flex-row space-x-1 lg:space-x-0">
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => toggleSidebar()}
        >
          <X />
        </Button>

        <Popover>
          <PopoverTrigger className="w-full space-x-2 hover:bg-accent hover:text-accent-foreground border-slate-200 inline-flex items-center justify-start rounded-md text-sm font-medium ring-offset-background border border-input bg-background h-10 px-4 py-2">
            <ChevronsUpDown className="w-4 h-4" />
            <span>v0.1.3</span>
            <span>Nombre del proyecto</span>
          </PopoverTrigger>
          <PopoverContent>Place content for the popover here.</PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-1 md:space-y-0 space-y-1">
        <Button variant="outline" className="px-1.5 py-1 space-x-1 h-min">
          <BarChart3 className="w-5 h-5" /> <span>Dashboard</span>
        </Button>

        <Button variant="outline" className="px-1.5 py-1 space-x-1 h-min m-0">
          <Icon path={mdiFileDocumentOutline} className="w-5 h-5" />
          <span>Test plan</span>
        </Button>

        <Button variant="outline" className="px-1.5 py-1 space-x-1 h-min">
          <Icon path={mdiGraphOutline} className="w-5 h-5" />
          <span>Mapa de estados</span>
        </Button>
      </div>

      <ArtifactCollapsible
        iconPath={mdiTestTubeEmpty}
        label="Casos de Prueba de Bajo Nivel"
        newArtifactPath={"/projects/" + projectId + "/newlltc"}
        dataArtifact= {{projectId, type: typeArtifact.LLTC}}
      />

      <ArtifactCollapsible
        iconPath={mdiTestTubeEmpty}
        label="Casos de Prueba de Alto Nivel"
        newArtifactPath={"/projects/" + projectId + "/newhltc"}
        dataArtifact= {{projectId, type: typeArtifact.HLTC}}
      />

      <ArtifactCollapsible
        iconPath={mdiBugOutline}
        label="Errores (bugs)"
        newArtifactPath={"/projects/" + projectId + "/newbug"}
        dataArtifact= {{projectId, type: typeArtifact.Bug}}
      />
    </div>
  );
}
