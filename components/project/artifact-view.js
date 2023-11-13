import { Button } from "../ui/button";
import { SelectionArtifactField } from "./artifact-fields/selection-artifact-field";
import { MemberArtifactField } from "./artifact-fields/member-artifact-field";
import { TextArtifactField } from "./artifact-fields/text-artifact-field";
import { NumericArtifactField } from "./artifact-fields/numeric-artifact-field";
import { TimeArtifactField } from "./artifact-fields/time-artifact-field";
import { TitleArtifactField } from "./artifact-fields/title-artifact-field";
import { Loader2 } from "lucide-react";
import { getArtifact } from "@/services/artifact-service";
import { useEffect, useState } from "react";

export function ArtifactView({ config, artifactId, type, project }) {
  const [editing, setEditing] = useState(false);
  const [artifact, setArtifact] = useState(null);
  const [getArtifactReqStatus, setGetArtifactReqStatus] = useState(null);
  const [artifactFields, setArtifactFields] = useState(null);

  useEffect(() => configArtifactFields(), [artifact, artifactId]);

  const configArtifactFields = () => {
    if (artifact === null) return;
    let newArtifactFields = config.map((i) => {
      return { key: i.key, value: artifact.parameterArtifact[i.key] };
    });

    setArtifactFields(newArtifactFields);
  };

  const updateArtifactFields = (field) => {
    let newArtifact = [...artifactFields];
    let fieldIndex = newArtifact.findIndex((e) => e.key === field.key);
    newArtifact[fieldIndex] = field;

    setArtifactFields(newArtifact);
  };

  const updateArtifact = () => {
    let newArtifactFields = [...artifactFields];
    let newArtifact = { ...artifact };
    newArtifactFields.forEach((field) => {
      newArtifact[field.key] = field.value;
    });
    console.log(newArtifact);
    setArtifact(newArtifact);
  };

  useEffect(() => {
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
  }, []);

  return artifact && artifactFields ? (
    <div className="grow py-8 px-5">
      <div className="flex flex-col max-w-lg md:max-w-xl md:m-auto sm:px-16 space-y-4">
        <div>
          <TitleArtifactField
            field={config.at(0)}
            updateArtifact={updateArtifactFields}
            value={artifactFields.at(0).value}
            disabled={!editing}
          />
        </div>

        {config.slice(1).map((e, index) => (
          <div key={e + index}>
            {e.type === "member" && (
              <MemberArtifactField
                field={e}
                members={project.memberIds}
                updateArtifact={updateArtifactFields}
                value={artifact.parameterArtifact[e.key]}
                disabled={!editing}
              />
            )}

            {e.type === "selection" && (
              <SelectionArtifactField
                field={e}
                updateArtifact={updateArtifactFields}
                value={artifact.parameterArtifact[e.key]}
                disabled={!editing}
              />
            )}

            {e.type === "text" && (
              <TextArtifactField
                field={e}
                updateArtifact={updateArtifactFields}
                value={artifact.parameterArtifact[e.key]}
                disabled={!editing}
              />
            )}

            {e.type === "numeric" && (
              <NumericArtifactField
                field={e}
                updateArtifact={updateArtifactFields}
                value={artifact.parameterArtifact[e.key]}
                disabled={!editing}
              />
            )}

            {e.type === "datetime" && (
              <TimeArtifactField
                field={e}
                updateArtifact={updateArtifactFields}
                defaultValue={artifact.parameterArtifact[e.key]}
                disabled={!editing}
              />
            )}
          </div>
        ))}

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
                setEditing(false);
                configArtifactFields();
              }}
            >
              Cancelar
            </Button>
          )}
          {editing && (
            <Button
              onClick={() => {
                setEditing(false);
                updateArtifact();
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
