import { Button } from "../ui/button";
import { SelectionArtifactField } from "./artifact-fields/selection-artifact-field";
import { MemberArtifactField } from "./artifact-fields/member-artifact-field";
import { TextArtifactField } from "./artifact-fields/text-artifact-field";
import { NumericArtifactField } from "./artifact-fields/numeric-artifact-field";
import { TimeArtifactField } from "./artifact-fields/time-artifact-field";
import { useEffect, useState } from "react";
import { TitleArtifactField } from "./artifact-fields/title-artifact-field";
import { createArtifact } from "@/services/artifact-service";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

export function NewArtifact({ project, config, title, type }) {
  const router = useRouter();
  const [creationStatus, setCreationStatus] = useState("initial");
  const { toast } = useToast();
  const [artifactFields, setArtifact] = useState(
    config.map((i) => {
      return { key: i.key, value: "" };
    })
  );

  useEffect(() => {
    let oldTitle = artifactFields[0];
    let newArtifact = config.map((i) => {
      return { key: i.key, value: "" };
    });

    newArtifact[0] = oldTitle;
    setArtifact(newArtifact);
  }, [config, title]);

  const updateArtifact = (field) => {
    let newArtifact = [...artifactFields];
    let fieldIndex = newArtifact.findIndex((e) => e.key === field.key);
    newArtifact[fieldIndex] = field;

    setArtifact(newArtifact);
  };

  const saveArtifact = async () => {
    setCreationStatus("inprogress");
    let artifact = {};
    artifactFields.forEach((field) => {
      artifact = { ...artifact, [field.key]: field.value };
    });

    let { success, createdArtifact } = await createArtifact({
      projectId: project.id,
      type: type,
      parameterArtifact: artifact,
    });

    if (success) {
      setCreationStatus("success");

      toast({
        title: "¡Creación exitosa!",
        description: `Tu nuevo ${title} se ha sido creado exitosamente`,
      });

      router.push({
        pathname: `/projects/${project.id}`,
        query: {
          item: createdArtifact.id,
          type: type.toLowerCase(),
        },
      });
    } else {
      setCreationStatus("failed");
      toast({
        variant: "destructive",
        title: "¡Ups! Ocurrió un error inesperado :(",
        description: `Intenta crear tu ${title} nuevamente dentro de un momento`,
      });
    }
  };

  return (
    <div className="grow p-2 h-screen max-h-screen">
      <div className="border rounded-lg min-h-full h-full max-h-full shadow-md overflow-y-auto">
        <div className="py-8 px-5 flex flex-col max-w-lg md:max-w-2xl md:m-auto sm:px-16 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Nuevo {title}</p>
            <TitleArtifactField
              field={config.at(0)}
              updateArtifact={updateArtifact}
            />
          </div>

          {config.slice(1).map((e, index) => (
            <div key={e + index}>
              {e.type === "member" && (
                <MemberArtifactField
                  field={e}
                  members={project.memberIds}
                  updateArtifact={updateArtifact}
                />
              )}

              {e.type === "selection" && (
                <SelectionArtifactField
                  field={e}
                  updateArtifact={updateArtifact}
                />
              )}

              {e.type === "text" && (
                <TextArtifactField field={e} updateArtifact={updateArtifact} />
              )}

              {e.type === "numeric" && (
                <NumericArtifactField
                  field={e}
                  updateArtifact={updateArtifact}
                />
              )}

              {e.type === "datetime" && (
                <TimeArtifactField field={e} updateArtifact={updateArtifact} />
              )}
            </div>
          ))}

          <div className="flex flex-row justify-end space-x-2">
            <Button variant="ghost" disabled={creationStatus === "inprogress"}>
              Cancelar
            </Button>
            {creationStatus === "inprogress" ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                En progreso...
              </Button>
            ) : (
              <Button onClick={saveArtifact}>Crear</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
