import { Plus } from "lucide-react";
import Icon from "@mdi/react";
import { mdiTestTubeEmpty, mdiBugOutline } from "@mdi/js";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useContext, useState } from "react";
import { SelectedArtifactContext } from "./project-sidebar";

export function NewArtifactPopover({ projectId }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedArtifactItem } = useContext(SelectedArtifactContext);

  const onNewArtifactClick = () => {
    setIsOpen(false);
    setSelectedArtifactItem({ type: "", index: 0 });
  };

  return (
    <Popover open={isOpen}>
      <PopoverTrigger
        className="w-full"
        onClick={() => setIsOpen(true)}
        asChild
      >
        <Button
          variant="outline"
          className="w-full justify-start align-middle rounded-lg px-1.5 py-1 h-auto text-base font-normal text-muted-foreground"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo artefacto
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-2 rounded-lg absolute"
        onPointerDownOutside={() => setIsOpen(false)}
        onEscapeKeyDown={() => setIsOpen(false)}
        onInteractOutside={onNewArtifactClick}
      >
        <div className="flex flex-col space-y-1">
          <Link
            href={"/projects/" + projectId + "/newlltc"}
            passHref
            legacyBehavior
          >
            <div
              className="p-1 flex flex-row space-x-2 hover:bg-accent cursor-pointer"
              onClick={onNewArtifactClick}
            >
              <Icon
                path={mdiTestTubeEmpty}
                className="w-6 h-6 rounded-sm bg-accent p-1 border"
              />
              <span>Caso de Prueba de Bajo Nivel</span>
            </div>
          </Link>
          <Link
            href={"/projects/" + projectId + "/newhltc"}
            passHref
            legacyBehavior
          >
            <div
              className="p-1 flex flex-row space-x-2 hover:bg-accent cursor-pointer"
              onClick={onNewArtifactClick}
            >
              <Icon
                path={mdiTestTubeEmpty}
                className="w-6 h-6 rounded-sm bg-accent p-1 border"
              />
              <span>Caso de Prueba de Alto Nivel</span>
            </div>
          </Link>
          <Link
            href={"/projects/" + projectId + "/newbug"}
            passHref
            legacyBehavior
          >
            <div
              className="p-1 flex flex-row space-x-2 hover:bg-accent cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Icon
                path={mdiBugOutline}
                className="w-6 h-6 rounded-sm bg-accent p-1 border"
              />
              <span>Error (Bug)</span>
            </div>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
