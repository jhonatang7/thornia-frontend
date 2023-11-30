import { BarChart3, ChevronsUpDown, X } from "lucide-react";
import Icon from "@mdi/react";
import {
  mdiTestTubeEmpty,
  mdiGraphOutline,
  mdiFileDocumentOutline,
  mdiBugOutline,
} from "@mdi/js";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArtifactCollapsible } from "./artifact-category-collapsible/artifact-collapsible";
import { createContext, useEffect, useRef, useState } from "react";
import { NewArtifactPopover } from "./new-artifact-popover";
import { CommandPanel } from "./command-panel";
import { useRouter } from "next/router";

export const SelectedArtifactContext = createContext({});

export function ProjectSideBar({
  showSidebar,
  toggleSidebarButtonVisibility,
  projectId,
  project,
}) {
  const router = useRouter();
  const [selectedArtifactItem, setSelectedArtifactItem] = useState({});
  const sidebarRef = useRef(null);
  const artifactType = {
    LLTC: "LLTC",
    HLTC: "HLTC",
    BUG: "BUG",
  };

  useEffect(() => toggleSidebar(), [showSidebar]);

  const toggleSidebar = () => {
    sidebarRef.current.classList.toggle("hidden");
    sidebarRef.current.classList.toggle("flex");
    toggleSidebarButtonVisibility();
  };
  const navigateToTestPlan = () => {
    router.push({
      pathname: `/projects/${projectId}`,
      query: { type: "testplan" },
    });
  };

  return (
    <SelectedArtifactContext.Provider
      value={{
        selectedArtifactItem: selectedArtifactItem,
        setSelectedArtifactItem: setSelectedArtifactItem,
      }}
    >
      <div
        ref={sidebarRef}
        className="lg:flex flex-col px-2 py-2.5 space-y-2 w-screen sm:w-[22rem] sidebar lg:relative hidden lg:visible top-0 h-screen overflow-y-auto max-w-[22rem] bg-background border-r"
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
            <PopoverTrigger className="rounded-lg hover:bg-accent hover:text-accent-foreground border-slate-200 inline-flex items-center font-medium ring-offset-background bg-background h-auto px-2 py-1">
              <span>v0.1.3 {project.name}</span>
              <ChevronsUpDown className="w-4 h-4 ml-2" />
            </PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-row space-x-2">
          <NewArtifactPopover projectId={projectId} />
          <CommandPanel />
        </div>

        <div className="flex flex-col min-w-full md:flex-row md:space-x-2 md:space-y-0 space-y-1 text-accent-foreground">
          <Button
            variant="outline"
            className="flex grow md:flex-col flex-row px-2 py-1.5 md:space-y-1 md:space-x-0 space-x-1 h-min font-normal"
          >
            <BarChart3 className="w-5 h-5" /> <span>Dashboard</span>
          </Button>

          <Button
            variant="outline"
            className="flex grow md:flex-col flex-row px-2 py-1.5 md:space-y-1 md:space-x-0 space-x-1 h-min font-normal"
            onClick={navigateToTestPlan}
          >
            <Icon path={mdiFileDocumentOutline} className="w-5 h-5" />
            <span>Test plan</span>
          </Button>

          <Button
            variant="outline"
            className="flex grow md:flex-col flex-row px-2 py-1.5 md:space-y-1 md:space-x-0 space-x-1 h-min font-normal"
          >
            <Icon path={mdiGraphOutline} className="w-5 h-5" />
            <span>Mapa de estados</span>
          </Button>
        </div>

        <ArtifactCollapsible
          iconPath={mdiTestTubeEmpty}
          label="Casos de Prueba de Bajo Nivel"
          dataArtifact={{ projectId, type: artifactType.LLTC }}
        />

        <ArtifactCollapsible
          iconPath={mdiTestTubeEmpty}
          label="Casos de Prueba de Alto Nivel"
          dataArtifact={{ projectId, type: artifactType.HLTC }}
        />

        <ArtifactCollapsible
          iconPath={mdiBugOutline}
          label="Errores (bugs)"
          dataArtifact={{ projectId, type: artifactType.BUG }}
        />
      </div>
    </SelectedArtifactContext.Provider>
  );
}
