import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { versionFieldSchema } from "@/schemas/version-field-schema";
import { FileWarning, GitBranchPlusIcon, Save } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createProjectVersion } from "@/services/software-projects-service";

export function CreateNewCommit({ projectName, projectId, getVersions }) {
  const [inputValue, setInputValue] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [stateRequest, setStateRequest] = useState("PENDING");

  const handleInputChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);

    const isValidVersion = versionFieldSchema(newInputValue);
    setIsButtonEnabled(isValidVersion);
  };
  const onSubmitCreateVersion = async () => {
    setIsProcess(true);
    const { success } = await createProjectVersion(projectId, inputValue);
    if (success) {
      setStateRequest("COMPLETED");
    } else {
      setStateRequest("FAILED");
    }
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsProcess(false);
    setStateRequest("PENDING");
    setIsOpen(false);
    getVersions();
  };

  const closeDialogError = () => {
    setIsProcess(false);
    setStateRequest("PENDING");
    setIsOpen(false);
  }

  return (
    <>
      <Button onClick={openDialog}>Crear Versión</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* <DialogTrigger asChild>
        <Button variant="outline">Crear Versión</Button>
      </DialogTrigger> */}
        {!isProcess && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="scroll-m-20 text-center border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Crear Nueva Versión
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
              <div className="flex mt-2 space-x-1">
                <FileWarning className="w-6 h-6 flex-shrink-0" />
                <p className="">
                  Estas a punto de crear una nueva versión del proyecto{" "}
                  {projectName}.
                </p>
              </div>
              <div className="flex mt-2 space-x-1">
                <Save className="w-6 h-6 flex-shrink-0" />
                <p className="">
                  Crear una versión te permite tener un respaldo irremovible de
                  tu proyecto.
                </p>
              </div>
              <div className="flex mt-2 space-x-1">
                <GitBranchPlusIcon className="w-6 h-6 flex-shrink-0" />
                <p className="">
                  Podras revisar el estado de tu proyecto en el punto especifico
                  donde se creo la nueva version.
                </p>
              </div>
            </div>
            <div className="flex my-2 justify-end items-center space-x-2">
              <Label htmlFor="version" className="flex-shrink-0">
                La versión de este proyecto sera:
              </Label>
              <Input
                id="version"
                className="w-20"
                placeholder="1.0.0"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-2">
              {/* <p className="">Estas a un click de crear la versión!</p> */}
              <div className="bg-gray-500 h-[1px]" />
            </div>
            <DialogFooter>
              <Button
                onClick={onSubmitCreateVersion}
                disabled={!isButtonEnabled}
                className="w-full"
              >
                Entiendo el riesgo, voy a crear una nueva versión
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
        {isProcess && (
          <DialogContent className="sm:max-w-[520px]">
            {stateRequest === "PENDING" && (
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 rounded-full">
                  <AvatarImage src="/loading.gif" alt="Loaded" />
                  <AvatarFallback>D:</AvatarFallback>
                </Avatar>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Creando la versión v{inputValue} para el proyecto{" "}
                  {projectName}
                </p>
              </div>
            )}
            {stateRequest === "COMPLETED" && (
              <>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  Creación existosa!
                </h2>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Se creo la versión: <span className="text-lg font-semibold">v {inputValue}</span></li>
                  <li>Puedes visualizar esta nueva versión en el proyecto: <span className="text-lg font-semibold">{projectName}</span></li>
                </ul>
                <DialogFooter>
                  <Button onClick={closeDialog} className="w-full">
                    Cerrar Proceso
                  </Button>
                </DialogFooter>
              </>
            )}
            {stateRequest === "FAILED" && (
              <>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Ocurrio algún problema, no se pudo completar el proceso.
                </p>
                <DialogFooter>
                  <Button onClick={closeDialogError} className="w-full">Cerrar Proceso</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
