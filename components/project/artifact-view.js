import { Button } from "../ui/button";
import { TitleArtifactField } from "./artifact-fields/title-artifact-field";
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
import { getArtifact, updateArtifact } from "@/services/artifact-service";
import { useEffect, useState } from "react";
import { ArtifactViewForm } from "./artifact-view-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ArtifactView({ config, artifactId, type, project }) {
  const [editionSuccess, setEditionSuccess] = useState(null);
  const [editing, setEditing] = useState(false);
  const [artifact, setArtifact] = useState(null);
  const [getArtifactReqStatus, setGetArtifactReqStatus] = useState(null);
  const [artifactFields, setArtifactFields] = useState(null);
  const [manipulableConfig, setManipulableConfig] = useState(config);

  useEffect(() => configArtifactFields(), [artifact, artifactId, config]);

  const configArtifactFields = () => {
    if (artifact === null) return;
    let newArtifactFields = config.map((i) => {
      return { key: i.key, value: artifact.parameterArtifact[i.key] };
    });

    setManipulableConfig([...config].slice(0, 1));
    setArtifactFields(newArtifactFields);
  };

  useEffect(() => {
    if (manipulableConfig.length === 1) {
      let configAux = [...config];
      setManipulableConfig(configAux);
    }
  }, [manipulableConfig]);

  const updateArtifactFields = (field) => {
    console.log("called");
    let newArtifact = [...artifactFields];
    let fieldIndex = newArtifact.findIndex((e) => e.key === field.key);
    newArtifact[fieldIndex] = field;

    setArtifactFields(newArtifact);
  };

  const saveEditedArtifact = async () => {
    let newArtifactFields = [...artifactFields];
    let newArtifact = { ...artifact };
    newArtifactFields.forEach((field) => {
      newArtifact.parameterArtifact[field.key] = field.value;
    });

    let { success } = await updateArtifact(
      newArtifact.id,
      newArtifact.parameterArtifact,
      type.toUpperCase()
    );

    setEditionSuccess(success);
    if (success) {
      setArtifact(newArtifact);
    } else {
      configArtifactFields();
    }
  };

  useEffect(() => {
    setGetArtifactReqStatus(null);
    setArtifact(null);
    setArtifactFields(null);
    async function requestArtifact() {
      let { success, payload } = await getArtifact(
        artifactId,
        type.toUpperCase()
      );
      setGetArtifactReqStatus(success);

      if (success) {
        setArtifact(payload);
      }
    }

    requestArtifact();
  }, [artifactId, type]);

  return artifact && artifactFields && getArtifactReqStatus === true ? (
    <div className="grow py-8 px-5">
      <div className="flex flex-col max-w-lg md:max-w-2xl md:m-auto sm:px-16 space-y-4">
        {editionSuccess === true && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>¡Cambios guardados!</AlertTitle>
            <AlertDescription>
              Tus cambios en
              <span className="italic"> {artifactFields.at(0).value}</span> se
              han guardado exitosamente
              <Button
                variant="secondary"
                className="py-1.5 px-2 h-auto ml-2"
                onClick={() => setEditionSuccess(null)}
              >
                Aceptar
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {editionSuccess === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error inesperado</AlertTitle>
            <AlertDescription>
              Ha ocurrido un error imprevisto mientras guardábamos tus cambios,
              por favor inténtalo otra vez
              <Button
                variant="secondary"
                className="py-1.5 px-2 h-auto ml-2 text-destructive"
                onClick={() => setEditionSuccess(null)}
              >
                Cerrar
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <div>
          <TitleArtifactField
            field={manipulableConfig.at(0)}
            updateArtifact={updateArtifactFields}
            value={artifactFields.at(0).value}
            disabled={!editing}
          />
        </div>

        {manipulableConfig.length === 1 ? (
          <ArtifactViewForm
            config={config}
            editing={editing}
            project={project}
            updateArtifactFields={updateArtifactFields}
            values={{}}
          />
        ) : (
          <ArtifactViewForm
            config={manipulableConfig}
            editing={editing}
            project={project}
            updateArtifactFields={updateArtifactFields}
            values={artifact.parameterArtifact}
          />
        )}

        <div className="flex flex-row justify-end space-x-2">
          {!editing && (
            <Button variant="secondary" onClick={() => setEditing(true)}>
              Editar
            </Button>
          )}
          {editing && (
            <Button
              variant="ghost"
              onClick={() => {
                configArtifactFields();
                setEditing(false);
              }}
            >
              Cancelar
            </Button>
          )}
          {editing && (
            <Button
              onClick={async () => {
                setEditing(false);
                await saveEditedArtifact();
              }}
            >
              Guardar
            </Button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex h-screen items-center grow">
      <Loader2 className="animate-spin m-auto" />
    </div>
  );
}
